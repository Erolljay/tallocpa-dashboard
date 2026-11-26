import { readFileSync } from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";
import { describe, expect, it } from "vitest";
import { PAYROLL_FORMS } from "@/lib/returns/forms/payroll";
import type { WorksheetContext } from "@/lib/returns/types";
import { alphaCols, alphalistCsv, alphalistDat, buildAlphalist } from "./alphalist";
import { annualSummary, annualTax, computeEmployeeYear, monthlyTable, monthlyWithholding, suggestWithholding } from "./compute";
import { checkRegister, ID_HEADERS, registerHeaders, TOTAL_HEADERS, type RegisterRow } from "./register";
import { buildRegisterTemplate, readRegister, REGISTER_SHEET } from "./register-xlsx";
import { buildEmployeeTemplate, checkEmployeeImport, EMPLOYEE_SHEET, readEmployeeFile } from "./employees-xlsx";
import { categoryTotals, DEFAULT_ITEMS, payTotals, type PayrollItem } from "./items";
import { itemFromRow, monthPayload, sameMonth, storedMonthsFromRows, toEntries } from "./rows";
import { emptyAmounts, type Employee, type PayAmounts, type PayrollContext, type PayrollEntry } from "./types";
import { buildYear, month1601C } from "./year";

const P = (pesos: number) => Math.round(pesos * 100);

const employee = (over: Partial<Employee>): Employee => ({
  id: "e1", employeeNo: "001", lastName: "Dela Cruz", firstName: "Juan", middleName: "Santos",
  tin: "111-222-333", tinBranch: "0000", birthDate: null, address: null, zipCode: null, region: null,
  nationality: "FILIPINO", employmentStatus: "R", isMwe: false, mweDailyRate: null, mweMonthlyRate: null,
  hireDate: null, separationDate: null, separationReason: null, substitutedFiling: true, active: true, needsDetails: false,
  ...over,
});

const pay = (over: Partial<Record<keyof PayAmounts, number>>): PayAmounts => {
  const a = emptyAmounts();
  for (const [k, v] of Object.entries(over)) a[k as keyof PayAmounts] = P(v!);
  return a;
};

const entry = (employeeId: string, month: number, year: number, over: Partial<Record<keyof PayAmounts, number>>): PayrollEntry => ({
  employeeId, payMonth: `${year}-${String(month).padStart(2, "0")}-01`, note: null, ...pay(over),
});

describe("rates for compensation", () => {
  it("uses TRAIN's 2023 step-down for the annual tax (taxify computeAnnualTax)", () => {
    expect(annualTax(P(250000), 2025)).toBe(0);
    expect(annualTax(P(400000), 2025)).toBe(P(22500));
    expect(annualTax(P(800000), 2025)).toBe(P(102500));
    expect(annualTax(P(576000), 2025)).toBe(P(57700));
    // 2018–2022 brackets.
    expect(annualTax(P(400000), 2022)).toBe(P(30000));
  });

  it("derives the published monthly withholding table", () => {
    const t = monthlyTable("2025-06-01");
    expect(t.map((b) => [b.from / 100, b.to === Infinity ? null : b.to / 100, b.fixed / 100])).toEqual([
      [0, 20833, 0],
      [20833, 33333, 0],
      [33333, 66667, 1875],
      [66667, 166667, 8541.8],
      [166667, 666667, 33541.8],
      [666667, null, 183541.8],
    ]);
    expect(monthlyWithholding(P(48000), "2025-06-01")).toBe(P(4808.4));
    expect(monthlyWithholding(P(20000), "2025-06-01")).toBe(0);
  });
});

describe("computeEmployeeYear (taxify computeEmployee1601C)", () => {
  it("non-MWE: contributions, de minimis and 13th month up to the ceiling are non-taxable", () => {
    const months: (PayAmounts | null)[] = Array(12).fill(null);
    months[0] = pay({ basic: 40000, deMinimis: 2000, sssEmployee: 1350, philhealthEmployee: 1000, pagibigEmployee: 200, taxWithheld: 1500 });
    const [jan] = computeEmployeeYear(months, false, 2025);
    expect(jan).toMatchObject({ l14: P(42000), l15: 0, l16: 0, l18: P(2000), l19: P(2550), l21: P(4550), l22: P(37450), l23: 0, l24: P(37450), l25: P(1500), hasEntry: true });
  });

  it("caps 13th month pay and other benefits cumulatively at ₱90,000 a year", () => {
    const months: (PayAmounts | null)[] = Array(12).fill(null);
    months[5] = pay({ basic: 30000, thirteenthMonth: 60000, taxWithheld: 1 });
    months[11] = pay({ basic: 30000, thirteenthMonth: 50000, taxWithheld: 1 });
    const lines = computeEmployeeYear(months, false, 2025);
    expect(lines[5].l17).toBe(P(60000));
    expect(lines[11].l17).toBe(P(30000));
    expect(lines[11].thirteenthExcess).toBe(P(20000));
    expect(lines[11].l22).toBe(P(50000));
  });

  it("MWE: minimum wage (net of contributions), holiday/OT/night/hazard pay are exempt", () => {
    const months: (PayAmounts | null)[] = Array(12).fill(null);
    months[1] = pay({ basic: 15000, overtime: 1200, holidayPay: 800, sssEmployee: 675, philhealthEmployee: 375, pagibigEmployee: 200, otherTaxable: 1000 });
    const feb = computeEmployeeYear(months, true, 2025)[1];
    expect(feb).toMatchObject({ l14: P(18000), l15: P(13750), l16: P(2000), l19: P(1250), l21: P(17000), l22: P(1000), l23: 0, l24: P(1000) });
  });

  it("puts a non-MWE's taxable pay with nothing withheld in item 23 (as taxify)", () => {
    const months: (PayAmounts | null)[] = Array(12).fill(null);
    months[0] = pay({ basic: 18000 });
    expect(computeEmployeeYear(months, false, 2025)[0]).toMatchObject({ l22: P(18000), l23: P(18000), l24: 0 });
  });
});

describe("year-end annualization", () => {
  const e = employee({});
  const entries = Array.from({ length: 12 }, (_, m) =>
    entry("e1", m + 1, 2025, { basic: 50000, sssEmployee: 1500, philhealthEmployee: 300, pagibigEmployee: 200, taxWithheld: m < 11 ? 4808.4 : 0 }),
  );
  const ctx: PayrollContext = { year: 2025, throughMonth: 12, employees: [e], entries };

  it("suggests the monthly table from January to November", () => {
    const [y] = buildYear(ctx);
    expect(suggestWithholding(e, y.lines, 3, 2025)).toEqual({ method: "monthly", net: P(4808.4) });
  });

  it("December: annual tax due less January–November withheld", () => {
    const [y] = buildYear(ctx);
    const s = suggestWithholding(e, y.lines, 11, 2025);
    expect(s).toEqual({ method: "annualized", net: P(57700 - 4808.4 * 11), annualTaxDue: P(57700), withheldBefore: P(4808.4 * 11) });
  });

  it("annualizes in the month an employee leaves", () => {
    const left = employee({ separationDate: "2025-06-30", separationReason: "T" });
    const [y] = buildYear({ ...ctx, employees: [left], entries: entries.slice(0, 6) });
    const s = suggestWithholding(left, y.lines, 5, 2025);
    expect(s.method).toBe("annualized");
    // 6 × 48,000 = 288,000 → 15% of 38,000 = 5,700; withheld before: 5 × 4,808.40 = 24,042 → refund 18,342.
    expect(s.net).toBe(P(5700 - 24042));
  });

  it("annual summary: withheld includes adjustments (e.g. the December refund)", () => {
    const withRefund = entries.map((x, i) => (i === 11 ? { ...x, adjustment: P(-100) } : x));
    const [y] = buildYear({ ...ctx, entries: withRefund });
    const s = annualSummary(y.lines, 2025);
    expect(s).toMatchObject({ gross: P(600000), taxable: P(576000), taxDue: P(57700), withheld: P(4808.4 * 11 - 100) });
    expect(s.under).toBe(P(57700) - P(4808.4 * 11 - 100));
  });

  it("month1601C totals the employees paid in the month and skips the rest", () => {
    const other = employee({ id: "e2", employeeNo: "002", lastName: "Abad", firstName: "Ana", tin: null });
    const r = month1601C(buildYear({ ...ctx, employees: [e, other] }), 0, 2025);
    expect(r.rows.map((x) => x.employee.id)).toEqual(["e1"]);
    expect(r.totals.l14).toBe(P(50000));
    expect(r.totals.l25).toBe(P(4808.4));
  });
});

/** The fixture employees, as entered in __fixtures__/alphalist-input.json for taxify. */
function fixtureContext(): PayrollContext {
  const juan = employee({ id: "a", employeeNo: "1", tin: "111-222-333", hireDate: "2020-03-15", nationality: "" });
  const maria = employee({
    id: "b", employeeNo: "2", lastName: "Bautista", firstName: "Maria", middleName: null, tin: "444-555-666", nationality: "Filipino",
    employmentStatus: "C", isMwe: true, region: null, mweDailyRate: P(645), mweMonthlyRate: null, hireDate: "2025-02-01", separationDate: "2025-11-30", separationReason: "T", substitutedFiling: false,
  });
  const c = { sssEmployee: 1350, philhealthEmployee: 1000, pagibigEmployee: 200 };
  const mc = { sssEmployee: 675, philhealthEmployee: 375, pagibigEmployee: 200 };
  return {
    year: 2025, throughMonth: 12, employees: [maria, juan],
    entries: [
      entry("a", 1, 2025, { basic: 40000, ...c, taxWithheld: 1500.25, deMinimis: 2000 }),
      entry("a", 2, 2025, { basic: 40000, ...c, taxWithheld: 1500.25, deMinimis: 2000 }),
      entry("a", 3, 2025, { basic: 40000, overtime: 3500.5, ...c, taxWithheld: 2200.1 }),
      entry("a", 12, 2025, { basic: 40000, thirteenthMonth: 40000, ...c, taxWithheld: 1500 }),
      entry("b", 2, 2025, { basic: 15000, overtime: 1200, holidayPay: 800, ...mc }),
      entry("b", 3, 2025, { basic: 15000, nightDifferential: 450.75, hazardPay: 300, thirteenthMonth: 5000, ...mc }),
    ],
  };
}

describe("alphalist (taxify alphalist-report.js)", () => {
  const ctx = fixtureContext();
  const list = buildAlphalist(buildYear(ctx), 2025);

  it("splits Schedule 1 (non-MWE) and Schedule 2 (MWE)", () => {
    expect(list.schedule1.map((r) => r.employee.id)).toEqual(["a"]);
    expect(list.schedule2.map((r) => r.employee.id)).toEqual(["b"]);
    const c = alphaCols(list.schedule1[0]);
    expect(c.c7a).toBe(c.c7f + c.c7j);
  });

  it("writes the DAT exactly as taxify's exportAlphalistDat does", () => {
    const expected = readFileSync(path.join(import.meta.dirname, "__fixtures__/alphalist-2025.dat"), "utf8");
    const dat = alphalistDat(list, { tin: "123-456-789-000", name: "Tallo Test Trading, Inc." }, 2025);
    expect(dat.body).toBe(expected);
    expect(dat.fileName).toBe("1234567890000123120251604C.DAT");
  });

  it("keeps 7a = 7f + 7j when 13th month pay is over the ceiling (differs from taxify)", () => {
    const big = { ...ctx, entries: [entry("a", 12, 2025, { basic: 40000, thirteenthMonth: 100000, taxWithheld: 1 })], employees: [ctx.employees[1]] };
    const [row] = buildAlphalist(buildYear(big), 2025).schedule1;
    const c = alphaCols(row);
    expect(c.c7b).toBe(P(90000));
    expect(c.c7j).toBe(P(50000));
    expect(c.c7a).toBe(c.c7f + c.c7j);
  });

  it("writes each schedule as CSV with every figure under its column", () => {
    const csv = alphalistCsv(list, 1, { tin: "123-456-789", name: "Tallo Test Trading, Inc." }, 2025);
    const lines = csv.body.replace(/^﻿/, "").split("\r\n");
    const header = lines[10].split(",");
    expect(header).toHaveLength(30);
    expect(lines[11]).toBe(
      '1,"Dela Cruz, Juan, Santos",FILIPINO,R,03/15/2020,,NA,207500.50,40000.00,4000.00,10200.00,0.00,54200.00,0.00,0.00,153300.50,153300.50,111-222-333-0000,,,,153300.50,0.00,0.00,6700.60,0.00,0.00,6700.60,0.00,Y',
    );
    expect(lines[4]).toBe("TIN : 123-456-789-0000");
  });
});

describe("payroll worksheets", () => {
  const client: WorksheetContext["client"] = {
    id: "c", name: "Tallo Test Trading, Inc.", tin: "123-456-789-000", rdoCode: "074", registeredAddress: "Iloilo City",
    taxpayerType: "corporation", fiscalYearEndMonth: 12, vatRegistered: true,
  };
  const wctx = (form: string, start: string, end: string, payroll?: PayrollContext): WorksheetContext => ({
    client, filing: { id: "f", form, periodLabel: start.slice(0, 7), periodStart: start, periodEnd: end, dueDate: end },
    documents: [], inputs: {}, priorFigures: {}, payroll,
  });
  const [f1601c, f1604c] = PAYROLL_FORMS;

  it("cover 1601-C and 1604-C", () => {
    expect(PAYROLL_FORMS.flatMap((m) => m.forms)).toEqual(["1601-C", "1604-C"]);
  });

  it("say so when payroll is not loaded", () => {
    expect(f1601c.compute(wctx("1601-C", "2025-03-01", "2025-03-31")).errors).toEqual(["Payroll not loaded"]);
    expect(f1604c.compute(wctx("1604-C", "2025-01-01", "2025-12-31")).errors).toEqual(["Payroll not loaded"]);
  });

  it("1601-C for March: items 14–27 from the month's payroll", () => {
    const r = f1601c.compute(wctx("1601-C", "2025-03-01", "2025-03-31", fixtureContext()));
    const line = (k: string) => r.sections.flatMap((s) => s.lines).find((l) => l.key === k)?.amount;
    expect(r.errors).toEqual([]);
    expect(line("total_compensation")).toBe(P(43500.5 + 20750.75));
    expect(line("taxes_withheld")).toBe(P(2200.1));
    expect(line("total_amount_due")).toBe(P(2200.1));
    expect(r.schedules[0].rows).toHaveLength(2);
  });

  it("1604-C: alphalist totals, remittances per month and the DAT/CSV attachments", () => {
    const c = wctx("1604-C", "2025-01-01", "2025-12-31", fixtureContext());
    const r = f1604c.compute(c);
    expect(r.errors).toEqual([]);
    const line = (k: string) => r.sections.flatMap((s) => s.lines).find((l) => l.key === k)?.amount;
    expect(line("taxes_withheld")).toBe(P(6700.6));
    expect(line("gross_compensation")).toBe(P(245251.25));
    const files = f1604c.attachments!(c, r).map((a) => a.build());
    expect(files.map((f) => f.fileName)).toEqual(["1234567890000123120251604C.DAT", "1604C_Alphalist_2025_Schedule1.csv", "1604C_Alphalist_2025_Schedule2.csv"]);
  });

  it("1604-C blocks employees without a TIN", () => {
    const p = fixtureContext();
    p.employees = p.employees.map((e) => (e.id === "a" ? { ...e, tin: null } : e));
    expect(f1604c.compute(wctx("1604-C", "2025-01-01", "2025-12-31", p)).errors[0]).toMatch(/no TIN/);
  });
});

/** Item ids as a client might have them (items.ts DEFAULT_ITEMS plus a loan deduction and an inactive one). */
const ITEMS: PayrollItem[] = [
  ...DEFAULT_ITEMS.map((d, i) => ({ id: `i${i}`, name: d.name, kind: d.kind, category: d.category, sortOrder: i, active: true })),
  { id: "loan", name: "SSS Loan", kind: "deduction", category: "sss_loan", sortOrder: 99, active: true },
  { id: "hdmf-loan", name: "Pag-IBIG Loan", kind: "deduction", category: "hdmf_loan", sortOrder: 99, active: false },
  { id: "advance", name: "Cash Advance", kind: "deduction", category: "none_deduction", sortOrder: 99, active: false },
  { id: "old", name: "Old Allowance", kind: "earning", category: "other_taxable", sortOrder: 99, active: false },
];
const item = (name: string) => ITEMS.find((i) => i.name === name)!.id;

describe("payslip items", () => {
  it("total item amounts by BIR category", () => {
    const a = categoryTotals([[item("Basic Pay"), P(20000)], [item("Rice Allowance"), P(2000)], [item("Withholding Tax"), P(500)], [item("SSS (Employer)"), P(1000)]], ITEMS);
    expect(a).toMatchObject({ basic: P(20000), deMinimis: P(2000), taxWithheld: P(500), sssEmployer: P(1000) });
    expect(payTotals(a)).toEqual({ gross: P(22000), deductions: P(500), net: P(21500) });
  });

  it("an SSS loan payment or a 'none' deduction changes net pay but not tax", () => {
    const base: [string, number][] = [[item("Basic Pay"), P(40000)], [item("SSS (Employee)"), P(1350)], [item("Withholding Tax"), P(2000)]];
    const without = categoryTotals(base, ITEMS);
    const withLoan = categoryTotals([...base, [item("SSS Loan"), P(3000)]], ITEMS);
    expect(payTotals(withLoan).net).toBe(payTotals(without).net - P(3000));
    const months = (a: PayAmounts) => [a, ...Array(11).fill(null)];
    expect(computeEmployeeYear(months(withLoan), false, 2025)[0]).toEqual(computeEmployeeYear(months(without), false, 2025)[0]);
    const withAll = categoryTotals([...base, [item("SSS Loan"), P(3000)], [item("Pag-IBIG Loan"), P(1000)], [item("Cash Advance"), P(500)]], ITEMS);
    expect(payTotals(withAll).net).toBe(payTotals(without).net - P(4500));
    expect(computeEmployeeYear(months(withAll), false, 2025)[0]).toEqual(computeEmployeeYear(months(without), false, 2025)[0]);
  });

  it("reads SSS and Pag-IBIG loan payments as their own categories", () => {
    expect(itemFromRow({ id: "z", name: "SSS Loan", kind: "deduction", bir_category: "sss_loan", sort_order: 1, active: true }).category).toBe("sss_loan");
    expect(itemFromRow({ id: "w", name: "HDMF Loan", kind: "deduction", bir_category: "hdmf_loan", sort_order: 1, active: true }).category).toBe("hdmf_loan");
  });

  it("reads 'none' from the database by kind", () => {
    expect(itemFromRow({ id: "x", name: "HMO", kind: "employer_contribution", bir_category: "none", sort_order: 1, active: true }).category).toBe("none_employer");
    expect(itemFromRow({ id: "y", name: "Loan", kind: "deduction", bir_category: "none", sort_order: 1, active: true }).category).toBe("none_deduction");
  });

  it("orders register columns: earnings, deductions, employer contributions; active only", () => {
    expect(registerHeaders(ITEMS)).toEqual([
      ...ID_HEADERS,
      "Basic Pay", "Overtime Pay", "Holiday Pay", "Night Differential", "13th Month Pay", "Rice Allowance",
      "Withholding Tax", "SSS (Employee)", "PhilHealth (Employee)", "Pag-IBIG (Employee)", "SSS Loan",
      "SSS (Employer)", "PhilHealth (Employer)", "Pag-IBIG (Employer)",
      ...TOTAL_HEADERS,
    ]);
  });
});

describe("payroll register", () => {
  const juan = employee({ id: "a", employeeNo: "001" });
  const ana = employee({ id: "b", employeeNo: "002", lastName: "Abad", firstName: "Ana", middleName: null, tin: "222-333-444" });
  const row = (line: number, over: Partial<RegisterRow>): RegisterRow => ({
    line, employeeNo: "", name: "", tin: "", payDate: "", amounts: {}, totals: { gross: null, deductions: null, net: null }, ...over,
  });
  const B = item("Basic Pay");
  const W = item("Withholding Tax");

  it("matches by Employee No., adds semi-monthly rows, and lists new employees", () => {
    const r = checkRegister(
      [
        row(3, { employeeNo: "001", payDate: "2026-01-15", amounts: { [B]: "20,000", [W]: "500" }, totals: { gross: "20000", deductions: "500", net: "19500" } }),
        row(4, { employeeNo: "001", payDate: "2026-01-31", amounts: { [B]: "20000.50" } }),
        row(5, { employeeNo: "002", name: "Abad, Ana" }), // not paid this month
        row(6, { name: "Abad, Ana", amounts: { [B]: "1000" } }), // number blank: matched by the dropdown name
        row(7, { employeeNo: "009", name: "Reyes, Pedro, Cruz", tin: "333444555", amounts: { [B]: "15000" } }),
        row(8, { employeeNo: "001", amounts: { [item("Old Allowance")]: "-200" } }), // inactive item still read; earnings may be negative
      ],
      [juan, ana],
      ITEMS,
      "2026-01-01",
    );
    expect(r.errors).toEqual([]);
    expect(r.entries.get("a")!.get(B)).toBe(P(40000.5));
    expect(r.entries.get("a")!.get(W)).toBe(P(500));
    expect(r.entries.get("a")!.get("old")).toBe(P(-200));
    expect(r.linesByEmployee.get("a")).toEqual([3, 4, 8]);
    expect(r.entries.get("b")!.get(B)).toBe(P(1000));
    expect(r.newEmployees).toEqual([
      { key: "no:009", employeeNo: "009", lastName: "Reyes", firstName: "Pedro", middleName: "Cruz", tin: "333-444-555", rows: [7], lines: new Map([[B, P(15000)]]) },
    ]);
    expect(r.rowCount).toBe(5);
  });

  it("reports bad numbers, overwritten totals, dates outside the month and unknown people by row", () => {
    const r = checkRegister(
      [
        row(3, { employeeNo: "001", amounts: { [B]: "abc", [W]: "-5" } }),
        row(4, { employeeNo: "001", amounts: { [B]: "1000" }, totals: { gross: "1200", deductions: null, net: null } }),
        row(5, { employeeNo: "001", payDate: "2026-02-01", amounts: { [B]: "1000" } }),
        row(6, { employeeNo: "777", name: "Nobody", amounts: { [B]: "1" } }),
        row(7, { employeeNo: "001", tin: "999-999-999", amounts: { [B]: "1" } }),
      ],
      [juan, ana],
      ITEMS,
      "2026-01-01",
    );
    expect(r.errors.map((e) => [e.line, e.message])).toEqual([
      [3, "Basic Pay: “abc” is not an amount"],
      [3, "Withholding Tax cannot be negative"],
      [4, "Gross Pay shows 1,200.00 but the amounts add up to 1,000.00; do not type over the computed columns"],
      [5, "Pay Date 2026-02-01 is not in 2026-01"],
      [6, "Employee No. 777 is not on the employee list; to add them, write the name as “Last, First Middle”"],
      [7, "TIN 999-999-999 does not match Dela Cruz, Juan Santos's TIN 111-222-333"],
    ]);
    expect(r.entries.size).toBe(0);
  });

  it("round-trips through the Excel template, with columns in any order", async () => {
    const existing = new Map([["a", new Map([[B, P(1000)]])]]);
    const buf = await buildRegisterTemplate({ clientName: "Client A", month: "2026-01-01", employees: [juan, ana], items: ITEMS, existing });
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buf as unknown as ExcelJS.Buffer);
    expect(wb.worksheets.map((w) => w.name)).toEqual(["Instructions", REGISTER_SHEET, "Employees", "Withholding Tax Calculator"]);
    const ws = wb.getWorksheet(REGISTER_SHEET)!;
    expect(ws.getCell("A3").value).toBe("001");
    expect(ws.getCell("B4").value).toBe("Abad, Ana");
    expect(ws.getCell("E1").value).toBe("EARNINGS");
    expect(ws.getCell("K1").value).toBe("DEDUCTIONS");
    expect(ws.getCell("P1").value).toBe("EMPLOYER CONTRIBUTIONS");
    expect(ws.getCell("S1").value).toBe("TOTALS (FOR VALIDATION)");
    expect(ws.getCell("S3").value).toEqual({ formula: "SUM(E3:J3)" });
    expect(ws.getCell("T3").value).toEqual({ formula: "SUM(K3:O3)" });
    expect(ws.getCell("B4").dataValidation?.formulae).toEqual(["'Employees'!$B$2:$B$3"]);
    ws.getCell("E4").value = 12000; // Ana's basic pay
    ws.getCell("K4").value = 150.5; // withholding tax
    ws.getCell("O4").value = 1000; // SSS loan
    // Swap two columns: still read by header.
    for (let r = 2; r <= 4; r++) {
      const [x, y] = [ws.getCell(`F${r}`).value, ws.getCell(`G${r}`).value];
      ws.getCell(`F${r}`).value = y;
      ws.getCell(`G${r}`).value = x;
    }
    ws.getCell("G4").value = 300; // now "Overtime Pay"
    const read = await readRegister((await wb.xlsx.writeBuffer()) as ArrayBuffer, ITEMS);
    if (!("rows" in read)) throw new Error(read.error);
    const checked = checkRegister(read.rows, [juan, ana], ITEMS, "2026-01-01");
    expect(checked.errors).toEqual([]);
    expect(checked.entries.get("a")!.get(B)).toBe(P(1000));
    expect(Object.fromEntries(checked.entries.get("b")!)).toEqual({ [B]: P(12000), [W]: P(150.5), loan: P(1000), [item("Overtime Pay")]: P(300) });

    ws.getCell("S4").value = 99; // typed over the gross pay formula
    const tampered = await readRegister((await wb.xlsx.writeBuffer()) as ArrayBuffer, ITEMS);
    if (!("rows" in tampered)) throw new Error("unreadable");
    expect(checkRegister(tampered.rows, [juan, ana], ITEMS, "2026-01-01").errors[0]).toEqual({ line: 4, message: "Gross Pay shows 99.00 but the amounts add up to 12,300.00; do not type over the computed columns" });

    ws.getCell("F2").value = "Bonus";
    expect(await readRegister((await wb.xlsx.writeBuffer()) as ArrayBuffer, ITEMS)).toEqual({
      error: "Unknown column: “Bonus” (column F). Each column must be one of this business's payslip items; ask staff to add the item, or download a fresh template.",
    });
  });

  it("refuses a workbook without the identifying columns", async () => {
    const wb = new ExcelJS.Workbook();
    wb.addWorksheet(REGISTER_SHEET).getRow(2).values = ["Basic Pay"];
    expect(await readRegister((await wb.xlsx.writeBuffer()) as ArrayBuffer, ITEMS)).toEqual({
      error: "The “Employee No.” and “Employee Name (Last, First Middle)” columns are missing. Download a fresh template.",
    });
  });
});

describe("employee master", () => {
  const juan = employee({ id: "a", employeeNo: "001" });
  it("round-trips the template and decides add vs update, with row-numbered errors", async () => {
    const buf = await buildEmployeeTemplate("Client A", [juan]);
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buf as unknown as ExcelJS.Buffer);
    const ws = wb.getWorksheet(EMPLOYEE_SHEET)!;
    expect(ws.getCell("K2").value).toBe("R - Regular");
    expect(ws.getCell("I3").dataValidation?.type).toBe("list");
    ws.getRow(2).getCell(7).value = "Iloilo City";
    ws.getRow(3).values = ["002", "Abad", "Ana", "", "222-333-444", "1990-05-01", "", "", "Region VI", "", "C - Casual", "Y", 450, "2026-01-05", "", "", "Y"];
    ws.getRow(4).values = ["003", "Cruz", "Ben", "", "12345", "", "", "", "", "", "", "Y", "", "", "2026-02-01", "", ""];
    const read = await readEmployeeFile((await wb.xlsx.writeBuffer()) as ArrayBuffer);
    if (!("rows" in read)) throw new Error(read.error);
    const c = checkEmployeeImport(read.rows, [juan]);
    expect(c.updates.map((u) => [u.line, u.id, u.data.address])).toEqual([[2, "a", "Iloilo City"]]);
    expect(c.creates.map((u) => [u.line, u.data.employment_status, u.data.is_mwe, u.data.mwe_daily_rate, u.data.region])).toEqual([[3, "C", true, 450, "Region VI"]]);
    expect(c.errors.map((e) => e.line)).toEqual([4, 4, 4, 4]);
    expect(c.errors.map((e) => e.message)).toContain("TIN (123-456-789): Use the format 123-456-789 (branch optional).");
  });
});

describe("saving a month", () => {
  it("works out taxable compensation against the earlier months' 13th month pay", () => {
    const e = employee({ id: "a" });
    const earlier = [entry("a", 6, 2025, { basic: 30000, thirteenthMonth: 80000 })];
    const [p] = monthPayload(2025, 11, [e], ITEMS, earlier, new Map([["a", { lines: new Map([[item("Basic Pay"), P(30000)], [item("13th Month Pay"), P(30000)], [item("Withholding Tax"), P(10)]]), adjustment: P(-5), note: null }]]));
    expect(p).toMatchObject({ employee_id: "a", taxable_compensation: "50000.00", adjustment: "-5.00" });
    expect(p.lines).toEqual([
      { item_id: item("Basic Pay"), amount: "30000.00" },
      { item_id: item("13th Month Pay"), amount: "30000.00" },
      { item_id: item("Withholding Tax"), amount: "10.00" },
    ]);
  });

  it("adds up pay-period entries of a month and converts pesos to centavos", () => {
    const stored = storedMonthsFromRows([
      { employee_id: "a", pay_month: "2025-01-01", adjustment: "0", note: "1st half", payroll_entry_lines: [{ item_id: item("Basic Pay"), amount: "10000.25" }] },
      { employee_id: "a", pay_month: "2025-01-01", adjustment: "-1.5", note: null, payroll_entry_lines: [{ item_id: item("Basic Pay"), amount: "10000" }, { item_id: "loan", amount: "500" }] },
    ]);
    expect(stored).toHaveLength(1);
    expect(stored[0].lines.get(item("Basic Pay"))).toBe(P(20000.25));
    const [e] = toEntries(stored, ITEMS);
    expect(e).toMatchObject({ basic: P(20000.25), otherDeductions: P(500), adjustment: P(-1.5), note: "1st half" });
    expect(sameMonth(stored[0], { lines: new Map(stored[0].lines), adjustment: P(-1.5), note: "1st half" })).toBe(true);
  });
});
