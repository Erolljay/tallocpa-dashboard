import { describe, expect, it } from "vitest";
import { isLocked, monthsInPeriod, onlyBooksReady, periodLocked } from "./periods";

describe("books periods", () => {
  it("lists the months of a period across a year end", () => {
    expect(monthsInPeriod("2026-11-01", "2027-01-31")).toEqual(["2026-11-01", "2026-12-01", "2027-01-01"]);
    expect(monthsInPeriod("2026-04-01", "2026-04-30")).toEqual(["2026-04-01"]);
  });

  it("is locked only when every month of the period is", () => {
    const locked = new Set(["2026-04-01", "2026-05-01"]);
    expect(periodLocked("2026-04-01", "2026-06-30", locked, "2026-01-01")).toBe(false);
    expect(periodLocked("2026-04-01", "2026-05-31", locked, "2026-01-01")).toBe(true);
  });

  it("does not hold back months before the books start, or a client without books", () => {
    expect(periodLocked("2026-03-01", "2026-05-31", new Set(["2026-04-01", "2026-05-01"]), "2026-04-01")).toBe(true);
    expect(periodLocked("2025-10-01", "2025-12-31", new Set(), "2026-01-01")).toBe(true);
    expect(periodLocked("2026-04-01", "2026-06-30", new Set(), null)).toBe(true);
  });

  it("counts a month waiting on an unlock as still locked", () => {
    expect(isLocked("unlock_requested")).toBe(true);
    expect(isLocked("lock_requested")).toBe(false);
  });

  it("keeps the filings the database says are ready", () => {
    const filings = [{ id: "a" }, { id: "b" }, { id: "c" }];
    expect(onlyBooksReady(filings, [{ filing_id: "a", ready: true }, { filing_id: "b", ready: false }, { filing_id: "c", ready: null }])).toEqual([{ id: "a" }]);
  });
});
