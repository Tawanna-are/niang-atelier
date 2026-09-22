import type { Metadata } from "next";

// Set SITE_URL to the real public origin before deployment.
const configuredUrl = process.env.SITE_URL?.trim();
export const siteUrl = configuredUrl ? new URL(configuredUrl) : null;
if (siteUrl && !["https:", "http:"].includes(siteUrl.protocol)) {
  throw new Error("SITE_URL must be an absolute HTTP or HTTPS URL.");
}
export const metadataBase = siteUrl ?? new URL("http://localhost:3000");

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: new URL(path, siteUrl).href } } : {}),
    openGraph: {
      type: "website",
      siteName: "NiangAtelier",
      locale: "en_US",
      title,
      description,
      ...(siteUrl ? { url: new URL(path, siteUrl).href } : {}),
      images: [{ url: "/brand-card", width: 1200, height: 630, alt: "NiangAtelier — Handmade objects, small sculptures and wool felt art" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/brand-card", alt: "NiangAtelier — Handmade objects, small sculptures and wool felt art" }],
    },
  };
}
