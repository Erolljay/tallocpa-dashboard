import { describe, expect, it } from "vitest";
import type { EwtQuarter, SourceDocument, WorksheetContext, WorksheetResult } from "../../types";
import { form1604E } from "./form-1604e";

const doc = (over: Partial<SourceDocument>): SourceDocument => ({
  id: "x", docType: "bir_2307_issued", month: "2026-01-01", date: null, number: null,
  partyName: null, partyTin: null, partyAddress: null,
  vatable: 0, vatExempt: 0, zeroRated: 0, vat: 0, total: 0, atc: null, withholding: 0,
  ...over,
});

const YEAR: SourceDocument[] = [
  doc({ id: "a", month: "2026-01-01", partyName: "ACME Services Corp", partyTin: "111-222-333-00000", atc: "WC158", total: 10_000_000, withholding: 100_000 }),
  doc({ id: "b", month: "2026-05-01", partyName: "ACME Services Corp", partyTin: "111-222-333-00000", atc: "WC158", total: 5_000_000, withholding: 50_000 }),
  doc({ id: "c", month: "2026-11-01", partyName: "DELA CRUZ, JUAN", partyTin: "444-555-666-00000", atc: "WI010", total: 2_000_000, withholding: 100_000 }),
];

const client: WorksheetContext["client"] = {
  id: "c1", name: "Tallo Test Trading, Inc.", tin: "123-456-789-00000", rdoCode: "074", registeredAddress: "Iloilo City",
  taxpayerType: "corporation", fiscalYearEndMonth: 12, vatRegistered: true,
};

const quarter = (i: number, over: Partial<EwtQuarter> = {}): EwtQuarter => ({
  quarterStart: `2026-${String(i * 3 + 1).padStart(2, "0")}-01`, periodLabel: `Q${i + 1} 2026`, status: "filed", settled: true, computed: true,
  withheld: 0, penalties: 0, filedOn: "2026-04-30", paymentReference: "EFPS-1", paidOn: "2026-04-30", ...over,
});

const ctx = (ewtYear: EwtQuarter[], documents = YEAR): WorksheetContext => ({
  client,
  filing: { id: "f", form: "1604-E", periodLabel: "2026", periodStart: "2026-01-01", periodEnd: "2026-12-31", dueDate: "2027-03-01" },
  documents,
  inputs: {},
  priorFigures: {},
  source: "books",
  ewtYear,
});

const byKey = (r: WorksheetResult) => Object.fromEntries(r.sections.flatMap((s) => s.lines).map((l) => [l.key, l.amount]));

describe("1604-E", () => {
  const filed = [quarter(0, { withheld: 100_000 }), quarter(1, { withheld: 50_000, penalties: 1_000 }), quarter(2), quarter(3, { withheld: 100_000 })];

  it("sums the four 1601-EQ into the summary of remittances", () => {
    const r = form1604E.compute(ctx(filed));
    expect(r.errors).toEqual([]);
    expect(byKey(r)).toMatchObject({
      q1_remitted: 100_000, q2_remitted: 51_000, q3_remitted: 0, q4_remitted: 100_000,
      total_taxes_withheld: 250_000, total_penalties: 1_000, total_remitted: 251_000, alphalist_withheld: 250_000,
    });
    expect(r.warnings.filter((w) => !/validation module/.test(w))).toEqual([]);
  });

  it("warns when a quarter is not filed or differs from the QAP", () => {
    const r = form1604E.compute(ctx([quarter(0, { withheld: 90_000 }), quarter(1, { withheld: 50_000, settled: false, status: "reviewed" }), quarter(2), { ...quarter(3), periodLabel: null }]));
    expect(r.warnings.join("\n")).toMatch(/Q1 2026: the 1601-EQ shows taxes withheld of 900.00/);
    expect(r.warnings.join("\n")).toMatch(/1601-EQ for Q2 2026 is not filed and paid/);
    expect(r.warnings.join("\n")).toMatch(/4th quarter: EWT of 1,000.00 but no 1601-EQ/);
  });

  it("builds the year's alphalist DAT, one line per payee and ATC", () => {
    const c = ctx(filed);
    const files = form1604E.attachments!(c, form1604E.compute(c)).map((a) => ({ kind: a.kind, ...a.build() }));
    expect(files.map((f) => [f.kind, f.fileName])).toEqual([
      ["alphalist-dat", "123456789000012312026" + "1604E.DAT"],
      ["alphalist-csv", "1604E_Alphalist_2026.csv"],
    ]);
    expect(files[0].body.split("\r\n")).toEqual([
      "H1604E,123456789,0000,12/31/2026,074",
      'D3,1604E,123456789,0000,12/31/2026,1,111222333,0000,"ACME SERVICES CORP",,,,WC158,1.00,150000.00,1500.00',
      'D3,1604E,123456789,0000,12/31/2026,2,444555666,0000,,"DELA CRUZ","JUAN",,WI010,5.00,20000.00,1000.00',
      "C3,1604E,123456789,0000,12/31/2026,170000.00,2500.00",
      "",
    ]);
  });
});
