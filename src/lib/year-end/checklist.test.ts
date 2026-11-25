import { describe, expect, it } from "vitest";
import { progress, readyToClose, taxableYearEnds, yearEndChecklist, type YearEndInput } from "./checklist";

const base: YearEndInput = {
  clientId: "c1",
  yearEnd: "2025-12-31",
  today: "2026-01-20",
  hasBooks: true,
  openMonths: [],
  suggestedEntries: 0,
  trialBalanceDifference: 0,
  closedAt: null,
  ticks: {},
  payroll: true,
  released2316: false,
  inventory: false,
  looseLeaf: true,
  filings: [],
  missing2307: { undecided: 0, total: 0 },
};

const states = (input: YearEndInput) => Object.fromEntries(yearEndChecklist(input).flatMap((g) => g.steps).map((s) => [s.key, s.state]));

describe("year-end checklist", () => {
  it("sees the books' steps for itself and waits for the ticks", () => {
    expect(states({ ...base, openMonths: ["December 2025"], suggestedEntries: 2 })).toMatchObject({
      locked: "waiting", suggested: "waiting", adjustments: "waiting", bank_reconciliation: "waiting", trial_balance: "done", closing: "waiting",
      thirteenth_month: "waiting", annualization: "waiting", "2316": "waiting", loose_leaf: "waiting", afs: "waiting", missing_2307: "not_needed",
    });
    expect(states({ ...base, ticks: { bank_reconciliation: { doneAt: "2026-01-05", note: "BDO" } }, closedAt: "2026-01-10T03:00:00Z", released2316: true })).toMatchObject({
      locked: "done", bank_reconciliation: "done", closing: "done", "2316": "done",
    });
  });

  it("is done for a filed return only once its eSubmission is validated", () => {
    const f = { id: "f1", form: "1604-E", periodLabel: "2025", dueDate: "2026-03-01", status: "filed", esubmissionRequired: true, esubmission: "sent" as const };
    expect(states({ ...base, filings: [f] })["filing-f1"]).toBe("waiting");
    expect(states({ ...base, filings: [{ ...f, esubmission: "errors" }] })["filing-f1"]).toBe("blocked");
    expect(states({ ...base, filings: [{ ...f, esubmission: "validated" }] })["filing-f1"]).toBe("done");
    expect(states({ ...base, filings: [{ ...f, form: "1702-RT", esubmissionRequired: false, esubmission: null }] })["filing-f1"]).toBe("done");
  });

  it("orders the annual returns: 1604-C/E, income tax, then the rest", () => {
    const mk = (id: string, form: string) => ({ id, form, periodLabel: "2025", dueDate: "2026-04-15", status: "not_started", esubmissionRequired: false, esubmission: null });
    const returns = yearEndChecklist({ ...base, filings: [mk("a", "1702-RT"), mk("b", "1604-E"), mk("c", "1604-C")] })[2].steps.map((s) => s.label);
    expect(returns.slice(0, 3)).toEqual(["1604-E · 2025", "1604-C · 2025", "1702-RT · 2025"]);
  });

  it("asks the client about missing 2307s and leaves out steps that do not apply", () => {
    expect(states({ ...base, missing2307: { undecided: 1, total: 3 } }).missing_2307).toBe("waiting");
    expect(states({ ...base, missing2307: { undecided: 0, total: 3 } }).missing_2307).toBe("done");
    const s = states({ ...base, hasBooks: false, payroll: false, looseLeaf: false });
    expect(s).toMatchObject({ no_books: "not_needed", no_payroll: "not_needed", no_returns: "not_needed" });
    expect(s.loose_leaf).toBeUndefined();
    expect(progress(yearEndChecklist({ ...base, hasBooks: false, payroll: false, looseLeaf: false }))).toEqual({ done: 0, total: 1 });
  });
});

describe("ready for the Owner's closing entry", () => {
  it("needs the year ended, every month locked, nothing suggested and the trial balance in balance", () => {
    expect(readyToClose(base)).toEqual({ ready: true, why: null });
    expect(readyToClose({ ...base, today: "2025-12-31" }).why).toMatch(/not ended/);
    expect(readyToClose({ ...base, openMonths: ["December 2025"] }).why).toMatch(/Lock every month/);
    expect(readyToClose({ ...base, suggestedEntries: 1 }).why).toMatch(/suggested/);
    expect(readyToClose({ ...base, trialBalanceDifference: 5 }).why).toMatch(/does not balance/);
    expect(readyToClose({ ...base, closedAt: "2026-01-10" })).toEqual({ ready: false, why: null });
  });
});

describe("taxable year ends", () => {
  it("lists from the year in progress back to the books start", () => {
    expect(taxableYearEnds(12, "2025-11-01", "2026-11-25")).toEqual(["2026-12-31", "2025-12-31"]);
    expect(taxableYearEnds(6, "2024-07-01", "2026-11-25")).toEqual(["2027-06-30", "2026-06-30", "2025-06-30"]);
    expect(taxableYearEnds(12, "2026-12-01", "2027-01-05")).toEqual(["2027-12-31", "2026-12-31"]);
  });
});
