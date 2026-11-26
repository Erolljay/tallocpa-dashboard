/** Wording of the monthly document request and reminder (spec §3.10, §3.13). */
import { showMonth } from "@/lib/documents/labels";
import type { EmailContent } from "@/lib/email/layout";

const dayFmt = new Intl.DateTimeFormat("en-PH", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
const showDay = (iso: string) => dayFmt.format(new Date(`${iso}T00:00:00Z`));

export type NoticeKind = "request" | "reminder";

export function cycleMessage(kind: NoticeKind, p: { clientName: string; period: string; cutoff: string; portalUrl: string }): EmailContent {
  const month = showMonth(p.period);
  const due = showDay(p.cutoff);
  const subject = kind === "request" ? `${month} documents for ${p.clientName} — due ${due}` : `Reminder: ${month} documents are due tomorrow`;
  const lead =
    kind === "request"
      ? `Please send ${p.clientName}'s ${month} documents by ${due}.`
      : `We have not received ${p.clientName}'s ${month} documents yet. They are due tomorrow, ${due}.`;
  const bodyText = [
    "Hello,",
    "",
    lead,
    "",
    "Upload sales invoices, purchase and expense receipts, and BIR 2307s from your phone or computer.",
    "",
    "If there were no transactions this month, open the portal and tap \"Nothing to submit\".",
    "Documents sent after the cutoff are counted in the next month and may carry a late-submission fee.",
    "",
    "Thank you,",
    "Tallo CPA",
  ].join("\n");
  return {
    subject,
    heading: kind === "request" ? `${month} documents are due ${due}` : `${month} documents are due tomorrow`,
    preheader: lead,
    bodyText,
    action: { label: "Upload documents", url: p.portalUrl },
  };
}
