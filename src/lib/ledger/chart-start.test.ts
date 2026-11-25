import { describe, expect, it } from "vitest";
import { chartStart } from "./types";

describe("chartStart", () => {
  it("starts at the beginning of the year, or the registration month when later", () => {
    expect(chartStart("2026-11-25")).toBe("2026-01-01");
    expect(chartStart("2026-11-25", "2020-03-15")).toBe("2026-01-01");
    expect(chartStart("2026-11-25", "2026-08-10")).toBe("2026-08-01");
    expect(chartStart("2026-11-25", "not a date")).toBe("2026-01-01");
  });
});
