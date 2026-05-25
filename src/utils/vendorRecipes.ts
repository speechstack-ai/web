import "server-only";

import type { Vendor } from "~/lib/vendors";
import type { Recipe } from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";

type VendorMatcher = {
  slug: string;
  layer: Vendor["layer"];
  aliases: string[];
};

const VENDOR_MATCHERS: VendorMatcher[] = [
  { slug: "daily", layer: "telephony", aliases: ["daily"] },
  { slug: "plivo", layer: "telephony", aliases: ["plivo"] },
  { slug: "telnyx", layer: "telephony", aliases: ["telnyx"] },
  { slug: "twilio", layer: "telephony", aliases: ["twilio"] },
  { slug: "vonage", layer: "telephony", aliases: ["vonage"] },

  { slug: "assemblyai", layer: "stt", aliases: ["assemblyai", "assembly ai"] },
  { slug: "deepgram", layer: "stt", aliases: ["deepgram"] },
  { slug: "google-speech", layer: "stt", aliases: ["google speech", "google speech-to-text"] },
  { slug: "openai-whisper", layer: "stt", aliases: ["whisper", "openai whisper"] },
  { slug: "speechmatics", layer: "stt", aliases: ["speechmatics"] },

  { slug: "anthropic-claude", layer: "llm", aliases: ["anthropic", "claude"] },
  { slug: "google-gemini", layer: "llm", aliases: ["gemini", "google gemini"] },
  { slug: "groq", layer: "llm", aliases: ["groq"] },
  { slug: "mistral", layer: "llm", aliases: ["mistral"] },
  { slug: "openai-gpt", layer: "llm", aliases: ["gpt", "openai gpt", "openai"] },

  { slug: "azure-tts", layer: "tts", aliases: ["azure tts", "azure neural"] },
  { slug: "cartesia", layer: "tts", aliases: ["cartesia"] },
  { slug: "elevenlabs", layer: "tts", aliases: ["elevenlabs", "eleven labs"] },
  { slug: "openai-tts", layer: "tts", aliases: ["openai tts", "tts-1", "tts 1"] },
  { slug: "playht", layer: "tts", aliases: ["playht", "play.ht"] },
  { slug: "resemble", layer: "tts", aliases: ["resemble"] },

  { slug: "bland", layer: "orchestration", aliases: ["bland"] },
  { slug: "livekit", layer: "orchestration", aliases: ["livekit", "livekit agents"] },
  { slug: "pipecat", layer: "orchestration", aliases: ["pipecat"] },
  { slug: "retell", layer: "orchestration", aliases: ["retell"] },
  { slug: "vapi", layer: "orchestration", aliases: ["vapi"] },
  { slug: "vocode", layer: "orchestration", aliases: ["vocode"] },
];

const MATCHERS_BY_SLUG = new Map(VENDOR_MATCHERS.map((matcher) => [matcher.slug, matcher]));

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function fieldForLayer(recipe: Recipe, layer: Vendor["layer"]): string {
  switch (layer) {
    case "telephony":
      return recipe.pipeline.telephony ?? "";
    case "stt":
      return recipe.pipeline.stt;
    case "llm":
      return recipe.pipeline.llm;
    case "tts":
      return recipe.pipeline.tts;
    case "orchestration":
      return recipe.framework;
  }
}

function hasAlias(value: string, aliases: string[]): boolean {
  const normalized = normalize(value);
  return aliases.some((alias) => normalized.includes(normalize(alias)));
}

export function recipeUsesVendor(recipe: Recipe, vendor: Vendor): boolean {
  const matcher = MATCHERS_BY_SLUG.get(vendor.slug) ?? {
    slug: vendor.slug,
    layer: vendor.layer,
    aliases: [vendor.name],
  };

  return hasAlias(fieldForLayer(recipe, matcher.layer), matcher.aliases);
}

export function getRecipesForVendor(vendor: Vendor): Recipe[] {
  return getRecipes()
    .filter((recipe) => recipeUsesVendor(recipe, vendor))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getTemplateCountForVendor(vendor: Vendor): number {
  return getRecipesForVendor(vendor).length;
}
