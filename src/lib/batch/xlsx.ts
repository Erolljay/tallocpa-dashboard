/**
 * The batch upload workbook (B1), server side with exceljs.
 * Building the template gives four parts:
 *   - an Instructions sheet
 *   - the register sheet: one row per invoice, a hint row under the headers,
 *     and dropdowns for type, account titles and Y/N
 *   - an Accounts sheet with the client's chart, which feeds the dropdowns
 *   - a hidden Lists sheet
 * Reading it back matches columns by header, so they may be reordered, and
 * skips blank rows.
 */
import ExcelJS from "exceljs";
import { colLetter, XLSX_TYPE } from "@/lib/payroll/register-xlsx";
import { accountLabel, BATCH_COLUMNS, BATCH_KINDS, type BatchAccount, type BatchKind, type RawRow } from "./register";

export { XLSX_TYPE };
const BRAND = "FF1F4E78";
const HEADER_ROW = 1;
const HINT_ROW = 2;
const FIRST_ROW = 3;
const LAST_ROW = 2002;
export const MAX_ROWS = LAST_ROW - FIRST_ROW + 1;
/** Rows prepared with dropdowns and number formats; more rows may be typed below. */
const FORMATTED_ROWS = 500;

export const sheetName = (kind: BatchKind) => (kind === "sales" ? "Sales" : "Purchases");

export async function buildBatchTemplate(kind: BatchKind, clientName: string, accounts: BatchAccount[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Tallo CPA OS";
  const cols = BATCH_COLUMNS[kind];
  const sales = kind === "sales";

  const instr = wb.addWorksheet("Instructions");
  instr.getColumn(1).width = 110;
  const t = instr.addRow([`${BATCH_KINDS[kind]}: ${clientName}`]);
  t.font = { bold: true, size: 14, color: { argb: BRAND } };
  for (const line of [
    "",
    `One row per ${sales ? "sales invoice" : "purchase invoice or official receipt"}, on the "${sheetName(kind)}" sheet. Row 2 shows what each column takes; enter data from row 3.`,
    "Dates as YYYY-MM-DD (or an Excel date). Amounts in pesos; blank means zero.",
    sales
      ? "VATable sales include VAT, as on the invoice; the OS takes 12/112 of them as output VAT. A non-VAT client enters its sales under VAT-exempt."
      : "Capital goods, other goods and services include VAT, as on the invoice; the OS takes 12/112 as input VAT. One category per row. A non-VAT supplier goes under VAT-exempt / non-VAT.",
    "Type: Business (registered name) or Individual (last, first and middle name). The SLS, SLP, QAP and SAWT need them, with the TIN.",
    "Account titles: pick from the dropdown (the Accounts sheet lists the client's chart).",
    sales
      ? "Collected same day: Y for a cash sale (debits Cash or the account under Deposited to), N for a charge sale (debits Accounts Receivable)."
      : "Paid same day: Y for a cash purchase (credits Cash or the account under Paid from), N for a purchase on account (credits Accounts Payable).",
    `${sales ? "Amount received" : "Amount paid"} is optional: when given, it must equal the total less withholding and deductions, within ₱1.`,
    "Upload on the client's Batch upload page. Every row is checked first; the file posts only when every row is clean.",
    "Rows dated before the client's books start go to the register only (for the BIR lists and worksheets), not to the ledger.",
  ])
    instr.addRow([line]).alignment = { wrapText: true };

  const ws = wb.addWorksheet(sheetName(kind), { views: [{ state: "frozen", ySplit: HINT_ROW }] });
  ws.columns = cols.map((c) => ({ key: c.key, width: c.width ?? 14 }));
  const head = ws.getRow(HEADER_ROW);
  const hint = ws.getRow(HINT_ROW);
  cols.forEach((c, i) => {
    const h = head.getCell(i + 1);
    h.value = c.header;
    h.font = { bold: true, color: { argb: "FFFFFFFF" } };
    h.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
    h.alignment = { wrapText: true, vertical: "middle" };
    const s = hint.getCell(i + 1);
    s.value = c.hint;
    s.font = { italic: true, size: 9, color: { argb: "FF666666" } };
    s.alignment = { wrapText: true };
  });
  head.height = 30;
  hint.height = 24;

  const acc = wb.addWorksheet("Accounts");
  acc.columns = [{ header: "Account", key: "a", width: 44 }, { header: "Type", key: "t", width: 14 }];
  acc.getRow(1).font = { bold: true };
  for (const a of accounts) acc.addRow([accountLabel(a), a.type]);
  const lists = wb.addWorksheet("Lists", { state: "veryHidden" });
  lists.getCell("A1").value = "Business";
  lists.getCell("A2").value = "Individual";
  lists.getCell("B1").value = "Y";
  lists.getCell("B2").value = "N";

  const accRange = `Accounts!$A$2:$A$${Math.max(2, accounts.length + 1)}`;
  const list = { account: accRange, party_kind: "Lists!$A$1:$A$2", yn: "Lists!$B$1:$B$2" } as Partial<Record<string, string>>;
  cols.forEach((c, i) => {
    const L = colLetter(i + 1);
    for (let r = FIRST_ROW; r < FIRST_ROW + FORMATTED_ROWS; r++) {
      const cell = ws.getCell(`${L}${r}`);
      const formula = list[c.kind];
      if (formula) cell.dataValidation = { type: "list", allowBlank: true, formulae: [formula], showErrorMessage: c.kind !== "account", errorStyle: "warning", error: "Pick a value from the dropdown." };
      if (c.kind === "amount") cell.numFmt = "#,##0.00";
      if (c.kind === "date") cell.numFmt = "yyyy-mm-dd";
    }
  });

  return Buffer.from(await wb.xlsx.writeBuffer());
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function cellText(v: ExcelJS.CellValue): string {
  if (v == null) return "";
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v.trim();
  if (typeof v === "boolean") return v ? "Y" : "N";
  if (typeof v === "object") {
    if ("result" in v) return cellText(v.result as ExcelJS.CellValue);
    if ("richText" in v) return v.richText.map((p) => p.text).join("").trim();
    if ("text" in v) return String(v.text).trim();
  }
  return String(v).trim();
}

/** Reads the register sheet back; columns are found by their header. */
export async function readBatch(buf: ArrayBuffer, kind: BatchKind): Promise<{ rows: RawRow[] } | { error: string }> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.load(buf);
  } catch {
    return { error: "The file could not be read as an Excel workbook (.xlsx)." };
  }
  const cols = BATCH_COLUMNS[kind];
  const ws = wb.getWorksheet(sheetName(kind)) ?? wb.worksheets.find((w) => w.state === "visible" && w.name !== "Instructions");
  if (!ws) return { error: `The workbook has no "${sheetName(kind)}" sheet.` };

  const byHeader = new Map(cols.map((c) => [norm(c.header), c.key]));
  const at = new Map<number, string>();
  ws.getRow(HEADER_ROW).eachCell((cell, n) => {
    const k = byHeader.get(norm(cellText(cell.value)));
    if (k) at.set(n, k);
  });
  const required = ["date", "number", "account"];
  const missing = required.filter((k) => ![...at.values()].includes(k)).map((k) => cols.find((c) => c.key === k)!.header);
  if (missing.length) return { error: `This is not the ${BATCH_KINDS[kind].toLowerCase()} template: no ${missing.join(", ")} column. Download the template from this page.` };

  const rows: RawRow[] = [];
  const hints = new Set(cols.map((c) => norm(c.hint)));
  ws.eachRow((row, n) => {
    if (n <= HEADER_ROW) return;
    const cells: Record<string, string> = {};
    for (const [col, key] of at) cells[key] = cellText(row.getCell(col).value);
    const values = Object.values(cells).filter(Boolean);
    if (values.length === 0) return;
    // The hint row of the template.
    if (n === HINT_ROW && values.every((v) => hints.has(norm(v)))) return;
    rows.push({ line: n, cells });
  });
  if (rows.length > MAX_ROWS) return { error: `The file has ${rows.length} rows; upload at most ${MAX_ROWS} at a time.` };
  return { rows };
}
