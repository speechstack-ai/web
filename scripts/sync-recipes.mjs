#!/usr/bin/env node
/**
 * Sync recipes from speechstack-ai/recipes into public/data/recipes.json.
 *
 * - Shallow-clones the recipes repo into a tmp dir.
 * - Parses every recipes/*.json (skips _template.json and any _-prefixed files).
 * - When a recipe has `prompt_file` and no `raw_prompt`, reads
 *   `recipes/<prompt_file>` from disk and inlines it as `raw_prompt` so the
 *   web app doesn't need a separate fetch.
 * - Sorts recipes featured-first, then by updated_at desc.
 * - Writes a single bundled JSON to public/data/recipes.json.
 * - Logs the synced SHA and, when running in GitHub Actions, writes
 *   `sha` and `count` to $GITHUB_OUTPUT.
 *
 * Plain Node ESM — no dependencies. Run via `pnpm sync-recipes` or
 * `node scripts/sync-recipes.mjs`. Override the ref with RECIPES_REF.
 */

import { execSync } from "node:child_process";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const RECIPES_REPO = process.env.RECIPES_REPO || "speechstack-ai/recipes";
const RECIPES_REF = process.env.RECIPES_REF || "main";
const REPO_ROOT = process.cwd();
const OUTPUT_PATH = path.join(REPO_ROOT, "public", "data", "recipes.json");
const TMP_DIR = path.join(REPO_ROOT, ".sync-recipes-tmp");

function log(msg) {
  console.log(`[sync-recipes] ${msg}`);
}

function warn(msg) {
  console.warn(`[sync-recipes] ⚠ ${msg}`);
}

function cleanup() {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
}

try {
  cleanup();

  log(`cloning ${RECIPES_REPO}@${RECIPES_REF} ...`);
  execSync(
    `git clone --depth 1 --branch "${RECIPES_REF}" "https://github.com/${RECIPES_REPO}.git" "${TMP_DIR}"`,
    { stdio: "inherit" },
  );

  const sha = execSync(`git -C "${TMP_DIR}" rev-parse --short HEAD`, {
    encoding: "utf8",
  }).trim();
  log(`recipes ref resolved to ${sha}`);

  const recipesDir = path.join(TMP_DIR, "recipes");
  if (!existsSync(recipesDir)) {
    throw new Error(`Cloned repo has no recipes/ directory: ${recipesDir}`);
  }

  const filenames = readdirSync(recipesDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .sort();

  log(`found ${filenames.length} recipe file(s)`);

  const recipes = [];
  for (const filename of filenames) {
    const filePath = path.join(recipesDir, filename);
    let recipe;
    try {
      recipe = JSON.parse(readFileSync(filePath, "utf8"));
    } catch (err) {
      warn(`${filename}: invalid JSON — ${err.message}`);
      continue;
    }

    // Inline prompt_file when raw_prompt is null/missing so the web app can
    // render the prompt without an extra network fetch at request time.
    if (!recipe.raw_prompt && recipe.prompt_file) {
      const promptPath = path.join(recipesDir, recipe.prompt_file);
      if (existsSync(promptPath)) {
        recipe.raw_prompt = readFileSync(promptPath, "utf8").trim();
        log(`inlined prompt for ${recipe.id} (${recipe.raw_prompt.length} chars)`);
      } else {
        warn(`${filename}: prompt_file ${recipe.prompt_file} not found in recipes/`);
      }
    }

    recipes.push(recipe);
  }

  recipes.sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    const at = Date.parse(a.updated_at || "");
    const bt = Date.parse(b.updated_at || "");
    return (Number.isFinite(bt) ? bt : 0) - (Number.isFinite(at) ? at : 0);
  });

  mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(recipes, null, 2) + "\n");
  log(`wrote ${recipes.length} recipes -> ${path.relative(REPO_ROOT, OUTPUT_PATH)}`);

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `sha=${sha}\ncount=${recipes.length}\n`);
  }
} finally {
  cleanup();
}
