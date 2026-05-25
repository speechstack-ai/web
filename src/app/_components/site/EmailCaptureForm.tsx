"use client";

import { useState } from "react";
import posthog from "posthog-js";

type EmailCaptureLocation = "homepage" | "submit" | "recipe-detail";

type EmailCaptureFormProps = {
  location: EmailCaptureLocation;
};

export function EmailCaptureForm({ location }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    let response: Response;

    try {
      response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, location }),
      });
    } catch {
      setStatus("error");
      setMessage("Could not subscribe that email. Try again in a minute.");
      return;
    }

    if (response.ok) {
      setStatus("success");
      setEmail("");
      setMessage("You’re on the list. Check your inbox for the first note.");
      if (posthog.__loaded) {
        posthog.capture("email_subscribe_succeeded", { location });
      }
      return;
    }

    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    setStatus("error");
    setMessage(
      body?.error ?? "Could not subscribe that email. Try again in a minute.",
    );
  }

  return (
    <section
      aria-labelledby={`email-capture-${location}`}
      style={{
        border: "1px solid var(--border-default)",
        background:
          "linear-gradient(135deg, var(--bg-surface-1), var(--bg-surface-2))",
        borderRadius: 8,
        padding: "28px 32px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Voice Notes
        </span>
        <h2
          id={`email-capture-${location}`}
          style={{
            margin: 0,
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Voice AI recipes, picks, and analysis.
        </h2>
        <p
          style={{
            margin: 0,
            color: "var(--fg-2)",
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          Get the useful new templates plus the occasional teardown of what’s
          working in production voice AI.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <label
          style={{
            flex: "1 1 260px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <span
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            Email address
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
            style={{
              width: "100%",
              minHeight: 42,
              border: "1px solid var(--border-default)",
              borderRadius: 6,
              background: "var(--bg-canvas)",
              color: "var(--fg-1)",
              padding: "0 12px",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
            }}
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            minHeight: 42,
            padding: "0 16px",
            border: "none",
            borderRadius: 6,
            background: "var(--accent)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: status === "loading" ? "wait" : "pointer",
            opacity: status === "loading" ? 0.72 : 1,
          }}
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          role={status === "error" ? "alert" : "status"}
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.5,
            color: status === "error" ? "var(--danger)" : "var(--success)",
          }}
        >
          {message}
        </p>
      )}
    </section>
  );
}
