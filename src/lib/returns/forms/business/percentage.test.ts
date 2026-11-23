import { describe, expect, it } from "vitest";
import { form2551Q } from "./percentage";
import { amounts, cert2307, ctxFor, lineNo, sale } from "./testing";

const individual = { taxpayerType: "individual" as const, name: "Juan Dela Cruz", tin: "123-456-789-000" };

describe("2551Q", () => {
  it("computes percentage tax at 3% for 2026, less PT withheld and the previous overpayment", () => {
    const ctx = ctxFor({
      form: "2551Q",
      periodStart: "2026-01-01",
      periodEnd: "2026-03-31",
      client: individual,
      documents: [
        sale({ month: "2026-01", total: 100_000 }),
        sale({ month: "2026-03", vatExempt: 50_000, total: 50_000 }),
        sale({ month: "2026-04", total: 999_999 }), // next quarter: ignored
        cert2307({ month: "2026-02", atc: "WB080", total: 16_666.67, withholding: 500, partyName: "City of Makati", partyTin: "222-333-444" }),
        cert2307({ month: "2026-02", atc: "WC158", withholding: 300, partyName: "Big Buyer Inc." }), // income tax: not on 2551Q
      ],
      inputs: { income_tax_option: "graduated", prior_overpayment: "200", surcharge: "10" },
    });
    const r = form2551Q.compute(ctx);
    expect(r.errors).toEqual([]);
    expect(amounts(r)).toMatchObject({
      gross_sales: 150_000,
      schedule1_row1_tax_due: 4_500,
      total_tax_due_schedule1: 4_500,
      total_tax_due: 4_500,
      creditable_pt_withheld: 500,
      amended_tax_paid: 0,
      other_credits: 200,
      total_credits: 700,
      tax_still_payable: 3_800,
      surcharge: 10,
      interest: 0,
      compromise: 0,
      total_penalties: 10,
      total_amount_payable: 3_810,
      overpayment: 0,
    });
    expect(lineNo(r, "total_tax_due")).toBe("14");
    expect(lineNo(r, "total_amount_payable")).toBe("24");
    expect(r.schedules[0].rows).toEqual([{ atc: "PT010", taxable: 15_000_000, rate: "3%", due: 450_000 }]);
    expect(r.documentIds).toHaveLength(3);
  });

  it("uses 1% during the CREATE Act relief", () => {
    const ctx = ctxFor({ form: "2551Q", periodStart: "2021-04-01", periodEnd: "2021-06-30", documents: [sale({ month: "2021-05", total: 200_000 })] });
    const r = form2551Q.compute(ctx);
    expect(amounts(r).total_tax_due).toBe(2_000);
  });

  it("splits a quarter that straddles the end of the relief into one row per rate", () => {
    // Fiscal year ending May: the first quarter is June–August 2023.
    const ctx = ctxFor({
      form: "2551Q",
      periodStart: "2023-06-01",
      periodEnd: "2023-08-31",
      client: { fiscalYearEndMonth: 5 },
      documents: [sale({ month: "2023-06", total: 100_000 }), sale({ month: "2023-07", total: 100_000 }), sale({ month: "2023-08", total: 50_000 })],
    });
    const r = form2551Q.compute(ctx);
    expect(r.schedules[0].rows).toEqual([
      { atc: "PT010", taxable: 10_000_000, rate: "1%", due: 100_000 },
      { atc: "PT010", taxable: 15_000_000, rate: "3%", due: 450_000 },
    ]);
    expect(amounts(r).total_tax_due).toBe(5_500);
    expect(r.warnings.some((w) => w.includes("rate changed"))).toBe(true);
  });

  it("is not due under the 8% option", () => {
    const ctx = ctxFor({ form: "2551Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", client: individual, documents: [sale({ month: "2026-01", total: 1 })], inputs: { income_tax_option: "8pct" } });
    const r = form2551Q.compute(ctx);
    expect(r.sections).toEqual([]);
    expect(r.errors[0]).toMatch(/8% income tax option.*No 2551Q is due/);
  });

  it("asks an individual for the income tax option first", () => {
    expect(form2551Q.manualInputs(ctxFor({ form: "2551Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", client: individual, documents: [] }))[0]).toMatchObject({ key: "income_tax_option", required: true });
    const r = form2551Q.compute(ctxFor({ form: "2551Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", client: individual, documents: [] }));
    expect(r.errors[0]).toMatch(/income tax rate option/);
    // Non-individuals cannot choose 8%, so they are not asked.
    expect(form2551Q.manualInputs(ctxFor({ form: "2551Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", documents: [] })).map((i) => i.key)).not.toContain("income_tax_option");
  });

  it("carries the previous quarter's overpayment from its worksheet, and reports its own", () => {
    const ctx = ctxFor({
      form: "2551Q",
      periodStart: "2026-04-01",
      periodEnd: "2026-06-30",
      documents: [sale({ month: "2026-04", total: 10_000 })],
      priorFigures: { "2551Q": { overpayment: 50_000 } },
    });
    const r = form2551Q.compute(ctx);
    expect(amounts(r)).toMatchObject({ total_tax_due: 300, other_credits: 500, tax_still_payable: -200, total_amount_payable: -200, overpayment: 200 });
  });

  it("rejects unreadable typed amounts", () => {
    const ctx = ctxFor({ form: "2551Q", periodStart: "2026-01-01", periodEnd: "2026-03-31", documents: [], inputs: { other_credits: "abc", surcharge: "-5" } });
    expect(form2551Q.compute(ctx).errors).toEqual([
      '"Other tax credits / payments (Item 17)" is not a valid amount (abc).',
      '"Surcharge (Item 20)" cannot be negative.',
    ]);
  });

  it("builds the SAWT DAT per month in taxify's layout", () => {
    const ctx = ctxFor({
      form: "2551Q",
      periodStart: "2026-01-01",
      periodEnd: "2026-03-31",
      client: individual,
      inputs: { income_tax_option: "graduated", owner_last_name: "Dela Cruz", owner_first_name: "Juan", owner_middle_name: "Santos" },
      documents: [
        cert2307({ month: "2026-02", atc: "WB080", total: 16_666.67, withholding: 500, partyName: "City of Makati", partyTin: "222-333-444" }),
        cert2307({ month: "2026-03", atc: "wb080", total: 10_000, withholding: 300, partyName: "City of Makati", partyTin: "222333444" }),
      ],
    });
    const result = form2551Q.compute(ctx);
    const att = form2551Q.attachments!(ctx, result);
    expect(att.map((a) => a.kind)).toEqual(["sawt_dat_2026-02", "sawt_dat_2026-03", "sawt_csv"]);
    const feb = att[0].build();
    expect(feb.fileName).toBe("12345678900000220262551Q.DAT");
    expect(feb.body).toBe(
      [
        'HSAWT,H2551Q,123456789,0000,"JUAN DELA CRUZ","DELA CRUZ","JUAN","SANTOS",02/2026,050',
        'DSAWT,D2551Q,1,222333444,0001,"CITY OF MAKATI",,,,02/2026,,WB080,3.00,16666.67,500.00',
        "CSAWT,C2551Q,123456789,0000,02/2026,16666.67,500.00",
        "",
      ].join("\r\n"),
    );
    const sheet = att[2].build().body.split("\r\n");
    expect(sheet[0]).toBe("﻿BIR FORM 2551Q");
    expect(sheet[2]).toBe("FOR THE PERIOD JANUARY 2026 TO MARCH 2026");
    expect(sheet[5]).toBe("TIN : 123-456-789-0000");
    expect(sheet[15]).toBe("1,222-333-444-0001,CITY OF MAKATI,,WB080,Percentage tax withheld by government (Sec. 109BB),26666.67,3,800.00");
    expect(sheet[17]).toBe("Grand Total :,0,,,,,26666.67,,800.00");
    expect(sheet[19]).toBe("END OF REPORT");
  });
});
