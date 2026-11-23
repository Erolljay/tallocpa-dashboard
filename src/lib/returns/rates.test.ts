import { describe, expect, it } from "vitest";
import { corporateRates, graduatedIncomeTax, mcitRate, percentageTaxRate, thirteenthMonthCap, vatRate } from "./rates";

describe("rates", () => {
  it("picks the entry in force on a date", () => {
    expect(percentageTaxRate("2020-06-30")).toBe(3);
    expect(percentageTaxRate("2020-07-01")).toBe(1);
    expect(percentageTaxRate("2023-06-30")).toBe(1);
    expect(percentageTaxRate("2023-07-01")).toBe(3);
    expect(mcitRate("2022-12-31")).toBe(1);
    expect(corporateRates("2019-12-31")).toEqual({ regular: 30, small: 30 });
    expect(corporateRates("2026-12-31")).toEqual({ regular: 25, small: 20 });
    expect(vatRate("2026-01-01")).toBe(12);
    expect(thirteenthMonthCap("2026-12-31")).toBe(90000);
  });

  it("computes graduated tax in centavos under each TRAIN table", () => {
    const P = (x: number) => x * 100;
    expect(graduatedIncomeTax(P(250_000), "2026-12-31")).toBe(0);
    expect(graduatedIncomeTax(P(400_000), "2026-12-31")).toBe(P(22_500));
    expect(graduatedIncomeTax(P(800_000), "2026-12-31")).toBe(P(102_500));
    expect(graduatedIncomeTax(P(2_000_000), "2026-12-31")).toBe(P(402_500));
    expect(graduatedIncomeTax(P(8_000_000), "2026-12-31")).toBe(P(2_202_500));
    expect(graduatedIncomeTax(P(10_000_000), "2026-12-31")).toBe(P(2_902_500));
    expect(graduatedIncomeTax(P(400_000), "2022-12-31")).toBe(P(30_000));
    expect(graduatedIncomeTax(P(10_000_000), "2022-12-31")).toBe(P(3_110_000));
    expect(graduatedIncomeTax(-5, "2026-12-31")).toBe(0);
  });
});
