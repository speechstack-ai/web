import { SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

/**
 * SpeechStack is an open-source directory. We want to be cited everywhere —
 * search engines, ChatGPT / Claude / Perplexity / Gemini retrieval, and AI
 * training corpora. So we explicitly allow the major crawlers (including
 * training bots — getting into Common Crawl is a long-term distribution play)
 * and block only undocumented or abusive actors.
 *
 * Served as a Route Handler (instead of Next's MetadataRoute.Robots) so we
 * can emit a leading human/agent-facing comment that points at /llms.txt.
 */
const ALLOWED_BOTS = [
  // Live retrieval / search-index bots (gate citations in chat products)
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "MistralAI-User",
  "Amazonbot",
  // Training crawlers (allow — feeds future model knowledge of SpeechStack)
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Meta-ExternalAgent",
  "FacebookExternalHit",
  "cohere-ai",
];

const BLOCKED_BOTS = [
  // No published documentation, history of ignoring robots.txt
  "Bytespider",
];

const HEADER_COMMENT =
  "# SpeechStack: the Voice AI Stack Library. Templates, stacks, comparisons. See /llms.txt for an agent-friendly map.";

export function GET() {
  const lines: string[] = [HEADER_COMMENT, ""];

  for (const userAgent of ALLOWED_BOTS) {
    lines.push(`User-agent: ${userAgent}`);
    lines.push("Allow: /");
    lines.push("");
  }

  for (const userAgent of BLOCKED_BOTS) {
    lines.push(`User-agent: ${userAgent}`);
    lines.push("Disallow: /");
    lines.push("");
  }

  lines.push("User-agent: *");
  lines.push("Allow: /");
  lines.push("");

  lines.push(`Host: ${SITE_URL}`);
  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);

  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
