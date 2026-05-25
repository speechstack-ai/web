import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  LAYER_LABELS,
  LAYER_ORDER,
  VENDORS,
  type Vendor,
  type VendorLayer,
} from "~/lib/vendors";
import { getTemplateCountForVendor } from "~/utils/vendorRecipes";
import { SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

const STACK_TITLE = "Voice AI Stack Atlas";
const STACK_H1 = "The voice AI stack, mapped.";
const STACK_SUBHEAD =
  "Pick a layer, see who builds there, click through to a template that runs it in production.";

export const metadata: Metadata = {
  title: STACK_TITLE,
  description: STACK_SUBHEAD,
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    title: `${STACK_TITLE} · ${SITE_NAME}`,
    description: STACK_SUBHEAD,
  },
  twitter: {
    card: "summary_large_image",
    title: `${STACK_TITLE} · ${SITE_NAME}`,
    description: STACK_SUBHEAD,
  },
};

function templateLabel(n: number): string {
  if (n === 0) return "No templates yet";
  if (n === 1) return "1 template";
  return `${n} templates`;
}

function StackHero() {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "40px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Voice AI Stack Atlas
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 40,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          {STACK_H1}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--fg-2)",
          }}
        >
          {STACK_SUBHEAD}
        </p>
      </div>
    </section>
  );
}

function VendorTile({ vendor }: { vendor: Vendor }) {
  const templateCount = getTemplateCountForVendor(vendor);

  return (
    <Link
      href={`/tools/${vendor.slug}`}
      className="vendor-tile"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        background: "var(--bg-surface-1)",
        padding: 20,
        minHeight: 188,
        transition: "border-color 120ms ease, transform 120ms ease, background 120ms ease",
      }}
      aria-label={`${vendor.name} details`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          height: "100%",
        }}
      >
        <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "var(--bg-surface-2, var(--bg-canvas))",
              border: "1px solid var(--border-default)",
              flexShrink: 0,
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <Image
              src={vendor.markPath}
              alt=""
              width={24}
              height={24}
              style={{ width: 24, height: 24, objectFit: "contain" }}
            />
          </span>
          <h3
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 600,
              color: "var(--fg-1)",
              letterSpacing: "-0.01em",
            }}
          >
            {vendor.name}
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
          {vendor.description}
        </p>

        <div
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
              display: "inline-flex",
              alignItems: "baseline",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-3)",
            }}
            aria-label={`Pricing band ${vendor.pricingBand}. ${vendor.pricingHelper}`}
          >
            <span style={{ fontWeight: 600, color: "var(--fg-2)" }}>
              {vendor.pricingBand}
            </span>
            <span style={{ fontFamily: "inherit" }}>{vendor.pricingHelper}</span>
          </span>
          <span
            style={{
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              color: "var(--fg-3)",
              whiteSpace: "nowrap",
            }}
          >
            {templateLabel(templateCount)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function LayerSection({ layer }: { layer: VendorLayer }) {
  const heading = LAYER_LABELS[layer];
  const vendors = VENDORS.filter((v) => v.layer === layer);

  return (
    <section
      id={layer}
      style={{
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
        >
          {heading}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {vendors.map((v) => (
            <VendorTile key={v.slug} vendor={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StackPage() {
  return (
    <>
      <StackHero />
      {LAYER_ORDER.map((layer) => (
        <LayerSection key={layer} layer={layer} />
      ))}
    </>
  );
}
