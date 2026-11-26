/** Database rows ↔ payroll types (numeric pesos in the database, centavos here). Pure, so it can be tested. */
import { toCentavos, toDecimalString } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import { computeEmployeeYear } from "./compute";
import { categoryTotals, type BirCategory, type ItemKind, type PayrollItem } from "./items";
import type { Employee, EmploymentStatus, PayAmounts, PayrollEntry, PriorEmployer, SeparationReason } from "./types";

export const EMPLOYEE_COLUMNS =
  "id, employee_no, last_name, first_name, middle_name, tin, tin_branch, birth_date, address, zip_code, region, nationality, employment_status, is_mwe, mwe_daily_rate, mwe_monthly_rate, hire_date, separation_date, separation_reason, substituted_filing, active, needs_details, pay_account_id, sss_no, philhealth_no, pagibig_no";
export const ITEM_COLUMNS = "id, name, kind, bir_category, sort_order, active";
/** payroll_entries with their lines embedded. */
export const ENTRY_COLUMNS = "employee_id, pay_month, adjustment, note, payroll_entry_lines(item_id, amount)";

type Row = Record<string, unknown>;
const str = (v: unknown) => (v == null || v === "" ? null : String(v));
const cents = (v: unknown): Centavos => toCentavos(v == null ? null : (v as string | number)) ?? 0;

export function employeeFromRow(r: Row): Employee {
  return {
    id: String(r.id),
    employeeNo: str(r.employee_no),
    lastName: String(r.last_name),
    firstName: String(r.first_name),
    middleName: str(r.middle_name),
    tin: str(r.tin),
    tinBranch: str(r.tin_branch) ?? "0000",
    sssNo: str(r.sss_no),
    philhealthNo: str(r.philhealth_no),
    pagibigNo: str(r.pagibig_no),
    birthDate: str(r.birth_date),
    address: str(r.address),
    zipCode: str(r.zip_code),
    region: str(r.region),
    nationality: str(r.nationality) ?? "FILIPINO",
    employmentStatus: (str(r.employment_status) ?? "R") as EmploymentStatus,
    isMwe: r.is_mwe === true,
    mweDailyRate: r.mwe_daily_rate == null ? null : cents(r.mwe_daily_rate),
    mweMonthlyRate: r.mwe_monthly_rate == null ? null : cents(r.mwe_monthly_rate),
    hireDate: str(r.hire_date),
    separationDate: str(r.separation_date),
    separationReason: str(r.separation_reason) as SeparationReason | null,
    substitutedFiling: r.substituted_filing !== false,
    active: r.active !== false,
    needsDetails: r.needs_details === true,
    payAccountId: str(r.pay_account_id),
  };
}

export const PRIOR_EMPLOYER_COLUMNS = "employee_id, year, tin, name, address, zip_code, taxable_compensation, non_taxable_compensation, tax_withheld";

export function priorEmployerFromRow(r: Row): PriorEmployer {
  return {
    employeeId: String(r.employee_id),
    year: Number(r.year),
    tin: str(r.tin),
    name: String(r.name),
    address: str(r.address),
    zipCode: str(r.zip_code),
    taxable: cents(r.taxable_compensation),
    nonTaxable: cents(r.non_taxable_compensation),
    withheld: cents(r.tax_withheld),
  };
}

/** The database stores "none" for both kinds; the app tells them apart by kind. */
export function itemFromRow(r: Row): PayrollItem {
  const kind = String(r.kind) as ItemKind;
  const raw = String(r.bir_category);
  const category = (raw === "none" ? (kind === "deduction" ? "none_deduction" : "none_employer") : raw) as BirCategory;
  return { id: String(r.id), name: String(r.name), kind, category, sortOrder: Number(r.sort_order ?? 0), active: r.active !== false };
}

export const categoryToDb = (c: BirCategory) => (c === "none_deduction" || c === "none_employer" ? "none" : c);

/** One employee-month as stored: item amounts, adjustment and note (several pay-period entries added together). */
export interface StoredMonth {
  employeeId: string;
  payMonth: string;
  lines: Map<string, Centavos>;
  adjustment: Centavos;
  note: string | null;
}

export function storedMonthsFromRows(rows: Row[]): StoredMonth[] {
  const out = new Map<string, StoredMonth>();
  for (const r of rows) {
    const employeeId = String(r.employee_id);
    const payMonth = String(r.pay_month).slice(0, 10);
    const k = `${employeeId}|${payMonth}`;
    const m = out.get(k) ?? { employeeId, payMonth, lines: new Map(), adjustment: 0, note: null };
    m.adjustment += cents(r.adjustment);
    const note = str(r.note);
    if (note) m.note = m.note ? `${m.note}; ${note}` : note;
    for (const l of (r.payroll_entry_lines as Row[] | null) ?? []) {
      const id = String(l.item_id);
      m.lines.set(id, (m.lines.get(id) ?? 0) + cents(l.amount));
    }
    out.set(k, m);
  }
  return [...out.values()];
}

/** Category totals per employee-month, the input of every BIR computation. */
export function toEntries(months: StoredMonth[], items: PayrollItem[]): PayrollEntry[] {
  return months.map((m) => ({ employeeId: m.employeeId, payMonth: m.payMonth, note: m.note, ...categoryTotals(m.lines, items, m.adjustment) }));
}

export interface MonthInput {
  lines: Map<string, Centavos>;
  adjustment: Centavos;
  note: string | null;
}

/**
 * save_payroll_month's p_entries for month `m` (0-based) of `year`: each listed
 * employee's lines with item 22 (taxable compensation) worked out against their
 * earlier months, so the 13th-month ceiling is applied cumulatively. An employee
 * with no lines, adjustment or note is listed empty, which clears their month.
 */
export function monthPayload(year: number, m: number, employees: Employee[], items: PayrollItem[], earlier: PayrollEntry[], input: Map<string, MonthInput>): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const [employeeId, v] of input) {
    const e = employees.find((x) => x.id === employeeId);
    if (!e) continue;
    const months: (PayAmounts | null)[] = Array.from({ length: 12 }, () => null);
    for (const p of earlier) {
      if (p.employeeId !== employeeId || Number(p.payMonth.slice(0, 4)) !== year) continue;
      const i = Number(p.payMonth.slice(5, 7)) - 1;
      if (i < m) months[i] = p;
    }
    months[m] = categoryTotals(v.lines, items, v.adjustment);
    const lines = computeEmployeeYear(months, e.isMwe, year);
    out.push({
      employee_id: employeeId,
      pay_period_end: null,
      taxable_compensation: toDecimalString(lines[m].l22),
      adjustment: toDecimalString(v.adjustment),
      note: v.note,
      lines: [...v.lines].filter(([, a]) => a !== 0).map(([item_id, a]) => ({ item_id, amount: toDecimalString(a) })),
    });
  }
  return out;
}

/** Same lines, adjustment and note? (to send only what changed) */
export function sameMonth(a: MonthInput | undefined, b: MonthInput): boolean {
  if (!a) return b.lines.size === 0 && b.adjustment === 0 && !b.note;
  const nz = (x: Map<string, Centavos>) => [...x].filter(([, v]) => v !== 0).sort(([p], [q]) => p.localeCompare(q));
  return JSON.stringify(nz(a.lines)) === JSON.stringify(nz(b.lines)) && a.adjustment === b.adjustment && (a.note ?? null) === (b.note ?? null);
}
