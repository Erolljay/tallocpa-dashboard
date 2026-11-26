/**
 * The Owner's daily digest of approvals given by the acting approver (Q58). The nightly
 * job sends it for the Manila day just ended, once per day, and only when there was at
 * least one approval.
 */
import type { EmailContent } from "@/lib/email/layout";

export interface DigestRow {
  filing_id: string;
  client_name: string;
  form: string;
  period_label: string;
  tax_due: string | number | null;
  approver: string | null;
  approved_at: string;
}

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const time = (iso: string) => new Intl.DateTimeFormat("en-PH", { timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));
const longDay = (day: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${day}T00:00:00Z`));

export function digestMessage(day: string, rows: readonly DigestRow[], origin: string): EmailContent {
  const total = rows.reduce((s, r) => s + Number(r.tax_due ?? 0), 0);
  const lines = rows.map(
    (r) => `- ${time(r.approved_at)} · ${r.client_name} · ${r.form} ${r.period_label} · ${peso.format(Number(r.tax_due ?? 0))} · by ${r.approver ?? "—"}\n  ${origin}/app/filings/${r.filing_id}`,
  );
  return {
    subject: `Acting approver: ${rows.length} return${rows.length === 1 ? "" : "s"} approved on ${longDay(day)}`,
    heading: `${rows.length} return${rows.length === 1 ? "" : "s"} approved by the acting approver`,
    bodyText: [
      `Returns given the final approval by the acting approver on ${longDay(day)}:`,
      "",
      ...lines,
      "",
      `Total tax due: ${peso.format(total)}`,
    ].join("\n"),
    action: { label: "All acting-approver approvals", url: `${origin}/app/settings/acting-approver` },
  };
}
