import { describe, expect, it } from "vitest";
import {
  generateFilingInstances,
  nextWorkingDay,
  periodsBetween,
  selectRule,
  statutoryDueDate,
  type DeadlineRule,
  type Obligation,
} from "./engine";
import { seedDeadlineRules } from "./seed";

const none = new Set<string>();

function ob(form: string, frequency: Obligation["frequency"], extra: Partial<Obligation> = {}): Obligation {
  return { clientId: "c1", form, frequency, startDate: "2020-01-01", channel: "ebirforms", fiscalYearEndMonth: 12, ...extra };
}

function dueDates(obligation: Obligation, from: string, to: string, holidays = none, rules = seedDeadlineRules) {
  return generateFilingInstances([obligation], rules, holidays, from, to).instances.map((i) => [i.period.label, i.dueDate]);
}

describe("nextWorkingDay", () => {
  it("keeps a weekday that is not a holiday", () => {
    expect(nextWorkingDay("2027-02-10", none)).toBe("2027-02-10");
  });
  it("moves Saturday to Monday", () => {
    expect(nextWorkingDay("2027-04-10", none)).toBe("2027-04-12");
  });
  it("skips a holiday that follows a weekend", () => {
    expect(nextWorkingDay("2027-04-10", new Set(["2027-04-12"]))).toBe("2027-04-13");
  });
});

describe("statutoryDueDate", () => {
  it("uses a day of a later month", () => {
    expect(statutoryDueDate({ kind: "day_of_month_after", monthsAfter: 1, day: 10 }, "2027-01-31")).toBe("2027-02-10");
  });
  it("uses the last day of the month", () => {
    expect(statutoryDueDate({ kind: "day_of_month_after", monthsAfter: 1, day: "last" }, "2027-03-31")).toBe("2027-04-30");
  });
  it("clamps a day that the month does not have", () => {
    expect(statutoryDueDate({ kind: "day_of_month_after", monthsAfter: 1, day: 30 }, "2027-01-31")).toBe("2027-02-28");
  });
  it("counts days after the period end, across months", () => {
    expect(statutoryDueDate({ kind: "days_after", days: 60 }, "2027-03-31")).toBe("2027-05-30");
  });
  it("crosses into the next year", () => {
    expect(statutoryDueDate({ kind: "day_of_month_after", monthsAfter: 4, day: 15 }, "2026-12-31")).toBe("2027-04-15");
  });
});

describe("periodsBetween", () => {
  it("splits calendar months", () => {
    expect(periodsBetween("monthly", 12, "2027-01-01", "2027-03-31").map((p) => [p.label, p.start, p.end])).toEqual([
      ["2027-01", "2027-01-01", "2027-01-31"],
      ["2027-02", "2027-02-01", "2027-02-28"],
      ["2027-03", "2027-03-01", "2027-03-31"],
    ]);
  });
  it("aligns quarters to a June fiscal year end", () => {
    expect(periodsBetween("quarterly", 6, "2026-07-01", "2027-06-30").map((p) => [p.label, p.start, p.end])).toEqual([
      ["FY2027-Q1", "2026-07-01", "2026-09-30"],
      ["FY2027-Q2", "2026-10-01", "2026-12-31"],
      ["FY2027-Q3", "2027-01-01", "2027-03-31"],
      ["FY2027-Q4", "2027-04-01", "2027-06-30"],
    ]);
  });
  it("returns a fiscal year", () => {
    expect(periodsBetween("annual", 6, "2027-01-01", "2027-01-31").map((p) => [p.label, p.start, p.end])).toEqual([
      ["FY2027", "2026-07-01", "2027-06-30"],
    ]);
  });
  it("rejects a bad fiscal year end month", () => {
    expect(() => periodsBetween("annual", 13, "2027-01-01", "2027-12-31")).toThrow();
  });
});

describe("seed rules", () => {
  it("0619-E is due on the 10th and skips quarter-end months", () => {
    expect(dueDates(ob("0619-E", "monthly"), "2027-02-01", "2027-05-31")).toEqual([
      ["2027-01", "2027-02-10"],
      ["2027-02", "2027-03-10"],
      ["2027-04", "2027-05-10"],
    ]);
  });
  it("1601-C due on a Saturday moves to Monday", () => {
    expect(dueDates(ob("1601-C", "monthly"), "2027-04-01", "2027-04-30")).toEqual([["2027-03", "2027-04-12"]]);
  });
  it("eFPS filers follow the same manual due date as everyone else", () => {
    expect(dueDates(ob("1601-C", "monthly", { channel: "efps", efpsGroup: "A" }), "2027-02-01", "2027-02-28")).toEqual([["2027-01", "2027-02-10"]]);
    expect(dueDates(ob("0619-E", "monthly", { channel: "efps", efpsGroup: "E" }), "2027-02-01", "2027-02-28")).toEqual([["2027-01", "2027-02-10"]]);
  });
  it("1701Q is filed for Q1–Q3 only, moving 15 May 2027 (Saturday) to Monday", () => {
    expect(dueDates(ob("1701Q", "quarterly"), "2027-01-01", "2028-03-31")).toEqual([
      ["FY2027-Q1", "2027-05-17"],
      ["FY2027-Q2", "2027-08-16"],
      ["FY2027-Q3", "2027-11-15"],
    ]);
  });
  it("1702Q is due 60 days after the quarter", () => {
    expect(dueDates(ob("1702Q", "quarterly"), "2027-05-01", "2027-05-31")).toEqual([["FY2027-Q1", "2027-05-31"]]);
  });
  it("annual ITR follows the fiscal year end", () => {
    expect(dueDates(ob("1702-RT", "annual"), "2027-04-01", "2027-04-30")).toEqual([["FY2026", "2027-04-15"]]);
    expect(dueDates(ob("1702-RT", "annual", { fiscalYearEndMonth: 6 }), "2027-10-01", "2027-10-31")).toEqual([["FY2027", "2027-10-15"]]);
  });
  it("1604-C due 31 January 2027 (Sunday) moves to Monday", () => {
    expect(dueDates(ob("1604-C", "annual"), "2027-01-01", "2027-02-28")).toEqual([["FY2026", "2027-02-01"]]);
  });
  it("a holiday on the due date moves it", () => {
    expect(dueDates(ob("0619-E", "monthly"), "2027-02-01", "2027-02-28", new Set(["2027-02-10"]))).toEqual([["2027-01", "2027-02-11"]]);
  });
});

describe("withholding returns follow the calendar year", () => {
  // April year-end: taxable quarters end Jul, Oct, Jan, Apr — none line up with calendar quarters.
  const april = { fiscalYearEndMonth: 4 };
  it("1601-EQ uses calendar quarters for a fiscal-year client", () => {
    expect(dueDates(ob("1601-EQ", "quarterly", april), "2026-10-01", "2027-02-28")).toEqual([
      ["FY2026-Q3", "2026-11-02"], // 31 Oct is a Saturday
      ["FY2026-Q4", "2027-02-01"], // 31 Jan is a Sunday
    ]);
  });
  it("0619-E skips calendar quarter-end months for a fiscal-year client", () => {
    expect(dueDates(ob("0619-E", "monthly", april), "2026-10-01", "2027-01-31").map(([p]) => p)).toEqual(["2026-10", "2026-11"]);
  });
  it("1604-E covers the calendar year for a fiscal-year client", () => {
    expect(dueDates(ob("1604-E", "annual", { fiscalYearEndMonth: 6 }), "2027-01-01", "2027-03-31")).toEqual([["FY2026", "2027-03-01"]]);
  });
  it("income tax returns still follow the taxable year", () => {
    expect(dueDates(ob("1702Q", "quarterly", april), "2026-09-01", "2026-09-30")).toEqual([["FY2027-Q1", "2026-09-29"]]);
  });
});

describe("rules over time", () => {
  const changed: DeadlineRule[] = [
    { id: "old", form: "X", frequency: "monthly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 10 }, effectiveFrom: "2020-01-01", effectiveTo: "2026-12-31" },
    { id: "new", form: "X", frequency: "monthly", periodFilter: "all", due: { kind: "day_of_month_after", monthsAfter: 1, day: 20 }, effectiveFrom: "2027-01-01" },
  ];
  it("uses the rule in force for each period", () => {
    const r = generateFilingInstances([ob("X", "monthly")], changed, none, "2027-01-01", "2027-02-28").instances;
    expect(r.map((i) => [i.period.label, i.ruleId, i.dueDate])).toEqual([
      ["2026-12", "old", "2027-01-11"],
      ["2027-01", "new", "2027-02-22"],
    ]);
  });
  it("throws when two equally specific rules overlap", () => {
    const clash = [changed[1], { ...changed[1], id: "dup" }];
    const period = periodsBetween("monthly", 12, "2027-01-01", "2027-01-31")[0];
    expect(() => selectRule(clash, "X", "monthly", period, "ebirforms")).toThrow(/Conflicting/);
  });
});

describe("obligation dates", () => {
  it("starts with the period the client registered in", () => {
    expect(dueDates(ob("1601-C", "monthly", { startDate: "2027-02-15" }), "2027-01-01", "2027-03-31")).toEqual([["2027-02", "2027-03-10"]]);
  });
  it("stops after the obligation ends", () => {
    expect(dueDates(ob("1601-C", "monthly", { endDate: "2027-01-31" }), "2027-01-01", "2027-03-31")).toEqual([
      ["2026-12", "2027-01-11"],
      ["2027-01", "2027-02-10"],
    ]);
  });
  it("reports a period with no rule instead of skipping it", () => {
    const r = generateFilingInstances([ob("NO-RULE", "monthly")], seedDeadlineRules, none, "2027-01-01", "2027-01-31");
    expect(r.instances).toEqual([]);
    expect(r.missingRules.map((m) => m.period.label)).toEqual(["2027-01"]);
  });
});
