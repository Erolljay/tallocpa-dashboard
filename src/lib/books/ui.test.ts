import { describe, expect, it } from "vitest";
import type { TaxCode } from "./tax-codes";
import {
  allocateOldestFirst,
  booksHref,
  booksRange,
  booksView,
  booksMonth,
  codesFor,
  codesNeedConfirming,
  codeTone,
  fsLineOfLabel,
  invoicePreview,
  journalRows,
  journalTotals,
  matches,
  moduleForFsLine,
  monthRange,
  parsePesos,
  partyBalances,
  pesos,
  postingChoices,
  shiftMonth,
} from "./ui";

const code = (id: string, kind: TaxCode["kind"], rate: number, active = true): TaxCode => ({ id, code: id.toUpperCase(), name: id, kind, rate, atc: null, payeeType: null, active });
const CODES = [
  code("ovat", "output_vat", 0.12),
  code("ves", "vat_exempt_sales", 0),
  code("ivat", "input_vat_goods", 0.12),
  code("wc158", "withholding", 0.01),
  code("wv010", "govt_vat_withheld", 0.05),
  code("old", "output_vat", 0.12, false),
];

describe("Books month", () => {
  it("takes the month asked for, else today's, never before the books start", () => {
    expect(booksMonth("2026-10", "2026-11-25", "2026-01-01")).toBe("2026-10");
    expect(booksMonth("nonsense", "2026-11-25", "2026-01-01")).toBe("2026-11");
    expect(booksMonth(undefined, "2026-11-25", null)).toBe("2026-11");
    expect(booksMonth("2025-12", "2026-11-25", "2026-03-01")).toBe("2026-03");
  });

  it("knows a month's first and last day, across years", () => {
    expect(monthRange("2027-02")).toEqual({ from: "2027-02-01", to: "2027-02-28" });
    expect(monthRange("2028-02").to).toBe("2028-02-29");
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2027-01", -1)).toBe("2026-12");
  });

  it("builds module links that keep the month", () => {
    expect(booksHref("c1", "summary")).toBe("/app/clients/c1/books");
    expect(booksHref("c1", "sales-invoices", "2026-11", { q: "acme", party: null })).toBe("/app/clients/c1/books/sales-invoices?month=2026-11&q=acme");
    expect(booksHref("c1", "receipts", null, {}, "/new")).toBe("/app/clients/c1/books/receipts/new");
  });
});

describe("Summary links", () => {
  it("leads each FS line to the module that holds it", () => {
    expect(moduleForFsLine(fsLineOfLabel("Cash and cash equivalents"))).toBe("bank-accounts");
    expect(moduleForFsLine(fsLineOfLabel("Trade and other receivables"))).toBe("customers");
    expect(moduleForFsLine(fsLineOfLabel("Revenues"))).toBe("sales-invoices");
    expect(moduleForFsLine(fsLineOfLabel("Operating expenses"))).toBe("purchase-invoices");
    expect(moduleForFsLine(fsLineOfLabel("Total assets"))).toBe("journal");
  });
});

describe("lists", () => {
  it("searches any of the fields, ignoring case", () => {
    expect(matches("", "x")).toBe(true);
    expect(matches("acme", "ACME Trading", null)).toBe(true);
    expect(matches("0451", "SI", 451, "SI 0451")).toBe(true);
    expect(matches("zzz", "ACME")).toBe(false);
  });

  it("groups customers by directory id or name, leaving void invoices out of the balance", () => {
    const rows = [
      { party_id: "p1", party_name: "Acme", party_tin: null, total: "1120.00", balance_due: "1120.00", voided_at: null },
      { party_id: "p1", party_name: "Acme", party_tin: "123-456-789-000", total: "560.00", balance_due: "0", voided_at: null },
      { party_id: null, party_name: " Walk-in ", party_tin: null, total: "100", balance_due: "100", voided_at: null },
      { party_id: null, party_name: "walk-in", party_tin: null, total: "50", balance_due: "50", voided_at: "2026-11-02" },
    ];
    const out = partyBalances(rows);
    expect(out).toHaveLength(2);
    expect(out[0]).toMatchObject({ name: "Acme", tin: "123-456-789-000", invoices: 2, total: 168000, balance: 112000 });
    expect(out[1]).toMatchObject({ invoices: 1, total: 10000, balance: 10000 });
  });
});

describe("Transaction Journal", () => {
  const names: Record<string, string> = { ar: "Accounts Receivable", sales: "Sales", vat: "Output VAT", cwt: "Creditable Withholding Tax" };
  it("shows party and invoice, and the tax code on the invoice's lines", () => {
    const rows = journalRows(
      [
        { lineNo: 2, accountId: "sales", partyName: "Acme", description: null, openItemId: null, debit: 0, credit: 100000 },
        { lineNo: 1, accountId: "ar", partyName: "Acme", description: null, openItemId: "oi1", debit: 111000, credit: 0 },
        { lineNo: 3, accountId: "vat", partyName: null, description: null, openItemId: null, debit: 0, credit: 12000 },
        { lineNo: 4, accountId: "cwt", partyName: null, description: null, openItemId: null, debit: 1000, credit: 0 },
      ],
      {
        accountName: (id) => names[id],
        invoiceOf: (oi) => (oi === "oi1" ? "SI 0451 · 3 Jan 2027" : null),
        invoiceLines: [{ accountId: "sales", amount: 100000, taxCode: "Output VAT 12%" }],
        date: "3 Jan 2027",
      },
    );
    expect(rows.map((r) => r.account)).toEqual(["Accounts Receivable", "Sales", "Output VAT", "Creditable Withholding Tax"]);
    expect(rows[0].detail).toBe("Acme — SI 0451 · 3 Jan 2027");
    expect(rows[1]).toMatchObject({ detail: "Acme — 3 Jan 2027", taxCode: "Output VAT 12%" });
    expect(rows[2]).toMatchObject({ detail: null, taxCode: null });
    expect(journalTotals(rows)).toEqual({ debit: 112000, credit: 112000 });
  });

  it("matches each invoice line once, by account and amount", () => {
    const rows = journalRows(
      [
        { lineNo: 1, accountId: "sales", partyName: null, description: null, openItemId: null, debit: 0, credit: 500 },
        { lineNo: 2, accountId: "sales", partyName: null, description: null, openItemId: null, debit: 0, credit: 500 },
      ],
      { accountName: (id) => id, invoiceLines: [{ accountId: "sales", amount: 500, taxCode: "VES" }] },
    );
    expect(rows.map((r) => r.taxCode)).toEqual(["VES", null]);
  });
});

describe("invoice form", () => {
  it("offers only the codes that may go on the invoice and place", () => {
    expect(codesFor(CODES, "sales", "line").map((c) => c.id)).toEqual(["ovat", "ves"]);
    expect(codesFor(CODES, "sales", "line", "old").map((c) => c.id)).toEqual(["ovat", "ves", "old"]);
    expect(codesFor(CODES, "purchase", "line").map((c) => c.id)).toEqual(["ivat"]);
    expect(codesFor(CODES, "purchase", "invoice").map((c) => c.id)).toEqual(["wc158"]);
    expect(codesFor(CODES, "sales", "invoice").map((c) => c.id)).toEqual(["wc158", "wv010"]);
  });

  it("reads peso amounts", () => {
    expect(parsePesos("1,120.50")).toBe(112050);
    expect(parsePesos(" 7 ")).toBe(700);
    expect(parsePesos("")).toBeNull();
    expect(parsePesos("1.234")).toBeNull();
    expect(parsePesos("abc")).toBeNull();
    expect(pesos(112050)).toBe("1120.50");
  });

  it("works out VAT, total, withholding and what is due as the database does", () => {
    const p = invoicePreview(
      [{ amount: "1000", taxCodeId: "ovat" }, { amount: "200", taxCodeId: "ves" }, { amount: "", taxCodeId: null }],
      CODES,
      { withholdingCodeId: "wc158", vatWithholdingCodeId: "wv010", discount: "0" },
    );
    expect(p).toMatchObject({ subtotal: 120000, tax: 12000, total: 132000, withholding: 1200, vatWithheld: 6000, due: 124800, bad: [] });
    const typed = invoicePreview([{ amount: "1000", taxCodeId: "ovat" }, { amount: "x", taxCodeId: null }], CODES, { withholdingCodeId: "wc158", withholding: "15" });
    expect(typed.withholding).toBe(1500);
    expect(typed.bad).toEqual([2]);
    expect(invoicePreview([{ amount: "100", taxCodeId: null }], CODES, { withholding: "5" }).withholding).toBe(0);
  });

  it("allocates a payment to the oldest invoices first", () => {
    const out = allocateOldestFirst(
      [
        { id: "b", issueDate: "2026-11-05", balance: 5000 },
        { id: "a", issueDate: "2026-11-01", balance: 3000 },
        { id: "c", issueDate: "2026-11-09", balance: 9000 },
      ],
      7000,
    );
    expect([...out]).toEqual([["a", 3000], ["b", 4000]]);
  });
});

describe("Inbox tax codes", () => {
  it("colours a party default as ready and an OCR suggestion as to confirm", () => {
    expect(codeTone("party", false)).toBe("success");
    expect(codeTone("ocr", false)).toBe("warning");
    expect(codeTone("ocr", true)).toBe("success");
    expect(codeTone(null, false)).toBe("neutral");
  });

  it("needs confirming while any code came from OCR", () => {
    expect(codesNeedConfirming(null)).toBe(false);
    expect(codesNeedConfirming({ lines: [{ source: "party" }], withholding_source: null, vat_withholding_source: null })).toBe(false);
    expect(codesNeedConfirming({ lines: [{ source: "party" }, { source: "ocr" }], withholding_source: null, vat_withholding_source: null })).toBe(true);
    expect(codesNeedConfirming({ lines: [], withholding_source: "ocr", vat_withholding_source: null })).toBe(true);
  });

  it("names what a row goes to the Books as", () => {
    expect(postingChoices("sales").map((c) => c.label)).toEqual(["Sales Invoice + Receipt (cash)", "Sales Invoice (on account)"]);
    expect(postingChoices("purchase")[1]).toEqual({ value: "charge", label: "Purchase Invoice (on account)" });
  });
});

describe("booksRange", () => {
  it("covers the month", () => {
    expect(booksRange("2026-11", "month", 12, "2026-01-01")).toMatchObject({ from: "2026-11-01", to: "2026-11-30", endMonth: "2026-11", label: "November 2026" });
  });
  it("covers the calendar quarter", () => {
    expect(booksRange("2026-11", "quarter", 12, "2026-01-01")).toMatchObject({ from: "2026-10-01", to: "2026-12-31", endMonth: "2026-12" });
  });
  it("follows a fiscal year (June year end: Jul–Sep is Q1)", () => {
    expect(booksRange("2026-08", "quarter", 6, null)).toMatchObject({ from: "2026-07-01", to: "2026-09-30" });
    expect(booksRange("2026-02", "ytd", 6, null)).toMatchObject({ from: "2025-07-01", to: "2026-02-28" });
  });
  it("starts the year to date at the books start", () => {
    expect(booksRange("2026-11", "ytd", 12, "2026-10-01")).toMatchObject({ from: "2026-10-01", to: "2026-11-30", label: "Oct – Nov 2026 (year to date)" });
  });
  it("defaults an unknown view to the month", () => {
    expect(booksView("week")).toBe("month");
    expect(booksView("ytd")).toBe("ytd");
  });
});
