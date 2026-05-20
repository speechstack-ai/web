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
          Voice AI Stack Library
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
          Every voice AI stack, in one place.
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--fg-2)",
          }}
        >
          Pick a stack, copy the prompts and configs, ship the agent this week.
        </p>
      </div>
    </section>
  );
}
