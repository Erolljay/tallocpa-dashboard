/**
 * A client's payroll year: each employee's entries by month, their 1601-C lines,
 * a month's 1601-C totals (taxify reports/1601c-report.js `generate1601C`).
 */
import type { Centavos } from "@/lib/returns/types";
import { computeEmployeeYear, suggestWithholding, type MonthLines, type Suggestion } from "./compute";
import type { Employee, PayrollContext, PayrollEntry } from "./types";

export interface EmployeeYear {
  employee: Employee;
  /** Entries by month, January = 0. */
  months: (PayrollEntry | null)[];
  lines: MonthLines[];
}

/** "DELA CRUZ, JUAN, SANTOS" ordering as in taxify (last, first, middle joined with ", "). */
export function sortName(e: Pick<Employee, "lastName" | "firstName" | "middleName">): string {
  return [e.lastName, e.firstName, e.middleName].filter(Boolean).join(", ");
}

/** "Dela Cruz, Juan Santos" for screens. */
export function displayName(e: Pick<Employee, "lastName" | "firstName" | "middleName">): string {
  return `${e.lastName}, ${e.firstName}${e.middleName ? ` ${e.middleName}` : ""}`;
}

export const byName = (a: Pick<Employee, "lastName" | "firstName" | "middleName">, b: Pick<Employee, "lastName" | "firstName" | "middleName">) =>
  sortName(a).localeCompare(sortName(b), "en");

/** Every employee with their months and computed lines for `ctx.year` (months after throughMonth are empty). */
export function buildYear(ctx: PayrollContext): EmployeeYear[] {
  const byEmployee = new Map<string, (PayrollEntry | null)[]>();
  for (const e of ctx.entries) {
    if (Number(e.payMonth.slice(0, 4)) !== ctx.year) continue;
    const m = Number(e.payMonth.slice(5, 7)) - 1;
    if (m + 1 > ctx.throughMonth) continue;
    const months = byEmployee.get(e.employeeId) ?? Array.from({ length: 12 }, () => null);
    months[m] = e;
    byEmployee.set(e.employeeId, months);
  }
  return [...ctx.employees].sort(byName).map((employee) => {
    const months = byEmployee.get(employee.id) ?? Array.from({ length: 12 }, () => null);
    return { employee, months, lines: computeEmployeeYear(months, employee.isMwe, ctx.year) };
  });
}

export const LINE_KEYS = ["l14", "l15", "l16", "l17", "l18", "l19", "l20", "l21", "l22", "l23", "l24", "l25", "l26"] as const;
export type LineKey = (typeof LINE_KEYS)[number];
export type LineTotals = Record<LineKey, Centavos>;

export interface Month1601CRow {
  employee: Employee;
  lines: MonthLines;
  suggestion: Suggestion;
}

/** taxify generate1601C: the employees paid in month m (0-based) and the totals of their lines. */
export function month1601C(years: EmployeeYear[], m: number, year: number): { rows: Month1601CRow[]; totals: LineTotals } {
  const totals = Object.fromEntries(LINE_KEYS.map((k) => [k, 0])) as LineTotals;
  const rows: Month1601CRow[] = [];
  for (const y of years) {
    const lines = y.lines[m];
    if (!lines.hasEntry) continue;
    rows.push({ employee: y.employee, lines, suggestion: suggestWithholding(y.employee, y.lines, m, year) });
    for (const k of LINE_KEYS) totals[k] += lines[k];
  }
  return { rows, totals };
}
