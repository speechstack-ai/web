import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

const SUBMIT_DESCRIPTION =
  "Two paths in. Both land in the same review queue. We hold every submission to a four-criteria bar before it ships.";

export const metadata: Metadata = {
  title: "Submit a template",
  description: SUBMIT_DESCRIPTION,
  alternates: { canonical: "/submit" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/submit`,
    siteName: SITE_NAME,
    title: `Submit a template · ${SITE_NAME}`,
    description: SUBMIT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `Submit a template · ${SITE_NAME}`,
    description: SUBMIT_DESCRIPTION,
  },
};

const sectionHeadingStyle = {
  margin: 0,
  fontSize: 22,
  lineHeight: 1.2,
  letterSpacing: "-0.015em",
  fontWeight: 600,
  color: "var(--fg-1)",
} as const;

const bodyParagraphStyle = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.65,
  color: "var(--fg-2)",
} as const;

const inlineCodeStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.92em",
} as const;

const linkStyle = {
  color: "var(--fg-1)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
} as const;

export default function SubmitPage() {
  return (
    <main
      style={{
        maxWidth: 896,
        margin: "0 auto",
        padding: "80px 32px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 56,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          Submit
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 44,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Submit a template.
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--fg-2)",
            maxWidth: 640,
          }}
        >
          Two paths in. Both land in the same review queue. We hold every
          submission to a four-criteria bar before it ships.
        </p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={sectionHeadingStyle}>Path 1 · Pull request</h2>
        <p style={bodyParagraphStyle}>
          The developer-comfortable route. Fork the{" "}
          <a
            href="https://github.com/speechstack-ai/recipes"
            style={linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            recipes repo
          </a>
          , add your template as a JSON file matching the schema, open a PR.
          We&apos;ll review against the four-criteria bar and merge when it
          passes.
        </p>
        <p style={bodyParagraphStyle}>
          Schema reference:{" "}
          <code style={inlineCodeStyle}>public/data/recipes.json</code> shows
          the canonical shape. Six fields are required: framework, stack,
          prompt, config, source URL, and the cost/latency band you measured.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={sectionHeadingStyle}>Path 2 · Form</h2>
        <p style={bodyParagraphStyle}>
          Not in the mood for a PR? Paste the stack, prompt, config, source
          URL, and a sentence about the outcome. We&apos;ll do the schema
          conversion. Expect a review within a week. Approved submissions ship
          as <code style={inlineCodeStyle}>verified: false</code> until we
          test-run them.
        </p>
        {/* Tally embed pending — form ID to be added by Zach */}
        <div
          id="tally-form-placeholder"
          style={{
            border: "1px dashed var(--border-1)",
            borderRadius: 8,
            padding: "48px 24px",
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
          }}
        >
          Form embed coming soon
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={sectionHeadingStyle}>The bar</h2>
        <p style={bodyParagraphStyle}>
          Four criteria. Every submission gets checked against them. If a
          submission fails any, it doesn&apos;t ship.
        </p>
        <ol
          style={{
            margin: 0,
            paddingLeft: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--fg-2)",
          }}
        >
          <li>
            <strong style={{ color: "var(--fg-1)" }}>
              Schema-able artifact
            </strong>{" "}
            — the template fits the JSON schema. No prose-only entries.
          </li>
          <li>
            <strong style={{ color: "var(--fg-1)" }}>
              Forkable or copyable
            </strong>{" "}
            — the prompt, config, and stack are concrete enough that a builder
            can clone them.
          </li>
          <li>
            <strong style={{ color: "var(--fg-1)" }}>
              Specific named outcome
            </strong>{" "}
            — the template solves one named use case, not &lsquo;general voice
            agents&rsquo;.
          </li>
          <li>
            <strong style={{ color: "var(--fg-1)" }}>
              Multi-component stack
            </strong>{" "}
            — at least two tools wired together (STT + LLM, or LLM + telephony,
            etc.).
          </li>
        </ol>
        <p style={bodyParagraphStyle}>
          Templates ship with <code style={inlineCodeStyle}>verified: false</code>{" "}
          until Zach has placed a test call or run the workflow personally. The
          verified flag flips only after that.
        </p>
      </section>
    </main>
  );
}
