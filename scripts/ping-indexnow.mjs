#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, et al. — not Google).
 *
 * Inputs:
 *   - `--all`     submit homepage + every recipe URL from public/data/recipes.json
 *   - URLS env    newline- or comma-separated URLs to submit
 *
 * The IndexNow key is hardcoded and mirrored at `public/<key>.txt`. The key
 * is intentionally public — it's the proof of domain ownership, not a secret.
 * If you ever need to rotate it, update both the constant below and the
 * filename of the key file in public/.
 *
 * Spec: https://www.indexnow.org/documentation
 */

import { readFileSync } from "node:fs";
import path from "node:path";

const SITE_URL = process.env.SITE_URL || "https://speechstack.com";
const KEY = process.env.INDEXNOW_KEY || "e7d3a8c2b91f456082c4d6e8f1a3b7d5";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const HOST = new URL(SITE_URL).host;
const RECIPES_PATH = path.join(process.cwd(), "public", "data", "recipes.json");

function log(msg) {
  console.log(`[ping-indexnow] ${msg}`);
}

function allUrls() {
  const recipes = JSON.parse(readFileSync(RECIPES_PATH, "utf8"));
  return [SITE_URL, ...recipes.map((r) => `${SITE_URL}/recipes/${r.id}`)];
}

function urlsFromEnv() {
  return (process.env.URLS || "")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function ping(urls) {
  if (urls.length === 0) {
    log("no urls to submit — skipping");
    return;
  }
  log(`submitting ${urls.length} url(s) to ${HOST}:`);
  for (const u of urls) log(`  ${u}`);

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  const body = await res.text();
  log(`response ${res.status} ${res.statusText}${body ? ` — ${body}` : ""}`);

  if (!res.ok) {
    throw new Error(`IndexNow returned ${res.status}`);
  }
}

const args = new Set(process.argv.slice(2));
const urls = args.has("--all") ? allUrls() : urlsFromEnv();
await ping(urls);
