/** Document wording shared by the portal and staff screens (spec §3.4, §3.5). */

export const DOC_TYPES = {
  sales_invoice: "Sales invoice / official receipt",
  purchase_receipt: "Purchase or expense receipt",
  bir_2307_received: "BIR 2307 received",
  bir_2307_issued: "BIR 2307 issued",
  payroll: "Payroll (Excel, PDF or photo)",
  cor: "BIR COR (Form 2303)",
  other: "Other",
  filed_return: "Filed return",
  payment_proof: "Proof of payment",
} as const;
export type DocType = keyof typeof DOC_TYPES;

/** Types a client picks when uploading; filed returns and payment proof come from staff. */
export const CLIENT_DOC_TYPES: DocType[] = ["sales_invoice", "bir_2307_received", "purchase_receipt", "bir_2307_issued", "payroll", "cor", "other"];

/*
 * The intake streams (rework, 25 November 2026): every document the client sends
 * goes to one of them, and the Inbox has a tab for each. Purchases and expenses are
 * one stream, as on the SLP; payroll is separate because its papers are different.
 */
export const STREAMS = {
  sales: { label: "Sales", types: ["sales_invoice", "bir_2307_received"] },
  purchases: { label: "Purchases & Expenses", types: ["purchase_receipt", "bir_2307_issued"] },
  payroll: { label: "Payroll", types: ["payroll"] },
  other: { label: "Other", types: ["cor", "other"] },
} as const satisfies Record<string, { label: string; types: DocType[] }>;
export type Stream = keyof typeof STREAMS;

export const streamOf = (t: DocType): Stream | null =>
  (Object.keys(STREAMS) as Stream[]).find((s) => (STREAMS[s].types as readonly DocType[]).includes(t)) ?? null;

/** A spreadsheet can only be sent as payroll: OCR reads photos and PDFs. */
export const SPREADSHEET_TYPES = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"];

/** How a document came in (documents.source). */
export const SOURCE_LABELS: Record<string, string> = {
  portal: "Portal",
  staff: "Staff upload",
  email: "Email",
  batch: "Batch",
  telegram: "Telegram",
};

export const docStatusLabel: Record<string, string> = {
  uploading: "Uploading",
  received: "Received",
  under_review: "Under review",
  posted: "Posted",
  returned: "Returned",
};

export const docStatusTone = {
  uploading: "neutral",
  received: "progress",
  under_review: "progress",
  posted: "done",
  returned: "blocked",
} as const;

const monthFmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });
/** "2026-11-01" → "November 2026". */
export const showMonth = (iso: string) => monthFmt.format(new Date(`${iso.slice(0, 7)}-01T00:00:00Z`));
