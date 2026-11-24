/**
 * The opening balances workbook: download (prefilled with the client's chart of
 * accounts, and the balances already entered), fill in, upload with a preview.
 *   Trial Balance  Code | Account | Debit | Credit
 *   Receivables    Customer | TIN | Invoice No. | Invoice Date | Due Date | Balance
 *   Payables       Supplier | TIN | Invoice No. | Invoice Date | Due Date | Balance
 * Sheets and columns are read by name, so the order may change.
 */
import ExcelJS from "exceljs";
import type { ItemRow, OpeningItem, TbRow } from "./opening";
import type { Centavos, LedgerAccount } from "./types";

export const XLSX_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const BRAND = "FF1F4E78";
const TB_SHEET = "Trial Balance";
const ITEM_SHEETS = { receivable: "Receivables", payable: "Payables" } as const;
const ITEM_HEADERS = (who: string) => [who, "TIN", "Invoice No.", "Invoice Date (YYYY-MM-DD)", "Due Date (YYYY-MM-DD)", "Balance"];

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

function styleHeader(row: ExcelJS.Row) {
  row.font = { bold: true, color: { argb: "FFFFFFFF" } };
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  row.alignment = { vertical: "middle", wrapText: true };
  row.height = 30;
}

export interface OpeningTemplateInput {
  clientName: string;
  asOf: string;
  accounts: LedgerAccount[];
  /** Balances already entered, by account id (debit positive). */
  balances: Map<string, Centavos>;
  items: OpeningItem[];
}

export async function buildOpeningTemplate(t: OpeningTemplateInput): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Tallo CPA OS";
  const instr = wb.addWorksheet("Instructions");
  instr.getColumn(1).width = 110;
  instr.addRow([`Opening balances as of ${t.asOf} — ${t.clientName}`]).font = { bold: true, size: 14, color: { argb: BRAND } };
  instr.addRow([]);
  for (const s of [
    `1. "${TB_SHEET}": enter each account's balance as of ${t.asOf} as a debit or a credit (from Manager.io or the 2026 working papers). Leave zero balances blank.`,
    "2. Every account of the client's chart is listed. To use an account that is not listed, add it on the Books page first, then download this file again.",
    "3. Total debits must equal total credits.",
    `4. "${ITEM_SHEETS.receivable}": every unpaid customer invoice; the balances must add up to Accounts Receivable. "${ITEM_SHEETS.payable}": every unpaid supplier invoice; they must add up to Accounts Payable.`,
    "5. TIN as 123-456-789 (optional but recommended: it links the customer or supplier to the parties directory). Dates as YYYY-MM-DD.",
    "6. Upload the file on the client's Books page. You see a preview before anything is saved; uploading again replaces the opening balances.",
  ]) instr.addRow([s]).alignment = { wrapText: true };

  const tb = wb.addWorksheet(TB_SHEET);
  tb.getRow(1).values = ["Code", "Account", "Debit", "Credit"];
  styleHeader(tb.getRow(1));
  tb.views = [{ state: "frozen", ySplit: 1 }];
  tb.getColumn(1).width = 10;
  tb.getColumn(1).numFmt = "@";
  tb.getColumn(2).width = 55;
  for (const c of [3, 4]) { tb.getColumn(c).width = 18; tb.getColumn(c).numFmt = "#,##0.00"; }
  const accounts = t.accounts.filter((a) => a.active || t.balances.get(a.id));
  accounts.forEach((a, i) => {
    const b = t.balances.get(a.id) ?? 0;
    tb.getRow(i + 2).values = [a.code, a.name, b > 0 ? b / 100 : null, b < 0 ? -b / 100 : null];
  });
  const last = accounts.length + 1;
  const total = tb.getRow(last + 2);
  total.values = ["", "Total", { formula: `SUM(C2:C${last})` }, { formula: `SUM(D2:D${last})` }];
  total.font = { bold: true };

  for (const kind of ["receivable", "payable"] as const) {
    const ws = wb.addWorksheet(ITEM_SHEETS[kind]);
    ws.getRow(1).values = ITEM_HEADERS(kind === "receivable" ? "Customer" : "Supplier");
    styleHeader(ws.getRow(1));
    ws.views = [{ state: "frozen", ySplit: 1 }];
    [40, 16, 16, 16, 16, 18].forEach((w, i) => (ws.getColumn(i + 1).width = w));
    for (const c of [2, 3, 4, 5]) ws.getColumn(c).numFmt = "@";
    ws.getColumn(6).numFmt = "#,##0.00";
    t.items.filter((x) => x.kind === kind).forEach((x, i) => {
      ws.getRow(i + 2).values = [x.partyName, x.partyTin ?? "", x.docNumber ?? "", x.docDate ?? "", x.dueDate ?? "", x.amount / 100];
    });
  }
  return Buffer.from(await wb.xlsx.writeBuffer());
}

/** Column index by header (case-insensitive prefix match on the template's headers). */
function columns(ws: ExcelJS.Worksheet, headers: string[]): number[] | null {
  const found = new Map<string, number>();
  const row = ws.getRow(1);
  for (let c = 1; c <= row.cellCount; c++) {
    const h = cellText(row.getCell(c).value).trim().toLowerCase();
    if (h) found.set(h, c);
  }
  const out: number[] = [];
  for (const h of headers) {
    const key = h.toLowerCase();
    const hit = [...found].find(([k]) => k === key || k.startsWith(key.split(" (")[0]));
    if (!hit) return null;
    out.push(hit[1]);
  }
  return out;
}

export async function readOpeningFile(data: ArrayBuffer | Buffer): Promise<{ tb: TbRow[]; items: ItemRow[] } | { error: string }> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.load(data as ExcelJS.Buffer);
  } catch {
    return { error: "This file could not be read as an Excel workbook (.xlsx)." };
  }
  const tbWs = wb.getWorksheet(TB_SHEET);
  if (!tbWs) return { error: `The file has no "${TB_SHEET}" sheet. Download the opening balances template and fill that in.` };
  const tbCols = columns(tbWs, ["Code", "Debit", "Credit"]);
  if (!tbCols) return { error: `The "${TB_SHEET}" sheet needs the columns Code, Debit and Credit.` };
  const tb: TbRow[] = [];
  tbWs.eachRow((row, n) => {
    if (n === 1) return;
    const [code, debit, credit] = tbCols.map((c) => cellText(row.getCell(c).value).trim());
    if (!code) return; // the total row and blank rows
    tb.push({ line: n, code, debit, credit });
  });

  const items: ItemRow[] = [];
  for (const kind of ["receivable", "payable"] as const) {
    const ws = wb.getWorksheet(ITEM_SHEETS[kind]);
    if (!ws) continue;
    const cols = columns(ws, ITEM_HEADERS(kind === "receivable" ? "Customer" : "Supplier"));
    if (!cols) return { error: `The "${ITEM_SHEETS[kind]}" sheet's columns were changed; download the template again.` };
    ws.eachRow((row, n) => {
      if (n === 1) return;
      const [partyName, tin, docNumber, docDate, dueDate, amount] = cols.map((c) => cellText(row.getCell(c).value).trim());
      if (!partyName && !amount) return;
      items.push({ line: n, kind, partyName, tin, docNumber, docDate, dueDate, amount });
    });
  }
  return { tb, items };
}
