import { describe, expect, it } from "vitest";
import { birFormFields, formsFor, holdFlag, whereIsTheFile, type FormFacts, type RunnerStep } from "./runner";

const step = (code: string, sort: number, status: RunnerStep["status"], done_on: string | null = null): RunnerStep => ({
  code,
  agency: code.startsWith("bir") ? "bir" : code === "mayors_permit" ? "lgu" : code === "barangay_clearance" ? "barangay" : "dti",
  label: code,
  status,
  sort_order: sort,
  done_on,
  status_changed_at: "2026-01-01T00:00:00Z",
});

const facts = (over: Partial<FormFacts> = {}): FormFacts => ({
  kind: "new_business",
  effective_date: null,
  lgu: "Iloilo City",
  employer: false,
  details: {},
  client: {
    name: "Jaro Bakeshop",
    taxpayer_type: "individual",
    tin: null,
    rdo_code: null,
    registered_address: "12 Lopez Jaena St., Jaro, Iloilo City",
    fiscal_year_end_month: 12,
    book_type: "manual",
    tax_types: [],
    registration_date: null,
  },
  steps: [{ code: "dti_business_name", status: "done", reference_no: "BN-1234567", done_on: "2026-01-05" }],
  ...over,
});

describe("holdFlag", () => {
  it("follows the routing slip: over 7 days needs a follow-up, over 14 is late", () => {
    expect(holdFlag(null)).toBeNull();
    expect(holdFlag(7)).toBeNull();
    expect(holdFlag(8)).toBe("follow_up");
    expect(holdFlag(14)).toBe("follow_up");
    expect(holdFlag(15)).toBe("late");
  });
});

describe("whereIsTheFile", () => {
  it("finds the current step, days held there and days open", () => {
    const w = whereIsTheFile(
      [step("dti_business_name", 1, "done", "2026-01-05"), step("barangay_clearance", 2, "waiting_client"), step("mayors_permit", 3, "pending"), step("bir_x", 4, "not_applicable")],
      "2026-01-01",
      "2026-01-25",
    );
    expect(w.current).toMatchObject({ code: "barangay_clearance", office: "Barangay", status: "Waiting on client", days_held: 20 });
    expect(w.flag).toBe("late");
    expect(w.days_open).toBe(24);
    expect(w.progress).toBe("1 of 3 steps");
    expect(w.waiting_on).toBe("client");
  });

  it("has no current step when every step is done or not needed", () => {
    const w = whereIsTheFile([step("dti_business_name", 1, "done", "2026-01-05")], "2026-01-01", "2026-02-01");
    expect(w.current).toBeNull();
    expect(w.flag).toBeNull();
  });
});

describe("formsFor", () => {
  it("picks 1901 for individuals, 1903 for others, 1905 for updates and closures, none otherwise", () => {
    expect(formsFor("new_business", "individual")).toEqual(["1901"]);
    expect(formsFor("new_business", "corporation")).toEqual(["1903"]);
    expect(formsFor("branch", "partnership")).toEqual(["1903"]);
    expect(formsFor("bir_update", "corporation")).toEqual(["1905"]);
    expect(formsFor("closure", "individual")).toEqual(["1905"]);
    expect(formsFor("renewal", "individual")).toEqual([]);
    expect(formsFor("employer", "corporation")).toEqual([]);
  });
});

describe("birFormFields", () => {
  it("fills 1901 only from the app and lists the rest as missing, never guessing", () => {
    const f = birFormFields("1901", facts());
    const get = (field: string) => f.find((x) => x.field === field);
    expect(get("Business / trade name")?.value).toBe("Jaro Bakeshop");
    expect(get("DTI business name certificate no.")?.value).toBe("BN-1234567");
    expect(get("TIN")?.value).toBeNull();
    expect(get("RDO code")?.value).toBeNull();
    expect(get("Date of birth")?.value).toBeNull();
    expect(get("Mayor's permit no.")).toMatchObject({ value: null, source: 'Step "mayors_permit" not done yet' });
    expect(get("Accounting period")?.value).toBe("Calendar year (ends December)");
    expect(get("Will hire employees")?.value).toBe("No");
  });

  it("fills 1903 with the SEC registration and its date once the step is done", () => {
    const f = birFormFields(
      "1903",
      facts({
        client: { ...facts().client, taxpayer_type: "corporation", name: "Molo Foods Inc.", fiscal_year_end_month: 6 },
        steps: [{ code: "sec_registration", status: "done", reference_no: "2026010001234", done_on: "2026-01-10" }],
      }),
    );
    expect(f.find((x) => x.field === "SEC registration no.")?.value).toBe("2026010001234");
    expect(f.find((x) => x.field === "Date of incorporation / registration")?.value).toBe("2026-01-10");
    expect(f.find((x) => x.field === "Accounting period")?.value).toBe("Fiscal year ending June");
  });

  it("fills 1905 for an update with the changes and the effective date, and never invents the new address", () => {
    const f = birFormFields(
      "1905",
      facts({
        kind: "bir_update",
        effective_date: "2026-03-01",
        details: { changes: ["address", "tax_types"] },
        client: { ...facts().client, tin: "123-456-789-00000", rdo_code: "074", tax_types: [{ name: "Percentage tax" }] },
      }),
    );
    const get = (field: string) => f.find((x) => x.field === field);
    expect(get("TIN")?.value).toBe("123-456-789-00000");
    expect(get("Changes being filed")?.value).toContain("Add or remove tax types");
    expect(get("Effective date of the change")?.value).toBe("2026-03-01");
    expect(get("New address")?.value).toBeNull();
    expect(get("Tax types on the current COR")?.value).toBe("Percentage tax");
  });

  it("fills 1905 for a closure with the date the business stopped", () => {
    const f = birFormFields("1905", facts({ kind: "closure", effective_date: "2026-04-30", client: { ...facts().client, tin: "123-456-789-00000" } }));
    expect(f.find((x) => x.field === "Purpose")?.value).toMatch(/Cancellation/);
    expect(f.find((x) => x.field === "Date the business stopped operating")?.value).toBe("2026-04-30");
  });
});
