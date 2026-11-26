import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site/config";

/** Crawlers may read the website; the app, portal, sign-in and private links stay out of search. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/app", "/portal", "/login", "/book", "/proposal", "/api", "/auth"] },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
