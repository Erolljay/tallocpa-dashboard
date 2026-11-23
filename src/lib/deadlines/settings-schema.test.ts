import { describe, expect, it } from "vitest";
import { dayBefore, holidaySchema, ruleEditSchema } from "./settings-schema";

const base = { due_kind: "day_of_month_after", months_after: "1", day: "10", applies_from: "2026-01-31", source: "" };

describe("ruleEditSchema", () => {
  it("builds a day-of-month rule and defaults the source to UNVERIFIED", () => {
    expect(ruleEditSchema.parse(base)).toEqual({
      due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 },
      appliesFrom: "2026-01-31",
      source: "UNVERIFIED",
      verified: false,
      allEfpsGroups: false,
    });
  });
  it("accepts the last day of the month and a days-after rule", () => {
    expect(ruleEditSchema.parse({ ...base, day: "last" }).due).toEqual({ kind: "day_of_month_after", monthsAfter: 1, day: "last" });
    expect(ruleEditSchema.parse({ ...base, due_kind: "days_after", days: "60" }).due).toEqual({ kind: "days_after", days: 60 });
  });
  it("needs an issuance before a rule is marked verified", () => {
    expect(ruleEditSchema.safeParse({ ...base, verified: "on" }).success).toBe(false);
    expect(ruleEditSchema.parse({ ...base, verified: "on", source: "RR 8-2024" })).toMatchObject({ verified: true, source: "RR 8-2024" });
  });
  it("rejects a day outside 1–31", () => {
    expect(ruleEditSchema.safeParse({ ...base, day: "32" }).success).toBe(false);
  });
});

describe("holidaySchema", () => {
  it("accepts a proclaimed holiday", () => {
    expect(holidaySchema.parse({ date: "2026-03-20", name: "Eid'l Fitr", kind: "regular", source: "Proc. 1100" })).toMatchObject({ kind: "regular" });
  });
});

describe("dayBefore", () => {
  it("crosses month and year ends", () => {
    expect(dayBefore("2027-01-01")).toBe("2026-12-31");
    expect(dayBefore("2026-03-01")).toBe("2026-02-28");
  });
});
