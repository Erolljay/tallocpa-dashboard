import ExcelJS from "exceljs";
import { describe, expect, it, vi } from "vitest";
import type { PayrollItem } from "../items";
import { checkRegister } from "../register";
import { buildRegisterTemplate, readRegister } from "../register-xlsx";
import type { Employee } from "../types";
import { amountOf, applyColumns, columnsOf, findHeaderRow, headerKey, knownTarget, type SavedMap } from "./columns";
import { draftToRegister, draftToTemplate, initialDraft, parseDraft } from "./draft";
import { parseCsv, readGrid } from "./grid";
import { matchEmployee, nameScore } from "./match";
import { geminiPayrollReader, imageRead, readSheet, type PayrollReader } from "./reader";
import { imageSchema, itemKeys, mappingSchema, parseImageReply, parseMappingReply } from "./schema";
import { addTotals, checkTotals, totalsAgree, totalsOf } from "./totals";
import type { ColumnTarget } from "./types";

const id = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const item = (n: number, name: string, kind: PayrollItem["kind"], category: PayrollItem["category"], active = true): PayrollItem => ({ id: id(n), name, kind, category, sortOrder: n, active });

const BASIC = item(1, "Basic Pay", "earning", "basic");
const OT = item(2, "Overtime Pay", "earning", "overtime");
const RICE = item(3, "Rice Allowance", "earning", "de_minimis");
const WTAX = item(11, "Withholding Tax", "deduction", "withholding_tax");
const SSS = item(12, "SSS (Employee)", "deduction", "sss_ee");
const PHIC = item(13, "PhilHealth (Employee)", "deduction", "phic_ee");
const HDMF = item(14, "Pag-IBIG (Employee)", "deduction", "hdmf_ee");
const SSS_ER = item(21, "SSS (Employer)", "employer_contribution", "sss_er");
const ITEMS = [BASIC, OT, RICE, WTAX, SSS, PHIC, HDMF, SSS_ER];

const employee = (n: number, over: Partial<Employee>): Employee => ({
  id: id(100 + n), employeeNo: null, lastName: "X", firstName: "Y", middleName: null,
  tin: null, tinBranch: "0000", birthDate: null, address: null, zipCode: null, region: null,
  nationality: "FILIPINO", employmentStatus: "R", isMwe: false, mweDailyRate: null, mweMonthlyRate: null,
  hireDate: null, separationDate: null, separationReason: null, substitutedFiling: true, active: true, needsDetails: false,
  ...over,
});
const JUAN = employee(1, { employeeNo: "E-001", lastName: "Dela Cruz", firstName: "Juan", middleName: "Santos", tin: "111-222-333" });
const MARIA = employee(2, { lastName: "Santos", firstName: "Maria Clara", middleName: "Reyes", tin: "222-333-444" });
const PEDRO = employee(3, { lastName: "Peñaflor", firstName: "Pedro", middleName: null });
const ANA1 = employee(4, { lastName: "Reyes", firstName: "Ana", middleName: "Lopez" });
const ANA2 = employee(5, { lastName: "Reyes", firstName: "Ana", middleName: "Garcia" });
const EMPLOYEES = [JUAN, MARIA, PEDRO];

/** The client's own payroll, their way: a title, headings on row 3, a totals row. */
const CLIENT_SHEET = [
  ["JARO BAKERY", "", "", "", "", "", "", "", ""],
  ["Payroll for November 1-30, 2026"],
  ["Name", "Days", "Basic Salary", "OT", "Rice", "SSS", "Philhealth", "W/Tax", "Cash Advance", "Gross Pay", "Net Pay"],
  ["Dela Cruz, Juan S.", "26", "15,000.00", "1,250.50", "", "450", "375", "0", "500", "16,250.50", "14,925.50"],
  ["Maria Santos", "22", "12000", "", "", "450", "300", "", "", "12,000.00", "11,250.00"],
  ["Penaflor, Pedro", "26", "10,000.00", "-", "", "450", "250", "", "", "10,000.00", "9,300.00"],
  [""],
  ["TOTAL", "", "37,000.00", "1,250.50", "", "1,350.00", "925.00", "0", "500", "38,250.50", "35,475.50"],
];

describe("column headings → the client's items and employee fields", () => {
  it("normalises a heading the same way it is saved", () => {
    expect(headerKey("  W/Tax: ")).toBe("w tax");
    expect(headerKey("PhilHealth (Employee)")).toBe("philhealth employee");
  });

  it("uses the client's saved mapping first, then an item's exact name, then common headings", () => {
    const saved: SavedMap = new Map<string, ColumnTarget>([["rice", `item:${RICE.id}`]]);
    expect(knownTarget("Rice", ITEMS, saved)).toEqual({ target: `item:${RICE.id}`, from: "saved", confidence: null });
    expect(knownTarget("Overtime Pay", ITEMS, saved)).toEqual({ target: `item:${OT.id}`, from: "name", confidence: null });
    expect(knownTarget("Basic Salary", ITEMS, saved)).toMatchObject({ target: `item:${BASIC.id}`, from: "suggested" });
    expect(knownTarget("Net Pay", ITEMS, saved)).toMatchObject({ target: "net", from: "suggested" });
    expect(knownTarget("Cash Advance", ITEMS, saved)).toBeNull();
    // A saved column for an item since deleted is not used.
    expect(knownTarget("Rice", ITEMS.filter((i) => i !== RICE), saved)).toBeNull();
  });

  it("finds the heading row under a title and reads the rows, the client's totals apart", () => {
    const saved: SavedMap = new Map<string, ColumnTarget>([["rice", `item:${RICE.id}`], ["w tax", `item:${WTAX.id}`]]);
    const headerRow = findHeaderRow(CLIENT_SHEET, ITEMS, saved);
    expect(headerRow).toBe(3);
    const columns = columnsOf(CLIENT_SHEET, headerRow!, ITEMS, saved);
    expect(columns.find((c) => c.header === "Cash Advance")?.target).toBeNull();
    const { rows, sourceTotals, unreadable } = applyColumns(CLIENT_SHEET, headerRow!, columns, ITEMS);
    expect(unreadable).toEqual([]);
    expect(rows.map((r) => [r.line, r.name, r.days])).toEqual([[4, "Dela Cruz, Juan S.", "26"], [5, "Maria Santos", "22"], [6, "Penaflor, Pedro", "26"]]);
    expect(rows[0].amounts[BASIC.id]).toEqual({ value: "15000.00", confidence: 0.85 });
    expect(rows[0].amounts[WTAX.id]).toEqual({ value: "0.00", confidence: null });
    // A dash is a zero; a blank stays blank (not on the row).
    expect(rows[2].amounts[OT.id]?.value).toBe("0.00");
    expect(rows[1].amounts[OT.id]).toBeUndefined();
    // Pag-IBIG is not on the client's sheet: never filled in.
    expect(rows.every((r) => r.amounts[HDMF.id] === undefined)).toBe(true);
    expect(rows[0].shown.net?.value).toBe("14925.50");
    expect(sourceTotals).toMatchObject({ gross: { value: "38250.50" }, net: { value: "35475.50" } });
  });

  it("builds a name from last / first / middle columns", () => {
    const grid = [["Surname", "First Name", "MI", "Basic Pay"], ["Dela Cruz", "Juan", "S", "100"]];
    const cols = columnsOf(grid, 1, ITEMS, new Map());
    expect(applyColumns(grid, 1, cols, ITEMS).rows[0].name).toBe("Dela Cruz, Juan S");
  });

  it("reads amounts as written, to the centavo", () => {
    expect(amountOf("1,234.565")).toBe("1234.57");
    expect(amountOf("(500)")).toBe("-500.00");
    expect(amountOf("₱ 12,000")).toBe("12000.00");
    expect(amountOf("n/a")).toBeNull();
    expect(amountOf("")).toBeNull();
  });
});

describe("reading the client's spreadsheet", () => {
  async function workbook(sheets: Record<string, (string | number | null)[][]>) {
    const wb = new ExcelJS.Workbook();
    for (const [name, rows] of Object.entries(sheets)) {
      const ws = wb.addWorksheet(name);
      rows.forEach((r) => ws.addRow(r));
    }
    return new Uint8Array(await wb.xlsx.writeBuffer());
  }

  it("takes the sheet with the most figures and reads it into rows, asking no one when every heading is known", async () => {
    const bytes = await workbook({
      Notes: [["Prepared by HR"]],
      Payroll: [["Name", "Basic Pay", "SSS", "Net Pay"], ["Dela Cruz, Juan", 15000, 450, 14550], ["Santos, Maria", 12000.5, 450, 11550.5]],
    });
    const grid = await readGrid(bytes, "nov.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    if ("error" in grid) throw new Error(grid.error);
    expect(grid.sheet).toBe("Payroll");
    const reader = { model: "m", mapColumns: vi.fn(), readImage: vi.fn() } as unknown as PayrollReader;
    const { read, model } = await readSheet(grid, ITEMS, new Map(), "2026-11-01", reader);
    expect(reader.mapColumns).not.toHaveBeenCalled();
    expect(model).toBeNull();
    expect(read.rows.map((r) => r.amounts[BASIC.id]?.value)).toEqual(["15000.00", "12000.50"]);
    expect(read.sheet?.headerRow).toBe(1);
  });

  it("refuses the old .xls format with a plain message, and reads CSV", async () => {
    expect(await readGrid(new Uint8Array([1, 2]), "nov.xls", "application/vnd.ms-excel")).toMatchObject({ error: expect.stringContaining(".xls") });
    const csv = await readGrid(new TextEncoder().encode('Name,Basic Pay\r\n"Dela Cruz, Juan","15,000.00"\r\n'), "nov.csv", "text/csv");
    expect(csv).toEqual({ sheet: "CSV", rows: [["Name", "Basic Pay"], ["Dela Cruz, Juan", "15,000.00"]] });
    expect(parseCsv('a,"b ""q""",c\n1,2,3')).toEqual([["a", 'b "q"', "c"], ["1", "2", "3"]]);
  });

  it("asks the reader only about headings it does not know, and keeps what it is told", async () => {
    const grid = { sheet: "S", rows: [["Employee", "Sahod", "Kaltas SSS", "Remarks"], ["Dela Cruz, Juan", "15000", "450", "ok"]] };
    const reader: PayrollReader = {
      model: "m",
      mapColumns: vi.fn(async () => ({
        suggestion: { headerRow: 1, columns: new Map([[2, { target: `item:${BASIC.id}` as const, confidence: 0.7 }], [3, { target: `item:${SSS.id}` as const, confidence: 0.95 }], [4, { target: "ignore" as const, confidence: 0.9 }]]) },
        model: "m-used",
      })),
      readImage: vi.fn(),
    };
    const { read, model } = await readSheet(grid, ITEMS, new Map(), "2026-11-01", reader);
    expect(model).toBe("m-used");
    expect(read.sheet?.columns.map((c) => [c.header, c.target, c.from])).toEqual([
      ["Employee", "name", "suggested"],
      ["Sahod", `item:${BASIC.id}`, "suggested"],
      ["Kaltas SSS", `item:${SSS.id}`, "suggested"],
      ["Remarks", "ignore", "suggested"],
    ]);
    expect(read.rows[0].amounts[BASIC.id]).toEqual({ value: "15000.00", confidence: 0.7 });
    // Next month the confirmed mapping is saved: nobody is asked.
    const saved: SavedMap = new Map<string, ColumnTarget>([["sahod", `item:${BASIC.id}`], ["kaltas sss", `item:${SSS.id}`], ["remarks", "ignore"]]);
    const again = vi.fn();
    const next = await readSheet(grid, ITEMS, saved, "2026-12-01", { ...reader, mapColumns: again });
    expect(again).not.toHaveBeenCalled();
    expect(next.read.rows[0].amounts[BASIC.id]).toEqual({ value: "15000.00", confidence: null });
  });

  it("reads from the heading row staff set, and with the columns staff chose asks no one", async () => {
    const grid = { sheet: "S", rows: [["Payroll Nov"], ["Name", "Sahod"], ["Dela Cruz, Juan", "15000"]] };
    const ask = vi.fn();
    const reader = { model: "m", mapColumns: ask, readImage: vi.fn() } as unknown as PayrollReader;
    const chosen = await readSheet(grid, ITEMS, new Map(), "2026-11-01", reader, {
      headerRow: 2,
      columns: [{ index: 1, header: "Name", target: "name", from: "staff", confidence: null }, { index: 2, header: "Sahod", target: `item:${BASIC.id}`, from: "staff", confidence: null }],
    });
    expect(ask).not.toHaveBeenCalled();
    expect(chosen.read.rows[0].amounts[BASIC.id]).toEqual({ value: "15000.00", confidence: null });
    const rowOnly = await readSheet(grid, ITEMS, new Map(), "2026-11-01", null, { headerRow: 2 });
    expect(rowOnly.read.sheet?.columns.map((c) => c.target)).toEqual(["name", null]);
  });

  it("without a reader, leaves unknown columns for staff and says so", async () => {
    const grid = { sheet: "S", rows: [["Name", "Basic Pay", "Sahod"], ["Dela Cruz, Juan", "1", "2"]] };
    const { read } = await readSheet(grid, ITEMS, new Map(), "2026-11-01", null);
    expect(read.otherColumns).toEqual(["Sahod"]);
    expect(read.notes.join(" ")).toMatch(/Choose what each one holds/);
  });
});

describe("matching names to the client's employees", () => {
  it("matches by Employee No. or TIN first", () => {
    expect(matchEmployee({ name: "whoever", employeeNo: "e001" }, EMPLOYEES)).toMatchObject({ employeeId: JUAN.id, status: "number" });
    expect(matchEmployee({ name: "whoever", tin: "222333444000" }, EMPLOYEES)).toMatchObject({ employeeId: MARIA.id, status: "tin" });
  });

  it("matches a name written in any order, case or with initials, and accents aside", () => {
    expect(matchEmployee({ name: "DELA CRUZ, JUAN S." }, EMPLOYEES)).toMatchObject({ employeeId: JUAN.id, status: "exact" });
    expect(matchEmployee({ name: "Juan Santos Dela Cruz" }, EMPLOYEES)).toMatchObject({ employeeId: JUAN.id, status: "exact" });
    expect(matchEmployee({ name: "Maria Clara Santos" }, EMPLOYEES)).toMatchObject({ employeeId: MARIA.id, status: "exact" });
    expect(matchEmployee({ name: "Penaflor, Pedro" }, EMPLOYEES)).toMatchObject({ employeeId: PEDRO.id, status: "exact" });
    expect(matchEmployee({ name: "Juan Delacruz" }, EMPLOYEES)).toMatchObject({ employeeId: JUAN.id, status: "exact" });
  });

  it("flags a misspelt name for staff to check, with the likely employee first", () => {
    const m = matchEmployee({ name: "Dela Curz, Juan" }, EMPLOYEES);
    expect(m.status).toBe("close");
    expect(m.employeeId).toBe(JUAN.id);
    expect(m.candidates[0].id).toBe(JUAN.id);
    expect(nameScore("Dela Curz, Juan", JUAN)).toBeLessThan(1);
  });

  it("does not guess between two people with the same name, nor for a stranger", () => {
    const two = matchEmployee({ name: "Ana Reyes" }, [...EMPLOYEES, ANA1, ANA2]);
    expect(two.status).toBe("ambiguous");
    expect(two.employeeId).toBeNull();
    expect(two.candidates.map((c) => c.id).sort()).toEqual([ANA1.id, ANA2.id].sort());
    // With the middle name written, it is no longer ambiguous.
    expect(matchEmployee({ name: "Reyes, Ana G." }, [ANA1, ANA2])).toMatchObject({ employeeId: ANA2.id });
    expect(matchEmployee({ name: "Jose Rizal" }, EMPLOYEES)).toMatchObject({ employeeId: null, status: "none" });
  });
});

describe("totals check", () => {
  it("adds up to the centavo and compares with the client's totals exactly", () => {
    const a = totalsOf({ [BASIC.id]: "15000.10", [OT.id]: "0.20", [SSS.id]: "450.15", [SSS_ER.id]: "1000" }, ITEMS);
    const b = totalsOf({ [BASIC.id]: "12000.20", [WTAX.id]: "", [PHIC.id]: "300.05" }, ITEMS);
    const ours = addTotals([a, b]);
    // Employer contributions are not pay: not in gross, deductions or net.
    expect(ours).toEqual({ gross: 2700050, deductions: 75020, net: 2625030 });
    const exact = checkTotals(ours, { gross: "27,000.50", deductions: "750.20", net: "26250.30" });
    expect(exact.map((c) => c.difference)).toEqual([0, 0, 0]);
    expect(totalsAgree(exact)).toBe(true);
    // One centavo off is a difference.
    const off = checkTotals(ours, { gross: "27,000.49", deductions: null, net: "26250.30" });
    expect(off.map((c) => c.difference)).toEqual([1, null, 0]);
    expect(totalsAgree(off)).toBe(false);
    expect(totalsAgree(checkTotals(ours, null))).toBe(false);
  });

  it("checks the example sheet against the client's totals row", () => {
    const saved: SavedMap = new Map<string, ColumnTarget>([["rice", `item:${RICE.id}`], ["w tax", `item:${WTAX.id}`]]);
    const columns = columnsOf(CLIENT_SHEET, 3, ITEMS, saved);
    const { rows, sourceTotals } = applyColumns(CLIENT_SHEET, 3, columns, ITEMS);
    const ours = addTotals(rows.map((r) => totalsOf(Object.fromEntries(Object.entries(r.amounts).map(([k, f]) => [k, f.value])), ITEMS)));
    const checks = checkTotals(ours, { gross: sourceTotals?.gross?.value, net: sourceTotals?.net?.value });
    // Gross agrees; net is off by the cash advance, a column with no payslip item yet.
    expect(checks.map((c) => [c.key, c.difference])).toEqual([["gross", 0], ["deductions", null], ["net", 50000]]);
  });
});

describe("Gemini schemas from the client's payslip items", () => {
  it("lists the active items under short keys in register order", () => {
    const keys = itemKeys([...ITEMS, item(30, "Old Bonus", "earning", "other_taxable", false)]);
    expect(keys.map((k) => [k.key, k.item.name])).toEqual([
      ["item_1", "Basic Pay"], ["item_2", "Overtime Pay"], ["item_3", "Rice Allowance"],
      ["item_4", "Withholding Tax"], ["item_5", "SSS (Employee)"], ["item_6", "PhilHealth (Employee)"], ["item_7", "Pag-IBIG (Employee)"],
      ["item_8", "SSS (Employer)"],
    ]);
  });

  it("holds the column mapping to the employee fields and those keys, and maps keys back to item ids", () => {
    const schema = mappingSchema(ITEMS);
    const target = schema.properties.columns.items.properties.target;
    expect(target.enum).toEqual(expect.arrayContaining(["name", "net", "ignore", "item_1", "item_8"]));
    expect(target.enum).toHaveLength(13 + 8);
    const s = parseMappingReply({ header_row: 2, columns: [{ column: 1, target: "name", confidence: 1 }, { column: 3, target: "item_5", confidence: 0.9 }, { column: 4, target: "item_99", confidence: 0.9 }] }, ITEMS);
    expect(s.headerRow).toBe(2);
    expect([...s.columns]).toEqual([[1, { target: "name", confidence: 1 }], [3, { target: `item:${SSS.id}`, confidence: 0.9 }]]);
    expect(() => parseMappingReply({ columns: [] }, ITEMS)).toThrow(/unexpected shape/);
  });

  it("asks for every figure of a PDF or photo with its confidence, one property per item", () => {
    const schema = imageSchema(ITEMS);
    const row = schema.properties.employees.items;
    expect(Object.keys(row.properties.amounts.properties)).toEqual(itemKeys(ITEMS).map((k) => k.key));
    expect(row.properties.amounts.properties.item_1).toMatchObject({ type: "OBJECT", nullable: true, required: ["value", "confidence"] });
    expect(row.required).toEqual(["name", "name_confidence", "amounts"]);
  });

  it("turns Gemini's reading into rows: blanks stay blank, nothing is filled in", () => {
    const reply = parseImageReply({
      employees: [
        { name: "Juan  Dela Cruz", name_confidence: 0.95, days: 26, amounts: { item_1: { value: "15,000", confidence: 0.98 }, item_5: { value: "45O", confidence: 0.4 }, item_7: null }, net: { value: "14550", confidence: 0.9 } },
        { name: "", name_confidence: 0, amounts: {} },
      ],
      totals: { gross: { value: "15000", confidence: 0.9 }, deductions: null, net: null },
      other_columns: ["Loan"],
      pay_period: "Nov 1-30",
    });
    const read = imageRead(reply, ITEMS, "2026-11-01");
    expect(read.rows).toHaveLength(1);
    expect(read.rows[0]).toMatchObject({ line: 1, name: "Juan Dela Cruz", days: "26", nameConfidence: 0.95 });
    expect(read.rows[0].amounts[BASIC.id]).toEqual({ value: "15000.00", confidence: 0.98 });
    // Not an amount: kept as unreadable (blank, confidence 0) for staff.
    expect(read.rows[0].amounts[SSS.id]).toEqual({ value: null, confidence: 0 });
    expect(read.rows[0].amounts[HDMF.id]).toBeUndefined();
    expect(read.sourceTotals?.gross?.value).toBe("15000.00");
    expect(read.otherColumns).toEqual(["Loan"]);
  });

  it("sends the file at high resolution with the item schema (Gemini mocked)", async () => {
    const body = { employees: [{ name: "Juan Dela Cruz", name_confidence: 1, amounts: { item_1: { value: "100", confidence: 1 } } }], other_columns: [] };
    const fetch = vi.fn(async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(body) }] } }] }), { status: 200 }));
    const reader = geminiPayrollReader({ apiKey: "k", model: "test-model", fetch });
    const { reply, model } = await reader.readImage({ bytes: new Uint8Array([1, 2, 3]), mimeType: "application/pdf" }, ITEMS);
    expect(model).toBe("test-model");
    expect(reply.employees[0].name).toBe("Juan Dela Cruz");
    const [, init] = fetch.mock.calls[0] as unknown as [string, RequestInit];
    const sent = JSON.parse(init.body as string);
    expect(sent.generationConfig).toMatchObject({ responseMimeType: "application/json", mediaResolution: "MEDIA_RESOLUTION_HIGH", temperature: 0 });
    expect(Object.keys(sent.generationConfig.responseSchema.properties.employees.items.properties.amounts.properties)).toHaveLength(8);
    expect(sent.contents[0].parts[0].text).toContain("item_1: Basic Pay (Earning; Basic salary)");
    expect(sent.contents[0].parts[1].inline_data).toEqual({ mime_type: "application/pdf", data: "AQID" });
  });

  it("maps headings with a text-only request (Gemini mocked)", async () => {
    const reply = { header_row: 1, columns: [{ column: 2, target: "item_1", confidence: 0.8 }] };
    const fetch = vi.fn(async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(reply) }] } }] }), { status: 200 }));
    const { suggestion } = await geminiPayrollReader({ apiKey: "k", fetch }).mapColumns([["Name", "Sahod"], ["Juan", "1"]], ITEMS);
    expect(suggestion.columns.get(2)).toEqual({ target: `item:${BASIC.id}`, confidence: 0.8 });
    const sent = JSON.parse((fetch.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(sent.contents[0].parts).toHaveLength(1);
    expect(sent.contents[0].parts[0].text).toContain("1\tName\tSahod");
    expect(sent.generationConfig.mediaResolution).toBeUndefined();
  });
});

describe("the reviewed draft goes through the existing loader", () => {
  const saved: SavedMap = new Map<string, ColumnTarget>([["rice", `item:${RICE.id}`], ["w tax", `item:${WTAX.id}`]]);
  const sheetRead = async () => (await readSheet({ sheet: "S", rows: CLIENT_SHEET }, ITEMS, saved, "2026-11-01", null)).read;

  it("matches employees in the first draft, and register rows pass checkRegister", async () => {
    const read = await sheetRead();
    const draft = initialDraft(read, EMPLOYEES);
    expect(draft.rows.map((r) => r.employeeId)).toEqual([JUAN.id, MARIA.id, PEDRO.id]);
    const { rows, issues } = draftToRegister(draft, EMPLOYEES);
    expect(issues).toEqual([]);
    const checked = checkRegister(rows, EMPLOYEES, ITEMS, "2026-11-01");
    expect(checked.errors).toEqual([]);
    expect(checked.entries.get(JUAN.id)?.get(BASIC.id)).toBe(1500000);
    expect(checked.entries.get(MARIA.id)?.get(SSS.id)).toBe(45000);
    // Pag-IBIG was not on the file: no line, so the loader stores nothing for it.
    expect(checked.entries.get(JUAN.id)?.has(HDMF.id)).toBe(false);
  });

  it("needs an employee or a new employee's name for every row it loads, and skips rows staff skip", async () => {
    const read = await sheetRead();
    const draft = initialDraft(read, [JUAN]);
    expect(draftToRegister(draft, [JUAN]).issues.map((i) => i.line)).toEqual([5]);
    // "Penaflor, Pedro" is offered as a new employee (written as Last, First).
    expect(draft.rows[2].newName).toBe("Penaflor, Pedro");
    draft.rows[1].skip = true;
    const { rows, issues } = draftToRegister(draft, [JUAN]);
    expect(issues).toEqual([]);
    const checked = checkRegister(rows, [JUAN], ITEMS, "2026-11-01");
    expect(checked.newEmployees.map((n) => [n.lastName, n.firstName])).toEqual([["Penaflor", "Pedro"]]);
  });

  it("accepts only a well-formed draft from the page", () => {
    expect(parseDraft("nope")).toBeNull();
    expect(parseDraft(JSON.stringify({ rows: [{ line: 1, sourceName: "x", employeeId: "not-a-uuid", amounts: {} }] }))).toBeNull();
    expect(parseDraft(JSON.stringify({ rows: [{ line: 1, sourceName: "x", employeeId: null, amounts: { [BASIC.id]: "1" } }] }))?.rows[0]).toMatchObject({ newName: "", skip: false });
  });

  it("downloads as the Tallo register, prefilled, which reads back through the template reader", async () => {
    const read = await sheetRead();
    const draft = initialDraft(read, [JUAN, MARIA]);
    const { existing, newRows } = draftToTemplate(draft);
    const buf = await buildRegisterTemplate({ clientName: "Jaro Bakery", month: "2026-11-01", employees: [JUAN, MARIA], items: ITEMS, existing, newRows });
    const back = await readRegister(buf, ITEMS);
    if ("error" in back) throw new Error(back.error);
    const filled = back.rows.filter((r) => Object.keys(r.amounts).length > 0);
    expect(filled.map((r) => r.name)).toEqual(["Dela Cruz, Juan Santos", "Santos, Maria Clara Reyes", "Penaflor, Pedro"]);
    expect(filled[0].amounts[OT.id]).toBe("1250.5");
    const checked = checkRegister(back.rows, [JUAN, MARIA], ITEMS, "2026-11-01");
    expect(checked.errors).toEqual([]);
    expect(checked.newEmployees).toHaveLength(1);
  });
});
