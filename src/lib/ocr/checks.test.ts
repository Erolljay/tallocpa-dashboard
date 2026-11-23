import { describe, expect, it } from "vitest";
import { checkFields } from "./checks";
import { normalizeAmount, normalizeFields, normalizeTin, ocrOutputSchema } from "./fields";

const ok = { date: "2026-11-10", number: "0012", party_tin: "123-456-789-000", vatable: "1000.00", vat: "120.00", total: "1120.00" };
const msgs = (f: object, ctx = {}) => checkFields(f, { today: "2026-11-23", ...ctx }).map((i) => i.field);

describe("checkFields", () => {
  it("passes a clean VAT receipt", () => {
    expect(msgs(ok)).toEqual([]);
  });
  it("flags a bad TIN, wrong VAT and a total that does not add up", () => {
    expect(msgs({ ...ok, party_tin: "12345" })).toEqual(["party_tin"]);
    expect(msgs({ ...ok, vat: "100.00", total: "1100.00" })).toEqual(["vat"]);
    expect(msgs({ ...ok, total: "1200.00" })).toEqual(["total"]);
  });
  it("flags a missing or future date, a prior year and a duplicate", () => {
    expect(msgs({ ...ok, date: null })).toEqual(["date"]);
    expect(msgs({ ...ok, date: "2026-12-01" })).toEqual(["date"]);
    expect(msgs(ok, { priorYear: true, duplicateOf: "x" })).toEqual(["date", "number"]);
  });
});

describe("normalizing what OCR read", () => {
  it("cleans amounts and TINs", () => {
    expect(normalizeAmount("₱1,120.5")).toBe("1120.50");
    expect(normalizeAmount("PHP 99")).toBe("99.00");
    expect(normalizeAmount("about 5")).toBeNull();
    expect(normalizeTin("123456789000")).toBe("123-456-789-000");
    expect(normalizeTin("12")).toBeNull();
  });
  it("keeps only ISO dates", () => {
    expect(normalizeFields({ date: "11/10/2026", total: "1,000" })).toMatchObject({ date: null, total: "1000.00" });
  });
  it("rejects provider output in the wrong shape", () => {
    expect(ocrOutputSchema.safeParse({ fields: { total: 5 }, confidence: { total: 0.9 } }).success).toBe(true);
    expect(ocrOutputSchema.safeParse({ total: 5 }).success).toBe(false);
    expect(ocrOutputSchema.safeParse({ fields: {}, confidence: { total: 2 } }).success).toBe(false);
  });
});
