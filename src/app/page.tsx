import type { Metadata } from "next";

import { AfterItems } from "~/app/_components/site/AfterItems";
import { Directory } from "~/app/_components/site/Directory";
import { getRecipes } from "~/utils/getRecipes";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${SITE_NAME} — the voice AI directory`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — the voice AI directory`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — the voice AI directory`,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  const recipes = getRecipes();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Voice AI recipes",
    description: SITE_DESCRIPTION,
    numberOfItems: recipes.length,
    itemListElement: recipes.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/recipes/${r.id}`,
      name: r.title,
    })),
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Directory recipes={recipes} />
      <AfterItems />
    </>
  );
}
