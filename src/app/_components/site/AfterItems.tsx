import Link from "next/link";

import { BrandMark, Icon } from "./Icon";
import { NewsletterForm } from "./NewsletterForm";

export type FaqItem = { q: string; a: string };

export const HOME_FAQ: FaqItem[] = [
  {
    q: "What is the lowest-latency voice AI stack today?",
    a: "For sub-500ms round-trip on production traffic, most teams pair Deepgram Nova-3 STT with gpt-4o or Claude Haiku as the LLM and Cartesia Sonic for TTS, orchestrated with Vapi or LiveKit. Edge transport (LiveKit, Pipecat over WebRTC) shaves another 30–80ms versus traditional SIP. Expect p50 latency between 140–220ms with that stack on quiet networks.",
  },
  {
    q: "Vapi vs Retell vs LiveKit — when do you pick which?",
    a: "Vapi is the fastest path to a working agent if you want batteries-included orchestration, tools, telephony, and observability. Retell is leaner and tends to win on price-per-minute for high-volume outbound. LiveKit is the right pick when you need full control over transport, server-side hooks, or want to host the agent runtime yourself. Pipecat is the open-source choice if you want to compose the pipeline in Python.",
  },
  {
    q: "Cheapest production-grade TTS?",
    a: "Cartesia Sonic-3 is currently the cheapest tier-1 TTS with sub-100ms first-byte latency at roughly $0.02 per minute. ElevenLabs Flash and PlayHT come in slightly higher but offer more voice variety. For batch or non-realtime workloads, OpenAI's TTS is also competitive.",
  },
  {
    q: "Do these recipes work for telephony / phone calls?",
    a: "Yes — most recipes either use a telephony-first orchestrator (Vapi, Retell, Bland) or include a Twilio / Telnyx adapter. Check the 'pipeline' block on each recipe page; if it has a 'telephony' field, the stack is wired for phone calls. Otherwise it's WebRTC-only.",
  },
  {
    q: "Is SpeechStack affiliated with any vendor?",
    a: "No. SpeechStack is an independent directory. We don't take affiliate fees and we don't rank by sponsorship. Recipes are added when they're real, reproducible, and open-source. If you spot a recipe that's outdated or wrong, open an issue on GitHub or submit a corrected version.",
  },
  {
    q: "Can I submit my own recipe?",
    a: "Yes. Hit the Submit button in the nav, fill in the title, framework, pipeline, prompt, and config, and link the GitHub source. We review weekly and publish anything that's reproducible and not already covered.",
  },
];

export function AfterItems() {
  return (
    <div
      style={{
        maxWidth: 1440,
        margin: "0 auto",
        padding: "64px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 80,
      }}
    >
      <NewsletterBlock />
      <SubmitBlock />
      <FaqBlock />
      <AboutBlock />
    </div>
  );
}

function NewsletterBlock() {
  return (
    <section
      id="newsletter"
      style={{
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface-1)",
        borderRadius: 8,
        padding: "40px",
        display: "flex",
        alignItems: "center",
        gap: 40,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Weekly drop
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: 28,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          New voice AI recipes,
          <br /> one email a week.
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>
          Curated drops of production stacks, benchmarks, and config diffs. No
          fluff, no sponsorships, easy unsubscribe.
        </p>
      </div>
      <div style={{ flex: "1 1 320px" }}>
        <NewsletterForm size="lg" />
      </div>
    </section>
  );
}

function SubmitBlock() {
  return (
    <section
      style={{
        border: "1px dashed var(--border-strong)",
        background: "transparent",
        borderRadius: 8,
        padding: "32px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 600 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          Got a recipe?
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Add yours to the directory.
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>
          Open-source agent stacks only. We review weekly and publish anything
          reproducible.
        </p>
      </div>
      <Link
        href="/submit"
        style={{
          padding: "10px 18px",
          background: "var(--accent)",
          color: "#fff",
          textDecoration: "none",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        Submit a recipe
        <Icon name="arrow-right" size={13} />
      </Link>
    </section>
  );
}

function FaqBlock() {
  return (
    <section
      id="faq"
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          FAQ
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: 32,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Voice AI, answered.
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 12,
        }}
      >
        {HOME_FAQ.map((item) => (
          <details
            key={item.q}
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: 6,
              background: "var(--bg-surface-1)",
              padding: "14px 18px",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                fontSize: 15,
                fontWeight: 500,
                color: "var(--fg-1)",
                letterSpacing: "-0.005em",
              }}
            >
              {item.q}
              <Icon name="chevron-down" size={14} style={{ color: "var(--fg-3)" }} />
            </summary>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--fg-2)",
              }}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function AboutBlock() {
  return (
    <section
      id="about"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: 48,
        alignItems: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            background: "var(--bg-surface-1)",
            border: "1px solid var(--border-default)",
            borderRadius: 6,
          }}
        >
          <BrandMark size={20} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>
            SpeechStack
          </span>
        </div>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          About the directory
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Built by voice AI engineers, for voice AI engineers.
        </h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "var(--fg-2)" }}>
          Most voice AI &ldquo;comparison&rdquo; sites are vendor pages dressed
          up as research. SpeechStack is the opposite: a flat, open-source
          directory of real production recipes with the full pipeline, prompt,
          and config visible. No affiliate links, no paid placements, no
          ranking tricks.
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "var(--fg-2)" }}>
          If you spot a recipe that&rsquo;s outdated or wrong, open an issue on
          GitHub. If you&rsquo;ve shipped something we don&rsquo;t cover, submit
          it.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "9px 14px",
              border: "1px solid var(--border-strong)",
              borderRadius: 6,
              color: "var(--fg-1)",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="github" size={13} />
            GitHub
          </a>
          <Link
            href="/submit"
            style={{
              padding: "9px 14px",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Submit a recipe
          </Link>
        </div>
      </div>
    </section>
  );
}
