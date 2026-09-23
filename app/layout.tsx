import type { Metadata, Viewport } from "next";
import { Caveat, Geist } from "next/font/google";
import type { ReactNode } from "react";

import { WebVitals } from "@/app/_components/web-vitals";
import { siteConfig } from "@/config/site";

import "./globals.css";
import "./sections.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  display: "swap",
});

const title = "Propsoch | Home of Intelligent Home Buying";
const description =
  "India's guided home-buying platform for smarter property decisions, expert guidance, verified research, and end-to-end support.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  applicationName: siteConfig.name,
  keywords: [
    "guided home buying",
    "property advisor India",
    "home buying platform",
    "Propsoch",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: "/images/propsoch-reference.png",
        width: 1920,
        height: 1080,
        alt: "Propsoch guided home-buying platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/propsoch-reference.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.primary,
  colorScheme: "light",
};

const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${caveat.variable}`}>
      <body>
        {analyticsEnabled ? <WebVitals /> : null}
        {children}
      </body>
    </html>
  );
}
