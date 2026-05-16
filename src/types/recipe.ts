export const FRAMEWORKS = [
  "Vapi",
  "Retell",
  "LiveKit",
  "Pipecat",
  "Bland",
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const STT_ENGINES = ["Deepgram", "AssemblyAI", "Whisper"] as const;
export type STTEngine = (typeof STT_ENGINES)[number];

export const TTS_ENGINES = ["Cartesia", "ElevenLabs", "PlayHT"] as const;
export type TTSEngine = (typeof TTS_ENGINES)[number];

export type RecipeTool = {
  name: string;
  description: string;
};

export type RecipeConfig = {
  voice_id: string;
  temperature: number;
  barge_in: boolean;
  tools: RecipeTool[];
};

export type RecipePipeline = {
  stt: string;
  llm: string;
  tts: string;
  telephony?: string;
};

export type RecipeMetrics = {
  latency: string;
  cost_per_minute: string;
};

export type RecipeBadge = "verified" | "beta" | "new";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  framework: Framework;
  pipeline: RecipePipeline;
  metrics: RecipeMetrics;
  raw_prompt: string;
  config: RecipeConfig;
  github_source_url: string;

  /** Optional display extensions kept for grid visuals (not part of the strict PRD schema). */
  badge?: RecipeBadge;
  forks?: number;
  stars?: number;
  updated?: string;
  featured?: boolean;
};

/** Returns the numeric millisecond portion of a metrics.latency string like "~187ms" or "500-700ms". Takes the LOWER bound when a range is given. */
export function parseLatencyMs(latency: string): number {
  const match = /(\d+)/.exec(latency);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}
