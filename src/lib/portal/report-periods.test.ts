import { describe, expect, it } from "vitest";
import { booksYears, lockedMonths, monthEnd, reportKindsEnding } from "./report-periods";

describe("portal report periods", () => {
  it("lists the locked months from the start of the books", () => {
    expect(lockedMonths("2025-11-01", "2026-02-28")).toEqual(["2025-11-01", "2025-12-01", "2026-01-01", "2026-02-01"]);
    expect(lockedMonths("2026-01-01", null)).toEqual([]);
    expect(lockedMonths(null, "2026-01-31")).toEqual([]);
  });

  it("knows the month end", () => {
    expect(monthEnd("2028-02-01")).toBe("2028-02-29");
    expect(monthEnd("2026-12-01")).toBe("2026-12-31");
  });

  it("offers quarters and the year only on their last months", () => {
    expect(reportKindsEnding("2026-01-01", 12)).toEqual(["monthly"]);
    expect(reportKindsEnding("2026-03-01", 12)).toEqual(["monthly", "quarterly"]);
    expect(reportKindsEnding("2026-12-01", 12)).toEqual(["monthly", "quarterly", "annual"]);
    // Taxable year ending June.
    expect(reportKindsEnding("2026-09-01", 6)).toEqual(["monthly", "quarterly"]);
    expect(reportKindsEnding("2026-06-01", 6)).toEqual(["monthly", "quarterly", "annual"]);
  });

  it("groups locked months by taxable year, newest first, with the bound range", () => {
    const years = booksYears(lockedMonths("2025-11-01", "2026-02-28"), 12);
    expect(years).toEqual([
      { yearStart: "2026-01-01", label: "2026", months: ["2026-01-01", "2026-02-01"], from: "2026-01-01", to: "2026-02-28", complete: false },
      { yearStart: "2025-01-01", label: "2025", months: ["2025-11-01", "2025-12-01"], from: "2025-11-01", to: "2025-12-31", complete: true },
    ]);
    const fiscal = booksYears(lockedMonths("2025-07-01", "2026-06-30"), 6);
    expect(fiscal).toHaveLength(1);
    expect(fiscal[0]).toMatchObject({ yearStart: "2025-07-01", label: "FY 2025–2026", from: "2025-07-01", to: "2026-06-30", complete: true });
  });
});
