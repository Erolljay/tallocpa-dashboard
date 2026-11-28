import { describe, expect, it } from "vitest";
import { compareLines, quarterStart, twelveMonthsFrom, vatThresholdStatus } from "./pre-review";

const ws = (lines: { key: string; amount: number | null }[]) => ({
  sections: [{ title: "Part II", lines: lines.map((l, i) => ({ ...l, line: String(i + 1), label: l.key })) }],
});

describe("compareLines", () => {
  it("lists lines present on both sides, biggest move first, and flags notable ones", () => {
    const out = compareLines(ws([{ key: "sales", amount: 200_000_00 }, { key: "cwt", amount: 1_500_00 }, { key: "same", amount: 5_00 }, { key: "new", amount: 9_00 }, { key: "blank", amount: null }]), {
      sales: 100_000_00,
      cwt: 1_000_00,
      same: 5_00,
    });
    expect(out.map((l) => l.key)).toEqual(["sales", "cwt"]);
    expect(out[0]).toMatchObject({ change: 100_000_00, change_pct: 100, notable: true });
    // A 50% move of ₱500 is under the ₱1,000 floor.
    expect(out[1]).toMatchObject({ change: 500_00, change_pct: 50, notable: false });
  });

  it("has no percent from a zero base, and caps the list", () => {
    const out = compareLines(ws([{ key: "a", amount: 5_000_00 }, { key: "b", amount: 1_00 }]), { a: 0, b: 0 }, 1);
    expect(out).toEqual([expect.objectContaining({ key: "a", change_pct: null, notable: true })]);
  });
});

describe("vatThresholdStatus", () => {
  it("is past the question for a VAT-registered client", () => {
    expect(vatThresholdStatus(5_000_000_00, true).status).toBe("vat_registered");
  });
  it("is below, near (80%) or over ₱3,000,000", () => {
    expect(vatThresholdStatus(1_000_000_00, false)).toMatchObject({ status: "below", share_pct: 33.3 });
    expect(vatThresholdStatus(2_400_000_00, false).status).toBe("near");
    expect(vatThresholdStatus(3_000_000_00, false).status).toBe("near");
    expect(vatThresholdStatus(3_000_000_01, false).status).toBe("over");
  });
});

describe("months", () => {
  it("finds the quarter start and the twelve-month window", () => {
    expect(quarterStart("2027-03-01")).toBe("2027-01-01");
    expect(quarterStart("2027-11-01")).toBe("2027-10-01");
    expect(twelveMonthsFrom("2027-03-01")).toBe("2026-04-01");
    expect(twelveMonthsFrom("2027-12-01")).toBe("2027-01-01");
  });
});
