import { describe, expect, it } from "vitest";
import { obligationsForTaxTypes, TaxTypeError } from "./obligations";

const forms = (...args: Parameters<typeof obligationsForTaxTypes>) => obligationsForTaxTypes(...args).map((o) => o.form);

describe("obligationsForTaxTypes", () => {
  it("gives an individual the 1701 returns", () => {
    expect(forms("individual", ["income_tax", "percentage_tax"])).toEqual(["1701Q", "1701", "2551Q"]);
  });
  it("gives a corporation the 1702 returns", () => {
    expect(forms("corporation", ["income_tax", "vat"])).toEqual(["1702Q", "1702-RT", "2550Q"]);
  });
  it("adds monthly, quarterly and annual withholding returns", () => {
    expect(forms("opc", ["wt_compensation", "wt_expanded"])).toEqual(["1601-C", "1604-C", "0619-E", "1601-EQ", "1604-E"]);
  });
  it("treats every non-individual the same for income tax", () => {
    for (const t of ["opc", "partnership", "non_stock"] as const) expect(forms(t, ["income_tax"])).toEqual(["1702Q", "1702-RT"]);
  });
  it("refuses VAT and percentage tax together", () => {
    expect(() => obligationsForTaxTypes("individual", ["vat", "percentage_tax"])).toThrow(TaxTypeError);
  });
  it("returns nothing for no tax types", () => {
    expect(forms("individual", [])).toEqual([]);
  });
  it("uses forms that have deadline rules", async () => {
    const { seedDeadlineRules } = await import("@/lib/deadlines/seed");
    const ruled = new Set(seedDeadlineRules.map((r) => `${r.form}/${r.frequency}`));
    const all = obligationsForTaxTypes("corporation", ["income_tax", "vat", "wt_compensation", "wt_expanded"])
      .concat(obligationsForTaxTypes("individual", ["income_tax", "percentage_tax"]));
    for (const o of all) expect(ruled.has(`${o.form}/${o.frequency}`), `${o.form} ${o.frequency}`).toBe(true);
  });
});
