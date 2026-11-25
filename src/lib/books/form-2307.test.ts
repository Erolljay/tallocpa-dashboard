import { describe, expect, it } from "vitest";
import {
  forms2307,
  groupByAtc,
  monthSlot,
  parsePeriod2307,
  portalPeriods,
  quarterOf,
  quarterValue,
  supplierKey,
  tin14,
  totalsOf,
  type Raw2307,
  type Raw2307Row,
} from "./form-2307";

const SUPPLY = "00000000-0000-0000-0000-0000000000a1";
const LAWYER = "00000000-0000-0000-0000-0000000000a2";

function row(p: Partial<Raw2307Row> & Pick<Raw2307Row, "invoice_id" | "issue_date">): Raw2307Row {
  return {
    reference: null, party_id: SUPPLY, party_name: "Iloilo Supply", party_tin: "444-555-666-00000", atc: "WC158", tax_code: "WC158",
    tax_code_name: "EWT 1% goods", tax_code_rate: "0.0100", income_payment: "0", withholding: "0",
    payee: { tin: "444-555-666", branch_code: "00000", kind: "non_individual", name: "Iloilo Supply Corp.", registered_address: "Jaro, Iloilo City", zip_code: "5000" },
    ...p,
  };
}

const raw = (rows: Raw2307Row[], locked: string[] = ["2026-01-01", "2026-02-01", "2026-03-01"]): Raw2307 => ({
  client: { id: "c", name: "Molo Hardware", tin: "111-222-333-000", rdo_code: "074", registered_address: "Molo, Iloilo City", taxpayer_type: "corporation" },
  settings: { zip_code: "5000", signatory_name: "Ana Reyes", signatory_title: "President" },
  books_start: "2026-01-01",
  months: ["2026-01-01", "2026-02-01", "2026-03-01"].map((m) => ({ month: m, locked: locked.includes(m) })),
  locked_months: locked,
  rows,
});

const Q1 = parsePeriod2307("2026-Q1")!;

describe("periods", () => {
  it("parses quarters and months, with their first and last day", () => {
    expect(Q1).toMatchObject({ kind: "quarter", year: 2026, quarter: 1, month: 1, from: "2026-01-01", to: "2026-03-31" });
    expect(parsePeriod2307("2024-Q1")!.to).toBe("2024-03-31");
    expect(parsePeriod2307("2026-Q4")).toMatchObject({ from: "2026-10-01", to: "2026-12-31" });
    expect(parsePeriod2307("2024-02")).toMatchObject({ kind: "month", quarter: 1, from: "2024-02-01", to: "2024-02-29" });
    expect(parsePeriod2307("2026-13")).toBeNull();
    expect(parsePeriod2307("2026-Q5")).toBeNull();
    expect(parsePeriod2307(undefined)).toBeNull();
  });

  it("places each month in its calendar quarter and its column of the quarter", () => {
    expect([1, 3, 4, 6, 7, 9, 10, 12].map(quarterOf)).toEqual([1, 1, 2, 2, 3, 3, 4, 4]);
    expect(["2026-01-31", "2026-02-01", "2026-03-15", "2026-04-01", "2026-08-09", "2026-12-31"].map(monthSlot)).toEqual([0, 1, 2, 0, 1, 2]);
    expect(quarterValue("2026-11")).toBe("2026-Q4");
  });

  it("offers the portal only fully locked quarters and locked months, newest first", () => {
    const p = portalPeriods(["2026-01", "2026-02", "2026-03", "2026-04"]);
    expect(p.map((x) => x.value)).toEqual(["2026-04", "2026-Q1", "2026-03", "2026-02", "2026-01"]);
  });
});

describe("TIN and supplier", () => {
  it("prints TINs as nine digits and a five-digit branch", () => {
    expect(tin14("444-555-666")).toBe("44455566600000");
    expect(tin14("444-555-666-001")).toBe("44455566600001");
    expect(tin14("444-555-666", "00002")).toBe("44455566600002");
    expect(tin14("12345")).toBe("");
  });

  it("keys a supplier by its party, else its TIN, else its name", () => {
    expect(supplierKey({ party_id: LAWYER, party_tin: null, party_name: "x" })).toBe(LAWYER);
    expect(supplierKey({ party_id: null, party_tin: "444-555-666-00000", party_name: "x" })).toBe("tin-44455566600000");
    expect(supplierKey({ party_id: null, party_tin: null, party_name: " Aling Nena's Store " })).toBe("name-aling-nena-s-store");
  });
});

describe("Part III by ATC", () => {
  it("adds income payments into the 1st, 2nd and 3rd month of the quarter, to the centavo", () => {
    const lines = groupByAtc([
      row({ invoice_id: "1", issue_date: "2026-01-20", income_payment: "1630.00", withholding: "16.30" }),
      row({ invoice_id: "2", issue_date: "2026-01-31", income_payment: "0.10", withholding: "0.00" }),
      row({ invoice_id: "3", issue_date: "2026-02-01", income_payment: "0.20", withholding: "0.00" }),
      row({ invoice_id: "4", issue_date: "2026-03-31", income_payment: "1000.05", withholding: "10.00" }),
      row({ invoice_id: "5", issue_date: "2026-03-01", atc: "WC160", tax_code_name: "EWT 2% services", income_payment: "333.33", withholding: "6.67" }),
      row({ invoice_id: "6", issue_date: "2026-02-14", atc: "WC010", income_payment: "10000", withholding: "1500" }),
    ]);
    expect(lines.map((l) => [l.atc, l.months, l.total, l.withheld])).toEqual([
      ["WC010", [0, 1000000, 0], 1000000, 150000],
      ["WC158", [163010, 20, 100005], 263035, 2630],
      ["WC160", [0, 0, 33333], 33333, 667],
    ]);
    // 0.10 + 0.20 is 30 centavos exactly (no float drift).
    expect(lines[1].months[0] + lines[1].months[1]).toBe(163030);
    expect(totalsOf(lines)).toEqual({ months: [163010, 1000020, 133338], total: 1296368, withheld: 153297 });
  });

  it("names the payment from the ATC table, else from the tax code", () => {
    const lines = groupByAtc([
      row({ invoice_id: "1", issue_date: "2026-01-02", atc: "WC158", income_payment: "1", withholding: "0" }),
      row({ invoice_id: "2", issue_date: "2026-01-02", atc: "WZ999", tax_code_name: "Some code", income_payment: "1", withholding: "0" }),
    ]);
    expect(lines.map((l) => l.nature)).toEqual(["Top WA supplier - goods", "Some code"]);
  });
});

describe("certificates", () => {
  const rows = [
    row({ invoice_id: "i1", issue_date: "2026-01-20", reference: "OR-9", income_payment: "1630", withholding: "16.30" }),
    row({ invoice_id: "i2", issue_date: "2026-03-03", reference: "OR-10", income_payment: "400", withholding: "4" }),
    row({ invoice_id: "i3", issue_date: "2026-03-05", reference: "OR-11", atc: "WC160", income_payment: "500", withholding: "10" }),
    row({
      invoice_id: "i4", issue_date: "2026-02-10", reference: "SOA-1", party_id: LAWYER, party_name: "Cruz, Juan", party_tin: "777-888-999-00000",
      atc: "WI010", income_payment: "20000", withholding: "1000",
      payee: { tin: "777-888-999", branch_code: "00000", kind: "individual", name: "Cruz, Juan Dela", registered_address: null, zip_code: null },
    }),
    row({ invoice_id: "i5", issue_date: "2026-04-02", income_payment: "999", withholding: "9.99" }),
  ];

  it("per quarter: one per supplier, the quarter as the period, payee and payor filled", () => {
    const set = forms2307(raw(rows), Q1, "quarter");
    expect(set.forms.map((f) => [f.payee.name, f.periodFrom, f.periodTo])).toEqual([
      ["CRUZ, JUAN DELA", "2026-01-01", "2026-03-31"],
      ["ILOILO SUPPLY CORP.", "2026-01-01", "2026-03-31"],
    ]);
    const supply = set.forms[1];
    expect(supply.payee).toEqual({ tin: "44455566600000", name: "ILOILO SUPPLY CORP.", address: "Jaro, Iloilo City", zipCode: "5000", foreignAddress: null });
    expect(supply.payor).toEqual({ tin: "11122233300000", name: "Molo Hardware", address: "Molo, Iloilo City", zipCode: "5000" });
    expect(supply.lines.map((l) => [l.atc, l.months, l.total, l.withheld])).toEqual([
      ["WC158", [163000, 0, 40000], 203000, 2030],
      ["WC160", [0, 0, 50000], 50000, 1000],
    ]);
    expect(supply.totals).toEqual({ months: [163000, 0, 90000], total: 253000, withheld: 3030 });
    expect(supply.businessTax).toEqual([]);
    expect(supply.signatory).toEqual({ name: "Ana Reyes", title: "President" });
    expect(supply.invoices.map((i) => i.reference)).toEqual(["OR-9", "OR-10", "OR-11"]);
    expect(supply.warnings).toEqual([]);
    // The April invoice is outside the quarter.
    expect(set.forms.flatMap((f) => f.invoices.map((i) => i.id))).not.toContain("i5");
    expect(set.suppliers.map((x) => x.key)).toEqual([LAWYER, SUPPLY]);
  });

  it("per month: one per supplier and month, the month as the period", () => {
    const set = forms2307(raw(rows), Q1, "month", SUPPLY);
    expect(set.forms.map((f) => [f.periodFrom, f.periodTo, f.totals.months, f.totals.withheld])).toEqual([
      ["2026-01-01", "2026-01-31", [163000, 0, 0], 1630],
      ["2026-03-01", "2026-03-31", [0, 0, 90000], 1400],
    ]);
  });

  it("per transaction: one per invoice, in its month's column", () => {
    const set = forms2307(raw(rows), parsePeriod2307("2026-03")!, "transaction");
    expect(set.forms.map((f) => [f.key, f.periodFrom, f.periodTo, f.lines.map((l) => l.atc), f.totals.months])).toEqual([
      ["i2", "2026-03-01", "2026-03-31", ["WC158"], [0, 0, 40000]],
      ["i3", "2026-03-01", "2026-03-31", ["WC160"], [0, 0, 50000]],
    ]);
  });

  it("a month period asked per quarter gives the month's certificates", () => {
    const set = forms2307(raw(rows), parsePeriod2307("2026-02")!, "quarter");
    expect(set.by).toBe("month");
    expect(set.forms.map((f) => [f.payee.name, f.periodFrom, f.totals.months])).toEqual([["CRUZ, JUAN DELA", "2026-02-01", [0, 2000000, 0]]]);
  });

  it("warns about missing details, wrong amounts and open months", () => {
    const set = forms2307(
      { ...raw(rows, ["2026-01-01"]), settings: null },
      Q1,
      "quarter",
    );
    expect(set.openMonths).toEqual(["February 2026", "March 2026"]);
    const cruz = set.forms[0];
    expect(cruz.warnings).toEqual(expect.arrayContaining([
      "No supplier registered address (item 4): complete the supplier in the parties directory.",
      "No client ZIP code (item 8A): set it in Payroll setup.",
      "No authorized representative to sign: set the signatory in Payroll setup.",
    ]));
    // WI010 is 5%: 1,000.00 on 20,000.00 is right.
    expect(cruz.warnings.some((w) => w.startsWith("WI010"))).toBe(false);
    const off = forms2307(raw([row({ invoice_id: "x", issue_date: "2026-01-05", income_payment: "1000", withholding: "20" })]), Q1, "quarter");
    expect(off.forms[0].warnings).toEqual(["WC158: tax withheld 20.00 is not 1% of 1000.00 (10.00)."]);
  });

  it("uses what the invoice says when the supplier is not in the directory", () => {
    const set = forms2307(raw([row({ invoice_id: "x", issue_date: "2026-01-05", party_id: null, party_name: "Aling Nena", party_tin: "123-456-789-00003", payee: null, income_payment: "100", withholding: "1" })]), Q1, "quarter");
    expect(set.forms[0]).toMatchObject({ supplierKey: "tin-12345678900003", payee: { tin: "12345678900003", name: "ALING NENA", address: null } });
  });
});
