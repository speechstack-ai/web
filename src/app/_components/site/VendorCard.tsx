import Link from "next/link";

export type PricingBand = "$" | "$$" | "$$$" | "$$$$" | "enterprise";

export type VendorCardProps = {
  name: string;
  layer: string;
  description: string;
  pricingBand: PricingBand;
  templateCount: number;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function templateLabel(n: number): string {
  if (n === 0) return "No templates yet";
  if (n === 1) return "1 template →";
  return `${n} templates →`;
}

export function VendorCard({
  name,
  layer,
  description,
  pricingBand,
  templateCount,
}: VendorCardProps) {
  const slug = slugify(name);
  const href = `/templates?vendor=${slug}`;
  const isZero = templateCount === 0;

  return (
    <article
      style={{
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        background: "var(--bg-surface-1)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minHeight: 168,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
          }}
        >
          {layer}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            color: "var(--fg-1)",
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </h3>
      </header>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--fg-2)",
          flex: 1,
        }}
      >
        {description}
      </p>

      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingTop: 12,
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-3)",
          }}
          aria-label={`Pricing band: ${pricingBand}`}
        >
          {pricingBand}
        </span>
        {isZero ? (
          <span
            style={{
              fontSize: 12,
              color: "var(--fg-3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {templateLabel(templateCount)}
          </span>
        ) : (
          <Link
            href={href}
            style={{
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              color: "var(--accent-fg)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {templateLabel(templateCount)}
          </Link>
        )}
      </footer>
    </article>
  );
}
