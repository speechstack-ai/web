import type { MetadataRoute } from "next";

import { getRecipes } from "~/utils/getRecipes";
import { SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const recipes = getRecipes();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...recipes.map((r) => ({
      url: `${SITE_URL}/recipes/${r.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
