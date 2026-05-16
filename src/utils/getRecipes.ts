import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { Recipe } from "~/types/recipe";

const RECIPES_PATH = path.join(process.cwd(), "public", "data", "recipes.json");

const recipes: Recipe[] = JSON.parse(fs.readFileSync(RECIPES_PATH, "utf8")) as Recipe[];

export function getRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}
