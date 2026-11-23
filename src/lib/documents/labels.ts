/** Document wording shared by the portal and staff screens (spec §3.4, §3.5). */

export const DOC_TYPES = {
  sales_invoice: "Sales invoice / official receipt",
  purchase_receipt: "Purchase or expense receipt",
  bir_2307_received: "BIR 2307 received",
  bir_2307_issued: "BIR 2307 issued",
  cor: "BIR COR (Form 2303)",
  other: "Other",
  filed_return: "Filed return",
  payment_proof: "Proof of payment",
} as const;
export type DocType = keyof typeof DOC_TYPES;

/** Types a client picks when uploading; filed returns and payment proof come from staff. */
export const CLIENT_DOC_TYPES: DocType[] = ["purchase_receipt", "sales_invoice", "bir_2307_received", "bir_2307_issued", "cor", "other"];

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
