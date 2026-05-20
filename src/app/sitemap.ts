import type { MetadataRoute } from "next";

import { FRAMEWORKS } from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";
import { SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

function comparePairs(): [string, string][] {
  const out: [string, string][] = [];
  for (let i = 0; i < FRAMEWORKS.length; i++) {
    for (let j = i + 1; j < FRAMEWORKS.length; j++) {
      out.push([FRAMEWORKS[i]!.toLowerCase(), FRAMEWORKS[j]!.toLowerCase()]);
    }
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const recipes = getRecipes();
  const recipesMostRecent = recipes
    .map((r) => new Date(r.updated_at))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? now;

  return [
    { url: SITE_URL, lastModified: recipesMostRecent },
    { url: `${SITE_URL}/sponsors`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/stack`, lastModified: now },
    { url: `${SITE_URL}/submit`, lastModified: now },
    ...comparePairs().map(([a, b]) => ({
      url: `${SITE_URL}/compare/${a}-vs-${b}`,
      lastModified: recipesMostRecent,
    })),
    ...recipes.map((r) => ({
      url: `${SITE_URL}/templates/${r.id}`,
      lastModified: new Date(r.updated_at),
    })),
  ];
}
