import { describe, expect, it } from "vitest";
import { crossesYear, moveTarget } from "./defer";

describe("moveTarget", () => {
  it("moves to the next month, across a year end", () => {
    expect(moveTarget("2026-09-01", "next_month")).toBe("2026-10-01");
    expect(moveTarget("2026-12-01", "next_month")).toBe("2027-01-01");
  });
  it("moves to the first month of the next calendar quarter", () => {
    expect(moveTarget("2026-07-01", "next_quarter")).toBe("2026-10-01");
    expect(moveTarget("2026-09-01", "next_quarter")).toBe("2026-10-01");
    expect(moveTarget("2026-11-01", "next_quarter")).toBe("2027-01-01");
  });
});

describe("crossesYear", () => {
  it("is true when the move leaves the taxable year", () => {
    expect(crossesYear("2026-12-01", "2027-01-01")).toBe(true);
    expect(crossesYear("2026-09-01", "2026-10-01")).toBe(false);
    // Fiscal year ending June.
    expect(crossesYear("2026-06-01", "2026-07-01", 6)).toBe(true);
    expect(crossesYear("2026-12-01", "2027-01-01", 6)).toBe(false);
  });
});
