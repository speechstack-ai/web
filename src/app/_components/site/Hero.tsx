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
          maxWidth: 720,
          margin: "0 auto",
          padding: "40px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
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
            fontSize: 40,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Find the right voice AI stack.
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--fg-2)",
          }}
        >
          Curated recipes for STT · LLM · TTS · telephony.
        </p>
        <div
          style={{
            marginTop: 4,
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
      </div>
    </section>
  );
}
