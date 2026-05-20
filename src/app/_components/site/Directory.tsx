"use client";

import { useMemo, useState } from "react";
import { Hero } from "./Hero";
import {
  EMPTY_TECH_SELECTION,
  SearchAndFilter,
  matchesTechSelection,
  type TechSelection,
} from "./FilterBar";
import { RecipeGrid } from "./RecipeGrid";
import type { Recipe } from "~/types/recipe";

type DirectoryProps = {
  recipes: Recipe[];
};

function recipeCategory(r: Recipe): string {
  const useCase = r.use_case?.toLowerCase() ?? "";
  const industry = r.industry?.toLowerCase() ?? "";

  if (industry === "restaurant") return "Food & bev";
  if (industry === "healthcare" || industry === "dental") return "Healthcare";
  if (industry === "education") return "Education";

  if (useCase === "sales" || useCase === "lead-qualification") return "Sales";
  if (useCase === "technical-support" || useCase === "ivr-replacement") return "Support";
  if (useCase === "research-interview") return "Recruiting";
  if (useCase === "after-hours-receptionist" || useCase === "scheduling") return "Healthcare";
  if (useCase === "order-taking") return "Food & bev";

  return "Other";
}

const CATEGORY_ORDER = [
  "Sales",
  "Support",
  "Healthcare",
  "Food & bev",
  "Recruiting",
  "Education",
];

export function Directory({ recipes }: DirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<TechSelection>(EMPTY_TECH_SELECTION);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const r of recipes) set.add(recipeCategory(r));
    return Array.from(set).sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [recipes]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (activeCategory !== "all" && recipeCategory(r) !== activeCategory) return false;
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
  }, [recipes, activeCategory, selectedTech, query]);

  const clearAll = () => {
    setActiveCategory("all");
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
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SearchAndFilter
            recipes={recipes}
            query={query}
            setQuery={setQuery}
            selected={selectedTech}
            setSelected={setSelectedTech}
          />

          <CategoryTabs
            categories={categories}
            active={activeCategory}
            setActive={setActiveCategory}
          />

          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <RecipeGrid recipes={filtered} />
          )}
        </div>
      </section>
    </>
  );
}

function CategoryTabs({
  categories,
  active,
  setActive,
}: {
  categories: string[];
  active: string;
  setActive: (c: string) => void;
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
      <Chip label="All" active={active === "all"} onClick={() => setActive("all")} />
      {categories.map((c) => (
        <Chip
          key={c}
          label={c}
          active={active === c}
          onClick={() => setActive(c)}
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
      {label}
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
