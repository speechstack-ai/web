"use client";

import { Icon } from "./Icon";

type HeroProps = {
  query: string;
  setQuery: (q: string) => void;
};

export function Hero({ query, setQuery }: HeroProps) {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "56px 32px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 64,
          alignItems: "end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-fg)",
              fontWeight: 600,
            }}
          >
            The voice AI directory
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 600,
              color: "var(--fg-1)",
            }}
          >
            Find the right
            <br />
            voice AI stack.
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--fg-2)",
              maxWidth: 480,
            }}
          >
            Curated recipes across{" "}
            {(["Vapi", "Retell", "LiveKit", "Cartesia", "Pipecat", "ElevenLabs", "Bland"] as const).map(
              (name, i, arr) => (
                <span key={name}>
                  <span style={{ color: "var(--fg-1)", fontWeight: 500 }}>{name}</span>
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ),
            )}{" "}
            and the rest. STT, LLM, TTS, and glue.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <div
              style={{
                flex: 1,
                maxWidth: 520,
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
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-3)",
                  background: "var(--bg-surface-3)",
                  padding: "1px 5px",
                  borderRadius: 3,
                  border: "1px solid var(--border-default)",
                }}
              >
                ⌘K
              </span>
            </div>
            <button
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
                cursor: "pointer",
              }}
            >
              Browse all
            </button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Stat label="Recipes" value="127" sub="+12 this week" subAccent />
          <Stat label="Vendors" value="8" sub="covered" />
          <Stat label="P50 latency" value="187" unit="ms" sub="across stacks" />
          <Stat label="Avg cost" value="$0.04" unit="/min" sub="median stack" />
        </div>
      </div>
    </section>
  );
}

type StatProps = {
  label: string;
  value: string;
  unit?: string;
  sub: string;
  subAccent?: boolean;
};

function Stat({ label, value, unit, sub, subAccent }: StatProps) {
  return (
    <div
      style={{
        border: "1px solid var(--border-default)",
        borderRadius: 6,
        padding: 16,
        background: "var(--bg-surface-1)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
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
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--fg-1)",
        }}
      >
        {value}
        {unit && <span style={{ fontSize: 14, color: "var(--fg-3)" }}>{unit}</span>}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: subAccent ? "var(--accent-fg)" : "var(--fg-3)",
        }}
      >
        {sub}
      </span>
    </div>
  );
}
