/**
 * Turning the client's payroll file into a PayrollRead. Spreadsheets are read
 * cell by cell here; Gemini only suggests what unknown column headings mean.
 * PDFs and photos are read by Gemini, row by row, held to a schema built from
 * the client's payslip items. The reader is swappable (tests pass a stub).
 */
import { geminiJson, inlineFile, type GeminiOptions } from "@/lib/ocr/gemini";
import type { PayrollItem } from "../items";
import { amountOf, applyColumns, columnsOf, findHeaderRow, unmappedColumns, type SavedMap } from "./columns";
import type { Grid } from "./grid";
import { describeItems, imageSchema, itemKeys, mappingSchema, parseImageReply, parseMappingReply, type ImageReply, type MappingSuggestion } from "./schema";
import type { Figure, PayrollRead, ReadRow, SheetColumn, Shown } from "./types";

export interface PayrollReader {
  model: string;
  /** Suggests the header row and what each column holds, from the first rows of the sheet. */
  mapColumns(rows: string[][], items: PayrollItem[]): Promise<{ suggestion: MappingSuggestion; model: string }>;
  /** Reads every employee row of a PDF or photo of a payroll sheet. */
  readImage(input: { bytes: Uint8Array; mimeType: string }, items: PayrollItem[]): Promise<{ reply: ImageReply; model: string }>;
}

const MAPPING_PROMPT = `You map the columns of a Philippine business's own payroll spreadsheet to an accounting firm's payroll register.
The spreadsheet's first rows are below as tab-separated text, each line starting with its row number. Columns are numbered from 1.
Find the row with the column headings (header_row). Then for every column with a heading, give its target:
- name (the employee's full name), last_name, first_name, middle_name, employee_no, tin, pay_date, days (days worked), hours (hours worked);
- gross, deductions, net: the spreadsheet's own computed totals per employee (gross pay, total deductions, net pay / take-home pay);
- one of the business's payslip items below, by its key, when the column is that earning, deduction or employer contribution;
- ignore for anything else (row numbers, signatures, rates per day, bank account numbers, remarks, a column that is not one of the items).
Employee shares of SSS, PhilHealth and Pag-IBIG are deductions; employer shares are employer contributions. Map each item to at most one column. Never guess: if unsure, use ignore with a low confidence.
For each column give your confidence from 0 to 1.

The business's payslip items:
`;

const IMAGE_PROMPT = `You read a Philippine business's payroll sheet (a PDF or a photo, often printed or handwritten) for an accounting firm.
Return one entry in "employees" for every employee row, in the order on the page. Skip headings, subtotal and total rows, and signature lines.
For each employee:
- name: as written. employee_no and tin if shown. days and hours worked if shown.
- amounts: the figure for each of the business's payslip items below, by key, as a plain number with no currency sign or commas. If the sheet has no column for an item, or the cell is blank, give null. Never compute or guess a figure that is not written.
- gross, deductions, net: the row's gross pay, total deductions and net pay as written on the sheet (null if not shown).
Put the sheet's own grand totals of gross pay, total deductions and net pay in "totals" (null if the sheet has no totals row).
List in other_columns the headings of figures on the sheet that are none of the items (for example a loan or allowance column with no matching item). Give pay_period as written (e.g. "Nov 1-15, 2026"), or null.
For every figure (and each name) give your confidence from 0 to 1 that you read it exactly right.
Employee shares of SSS, PhilHealth and Pag-IBIG are deductions; employer shares are employer contributions.

The business's payslip items:
`;

const asText = (rows: string[][], max = 25) => rows.slice(0, max).map((r, i) => `${i + 1}\t${r.map((c) => c.replace(/\s+/g, " ").slice(0, 60)).join("\t")}`).join("\n");

/** Gemini as the payroll reader. */
export function geminiPayrollReader(opts: GeminiOptions): PayrollReader {
  const gemini = geminiJson(opts);
  return {
    model: gemini.model,
    async mapColumns(rows, items) {
      const { data, model } = await gemini.generate([{ text: `${MAPPING_PROMPT}${describeItems(items)}\n\nThe spreadsheet:\n${asText(rows)}` }], mappingSchema(items), (j) => parseMappingReply(j, items));
      return { suggestion: data, model };
    },
    async readImage(input, items) {
      const { data, model } = await gemini.generate([{ text: `${IMAGE_PROMPT}${describeItems(items)}` }, inlineFile(input.mimeType, input.bytes)], imageSchema(items), parseImageReply, { highRes: true });
      return { reply: data, model };
    },
  };
}

/** The configured reader, or null when no OCR key is set (spreadsheets are still read with the saved mapping). */
export function payrollReaderFromEnv(): PayrollReader | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return geminiPayrollReader({ apiKey, model: process.env.GEMINI_MODEL, fallbackModel: process.env.GEMINI_FALLBACK_MODEL });
}

/** Rows of the client's sheet kept to show beside the register. */
const GRID_ROWS_KEPT = 300;

/**
 * Reads a spreadsheet: the saved mapping and known headings first; Gemini is
 * asked only when some heading is still unknown (and a reader is configured).
 * `staff.headerRow` sets the heading row; `staff.columns` (staff's choices) overrides
 * everything and asks no one.
 */
export async function readSheet(
  grid: Grid,
  items: PayrollItem[],
  saved: SavedMap,
  month: string,
  reader: PayrollReader | null,
  staff?: { headerRow: number; columns?: SheetColumn[] },
): Promise<{ read: PayrollRead; model: string | null }> {
  const notes: string[] = [];
  let model: string | null = null;
  let headerRow = staff?.headerRow ?? findHeaderRow(grid.rows, items, saved);
  let columns = staff?.columns ?? (headerRow ? columnsOf(grid.rows, headerRow, items, saved) : []);
  const needsHelp = !staff?.columns && (!headerRow || unmappedColumns(columns).length > 0);
  if (needsHelp && reader) {
    try {
      const { suggestion, model: m } = await reader.mapColumns(grid.rows, items);
      model = m;
      if (!headerRow) {
        headerRow = suggestion.headerRow;
        columns = columnsOf(grid.rows, headerRow, items, saved);
      }
      if (suggestion.headerRow === headerRow) {
        const taken = new Set(columns.map((c) => c.target).filter((t) => t && t !== "ignore"));
        for (const c of columns) {
          const s = suggestion.columns.get(c.index);
          if (c.target != null || !s) continue;
          if (s.target !== "ignore" && taken.has(s.target)) continue;
          Object.assign(c, { target: s.target, from: "suggested", confidence: s.confidence });
          if (s.target !== "ignore") taken.add(s.target);
        }
      } else notes.push(`Gemini took row ${suggestion.headerRow} for the headings, but row ${headerRow} matches this client's saved columns; check the columns below.`);
    } catch (e) {
      notes.push(`The column headings could not be matched automatically: ${(e as Error).message}. Choose what each column holds below.`);
    }
  } else if (needsHelp) notes.push("Some columns are new for this client. Choose what each one holds below, then apply.");
  if (!headerRow) {
    headerRow = 1;
    columns = columnsOf(grid.rows, 1, items, saved);
    notes.push("The heading row could not be found; row 1 is assumed. Choose what each column holds below.");
  }
  const { rows, sourceTotals, unreadable } = applyColumns(grid.rows, headerRow, columns, items);
  if (unreadable.length) notes.push(`Not amounts, left blank: ${unreadable.slice(0, 10).join("; ")}${unreadable.length > 10 ? ` and ${unreadable.length - 10} more` : ""}.`);
  if (rows.length === 0) notes.push("No employee rows were found under the headings.");
  const otherColumns = columns.filter((c) => c.target == null).map((c) => c.header);
  return {
    read: {
      version: 1,
      source: "sheet",
      month,
      sheet: { name: grid.sheet, headerRow, columns, grid: grid.rows.slice(0, GRID_ROWS_KEPT) },
      rows,
      sourceTotals,
      otherColumns,
      notes,
    },
    model,
  };
}

const confidence = (c: number | undefined) => (c == null ? 0 : Math.max(0, Math.min(1, c)));
const toFigure = (f: { value?: string | number | null; confidence?: number } | null | undefined): Figure | null => {
  if (!f) return null;
  const value = f.value == null ? null : amountOf(String(f.value));
  // A figure Gemini gave that is not an amount is kept as unreadable (blank, confidence 0).
  return { value, confidence: value == null && f.value != null && String(f.value).trim() !== "" ? 0 : confidence(f.confidence) };
};
const str = (v: string | number | null | undefined) => (v == null || String(v).trim() === "" ? null : String(v).trim());

/** Gemini's reading of a PDF or photo as a PayrollRead (item keys back to item ids; blanks stay blank). */
export function imageRead(reply: ImageReply, items: PayrollItem[], month: string): PayrollRead {
  const keys = itemKeys(items);
  const rows: ReadRow[] = reply.employees
    .filter((e) => e.name.trim() !== "")
    .map((e, n) => {
      const amounts: ReadRow["amounts"] = {};
      for (const { key, item } of keys) {
        const f = toFigure(e.amounts[key]);
        if (f && (f.value != null || f.confidence === 0)) amounts[item.id] = f;
      }
      return {
        line: n + 1,
        name: e.name.replace(/\s+/g, " ").trim(),
        nameConfidence: confidence(e.name_confidence),
        employeeNo: str(e.employee_no),
        tin: str(e.tin),
        payDate: null,
        days: str(e.days),
        hours: str(e.hours),
        amounts,
        shown: { gross: toFigure(e.gross), deductions: toFigure(e.deductions), net: toFigure(e.net) },
      };
    });
  const t = reply.totals;
  const sourceTotals: Shown | null = t ? { gross: toFigure(t.gross), deductions: toFigure(t.deductions), net: toFigure(t.net) } : null;
  const notes: string[] = [];
  if (reply.pay_period) notes.push(`Pay period on the file: ${reply.pay_period}.`);
  if (rows.length === 0) notes.push("No employee rows were read from the file.");
  return { version: 1, source: "image", month, rows, sourceTotals: sourceTotals && Object.values(sourceTotals).some((f) => f?.value != null) ? sourceTotals : null, otherColumns: reply.other_columns, notes };
}
