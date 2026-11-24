import { describe, expect, it } from "vitest";
import { form1701, form1702RT } from "./annual";
import { amounts, cert2307, ctxFor, mv, purchase, sale } from "./testing";

const year = { periodStart: "2026-01-01", periodEnd: "2026-12-31" };
const books = (period: ReturnType<typeof mv>[]) => ({ booksStart: "2026-01-01", period, earlier: [], suggested: 0 });

describe("1702-RT", () => {
  const corp = { vatRegistered: true };
  const fromBooks = [
    mv("sales", -10_000_000),
    mv("cost_of_sales", 6_000_000, "cost"),
    mv("other_taxable_income", -100_000, "other_income"),
    mv("final_tax_income", -5_000, "other_income"),
    mv("ded_salaries", 2_000_000),
    mv("ded_rental", 600_000),
    mv("nondeductible", 50_000),
  ];

  it("itemized from the books: the year's income, deductions by BIR line, quarterly payments carried in, CWT for the year", () => {
    const r = form1702RT.compute(
      ctxFor({
        form: "1702-RT",
        ...year,
        client: corp,
        inputs: { deduction: "itemized", corporate_rate: "regular", year_operations_commenced: "2015", prior_year_excess_credit: "1000" },
        ledger: books(fromBooks),
        priorFigures: { "1702Q": { regular_payments_to_date: 250_000_00, mcit_payments_to_date: 10_000_00 } },
        documents: [cert2307({ month: "2026-06", atc: "WC158", total: 1_000_000, withholding: 20_000, partyName: "Top WA", partyTin: "555-555-555" })],
      }),
    );
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({
      sales: 10_000_000,
      cost_of_sales: 6_000_000,
      gross_income_operations: 4_000_000,
      non_operating_income: 100_000,
      total_gross_income: 4_100_000,
      deductions: 2_600_000,
      nolco: 0,
      taxable_income: 1_500_000,
      regular_income_tax: 375_000,
      mcit: 82_000,
      income_tax_due: 375_000,
      quarterly_payments: 260_000,
      cwt_year: 20_000,
      total_credits: 281_000,
      tax_payable: 94_000,
      total_amount_payable: 94_000,
    });
    const titles = r.schedules.map((s) => s.title);
    expect(titles).toContain("Schedule of ordinary allowable itemized deductions (from the books)");
    const rec = r.schedules.find((s) => s.title.startsWith("Reconciliation"))!;
    expect(rec.rows.map((x) => x.amount)).toEqual([1_455_000_00, 50_000_00, -5_000_00, 1_500_000_00, 1_500_000_00, 0]);
  });

  it("OSD at 40% of gross income, MCIT when higher, NOLCO not allowed under OSD", () => {
    const r = form1702RT.compute(
      ctxFor({
        form: "1702-RT",
        ...year,
        client: corp,
        inputs: { deduction: "osd", corporate_rate: "regular", year_operations_commenced: "2015", nolco: "5000", quarterly_payments: "0" },
        ledger: books([mv("sales", -1_000_000), mv("cost_of_sales", 950_000, "cost")]),
        documents: [],
      }),
    );
    expect(amounts(r)).toMatchObject({ total_gross_income: 50_000, deductions: 20_000, nolco: 0, taxable_income: 30_000, regular_income_tax: 7_500, mcit: 1_000, income_tax_due: 7_500 });
    expect(r.warnings.join(" ")).toMatch(/NOLCO cannot be deducted under OSD/);
  });

  it("from documents when there are no books, and warns when the quarterly payments are missing", () => {
    const r = form1702RT.compute(
      ctxFor({
        form: "1702-RT",
        ...year,
        client: corp,
        inputs: { deduction: "itemized", corporate_rate: "regular", year_operations_commenced: "2015", cost_of_sales: "100000" },
        documents: [sale({ month: "2026-03", vatable: 500_000, vat: 60_000, total: 560_000 }), purchase({ month: "2026-09", vatable: 300_000, vat: 36_000, total: 336_000 })],
      }),
    );
    expect(amounts(r)).toMatchObject({ sales: 500_000, cost_of_sales: 100_000, deductions: 200_000, taxable_income: 200_000 });
    expect(r.warnings.join(" ")).toMatch(/first three quarters was not found/);
    expect(r.warnings.join(" ")).toMatch(/rough proxy/);
  });
});

describe("1701 / 1701A", () => {
  const individual = { taxpayerType: "individual" as const };

  it("graduated + itemized from the books, with compensation income and the tax withheld on it", () => {
    const r = form1701.compute(
      ctxFor({
        form: "1701",
        ...year,
        client: individual,
        inputs: { regime: "graduated_itemized", compensation_income: "300000", compensation_tax_withheld: "5000" },
        ledger: books([mv("sales", -1_200_000), mv("cost_of_sales", 400_000, "cost"), mv("ded_rental", 200_000)]),
        priorFigures: { "1701Q": { tax_payments_to_date: 30_000_00 } },
        documents: [],
      }),
    );
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({ gross_income: 800_000, itemized_deductions: 200_000, net_business_income: 600_000, taxable_income: 900_000, quarterly_payments: 30_000, compensation_tax_withheld: 5_000 });
  });

  it("8% for the purely self-employed less ₱250,000; 1701A refuses compensation income", () => {
    const ctx = (form: string, inputs: Record<string, string>) =>
      ctxFor({ form, ...year, client: individual, inputs, ledger: books([mv("sales", -1_000_000)]), priorFigures: { "1701Q": { tax_payments_to_date: 0 } }, documents: [] });
    const r = form1701.compute(ctx("1701A", { regime: "8pct" }));
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({ total_income: 1_000_000, allowable_reduction: 250_000, taxable_income: 750_000, tax_8pct: 60_000, tax_due: 60_000 });
    expect(form1701.compute(ctx("1701A", { regime: "8pct", compensation_income: "100000" })).errors.join(" ")).toMatch(/file 1701/);
    expect(form1701.compute(ctx("1701A", { regime: "graduated_itemized" })).errors.join(" ")).toMatch(/OSD or 8% only/);
  });

  it("refuses the wrong taxpayer type", () => {
    expect(form1701.compute(ctxFor({ form: "1701", ...year, documents: [], inputs: { regime: "8pct" } })).errors.join(" ")).toMatch(/for individuals/);
    expect(form1702RT.compute(ctxFor({ form: "1702-RT", ...year, client: individual, documents: [] })).errors.join(" ")).toMatch(/1701 or 1701A/);
  });
});
