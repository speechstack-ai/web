import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "~/app/_components/site/Footer";
import { SiteShell } from "~/app/_components/site/SiteShell";
import { TRPCReactProvider } from "~/trpc/react";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "~/utils/site";

const fontSans = localFont({
  src: "../../public/fonts/Geist-Variable.ttf",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

const fontMono = localFont({
  src: "../../public/fonts/GeistMono-Variable.ttf",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — the voice AI directory`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "voice AI",
    "voice agents",
    "Vapi",
    "Retell",
    "LiveKit",
    "Pipecat",
    "Cartesia",
    "ElevenLabs",
    "Deepgram",
    "Bland",
    "speech to text",
    "text to speech",
    "telephony",
  ],
  authors: [{ name: SITE_NAME }],
  icons: [{ rel: "icon", url: "/brand/mark.svg" }],
  alternates: {
    types: {
      "text/markdown": [
        { url: "/llms.txt", title: "LLM-friendly index" },
        { url: "/llms-full.txt", title: "Full recipe content for LLMs" },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — the voice AI directory`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — the voice AI directory`,
    description: SITE_DESCRIPTION,
  },
};

const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo.svg`,
      },
      sameAs: ["https://github.com/speechstack-ai"],
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <TRPCReactProvider>
          <SiteShell footer={<Footer />}>{children}</SiteShell>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
