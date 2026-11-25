import { describe, expect, it } from "vitest";
import { accumulated, bookFor, depreciationFor, monthTotals, startMonth, taxFor, type Asset } from "./schedule";

const asset = (over: Partial<Asset> = {}): Asset => ({
  id: "a", number: 3, source: "register", documentId: "d", description: "Office tables", assetAccount: "Furniture and Fixtures",
  acquiredOn: "2027-03-12", cost: 8500000, inputVat: 1020000, residual: 100, lifeMonths: 60, taxLifeMonths: 60, status: "active", ...over,
});

describe("straight-line depreciation", () => {
  it("starts the month after purchase at (cost − ₱1) ÷ life, as in the mock (E-3)", () => {
    expect(depreciationFor(8500000, 100, 60, "2027-03-12", "2027-03-01")).toBe(0);
    expect(depreciationFor(8500000, 100, 60, "2027-03-12", "2027-04-01")).toBe(141665);
    expect(startMonth("2027-03-12")).toBe("2027-04-01");
    expect(startMonth("2027-12-05")).toBe("2028-01-01");
  });

  it("lets the last month take the rounding so ₱1 stays on the books", () => {
    const last = depreciationFor(8500000, 100, 60, "2027-03-12", "2032-03-01");
    expect(last).toBe(8499900 - 141665 * 59);
    expect(depreciationFor(8500000, 100, 60, "2027-03-12", "2032-04-01")).toBe(0);
    expect(accumulated(asset(), "2040-01-01")).toBe(8499900);
    expect(accumulated(asset(), "2027-06-30")).toBe(141665 * 3);
  });

  it("keeps a tax column with its own life (decision 17) and nothing while not set up", () => {
    const car = asset({ cost: 120000000, lifeMonths: 60, taxLifeMonths: 120 });
    expect(bookFor(car, "2027-04-01")).toBe(1999998);
    expect(taxFor(car, "2027-04-01")).toBe(999999);
    expect(bookFor(asset({ status: "setup", lifeMonths: null }), "2027-04-01")).toBe(0);
  });

  it("sums a month's additions and depreciation, and lists what waits for setup", () => {
    const t = monthTotals([asset(), asset({ id: "b", number: 4, acquiredOn: "2027-01-10", status: "setup", lifeMonths: null, cost: 2000000 }), asset({ id: "c", source: "opening", acquiredOn: "2025-01-01" })], "2027-04-01");
    expect(t.additions).toBe(0);
    expect(t.book).toBe(141665 * 2);
    expect(t.waiting.map((a) => a.number)).toEqual([4]);
    expect(monthTotals([asset()], "2027-03-01").additions).toBe(8500000);
  });
});
