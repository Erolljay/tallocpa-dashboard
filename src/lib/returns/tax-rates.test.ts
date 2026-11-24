import { describe, expect, it } from "vitest";
import { graduatedTax, incomeTaxTable, percentageTaxRate, pickEffective, TAX_RATES, thirteenthMonthCap } from "./tax-rates";

describe("effective-dated rates", () => {
  it("picks the entry in force on the date", () => {
    expect(percentageTaxRate("2020-06-30")).toBe(3);
    expect(percentageTaxRate("2020-07-01")).toBe(1);
    expect(percentageTaxRate("2023-06-30")).toBe(1);
    expect(percentageTaxRate("2023-07-01")).toBe(3);
    expect(percentageTaxRate("2010-01-01")).toBe(3); // before every entry: the earliest
    expect(pickEffective(TAX_RATES.incomeTax, "2022-12-31").label).toMatch(/2018–2022/);
  });

  it("gives the 13th-month ceiling in centavos", () => {
    expect(thirteenthMonthCap("2026-12-31")).toBe(9000000);
  });

  it("derives bracket fixed amounts and computes graduated tax", () => {
    expect(incomeTaxTable("2026-12-31").map((b) => b.fixed)).toEqual([0, 0, 2250000, 10250000, 40250000, 220250000]);
    expect(graduatedTax(25000000, "2026-12-31")).toBe(0);
    expect(graduatedTax(50000000, "2026-12-31")).toBe(4250000); // 22,500 + 20% of 100,000
    expect(graduatedTax(50000000, "2022-12-31")).toBe(5500000); // 30,000 + 25% of 100,000
    expect(graduatedTax(-1, "2026-12-31")).toBe(0);
  });
});
