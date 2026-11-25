import { describe, expect, it } from "vitest";
import { BOOKS_GO_LIVE, chartStart } from "./types";

describe("chartStart", () => {
  it("starts at the January 2027 go-live, or the registration month when later", () => {
    expect(BOOKS_GO_LIVE).toBe("2027-01-01");
    expect(chartStart()).toBe("2027-01-01");
    expect(chartStart("2020-03-15")).toBe("2027-01-01");
    expect(chartStart("2027-08-10")).toBe("2027-08-01");
    expect(chartStart("not a date")).toBe("2027-01-01");
  });
});
