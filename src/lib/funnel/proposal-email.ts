import type { EmailContent } from "@/lib/email/layout";

/**
 * The email that sends a proposal link to the prospect (lead page, "Send the
 * proposal by email"). Pure, so it can be unit-tested; sent by emailProposalAction.
 */
export interface ProposalEmailInput {
  brandName: string;
  businessName: string;
  contactName: string;
  /** The monthly retainer as stored on the proposal (quote.monthlyRetainer). */
  monthlyRetainer: number;
  /** The proposal's tax note (quote.tax.note), shown under the fee. */
  taxNote?: string | null;
  /** YYYY-MM-DD. */
  validUntil: string;
  /** Absolute link to the proposal. */
  url: string;
  /** The Owner's short personal note, if any. */
  note?: string | null;
  /** Who sends it, for the sign-off. */
  senderName?: string | null;
  /** A test lead: the subject starts with "[Test]". */
  test?: boolean;
}

export const NOTE_MAX = 1000;

// Formatted as on the proposal itself (src/components/funnel/proposal-view.tsx).
const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
export const proposalDate = (iso: string) =>
  new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "Asia/Manila" }).format(new Date(iso.length === 10 ? `${iso}T00:00:00+08:00` : iso));

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name.trim();

export function proposalEmail(p: ProposalEmailInput): EmailContent {
  const subject = `${p.test ? "[Test] " : ""}Your proposal from ${p.brandName} for ${p.businessName}`;
  const note = (p.note ?? "").replace(/\r\n?/g, "\n").trim().slice(0, NOTE_MAX);
  // The tax note continues the fee's list item (an indented line).
  const fee = `- Monthly retainer: ${php.format(p.monthlyRetainer)}${p.taxNote?.trim() ? `\n  ${p.taxNote.trim()}` : ""}`;
  const body = [
    `Hi ${firstName(p.contactName)},`,
    ...(note ? [note] : []),
    `Here is our proposal for ${p.businessName}.`,
    [fee, `- Valid until: ${proposalDate(p.validUntil)}`].join("\n"),
    "Open the proposal to read the full scope of work and the terms of engagement. When you are ready, you can accept it online at the same link.",
    "Reply to this email if you have any questions.",
    [p.senderName?.trim(), p.brandName].filter(Boolean).join("\n"),
  ];
  return {
    subject,
    heading: `Your proposal for ${p.businessName}`,
    preheader: `Monthly retainer ${php.format(p.monthlyRetainer)}, valid until ${proposalDate(p.validUntil)}.`,
    bodyText: body.join("\n\n"),
    action: { label: "View the proposal", url: p.url },
  };
}
