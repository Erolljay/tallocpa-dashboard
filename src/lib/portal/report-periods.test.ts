import { describe, expect, it } from "vitest";
import { booksYears, lockedMonths, monthEnd, offeredKinds, reportKindsEnding, statementPeriods, statementReadsFrom, waitingReturns, type StatementHold } from "./report-periods";

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

describe("statements wait for the client's approval of the returns", () => {
  const hold = (month: string, filingId: string, form: string, periodLabel: string, status = "reviewed"): StatementHold => ({ month, filingId, form, periodLabel, status });
  const q1 = lockedMonths("2026-01-01", "2026-03-31");

  it("offers every closed month and quarter when nothing is held", () => {
    expect(statementPeriods(q1, [], 12)).toEqual([
      { month: "2026-01-01", kinds: ["monthly"] },
      { month: "2026-02-01", kinds: ["monthly"] },
      { month: "2026-03-01", kinds: ["monthly", "quarterly"] },
    ]);
  });

  it("holds months 1 and 2 of a quarter until the quarter's return is approved", () => {
    const holds = ["2026-01-01", "2026-02-01", "2026-03-01"].map((m) => hold(m, "q1", "2550Q", "Q1 2026"));
    expect(statementPeriods(q1, holds, 12)).toEqual([]);
    expect(offeredKinds("2026-03-01", 12, q1, holds)).toEqual([]);
  });

  it("offers a month only when it and the earlier months of its taxable year are not held", () => {
    // January's 0619-E waits; February and March are approved. Every statement reads the year to date.
    expect(statementPeriods(q1, [hold("2026-01-01", "e1", "0619-E", "January 2026")], 12)).toEqual([]);
    // March waits alone: January and February show.
    expect(statementPeriods(q1, [hold("2026-03-01", "c3", "1601-C", "March 2026", "prepared")], 12).map((p) => p.month)).toEqual(["2026-01-01", "2026-02-01"]);
  });

  it("offers a quarter or the year only when all its months show", () => {
    const year = lockedMonths("2026-01-01", "2026-12-31");
    expect(offeredKinds("2026-12-01", 12, year, [])).toEqual(["monthly", "quarterly", "annual"]);
    // Q4's return waits: no December, no Q4, no year; Q3 shows.
    const q4 = ["2026-10-01", "2026-11-01", "2026-12-01"].map((m) => hold(m, "q4", "1702Q", "Q4 2026"));
    expect(offeredKinds("2026-12-01", 12, year, q4)).toEqual([]);
    expect(offeredKinds("2026-09-01", 12, year, q4)).toEqual(["monthly", "quarterly"]);
    // A held month of the prior year keeps back the year (shown beside the prior year), not the months.
    const twoYears = lockedMonths("2025-01-01", "2026-12-31");
    expect(offeredKinds("2026-12-01", 12, twoYears, [hold("2025-06-01", "c6", "1601-C", "June 2025")])).toEqual(["monthly", "quarterly"]);
  });

  it("does not offer a month that is not closed", () => {
    expect(offeredKinds("2026-04-01", 12, q1, [])).toEqual([]);
  });

  it("reads from the taxable year's start, and the prior year's for the annual statements", () => {
    expect(statementReadsFrom("2026-05-01", "monthly", 12)).toBe("2026-01-01");
    expect(statementReadsFrom("2026-12-01", "annual", 12)).toBe("2025-01-01");
    expect(statementReadsFrom("2026-06-01", "annual", 6)).toBe("2024-07-01");
    expect(statementReadsFrom("2026-09-01", "quarterly", 6)).toBe("2026-07-01");
  });

  it("lists each waiting return once with the months it holds", () => {
    const holds = [
      hold("2026-02-01", "q1", "2550Q", "Q1 2026"),
      hold("2026-01-01", "q1", "2550Q", "Q1 2026"),
      hold("2026-01-01", "e1", "0619-E", "January 2026", "prepared"),
      hold("2026-03-01", "q1", "2550Q", "Q1 2026"),
    ];
    expect(waitingReturns(holds)).toEqual([
      { filingId: "e1", form: "0619-E", periodLabel: "January 2026", status: "prepared", months: ["2026-01-01"] },
      { filingId: "q1", form: "2550Q", periodLabel: "Q1 2026", status: "reviewed", months: ["2026-01-01", "2026-02-01", "2026-03-01"] },
    ]);
    expect(waitingReturns([])).toEqual([]);
  });
});
