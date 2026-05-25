import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getTopScore,
  getTrendingScore,
  recencyDecay,
  sortRecipesByScore,
  type Recipe,
} from "./recipe";

function recipe(overrides: Partial<Recipe> & { id: string }): Recipe {
  return {
    id: overrides.id,
    slug: overrides.id,
    title: overrides.title ?? overrides.id,
    description: "Test recipe description for popularity scoring.",
    framework: "Vapi",
    use_case: "scheduling",
    industry: "healthcare",
    languages: ["en-US"],
    pipeline: { stt: "Deepgram Nova-3", llm: "GPT-4o", tts: "Cartesia Sonic-3", telephony: null },
    contributor: { github: "test" },
    source: "github_discovery",
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
    license: "MIT",
    ...overrides,
  };
}

describe("getTopScore", () => {
  it("returns 0 when github_metrics is missing", () => {
    assert.equal(getTopScore(recipe({ id: "a" })), 0);
  });

  it("weights watchers and forks", () => {
    const score = getTopScore(
      recipe({
        id: "b",
        github_metrics: {
          stars: 100,
          watchers: 10,
          forks: 15,
          fetchedAt: "2026-05-01T00:00:00.000Z",
          repo: "org/repo",
        },
      }),
    );
    assert.equal(score, 100 + 10 * 3 + Math.log1p(15));
  });
});

describe("getTrendingScore", () => {
  it("applies recency decay from repoPushedAt", () => {
    const now = Date.parse("2026-05-25T00:00:00.000Z");
    const recent = recipe({
      id: "recent",
      github_metrics: {
        stars: 10,
        watchers: 0,
        fetchedAt: "2026-05-01T00:00:00.000Z",
        repo: "org/recent",
        repoPushedAt: "2026-05-20T00:00:00.000Z",
      },
    });
    const stale = recipe({
      id: "stale",
      github_metrics: {
        stars: 10,
        watchers: 0,
        fetchedAt: "2026-05-01T00:00:00.000Z",
        repo: "org/stale",
        repoPushedAt: "2024-01-01T00:00:00.000Z",
      },
    });
    assert.ok(getTrendingScore(recent, now) > getTrendingScore(stale, now));
  });
});

describe("sortRecipesByScore", () => {
  it("orders by score descending", () => {
    const low = recipe({
      id: "low",
      github_metrics: { stars: 1, watchers: 0, fetchedAt: "2026-05-01T00:00:00.000Z", repo: "a/b" },
    });
    const high = recipe({
      id: "high",
      github_metrics: { stars: 500, watchers: 0, fetchedAt: "2026-05-01T00:00:00.000Z", repo: "c/d" },
    });
    const sorted = sortRecipesByScore([low, high], getTopScore);
    assert.deepEqual(sorted.map((r) => r.id), ["high", "low"]);
  });
});

describe("recencyDecay", () => {
  it("returns a small multiplier when push date is missing", () => {
    assert.equal(recencyDecay(null), 0.25);
  });
});
