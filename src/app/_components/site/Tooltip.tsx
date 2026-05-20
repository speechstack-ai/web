"use client";

import { useRef, useState, type ReactNode } from "react";

type TooltipProps = {
  label: string;
  children: ReactNode;
  /** Maximum width in px for wrapped tooltip text. Default behavior is no wrap. */
  maxWidth?: number;
};

export function Tooltip({ label, children, maxWidth }: TooltipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const show = () => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: r.left + r.width / 2, y: r.top });
  };
  const hide = () => setPos(null);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {children}
      </span>
      {pos && (
        <span
          role="tooltip"
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y - 8,
            transform: "translate(-50%, -100%)",
            padding: "4px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            lineHeight: 1.4,
            whiteSpace: maxWidth ? "normal" : "nowrap",
            maxWidth: maxWidth ?? undefined,
            background: "var(--bg-surface-3)",
            color: "var(--fg-1)",
            border: "1px solid var(--border-strong)",
            borderRadius: 4,
            boxShadow: "var(--shadow-pop)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {label}
        </span>
      )}
    </>
  );
}
