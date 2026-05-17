"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import {
  FRAMEWORKS,
  STT_ENGINES,
  TTS_ENGINES,
  type Framework,
  type Recipe,
  type STTEngine,
  type TTSEngine,
} from "~/types/recipe";

type FilterBarProps = {
  recipes: Recipe[];
  activeFramework: Framework | "all";
  setActiveFramework: (f: Framework | "all") => void;
  activeStt: STTEngine[];
  toggleStt: (s: STTEngine) => void;
  activeTts: TTSEngine[];
  toggleTts: (t: TTSEngine) => void;
  maxLatency: number;
  setMaxLatency: (n: number) => void;
  onClearAll: () => void;
  hasFilters: boolean;
};

export function FilterBar({
  recipes,
  activeFramework,
  setActiveFramework,
  activeStt,
  toggleStt,
  activeTts,
  toggleTts,
  maxLatency,
  setMaxLatency,
  onClearAll,
  hasFilters,
}: FilterBarProps) {
  const frameworkCount = (f: Framework) =>
    recipes.filter((r) => r.framework === f).length;
  const sttCount = (s: STTEngine) =>
    recipes.filter((r) => r.pipeline.stt.toLowerCase().includes(s.toLowerCase())).length;
  const ttsCount = (t: TTSEngine) =>
    recipes.filter((r) => r.pipeline.tts.toLowerCase().includes(t.toLowerCase())).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <Dropdown
          label="Framework"
          value={activeFramework === "all" ? null : activeFramework}
          activeCount={activeFramework === "all" ? 0 : 1}
        >
          <DropdownPanel>
            <DropdownRow
              label="All"
              count={recipes.length}
              active={activeFramework === "all"}
              onClick={() => setActiveFramework("all")}
            />
            {FRAMEWORKS.map((f) => (
              <DropdownRow
                key={f}
                label={f}
                count={frameworkCount(f)}
                active={activeFramework === f}
                onClick={() => setActiveFramework(f)}
              />
            ))}
          </DropdownPanel>
        </Dropdown>

        <Dropdown label="STT engine" activeCount={activeStt.length}>
          <DropdownPanel>
            {STT_ENGINES.map((s) => (
              <DropdownCheck
                key={s}
                label={s}
                count={sttCount(s)}
                checked={activeStt.includes(s)}
                onToggle={() => toggleStt(s)}
              />
            ))}
          </DropdownPanel>
        </Dropdown>

        <Dropdown label="TTS engine" activeCount={activeTts.length}>
          <DropdownPanel>
            {TTS_ENGINES.map((t) => (
              <DropdownCheck
                key={t}
                label={t}
                count={ttsCount(t)}
                checked={activeTts.includes(t)}
                onToggle={() => toggleTts(t)}
              />
            ))}
          </DropdownPanel>
        </Dropdown>

        <Dropdown
          label="Max latency"
          value={maxLatency < 400 ? `≤ ${maxLatency}ms` : null}
          activeCount={maxLatency < 400 ? 1 : 0}
        >
          <DropdownPanel width={240}>
            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
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
          </DropdownPanel>
        </Dropdown>

        {hasFilters && (
          <button
            type="button"
            onClick={onClearAll}
            style={{
              padding: "6px 10px",
              background: "transparent",
              border: "1px dashed var(--border-strong)",
              borderRadius: 4,
              color: "var(--fg-2)",
              fontSize: 12,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon name="close" size={11} />
            Clear all
          </button>
        )}
      </div>

      {hasFilters && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          <span style={{ marginRight: 4 }}>active:</span>
          {activeFramework !== "all" && (
            <Tag label={activeFramework} onRemove={() => setActiveFramework("all")} />
          )}
          {activeStt.map((s) => (
            <Tag key={`stt-${s}`} label={`stt:${s}`} onRemove={() => toggleStt(s)} />
          ))}
          {activeTts.map((t) => (
            <Tag key={`tts-${t}`} label={`tts:${t}`} onRemove={() => toggleTts(t)} />
          ))}
          {maxLatency < 400 && (
            <Tag label={`≤ ${maxLatency}ms`} onRemove={() => setMaxLatency(400)} />
          )}
        </div>
      )}
    </div>
  );
}

function Dropdown({
  label,
  value,
  activeCount,
  children,
}: {
  label: string;
  value?: string | null;
  activeCount: number;
  children: ReactNode;
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

  const isActive = activeCount > 0;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          borderRadius: 4,
          background: isActive ? "var(--accent-soft)" : "var(--bg-surface-1)",
          border: `1px solid ${isActive ? "var(--accent)" : "var(--border-default)"}`,
          color: "var(--fg-1)",
          fontSize: 13,
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <span style={{ color: isActive ? "var(--accent-fg)" : "var(--fg-2)" }}>{label}</span>
        {value && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-1)" }}>
            {value}
          </span>
        )}
        {activeCount > 1 && (
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
            }}
          >
            {activeCount}
          </span>
        )}
        <Icon
          name="chevron-down"
          size={12}
          style={{
            color: "var(--fg-3)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 120ms var(--ease-out)",
          }}
        />
      </button>
      {open && <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 20 }}>{children}</div>}
    </div>
  );
}

function DropdownPanel({ children, width }: { children: ReactNode; width?: number }) {
  return (
    <div
      style={{
        width: width ?? 220,
        background: "var(--bg-surface-1)",
        border: "1px solid var(--border-strong)",
        borderRadius: 6,
        padding: 4,
        boxShadow: "var(--shadow-pop)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function DropdownRow({
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
      type="button"
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
        if (!active) e.currentTarget.style.background = "var(--bg-surface-2)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>
        {count}
      </span>
    </button>
  );
}

function DropdownCheck({
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
        padding: "6px 8px",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 13,
        color: "var(--fg-2)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-surface-2)")}
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
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>
        {count}
      </span>
    </label>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 4px 2px 8px",
        background: "var(--bg-surface-2)",
        border: "1px solid var(--border-default)",
        borderRadius: 9999,
        color: "var(--fg-1)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--fg-3)",
          cursor: "pointer",
          padding: "1px 4px",
          display: "inline-flex",
          alignItems: "center",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
      >
        <Icon name="close" size={10} />
      </button>
    </span>
  );
}
