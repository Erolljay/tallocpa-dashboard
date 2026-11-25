import { describe, expect, it } from "vitest";
import { booksYears, lockedMonths, monthEnd, offeredKinds, reportKindsEnding, monthsOfReport, statementPeriods, waitingReturns, type StatementHold } from "./report-periods";

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
  const hold = (month: string, filingId: string, form: string, periodLabel: string, status = "reviewed", scope: "month" | "year" = "month"): StatementHold =>
    ({ scope, month, filingId, form, periodLabel, status, amended: / Amended/.test(periodLabel) });
  const q1 = lockedMonths("2026-01-01", "2026-03-31");
  const year = lockedMonths("2026-01-01", "2026-12-31");

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
  });

  it("lets each month stand on its own returns: a held earlier month does not hold later ones", () => {
    // January's 0619-E waits; February and March show, the quarter does not.
    expect(statementPeriods(q1, [hold("2026-01-01", "e1", "0619-E", "January 2026")], 12)).toEqual([
      { month: "2026-02-01", kinds: ["monthly"] },
      { month: "2026-03-01", kinds: ["monthly"] },
    ]);
    // March waits alone: January and February show.
    expect(statementPeriods(q1, [hold("2026-03-01", "c3", "1601-C", "March 2026", "prepared")], 12).map((p) => p.month)).toEqual(["2026-01-01", "2026-02-01"]);
  });

  it("offers a quarter when its three months show", () => {
    // A held month of Q1 does not hold Q2.
    const h = [hold("2026-02-01", "c2", "1601-C", "February 2026")];
    expect(offeredKinds("2026-03-01", 12, year, h)).toEqual(["monthly"]);
    expect(offeredKinds("2026-06-01", 12, year, h)).toEqual(["monthly", "quarterly"]);
    // Taxable year ending June: the quarter ending September is July to September.
    expect(offeredKinds("2026-09-01", 6, lockedMonths("2026-07-01", "2026-09-30"), [hold("2026-06-01", "x", "1601-C", "June 2026")])).toEqual(["monthly", "quarterly"]);
  });

  it("offers the year when its twelve months show and its annual income tax return is approved", () => {
    expect(offeredKinds("2026-12-01", 12, year, [])).toEqual(["monthly", "quarterly", "annual"]);
    expect(offeredKinds("2026-12-01", 12, year, [hold("2026-12-01", "it", "1702-RT", "2026", "not_started", "year")])).toEqual(["monthly", "quarterly"]);
    expect(offeredKinds("2026-12-01", 12, year, [hold("2026-05-01", "c5", "1601-C", "May 2026")])).toEqual(["monthly", "quarterly"]);
    // Another year's income tax return, or a prior year's held month, does not matter.
    const twoYears = lockedMonths("2025-01-01", "2026-12-31");
    expect(offeredKinds("2026-12-01", 12, twoYears, [hold("2025-12-01", "it", "1702-RT", "2025", "reviewed", "year"), hold("2025-06-01", "c6", "1601-C", "June 2025")])).toEqual(["monthly", "quarterly", "annual"]);
    // Books started mid-year: the months before hold nothing.
    expect(offeredKinds("2026-12-01", 12, lockedMonths("2026-07-01", "2026-12-31"), [])).toEqual(["monthly", "quarterly", "annual"]);
  });

  it("does not offer a month that is not closed", () => {
    expect(offeredKinds("2026-04-01", 12, q1, [])).toEqual([]);
  });

  it("knows the months a report stands on", () => {
    expect(monthsOfReport("2026-03-01", "monthly")).toEqual(["2026-03"]);
    expect(monthsOfReport("2026-03-01", "quarterly")).toEqual(["2026-01", "2026-02", "2026-03"]);
    expect(monthsOfReport("2026-06-01", "annual")).toEqual(["2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"]);
  });

  it("lists each waiting return once with what it holds", () => {
    const holds = [
      hold("2026-02-01", "q1", "2550Q", "Q1 2026"),
      hold("2026-01-01", "q1", "2550Q", "Q1 2026"),
      hold("2026-01-01", "e1", "0619-E", "January 2026", "prepared"),
      hold("2026-03-01", "q1", "2550Q", "Q1 2026"),
      hold("2026-12-01", "it", "1702-RT", "2026", "not_started", "year"),
    ];
    expect(waitingReturns(holds)).toEqual([
      { filingId: "e1", form: "0619-E", periodLabel: "January 2026", status: "prepared", amended: false, months: ["2026-01-01"], yearEnding: null },
      { filingId: "q1", form: "2550Q", periodLabel: "Q1 2026", status: "reviewed", amended: false, months: ["2026-01-01", "2026-02-01", "2026-03-01"], yearEnding: null },
      { filingId: "it", form: "1702-RT", periodLabel: "2026", status: "not_started", amended: false, months: [], yearEnding: "2026-12-01" },
    ]);
    expect(waitingReturns([])).toEqual([]);
  });

  it("holds a corrected period while its amended return waits", () => {
    const holds = ["2026-01-01", "2026-02-01", "2026-03-01"].map((m) => hold(m, "q1a", "2550Q", "Q1 2026 Amended"));
    expect(statementPeriods(q1, holds, 12)).toEqual([]);
    expect(waitingReturns(holds)).toEqual([
      { filingId: "q1a", form: "2550Q", periodLabel: "Q1 2026 Amended", status: "reviewed", amended: true, months: ["2026-01-01", "2026-02-01", "2026-03-01"], yearEnding: null },
    ]);
  });
});
