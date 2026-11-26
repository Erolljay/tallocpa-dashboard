import { describe, expect, it } from "vitest";
import { lookupAtc, normalizeAtc } from "./atc";
import { buildPriorFigures, flattenFigures, fromRegisterLine, isApproved, monthInPeriod, monthsInPeriod, priorKey, taxableYearStart, toSourceDocument, type DocumentRow } from "./source";

const row = (over: Partial<DocumentRow> = {}): DocumentRow => ({
  id: "d1",
  doc_type: "bir_2307_issued",
  document_month: "2026-02-01",
  status: "posted",
  extractions: {
    approved_fields: {
      date: "2026-02-14", number: "0007", party_name: "ACME Services Corp", party_tin: "111-222-333-00000", party_address: "Iloilo City",
      vatable: null, vat_exempt: "", zero_rated: null, vat: null, total: "100,000.00", atc: "wc 158", withholding: "1000.00",
    },
  },
  ...over,
});

describe("approved documents", () => {
  it("counts only posted documents with approved figures", () => {
    expect(isApproved(row())).toBe(true);
    expect(isApproved(row({ status: "under_review" }))).toBe(false);
    expect(isApproved(row({ extractions: { approved_fields: null } }))).toBe(false);
    expect(isApproved(row({ extractions: null }))).toBe(false);
    expect(isApproved(row({ extractions: [{ approved_fields: { total: "1" } }] }))).toBe(true);
  });

  it("converts approved fields to a SourceDocument in centavos", () => {
    expect(toSourceDocument(row())).toEqual({
      id: "d1", docType: "bir_2307_issued", month: "2026-02-01", date: "2026-02-14", number: "0007",
      partyName: "ACME Services Corp", partyTin: "111-222-333-00000", partyAddress: "Iloilo City",
      vatable: 0, vatExempt: 0, zeroRated: 0, vat: 0, total: 10000000, atc: "WC158", withholding: 100000,
    });
  });

  it("skips documents a return does not read", () => {
    expect(toSourceDocument(row({ doc_type: "cor" }))).toBeNull();
    expect(toSourceDocument(row({ doc_type: "filed_return" }))).toBeNull();
    expect(toSourceDocument(row({ status: "received" }))).toBeNull();
  });
});

describe("periods", () => {
  it("lists months and tests membership", () => {
    expect(monthsInPeriod("2026-11-01", "2027-01-31")).toEqual(["2026-11-01", "2026-12-01", "2027-01-01"]);
    expect(monthInPeriod("2026-02-01", "2026-01-01", "2026-03-31")).toBe(true);
    expect(monthInPeriod("2026-04-01", "2026-01-01", "2026-03-31")).toBe(false);
  });

  it("finds the start of the taxable year for calendar and fiscal years", () => {
    expect(taxableYearStart("2026-03-31", 12)).toBe("2026-01-01");
    expect(taxableYearStart("2026-12-31", 12)).toBe("2026-01-01");
    expect(taxableYearStart("2026-08-31", 6)).toBe("2026-07-01");
    expect(taxableYearStart("2026-03-31", 6)).toBe("2025-07-01");
    expect(taxableYearStart("2026-07-01", 6)).toBe("2026-07-01");
    expect(taxableYearStart("2026-06-30", 6)).toBe("2025-07-01");
  });
});

describe("prior figures", () => {
  it("flattens line amounts and keys earlier worksheets by form and month", () => {
    const figures = flattenFigures({
      sections: [{ title: "x", lines: [{ key: "a", line: "1", label: "A", amount: 5 }, { key: "t", line: "2", label: "T", amount: null, basis: "text" }] }],
    });
    expect(figures).toEqual({ a: 5, __tax_due: 0 });
    expect(
      flattenFigures({ sections: [{ title: "y", lines: [{ key: "total_amount_payable", line: "26", label: "TOTAL", amount: 123_45, emphasis: "payable" }] }] }).__tax_due,
    ).toBe(123_45);
    // An overpayment is nothing to collect.
    expect(flattenFigures({ sections: [{ title: "z", lines: [{ key: "p", line: "1", label: "P", amount: -500, emphasis: "payable" }] }] }).__tax_due).toBe(0);
    const prior = buildPriorFigures([
      { form: "0619-E", periodStart: "2026-02-01", figures: { amount_of_remittance: 200 } },
      { form: "0619-E", periodStart: "2026-01-01", figures: { amount_of_remittance: 100 } },
    ]);
    expect(prior[priorKey("0619-E", "2026-01-01")]).toEqual({ amount_of_remittance: 100 });
    expect(prior["0619-E@2026-02"]).toEqual({ amount_of_remittance: 200 });
    expect(prior["0619-E"]).toEqual({ amount_of_remittance: 200 });
  });
});

describe("ATC master", () => {
  it("has taxify's 111 creditable EWT codes with their rates", () => {
    expect(lookupAtc("WC158")).toEqual({ atc: "WC158", desc: "Top WA supplier - goods", rate: 1, payee: "non_individual" });
    expect(lookupAtc(" wi010 ")?.rate).toBe(5);
    expect(lookupAtc("WC011")?.rate).toBe(15);
    expect(lookupAtc("WI820")?.rate).toBe(0.5);
    expect(lookupAtc("WC250")).toBeNull(); // final tax, not creditable EWT
    expect(lookupAtc("WV010")).toBeNull();
    expect(normalizeAtc("  ")).toBeNull();
  });
});

describe("register lines", () => {
  it("give the worksheets the same figures as the approved document they come from", () => {
    const fields = { date: "2026-02-14", number: "SI-0412", party_name: "Bacolod Feeds Corp.", party_tin: "123-456-789-00000", party_address: "Bacolod City", vatable: "120000.00", vat: "14400.00", total: "134400.00", atc: "wc158", withholding: "1200.00" };
    const fromDoc = toSourceDocument({ id: "d1", doc_type: "sales_invoice", document_month: "2026-02-01", status: "posted", extractions: { approved_fields: fields } });
    const fromLine = fromRegisterLine({
      document_id: "d1", kind: "sale", month: "2026-02-01", line_date: "2026-02-14", reference: "SI-0412", party_name: "Bacolod Feeds Corp.", party_tin: "123-456-789-00000", party_address: "Bacolod City",
      vatable: "120000.00", vat_exempt: "0.00", zero_rated: "0.00", vat: "14400.00", total: "134400.00", atc: "WC158", withholding: "1200.00", slp_category: null,
    });
    expect(fromLine).toEqual({ ...fromDoc, slpCategory: null });
  });

  it("map each kind of line to its document type and keep a missing total at zero", () => {
    const base = { document_id: "d", month: "2026-02-01", line_date: null, reference: null, party_name: null, party_tin: null, party_address: null, vatable: "0", vat_exempt: "0", zero_rated: "0", vat: "0", total: "0", atc: null, withholding: "0", slp_category: null };
    expect((["sale", "purchase", "cwt_received", "ewt_issued"] as const).map((kind) => fromRegisterLine({ ...base, kind }).docType)).toEqual(["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"]);
    expect(fromRegisterLine({ ...base, kind: "purchase", vatable: "100.00", vat: "12.00", slp_category: "capital_goods" })).toMatchObject({ total: 0, vatable: 10000, slpCategory: "capital_goods" });
  });
});
