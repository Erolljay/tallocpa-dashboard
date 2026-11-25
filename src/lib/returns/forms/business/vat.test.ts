import { describe, expect, it } from "vitest";
import { form2550Q } from "./vat";
import { amounts, cert2307, ctxFor, lineNo, purchase, sale } from "./testing";

const CUST1 = { partyName: "Customer One Corp.", partyTin: "123-456-789-000", partyAddress: "QC" };
const CUST2 = { partyName: "Export Buyer Ltd", partyTin: "987-654-321-00000" };
const SUPP1 = { partyName: "Supplier One", partyTin: "111-222-333-000" };
const SUPP2 = { partyName: "Supplier Two", partyTin: "444-555-666" };

function quarter(extra: { inputs?: Record<string, string>; priorFigures?: Record<string, Record<string, number>> } = {}) {
  return ctxFor({
    form: "2550Q",
    periodStart: "2026-01-01",
    periodEnd: "2026-03-31",
    client: { vatRegistered: true },
    inputs: { purchases_capital_goods: "10,000", purchases_services: "20000", input_tax_carried_over: "1000", ...extra.inputs },
    priorFigures: extra.priorFigures,
    documents: [
      sale({ month: "2026-01", vatable: 100_000, vat: 12_000, total: 112_000, ...CUST1 }),
      sale({ month: "2026-01", vatable: 50_000, vat: 6_000, total: 56_000, ...CUST1 }),
      sale({ month: "2026-02", zeroRated: 20_000, vatExempt: 5_000, total: 25_000, ...CUST2 }),
      purchase({ month: "2026-01", vatable: 40_000, vat: 4_800, total: 44_800, ...SUPP1 }),
      purchase({ month: "2026-02", vatable: 10_000, vat: 1_200, total: 11_200, ...SUPP2 }),
      purchase({ month: "2026-02", vatExempt: 3_000, total: 3_000, partyName: "Market stall" }),
      purchase({ month: "2026-03", total: 1_120, partyName: "Hardware" }), // total only: no input VAT claimed
      cert2307({ month: "2026-03", atc: "WV010", total: 50_000, withholding: 2_500, partyName: "City Government of Makati", partyTin: "222-333-444" }),
      cert2307({ month: "2026-03", atc: "WC158", total: 50_000, withholding: 500, partyName: "Big Buyer" }),
    ],
  });
}

describe("2550Q", () => {
  it("computes every Part IV and Part II line from the quarter's documents", () => {
    const r = form2550Q.compute(quarter());
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toEqual({
      vatable_sales: 150_000,
      output_tax: 18_000,
      zero_rated_sales: 20_000,
      exempt_sales: 5_000,
      total_sales: 175_000,
      total_output_tax: 18_000,
      output_vat_uncollected: 0,
      output_vat_recovered: 0,
      adjusted_output_tax: 18_000,
      input_tax_carried_over: 1_000,
      input_tax_deferred_prior: 0,
      transitional_input_tax: 0,
      presumptive_input_tax: 0,
      other_input_tax: 0,
      total_prior_input_tax: 1_000,
      domestic_purchases: 50_000,
      domestic_purchases_input_tax: 6_000,
      zero_rated_purchases: 0,
      exempt_purchases: 4_120,
      total_current_purchases: 54_120,
      total_current_input_tax: 6_000,
      total_available_input_tax: 7_000,
      input_tax_deferred_next: 0,
      input_tax_exempt_sales: 0,
      vat_refund_tcc: 0,
      input_vat_unpaid_payables: 0,
      other_input_deductions: 0,
      total_input_deductions: 0,
      input_vat_settled_payables: 0,
      adjusted_input_deductions: 0,
      total_allowable_input_tax: 7_000,
      net_vat_payable: 11_000,
      net_vat_payable_part2: 11_000,
      creditable_vat_withheld: 2_500,
      advance_vat_payments: 0,
      amended_vat_paid: 0,
      other_credits: 0,
      total_credits: 2_500,
      tax_still_payable: 8_500,
      surcharge: 0,
      interest: 0,
      compromise: 0,
      total_penalties: 0,
      total_amount_payable: 8_500,
      excess_input_tax: 0,
    });
    expect(lineNo(r, "adjusted_output_tax")).toBe("37B");
    expect(lineNo(r, "net_vat_payable")).toBe("61B");
    expect(lineNo(r, "total_amount_payable")).toBe("26");
    const basis = r.sections[1].lines.find((l) => l.key === "domestic_purchases_input_tax")!.basis;
    expect(basis).toBe("Capital goods ₱1,200.00, services ₱2,400.00, other goods ₱2,400.00.");
    expect(r.warnings.some((w) => w.includes("Hardware") && w.includes("without input VAT"))).toBe(true);
    expect(r.warnings.some((w) => w.includes("Item 53"))).toBe(true);
    expect(r.documentIds).toHaveLength(8);
  });

  it("applies the manual adjustments to output and input tax", () => {
    const r = form2550Q.compute(
      quarter({ inputs: { output_vat_uncollected: "500", output_vat_recovered: "200", input_tax_deferred_next: "300", input_tax_exempt_sales: "100", input_vat_settled_payables: "50", advance_vat_payments: "1000", interest: "25" } }),
    );
    expect(amounts(r)).toMatchObject({
      adjusted_output_tax: 17_700,
      total_input_deductions: 400,
      adjusted_input_deductions: 450,
      total_allowable_input_tax: 6_550,
      net_vat_payable: 11_150,
      total_credits: 3_500,
      tax_still_payable: 7_650,
      total_penalties: 25,
      total_amount_payable: 7_675,
    });
  });

  it("carries input tax over from the previous quarter's worksheet and reports its own excess", () => {
    const ctx = ctxFor({
      form: "2550Q",
      periodStart: "2026-04-01",
      periodEnd: "2026-06-30",
      client: { vatRegistered: true },
      priorFigures: { "2550Q": { excess_input_tax: 300_000 } },
      documents: [sale({ month: "2026-04", vatable: 10_000, vat: 1_200, ...CUST1 }), purchase({ month: "2026-05", vatable: 5_000, vat: 600, ...SUPP1 })],
    });
    const r = form2550Q.compute(ctx);
    expect(amounts(r)).toMatchObject({ input_tax_carried_over: 3_000, total_available_input_tax: 3_600, net_vat_payable: -2_400, excess_input_tax: 2_400, total_amount_payable: -2_400 });
    expect(r.warnings.some((w) => w.includes("All VATable purchases are treated as goods"))).toBe(true);
  });

  it("warns when nothing is carried over and asks for it", () => {
    const r = form2550Q.compute(ctxFor({ form: "2550Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", client: { vatRegistered: true }, documents: [] }));
    expect(r.warnings.some((w) => w.includes("Item 38"))).toBe(true);
  });

  it("blocks VATable documents without a TIN and back-computes VAT on total-only sales", () => {
    const ctx = ctxFor({
      form: "2550Q",
      periodStart: "2026-01-01",
      periodEnd: "2026-03-31",
      client: { vatRegistered: true },
      documents: [sale({ month: "2026-01", number: "S-1", total: 11_200, partyName: "Walk-in" }), purchase({ month: "2026-01", number: "R-9", vatable: 1_000, vat: 120 })],
    });
    const r = form2550Q.compute(ctx);
    expect(amounts(r)).toMatchObject({ vatable_sales: 10_000, output_tax: 1_200 });
    expect(r.errors).toEqual([
      "Invoice S-1 — Walk-in (2026-01-15) is VATable but has no customer TIN; the SLS needs one. Add it in review.",
      "Receipt R-9 (2026-01-15) is VATable but has no supplier TIN; the SLP needs one. Add it in review.",
    ]);
  });

  it("takes capital goods and services from the register lines' categories when nothing is typed in", () => {
    const docs = [
      purchase({ month: "2026-01", vatable: 85_000, vat: 10_200, total: 95_200, slpCategory: "capital_goods", ...SUPP1 }),
      purchase({ month: "2026-01", vatable: 45_000, vat: 5_400, total: 50_400, slpCategory: "services", ...SUPP2 }),
      purchase({ month: "2026-01", vatable: 10_000, vat: 1_200, total: 11_200, ...SUPP2 }),
    ];
    const r = form2550Q.compute(ctxFor({ form: "2550Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", client: { vatRegistered: true }, inputs: { input_tax_carried_over: "0" }, documents: docs }));
    expect(r.errors).toEqual([]);
    const line = r.sections.flatMap((s) => s.lines).find((l) => l.key === "domestic_purchases");
    expect(line?.amount).toBe(14_000_000);
    expect(line?.basis).toBe("Capital goods ₱85,000.00, services ₱45,000.00, other goods ₱10,000.00.");
    // Each supplier keeps its own amounts on the SLP, not a proportional share.
    const slp = r.schedules.find((s) => s.title.includes("(SLP)"))!.rows;
    expect(slp.map((x) => [x.name, x.cap, x.svc, x.other])).toEqual([
      ["Supplier One", 8_500_000, 0, 0],
      ["Supplier Two", 0, 4_500_000, 1_000_000],
    ]);
    expect(r.warnings.join(" ")).not.toMatch(/All VATable purchases are treated|spread over suppliers/);
  });

  it("uses the typed split over the lines' categories", () => {
    const docs = [purchase({ month: "2026-01", vatable: 85_000, vat: 10_200, total: 95_200, slpCategory: "capital_goods", ...SUPP1 })];
    const r = form2550Q.compute(ctxFor({ form: "2550Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", client: { vatRegistered: true }, inputs: { input_tax_carried_over: "0", purchases_capital_goods: "0", purchases_services: "0" }, documents: docs }));
    expect(r.sections.flatMap((s) => s.lines).find((l) => l.key === "domestic_purchases")?.basis).toBe("Capital goods ₱0.00, services ₱0.00, other goods ₱85,000.00.");
  });

  it("refuses a goods/services split larger than the purchases", () => {
    const r = form2550Q.compute(quarter({ inputs: { purchases_capital_goods: "40000", purchases_services: "20000" } }));
    expect(r.errors[0]).toMatch(/exceed the VATable purchases/);
  });

  it("writes the SLS, SLP and SAWT DAT files in taxify's BIR layout, one per month", () => {
    const ctx = quarter();
    const att = form2550Q.attachments!(ctx, form2550Q.compute(ctx));
    expect(att.map((a) => a.kind)).toEqual([
      "sls_dat_2026-01", "sls_dat_2026-02", "sls_csv",
      "slp_dat_2026-01", "slp_dat_2026-02", "slp_dat_2026-03", "slp_csv",
      "sawt_dat_2026-03", "sawt_csv",
    ]);
    const get = (k: string) => att.find((a) => a.kind === k)!.build();

    const sls = get("sls_dat_2026-01");
    expect(sls.fileName).toBe("000123456S012026.DAT");
    expect(sls.body).toBe(
      'H,S,"000123456","","","","","ACME TRADING INC.","1 AYALA AVE. MAKATI CITY","",0.00,0.00,150000.00,18000.00,050,01/31/2026,12\r\n' +
        'D,S,"123456789","CUSTOMER ONE CORP.",,,,"QC",,0.00,0.00,150000.00,18000.00,"000123456",01/31/2026\r\n',
    );
    expect(get("sls_dat_2026-02").body).toBe(
      'H,S,"000123456","","","","","ACME TRADING INC.","1 AYALA AVE. MAKATI CITY","",5000.00,20000.00,0.00,0.00,050,02/28/2026,12\r\n' +
        'D,S,"987654321","EXPORT BUYER LTD",,,,,,5000.00,20000.00,0.00,0.00,"000123456",02/28/2026\r\n',
    );

    // Capital goods ₱10,000 and services ₱20,000 spread over suppliers by VATable purchases (40,000 : 10,000).
    const slp = get("slp_dat_2026-01");
    expect(slp.fileName).toBe("000123456P012026.DAT");
    expect(slp.body).toBe(
      'H,P,"000123456","","","","","ACME TRADING INC.","1 AYALA AVE. MAKATI CITY","",0.00,0.00,16000.00,8000.00,16000.00,4800.00,4800.00,0.00,050,01/31/2026,12\r\n' +
        'D,P,"111222333","SUPPLIER ONE",,,,,,0.00,0.00,16000.00,8000.00,16000.00,4800.00,"000123456",01/31/2026\r\n',
    );
    // Feb: Supplier Two (VATable) and the market stall (exempt, no TIN → 000000000), sorted by name.
    expect(get("slp_dat_2026-02").body).toBe(
      'H,P,"000123456","","","","","ACME TRADING INC.","1 AYALA AVE. MAKATI CITY","",3000.00,0.00,4000.00,2000.00,4000.00,1200.00,1200.00,0.00,050,02/28/2026,12\r\n' +
        'D,P,"000000000","MARKET STALL",,,,,,3000.00,0.00,0.00,0.00,0.00,0.00,"000123456",02/28/2026\r\n' +
        'D,P,"444555666","SUPPLIER TWO",,,,,,0.00,0.00,4000.00,2000.00,4000.00,1200.00,"000123456",02/28/2026\r\n',
    );

    const sawt = get("sawt_dat_2026-03");
    expect(sawt.fileName).toBe("00012345600000320262550Q.DAT");
    expect(sawt.body).toBe(
      'HSAWT,H2550Q,000123456,0000,"ACME TRADING INC.","","","",03/2026,050\r\n' +
        'DSAWT,D2550Q,1,222333444,0001,"CITY GOVERNMENT OF MAKATI",,,,03/2026,,WV010,5.00,50000.00,2500.00\r\n' +
        "CSAWT,C2550Q,000123456,0000,03/2026,50000.00,2500.00\r\n",
    );
  });

  it("writes the SLS and SLP Excel layouts as CSV", () => {
    const ctx = quarter();
    const att = form2550Q.attachments!(ctx, form2550Q.compute(ctx));
    const sls = att.find((a) => a.kind === "sls_csv")!.build();
    expect(sls.fileName).toBe("SLS_2026-01_2026-03.csv");
    expect(sls.contentType).toBe("text/csv; charset=utf-8");
    const s = sls.body.split("\r\n");
    expect(s.slice(0, 10)).toEqual([
      "﻿SALES TRANSACTION", "RECONCILIATION OF LISTING FOR ENFORCEMENT", "", "", "",
      "TIN : 000-123-456", `"OWNER'S NAME: ACME TRADING, INC."`, `"OWNER'S TRADE NAME : ACME TRADING, INC."`, '"OWNER\'S ADDRESS: 1 AYALA AVE., MAKATI CITY"', "",
    ]);
    expect(s[13]).toBe("(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11)");
    expect(s[14]).toBe("01/31/2026,123-456-789,CUSTOMER ONE CORP.,,QC,150000.00,0.00,0.00,150000.00,18000.00,168000.00");
    expect(s[15]).toBe("02/28/2026,987-654-321,EXPORT BUYER LTD,,,25000.00,5000.00,20000.00,0.00,0.00,0.00");
    expect(s[16]).toBe(",,,,Grand Total :,175000.00,5000.00,20000.00,150000.00,18000.00,168000.00");
    expect(s.slice(17)).toEqual(["------------------", "==================", "END OF REPORT", ""]);

    const p = att.find((a) => a.kind === "slp_csv")!.build().body.split("\r\n");
    expect(p[14]).toBe("01/31/2026,111-222-333,SUPPLIER ONE,,,40000.00,0.00,0.00,40000.00,16000.00,8000.00,16000.00,4800.00,44800.00");
    expect(p.find((l) => l.includes("Grand Total"))).toBe(",,,,Grand Total :,54120.00,4120.00,0.00,50000.00,20000.00,10000.00,20000.00,6000.00,56000.00");
  });
});
