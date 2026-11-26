import { describe, expect, it } from "vitest";
import { seedDeadlineRules } from "@/lib/deadlines/seed";
import { buildFilingRows, recomputeDueDates, type ClientRow, type ObligationRow, type OpenFilingRow, type RuleRow } from "./generate";

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
    expect(rows[0]).toMatchObject({ obligation_id: "o1", client_id: "c1", form: "1601-C", rule_id: "1601C", period_start: "2027-01-01", period_end: "2027-01-31" });
  });

  it("gives eFPS clients the manual due date and uses the fiscal year", () => {
    const { rows } = buildFilingRows({
      obligations: [ob(), ob({ id: "o2", form: "1702-RT", frequency: "annual", start_date: "2020-01-01" })],
      clients: [client({ filing_channel: "efps", efps_group: "A", fiscal_year_end_month: 6 })],
      rules, holidays: [], today: "2027-09-01",
    });
    expect(rows.find((r) => r.form === "1601-C" && r.period_label === "2027-08")?.due_date).toBe("2027-09-10");
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

describe("recomputeDueDates", () => {
  const filing = (over: Partial<OpenFilingRow> = {}): OpenFilingRow => ({
    id: "f1", obligation_id: "o1", client_id: "c1", form: "1601-C", period_label: "2026-11", period_start: "2026-11-01", period_end: "2026-11-30",
    rule_id: "1601C", statutory_due_date: "2026-12-10", due_date: "2026-12-10", ...over,
  });
  const efpsC = client({ filing_channel: "efps", efps_group: "C" });

  it("leaves a filing alone when nothing changed", () => {
    expect(recomputeDueDates({ filings: [filing()], obligations: [ob()], clients: [efpsC], rules, holidays: [] })).toEqual([]);
  });
  it("moves the due date when the Owner changes the rule", () => {
    const twelfth = rules.map((r) => (r.id === "1601C" ? { ...r, due: { kind: "day_of_month_after" as const, monthsAfter: 1, day: 12 } } : r));
    expect(recomputeDueDates({ filings: [filing()], obligations: [ob()], clients: [efpsC], rules: twelfth, holidays: [] })).toEqual([
      { id: "f1", rule_id: "1601C", statutory_due_date: "2026-12-12", due_date: "2026-12-14" },
    ]);
  });
  it("moves the due date when a holiday is added", () => {
    expect(recomputeDueDates({ filings: [filing()], obligations: [ob()], clients: [efpsC], rules, holidays: ["2026-12-10"] })).toEqual([
      { id: "f1", rule_id: "1601C", statutory_due_date: "2026-12-10", due_date: "2026-12-11" },
    ]);
  });
  it("moves an open December 1601-C made under the old rule to 15 January", () => {
    const december = filing({ id: "f2", period_label: "2026-12", period_start: "2026-12-01", period_end: "2026-12-31", statutory_due_date: "2027-01-10", due_date: "2027-01-11" });
    expect(recomputeDueDates({ filings: [filing(), december], obligations: [ob()], clients: [client({ fiscal_year_end_month: 6 })], rules, holidays: [] })).toEqual([
      { id: "f2", rule_id: "1601C-DEC", statutory_due_date: "2027-01-15", due_date: "2027-01-15" },
    ]);
  });
});

describe("December 1601-C", () => {
  it("is generated with the December rule, due 15 January", () => {
    const { rows } = buildFilingRows({ obligations: [ob({ start_date: "2026-01-01" })], clients: [client()], rules, holidays: [], today: "2026-12-01" });
    expect(rows.filter((r) => ["2026-11", "2026-12"].includes(r.period_label)).map((r) => [r.period_label, r.rule_id, r.due_date])).toEqual([
      ["2026-11", "1601C", "2026-12-10"],
      ["2026-12", "1601C-DEC", "2027-01-15"],
    ]);
  });
});

describe("local holidays", () => {
  const local = [{ date: "2027-02-10", rdo_codes: ["074"] }];

  it("move a due date only for clients registered in the holiday's RDO", () => {
    const iloilo = buildFilingRows({ obligations: [ob()], clients: [client({ rdo_code: "74" })], rules, holidays: [], localHolidays: local, today: "2027-02-01" });
    const elsewhere = buildFilingRows({ obligations: [ob()], clients: [client({ rdo_code: "075" })], rules, holidays: [], localHolidays: local, today: "2027-02-01" });
    const none = buildFilingRows({ obligations: [ob()], clients: [client()], rules, holidays: [], localHolidays: local, today: "2027-02-01" });
    expect(iloilo.rows[0].due_date).toBe("2027-02-11");
    expect(elsewhere.rows[0].due_date).toBe("2027-02-10");
    expect(none.rows[0].due_date).toBe("2027-02-10");
  });

  it("are applied when due dates are recomputed", () => {
    const filing: OpenFilingRow = {
      id: "f1", obligation_id: "o1", client_id: "c1", form: "1601-C", period_label: "2027-01", period_start: "2027-01-01", period_end: "2027-01-31",
      rule_id: "1601C", statutory_due_date: "2027-02-10", due_date: "2027-02-10",
    };
    const updates = recomputeDueDates({ filings: [filing], obligations: [ob()], clients: [client({ rdo_code: "074" })], rules, holidays: [], localHolidays: local });
    expect(updates).toEqual([{ id: "f1", rule_id: "1601C", statutory_due_date: "2027-02-10", due_date: "2027-02-11" }]);
  });
});
