/**
 * Portal Reports: the client's filed returns per year per tax type, each with one
 * link to its scanned copy (decision 14) and the BIR's validation report when there
 * is one (decision 15). Pure; the page reads the rows (RLS: the client's own returns,
 * and their files only once filed).
 */
import { TAX_TYPE_GROUPS, taxTypeOfForm } from "@/lib/deadlines/describe";

export interface FiledReturnRow {
  id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_end: string;
  filing_reference: string | null;
}

/** A current filing_files row (filed_copy or validation_report). */
export interface FiledFileRow {
  id: string;
  filing_instance_id: string;
  kind: string;
}

/** A filed return or proof attached as a document before filing_files existed. */
export interface LegacyFileRow {
  id: string;
  filing_instance_id: string;
  doc_type: string;
}

export interface FiledReturn extends FiledReturnRow {
  /** The link to the scanned copy: /filing-files/<id>, or /files/<id> for a copy attached before PR #54; null when none yet. */
  copyHref: string | null;
  validationHref: string | null;
}

export interface TaxTypeGroup {
  taxType: string;
  returns: FiledReturn[];
}

/** The taxable year a return belongs to: the year its period ends in. */
export const returnYear = (r: Pick<FiledReturnRow, "period_end">) => Number(r.period_end.slice(0, 4));

/** The years with a filed return, newest first. */
export function filedYears(rows: Pick<FiledReturnRow, "period_end">[]): number[] {
  return [...new Set(rows.map(returnYear))].sort((a, b) => b - a);
}

const TYPE_ORDER = [...TAX_TYPE_GROUPS.map((g) => g.label), "Other"];

/**
 * The year's filed returns grouped by tax type (income tax, VAT, percentage tax,
 * withholding on compensation, expanded withholding, then any other), newest
 * period first within each, each with its one scanned copy and validation report.
 */
export function groupFiledReturns(rows: FiledReturnRow[], files: FiledFileRow[], legacy: LegacyFileRow[], year: number): TaxTypeGroup[] {
  const copy = new Map<string, string>();
  const validation = new Map<string, string>();
  for (const f of legacy) if (f.doc_type === "filed_return" && !copy.has(f.filing_instance_id)) copy.set(f.filing_instance_id, `/files/${f.id}`);
  // The scanned copy wins over a legacy one.
  for (const f of files) {
    if (f.kind === "filed_copy") copy.set(f.filing_instance_id, `/filing-files/${f.id}`);
    else if (f.kind === "validation_report" && !validation.has(f.filing_instance_id)) validation.set(f.filing_instance_id, `/filing-files/${f.id}`);
  }
  const groups = new Map<string, FiledReturn[]>();
  for (const r of rows) {
    if (returnYear(r) !== year) continue;
    const t = taxTypeOfForm(r.form);
    if (!groups.has(t)) groups.set(t, []);
    groups.get(t)!.push({ ...r, copyHref: copy.get(r.id) ?? null, validationHref: validation.get(r.id) ?? null });
  }
  return [...groups.entries()]
    .sort(([a], [b]) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b))
    .map(([taxType, list]) => ({
      taxType,
      returns: list.sort((a, b) => b.period_end.localeCompare(a.period_end) || a.form.localeCompare(b.form)),
    }));
}
