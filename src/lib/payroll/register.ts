/**
 * The payroll register a client or staff fills in for a month (the Excel
 * template, register-xlsx.ts) and its validation. Layout ported from taxify.ph
 * batch/batch-import.js, payroll branch (`biHeaders`, `downloadTemplate`): a
 * group-label row (EARNINGS / DEDUCTIONS / EMPLOYER CONTRIBUTIONS / TOTALS (FOR
 * VALIDATION)) above the headers, one column per active payslip item of the
 * client (items.ts), one row per employee per pay period, computed gross /
 * deductions / net per row. Rows are matched by Employee No. (prefilled), not by
 * a typed name; columns are matched by header, so they may be reordered.
 *
 * Several rows for the same employee in one month (semi-monthly or weekly pay)
 * are added together into the month's single entry.
 */
import { toCentavos } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import { sortItems, type PayrollItem } from "./items";
import type { Employee } from "./types";
import { displayName, sortName } from "./year";

/** The identifying columns before the item columns. */
export const ID_HEADERS = ["Employee No.", "Employee Name (Last, First Middle)", "TIN", "Pay Date (YYYY-MM-DD, optional)"] as const;
export const TOTAL_HEADERS = ["Gross Pay (computed)", "Total Deductions (computed)", "Net Pay (computed)"] as const;

/** The register's columns for a client's items: id columns, active items (earnings, deductions, employer contributions), totals. */
export function registerHeaders(items: PayrollItem[]): string[] {
  return [...ID_HEADERS, ...sortItems(items.filter((i) => i.active)).map((i) => i.name), ...TOTAL_HEADERS];
}

/** One row as read from the file. Amounts stay as written ("1,234.50", 1234.5, "") until checked. */
export interface RegisterRow {
  /** Row number in the sheet, for messages. */
  line: number;
  employeeNo: string;
  name: string;
  tin: string;
  payDate: string;
  /** Item id → the amount as written. */
  amounts: Record<string, string>;
  /** The computed totals as last calculated by Excel (null when the file has no cached result). */
  totals: { gross: string | null; deductions: string | null; net: string | null };
}

export interface RegisterIssue {
  line: number | null;
  message: string;
}

/** A row (or rows) for someone not on the client's employee list yet. */
export interface NewEmployeeRow {
  key: string;
  employeeNo: string | null;
  lastName: string;
  firstName: string;
  middleName: string | null;
  tin: string | null;
  /** Sheet rows. */
  rows: number[];
  lines: Map<string, Centavos>;
}

export interface CheckedRegister {
  /** Item amounts for the month per known employee id (rows of the same employee added together). */
  entries: Map<string, Map<string, Centavos>>;
  /** Excel rows behind each employee id. */
  linesByEmployee: Map<string, number[]>;
  newEmployees: NewEmployeeRow[];
  errors: RegisterIssue[];
  /** Rows with any amount. */
  rowCount: number;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9ñ]+/g, " ").trim();
const tinDigits = (s: string) => s.replace(/\D/g, "");

/** "Dela Cruz, Juan Santos" → parts; null when there is no comma. The last word after the comma is not split off: middle names are entered on the employee page. */
export function parseName(name: string): { lastName: string; firstName: string; middleName: string | null } | null {
  const i = name.indexOf(",");
  if (i < 0) return null;
  const lastName = name.slice(0, i).trim();
  const rest = name.slice(i + 1).split(",").map((s) => s.trim()).filter(Boolean);
  if (!lastName || rest.length === 0) return null;
  return { lastName, firstName: rest[0], middleName: rest[1] ?? null };
}

/** "123-456-789" from any TIN with at least nine digits; null otherwise. */
export function normalizeTin(tin: string): string | null {
  const d = tinDigits(tin);
  if (d.length < 9) return null;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 9)}`;
}

const fmt = (c: Centavos) => (c / 100).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Checks a register for `month` (YYYY-MM-01) against the client's employees:
 * every amount must be a number of zero or more, the computed totals must agree
 * with the amounts, a pay date (if any) must be in the month, and each row must
 * name a known employee by Employee No. (or TIN, or exactly the name picked from
 * the dropdown when the number is blank). Rows for unknown people become
 * "new employee" rows for staff to add. Messages carry the sheet row number.
 */
export function checkRegister(rows: RegisterRow[], employees: Employee[], items: PayrollItem[], month: string): CheckedRegister {
  const itemById = new Map(items.map((i) => [i.id, i]));
  const errors: RegisterIssue[] = [];
  const entries = new Map<string, Map<string, Centavos>>();
  const linesByEmployee = new Map<string, number[]>();
  const fresh = new Map<string, NewEmployeeRow>();
  const byNo = new Map(employees.filter((e) => e.employeeNo).map((e) => [norm(e.employeeNo!), e]));
  const byTin = new Map(employees.filter((e) => e.tin).map((e) => [tinDigits(e.tin!).slice(0, 9), e]));
  const byName = new Map<string, Employee[]>();
  for (const e of employees) {
    for (const n of new Set([norm(displayName(e)), norm(sortName(e))])) byName.set(n, [...(byName.get(n) ?? []), e]);
  }
  let rowCount = 0;

  for (const r of rows) {
    const rowErrors: string[] = [];
    const amounts = new Map<string, Centavos>();
    let any = false;
    let gross = 0;
    let deductions = 0;
    for (const [itemId, rawValue] of Object.entries(r.amounts)) {
      const item = itemById.get(itemId);
      const raw = (rawValue ?? "").trim();
      if (!item || raw === "") continue;
      any = true;
      const c = toCentavos(raw);
      if (c == null) rowErrors.push(`${item.name}: “${raw}” is not an amount`);
      else if (c < 0 && item.kind !== "earning") rowErrors.push(`${item.name} cannot be negative`);
      else {
        amounts.set(itemId, (amounts.get(itemId) ?? 0) + c);
        if (item.kind === "earning") gross += c;
        else if (item.kind === "deduction") deductions += c;
      }
    }
    if (!any) continue; // an employee not paid this period, or an empty row
    rowCount++;

    const checks: [string, string | null, Centavos][] = [
      ["Gross Pay", r.totals.gross, gross],
      ["Total Deductions", r.totals.deductions, deductions],
      ["Net Pay", r.totals.net, gross - deductions],
    ];
    for (const [label, shown, expected] of checks) {
      if (shown == null || shown.trim() === "") continue;
      const c = toCentavos(shown);
      if (c == null || Math.abs(c - expected) > 1) rowErrors.push(`${label} shows ${c == null ? `“${shown}”` : fmt(c)} but the amounts add up to ${fmt(expected)}; do not type over the computed columns`);
    }

    if (r.payDate.trim()) {
      const d = r.payDate.trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) rowErrors.push(`Pay Date “${d}” is not a date like ${month.slice(0, 8)}15`);
      else if (d.slice(0, 7) !== month.slice(0, 7)) rowErrors.push(`Pay Date ${d} is not in ${month.slice(0, 7)}`);
    }

    // Who the row is for.
    const no = r.employeeNo.trim();
    const tin = tinDigits(r.tin).slice(0, 9);
    let emp: Employee | undefined;
    if (no) emp = byNo.get(norm(no));
    else if (tin.length === 9) emp = byTin.get(tin);
    if (!emp && !no && r.name.trim()) {
      const hits = byName.get(norm(r.name)) ?? [];
      if (hits.length === 1) emp = hits[0];
      else if (hits.length > 1) rowErrors.push(`“${r.name}” matches ${hits.length} employees; enter the Employee No.`);
    }
    if (emp && tin.length === 9 && emp.tin && tinDigits(emp.tin) !== tin) {
      rowErrors.push(`TIN ${r.tin.trim()} does not match ${displayName(emp)}'s TIN ${emp.tin}`);
    }

    let newRow: NewEmployeeRow | null = null;
    if (!emp && rowErrors.length === 0) {
      const parts = parseName(r.name.trim());
      if (!parts) rowErrors.push(no ? `Employee No. ${no} is not on the employee list; to add them, write the name as “Last, First Middle”` : "Enter the Employee No. (or the name as “Last, First Middle” for a new employee)");
      else {
        const key = no ? `no:${norm(no)}` : `name:${norm(r.name)}`;
        newRow = fresh.get(key) ?? { key, employeeNo: no || null, ...parts, tin: normalizeTin(r.tin), rows: [], lines: new Map() };
        fresh.set(key, newRow);
      }
    }

    if (rowErrors.length) {
      for (const m of rowErrors) errors.push({ line: r.line, message: m });
      continue;
    }
    const target = emp ? (entries.get(emp.id) ?? new Map<string, Centavos>()) : newRow!.lines;
    for (const [id, c] of amounts) target.set(id, (target.get(id) ?? 0) + c);
    if (emp) {
      entries.set(emp.id, target);
      linesByEmployee.set(emp.id, [...(linesByEmployee.get(emp.id) ?? []), r.line]);
    } else newRow!.rows.push(r.line);
  }
  return { entries, linesByEmployee, newEmployees: [...fresh.values()], errors, rowCount };
}
