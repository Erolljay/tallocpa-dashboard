/**
 * Ad and post attribution carried from the website to the quote form. A visitor
 * who lands from a Facebook post on /?utm_source=facebook&ref=post-12 and clicks
 * "Get a quote" two pages later reaches /start?utm_source=facebook&ref=post-12,
 * where lead-source tracking reads them.
 */

/** Session storage key holding the first landing's attribution for this visit. */
export const ATTRIBUTION_KEY = "tallo:attribution";

const KEEP = /^(utm_[a-z0-9_]+|ref|fbclid|gclid)$/i;
const MAX_VALUE = 200;

/** The attribution params of a query string, in order, as a query string without "?" ("" when none). */
export function pickAttribution(search: string): string {
  const out = new URLSearchParams();
  for (const [k, v] of new URLSearchParams(search)) {
    if (KEEP.test(k) && v && !out.has(k)) out.set(k.toLowerCase(), v.slice(0, MAX_VALUE));
  }
  return out.toString();
}

/** Adds attribution to a same-site link, keeping the link's own query and #fragment. */
export function withAttribution(href: string, attribution: string): string {
  if (!attribution || !href.startsWith("/")) return href;
  const hashAt = href.indexOf("#");
  const base = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : href.slice(hashAt);
  const [path, query = ""] = base.split("?");
  const params = new URLSearchParams(query);
  for (const [k, v] of new URLSearchParams(attribution)) if (!params.has(k)) params.set(k, v);
  const qs = params.toString();
  return `${path}${qs ? `?${qs}` : ""}${hash}`;
}
