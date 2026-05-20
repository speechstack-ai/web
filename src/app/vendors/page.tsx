/* eslint-disable @next/next/no-img-element -- internal vendor logo audit; raw <img> avoids next/image transformations so we can see the source SVG as-is */
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Vendor logos — internal",
  robots: { index: false, follow: false },
};

type Status = "ok" | "needs-replacement" | "missing";

type Vendor = {
  slug: string;
  label: string;
  mark: { status: Status; aspect: number; note?: string };
  lockup:
    | { status: "ok" | "needs-replacement"; aspect: number; note?: string }
    | { status: "none"; note?: string };
};

const VENDORS: Vendor[] = [
  {
    slug: "vapi",
    label: "Vapi",
    mark: {
      status: "ok",
      aspect: 1,
      note: "New file from vapi.ai/brand (va-square-1.svg, normalized to currentColor).",
    },
    lockup: {
      status: "ok",
      aspect: 700 / 220,
      note: "New file from vapi.ai/brand (full-logo-square-1.svg, background removed, viewBox cropped, normalized to currentColor).",
    },
  },
  {
    slug: "retell",
    label: "Retell",
    mark: {
      status: "ok",
      aspect: 1,
      note: "New mark from Retell's official logo kit (retellai.com/logos), normalized to currentColor.",
    },
    lockup: {
      status: "ok",
      aspect: 72 / 20,
      note: "Original retell.svg was the lockup — moved to retell-lockup.svg.",
    },
  },
  {
    slug: "livekit",
    label: "LiveKit",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "pipecat",
    label: "Pipecat",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "bland",
    label: "Bland",
    mark: {
      status: "ok",
      aspect: 110.299 / 28,
      note: "Bland has no separate icon mark — the official wordmark from bland.ai/images/bland-logo.svg is used as both mark and lockup. Normalized to currentColor.",
    },
    lockup: {
      status: "ok",
      aspect: 110.299 / 28,
      note: "Official wordmark from bland.ai/images/bland-logo.svg.",
    },
  },
  {
    slug: "deepgram",
    label: "Deepgram",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "assemblyai",
    label: "AssemblyAI",
    mark: { status: "ok", aspect: 31.8962 / 27.8708 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "cartesia",
    label: "Cartesia",
    mark: {
      status: "ok",
      aspect: 1,
      note: "New mark from play.cartesia.ai/logo.svg (the dithered 'C' monogram), normalized to currentColor.",
    },
    lockup: {
      status: "none",
      note: "Cartesia's wordmark uses a custom GT Sectra serif and isn't published as a public SVG — treating as mark-only with plaintext name fallback.",
    },
  },
  {
    slug: "elevenlabs",
    label: "ElevenLabs",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "openai",
    label: "OpenAI",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "anthropic",
    label: "Anthropic",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
  {
    slug: "twilio",
    label: "Twilio",
    mark: { status: "ok", aspect: 1 },
    lockup: { status: "none", note: "Mark-only vendor — site will render mark + plaintext name." },
  },
];

const MARK_PX = 32;
const LOCKUP_PX = 56;

const STATUS_STYLES: Record<
  Status | "none",
  { label: string; bg: string; fg: string }
> = {
  ok: { label: "OK", bg: "rgba(63, 185, 80, 0.16)", fg: "#3fb950" },
  "needs-replacement": {
    label: "Needs replacement",
    bg: "rgba(248, 81, 73, 0.16)",
    fg: "#f85149",
  },
  missing: {
    label: "Missing",
    bg: "rgba(210, 153, 34, 0.16)",
    fg: "#d29922",
  },
  none: {
    label: "No lockup (mark + text)",
    bg: "var(--bg-surface-3)",
    fg: "var(--fg-3)",
  },
};

function StatusPill({ status }: { status: Status | "none" }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      style={{
        display: "inline-block",
        background: s.bg,
        color: s.fg,
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono)",
      }}
    >
      {s.label}
    </span>
  );
}

function maskStyle(src: string, width: number, height: number) {
  const url = `url(${src})`;
  return {
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
  } as const;
}

function Cell({
  title,
  children,
  background,
  color,
}: {
  title: string;
  children: React.ReactNode;
  background: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          background,
          color,
          border: "1px solid var(--border-default)",
          borderRadius: 8,
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 96,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PlaintextLockup({
  label,
  src,
  height,
  aspect,
  background,
  color,
}: {
  label: string;
  src: string;
  height: number;
  aspect: number;
  background: string;
  color: string;
}) {
  const markHeight = Math.round(height * 0.6);
  const markWidth = Math.max(1, Math.round(markHeight * aspect));
  return (
    <div
      style={{
        background,
        color,
        border: "1px dashed var(--border-default)",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        minHeight: 96,
      }}
    >
      <span aria-hidden style={maskStyle(src, markWidth, markHeight)} />
      <span
        style={{
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function VendorRow({ vendor }: { vendor: Vendor }) {
  const { slug, label, mark, lockup } = vendor;
  const markSrc = `/brand/vendors/${slug}.svg`;
  const lockupSrc = `/brand/vendors/${slug}-lockup.svg`;

  return (
    <section
      style={{
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        padding: 20,
        background: "var(--bg-surface-1)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          {label}
        </h2>
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          {slug}
        </code>
      </header>

      {/* Mark section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>
              Mark
            </span>
            <StatusPill status={mark.status} />
          </div>
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-3)",
            }}
          >
            {markSrc}
          </code>
        </div>
        {mark.note && (
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "var(--fg-2)",
              lineHeight: 1.5,
            }}
          >
            {mark.note}
          </p>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          <Cell title="Raw on light" background="#ffffff" color="#0a0a0a">
            <img
              src={markSrc}
              alt={`${label} mark on light`}
              style={{ width: MARK_PX, height: MARK_PX, objectFit: "contain" }}
            />
          </Cell>
          <Cell title="Raw on dark" background="#0a0a0a" color="#fafafa">
            <img
              src={markSrc}
              alt={`${label} mark on dark`}
              style={{ width: MARK_PX, height: MARK_PX, objectFit: "contain" }}
            />
          </Cell>
          <Cell
            title="Masked (currentColor)"
            background="var(--bg-surface-2)"
            color="var(--fg-1)"
          >
            <span aria-hidden style={maskStyle(markSrc, MARK_PX, MARK_PX)} />
          </Cell>
        </div>
      </div>

      {/* Lockup section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>
              Lockup
            </span>
            <StatusPill status={lockup.status === "none" ? "none" : lockup.status} />
          </div>
          {lockup.status !== "none" && (
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
              }}
            >
              {lockupSrc}
            </code>
          )}
        </div>
        {lockup.note && (
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "var(--fg-2)",
              lineHeight: 1.5,
            }}
          >
            {lockup.note}
          </p>
        )}
        {lockup.status === "none" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            <PlaintextLockup
              label={label}
              src={markSrc}
              height={LOCKUP_PX}
              aspect={mark.aspect}
              background="#ffffff"
              color="#0a0a0a"
            />
            <PlaintextLockup
              label={label}
              src={markSrc}
              height={LOCKUP_PX}
              aspect={mark.aspect}
              background="#0a0a0a"
              color="#fafafa"
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            <Cell title="Raw on light" background="#ffffff" color="#0a0a0a">
              <img
                src={lockupSrc}
                alt={`${label} lockup on light`}
                style={{
                  height: LOCKUP_PX,
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Cell>
            <Cell title="Raw on dark" background="#0a0a0a" color="#fafafa">
              <img
                src={lockupSrc}
                alt={`${label} lockup on dark`}
                style={{
                  height: LOCKUP_PX,
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Cell>
            <Cell
              title="Masked (currentColor)"
              background="var(--bg-surface-2)"
              color="var(--fg-1)"
            >
              <span
                aria-hidden
                style={maskStyle(
                  lockupSrc,
                  Math.round(LOCKUP_PX * lockup.aspect),
                  LOCKUP_PX,
                )}
              />
            </Cell>
          </div>
        )}
      </div>
    </section>
  );
}

function Summary() {
  const needsReplacement = VENDORS.filter(
    (v) => v.mark.status === "needs-replacement" || (v.lockup.status !== "none" && v.lockup.status === "needs-replacement"),
  );
  const needsMark = VENDORS.filter((v) => v.mark.status === "missing");
  const markOnly = VENDORS.filter((v) => v.lockup.status === "none");

  return (
    <section
      style={{
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        padding: 20,
        background: "var(--bg-surface-1)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 600,
          color: "var(--fg-1)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Action items
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>
        <div>
          <strong style={{ color: "var(--fg-1)" }}>Needs replacement files: </strong>
          {needsReplacement.map((v) => v.label).join(", ") || "—"}
        </div>
        <div>
          <strong style={{ color: "var(--fg-1)" }}>Needs a separate mark file: </strong>
          {needsMark.map((v) => v.label).join(", ") || "—"}
        </div>
        <div>
          <strong style={{ color: "var(--fg-1)" }}>Mark-only (lockup = mark + plaintext name): </strong>
          {markOnly.map((v) => v.label).join(", ") || "—"}
        </div>
      </div>
    </section>
  );
}

export default function VendorsPage() {
  return (
    <main
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "32px 24px 64px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Internal · not linked
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Vendor logo audit
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "var(--fg-2)", lineHeight: 1.5 }}>
          File convention:{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
            /brand/vendors/&lt;slug&gt;.svg
          </code>{" "}
          (mark) and{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
            /brand/vendors/&lt;slug&gt;-lockup.svg
          </code>{" "}
          (optional lockup). Mark-only vendors render the mark + the vendor name in plaintext.
        </p>
      </header>

      <Summary />

      {VENDORS.map((v) => (
        <VendorRow key={v.slug} vendor={v} />
      ))}
    </main>
  );
}
