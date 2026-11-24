import { describe, expect, it } from "vitest";
import { columnarBook, crossFoots, generalJournal, generalLedger, taxableYearStart, type BookEntry } from "./books";
import ExcelJS from "exceljs";
import { buildBookWorkbook } from "./books-xlsx";
import { buildPrintBook, pageBook, pageCount, splitAmount } from "./print";
import type { LedgerAccount } from "./types";

const acct = (id: string, code: string, name: string, type: LedgerAccount["type"], control: LedgerAccount["control"] = null, normalSide: LedgerAccount["normalSide"] = "debit"): LedgerAccount => ({
  id, key: null, code, name, type, normalSide, fsLine: "x", birLine: null, control, cashFlow: null, active: true, sortOrder: Number(code),
});
const accounts = [
  acct("cash", "1010", "Cash on Hand", "asset", "cash"),
  acct("bank", "1020", "Cash in Bank", "asset", "bank"),
  acct("ar", "1100", "Accounts Receivable", "asset", "ar"),
  acct("cwt", "1310", "CWT", "asset", "cwt"),
  acct("ovat", "2030", "Output VAT", "liability", "output_vat", "credit"),
  acct("sales", "4010", "Sales", "revenue", null, "credit"),
  acct("other", "4100", "Other Income", "other_income", null, "credit"),
  acct("rent", "6040", "Rent Expense", "expense"),
];
const line = (accountId: string, debit: number, credit = 0, partyName: string | null = null) => ({ accountId, partyName, partyTin: partyName ? "123-456-789" : null, description: null, debit, credit });
const entries: BookEntry[] = [
  { id: "e1", date: "2027-01-05", book: "cash_receipts", reference: "OR-1", memo: "Cash sale", lines: [line("cash", 11_200), line("sales", 0, 10_000, "ABC"), line("ovat", 0, 1_200)] },
  { id: "e2", date: "2027-01-06", book: "cash_receipts", reference: "OR-2", memo: "Collection and interest", lines: [line("bank", 5_500), line("cwt", 100), line("ar", 0, 5_000, "ABC"), line("other", 0, 600)] },
  { id: "e3", date: "2027-01-31", book: "general_journal", reference: "JV-1", memo: "Accrued rent", lines: [line("rent", 3_000), line("cash", 0, 3_000)] },
];

describe("columnar books", () => {
  it("puts lines in their columns and the rest in Sundry, and cross-foots", () => {
    const b = columnarBook("cash_receipts", entries, accounts);
    expect(b.rows).toHaveLength(2);
    expect(b.rows[0]).toMatchObject({ reference: "OR-1", party: "ABC", tin: "123-456-789", amounts: { cash: 11_200, revenue: 10_000, output_vat: 1_200 }, sundry: [] });
    expect(b.rows[1].amounts).toEqual({ cash: 5_500, cwt: 100, ar: 5_000 });
    expect(b.rows[1].sundry).toEqual([{ account: "4100 Other Income", debit: 0, credit: 600 }]);
    expect(b.totals).toEqual({ cash: 16_700, cwt: 100, ar: 5_000, revenue: 10_000, output_vat: 1_200 });
    expect(crossFoots(b)).toBe(true);
  });

  it("lists general journal entries with their lines", () => {
    const j = generalJournal(entries, accounts);
    expect(j.rows).toHaveLength(1);
    expect(j.rows[0].lines.map((l) => l.account)).toEqual(["6040 Rent Expense", "1010 Cash on Hand"]);
    expect(j.debit).toBe(j.credit);
  });
});

describe("general ledger", () => {
  it("runs each account's balance in its normal direction from the opening", () => {
    const gl = generalLedger(entries, accounts, new Map([["cash", 100_000], ["sales", -50_000]]));
    const cash = gl.find((s) => s.code === "1010")!;
    expect(cash.opening).toBe(100_000);
    expect(cash.lines.map((l) => [l.book, l.balance])).toEqual([["CRB", 111_200], ["GJ", 108_200]]);
    expect(gl.find((s) => s.code === "4010")!.closing).toBe(60_000);
    expect(gl.map((s) => s.code)).not.toContain("9999");
  });

});

describe("pages", () => {
  it("rules every page with the same number of lines and carries totals forward", () => {
    const big: BookEntry[] = Array.from({ length: 30 }, (_, i) => ({ ...entries[0], id: `x${i}`, reference: `OR-${i}` }));
    const book = buildPrintBook("cash_receipts", big, accounts, new Map());
    expect(book.orientation).toBe("landscape");
    const pages = pageBook(book, 12, 5);
    expect(pages.map((p) => p.number)).toEqual([5, 6, 7]);
    for (const p of pages) expect(p.lines).toHaveLength(12);
    expect(pages[0].lines[11]).toMatchObject({ text: { particulars: "Carried forward" }, money: { cash: 11 * 11_200 } });
    expect(pages[1].lines[0]).toMatchObject({ text: { particulars: "Brought forward" }, money: { cash: 11 * 11_200 } });
    expect(pages[2].lines[11]).toMatchObject({ text: { particulars: "Totals" }, money: { cash: 30 * 11_200, revenue: 30 * 10_000 } });
    expect(pageCount(book, 12)).toBe(3);
    expect(pageCount(buildPrintBook("sales", big, accounts, new Map()), 12)).toBe(0);
  });

  it("puts the general journal's explanation under its lines and repeats a ledger account's title", () => {
    const gj = buildPrintBook("general_journal", entries, accounts, new Map());
    expect(gj.lines.map((l) => l.style ?? "")).toEqual(["", "indent", "note"]);
    const gl = buildPrintBook("general_ledger", Array.from({ length: 8 }, (_, i) => ({ ...entries[2], id: `g${i}` })), accounts, new Map());
    const pages = pageBook(gl, 6, 1);
    expect(pages[1].lines[0]?.text.particulars).toMatch(/\(continued\)$/);
    expect(pages.flat().length).toBeGreaterThan(1);
  });

  it("splits amounts into pesos and centavos", () => {
    expect(splitAmount(1_120_050)).toEqual(["11,200", "50"]);
    expect(splitAmount(-5)).toEqual(["(0", "05)"]);
    expect(splitAmount(0)).toEqual(["", ""]);
  });

  it("finds the start of the taxable year", () => {
    expect(taxableYearStart("2027-03-15", 12)).toBe("2027-01-01");
    expect(taxableYearStart("2027-03-15", 6)).toBe("2026-07-01");
    expect(taxableYearStart("2027-08-01", 6)).toBe("2027-07-01");
  });
});

describe("book workbook", () => {
  it("writes every line and the totals", async () => {
    const book = buildPrintBook("cash_receipts", entries, accounts, new Map());
    const buf = await buildBookWorkbook({ clientName: "Client A", tin: "123-456-789", period: "2027-01-01 to 2027-01-31", book });
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buf as unknown as ExcelJS.Buffer);
    const ws = wb.worksheets[0];
    expect(ws.getRow(6).getCell(1).value).toBe("Date");
    expect(ws.getRow(7).getCell(2).value).toBe("OR-1");
    const totals = ws.getRow(9);
    expect(totals.getCell(3).value).toBe("Totals");
    expect(totals.getCell(4).value).toBe(167);
  });
});
