/**
 * The client's payroll spreadsheet as a grid of text (row 1 first, column 1
 * first): .xlsx through exceljs, .csv parsed here. The old binary .xls cannot be
 * read (staff save it as .xlsx or ask the client for one).
 */
import ExcelJS from "exceljs";
import { cellText } from "../register-xlsx";

export const MAX_ROWS = 1000;
export const MAX_COLS = 60;

export interface Grid {
  sheet: string;
  rows: string[][];
}

/** RFC 4180 CSV (quoted fields, doubled quotes, CRLF or LF); also tab-separated text. */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^﻿/, "");
  const firstLine = src.slice(0, src.search(/\r?\n|$/));
  const sep = !firstLine.includes(",") && firstLine.includes("\t") ? "\t" : firstLine.split(";").length > firstLine.split(",").length ? ";" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && cell === "") quoted = true;
    else if (ch === sep) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.map((r) => r.map((c) => c.trim()));
}

const filled = (rows: string[][]) => rows.reduce((n, r) => n + r.filter((c) => c !== "").length, 0);

/** Trailing empty cells and rows removed; capped at MAX_ROWS × MAX_COLS. */
export function tidyGrid(rows: string[][]): string[][] {
  const out = rows.slice(0, MAX_ROWS).map((r) => {
    const cut = r.slice(0, MAX_COLS);
    let end = cut.length;
    while (end > 0 && cut[end - 1] === "") end--;
    return cut.slice(0, end);
  });
  let end = out.length;
  while (end > 0 && out[end - 1].length === 0) end--;
  return out.slice(0, end);
}

export type GridResult = Grid | { error: string };

const isCsv = (fileName: string, mimeType: string) => mimeType === "text/csv" || /\.(csv|tsv|txt)$/i.test(fileName);
const isXls = (fileName: string, mimeType: string) => mimeType === "application/vnd.ms-excel" && !/\.(csv|xlsx)$/i.test(fileName);

/**
 * Reads the client's file. In a workbook, the visible sheet with the most filled
 * cells is the payroll (clients keep notes and summaries on other sheets).
 */
export async function readGrid(bytes: Uint8Array, fileName: string, mimeType: string): Promise<GridResult> {
  if (isCsv(fileName, mimeType)) return { sheet: "CSV", rows: tidyGrid(parseCsv(new TextDecoder("utf-8").decode(bytes))) };
  if (isXls(fileName, mimeType)) return { error: "This is an old Excel file (.xls), which cannot be read here. Open it in Excel and save it as .xlsx, then upload that, or read the figures by hand." };
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.load(Buffer.from(bytes) as unknown as ExcelJS.Buffer);
  } catch {
    return { error: "This file could not be read as an Excel workbook (.xlsx)." };
  }
  let best: Grid | null = null;
  for (const ws of wb.worksheets) {
    if (ws.state && ws.state !== "visible") continue;
    const rows: string[][] = [];
    const lastRow = Math.min(ws.rowCount, MAX_ROWS);
    for (let r = 1; r <= lastRow; r++) {
      const row = ws.getRow(r);
      const cells: string[] = [];
      for (let c = 1; c <= Math.min(Math.max(row.cellCount, ws.columnCount), MAX_COLS); c++) cells.push(cellText(row.getCell(c).value).trim());
      rows.push(cells);
    }
    const g = { sheet: ws.name, rows: tidyGrid(rows) };
    if (!best || filled(g.rows) > filled(best.rows)) best = g;
  }
  if (!best || best.rows.length === 0) return { error: "The workbook has no figures." };
  return best;
}
