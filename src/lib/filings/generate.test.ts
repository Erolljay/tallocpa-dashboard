import { describe, expect, it } from "vitest";
import { seedDeadlineRules } from "@/lib/deadlines/seed";
import { buildFilingRows, type ClientRow, type ObligationRow, type RuleRow } from "./generate";

const rules: RuleRow[] = seedDeadlineRules.map((r) => ({
  id: r.id,
  form: r.form,
  frequency: r.frequency,
  period_filter: r.periodFilter,
  due: r.due,
  channel: r.channel ?? null,
  efps_group: r.efpsGroup ?? null,
  effective_from: r.effectiveFrom,
  effective_to: r.effectiveTo ?? null,
  calendar_year: r.calendarYear ?? false,
}));

const client = (over: Partial<ClientRow> = {}): ClientRow => ({
  id: "c1", status: "active", fiscal_year_end_month: 12, filing_channel: "ebirforms", efps_group: null, ...over,
});
const ob = (over: Partial<ObligationRow> = {}): ObligationRow => ({
  id: "o1", client_id: "c1", form: "1601-C", frequency: "monthly", start_date: "2027-01-04", end_date: null, ...over,
});

describe("buildFilingRows", () => {
  it("creates filings from the registration date up to 120 days ahead", () => {
    const { rows } = buildFilingRows({ obligations: [ob()], clients: [client()], rules, holidays: [], today: "2027-02-01" });
    expect(rows.map((r) => [r.period_label, r.due_date])).toEqual([
      ["2027-01", "2027-02-10"], ["2027-02", "2027-03-10"], ["2027-03", "2027-04-12"], ["2027-04", "2027-05-10"],
    ]);
    expect(rows[0]).toMatchObject({ obligation_id: "o1", client_id: "c1", form: "1601-C", rule_id: "1601C-ebir", period_start: "2027-01-01", period_end: "2027-01-31" });
  });

  it("uses the client's eFPS group and fiscal year", () => {
    const { rows } = buildFilingRows({
      obligations: [ob(), ob({ id: "o2", form: "1702-RT", frequency: "annual", start_date: "2020-01-01" })],
      clients: [client({ filing_channel: "efps", efps_group: "A", fiscal_year_end_month: 6 })],
      rules, holidays: [], today: "2027-09-01",
    });
    expect(rows.find((r) => r.form === "1601-C" && r.period_label === "2027-08")?.due_date).toBe("2027-09-15");
    expect(rows.find((r) => r.form === "1702-RT")).toMatchObject({ period_label: "FY2027", due_date: "2027-10-15" });
  });

  it("moves due dates off holidays", () => {
    const { rows } = buildFilingRows({ obligations: [ob()], clients: [client()], rules, holidays: ["2027-02-10"], today: "2027-02-01" });
    expect(rows[0]).toMatchObject({ statutory_due_date: "2027-02-10", due_date: "2027-02-11" });
  });

  it("skips inactive and archived clients", () => {
    for (const status of ["inactive", "archived"]) {
      expect(buildFilingRows({ obligations: [ob()], clients: [client({ status })], rules, holidays: [], today: "2027-02-01" }).rows).toEqual([]);
    }
  });

  it("reports obligations whose form has no rule", () => {
    const { rows, missing } = buildFilingRows({ obligations: [ob({ form: "9999" })], clients: [client()], rules, holidays: [], today: "2027-02-01" });
    expect(rows).toEqual([]);
    expect(missing[0]).toMatchObject({ obligationId: "o1", form: "9999" });
  });
});
