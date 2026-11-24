import { describe, expect, it } from "vitest";
import { checkOpening, openingPayload, type ItemRow, type TbRow } from "./opening";
import { buildOpeningTemplate, readOpeningFile } from "./opening-xlsx";
import type { LedgerAccount } from "./types";

const acct = (id: string, code: string, name: string, control: LedgerAccount["control"] = null): LedgerAccount => ({
  id, key: null, code, name, type: "asset", normalSide: "debit", fsLine: "cash_and_equivalents", birLine: null, control, cashFlow: null, active: true, sortOrder: 0,
});
const accounts = [
  acct("a1", "1010", "Cash on Hand", "cash"),
  acct("a2", "1100", "Accounts Receivable - Trade", "ar"),
  acct("a3", "2010", "Accounts Payable - Trade", "ap"),
  acct("a4", "3010", "Owner's Capital", "capital"),
];
const tb = (code: string, debit = "", credit = "", line = 2): TbRow => ({ line, code, debit, credit });
const item = (kind: ItemRow["kind"], partyName: string, amount: string, tin = ""): ItemRow => ({ line: 2, kind, partyName, tin, docNumber: "SI-1", docDate: "2026-12-15", dueDate: "", amount });

describe("checkOpening", () => {
  it("accepts a balanced trial balance whose AR and AP detail ties", () => {
    const c = checkOpening(
      [tb("1010", "10,000.00"), tb("1100", "5000"), tb("2010", "", "3,000"), tb("3010", "", "12000")],
      [item("receivable", "ABC Corp", "5000", "123456789"), item("payable", "XYZ Trading", "3000")],
      accounts,
    );
    expect(c.errors).toEqual([]);
    expect(c.totalDebit).toBe(1_500_000);
    expect(c.arBalance).toBe(500_000);
    expect(c.apBalance).toBe(300_000);
    expect(c.items[0].partyTin).toBe("123-456-789");
    expect(openingPayload(c).p_lines[0]).toEqual({ account_id: "a1", debit: "10000.00", credit: "0.00" });
  });

  it("reports an unbalanced trial balance and untied receivables", () => {
    const c = checkOpening([tb("1010", "100"), tb("1100", "50"), tb("3010", "", "120")], [item("receivable", "ABC", "40")], accounts);
    expect(c.errors.join(" ")).toMatch(/does not balance.*difference 30.00/);
    expect(c.errors.join(" ")).toMatch(/receivables listed \(40.00\).*\(50.00\)/);
  });

  it("rejects unknown codes, both sides, repeated accounts and bad TINs", () => {
    const c = checkOpening(
      [tb("9999", "1"), tb("1010", "1", "1", 3), tb("3010", "", "1", 4), tb("3010", "", "1", 5)],
      [item("payable", "Supplier", "10", "12345")],
      accounts,
    );
    expect(c.errors.some((e) => e.includes("no account 9999"))).toBe(true);
    expect(c.errors.some((e) => e.includes("not both"))).toBe(true);
    expect(c.errors.some((e) => e.includes("appears twice"))).toBe(true);
    expect(c.errors.some((e) => e.includes("TIN"))).toBe(true);
  });
});

describe("opening balances workbook", () => {
  it("round-trips the chart, balances and open items", async () => {
    const buf = await buildOpeningTemplate({
      clientName: "Client A",
      asOf: "2026-12-31",
      accounts,
      balances: new Map([["a1", 1_000_000], ["a4", -1_000_000]]),
      items: [{ kind: "receivable", partyName: "ABC Corp", partyTin: "123-456-789", docNumber: "SI-1", docDate: "2026-12-01", dueDate: null, amount: 25_000 }],
    });
    const read = await readOpeningFile(buf);
    if ("error" in read) throw new Error(read.error);
    expect(read.tb.map((r) => [r.code, r.debit, r.credit])).toEqual([["1010", "10000", ""], ["1100", "", ""], ["2010", "", ""], ["3010", "", "10000"]]);
    expect(read.items).toEqual([{ line: 2, kind: "receivable", partyName: "ABC Corp", tin: "123-456-789", docNumber: "SI-1", docDate: "2026-12-01", dueDate: "", amount: "250" }]);
  });

  it("refuses a workbook without the trial balance sheet", async () => {
    const r = await readOpeningFile(Buffer.from("not a workbook"));
    expect("error" in r).toBe(true);
  });
});
