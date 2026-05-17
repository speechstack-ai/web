import Link from "next/link";
import { Fragment } from "react";
import { CopyBlock } from "./CopyBlock";
import { Icon } from "./Icon";
import { VendorLogo, pickLogo } from "./VendorLogo";
import {
  displayBadge,
  formatCost,
  formatLatency,
  promptFileUrl,
  type DisplayBadge,
  type Recipe,
} from "~/types/recipe";

const BADGE_STYLES: Record<DisplayBadge, { bg: string; border: string; color: string }> = {
  verified: {
    bg: "rgba(63,185,80,0.12)",
    border: "rgba(63,185,80,0.3)",
    color: "var(--success)",
  },
  new: {
    bg: "rgba(0,146,184,0.12)",
    border: "rgba(0,146,184,0.3)",
    color: "var(--accent-fg)",
  },
};

function formatUpdatedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function RecipeDetailPage({ recipe }: { recipe: Recipe }) {
  const badgeKind = displayBadge(recipe);
  const badge = badgeKind ? BADGE_STYLES[badgeKind] : null;

  const steps: { label: string; value: string }[] = [];
  if (recipe.pipeline.telephony) steps.push({ label: "telephony", value: recipe.pipeline.telephony });
  steps.push({ label: "stt", value: recipe.pipeline.stt });
  steps.push({ label: "llm", value: recipe.pipeline.llm });
  steps.push({ label: "tts", value: recipe.pipeline.tts });

  const configJson = JSON.stringify(recipe.config ?? {}, null, 2);
  const tools = recipe.config?.tools ?? [];
  const promptLink = promptFileUrl(recipe);

  return (
    <article
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "32px 32px 64px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
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
          }}
        >
          ← all recipes
        </Link>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          recipes / <span style={{ color: "var(--fg-2)" }}>{recipe.id}</span>
        </span>
      </div>

      <header style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 3,
              color: "var(--fg-2)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface-2)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <VendorLogo name={recipe.framework} height={13} />
            {recipe.framework}
          </span>
          {badge && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                padding: "1px 6px",
                borderRadius: 3,
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                color: badge.color,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: badge.color,
                  borderRadius: 9999,
                }}
              />
              {badgeKind}
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-3)",
            }}
          >
            updated {formatUpdatedAt(recipe.updated_at)} · {recipe.industry} ·{" "}
            {recipe.use_case}
          </span>
        </div>
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
          {recipe.title}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--fg-2)",
            maxWidth: 640,
          }}
        >
          {recipe.description}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 4 }}>
          {recipe.demo_url ? (
            <a
              href={recipe.demo_url}
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
              }}
            >
              <Icon name="play" size={13} />
              Try the demo
            </a>
          ) : (
            <span
              title="No live demo available"
              style={{
                padding: "8px 14px",
                background: "transparent",
                border: "1px solid var(--border-default)",
                color: "var(--fg-3)",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                cursor: "not-allowed",
              }}
            >
              <Icon name="play" size={13} />
              No demo yet
            </span>
          )}
          {recipe.github_source_url && (
            <a
              href={recipe.github_source_url}
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
              View on GitHub
            </a>
          )}
          <a
            href={`https://github.com/speechstack-ai/recipes/blob/main/recipes/${recipe.slug}.json`}
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
            Edit this recipe
          </a>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid var(--border-default)",
          borderRadius: 6,
          overflow: "hidden",
          background: "var(--bg-surface-1)",
        }}
      >
        <DetailMetric label="latency" value={formatLatency(recipe)} />
        <DetailMetric label="cost / min" value={formatCost(recipe)} border />
        <div
          style={{
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            borderLeft: "1px solid var(--border-default)",
            background: "var(--bg-surface-1)",
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
            framework
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--fg-1)",
            }}
          >
            <VendorLogo name={recipe.framework} height={20} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {recipe.framework}
            </span>
          </span>
        </div>
      </div>

      <Section label="Pipeline">
        <div
          style={{
            border: "1px solid var(--border-default)",
            borderRadius: 6,
            background: "var(--bg-surface-1)",
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: 12,
          }}
        >
          {steps.map((s, i) => {
            const hasLogo = pickLogo(s.value) !== null;
            return (
              <Fragment key={s.label}>
                <div
                  style={{
                    border: "1px solid var(--border-strong)",
                    borderRadius: 4,
                    padding: "8px 12px",
                    background: "var(--bg-surface-2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 4,
                    minWidth: 130,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--fg-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "var(--fg-1)",
                    }}
                  >
                    {hasLogo && <VendorLogo name={s.value} height={14} />}
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {s.value}
                    </span>
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ color: "var(--fg-4)" }}>
                    <Icon name="arrow-right" size={14} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </Section>

      <Section label="Prompt">
        {recipe.raw_prompt ? (
          <CopyBlock
            label="raw_prompt"
            code={recipe.raw_prompt}
            maxHeight={320}
            fontFamily="var(--font-mono)"
          />
        ) : promptLink ? (
          <a
            href={promptLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px dashed var(--border-strong)",
              borderRadius: 6,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--accent-fg)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
            }}
          >
            <Icon name="external" size={13} />
            View prompt file: {recipe.prompt_file}
          </a>
        ) : (
          <div
            style={{
              border: "1px dashed var(--border-strong)",
              borderRadius: 6,
              padding: 16,
              fontSize: 13,
              color: "var(--fg-3)",
            }}
          >
            No prompt published.
          </div>
        )}
      </Section>

      <Section label="Config">
        <CopyBlock label="config.json" code={configJson} maxHeight={360} />
      </Section>

      {tools.length > 0 && (
        <Section label="Tools">
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {tools.map((tool) => (
              <li
                key={tool.name}
                style={{
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-surface-1)",
                  borderRadius: 6,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--fg-1)",
                    fontWeight: 500,
                  }}
                >
                  {tool.name}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--fg-2)",
                    lineHeight: 1.5,
                  }}
                >
                  {tool.description}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {recipe.tags && recipe.tags.length > 0 && (
        <Section label="Tags">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {recipe.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 9999,
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-surface-1)",
                  color: "var(--fg-2)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
      )}

      <footer
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-3)",
          paddingTop: 12,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>
          contributed by{" "}
          <a
            href={`https://github.com/${recipe.contributor.github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-fg)", textDecoration: "none" }}
          >
            @{recipe.contributor.github}
          </a>{" "}
          · {recipe.license} · source: {recipe.source.replaceAll("_", " ")}
        </span>
        <span>languages: {recipe.languages.join(", ")}</span>
      </footer>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {children}
    </section>
  );
}

function DetailMetric({
  label,
  value,
  border,
}: {
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div
      style={{
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderLeft: border ? "1px solid var(--border-default)" : "none",
        background: "var(--bg-surface-1)",
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
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 20,
          color: "var(--fg-1)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </span>
    </div>
  );
}
