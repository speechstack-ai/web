import "server-only";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  LAYER_LABELS,
  VENDORS,
  getVendorBySlug,
  type Vendor,
} from "~/lib/vendors";
import { getRecipesForVendor } from "~/utils/vendorRecipes";
import { SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";
export const dynamicParams = false;

const HOSTING_LABEL: Record<Vendor["hosting"], string> = {
  cloud: "Cloud only",
  "self-host": "Self-hosted",
  hybrid: "Cloud or self-hosted",
};

export function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    return {
      title: "Vendor not found",
    };
  }
  const title = `${vendor.name} on SpeechStack`;
  const description = vendor.description;
  return {
    title,
    description,
    alternates: { canonical: `/tools/${vendor.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/tools/${vendor.slug}`,
      siteName: SITE_NAME,
      title: `${vendor.name} · ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${vendor.name} · ${SITE_NAME}`,
      description,
    },
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-3)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <div style={{ fontSize: 15, color: "var(--fg-1)", lineHeight: 1.55 }}>
        {children}
      </div>
    </div>
  );
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) {
    notFound();
  }

  const templates = getRecipesForVendor(vendor);

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "64px 32px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <div>
        <Link
          href="/tools"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-3)",
            textDecoration: "none",
          }}
        >
          ← Back to the stack
        </Link>
      </div>

      <header style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          {LAYER_LABELS[vendor.layer]}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface-1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src={vendor.markPath}
              alt={`${vendor.name} brand mark`}
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 36,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              fontWeight: 600,
              color: "var(--fg-1)",
            }}
          >
            {vendor.name}
          </h1>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--fg-2)",
          }}
        >
          {vendor.description}
        </p>
        <div>
          <a
            href={vendor.officialSite}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--accent-fg)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Visit official site ↗
          </a>
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          padding: "24px 0",
          borderTop: "1px solid var(--border-default)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <Field label="How they host it">{HOSTING_LABEL[vendor.hosting]}</Field>
        <Field label="Pricing">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                color: "var(--fg-1)",
                fontWeight: 600,
              }}
              aria-label={`Pricing band: ${vendor.pricingBand}`}
            >
              {vendor.pricingBand}
            </span>
            <span
              style={{
                fontSize: 14,
                color: "var(--fg-2)",
                lineHeight: 1.5,
              }}
            >
              {vendor.pricingHelper}
            </span>
            <a
              href={vendor.pricingSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--accent-fg)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Pricing source ↗
            </a>
          </div>
        </Field>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
        >
          Templates using {vendor.name}
        </h2>
        {templates.length === 0 ? (
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--fg-3)",
            }}
          >
            No templates currently feature this vendor.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {templates.map((template) => (
              <li key={template.id}>
                <Link
                  href={`/templates/${encodeURIComponent(template.id)}`}
                  style={{
                    fontSize: 14,
                    color: "var(--accent-fg)",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {template.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
