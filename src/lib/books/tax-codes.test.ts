import { describe, expect, it } from "vitest";
import { appliesTo, canGoOn, formsFor, placeOf, RETURN_LINES, returnLinesFor, TAX_CODE_KINDS, taxOn, toTaxCode } from "./tax-codes";

describe("tax code kinds", () => {
  it("covers every kind the database allows, each with the return lines it feeds", () => {
    expect(TAX_CODE_KINDS).toHaveLength(11);
    for (const k of TAX_CODE_KINDS) {
      // Purchases with no invoice are deliberately on no BIR list or return.
      if (k !== "not_reported_purchases") for (const side of appliesTo(k)) expect(returnLinesFor(k, side).length, `${k} on ${side}`).toBeGreaterThan(0);
      expect(Object.keys(RETURN_LINES[k]).sort()).toEqual([...appliesTo(k)].sort());
    }
  });

  it("keeps purchases with no invoice off every BIR list, on purchase lines only", () => {
    expect(appliesTo("not_reported_purchases")).toEqual(["purchase"]);
    expect(canGoOn("not_reported_purchases", "purchase", "line")).toBe(true);
    expect(canGoOn("not_reported_purchases", "sales", "line")).toBe(false);
    expect(returnLinesFor("not_reported_purchases", "purchase")).toEqual([]);
    expect(formsFor("not_reported_purchases", "purchase")).toEqual([]);
  });

  it("puts VAT codes on lines of their own side and withholding codes on the invoice", () => {
    expect(canGoOn("output_vat", "sales", "line")).toBe(true);
    expect(canGoOn("output_vat", "purchase", "line")).toBe(false);
    expect(canGoOn("input_vat_services", "purchase", "line")).toBe(true);
    expect(canGoOn("input_vat_services", "sales", "line")).toBe(false);
    expect(canGoOn("withholding", "sales", "invoice")).toBe(true);
    expect(canGoOn("withholding", "purchase", "invoice")).toBe(true);
    expect(canGoOn("withholding", "sales", "line")).toBe(false);
    expect(canGoOn("govt_vat_withheld", "sales", "invoice")).toBe(true);
    expect(canGoOn("govt_vat_withheld", "purchase", "invoice")).toBe(false);
    expect(placeOf("zero_rated_purchases")).toBe("line");
  });

  it("feeds the 2550Q, SLS and SLP from VAT codes", () => {
    expect(returnLinesFor("output_vat", "sales").map((l) => `${l.form} ${l.line}`)).toEqual(["2550Q 31A", "2550Q 31B", "SLS taxable_sales", "SLS output_tax"]);
    expect(returnLinesFor("input_vat_capital", "purchase").map((l) => l.line)).toContain("capital_goods");
    expect(returnLinesFor("vat_exempt_purchases", "purchase")[0]).toMatchObject({ form: "2550Q", line: "49A" });
    expect(returnLinesFor("output_vat", "purchase")).toEqual([]);
  });

  it("feeds EWT returns from a purchase's withholding and the SAWT from a sale's", () => {
    expect(formsFor("withholding", "purchase")).toEqual(["0619-E", "1601-EQ", "QAP", "2307 issued"]);
    expect(formsFor("withholding", "sales")).toEqual(["SAWT", "2307 received", "1702Q", "1701Q"]);
    expect(formsFor("govt_vat_withheld", "sales")).toEqual(["2550Q", "SAWT"]);
  });

  it("works out tax in centavos and reads database rows", () => {
    expect(taxOn(10_000_000, 0.12)).toBe(1_200_000);
    expect(taxOn(1_005, 0.12)).toBe(121);
    expect(toTaxCode({ id: "x", code: "WC158", name: "WC158", kind: "withholding", rate: "0.0100", atc: "WC158", payee_type: "corporate", active: true })).toMatchObject({ rate: 0.01, payeeType: "corporate" });
  });
});
