export function Hero() {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          maxWidth: 896,
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
            lineHeight: 1.6,
            color: "var(--fg-2)",
          }}
        >
          Open-source recipes for voice AI engineers. Each one shows the STT, LLM, TTS,
          and telephony layers plus the system prompt and config.
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--fg-3)",
          }}
        >
          Most voice AI comparison sites are vendor pages dressed up. This isn&rsquo;t.
        </p>
      </div>
    </section>
  );
}
