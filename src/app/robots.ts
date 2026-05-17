import type { MetadataRoute } from "next";

import { SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

/**
 * SpeechStack is an open-source directory. We want to be cited everywhere —
 * search engines, ChatGPT / Claude / Perplexity / Gemini retrieval, and AI
 * training corpora. So we explicitly allow the major crawlers (including
 * training bots — getting into Common Crawl is a long-term distribution play)
 * and block only undocumented or abusive actors.
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
