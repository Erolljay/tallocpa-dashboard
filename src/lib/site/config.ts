/**
 * The public website (tallocpa.com). It is served by the same deployment as the
 * app (app.tallocpa.com); src/proxy.ts decides what "/" is on each host.
 *
 *   SITE_URL   optional; the website's address for canonical links, the sitemap
 *              and link previews (default https://tallocpa.com)
 *   APP_URL    optional; the app's address (also used by Google sign-in). When set,
 *              the website's "Sign in" link goes there instead of this host's /login.
 */
export const SITE_URL = (process.env.SITE_URL || "https://tallocpa.com").replace(/\/+$/, "");

/** Absolute URL on the website, e.g. siteUrl("/services") → https://tallocpa.com/services. */
export function siteUrl(path = "/"): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Where clients and staff sign in. */
export function signInHref(): string {
  const app = process.env.APP_URL?.replace(/\/+$/, "");
  return app ? `${app}/login` : "/login";
}

export const BRAND_NAME = "Tallo CPA";
export const TAGLINE = "Clear Numbers. Clean Compliance.";
export const PRACTITIONER = "Eroll Jay C. Tallo, CPA";
