import { describe, expect, it } from "vitest";
import { approvalMemo, type MemoMonth } from "./memo";
import type { TieOut } from "./tieouts";

const tie = (id: TieOut["id"], status: TieOut["status"], explanation: string | null = null): TieOut => ({
  id, what: id, left: { label: "", amount: 0 }, right: { label: "", amount: 0 }, difference: status === "clean" ? 0 : 680000, status, note: null, explanation, refs: [],
});
const month = (over: Partial<MemoMonth> = {}): MemoMonth => ({ month: "2027-03-01", ties: [], adjustments: [], notes: [], signoffs: [], sales: 0, ...over });

describe("approval memo", () => {
  it("compares tax due with the previous period and gives the rate on sales", () => {
    const m = approvalMemo({
      form: "2550Q", taxDue: 3_000_000, previous: { periodLabel: "Q4 2026", taxDue: 2_000_000 },
      months: [month({ month: "2027-01-01", sales: 50_000_000 }), month({ month: "2027-02-01", sales: 25_000_000 }), month({ sales: 25_000_000 })],
      preparedBy: "Rhea", reviewedBy: "Marco",
    });
    expect(m).toMatchObject({ change: 1_000_000, changePct: 50, sales: 100_000_000, rateOnSales: 3 });
    expect(m.attention).toEqual(["Tax due rose 50% from Q4 2026."]);
  });

  it("lists the tie-outs the return needs, the adjustments, the notes and the sign-offs, and what needs a look", () => {
    const m = approvalMemo({
      form: "2550Q", taxDue: 100, previous: null,
      months: [month({
        ties: [tie("T-1", "explained", "JE 03-118: cash sale without invoice"), tie("T-2", "clean"), tie("T-4", "open"), tie("T-9", "not_applicable")],
        adjustments: [{ label: "Disallow input VAT", amount: 120_000, ticked: false, reversed: false }, { label: "Old", amount: 1, ticked: false, reversed: true }],
        notes: [{ cleared: true }, { cleared: false }],
        signoffs: [{ ref: "10", preparedAt: "x", reviewedAt: "y" }],
      })],
      preparedBy: "Rhea", reviewedBy: "Rhea",
    });
    expect(m.ties.map((t) => [t.id, t.status])).toEqual([["T-1", "explained"], ["T-2", "clean"]]);
    expect(m.adjustments).toHaveLength(1);
    expect(m.notes).toEqual({ raised: 2, cleared: 1, open: 1 });
    expect(m.workpapers.map((w) => [w.ref, w.reviewed])).toEqual([["10", true], ["20", false], ["0-2", false]]);
    expect(m.attention).toEqual([
      "1 tie-out difference is explained rather than clean.",
      "1 adjustment is not ticked by the reviewer.",
      "1 review note is still open.",
      "The same person prepared and reviewed it.",
    ]);
  });
});
