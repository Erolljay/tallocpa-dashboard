/**
 * The figures OCR reads from a document (spec §3.5), how each is shown and
 * checked, and the shape every OCR provider must return.
 */
import { z } from "zod";

export const OCR_FIELDS = [
  { key: "doc_type", label: "Document type", kind: "doc_type" },
  { key: "date", label: "Date", kind: "date" },
  { key: "number", label: "Document number", kind: "text" },
  { key: "party_name", label: "Supplier / customer", kind: "text" },
  { key: "party_tin", label: "TIN", kind: "tin" },
  { key: "party_address", label: "Address", kind: "text" },
  { key: "vatable", label: "VATable sales / purchases", kind: "amount" },
  { key: "vat_exempt", label: "VAT-exempt", kind: "amount" },
  { key: "zero_rated", label: "Zero-rated", kind: "amount" },
  { key: "vat", label: "VAT", kind: "amount" },
  { key: "total", label: "Total", kind: "amount" },
  { key: "atc", label: "ATC (2307)", kind: "text" },
  { key: "withholding", label: "Tax withheld (2307)", kind: "amount" },
] as const;

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
  }
  return out;
}
