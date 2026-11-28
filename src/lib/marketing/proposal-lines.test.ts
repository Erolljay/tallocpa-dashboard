import { describe, expect, it } from "vitest";
import { feeLine, proposalTotals, type ScheduleItem } from "./proposal-lines";

const item = (over: Partial<ScheduleItem>): ScheduleItem => ({
  code: "D.10-29",
  component: "D",
  label: "Bookkeeping",
  band_label: "10–29 documents",
  billing: "monthly",
  price: "3500.00",
  is_custom_quote: false,
  unit_label: null,
  ...over,
});

describe("proposal lines", () => {
  it("prices lines only from the schedule and totals a first year", () => {
    const lines = [
      feeLine(item({}), 1),
      feeLine(item({ code: "E.emp", label: "Payroll", band_label: null, billing: "per_unit_monthly", price: 150, unit_label: "employees" }), 4),
      feeLine(item({ code: "A.1903", label: "BIR registration", band_label: null, billing: "one_time", price: "5000" }), 1),
      feeLine(item({ code: "C.afs", label: "Annual ITR", band_label: null, billing: "annual", price: "8000" }), 1),
      feeLine(item({ code: "K.audit", label: "Audit", band_label: null, billing: "one_time", price: null, is_custom_quote: true }), 1),
    ];
    expect(lines.map((l) => l.amount)).toEqual([3500, 600, 5000, 8000, null]);
    expect(lines[1].display).toMatch(/4 employees/);
    expect(proposalTotals(lines)).toEqual({ monthly: 4100, annual: 8000, one_time: 5000, first_year: 4100 * 12 + 13000, on_request: ["K.audit Audit"] });
  });

  it("refuses multipliers, unpriced items and quantities on flat items", () => {
    expect(feeLine(item({ billing: "multiplier", price: "1.5" }), 1).refusal).toMatch(/multiplier/);
    expect(feeLine(item({ price: null }), 1).refusal).toMatch(/no price/);
    expect(feeLine(item({}), 2).refusal).toMatch(/once/);
  });
});
