/**
 * SpeechStack recipe schema (mirrors speechstack-ai/recipes:schema/recipe.schema.json).
 * Keep this file aligned with that JSON Schema. If you change one, change the other.
 */

export const FRAMEWORKS = [
  "Vapi",
  "Retell",
  "LiveKit",
  "Pipecat",
  "Bland",
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const STT_ENGINES = ["Deepgram", "AssemblyAI", "Whisper"] as const;
export type STTEngine = (typeof STT_ENGINES)[number];

export const TTS_ENGINES = ["Cartesia", "ElevenLabs", "PlayHT"] as const;
export type TTSEngine = (typeof TTS_ENGINES)[number];

export const SOURCES = [
  "vendor_showcase",
  "github_discovery",
  "youtube_tutorial",
  "blog_post",
  "web_submission",
  "direct_pr",
  "editorial",
] as const;
export type Source = (typeof SOURCES)[number];

export const LICENSES = [
  "MIT",
  "Apache-2.0",
  "CC-BY-4.0",
  "Unlicense",
  "Proprietary",
] as const;
export type License = (typeof LICENSES)[number];

export type RecipeTool = {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
};

export type RecipeConfig = {
  voice_id?: string | null;
  temperature?: number | null;
  barge_in?: boolean | null;
  interruption_threshold_ms?: number | null;
  tools?: RecipeTool[];
  [k: string]: unknown;
};

export type RecipePipeline = {
  stt: string;
  llm: string;
  tts: string;
  telephony: string | null;
};

export type RecipeMetrics = {
  latency_p50_ms?: number | null;
  latency_p95_ms?: number | null;
  latency_display?: string | null;
  cost_per_minute_usd_min?: number | null;
  cost_per_minute_usd_max?: number | null;
  cost_display?: string | null;
};

export type RecipeContributor = {
  github: string;
  twitter?: string | null;
  name?: string | null;
  website?: string | null;
};

/** GitHub popularity for a recipe's source repo (merged at sync from recipes repo sidecar). */
export type GitHubMetrics = {
  stars: number;
  watchers: number;
  forks?: number;
  repoPushedAt?: string | null;
  fetchedAt: string;
  repo: string;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /**
   * The recipe's primary framework, governed by data/vendors.json in
   * speechstack-ai/recipes (12+ entries today). Kept as `string` because the
   * canonical list grows; the FRAMEWORKS const is the curated subset the
   * filter rail surfaces as chips.
   */
  framework: string;
  use_case: string;
  industry: string;
  languages: string[];
  pipeline: RecipePipeline;
  metrics?: RecipeMetrics;
  raw_prompt?: string | null;
  prompt_file?: string | null;
  config?: RecipeConfig;
  github_source_url?: string | null;
  demo_url?: string | null;
  tags?: string[];
  contributor: RecipeContributor;
  source: Source;
  verified?: boolean;
  featured?: boolean;
  created_at: string;
  updated_at: string;
  license: License;
  notes?: string | null;
  github_metrics?: GitHubMetrics | null;
};

/* ---------------- helpers ---------------- */

/** Popularity score for Top tab: stars + watchers weight + log forks. */
export function getTopScore(r: Recipe): number {
  const m = r.github_metrics;
  if (!m) return 0;
  const forks = m.forks ?? 0;
  return m.stars + m.watchers * 3 + Math.log1p(forks);
}

/** Recency multiplier from repo last push (30-day decay scale). */
export function recencyDecay(
  repoPushedAt: string | null | undefined,
  now = Date.now(),
): number {
  if (!repoPushedAt) return 0.25;
  const pushed = Date.parse(repoPushedAt);
  if (!Number.isFinite(pushed)) return 0.25;
  const days = Math.max(0, (now - pushed) / (24 * 60 * 60 * 1000));
  return Math.exp(-days / 30);
}

/** Popularity score for Trending tab: top score × recency decay. */
export function getTrendingScore(r: Recipe, now = Date.now()): number {
  return getTopScore(r) * recencyDecay(r.github_metrics?.repoPushedAt, now);
}

function compareByUpdatedThenTitle(a: Recipe, b: Recipe): number {
  const at = Date.parse(a.updated_at);
  const bt = Date.parse(b.updated_at);
  if (Number.isFinite(bt) && Number.isFinite(at) && bt !== at) return bt - at;
  if (!Number.isFinite(at) && Number.isFinite(bt)) return 1;
  if (Number.isFinite(at) && !Number.isFinite(bt)) return -1;
  return a.title.localeCompare(b.title);
}

/** Sort recipes by a popularity score (desc), then updated_at, then title. */
export function sortRecipesByScore(
  recipes: Recipe[],
  score: (r: Recipe) => number,
): Recipe[] {
  return [...recipes].sort((a, b) => {
    const diff = score(b) - score(a);
    if (diff !== 0) return diff;
    return compareByUpdatedThenTitle(a, b);
  });
}

/* ---------------- display helpers ---------------- */

/** Numeric p50 latency for sorting / comparison; Infinity when unknown. */
export function getLatencyMs(r: Recipe): number {
  return r.metrics?.latency_p50_ms ?? Number.POSITIVE_INFINITY;
}

/** Lower bound of cost-per-minute for sorting / comparison; Infinity when unknown. */
export function getCostMin(r: Recipe): number {
  return r.metrics?.cost_per_minute_usd_min ?? Number.POSITIVE_INFINITY;
}

/** Display string for latency. Falls back to `~{p50}ms` then "—". */
export function formatLatency(r: Recipe): string {
  if (r.metrics?.latency_display) return r.metrics.latency_display;
  if (typeof r.metrics?.latency_p50_ms === "number") return `~${r.metrics.latency_p50_ms}ms`;
  return "—";
}

/** Display string for cost-per-minute. Falls back to "$X.XX / min" then "—". */
export function formatCost(r: Recipe): string {
  if (r.metrics?.cost_display) return r.metrics.cost_display;
  const lo = r.metrics?.cost_per_minute_usd_min;
  const hi = r.metrics?.cost_per_minute_usd_max;
  if (typeof lo === "number" && typeof hi === "number" && lo !== hi) {
    return `$${lo.toFixed(2)} - $${hi.toFixed(2)} / min`;
  }
  if (typeof lo === "number") return `$${lo.toFixed(2)} / min`;
  return "—";
}

const NEW_BADGE_DAYS = 14;

export function isNewRecipe(r: Recipe, now: Date = new Date()): boolean {
  const created = Date.parse(r.created_at);
  if (Number.isNaN(created)) return false;
  const ageMs = now.getTime() - created;
  return ageMs >= 0 && ageMs <= NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
}

export type DisplayBadge = "verified" | "new";

export function displayBadge(r: Recipe, now?: Date): DisplayBadge | null {
  if (r.verified) return "verified";
  if (isNewRecipe(r, now)) return "new";
  return null;
}

/** Constructs a GitHub URL to the prompt_file in the recipes repo, when present. */
export function promptFileUrl(r: Recipe): string | null {
  if (!r.prompt_file) return null;
  return `https://github.com/speechstack-ai/recipes/blob/main/recipes/${r.prompt_file}`;
}
