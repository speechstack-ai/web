import { ImageResponse } from "next/og";

import { formatCost, formatLatency } from "~/types/recipe";
import { getRecipeById, getRecipes } from "~/utils/getRecipes";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getRecipes().map((r) => ({ id: r.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) {
    return new Response("Not found", { status: 404 });
  }

  const titleSize = recipe.title.length > 60 ? 52 : recipe.title.length > 40 ? 60 : 68;
  const pipeline: string[] = [
    ...(recipe.pipeline.telephony ? [recipe.pipeline.telephony] : []),
    recipe.pipeline.stt,
    recipe.pipeline.llm,
    recipe.pipeline.tts,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
                  fontSize: 18,
              color: "#22d3ee",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: "#22d3ee",
              }}
            />
            SpeechStack · Recipe
          </div>
          <div
            style={{
                  fontSize: 16,
              color: "#737373",
              border: "1px solid #2e2e2e",
              padding: "6px 12px",
              borderRadius: 4,
            }}
          >
            {recipe.framework}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              fontWeight: 600,
              color: "#fafafa",
            }}
          >
            {recipe.title}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
                  fontSize: 20,
              color: "#d4d4d4",
            }}
          >
            {pipeline.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    border: "1px solid #2e2e2e",
                    padding: "6px 12px",
                    borderRadius: 4,
                    background: "#141414",
                  }}
                >
                  {step}
                </div>
                {i < pipeline.length - 1 && <span style={{ color: "#525252" }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid #2e2e2e",
          }}
        >
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                          fontSize: 13,
                  color: "#737373",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                latency
              </span>
              <span style={{ fontSize: 28, color: "#fafafa" }}>
                {formatLatency(recipe)}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                          fontSize: 13,
                  color: "#737373",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                cost / min
              </span>
              <span style={{ fontSize: 28, color: "#fafafa" }}>
                {formatCost(recipe)}
              </span>
            </div>
          </div>
          <span
            style={{ fontSize: 20, color: "#22d3ee" }}
          >
            speechstack.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
