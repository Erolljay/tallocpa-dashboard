/**
 * BIR Form 2307 (Certificate of Creditable Tax Withheld at Source, January 2018 ENCS)
 * that the client, as withholding agent (payor), issues to its suppliers (payees): every
 * field the printed form needs (src/components/bir/form-2307.tsx), from the EWT on the
 * client's Purchase Invoices (docs/REWORK.md decision 7: a WC / WI withholding code on a
 * Purchase Invoice is EWT, on the 0619-E, 1601-EQ and QAP, with a 2307 issued).
 *
 * The data comes from public.books_2307_data() (migration 20261204000001_books_2307.sql):
 * posted, not void Purchase Invoices with EWT, the income payment being the invoice's
 * subtotal (net of VAT), as on the QAP. Certificates are cut:
 *   - per quarter: one per supplier, its income payments in the 1st / 2nd / 3rd month
 *     of the quarter per ATC (the form's own layout);
 *   - per month: one per supplier and month, the payments in that month's column;
 *   - per transaction: one per Purchase Invoice.
 * Quarters are calendar quarters (EWT is remitted on the 1601-EQ by calendar quarter).
 * All arithmetic is in integer centavos.
 */
import { applyRate, toCentavos } from "@/lib/returns/money";
import { lookupAtc } from "@/lib/returns/atc";
import type { Centavos } from "@/lib/returns/types";

export type By2307 = "quarter" | "month" | "transaction";
export const BY_2307: Record<By2307, string> = { quarter: "Per quarter", month: "Per month", transaction: "Per transaction" };

/** One Purchase Invoice with EWT, as books_2307_data() gives it. */
export interface Raw2307Row {
  invoice_id: string;
  issue_date: string;
  reference: string | null;
  party_id: string | null;
  party_name: string;
  party_tin: string | null;
  atc: string | null;
  tax_code: string | null;
  tax_code_name: string | null;
  tax_code_rate: string | null;
  income_payment: string | number;
  withholding: string | number;
  payee: {
    tin: string;
    branch_code: string;
    kind: "individual" | "non_individual";
    name: string;
    registered_address: string | null;
    zip_code: string | null;
  } | null;
}

/** What public.books_2307_data() returns. */
export interface Raw2307 {
  client: { id: string; name: string; tin: string | null; rdo_code: string | null; registered_address: string | null; taxpayer_type: string } | null;
  settings: { zip_code: string | null; signatory_name: string | null; signatory_title: string | null } | null;
  books_start: string | null;
  months: { month: string; locked: boolean }[];
  locked_months: string[];
  rows: Raw2307Row[];
}

/** A payee or payor as printed in Part I / Part II. */
export interface Party2307 {
  /** Nine TIN digits and the five-digit branch code ("12345678900000"), or "" if unknown. */
  tin: string;
  name: string;
  address: string | null;
  zipCode: string | null;
}

/** One ATC row of Part III. */
export interface Line2307 {
  atc: string;
  /** "Income Payments Subject to Expanded Withholding Tax": the nature of the payment. */
  nature: string;
  /** Income payments in the 1st, 2nd and 3rd month of the quarter. */
  months: [Centavos, Centavos, Centavos];
  total: Centavos;
  withheld: Centavos;
}

export interface Form2307Data {
  /** Unique within a set: the supplier and period, or the invoice. */
  key: string;
  /** The supplier this certificate is for (see supplierKey). */
  supplierKey: string;
  /** Item 1, YYYY-MM-DD. */
  periodFrom: string;
  periodTo: string;
  /** Part I, items 2–5. */
  payee: Party2307 & { foreignAddress: string | null };
  /** Part II, items 6–8A. */
  payor: Party2307;
  /** Part III, income payments subject to EWT, by ATC. */
  lines: Line2307[];
  totals: { months: [Centavos, Centavos, Centavos]; total: Centavos; withheld: Centavos };
  /** Money payments subject to withholding of business tax: none from Purchase Invoices (empty rows print). */
  businessTax: Line2307[];
  /** The payor's authorized representative, signature over printed name. */
  signatory: { name: string | null; title: string | null };
  /** The invoices on this certificate. */
  invoices: { id: string; date: string; reference: string | null; atc: string; incomePayment: Centavos; withheld: Centavos }[];
  /** What to check before releasing the certificate. */
  warnings: string[];
}

export interface Period2307 {
  /** "2026-Q1" or "2026-01". */
  value: string;
  kind: "quarter" | "month";
  year: number;
  /** 1–4. */
  quarter: number;
  /** 1–12 for a month; the quarter's first month for a quarter. */
  month: number;
  from: string;
  to: string;
  label: string;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad2 = (n: number) => String(n).padStart(2, "0");
const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();

/** The calendar quarter (1–4) of month 1–12. */
export const quarterOf = (month: number) => Math.floor((month - 1) / 3) + 1;

/** Which month of its quarter a date falls in: 0, 1 or 2. */
export const monthSlot = (isoDate: string): 0 | 1 | 2 => ((Number(isoDate.slice(5, 7)) - 1) % 3) as 0 | 1 | 2;

/** "2026-Q1" or "2026-01" → the period; null if it is neither. */
export function parsePeriod2307(value: string | null | undefined): Period2307 | null {
  const q = /^(\d{4})-Q([1-4])$/.exec(value ?? "");
  if (q) {
    const year = Number(q[1]);
    const quarter = Number(q[2]);
    const first = quarter * 3 - 2;
    return {
      value: `${year}-Q${quarter}`, kind: "quarter", year, quarter, month: first,
      from: `${year}-${pad2(first)}-01`, to: `${year}-${pad2(first + 2)}-${pad2(lastDay(year, first + 2))}`,
      label: `Q${quarter} ${year} (${MONTHS[first - 1]}–${MONTHS[first + 1]})`,
    };
  }
  const m = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value ?? "");
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    return {
      value: `${year}-${pad2(month)}`, kind: "month", year, quarter: quarterOf(month), month,
      from: `${year}-${pad2(month)}-01`, to: `${year}-${pad2(month)}-${pad2(lastDay(year, month))}`,
      label: `${MONTHS[month - 1]} ${year}`,
    };
  }
  return null;
}

/** The quarter "YYYY-Qn" holding a "YYYY-MM" month. */
export const quarterValue = (ym: string) => `${ym.slice(0, 4)}-Q${quarterOf(Number(ym.slice(5, 7)))}`;

/** TIN digits with a five-digit branch: "123-456-789" + "0000" → "12345678900000"; "" without nine digits. */
export function tin14(tin: string | null | undefined, branch?: string | null): string {
  const d = (tin ?? "").replace(/\D/g, "");
  if (d.length < 9) return "";
  const b = (branch != null ? branch.replace(/\D/g, "") : d.slice(9)) || "0";
  return d.slice(0, 9) + b.padStart(5, "0").slice(-5);
}

/** The supplier a row belongs to: its party, else its TIN, else its name. URL-safe. */
export function supplierKey(r: Pick<Raw2307Row, "party_id" | "party_tin" | "party_name">): string {
  if (r.party_id) return r.party_id;
  const t = tin14(r.party_tin);
  if (t) return `tin-${t}`;
  return `name-${r.party_name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

/** The nature of payment for an ATC: the ATC table's description, else the tax code's name. */
export function natureOf(atc: string, taxCodeName?: string | null): string {
  return lookupAtc(atc)?.desc ?? taxCodeName ?? "";
}

/** Rows of Part III from invoices: one per ATC (sorted), income payments in their month of the quarter. */
export function groupByAtc(rows: Pick<Raw2307Row, "issue_date" | "atc" | "tax_code_name" | "income_payment" | "withholding">[]): Line2307[] {
  const by = new Map<string, Line2307>();
  for (const r of rows) {
    const atc = r.atc ?? "";
    let l = by.get(atc);
    if (!l) by.set(atc, (l = { atc, nature: natureOf(atc, r.tax_code_name), months: [0, 0, 0], total: 0, withheld: 0 }));
    const amount = toCentavos(r.income_payment) ?? 0;
    l.months[monthSlot(r.issue_date)] += amount;
    l.total += amount;
    l.withheld += toCentavos(r.withholding) ?? 0;
  }
  return [...by.values()].sort((a, b) => a.atc.localeCompare(b.atc));
}

export function totalsOf(lines: Line2307[]): Form2307Data["totals"] {
  const t: Form2307Data["totals"] = { months: [0, 0, 0], total: 0, withheld: 0 };
  for (const l of lines) {
    for (const i of [0, 1, 2] as const) t.months[i] += l.months[i];
    t.total += l.total;
    t.withheld += l.withheld;
  }
  return t;
}

const fmt = (c: Centavos) => (c / 100).toFixed(2);

/** The payor (the client) as Part II prints it. */
export function payorOf(raw: Raw2307): Party2307 {
  return { tin: tin14(raw.client?.tin), name: raw.client?.name ?? "", address: raw.client?.registered_address ?? null, zipCode: raw.settings?.zip_code ?? null };
}

export interface Set2307 {
  clientName: string;
  period: Period2307;
  by: By2307;
  forms: Form2307Data[];
  /** Months of the period not locked in the Books ("January 2026"). */
  openMonths: string[];
  /** Locked months of the client's Books, "YYYY-MM", oldest first. */
  lockedMonths: string[];
  /** Every supplier with EWT in the period, for the picker. */
  suppliers: { key: string; name: string }[];
}

/**
 * The 2307s of a period from books_2307_data(): per supplier for the quarter (only for a
 * quarter period), per supplier and month, or per invoice; `supplier` keeps one supplier.
 */
export function forms2307(raw: Raw2307, period: Period2307, by: By2307, supplier?: string | null): Set2307 {
  const mode: By2307 = by === "quarter" && period.kind !== "quarter" ? "month" : by;
  const payor = payorOf(raw);
  const signatory = { name: raw.settings?.signatory_name ?? null, title: raw.settings?.signatory_title ?? null };
  const openMonths = raw.months.filter((m) => !m.locked).map((m) => `${MONTHS[Number(m.month.slice(5, 7)) - 1]} ${m.month.slice(0, 4)}`);
  const rows = raw.rows.filter((r) => r.issue_date >= period.from && r.issue_date <= period.to);

  const suppliers = new Map<string, string>();
  for (const r of rows) suppliers.set(supplierKey(r), r.payee?.name ?? r.party_name);

  const groups = new Map<string, { supplierKey: string; from: string; to: string; rows: Raw2307Row[] }>();
  for (const r of rows) {
    const sk = supplierKey(r);
    if (supplier && sk !== supplier) continue;
    const month = parsePeriod2307(r.issue_date.slice(0, 7))!;
    const [key, from, to] =
      mode === "quarter" ? [sk, period.from, period.to]
      : mode === "month" ? [`${sk}.${month.value}`, month.from, month.to]
      : [r.invoice_id, month.from, month.to];
    let g = groups.get(key);
    if (!g) groups.set(key, (g = { supplierKey: sk, from, to, rows: [] }));
    g.rows.push(r);
  }

  const forms = [...groups.entries()].map(([key, g]): Form2307Data => {
    // The payee's registered details: the latest invoice's party (the directory), else what the invoice says.
    const last = g.rows[g.rows.length - 1];
    const withParty = [...g.rows].reverse().find((r) => r.payee) ?? null;
    const p = withParty?.payee ?? null;
    const payee = {
      tin: p ? tin14(p.tin, p.branch_code) : tin14(last.party_tin),
      name: (p?.name ?? last.party_name).toUpperCase(),
      address: p?.registered_address ?? null,
      zipCode: p?.zip_code ?? null,
      foreignAddress: null,
    };
    const lines = groupByAtc(g.rows);
    const warnings: string[] = [];
    if (!payee.tin) warnings.push("No supplier TIN (item 2): add it to the supplier.");
    if (!payee.address) warnings.push("No supplier registered address (item 4): complete the supplier in the parties directory.");
    if (!payee.zipCode) warnings.push("No supplier ZIP code (item 4A): add it to the supplier in the parties directory.");
    if (!payor.tin) warnings.push("No client TIN (item 6): add it to the client's record.");
    if (!payor.zipCode) warnings.push("No client ZIP code (item 8A): add it to the client's record.");
    if (!signatory.name) warnings.push("No authorized representative to sign: set the signatory in Payroll setup.");
    for (const l of lines) {
      const info = lookupAtc(l.atc);
      if (!l.atc) warnings.push("An invoice has EWT but no withholding code: set the ATC on the Purchase Invoice.");
      else if (!info) warnings.push(`${l.atc} is not in the ATC table: check the withholding code.`);
      else {
        const expected = g.rows.filter((r) => (r.atc ?? "") === l.atc).reduce((a, r) => a + applyRate(toCentavos(r.income_payment) ?? 0, info.rate), 0);
        if (Math.abs(expected - l.withheld) > 1) warnings.push(`${l.atc}: tax withheld ${fmt(l.withheld)} is not ${info.rate}% of ${fmt(l.total)} (${fmt(expected)}).`);
      }
    }
    return {
      key,
      supplierKey: g.supplierKey,
      periodFrom: g.from,
      periodTo: g.to,
      payee,
      payor,
      lines,
      totals: totalsOf(lines),
      businessTax: [],
      signatory,
      invoices: g.rows.map((r) => ({ id: r.invoice_id, date: r.issue_date, reference: r.reference, atc: r.atc ?? "", incomePayment: toCentavos(r.income_payment) ?? 0, withheld: toCentavos(r.withholding) ?? 0 })),
      warnings,
    };
  });
  forms.sort((a, b) => a.payee.name.localeCompare(b.payee.name) || a.periodFrom.localeCompare(b.periodFrom) || (a.invoices[0]?.date ?? "").localeCompare(b.invoices[0]?.date ?? "") || a.key.localeCompare(b.key));

  return {
    clientName: raw.client?.name ?? "",
    period,
    by: mode,
    forms,
    openMonths,
    lockedMonths: raw.locked_months.map((m) => m.slice(0, 7)),
    suppliers: [...suppliers.entries()].map(([key, name]) => ({ key, name })).sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/**
 * The periods a client user may print (portal): every quarter whose three months are
 * locked, and every locked month, newest first.
 */
export function portalPeriods(lockedMonths: string[]): Period2307[] {
  const locked = new Set(lockedMonths);
  const out: Period2307[] = [];
  const quarters = [...new Set(lockedMonths.map(quarterValue))];
  for (const qv of quarters) {
    const q = parsePeriod2307(qv)!;
    if ([0, 1, 2].every((i) => locked.has(`${q.year}-${pad2(q.month + i)}`))) out.push(q);
  }
  for (const m of lockedMonths) out.push(parsePeriod2307(m)!);
  // Newest first; a quarter before its own months.
  return out.sort((a, b) => b.to.localeCompare(a.to) || (a.kind === b.kind ? 0 : a.kind === "quarter" ? -1 : 1));
}

export const isBy2307 = (v: unknown): v is By2307 => v === "quarter" || v === "month" || v === "transaction";
