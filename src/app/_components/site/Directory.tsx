"use client";

import { useMemo, useState } from "react";
import { Hero } from "./Hero";
import {
  EMPTY_TECH_SELECTION,
  SearchAndFilter,
  matchesTechSelection,
  type TechSelection,
} from "./FilterBar";
import { EmailCaptureForm } from "./EmailCaptureForm";
import { RecipeGrid } from "./RecipeGrid";
import {
  getTopScore,
  getTrendingScore,
  isNewRecipe,
  sortRecipesByScore,
} from "~/types/recipe";
import type { Recipe } from "~/types/recipe";

type DirectoryProps = {
  recipes: Recipe[];
};

const SEGMENTS = ["trending", "top", "new"] as const;
type Segment = (typeof SEGMENTS)[number];

export function Directory({ recipes }: DirectoryProps) {
  const [activeSegment, setActiveSegment] = useState<Segment>("trending");
  const [selectedTech, setSelectedTech] = useState<TechSelection>(EMPTY_TECH_SELECTION);
  const [query, setQuery] = useState("");

  const segmented = useMemo(() => {
    const newRecipes = recipes.filter((recipe) => isNewRecipe(recipe)).sort((a, b) => {
      const at = Date.parse(a.created_at);
      const bt = Date.parse(b.created_at);
      if (Number.isFinite(bt) && Number.isFinite(at) && bt !== at) return bt - at;
      return a.title.localeCompare(b.title);
    });

    return {
      trending: sortRecipesByScore(recipes, getTrendingScore),
      top: sortRecipesByScore(recipes, getTopScore),
      new: newRecipes,
    };
  }, [recipes]);

  const filtered = useMemo(() => {
    const segmentRecipes = segmented[activeSegment];

    return segmentRecipes.filter((r) => {
      if (!matchesTechSelection(r, selectedTech)) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = [
          r.title,
          r.description,
          r.framework,
          r.use_case,
          r.industry,
          r.pipeline.stt,
          r.pipeline.llm,
          r.pipeline.tts,
          r.pipeline.telephony ?? "",
          ...(r.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [segmented, activeSegment, selectedTech, query]);

  const clearAll = () => {
    setActiveSegment("trending");
    setSelectedTech(EMPTY_TECH_SELECTION);
    setQuery("");
  };

  return (
    <>
      <Hero />

      <section
        id="recipes"
        style={{ maxWidth: 896, margin: "0 auto", padding: "24px 32px 48px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SearchAndFilter
            recipes={recipes}
            query={query}
            setQuery={setQuery}
            selected={selectedTech}
            setSelected={setSelectedTech}
          />

          <SegmentTabs active={activeSegment} setActive={setActiveSegment} />

          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <RecipeGrid recipes={filtered} />
          )}
        </div>
      </section>
      <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 32px 48px" }}>
        <EmailCaptureForm location="homepage" />
      </div>
    </>
  );
}

function SegmentTabs({
  active,
  setActive,
}: {
  active: Segment;
  setActive: (segment: Segment) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
      }}
    >
      {SEGMENTS.map((segment) => (
        <Chip
          key={segment}
          label={segment}
          active={active === segment}
          onClick={() => setActive(segment)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: "6px 12px",
        borderRadius: 9999,
        background: active ? "var(--accent-soft)" : "var(--bg-surface-1)",
        border: `1px solid ${active ? "var(--accent)" : "var(--border-default)"}`,
        color: active ? "var(--accent-fg)" : "var(--fg-2)",
        fontSize: 13,
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        cursor: "pointer",
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "var(--bg-surface-2)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "var(--bg-surface-1)";
      }}
    >
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </button>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div
      style={{
        border: "1px dashed var(--border-strong)",
        borderRadius: 6,
        padding: 56,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 17, fontWeight: 600, color: "var(--fg-1)" }}>
        Nothing here yet.
      </span>
      <span style={{ fontSize: 13, color: "var(--fg-2)", maxWidth: 340 }}>
        Either no template matches these filters, or you&apos;ve stumbled into a gap in the
        library.
      </span>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          onClick={onClear}
          style={{
            padding: "7px 12px",
            background: "transparent",
            color: "var(--fg-1)",
            border: "1px solid var(--border-default)",
            borderRadius: 4,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Clear filters
        </button>
        <a
          href="https://github.com/speechstack-ai/recipes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "7px 12px",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Submit a template
        </a>
      </div>
    </div>
  );
}
