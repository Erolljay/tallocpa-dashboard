/**
 * Return worksheets from the Books by tax code (docs/REWORK.md decisions 10–12): the rows of
 * books_return_sources as SourceDocuments, and what each form does with them.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { fromBooksRow, type BooksSourceRow } from "./source";
import type { SourceDocument, WorksheetContext, WorksheetResult } from "./types";
import { form2550Q } from "./forms/business/vat";
import { form2551Q } from "./forms/business/percentage";
import { form1701Q, form1702Q } from "./forms/business/income";
import { buildSawt } from "./forms/business/sawt";
import { withNonDeductible } from "./forms/business/book-income";
import { form0619E } from "./forms/withholding/form-0619e";
import { form1601EQ } from "./forms/withholding/form-1601eq";
import { buildQapRows, qapDat } from "./forms/withholding/qap";
import { ewtLines } from "./forms/withholding/ewt";
import { payslipCsv, payslipSchedule } from "./forms/payroll/form-1601c";

let seq = 0;
/** A books_return_sources row; amounts in pesos as the database returns them (text). */
function row(source: BooksSourceRow["source"], over: Partial<BooksSourceRow> & { month: string }): SourceDocument {
  seq++;
  return fromBooksRow({
    invoice_id: `inv-${seq}`,
    source,
    issue_date: `${over.month.slice(0, 7)}-15`,
    reference: `REF-${seq}`,
    party_id: null,
    party_name: null,
    party_tin: null,
    slp_category: null,
    vatable: "0",
    vat_exempt: "0",
    zero_rated: "0",
    non_vat: "0",
    vat: "0",
    total: "0",
    atc: null,
    tax_code: null,
    withholding: "0",
    uncoded: "0",
    cwt_supported: null,
    cwt_followed_up_at: null,
    document_id: null,
    ...over,
  });
}

const client: WorksheetContext["client"] = {
  id: "c1", name: "Tallo Test Trading, Inc.", tin: "123-456-789-00000", rdoCode: "074", registeredAddress: "Iloilo City",
  taxpayerType: "corporation", fiscalYearEndMonth: 12, vatRegistered: true,
};

function ctx(form: string, periodStart: string, periodEnd: string, documents: SourceDocument[], over: Partial<WorksheetContext> = {}): WorksheetContext {
  return {
    client,
    filing: { id: "f", form, periodLabel: periodStart.slice(0, 7), periodStart, periodEnd, dueDate: "" },
    documents,
    inputs: {},
    priorFigures: {},
    source: "books",
    ...over,
  };
}

const byKey = (r: WorksheetResult) => Object.fromEntries(r.sections.flatMap((s) => s.lines).map((l) => [l.key, l.amount]));
const lineOf = (r: WorksheetResult, key: string) => r.sections.flatMap((s) => s.lines).find((l) => l.key === key);

describe("a Books row as a source", () => {
  it("keeps the invoice's figures by tax code, exactly", () => {
    const d = row("purchase_receipt", { invoice_id: "p1", month: "2026-01-01", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", slp_category: "services", vatable: "300.00", vat: "36.00", total: "336.00", uncoded: "0" });
    expect(d).toMatchObject({ id: "p1", docType: "purchase_receipt", month: "2026-01-01", vatable: 30000, vat: 3600, total: 33600, slpCategory: "services", fromBooks: true, nonVat: 0, uncoded: 0 });
    const c = row("bir_2307_received", { month: "2026-01-01", atc: "wc158", tax_code: "WC158", withholding: "14.00", total: "1400.00", cwt_supported: false, cwt_followed_up_at: "2026-02-03T01:00:00Z" });
    expect(c).toMatchObject({ atc: "WC158", withholding: 1400, cwtSupported: false, cwtFollowedUpAt: "2026-02-03T01:00:00Z" });
  });
});

describe("2550Q from the Books", () => {
  const docs = [
    row("sales_invoice", { invoice_id: "s1", month: "2026-01-01", party_name: "Arevalo Builders", party_tin: "111-222-333-00000", vatable: "1000", vat: "120", vat_exempt: "400", total: "1520" }),
    row("bir_2307_received", { invoice_id: "s1", month: "2026-01-01", party_name: "Arevalo Builders", party_tin: "111-222-333-00000", atc: "WC158", withholding: "14", total: "1400", cwt_supported: false }),
    row("sales_invoice", { invoice_id: "s2", month: "2026-02-01", party_name: "City of Iloilo", party_tin: "777-888-999-00000", vatable: "2000", vat: "240", total: "2240" }),
    row("bir_2307_received", { invoice_id: "s2", month: "2026-02-01", party_name: "City of Iloilo", party_tin: "777-888-999-00000", atc: "WV020", withholding: "100", total: "2000", cwt_supported: true }),
    row("purchase_receipt", { invoice_id: "p1", month: "2026-01-01", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", slp_category: "capital_goods", vatable: "1000", vat: "120", total: "1120" }),
    row("purchase_receipt", { invoice_id: "p1", month: "2026-01-01", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", slp_category: "services", vatable: "300", vat: "36", total: "336" }),
    row("purchase_receipt", { invoice_id: "p1", month: "2026-01-01", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", slp_category: "exempt", vat_exempt: "200", total: "200" }),
    row("purchase_receipt", { invoice_id: "p2", month: "2026-03-01", party_name: "Iloilo Supply", party_tin: "444-555-666-00000", slp_category: "other_goods", vatable: "400", vat: "48", total: "448" }),
  ];

  it("takes sales, purchases by SLP column and the VAT withheld (WV) from the tax codes, with no assumption", () => {
    const r = form2550Q.compute(ctx("2550Q", "2026-01-01", "2026-03-31", docs, { vatCarryOver: null }));
    expect(r.errors).toEqual([]);
    expect(byKey(r)).toMatchObject({
      vatable_sales: 300000, output_tax: 36000, exempt_sales: 40000, total_sales: 340000,
      domestic_purchases: 170000, domestic_purchases_input_tax: 20400, exempt_purchases: 20000,
      creditable_vat_withheld: 10000, input_tax_carried_over: 0,
    });
    expect(lineOf(r, "domestic_purchases")?.basis).toBe("Capital goods ₱1,000.00, services ₱300.00, other goods ₱400.00.");
    expect(r.warnings.some((w) => /treated as goods other than capital goods|only a total/.test(w))).toBe(false);
    // The SLP keeps each supplier's columns; one row per supplier per month.
    const slp = r.schedules.find((s) => s.title.startsWith("Summary list of purchases"))!;
    expect(slp.rows.map((x) => [x.month, x.cap, x.svc, x.other, x.exempt, x.vat])).toEqual([
      ["2026-01", 100000, 30000, 0, 20000, 15600],
      ["2026-03", 0, 0, 40000, 0, 4800],
    ]);
    expect(new Set(r.documentIds)).toEqual(new Set(["s1", "s2", "p1", "p2"]));
    expect(r.documentIds).toHaveLength(4);
  });

  it("writes the SLS DAT per month in the existing layout", () => {
    const c = ctx("2550Q", "2026-01-01", "2026-03-31", docs, { vatCarryOver: null });
    const att = form2550Q.attachments!(c, form2550Q.compute(c));
    expect(att.map((a) => a.kind)).toEqual(["sls_dat_2026-01", "sls_dat_2026-02", "sls_csv", "slp_dat_2026-01", "slp_dat_2026-03", "slp_csv", "sawt_dat_2026-02", "sawt_csv"]);
    const jan = att[0].build();
    expect(jan.fileName).toBe("123456789S012026.DAT");
    expect(jan.body).toBe(
      'H,S,"123456789","","","","","TALLO TEST TRADING INC.","ILOILO CITY","",400.00,0.00,1000.00,120.00,074,01/31/2026,12\r\n' +
        'D,S,"111222333","AREVALO BUILDERS",,,,,,400.00,0.00,1000.00,120.00,"123456789",01/31/2026\r\n',
    );
  });

  it("carries over the previous 2550Q's excess input tax, across the year, and says when it is not filed yet", () => {
    const filed = form2550Q.compute(ctx("2550Q", "2026-01-01", "2026-03-31", docs, { vatCarryOver: { periodLabel: "Q4 2025", filed: true, computed: true, excess: 500000 } }));
    expect(byKey(filed).input_tax_carried_over).toBe(500000);
    expect(lineOf(filed, "input_tax_carried_over")?.basis).toBe("Excess input tax on the Q4 2025 2550Q worksheet.");
    const open = form2550Q.compute(ctx("2550Q", "2026-04-01", "2026-06-30", [], { vatCarryOver: { periodLabel: "Q1 2026", filed: false, computed: true, excess: 12345 } }));
    expect(byKey(open).input_tax_carried_over).toBe(12345);
    expect(open.warnings).toContain("The Q1 2026 2550Q is not filed yet; the carry-over (Item 38) is its worksheet's excess input tax and changes if that return does.");
    const unsaved = form2550Q.compute(ctx("2550Q", "2026-04-01", "2026-06-30", [], { vatCarryOver: { periodLabel: "Q1 2026", filed: false, computed: false, excess: 0 } }));
    expect(byKey(unsaved).input_tax_carried_over).toBe(0);
    expect(unsaved.warnings.some((w) => /has no saved worksheet/.test(w))).toBe(true);
    const typed = form2550Q.compute(ctx("2550Q", "2026-01-01", "2026-03-31", docs, { vatCarryOver: { periodLabel: "Q4 2025", filed: true, computed: true, excess: 500000 }, inputs: { input_tax_carried_over: "100" } }));
    expect(byKey(typed).input_tax_carried_over).toBe(10000);
  });

  it("blocks an invoice with lines that carry no tax code, and flags Non-VAT Sales on a VAT client", () => {
    const r = form2550Q.compute(ctx("2550Q", "2026-01-01", "2026-03-31", [row("sales_invoice", { reference: "SI-9", party_tin: "111-222-333", month: "2026-01-01", vatable: "100", vat: "12", non_vat: "50", uncoded: "25", total: "187" })], { vatCarryOver: null }));
    expect(r.errors).toEqual([expect.stringMatching(/^Sales Invoice SI-9 \(2026-01-15\): lines of ₱25.00 have no tax code/)]);
    expect(r.warnings.some((w) => /Non-VAT Sales \(NVS\)/.test(w))).toBe(true);
  });
});

describe("SAWT from the Books", () => {
  it("claims CWT without its 2307, and says whether it was followed up", () => {
    const docs = [
      row("bir_2307_received", { invoice_id: "s1", reference: "SI-1", month: "2026-01-01", party_name: "Arevalo", party_tin: "111-222-333", atc: "WC158", withholding: "14", total: "1400", cwt_supported: false }),
      row("bir_2307_received", { invoice_id: "s2", reference: "SI-2", month: "2026-01-01", party_name: "Jaro", party_tin: "222-333-444", atc: "WC160", withholding: "40", total: "2000", cwt_supported: false, cwt_followed_up_at: "2026-02-03T01:00:00Z" }),
      row("bir_2307_received", { invoice_id: "s3", reference: "SI-3", month: "2026-01-01", party_name: "Molo", party_tin: "333-444-555", atc: "WC158", withholding: "10", total: "1000", cwt_supported: true }),
      row("bir_2307_received", { invoice_id: "s4", month: "2026-01-01", party_name: "Zero", atc: "WC158", withholding: "0", total: "500", cwt_supported: false }),
    ];
    const s = buildSawt(docs, ["income"]);
    expect(s.total).toBe(6400);
    expect(s.missing2307.map((d) => d.id)).toEqual(["s1", "s2"]);
    expect(s.warnings).toEqual([
      "Sales Invoice SI-1 — Arevalo (2026-01-15): the customer's 2307 (WC158) is not in yet. The tax withheld is claimed; ask the customer for it and mark it followed up.",
      "Sales Invoice SI-2 — Jaro (2026-01-15): the customer's 2307 (WC160) is not in yet. The tax withheld is claimed; followed up on 2026-02-03.",
    ]);
  });

  it("leaves out CWT the client stopped claiming at year end (decision 12)", () => {
    const stopped = { ...row("bir_2307_received", { invoice_id: "s1", reference: "SI-1", month: "2026-01-01", party_name: "Arevalo", party_tin: "111-222-333", atc: "WC158", withholding: "14", total: "1400", cwt_supported: false }), cwtStopped: true };
    const s = buildSawt([stopped], ["income"]);
    expect(s.total).toBe(0);
    expect(s.rows).toEqual([]);
    expect(s.warnings).toEqual(["Sales Invoice SI-1 — Arevalo (2026-01-15): no 2307 came, and the client decided not to claim the tax withheld (WC158); left out."]);
  });
});

describe("EWT from Purchase Invoices", () => {
  /** The quarter of the QAP fixture, as the Books give it: EWT codes on Purchase Invoices. */
  const Q1 = [
    row("bir_2307_issued", { invoice_id: "j1", month: "2026-01-01", issue_date: "2026-01-15", reference: "A-1", party_name: "ACME Services Corp", party_tin: "111-222-333-00000", atc: "WC158", total: "100000", withholding: "1000" }),
    row("bir_2307_issued", { invoice_id: "f1", month: "2026-02-01", issue_date: "2026-02-10", reference: "A-2", party_name: "ACME Services Corp", party_tin: "111-222-333-00000", atc: "WC158", total: "50000", withholding: "500" }),
    row("bir_2307_issued", { invoice_id: "f2", month: "2026-02-01", issue_date: "2026-02-28", reference: "R-1", party_name: "ACME Services Corp", party_tin: "111222333-00000", atc: "WC100", total: "30000", withholding: "1500" }),
    row("bir_2307_issued", { invoice_id: "m1", month: "2026-03-01", issue_date: "2026-03-05", reference: "P-9", party_name: "DELA CRUZ, JUAN", party_tin: "444-555-666", atc: "WI010", total: "20000", withholding: "1000" }),
    row("bir_2307_issued", { invoice_id: "m2", month: "2026-03-01", issue_date: "2026-03-20", reference: "B-1", party_name: "Beta Lessor Co.", party_tin: "777-888-999-001", atc: "WC100", total: "10000", withholding: "500" }),
  ];

  it("writes the QAP DAT byte for byte as before (taxify's layout)", () => {
    const expected = readFileSync(path.join(import.meta.dirname, "forms", "withholding", "__fixtures__", "qap-q1-2026.DAT"), "utf8");
    const file = qapDat(buildQapRows(ewtLines(Q1).lines, "2026-01-01"), { tin: client.tin, rdoCode: client.rdoCode, name: client.name }, "2026-01-01");
    expect(file.body).toBe(expected);
  });

  it("gives the 0619-E the month's EWT and its QAP, leaving out a code with nothing withheld", () => {
    const jan = [...Q1.filter((d) => d.month === "2026-01-01"), row("bir_2307_issued", { month: "2026-01-01", reference: "Z-1", party_name: "Zero Co", party_tin: "999-999-999", atc: "WC158", tax_code: "WC158", total: "100", withholding: "0" })];
    const r = form0619E.compute(ctx("0619-E", "2026-01-01", "2026-01-31", jan, { filing: { id: "f", form: "0619-E", periodLabel: "January 2026", periodStart: "2026-01-01", periodEnd: "2026-01-31", dueDate: "" } }));
    expect(byKey(r).amount_of_remittance).toBe(100000);
    expect(lineOf(r, "amount_of_remittance")?.basis).toBe("EWT on 1 Purchase Invoice(s) of January 2026, by withholding code");
    expect(r.schedules.find((s) => s.title.startsWith("QAP for the month"))!.rows).toEqual([{ tin: "111-222-333-00000", name: "ACME Services Corp", atc: "WC158", rate: "1%", base: 10000000, withheld: 100000 }]);
    expect(r.warnings).toContain("Purchase Invoice Z-1 from Zero Co (2026-01-15): withholding code WC158 but no tax withheld; left out.");
    expect(r.errors).toEqual([]);
  });

  it("takes months 1 and 2 off the 1601-EQ only once their 0619-E is filed and paid", () => {
    const remittances = (feb: Partial<{ settled: boolean; remitted: number }>) => [
      { month: "2026-01-01", periodLabel: "January 2026", status: "paid", settled: true, computed: true, remitted: 100000 },
      { month: "2026-02-01", periodLabel: "February 2026", status: "filed", settled: false, computed: true, remitted: 200000, ...feb },
    ];
    const notPaid = form1601EQ.compute(ctx("1601-EQ", "2026-01-01", "2026-03-31", Q1, { ewtRemittances: remittances({}) }));
    expect(byKey(notPaid)).toMatchObject({ total_taxes_withheld: 450000, remitted_month1: 100000, remitted_month2: 0, tax_still_due: 350000 });
    expect(notPaid.warnings).toContain("The 0619-E for February 2026 is not filed and paid yet, so it is not deducted (item 21). File and pay it first, or enter what was remitted.");
    const paid = form1601EQ.compute(ctx("1601-EQ", "2026-01-01", "2026-03-31", Q1, { ewtRemittances: remittances({ settled: true, remitted: 150000 }) }));
    expect(byKey(paid)).toMatchObject({ remitted_month1: 100000, remitted_month2: 150000, tax_still_due: 200000 });
    expect(lineOf(paid, "remitted_month2")?.basis).toBe("0619-E for February 2026, filed and paid (item 14)");
    expect(paid.warnings.some((w) => /February 2026: the 0619-E remitted 1,500.00 but the EWT for that month now totals 2,000.00/.test(w))).toBe(true);
    const none = form1601EQ.compute(ctx("1601-EQ", "2026-01-01", "2026-03-31", Q1, { ewtRemittances: [{ month: "2026-01-01", periodLabel: null, status: null, settled: false, computed: false, remitted: 0 }] }));
    expect(byKey(none).remitted_month1).toBe(0);
    expect(none.warnings).toContain("January 2026 has EWT of 1,000.00 but no 0619-E; nothing is deducted for it.");
  });
});

describe("income tax method per client", () => {
  const individual = { ...client, taxpayerType: "individual" as const, vatRegistered: false };

  it("decides the 1701Q regime and is not asked on the worksheet", () => {
    const c = ctx("1701Q", "2026-01-01", "2026-03-31", [row("sales_invoice", { month: "2026-01-01", non_vat: "100000", total: "100000" })], { client: { ...individual, incomeTaxMethod: "eight_percent" } });
    expect(form1701Q.manualInputs(c).some((i) => i.key === "regime")).toBe(false);
    const r = form1701Q.compute(c);
    expect(r.errors).toEqual([]);
    expect(byKey(r)).toMatchObject({ sales: 10000000, taxable_income_to_date: 0 });
    expect(lineOf(r, "income_tax_method")?.basis).toBe("8% on gross sales or receipts (set on the client)");
    // Not set: the worksheet asks, and says so.
    const unset = ctx("1701Q", "2026-01-01", "2026-03-31", [], { client: individual, inputs: { regime: "graduated_osd" } });
    expect(form1701Q.manualInputs(unset).some((i) => i.key === "regime")).toBe(true);
    expect(form1701Q.compute(unset).warnings.some((w) => /No income tax method is set on the client/.test(w))).toBe(true);
  });

  it("decides the 1702Q deduction (OSD or itemized), and refuses 8% for a corporation", () => {
    const c = ctx("1702Q", "2026-01-01", "2026-03-31", [], { client: { ...client, incomeTaxMethod: "osd" }, inputs: { corporate_rate: "regular", year_operations_commenced: "2020" } });
    expect(form1702Q.manualInputs(c).some((i) => i.key === "deduction")).toBe(false);
    const r = form1702Q.compute(c);
    expect(r.errors).toEqual([]);
    expect(lineOf(r, "deductions")?.label).toMatch(/Optional standard deduction/);
    expect(form1702Q.compute({ ...c, client: { ...client, incomeTaxMethod: "eight_percent" } }).errors).toEqual(["The 8% option is for individuals only; set the client's income tax method to OSD or itemized."]);
  });

  it("answers the 2551Q's 8% question: an individual on 8% files no percentage tax", () => {
    const sales = [row("sales_invoice", { month: "2026-01-01", non_vat: "100000", total: "100000" })];
    const eight = ctx("2551Q", "2026-01-01", "2026-03-31", sales, { client: { ...individual, incomeTaxMethod: "eight_percent" } });
    expect(form2551Q.manualInputs(eight).some((i) => i.key === "income_tax_option")).toBe(false);
    expect(form2551Q.compute(eight).errors[0]).toMatch(/8% income tax option/);
    const graduated = form2551Q.compute(ctx("2551Q", "2026-01-01", "2026-03-31", sales, { client: { ...individual, incomeTaxMethod: "osd" } }));
    expect(graduated.errors).toEqual([]);
    expect(byKey(graduated).gross_sales).toBe(10000000);
  });
});

describe("ND add-back", () => {
  it("moves ND-coded amounts off their accounts to the non-deductible line", () => {
    const rows = [
      { code: "6120", name: "Taxes and Licenses", type: "expense" as const, birLine: "ded_taxes_licenses", net: 50000 },
      { code: "6090", name: "Office Supplies", type: "expense" as const, birLine: "ded_supplies", net: 28000 },
      { code: "6999", name: "Penalties", type: "expense" as const, birLine: "nondeductible", net: 1000 },
    ];
    const { rows: out, addedBack } = withNonDeductible(rows, [{ code: "6120", amount: 5000 }, { code: "6999", amount: 1000 }]);
    expect(addedBack).toBe(5000);
    expect(out.map((r) => [r.code, r.birLine, r.net])).toEqual([
      ["6120", "ded_taxes_licenses", 45000],
      ["6090", "ded_supplies", 28000],
      ["6999", "nondeductible", 1000],
      ["ND", "nondeductible", 5000],
    ]);
    expect(withNonDeductible(rows, []).rows).toEqual(rows);
  });
});

describe("1601-C supporting schedule", () => {
  const slips = [
    { employeeNo: "E-1", employeeName: "Cruz, Ana B.", payPeriodEnd: "2026-01-31", gross: 3000000, sss: 135000, philhealth: 75000, pagibig: 20000, tax: 100000, otherDeductions: 50000, net: 2620000 },
    { employeeNo: null, employeeName: "Diaz, Ben", payPeriodEnd: null, gross: 1500000, sss: 67500, philhealth: 37500, pagibig: 10000, tax: 0, otherDeductions: 0, net: 1385000 },
  ];

  it("lists the month's employees and their payslips, and exports them, not for the BIR", () => {
    const s = payslipSchedule("January 2026", slips);
    expect(s.title).toBe("Employees of January 2026 — payslips (supporting schedule; not sent to the BIR)");
    expect(s.rows).toHaveLength(2);
    const file = payslipCsv({ client }, "2026-01", slips);
    expect(file.fileName).toBe("PAYSLIPS_1601C_2026-01.csv");
    const lines = file.body.replace(/^﻿/, "").split("\r\n");
    expect(lines[1]).toBe("Supporting schedule of BIR Form 1601-C; not sent to the BIR.");
    expect(lines[4]).toBe("E-1,\"Cruz, Ana B.\",2026-01-31,30000.00,1350.00,750.00,200.00,1000.00,500.00,26200.00");
    expect(lines[6]).toBe(",Total,,45000.00,2025.00,1125.00,300.00,1000.00,500.00,40050.00");
  });
});
