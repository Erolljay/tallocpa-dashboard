import { describe, expect, it } from "vitest";
import { financialPosition, monthlySeries, monthsBack, seriesMax, streamProgress, todoList } from "./home";

describe("monthsBack", () => {
  it("steps back across a year end", () => {
    expect(monthsBack("2026-11-15", 0)).toBe("2026-11-01");
    expect(monthsBack("2026-11-01", 5)).toBe("2026-06-01");
    expect(monthsBack("2026-02-01", 3)).toBe("2025-11-01");
  });
});

describe("financialPosition", () => {
  it("adds cash and bank, takes AR and AP by control, and equity as assets less liabilities", () => {
    const p = financialPosition({
      balances: [
        { type: "asset", control: "cash", debit: "5000.00", credit: "1000.00" },
        { type: "asset", control: "bank", debit: 20000, credit: 0 },
        { type: "asset", control: "ar", debit: "10000.00", credit: "4000.00" },
        { type: "asset", control: null, debit: "50000.00", credit: "0" },
        { type: "liability", control: "ap", debit: "500.00", credit: "3000.00" },
        { type: "liability", control: "output_vat", debit: 0, credit: "1200.00" },
        { type: "equity", control: "capital", debit: 0, credit: "70000.00" },
        { type: "revenue", control: null, debit: 0, credit: "10000.00" },
      ],
    });
    expect(p).toEqual({ cash: 2_400_000, receivables: 600_000, payables: 250_000, assets: 8_000_000, liabilities: 370_000, equity: 7_630_000 });
  });

  it("is all zero with no books", () => {
    expect(financialPosition({ balances: [] })).toEqual({ cash: 0, receivables: 0, payables: 0, assets: 0, liabilities: 0, equity: 0 });
  });
});

describe("monthlySeries", () => {
  const raw = {
    months: [
      { month: "2026-06-01", type: "revenue", debit: 0, credit: "1000.00" },
      { month: "2026-08-01", type: "revenue", debit: "100.00", credit: "12000.00" },
      { month: "2026-08-01", type: "other_income", debit: 0, credit: "50.00" },
      { month: "2026-08-01", type: "cost", debit: "4000.00", credit: 0 },
      { month: "2026-08-01", type: "expense", debit: "3000.50", credit: "0.50" },
      { month: "2026-11-01", type: "income_tax", debit: "200.00", credit: 0 },
      { month: "2026-11-01", type: "asset", debit: "999.00", credit: 0 },
    ],
    locked: ["2026-07-01", "2026-08-01"],
  };

  it("gives six months oldest first, filling empty months with zero", () => {
    const s = monthlySeries(raw, "2026-11-01");
    expect(s.map((p) => p.month)).toEqual(["2026-06-01", "2026-07-01", "2026-08-01", "2026-09-01", "2026-10-01", "2026-11-01"]);
    expect(s[1]).toEqual({ month: "2026-07-01", revenue: 0, expenses: 0, net: 0, locked: true });
  });

  it("nets revenue with other income against cost, expenses and income tax; ignores months outside and balance-sheet types", () => {
    const s = monthlySeries(raw, "2026-11-01");
    expect(s[0]).toMatchObject({ revenue: 100_000, expenses: 0, net: 100_000, locked: false });
    expect(s[2]).toEqual({ month: "2026-08-01", revenue: 1_195_000, expenses: 700_000, net: 495_000, locked: true });
    expect(s[5]).toMatchObject({ revenue: 0, expenses: 20_000, net: -20_000 });
    expect(monthlySeries(raw, "2026-07-01", 2).map((p) => p.revenue)).toEqual([100_000, 0]);
  });

  it("scales against the largest bar", () => {
    expect(seriesMax(monthlySeries(raw, "2026-11-01"))).toBe(1_195_000);
    expect(seriesMax([])).toBe(1);
  });
});

describe("streamProgress", () => {
  it("counts received and approved documents per stream, with payroll registers under Payroll", () => {
    const s = streamProgress(
      [
        { doc_type: "sales_invoice", status: "posted" },
        { doc_type: "sales_invoice", status: "received" },
        { doc_type: "bir_2307_received", status: "posted" },
        { doc_type: "purchase_receipt", status: "returned" },
        { doc_type: "other", status: "uploading" },
        { doc_type: "filed_return", status: "posted" },
      ],
      [{ status: "posted" }, { status: "pending" }],
    );
    expect(s).toEqual([
      { stream: "sales", label: "Sales", received: 3, approved: 2, returned: 0 },
      { stream: "purchases", label: "Purchases & Expenses", received: 1, approved: 0, returned: 1 },
      { stream: "payroll", label: "Payroll", received: 2, approved: 1, returned: 0 },
      { stream: "other", label: "Other", received: 0, approved: 0, returned: 0 },
    ]);
  });
});

describe("todoList", () => {
  it("puts returned documents first, then approvals, requests, dues and missing 2307s", () => {
    const t = todoList({
      returnedDocuments: 2,
      returnsToApprove: [{ id: "f1", form: "2550Q", periodLabel: "Q3 2026", dueDate: "Oct 25" }],
      requests: [{ id: "r1", subject: "Send the October bank statement" }],
      dues: 150_000,
      duesLabel: "₱1,500.00 open",
      missing2307: [{ party: "Bacolod Feeds", amount: 20_000 }],
    });
    expect(t.map((x) => x.key)).toEqual(["returned", "return-f1", "request-r1", "dues", "2307-Bacolod Feeds"]);
    expect(t[0]).toMatchObject({ title: "2 documents were returned to you", tone: "blocked" });
    expect(t[2].href).toBe("/portal/requests/r1");
  });

  it("is empty when nothing waits on the client", () => {
    expect(todoList({ returnedDocuments: 0, returnsToApprove: [], requests: [], dues: 0, missing2307: [] })).toEqual([]);
  });
});
