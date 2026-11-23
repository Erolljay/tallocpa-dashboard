import { describe, expect, it } from "vitest";
import { describeDue, taxTypeOfForm } from "./describe";

describe("describeDue", () => {
  it("words a monthly rule", () => {
    expect(describeDue({ kind: "day_of_month_after", monthsAfter: 1, day: 10 }, "monthly")).toBe("10th of the following month");
  });
  it("words quarterly and annual rules", () => {
    expect(describeDue({ kind: "day_of_month_after", monthsAfter: 1, day: 25 }, "quarterly")).toBe("25th of the month after the quarter");
    expect(describeDue({ kind: "day_of_month_after", monthsAfter: 1, day: "last" }, "quarterly")).toBe("Last day of the month after the quarter");
    expect(describeDue({ kind: "day_of_month_after", monthsAfter: 4, day: 15 }, "annual")).toBe("15th of the 4th month after the year");
    expect(describeDue({ kind: "day_of_month_after", monthsAfter: 2, day: 1 }, "quarterly")).toBe("1st of the 2nd month after the quarter");
  });
  it("words a days-after rule", () => {
    expect(describeDue({ kind: "days_after", days: 60 }, "quarterly")).toBe("60 days after the quarter ends");
  });
  it("uses the right ordinal suffixes", () => {
    const d = (day: number) => describeDue({ kind: "day_of_month_after", monthsAfter: 1, day }, "monthly").split(" ")[0];
    expect([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 31].map(d)).toEqual(["1st", "2nd", "3rd", "4th", "11th", "12th", "13th", "21st", "22nd", "23rd", "31st"]);
  });
});

describe("taxTypeOfForm", () => {
  it("groups forms by tax type", () => {
    expect(taxTypeOfForm("1601-EQ")).toBe("Withholding tax – expanded");
    expect(taxTypeOfForm("1601-C")).toBe("Withholding tax – compensation");
    expect(taxTypeOfForm("Inventory List")).toBe("Other");
  });
});
