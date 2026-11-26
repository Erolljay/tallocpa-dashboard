import { describe, expect, it } from "vitest";
import { missingForApproval, missingMessage } from "./required";

const fields = (o: Record<string, string>) => o;
const base = { date: "2026-06-28", number: "OR-1", party_name: "Molo Supply", total: "1120.00" };

describe("missingForApproval", () => {
  it("asks a purchase for the supplier's TIN and address (SLP)", () => {
    expect(missingForApproval("purchase_receipt", fields(base)).map((m) => m.field)).toEqual(["party_tin", "party_address"]);
    expect(missingForApproval("purchase_receipt", fields({ ...base, party_tin: "123-456-789-00000", party_address: "Molo, Iloilo" }))).toEqual([]);
  });

  it("asks a cash sale without tax withheld only for the basics", () => {
    expect(missingForApproval("sales_invoice", fields(base))).toEqual([]);
    expect(missingForApproval("sales_invoice", fields({ total: "100" })).map((m) => m.field)).toEqual(["date", "number", "party_name"]);
  });

  it("asks a sale for the customer's TIN and address only when tax or VAT was withheld (SAWT)", () => {
    expect(missingForApproval("sales_invoice", fields({ ...base, withholding: "20.00" })).map((m) => m.field)).toEqual(["party_tin", "party_address", "atc"]);
    expect(missingForApproval("sales_invoice", fields({ ...base, vat_withheld: "50.00" })).map((m) => m.field)).toEqual(["party_tin", "party_address"]);
  });

  it("asks an individual for last and first name", () => {
    expect(missingForApproval("sales_invoice", fields({ ...base, party_kind: "individual" })).map((m) => m.field)).toEqual(["party_last_name"]);
  });

  it("asks a 2307 for the payor, TIN, ATC and tax withheld", () => {
    expect(missingForApproval("bir_2307_received", fields({ date: "2026-06-30" })).map((m) => m.field)).toEqual(["party_name", "party_tin", "atc", "withholding"]);
  });

  it("asks Books clients for the account title, every tax code, the withholding code and the cash account", () => {
    const books = { accountId: null, invoice: { lineCodes: ["c1", null], withholdingCode: null, vatWithholdingCode: null, terms: "cash" as const, cashAccountId: null } };
    expect(missingForApproval("sales_invoice", fields({ ...base, party_tin: "1", party_address: "Jaro", atc: "WC160", withholding: "20" }), books).map((m) => m.field)).toEqual([
      "ledger_account", "tax_code", "withholding_code", "payment_account",
    ]);
  });

  it("leaves other documents alone", () => {
    expect(missingForApproval("payroll_register", fields({}))).toEqual([]);
  });

  it("says what to fill in", () => {
    expect(missingMessage([{ field: "party_tin", label: "TIN" }, { field: "party_address", label: "Address" }])).toBe(
      "Fill in TIN and Address first: the Books and the BIR lists (SLS, SLP, QAP, SAWT) need them.",
    );
  });
});
