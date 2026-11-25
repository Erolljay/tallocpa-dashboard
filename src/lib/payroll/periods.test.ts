import { describe, expect, it } from "vitest";
import { periodEnd, periodLabel } from "./periods";

describe("pay periods", () => {
  it("keys a run by its last day, null for the whole month", () => {
    expect(periodEnd("2027-03-01", "first")).toBe("2027-03-15");
    expect(periodEnd("2027-02-01", "second")).toBe("2027-02-28");
    expect(periodEnd("2027-03-01", "month")).toBeNull();
    expect(periodEnd("2027-03-01", "nonsense")).toBeNull();
  });
  it("names a run", () => {
    expect(periodLabel("2027-03-01", null)).toBe("March 2027");
    expect(periodLabel("2027-03-01", "2027-03-15")).toBe("March 1–15, 2027");
    expect(periodLabel("2027-03-01", "2027-03-31")).toBe("March 16–31, 2027");
  });
});
