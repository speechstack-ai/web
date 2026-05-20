import { BrandMark } from "./Icon";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
        marginTop: 80,
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "32px 32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BrandMark size={20} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--fg-1)",
            }}
          >
            SpeechStack
          </span>
        </div>
        <span style={{ fontSize: 13, color: "var(--fg-3)", lineHeight: 1.55, maxWidth: 480 }}>
          A curated directory of voice AI agent recipes. Independent. Not affiliated with any
          vendor.
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <FooterLink href="https://github.com/speechstack-ai/recipes">Submit</FooterLink>
          <span style={{ color: "var(--fg-4)" }}>·</span>
          <FooterLink href="https://github.com/speechstack-ai/recipes">GitHub</FooterLink>
          <span style={{ color: "var(--fg-4)" }}>·</span>
          <FooterLink href="https://twitter.com/speechstack">@speechstack</FooterLink>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div
          style={{
            maxWidth: 896,
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
          }}
        >
          <span>© 2026 SpeechStack · independent voice AI directory</span>
          <span>
            Made by{" "}
            <a
              href="https://twitter.com/zachcapshaw"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--fg-2)", textDecoration: "none" }}
            >
              @zachcapshaw
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: 13,
        color: "var(--fg-2)",
        textDecoration: "none",
        lineHeight: 1.4,
      }}
    >
      {children}
    </a>
  );
}
