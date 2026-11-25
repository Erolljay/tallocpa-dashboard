import { describe, expect, it } from "vitest";
import type { Asset } from "@/lib/assets/schedule";
import { cutoffOf } from "./cutoff";
import { openingChecklist, type ChecklistInput, type OpeningBalance } from "./opening-checklist";

const bal = (over: Partial<OpeningBalance>): OpeningBalance => ({ type: "asset", fsLine: "cash_and_equivalents", control: null, key: null, normalSide: "debit", net: 0, ...over });
const base = (booksStart: string, fye = 12): ChecklistInput => ({
  cutoff: cutoffOf(booksStart, fye), opening: null, openingAssets: [], payroll: { employees: 0, months: [] }, earlierReturns: [], certificatesBefore: 0,
});
const byKey = (xs: ReturnType<typeof openingChecklist>) => Object.fromEntries(xs.map((x) => [x.key, x]));

describe("opening balance checklist", () => {
  it("at a calendar-year start asks only for the trial balance and the AR/AP detail", () => {
    const k = byKey(openingChecklist(base("2027-01-01")));
    expect(Object.keys(k)).toEqual(["cutoff", "trial_balance", "receivables_payables"]);
    expect(k.cutoff.title).toBe("Cut-off: books from January 1, 2027, opening balances as of December 31, 2026");
    expect(k.trial_balance.status).toBe("todo");
  });

  it("at a fiscal-year start says the income and expenses are already closed", () => {
    expect(byKey(openingChecklist(base("2026-07-01", 6))).cutoff.detail).toMatch(/after closing/);
  });

  it("mid-year (the second quarter) asks for the year to date, payroll, earlier returns and 2307s", () => {
    const i = { ...base("2027-04-01"), payroll: { employees: 3, months: ["2027-01-01"] }, earlierReturns: [{ form: "1701Q", periodLabel: "Q1 2027", filed: false }] };
    const k = byKey(openingChecklist(i));
    expect(k.cutoff.detail).toMatch(/quarter 2 of the taxable year that began January 1, 2027/);
    expect(k.year_to_date).toMatchObject({ status: "todo", title: "Income and expenses from January 1, 2027 to March 31, 2027" });
    expect(k.payroll).toMatchObject({ status: "todo", title: "Payroll from January to March 2027" });
    expect(k.payroll.detail).toMatch(/February, March/);
    expect(k.earlier_returns.detail).toMatch(/1701Q Q1 2027/);
    expect(k.certificates.status).toBe("todo");
  });

  it("flags a cut-off in the middle of a quarter", () => {
    expect(byKey(openingChecklist(base("2027-05-01"))).cutoff.status).toBe("warn");
  });

  it("ties opening assets to the trial balance and names what waits", () => {
    const van: Asset = { id: "a", number: 1, source: "opening", documentId: null, description: "Van", assetAccount: "Transportation", acquiredOn: "2025-01-15", cost: 120000000, inputVat: 0, residual: 100, lifeMonths: 60, taxLifeMonths: 60, status: "active" };
    const acc = 1999998 * 23; // Feb 2025 to Dec 2026
    const opening = [
      bal({ fsLine: "ppe", key: "transportation_equipment", net: 120000000 }),
      bal({ fsLine: "ppe", normalSide: "credit", net: -acc }),
      bal({ control: "cwt_awaiting", net: 120000 }),
      bal({ control: "input_vat", net: 540000 }),
      bal({ control: "inventory", net: 1000000 }),
    ];
    const k = byKey(openingChecklist({ ...base("2027-01-01"), opening, openingAssets: [van] }));
    expect(k.fixed_assets.status).toBe("done");
    expect(k.cwt_awaiting.status).toBe("warn");
    expect(k.input_vat.detail).toMatch(/Item 38/);
    expect(k.inventory.status).toBe("info");
    expect(byKey(openingChecklist({ ...base("2027-01-01"), opening, openingAssets: [] })).fixed_assets.status).toBe("todo");
  });

  it("counts a mid-year opening with income and expenses as carrying the year to date", () => {
    const opening = [bal({ net: 100 }), bal({ type: "revenue", fsLine: "revenue", normalSide: "credit", net: -100 })];
    expect(byKey(openingChecklist({ ...base("2027-04-01"), opening })).year_to_date.status).toBe("done");
  });
});
