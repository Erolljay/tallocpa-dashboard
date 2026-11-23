import { describe, expect, it } from "vitest";
import { form1701Q, form1702Q } from "./income";
import { amounts, cert2307, ctxFor, lineNo, purchase, sale } from "./testing";

const individual = { taxpayerType: "individual" as const, name: "Juan Dela Cruz", tin: "123-456-789-000" };
const q = (n: number, year = 2026) => {
  const sm = (n - 1) * 3 + 1;
  const end = { 1: "03-31", 2: "06-30", 3: "09-30", 4: "12-31" }[n]!;
  return { periodStart: `${year}-${String(sm).padStart(2, "0")}-01`, periodEnd: `${year}-${end}` };
};

describe("1701Q", () => {
  it("graduated + OSD: 40% of gross sales, cumulative with previous quarters, less creditable tax withheld", () => {
    const ctx = ctxFor({
      form: "1701Q",
      ...q(2),
      client: individual,
      inputs: { regime: "graduated_osd" },
      priorFigures: { "1701Q": { tax_payments_to_date: 0, taxable_income_to_date: 18_000_000 } },
      documents: [
        sale({ month: "2026-02", total: 300_000 }),
        purchase({ month: "2026-02", total: 999_999 }), // ignored under OSD
        cert2307({ month: "2026-03", atc: "WI010", total: 300_000, withholding: 15_000, partyName: "Client A", partyTin: "111-111-111" }),
        sale({ month: "2026-05", total: 500_000 }),
        cert2307({ month: "2026-06", atc: "WI010", total: 500_000, withholding: 25_000, partyName: "Client A", partyTin: "111-111-111" }),
        sale({ month: "2025-12", total: 1_000_000 }), // previous taxable year
      ],
    });
    const r = form1701Q.compute(ctx);
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({
      sales: 500_000,
      cost_of_sales: 0,
      gross_income: 500_000,
      osd: 200_000,
      net_income_quarter: 300_000,
      previous_quarters_income: 180_000,
      non_operating_income: 0,
      gpp_share: 0,
      taxable_income_to_date: 480_000,
      tax_due_graduated: 38_500, // 22,500 + 20% × 80,000 (2023+ table)
      prior_year_excess_credit: 0,
      prior_tax_payments: 0,
      cwt_previous_quarters: 15_000,
      cwt_this_quarter: 25_000,
      total_credits: 40_000,
      tax_due: 38_500,
      less_credits: 40_000,
      tax_payable: -1_500,
      total_penalties: 0,
      total_amount_payable: -1_500,
      tax_payments_to_date: 0,
    });
    expect(lineNo(r, "osd")).toBe("40");
    expect(r.warnings.some((w) => w.includes("rough proxy"))).toBe(false);
    expect(r.warnings.some((w) => w.includes("differs from the previous quarter"))).toBe(false);
  });

  it("graduated + itemized: receipts less typed cost of sales as deductions, with the proxy warning", () => {
    const ctx = ctxFor({
      form: "1701Q",
      ...q(1),
      client: individual,
      inputs: { regime: "graduated_itemized", cost_of_sales: "300000", non_operating_income: "10000", prior_year_excess_credit: "1000", other_credits: "500", compromise: "1000" },
      documents: [sale({ month: "2026-01", total: 1_000_000 }), purchase({ month: "2026-02", total: 400_000 }), purchase({ month: "2026-03", vatable: 178_571.43, vat: 21_428.57, total: 200_000 })],
    });
    const r = form1701Q.compute(ctx);
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({
      sales: 1_000_000,
      cost_of_sales: 300_000,
      gross_income: 700_000,
      itemized_deductions: 300_000, // non-VAT client: receipts at their full amount
      net_income_quarter: 400_000,
      previous_quarters_income: 0,
      non_operating_income: 10_000,
      taxable_income_to_date: 410_000,
      tax_due_graduated: 24_500,
      total_credits: 1_500,
      tax_payable: 23_000,
      total_penalties: 1_000,
      add_penalties: 1_000,
      total_amount_payable: 24_000,
      tax_payments_to_date: 23_000,
      non_operating_income_to_date: 10_000,
      cost_of_sales_to_date: 300_000,
    });
    expect(lineNo(r, "itemized_deductions")).toBe("39");
    expect(r.warnings.some((w) => w.includes("rough proxy until the Phase 1B ledger"))).toBe(true);
  });

  it("uses the TRAIN 2018–2022 table for 2022", () => {
    const ctx = ctxFor({ form: "1701Q", ...q(1, 2022), client: individual, inputs: { regime: "graduated_osd" }, documents: [sale({ month: "2022-01", total: 833_333.33 })] });
    // 833,333.33 × 60% = 499,999.998 → 500,000.00 taxable; 30,000 + 25% × 100,000
    expect(amounts(form1701Q.compute(ctx))).toMatchObject({ taxable_income_to_date: 500_000, tax_due_graduated: 55_000 });
  });

  it("8%: cumulative gross sales less ₱250,000 for the purely self-employed", () => {
    const docs = [sale({ month: "2026-01", total: 150_000 }), sale({ month: "2026-04", total: 250_000 }), sale({ month: "2026-08", total: 300_000 })];
    const base = { form: "1701Q", ...q(3), client: individual, documents: docs, priorFigures: { "1701Q": { tax_payments_to_date: 0 } } };
    const r = form1701Q.compute(ctxFor({ ...base, inputs: { regime: "8pct", has_compensation_income: "no" } }));
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({
      sales: 300_000,
      non_operating_income: 0,
      total_income_quarter: 300_000,
      previous_quarters_income: 400_000,
      cumulative_income: 700_000,
      allowable_reduction: 250_000,
      taxable_income_to_date: 450_000,
      tax_due_8pct: 36_000,
      tax_due: 36_000,
      tax_payable: 36_000,
    });
    expect(lineNo(r, "tax_due_8pct")).toBe("54");

    const mixed = form1701Q.compute(ctxFor({ ...base, inputs: { regime: "8pct", has_compensation_income: "yes" } }));
    expect(amounts(mixed)).toMatchObject({ allowable_reduction: 0, taxable_income_to_date: 700_000, tax_due_8pct: 56_000 });

    const unanswered = form1701Q.compute(ctxFor({ ...base, inputs: { regime: "8pct" } }));
    expect(amounts(unanswered).allowable_reduction).toBe(250_000);
    expect(unanswered.warnings.some((w) => w.includes("purely self-employed"))).toBe(true);
  });

  it("8% is refused for a VAT-registered individual and flagged past ₱3M", () => {
    const ctx = ctxFor({ form: "1701Q", ...q(1), client: { ...individual, vatRegistered: true }, inputs: { regime: "8pct" }, documents: [sale({ month: "2026-01", total: 3_000_001 })] });
    const r = form1701Q.compute(ctx);
    expect(r.errors).toContain("A VAT-registered individual cannot use the 8% option; choose graduated rates.");
    expect(r.warnings.some((w) => w.includes("exceed ₱3,000,000"))).toBe(true);
  });

  it("takes prior payments and other income from the previous worksheet and warns when they are missing", () => {
    const docs = [sale({ month: "2026-01", total: 100_000 }), sale({ month: "2026-04", total: 100_000 })];
    const withPrior = form1701Q.compute(
      ctxFor({ form: "1701Q", ...q(2), client: individual, inputs: { regime: "8pct" }, documents: docs, priorFigures: { "1701Q": { tax_payments_to_date: 120_000, non_operating_income_to_date: 5_000_000 } } }),
    );
    expect(amounts(withPrior)).toMatchObject({ previous_quarters_income: 150_000, prior_tax_payments: 1_200, non_operating_income_to_date: 50_000 });
    const without = form1701Q.compute(ctxFor({ form: "1701Q", ...q(2), client: individual, inputs: { regime: "8pct" }, documents: docs }));
    expect(without.warnings.some((w) => w.includes("Item 56"))).toBe(true);
    const typed = form1701Q.compute(ctxFor({ form: "1701Q", ...q(2), client: individual, inputs: { regime: "8pct", prior_tax_payments: "999" }, documents: docs, priorFigures: { "1701Q": { tax_payments_to_date: 120_000 } } }));
    expect(amounts(typed).prior_tax_payments).toBe(999);
  });

  it("requires a regime and an individual", () => {
    expect(form1701Q.compute(ctxFor({ form: "1701Q", ...q(1), client: individual, documents: [] })).errors[0]).toMatch(/income tax regime/);
    expect(form1701Q.compute(ctxFor({ form: "1701Q", ...q(1), documents: [], inputs: { regime: "8pct" } })).errors[0]).toMatch(/files 1702Q/);
  });

  it("attaches the quarter's SAWT with income ATCs only", () => {
    const ctx = ctxFor({
      form: "1701Q",
      ...q(1),
      client: individual,
      inputs: { regime: "graduated_osd", owner_last_name: "Dela Cruz", owner_first_name: "Juan" },
      documents: [
        cert2307({ month: "2026-01", atc: "WI010", total: 20_000, withholding: 1_000, partyName: "Client B, Inc.", partyTin: "333-444-555-00000" }),
        cert2307({ month: "2026-01", atc: "WI010", withholding: 500, partyName: "Client B, Inc.", partyTin: "333-444-555-00000" }),
        cert2307({ month: "2026-01", atc: "WI160", total: 10_000, withholding: 200, partyName: "Alpha Co", partyTin: "999-888-777" }),
        cert2307({ month: "2026-02", atc: "WV020", total: 10_000, withholding: 500, partyName: "Gov" }),
      ],
    });
    const r = form1701Q.compute(ctx);
    expect(amounts(r).cwt_this_quarter).toBe(1_700);
    const att = form1701Q.attachments!(ctx, r);
    expect(att.map((a) => a.kind)).toEqual(["sawt_dat_2026-01", "sawt_csv"]);
    expect(att[0].build().body).toBe(
      'HSAWT,H1701Q,123456789,0000,"JUAN DELA CRUZ","DELA CRUZ","JUAN","",01/2026,050\r\n' +
        'DSAWT,D1701Q,1,999888777,0001,"ALPHA CO",,,,01/2026,,WI160,2.00,10000.00,200.00\r\n' +
        // The second 2307 had no income payment read: grossed up from ₱500 at 5%.
        'DSAWT,D1701Q,2,333444555,0000,"CLIENT B INC.",,,,01/2026,,WI010,5.00,30000.00,1500.00\r\n' +
        "CSAWT,C1701Q,123456789,0000,01/2026,40000.00,1700.00\r\n",
    );
    expect(r.warnings.some((w) => w.includes("grossed up"))).toBe(true);
  });

  it("blocks a 2307 without an ATC", () => {
    const r = form1701Q.compute(ctxFor({ form: "1701Q", ...q(1), client: individual, inputs: { regime: "graduated_osd" }, documents: [cert2307({ month: "2026-01", number: "C-7", withholding: 100 })] }));
    expect(r.errors).toEqual(["2307 C-7 (2026-01-15) has no ATC, so it cannot be placed on the SAWT. Add the ATC in review."]);
  });
});

describe("1702Q", () => {
  const corp = { vatRegistered: true };

  it("itemized: MCIT applies when higher than the regular rate", () => {
    const ctx = ctxFor({
      form: "1702Q",
      ...q(1),
      client: corp,
      inputs: { deduction: "itemized", corporate_rate: "regular", year_operations_commenced: "2020", cost_of_sales: "500000" },
      documents: [
        sale({ month: "2026-01", vatable: 1_000_000, vat: 120_000, total: 1_120_000, partyTin: "123-456-789" }),
        purchase({ month: "2026-02", vatable: 980_000, vat: 117_600, total: 1_097_600, partyTin: "111-222-333" }),
        cert2307({ month: "2026-03", atc: "WC158", total: 100_000, withholding: 1_000, partyName: "Top WA", partyTin: "555-555-555" }),
      ],
    });
    const r = form1702Q.compute(ctx);
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({
      sales: 1_000_000,
      cost_of_sales: 500_000,
      gross_income_operations: 500_000,
      non_operating_income: 0,
      total_gross_income: 500_000,
      deductions: 480_000,
      taxable_income_quarter: 20_000,
      previous_quarters_income: 0,
      taxable_income_to_date: 20_000,
      regular_income_tax: 5_000,
      mcit: 10_000,
      income_tax_due: 10_000,
      mcit_gross_income: 500_000,
      mcit_computed: 10_000,
      cwt_this_quarter: 1_000,
      total_credits: 1_000,
      income_tax_due_regular: 10_000,
      mcit_carryforward: 0,
      balance_tax_due: 10_000,
      aggregate_tax_due: 10_000,
      net_tax_payable: 9_000,
      total_amount_payable: 9_000,
      regular_payments_to_date: 0,
      mcit_payments_to_date: 9_000,
    });
    expect(r.warnings.some((w) => w.includes("rough proxy"))).toBe(true);
  });

  it("no MCIT within the first three years after operations commenced", () => {
    const ctx = ctxFor({
      form: "1702Q",
      ...q(1),
      client: corp,
      inputs: { deduction: "itemized", corporate_rate: "regular", year_operations_commenced: "2023", cost_of_sales: "500000" },
      documents: [sale({ month: "2026-01", vatable: 1_000_000, vat: 120_000 }), purchase({ month: "2026-02", vatable: 980_000, vat: 117_600 })],
    });
    const r = form1702Q.compute(ctx);
    expect(amounts(r)).toMatchObject({ regular_income_tax: 5_000, mcit: 0, income_tax_due: 5_000, net_tax_payable: 5_000, regular_payments_to_date: 5_000 });
    expect(r.sections[1].lines[2].basis).toMatch(/MCIT starts taxable year 2027/);
  });

  it("OSD at 40% of gross income, reduced 20% rate, and the prior MCIT excess credited against regular tax", () => {
    const ctx = ctxFor({
      form: "1702Q",
      ...q(1),
      client: { vatRegistered: false, taxpayerType: "opc" },
      inputs: { deduction: "osd", corporate_rate: "small", cost_of_sales: "400000", non_operating_income: "100000", mcit_carryforward: "100000", prior_year_excess_credit: "2000" },
      documents: [sale({ month: "2026-01", total: 1_000_000 }), purchase({ month: "2026-01", total: 400_000 })],
    });
    const r = form1702Q.compute(ctx);
    expect(amounts(r)).toMatchObject({
      total_gross_income: 700_000,
      deductions: 280_000,
      taxable_income_quarter: 420_000,
      regular_income_tax: 84_000,
      mcit: 14_000,
      income_tax_due: 84_000,
      mcit_carryforward: 84_000, // capped at Item 14
      balance_tax_due: 0,
      total_credits: 2_000,
      net_tax_payable: -2_000,
    });
    expect(r.warnings.some((w) => w.includes("20% rate applies only"))).toBe(true);
    expect(r.warnings.some((w) => w.includes("Year operations commenced not entered"))).toBe(true);
  });

  it("uses CREATE-relief rates by taxable year (25% / 1% MCIT for 2021)", () => {
    const ctx = ctxFor({
      form: "1702Q",
      ...q(1, 2021),
      inputs: { deduction: "osd", corporate_rate: "regular", year_operations_commenced: "2010" },
      documents: [sale({ month: "2021-02", total: 1_000_000 })],
    });
    expect(amounts(form1702Q.compute(ctx))).toMatchObject({ taxable_income_quarter: 600_000, regular_income_tax: 150_000, mcit: 10_000 });
  });

  it("is cumulative over the fiscal year to date, with previous payments from the last worksheet", () => {
    // Fiscal year July–June: Q2 is October–December 2026; June 2026 belongs to the previous year.
    const ctx = ctxFor({
      form: "1702Q",
      periodStart: "2026-10-01",
      periodEnd: "2026-12-31",
      client: { fiscalYearEndMonth: 6 },
      inputs: { deduction: "itemized", corporate_rate: "regular", year_operations_commenced: "2010" },
      priorFigures: { "1702Q": { regular_payments_to_date: 1_000_000, mcit_payments_to_date: 0, cost_of_sales_to_date: 0, non_operating_income_to_date: 0, taxable_income_to_date: 20_000_000 } },
      documents: [
        sale({ month: "2026-06", total: 5_000_000 }),
        sale({ month: "2026-08", total: 300_000 }),
        purchase({ month: "2026-08", total: 100_000 }),
        cert2307({ month: "2026-09", atc: "WC160", total: 100_000, withholding: 2_000, partyName: "X", partyTin: "121-212-121" }),
        sale({ month: "2026-11", total: 400_000 }),
        purchase({ month: "2026-12", total: 100_000 }),
      ],
    });
    const r = form1702Q.compute(ctx);
    expect(amounts(r)).toMatchObject({
      taxable_income_quarter: 300_000,
      previous_quarters_income: 200_000,
      taxable_income_to_date: 500_000,
      regular_income_tax: 125_000,
      mcit: 14_000, // 2% of 700,000 gross income to date (FY ending June 2027)
      prior_regular_payments: 10_000,
      prior_mcit_payments: 0,
      cwt_previous_quarters: 2_000,
      total_credits: 12_000,
      net_tax_payable: 113_000,
      regular_payments_to_date: 123_000,
    });
    expect(r.warnings.some((w) => w.includes("differs from the previous quarter"))).toBe(false);
  });

  it("requires the deduction method and rate, and a non-individual", () => {
    expect(form1702Q.compute(ctxFor({ form: "1702Q", ...q(1), documents: [] })).errors).toEqual(["Choose the deduction method (OSD or itemized) and the regular income tax rate."]);
    expect(form1702Q.compute(ctxFor({ form: "1702Q", ...q(1), client: individual, documents: [] })).errors[0]).toMatch(/files 1701Q/);
  });
});
