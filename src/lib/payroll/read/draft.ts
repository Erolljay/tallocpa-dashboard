/**
 * The review draft: what was read, matched to the client's employees, as staff
 * edit it; and the draft as register rows for the existing loader (apply.ts →
 * checkRegister → save_payroll_month), or as the prefilled Tallo register file.
 */
import { z } from "zod";
import { toCentavos } from "@/lib/returns/money";
import type { Centavos } from "@/lib/returns/types";
import type { RegisterRow } from "../register";
import type { Employee } from "../types";
import { displayName } from "../year";
import { matchEmployee, type EmployeeMatch } from "./match";
import type { DraftRow, PayrollDraft, PayrollRead } from "./types";

/** The first draft: every row read, with the employee matched when the match is sure or close. */
export function initialDraft(read: PayrollRead, employees: Employee[]): PayrollDraft {
  return {
    rows: read.rows.map((r) => {
      const m = matchEmployee(r, employees);
      return {
        line: r.line,
        sourceName: r.name,
        employeeId: m.employeeId,
        // Nobody on the list comes close: offered as a new employee when the file writes "Last, First".
        newName: m.status === "none" && r.name.includes(",") ? r.name : "",
        skip: false,
        amounts: Object.fromEntries(Object.entries(r.amounts).map(([id, f]) => [id, f.value ?? ""])),
      };
    }),
  };
}

/** Matches for each row of the read (by line), for the flags and pick lists on screen. */
export function matchesOf(read: PayrollRead, employees: Employee[]): Record<number, EmployeeMatch> {
  return Object.fromEntries(read.rows.map((r) => [r.line, matchEmployee(r, employees)]));
}

const draftSchema = z.object({
  rows: z
    .array(
      z.object({
        line: z.number().int(),
        sourceName: z.string().max(300),
        employeeId: z.string().uuid().nullable(),
        newName: z.string().max(300).default(""),
        skip: z.boolean().default(false),
        amounts: z.record(z.string().uuid(), z.string().max(40)),
      }),
    )
    .max(2000),
});

/** A draft sent from the review screen; null if it is not one. */
export function parseDraft(json: string): PayrollDraft | null {
  try {
    const r = draftSchema.safeParse(JSON.parse(json));
    return r.success ? r.data : null;
  } catch {
    return null;
  }
}

export interface DraftIssue {
  line: number;
  message: string;
}

/**
 * The draft as register rows for the loader. A row with an employee uses their
 * Employee No. (or TIN, or exact name) so checkRegister finds them; a new
 * employee's row carries the name as "Last, First Middle" for the loader to
 * add. Skipped rows and blank amounts are left out; nothing is filled in.
 */
export function draftToRegister(draft: PayrollDraft, employees: Employee[]): { rows: RegisterRow[]; issues: DraftIssue[] } {
  const byId = new Map(employees.map((e) => [e.id, e]));
  const rows: RegisterRow[] = [];
  const issues: DraftIssue[] = [];
  for (const d of draft.rows) {
    if (d.skip) continue;
    const amounts = Object.fromEntries(Object.entries(d.amounts).filter(([, v]) => v.trim() !== ""));
    if (Object.keys(amounts).length === 0) continue;
    const e = d.employeeId ? byId.get(d.employeeId) : undefined;
    if (d.employeeId && !e) {
      issues.push({ line: d.line, message: `${d.sourceName}: the employee picked is no longer on the list` });
      continue;
    }
    if (!e && !d.newName.trim()) {
      issues.push({ line: d.line, message: `${d.sourceName}: pick the employee, or name the new employee as “Last, First Middle”, or skip the row` });
      continue;
    }
    rows.push({
      line: d.line,
      employeeNo: e?.employeeNo ?? "",
      name: e ? displayName(e) : d.newName.trim(),
      tin: e && !e.employeeNo ? (e.tin ?? "") : "",
      payDate: "",
      amounts,
      totals: { gross: null, deductions: null, net: null },
    });
  }
  return { rows, issues };
}

/** Amounts for the prefilled register file: per employee (rows added together), and rows for new people. */
export function draftToTemplate(draft: PayrollDraft): { existing: Map<string, Map<string, Centavos>>; newRows: { name: string; amounts: Map<string, Centavos> }[] } {
  const existing = new Map<string, Map<string, Centavos>>();
  const newRows: { name: string; amounts: Map<string, Centavos> }[] = [];
  const amountsOf = (d: DraftRow, into: Map<string, Centavos>) => {
    for (const [id, raw] of Object.entries(d.amounts)) {
      const c = toCentavos(raw);
      if (c != null && raw.trim() !== "") into.set(id, (into.get(id) ?? 0) + c);
    }
    return into;
  };
  for (const d of draft.rows) {
    if (d.skip) continue;
    if (d.employeeId) existing.set(d.employeeId, amountsOf(d, existing.get(d.employeeId) ?? new Map()));
    else newRows.push({ name: d.newName.trim() || d.sourceName, amounts: amountsOf(d, new Map()) });
  }
  return { existing, newRows };
}
