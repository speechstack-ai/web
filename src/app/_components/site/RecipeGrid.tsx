"use client";

import Link from "next/link";
import { Fragment, useState, type MouseEvent } from "react";
import { Icon } from "./Icon";
import { VendorLogo, pickLogo } from "./VendorLogo";
import type { Recipe, RecipeBadge } from "~/types/recipe";

type RecipeGridProps = {
  recipes: Recipe[];
  view: "grid" | "list";
};

const BADGE_STYLES: Record<RecipeBadge, { bg: string; border: string; color: string; label: string }> = {
  verified: {
    bg: "rgba(63,185,80,0.12)",
    border: "rgba(63,185,80,0.3)",
    color: "var(--success)",
    label: "verified",
  },
  beta: {
    bg: "rgba(210,153,34,0.12)",
    border: "rgba(210,153,34,0.3)",
    color: "var(--warning)",
    label: "beta",
  },
  new: {
    bg: "rgba(0,146,184,0.12)",
    border: "rgba(0,146,184,0.3)",
    color: "var(--accent-fg)",
    label: "new",
  },
};

function PipelineChain({ recipe }: { recipe: Recipe }) {
  const steps: { label: string; value: string }[] = [];
  if (recipe.pipeline.telephony) steps.push({ label: "TEL", value: recipe.pipeline.telephony });
  steps.push({ label: "STT", value: recipe.pipeline.stt });
  steps.push({ label: "LLM", value: recipe.pipeline.llm });
  steps.push({ label: "TTS", value: recipe.pipeline.tts });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
      }}
    >
      {steps.map((s, i) => {
        const hasLogo = pickLogo(s.value) !== null;
        return (
          <Fragment key={s.label}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "var(--fg-4)",
                  letterSpacing: "0.06em",
                }}
              >
                {s.label}
              </span>
              {hasLogo && (
                <VendorLogo name={s.value} height={11} style={{ color: "var(--fg-2)" }} />
              )}
              <span style={{ color: "var(--fg-2)" }}>{s.value}</span>
            </span>
            {i < steps.length - 1 && (
              <span
                style={{
                  color: "var(--fg-4)",
                  margin: "0 8px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <Icon name="arrow-right" size={11} />
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      title="Copy raw prompt"
      aria-label="Copy raw prompt"
      style={{
        background: "transparent",
        border: "1px solid var(--border-default)",
        color: copied ? "var(--success)" : "var(--fg-3)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        padding: "2px 6px",
        borderRadius: 3,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Icon name={copied ? "check" : "copy"} size={11} />
      {copied ? "copied" : "prompt"}
    </button>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [hovered, setHovered] = useState(false);
  const badge = recipe.badge ? BADGE_STYLES[recipe.badge] : null;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        textAlign: "left",
        cursor: "pointer",
        background: "var(--bg-surface-1)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border-default)"}`,
        borderRadius: 6,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "border-color 120ms var(--ease-out)",
        fontFamily: "var(--font-sans)",
        color: "var(--fg-1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--fg-1)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {recipe.title}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              padding: "2px 6px",
              borderRadius: 3,
              color: "var(--fg-2)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface-2)",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <VendorLogo name={recipe.framework} height={11} />
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
              {badge.label}
            </span>
          )}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--fg-2)" }}>
        {recipe.description}
      </p>
      <PipelineChain recipe={recipe} />
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          paddingTop: 8,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <Metric label="latency" value={recipe.metrics.latency} />
        <Metric label="cost" value={recipe.metrics.cost_per_minute} />
        {typeof recipe.forks === "number" && (
          <Metric label="forks" value={String(recipe.forks)} />
        )}
        <div style={{ flex: 1 }} />
        <CopyPromptButton prompt={recipe.raw_prompt} />
        {typeof recipe.stars === "number" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "var(--fg-3)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          >
            <Icon name="star" size={12} />
            <span>{recipe.stars}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--fg-3)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-1)",
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function RecipeGrid({ recipes, view }: RecipeGridProps) {
  if (view === "list") {
    return (
      <div
        style={{
          border: "1px solid var(--border-default)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 0.7fr 2fr 0.7fr 0.7fr 0.4fr",
            padding: "10px 16px",
            background: "var(--bg-surface-1)",
            borderBottom: "1px solid var(--border-default)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          <span>recipe</span>
          <span>framework</span>
          <span>pipeline</span>
          <span>latency</span>
          <span>cost</span>
          <span style={{ textAlign: "right" }}>★</span>
        </div>
        {recipes.map((r, i) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            style={{
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
              cursor: "pointer",
              display: "grid",
              gridTemplateColumns: "2fr 0.7fr 2fr 0.7fr 0.7fr 0.4fr",
              padding: "12px 16px",
              alignItems: "center",
              background: "transparent",
              borderBottom:
                i < recipes.length - 1 ? "1px solid var(--border-subtle)" : "none",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--fg-1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-surface-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontWeight: 500 }}>{r.title}</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <VendorLogo name={r.framework} height={12} />
              {r.framework}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-2)",
              }}
            >
              {r.pipeline.stt} · {r.pipeline.llm} · {r.pipeline.tts}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {r.metrics.latency}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {r.metrics.cost_per_minute}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--fg-3)",
                textAlign: "right",
              }}
            >
              {r.stars ?? "—"}
            </span>
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 12,
      }}
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
