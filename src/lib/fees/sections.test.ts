import { describe, expect, it } from "vitest";
import { PRICE_SECTIONS, priceSection } from "./sections";

describe("fee schedule sections", () => {
  it("are plain data usable on the server (the active schedule's read-only view)", () => {
    expect(Array.isArray(PRICE_SECTIONS)).toBe(true);
    expect(PRICE_SECTIONS.map((s) => s.key)).toEqual(["monthly", "annual", "ad_hoc", "audit"]);
  });

  it("puts each item in its section", () => {
    expect(priceSection({ billing: "monthly", code: "A.individual" })).toBe("monthly");
    expect(priceSection({ billing: "annual", code: "H.itr_afs_individual" })).toBe("annual");
    expect(priceSection({ billing: "one_time", code: "I.orus" })).toBe("ad_hoc");
    expect(priceSection({ billing: "annual", code: "H.audit_individual_0_3m" })).toBe("audit");
  });
});
