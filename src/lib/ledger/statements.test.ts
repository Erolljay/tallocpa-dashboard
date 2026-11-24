import { describe, expect, it } from "vitest";
import { buildStatements, periodTitle, reportPeriod, taxableYearStart, type StatementRow } from "./statements";

const P = (pesos: number) => Math.round(pesos * 100);
/** A trial balance row; pesos, debit positive. `move` is debit − credit within the range. */
const row = (code: string, name: string, fsLine: string, opening: number, move: number): StatementRow => ({
  code, name, fsLine, opening: P(opening), debit: P(Math.max(move, 0)), credit: P(Math.max(-move, 0)), closing: P(opening + move),
});
const client = { name: "Client A Corp.", tin: "123-456-789-000", address: "Iloilo City" };
const amount = (s: { lines: { label: string; kind: string; amounts: (number | null)[] }[] }, label: string) => s.lines.find((l) => l.label === label && l.kind !== "heading")?.amounts;

describe("report periods", () => {
  it("monthly, quarterly and annual periods follow the taxable year", () => {
    expect(reportPeriod("monthly", "2027-02", 12)).toEqual({ start: "2027-02-01", end: "2027-02-28", yearStart: "2027-01-01" });
    expect(reportPeriod("quarterly", "2027-03", 12)).toEqual({ start: "2027-01-01", end: "2027-03-31", yearStart: "2027-01-01" });
    expect(reportPeriod("quarterly", "2027-02", 12)).toHaveProperty("error");
    expect(reportPeriod("annual", "2027-12", 12)).toEqual({ start: "2027-01-01", end: "2027-12-31", yearStart: "2027-01-01" });
    expect(reportPeriod("annual", "2027-11", 12)).toHaveProperty("error");
    // Fiscal year ending June.
    expect(reportPeriod("quarterly", "2027-09", 6)).toEqual({ start: "2027-07-01", end: "2027-09-30", yearStart: "2027-07-01" });
    expect(reportPeriod("annual", "2027-06", 6)).toEqual({ start: "2026-07-01", end: "2027-06-30", yearStart: "2026-07-01" });
    expect(taxableYearStart("2027-03-15", 6)).toBe("2026-07-01");
    expect(periodTitle("quarterly", "2027-03-31")).toBe("For the quarter ended March 31, 2027");
  });
});

describe("buildStatements", () => {
  // Opening (31 Dec 2026): cash 100,000 / capital 100,000. January to March 2027 (year to date):
  // sales 50,000 (30,000 on account), cost 20,000, salaries 10,000, rent 5,000, bank interest 1,000 (final tax),
  // a loan of 40,000, provision for income tax 3,000 payable.
  const year: StatementRow[] = [
    row("1010", "Cash on Hand", "cash_and_equivalents", 100_000, 20_000 - 20_000 - 10_000 - 5_000 + 1_000 + 40_000),
    row("1100", "Accounts Receivable", "receivables", 0, 30_000),
    row("2010", "Accounts Payable", "accounts_payable", 0, 0),
    row("2070", "Income Tax Payable", "income_tax_payable", 0, -3_000),
    row("2200", "Loans Payable", "loans_payable_noncurrent", 0, -40_000),
    row("3010", "Share Capital", "share_capital", -100_000, 0),
    row("4010", "Sales", "revenue", 0, -50_000),
    row("5010", "Cost of Sales", "cost_of_sales", 0, 20_000),
    row("6010", "Salaries", "operating_expenses", 0, 10_000),
    row("6040", "Rent", "operating_expenses", 0, 5_000),
    row("4110", "Interest Income", "other_income", 0, -1_000),
    row("8010", "Provision for Income Tax", "income_tax_expense", 0, 3_000),
  ];
  const march: StatementRow[] = [
    row("4010", "Sales", "revenue", -30_000, -20_000),
    row("5010", "Cost of Sales", "cost_of_sales", 12_000, 8_000),
    row("6010", "Salaries", "operating_expenses", 6_000, 4_000),
  ];

  it("lays out the year to date: income statement, financial position and changes in equity that tie", () => {
    const fs = buildStatements({ kind: "quarterly", periodStart: "2027-01-01", periodEnd: "2027-03-31", yearStart: "2027-01-01", client, year });
    expect(fs.difference).toBe(0);
    expect(fs.unclassified).toEqual([]);
    expect(fs.income.columns).toEqual(["Year to date"]);
    expect(amount(fs.income, "Revenues")).toEqual([P(50_000)]);
    expect(amount(fs.income, "Gross profit")).toEqual([P(30_000)]);
    expect(amount(fs.income, "Operating expenses")).toEqual([P(15_000)]);
    expect(amount(fs.income, "Income (loss) from operations")).toEqual([P(15_000)]);
    expect(amount(fs.income, "Income (loss) before income tax")).toEqual([P(16_000)]);
    expect(amount(fs.income, "NET INCOME (LOSS)")).toEqual([P(13_000)]);

    expect(amount(fs.position, "Cash and cash equivalents")).toEqual([P(126_000)]);
    expect(amount(fs.position, "TOTAL ASSETS")).toEqual([P(156_000)]);
    expect(amount(fs.position, "Total liabilities")).toEqual([P(43_000)]);
    expect(amount(fs.position, "Net income (loss) for the year to date")).toEqual([P(13_000)]);
    expect(amount(fs.position, "Total equity")).toEqual([P(113_000)]);
    expect(amount(fs.position, "TOTAL LIABILITIES AND EQUITY")).toEqual([P(156_000)]);
    // An empty account (AP) is left off.
    expect(amount(fs.position, "Trade and other payables")).toBeUndefined();

    expect(amount(fs.equity, "Balance at January 1, 2027")).toEqual([P(100_000)]);
    expect(amount(fs.equity, "Balance at March 31, 2027")).toEqual([P(113_000)]);
  });

  it("numbers the notes in the order the lines appear and lists the accounts behind them", () => {
    const fs = buildStatements({ kind: "quarterly", periodStart: "2027-01-01", periodEnd: "2027-03-31", yearStart: "2027-01-01", client, year });
    expect(fs.notes.map((n) => n.title)).toEqual([
      "Cash and cash equivalents", "Trade and other receivables", "Income tax payable", "Loans payable", "Equity", "Revenues", "Cost of sales", "Operating expenses",
    ]);
    const opex = fs.notes.find((n) => n.title === "Operating expenses")!;
    expect(opex.rows).toEqual([{ label: "6010 Salaries", amounts: [P(10_000)] }, { label: "6040 Rent", amounts: [P(5_000)] }]);
    expect(opex.total).toEqual([P(15_000)]);
    expect(fs.position.lines.find((l) => l.label === "Revenues")).toBeUndefined();
    expect(fs.income.lines.find((l) => l.label === "Operating expenses" && l.kind === "line")?.note).toBe(8);
  });

  it("shows the month beside the year to date", () => {
    const fs = buildStatements({ kind: "monthly", periodStart: "2027-03-01", periodEnd: "2027-03-31", yearStart: "2027-01-01", client, year, period: march });
    expect(fs.income.columns).toEqual(["March 2027", "Year to date"]);
    expect(amount(fs.income, "Revenues")).toEqual([P(20_000), P(50_000)]);
    expect(amount(fs.income, "Operating expenses")).toEqual([P(4_000), P(15_000)]);
    expect(amount(fs.income, "NET INCOME (LOSS)")).toEqual([P(8_000), P(13_000)]);
  });

  it("carries income of earlier years not closed into equity, and reports unknown FS lines", () => {
    const rows = [
      row("1010", "Cash", "cash_and_equivalents", 120_000, 5_000),
      row("3010", "Owner's Capital", "owners_capital", -100_000, 0),
      row("3020", "Drawings", "owners_drawings", 0, 2_000),
      row("4010", "Service Income", "revenue", -20_000, -8_000),
      row("6999", "Sundry", "not_a_line", 0, 1_000),
    ];
    const fs = buildStatements({ kind: "annual", periodStart: "2028-01-01", periodEnd: "2028-12-31", yearStart: "2028-01-01", client, year: rows });
    expect(fs.difference).toBe(0);
    expect(fs.unclassified).toEqual(["6999 Sundry"]);
    expect(fs.income.columns).toEqual(["Year ended December 31, 2028"]);
    expect(amount(fs.position, "Income of prior years not yet closed")).toEqual([P(20_000)]);
    expect(amount(fs.position, "Owner's drawings")).toEqual([P(-2_000)]);
    expect(amount(fs.position, "Net income (loss) for the year to date")).toEqual([P(7_000)]);
    expect(amount(fs.equity, "Balance at January 1, 2028")).toEqual([P(120_000)]);
    expect(amount(fs.equity, "Owner's drawings: movement")).toEqual([P(-2_000)]);
    expect(amount(fs.equity, "Balance at December 31, 2028")).toEqual([P(125_000)]);
  });
});
