/**
 * Pure helpers that turn database rows into a WorksheetContext (load.ts does
 * the querying). Kept free of server-only imports so they can be tested.
 */
import { normalizeAtc } from "./atc";
import { toCentavos } from "./money";
import type { Centavos, SourceDocument, WorksheetResult } from "./types";
import { displayName, fullAddress, partyTinLabel, type Party } from "@/lib/parties/format";
import { partyKey } from "@/lib/parties/tin";

const SOURCE_DOC_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued", "other"] as const;

export interface DocumentRow {
  id: string;
  doc_type: string;
  document_month: string;
  status: string;
  /** extractions.approved_fields (one row per document, embedded by PostgREST as an object or a one-item array). */
  extractions: { approved_fields: Record<string, string | number | null> | null } | { approved_fields: Record<string, string | number | null> | null }[] | null;
}

function approvedFields(row: DocumentRow): Record<string, string | number | null> | null {
  const e = Array.isArray(row.extractions) ? row.extractions[0] : row.extractions;
  return e?.approved_fields ?? null;
}

/**
 * A document counts on a return only once a staff member approved its figures
 * (spec §3.5): approve_document() saves extractions.approved_fields and marks
 * the document Posted. A document marked Posted without approved figures
 * (review_document 'post', e.g. a COR or a filed return) has nothing to count.
 */
export function isApproved(row: DocumentRow): boolean {
  return row.status === "posted" && approvedFields(row) != null;
}

const text = (v: string | number | null | undefined): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
};
const amount = (v: string | number | null | undefined): Centavos => toCentavos(v ?? null) ?? 0;

/** An approved document row → SourceDocument (amounts in centavos), or null if it is not one a return reads. */
export function toSourceDocument(row: DocumentRow): SourceDocument | null {
  if (!isApproved(row)) return null;
  if (!(SOURCE_DOC_TYPES as readonly string[]).includes(row.doc_type)) return null;
  const f = approvedFields(row) ?? {};
  return {
    id: row.id,
    docType: row.doc_type as SourceDocument["docType"],
    month: row.document_month.slice(0, 10),
    date: text(f.date),
    number: text(f.number),
    partyName: text(f.party_name),
    partyTin: text(f.party_tin),
    partyAddress: text(f.party_address),
    vatable: amount(f.vatable),
    vatExempt: amount(f.vat_exempt),
    zeroRated: amount(f.zero_rated),
    vat: amount(f.vat),
    total: amount(f.total),
    atc: normalizeAtc(text(f.atc)),
    withholding: amount(f.withholding),
  };
}

/** A register line as the worksheet loader reads it (migration 20261125000001_register.sql). */
export interface RegisterSourceRow {
  document_id: string;
  kind: "sale" | "purchase" | "cwt_received" | "ewt_issued";
  month: string;
  line_date: string | null;
  reference: string | null;
  party_name: string | null;
  party_tin: string | null;
  party_address: string | null;
  vatable: string | number;
  vat_exempt: string | number;
  zero_rated: string | number;
  vat: string | number;
  total: string | number;
  atc: string | null;
  withholding: string | number;
  slp_category: SourceDocument["slpCategory"];
}

const DOC_TYPE_OF_KIND = { sale: "sales_invoice", purchase: "purchase_receipt", cwt_received: "bir_2307_received", ewt_issued: "bir_2307_issued" } as const;

/**
 * A register line → SourceDocument (one register, slice 2): the same figures
 * toSourceDocument reads from the approved document, since the database writes
 * the line from those fields, plus the line's SLP category.
 */
export function fromRegisterLine(r: RegisterSourceRow): SourceDocument {
  return {
    id: r.document_id,
    docType: DOC_TYPE_OF_KIND[r.kind],
    month: String(r.month).slice(0, 10),
    date: r.line_date ? String(r.line_date).slice(0, 10) : null,
    number: text(r.reference),
    partyName: text(r.party_name),
    partyTin: text(r.party_tin),
    partyAddress: text(r.party_address),
    vatable: amount(r.vatable),
    vatExempt: amount(r.vat_exempt),
    zeroRated: amount(r.zero_rated),
    vat: amount(r.vat),
    total: amount(r.total),
    atc: normalizeAtc(text(r.atc)),
    withholding: amount(r.withholding),
    slpCategory: r.slp_category ?? null,
  };
}

/** "2026-02-14" → "2026-02-01". */
export const monthOf = (iso: string) => `${iso.slice(0, 7)}-01`;

/** Is the month (first day) inside [periodStart, periodEnd]? */
export function monthInPeriod(month: string, periodStart: string, periodEnd: string): boolean {
  const m = monthOf(month);
  return m >= monthOf(periodStart) && m <= monthOf(periodEnd);
}

/** First days of the months from periodStart to periodEnd. */
export function monthsInPeriod(periodStart: string, periodEnd: string): string[] {
  const out: string[] = [];
  let y = Number(periodStart.slice(0, 4));
  let m = Number(periodStart.slice(5, 7));
  const end = monthOf(periodEnd);
  for (;;) {
    const iso = `${y}-${String(m).padStart(2, "0")}-01`;
    if (iso > end) break;
    out.push(iso);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

/**
 * First day of the taxable year that contains `date`, for a year ending in
 * `fyeMonth` (12 = calendar year). Same rule as private.taxable_year() in
 * the documents migration. Withholding forms use the calendar year (fyeMonth 12).
 */
export function taxableYearStart(date: string, fyeMonth: number): string {
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const startMonth = (fyeMonth % 12) + 1;
  const startYear = m >= startMonth ? y : y - 1;
  return `${startYear}-${String(startMonth).padStart(2, "0")}-01`;
}

/**
 * Key for one earlier worksheet in `WorksheetContext.priorFigures`:
 * "<form>@<YYYY-MM of the period start>", e.g. "0619-E@2026-01", "1701Q@2026-04".
 * The bare form code ("0619-E") holds the latest earlier worksheet of that form.
 */
export const priorKey = (form: string, periodStart: string) => `${form}@${periodStart.slice(0, 7)}`;

/** Every line with an amount, line key → centavos: what later worksheets read as priorFigures. */
export function flattenFigures(result: Pick<WorksheetResult, "sections">): Record<string, Centavos> {
  const out: Record<string, Centavos> = {};
  for (const s of result.sections) for (const l of s.lines) if (l.amount != null) out[l.key] = l.amount;
  return out;
}

export interface PriorWorksheetRow {
  form: string;
  periodStart: string;
  figures: Record<string, Centavos>;
}

/** priorFigures from earlier worksheets (any order): one entry per worksheet, plus the latest per form. */
export function buildPriorFigures(rows: PriorWorksheetRow[]): Record<string, Record<string, Centavos>> {
  const out: Record<string, Record<string, Centavos>> = {};
  const sorted = [...rows].sort((a, b) => a.periodStart.localeCompare(b.periodStart));
  for (const r of sorted) {
    out[priorKey(r.form, r.periodStart)] = r.figures;
    out[r.form] = r.figures;
  }
  return out;
}

/**
 * Uses the firm-wide parties directory for documents whose TIN is on file, so
 * BIR attachments carry the registered name, address and branch code rather
 * than what OCR read off the document.
 */
export function withDirectoryParty(doc: SourceDocument, directory: Map<string, Party>): SourceDocument {
  const key = partyKey(doc.partyTin);
  const p = key ? directory.get(key) : undefined;
  if (!p) return doc;
  return {
    ...doc,
    partyName: displayName(p) || doc.partyName,
    partyAddress: fullAddress(p) || doc.partyAddress,
    partyTin: partyTinLabel(p),
    party: {
      kind: p.kind,
      registeredName: p.registered_name,
      lastName: p.last_name,
      firstName: p.first_name,
      middleName: p.middle_name,
      verified: Boolean(p.verified_at),
    },
  };
}
