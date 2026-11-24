import ExcelJS from "exceljs";
import { describe, expect, it } from "vitest";
import { aging, agingBucket, checkUpdate, updatePayload, type CashAccount, type OpenItem, type UpdateRow } from "./arap";
import { buildUpdateWorkbook, readUpdateWorkbook } from "./arap-xlsx";

const item = (id: string, kind: OpenItem["kind"], partyName: string, balance: number, docDate = "2027-01-05"): OpenItem => ({
  id, kind, partyName, partyTin: null, docNumber: `INV-${id}`, docDate, dueDate: null, amount: balance, balance,
});
const items = [item("i1", "receivable", "ABC Corp", 1_120_000), item("i2", "payable", "XYZ Supply", 300_000, "2026-10-01"), item("i3", "receivable", "ABC Corp", -5_000)];
const accounts: CashAccount[] = [{ id: "c1", code: "1010", name: "Cash on Hand" }, { id: "c2", code: "1020", name: "Cash in Bank" }];
const row = (over: Partial<UpdateRow>): UpdateRow => ({ line: 2, sheet: "Receivables", itemId: "i1", amount: "5,000", date: "2027-01-20", account: "1020 · Cash in Bank", reference: "OR-9", ...over });

describe("checkUpdate", () => {
  it("accepts collections and payments within the month and the open balance", () => {
    const c = checkUpdate([row({}), row({ line: 3, sheet: "Payables", itemId: "i2", amount: "3000", account: "1010" })], items, accounts, "2027-01-01");
    expect(c.errors).toEqual([]);
    expect(c.collected).toBe(500_000);
    expect(c.paid).toBe(300_000);
    expect(updatePayload(c)[0]).toEqual({ open_item_id: "i1", amount: "5000.00", date: "2027-01-20", account_id: "c2", reference: "OR-9" });
  });

  it("refuses overpayment across rows, dates outside the month, unknown accounts and closed invoices", () => {
    const c = checkUpdate(
      [row({ amount: "10000" }), row({ line: 3, amount: "2000" }), row({ line: 4, date: "2027-02-01" }), row({ line: 5, account: "Petty" }), row({ line: 6, itemId: "zz" })],
      items, accounts, "2027-01-01",
    );
    expect(c.errors).toHaveLength(4);
    expect(c.errors[0]).toMatch(/12000.00 is more than the 11200.00 still open/);
    expect(c.errors.join(" ")).toMatch(/must fall in 2027-01/);
    expect(c.errors.join(" ")).toMatch(/cash or bank account/);
    expect(c.errors.join(" ")).toMatch(/no longer open/);
  });

  it("says so when nothing was filled in", () => {
    expect(checkUpdate([], items, accounts, "2027-01-01").errors).toEqual(["No collections or payments were filled in."]);
  });
});

describe("aging", () => {
  it("buckets by days from the invoice date and nets credits", () => {
    expect(agingBucket({ docDate: "2027-01-01", dueDate: null }, "2027-01-31")).toBe(0);
    expect(agingBucket({ docDate: "2026-10-01", dueDate: null }, "2027-01-31")).toBe(3);
    const r = aging(items, "receivable", "2027-01-31");
    expect(r).toEqual([{ partyName: "ABC Corp", buckets: [1_115_000, 0, 0, 0], total: 1_115_000 }]);
    expect(aging(items, "payable", "2027-01-31")[0].buckets[3]).toBe(300_000);
  });
});

describe("AR/AP update workbook", () => {
  it("round-trips the filled-in rows", async () => {
    const buf = await buildUpdateWorkbook({ clientName: "Client A", month: "2027-01-01", items, accounts });
    const empty = await readUpdateWorkbook(buf);
    if ("error" in empty) throw new Error(empty.error);
    expect(empty.rows).toEqual([]);

    // Fill one collection in, as a client would.
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buf as unknown as ExcelJS.Buffer);
    const ws = wb.getWorksheet("Receivables")!;
    expect(ws.getRow(2).getCell(1).value).toBe("i1");
    ws.getRow(2).getCell(7).value = 5000;
    ws.getRow(2).getCell(8).value = "2027-01-20";
    ws.getRow(2).getCell(9).value = "1020 · Cash in Bank";
    ws.getRow(2).getCell(10).value = "OR-9";
    const filled = await readUpdateWorkbook(Buffer.from(await wb.xlsx.writeBuffer()));
    if ("error" in filled) throw new Error(filled.error);
    expect(filled.rows).toEqual([{ line: 2, sheet: "Receivables", itemId: "i1", amount: "5000", date: "2027-01-20", account: "1020 · Cash in Bank", reference: "OR-9" }]);
    expect(checkUpdate(filled.rows, items, accounts, "2027-01-01").errors).toEqual([]);
  });
});
