import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecipeDetailPage } from "~/app/_components/site/RecipeDetailPage";
import { getRecipeById, getRecipes } from "~/utils/getRecipes";
import { SITE_NAME, SITE_URL } from "~/utils/site";

const LICENSE_URLS: Record<string, string> = {
  MIT: "https://opensource.org/license/mit",
  "Apache-2.0": "https://opensource.org/license/apache-2-0",
  "CC-BY-4.0": "https://creativecommons.org/licenses/by/4.0/",
  Unlicense: "https://unlicense.org/",
  Proprietary: "",
};

type RouteParams = { id: string };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams(): RouteParams[] {
  return getRecipes().map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return { title: `Recipe not found · ${SITE_NAME}` };

  const url = `${SITE_URL}/recipes/${recipe.id}`;
  const title = `${recipe.title} · ${SITE_NAME}`;
  return {
    title,
    description: recipe.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description: recipe.description,
      publishedTime: recipe.created_at,
      modifiedTime: recipe.updated_at,
      authors: [`https://github.com/${recipe.contributor.github}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: recipe.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) notFound();

  const url = `${SITE_URL}/recipes/${recipe.id}`;
  const keywords = [
    "voice AI",
    recipe.framework,
    recipe.pipeline.stt,
    recipe.pipeline.llm,
    recipe.pipeline.tts,
    ...(recipe.pipeline.telephony ? [recipe.pipeline.telephony] : []),
  ];

  const authorSameAs = [
    `https://github.com/${recipe.contributor.github}`,
    recipe.contributor.twitter ? `https://x.com/${recipe.contributor.twitter}` : null,
    recipe.contributor.website ?? null,
  ].filter((s): s is string => Boolean(s));

  const licenseUrl = LICENSE_URLS[recipe.license] ?? "";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: recipe.title,
    description: recipe.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/recipes/${recipe.id}/opengraph-image`,
    datePublished: recipe.created_at,
    dateModified: recipe.updated_at,
    inLanguage: recipe.languages,
    author: {
      "@type": "Person",
      name: recipe.contributor.name ?? recipe.contributor.github,
      url: `https://github.com/${recipe.contributor.github}`,
      sameAs: authorSameAs,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo.svg`,
      },
    },
    keywords: keywords.join(", "),
    about: keywords,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(licenseUrl && { license: licenseUrl }),
    ...(recipe.github_source_url && {
      codeRepository: recipe.github_source_url,
    }),
  };

  const codeLd = recipe.raw_prompt || recipe.config
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: `${recipe.title} — prompt & config`,
        description: `Production prompt and JSON configuration for ${recipe.title}.`,
        url,
        programmingLanguage: ["JSON", "Markdown"],
        codeSampleType: "full (compile ready) solution",
        runtimePlatform: recipe.framework,
        targetProduct: {
          "@type": "SoftwareApplication",
          name: recipe.framework,
          applicationCategory: "DeveloperApplication",
        },
        author: {
          "@type": "Person",
          name: recipe.contributor.name ?? recipe.contributor.github,
          url: `https://github.com/${recipe.contributor.github}`,
        },
        ...(licenseUrl && { license: licenseUrl }),
        ...(recipe.github_source_url && { codeRepository: recipe.github_source_url }),
        isPartOf: { "@type": "Article", "@id": url },
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Templates", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: recipe.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {codeLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(codeLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <RecipeDetailPage recipe={recipe} />
    </>
  );
}
