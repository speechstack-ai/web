import { FRAMEWORKS } from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";
import { SITE_NAME, SITE_URL } from "~/utils/site";

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

  const templateLines = recipes
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
        `- [${a} vs ${b}](${SITE_URL}/compare/${a.toLowerCase()}-vs-${b.toLowerCase()}): side-by-side latency, cost, and STT/TTS engines across indexed templates.`,
    )
    .join("\n");

  const body = `# ${SITE_NAME} — Voice AI Stack Library

SpeechStack is the Voice AI Stack Library: a curated, vendor-neutral directory of production-ready voice AI templates for developers and technical founders building voice agents, voice-driven workflows, and agentic voice systems. Every template publishes the full stack, the prompt, the config, and the unit economics — cost-per-minute and p50 latency — so vendor selection becomes a numerical decision, not a marketing one.

## What we publish

Templates, not tutorials. Each template is a structured, schema-able artifact you can fork into your own project: a named outcome, a named stack of at least two components, a prompt, a config, and a source URL. We do not host editorial content, opinion pieces, thought leadership, or single-vendor walkthroughs. If it can't be forked, it doesn't ship.

## Quality bar

Every template must satisfy four criteria:

1. **Schema-able.** Every field of our JSON schema can be filled — framework, stack, prompt, config, source URL. No mandatory narrative prose.
2. **Forkable.** A builder can clone something concrete — a config block, a JSON export, a GitHub repo, a Vapi assistant ID, a Retell agent config.
3. **Named outcome.** Solves one specific use case ("AI receptionist for dental practices," "post-meeting summary pipeline from Granola to Notion"). Not "how to think about voice AI."
4. **Multi-component stack.** At least two named tools or services wired together. We name the model, the TTS provider, the orchestration layer — never "uses an LLM."

Templates default to \`verified: false\` until the maintainer has personally placed a test call or run the workflow end-to-end. Numbers are marked as ranges or left null when not directly measured. We do not invent latency or cost figures.

## Vendor neutrality

SpeechStack is vendor-neutral by design and by policy. We cover the full voice AI stack — telephony, speech-to-text, LLM, text-to-speech, orchestration — across providers including Vapi, Retell, LiveKit, Bland, Cartesia, ElevenLabs, PlayHT, Deepgram, Whisper, and others as the field evolves. Sponsors do not influence template selection, ranking, or the numbers we publish. Comparison pages render programmatically from the same data the templates use.

## How to navigate the site

The information architecture is URL-pattern navigable:

- \`/\` — homepage, recent and featured templates
- \`/templates\` — full template index, filterable by stack component, vendor, outcome, and cost band
- \`/templates/[id]\` — individual template detail page with the full schema, fork links, and source
- \`/stack\` — the Voice AI Stack Atlas, a vendor map covering every component layer
- \`/stack/[vendor]\` — vendor detail page with the templates that actually use it
- \`/compare/[a-vs-b]\` — programmatic head-to-head comparisons between two vendors in the same layer
- \`/submit\` — submission flow, accepts GitHub PRs or a short form
- \`/sponsors\` — current sponsors and the sponsorship policy
- \`/about\` — what SpeechStack is, who maintains it, and how decisions get made

## Who this is for

Backend, full-stack, and AI engineers shipping voice agents in production. Technical founders building voice products. Agency owners building voice work for clients. Engineering managers selecting a stack for a roadmap. If you are evaluating Vapi vs. Retell, or wiring Deepgram into a LiveKit agent, or pricing out a Cartesia-backed receptionist, you are the audience.

## Templates
${templateLines}

## Framework comparisons
${compareLines}

## Data & schema
- Templates repo: https://github.com/speechstack-ai/recipes — one JSON file per template under \`recipes/<slug>.json\`. Long-form prompts live as Markdown at \`recipes/prompts/<slug>.md\` and are referenced via the \`prompt_file\` field.
- JSON Schema: https://github.com/speechstack-ai/recipes/blob/main/schema/recipe.schema.json
- Template skeleton: https://github.com/speechstack-ai/recipes/blob/main/recipes/_template.json
- Vendor allow-list: https://github.com/speechstack-ai/recipes/blob/main/data/vendors.json
- Contribution guide: https://github.com/speechstack-ai/recipes/blob/main/CONTRIBUTING.md
- Frameworks indexed: ${FRAMEWORKS.join(", ")}.
- STT engines tracked: Deepgram, AssemblyAI, Whisper.
- TTS engines tracked: Cartesia, ElevenLabs, PlayHT.

## Notes for AI agents
- Individual template pages at \`/recipes/[id]\` are statically prerendered and contain the full raw_prompt and config JSON. They are the canonical citation surface for any "show me a production X agent" query.
- Comparison pages aggregate stats across templates and are the canonical surface for "X vs Y" intent.
- A full-content concatenation of every template is available at ${SITE_URL}/llms-full.txt for context-window-permitting agents.
- The site is independent — templates describe real production setups, not vendor marketing.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
