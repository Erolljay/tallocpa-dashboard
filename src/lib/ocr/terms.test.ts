import { describe, expect, it } from "vitest";
import { normalizeFields, normalizeTerms } from "./fields";

describe("payment terms", () => {
  it("reads cash and charge wording", () => {
    expect(normalizeTerms("CASH SALE")).toBe("cash");
    expect(normalizeTerms("Charge")).toBe("charge");
    expect(normalizeTerms("on account")).toBe("charge");
    expect(normalizeTerms("30 days")).toBe("charge");
    expect(normalizeTerms("")).toBeNull();
    expect(normalizeTerms("unclear")).toBeNull();
    expect(normalizeFields({ payment_terms: "Cash" }).payment_terms).toBe("cash");
  });
});
