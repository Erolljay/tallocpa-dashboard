import { describe, expect, it } from "vitest";
import type { BookEntry } from "./books";
import { bookPeriodLabel, loadLooseLeaf, type BooksReader } from "./loose-leaf";
import { LINES_PER_PAGE } from "./print";
import type { LedgerAccount } from "./types";

const acct = (id: string, code: string, name: string, type: LedgerAccount["type"], normalSide: LedgerAccount["normalSide"] = "debit"): LedgerAccount => ({
  id, key: null, code, name, type, normalSide, fsLine: "x", birLine: null, control: null, cashFlow: null, active: true, sortOrder: Number(code),
});
const accounts = [acct("cash", "1010", "Cash on Hand", "asset"), acct("rent", "6040", "Rent Expense", "expense")];
const jv = (date: string, n: number): BookEntry => ({
  id: `e${date}${n}`, date, book: "general_journal", reference: `JV-${n}`, memo: "Rent",
  lines: [{ accountId: "rent", partyName: null, partyTin: null, description: null, debit: 1_000, credit: 0 }, { accountId: "cash", partyName: null, partyTin: null, description: null, debit: 0, credit: 1_000 }],
});
// January holds 20 journal entries (3 ruled lines each: 60 lines, two portrait pages); February one.
const all = [...Array.from({ length: 20 }, (_, i) => jv("2027-01-10", i + 1)), jv("2027-02-03", 21)];

function reader(calls: string[]): BooksReader {
  return {
    entries: async (from, to) => {
      calls.push(`entries ${from} ${to}`);
      return { accounts, entries: all.filter((e) => e.date >= from && e.date <= to) };
    },
    trialBalance: async (from, to) => {
      calls.push(`tb ${from} ${to}`);
      return [{ accountId: "cash", opening: from > "2027-01-31" ? -20_000 : 0 }];
    },
  };
}

describe("loose-leaf books", () => {
  it("numbers a month's pages on from the earlier months of the taxable year", async () => {
    const calls: string[] = [];
    const feb = await loadLooseLeaf(reader(calls), "general_journal", "2027-02-01", "2027-02-28", 12);
    expect(calls).toContain("entries 2027-01-01 2027-01-31");
    expect(feb.firstPage).toBe(3);
    expect(feb.pages.map((p) => p.number)).toEqual([3]);
    expect(feb.pages[0].lines).toHaveLength(LINES_PER_PAGE.portrait);
  });

  it("starts the bound year at page 1 and reads no earlier months", async () => {
    const calls: string[] = [];
    const year = await loadLooseLeaf(reader(calls), "general_journal", "2027-01-01", "2027-12-31", 12);
    expect(calls).toEqual(["entries 2027-01-01 2027-12-31"]);
    expect(year.firstPage).toBe(1);
    expect(year.pages.map((p) => p.number)).toEqual([1, 2]);
  });

  it("carries the General Ledger's balances forward from the trial balance", async () => {
    const calls: string[] = [];
    const gl = await loadLooseLeaf(reader(calls), "general_ledger", "2027-02-01", "2027-02-28", 12);
    expect(calls).toContain("tb 2027-02-01 2027-02-28");
    const cash = gl.book.lines.findIndex((l) => l.text.particulars === "1010 Cash on Hand");
    expect(gl.book.lines[cash + 1].money.balance).toBe(-20_000);
  });

  it("follows a fiscal year for page numbers", async () => {
    // Year ending June: February is in the year that began 1 July 2026, so January's pages come first.
    const feb = await loadLooseLeaf(reader([]), "general_journal", "2027-02-01", "2027-02-28", 6);
    expect(feb.firstPage).toBe(3);
  });

  it("labels the period", () => {
    expect(bookPeriodLabel("2027-02-01", "2027-02-28")).toBe("February 1, 2027 to February 28, 2027");
    expect(bookPeriodLabel("2027-02-01", "2027-02-01")).toBe("February 1, 2027");
  });
});
