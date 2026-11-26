import type { Metadata } from "next";
import { BRAND_NAME, siteUrl } from "./config";

/**
 * Per-page metadata for the website: title (60 characters at most), meta description
 * (155 at most), canonical on SITE_URL with an en-PH hreflang self-reference, Open
 * Graph and Twitter card. The link-preview image is src/app/opengraph-image.tsx.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = siteUrl(path);
  const image = { url: siteUrl("/opengraph-image"), width: 1200, height: 630, alt: `${BRAND_NAME}: Clear Numbers. Clean Compliance.` };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { "en-PH": url, "x-default": url } },
    openGraph: { type: "website", locale: "en_PH", siteName: BRAND_NAME, title, description, url, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/**
 * The site's pages, their primary search phrase and when their content last changed
 * (for the sitemap's lastmod; update the date when you change a page's copy).
 */
export const SITE_PAGES: { path: string; keyword: string; updated: string; priority: number }[] = [
  { path: "/", keyword: "CPA firm for bookkeeping and BIR compliance, Philippines", updated: "2026-11-26", priority: 1 },
  { path: "/services", keyword: "accounting and tax services Philippines", updated: "2026-11-26", priority: 0.9 },
  { path: "/bir-filing-calendar", keyword: "BIR filing calendar, tax deadlines", updated: "2026-11-26", priority: 0.9 },
  { path: "/about", keyword: "Philippine CPA in public practice", updated: "2026-11-26", priority: 0.6 },
  { path: "/faq", keyword: "BIR deadlines and onboarding questions", updated: "2026-11-26", priority: 0.7 },
  { path: "/contact", keyword: "contact a CPA firm, request a quote", updated: "2026-11-26", priority: 0.7 },
  { path: "/privacy", keyword: "privacy notice", updated: "2026-11-26", priority: 0.2 },
];
export const SERVICES_UPDATED = "2026-11-26";
