/**
 * The figures OCR reads from a document (spec §3.5), how each is shown and
 * checked, and the shape every OCR provider must return.
 */
import { z } from "zod";
import { splitPersonName } from "@/lib/parties/names";

export const OCR_FIELDS = [
  { key: "doc_type", label: "Document type", kind: "doc_type" },
  { key: "date", label: "Date", kind: "date" },
  { key: "number", label: "Document number", kind: "text" },
  { key: "party_name", label: "Supplier / customer", kind: "text" },
  // Individuals (a sole proprietor, a professional): the BIR lists (SLS, SLP, QAP, SAWT) need last, first and middle name.
  { key: "party_kind", label: "Individual or business", kind: "party_kind" },
  { key: "party_last_name", label: "Last name", kind: "person" },
  { key: "party_first_name", label: "First name", kind: "person" },
  { key: "party_middle_name", label: "Middle name", kind: "person" },
  { key: "party_tin", label: "TIN", kind: "tin" },
  { key: "party_address", label: "Address", kind: "text" },
  { key: "vatable", label: "VATable sales / purchases", kind: "amount" },
  { key: "vat_exempt", label: "VAT-exempt", kind: "amount" },
  { key: "zero_rated", label: "Zero-rated", kind: "amount" },
  { key: "vat", label: "VAT", kind: "amount" },
  { key: "total", label: "Total", kind: "amount" },
  { key: "atc", label: "ATC (2307)", kind: "text" },
  { key: "withholding", label: "Tax withheld (2307)", kind: "amount" },
  // Slice 4: the rest of the worksheet columns (Owner's decisions 9 and 11).
  { key: "discount", label: "SC/PWD discount", kind: "amount" },
  { key: "vat_withheld", label: "VAT withheld (government customer)", kind: "amount" },
  { key: "other_deduction", label: "Other deduction (bank or card charges)", kind: "amount" },
  { key: "other_deduction_account", label: "Account for the other deduction", kind: "account", ocr: false },
  { key: "slp_category", label: "Purchase category (SLP)", kind: "slp", ocr: false },
  { key: "payment_terms", label: "Cash or charge", kind: "terms" },
  { key: "payment_account", label: "Paid from / deposited to", kind: "payment_account", ocr: false },
] as const;

/** Fields OCR is asked to read; the rest are chosen on review. */
export const OCR_READ_FIELDS = OCR_FIELDS.filter((f) => !("ocr" in f && f.ocr === false));

/** The purchase categories of the Summary List of Purchases (src/lib/register/parts.ts). */
export const SLP_CATEGORY_KEYS = ["capital_goods", "other_goods", "services", "zero_rated", "exempt"] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Invoice terms: a cash sale/purchase, or a charge (on account) that opens a receivable or payable. */
export const PAYMENT_TERMS = { cash: "Cash", charge: "Charge (on account)" } as const;
export type PaymentTerms = keyof typeof PAYMENT_TERMS;

/** "Cash", "CASH SALE" → cash; "Charge", "on account", "credit", "terms" → charge; anything else → null. */
export function normalizeTerms(v: string | null | undefined): PaymentTerms | null {
  const t = (v ?? "").trim().toLowerCase();
  if (!t) return null;
  if (/^cash/.test(t)) return "cash";
  if (/charge|account|credit|terms|\bnet\b|days/.test(t)) return "charge";
  return null;
}

/** Whether the other party is a natural person or a business (corporation, partnership, cooperative). */
export const PARTY_KINDS = { non_individual: "Business (corporation, partnership)", individual: "Individual (person or sole proprietor)" } as const;
export type PartyKind = keyof typeof PARTY_KINDS;

export function normalizePartyKind(v: string | null | undefined): PartyKind | null {
  const t = (v ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (t === "individual" || t === "person") return "individual";
  if (t === "non_individual" || t === "business" || t === "corporation" || t === "company") return "non_individual";
  return null;
}

export type FieldKey = (typeof OCR_FIELDS)[number]["key"];
export type OcrFields = Partial<Record<FieldKey, string | null>>;
export type OcrConfidence = Partial<Record<FieldKey, number>>;

export const OCR_DOC_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307", "cor", "other"] as const;

/** Below this, a field is highlighted for the reviewer (to be tuned in the O4 test). */
export const LOW_CONFIDENCE = 0.8;

const keys = OCR_FIELDS.map((f) => f.key) as [FieldKey, ...FieldKey[]];
const value = z.union([z.string(), z.number()]).nullable().optional().transform((v) => (v == null || v === "" ? null : String(v).trim()));

/** What a provider must return; anything else is rejected rather than saved. */
export const ocrOutputSchema = z.object({
  fields: z.object(Object.fromEntries(keys.map((k) => [k, value])) as Record<FieldKey, typeof value>),
  confidence: z.record(z.string(), z.number().min(0).max(1)).default({}),
});
/** `model` is the model that actually read the document (the fallback, when the main one was busy). */
export type OcrOutput = { fields: OcrFields; confidence: OcrConfidence; model?: string };

/** "1,120.50" / "₱1120.5" / 1120.5 → "1120.50"; anything else → null. */
export function normalizeAmount(v: string | null | undefined): string | null {
  if (v == null) return null;
  const cleaned = String(v).trim().replace(/^(PHP|Php|P(?=[\d\s]))/, "").replace(/[₱,\s]/g, "");
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  return Number(cleaned).toFixed(2);
}

/** Digits of a TIN in the usual 123-456-789-00000 form; null if not 9–14 digits. */
export function normalizeTin(v: string | null | undefined): string | null {
  if (v == null) return null;
  const d = String(v).replace(/\D/g, "");
  if (d.length < 9 || d.length > 14) return null;
  return [d.slice(0, 3), d.slice(3, 6), d.slice(6, 9), d.slice(9)].filter(Boolean).join("-");
}

/** Tidies what a provider read: amounts to two decimals, TINs dashed, dates kept only if YYYY-MM-DD. */
export function normalizeFields(f: OcrFields): OcrFields {
  const out: OcrFields = { ...f };
  for (const def of OCR_FIELDS) {
    const v = f[def.key];
    if (def.kind === "amount") out[def.key] = normalizeAmount(v);
    if (def.kind === "tin") out[def.key] = v == null ? null : (normalizeTin(v) ?? v);
    if (def.kind === "date") out[def.key] = v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
    if (def.kind === "terms") out[def.key] = normalizeTerms(v);
    if (def.kind === "party_kind") out[def.key] = normalizePartyKind(v);
    if (def.kind === "slp") out[def.key] = v && (SLP_CATEGORY_KEYS as readonly string[]).includes(v) ? v : null;
    if (def.kind === "account" || def.kind === "payment_account") out[def.key] = v && UUID.test(v.trim()) ? v.trim().toLowerCase() : null;
    if (def.kind === "person") out[def.key] = v?.replace(/\s+/g, " ").trim() || null;
  }
  // An individual named in one line only: split it so the BIR lists get last, first and middle name.
  if (out.party_kind === "individual" && !out.party_last_name && !out.party_first_name && out.party_name) {
    const n = splitPersonName(out.party_name);
    if (n) Object.assign(out, { party_last_name: n.last, party_first_name: n.first, party_middle_name: n.middle });
  }
  // A business has no name parts.
  if (out.party_kind === "non_individual") Object.assign(out, { party_last_name: null, party_first_name: null, party_middle_name: null });
  return out;
}
