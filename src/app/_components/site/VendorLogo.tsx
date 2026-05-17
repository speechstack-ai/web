import type { CSSProperties } from "react";

type LogoSlug =
  | "vapi"
  | "retell"
  | "livekit"
  | "pipecat"
  | "bland"
  | "deepgram"
  | "assemblyai"
  | "cartesia"
  | "elevenlabs"
  | "openai"
  | "anthropic"
  | "twilio";

const LOGO_META: Record<LogoSlug, { aspect: number; label: string }> = {
  vapi: { aspect: 512 / 280, label: "Vapi" },
  retell: { aspect: 72 / 20, label: "Retell" },
  livekit: { aspect: 1, label: "LiveKit" },
  pipecat: { aspect: 1, label: "Pipecat" },
  bland: { aspect: 1440 / 493, label: "Bland" },
  deepgram: { aspect: 1, label: "Deepgram" },
  assemblyai: { aspect: 31.8962 / 27.8708, label: "AssemblyAI" },
  cartesia: { aspect: 72 / 24, label: "Cartesia" },
  elevenlabs: { aspect: 1, label: "ElevenLabs" },
  openai: { aspect: 1, label: "OpenAI" },
  anthropic: { aspect: 1, label: "Anthropic" },
  twilio: { aspect: 1, label: "Twilio" },
};

/** Maps any free-form vendor / pipeline string to a logo slug, or null when we don't have an asset. */
export function pickLogo(name: string): LogoSlug | null {
  const n = name.toLowerCase().trim();
  if (n.startsWith("vapi")) return "vapi";
  if (n.startsWith("retell")) return "retell";
  if (n.startsWith("livekit")) return "livekit";
  if (n.startsWith("pipecat")) return "pipecat";
  if (n.startsWith("bland")) return "bland";
  if (n.startsWith("deepgram")) return "deepgram";
  if (n.startsWith("assemblyai")) return "assemblyai";
  // OpenAI products
  if (n.startsWith("whisper") || n.startsWith("gpt-") || n.startsWith("gpt ") || n.startsWith("openai")) {
    return "openai";
  }
  // Anthropic products
  if (n.startsWith("claude") || n.startsWith("anthropic")) return "anthropic";
  if (n.startsWith("cartesia")) return "cartesia";
  if (n.startsWith("elevenlabs") || n.startsWith("eleven labs")) return "elevenlabs";
  if (n.startsWith("twilio")) return "twilio";
  return null;
}

type VendorLogoProps = {
  /** The free-form vendor name from data (e.g. "Deepgram Nova-3", "claude-3.5-haiku"). */
  name: string;
  /** Rendered height in px. Width is computed from intrinsic aspect ratio. */
  height?: number;
  /** Optional accessible name override; defaults to the canonical label for the slug, or the raw name. */
  title?: string;
  /** Optional CSS override. */
  style?: CSSProperties;
};

/**
 * Renders the vendor logo with currentColor tinting (via CSS mask).
 * Returns null when no logo asset is available — callers can render text fallback.
 */
export function VendorLogo({ name, height = 14, title, style }: VendorLogoProps) {
  const slug = pickLogo(name);
  if (!slug) return null;
  const meta = LOGO_META[slug];
  const width = Math.max(1, Math.round(height * meta.aspect));
  const url = `url(/brand/vendors/${slug}.svg)`;
  return (
    <span
      role="img"
      aria-label={title ?? meta.label}
      title={title ?? meta.label}
      style={{
        display: "inline-block",
        width,
        height,
        backgroundColor: "currentColor",
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

/**
 * Vendor logo with a graceful text fallback when no asset exists.
 * Useful in dense places where omitting the vendor entirely would be confusing.
 */
export function VendorMark({
  name,
  height = 14,
  fontSize = 11,
}: {
  name: string;
  height?: number;
  fontSize?: number;
}) {
  const slug = pickLogo(name);
  if (slug) return <VendorLogo name={name} height={height} />;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize,
        color: "currentColor",
        lineHeight: 1,
      }}
    >
      {name}
    </span>
  );
}
