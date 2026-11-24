import { describe, expect, it } from "vitest";
import { bookIncome } from "./book-income";
import { mv } from "./testing";

describe("bookIncome", () => {
  it("groups account movements by BIR line: income and deductions positive", () => {
    const b = bookIncome([
      mv("sales", -1_000_000, "revenue", "4010"),
      mv("sales", -50_000, "revenue", "4020"),
      mv("sales_returns", 20_000, "revenue"),
      mv("cost_of_sales", 400_000, "cost"),
      mv("other_taxable_income", -3_000, "other_income"),
      mv("final_tax_income", -500, "other_income"),
      mv("ded_salaries", 200_000),
      mv("ded_rental", 60_000),
      mv("ded_rental", -10_000, "expense", "6041"),
      mv("nondeductible", 1_000),
      mv(null, 25_000, "income_tax", "8010"),
      mv("ded_utilities", 0),
    ]);
    expect(b).toMatchObject({
      sales: 1_030_000_00,
      costOfSales: 400_000_00,
      otherIncome: 3_000_00,
      deductions: 250_000_00,
      excluded: 500_00,
      nondeductible: 26_000_00,
      unmapped: [],
    });
    expect(b.byLine).toEqual({
      sales: 1_050_000_00,
      sales_returns: -20_000_00,
      cost_of_sales: 400_000_00,
      other_taxable_income: 3_000_00,
      final_tax_income: 500_00,
      ded_salaries: 200_000_00,
      ded_rental: 50_000_00,
      nondeductible: 26_000_00,
    });
  });

  it("lists accounts with no (or an unknown) BIR line and leaves them out", () => {
    const b = bookIncome([mv(null, 5_000, "expense", "6999"), mv("not_a_line", 1_000, "expense", "6998"), mv("ded_rental", 100)]);
    expect(b.unmapped).toEqual(["6999 Unmapped", "6998 not_a_line"]);
    expect(b.deductions).toBe(100_00);
  });
});
