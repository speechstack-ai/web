"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon, BrandMark } from "./Icon";
import { FRAMEWORKS } from "~/types/recipe";

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
          <NavLink href="#newsletter" label="Subscribe" />
          <CategoriesMenu />
          <NavLink href="/submit" label="Submit" />
        </nav>

        <div style={{ flex: 1 }} />

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
          href="https://github.com/speechstack-ai"
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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: "6px 10px",
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 500,
        textDecoration: "none",
        color: "var(--fg-3)",
        background: "transparent",
        transition: "color 120ms var(--ease-out), background 120ms var(--ease-out)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
    >
      {label}
    </Link>
  );
}

function CategoriesMenu() {
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

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 10px",
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 500,
          background: "transparent",
          color: "var(--fg-3)",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
      >
        Categories
        <Icon
          name="chevron-down"
          size={11}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 120ms var(--ease-out)",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 20,
            background: "var(--bg-surface-1)",
            border: "1px solid var(--border-strong)",
            borderRadius: 6,
            boxShadow: "var(--shadow-pop)",
            padding: 4,
            minWidth: 180,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CategoryItem href="/" label="All recipes" />
          {FRAMEWORKS.map((f) => (
            <CategoryItem
              key={f}
              href={`/?framework=${encodeURIComponent(f)}`}
              label={f}
            />
          ))}
          <div style={{ borderTop: "1px solid var(--border-default)", margin: "4px 0" }} />
          <CategoryItem href="/compare/vapi-vs-retell" label="Compare frameworks" />
        </div>
      )}
    </div>
  );
}

function CategoryItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        padding: "6px 8px",
        borderRadius: 4,
        fontSize: 13,
        color: "var(--fg-2)",
        textDecoration: "none",
        fontFamily: "var(--font-sans)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-surface-2)";
        e.currentTarget.style.color = "var(--fg-1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--fg-2)";
      }}
    >
      {label}
    </Link>
  );
}
