/**
 * BIR Form 1604-C — Annual Information Return of Income Taxes Withheld on
 * Compensation, with the alphalist of employees (Schedule 1: other than MWEs;
 * Schedule 2: MWEs) as DAT and Excel-compatible CSV. Ported from taxify.ph
 * reports/alphalist-report.js; see src/lib/payroll/alphalist.ts for the layout.
 * Part II (summary of remittances per month) is built from the payroll; the
 * remittance dates, banks and TRA/eROR numbers come from the filed 1601-Cs and
 * are not on the worksheet. Part I item numbers should be checked against the
 * current (January 2018 ENCS) form.
 */
import { formatAmount } from "../../money";
import type { FormModule, WorksheetContext, WorksheetResult, WorksheetSchedule } from "../../types";
import { alphaCols, alphalistCsv, alphalistDat, buildAlphalist, tinDashed, type Alphalist, type AlphalistRow } from "@/lib/payroll/alphalist";
import { buildYear, displayName } from "@/lib/payroll/year";
import { agentLines, agentProblems, emptyResult, PAYROLL_NOT_LOADED } from "./common";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function alphalistOf(ctx: WorksheetContext): { year: number; list: Alphalist } | null {
  if (!ctx.payroll) return null;
  const year = Number(ctx.filing.periodEnd.slice(0, 4));
  return { year, list: buildAlphalist(buildYear({ ...ctx.payroll, year, throughMonth: 12 }), year) };
}

function scheduleTable(title: string, rows: AlphalistRow[], mwe: boolean): WorksheetSchedule {
  return {
    title,
    columns: [
      { key: "seq", label: "Seq" },
      { key: "name", label: "Employee" },
      { key: "tin", label: "TIN" },
      ...(mwe
        ? [
            { key: "basic", label: "Basic / SMW", numeric: true },
            { key: "mwe_other", label: "Holiday, OT, night diff., hazard", numeric: true },
          ]
        : []),
      { key: "c7a", label: "Gross comp. (7a)", numeric: true },
      { key: "c7b", label: "13th month & other benefits (7b)", numeric: true },
      { key: "c7c", label: "De minimis (7c)", numeric: true },
      { key: "c7d", label: "SSS/PHIC/HDMF (7d)", numeric: true },
      { key: "c7e", label: "Salaries & other non-taxable (7e)", numeric: true },
      { key: "c7f", label: "Total non-taxable (7f)", numeric: true },
      { key: "c7j", label: "Total taxable (7j)", numeric: true },
      { key: "c14", label: "Tax due (14)", numeric: true },
      { key: "c15b", label: "Tax withheld (15b)", numeric: true },
      { key: "c17a", label: "Amount withheld & paid in December (17a)", numeric: true },
      { key: "c17b", label: "Over-withheld refunded (17b)", numeric: true },
      { key: "sf", label: "Substituted filing" },
    ],
    rows: rows.map((r, i) => {
      const c = alphaCols(r);
      return {
        seq: String(i + 1),
        name: displayName(r.employee),
        tin: r.employee.tin ? tinDashed(r.employee.tin) : "—",
        basic: r.basic,
        mwe_other: r.overtime + r.holidayPay + r.nightDifferential + r.hazardPay,
        c7a: c.c7a, c7b: c.c7b, c7c: c.c7c, c7d: c.c7d, c7e: c.c7e, c7f: c.c7f, c7j: c.c7j,
        c14: c.c14, c15b: c.c15b, c17a: c.c17a, c17b: c.c17b,
        sf: r.employee.substitutedFiling ? "Yes" : "No",
      };
    }),
  };
}

export const form1604C: FormModule = {
  forms: ["1604-C"],
  title: "1604-C · Annual Information Return of Income Taxes Withheld on Compensation",
  manualInputs: () => [],

  compute(ctx: WorksheetContext): WorksheetResult {
    const a = alphalistOf(ctx);
    if (!a || !ctx.payroll) return emptyResult([PAYROLL_NOT_LOADED]);
    const { year, list } = a;
    const errors = agentProblems(ctx);
    const warnings: string[] = [];
    const years = buildYear({ ...ctx.payroll, year, throughMonth: 12 });

    // Part II: per month, from the payroll.
    const monthly = MONTHS.map((name, m) => {
      let withheld = 0;
      let adjustment = 0;
      for (const y of years) {
        withheld += y.lines[m].l25;
        adjustment += y.lines[m].l26;
      }
      return { name, withheld, adjustment, total: withheld + adjustment };
    });
    const totWithheld = monthly.reduce((s, x) => s + x.withheld, 0);
    const totAdj = monthly.reduce((s, x) => s + x.adjustment, 0);

    const all = [...list.schedule1, ...list.schedule2];
    const sum = (k: "c7a" | "c7f" | "c7j" | "c12j" | "c13" | "c14" | "c15a" | "c15b" | "c17a" | "c17b") => all.reduce((s, r) => s + alphaCols(r)[k], 0);
    if (all.length === 0) warnings.push(`No payroll entered for ${year}. Enter it on the client's Payroll page.`);
    for (const r of all) {
      const name = displayName(r.employee);
      if (!r.employee.tin) errors.push(`${name} has no TIN: the alphalist needs every employee's TIN.`);
      if (r.employee.needsDetails) errors.push(`${name} was added from an uploaded register: complete their details on the Payroll page before the alphalist is filed.`);
      if (r.under > 100) warnings.push(`${name}: tax due ${formatAmount(r.taxDue)} is ${formatAmount(r.under)} more than withheld — the year-end adjustment was not fully withheld.`);
      if (r.over > 100) warnings.push(`${name}: ${formatAmount(r.over)} over-withheld — refund it to the employee (enter it as a negative adjustment).`);
      if (r.employee.substitutedFiling && (r.under > 100 || r.over > 100)) warnings.push(`${name} is marked for substituted filing, but tax due does not equal tax withheld.`);
      if (r.employee.substitutedFiling && (r.priorTaxable || r.priorNonTaxable || r.priorWithheld)) warnings.push(`${name} had a previous employer this year, so is not qualified for substituted filing (only employees with one employer for the calendar year qualify, RR 2-98 as amended): untick it on their record.`);
    }

    return {
      sections: [
        { title: "Part I – Background Information", lines: [{ key: "year", line: "1", label: "For the Year", amount: null, basis: String(year) }, ...agentLines(ctx, ["4", "5", "6", "7"])] },
        {
          title: "Part II – Summary of Remittances per BIR Form 1601-C",
          lines: [
            { key: "taxes_withheld", line: "Part II", label: "Total taxes withheld (January to December)", amount: totWithheld, basis: "Tax withheld on the monthly payroll" },
            { key: "adjustments", line: "Part II", label: "Total adjustments", amount: totAdj },
            { key: "total_remitted", line: "Part II", label: "Total amount remitted", amount: totWithheld + totAdj, emphasis: "total" },
          ],
        },
        {
          title: "Alphalist totals",
          lines: [
            { key: "employees_schedule1", line: "Sched. 1", label: "Employees other than MWEs", amount: null, basis: String(list.schedule1.length) },
            { key: "employees_schedule2", line: "Sched. 2", label: "Minimum wage earners", amount: null, basis: String(list.schedule2.length) },
            { key: "gross_compensation", line: "7a", label: "Gross compensation", amount: sum("c7a") },
            { key: "non_taxable", line: "7f", label: "Total non-taxable/exempt compensation", amount: sum("c7f") },
            { key: "taxable", line: "7j", label: "Total taxable compensation", amount: sum("c7j"), emphasis: "subtotal" },
            ...(sum("c12j") || sum("c15a")
              ? [
                  { key: "prior_taxable", line: "12j", label: "Taxable compensation from previous employers", amount: sum("c12j") },
                  { key: "total_taxable", line: "13", label: "Total taxable compensation (present and previous)", amount: sum("c13") },
                ]
              : []),
            { key: "tax_due", line: "14", label: "Tax due", amount: sum("c14"), emphasis: "subtotal" },
            ...(sum("c15a") ? [{ key: "tax_withheld_previous", line: "15a", label: "Tax withheld (previous employers)", amount: sum("c15a") }] : []),
            { key: "tax_withheld", line: "15b", label: "Tax withheld (present employer)", amount: sum("c15b"), emphasis: "subtotal" },
            { key: "under_withheld", line: "17a", label: "Tax due not yet withheld", amount: sum("c17a") },
            { key: "over_withheld", line: "17b", label: "Over-withheld (to refund)", amount: sum("c17b") },
          ],
        },
      ],
      schedules: [
        {
          title: "Part II — Remittances per month",
          columns: [
            { key: "month", label: "Month" },
            { key: "withheld", label: "Taxes withheld", numeric: true },
            { key: "adjustment", label: "Adjustment", numeric: true },
            { key: "total", label: "Total amount remitted", numeric: true },
          ],
          rows: monthly.map((x) => ({ month: x.name, withheld: x.withheld, adjustment: x.adjustment, total: x.total })),
        },
        scheduleTable("Schedule 1 — Alphalist of employees other than minimum wage earners", list.schedule1, false),
        scheduleTable("Schedule 2 — Alphalist of minimum wage earners", list.schedule2, true),
      ],
      errors,
      warnings,
      documentIds: [],
    };
  },

  attachments(ctx: WorksheetContext) {
    const a = alphalistOf(ctx);
    if (!a) return [];
    const agent = { tin: ctx.client.tin, name: ctx.client.name };
    return [
      { kind: "alphalist_dat", label: "Alphalist (DAT)", build: () => alphalistDat(a.list, agent, a.year) },
      { kind: "alphalist_schedule1_csv", label: "Schedule 1 (Excel CSV)", build: () => alphalistCsv(a.list, 1, agent, a.year) },
      { kind: "alphalist_schedule2_csv", label: "Schedule 2 (Excel CSV)", build: () => alphalistCsv(a.list, 2, agent, a.year) },
    ];
  },
};
