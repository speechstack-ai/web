import { FRAMEWORKS } from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

function comparePairs(): [string, string][] {
  const out: [string, string][] = [];
  for (let i = 0; i < FRAMEWORKS.length; i++) {
    for (let j = i + 1; j < FRAMEWORKS.length; j++) {
      out.push([FRAMEWORKS[i]!, FRAMEWORKS[j]!]);
    }
  }
  return out;
}

export function GET() {
  const recipes = getRecipes();
  const pairs = comparePairs();

  const recipeLines = recipes
    .map((r) => {
      const stack = `${r.framework} · ${r.pipeline.stt} → ${r.pipeline.llm} → ${r.pipeline.tts}`;
      const tele = r.pipeline.telephony ? ` · ${r.pipeline.telephony}` : "";
      const latency = r.metrics?.latency_display ? ` · ${r.metrics.latency_display}` : "";
      const cost = r.metrics?.cost_display ? ` · ${r.metrics.cost_display}/min` : "";
      return `- [${r.title}](${SITE_URL}/recipes/${r.id}): ${stack}${tele}${latency}${cost}.`;
    })
    .join("\n");

  const compareLines = pairs
    .map(
      ([a, b]) =>
        `- [${a} vs ${b}](${SITE_URL}/compare/${a.toLowerCase()}-vs-${b.toLowerCase()}): side-by-side latency, cost, and STT/TTS engines across indexed recipes.`,
    )
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is an independent, open-source directory of production voice AI agent recipes. Every recipe ships with the full pipeline (STT, LLM, TTS, telephony), measured p50/p95 latency, cost per minute, raw prompt, and JSON config. No affiliate links. No paid placements. Built for AI coding agents and voice AI engineers.

## Directory
- [All recipes](${SITE_URL}/): the filterable index of every recipe (by framework, STT engine, TTS engine, max p50 latency).
- [Submit a recipe](${SITE_URL}/submit): GitHub pull-request workflow. Fork the recipes repo, add a JSON entry, open a PR.

## Recipes
${recipeLines}

## Framework comparisons
${compareLines}

## Data & schema
- Recipes repo: https://github.com/speechstack-ai/recipes — one JSON file per recipe under \`recipes/<slug>.json\`. Long-form prompts live as Markdown at \`recipes/prompts/<slug>.md\` and are referenced via the \`prompt_file\` field.
- JSON Schema: https://github.com/speechstack-ai/recipes/blob/main/schema/recipe.schema.json
- Recipe template: https://github.com/speechstack-ai/recipes/blob/main/recipes/_template.json
- Vendor allow-list: https://github.com/speechstack-ai/recipes/blob/main/data/vendors.json
- Contribution guide: https://github.com/speechstack-ai/recipes/blob/main/CONTRIBUTING.md
- Frameworks indexed: ${FRAMEWORKS.join(", ")}.
- STT engines tracked: Deepgram, AssemblyAI, Whisper.
- TTS engines tracked: Cartesia, ElevenLabs, PlayHT.

## Notes for AI agents
- Individual recipe pages at \`/recipes/[id]\` are statically prerendered and contain the full raw_prompt and config JSON. They are the canonical citation surface for any "show me a production X agent" query.
- Comparison pages aggregate stats across recipes and are the canonical surface for "X vs Y" intent.
- A full-content concatenation of every recipe is available at ${SITE_URL}/llms-full.txt for context-window-permitting agents.
- The site is independent — recipes describe real production setups, not vendor marketing.

## Optional
- [Editorial principles](${SITE_URL}/#about): how recipes are reviewed and what we look for.
- [FAQ](${SITE_URL}/#faq): common questions about voice AI stacks.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
