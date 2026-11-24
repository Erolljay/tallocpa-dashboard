import { describe, expect, it } from "vitest";
import { periodRange } from "./period";

describe("periodRange", () => {
  const today = "2026-01-15";
  it("works out presets from today, across a year end", () => {
    expect(periodRange("this_month", today)).toEqual({ key: "this_month", from: "2026-01-01", to: "2026-01-01" });
    expect(periodRange("last_month", today)).toEqual({ key: "last_month", from: "2025-12-01", to: "2025-12-01" });
    expect(periodRange("this_quarter", "2026-11-24")).toEqual({ key: "this_quarter", from: "2026-10-01", to: "2026-12-01" });
    expect(periodRange("this_year", today)).toEqual({ key: "this_year", from: "2026-01-01", to: "2026-12-01" });
  });
  it("takes a custom month range in either order and ignores a bad one", () => {
    expect(periodRange("custom", today, "2026-03", "2026-01")).toEqual({ key: "custom", from: "2026-01-01", to: "2026-03-01" });
    expect(periodRange("custom", today, "2026-13", "2026-01")).toBeNull();
    expect(periodRange("all", today)).toBeNull();
  });
});
