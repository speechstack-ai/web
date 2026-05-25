import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "~/env";

const SUBSCRIBE_LOCATIONS = ["homepage", "submit", "recipe-detail"] as const;

const requestSchema = z.object({
  email: z.string().trim().email(),
  location: z.enum(SUBSCRIBE_LOCATIONS),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(
    await request.json().catch(() => null),
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
    return NextResponse.json(
      { error: "Email signup is not configured yet." },
      { status: 503 },
    );
  }

  let response: Response;

  try {
    response = await fetch(
      `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parsed.data.email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "speechstack-web",
          utm_medium: parsed.data.location,
        }),
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not subscribe that email. Try again in a minute." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not subscribe that email. Try again in a minute." },
      { status: response.status >= 400 && response.status < 500 ? 400 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
