import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "120px 32px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
        }}
      >
        404
      </span>
      <h1
        style={{
          margin: 0,
          fontSize: 36,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontWeight: 600,
          color: "var(--fg-1)",
        }}
      >
        404. The stack you&apos;re looking for doesn&apos;t live here.
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--fg-2)",
          maxWidth: 520,
        }}
      >
        Maybe we don&apos;t have it yet. Maybe you typed a URL nobody&apos;s
        typed before. Either way, try the directory or submit yours.
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <Link
          href="/templates"
          style={{
            padding: "10px 18px",
            background: "var(--accent)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Browse templates
        </Link>
        <Link
          href="/submit"
          style={{
            padding: "10px 18px",
            background: "transparent",
            color: "var(--fg-1)",
            textDecoration: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            border: "1px solid var(--border-strong)",
          }}
        >
          Submit a template
        </Link>
      </div>
    </main>
  );
}
