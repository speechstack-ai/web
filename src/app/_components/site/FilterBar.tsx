"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";
import { VendorLogo, pickLogo } from "./VendorLogo";
import type { Recipe } from "~/types/recipe";

export const MIN_COUNT = 5;

export type TechCategory =
  | "framework"
  | "stt"
  | "llm"
  | "tts"
  | "telephony"
  | "useCase"
  | "industry";

export type TechSelection = Record<TechCategory, string[]>;

export const EMPTY_TECH_SELECTION: TechSelection = {
  framework: [],
  stt: [],
  llm: [],
  tts: [],
  telephony: [],
  useCase: [],
  industry: [],
};

const CATEGORY_LABELS: Record<TechCategory, string> = {
  framework: "Framework",
  stt: "STT",
  llm: "LLM",
  tts: "TTS",
  telephony: "Telephony",
  useCase: "Use case",
  industry: "Industry",
};

const CATEGORY_ORDER: TechCategory[] = [
  "framework",
  "stt",
  "tts",
  "useCase",
  "industry",
  "llm",
  "telephony",
];

function pipelineValue(r: Recipe, c: TechCategory): string | null {
  switch (c) {
    case "framework":
      return r.framework;
    case "stt":
      return r.pipeline.stt;
    case "llm":
      return r.pipeline.llm;
    case "tts":
      return r.pipeline.tts;
    case "telephony":
      return r.pipeline.telephony ?? null;
    case "useCase":
      return r.use_case;
    case "industry":
      return r.industry;
  }
}

export function getVisibleFilterOptions(
  recipes: Recipe[],
): Record<TechCategory, string[]> {
  const counts: Record<TechCategory, Map<string, number>> = {
    framework: new Map(),
    stt: new Map(),
    llm: new Map(),
    tts: new Map(),
    telephony: new Map(),
    useCase: new Map(),
    industry: new Map(),
  };

  for (const r of recipes) {
    for (const c of CATEGORY_ORDER) {
      const v = pipelineValue(r, c);
      if (!v) continue;
      counts[c].set(v, (counts[c].get(v) ?? 0) + 1);
    }
  }

  return Object.fromEntries(
    CATEGORY_ORDER.map((c) => [
      c,
      Array.from(counts[c])
        .filter(([, count]) => count >= MIN_COUNT)
        .map(([value]) => value)
        .sort((a, b) => a.localeCompare(b)),
    ]),
  ) as Record<TechCategory, string[]>;
}

export function matchesTechSelection(r: Recipe, sel: TechSelection): boolean {
  for (const c of CATEGORY_ORDER) {
    if (sel[c].length === 0) continue;
    const v = pipelineValue(r, c);
    if (!v || !sel[c].includes(v)) return false;
  }
  return true;
}

type SearchAndFilterProps = {
  recipes: Recipe[];
  query: string;
  setQuery: (q: string) => void;
  selected: TechSelection;
  setSelected: (next: TechSelection) => void;
};

export function SearchAndFilter({
  recipes,
  query,
  setQuery,
  selected,
  setSelected,
}: SearchAndFilterProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <label
          htmlFor="template-search"
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
        >
          Search templates
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--bg-surface-1)",
            border: "1px solid var(--border-strong)",
            borderRadius: 6,
            padding: "10px 14px",
          }}
        >
          <Icon name="search" size={16} style={{ color: "var(--fg-3)" }} />
          <input
            id="template-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="try “realtime support”, “outbound”, “gpt-4o + cartesia”…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--fg-1)",
              fontSize: 14,
              fontFamily: "var(--font-sans)",
            }}
          />
        </div>
      </div>
      <FilterButton
        recipes={recipes}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

function FilterButton({
  recipes,
  selected,
  setSelected,
}: {
  recipes: Recipe[];
  selected: TechSelection;
  setSelected: (next: TechSelection) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = useMemo(() => getVisibleFilterOptions(recipes), [recipes]);
  const totalSelected = CATEGORY_ORDER.reduce(
    (n, c) => n + selected[c].length,
    0,
  );

  const toggle = (c: TechCategory, v: string) => {
    const current = selected[c];
    const next = current.includes(v)
      ? current.filter((x) => x !== v)
      : [...current, v];
    setSelected({ ...selected, [c]: next });
  };

  const clear = () => setSelected(EMPTY_TECH_SELECTION);
  const isActive = totalSelected > 0;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 6,
          background: isActive ? "var(--accent-soft)" : "var(--bg-surface-1)",
          border: `1px solid ${isActive ? "var(--accent)" : "var(--border-strong)"}`,
          color: "var(--fg-1)",
          fontSize: 14,
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <Icon name="filter" size={14} style={{ color: "var(--fg-2)" }} />
        Filter
        {totalSelected > 0 && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-on-accent)",
              background: "var(--accent)",
              borderRadius: 9999,
              padding: "0 6px",
              minWidth: 18,
              textAlign: "center",
              lineHeight: "16px",
            }}
          >
            {totalSelected}
          </span>
        )}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            zIndex: 20,
            width: 320,
            maxHeight: 480,
            overflow: "auto",
            background: "var(--bg-surface-1)",
            border: "1px solid var(--border-strong)",
            borderRadius: 6,
            boxShadow: "var(--shadow-pop)",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 6px 8px",
            }}
          >
            <span
              style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-1)" }}
            >
              Filter by tech
            </span>
            {totalSelected > 0 && (
              <button
                type="button"
                onClick={clear}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--fg-3)",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Clear all
              </button>
            )}
          </div>
          {CATEGORY_ORDER.map((c) => {
            const opts = options[c];
            if (opts.length === 0) return null;
            return (
              <div
                key={c}
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--fg-3)",
                    fontWeight: 600,
                    padding: "8px 6px 4px",
                  }}
                >
                  {CATEGORY_LABELS[c]}
                </span>
                {opts.map((v) => (
                  <CheckRow
                    key={`${c}:${v}`}
                    label={v}
                    checked={selected[c].includes(v)}
                    onToggle={() => toggle(c, v)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  const hasLogo = pickLogo(label) !== null;
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 8px",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 13,
        color: "var(--fg-2)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--bg-surface-2)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          border: `1px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
          background: checked ? "var(--accent)" : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {checked && <Icon name="check" size={10} strokeWidth={3} />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{ display: "none" }}
      />
      {hasLogo && (
        <span
          style={{
            color: "var(--fg-2)",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <VendorLogo name={label} height={11} />
        </span>
      )}
      <span style={{ flex: 1, color: checked ? "var(--fg-1)" : "var(--fg-2)" }}>
        {label}
      </span>
    </label>
  );
}
