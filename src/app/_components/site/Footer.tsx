import { BrandMark } from "./Icon";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: 320,
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
          <span style={{ fontSize: 12, color: "var(--fg-3)", lineHeight: 1.5 }}>
            A curated directory of voice AI agent recipes. Independent. Not affiliated
            with any vendor.
          </span>
        </div>
        <FooterCol title="Directory" links={["recipes", "vendors", "stacks", "compare"]} />
        <FooterCol
          title="Community"
          links={["submit a recipe", "newsletter", "rss"]}
        />
        <FooterCol title="Company" links={["about", "sponsor", "press", "contact"]} />
      </div>
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div
          style={{
            maxWidth: 1440,
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
          <span>© 2026 SpeechStack · last build 14 May 14:02 UTC</span>
          <span>made by one person · take that, marketing teams</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 140,
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {title}
      </span>
      {links.map((l) => (
        <a
          key={l}
          href="#"
          style={{
            fontSize: 13,
            color: "var(--fg-2)",
            textDecoration: "none",
          }}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
