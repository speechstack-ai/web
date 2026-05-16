import { env } from "~/env";

export const SITE_URL = env.NEXT_PUBLIC_SITE_URL ?? "https://speechstack.dev";

export const SITE_NAME = "SpeechStack";

export const SITE_DESCRIPTION =
  "Curated voice AI recipes across Vapi, Retell, LiveKit, Cartesia, Pipecat, ElevenLabs, Bland, and more. STT, LLM, TTS, and glue.";
