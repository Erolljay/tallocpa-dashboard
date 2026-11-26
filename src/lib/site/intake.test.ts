import { describe, expect, it } from "vitest";
import { prefillFromQuery, startHref } from "./intake";

describe("startHref", () => {
  it("builds the /start link from the picker's answers", () => {
    expect(startHref({ industry: "retail", taxpayerType: "corporation", taxes: ["it", "vat", "wc"], service: "tax_compliance" })).toBe(
      "/start?service=tax_compliance&taxpayer_type=corporation&industry=retail&tax=vat&tax=wc&tax=it",
    );
  });
  it("is plain /start with no answers", () => {
    expect(startHref({ industry: null, taxpayerType: null, taxes: [], service: null })).toBe("/start");
  });
});

describe("prefillFromQuery", () => {
  it("maps the answers onto /start's existing fields", () => {
    const p = prefillFromQuery({ taxpayer_type: "corporation", industry: "retail", tax: ["vat", "wc", "ewt"], service: "bookkeeping" });
    expect(p.taxpayerType).toBe("corporation");
    expect(p.vat).toBe(true);
    expect(p.complexity).toEqual(["inventory"]);
    expect(p.services).toEqual(["bookkeeping"]);
    expect(p.ewt).toBe("rental");
    expect(p.message).toBe("Industry: Retail or trading. Tax types on our COR: VAT (2550Q); Withholding on compensation (1601-C).");
  });
  it("treats percentage tax as non-VAT", () => {
    expect(prefillFromQuery({ tax: "pt" }).vat).toBe(false);
  });
  it("leaves the withholding answer to the visitor when the picker did not tick it", () => {
    const p = prefillFromQuery({ tax: ["pt", "it"] });
    expect(p.ewt).toBeUndefined();
    expect(p.message).toBe("Tax types on our COR: Percentage tax (2551Q); Income tax (1701Q/1701 or 1702Q/1702).");
    expect(prefillFromQuery({ tax: "ewt" })).toEqual({ ewt: "rental", complexity: [], services: [] });
  });
  it("ignores unknown values", () => {
    const p = prefillFromQuery({ taxpayer_type: "alien", industry: "<script>", tax: ["x"], service: "audit" });
    expect(p).toEqual({ complexity: [], services: [] });
  });
});
