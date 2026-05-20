"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Tooltip } from "./Tooltip";
import { VendorLogo, pickLogo, vendorLabel } from "./VendorLogo";
import { displayBadge, type DisplayBadge, type Recipe } from "~/types/recipe";

type RecipeGridProps = {
  recipes: Recipe[];
};

const BADGE_STYLES: Record<DisplayBadge, { bg: string; border: string; color: string; label: string }> = {
  verified: {
    bg: "rgba(63,185,80,0.12)",
    border: "rgba(63,185,80,0.3)",
    color: "var(--success)",
    label: "verified",
  },
  new: {
    bg: "rgba(0,146,184,0.12)",
    border: "rgba(0,146,184,0.3)",
    color: "var(--accent-fg)",
    label: "new",
  },
};

function StatusBadge({ kind }: { kind: DisplayBadge }) {
  const badge = BADGE_STYLES[kind];
  return (
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
        flexShrink: 0,
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
  );
}

function TechBadges({ recipe }: { recipe: Recipe }) {
  const names = [
    recipe.framework,
    recipe.pipeline.stt,
    recipe.pipeline.llm,
    recipe.pipeline.tts,
    recipe.pipeline.telephony ?? "",
  ];
  const seen = new Set<string>();
  const slugs: { name: string; slug: string }[] = [];
  for (const n of names) {
    const slug = pickLogo(n);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push({ name: n, slug });
  }
  if (slugs.length === 0) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
      }}
    >
      {slugs.map((s) => {
        const label = vendorLabel(s.name) ?? s.name;
        return (
          <Fragment key={s.slug}>
            <Tooltip label={label}>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  background: "var(--bg-surface-2)",
                  border: "1px solid var(--border-default)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--fg-2)",
                }}
                aria-label={label}
              >
                <VendorLogo name={s.name} height={12} />
              </span>
            </Tooltip>
          </Fragment>
        );
      })}
    </div>
  );
}

function RecipeRow({
  recipe,
  index,
  isLast,
}: {
  recipe: Recipe;
  index: number;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const badgeKind = displayBadge(recipe);
  return (
    <Link
      href={`/templates/${recipe.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        textDecoration: "none",
        color: "var(--fg-1)",
        background: hovered ? "var(--bg-surface-2)" : "transparent",
        borderBottom: isLast ? "none" : "1px solid var(--border-subtle)",
        transition: "background-color 120ms var(--ease-out)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-4)",
          width: 20,
          flexShrink: 0,
          textAlign: "left",
          fontVariantNumeric: "tabular-nums",
        }}
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--fg-1)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {recipe.title}
        </span>
        <span
          style={{
            fontSize: 13,
            color: "var(--fg-3)",
            lineHeight: 1.45,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {recipe.description}
        </span>
      </div>
      <TechBadges recipe={recipe} />
      {badgeKind && <StatusBadge kind={badgeKind} />}
    </Link>
  );
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div
      style={{
        border: "1px solid var(--border-default)",
        borderRadius: 6,
        overflow: "hidden",
        background: "var(--bg-surface-1)",
      }}
    >
      {recipes.map((r, i) => (
        <RecipeRow
          key={r.id}
          recipe={r}
          index={i}
          isLast={i === recipes.length - 1}
        />
      ))}
    </div>
  );
}
