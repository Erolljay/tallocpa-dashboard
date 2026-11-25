import { describe, expect, it } from "vitest";
import { riskOf, stepsFor } from "@/lib/deadlines/safeguards";
import { filingItem, nextActions, type WorkItem } from "./next-actions";

const item = (over: Partial<WorkItem>): WorkItem => ({
  clientId: "c1", clientName: "Jaro Agri Supply", period: "2027-03", role: "preparer", label: "Review 4 documents", href: "/x", urgency: "open", due: null, ...over,
});

describe("my work", () => {
  it("shows one next action per client and period, the most urgent first, with the rest behind it", () => {
    const rows = nextActions(
      [
        item({ label: "Review 4 documents" }),
        item({ label: "Prepare 1601-C March 2027", urgency: "critical", due: "2027-04-12" }),
        item({ clientId: "c2", clientName: "Molo Bakeshop", label: "Confirm 3 suggested entries" }),
        item({ clientId: "c2", clientName: "Molo Bakeshop", period: "2027-02", label: "Prepare 2550Q", urgency: "overdue", due: "2027-04-26" }),
      ],
      ["preparer"],
    );
    expect(rows.map((r) => [r.clientName, r.period, r.next.label, r.more.length])).toEqual([
      ["Molo Bakeshop", "2027-02", "Prepare 2550Q", 0],
      ["Jaro Agri Supply", "2027-03", "Prepare 1601-C March 2027", 1],
      ["Molo Bakeshop", "2027-03", "Confirm 3 suggested entries", 0],
    ]);
  });

  it("keeps to the roles of the person signed in", () => {
    const items = [item({ role: "reviewer", label: "Sign the review of 10, 20" }), item({ role: "owner", label: "Approve 2550Q" })];
    expect(nextActions(items, ["preparer"])).toEqual([]);
    expect(nextActions(items, ["reviewer"]).map((r) => r.next.label)).toEqual(["Sign the review of 10, 20"]);
    expect(nextActions(items, ["reviewer", "owner"])[0].more).toHaveLength(1);
  });

  it("turns a return's next step into an action for the right person", () => {
    const none = new Set<string>();
    const steps = stepsFor({ dueDate: "2027-04-12", periodEnd: "2027-03-31", cutoffDay: 5, holidays: none });
    const f = (status: Parameters<typeof riskOf>[0]["status"], today: string) => filingItem({
      id: "f1", clientId: "c1", clientName: "Jaro", form: "1601-C", periodLabel: "March 2027", periodEnd: "2027-03-31",
      risk: riskOf({ steps, status, documentsIn: true, today, holidays: none }),
    });
    expect(f("not_started", "2027-04-01")).toMatchObject({ role: "preparer", label: "Prepare 1601-C March 2027", period: "2027-03", due: "2027-04-06", href: "/app/filings/f1" });
    expect(f("prepared", "2027-04-07")).toMatchObject({ role: "reviewer", label: "Review 1601-C March 2027" });
    expect(f("client_approved", "2027-04-09")).toMatchObject({ role: "owner", label: "Approve 1601-C March 2027" });
    expect(f("proof_uploaded", "2027-04-12")).toBeNull();
  });
});
