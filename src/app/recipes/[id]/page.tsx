import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecipeDetailPage } from "~/app/_components/site/RecipeDetailPage";
import { getRecipeById, getRecipes } from "~/utils/getRecipes";
import { SITE_NAME, SITE_URL } from "~/utils/site";

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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: recipe.title,
    description: recipe.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: keywords.join(", "),
    about: keywords,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(recipe.github_source_url && {
      codeRepository: recipe.github_source_url,
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Recipes", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: recipe.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <RecipeDetailPage recipe={recipe} />
    </>
  );
}
