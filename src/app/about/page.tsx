import type { Metadata } from "next";

import { SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

const ABOUT_DESCRIPTION =
  "Why SpeechStack exists: a neutral, structured, honest directory of voice AI stacks, templates, and unit economics — built by Zach Capshaw.";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    title: `About · ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `About · ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "80px 32px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 56,
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--fg-3)",
            fontWeight: 600,
          }}
        >
          About
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 44,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          Why this exists.
        </h1>
      </header>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontSize: 17,
          lineHeight: 1.65,
          color: "var(--fg-1)",
        }}
      >
        <p style={{ margin: 0 }}>
          I built voice agents for two years before SpeechStack. Every project
          started the same way: open seven browser tabs, read seven sets of
          vendor docs, pick a stack, hope it works.
        </p>
        <p style={{ margin: 0 }}>
          The stacks were the bottleneck. Not the code, not the model. The{" "}
          <em>stack</em>. Which STT pairs well with which TTS at which latency?
          What does it cost to run a Vapi agent end-to-end with Deepgram and
          Cartesia? Why does this Retell config feel three turns slower than
          the LiveKit one? Nobody answered these questions in one place. The
          vendor docs each made their own product look like the right pick.
        </p>
        <p style={{ margin: 0 }}>SpeechStack is the directory I wanted to read.</p>
        <p style={{ margin: 0 }}>
          Cursor Directory mapped the AI coding stack into one neutral surface.
          The voice AI category needs the same thing, and it doesn&apos;t exist
          yet. So: this site. Every template shows its stack, prompt, and
          config. Every template publishes what it costs to run. Every vendor
          across the five layers gets the same card shape on{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>
            /stack
          </code>
          . Nobody pays for a better position. There isn&apos;t one.
        </p>
        <p style={{ margin: 0 }}>
          <strong>The bar.</strong> Every template has to satisfy four
          criteria: schema-able artifact, forkable or copyable, specific named
          outcome, multi-component stack. If a submission fails any of them, it
          doesn&apos;t ship. Not as a draft, not as a &ldquo;coming soon.&rdquo;
          The bar is the product. Lowering it would turn this back into the
          thing we&apos;re trying to replace.
        </p>
        <p style={{ margin: 0 }}>
          We don&apos;t write editorial. We don&apos;t rank vendors. We
          don&apos;t run &ldquo;best of&rdquo; lists. The closest we get is{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>
            /compare/[a-vs-b]
          </code>{" "}
          programmatic pages, where the comparison is the data, not the prose.
        </p>
        <p style={{ margin: 0 }}>
          Sponsorship pays for this site (eventually). Sponsors get logo
          placement on{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>
            /stack
          </code>{" "}
          and footer presence. They don&apos;t get editorial influence, ranking
          changes, or template-selection bias. If that trade-off doesn&apos;t
          work for a vendor, the trade-off isn&apos;t for them.
        </p>
        <p style={{ margin: 0 }}>
          SpeechStack is built on the side, by one person, for builders
          shipping voice AI for real. I made the call to keep it neutral,
          structured, and honest. If it gets useful, that&apos;s the bar
          holding.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
          Founder
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--fg-2)",
          }}
        >
          Zach Capshaw is the founder of SpeechStack. He co-founded
          Flashquotes, where he&apos;s CEO and CMO, and spent the prior decade
          in software product strategy. He started SpeechStack after building
          voice AI agents on the side and finding no neutral place to read
          other people&apos;s stacks. He maintains the directory, reviews every
          submission, and tests verified templates personally.
        </p>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
          How templates get added
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--fg-2)",
          }}
        >
          Two paths: open a PR on GitHub, or fill the form. Both land in the
          same queue. We review every submission against the four-criteria bar.
          Approved templates ship with{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>
            verified:false
          </code>{" "}
          until Zach test-runs them. The flag flips to{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>
            true
          </code>{" "}
          once he&apos;s placed a call or run the workflow himself.
        </p>
      </section>
    </main>
  );
}
