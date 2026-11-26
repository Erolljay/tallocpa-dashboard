import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site/config";
import { SERVICES } from "@/lib/site/content";

/** The public website's pages (tallocpa.com). The app's pages are not listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({ url: siteUrl(p.path), changeFrequency: p.changeFrequency, priority: p.priority }));
}
