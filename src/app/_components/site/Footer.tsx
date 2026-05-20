import Link from "next/link";
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
          padding: "40px 32px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 32,
          }}
        >
          <FooterColumn label="Library">
            <FooterLink href="/templates">Templates</FooterLink>
            <FooterLink href="/stack">Stack</FooterLink>
            <FooterLink href="/compare">Compare</FooterLink>
            <FooterLink href="/submit">Submit</FooterLink>
          </FooterColumn>
          <FooterColumn label="About">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/sponsors">Sponsors</FooterLink>
            <FooterLink href="/press">Press kit</FooterLink>
            <FooterLink href="/llms.txt">llms.txt</FooterLink>
          </FooterColumn>
          <FooterColumn label="Build">
            <FooterLink href="https://github.com/speechstack-ai/recipes" external>
              GitHub
            </FooterLink>
            <FooterLink href="/schema">Schema</FooterLink>
            <FooterLink href="/contributors">Contributors</FooterLink>
            <FooterLink href="/changelog">Changelog</FooterLink>
          </FooterColumn>
        </div>

        <span
          style={{
            fontSize: 13,
            color: "var(--fg-3)",
            lineHeight: 1.55,
          }}
        >
          Latency, cost, stack. On every template.
        </span>
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
          <span>© 2026 SpeechStack</span>
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

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const style = {
    fontSize: 13,
    color: "var(--fg-2)",
    textDecoration: "none",
    lineHeight: 1.4,
  } as const;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={style}>
      {children}
    </Link>
  );
}
