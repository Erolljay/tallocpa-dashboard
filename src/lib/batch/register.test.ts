import { describe, expect, it } from "vitest";
import { buildBatchTemplate, readBatch } from "./xlsx";
import { centavosOf, checkBatch, findAccount, isoDate, splitVat, type BatchAccount, type BatchContext, type RawRow } from "./register";

const ACCOUNTS: BatchAccount[] = [
  { id: "a-cash", code: "1010", name: "Cash on hand", type: "asset", control: "cash" },
  { id: "a-bank", code: "1020", name: "Cash in bank", type: "asset", control: "bank" },
  { id: "a-sales", code: "4010", name: "Sales", type: "revenue", control: null },
  { id: "a-rent", code: "6100", name: "Rent Expense", type: "expense", control: null },
  { id: "a-furn", code: "1510", name: "Furniture and Fixtures", type: "asset", control: null },
  { id: "a-bankchg", code: "6900", name: "Bank Charges", type: "expense", control: null },
];

const ctx = (over: Partial<BatchContext> = {}): BatchContext => ({
  kind: "sales",
  accounts: ACCOUNTS,
  today: "2027-03-15",
  booksStart: "2027-01-01",
  lockedMonths: new Set(),
  vatRegistered: () => true,
  existing: new Set(),
  ...over,
});
const row = (cells: Record<string, string>, line = 3): RawRow => ({ line, cells });
const SALE = { date: "2027-01-05", party_kind: "Business", party_name: "Bacolod Feeds Corp", party_tin: "123456789", number: "SI 0412", account: "4010 · Sales", vatable: "134,400.00", atc: "WC158", withholding: "1200", paid: "Y" };
const RENT = { date: "2027-01-31", party_kind: "Individual", party_last_name: "Dela Cruz", party_first_name: "Juan", party_middle_name: "Santos", party_tin: "222-333-444-000", number: "OR 88", account: "Rent Expense", services: "56000", atc: "WI100", withholding: "2500", paid: "Y", payment_account: "1020" };

describe("cells", () => {
  it("reads amounts in pesos into centavos", () => {
    expect(centavosOf("₱1,120.50")).toBe(112050);
    expect(centavosOf("")).toBe(0);
    expect(centavosOf("abc")).toBeNull();
  });
  it("reads dates in the usual forms and refuses impossible ones", () => {
    expect(isoDate("2027-1-5")).toBe("2027-01-05");
    expect(isoDate("1/15/2027")).toBe("2027-01-15");
    expect(isoDate("2027-02-30")).toBeNull();
  });
  it("takes VAT as 12/112 of a VAT-inclusive amount", () => {
    expect(splitVat(13440000)).toEqual({ net: 12000000, vat: 1440000 });
  });
  it("finds an account by code, by label or by name", () => {
    expect(findAccount("4010", ACCOUNTS)?.id).toBe("a-sales");
    expect(findAccount("4010 · Sales", ACCOUNTS)?.id).toBe("a-sales");
    expect(findAccount("rent expense", ACCOUNTS)?.id).toBe("a-rent");
    expect(findAccount("Utilities", ACCOUNTS)).toBeNull();
  });
});

describe("sales rows", () => {
  it("turns a clean cash sale into the approved figures the register reads", () => {
    const c = checkBatch([row(SALE)], ctx());
    expect(c.errorCount).toBe(0);
    const r = c.rows[0];
    expect(r.accountId).toBe("a-sales");
    expect(r.fields).toMatchObject({ date: "2027-01-05", number: "SI 0412", party_kind: "non_individual", party_tin: "123-456-789", vatable: "120000.00", vat: "14400.00", total: "134400.00", atc: "WC158", withholding: "1200.00", payment_terms: "cash" });
    expect(r.net).toBe(13320000);
    expect(r.booked).toBe(true);
  });

  it("names each problem on the row", () => {
    const c = checkBatch([row({ ...SALE, date: "2027-04-01", number: "", account: "Utilities", atc: "", vatable: "x" })], ctx());
    expect(c.rows[0].errors).toEqual([
      "The date 2027-04-01 is in the future.",
      "No invoice number.",
      'The account "Utilities" is not in the client\'s chart.',
      'VATable sales: "x" is not an amount.',
      "CWT needs its ATC.",
    ]);
  });

  it("refuses a locked month, a non-revenue account and VATable sales of a non-VAT client", () => {
    const c = checkBatch([row({ ...SALE, account: "1010" })], ctx({ lockedMonths: new Set(["2027-01-01"]), vatRegistered: () => false }));
    expect(c.rows[0].errors).toEqual([
      "2027-01 is locked: its return has been filed.",
      "1010 · Cash on hand is not a revenue account.",
      "The client is not VAT-registered on that date: enter the sale under VAT-exempt sales.",
    ]);
  });

  it("catches duplicates in the file and in the register", () => {
    const c = checkBatch([row(SALE, 3), row(SALE, 4), row({ ...SALE, number: "SI 0001" }, 5)], ctx({ existing: new Set(["sale|SI 0001"]) }));
    expect(c.rows.map((r) => r.errors)).toEqual([[], ["SI 0412 appears twice in the file."], ["SI 0001 is already in the register."]]);
  });

  it("checks the amount received against the net, within ₱1", () => {
    expect(checkBatch([row({ ...SALE, paid_amount: "133,200.50" })], ctx()).errorCount).toBe(0);
    expect(checkBatch([row({ ...SALE, paid_amount: "134,400" })], ctx()).rows[0].errors).toEqual(["Amount received 134400.00 is not the net 133200.00 (total 134400.00 less withholding and deductions)."]);
  });

  it("keeps a charge sale on account and books rows before the books start to the register only", () => {
    const r = checkBatch([row({ ...SALE, date: "2026-12-20", paid: "N" })], ctx()).rows[0];
    expect(r.fields.payment_terms).toBe("charge");
    expect(r.booked).toBe(false);
  });

  it("needs an account for an other deduction, and only on a same-day collection", () => {
    expect(checkBatch([row({ ...SALE, other_deduction: "100", paid: "N" })], ctx()).rows[0].errors).toEqual([
      "An other deduction is booked only when collected the same day.",
      "Give the account for the other deduction.",
    ]);
    const ok = checkBatch([row({ ...SALE, other_deduction: "100", other_account: "6900" })], ctx()).rows[0];
    expect(ok.fields.other_deduction_account).toBe("a-bankchg");
  });
});

describe("purchases rows", () => {
  const p = (over: Partial<BatchContext> = {}) => ctx({ kind: "purchases", ...over });

  it("keeps an individual's name parts for the SLP and QAP, with the SLP category and the bank paid from", () => {
    const r = checkBatch([row(RENT)], p()).rows[0];
    expect(r.errors).toEqual([]);
    expect(r.fields).toMatchObject({ party_kind: "individual", party_last_name: "Dela Cruz", party_first_name: "Juan", party_middle_name: "Santos", party_name: "Juan Santos Dela Cruz", party_tin: "222-333-444-000", vatable: "50000.00", vat: "6000.00", total: "56000.00", slp_category: "services", payment_account: "a-bank" });
    expect(r.net).toBe(5350000);
  });

  it("asks for one SLP category per row, a supplier TIN and an individual's names", () => {
    const r = checkBatch([row({ ...RENT, party_tin: "", party_first_name: "", other_goods: "1000" })], p()).rows[0];
    expect(r.errors).toEqual([
      "An individual needs a last and a first name.",
      "No supplier TIN: the SLP and the input VAT need it.",
      "Put capital goods, other goods and services on separate rows (one SLP category per row).",
    ]);
  });

  it("puts an asset purchase under capital goods", () => {
    const r = checkBatch([row({ ...RENT, account: "1510", atc: "", withholding: "" })], p()).rows[0];
    expect(r.errors).toEqual(["1510 · Furniture and Fixtures is an asset: put the amount under Capital goods."]);
    const ok = checkBatch([row({ ...RENT, account: "1510", services: "", capital_goods: "56000", atc: "", withholding: "" })], p()).rows[0];
    expect(ok.fields.slp_category).toBe("capital_goods");
  });

  it("treats duplicates by supplier TIN and number", () => {
    const c = checkBatch([row(RENT)], p({ existing: new Set(["purchase|222-333-444-000|OR 88"]) }));
    expect(c.rows[0].errors).toEqual(["OR 88 is already in the register."]);
  });
});

describe("the workbook", () => {
  it("reads back what the template's columns hold, skipping the hint row and blank rows", async () => {
    const buf = await buildBatchTemplate("sales", "Jaro Agri Supply", ACCOUNTS);
    const ExcelJS = (await import("exceljs")).default;
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buf as unknown as ArrayBuffer);
    const ws = wb.getWorksheet("Sales")!;
    expect(ws.getRow(1).getCell(1).value).toBe("Date");
    const header = (ws.getRow(1).values as unknown[]).slice(1) as string[];
    const at = (h: string) => header.indexOf(h) + 1;
    ws.getRow(3).getCell(at("Date")).value = new Date(Date.UTC(2027, 0, 5));
    ws.getRow(3).getCell(at("Registered name")).value = "Bacolod Feeds Corp";
    ws.getRow(3).getCell(at("Invoice no.")).value = "SI 0412";
    ws.getRow(3).getCell(at("Revenue account")).value = "4010 · Sales";
    ws.getRow(3).getCell(at("VATable sales")).value = 134400;
    ws.getRow(5).getCell(at("Invoice no.")).value = "SI 0413";
    const out = await wb.xlsx.writeBuffer();
    const read = await readBatch(out as ArrayBuffer, "sales");
    expect("rows" in read && read.rows.map((r) => [r.line, r.cells.date, r.cells.number, r.cells.vatable])).toEqual([
      [3, "2027-01-05", "SI 0412", "134400"],
      [5, "", "SI 0413", ""],
    ]);
  });

  it("refuses a workbook that is not the template", async () => {
    const ExcelJS = (await import("exceljs")).default;
    const wb = new ExcelJS.Workbook();
    wb.addWorksheet("Sales").addRow(["Foo", "Bar"]);
    const read = await readBatch((await wb.xlsx.writeBuffer()) as ArrayBuffer, "sales");
    expect(read).toEqual({ error: "This is not the sales register template: no Date, Invoice no., Revenue account column. Download the template from this page." });
  });
});
