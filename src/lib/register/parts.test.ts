import { describe, expect, it } from "vitest";
import { bookkeepingPart, isBalanced, taxPart, toRegisterLine, totals, type RegisterLine, type RegisterRow } from "./parts";

const row = (over: Partial<RegisterRow>): RegisterRow => ({
  id: "l1", document_id: "d1", kind: "sale", source: "portal", month: "2027-03-01", line_date: "2027-03-02",
  reference: "SI 0412", party_name: "Bacolod Feeds Corp.", party_tin: "123-456-789-00000", terms: "cash",
  vatable: "0", vat_exempt: "0", zero_rated: "0", vat: "0", total: "0", discount: "0", vat_withheld: "0", other_deduction: "0",
  atc: null, withholding: "0", net: "0", slp_category: null, vat_registered: true,
  ledger_accounts: { name: "Sales", fs_line: "revenue", bir_line: "sales" },
  ...over,
});
const line = (over: Partial<RegisterRow>): RegisterLine => toRegisterLine(row(over));

describe("bookkeepingPart", () => {
  it("debits Cash with the net receipt and parks the CWT until the 2307 arrives", () => {
    const l = line({ vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", atc: "WC158", net: "133200.00" });
    const e = bookkeepingPart(l);
    expect(e).toEqual([
      { account: "Cash", debit: 13320000, credit: 0 },
      { account: "Creditable Withholding Tax – awaiting 2307", debit: 120000, credit: 0 },
      { account: "Sales", debit: 0, credit: 12000000 },
      { account: "Output VAT", debit: 0, credit: 1440000 },
    ]);
    expect(isBalanced(e)).toBe(true);
  });

  it("books the SC/PWD discount on its own and credits exempt sales before it", () => {
    const l = line({ vat_exempt: "2000.00", total: "2000.00", discount: "500.00", net: "2000.00", party_tin: null });
    const e = bookkeepingPart(l);
    expect(e).toEqual([
      { account: "Cash", debit: 200000, credit: 0 },
      { account: "Sales Discount – SC/PWD", debit: 50000, credit: 0 },
      { account: "Sales", debit: 0, credit: 250000 },
    ]);
    expect(isBalanced(e)).toBe(true);
  });

  it("puts a charge sale to receivables at the invoice total", () => {
    const e = bookkeepingPart(line({ terms: "charge", vatable: "1000.00", vat: "120.00", total: "1120.00", net: "1120.00" }));
    expect(e[0]).toEqual({ account: "Accounts Receivable", debit: 112000, credit: 0 });
    expect(isBalanced(e)).toBe(true);
  });

  it("credits Cash with the net paid and books EWT payable at payment", () => {
    const l = line({ kind: "purchase", reference: "OR 2201", vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", atc: "WC100", net: "48150.00", ledger_accounts: { name: "Rent", fs_line: "operating_expenses", bir_line: "ded_rental" } });
    const e = bookkeepingPart(l);
    expect(e).toEqual([
      { account: "Rent", debit: 4500000, credit: 0 },
      { account: "Input VAT", debit: 540000, credit: 0 },
      { account: "Cash", debit: 0, credit: 4815000 },
      { account: "Withholding Tax Payable – Expanded", debit: 0, credit: 225000 },
    ]);
    expect(isBalanced(e)).toBe(true);
  });

  it("keeps VAT inside the cost for a client that is not VAT-registered", () => {
    const e = bookkeepingPart(line({ kind: "purchase", vat_registered: false, vatable: "500.00", vat: "60.00", total: "560.00", net: "560.00", ledger_accounts: { name: "Office Supplies", fs_line: "operating_expenses", bir_line: "ded_office_supplies" } }));
    expect(e).toEqual([
      { account: "Office Supplies", debit: 56000, credit: 0 },
      { account: "Cash", debit: 0, credit: 56000 },
    ]);
  });

  it("moves CWT from awaiting to received when the 2307 comes, without touching cash", () => {
    const e = bookkeepingPart(line({ kind: "cwt_received", withholding: "1200.00", ledger_accounts: null }));
    expect(e).toEqual([
      { account: "Creditable Withholding Tax – 2307 received", debit: 120000, credit: 0 },
      { account: "Creditable Withholding Tax – awaiting 2307", debit: 0, credit: 120000 },
    ]);
    expect(e.some((x) => x.account === "Cash")).toBe(false);
  });

  it("balances every kind of line, including deductions on a cash purchase", () => {
    const lines = [
      line({ vatable: "100.00", vat: "12.00", total: "112.00", withholding: "1.00", vat_withheld: "5.00", other_deduction: "2.00", net: "104.00" }),
      line({ kind: "purchase", vatable: "100.00", vat: "12.00", total: "112.00", withholding: "2.00", other_deduction: "3.00", net: "107.00" }),
      line({ kind: "purchase", terms: "charge", vatable: "100.00", vat: "12.00", total: "112.00", withholding: "2.00", net: "110.00" }),
    ];
    for (const l of lines) expect(isBalanced(bookkeepingPart(l))).toBe(true);
    expect(bookkeepingPart(line({ kind: "ewt_issued", withholding: "500.00" }))).toEqual([]);
  });
});

describe("taxPart", () => {
  it("sends a VAT sale to the 2550Q, the SLSP, the income tax return and, once the 2307 arrives, the SAWT", () => {
    const t = taxPart(line({ vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", atc: "WC158", net: "133200.00" }));
    expect(t.map((x) => [x.form, x.item, x.amount])).toEqual([
      ["2550Q", "VATable sales", 12000000],
      ["2550Q", "Output tax", 1440000],
      ["SLSP", "Sales to Bacolod Feeds Corp.", 12000000],
      ["1701Q / 1702Q", "Sales / revenues / receipts / fees", 12000000],
      ["SAWT", "WC158 from Bacolod Feeds Corp.", 120000],
    ]);
  });

  it("sends a non-VAT client's sale to the 2551Q", () => {
    const t = taxPart(line({ vat_registered: false, vat_exempt: "5000.00", total: "5000.00", net: "5000.00" }));
    expect(t[0]).toEqual({ form: "2551Q", item: "Gross sales or receipts", amount: 500000 });
  });

  it("claims input VAT on capital goods in full and leaves income tax to depreciation", () => {
    const t = taxPart(line({ kind: "purchase", slp_category: "capital_goods", vatable: "85000.00", vat: "10200.00", total: "95200.00", net: "95200.00", ledger_accounts: { name: "Furniture and Fixtures", fs_line: "ppe", bir_line: null } }));
    expect(t.map((x) => [x.form, x.item, x.amount])).toEqual([
      ["2550Q", "Purchases: capital goods", 8500000],
      ["2550Q", "Input tax", 1020000],
      ["SLSP", "Purchases from Bacolod Feeds Corp.", 8500000],
      ["1701Q / 1702Q", "Depreciation only (capital goods)", 8500000],
    ]);
  });

  it("deducts an expense on its account's BIR line and lists the EWT for the QAP", () => {
    const t = taxPart(line({ kind: "purchase", party_name: "Sta. Barbara Realty", vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", atc: "WC100", net: "48150.00", ledger_accounts: { name: "Rent", fs_line: "operating_expenses", bir_line: "ded_rental" } }));
    expect(t.find((x) => x.form === "QAP / 1601-EQ")).toEqual({ form: "QAP / 1601-EQ", item: "WC100 withheld from Sta. Barbara Realty", amount: 225000 });
    expect(t.find((x) => x.form === "1701Q / 1702Q")?.item).toBe("Rental");
  });
});

describe("totals", () => {
  it("adds up a register", () => {
    const t = totals([line({ vatable: "100.00", vat: "12.00", total: "112.00", net: "112.00" }), line({ vat_exempt: "50.00", total: "50.00", net: "50.00", discount: "10.00" })]);
    expect(t).toMatchObject({ count: 2, vatable: 10000, vatExempt: 5000, vat: 1200, total: 16200, net: 16200, discount: 1000 });
  });
});
