import { describe, expect, it } from "vitest";
import { documentCutoff, riskOf, stepsFor, workingDaysBefore, workingDaysUntil } from "./safeguards";

const none = new Set<string>();
// 1601-C for March 2027, due Monday 12 April (10 April is a Saturday), client cutoff on the 5th.
const march1601C = () => stepsFor({ dueDate: "2027-04-12", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });

describe("steps", () => {
  it("back-schedules the 1601-C as decided: Apr 5, 6, 7, 8, 9, 9 and 12", () => {
    expect(march1601C().map((s) => [s.key, s.who, s.target])).toEqual([
      ["documents", "client", "2027-04-05"],
      ["prepared", "preparer", "2027-04-06"],
      ["reviewed", "reviewer", "2027-04-07"],
      ["client_approved", "client", "2027-04-08"],
      ["owner_approved", "owner", "2027-04-09"],
      ["filed", "preparer", "2027-04-09"],
      ["proof", "preparer", "2027-04-12"],
    ]);
  });

  it("skips holidays when counting back", () => {
    const steps = stepsFor({ dueDate: "2027-04-12", periodEnd: "2027-03-31", cutoffDay: 5, holidays: new Set(["2027-04-09"]) });
    expect(steps.find((s) => s.key === "filed")?.target).toBe("2027-04-08");
  });

  it("gives a quarterly return room after the cutoff and never puts a step before the one ahead of it", () => {
    const steps = stepsFor({ dueDate: "2027-04-26", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });
    expect(steps.map((s) => s.target)).toEqual(["2027-04-05", "2027-04-20", "2027-04-21", "2027-04-22", "2027-04-23", "2027-04-23", "2027-04-26"]);
    // A quarterly return is prepared by the 15th of the month it is due (decision 24).
    const q = stepsFor({ dueDate: "2027-04-26", periodStart: "2027-01-01", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });
    expect(q.map((s) => s.target)).toEqual(["2027-04-05", "2027-04-15", "2027-04-16", "2027-04-19", "2027-04-20", "2027-04-20", "2027-04-26"]);
    // A 15th on a Sunday moves to the Friday before; an annual return due on the 15th keeps the monthly pattern.
    const sunday = stepsFor({ dueDate: "2027-08-25", periodStart: "2027-04-01", periodEnd: "2027-06-30", cutoffDay: 5, holidays: none });
    expect(sunday[1].target).toBe("2027-08-13");
    const annual = stepsFor({ dueDate: "2027-04-15", periodStart: "2026-01-01", periodEnd: "2026-12-31", cutoffDay: 5, holidays: none });
    expect(annual.slice(1, 6).map((s) => s.target)).toEqual(["2027-04-09", "2027-04-12", "2027-04-13", "2027-04-14", "2027-04-14"]);
    const tight = stepsFor({ dueDate: "2027-04-07", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });
    const targets = tight.map((s) => s.target);
    expect([...targets].sort()).toEqual(targets);
    expect(targets.at(-1)).toBe("2027-04-07");
  });

  it("puts the cutoff in the month after the period, capped at the 28th", () => {
    expect(documentCutoff("2026-12-31", 5)).toBe("2027-01-05");
    expect(documentCutoff("2027-01-31", 31)).toBe("2027-02-28");
  });

  it("counts working days", () => {
    expect(workingDaysBefore("2027-04-12", 1, none)).toBe("2027-04-09");
    expect(workingDaysBefore("2027-04-09", -1, none)).toBe("2027-04-12");
    expect(workingDaysUntil("2027-04-09", "2027-04-12", none)).toBe(1);
    expect(workingDaysUntil("2027-04-12", "2027-04-09", none)).toBe(0);
  });
});

describe("risk", () => {
  const risk = (status: Parameters<typeof riskOf>[0]["status"], documentsIn: boolean, today: string) => riskOf({ steps: march1601C(), status, documentsIn, today, holidays: none });

  it("is on track while every step is ahead of its target", () => {
    expect(risk("not_started", true, "2027-04-06")).toMatchObject({ state: "on_track", done: 1, cause: null });
    expect(risk("not_started", true, "2027-04-06").next?.key).toBe("prepared");
  });

  it("is at risk with one step late, on the person who let it slip", () => {
    expect(risk("not_started", false, "2027-04-06")).toMatchObject({ state: "at_risk", cause: "client" });
    expect(risk("not_started", true, "2027-04-07")).toMatchObject({ state: "at_risk", cause: "staff" });
  });

  it("is critical with two steps late (the documents never came in)", () => {
    const r = risk("not_started", false, "2027-04-07");
    expect(r.state).toBe("critical");
    expect(r.late.map((s) => s.key)).toEqual(["documents", "prepared"]);
    expect(r.cause).toBe("client");
  });

  it("is critical one working day before the BIR date when not filed, even with the approvals in", () => {
    expect(risk("owner_approved", true, "2027-04-09").state).toBe("critical");
  });

  it("is overdue after the BIR date when not filed", () => {
    expect(risk("client_approved", true, "2027-04-13").state).toBe("overdue");
  });

  it("counts a prepared filing's documents as in, and is filed once Filed & paid (with its scanned copy)", () => {
    expect(risk("prepared", false, "2027-04-06").done).toBe(2);
    expect(risk("owner_approved", true, "2027-04-08")).toMatchObject({ next: expect.objectContaining({ key: "filed" }) });
    expect(risk("filed", true, "2027-04-20")).toMatchObject({ state: "filed", done: 7, next: null });
  });
});
