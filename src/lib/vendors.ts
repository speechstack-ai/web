// Single source of truth for vendor data on /tools and /tools/[slug].
// Copy sourced from research doc: Vendor Data v1.
// Pricing helpers are written in plain language. No em dashes in user-facing copy.

export type VendorLayer = "telephony" | "stt" | "llm" | "tts" | "orchestration";
export type PricingBand = "$" | "$$" | "$$$";
export type Hosting = "cloud" | "self-host" | "hybrid";

export type Vendor = {
  slug: string;
  name: string;
  layer: VendorLayer;
  description: string;
  pricingBand: PricingBand;
  pricingHelper: string;
  pricingSourceUrl: string;
  officialSite: string;
  hosting: Hosting;
  markPath: string;
  templateCount: number;
};

export const LAYER_LABELS: Record<VendorLayer, string> = {
  telephony: "Telephony",
  stt: "Speech-to-text",
  llm: "LLM",
  tts: "Text-to-speech",
  orchestration: "Orchestration",
};

export const LAYER_ORDER: VendorLayer[] = [
  "telephony",
  "stt",
  "llm",
  "tts",
  "orchestration",
];

export const VENDORS: Vendor[] = [
  // Telephony
  {
    slug: "daily",
    name: "Daily",
    layer: "telephony",
    description:
      "WebRTC and SIP infrastructure for real-time voice and video. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per participant minute",
    pricingSourceUrl: "https://www.daily.co/pricing",
    officialSite: "https://www.daily.co",
    hosting: "cloud",
    markPath: "/brand/vendors/daily.svg",
    templateCount: 0,
  },
  {
    slug: "plivo",
    name: "Plivo",
    layer: "telephony",
    description:
      "Voice and messaging CPaaS with global PSTN coverage. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per minute plus number rental",
    pricingSourceUrl: "https://www.plivo.com/pricing/voice/",
    officialSite: "https://www.plivo.com",
    hosting: "cloud",
    markPath: "/brand/vendors/plivo.svg",
    templateCount: 0,
  },
  {
    slug: "telnyx",
    name: "Telnyx",
    layer: "telephony",
    description:
      "Carrier-grade voice, SIP, and messaging on a private IP backbone. Hosted.",
    pricingBand: "$",
    pricingHelper: "Pay-as-you-go per minute, by destination",
    pricingSourceUrl: "https://telnyx.com/pricing/elastic-sip",
    officialSite: "https://telnyx.com",
    hosting: "cloud",
    markPath: "/brand/vendors/telnyx.svg",
    templateCount: 0,
  },
  {
    slug: "twilio",
    name: "Twilio",
    layer: "telephony",
    description: "Programmable voice, SMS, and SIP APIs. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Pay-as-you-go per minute, with Media Streams add-on",
    pricingSourceUrl: "https://www.twilio.com/en-us/voice/pricing/us",
    officialSite: "https://www.twilio.com",
    hosting: "cloud",
    markPath: "/brand/vendors/twilio.svg",
    templateCount: 0,
  },
  {
    slug: "vonage",
    name: "Vonage",
    layer: "telephony",
    description:
      "Voice, video, and messaging APIs from the Vonage Communications Platform. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Pay-as-you-go per minute, by destination",
    pricingSourceUrl:
      "https://www.vonage.com/communications-apis/voice/pricing/",
    officialSite: "https://www.vonage.com/communications-apis/",
    hosting: "cloud",
    markPath: "/brand/vendors/vonage.svg",
    templateCount: 0,
  },

  // Speech-to-text
  {
    slug: "assemblyai",
    name: "AssemblyAI",
    layer: "stt",
    description:
      "Speech-to-text API with streaming and async transcription. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per second of audio",
    pricingSourceUrl: "https://www.assemblyai.com/pricing",
    officialSite: "https://www.assemblyai.com",
    hosting: "cloud",
    markPath: "/brand/vendors/assemblyai.svg",
    templateCount: 0,
  },
  {
    slug: "deepgram",
    name: "Deepgram",
    layer: "stt",
    description: "Speech-to-text API. Hosted and self-hosted.",
    pricingBand: "$",
    pricingHelper: "Pay-as-you-go per minute, plus on-prem option",
    pricingSourceUrl: "https://deepgram.com/pricing",
    officialSite: "https://deepgram.com",
    hosting: "hybrid",
    markPath: "/brand/vendors/deepgram.svg",
    templateCount: 0,
  },
  {
    slug: "google-speech",
    name: "Google Speech",
    layer: "stt",
    description:
      "Speech-to-Text API on Google Cloud with streaming and batch modes. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Pay-as-you-go in 15-second increments",
    pricingSourceUrl: "https://cloud.google.com/speech-to-text/pricing",
    officialSite: "https://cloud.google.com/speech-to-text",
    hosting: "cloud",
    markPath: "/brand/vendors/google.svg",
    templateCount: 0,
  },
  {
    slug: "openai-whisper",
    name: "OpenAI Whisper",
    layer: "stt",
    description:
      "Speech-to-text models from OpenAI, available via API or as open weights. Hosted and self-hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per minute, or run open weights yourself",
    pricingSourceUrl: "https://openai.com/api/pricing/",
    officialSite: "https://platform.openai.com/docs/guides/speech-to-text",
    hosting: "hybrid",
    markPath: "/brand/vendors/openai.svg",
    templateCount: 0,
  },
  {
    slug: "speechmatics",
    name: "Speechmatics",
    layer: "stt",
    description:
      "Speech-to-text API and on-prem container with streaming and batch modes. Hosted and self-hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per hour of audio, on-prem licensed",
    pricingSourceUrl: "https://www.speechmatics.com/pricing",
    officialSite: "https://www.speechmatics.com",
    hosting: "hybrid",
    markPath: "/brand/vendors/speechmatics.svg",
    templateCount: 0,
  },

  // LLM
  {
    slug: "anthropic-claude",
    name: "Anthropic Claude",
    layer: "llm",
    description: "Claude family of language models from Anthropic. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Pay-as-you-go per million tokens, by tier",
    pricingSourceUrl: "https://www.anthropic.com/pricing#api",
    officialSite: "https://www.anthropic.com",
    hosting: "cloud",
    markPath: "/brand/vendors/anthropic.svg",
    templateCount: 0,
  },
  {
    slug: "google-gemini",
    name: "Google Gemini",
    layer: "llm",
    description: "Gemini family of language models from Google. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per million tokens, audio billed separately",
    pricingSourceUrl: "https://ai.google.dev/pricing",
    officialSite: "https://ai.google.dev",
    hosting: "cloud",
    markPath: "/brand/vendors/google.svg",
    templateCount: 0,
  },
  {
    slug: "groq",
    name: "Groq",
    layer: "llm",
    description:
      "Inference API serving open-weight models on LPU hardware. Hosted.",
    pricingBand: "$",
    pricingHelper: "Pay-as-you-go per million tokens, by model",
    pricingSourceUrl: "https://groq.com/pricing/",
    officialSite: "https://groq.com",
    hosting: "cloud",
    markPath: "/brand/vendors/groq.svg",
    templateCount: 0,
  },
  {
    slug: "mistral",
    name: "Mistral",
    layer: "llm",
    description:
      "Open-weight and hosted language models from Mistral AI. Hosted and self-hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per million tokens, weights free to self-host",
    pricingSourceUrl: "https://mistral.ai/pricing",
    officialSite: "https://mistral.ai",
    hosting: "hybrid",
    markPath: "/brand/vendors/mistral.svg",
    templateCount: 0,
  },
  {
    slug: "openai-gpt",
    name: "OpenAI GPT",
    layer: "llm",
    description: "GPT family of language models from OpenAI. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Pay-as-you-go per million tokens, Realtime billed per minute",
    pricingSourceUrl: "https://openai.com/api/pricing/",
    officialSite: "https://platform.openai.com",
    hosting: "cloud",
    markPath: "/brand/vendors/openai.svg",
    templateCount: 0,
  },

  // Text-to-speech
  {
    slug: "azure-tts",
    name: "Azure TTS",
    layer: "tts",
    description:
      "Neural text-to-speech voices from Azure AI Speech. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per million characters",
    pricingSourceUrl:
      "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/",
    officialSite:
      "https://azure.microsoft.com/en-us/products/ai-services/ai-speech",
    hosting: "cloud",
    markPath: "/brand/vendors/azure.svg",
    templateCount: 0,
  },
  {
    slug: "cartesia",
    name: "Cartesia",
    layer: "tts",
    description:
      "Streaming text-to-speech built on state space models. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Subscription tiers metered by characters",
    pricingSourceUrl: "https://cartesia.ai/pricing",
    officialSite: "https://cartesia.ai",
    hosting: "cloud",
    markPath: "/brand/vendors/cartesia.svg",
    templateCount: 0,
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    layer: "tts",
    description: "Text-to-speech platform. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Monthly tiers metered by characters",
    pricingSourceUrl: "https://elevenlabs.io/pricing",
    officialSite: "https://elevenlabs.io",
    hosting: "cloud",
    markPath: "/brand/vendors/elevenlabs.svg",
    templateCount: 0,
  },
  {
    slug: "openai-tts",
    name: "OpenAI TTS",
    layer: "tts",
    description:
      "Text-to-speech voices from OpenAI, available via API. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Pay-as-you-go per million characters",
    pricingSourceUrl: "https://openai.com/api/pricing/",
    officialSite: "https://platform.openai.com/docs/guides/text-to-speech",
    hosting: "cloud",
    markPath: "/brand/vendors/openai.svg",
    templateCount: 0,
  },
  {
    slug: "playht",
    name: "PlayHT",
    layer: "tts",
    description: "Text-to-speech and voice cloning APIs. Hosted.",
    pricingBand: "$$",
    pricingHelper: "Monthly tiers, with API plans on top",
    pricingSourceUrl: "https://play.ht/pricing/",
    officialSite: "https://play.ht",
    hosting: "cloud",
    markPath: "/brand/vendors/playht.svg",
    templateCount: 0,
  },
  {
    slug: "resemble",
    name: "Resemble AI",
    layer: "tts",
    description:
      "Text-to-speech and voice cloning with hosted and on-prem options. Hosted and self-hosted.",
    pricingBand: "$$$",
    pricingHelper: "Monthly tiers, with on-prem quoted separately",
    pricingSourceUrl: "https://www.resemble.ai/pricing/",
    officialSite: "https://www.resemble.ai",
    hosting: "hybrid",
    markPath: "/brand/vendors/resemble.svg",
    templateCount: 0,
  },

  // Orchestration
  {
    slug: "bland",
    name: "Bland",
    layer: "orchestration",
    description:
      "Voice agent platform with bundled telephony and models. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Flat per-minute rate, all-in",
    pricingSourceUrl: "https://www.bland.ai/pricing",
    officialSite: "https://www.bland.ai",
    hosting: "cloud",
    markPath: "/brand/vendors/bland.svg",
    templateCount: 0,
  },
  {
    slug: "livekit",
    name: "LiveKit",
    layer: "orchestration",
    description:
      "Open-source realtime infrastructure with an Agents framework for voice. Hosted and self-hosted.",
    pricingBand: "$$",
    pricingHelper: "Cloud metered by participant minutes, server is free",
    pricingSourceUrl: "https://livekit.io/pricing",
    officialSite: "https://livekit.io",
    hosting: "hybrid",
    markPath: "/brand/vendors/livekit.svg",
    templateCount: 0,
  },
  {
    slug: "pipecat",
    name: "Pipecat",
    layer: "orchestration",
    description:
      "Open-source Python framework for realtime voice and multimodal agents. Self-hosted.",
    pricingBand: "$",
    pricingHelper: "Framework is free, you pay underlying vendors",
    pricingSourceUrl: "https://github.com/pipecat-ai/pipecat",
    officialSite: "https://www.pipecat.ai",
    hosting: "self-host",
    markPath: "/brand/vendors/pipecat.svg",
    templateCount: 0,
  },
  {
    slug: "retell",
    name: "Retell",
    layer: "orchestration",
    description:
      "Voice agent platform with model routing and telephony integrations. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Per-minute platform fee, premium voices extra",
    pricingSourceUrl: "https://www.retellai.com/pricing",
    officialSite: "https://www.retellai.com",
    hosting: "cloud",
    markPath: "/brand/vendors/retell.svg",
    templateCount: 0,
  },
  {
    slug: "vapi",
    name: "Vapi",
    layer: "orchestration",
    description: "Orchestration platform for voice agents. Hosted.",
    pricingBand: "$$$",
    pricingHelper: "Per-minute platform fee, plus vendor pass-through",
    pricingSourceUrl: "https://vapi.ai/pricing",
    officialSite: "https://vapi.ai",
    hosting: "cloud",
    markPath: "/brand/vendors/vapi.svg",
    templateCount: 0,
  },
  {
    slug: "vocode",
    name: "Vocode",
    layer: "orchestration",
    description:
      "Open-source Python library for building voice agents. Hosted and self-hosted.",
    pricingBand: "$",
    pricingHelper: "Library is free, hosted tier on request",
    pricingSourceUrl: "https://www.vocode.dev",
    officialSite: "https://www.vocode.dev",
    hosting: "hybrid",
    markPath: "/brand/vendors/vocode.svg",
    templateCount: 0,
  },
];

export function getVendorsByLayer(layer: VendorLayer): Vendor[] {
  return VENDORS.filter((v) => v.layer === layer);
}

export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}
