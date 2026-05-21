# LAUNCH_SCOPE

What ships on day 1 vs what is explicitly deferred to month 2+.

> **Source:** Decision codified from the John Rush Directory Course (§11 Structure, §14 Auth, §17 Design vs Functionality) and Theme 3 of the SpeechStack recommendations doc. Directories fail by over-engineering surfaces before traction validates them. This document locks the scope so we don't drift.

## TL;DR

- 6 routes ship on day 1. Everything else is explicitly out of scope until thresholds are hit.
- `/stack`, `/compare/[a-vs-b]`, and `/jobs` are deferred — each has a numeric trigger before it gets built.
- "No login to browse" is locked through month 4. Auth is an anti-pattern at this stage.

---

## Ships day 1

| Route | Purpose | Why it's P0 |
| --- | --- | --- |
| `/` | Homepage. Hero + value prop + featured recipes + newsletter capture. | Front door for all launchpad traffic (HN, PH, Discords). |
| `/templates` | Browse grid with filters (framework only at launch — see "Filter scope" below). | Core discovery surface. The product is the directory; this is the directory. |
| `/templates/[id]` | Recipe detail: pipeline diagram, prompt viewport, config JSON, GitHub link. | Each detail page is an SEO long-tail asset (~50 pages = ~50 ranked URLs). Replaces the daily-blog tactic. |
| `/submit` | Dual-path community PR landing (GitHub fork + Tally form). | Required to scale curation past the manual first 30. |
| `/sponsors` | Pitch surface for vendor sponsorships. | Revenue model. Even pre-traffic, the page must exist so cold outreach can link to it. |
| `/about` | Who, why, what's a SpeechStack template. | Trust signal for HN/PH visitors and sponsors. |

Plus the non-route surfaces required for launch: `robots.txt`, `sitemap.xml` (covering every `/templates/[id]`), `llms.txt`, OG images, and a working newsletter signup component on `/`.

## Deferred (month 2+)

Each deferred surface has an **explicit trigger**. We do not build any of these until the trigger fires. No "let's just stub it out" — empty surfaces look broken and undermine sponsor pitches.

### `/stack` — Vendor capability matrix
- **What it would be:** Side-by-side matrix of every vendor in the directory: Vapi, Retell, LiveKit, Pipecat, Bland, ElevenLabs, Cartesia, Deepgram, etc., scored across capabilities (telephony, multi-language, function calling, latency, price tiers).
- **Trigger:** **30+ recipes per major framework** (Vapi, Retell, LiveKit). Until then the matrix has too many gaps to be useful and actively misrepresents vendors with thin coverage.
- **Why deferred:** Course §11 — "Many directories fail because of too many unnecessary features." A capability matrix built on thin data is worse than no matrix.

### `/compare/[a-vs-b]` — Programmatic compare pages
- **What it would be:** Static comparison pages like `/compare/vapi-vs-retell`, `/compare/livekit-vs-pipecat`. Auto-generated from recipe data, targeting "vapi vs retell" search intent.
- **Trigger:** **Filter usage signal from `/templates`.** Specifically: ≥100 monthly filter events showing users comparing two specific frameworks. Until we have that signal we are guessing which comparison pages anyone wants.
- **Why deferred:** High-leverage SEO surface, but speculative without filter data. PRD User Story 5 references this route — it gets built in month 2, not removed from the PRD.
- **Note:** One hand-written comparison post per month (e.g. "Vapi vs Retell: 2026 Cost & Latency Benchmark") is fine and lives at `/blog/...` once the blog exists. The *programmatic* compare route is what's deferred.

### `/jobs` — Voice AI job board
- **What it would be:** Curated Voice AI engineering / builder job listings, monetized via per-post fees or sponsorship.
- **Trigger:** **≥5K monthly visitors AND ≥3 inbound recruiter inquiries.** Jobs boards need a demand-side audience first; an empty board is worse than no board.
- **Why deferred:** Todoist explicitly deferred. Not part of the core directory thesis. Revisit at month 3+ when audience size validates it.

## Anti-patterns explicitly out of scope

These are not "deferred until trigger" — they are **rejected** at this stage of the product, per the course and our 5-hr/wk constraint.

### No login to browse — locked through month 4
Course §14 calls this out explicitly: requiring auth before users can see content is a directory anti-pattern. Login gates kill organic traffic, kill Google indexing of gated content, and signal scarcity where there is none.

**Locked decision through month 4.** If month-4 metrics suggest a logged-in feature would unlock real value (saved recipes, sponsor analytics dashboard for paying vendors, etc.), we re-evaluate. Until then: zero auth UI, zero "sign up to view," zero session cookies on read-only routes.

### No community Discord at launch
Theme 11 of the recommendations doc. A Discord with <50 people looks abandoned. We contribute to existing vendor Discords (Vapi, Retell, LiveKit, Pipecat) as builders instead. Revisit at 200+ recipes and 5K+ monthly visitors.

### No daily blog
Theme 8. Daily blog = 7+ hrs/wk minimum, violates the 5-hr/wk cap. Recipe detail pages *are* the SEO content. One hand-written comparison post per month is the maximum cadence.

## Filter scope at launch

The `/templates` grid has filter UI for: framework, STT, TTS, use case, industry.

**At launch, only the framework filter is active.** STT, TTS, use case, and industry filters appear in the UI **only when ≥5 recipes match each option** — see `MIN_COUNT = 5` threshold. Thin filters on thin data looks broken and trains users to ignore the filter rail. The threshold is implemented in the grid component, not gated by a feature flag.

This is a launch-day decision, not a permanent architectural constraint. As the recipe corpus grows the filters auto-light up.

## Acceptance criteria (this doc, not the launch)

- [x] `docs/LAUNCH_SCOPE.md` committed to `speechstack-ai/web`
- [ ] Linked from `SpeechStack Web PRD.md` (Capshaw-vault)
- [ ] Re-evaluated at month 2 and month 4 review points

## Revision log

- **2026-05-20** — Initial scope lock. Sources: John Rush course extract (§11, §14, §17), SpeechStack Recommendations doc (Themes 3, 4, 8, 11), SpeechStack Web PRD.
