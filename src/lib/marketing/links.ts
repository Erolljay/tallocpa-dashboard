/**
 * Campaign links and lead sources, for the screens (migration
 * 20261214000001_lead_attribution.sql). Pure: no database, no environment except
 * where a function says so.
 */

export const PLATFORMS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "tiktok", label: "TikTok" },
  { value: "email", label: "Email" },
  { value: "print", label: "Print or QR code" },
  { value: "other", label: "Other" },
] as const;
export type Platform = (typeof PLATFORMS)[number]["value"];

/** utm_medium: an organic post, a paid ad, or the rest. */
export const MEDIUMS = [
  { value: "social", label: "Post (organic)" },
  { value: "paid_social", label: "Ad (paid)" },
  { value: "email", label: "Email" },
  { value: "qr", label: "QR code" },
  { value: "referral", label: "Referral" },
] as const;

/** The site's pages a link usually points at; any other path is allowed too. */
export const TARGET_PATHS = [
  { value: "/", label: "Home (/)" },
  { value: "/services", label: "Services (/services)" },
  { value: "/start", label: "Get a quote (/start)" },
  { value: "/contact", label: "Contact (/contact)" },
] as const;

const CHANNEL_LABELS: Record<string, string> = {
  ...Object.fromEntries(PLATFORMS.map((p) => [p.value, p.label])),
  google: "Google",
  direct: "Direct",
  staff: "Staff",
};

/** A channel's name for people: 'facebook' → 'Facebook'; a site's host stays as it is. */
export function channelLabel(channel: string | null | undefined): string {
  if (!channel) return "Direct";
  return CHANNEL_LABELS[channel] ?? channel;
}

/** The public site's address (SITE_URL, else https://tallocpa.com), without a trailing slash. Server only. */
export function siteUrl(env: Record<string, string | undefined> = process.env): string {
  const v = (env.SITE_URL || "https://tallocpa.com").trim().replace(/\/+$/, "");
  return /^https?:\/\/[^/\s]+$/.test(v) ? v : "https://tallocpa.com";
}

/** The address the Owner pastes in a post: https://tallocpa.com/go/<code>. */
export const linkUrl = (base: string, code: string) => `${base}/go/${code}`;

/** The channel a referrer host stands for, as the database works it out (private.referrer_channel). */
export function referrerChannel(host: string | null | undefined): string | null {
  if (!host) return null;
  if (/(^|\.)(facebook\.com|fb\.com|fb\.me)$/.test(host)) return "facebook";
  if (/(^|\.)instagram\.com$/.test(host)) return "instagram";
  if (/(^|\.)(linkedin\.com|lnkd\.in)$/.test(host)) return "linkedin";
  if (/(^|\.)tiktok\.com$/.test(host)) return "tiktok";
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
  return host.replace(/^www\./, "");
}

export type LeadSourceRow = {
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  marketing_links?: { label: string; platform: string; campaign: string; code: string } | null;
};

/** A lead's channel, as the report counts it: link platform, utm_source, referrer, staff, else direct. */
export function leadChannel(l: LeadSourceRow): string {
  return l.marketing_links?.platform || l.utm_source || referrerChannel(l.referrer) || (l.source === "staff" ? "staff" : "direct");
}

/** A short line for a lead's source: "Facebook · spring-promo", "Google", "Direct". */
export function leadSourceLabel(l: LeadSourceRow): string {
  const channel = channelLabel(leadChannel(l));
  const campaign = l.marketing_links?.campaign || l.utm_campaign;
  return campaign ? `${channel} · ${campaign}` : channel;
}
