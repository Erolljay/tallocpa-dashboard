import { describe, expect, it } from "vitest";
import { applyRate, formatAmount, formatPeso, grossUp, roundHalfAway, sum, toCentavos, toDecimalString } from "./money";

describe("toCentavos", () => {
  it("parses the ways amounts are written", () => {
    expect(toCentavos("1,234.56")).toBe(123456);
    expect(toCentavos("₱1,234.56")).toBe(123456);
    expect(toCentavos("PHP 1234.5")).toBe(123450);
    expect(toCentavos("P99")).toBe(9900);
    expect(toCentavos(".5")).toBe(50);
    expect(toCentavos("0")).toBe(0);
    expect(toCentavos(1120.5)).toBe(112050);
  });
  it("reads negatives and parentheses", () => {
    expect(toCentavos("-12.30")).toBe(-1230);
    expect(toCentavos("(1,000.00)")).toBe(-100000);
    expect(toCentavos("(-5)")).toBe(500);
  });
  it("rounds a third decimal half away from zero", () => {
    expect(toCentavos("1.005")).toBe(101);
    expect(toCentavos("1.0049")).toBe(100);
    expect(toCentavos("-1.005")).toBe(-101);
    expect(toCentavos(1.005)).toBe(101);
  });
  it("rejects what is not an amount", () => {
    for (const v of ["", " ", "abc", "1.2.3", "12a", ".", null, undefined, Number.NaN]) expect(toCentavos(v as string)).toBeNull();
  });
});

describe("formatting", () => {
  it("formats pesos with separators and BIR-style negatives", () => {
    expect(formatPeso(123456)).toBe("₱1,234.56");
    expect(formatPeso(-123456)).toBe("(₱1,234.56)");
    expect(formatPeso(null)).toBe("—");
    expect(formatAmount(100000005)).toBe("1,000,000.05");
    expect(formatAmount(-5)).toBe("(0.05)");
  });
  it("writes DAT decimals without separators", () => {
    expect(toDecimalString(0)).toBe("0.00");
    expect(toDecimalString(3000000)).toBe("30000.00");
    expect(toDecimalString(7)).toBe("0.07");
    expect(toDecimalString(-1230)).toBe("-12.30");
  });
});

describe("rates", () => {
  it("applies a rate rounding half away from zero to the centavo", () => {
    expect(applyRate(10000000, 1)).toBe(100000);
    expect(applyRate(33333, 5)).toBe(1667); // 1666.65 → 1667
    expect(applyRate(33331, 5)).toBe(1667); // 1666.55 → 1667
    expect(applyRate(33329, 5)).toBe(1666); // 1666.45 → 1666
    expect(applyRate(12345, 0.5)).toBe(62); // 61.725 → 62
    expect(applyRate(-33333, 5)).toBe(-1667);
  });
  it("grosses the tax withheld back up to the income payment (taxify: ewt / rate)", () => {
    expect(grossUp(100000, 1)).toBe(10000000);
    expect(grossUp(150000, 15)).toBe(1000000);
    expect(grossUp(1000, 0.5)).toBe(200000);
    expect(grossUp(1001, 15)).toBe(6673); // 66.7333… → 66.73
    expect(grossUp(500, 0)).toBe(500);
  });
  it("sums and rounds", () => {
    expect(sum([1, null, 2, undefined, -1])).toBe(2);
    expect(roundHalfAway(2.5)).toBe(3);
    expect(roundHalfAway(-2.5)).toBe(-3);
    // 1.005 * 100 is 100.49999999999999 in binary floating point.
    expect(roundHalfAway(1.005 * 100)).toBe(101);
  });
});
