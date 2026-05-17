import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon } from "~/app/_components/site/Icon";
import { VendorLogo, pickLogo } from "~/app/_components/site/VendorLogo";
import {
  FRAMEWORKS,
  getCostMin,
  getLatencyMs,
  type Framework,
  type Recipe,
} from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";
import { SITE_NAME, SITE_URL } from "~/utils/site";

type RouteParams = { slug: string };

const FRAMEWORK_BY_SLUG: Record<string, Framework> = Object.fromEntries(
  FRAMEWORKS.map((f) => [f.toLowerCase(), f]),
);

function pairsOfFrameworks(): [Framework, Framework][] {
  const out: [Framework, Framework][] = [];
  for (let i = 0; i < FRAMEWORKS.length; i++) {
    for (let j = i + 1; j < FRAMEWORKS.length; j++) {
      out.push([FRAMEWORKS[i]!, FRAMEWORKS[j]!]);
    }
  }
  return out;
}

function slugFor(a: Framework, b: Framework): string {
  return `${a.toLowerCase()}-vs-${b.toLowerCase()}`;
}

function parseSlug(slug: string): [Framework, Framework] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const a = FRAMEWORK_BY_SLUG[parts[0]!];
  const b = FRAMEWORK_BY_SLUG[parts[1]!];
  if (!a || !b || a === b) return null;
  return [a, b];
}

function mean(xs: number[]): number | null {
  if (!xs.length) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function frameworkStats(recipes: Recipe[], framework: Framework) {
  const needle = framework.toLowerCase();
  const subset = recipes.filter((r) => r.framework.toLowerCase().startsWith(needle));
  const latencies = subset
    .map((r) => getLatencyMs(r))
    .filter((n) => Number.isFinite(n));
  const costs = subset
    .map((r) => getCostMin(r))
    .filter((n) => Number.isFinite(n));
  const stt = Array.from(new Set(subset.map((r) => r.pipeline.stt))).sort();
  const tts = Array.from(new Set(subset.map((r) => r.pipeline.tts))).sort();
  return {
    count: subset.length,
    meanLatency: mean(latencies),
    meanCost: mean(costs),
    stt,
    tts,
    topRecipes: subset.slice(0, 5),
  };
}

export function generateStaticParams(): RouteParams[] {
  return pairsOfFrameworks().map(([a, b]) => ({ slug: slugFor(a, b) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Comparison not found · SpeechStack" };
  const [a, b] = parsed;
  const recipes = getRecipes();
  const aStats = frameworkStats(recipes, a);
  const bStats = frameworkStats(recipes, b);
  const url = `${SITE_URL}/compare/${slugFor(a, b)}`;
  const title = `${a} vs ${b} — Voice AI framework comparison`;
  const description = `Side-by-side comparison of ${a} (${aStats.count} recipes) and ${b} (${bStats.count} recipes) on latency, cost, supported STT/TTS engines, and production recipes.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const [a, b] = parsed;
  const recipes = getRecipes();
  const aStats = frameworkStats(recipes, a);
  const bStats = frameworkStats(recipes, b);
  const url = `${SITE_URL}/compare/${slugFor(a, b)}`;
  const recipesMostRecent = recipes
    .map((r) => new Date(r.updated_at))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((x, y) => y.getTime() - x.getTime())[0]
    ?.toISOString();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${a} vs ${b} — voice AI framework comparison`,
    description: `Side-by-side comparison of ${a} and ${b} for production voice AI agents across ${aStats.count + bStats.count} indexed recipes.`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/compare/${slugFor(a, b)}/opengraph-image`,
    dateModified: recipesMostRecent,
    author: { "@type": "Organization", "@id": `${SITE_URL}#organization` },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}#organization` },
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website` },
    about: [
      {
        "@type": "SoftwareApplication",
        name: a,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
      },
      {
        "@type": "SoftwareApplication",
        name: b,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SpeechStack", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/#compare` },
      { "@type": "ListItem", position: 3, name: `${a} vs ${b}`, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    <article
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "48px 32px 80px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-3)",
            textDecoration: "none",
            alignSelf: "flex-start",
          }}
        >
          ← directory
        </Link>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Framework comparison
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "var(--fg-1)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <VendorLogo name={a} height={40} />
            {a}
          </span>
          <span style={{ color: "var(--fg-4)", fontWeight: 400 }}>vs</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <VendorLogo name={b} height={40} />
            {b}
          </span>
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--fg-2)",
            maxWidth: 720,
          }}
        >
          SpeechStack indexes production voice AI agent recipes across {a} and {b} alongside
          the rest of the stack. This page compares both frameworks on raw numbers from{" "}
          {aStats.count + bStats.count} indexed recipes — latency, cost per minute, and the
          STT / TTS engines builders actually pair with each one.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 1fr",
          border: "1px solid var(--border-default)",
          borderRadius: 6,
          overflow: "hidden",
          background: "var(--bg-surface-1)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <StatHeader label="" />
        <StatHeader label={a} accent withLogo />
        <StatHeader label={b} accent withLogo />

        <StatLabel>Recipes indexed</StatLabel>
        <StatValue mono>{aStats.count}</StatValue>
        <StatValue mono>{bStats.count}</StatValue>

        <StatLabel>Mean p50 latency</StatLabel>
        <StatValue mono>{aStats.meanLatency === null ? "—" : `${Math.round(aStats.meanLatency)}ms`}</StatValue>
        <StatValue mono>{bStats.meanLatency === null ? "—" : `${Math.round(bStats.meanLatency)}ms`}</StatValue>

        <StatLabel>Mean cost / min</StatLabel>
        <StatValue mono>{aStats.meanCost === null ? "—" : `$${aStats.meanCost.toFixed(3)}`}</StatValue>
        <StatValue mono>{bStats.meanCost === null ? "—" : `$${bStats.meanCost.toFixed(3)}`}</StatValue>

        <StatLabel>STT engines seen</StatLabel>
        <StatValue>{aStats.stt.length ? aStats.stt.join(", ") : "—"}</StatValue>
        <StatValue>{bStats.stt.length ? bStats.stt.join(", ") : "—"}</StatValue>

        <StatLabel>TTS engines seen</StatLabel>
        <StatValue>{aStats.tts.length ? aStats.tts.join(", ") : "—"}</StatValue>
        <StatValue>{bStats.tts.length ? bStats.tts.join(", ") : "—"}</StatValue>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <FrameworkColumn framework={a} recipes={aStats.topRecipes} />
        <FrameworkColumn framework={b} recipes={bStats.topRecipes} />
      </section>

      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          paddingTop: 8,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--fg-3)" }}>
          Want a recipe listed under {a} or {b}?
        </span>
        <Link
          href="/submit"
          style={{
            padding: "7px 14px",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Submit a recipe
        </Link>
      </footer>
    </article>
    </>
  );
}

function StatHeader({
  label,
  accent,
  withLogo,
}: {
  label: string;
  accent?: boolean;
  withLogo?: boolean;
}) {
  const showLogo = withLogo && label && pickLogo(label) !== null;
  return (
    <div
      style={{
        padding: "12px 16px",
        background: "var(--bg-surface-2)",
        borderBottom: "1px solid var(--border-default)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: accent ? "var(--fg-1)" : "var(--fg-3)",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {showLogo && <VendorLogo name={label} height={14} />}
      {label}
    </div>
  );
}

function StatLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderTop: "1px solid var(--border-subtle)",
        fontSize: 12,
        color: "var(--fg-3)",
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: "var(--bg-surface-1)",
      }}
    >
      {children}
    </div>
  );
}

function StatValue({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderTop: "1px solid var(--border-subtle)",
        borderLeft: "1px solid var(--border-subtle)",
        fontSize: 14,
        color: "var(--fg-1)",
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        background: "var(--bg-surface-1)",
      }}
    >
      {children}
    </div>
  );
}

function FrameworkColumn({
  framework,
  recipes,
}: {
  framework: Framework;
  recipes: Recipe[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <VendorLogo name={framework} height={12} />
        Top {framework} recipes
      </span>
      {recipes.length === 0 ? (
        <div
          style={{
            border: "1px dashed var(--border-strong)",
            borderRadius: 6,
            padding: 24,
            fontSize: 13,
            color: "var(--fg-2)",
            textAlign: "center",
          }}
        >
          No {framework} recipes indexed yet.{" "}
          <Link href="/submit" style={{ color: "var(--accent-fg)", textDecoration: "none" }}>
            Submit one →
          </Link>
        </div>
      ) : (
        recipes.map((r) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            style={{
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface-1)",
              borderRadius: 6,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              textDecoration: "none",
              color: "var(--fg-1)",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fg-1)",
                letterSpacing: "-0.01em",
              }}
            >
              {r.title}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--fg-2)",
                lineHeight: 1.5,
              }}
            >
              {r.description}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 2,
              }}
            >
              {r.pipeline.stt}
              <Icon name="arrow-right" size={10} />
              {r.pipeline.llm}
              <Icon name="arrow-right" size={10} />
              {r.pipeline.tts}
            </span>
          </Link>
        ))
      )}
    </div>
  );
}
