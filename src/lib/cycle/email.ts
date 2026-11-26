import "server-only";
import { loadEmailBrand, siteOrigin } from "@/lib/email/brand";
import { renderEmail, renderPlainTextEmail, settingsUrlFor, type EmailBrand, type EmailContent } from "@/lib/email/layout";

export type SendResult = "sent" | "not_configured";

export interface OutgoingEmail {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string | string[] | null;
}

/** Whether Resend is set up (RESEND_API_KEY and EMAIL_FROM). */
export function emailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY && !!process.env.EMAIL_FROM;
}

/**
 * Sends one email through Resend (spec §3.13), as HTML with a plain-text alternative.
 * Needs RESEND_API_KEY and EMAIL_FROM; without them nothing is sent and the caller is told so.
 *
 * The old form `sendEmail(to, subject, text)` still works: the text is wrapped in the
 * branded layout, with the brand's reply-to address.
 */
export async function sendEmail(message: OutgoingEmail): Promise<SendResult>;
export async function sendEmail(to: string[], subject: string, text: string): Promise<SendResult>;
export async function sendEmail(a: OutgoingEmail | string[], subject?: string, text?: string): Promise<SendResult> {
  let msg: OutgoingEmail;
  if (Array.isArray(a)) {
    if (!emailConfigured() || a.length === 0) return "not_configured";
    const brand = await loadEmailBrand();
    const origin = siteOrigin();
    msg = {
      to: a,
      subject: subject ?? "",
      ...renderPlainTextEmail({ brand, heading: subject ?? "", text: text ?? "", settingsUrl: origin ? settingsUrlFor(origin, "staff") : null }),
      replyTo: brand.replyTo,
    };
  } else {
    msg = a;
  }
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = (Array.isArray(msg.to) ? msg.to : [msg.to]).filter(Boolean);
  if (!key || !from || to.length === 0) return "not_configured";
  const replyTo = (Array.isArray(msg.replyTo) ? msg.replyTo : msg.replyTo ? [msg.replyTo] : []).filter(Boolean);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to, subject: msg.subject, html: msg.html, text: msg.text, ...(replyTo.length ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Email not sent (${res.status}): ${(await res.text()).slice(0, 200)}`);
  return "sent";
}

/**
 * Renders EmailContent in the branded layout and sends it, replying to the brand's
 * reply-to address. `brand` is loaded (cached) when not given.
 */
export async function sendBrandedEmail(
  to: string | string[],
  content: EmailContent,
  opts: { brand?: EmailBrand; footerNote?: string; settingsUrl?: string | null } = {},
): Promise<SendResult> {
  if (!emailConfigured() || (Array.isArray(to) ? to.length === 0 : !to)) return "not_configured";
  const brand = opts.brand ?? (await loadEmailBrand());
  const { html, text } = renderEmail({
    brand,
    heading: content.heading,
    preheader: content.preheader,
    bodyText: content.bodyText,
    action: content.action,
    footerNote: opts.footerNote,
    settingsUrl: opts.settingsUrl,
  });
  return sendEmail({ to, subject: content.subject, html, text, replyTo: brand.replyTo });
}
