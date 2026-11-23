import { describe, expect, it } from "vitest";
import { engagementSchema, formToObject, newClientSchema } from "./schema";

const base = {
  name: "Iloilo Feast Food Corp.",
  taxpayer_type: "corporation",
  registration_date: "2027-01-04",
  fiscal_year_end_month: "12",
  filing_channel: "ebirforms",
  book_type: "loose_leaf",
  payment_mode: "firm_remits",
  submission_cutoff_day: "5",
};

describe("newClientSchema", () => {
  it("accepts a complete client and turns blanks into undefined", () => {
    const r = newClientSchema.parse({ ...base, tin: "", rdo_code: "", tax_types: ["income_tax", "vat"] });
    expect(r.tin).toBeUndefined();
    expect(r.fiscal_year_end_month).toBe(12);
    expect(r.tax_types).toEqual(["income_tax", "vat"]);
  });
  it("checks the TIN format", () => {
    expect(newClientSchema.safeParse({ ...base, tin: "123456789" }).success).toBe(false);
    expect(newClientSchema.safeParse({ ...base, tin: "123-456-789-00000" }).success).toBe(true);
  });
  it("requires a group for eFPS filers and drops it for eBIRForms", () => {
    expect(newClientSchema.safeParse({ ...base, filing_channel: "efps" }).success).toBe(false);
    expect(newClientSchema.parse({ ...base, filing_channel: "efps", efps_group: "C" }).efps_group).toBe("C");
    expect(newClientSchema.parse({ ...base, efps_group: "C" }).efps_group).toBeUndefined();
  });
  it("rejects an unknown tax type", () => {
    expect(newClientSchema.safeParse({ ...base, tax_types: ["sin_tax"] }).success).toBe(false);
  });
});

describe("formToObject", () => {
  it("keeps every checked tax type", () => {
    const f = new FormData();
    f.append("name", "X");
    f.append("tax_types", "vat");
    f.append("tax_types", "income_tax");
    expect(formToObject(f)).toEqual({ name: "X", tax_types: ["vat", "income_tax"] });
  });
});

describe("engagementSchema", () => {
  it("accepts centavos but not fractions of a centavo", () => {
    expect(engagementSchema.safeParse({ service_line: "tax_compliance", monthly_retainer: "2500.50", start_date: "2027-01-01" }).success).toBe(true);
    expect(engagementSchema.safeParse({ service_line: "tax_compliance", monthly_retainer: "2500.505", start_date: "2027-01-01" }).success).toBe(false);
  });
});
