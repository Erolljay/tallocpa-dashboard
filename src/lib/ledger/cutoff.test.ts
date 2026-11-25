import { describe, expect, it } from "vitest";
import { cutoffOf } from "./cutoff";

describe("cutoffOf", () => {
  it("knows a calendar-year start, a fiscal-year start and a mid-year start", () => {
    expect(cutoffOf("2027-01-01", 12)).toMatchObject({ openingAsOf: "2026-12-31", yearStart: "2027-01-01", atYearStart: true, quarter: 1 });
    // Fiscal year ending June: July is the start of the taxable year.
    expect(cutoffOf("2026-07-01", 6)).toMatchObject({ openingAsOf: "2026-06-30", yearStart: "2026-07-01", atYearStart: true });
    // The second quarter of a calendar year.
    expect(cutoffOf("2027-04-01", 12)).toMatchObject({ yearStart: "2027-01-01", atYearStart: false, atQuarterStart: true, quarter: 2 });
    // January for a June fiscal year is the start of its third quarter.
    expect(cutoffOf("2027-01-01", 6)).toMatchObject({ yearStart: "2026-07-01", atYearStart: false, atQuarterStart: true, quarter: 3 });
    // Mid-quarter.
    expect(cutoffOf("2027-05-01", 12)).toMatchObject({ atQuarterStart: false, quarter: 2 });
  });
});
