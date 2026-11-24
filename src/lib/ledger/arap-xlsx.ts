/**
 * The monthly AR/AP update workbook: every open customer and supplier invoice,
 * with columns to fill in what was collected or paid in the month, the date, the
 * cash or bank account (dropdown) and a reference (OR / check / deposit no.).
 * The hidden first column carries each invoice's id, so rows can be sorted or
 * filtered freely.
 */
import ExcelJS from "exceljs";
import { accountLabel, type CashAccount, type OpenItem, type UpdateRow } from "./arap";

export { XLSX_TYPE } from "./opening-xlsx";

const BRAND = "FF1F4E78";
const FILL = "FFFFF2CC";
const SHEETS = { receivable: "Receivables", payable: "Payables" } as const;
const HEADERS = {
  receivable: ["Id", "Customer", "TIN", "Invoice No.", "Invoice Date", "Open Balance", "Amount Collected", "Date Collected (YYYY-MM-DD)", "Deposited To", "Reference (OR / deposit no.)"],
  payable: ["Id", "Supplier", "TIN", "Invoice No.", "Invoice Date", "Open Balance", "Amount Paid", "Date Paid (YYYY-MM-DD)", "Paid From", "Reference (check / voucher no.)"],
};

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

const monthName = (m: string) => new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${m}T00:00:00Z`));

export async function buildUpdateWorkbook(t: { clientName: string; month: string; items: OpenItem[]; accounts: CashAccount[] }): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Tallo CPA OS";
  const instr = wb.addWorksheet("Instructions");
  instr.getColumn(1).width = 110;
  instr.addRow([`AR/AP update for ${monthName(t.month)} — ${t.clientName}`]).font = { bold: true, size: 14, color: { argb: BRAND } };
  instr.addRow([]);
  for (const s of [
    `1. "${SHEETS.receivable}": for each customer invoice paid to you in ${monthName(t.month)}, fill in the yellow columns: amount collected, date, the account it was deposited to, and the OR or deposit number.`,
    `2. "${SHEETS.payable}": for each supplier invoice you paid in ${monthName(t.month)}, fill in the amount paid, date, the account it was paid from, and the check or voucher number.`,
    "3. A partial payment is fine: enter the amount actually received or paid. Leave invoices that were not paid blank.",
    "4. Do not change the hidden Id column or the invoice details. New invoices come from the documents you upload, not from this file.",
    "5. Upload the file back. You see a preview before it is sent.",
  ]) instr.addRow([s]).alignment = { wrapText: true };

  const lists = wb.addWorksheet("Lists");
  lists.state = "veryHidden";
  t.accounts.forEach((a, i) => (lists.getRow(i + 1).getCell(1).value = accountLabel(a)));
  const range = `'Lists'!$A$1:$A$${Math.max(1, t.accounts.length)}`;

  for (const kind of ["receivable", "payable"] as const) {
    const ws = wb.addWorksheet(SHEETS[kind]);
    const header = ws.getRow(1);
    header.values = HEADERS[kind];
    header.font = { bold: true, color: { argb: "FFFFFFFF" } };
    header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
    header.alignment = { vertical: "middle", wrapText: true };
    header.height = 32;
    ws.views = [{ state: "frozen", xSplit: 2, ySplit: 1 }];
    [38, 34, 14, 14, 13, 15, 16, 16, 28, 22].forEach((w, i) => (ws.getColumn(i + 1).width = w));
    ws.getColumn(1).hidden = true;
    for (const c of [3, 4, 5, 8, 10]) ws.getColumn(c).numFmt = "@";
    for (const c of [6, 7]) ws.getColumn(c).numFmt = "#,##0.00";
    const rows = t.items.filter((i) => i.kind === kind && i.balance > 0);
    rows.forEach((i, n) => {
      const row = ws.getRow(n + 2);
      row.values = [i.id, i.partyName, i.partyTin ?? "", i.docNumber ?? "", i.docDate ?? "", i.balance / 100, null, null, null, null];
      for (const c of [7, 8, 9, 10]) row.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: FILL } };
      row.getCell(9).dataValidation = { type: "list", allowBlank: true, formulae: [range], showErrorMessage: true, errorStyle: "stop", errorTitle: "Not in list", error: "Pick the cash or bank account from the dropdown." };
    });
  }
  return Buffer.from(await wb.xlsx.writeBuffer());
}

export async function readUpdateWorkbook(data: ArrayBuffer | Buffer): Promise<{ rows: UpdateRow[] } | { error: string }> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.load(data as ExcelJS.Buffer);
  } catch {
    return { error: "This file could not be read as an Excel workbook (.xlsx)." };
  }
  const rows: UpdateRow[] = [];
  let found = false;
  for (const kind of ["receivable", "payable"] as const) {
    const ws = wb.getWorksheet(SHEETS[kind]);
    if (!ws) continue;
    found = true;
    const header = ws.getRow(1);
    const col = new Map<string, number>();
    for (let c = 1; c <= header.cellCount; c++) col.set(cellText(header.getCell(c).value).trim().toLowerCase(), c);
    const at = (h: string) => col.get(h.toLowerCase());
    const [idC, amtC, dateC, acctC, refC] = [HEADERS[kind][0], HEADERS[kind][6], HEADERS[kind][7], HEADERS[kind][8], HEADERS[kind][9]].map(at);
    if (!idC || !amtC || !dateC || !acctC || !refC) return { error: `The "${SHEETS[kind]}" sheet's columns were changed; download the workbook again.` };
    ws.eachRow((row, n) => {
      if (n === 1) return;
      const amount = cellText(row.getCell(amtC).value).trim();
      if (!amount) return;
      rows.push({
        line: n,
        sheet: SHEETS[kind],
        itemId: cellText(row.getCell(idC).value).trim(),
        amount,
        date: cellText(row.getCell(dateC).value).trim().slice(0, 10),
        account: cellText(row.getCell(acctC).value).trim(),
        reference: cellText(row.getCell(refC).value).trim(),
      });
    });
  }
  if (!found) return { error: `The file has no "${SHEETS.receivable}" or "${SHEETS.payable}" sheet. Download the AR/AP update workbook and fill that in.` };
  return { rows };
}
