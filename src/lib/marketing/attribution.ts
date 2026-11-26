/**
 * Lead-source tracking, the pure part (migration 20261214000001_lead_attribution.sql).
 *
 * A visitor's first touch is kept in the `tc_attr` cookie, set by /go/<code> (a
 * campaign link the Owner pastes in a Facebook post). /start sends it to
 * public.submit_lead as p_lead.attribution; with no cookie it sends the page's
 * utm_* and ref instead. The database cleans everything again; these helpers keep
 * what is sent small and tidy.
 */

export const ATTR_COOKIE = "tc_attr";
/** 90 days, in seconds. */
export const ATTR_COOKIE_MAX_AGE = 90 * 24 * 60 * 60;

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = Partial<Record<UtmKey, string>> & {
  /** A campaign link's code. */
  ref?: string;
  /** The referring site's host only. */
  referrer?: string;
  landing_path?: string;
  first_touch_at?: string;
};

const MAX = 100;

/** A short text: control characters out, trimmed, at most `max` characters; undefined when empty. */
export function cleanText(v: unknown, max = MAX): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max).trim();
  return s || undefined;
}

/** A campaign link's code (lowercase a-z, 0-9 and -, at most 40), or undefined. */
export function normalizeCode(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().toLowerCase();
  return /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/.test(s) ? s : undefined;
}

/** A path on this site ('/services'), never another site ('//evil.com') or a full address. */
export function safePath(v: unknown, max = 200): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  if (!s.startsWith("/") || s.startsWith("//") || s.length > max || /[\s\\]/.test(s)) return undefined;
  return s;
}

/** The host of a referrer address, lowercased; undefined for none, a bad address, or one of `ownHosts`. */
export function referrerHost(v: unknown, ownHosts: string[] = []): string | undefined {
  if (typeof v !== "string" || !v.trim()) return undefined;
  let host: string;
  try {
    host = new URL(v.trim()).hostname.toLowerCase();
  } catch {
    return undefined;
  }
  if (!/^[a-z0-9]([a-z0-9.-]{0,98}[a-z0-9])?$/.test(host) || !host.includes(".")) return undefined;
  const own = ownHosts.map((h) => h.toLowerCase().replace(/^www\./, ""));
  if (own.includes(host.replace(/^www\./, ""))) return undefined;
  return host;
}

type QueryLike = URLSearchParams | Record<string, string | string[] | undefined>;
const first = (q: QueryLike, k: string): string | undefined => {
  if (q instanceof URLSearchParams) return q.get(k) ?? undefined;
  const v = q[k];
  return Array.isArray(v) ? v[0] : v;
};

/**
 * The tags on a page's address: utm_*, and ref (a campaign link's code). Facebook
 * adds fbclid to links clicked there; with no utm_source that alone says Facebook.
 */
export function fromQuery(q: QueryLike): Attribution {
  const a: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = cleanText(first(q, k));
    if (v) a[k] = k === "utm_source" || k === "utm_medium" ? v.toLowerCase() : v;
  }
  const ref = normalizeCode(first(q, "ref"));
  if (ref) a.ref = ref;
  if (!a.utm_source && cleanText(first(q, "fbclid"))) a.utm_source = "facebook";
  return a;
}

/** Whether there is anything to say where the lead came from. */
export function hasSource(a: Attribution | null | undefined): a is Attribution {
  return Boolean(a && (a.utm_source || a.utm_medium || a.utm_campaign || a.utm_content || a.ref || a.referrer));
}

/** Only the known keys, each cleaned. Anything else is dropped. */
export function sanitize(input: unknown): Attribution {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const o = input as Record<string, unknown>;
  const a: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = cleanText(o[k]);
    if (v) a[k] = k === "utm_source" || k === "utm_medium" ? v.toLowerCase() : v;
  }
  const ref = normalizeCode(o.ref);
  if (ref) a.ref = ref;
  const referrer = cleanText(o.referrer);
  if (referrer && /^[a-z0-9]([a-z0-9.-]{0,98}[a-z0-9])?$/.test(referrer.toLowerCase())) a.referrer = referrer.toLowerCase();
  const landing = safePath(o.landing_path);
  if (landing) a.landing_path = landing;
  const at = typeof o.first_touch_at === "string" ? Date.parse(o.first_touch_at) : NaN;
  if (Number.isFinite(at)) a.first_touch_at = new Date(at).toISOString();
  return a;
}

/** The cookie's value: JSON of the cleaned attribution. */
export function serializeAttrCookie(a: Attribution): string {
  return JSON.stringify(sanitize(a));
}

/** The cookie read back; null when missing, unreadable or empty. */
export function parseAttrCookie(value: string | undefined | null): Attribution | null {
  if (!value) return null;
  for (const raw of [value, safeDecode(value)]) {
    if (!raw) continue;
    try {
      const a = sanitize(JSON.parse(raw));
      return hasSource(a) ? a : null;
    } catch {
      // try the next form
    }
  }
  return null;
}

function safeDecode(v: string): string | undefined {
  try {
    return decodeURIComponent(v);
  } catch {
    return undefined;
  }
}

/**
 * The lead's first touch: the cookie wins (it was set at the first visit through a
 * campaign link); else what the /start page itself knows (its query string and the
 * referrer). Null when neither says anything.
 */
export function firstTouch(cookie: Attribution | null, page: Attribution | null): Attribution | null {
  if (hasSource(cookie)) return sanitize(cookie);
  if (hasSource(page)) return sanitize(page);
  return null;
}

/** Where /go/<code> sends the visitor: the link's page on this site, with its utm_* tags added. */
export function targetUrl(base: string, targetPath: string, utm: Partial<Record<UtmKey, string | null>>): URL {
  const url = new URL(safePath(targetPath) ?? "/", base);
  for (const k of UTM_KEYS) {
    const v = utm[k];
    if (v) url.searchParams.set(k, v);
  }
  return url;
}

/** Link-preview robots (Facebook's crawler and friends) open the link too; their visits are not clicks. */
export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true;
  return /facebookexternalhit|facebot|meta-externalagent|bot\b|bot\/|crawler|spider|slurp|preview|whatsapp|telegram|discord|skype|embedly|curl|wget|python-requests|headless/i.test(userAgent);
}

/** What a page knows of its visitor's source: its query string, the referrer's host (not this site) and its path. */
export function fromPage(page: { search: string; referrer: string; pathname: string; hostname: string }): Attribution {
  const a: Attribution = fromQuery(new URLSearchParams(page.search));
  const referrer = referrerHost(page.referrer, [page.hostname]);
  if (referrer) a.referrer = referrer;
  const landing = safePath(page.pathname);
  if (landing) a.landing_path = landing;
  return a;
}
