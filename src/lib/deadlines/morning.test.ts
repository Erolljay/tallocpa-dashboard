import { describe, expect, it } from "vitest";
import { ownerEmail, staffEmails } from "./morning";
import { riskOf, stepsFor } from "./safeguards";
import type { BoardRow } from "./safeguards-load";

const none = new Set<string>();
const steps = stepsFor({ dueDate: "2027-04-12", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });
const RHEA = { userId: "u-rhea", name: "Rhea S." };
const MARCO = { userId: "u-marco", name: "Marco R." };

function row(id: string, clientName: string, status: BoardRow["status"], documentsIn: boolean, today: string, team: Partial<Pick<BoardRow, "preparer" | "reviewer">> = {}): BoardRow {
  return {
    id, clientId: `c-${id}`, clientName, clientCode: "", form: "1601-C", periodLabel: "March 2027", periodEnd: "2027-03-31", dueDate: "2027-04-12", status, taxDue: null,
    preparer: RHEA, reviewer: MARCO, ...team, steps, risk: riskOf({ steps, status, documentsIn, today, holidays: none }),
  };
}

const today = "2027-04-07";
const board = [
  row("1", "Molo Bakeshop", "not_started", false, today), // critical: documents and preparing both late
  row("2", "Jaro Agri Supply", "prepared", true, today), // on track: review is due today
  row("3", "Lapaz Hardware", "not_started", true, today, { preparer: { userId: "u-joy", name: "Joy L." } }), // at risk: preparing late
];

describe("morning email", () => {
  it("gives the Owner the critical and overdue filings, the count at risk and the coverage gaps", () => {
    const e = ownerEmail(today, board, [{ clientId: "c9", clientName: "Oton Rice Mill", kind: "payroll_without_1601c", text: "Payroll was posted, but there is no 1601-C obligation." }], "https://os", "owner@x");
    expect(e?.subject).toBe("Deadlines: 1 critical or overdue, 1 coverage gap");
    expect(e?.text).toContain("Critical · Molo Bakeshop · 1601-C March 2027 · due Apr 12 · next: Documents in (client, was due Apr 5) · waiting on the client");
    expect(e?.text).toContain("1 more at risk");
    expect(e?.text).toContain("- Oton Rice Mill: Payroll was posted, but there is no 1601-C obligation.");
    expect(e?.text).not.toContain("Jaro Agri Supply");
  });

  it("sends the Owner nothing on a quiet morning", () => {
    expect(ownerEmail(today, [board[1]], [], "https://os", "owner@x")).toBeNull();
  });

  it("gives each preparer and reviewer only their own filings that need attention", () => {
    const emails = staffEmails(today, board, new Map([["u-rhea", "rhea@x"], ["u-marco", "marco@x"], ["u-joy", "joy@x"]]), "https://os");
    const of = (to: string) => emails.find((e) => e.to === to)?.text ?? "";
    expect(emails.map((e) => e.to).sort()).toEqual(["joy@x", "marco@x", "rhea@x"]);
    expect(of("rhea@x")).toContain("Molo Bakeshop");
    expect(of("rhea@x")).not.toContain("Lapaz Hardware");
    expect(of("joy@x")).toContain("Lapaz Hardware");
    expect(of("marco@x")).toContain("Molo Bakeshop");
    expect(of("marco@x")).toContain("Lapaz Hardware");
    expect(emails.some((e) => e.text.includes("Jaro Agri Supply"))).toBe(false);
  });
});
