import { describe, expect, it } from "vitest";
import { filedYears, groupFiledReturns, type FiledReturnRow } from "./filed-returns";

const r = (id: string, form: string, period_label: string, period_end: string): FiledReturnRow => ({ id, client_id: "c", form, period_label, period_end, filing_reference: null });
const rows = [
  r("v1", "2550Q", "Q1 2026", "2026-03-31"),
  r("v2", "2550Q", "Q2 2026", "2026-06-30"),
  r("e1", "0619-E", "January 2026", "2026-01-31"),
  r("i1", "1702Q", "Q1 2026", "2026-03-31"),
  r("x1", "2000", "March 2026", "2026-03-31"),
  r("old", "2550Q", "Q4 2025", "2025-12-31"),
];

describe("filed returns in the portal", () => {
  it("lists the years with filed returns, newest first", () => {
    expect(filedYears(rows)).toEqual([2026, 2025]);
  });

  it("groups a year's returns by tax type, newest period first", () => {
    const g = groupFiledReturns(rows, [], [], 2026);
    expect(g.map((x) => x.taxType)).toEqual(["Income tax", "Value-added tax", "Withholding tax – expanded", "Other"]);
    expect(g[1].returns.map((x) => x.id)).toEqual(["v2", "v1"]);
    expect(groupFiledReturns(rows, [], [], 2025)).toEqual([{ taxType: "Value-added tax", returns: [expect.objectContaining({ id: "old" })] }]);
  });

  it("links one scanned copy and the validation report; a copy from before filing files only when none", () => {
    const g = groupFiledReturns(
      rows,
      [
        { id: "f1", filing_instance_id: "v1", kind: "filed_copy" },
        { id: "f2", filing_instance_id: "v1", kind: "validation_report" },
      ],
      [
        { id: "d1", filing_instance_id: "v1", doc_type: "filed_return" },
        { id: "d2", filing_instance_id: "e1", doc_type: "filed_return" },
        { id: "d3", filing_instance_id: "i1", doc_type: "proof_of_payment" },
      ],
      2026,
    );
    const by = new Map(g.flatMap((x) => x.returns).map((x) => [x.id, x]));
    expect(by.get("v1")).toMatchObject({ copyHref: "/filing-files/f1", validationHref: "/filing-files/f2" });
    expect(by.get("e1")).toMatchObject({ copyHref: "/files/d2", validationHref: null });
    expect(by.get("i1")).toMatchObject({ copyHref: null, validationHref: null });
  });
});
