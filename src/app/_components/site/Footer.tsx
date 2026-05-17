import Link from "next/link";

import { getRecipes } from "~/utils/getRecipes";
import { FRAMEWORKS } from "~/types/recipe";
import { BrandMark } from "./Icon";

const TOP_RECIPE_COUNT = 6;
const COMPARE_SLUGS = [
  { slug: "vapi-vs-retell", label: "Vapi vs Retell" },
  { slug: "vapi-vs-livekit", label: "Vapi vs LiveKit" },
  { slug: "retell-vs-pipecat", label: "Retell vs Pipecat" },
  { slug: "elevenlabs-vs-cartesia", label: "ElevenLabs vs Cartesia" },
];

export function Footer() {
  const recipes = getRecipes();

  const topRecipes = [...recipes]
    .sort((a, b) => {
      const af = a.featured ? 1 : 0;
      const bf = b.featured ? 1 : 0;
      if (af !== bf) return bf - af;
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    })
    .slice(0, TOP_RECIPE_COUNT);

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
        marginTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "48px 32px 32px",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BrandMark size={20} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--fg-1)",
              }}
            >
              SpeechStack
            </span>
          </div>
          <span style={{ fontSize: 13, color: "var(--fg-3)", lineHeight: 1.55 }}>
            A curated directory of voice AI agent recipes. Independent. Not
            affiliated with any vendor.
          </span>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <FooterLink href="#newsletter">Subscribe</FooterLink>
            <span style={{ color: "var(--fg-4)" }}>·</span>
            <FooterLink href="/submit">Submit</FooterLink>
            <span style={{ color: "var(--fg-4)" }}>·</span>
            <FooterLink href="https://github.com/speechstack-ai" external>
              GitHub
            </FooterLink>
          </div>
        </div>

        <FooterCol title="Categories">
          <FooterLink href="/">All recipes</FooterLink>
          {FRAMEWORKS.map((f) => (
            <FooterLink key={f} href={`/?framework=${encodeURIComponent(f)}`}>
              {f}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Top recipes">
          {topRecipes.map((r) => (
            <FooterLink key={r.id} href={`/recipes/${r.id}`}>
              {r.title}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Compare">
          {COMPARE_SLUGS.map((c) => (
            <FooterLink key={c.slug} href={`/compare/${c.slug}`}>
              {c.label}
            </FooterLink>
          ))}
          <FooterLink href="#faq">FAQ</FooterLink>
          <FooterLink href="#about">About</FooterLink>
        </FooterCol>
      </div>

      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          <span>© 2026 SpeechStack · independent voice AI directory</span>
          <span>made by one person · take that, marketing teams</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 13,
          color: "var(--fg-2)",
          textDecoration: "none",
          lineHeight: 1.4,
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      style={{
        fontSize: 13,
        color: "var(--fg-2)",
        textDecoration: "none",
        lineHeight: 1.4,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}
