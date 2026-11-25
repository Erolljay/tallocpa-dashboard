import { describe, expect, it } from "vitest";
import { coverageGaps, type CoverageClient } from "./coverage";

const client = (over: Partial<CoverageClient>): CoverageClient => ({
  id: "c1", name: "Arevalo Dental Clinic", taxpayerType: "individual", taxTypes: [], openForms: [],
  hasPreparer: true, hasReviewer: true, recentPayroll: false, recentEwt: false, ...over,
});

describe("coverage gaps", () => {
  it("finds nothing when every COR tax type has its obligations and the team is assigned", () => {
    expect(coverageGaps([client({ taxTypes: ["income_tax", "vat"], openForms: ["1701Q", "1701", "2550Q"] })])).toEqual([]);
  });

  it("flags each form a COR tax type needs but has no obligation for", () => {
    const g = coverageGaps([client({ taxTypes: ["wt_expanded"], openForms: ["0619-E"] })]);
    expect(g.map((x) => x.text)).toEqual([
      "The COR lists Withholding Tax – Expanded, but there is no 1601-EQ obligation.",
      "The COR lists Withholding Tax – Expanded, but there is no 1604-E obligation.",
    ]);
  });

  it("flags payroll without a 1601-C and EWT without a 0619-E or 1601-EQ", () => {
    const g = coverageGaps([client({ name: "Oton Rice Mill", recentPayroll: true, recentEwt: true })]);
    expect(g.map((x) => x.kind)).toEqual(["payroll_without_1601c", "ewt_without_obligation"]);
  });

  it("does not repeat the payroll gap when the COR gap already names the 1601-C", () => {
    const g = coverageGaps([client({ taxTypes: ["wt_compensation"], recentPayroll: true })]);
    expect(g.map((x) => x.kind)).toEqual(["missing_obligation", "missing_obligation"]);
    expect(g[0].text).toMatch(/no 1601-C obligation/);
  });

  it("flags a client with no preparer or no reviewer", () => {
    expect(coverageGaps([client({ hasPreparer: false, hasReviewer: false })]).map((x) => x.kind)).toEqual(["no_preparer", "no_reviewer"]);
  });

  it("does not stop at a COR with both VAT and percentage tax", () => {
    expect(coverageGaps([client({ taxTypes: ["vat", "percentage_tax"], hasReviewer: false })]).map((x) => x.kind)).toEqual(["no_reviewer"]);
  });

  it("flags a client with no account titles (decision 2)", () => {
    expect(coverageGaps([client({ hasChart: false })]).map((x) => x.kind)).toEqual(["no_chart"]);
    expect(coverageGaps([client({ hasChart: true })])).toEqual([]);
  });
});
