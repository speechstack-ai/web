import { formatCost, formatLatency, type Recipe } from "~/types/recipe";
import { getRecipes } from "~/utils/getRecipes";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

function recipeBlock(r: Recipe): string {
  const lines: string[] = [];
  lines.push(`## ${r.title}`);
  lines.push("");
  lines.push(`Canonical URL: ${SITE_URL}/recipes/${r.id}`);
  lines.push(`Framework: ${r.framework}`);
  lines.push(`Use case: ${r.use_case} · Industry: ${r.industry}`);
  lines.push(`Languages: ${r.languages.join(", ")}`);
  lines.push(
    `Pipeline: STT \`${r.pipeline.stt}\` → LLM \`${r.pipeline.llm}\` → TTS \`${r.pipeline.tts}\`${
      r.pipeline.telephony ? ` · Telephony \`${r.pipeline.telephony}\`` : ""
    }`,
  );
  lines.push(`Latency (p50): ${formatLatency(r)}`);
  lines.push(`Cost: ${formatCost(r)}`);
  lines.push(`License: ${r.license}`);
  if (r.github_source_url) lines.push(`Source: ${r.github_source_url}`);
  if (r.demo_url) lines.push(`Demo: ${r.demo_url}`);
  lines.push(`Updated: ${r.updated_at}`);
  if (r.tags?.length) lines.push(`Tags: ${r.tags.join(", ")}`);
  lines.push("");
  lines.push(`**Description:** ${r.description}`);
  lines.push("");

  if (r.raw_prompt) {
    lines.push("### Prompt");
    lines.push("");
    lines.push("```");
    lines.push(r.raw_prompt.trim());
    lines.push("```");
    lines.push("");
  } else if (r.prompt_file) {
    lines.push(
      `### Prompt\n\nSee \`recipes/${r.prompt_file}\` in https://github.com/speechstack-ai/recipes.\n`,
    );
  }

  if (r.config) {
    lines.push("### Config");
    lines.push("");
    lines.push("```json");
    lines.push(JSON.stringify(r.config, null, 2));
    lines.push("```");
    lines.push("");
  }

  if (r.config?.tools?.length) {
    lines.push("### Tools");
    lines.push("");
    for (const tool of r.config.tools) {
      lines.push(`- **${tool.name}** — ${tool.description}`);
    }
    lines.push("");
  }

  if (r.notes) {
    lines.push(`> ${r.notes.replace(/\n+/g, " ")}`);
    lines.push("");
  }

  return lines.join("\n");
}

export function GET() {
  const recipes = getRecipes();

  const header = `# ${SITE_NAME} — full recipe index

> ${SITE_DESCRIPTION}

This file contains every recipe published on ${SITE_NAME} as concatenated markdown. It is intended for AI agents that prefer a single file over crawling. The lighter index lives at ${SITE_URL}/llms.txt. Canonical recipe pages live at ${SITE_URL}/recipes/[id].

Generated from ${recipes.length} recipes.

`;

  const body = header + recipes.map(recipeBlock).join("\n---\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
