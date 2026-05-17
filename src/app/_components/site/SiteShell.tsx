"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Nav } from "./Nav";

type Theme = "dark" | "light";

type SiteShellContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const SiteShellContext = createContext<SiteShellContextValue | null>(null);

export function useSiteShell(): SiteShellContextValue {
  const ctx = useContext(SiteShellContext);
  if (!ctx) throw new Error("useSiteShell must be used inside <SiteShell>");
  return ctx;
}

type SiteShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export function SiteShell({ children, footer }: SiteShellProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ss-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      // ignore — localStorage may be unavailable
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("ss-theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <SiteShellContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          background: "var(--bg-canvas)",
          color: "var(--fg-1)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav theme={theme} onTheme={toggleTheme} />
        <div style={{ flex: 1 }}>{children}</div>
        {footer}
      </div>
    </SiteShellContext.Provider>
  );
}
