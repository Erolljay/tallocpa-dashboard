import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site/config";
import { SERVICES } from "@/lib/site/content";
import { SERVICES_UPDATED, SITE_PAGES } from "@/lib/site/metadata";

/** The public website's pages (tallocpa.com), with when each last changed. The app's pages are not listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...SITE_PAGES.map((p) => ({ url: siteUrl(p.path), lastModified: p.updated, changeFrequency: "monthly" as const, priority: p.priority })),
    ...SERVICES.map((s) => ({ url: siteUrl(`/services/${s.slug}`), lastModified: SERVICES_UPDATED, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
