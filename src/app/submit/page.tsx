import type { Metadata } from "next";
import Link from "next/link";

import { CopyBlock } from "~/app/_components/site/CopyBlock";
import { Icon } from "~/app/_components/site/Icon";
import { getRecipeById } from "~/utils/getRecipes";

export const metadata: Metadata = {
  title: "Submit a recipe · SpeechStack",
  description:
    "Add your production voice AI recipe to SpeechStack — fork the repo, drop a JSON entry, open a pull request.",
};

const REPO_URL = "https://github.com/speechstack/speechstack";

export default function SubmitPage() {
  const example = getRecipeById("support-realtime");
  const schemaJson = example ? JSON.stringify(example, null, 2) : "{}";

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
          SpeechStack is a flat-file directory. Every recipe is a JSON entry in{" "}
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
            public/data/recipes.json
          </code>{" "}
          on GitHub. To list yours, open a pull request. Reviews are usually merged within
          48 hours.
        </p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Step
          n={1}
          title="Fork the repo"
          body="Click below to fork. You only need to edit one file."
        >
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
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
            }}
          >
            <Icon name="github" size={13} />
            Open the repo on GitHub
            <Icon name="external" size={12} />
          </a>
        </Step>

        <Step
          n={2}
          title={`Add an entry to public/data/recipes.json`}
          body="Append a new object to the JSON array. Keep the field order below — it's the canonical schema. Every field is required except the ones marked optional in src/types/recipe.ts."
        >
          <CopyBlock label="recipes.json entry (example)" code={schemaJson} maxHeight={420} />
        </Step>

        <Step
          n={3}
          title="Open a pull request"
          body="A maintainer reads every PR. We'll ask for tweaks if the schema or copy is off, then merge. Your recipe appears on the directory on the next deploy — usually within minutes of merge."
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <a
              href={`${REPO_URL}/compare`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
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
              }}
            >
              <Icon name="external" size={13} />
              Start a pull request
            </a>
            <Link
              href="/"
              style={{
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
              }}
            >
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
          gap: 6,
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
          Review guidelines
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
            The <code style={{ fontFamily: "var(--font-mono)" }}>github_source_url</code>{" "}
            must point at a public, runnable example — not a private repo.
          </li>
          <li>
            <code style={{ fontFamily: "var(--font-mono)" }}>raw_prompt</code> is the actual
            production prompt. Redact API keys; keep the system instructions intact.
          </li>
          <li>
            Latency and cost figures should reflect a real production run, not the vendor&apos;s
            best-case marketing number.
          </li>
          <li>
            We don&apos;t merge marketing-shaped recipes. Be specific. Be terse.
          </li>
        </ul>
      </aside>
    </article>
  );
}

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
