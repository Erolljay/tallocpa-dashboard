import { describe, expect, it } from "vitest";
import { monthChoices, nextCutoff, openMonth } from "./cutoff";

describe("document cutoff", () => {
  it("keeps last month open until its cutoff day", () => {
    expect(openMonth("2026-12-05", 5)).toBe("2026-11-01");
    expect(openMonth("2026-12-06", 5)).toBe("2026-12-01");
    expect(openMonth("2027-01-03", 5)).toBe("2026-12-01");
  });
  it("counts the days to the open month's cutoff", () => {
    expect(nextCutoff("2026-12-01", 5)).toEqual({ month: "2026-11-01", cutoff: "2026-12-05", daysLeft: 4 });
    expect(nextCutoff("2026-12-05", 5)).toEqual({ month: "2026-11-01", cutoff: "2026-12-05", daysLeft: 0 });
    expect(nextCutoff("2026-12-20", 10)).toEqual({ month: "2026-12-01", cutoff: "2027-01-10", daysLeft: 21 });
  });
  it("offers this month and earlier ones", () => {
    expect(monthChoices("2027-01-15", 3)).toEqual(["2027-01-01", "2026-12-01", "2026-11-01"]);
  });
});
