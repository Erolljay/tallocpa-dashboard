/**
 * The client's own spreadsheet → register rows. Each column of the client's sheet
 * is given a meaning (an employee field, one of the client's payslip items, the
 * client's own totals, or not used): first from the mapping staff confirmed for
 * this client before (payroll_column_maps), then a header equal to an item's name,
 * then common headings; Gemini suggests only what is left, and staff confirm.
 * Amounts are read exactly as the sheet has them; nothing is computed or filled in.
 */
import { toCentavos, toDecimalString } from "@/lib/returns/money";
import { CATEGORIES, sortItems, type BirCategory, type PayrollItem } from "../items";
import { FIELD_TARGETS, isFieldTarget, type ColumnTarget, type FieldTarget, type Figure, type ReadRow, type SheetColumn, type Shown } from "./types";

/** "Basic  Pay:" → "basic pay"; the key a header is saved and matched under. */
export function headerKey(h: string): string {
  return h
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9%]+/g, " ")
    .trim();
}

/** Common headings for the employee fields and the client's totals. */
const FIELD_ALIASES: Record<Exclude<FieldTarget, "ignore">, string[]> = {
  name: ["name", "employee", "employee name", "employees", "name of employee", "full name", "employee s name", "pangalan", "names"],
  last_name: ["last name", "surname", "family name", "lastname"],
  first_name: ["first name", "given name", "firstname"],
  middle_name: ["middle name", "middle initial", "mi", "m i", "middlename"],
  employee_no: ["employee no", "emp no", "employee number", "employee id", "emp id", "id no", "employee code", "emp code"],
  tin: ["tin", "tin no", "tax identification number", "tin number"],
  pay_date: ["pay date", "payday", "date paid", "payroll date"],
  days: ["days", "days worked", "no of days", "number of days", "days present", "no days"],
  hours: ["hours", "hrs", "hours worked", "no of hours", "total hours"],
  gross: ["gross", "gross pay", "gross salary", "gross income", "total earnings", "gross amount", "total gross", "gross compensation"],
  deductions: ["total deductions", "deductions", "total deduction", "total less"],
  net: ["net", "net pay", "net salary", "take home pay", "net amount", "net amount paid", "amount received", "net income", "net take home pay"],
};

/** Common headings for a BIR category; used only when the client has exactly one active item in it. */
const CATEGORY_ALIASES: Partial<Record<BirCategory, string[]>> = {
  basic: ["basic", "basic pay", "basic salary", "salary", "regular pay", "basic wage"],
  overtime: ["ot", "ot pay", "overtime", "overtime pay"],
  holiday: ["holiday", "holiday pay", "legal holiday", "special holiday"],
  night_diff: ["nd", "night diff", "night differential", "night shift differential"],
  thirteenth_month: ["13th month", "13th month pay"],
  withholding_tax: ["tax", "wtax", "w tax", "withholding tax", "tax withheld", "withholding", "income tax"],
  sss_ee: ["sss", "sss ee", "sss contribution", "sss premium", "sss employee", "sss ee share"],
  phic_ee: ["philhealth", "phic", "philhealth ee", "phic ee", "philhealth contribution", "philhealth employee"],
  hdmf_ee: ["pag ibig", "pagibig", "hdmf", "pag ibig ee", "hdmf ee", "pag ibig contribution", "pagibig ee", "pag ibig employee"],
  sss_er: ["sss er", "sss employer", "sss er share"],
  phic_er: ["philhealth er", "phic er", "philhealth employer"],
  hdmf_er: ["pag ibig er", "hdmf er", "pagibig er", "pag ibig employer"],
};

const FIELD_BY_ALIAS = new Map<string, FieldTarget>(Object.entries(FIELD_ALIASES).flatMap(([t, as]) => as.map((a) => [a, t as FieldTarget] as const)));

/** Saved mapping: header key → target. */
export type SavedMap = Map<string, ColumnTarget>;

/** A target that still points at an item of the client (an item may have been deleted since). */
function liveTarget(t: ColumnTarget | undefined, items: PayrollItem[]): ColumnTarget | undefined {
  if (!t) return undefined;
  if (isFieldTarget(t)) return t;
  return items.some((i) => `item:${i.id}` === t) ? t : undefined;
}

/** What a heading means without asking anyone: saved for this client, an item's exact name, or a common heading. */
export function knownTarget(header: string, items: PayrollItem[], saved: SavedMap): { target: ColumnTarget; from: SheetColumn["from"]; confidence: number | null } | null {
  const k = headerKey(header);
  if (!k) return null;
  const s = liveTarget(saved.get(k), items);
  if (s) return { target: s, from: "saved", confidence: null };
  const active = items.filter((i) => i.active);
  const byName = active.find((i) => headerKey(i.name) === k) ?? items.find((i) => headerKey(i.name) === k);
  if (byName) return { target: `item:${byName.id}`, from: "name", confidence: null };
  const field = FIELD_BY_ALIAS.get(k);
  if (field) return { target: field, from: "suggested", confidence: 0.9 };
  for (const [cat, aliases] of Object.entries(CATEGORY_ALIASES) as [BirCategory, string[]][]) {
    if (!aliases.includes(k)) continue;
    const inCat = active.filter((i) => i.category === cat);
    if (inCat.length === 1) return { target: `item:${inCat[0].id}`, from: "suggested", confidence: 0.85 };
  }
  return null;
}

/**
 * The header row: among the first 30 rows, the one with the most headings this
 * client's mapping or the common headings recognise (at least two). Null if none.
 */
export function findHeaderRow(rows: string[][], items: PayrollItem[], saved: SavedMap): number | null {
  let best: { row: number; score: number } | null = null;
  for (let r = 0; r < Math.min(rows.length, 30); r++) {
    const score = rows[r].filter((c) => c && knownTarget(c, items, saved)).length;
    if (score >= 2 && (!best || score > best.score)) best = { row: r + 1, score };
  }
  return best?.row ?? null;
}

/** The header row's columns with what is known about each (target null = not known yet). */
export function columnsOf(rows: string[][], headerRow: number, items: PayrollItem[], saved: SavedMap): SheetColumn[] {
  const header = rows[headerRow - 1] ?? [];
  const width = Math.max(header.length, ...rows.slice(headerRow, headerRow + 200).map((r) => r.length));
  const out: SheetColumn[] = [];
  for (let c = 1; c <= width; c++) {
    const h = (header[c - 1] ?? "").trim();
    const hasData = rows.slice(headerRow).some((r) => (r[c - 1] ?? "") !== "");
    if (!h && !hasData) continue;
    const k = h ? knownTarget(h, items, saved) : null;
    out.push({ index: c, header: h || `Column ${c}`, target: k?.target ?? (h ? null : "ignore"), from: k?.from ?? (h ? null : "suggested"), confidence: k?.confidence ?? null });
  }
  // One column per meaning: a second column with the same meaning is left for staff.
  const seen = new Set<string>();
  for (const col of out) {
    if (!col.target || col.target === "ignore") continue;
    if (seen.has(col.target)) Object.assign(col, { target: null, from: null, confidence: null });
    else seen.add(col.target);
  }
  return out;
}

/** "15,000.50" / 15000.5 → "15000.50"; null when blank or not an amount. "-" and "0" stay as written (zero). */
export function amountOf(raw: string | null | undefined): string | null {
  const s = (raw ?? "").trim();
  if (s === "") return null;
  if (/^[-–—]+$/.test(s)) return "0.00";
  const c = toCentavos(s);
  return c == null ? null : toDecimalString(c);
}

const TOTAL_ROW = /^(grand\s+)?(sub\s*)?totals?\b|^total\s+(amount|payroll)|^kabuuan/i;

export interface SheetRows {
  rows: ReadRow[];
  sourceTotals: Shown | null;
  /** Rows whose amount cells hold text that is not an amount: "Row 7, Basic Pay: “abc”". */
  unreadable: string[];
}

/**
 * Reads the employee rows under the header with the given column meanings. A
 * row named "Total…" (or with no name but figures, after the employees) is the
 * client's own totals. Rows with no figures are skipped. Items not mapped to any
 * column are simply absent from the rows (blank, flagged on screen).
 */
export function applyColumns(rows: string[][], headerRow: number, columns: SheetColumn[], items: PayrollItem[]): SheetRows {
  const itemIds = new Set(items.map((i) => i.id));
  const col = (t: FieldTarget) => columns.find((c) => c.target === t)?.index;
  const itemCols = columns.filter((c) => c.target?.startsWith("item:") && itemIds.has(c.target.slice(5)));
  const name = col("name");
  const [last, first, middle] = [col("last_name"), col("first_name"), col("middle_name")];
  const confidenceOf = (c: SheetColumn) => (c.from === "suggested" ? c.confidence : null);
  const fig = (r: string[], t: FieldTarget): Figure | null => {
    const c = columns.find((x) => x.target === t);
    if (!c) return null;
    return { value: amountOf(r[c.index - 1]), confidence: confidenceOf(c) };
  };
  const text = (r: string[], i: number | undefined) => (i ? (r[i - 1] ?? "").trim() : "");

  const out: ReadRow[] = [];
  const unreadable: string[] = [];
  let sourceTotals: Shown | null = null;
  for (let i = headerRow; i < rows.length; i++) {
    const r = rows[i];
    const line = i + 1;
    const parts = [text(r, last), text(r, first), text(r, middle)];
    const fullName = name ? text(r, name) : parts[0] && parts[1] ? `${parts[0]}, ${parts[1]}${parts[2] ? ` ${parts[2]}` : ""}` : parts.filter(Boolean).join(" ");
    const amounts: ReadRow["amounts"] = {};
    for (const c of itemCols) {
      const raw = (r[c.index - 1] ?? "").trim();
      if (raw === "") continue;
      const v = amountOf(raw);
      if (v == null) unreadable.push(`Row ${line}, ${c.header}: “${raw}”`);
      amounts[c.target!.slice(5)] = { value: v, confidence: v == null ? 0 : confidenceOf(c) };
    }
    const shown: Shown = { gross: fig(r, "gross"), deductions: fig(r, "deductions"), net: fig(r, "net") };
    const hasFigures = Object.keys(amounts).length > 0 || [shown.gross, shown.deductions, shown.net].some((f) => f?.value != null);
    if (!hasFigures) continue;
    const firstText = r.find((c) => c !== "") ?? "";
    if (TOTAL_ROW.test(fullName) || TOTAL_ROW.test(firstText) || (!fullName && out.length > 0)) {
      // The client's own totals (a grand total after subtotals: the last one counts).
      if ([shown.gross, shown.deductions, shown.net].some((f) => f?.value != null)) sourceTotals = shown;
      continue;
    }
    if (!fullName) continue;
    out.push({
      line,
      name: fullName,
      nameConfidence: null,
      employeeNo: text(r, col("employee_no")) || null,
      tin: text(r, col("tin")) || null,
      payDate: text(r, col("pay_date")) || null,
      days: text(r, col("days")) || null,
      hours: text(r, col("hours")) || null,
      amounts,
      shown,
    });
  }
  return { rows: out, sourceTotals, unreadable };
}

/** Headings with figures under them that are not used for anything yet (no item, not an employee field). */
export function unmappedColumns(columns: SheetColumn[]): SheetColumn[] {
  return columns.filter((c) => c.target == null);
}

/** Options for a column's meaning on the mapping screen: employee fields, then the client's items by kind. */
export function targetOptions(items: PayrollItem[]): { value: ColumnTarget; label: string; group: string }[] {
  const fields = (Object.keys(FIELD_TARGETS) as FieldTarget[]).map((t) => ({
    value: t as ColumnTarget,
    label: FIELD_TARGETS[t] as string,
    group: t === "gross" || t === "deductions" || t === "net" ? "Client's totals (for checking)" : t === "ignore" ? "Other" : "Employee",
  }));
  const groups = { earning: "Earnings", deduction: "Deductions", employer_contribution: "Employer contributions" } as const;
  const itemOpts = sortItems(items.filter((i) => i.active)).map((i) => ({ value: `item:${i.id}` as ColumnTarget, label: `${i.name} (${CATEGORIES[i.category].label})`, group: groups[i.kind] }));
  return [...fields, ...itemOpts];
}
