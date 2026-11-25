import { describe, expect, it } from "vitest";
import { riskOf, stepsFor } from "@/lib/deadlines/safeguards";
import type { FilingStatus } from "./sign-off";
import { causeTag, fiveSteps, groupByDue, stepsDone, waitingOn, waitingOnText } from "./board";

const none = new Set<string>();

describe("groupByDue", () => {
  const row = (id: string, dueDate: string, status: FilingStatus = "not_started") => ({ id, dueDate, status });
  it("splits overdue, this week (7 days from today) and later, keeping the order", () => {
    const g = groupByDue([row("a", "2026-11-20"), row("b", "2026-11-25"), row("c", "2026-12-01"), row("d", "2026-12-02"), row("e", "2026-11-24")], "2026-11-25");
    expect(g.overdue.map((r) => r.id)).toEqual(["a", "e"]);
    expect(g.this_week.map((r) => r.id)).toEqual(["b", "c"]);
    expect(g.later.map((r) => r.id)).toEqual(["d"]);
  });

  it("does not call a filed return overdue", () => {
    const g = groupByDue([row("a", "2026-11-20", "filed"), row("b", "2026-11-20", "paid")], "2026-11-25");
    expect(g.overdue).toEqual([]);
    expect(g.this_week.map((r) => r.id)).toEqual(["a", "b"]);
  });
});

describe("fiveSteps", () => {
  it("marks steps done up to the status and the next as current", () => {
    expect(fiveSteps("reviewed", 1200).map((s) => s.state)).toEqual(["done", "done", "current", "todo", "todo"]);
    expect(fiveSteps("not_started", null).map((s) => s.state)).toEqual(["current", "todo", "todo", "todo", "todo"]);
  });

  it("needs the payment before Filed & paid, unless nothing is payable", () => {
    expect(fiveSteps("filed", 500).map((s) => s.state)).toEqual(["done", "done", "done", "done", "current"]);
    expect(fiveSteps("paid", 500).every((s) => s.state === "done")).toBe(true);
    expect(stepsDone("filed", 0)).toBe(5);
  });

  it("skips the client's approval on a nil return", () => {
    expect(fiveSteps("prepared", 0).map((s) => s.state)).toEqual(["done", "current", "todo", "todo", "todo"]);
    expect(fiveSteps("reviewed", 0).map((s) => s.state)).toEqual(["done", "done", "skipped", "current", "todo"]);
    expect(fiveSteps("owner_approved", 0).map((s) => s.state)).toEqual(["done", "done", "skipped", "done", "current"]);
    expect(stepsDone("reviewed", 0)).toBe(3);
  });
});

describe("waiting on and cause tags", () => {
  const steps = stepsFor({ dueDate: "2027-04-12", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });
  const people = { preparer: { name: "Ana" }, reviewer: { name: "Ben" } };

  it("names the person on the next step", () => {
    const risk = riskOf({ steps, status: "prepared", documentsIn: true, today: "2027-04-06", holidays: none });
    expect(waitingOnText(waitingOn({ status: "prepared", taxDue: 100, risk, ...people }))).toBe("Ben");
    const notStarted = riskOf({ steps, status: "not_started", documentsIn: false, today: "2027-04-01", holidays: none });
    expect(waitingOnText(waitingOn({ status: "not_started", taxDue: null, risk: notStarted, ...people }))).toBe("The client");
  });

  it("sends a nil return waiting for client approval to the Owner", () => {
    const risk = riskOf({ steps, status: "reviewed", documentsIn: true, today: "2027-04-07", holidays: none });
    expect(waitingOn({ status: "reviewed", taxDue: 0, risk, ...people })).toEqual({ who: "owner", name: null });
    expect(waitingOn({ status: "reviewed", taxDue: 10, risk, ...people })?.who).toBe("client");
  });

  it("tags client-caused when the client's step slipped first, staff-caused otherwise", () => {
    const client = riskOf({ steps, status: "not_started", documentsIn: false, today: "2027-04-07", holidays: none });
    expect(causeTag(client)).toEqual({ label: "Client-caused", cause: "client", step: "Documents in" });
    const staff = riskOf({ steps, status: "not_started", documentsIn: true, today: "2027-04-08", holidays: none });
    expect(causeTag(staff)).toEqual({ label: "Staff-caused", cause: "staff", step: "Prepared" });
    const fine = riskOf({ steps, status: "prepared", documentsIn: true, today: "2027-04-06", holidays: none });
    expect(causeTag(fine)).toBeNull();
  });
});
