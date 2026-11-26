/**
 * The public website (tallocpa.com). It is served by the same deployment as the
 * app (app.tallocpa.com); src/proxy.ts decides what "/" is on each host.
 *
 *   SITE_URL   optional; the website's address for canonical links, the sitemap
 *              and link previews (default https://tallocpa.com)
 *   APP_URL    optional; the app's address (also used by Google sign-in). The website's
 *              "Client log-in" goes to its /login (default https://app.tallocpa.com/login).
 */
export const SITE_URL = (process.env.SITE_URL || "https://tallocpa.com").replace(/\/+$/, "");

/** Absolute URL on the website, e.g. siteUrl("/services") → https://tallocpa.com/services. */
export function siteUrl(path = "/"): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Where clients and staff log in: the app's host (on tallocpa.com the app lives on app.tallocpa.com). */
export function signInHref(): string {
  const app = process.env.APP_URL?.replace(/\/+$/, "") || "https://app.tallocpa.com";
  return `${app}/login`;
}

export const BRAND_NAME = "Tallo CPA";
export const TAGLINE = "Clear Numbers. Clean Compliance.";
export const PRACTITIONER = "Eroll Jay C. Tallo, CPA";

/** One label for the quote intent everywhere on the site. */
export const QUOTE_LABEL = "Get a quote";
