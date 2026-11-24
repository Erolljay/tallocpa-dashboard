/**
 * A book of account as an Excel sheet: the same columns as the printed pad
 * (money in single columns), every line of the period, and the totals.
 */
import ExcelJS from "exceljs";
import type { PrintBook } from "./print";

const BRAND = "FF1F4E78";

export async function buildBookWorkbook(t: { clientName: string; tin: string | null; period: string; book: PrintBook }): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Tallo CPA OS";
  const ws = wb.addWorksheet(t.book.title.slice(0, 31), { pageSetup: { orientation: t.book.orientation, fitToPage: true, fitToWidth: 1, fitToHeight: 0 } });
  ws.addRow([t.clientName]).font = { bold: true, size: 13 };
  ws.addRow([`TIN ${t.tin ?? "—"}`]);
  ws.addRow([t.book.title]).font = { bold: true, size: 12, color: { argb: BRAND } };
  ws.addRow([t.period]);
  ws.addRow([]);
  const header = ws.addRow(t.book.columns.map((c) => c.label));
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  header.alignment = { wrapText: true, vertical: "middle" };
  t.book.columns.forEach((c, i) => {
    ws.getColumn(i + 1).width = c.kind === "money" ? 15 : Math.round(8 + (c.width ?? 1) * 6);
    if (c.kind === "money") ws.getColumn(i + 1).numFmt = "#,##0.00;(#,##0.00)";
  });
  for (const l of t.book.lines) {
    const row = ws.addRow(t.book.columns.map((c) => (c.kind === "money" ? (l.money[c.key] ? l.money[c.key] / 100 : null) : (l.text[c.key] ?? ""))));
    if (l.style === "heading" || l.style === "total") row.font = { bold: true };
    if (l.style === "note") row.font = { italic: true };
  }
  if (t.book.carry.length) {
    const totals = Object.fromEntries(t.book.carry.map((k) => [k, t.book.lines.filter((l) => l.style !== "total").reduce((s, l) => s + (l.money[k] ?? 0), 0)]));
    const row = ws.addRow(t.book.columns.map((c, i) => (c.kind === "money" ? (totals[c.key] ?? 0) / 100 : i === t.book.columns.findIndex((x) => x.key === "particulars") ? "Totals" : "")));
    row.font = { bold: true };
    row.border = { top: { style: "thin" } };
  }
  ws.views = [{ state: "frozen", ySplit: 6 }];
  return Buffer.from(await wb.xlsx.writeBuffer());
}
