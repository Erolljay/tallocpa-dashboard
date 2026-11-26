/**
 * The branded email layout: one table-based, inline-styled HTML document plus its
 * plain-text alternative. Pure (no server-only), so it can be unit-tested.
 *
 * Email HTML is not BoardUI UI code: clients strip <style> and CSS variables, so the
 * brand colours are written out as hex here (theme.css accent ramp, components/brand/mark.tsx).
 * No remote images: the logo lives in a private bucket, so the header is a text wordmark.
 */

export interface EmailBrand {
  displayName: string;
  legalName: string;
  tagline: string;
  businessAddress: string | null;
  phone: string | null;
  replyTo: string | null;
  website: string | null;
}

export const DEFAULT_BRAND: EmailBrand = {
  displayName: "Tallo CPA",
  legalName: "Tallo CPA",
  tagline: "Clear Numbers. Clean Compliance.",
  businessAddress: null,
  phone: null,
  replyTo: null,
  website: null,
};

export interface EmailAction {
  label: string;
  url: string;
}

/** What an email says, before the layout: shared by every sender. */
export interface EmailContent {
  subject: string;
  heading: string;
  /** Plain text; paragraphs separated by blank lines, "- " lines become a list, bare URLs become links. */
  bodyText: string;
  preheader?: string;
  action?: EmailAction;
}

export interface RenderEmailInput {
  brand?: Partial<EmailBrand> | null;
  /** The hidden preview line shown after the subject in the inbox. */
  preheader?: string;
  heading: string;
  /** Paragraphs as plain text. Use this or bodyText. */
  paragraphs?: readonly string[];
  /** A plain-text body (see EmailContent.bodyText). */
  bodyText?: string;
  action?: EmailAction | null;
  /** Completes "You are receiving this because …", e.g. "you are on the Tallo CPA team". */
  footerNote?: string;
  /** Absolute link to the notification settings (see settingsUrlFor). */
  settingsUrl?: string | null;
}

// Brand inks (theme.css accent ramp; the mark's navy field).
const NAVY = "#041a63";
const BLUE = "#0053fb";
const SKY = "#8fc6ff";
const PAGE = "#f3f5fa";
const CARD = "#ffffff";
const INK = "#1b2333";
const MUTED = "#5b6577";
const RULE = "#e2e7f0";
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** HTML-escapes text for element content and attribute values. */
export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Only http(s) and mailto links are ever emitted; anything else becomes "#". */
function safeUrl(url: string): string {
  return /^(https?:\/\/|mailto:)/i.test(url.trim()) ? url.trim() : "#";
}

const URL_RE = /\bhttps?:\/\/[^\s<>"']+/g;

/** Escapes a line of text and turns bare URLs into links. */
function linkify(line: string): string {
  let out = "";
  let last = 0;
  for (const m of line.matchAll(URL_RE)) {
    // Trailing punctuation is the sentence's, not the URL's.
    const url = m[0].replace(/[.,;:!?)]+$/, "");
    const at = m.index ?? 0;
    out += escapeHtml(line.slice(last, at));
    out += `<a href="${escapeHtml(url)}" style="color:${BLUE};text-decoration:underline;word-break:break-all;">${escapeHtml(url)}</a>`;
    last = at + url.length;
  }
  return out + escapeHtml(line.slice(last));
}

const P_STYLE = `margin:0 0 16px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${INK};`;

/**
 * Turns a plain-text body into HTML blocks: blank lines separate paragraphs, lines inside
 * a paragraph keep their breaks, runs of "- " lines (with indented continuation lines)
 * become a list, and bare URLs become links. Everything is escaped.
 */
export function plainTextToHtml(text: string): string {
  const blocks = text.replace(/\r\n?/g, "\n").split(/\n\s*\n/).map((b) => b.replace(/^\n+|\n+$/g, "")).filter((b) => b.trim() !== "");
  const html: string[] = [];
  for (const block of blocks) {
    const lines = block.split("\n");
    let para: string[] = [];
    let items: string[][] = [];
    const flushPara = () => {
      if (para.length) html.push(`<p class="em-text" style="${P_STYLE}">${para.map(linkify).join("<br>")}</p>`);
      para = [];
    };
    const flushList = () => {
      if (!items.length) return;
      const li = items
        .map((it) => `<li class="em-text" style="margin:0 0 10px 0;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};">${it.map((l) => linkify(l.trim())).join("<br>")}</li>`)
        .join("");
      html.push(`<ul style="margin:0 0 16px 0;padding:0 0 0 20px;">${li}</ul>`);
      items = [];
    };
    for (const line of lines) {
      if (/^\s*[-•]\s+/.test(line)) {
        flushPara();
        items.push([line.replace(/^\s*[-•]\s+/, "")]);
      } else if (items.length && /^\s+\S/.test(line)) {
        items[items.length - 1].push(line);
      } else {
        flushList();
        para.push(line);
      }
    }
    flushPara();
    flushList();
  }
  return html.join("\n");
}

/** The notification settings page for staff (/app) or clients (/portal). */
export function settingsUrlFor(origin: string, audience: "staff" | "client"): string {
  return `${origin.replace(/\/+$/, "")}/${audience === "staff" ? "app" : "portal"}/settings/notifications`;
}

function fullBrand(b?: Partial<EmailBrand> | null): EmailBrand {
  const out = { ...DEFAULT_BRAND };
  for (const [k, v] of Object.entries(b ?? {}) as [keyof EmailBrand, string | null | undefined][]) {
    if (typeof v === "string" && v.trim() !== "") (out as Record<keyof EmailBrand, string | null>)[k] = v.trim();
  }
  return out;
}

function bodyBlocks(input: RenderEmailInput): { html: string; text: string } {
  if (input.paragraphs) {
    const paras = input.paragraphs.filter((p) => p.trim() !== "");
    return { html: plainTextToHtml(paras.join("\n\n")), text: paras.join("\n\n") };
  }
  const text = (input.bodyText ?? "").replace(/\r\n?/g, "\n").trim();
  return { html: plainTextToHtml(text), text };
}

function receivingLine(brand: EmailBrand, input: RenderEmailInput) {
  const because = input.footerNote?.trim() || `you have an account with ${brand.displayName}`;
  return { because: `You are receiving this because ${because.replace(/[.\s]+$/, "")}.`, change: "Change which emails you get in Settings → Notifications." };
}

/** Renders the branded email. Every interpolated string is escaped. */
export function renderEmail(input: RenderEmailInput): { html: string; text: string } {
  const brand = fullBrand(input.brand);
  const body = bodyBlocks(input);
  const action = input.action && input.action.url ? { label: input.action.label, url: safeUrl(input.action.url) } : null;
  const settingsUrl = input.settingsUrl ? safeUrl(input.settingsUrl) : null;
  const preheader = (input.preheader ?? body.text.split("\n").find((l) => l.trim() !== "") ?? "").trim().slice(0, 150);
  const recv = receivingLine(brand, input);

  const contact = [
    brand.businessAddress ? escapeHtml(brand.businessAddress) : "",
    [
      brand.phone ? `<a href="tel:${escapeHtml(brand.phone.replace(/[^\d+]/g, ""))}" style="color:${MUTED};text-decoration:none;">${escapeHtml(brand.phone)}</a>` : "",
      brand.replyTo ? `<a href="mailto:${escapeHtml(brand.replyTo)}" style="color:${MUTED};text-decoration:underline;">${escapeHtml(brand.replyTo)}</a>` : "",
      brand.website ? `<a href="${escapeHtml(safeUrl(brand.website))}" style="color:${MUTED};text-decoration:underline;">${escapeHtml(brand.website.replace(/^https?:\/\//i, "").replace(/\/$/, ""))}</a>` : "",
    ]
      .filter(Boolean)
      .join(" &nbsp;·&nbsp; "),
  ].filter(Boolean);

  const button = action
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 8px 0;">
<tr><td align="center" bgcolor="${BLUE}" style="border-radius:10px;background-color:${BLUE};">
<a href="${escapeHtml(action.url)}" target="_blank" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:15px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;border:1px solid ${BLUE};mso-padding-alt:0;">${escapeHtml(action.label)}</a>
</td></tr></table>
<p class="em-muted" style="margin:12px 0 0 0;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">Button not working? Open this link: <a href="${escapeHtml(action.url)}" style="color:${BLUE};text-decoration:underline;word-break:break-all;">${escapeHtml(action.url)}</a></p>`
    : "";

  const settingsLink = settingsUrl
    ? `<a href="${escapeHtml(settingsUrl)}" style="color:${MUTED};text-decoration:underline;">Settings → Notifications</a>`
    : "Settings → Notifications";

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escapeHtml(input.heading)}</title>
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table { border-collapse:collapse; mso-table-lspace:0; mso-table-rspace:0; }
  a { color:${BLUE}; }
  @media (max-width: 620px) { .em-pad { padding-left:20px !important; padding-right:20px !important; } }
  @media (prefers-color-scheme: dark) {
    .em-page { background-color:#0b1020 !important; }
    .em-card { background-color:#151b2e !important; border-color:#262f48 !important; }
    .em-text, .em-heading { color:#eef1f8 !important; }
    .em-muted { color:#a8b1c4 !important; }
    .em-rule { border-color:#262f48 !important; }
  }
  [data-ogsc] .em-page { background-color:#0b1020 !important; }
  [data-ogsc] .em-card { background-color:#151b2e !important; }
  [data-ogsc] .em-text, [data-ogsc] .em-heading { color:#eef1f8 !important; }
  [data-ogsc] .em-muted { color:#a8b1c4 !important; }
</style>
</head>
<body class="em-page" style="margin:0;padding:0;background-color:${PAGE};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${PAGE};opacity:0;">${escapeHtml(preheader)}${"&nbsp;&zwnj;".repeat(40)}</div>
<table role="presentation" class="em-page" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAGE}" style="background-color:${PAGE};">
<tr><td align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
<tr><td bgcolor="${NAVY}" class="em-pad" style="background-color:${NAVY};border-radius:16px 16px 0 0;padding:22px 32px;">
<div style="font-family:${FONT};font-size:22px;line-height:28px;font-weight:700;letter-spacing:-0.2px;color:#ffffff;">${escapeHtml(brand.displayName)}</div>
<div style="font-family:${FONT};font-size:13px;line-height:18px;color:${SKY};margin-top:2px;">${escapeHtml(brand.tagline)}</div>
</td></tr>
<tr><td bgcolor="${CARD}" class="em-card em-pad" style="background-color:${CARD};border:1px solid ${RULE};border-top:0;border-radius:0 0 16px 16px;padding:32px;">
<h1 class="em-heading" style="margin:0 0 20px 0;font-family:${FONT};font-size:22px;line-height:30px;font-weight:700;color:${INK};">${escapeHtml(input.heading)}</h1>
${body.html}
${button}
</td></tr>
<tr><td class="em-pad" style="padding:24px 32px 8px 32px;">
<p class="em-muted" style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};font-weight:600;">${escapeHtml(brand.legalName)}</p>
${contact.map((c) => `<p class="em-muted" style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">${c}</p>`).join("\n")}
<p class="em-muted em-rule" style="margin:14px 0 0 0;padding-top:14px;border-top:1px solid ${RULE};font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">${escapeHtml(recv.because)} Change which emails you get in ${settingsLink}.</p>
</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${brand.displayName} — ${brand.tagline}`,
    "",
    input.heading,
    "",
    body.text,
    ...(action ? ["", `${action.label}: ${action.url}`] : []),
    "",
    "--",
    brand.legalName,
    ...[brand.businessAddress, brand.phone, brand.replyTo, brand.website].filter((v): v is string => !!v),
    "",
    recv.because,
    settingsUrl ? `${recv.change.replace(/\.$/, "")}: ${settingsUrl}` : recv.change,
  ].join("\n");

  return { html, text };
}

/** Wraps an existing plain-text email (paragraphs, bare URLs) in the layout. */
export function renderPlainTextEmail(p: {
  brand?: Partial<EmailBrand> | null;
  heading: string;
  text: string;
  action?: EmailAction | null;
  footerNote?: string;
  settingsUrl?: string | null;
}): { html: string; text: string } {
  return renderEmail({ brand: p.brand, heading: p.heading, bodyText: p.text, action: p.action, footerNote: p.footerNote, settingsUrl: p.settingsUrl });
}
