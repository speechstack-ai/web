import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

const PAGE_TITLE = "Sponsorship";
const PAGE_DESCRIPTION =
  "SpeechStack is where developers and technical founders compare voice AI stacks. Sponsorship puts your name in front of that decision.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/sponsors" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/sponsors`,
    siteName: SITE_NAME,
    title: `Sponsorship · ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `Sponsorship · ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
};

const inlineCodeStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.92em",
  color: "var(--fg-1)",
  background: "var(--bg-surface-2)",
  padding: "1px 6px",
  borderRadius: 4,
};

const METRICS: { label: string; value: string }[] = [
  { label: "Weekly returning builders", value: "[METRIC]" },
  { label: "Templates published", value: "[METRIC]" },
  { label: "Indexed pages", value: "[METRIC]" },
  { label: "GitHub stars", value: "[METRIC]" },
  { label: "X engagement (weekly)", value: "[METRIC]" },
  { label: "Sponsor partners", value: "[METRIC]" },
];

const DELIVERABLES: React.ReactNode[] = [
  <>
    Logo placement on <code style={inlineCodeStyle}>/stack</code>, the Voice AI
    Stack Atlas where builders pick vendors
  </>,
  <>
    Footer presence sitewide, across every template page and comparison page
  </>,
  <>OG card mention on shared homepage links</>,
  <>
    Optional <code style={inlineCodeStyle}>/sponsors/[vendor]</code> landing
    page, written once you sign and built to your spec
  </>,
  <>Equal billing with every other featured sponsor, no tier hierarchy</>,
  <>Three-month minimum commitment, month-to-month after that</>,
  <>
    Vendor neutrality stays absolute. Sponsorship buys visibility, never
    editorial preference or ranking
  </>,
];

const PRICING: {
  tier: string;
  price: string;
  includes: React.ReactNode;
}[] = [
  {
    tier: "Founding sponsor",
    price: "$400 / mo",
    includes: (
      <>
        Locked-in rate for the first 12 months. Logo on{" "}
        <code style={inlineCodeStyle}>/stack</code>, footer presence, OG
        mention. Cap: 3 slots, first-come.
      </>
    ),
  },
  {
    tier: "Featured sponsor",
    price: "$750 / mo",
    includes: (
      <>
        Standard rate after the founding cohort fills. Same placements as
        founding tier. Cap: 5 slots total.
      </>
    ),
  },
  {
    tier: "Newsletter slot",
    price: "$150 / send",
    includes: (
      <>
        Single sponsored placement in a SpeechStack newsletter edition. Goes
        live once the list clears 1,000 subscribers.
      </>
    ),
  },
];

const PRICING_FOOTNOTE =
  "Pricing benchmarked against OpenAlternative ($147–$597/mo), AI Agents Directory ($89/issue main sponsor), and Sidebar.io ($950/single send). Founding rate is below market on purpose — early sponsors get the discount, and the rate card grows with traffic.";

const CONTAINER: React.CSSProperties = {
  maxWidth: 896,
  margin: "0 auto",
  padding: "0 32px",
};

export default function SponsorsPage() {
  return (
    <>
      {/* Hero: eyebrow + H1 + subhead */}
      <section
        style={{
          borderBottom: "1px solid var(--border-default)",
          background: "var(--bg-canvas)",
        }}
      >
        <div
          style={{
            ...CONTAINER,
            padding: "56px 32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-fg)",
              fontWeight: 600,
            }}
          >
            For voice AI vendors
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 44,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              fontWeight: 600,
              color: "var(--fg-1)",
              maxWidth: 760,
            }}
          >
            Reach voice AI builders before they pick a stack.
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
            SpeechStack is where developers and technical founders compare
            voice AI stacks, fork production templates, and decide which
            vendors make it into their builds. Sponsorship puts your name in
            front of that decision.
          </p>
        </div>
      </section>

      {/* Audience metrics */}
      <section
        style={{
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div
          style={{
            ...CONTAINER,
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <SectionEyebrow>Audience</SectionEyebrow>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 1,
              background: "var(--border-default)",
              border: "1px solid var(--border-default)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "var(--bg-surface-1)",
                  padding: "20px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  minHeight: 96,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--fg-3)",
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {m.label}
                </span>
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    color: "var(--fg-1)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What sponsors get */}
      <section
        style={{
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div
          style={{
            ...CONTAINER,
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionEyebrow>What sponsors get</SectionEyebrow>
            <h2 style={sectionHeadingStyle}>The deliverables.</h2>
          </div>
          <ol
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              counterReset: "deliverable",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {DELIVERABLES.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 16,
                  alignItems: "baseline",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--fg-3)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--fg-1)",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section
        style={{
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div
          style={{
            ...CONTAINER,
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionEyebrow>Pricing</SectionEyebrow>
            <h2 style={sectionHeadingStyle}>Slots and rates.</h2>
          </div>
          <div
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: 8,
              overflow: "hidden",
              background: "var(--bg-surface-1)",
            }}
          >
            <div
              role="row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px, 1.1fr) minmax(140px, 1fr) 2.2fr",
                gap: 0,
                background: "var(--bg-surface-2)",
                borderBottom: "1px solid var(--border-default)",
              }}
            >
              <PricingHeaderCell>Tier</PricingHeaderCell>
              <PricingHeaderCell>Price</PricingHeaderCell>
              <PricingHeaderCell>What it includes</PricingHeaderCell>
            </div>
            {PRICING.map((row, i) => (
              <div
                key={row.tier}
                role="row"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(160px, 1.1fr) minmax(140px, 1fr) 2.2fr",
                  gap: 0,
                  borderBottom:
                    i < PRICING.length - 1
                      ? "1px solid var(--border-default)"
                      : "none",
                }}
              >
                <PricingCell>
                  <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>
                    {row.tier}
                  </strong>
                </PricingCell>
                <PricingCell>
                  <strong
                    style={{
                      color: "var(--fg-1)",
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {row.price}
                  </strong>
                </PricingCell>
                <PricingCell>{row.includes}</PricingCell>
              </div>
            ))}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--fg-3)",
              maxWidth: 720,
            }}
          >
            {PRICING_FOOTNOTE}
          </p>
        </div>
      </section>

      {/* Why now */}
      <section
        style={{
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div
          style={{
            ...CONTAINER,
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionEyebrow>Why now</SectionEyebrow>
            <h2 style={sectionHeadingStyle}>The window is open.</h2>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--fg-2)",
              maxWidth: 720,
            }}
          >
            The EU AI Act takes full effect for general-purpose AI systems in
            August 2026. Voice AI is one of the categories buyers will be
            scrutinizing harder, and neutral comparison surfaces will matter
            more than they did a year ago. SpeechStack is early. Sponsor slots
            are cheap right now because the audience is still growing. That
            changes once the page ranks for the searches builders are running
            today.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div
          style={{
            ...CONTAINER,
            padding: "64px 32px 96px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <Link
            href="https://cal.com/zach-capshaw/sponsor-call"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "14px 22px",
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Book a 30-minute call with Zach
          </Link>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--fg-2)",
              maxWidth: 640,
            }}
          >
            Quick discovery call. No pitch deck. We&apos;ll figure out together
            whether SpeechStack is the right fit for your DevRel budget.
          </p>
        </div>
      </section>
    </>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 26,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  fontWeight: 600,
  color: "var(--fg-1)",
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--fg-3)",
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
      }}
    >
      {children}
    </span>
  );
}

function PricingHeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="columnheader"
      style={{
        padding: "12px 18px",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--fg-3)",
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
      }}
    >
      {children}
    </div>
  );
}

function PricingCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="cell"
      style={{
        padding: "16px 18px",
        fontSize: 14,
        lineHeight: 1.55,
        color: "var(--fg-2)",
      }}
    >
      {children}
    </div>
  );
}
