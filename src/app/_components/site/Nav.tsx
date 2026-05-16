"use client";

import Link from "next/link";
import { Icon, BrandMark } from "./Icon";

type NavProps = {
  active?: string;
  theme: "dark" | "light";
  onTheme: () => void;
  onSearch?: () => void;
};

const ITEMS = [
  { id: "recipes", label: "recipes", href: "/" },
  { id: "vendors", label: "vendors", href: "/#recipes" },
  { id: "stacks", label: "stacks", href: "/#recipes" },
  { id: "submit", label: "submit", href: "/submit" },
] as const;

export function Nav({ active = "recipes", theme, onTheme, onSearch }: NavProps) {
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
          maxWidth: 1440,
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
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {ITEMS.map((it) => {
            const isActive = active === it.id;
            return (
              <Link
                key={it.id}
                href={it.href}
                style={{
                  padding: "6px 10px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isActive ? "var(--fg-1)" : "var(--fg-3)",
                  background: isActive ? "var(--bg-surface-2)" : "transparent",
                  transition:
                    "color 120ms var(--ease-out), background 120ms var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--fg-1)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--fg-3)";
                }}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ flex: 1 }} />
        <button
          onClick={onSearch}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            minWidth: 240,
            background: "var(--bg-surface-1)",
            border: "1px solid var(--border-default)",
            borderRadius: 4,
            color: "var(--fg-3)",
            fontSize: 13,
            fontFamily: "var(--font-sans)",
            cursor: "pointer",
          }}
        >
          <Icon name="search" size={14} />
          <span style={{ flex: 1, textAlign: "left" }}>
            search recipes, vendors, stacks…
          </span>
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
        </button>
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
          }}
        >
          <Icon name={theme === "light" ? "moon" : "sun"} size={16} />
        </button>
        <a
          href="https://github.com"
          title="GitHub"
          aria-label="GitHub"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 4,
            color: "var(--fg-2)",
            border: "1px solid var(--border-default)",
          }}
        >
          <Icon name="github" size={16} />
        </a>
        <Link
          href="/submit"
          style={{
            padding: "7px 14px",
            borderRadius: 4,
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "var(--font-sans)",
            cursor: "pointer",
            transition: "background 120ms var(--ease-out)",
            whiteSpace: "nowrap",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        >
          Submit recipe
        </Link>
      </div>
    </header>
  );
}
