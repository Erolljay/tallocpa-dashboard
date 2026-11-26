import { describe, expect, it } from "vitest";
import { BIR_LINES, isBirLine } from "../bir-lines";
import { FS_LINES, isFsLine } from "../fs-lines";
import { SINGLE_CONTROLS, TEMPLATES, type TemplateCode } from "../types";
import { COA_TEMPLATES, templatePayload } from ".";

const codes = Object.keys(TEMPLATES) as TemplateCode[];
const PNL = new Set(["revenue", "cost", "expense", "other_income", "income_tax"]);

describe.each(codes)("%s template", (code) => {
  const accounts = COA_TEMPLATES[code];

  it("has unique codes and keys", () => {
    expect(new Set(accounts.map((a) => a.code)).size).toBe(accounts.length);
    expect(new Set(accounts.map((a) => a.key)).size).toBe(accounts.length);
  });

  it("puts every account on a known FS line of the right statement", () => {
    for (const a of accounts) {
      expect(isFsLine(a.fsLine), `${a.code} ${a.fsLine}`).toBe(true);
      const statement = FS_LINES[a.fsLine as keyof typeof FS_LINES].statement;
      expect(statement, a.code).toBe(PNL.has(a.type) ? "sci" : "sfp");
    }
  });

  it("maps every income and expense account to a BIR line, and no balance-sheet account", () => {
    for (const a of accounts) {
      if (PNL.has(a.type)) expect(a.birLine && isBirLine(a.birLine), `${a.code} ${a.name}`).toBe(true);
      else expect(a.birLine, a.code).toBeNull();
    }
  });

  it("has each single-purpose control account once, plus cash, capital", () => {
    // Proprietors and partners close the year's profit to capital; they have no retained earnings.
    const noRetained = code === "sole_proprietorship" || code === "partnership";
    for (const c of SINGLE_CONTROLS) {
      expect(accounts.filter((a) => a.control === c).length, c).toBe(c === "retained_earnings" && noRetained ? 0 : 1);
    }
    expect(accounts.some((a) => a.control === "cash")).toBe(true);
    expect(accounts.some((a) => a.control === "capital" || a.control === "retained_earnings")).toBe(true);
  });

  it("keeps the shared keys that supplier presets point to", () => {
    for (const k of ["representation", "meals", "office_supplies", "fuel_oil", "light_water", "communication", "purchases", "sales", "service_income"]) {
      expect(accounts.some((a) => a.key === k), k).toBe(true);
    }
  });

  it("keeps each agency's contributions and loans payable apart, with no combined account", () => {
    const keys = accounts.map((a) => a.key);
    for (const k of ["sss_payable", "philhealth_payable", "pagibig_payable", "sss_loans_payable", "pagibig_loans_payable"]) {
      expect(accounts.find((a) => a.key === k), k).toMatchObject({ type: "liability", normalSide: "credit", fsLine: "accrued_liabilities" });
    }
    expect(keys).not.toContain("government_contributions_payable");
    expect(keys).not.toContain("government_loans_payable");
  });

  it("builds the setup payload in chart order", () => {
    const p = templatePayload(code);
    expect(p).toHaveLength(accounts.length);
    expect(p[0]).toMatchObject({ code: "1010", normal_side: "debit", sort_order: 10 });
  });
});

describe("chart content", () => {
  it("uses every deduction line the firm's FSs show", () => {
    const used = new Set(COA_TEMPLATES.stock_corporation.map((a) => a.birLine));
    for (const k of ["ded_salaries", "ded_contributions", "ded_utilities", "ded_fuel_oil", "ded_taxes_licenses", "ded_insurance", "ded_depreciation", "ded_miscellaneous", "ded_professional_fees", "ded_representation"]) {
      expect(used.has(k), k).toBe(true);
    }
    expect(Object.keys(BIR_LINES).length).toBeGreaterThan(30);
  });

  it("gives contra accounts the opposite side", () => {
    const corp = COA_TEMPLATES.stock_corporation;
    expect(corp.find((a) => a.key === "accum_dep_building")?.normalSide).toBe("credit");
    expect(corp.find((a) => a.key === "sales_returns")?.normalSide).toBe("debit");
    expect(corp.find((a) => a.key === "dividends")?.normalSide).toBe("debit");
    expect(COA_TEMPLATES.sole_proprietorship.find((a) => a.key === "owners_drawings")?.normalSide).toBe("debit");
  });

  it("names the owners' advances by kind of entity", () => {
    expect(COA_TEMPLATES.opc.find((a) => a.key === "advances_from_owners")?.name).toBe("Advances from Sole Stockholder");
    expect(COA_TEMPLATES.partnership.find((a) => a.key === "advances_from_owners")?.name).toBe("Advances from Partners");
  });
});
