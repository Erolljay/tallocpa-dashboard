import { describe, expect, it } from "vitest";
import { toRegisterLine, type RegisterRow } from "@/lib/register/parts";
import { blockingTies, monthsOf, tieOuts, type LedgerTotals } from "./tieouts";

const row = (over: Partial<RegisterRow>): RegisterRow => ({
  id: "l", document_id: "d", kind: "sale", source: "portal", month: "2027-03-01", line_date: "2027-03-02",
  reference: null, party_name: null, party_tin: null, terms: "cash",
  vatable: "0", vat_exempt: "0", zero_rated: "0", vat: "0", total: "0", discount: "0", vat_withheld: "0", other_deduction: "0",
  atc: null, withholding: "0", net: "0", slp_category: null, vat_registered: true, ledger_accounts: null, ...over,
});
const sale = toRegisterLine(row({ vatable: "120000.00", vat: "14400.00", total: "134400.00", withholding: "1200.00", net: "133200.00" }));
const buy = toRegisterLine(row({ kind: "purchase", vatable: "45000.00", vat: "5400.00", total: "50400.00", withholding: "2250.00", net: "48150.00" }));
const books: LedgerTotals = { revenue: 12000000, outputVat: 1440000, inputVat: 540000, ewtPayable: 225000, wtcPayable: 48390, compensation: 23650000, cashFromSales: 13320000, suggested: 0 };
const base = { month: [sale, buy], quarterToDate: [sale, buy], ledger: books, payroll: { gross: 23650000, taxWithheld: 48390 }, explanations: {} };
const byId = (ties: ReturnType<typeof tieOuts>) => Object.fromEntries(ties.map((t) => [t.id, t]));

describe("tie-outs", () => {
  it("are clean when the registers, the books and payroll agree; T-3 waits for the 2307", () => {
    const t = byId(tieOuts(base));
    for (const id of ["T-1", "T-2", "T-4", "T-5", "T-6", "T-7", "T-8"]) expect(t[id].status).toBe("clean");
    expect(t["T-3"]).toMatchObject({ status: "open", difference: 120000 });
    expect(t["T-9"].status).toBe("not_applicable");
  });

  it("allow ₱1 of rounding and flag more, with the likely cause", () => {
    expect(byId(tieOuts({ ...base, ledger: { ...books, revenue: 12000100 } }))["T-1"].status).toBe("clean");
    const off = byId(tieOuts({ ...base, ledger: { ...books, revenue: 11320000, suggested: 2 } }))["T-1"];
    expect(off).toMatchObject({ status: "open", difference: 680000 });
    expect(off.note).toMatch(/2 entries are still suggested/);
  });

  it("count a written explanation, and only block the returns a tie-out feeds", () => {
    const ties = tieOuts({ ...base, ledger: { ...books, revenue: 0 }, explanations: { "T-3": "Bacolod Feeds' 2307 requested." } });
    expect(byId(ties)["T-3"].status).toBe("explained");
    expect(blockingTies(ties, "2550Q").map((t) => t.id)).toEqual(["T-1"]);
    expect(blockingTies(ties, "1701Q").map((t) => t.id)).toEqual(["T-1"]);
    expect(blockingTies(ties, "1601-C")).toEqual([]);
  });

  it("do not apply to the books without a chart, or to payroll in a month without it", () => {
    const t = byId(tieOuts({ ...base, ledger: null, payroll: null }));
    expect(t["T-1"]).toMatchObject({ status: "not_applicable", note: "This client has no account titles yet." });
    expect(t["T-3"].status).toBe("open");
    expect(blockingTies(Object.values(t), "1601-C")).toEqual([]);
  });

  it("add the SC/PWD discount back to revenue, as the books do", () => {
    const disc = toRegisterLine(row({ vat_exempt: "2000.00", total: "2000.00", discount: "500.00", net: "2000.00" }));
    const t = byId(tieOuts({ ...base, month: [disc], quarterToDate: [disc], ledger: { ...books, revenue: 250000, outputVat: 0, inputVat: 0, ewtPayable: 0, cashFromSales: 200000 } }));
    expect(t["T-1"].status).toBe("clean");
    expect(t["T-8"].status).toBe("clean");
  });

  it("lists a period's months", () => {
    expect(monthsOf("2027-01-01", "2027-03-31")).toEqual(["2027-01-01", "2027-02-01", "2027-03-01"]);
    expect(monthsOf("2026-12-01", "2027-01-31")).toEqual(["2026-12-01", "2027-01-01"]);
    expect(monthsOf("2027-04-01", "2027-04-30")).toEqual(["2027-04-01"]);
  });
});
