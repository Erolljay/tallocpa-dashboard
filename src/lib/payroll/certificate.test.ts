import { describe, expect, it } from "vitest";
import { alphaCols, alphalistDat, buildAlphalist } from "./alphalist";
import { certificatesFromRaw, form2316, paidInYear, period2316, tin14, type Form2316Employer, type Payroll2316Raw } from "./certificate";
import { annualTax, suggestWithholding } from "./compute";
import { emptyAmounts, type Employee, type PayAmounts, type PayrollContext, type PayrollEntry, type PriorEmployer } from "./types";
import { buildYear } from "./year";

const P = (pesos: number) => Math.round(pesos * 100);

const employee = (over: Partial<Employee>): Employee => ({
  id: "e1", employeeNo: "001", lastName: "Dela Cruz", firstName: "Juan", middleName: "Santos",
  tin: "111-222-333", tinBranch: "0000", birthDate: "1990-07-04", address: "12 Rizal St., Iloilo City", zipCode: "5000", region: "VI",
  nationality: "FILIPINO", employmentStatus: "R", isMwe: false, mweDailyRate: null, mweMonthlyRate: null,
  hireDate: null, separationDate: null, separationReason: null, substitutedFiling: true, active: true, needsDetails: false,
  ...over,
});

const entry = (employeeId: string, month: number, over: Partial<Record<keyof PayAmounts, number>>): PayrollEntry => {
  const a = emptyAmounts();
  for (const [k, v] of Object.entries(over)) a[k as keyof PayAmounts] = P(v!);
  return { employeeId, payMonth: `2025-${String(month).padStart(2, "0")}-01`, note: null, ...a };
};

const employer: Form2316Employer = { name: "Tallo Test Trading, Inc.", tin: "123-456-789-000", rdoCode: "074", registeredAddress: "Jaro, Iloilo City", zipCode: "5000" };
const signatory = { name: "Ana Reyes", title: "HR Manager" };

function one(e: Employee, entries: PayrollEntry[], prior: PriorEmployer[] = []) {
  const ctx: PayrollContext = { year: 2025, throughMonth: 12, employees: [e], entries, priorEmployers: prior };
  const [y] = buildYear(ctx);
  return { y, f: form2316(y, 2025, employer, signatory) };
}

const contrib = { sssEmployee: 1350, philhealthEmployee: 750, pagibigEmployee: 200 }; // 2,300 a month

describe("BIR 2316 — regular employee (items 19–52)", () => {
  const months = Array.from({ length: 12 }, (_, i) =>
    entry("e1", i + 1, {
      basic: 30000, deMinimis: 2000, ...contrib, taxWithheld: 1000,
      ...(i === 2 ? { overtime: 1500, holidayPay: 800, nightDifferential: 400, hazardPay: 600 } : {}),
      ...(i === 5 ? { otherTaxable: 1000, commission: 5000, profitShare: 2500, directorFee: 3000 } : {}),
      ...(i === 11 ? { thirteenthMonth: 100000, separation: 0 } : {}),
    }),
  );
  const { f } = one(employee({}), months);
  const a = f.amounts;

  it("non-taxable items 29–38", () => {
    expect(a["29"]).toBe(0);
    for (const k of ["30", "31", "32", "33"]) expect(a[k]).toBe(0);
    expect(a["34"]).toBe(P(90000)); // capped
    expect(a["35"]).toBe(P(24000));
    expect(a["36"]).toBe(P(2300 * 12));
    expect(a["37"]).toBe(0);
    expect(a["38"]).toBe(P(90000 + 24000 + 27600));
  });

  it("taxable items 39–52", () => {
    expect(a["39"]).toBe(P(360000 - 27600));
    for (const k of ["40", "41", "42", "43", "44B", "51B"]) expect(a[k]).toBe(0);
    expect(a["44A"]).toBe(P(1000));
    expect(a["45"]).toBe(P(5000));
    expect(a["46"]).toBe(P(2500));
    expect(a["47"]).toBe(P(3000));
    expect(a["48"]).toBe(P(10000)); // 13th month over ₱90,000
    expect(a["49"]).toBe(P(600));
    expect(a["50"]).toBe(P(1500));
    expect(a["51A"]).toBe(P(1200));
    expect(a["52"]).toBe(P(332400 + 1000 + 5000 + 2500 + 3000 + 10000 + 600 + 1500 + 1200));
  });

  it("summary items 19–28 reconcile", () => {
    const gross = P(360000 + 24000 + 1500 + 800 + 400 + 600 + 1000 + 5000 + 2500 + 3000 + 100000);
    expect(a["19"]).toBe(gross);
    expect(a["19"]).toBe(a["38"] + a["52"]);
    expect(a["20"]).toBe(a["38"]);
    expect(a["21"]).toBe(a["52"]);
    expect(a["22"]).toBe(0);
    expect(a["23"]).toBe(a["21"]);
    expect(a["24"]).toBe(annualTax(a["23"], 2025));
    expect(a["25A"]).toBe(P(12000));
    expect(a["25B"]).toBe(0);
    expect(a["26"]).toBe(P(12000));
    expect(a["27"]).toBe(0);
    expect(a["28"]).toBe(P(12000));
  });

  it("Part I, II and the signatories", () => {
    expect(f.year).toBe(2025);
    expect([f.periodFrom, f.periodTo]).toEqual(["0101", "1231"]);
    expect(f.employee).toMatchObject({ tin: "11122233300000", name: "DELA CRUZ, JUAN, SANTOS", rdoCode: "074", zipCode: "5000", birthDate: "1990-07-04" });
    expect(f.employer).toMatchObject({ tin: "12345678900000", name: "Tallo Test Trading, Inc.", zipCode: "5000", type: "main" });
    expect(f.previous).toBeNull();
    expect(f.mwe).toEqual({ isMwe: false, dailyRate: null, monthlyRate: null });
    expect(f.signatory).toEqual(signatory);
    // Tax due (≈ 33,595) is not what was withheld (12,000): not qualified for substituted filing.
    expect(f.substitutedFiling).toBe(false);
    expect(f.warnings.join(" ")).toMatch(/does not equal tax withheld/);
  });

  it("qualifies for substituted filing when tax due equals tax withheld", () => {
    const due = a["24"] / 100;
    const settled = months.map((m, i) => (i === 11 ? { ...m, taxWithheld: P(due - 11000) } : m));
    const { f: g } = one(employee({}), settled);
    expect(g.amounts["28"]).toBe(g.amounts["24"]);
    expect(g.substitutedFiling).toBe(true);
    expect(g.warnings).toEqual([]);
  });
});

describe("BIR 2316 — minimum wage earner", () => {
  const mwe = employee({ isMwe: true, mweDailyRate: P(645), mweMonthlyRate: P(16770), substitutedFiling: false });
  const mc = { sssEmployee: 675, philhealthEmployee: 375, pagibigEmployee: 200 };
  const { f } = one(mwe, [
    entry("e1", 1, { basic: 16770, overtime: 1200, holidayPay: 645, nightDifferential: 300, hazardPay: 250, deMinimis: 1000, ...mc }),
    entry("e1", 2, { basic: 16770, thirteenthMonth: 16770, ...mc }),
  ]);
  const a = f.amounts;

  it("reports the SMW net of contributions in item 29 and the MWE premiums in 30–33", () => {
    expect(a["29"]).toBe(P(2 * (16770 - 1250)));
    expect([a["30"], a["31"], a["32"], a["33"]]).toEqual([P(645), P(1200), P(300), P(250)]);
    expect(a["34"]).toBe(P(16770));
    expect(a["35"]).toBe(P(1000));
    expect(a["36"]).toBe(P(2500));
    expect(a["38"]).toBe(a["19"]);
  });

  it("has nothing taxable and no tax", () => {
    for (const k of ["39", "49", "50", "51A", "52", "21", "23", "24", "28"]) expect(a[k]).toBe(0);
  });

  it("fills items 9–11", () => {
    expect(f.mwe).toEqual({ isMwe: true, dailyRate: P(645), monthlyRate: P(16770) });
    expect(f.warnings).toEqual([]);
    const { f: noMonthly } = one({ ...mwe, mweMonthlyRate: null }, [entry("e1", 1, { basic: 16770 })]);
    expect(noMonthly.warnings.join(" ")).toMatch(/item 10 is blank/);
  });
});

describe("BIR 2316 — employee separated within the year", () => {
  const left = employee({ hireDate: "2025-03-16", separationDate: "2025-08-31", separationReason: "T" });
  it("prints the period from the hire date to the separation date", () => {
    expect(period2316(left, 2025)).toEqual({ from: "0316", to: "0831" });
    expect(period2316(employee({ hireDate: "2019-06-01", separationDate: "2026-01-15" }), 2025)).toEqual({ from: "0101", to: "1231" });
    const { f } = one(left, [3, 4, 5, 6, 7, 8].map((m) => entry("e1", m, { basic: 25000, ...contrib, separation: m === 8 ? 50000 : 0 })));
    expect([f.periodFrom, f.periodTo]).toEqual(["0316", "0831"]);
    expect(f.amounts["37"]).toBe(P(50000)); // separation pay: non-taxable "salaries and other forms"
    expect(f.amounts["19"]).toBe(f.amounts["38"] + f.amounts["52"]);
  });
});

describe("BIR 2316 — employee with a previous employer in the year", () => {
  const prior: PriorEmployer = {
    employeeId: "e1", year: 2025, tin: "999-888-777-00000", name: "Old Employer Corp.", address: "Makati City", zipCode: "1200",
    taxable: P(200000), nonTaxable: P(30000), withheld: P(8000),
  };
  const hired = employee({ hireDate: "2025-07-01" });
  const entries = [7, 8, 9, 10, 11, 12].map((m) => entry("e1", m, { basic: 40000, ...contrib, taxWithheld: 3000 }));
  const { y, f } = one(hired, entries, [prior]);
  const a = f.amounts;

  it("fills Part III and items 22, 23, 24, 25B, 26 and 28 per the form", () => {
    expect(f.previous).toEqual({ tin: "99988877700000", name: "Old Employer Corp.", address: "Makati City", zipCode: "1200" });
    expect(a["21"]).toBe(P(6 * (40000 - 2300)));
    expect(a["22"]).toBe(P(200000));
    expect(a["23"]).toBe(a["21"] + P(200000));
    expect(a["24"]).toBe(annualTax(a["23"], 2025));
    expect(a["25A"]).toBe(P(18000));
    expect(a["25B"]).toBe(P(8000));
    expect(a["26"]).toBe(P(26000));
    expect(a["28"]).toBe(P(26000));
    expect(f.periodFrom).toBe("0701");
  });

  it("is not qualified for substituted filing", () => {
    expect(f.substitutedFiling).toBe(false);
    expect(f.warnings.join(" ")).toMatch(/previous employer/);
  });

  it("enters the year-end adjustment", () => {
    const s = suggestWithholding(hired, y.lines, 11, 2025, prior);
    expect(s.annualTaxDue).toBe(a["24"]);
    expect(s.withheldBefore).toBe(P(8000 + 5 * 3000));
  });

  it("fills the alphalist's previous-employer columns (taxify left them zero)", () => {
    const list = buildAlphalist(buildYear({ year: 2025, throughMonth: 12, employees: [hired], entries, priorEmployers: [prior] }), 2025);
    const c = alphaCols(list.schedule1[0]);
    expect([c.c12a, c.c12f, c.c12j]).toEqual([P(230000), P(30000), P(200000)]);
    expect(c.c13).toBe(c.c7j + P(200000));
    expect(c.c14).toBe(a["24"]);
    expect([c.c15a, c.c15b]).toEqual([P(8000), P(18000)]);
    expect(c.c17a - c.c17b).toBe(a["24"] - P(26000));
    const dat = alphalistDat(list, { tin: employer.tin, name: employer.name }, 2025).body.split("\r\n");
    expect(dat[1].split(",").slice(12, 23)).toEqual(["230000.00", "30000.00", "0.00", "0.00", "0.00", "0.00", "30000.00", "0.00", "0.00", "200000.00", "200000.00"]);
    expect(dat[2].split(",").slice(5, 16)).toEqual(["230000.00", "30000.00", "0.00", "0.00", "0.00", "0.00", "30000.00", "0.00", "0.00", "200000.00", "200000.00"]);
  });
});

describe("BIR 2316 — helpers and loading", () => {
  it("pads TINs to nine digits and a five-digit branch", () => {
    expect(tin14("123-456-789")).toBe("12345678900000");
    expect(tin14("123-456-789-001")).toBe("12345678900001");
    expect(tin14("123-456-789", "0002")).toBe("12345678900002");
    expect(tin14(null)).toBe("");
  });

  it("builds every paid employee's certificate from payroll_2316_data()", () => {
    const raw: Payroll2316Raw = {
      client: { id: "c1", name: "Tallo Test Trading, Inc.", tin: "123-456-789-000", rdo_code: "074", registered_address: "Jaro" },
      settings: { employer_zip_code: "5000", signatory_name: "Ana Reyes", signatory_title: "HR Manager" },
      release: { released_at: "2026-01-20T01:00:00+00:00" },
      employees: [
        { id: "e1", last_name: "Dela Cruz", first_name: "Juan", tin: "111-222-333", tin_branch: "0000", is_mwe: false, substituted_filing: true },
        { id: "e2", last_name: "Abad", first_name: "Ana", tin: null, tin_branch: "0000", is_mwe: false },
      ],
      items: [
        { id: "i1", name: "Basic Pay", kind: "earning", bir_category: "basic", sort_order: 1, active: true },
        { id: "i2", name: "Withholding Tax", kind: "deduction", bir_category: "withholding_tax", sort_order: 2, active: true },
      ],
      entries: [
        { employee_id: "e1", pay_month: "2025-01-01", adjustment: 0, note: null, payroll_entry_lines: [{ item_id: "i1", amount: 30000 }, { item_id: "i2", amount: 1000.5 }] },
        { employee_id: "e1", pay_month: "2025-02-01", adjustment: 0, note: null, payroll_entry_lines: [{ item_id: "i1", amount: "30000.00" }] },
      ],
      prior_employers: [],
    };
    const set = certificatesFromRaw(raw, 2025);
    expect(set.releasedAt).toBe("2026-01-20T01:00:00+00:00");
    expect(set.forms.map((f) => f.employeeId)).toEqual(["e1"]); // Ana was not paid
    expect(set.forms[0].amounts["19"]).toBe(P(60000));
    expect(set.forms[0].amounts["25A"]).toBe(P(1000.5));
    expect(set.forms[0].employer.zipCode).toBe("5000");
    expect(certificatesFromRaw(raw, 2025, "e2").forms).toEqual([]);
    expect(paidInYear([])).toEqual([]);
  });
});
