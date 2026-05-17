import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_NAME } from "~/utils/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — the voice AI directory`;

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
            The voice AI directory.
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: "#a3a3a3",
              maxWidth: 920,
            }}
          >
            {SITE_DESCRIPTION}
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
