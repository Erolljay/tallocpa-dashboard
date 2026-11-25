/**
 * Payroll read from the client's own file (Excel, CSV, PDF or photo) into the
 * Tallo payroll register, for staff to review and load (Q9: every extraction
 * goes through staff review; nothing is posted automatically). Stored as
 * payroll_extractions.result; staff edits as payroll_extractions.draft.
 */

/** What a column of the client's sheet holds. Items are `item:<payroll_items.id>`. */
export const FIELD_TARGETS = {
  name: "Employee name",
  last_name: "Last name",
  first_name: "First name",
  middle_name: "Middle name",
  employee_no: "Employee No.",
  tin: "TIN",
  pay_date: "Pay date",
  days: "Days worked",
  hours: "Hours worked",
  gross: "Gross pay (client's total)",
  deductions: "Total deductions (client's total)",
  net: "Net pay (client's total)",
  ignore: "Not used",
} as const;
export type FieldTarget = keyof typeof FIELD_TARGETS;
export type ColumnTarget = FieldTarget | `item:${string}`;

export const isFieldTarget = (t: string): t is FieldTarget => t in FIELD_TARGETS;
export const isColumnTarget = (t: string): t is ColumnTarget => isFieldTarget(t) || /^item:[0-9a-f-]{36}$/i.test(t);

/** How a column's meaning was found: the client's saved mapping, the header equal to an item's name, a suggestion (common header or Gemini), or staff. */
export type ColumnSource = "saved" | "name" | "suggested" | "staff";

export interface SheetColumn {
  /** 1-based column number. */
  index: number;
  header: string;
  target: ColumnTarget | null;
  from: ColumnSource | null;
  /** 0–1 for a suggestion; null when certain (saved, exact name, staff). */
  confidence: number | null;
}

/** One figure: the amount as "1234.50" (null = not on the file or unreadable) and how sure the reader is (null = read exactly, from a spreadsheet). */
export interface Figure {
  value: string | null;
  confidence: number | null;
}

export interface Shown {
  gross: Figure | null;
  deductions: Figure | null;
  net: Figure | null;
}

export interface ReadRow {
  /** Sheet row number, or the row's place on the page (1, 2, …) for a PDF or photo. */
  line: number;
  name: string;
  nameConfidence: number | null;
  employeeNo: string | null;
  tin: string | null;
  payDate: string | null;
  days: string | null;
  hours: string | null;
  /** Item id → figure. An item missing here is not on the client's file: it stays blank, never invented. */
  amounts: Record<string, Figure>;
  /** The row's totals as the client's file shows them (for checking). */
  shown: Shown;
}

export interface PayrollRead {
  version: 1;
  source: "sheet" | "image";
  /** YYYY-MM-01, the document's month. */
  month: string;
  sheet?: {
    name: string;
    headerRow: number;
    columns: SheetColumn[];
    /** The client's sheet as text (first rows), to show beside the register. */
    grid: string[][];
  };
  rows: ReadRow[];
  /** The client's own totals row, when the file has one. */
  sourceTotals: Shown | null;
  /** Headings of figures on the file that are not one of the client's payslip items (to add as items, or ignore). */
  otherColumns: string[];
  notes: string[];
}

/** A row as staff left it on the review screen (payroll_extractions.draft). */
export interface DraftRow {
  line: number;
  /** The name as it is on the client's file. */
  sourceName: string;
  /** The matched or picked employee; null = a new employee (named in `newName`) or skipped. */
  employeeId: string | null;
  /** For a new employee: "Last, First Middle". */
  newName: string;
  skip: boolean;
  /** Item id → amount as typed ("" = blank). */
  amounts: Record<string, string>;
}

export interface PayrollDraft {
  rows: DraftRow[];
}
