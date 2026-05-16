"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";
import {
  FRAMEWORKS,
  STT_ENGINES,
  TTS_ENGINES,
  parseLatencyMs,
  type Framework,
  type Recipe,
  type STTEngine,
  type TTSEngine,
} from "~/types/recipe";

type FilterRailProps = {
  recipes: Recipe[];
  activeFramework: Framework | "all";
  setActiveFramework: (f: Framework | "all") => void;
  activeStt: STTEngine[];
  toggleStt: (s: STTEngine) => void;
  activeTts: TTSEngine[];
  toggleTts: (t: TTSEngine) => void;
  maxLatency: number;
  setMaxLatency: (n: number) => void;
};

function countByFramework(recipes: Recipe[], f: Framework): number {
  return recipes.filter((r) => r.framework === f).length;
}

function countByStt(recipes: Recipe[], s: STTEngine): number {
  return recipes.filter((r) => r.pipeline.stt.toLowerCase().includes(s.toLowerCase())).length;
}

function countByTts(recipes: Recipe[], t: TTSEngine): number {
  return recipes.filter((r) => r.pipeline.tts.toLowerCase().includes(t.toLowerCase())).length;
}

export function FilterRail({
  recipes,
  activeFramework,
  setActiveFramework,
  activeStt,
  toggleStt,
  activeTts,
  toggleTts,
  maxLatency,
  setMaxLatency,
}: FilterRailProps) {
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        position: "sticky",
        top: 64,
        alignSelf: "flex-start",
      }}
    >
      <FilterGroup label="Framework">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FrameworkRow
            label="All"
            count={recipes.length}
            active={activeFramework === "all"}
            onClick={() => setActiveFramework("all")}
          />
          {FRAMEWORKS.map((f) => (
            <FrameworkRow
              key={f}
              label={f}
              count={countByFramework(recipes, f)}
              active={activeFramework === f}
              onClick={() => setActiveFramework(f)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="STT engine">
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {STT_ENGINES.map((s) => (
            <CheckRow
              key={s}
              label={s}
              count={countByStt(recipes, s)}
              checked={activeStt.includes(s)}
              onToggle={() => toggleStt(s)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="TTS engine">
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {TTS_ENGINES.map((t) => (
            <CheckRow
              key={t}
              label={t}
              count={countByTts(recipes, t)}
              checked={activeTts.includes(t)}
              onToggle={() => toggleTts(t)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Max p50 latency">
        <div style={{ padding: "0 6px", display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="range"
            min={50}
            max={400}
            step={10}
            value={maxLatency}
            onChange={(e) => setMaxLatency(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent)" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-3)",
            }}
          >
            <span>50ms</span>
            <span style={{ color: "var(--fg-1)" }}>≤ {maxLatency}ms</span>
            <span>400ms</span>
          </div>
        </div>
      </FilterGroup>
    </aside>
  );
}

function FrameworkRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        borderRadius: 4,
        background: active ? "var(--bg-surface-2)" : "transparent",
        color: active ? "var(--fg-1)" : "var(--fg-2)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontSize: 13,
        fontFamily: "var(--font-sans)",
        fontWeight: active ? 500 : 400,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = "var(--fg-1)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = "var(--fg-2)";
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-3)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

function CheckRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 8px",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 13,
        color: "var(--fg-2)",
      }}
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
      <span style={{ flex: 1, color: checked ? "var(--fg-1)" : "var(--fg-2)" }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-3)",
        }}
      >
        {count}
      </span>
    </label>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
          padding: "0 8px",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export { parseLatencyMs };
