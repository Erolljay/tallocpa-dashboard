import { describe, expect, it } from "vitest";
import { refsToSign, reviewGaps } from "./review";

const quiet = { payroll: false, certificatesReceived: false, ewtOnPurchases: false, fixedAssets: false };

describe("workpaper sign-off (decision 8)", () => {
  it("always asks for 10, 20 and 0-2, and the others when they have activity", () => {
    expect(refsToSign(quiet)).toEqual(["0-2", "10", "20"]);
    expect(refsToSign({ payroll: true, certificatesReceived: true, ewtOnPurchases: true, fixedAssets: true })).toEqual(["0-2", "10", "20", "30", "B-2", "BB-2", "E"]);
  });

  it("holds a return until the workpapers it draws on are reviewer-signed with no open note", () => {
    const signed = (ref: "10" | "20" | "0-2") => ({ ref, preparedAt: "x", reviewedAt: "y" });
    expect(reviewGaps("2550Q", quiet, [signed("10"), { ref: "20", preparedAt: "x", reviewedAt: null }], ["0-2"])).toEqual([
      "20 is not reviewer-signed",
      "0-2 has open review notes",
    ]);
    expect(reviewGaps("2550Q", quiet, [signed("10"), signed("20"), signed("0-2")], [])).toEqual([]);
    // Payroll only counts in a month with payroll; a form without workpapers is never held.
    expect(reviewGaps("1601-C", quiet, [], [])).toEqual([]);
    expect(reviewGaps("1601-C", { ...quiet, payroll: true }, [], [])).toEqual(["30 is not reviewer-signed"]);
    expect(reviewGaps("1604-C", quiet, [], [])).toEqual([]);
  });
});
