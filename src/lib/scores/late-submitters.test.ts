import { describe, expect, it } from "vitest";
import { isAlwaysLate, isLateMonth, LATE_SUBMITTER_RULES, lateSubmitters, type ScorecardRow } from "./late-submitters";

const row = (client_id: string, month: string, o: Partial<ScorecardRow> = {}): ScorecardRow => ({
  client_id,
  month,
  cycles_due: 1,
  cycles_missed: 0,
  documents_late: 0,
  ...o,
});

describe("isLateMonth", () => {
  it("is late on a missed cutoff or any document after it", () => {
    expect(isLateMonth({ cycles_missed: 1, documents_late: 0 })).toBe(true);
    expect(isLateMonth({ cycles_missed: 0, documents_late: 2 })).toBe(true);
    expect(isLateMonth({ cycles_missed: 0, documents_late: 0 })).toBe(false);
  });
});

describe("isAlwaysLate", () => {
  it("needs half the months and at least three late months", () => {
    expect(LATE_SUBMITTER_RULES).toMatchObject({ months: 12, alwaysLateShare: 0.5, alwaysLateMonths: 3 });
    expect(isAlwaysLate(3, 6)).toBe(true);
    expect(isAlwaysLate(3, 7)).toBe(false);
    expect(isAlwaysLate(2, 2)).toBe(false);
    expect(isAlwaysLate(0, 0)).toBe(false);
  });
});

describe("lateSubmitters", () => {
  it("lists only clients late at least once, worst first", () => {
    const rows = [
      row("ok", "2026-09-01"),
      row("ok", "2026-10-01"),
      row("a", "2026-09-01", { cycles_missed: 1 }),
      row("a", "2026-10-01", { documents_late: 1 }),
      row("b", "2026-08-01", { documents_late: 4 }),
      row("b", "2026-09-01", { cycles_missed: 1, documents_late: 1 }),
      row("c", "2026-11-01", { cycles_missed: 1 }),
    ];
    const list = lateSubmitters(rows);
    expect(list.map((l) => l.clientId)).toEqual(["b", "a", "c"]);
    expect(list[0]).toEqual({ clientId: "b", cycleMonths: 2, lateMonths: 2, lateDocuments: 5, latestLate: "2026-09-01", alwaysLate: false });
    expect(list[1].latestLate).toBe("2026-10-01");
  });

  it("marks a client always late at half their months with three or more", () => {
    const months = ["2026-01-01", "2026-02-01", "2026-03-01", "2026-04-01", "2026-05-01", "2026-06-01"];
    const rows = months.map((m, i) => row("x", m, { cycles_missed: i < 3 ? 1 : 0 }));
    const [x] = lateSubmitters(rows);
    expect(x).toMatchObject({ cycleMonths: 6, lateMonths: 3, alwaysLate: true });
    // A seventh on-time month drops it below half.
    expect(lateSubmitters([...rows, row("x", "2026-07-01")])[0].alwaysLate).toBe(false);
  });

  it("counts a month with late documents but no cutoff yet as a cycle month", () => {
    const [x] = lateSubmitters([row("x", "2026-11-01", { cycles_due: 0, documents_late: 2 }), row("x", "2026-10-01", { cycles_due: 0 })]);
    expect(x).toMatchObject({ cycleMonths: 1, lateMonths: 1, lateDocuments: 2 });
  });
});
