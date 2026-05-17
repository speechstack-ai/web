"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

type Size = "md" | "lg";

export function NewsletterForm({ size = "md" }: { size?: Size }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitted">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("submitted");
  }

  const padY = size === "lg" ? 12 : 8;
  const padX = size === "lg" ? 16 : 12;
  const fontSize = size === "lg" ? 14 : 13;

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--bg-canvas)",
          border: "1px solid var(--border-default)",
          borderRadius: 6,
          padding: `${padY}px ${padX}px`,
          flex: 1,
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@startup.com"
          aria-label="Email address"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--fg-1)",
            fontSize,
            fontFamily: "var(--font-sans)",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={state === "submitted"}
        style={{
          padding: `${padY + 1}px ${padX + 2}px`,
          borderRadius: 6,
          background: state === "submitted" ? "var(--success)" : "var(--accent)",
          color: "#fff",
          border: "none",
          fontSize,
          fontWeight: 500,
          fontFamily: "var(--font-sans)",
          cursor: state === "submitted" ? "default" : "pointer",
          whiteSpace: "nowrap",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {state === "submitted" ? (
          <>
            <Icon name="check" size={13} />
            Subscribed
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
