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

export type LogoVariant = "lockup" | "mark";

type LogoMeta = {
  label: string;
  /** Aspect ratios (width / height) for each variant. */
  aspect: Record<LogoVariant, number>;
  /** When false, mark requests fall back to the lockup file. */
  hasMark: boolean;
};

const LOGO_META: Record<LogoSlug, LogoMeta> = {
  vapi:       { label: "Vapi",       aspect: { lockup: 676 / 192,         mark: 750 / 380 },         hasMark: true  },
  retell:     { label: "Retell",     aspect: { lockup: 659 / 227,         mark: 1 },                 hasMark: true  },
  livekit:    { label: "LiveKit",    aspect: { lockup: 1,                 mark: 1 },                 hasMark: true  },
  pipecat:    { label: "Pipecat",    aspect: { lockup: 1,                 mark: 1 },                 hasMark: true  },
  bland:      { label: "Bland",      aspect: { lockup: 1278 / 358,        mark: 276 / 349 },         hasMark: true  },
  deepgram:   { label: "Deepgram",   aspect: { lockup: 694 / 90,          mark: 1 },                 hasMark: true  },
  assemblyai: { label: "AssemblyAI", aspect: { lockup: 120.243 / 19.7034, mark: 31.8962 / 27.8708 }, hasMark: true  },
  cartesia:   { label: "Cartesia",   aspect: { lockup: 734 / 164,         mark: 1 },                 hasMark: true  },
  elevenlabs: { label: "ElevenLabs", aspect: { lockup: 146 / 32,          mark: 1 },                 hasMark: true  },
  openai:     { label: "OpenAI",     aspect: { lockup: 1,                 mark: 1 },                 hasMark: true  },
  anthropic:  { label: "Anthropic",  aspect: { lockup: 1,                 mark: 1 },                 hasMark: true  },
  twilio:     { label: "Twilio",     aspect: { lockup: 1,                 mark: 1 },                 hasMark: true  },
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
  if (n.startsWith("whisper") || n.startsWith("gpt-") || n.startsWith("gpt ") || n.startsWith("openai")) {
    return "openai";
  }
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
  /** Which representation to render. `mark` is the icon only; `lockup` is the full wordmark (or wordmark+icon). */
  variant?: LogoVariant;
  /** Optional accessible name override; defaults to the canonical label for the slug. */
  title?: string;
  /** Optional CSS override. */
  style?: CSSProperties;
};

/**
 * Renders the vendor logo with currentColor tinting (via CSS mask).
 * Returns null when no logo asset is available — callers can render text fallback.
 */
export function VendorLogo({ name, height = 14, variant = "mark", title, style }: VendorLogoProps) {
  const slug = pickLogo(name);
  if (!slug) return null;
  const meta = LOGO_META[slug];
  const useMark = variant === "mark" && meta.hasMark;
  const aspect = useMark ? meta.aspect.mark : meta.aspect.lockup;
  const width = Math.max(1, Math.round(height * aspect));
  const file = useMark ? `${slug}-mark.svg` : `${slug}.svg`;
  const url = `url(/brand/vendors/${file})`;
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
  variant = "mark",
}: {
  name: string;
  height?: number;
  fontSize?: number;
  variant?: LogoVariant;
}) {
  const slug = pickLogo(name);
  if (slug) return <VendorLogo name={name} height={height} variant={variant} />;
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
