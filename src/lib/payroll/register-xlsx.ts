/**
 * The payroll register as an Excel workbook (server side, exceljs): the template
 * a client or staff downloads for a month, and reading a filled-in one back.
 * Ported from taxify.ph batch/batch-import.js `downloadTemplate` (payroll branch)
 * and batch-import-payroll.html: an Instructions sheet; the register with a
 * group-label row, frozen headers and per-row Gross / Deductions / Net formulas;
 * an "Employees" sheet feeding the name dropdown; and the "Withholding Tax
 * Calculator" sheet. As in taxify there is one column per payslip item, grouped
 * EARNINGS / DEDUCTIONS / EMPLOYER CONTRIBUTIONS. Differences: rows are prefilled
 * one per employee with the Employee No. (the importer matches on it), columns
 * are read back by header (so they may be reordered), there is no payment-account column,
 * and the calculator's brackets come from the rate table in force for the month
 * (taxify hard-coded 8,875 / 33,125 / 183,125 as fixed amounts, which matches
 * neither the 2018 nor the 2023 BIR table; the 2023 table is 8,541.80 /
 * 33,541.80 / 183,541.80).
 */
import ExcelJS from "exceljs";
import type { Centavos } from "@/lib/returns/types";
import { monthlyTable } from "./compute";
import { sortItems, type ItemKind, type PayrollItem } from "./items";
import { ID_HEADERS, TOTAL_HEADERS, registerHeaders, type RegisterRow } from "./register";
import type { Employee } from "./types";
import { displayName } from "./year";

export const REGISTER_SHEET = "Payroll Register";
const BRAND = "FF1F4E78";
const GROUP_COLORS = { EARNINGS: "FF2E7D32", DEDUCTIONS: "FFB71C1C", "EMPLOYER CONTRIBUTIONS": "FF6A1B9A", "TOTALS (FOR VALIDATION)": "FF455A64" } as const;
const HEADER_ROW = 2;
const FIRST_ROW = 3;
export const XLSX_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export function colLetter(n: number): string {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthTitle = (month: string) => `${MONTHS[Number(month.slice(5, 7)) - 1]} ${month.slice(0, 4)}`;

export interface TemplateInput {
  clientName: string;
  /** YYYY-MM-01 */
  month: string;
  /** Employees to list (active ones, plus anyone already paid in the month). */
  employees: Employee[];
  /** The client's payslip items; active ones become columns. */
  items: PayrollItem[];
  /** Item amounts already saved for the month, by employee id (staff downloads; empty for clients). */
  existing?: Map<string, Map<string, Centavos>>;
}

const pesos = (c: Centavos) => c / 100;

/** The template for one client and month, as an .xlsx buffer. */
export async function buildRegisterTemplate(input: TemplateInput): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Tallo CPA OS";
  const title = monthTitle(input.month);
  const cols = sortItems(input.items.filter((i) => i.active));
  const headers = registerHeaders(input.items);
  const count = (k: ItemKind) => cols.filter((i) => i.kind === k).length;
  const firstAmountCol = ID_HEADERS.length + 1;
  const grossCol = firstAmountCol + cols.length;
  const lastDataRow = Math.max(500, FIRST_ROW + input.employees.length + 100);
  const colOf = (k: ItemKind) => {
    const idx = cols.map((c, i) => (c.kind === k ? firstAmountCol + i : 0)).filter(Boolean);
    return idx.length ? { from: idx[0], to: idx[idx.length - 1] } : null;
  };

  // Instructions.
  const instr = wb.addWorksheet("Instructions");
  instr.getColumn(1).width = 110;
  const t = instr.addRow([`Payroll Register — ${input.clientName} — ${title}`]);
  t.font = { bold: true, size: 14, color: { argb: BRAND } };
  instr.addRow([]);
  for (const s of [
    `1. Fill in the "${REGISTER_SHEET}" sheet: one row per employee per pay period in ${title}. Each employee already has a row with their Employee No.; leave the amounts blank for anyone not paid this month.`,
    "2. Paid twice a month (or weekly)? Copy the employee's row and fill in one row per payday, with the Pay Date. We add the rows together for the month.",
    '3. A new employee: add a row, leave the Employee No. blank (or type their number), and write the name as "Last, First Middle" with the TIN if you have it. We will ask for the rest of their details.',
    "4. Enter amounts in pesos (e.g. 15000 or 15,000.50). Leave a column blank if it does not apply. Deductions and contributions are positive numbers; an earning may be negative (tardiness, leave without pay).",
    "5. The columns are this business's payslip items. Need another one (e.g. a loan deduction or a new allowance)? Ask us to add it, then download a fresh template.",
    "6. Do not rename or delete the columns, and do not type over the grey computed columns (Gross Pay, Total Deductions, Net Pay): we use them to check the file.",
    '8. The "Withholding Tax Calculator" sheet works out the monthly withholding tax per the BIR table, for reference. December is different: the tax is adjusted to the whole year\'s tax due, which we compute for you.',
    "9. When done, save the file and upload it on the Payroll page.",
  ]) {
    const row = instr.addRow([s]);
    row.alignment = { wrapText: true };
  }

  // The register.
  const ws = wb.addWorksheet(REGISTER_SHEET);
  const groupRow = ws.getRow(1);
  let col = firstAmountCol;
  for (const [label, span] of [["EARNINGS", count("earning")], ["DEDUCTIONS", count("deduction")], ["EMPLOYER CONTRIBUTIONS", count("employer_contribution")], ["TOTALS (FOR VALIDATION)", TOTAL_HEADERS.length]] as const) {
    if (span === 0) continue;
    if (span > 1) ws.mergeCells(1, col, 1, col + span - 1);
    const cell = groupRow.getCell(col);
    cell.value = label;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GROUP_COLORS[label] } };
    col += span;
  }
  groupRow.height = 20;
  const headerRow = ws.getRow(HEADER_ROW);
  headerRow.values = headers;
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  headerRow.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  headerRow.height = 48;
  ws.views = [{ state: "frozen", xSplit: 2, ySplit: HEADER_ROW }];
  headers.forEach((h, i) => (ws.getColumn(i + 1).width = i === 1 ? 32 : Math.max(14, Math.min(22, h.length + 2))));
  ws.getColumn(1).numFmt = "@";
  ws.getColumn(3).numFmt = "@";
  ws.getColumn(4).numFmt = "@";

  input.employees.forEach((e, i) => {
    const r = ws.getRow(FIRST_ROW + i);
    r.getCell(1).value = e.employeeNo ?? "";
    r.getCell(2).value = displayName(e);
    r.getCell(3).value = e.tin ?? "";
    const ex = input.existing?.get(e.id);
    if (ex) cols.forEach((c, j) => (r.getCell(firstAmountCol + j).value = ex.get(c.id) ? pesos(ex.get(c.id)!) : null));
  });

  const L = colLetter;
  const earn = colOf("earning");
  const ded = colOf("deduction");
  const sumOf = (span: { from: number; to: number } | null, r: number) => (span ? `SUM(${L(span.from)}${r}:${L(span.to)}${r})` : "0");
  for (let r = FIRST_ROW; r <= lastDataRow; r++) {
    const row = ws.getRow(r);
    for (let c = firstAmountCol; c < grossCol + 3; c++) row.getCell(c).numFmt = "#,##0.00";
    row.getCell(grossCol).value = { formula: sumOf(earn, r) };
    row.getCell(grossCol + 1).value = { formula: sumOf(ded, r) };
    row.getCell(grossCol + 2).value = { formula: `${L(grossCol)}${r}-${L(grossCol + 1)}${r}` };
    for (let k = 0; k < 3; k++) row.getCell(grossCol + k).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFEEEEEE" } };
  }

  // Employees sheet: the source of the name dropdown.
  const emp = wb.addWorksheet("Employees");
  emp.columns = [{ width: 16 }, { width: 36 }, { width: 16 }];
  emp.addRow(["Employee No.", "Employee Name", "TIN"]).font = { bold: true };
  for (const e of input.employees) emp.addRow([e.employeeNo ?? "", displayName(e), e.tin ?? ""]);
  const nameRange = `'Employees'!$B$2:$B$${Math.max(2, input.employees.length + 1)}`;
  for (let r = FIRST_ROW; r <= lastDataRow; r++) {
    ws.getCell(`B${r}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [nameRange],
      showErrorMessage: true,
      errorStyle: "warning",
      errorTitle: "Not in list",
      error: 'Pick an employee from the dropdown, or for a new employee type the name as "Last, First Middle".',
    };
  }

  // Withholding Tax Calculator (monthly table in force for the month).
  const table = monthlyTable(input.month);
  const wht = wb.addWorksheet("Withholding Tax Calculator");
  const whtHeaders = ["Employee Name", "Monthly Taxable Compensation (gross less non-taxable pay and SSS/PhilHealth/Pag-IBIG)", "Monthly Withholding Tax"];
  wht.addRow([`Monthly Withholding Tax Calculator — ${title} (for reference, BIR monthly withholding tax table)`]).font = { bold: true, size: 13, color: { argb: BRAND } };
  wht.addRow([]);
  const wh = wht.addRow(whtHeaders);
  wh.font = { bold: true, color: { argb: "FFFFFFFF" } };
  wh.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  wh.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  wh.height = 48;
  wht.columns = [{ width: 32 }, { width: 30 }, { width: 22 }];
  wht.views = [{ state: "frozen", ySplit: 3 }];
  const formulaFor = (ref: string) => {
    // Nested IFs from the top bracket down: IF(x<=to1, …, IF(x<=to2, …, last)).
    let f = "";
    table.forEach((b, i) => {
      const expr = `${pesos(b.fixed)}+(${ref}-${pesos(b.from)})*${b.rate}`;
      f += i < table.length - 1 ? `IF(${ref}<=${pesos(b.to)},${expr},` : expr;
    });
    return `IF(${ref}="","",ROUND(${f}${")".repeat(table.length - 1)},2))`;
  };
  for (let r = 4; r <= 103; r++) {
    wht.getCell(`C${r}`).value = { formula: formulaFor(`B${r}`) };
    wht.getCell(`B${r}`).numFmt = "#,##0.00";
    wht.getCell(`C${r}`).numFmt = "#,##0.00";
    wht.getCell(`A${r}`).dataValidation = { type: "list", allowBlank: true, formulae: [nameRange], showErrorMessage: true, errorStyle: "warning", errorTitle: "Not in list", error: "Pick an employee from the dropdown." };
  }
  wht.addRow([]);
  const peso = (c: Centavos) => `₱${(c / 100).toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  const note = wht.addRow([
    "Reference table: " +
      table
        .map((b, i) => (i === 0 ? `up to ${peso(b.to)}: ${b.rate * 100}%` : `${b.to === Infinity ? `over ${peso(b.from)}` : `${peso(b.from)}–${peso(b.to)}`}: ${peso(b.fixed)} + ${b.rate * 100}% of the excess over ${peso(b.from)}`))
        .join(" · "),
  ]);
  note.font = { italic: true, size: 9, color: { argb: "FF888888" } };
  note.alignment = { wrapText: true };
  wht.mergeCells(`A${note.number}:C${note.number}`);

  return Buffer.from(await wb.xlsx.writeBuffer());
}

function cellText(v: ExcelJS.CellValue | undefined): string {
  if (v == null) return "";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "object") {
    if ("formula" in v || "sharedFormula" in v) return cellText((v as { result?: ExcelJS.CellValue }).result);
    if ("richText" in v) return v.richText.map((x) => x.text).join("");
    if ("text" in v) return String(v.text);
    if ("error" in v) return String(v.error);
  }
  return "";
}

/** A computed total: null when the cell still holds a formula Excel has not calculated (nothing to check). */
function totalText(v: ExcelJS.CellValue | undefined): string | null {
  if (v != null && typeof v === "object" && ("formula" in v || "sharedFormula" in v)) {
    const res = (v as { result?: unknown }).result;
    return res == null || typeof res === "object" ? null : String(res);
  }
  const s = cellText(v);
  return s === "" ? null : s;
}

const norm = (h: string) => h.trim().replace(/\s+/g, " ").toLowerCase();

/**
 * Reads a filled-in register. Columns are found by their header (row 2), so they
 * may be in any order; an unknown header is refused. Item columns are matched to
 * the client's payslip items by name (any case), inactive items included.
 */
export async function readRegister(data: ArrayBuffer | Buffer, items: PayrollItem[]): Promise<{ rows: RegisterRow[] } | { error: string }> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.load(data as ExcelJS.Buffer);
  } catch {
    return { error: "This file could not be read as an Excel workbook (.xlsx)." };
  }
  const ws = wb.getWorksheet(REGISTER_SHEET);
  if (!ws) return { error: `The file has no "${REGISTER_SHEET}" sheet. Download a fresh template and fill that in.` };
  const fixed = new Map<string, string>([...ID_HEADERS, ...TOTAL_HEADERS].map((h) => [norm(h), h]));
  const itemByName = new Map(items.map((i) => [norm(i.name), i]));
  const colOf = new Map<string, number>(); // fixed header or "item:<id>" → column
  const unknown: string[] = [];
  const header = ws.getRow(HEADER_ROW);
  for (let c = 1; c <= Math.max(header.cellCount, ws.columnCount); c++) {
    const h = cellText(header.getCell(c).value).trim();
    if (!h) continue;
    const key = fixed.get(norm(h)) ?? (itemByName.has(norm(h)) ? `item:${itemByName.get(norm(h))!.id}` : null);
    if (!key) unknown.push(`“${h}” (column ${colLetter(c)})`);
    else if (colOf.has(key)) return { error: `The column “${h}” appears twice. Download a fresh template.` };
    else colOf.set(key, c);
  }
  if (unknown.length) {
    return { error: `Unknown column${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}. Each column must be one of this business's payslip items; ask staff to add the item, or download a fresh template.` };
  }
  if (!colOf.has(ID_HEADERS[0]) || !colOf.has(ID_HEADERS[1])) return { error: `The “${ID_HEADERS[0]}” and “${ID_HEADERS[1]}” columns are missing. Download a fresh template.` };
  const itemCols = [...colOf].filter(([k]) => k.startsWith("item:")).map(([k, c]) => [k.slice(5), c] as const);
  const text = (row: ExcelJS.Row, h: string) => (colOf.has(h) ? cellText(row.getCell(colOf.get(h)!).value).trim() : "");
  const total = (row: ExcelJS.Row, h: string) => (colOf.has(h) ? totalText(row.getCell(colOf.get(h)!).value) : null);
  const rows: RegisterRow[] = [];
  for (let r = FIRST_ROW; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const amounts: RegisterRow["amounts"] = {};
    for (const [id, c] of itemCols) {
      const s = cellText(row.getCell(c).value).trim();
      if (s !== "") amounts[id] = s;
    }
    const [employeeNo, name, tin, payDate] = ID_HEADERS.map((h) => text(row, h));
    if (!employeeNo && !name && !tin && Object.keys(amounts).length === 0) continue;
    rows.push({
      line: r,
      employeeNo,
      name,
      tin,
      payDate,
      amounts,
      totals: { gross: total(row, TOTAL_HEADERS[0]), deductions: total(row, TOTAL_HEADERS[1]), net: total(row, TOTAL_HEADERS[2]) },
    });
  }
  return { rows };
}
