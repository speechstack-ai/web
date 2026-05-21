"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Suspense, useEffect } from "react";

import { env } from "~/env";

/**
 * Client-side PostHog provider for the App Router.
 *
 * Configuration is driven entirely by env. If NEXT_PUBLIC_POSTHOG_KEY is not
 * set (e.g. local dev without a key) we render children unwrapped — PostHog
 * is never initialised and no network calls are made.
 *
 * Pageview tracking is handled manually because Next.js client-side route
 * changes don't fire a fresh page load, so PostHog's default capture_pageview
 * would miss most navigations in an SPA-ish App Router app.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const key = env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  useEffect(() => {
    if (!key) return;
    if (posthog.__loaded) return;
    posthog.init(key, {
      api_host: host,
      // We capture pageviews manually below to handle App Router transitions.
      capture_pageview: false,
      capture_pageleave: true,
      // Respect user privacy: don't autocapture form contents.
      mask_all_text: false,
      mask_all_element_attributes: false,
      person_profiles: "identified_only",
    });
  }, [key, host]);

  if (!key) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === "undefined") return;
    if (!posthog.__loaded) return;

    const search = searchParams?.toString();
    const url = window.origin + pathname + (search ? `?${search}` : "");
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}
