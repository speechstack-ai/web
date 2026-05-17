"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Hero } from "./Hero";
import { FilterBar } from "./FilterBar";
import { RecipeGrid } from "./RecipeGrid";
import {
  parseLatencyMs,
  type Framework,
  type Recipe,
  type STTEngine,
  type TTSEngine,
} from "~/types/recipe";

type DirectoryProps = {
  recipes: Recipe[];
};

export function Directory({ recipes }: DirectoryProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeFramework, setActiveFramework] = useState<Framework | "all">("all");
  const [activeStt, setActiveStt] = useState<STTEngine[]>([]);
  const [activeTts, setActiveTts] = useState<TTSEngine[]>([]);
  const [maxLatency, setMaxLatency] = useState(400);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (activeFramework !== "all" && r.framework !== activeFramework) return false;
      if (
        activeStt.length &&
        !activeStt.some((s) => r.pipeline.stt.toLowerCase().includes(s.toLowerCase()))
      ) {
        return false;
      }
      if (
        activeTts.length &&
        !activeTts.some((t) => r.pipeline.tts.toLowerCase().includes(t.toLowerCase()))
      ) {
        return false;
      }
      if (parseLatencyMs(r.metrics.latency) > maxLatency) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = [
          r.title,
          r.description,
          r.framework,
          r.pipeline.stt,
          r.pipeline.llm,
          r.pipeline.tts,
          r.pipeline.telephony ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [recipes, activeFramework, activeStt, activeTts, maxLatency, query]);

  const toggleStt = (s: STTEngine) =>
    setActiveStt((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleTts = (t: TTSEngine) =>
    setActiveTts((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const clear = () => {
    setActiveFramework("all");
    setActiveStt([]);
    setActiveTts([]);
    setMaxLatency(400);
    setQuery("");
  };

  const hasFilters =
    activeFramework !== "all" ||
    activeStt.length > 0 ||
    activeTts.length > 0 ||
    maxLatency < 400 ||
    query.length > 0;

  return (
    <>
      <Hero query={query} setQuery={setQuery} />

      <section
        id="recipes"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "32px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <FilterBar
            recipes={recipes}
            activeFramework={activeFramework}
            setActiveFramework={setActiveFramework}
            activeStt={activeStt}
            toggleStt={toggleStt}
            activeTts={activeTts}
            toggleTts={toggleTts}
            maxLatency={maxLatency}
            setMaxLatency={setMaxLatency}
            onClearAll={clear}
            hasFilters={hasFilters}
          />

          <DirectoryToolbar
            count={filtered.length}
            view={view}
            setView={setView}
            heading={activeFramework === "all" ? "All recipes" : `${activeFramework} recipes`}
          />

          {filtered.length === 0 ? (
            <EmptyState onClear={clear} />
          ) : (
            <RecipeGrid recipes={filtered} view={view} />
          )}
        </div>
      </section>
    </>
  );
}

type ToolbarProps = {
  count: number;
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  heading: string;
};

function DirectoryToolbar({ count, view, setView, heading }: ToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
        >
          {heading}
        </h2>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--fg-3)",
          }}
        >
          {count} results
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <select
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            padding: "5px 10px",
            background: "var(--bg-surface-1)",
            color: "var(--fg-2)",
            border: "1px solid var(--border-default)",
            borderRadius: 4,
            cursor: "pointer",
          }}
          defaultValue="trending"
        >
          <option value="trending">sort: trending</option>
          <option value="newest">sort: newest</option>
          <option value="lowest-latency">sort: lowest latency</option>
          <option value="lowest-cost">sort: lowest cost</option>
        </select>
        <div
          style={{
            display: "inline-flex",
            border: "1px solid var(--border-default)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <ViewBtn active={view === "grid"} onClick={() => setView("grid")} icon="grid" />
          <ViewBtn active={view === "list"} onClick={() => setView("list")} icon="list" />
        </div>
      </div>
    </div>
  );
}

function ViewBtn({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: IconName;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={icon === "grid" ? "Grid view" : "List view"}
      style={{
        padding: "5px 8px",
        background: active ? "var(--bg-surface-2)" : "transparent",
        color: active ? "var(--fg-1)" : "var(--fg-3)",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Icon name={icon} size={14} />
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
        Either no recipe matches these filters, or you&apos;ve stumbled into a gap in the
        directory.
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
        <Link
          href="/submit"
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
          Submit a recipe
        </Link>
      </div>
    </div>
  );
}
