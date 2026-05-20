import type { Metadata } from "next";

import { VendorCard, type PricingBand } from "~/app/_components/site/VendorCard";
import { SITE_NAME, SITE_URL } from "~/utils/site";

export const dynamic = "force-static";

const STACK_TITLE = "Voice AI Stack Atlas";
const STACK_H1 = "The voice AI stack, mapped.";
const STACK_SUBHEAD =
  "Pick a layer, see who builds there, click through to a template that runs it in production.";

const PLACEHOLDER_DESCRIPTION = "[Description coming]";
const PLACEHOLDER_PRICING: PricingBand = "$$";

export const metadata: Metadata = {
  title: STACK_TITLE,
  description: STACK_SUBHEAD,
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    title: `${STACK_TITLE} · ${SITE_NAME}`,
    description: STACK_SUBHEAD,
  },
  twitter: {
    card: "summary_large_image",
    title: `${STACK_TITLE} · ${SITE_NAME}`,
    description: STACK_SUBHEAD,
  },
};

type LayerVendor = {
  name: string;
  description: string;
  pricingBand: PricingBand;
  templateCount: number;
};

type Layer = {
  id: string;
  heading: string;
  vendors: LayerVendor[];
};

// Vendors are alphabetical within each layer. Three populated cards (Vapi,
// Deepgram, ElevenLabs) carry locked copy verbatim. All others are
// placeholders pending research-sourced pricing + final positioning lines.
const LAYERS: Layer[] = [
  {
    id: "telephony",
    heading: "Telephony",
    vendors: [
      { name: "Daily", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Plivo", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Telnyx", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Twilio", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Vonage", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
    ],
  },
  {
    id: "stt",
    heading: "Speech-to-text",
    vendors: [
      { name: "AssemblyAI", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      {
        name: "Deepgram",
        description: "Speech-to-text API. Hosted and self-hosted.",
        pricingBand: PLACEHOLDER_PRICING,
        templateCount: 0,
      },
      { name: "Google Speech", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "OpenAI Whisper", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Speechmatics", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
    ],
  },
  {
    id: "llm",
    heading: "LLM",
    vendors: [
      { name: "Anthropic Claude", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Google Gemini", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Groq", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Mistral", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "OpenAI GPT", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
    ],
  },
  {
    id: "tts",
    heading: "Text-to-speech",
    vendors: [
      { name: "Azure TTS", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Cartesia", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      {
        name: "ElevenLabs",
        description: "Text-to-speech platform. Hosted.",
        pricingBand: PLACEHOLDER_PRICING,
        templateCount: 0,
      },
      { name: "OpenAI TTS", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "PlayHT", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Resemble AI", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
    ],
  },
  {
    id: "orchestration",
    heading: "Orchestration",
    vendors: [
      { name: "Bland", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "LiveKit", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Pipecat", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      { name: "Retell", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
      {
        name: "Vapi",
        description: "Orchestration platform for voice agents. Hosted.",
        pricingBand: PLACEHOLDER_PRICING,
        templateCount: 0,
      },
      { name: "Vocode", description: PLACEHOLDER_DESCRIPTION, pricingBand: PLACEHOLDER_PRICING, templateCount: 0 },
    ],
  },
];

function StackHero() {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-canvas)",
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "40px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-fg)",
            fontWeight: 600,
          }}
        >
          Voice AI Stack Atlas
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 40,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            fontWeight: 600,
            color: "var(--fg-1)",
          }}
        >
          {STACK_H1}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--fg-2)",
          }}
        >
          {STACK_SUBHEAD}
        </p>
      </div>
    </section>
  );
}

function LayerSection({ layer }: { layer: Layer }) {
  return (
    <section
      id={layer.id}
      style={{
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
        >
          {layer.heading}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {layer.vendors.map((v) => (
            <VendorCard
              key={v.name}
              name={v.name}
              layer={layer.heading}
              description={v.description}
              pricingBand={v.pricingBand}
              templateCount={v.templateCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StackPage() {
  return (
    <>
      <StackHero />
      {LAYERS.map((layer) => (
        <LayerSection key={layer.id} layer={layer} />
      ))}
    </>
  );
}
