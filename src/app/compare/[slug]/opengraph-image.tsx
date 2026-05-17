import { ImageResponse } from "next/og";

import {
  FRAMEWORKS,
  getCostMin,
  getLatencyMs,
  type Framework,
  type Recipe,
} from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FRAMEWORK_BY_SLUG: Record<string, Framework> = Object.fromEntries(
  FRAMEWORKS.map((f) => [f.toLowerCase(), f]),
);

function parseSlug(slug: string): [Framework, Framework] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const a = FRAMEWORK_BY_SLUG[parts[0]!];
  const b = FRAMEWORK_BY_SLUG[parts[1]!];
  if (!a || !b || a === b) return null;
  return [a, b];
}

function pairs(): [Framework, Framework][] {
  const out: [Framework, Framework][] = [];
  for (let i = 0; i < FRAMEWORKS.length; i++) {
    for (let j = i + 1; j < FRAMEWORKS.length; j++) {
      out.push([FRAMEWORKS[i]!, FRAMEWORKS[j]!]);
    }
  }
  return out;
}

function mean(xs: number[]): number | null {
  if (!xs.length) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function frameworkStats(recipes: Recipe[], framework: Framework) {
  const needle = framework.toLowerCase();
  const subset = recipes.filter((r) => r.framework.toLowerCase().startsWith(needle));
  return {
    count: subset.length,
    meanLatency: mean(
      subset.map((r) => getLatencyMs(r)).filter((n) => Number.isFinite(n)),
    ),
    meanCost: mean(
      subset.map((r) => getCostMin(r)).filter((n) => Number.isFinite(n)),
    ),
  };
}

export function generateStaticParams() {
  return pairs().map(([a, b]) => ({
    slug: `${a.toLowerCase()}-vs-${b.toLowerCase()}`,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return new Response("Not found", { status: 404 });
  const [a, b] = parsed;
  const recipes = getRecipes();
  const aStats = frameworkStats(recipes, a);
  const bStats = frameworkStats(recipes, b);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
              fontSize: 18,
            color: "#22d3ee",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: "#22d3ee",
            }}
          />
          SpeechStack · Framework comparison
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: -3,
            fontWeight: 600,
          }}
        >
          <span>{a}</span>
          <span style={{ color: "#525252", fontWeight: 400, fontSize: 64 }}>vs</span>
          <span>{b}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <StatBox
            label={a}
            count={aStats.count}
            latency={aStats.meanLatency}
            cost={aStats.meanCost}
          />
          <StatBox
            label={b}
            count={bStats.count}
            latency={bStats.meanLatency}
            cost={bStats.meanCost}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTop: "1px solid #2e2e2e",
              fontSize: 18,
            color: "#737373",
          }}
        >
          <span>Indexed production voice AI recipes</span>
          <span style={{ color: "#22d3ee" }}>speechstack.com</span>
        </div>
      </div>
    ),
    size,
  );
}

function StatBox({
  label,
  count,
  latency,
  cost,
}: {
  label: string;
  count: number;
  latency: number | null;
  cost: number | null;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 24,
        border: "1px solid #2e2e2e",
        borderRadius: 8,
        background: "#141414",
        flex: 1,
      }}
    >
      <span
        style={{
          fontSize: 16,
          color: "#22d3ee",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        <Stat label="recipes" value={String(count)} />
        <Stat
          label="mean p50"
          value={latency === null ? "—" : `${Math.round(latency)}ms`}
        />
        <Stat
          label="mean $/min"
          value={cost === null ? "—" : `$${cost.toFixed(3)}`}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          fontSize: 12,
          color: "#737373",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 24, color: "#fafafa" }}>
        {value}
      </span>
    </div>
  );
}
