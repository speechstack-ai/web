import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getVisibleFilterOptions } from "./FilterBar";
import type { Recipe } from "~/types/recipe";

function recipe(overrides: Partial<Recipe>): Recipe {
  return {
    id: overrides.id ?? "recipe",
    slug: overrides.slug ?? "recipe",
    title: overrides.title ?? "Recipe",
    description: overrides.description ?? "Test recipe",
    framework: overrides.framework ?? "Vapi",
    use_case: overrides.use_case ?? "support",
    industry: overrides.industry ?? "saas",
    languages: overrides.languages ?? ["en"],
    pipeline: overrides.pipeline ?? {
      stt: "Deepgram",
      llm: "GPT-4o",
      tts: "Cartesia",
      telephony: "Twilio",
    },
    contributor: overrides.contributor ?? { github: "speechstack" },
    source: overrides.source ?? "editorial",
    created_at: overrides.created_at ?? "2026-05-01T00:00:00.000Z",
    updated_at: overrides.updated_at ?? "2026-05-01T00:00:00.000Z",
    license: overrides.license ?? "MIT",
  };
}

void describe("getVisibleFilterOptions", () => {
  void it("hides every filter option with fewer than five matching recipes", () => {
    const recipes: Recipe[] = [
      ...Array.from({ length: 5 }, (_, i) =>
        recipe({
          id: `vapi-${i}`,
          framework: "Vapi",
          use_case: "support",
          industry: "saas",
        }),
      ),
      ...Array.from({ length: 4 }, (_, i) =>
        recipe({
          id: `retell-${i}`,
          framework: "Retell",
          use_case: "sales",
          industry: "healthcare",
          pipeline: {
            stt: "AssemblyAI",
            llm: "GPT-4o",
            tts: "ElevenLabs",
            telephony: "Twilio",
          },
        }),
      ),
    ];

    assert.deepEqual(getVisibleFilterOptions(recipes).framework, ["Vapi"]);
    assert.deepEqual(getVisibleFilterOptions(recipes).useCase, ["support"]);
    assert.deepEqual(getVisibleFilterOptions(recipes).industry, ["saas"]);
    assert.deepEqual(getVisibleFilterOptions(recipes).stt, ["Deepgram"]);
    assert.deepEqual(getVisibleFilterOptions(recipes).tts, ["Cartesia"]);
  });
});
