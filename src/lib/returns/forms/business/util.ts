/**
 * Small pure helpers shared by the business-tax worksheets (2551Q, 2550Q,
 * 1701Q, 1702Q and their SLS / SLP / SAWT attachments). Kept private to this
 * folder so they do not depend on the in-progress `returns/money.ts`.
 */
import { applyRate, toDecimalString } from "../../money";
import type { Centavos, ManualInput, SourceDocument, WorksheetContext, WorksheetLine } from "../../types";

// ── Amounts ────────────────────────────────────────────────

export const sum = (xs: Centavos[]): Centavos => xs.reduce((a, b) => a + b, 0);

/** `c` × `ratePct`% rounded half away from zero to the centavo (shared returns/money.ts). */
export const pct = (c: Centavos, ratePct: number): Centavos => applyRate(c, ratePct);

/** 123456 → "1,234.56" (for `basis` text). */
export function peso(c: Centavos): string {
  const neg = c < 0;
  const abs = Math.abs(Math.round(c));
  const whole = Math.floor(abs / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${neg ? "-" : ""}${whole}.${String(abs % 100).padStart(2, "0")}`;
}

/** 123456 → "1234.56" — the number format of the BIR DAT files and CSV exports (taxify `csvNum`). */
export const plain = (c: Centavos): string => toDecimalString(c);

/** Typed figure → centavos. Blank → null; unreadable → NaN. Accepts "1,234.50", "₱1234.5", "-200". */
export function parseAmount(v: string | undefined): Centavos | null {
  if (v == null) return null;
  const cleaned = v.trim().replace(/^(PHP|Php|P(?=[\d\s-]))/, "").replace(/[₱,\s]/g, "");
  if (cleaned === "") return null;
  if (!/^-?\d+(\.\d{1,2})?$/.test(cleaned)) return NaN;
  const [whole, frac = ""] = cleaned.replace("-", "").split(".");
  const c = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return cleaned.startsWith("-") ? -c : c;
}

/** Reads manual amounts, collecting an error for each unreadable or (unless allowed) negative one. */
export class Inputs {
  readonly errors: string[] = [];
  constructor(
    private readonly values: Record<string, string>,
    private readonly labels: Record<string, string>,
  ) {}
  amount(key: string, opts: { allowNegative?: boolean } = {}): Centavos {
    const v = parseAmount(this.values[key]);
    if (v == null) return 0;
    if (Number.isNaN(v)) {
      this.errors.push(`"${this.labels[key] ?? key}" is not a valid amount (${this.values[key]}).`);
      return 0;
    }
    if (v < 0 && !opts.allowNegative) {
      this.errors.push(`"${this.labels[key] ?? key}" cannot be negative.`);
      return 0;
    }
    return v;
  }
  /** The amount if typed (even 0), else null. */
  optionalAmount(key: string): Centavos | null {
    const v = parseAmount(this.values[key]);
    if (v == null) return null;
    return this.amount(key);
  }
  count(key: string): number | null {
    const raw = this.values[key]?.trim();
    if (!raw) return null;
    if (!/^\d+$/.test(raw)) {
      this.errors.push(`"${this.labels[key] ?? key}" must be a whole number.`);
      return null;
    }
    return Number(raw);
  }
  text(key: string): string {
    return this.values[key]?.trim() ?? "";
  }
  choice(key: string): string | null {
    return this.values[key]?.trim() || null;
  }
}

export const labelsOf = (inputs: ManualInput[]) => Object.fromEntries(inputs.map((i) => [i.key, i.label]));

export const amountInput = (key: string, label: string, help?: string): ManualInput => ({ key, label, kind: "amount", required: false, ...(help ? { help } : {}) });

export function line(key: string, lineNo: string, label: string, amount: Centavos | null, extra: Partial<WorksheetLine> = {}): WorksheetLine {
  return { key, line: lineNo, label, amount, ...extra };
}

// ── Periods ────────────────────────────────────────────────

const pad2 = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM" of a document's month. */
export const monthKeyOf = (d: SourceDocument) => d.month.slice(0, 7);

/** Whether a "YYYY-MM-DD"/"YYYY-MM" month falls within [start, end] by month. */
export const monthWithin = (month: string, start: string, end: string) =>
  month.slice(0, 7) >= start.slice(0, 7) && month.slice(0, 7) <= end.slice(0, 7);

export const docsWithin = (docs: SourceDocument[], start: string, end: string) => docs.filter((d) => monthWithin(d.month, start, end));

/** Last calendar day of a "YYYY-MM" month, as "YYYY-MM-DD". */
export function monthEnd(mk: string): string {
  const [y, m] = mk.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return `${y}-${pad2(m)}-${pad2(last)}`;
}

/** "YYYY-MM" plus `n` months. */
export function addMonths(mk: string, n: number): string {
  const [y, m] = mk.split("-").map(Number);
  const t = y * 12 + (m - 1) + n;
  return `${Math.floor(t / 12)}-${pad2((t % 12) + 1)}`;
}

/** The months ("YYYY-MM") from start to end inclusive. */
export function monthsBetween(start: string, end: string): string[] {
  const out: string[] = [];
  for (let mk = start.slice(0, 7); mk <= end.slice(0, 7); mk = addMonths(mk, 1)) out.push(mk);
  return out;
}

/** First and last day of the taxable year containing `date`, for a year ending in `fyEndMonth` (12 = calendar year). */
export function taxableYear(date: string, fyEndMonth: number): { start: string; end: string } {
  const startMonth = (fyEndMonth % 12) + 1;
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const startYear = m >= startMonth ? y : y - 1;
  const start = `${startYear}-${pad2(startMonth)}-01`;
  return { start, end: monthEnd(addMonths(start, 11)) };
}

/** Quarter number (1–4) of the taxable year the filing period starts in. */
export function quarterOf(ctx: Pick<WorksheetContext, "client" | "filing">): number {
  const { start } = taxableYear(ctx.filing.periodStart, ctx.client.fiscalYearEndMonth);
  const months = monthsBetween(start, ctx.filing.periodStart).length - 1;
  return Math.floor(months / 3) + 1;
}

// ── Documents ──────────────────────────────────────────────

/** Sales/purchases excluding VAT: the VATable + exempt + zero-rated breakdown, or total less VAT when OCR read only the total. */
export function netOfVat(d: SourceDocument): Centavos {
  if (d.fromBooks) return d.vatable + d.vatExempt + d.zeroRated + (d.nonVat ?? 0);
  const breakdown = d.vatable + d.vatExempt + d.zeroRated;
  return breakdown > 0 ? breakdown : Math.max(0, d.total - d.vat);
}

export interface VatSplit {
  vatable: Centavos;
  vat: Centavos;
  exempt: Centavos;
  zeroRated: Centavos;
  /** Set when the split was inferred rather than read. */
  assumption?: string;
}

/**
 * VATable / exempt / zero-rated / VAT of one document for the VAT return.
 * When OCR read only a total, a sale is taken as VAT-inclusive VATable
 * (back-computing the VAT), and a purchase as having no creditable input VAT
 * — the conservative reading on each side.
 */
export function vatSplit(d: SourceDocument, side: "sale" | "purchase", vatRatePct: number): VatSplit {
  const { vatExempt: exempt, zeroRated } = d;
  // The Books give the split by tax code: nothing to infer (non-VAT amounts are on no VAT return).
  if (d.fromBooks) return { vatable: d.vatable, vat: d.vat, exempt, zeroRated };
  if (d.vatable > 0 || exempt > 0 || zeroRated > 0) {
    let vatable = d.vatable;
    if (vatable === 0 && d.vat > 0) vatable = Math.max(0, d.total - d.vat - exempt - zeroRated);
    return { vatable, vat: d.vat, exempt, zeroRated };
  }
  if (d.vat > 0) return { vatable: Math.max(0, d.total - d.vat), vat: d.vat, exempt: 0, zeroRated: 0 };
  if (d.total <= 0) return { vatable: 0, vat: 0, exempt: 0, zeroRated: 0 };
  if (side === "sale") {
    const vat = Math.round((d.total * vatRatePct) / (100 + vatRatePct));
    return { vatable: d.total - vat, vat, exempt: 0, zeroRated: 0, assumption: "only a total was read; taken as VAT-inclusive VATable sale" };
  }
  return { vatable: 0, vat: 0, exempt: d.total, zeroRated: 0, assumption: "only a total was read; taken as a purchase without input VAT" };
}

export const docLabel = (d: SourceDocument) =>
  `${d.docType === "sales_invoice" ? (d.fromBooks ? "Sales Invoice" : "Invoice") : d.docType === "purchase_receipt" ? (d.fromBooks ? "Purchase Invoice" : "Receipt") : "2307"} ${d.number ?? "(no number)"}${d.partyName ? ` — ${d.partyName}` : ""}${d.date ? ` (${d.date})` : ""}`;

/** Blocking errors for Book invoices with lines that carry no tax code (every line is coded, decision 7). */
export function uncodedErrors(docs: SourceDocument[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const d of docs) {
    if (!d.fromBooks || !d.uncoded || seen.has(d.id)) continue;
    seen.add(d.id);
    out.push(`${docLabel(d)}: lines of ₱${peso(d.uncoded)} have no tax code (or a code that cannot go on this invoice). Give every line its tax code in the Books.`);
  }
  return out;
}

// ── TINs and alphalist text (taxify reports/sls-report.js, reports/sawt-report.js) ──

export const tinDigits = (t: string | null | undefined) => (t ?? "").replace(/\D/g, "");

/** First 9 digits of a TIN, zero-padded (taxify `tin9`). */
export function tin9(t: string | null | undefined): string {
  return tinDigits(t).substring(0, 9).padEnd(9, "0").substring(0, 9);
}

/** "123-456-789" (taxify `tinDashed`). */
export function tinDashed(t: string | null | undefined): string {
  const d = tin9(t);
  return `${d.substring(0, 3)}-${d.substring(3, 6)}-${d.substring(6, 9)}`;
}

/** Branch code from the digits after the 9-digit TIN (last four, zero-padded), else taxify's default "0001". */
export function branchCode(t: string | null | undefined): string {
  const rest = tinDigits(t).substring(9);
  return rest ? rest.slice(-4).padStart(4, "0") : "0001";
}

/** Keeps letters, digits, spaces, period, hyphen, slash — BIR's Validation Module rejects the rest (taxify `stripSpecial`). */
export const stripSpecial = (v: string | null | undefined) => (v ?? "").replace(/[^A-Za-z0-9\s.\-/]/g, "");

/** Detail-row field: quoted when present, fully empty when blank (taxify `qd`). */
export const qd = (v: string) => (v ? `"${v}"` : "");

/** "YYYY-MM-DD" → "MM/DD/YYYY" (taxify `datDate`). */
export const datDate = (iso: string) => `${iso.slice(5, 7)}/${iso.slice(8, 10)}/${iso.slice(0, 4)}`;

/** "YYYY-MM" → "MM/YYYY". */
export const datMonth = (mk: string) => `${mk.slice(5, 7)}/${mk.slice(0, 4)}`;

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** CRLF-terminated lines, as the BIR DAT files are written. */
export const crlf = (lines: string[]) => lines.join("\r\n") + "\r\n";

/** One CSV cell, quoted only when needed. */
export function csvCell(v: string | number | null | undefined): string {
  const s = v == null ? "" : String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Excel-compatible CSV (UTF-8 with BOM so Excel reads ñ and ₱). */
export const csv = (rows: (string | number | null)[][]) => "﻿" + crlf(rows.map((r) => r.map(csvCell).join(",")));

// ── Filer identity for the alphalist headers ───────────────

/** Name parts of an individual filer, typed in because the OS keeps one name field. Only shown for individuals. */
export function ownerNameInputs(ctx: Pick<WorksheetContext, "client">): ManualInput[] {
  if (ctx.client.taxpayerType !== "individual") return [];
  const help = "For the header of the BIR alphalist (DAT) files, which want an individual's name split.";
  return [
    { key: "owner_last_name", label: "Taxpayer's last name", kind: "text", required: false, help },
    { key: "owner_first_name", label: "Taxpayer's first name", kind: "text", required: false, help },
    { key: "owner_middle_name", label: "Taxpayer's middle name", kind: "text", required: false, help },
  ];
}

export interface Filer {
  tin9: string;
  isIndividual: boolean;
  lastName: string;
  firstName: string;
  middleName: string;
  /** Registered / trade name. */
  name: string;
  address: string;
  rdo: string;
  fiscalMonthEnd: string;
}

export function filerOf(ctx: WorksheetContext): Filer {
  const isIndividual = ctx.client.taxpayerType === "individual";
  const t = (k: string) => (isIndividual ? (ctx.inputs[k] ?? "").trim() : "");
  return {
    tin9: tin9(ctx.client.tin),
    isIndividual,
    lastName: t("owner_last_name"),
    firstName: t("owner_first_name"),
    middleName: t("owner_middle_name"),
    name: ctx.client.name,
    address: ctx.client.registeredAddress ?? "",
    rdo: ctx.client.rdoCode ?? "",
    fiscalMonthEnd: String(ctx.client.fiscalYearEndMonth).padStart(2, "0"),
  };
}

/** Warnings about the filer data the DAT headers need. */
export function filerWarnings(ctx: WorksheetContext): string[] {
  const w: string[] = [];
  if (tinDigits(ctx.client.tin).length < 9) w.push("The client has no valid TIN; the alphalist files will carry 000000000.");
  if (!ctx.client.rdoCode) w.push("The client has no RDO code; the alphalist file headers will leave it blank.");
  if (ctx.client.taxpayerType === "individual" && !(ctx.inputs.owner_last_name?.trim() && ctx.inputs.owner_first_name?.trim()))
    w.push("Enter the taxpayer's last and first name so the alphalist file headers carry them.");
  return w;
}
