import { describe, expect, it } from "vitest";
import { moduleForForm } from "../../registry";
import { BUSINESS_TAX_FORMS } from "../business";
import { ctxFor, purchase, sale } from "./testing";

describe("business tax forms", () => {
  it("are registered under their filing form codes", () => {
    for (const form of ["2551Q", "2550Q", "1701Q", "1702Q", "1701", "1701A", "1702-RT"]) expect(moduleForForm(form)?.forms).toContain(form);
  });

  it("give every line a unique key", () => {
    const inputs: Record<string, Record<string, string>> = {
      "2551Q": {},
      "2550Q": {},
      "1701Q": { regime: "graduated_itemized" },
      "1702Q": { deduction: "itemized", corporate_rate: "regular" },
      "1701": {},
      "1702-RT": { deduction: "itemized", corporate_rate: "regular" },
    };
    for (const m of BUSINESS_TAX_FORMS) {
      const form = m.forms[0];
      const individual = form === "1701Q" || form === "1701";
      for (const regime of individual ? ["graduated_itemized", "graduated_osd", "8pct"] : [""]) {
        const ctx = ctxFor({
          form,
          periodStart: "2026-04-01",
          periodEnd: "2026-06-30",
          client: individual ? { taxpayerType: "individual" } : {},
          inputs: { ...inputs[form], ...(regime ? { regime } : {}) },
          documents: [sale({ month: "2026-04", total: 1000 }), purchase({ month: "2026-05", total: 100 })],
        });
        const keys = m.compute(ctx).sections.flatMap((s) => s.lines.map((l) => l.key));
        expect(keys.length).toBeGreaterThan(5);
        expect(new Set(keys).size, `${form} ${regime}`).toBe(keys.length);
      }
    }
  });
});
