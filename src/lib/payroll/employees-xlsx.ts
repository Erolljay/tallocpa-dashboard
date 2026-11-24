/**
 * The employee master as an Excel workbook: download (prefilled with the client's
 * employees), fill in or correct, upload with a preview. Fields follow taxify's
 * employee BIR fields (shared/custom-fields.js EMPLOYEE_FIELDS, and its Excel
 * round-trip of employee records), with dropdowns for employment status, MWE,
 * region and reason for separation. Rows are matched to existing employees by
 * Employee No., else by TIN; other rows are new employees.
 */
import ExcelJS from "exceljs";
import { employeeSchema, type EmployeeInput } from "./schema";
import { EMPLOYMENT_STATUSES, SEPARATION_REASONS, type Employee } from "./types";

export const EMPLOYEE_SHEET = "Employees";
const BRAND = "FF1F4E78";
const FIRST_ROW = 2;

/** Philippine administrative regions, for the region dropdown (minimum wages are set per region). */
export const REGIONS = [
  "NCR", "CAR", "Region I", "Region II", "Region III", "Region IV-A", "MIMAROPA", "Region V", "Region VI", "NIR",
  "Region VII", "Region VIII", "Region IX", "Region X", "Region XI", "Region XII", "Caraga", "BARMM",
];

/** Columns: header and the employee form field it fills. */
export const EMPLOYEE_IMPORT_COLUMNS = [
  { header: "Employee No.", field: "employee_no" },
  { header: "Last Name", field: "last_name" },
  { header: "First Name", field: "first_name" },
  { header: "Middle Name", field: "middle_name" },
  { header: "TIN (123-456-789)", field: "tin" },
  { header: "Date of Birth (YYYY-MM-DD)", field: "birth_date" },
  { header: "Address", field: "address" },
  { header: "ZIP Code", field: "zip_code" },
  { header: "Region of Work", field: "region" },
  { header: "Nationality", field: "nationality" },
  { header: "Employment Status", field: "employment_status" },
  { header: "Minimum Wage Earner (Y/N)", field: "is_mwe" },
  { header: "Daily Minimum Wage", field: "mwe_daily_rate" },
  { header: "Date Hired (YYYY-MM-DD)", field: "hire_date" },
  { header: "Date Separated (YYYY-MM-DD)", field: "separation_date" },
  { header: "Reason for Separation", field: "separation_reason" },
  { header: "Substituted Filing (Y/N)", field: "substituted_filing" },
] as const;

const statusChoices = Object.entries(EMPLOYMENT_STATUSES).map(([k, l]) => `${k} - ${l}`);
const reasonChoices = Object.entries(SEPARATION_REASONS).map(([k, l]) => `${k} - ${l}`);

function cellText(v: ExcelJS.CellValue | undefined): string {
  if (v == null) return "";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "object") {
    if ("result" in v) return cellText((v as { result?: ExcelJS.CellValue }).result);
    if ("richText" in v) return v.richText.map((x) => x.text).join("");
    if ("text" in v) return String(v.text);
  }
  return "";
}

/** The employee master template, prefilled with `employees`. */
export async function buildEmployeeTemplate(clientName: string, employees: Employee[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Tallo CPA OS";
  const instr = wb.addWorksheet("Instructions");
  instr.getColumn(1).width = 110;
  instr.addRow([`Employee master — ${clientName}`]).font = { bold: true, size: 14, color: { argb: BRAND } };
  instr.addRow([]);
  for (const s of [
    `1. One row per employee on the "${EMPLOYEE_SHEET}" sheet. Existing employees are listed; correct them in place. Add new employees below.`,
    "2. Rows are matched by Employee No. (or by TIN when there is no number). Do not change an employee's number here.",
    "3. Dates as YYYY-MM-DD. TIN as 123-456-789 (add the branch, e.g. 123-456-789-0000, only if it is not 0000).",
    "4. Minimum wage earners (Y) need the region of work and the daily minimum wage.",
    "5. Separated employees: enter the date and the reason. They stay on the alphalist for the year they left.",
    "6. Upload the file on the Payroll page (Employees → Upload). You see a preview before anything is saved.",
  ]) instr.addRow([s]).alignment = { wrapText: true };

  const lists = wb.addWorksheet("Lists");
  lists.state = "veryHidden";
  const listCols: [string, string[]][] = [["Status", statusChoices], ["YesNo", ["Y", "N"]], ["Region", REGIONS], ["Reason", reasonChoices]];
  listCols.forEach(([, values], c) => values.forEach((v, r) => (lists.getRow(r + 1).getCell(c + 1).value = v)));
  const range = (c: number, n: number) => `'Lists'!$${String.fromCharCode(65 + c)}$1:$${String.fromCharCode(65 + c)}$${n}`;

  const ws = wb.addWorksheet(EMPLOYEE_SHEET);
  const header = ws.getRow(1);
  header.values = EMPLOYEE_IMPORT_COLUMNS.map((c) => c.header);
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  header.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  header.height = 36;
  ws.views = [{ state: "frozen", xSplit: 2, ySplit: 1 }];
  EMPLOYEE_IMPORT_COLUMNS.forEach((c, i) => {
    ws.getColumn(i + 1).width = c.field === "address" ? 40 : Math.max(14, Math.min(24, c.header.length + 2));
    if (["employee_no", "tin", "zip_code", "birth_date", "hire_date", "separation_date"].includes(c.field)) ws.getColumn(i + 1).numFmt = "@";
  });
  employees.forEach((e, i) => {
    const status = statusChoices.find((s) => s.startsWith(`${e.employmentStatus} -`)) ?? "";
    const reason = e.separationReason ? (reasonChoices.find((s) => s.startsWith(`${e.separationReason} -`)) ?? "") : "";
    ws.getRow(FIRST_ROW + i).values = [
      e.employeeNo ?? "", e.lastName, e.firstName, e.middleName ?? "",
      e.tin ? `${e.tin}${e.tinBranch !== "0000" ? `-${e.tinBranch}` : ""}` : "",
      e.birthDate ?? "", e.address ?? "", e.zipCode ?? "", e.region ?? "", e.nationality,
      status, e.isMwe ? "Y" : "N", e.mweDailyRate != null ? e.mweDailyRate / 100 : "",
      e.hireDate ?? "", e.separationDate ?? "", reason, e.substitutedFiling ? "Y" : "N",
    ];
  });
  const last = Math.max(300, FIRST_ROW + employees.length + 100);
  const col = (f: string) => EMPLOYEE_IMPORT_COLUMNS.findIndex((c) => c.field === f) + 1;
  const list = (field: string, formula: string) => {
    for (let r = FIRST_ROW; r <= last; r++) {
      ws.getRow(r).getCell(col(field)).dataValidation = { type: "list", allowBlank: true, formulae: [formula], showErrorMessage: true, errorStyle: "stop", errorTitle: "Not in list", error: "Pick a value from the dropdown." };
    }
  };
  list("employment_status", range(0, statusChoices.length));
  list("is_mwe", range(1, 2));
  list("substituted_filing", range(1, 2));
  list("region", range(2, REGIONS.length));
  list("separation_reason", range(3, reasonChoices.length));
  return Buffer.from(await wb.xlsx.writeBuffer());
}

export interface EmployeeImportRow {
  line: number;
  values: Record<string, string>;
}

/** Reads the employee master; columns by header. */
export async function readEmployeeFile(data: ArrayBuffer | Buffer): Promise<{ rows: EmployeeImportRow[] } | { error: string }> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.load(data as ExcelJS.Buffer);
  } catch {
    return { error: "This file could not be read as an Excel workbook (.xlsx)." };
  }
  const ws = wb.getWorksheet(EMPLOYEE_SHEET);
  if (!ws) return { error: `The file has no "${EMPLOYEE_SHEET}" sheet. Download the employee template and fill that in.` };
  const byHeader = new Map(EMPLOYEE_IMPORT_COLUMNS.map((c) => [c.header.toLowerCase(), c.field]));
  const cols: [number, string][] = [];
  const unknown: string[] = [];
  const header = ws.getRow(1);
  for (let c = 1; c <= header.cellCount; c++) {
    const h = cellText(header.getCell(c).value).trim();
    if (!h) continue;
    const f = byHeader.get(h.toLowerCase());
    if (f) cols.push([c, f]);
    else unknown.push(`“${h}”`);
  }
  if (unknown.length) return { error: `Unknown column${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}. Download a fresh employee template.` };
  if (!cols.some(([, f]) => f === "last_name") || !cols.some(([, f]) => f === "first_name")) return { error: "The Last Name and First Name columns are missing." };
  const rows: EmployeeImportRow[] = [];
  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const values: Record<string, string> = {};
    for (const [c, f] of cols) values[f] = cellText(row.getCell(c).value).trim();
    if (Object.values(values).every((v) => v === "")) continue;
    rows.push({ line: r, values });
  }
  return { rows };
}

export interface CheckedEmployees {
  creates: { line: number; data: EmployeeInput }[];
  updates: { line: number; id: string; data: EmployeeInput }[];
  errors: { line: number; message: string }[];
}

const code = (v: string) => v.split(" - ")[0].trim().toUpperCase();
const yes = (v: string, dflt: boolean) => (v === "" ? dflt : /^(y|yes|true|1)$/i.test(v));

/** Validates each row with the employee form's rules and decides add vs update. */
export function checkEmployeeImport(rows: EmployeeImportRow[], existing: Employee[]): CheckedEmployees {
  const out: CheckedEmployees = { creates: [], updates: [], errors: [] };
  const byNo = new Map(existing.filter((e) => e.employeeNo).map((e) => [e.employeeNo!.toLowerCase(), e]));
  const byTin = new Map(existing.filter((e) => e.tin).map((e) => [e.tin!, e]));
  const seen = new Map<string, number>();
  for (const { line, values: v } of rows) {
    const form: Record<string, unknown> = {
      ...v,
      employment_status: v.employment_status ? code(v.employment_status) : "R",
      separation_reason: v.separation_reason ? code(v.separation_reason) : "",
      is_mwe: yes(v.is_mwe ?? "", false),
      substituted_filing: yes(v.substituted_filing ?? "", true),
      active: true,
    };
    const parsed = employeeSchema.safeParse(form);
    if (!parsed.success) {
      for (const i of parsed.error.issues) {
        const col = EMPLOYEE_IMPORT_COLUMNS.find((c) => c.field === i.path[0]);
        out.errors.push({ line, message: `${col ? `${col.header}: ` : ""}${i.message}` });
      }
      continue;
    }
    const d = parsed.data;
    const key = d.employee_no ? `no:${d.employee_no.toLowerCase()}` : d.tin ? `tin:${d.tin}` : null;
    if (key && seen.has(key)) {
      out.errors.push({ line, message: `Same ${d.employee_no ? "Employee No." : "TIN"} as row ${seen.get(key)}` });
      continue;
    }
    if (key) seen.set(key, line);
    const match = (d.employee_no && byNo.get(d.employee_no.toLowerCase())) || (!d.employee_no && d.tin ? byTin.get(d.tin) : undefined);
    if (match) {
      if (d.tin && match.tin && d.tin !== match.tin && byTin.get(d.tin) && byTin.get(d.tin)!.id !== match.id) {
        out.errors.push({ line, message: `TIN ${d.tin} belongs to another employee` });
        continue;
      }
      // The register has no monthly minimum wage column: keep what is on file (BIR 2316 item 10).
      out.updates.push({ line, id: match.id, data: { ...d, mwe_monthly_rate: d.is_mwe && match.mweMonthlyRate != null ? match.mweMonthlyRate / 100 : null } });
    } else {
      if (d.tin && byTin.has(d.tin)) {
        out.errors.push({ line, message: `TIN ${d.tin} belongs to employee ${byTin.get(d.tin)!.lastName}, ${byTin.get(d.tin)!.firstName}; use their Employee No.` });
        continue;
      }
      out.creates.push({ line, data: d });
    }
  }
  return out;
}
