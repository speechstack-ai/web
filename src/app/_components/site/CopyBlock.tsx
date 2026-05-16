"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type CopyBlockProps = {
  /** Filename-style label shown in the header strip (e.g. "config.json"). */
  label: string;
  /** The text that will be copied and rendered inside the <pre>. */
  code: string;
  /** Optional max height in px for the scroll region. */
  maxHeight?: number;
  /** Optional CSS font-family override (defaults to var(--font-mono)). */
  fontFamily?: string;
};

export function CopyBlock({ label, code, maxHeight = 360, fontFamily }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore — clipboard API may be unavailable
    }
  };

  return (
    <div
      style={{
        border: "1px solid var(--border-default)",
        borderRadius: 6,
        overflow: "hidden",
        background: "var(--bg-surface-3)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: "var(--bg-surface-2)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          {label}
        </span>
        <button
          type="button"
          onClick={onCopy}
          style={{
            background: "transparent",
            border: "1px solid var(--border-strong)",
            color: copied ? "var(--success)" : "var(--fg-2)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 3,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            transition: "color 120ms var(--ease-out)",
          }}
        >
          <Icon name={copied ? "check" : "copy"} size={11} />
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: 14,
          fontFamily: fontFamily ?? "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.6,
          color: "var(--fg-1)",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {code}
      </pre>
    </div>
  );
}
