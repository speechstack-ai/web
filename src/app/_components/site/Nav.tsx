"use client";

import Link from "next/link";
import { Icon, BrandMark } from "./Icon";

type NavProps = {
  theme: "dark" | "light";
  onTheme: () => void;
};

export function Nav({ theme, onTheme }: NavProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "color-mix(in srgb, var(--bg-canvas) 80%, transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "10px 32px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "var(--fg-1)",
          }}
        >
          <BrandMark size={22} />
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>SpeechStack</span>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginLeft: 8,
          }}
        >
          <NavLink href="/templates">Templates</NavLink>
          <NavLink href="/tools">Tools</NavLink>
        </nav>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href="/submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 32,
              padding: "0 12px",
              borderRadius: 4,
              background: "var(--accent)",
              color: "var(--fg-on-accent)",
              border: "1px solid var(--accent)",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition:
                "background 120ms var(--ease-out), border-color 120ms var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-hover)";
              e.currentTarget.style.borderColor = "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
          >
            Submit a template
          </Link>
          <button
            onClick={onTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 4,
              background: "transparent",
              color: "var(--fg-2)",
              border: "1px solid var(--border-default)",
              cursor: "pointer",
              transition:
                "background 120ms var(--ease-out), color 120ms var(--ease-out), border-color 120ms var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-surface-2)";
              e.currentTarget.style.color = "var(--fg-1)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--fg-2)";
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
          >
            <Icon name={theme === "light" ? "moon" : "sun"} size={16} />
          </button>
          <a
            href="https://github.com/speechstack-ai/recipes"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 4,
              background: "transparent",
              color: "var(--fg-2)",
              border: "1px solid var(--border-default)",
              transition:
                "background 120ms var(--ease-out), color 120ms var(--ease-out), border-color 120ms var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-surface-2)";
              e.currentTarget.style.color = "var(--fg-1)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--fg-2)";
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
          >
            <Icon name="github" size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: "var(--fg-2)",
        textDecoration: "none",
        transition: "color 120ms var(--ease-out)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--fg-1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--fg-2)";
      }}
    >
      {children}
    </Link>
  );
}
