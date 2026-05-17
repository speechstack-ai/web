import type { Metadata } from "next";
import Link from "next/link";

import { CopyBlock } from "~/app/_components/site/CopyBlock";
import { Icon } from "~/app/_components/site/Icon";

export const metadata: Metadata = {
  title: "Submit a recipe · SpeechStack",
  description:
    "Add your production voice AI recipe to SpeechStack — fork the recipes repo, copy the template, open a pull request.",
};

const REPO_URL = "https://github.com/speechstack-ai/recipes";
const TEMPLATE_URL = `${REPO_URL}/blob/main/recipes/_template.json`;
const SCHEMA_URL = `${REPO_URL}/blob/main/schema/recipe.schema.json`;
const CONTRIBUTING_URL = `${REPO_URL}/blob/main/CONTRIBUTING.md`;
const NEW_PR_URL = `${REPO_URL}/compare`;

const TEMPLATE_JSON = `{
  "id": "framework-industry-descriptor",
  "slug": "framework-industry-descriptor",
  "title": "Replace with a clear, descriptive title",
  "description": "Replace with a one-paragraph description: what does the agent do, who's it for, what problem does it solve.",
  "framework": "Vapi",
  "use_case": "scheduling",
  "industry": "healthcare",
  "languages": ["en-US"],
  "pipeline": {
    "stt": "Deepgram Nova-3",
    "llm": "Claude Sonnet 4.5",
    "tts": "Cartesia Sonic-3",
    "telephony": "Twilio SIP"
  },
  "metrics": {
    "latency_p50_ms": 600,
    "latency_p95_ms": 900,
    "latency_display": "~500-700ms",
    "cost_per_minute_usd_min": 0.09,
    "cost_per_minute_usd_max": 0.14,
    "cost_display": "$0.09 - $0.14"
  },
  "raw_prompt": null,
  "prompt_file": "prompts/framework-industry-descriptor.md",
  "config": {
    "voice_id": null,
    "temperature": 0.1,
    "barge_in": true,
    "interruption_threshold_ms": 200,
    "tools": []
  },
  "github_source_url": "https://github.com/your-org/your-repo",
  "demo_url": null,
  "tags": [],
  "contributor": {
    "github": "your-github-username",
    "twitter": null,
    "name": null,
    "website": null
  },
  "source": "direct_pr",
  "verified": false,
  "featured": false,
  "created_at": "2026-05-16T00:00:00Z",
  "updated_at": "2026-05-16T00:00:00Z",
  "license": "MIT",
  "notes": null
}`;

export default function SubmitPage() {
  return (
    <article
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "48px 32px 80px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Community
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--fg-1)",
          }}
        >
          Submit a recipe
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--fg-2)",
            maxWidth: 600,
          }}
        >
          Recipes live in the open-source{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent-fg)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 14,
            }}
          >
            speechstack-ai/recipes
          </a>{" "}
          repo — one JSON file per recipe under{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              background: "var(--bg-surface-3)",
              border: "1px solid var(--border-default)",
              padding: "1px 6px",
              borderRadius: 4,
              color: "var(--fg-1)",
            }}
          >
            recipes/
          </code>
          , validated against{" "}
          <a
            href={SCHEMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent-fg)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            schema/recipe.schema.json
          </a>
          . If you&apos;ve shipped a voice agent, contributing should take under 10 minutes.
          PRs are usually reviewed within 48 hours.
        </p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Step n={1} title="Fork the repo" body="One click. You only edit one file (two, if your prompt is long).">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={primaryCta}
          >
            <Icon name="github" size={13} />
            Open speechstack-ai/recipes
            <Icon name="external" size={12} />
          </a>
        </Step>

        <Step
          n={2}
          title="Copy the template"
          body={`Copy recipes/_template.json to recipes/your-recipe-slug.json. The slug pattern is {framework}-{industry-or-use-case}-{descriptor} — e.g. "vapi-dental-scheduler", "retell-saas-onboarding", "livekit-multilingual-support".`}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <a href={TEMPLATE_URL} target="_blank" rel="noopener noreferrer" style={ghostCta}>
              <Icon name="external" size={12} />
              View _template.json on GitHub
            </a>
          </div>
        </Step>

        <Step
          n={3}
          title="Fill in every required field"
          body="Reference the schema for the full spec. For prompts longer than ~200 words, drop the body into recipes/prompts/your-recipe-slug.md and reference it via prompt_file."
        >
          <CopyBlock label="recipes/_template.json" code={TEMPLATE_JSON} maxHeight={420} />
        </Step>

        <Step
          n={4}
          title="Validate locally"
          body="Optional but recommended. CI runs the same checks on every PR."
        >
          <CopyBlock label="bash" code={`npm install\nnpm run validate`} maxHeight={120} />
        </Step>

        <Step
          n={5}
          title="Open a pull request"
          body="CI runs validation automatically. We aim to review within 48 hours. Once merged, your recipe appears here on the next deploy."
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <a href={NEW_PR_URL} target="_blank" rel="noopener noreferrer" style={primaryCta}>
              <Icon name="external" size={13} />
              Start a pull request
            </a>
            <a
              href={CONTRIBUTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={ghostCta}
            >
              <Icon name="external" size={12} />
              Read CONTRIBUTING.md
            </a>
            <Link href="/" style={mutedCta}>
              Back to the directory
            </Link>
          </div>
        </Step>
      </section>

      <aside
        style={{
          border: "1px solid var(--border-default)",
          background: "var(--bg-surface-1)",
          borderRadius: 6,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          What we look for
        </span>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--fg-2)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <li>
            A <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>real, working voice agent</strong>
            . We can tell when something&apos;s been built versus theorized.
          </li>
          <li>
            A <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>public source</strong>: GitHub
            repo, demo video, blog post with code, or live demo URL.
          </li>
          <li>
            The <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>full stack</strong> named —
            telephony, STT, LLM, TTS, framework.
          </li>
          <li>
            <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>Real economics</strong>: cost per
            minute and latency from a production run, not a vendor&apos;s best-case marketing number.
          </li>
          <li>
            Vendor names matching the canonical list in{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>data/vendors.json</code> —
            if your stack uses one not on the list, propose its addition in the same PR.
          </li>
        </ul>
      </aside>
    </article>
  );
}

const primaryCta: React.CSSProperties = {
  padding: "8px 14px",
  background: "var(--accent)",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  textDecoration: "none",
  alignSelf: "flex-start",
};

const ghostCta: React.CSSProperties = {
  padding: "8px 14px",
  background: "transparent",
  border: "1px solid var(--border-default)",
  color: "var(--fg-1)",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  textDecoration: "none",
};

const mutedCta: React.CSSProperties = {
  padding: "8px 14px",
  background: "transparent",
  border: "1px solid var(--border-default)",
  color: "var(--fg-2)",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  textDecoration: "none",
};

function Step({
  n,
  title,
  body,
  children,
}: {
  n: number;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 9999,
          background: "var(--bg-surface-2)",
          border: "1px solid var(--border-strong)",
          color: "var(--fg-1)",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--fg-2)",
          }}
        >
          {body}
        </p>
        {children}
      </div>
    </div>
  );
}
