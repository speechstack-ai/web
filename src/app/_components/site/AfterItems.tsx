import Link from "next/link";
import { Icon } from "./Icon";

export function AfterItems() {
  return (
    <div
      style={{
        maxWidth: 896,
        margin: "0 auto",
        padding: "64px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 80,
      }}
    >
      <SubmitBlock />
    </div>
  );
}

function SubmitBlock() {
  return (
    <section
      style={{
        border: "1px dashed var(--border-strong)",
        background: "transparent",
        borderRadius: 8,
        padding: "32px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          Built a stack worth forking?
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Open a PR or drop it in the form.
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>
          Both land in the same queue.
        </p>
      </div>
      <Link
        href="/submit"
        style={{
          padding: "10px 18px",
          background: "var(--accent)",
          color: "#fff",
          textDecoration: "none",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        Submit a template
        <Icon name="arrow-right" size={13} />
      </Link>
    </section>
  );
}
