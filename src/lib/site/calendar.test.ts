import { describe, expect, it } from "vitest";
import { BIR_FORMS, deadlinesIn } from "./calendar";

describe("BIR filing calendar", () => {
  it("lists January's deadlines earliest first", () => {
    expect(deadlinesIn(1).map((d) => `${d.day} ${d.form.code}`)).toEqual(["15 1601-C", "25 2550Q", "25 2551Q", "31 1601-EQ", "31 1604-C"]);
  });
  it("has 1601-C every month and 0619-E only in the first two months of each quarter's following month", () => {
    const c = BIR_FORMS.find((f) => f.code === "1601-C")!;
    expect(Object.keys(c.due)).toHaveLength(12);
    const e = BIR_FORMS.find((f) => f.code === "0619-E")!;
    expect(Object.keys(e.due).map(Number)).toEqual([2, 3, 5, 6, 8, 9, 11, 12]);
  });
  it("gives every form at least one valid date", () => {
    for (const f of BIR_FORMS) {
      const entries = Object.entries(f.due);
      expect(entries.length).toBeGreaterThan(0);
      for (const [m, d] of entries) {
        const date = new Date(Date.UTC(2026, Number(m) - 1, d));
        expect(date.getUTCMonth()).toBe(Number(m) - 1);
      }
    }
  });
});
