import { ImageResponse } from "next/og";

import { SITE_NAME } from "~/utils/site";

const OG_DESCRIPTION =
  "Forkable voice AI templates with the stack, the prompt, the config, and the unit economics. Cost/min and p50 latency published.";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — Voice AI Stack Library`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            color: "#22d3ee",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: "#22d3ee",
            }}
          />
          SpeechStack
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 600,
              color: "#fafafa",
            }}
          >
            Voice AI Stack Library.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: "#a3a3a3",
              maxWidth: 920,
            }}
          >
            {OG_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: "1px solid #2e2e2e",
            fontSize: 20,
            color: "#737373",
          }}
        >
          <span>Vapi · Retell · LiveKit · Pipecat · Bland</span>
          <span style={{ color: "#22d3ee" }}>speechstack.com</span>
        </div>
      </div>
    ),
    size,
  );
}
