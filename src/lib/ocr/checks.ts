/**
 * Checks on a document's figures before approval (spec §3.5): TIN format, VAT is
 * 12% of the VATable amount within rounding, the parts add up to the total, a
 * duplicate (same supplier TIN + document number), and the date (not in the
 * future; prior taxable year goes to exceptions). They warn; the reviewer decides.
 */
import { dateFarFromMonth } from "./dates";
import type { OcrFields } from "./fields";

export interface Issue {
  field: string;
  message: string;
}

const TIN = /^\d{3}-\d{3}-\d{3}(-\d{3,5})?$/;
const num = (v: string | null | undefined) => (v == null || v === "" ? null : Number(v));

export function checkFields(f: OcrFields, ctx: { today: string; duplicateOf?: string | null; priorYear?: boolean; documentMonth?: string | null }): Issue[] {
  const issues: Issue[] = [];
  if (f.party_tin && !TIN.test(f.party_tin)) issues.push({ field: "party_tin", message: "TIN should look like 123-456-789-00000." });

  const vatable = num(f.vatable);
  const vat = num(f.vat);
  if (vatable != null && vat != null && Math.abs(vatable * 0.12 - vat) > 1) {
    issues.push({ field: "vat", message: `VAT should be 12% of the VATable amount (₱${(vatable * 0.12).toFixed(2)}).` });
  }
  const parts = [vatable, num(f.vat_exempt), num(f.zero_rated), vat].filter((x): x is number => x != null);
  const total = num(f.total);
  if (total != null && parts.length > 1 && Math.abs(parts.reduce((a, b) => a + b, 0) - total) > 1) {
    issues.push({ field: "total", message: "VATable + exempt + zero-rated + VAT does not add up to the total." });
  }
  if (f.party_kind === "individual" && (!f.party_last_name || !f.party_first_name)) {
    issues.push({ field: "party_last_name", message: "Enter the last and first name: the BIR lists (SLS, SLP, QAP, SAWT) need them for an individual." });
  }
  if (!f.date) issues.push({ field: "date", message: "Enter the document date." });
  else if (f.date > ctx.today) issues.push({ field: "date", message: "The date is in the future." });
  else if (ctx.documentMonth) {
    // Usually a misread year: the reviewer checks it before approving.
    const far = dateFarFromMonth(f.date, ctx.documentMonth);
    if (far) issues.push({ field: "date", message: far });
  }
  if (ctx.priorYear) issues.push({ field: "date", message: "This is from a prior taxable year: it goes to the exceptions queue, not this year's return." });
  if (ctx.duplicateOf) issues.push({ field: "number", message: "Same supplier TIN and document number as another approved document." });
  return issues;
}
