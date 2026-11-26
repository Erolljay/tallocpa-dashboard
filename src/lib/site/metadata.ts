import type { Metadata } from "next";
import { BRAND_NAME, siteUrl } from "./config";

/**
 * Per-page metadata for the website: title, description, canonical on SITE_URL,
 * Open Graph and Twitter card. The link-preview image comes from
 * src/app/(site)/opengraph-image.tsx; it is named here too so pages that set their
 * own openGraph keep it.
 */
export function pageMetadata({ title, description, path }: { title: string | null; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} · ${BRAND_NAME}` : `${BRAND_NAME} · Clear Numbers. Clean Compliance.`;
  const url = siteUrl(path);
  const image = { url: siteUrl("/opengraph-image"), width: 1200, height: 630, alt: `${BRAND_NAME}: Clear Numbers. Clean Compliance.` };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_PH", siteName: BRAND_NAME, title: fullTitle, description, url, images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
