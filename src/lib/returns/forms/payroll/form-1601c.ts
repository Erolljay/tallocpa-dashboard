/**
 * BIR Form 1601-C — Monthly Remittance Return of Income Taxes Withheld on
 * Compensation. Ported from taxify.ph reports/1601c-report.js (`generate1601C`,
 * `render1601C`): Part I items 6–9, Part II items 14–31 and the per-employee
 * Schedule I, from the client's payroll (src/lib/payroll). Added here: item 26
 * from the entries' adjustments (taxify left it at zero), items 28–29 typed in,
 * penalties 32–35 and item 36, and a warning wherever the tax withheld differs
 * from the suggested amount by more than ₱1 (December: the year-end adjustment).
 */
import { penaltyLines, PENALTY_INPUTS, readNonNegative } from "../../inputs";
import { formatAmount, toDecimalString } from "../../money";
import { csv } from "../business/util";
import type { AttachmentFile, FormModule, ManualInput, PayslipRow, WorksheetContext, WorksheetResult, WorksheetSchedule } from "../../types";
import { differsFromSuggestion, enteredNet } from "@/lib/payroll/compute";
import { tinDashed } from "@/lib/payroll/alphalist";
import { buildYear, displayName, month1601C } from "@/lib/payroll/year";
import { agentLines, agentProblems, emptyResult, PAYROLL_NOT_LOADED } from "./common";

const INPUTS = {
  previous: { key: "previously_remitted", label: "Tax remitted in return previously filed", kind: "amount", required: false, help: "Only for an amended 1601-C (item 28)." },
  other: { key: "other_remittances", label: "Other remittances made", kind: "amount", required: false, help: "Item 29, e.g. a remittance made through BIR Form 0605." },
} satisfies Record<string, ManualInput>;

const MONTH = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });

export const form1601C: FormModule = {
  forms: ["1601-C"],
  title: "1601-C · Monthly Remittance Return of Income Taxes Withheld on Compensation",
  manualInputs: () => [INPUTS.previous, INPUTS.other, ...PENALTY_INPUTS],

  compute(ctx: WorksheetContext): WorksheetResult {
    const payroll = ctx.payroll;
    if (!payroll) return emptyResult([PAYROLL_NOT_LOADED]);
    const errors = agentProblems(ctx);
    const warnings: string[] = [];
    const year = Number(ctx.filing.periodStart.slice(0, 4));
    const m = Number(ctx.filing.periodStart.slice(5, 7)) - 1;
    const years = buildYear({ ...payroll, year, throughMonth: m + 1 });
    const { rows, totals: t } = month1601C(years, m, year);
    const monthLabel = MONTH.format(new Date(`${ctx.filing.periodStart.slice(0, 10)}T00:00:00Z`));

    if (rows.length === 0) warnings.push(`No payroll entered for ${monthLabel}. Enter it on the client's Payroll page; the return is zero until then.`);
    for (const r of rows) {
      const name = displayName(r.employee);
      if (!r.employee.tin) warnings.push(`${name} has no TIN on file.`);
      if (differsFromSuggestion(r.lines, r.suggestion)) {
        const what = r.suggestion.method === "annualized" ? "the year-end adjustment" : "the monthly table";
        warnings.push(`${name}: tax withheld ${formatAmount(enteredNet(r.lines))} differs from ${formatAmount(r.suggestion.net)} under ${what}.`);
      }
    }

    // The month's payslips in the Books: the supporting schedule (shown and exported, not sent to the BIR).
    const payslips = ctx.payslips ?? [];
    const payslipTax = payslips.reduce((a, p) => a + p.tax, 0);
    if (ctx.payslips && payslipTax !== t.l25 + t.l26)
      warnings.push(`The payslips of ${monthLabel} withhold ${formatAmount(payslipTax)}, but the return computes ${formatAmount(t.l25 + t.l26)} (items 25 and 26). Check the month's payroll.`);

    const previously = readNonNegative(ctx.inputs, INPUTS.previous, errors) ?? 0;
    const other = readNonNegative(ctx.inputs, INPUTS.other, errors) ?? 0;
    const l27 = t.l25 + t.l26;
    const l30 = previously + other;
    const l31 = l27 - l30;
    const penalties = penaltyLines(ctx, errors, ["32", "33", "34", "35"], "(Sum of Items 32 to 34)");
    const basis = `${rows.length} employee(s) paid in ${monthLabel}`;

    return {
      sections: [
        {
          title: "Part I – Background Information",
          lines: [{ key: "month", line: "1", label: "For the Month (MM/YYYY)", amount: null, basis: `${ctx.filing.periodStart.slice(5, 7)}/${year}` }, ...agentLines(ctx, ["6", "7", "8", "9"])],
        },
        {
          title: "Part II – Computation of Tax",
          lines: [
            { key: "total_compensation", line: "14", label: "Total Amount of Compensation", amount: t.l14, basis },
            { key: "statutory_minimum_wage", line: "15", label: "Statutory Minimum Wage for Minimum Wage Earners (MWEs)", amount: t.l15, basis: "MWEs' basic pay, net of their SSS/PhilHealth/Pag-IBIG share" },
            { key: "mwe_other_pay", line: "16", label: "Holiday Pay, Overtime Pay, Night Shift Differential Pay, Hazard Pay (for MWEs only)", amount: t.l16 },
            { key: "thirteenth_month", line: "17", label: "13th Month Pay and Other Benefits", amount: t.l17, basis: "Up to the yearly ceiling per employee; the excess is taxable" },
            { key: "de_minimis", line: "18", label: "De Minimis Benefits", amount: t.l18 },
            { key: "contributions", line: "19", label: "SSS, GSIS, PHIC, HDMF Mandatory Contributions & Union Dues (employee's share only)", amount: t.l19 },
            { key: "other_non_taxable", line: "20", label: "Other Non-Taxable Compensation", amount: t.l20 },
            { key: "total_non_taxable", line: "21", label: "Total Non-Taxable Compensation (Sum of Items 15 to 20)", amount: t.l21, emphasis: "subtotal" },
            { key: "total_taxable", line: "22", label: "Total Taxable Compensation (Item 14 Less Item 21)", amount: t.l22, emphasis: "subtotal" },
            { key: "not_subject", line: "23", label: "Less: Taxable Compensation Not Subject to Withholding Tax (for employees, other than MWEs, receiving P250,000 & below for the year)", amount: t.l23, basis: "Employees other than MWEs with nothing withheld this month (as taxify)" },
            { key: "net_taxable", line: "24", label: "Net Taxable Compensation (Item 22 Less Item 23)", amount: t.l24, emphasis: "subtotal" },
            { key: "taxes_withheld", line: "25", label: "Total Taxes Withheld", amount: t.l25, emphasis: "subtotal" },
            { key: "adjustment", line: "26", label: "Add/(Less): Adjustment of Taxes Withheld from Previous Month/s", amount: t.l26, basis: "Adjustments on the month's payroll entries (corrections and year-end refunds)" },
            { key: "for_remittance", line: "27", label: "Taxes Withheld for Remittance (Sum of Items 25 and 26)", amount: l27, emphasis: "subtotal" },
            { key: "previously_remitted", line: "28", label: "Less: Tax Remitted in Return Previously Filed, if this is an amended return", amount: previously },
            { key: "other_remittances", line: "29", label: "Other Remittances Made (specify)", amount: other },
            { key: "total_remittances", line: "30", label: "Total Tax Remittances Made (Sum of Items 28 and 29)", amount: l30, emphasis: "subtotal" },
            { key: "tax_still_due", line: "31", label: "Tax Still Due/(Over-remittance) (Item 27 Less Item 30)", amount: l31, emphasis: "subtotal" },
            ...penalties.lines,
            { key: "total_amount_due", line: "36", label: "TOTAL AMOUNT STILL DUE/(Over-remittance) (Sum of Items 31 and 35)", amount: l31 + penalties.total, emphasis: "payable" },
          ],
        },
      ],
      schedules: [
        {
          title: `Schedule I — Per-employee computation for ${monthLabel}`,
          columns: [
            { key: "name", label: "Employee" },
            { key: "tin", label: "TIN" },
            { key: "status", label: "Status" },
            { key: "l14", label: "Gross comp. (14)", numeric: true },
            { key: "l15", label: "Stat. min. wage (15)", numeric: true },
            { key: "l16", label: "Holiday/OT/etc. (16)", numeric: true },
            { key: "l21", label: "Non-taxable (21)", numeric: true },
            { key: "l22", label: "Taxable (22)", numeric: true },
            { key: "l23", label: "Excl. (23)", numeric: true },
            { key: "l24", label: "Net taxable (24)", numeric: true },
            { key: "l25", label: "Tax withheld (25)", numeric: true },
            { key: "l26", label: "Adjustment (26)", numeric: true },
            { key: "suggested", label: "Suggested (withheld + adj.)", numeric: true },
          ],
          rows: rows.map((r) => ({
            name: displayName(r.employee),
            tin: r.employee.tin ? tinDashed(r.employee.tin) : "—",
            status: r.employee.isMwe ? "MWE" : "NMWE",
            l14: r.lines.l14, l15: r.lines.l15, l16: r.lines.l16, l21: r.lines.l21, l22: r.lines.l22,
            l23: r.lines.l23, l24: r.lines.l24, l25: r.lines.l25, l26: r.lines.l26,
            suggested: r.suggestion.net,
          })),
        },
        ...(ctx.payslips ? [payslipSchedule(monthLabel, payslips)] : []),
      ],
      errors,
      warnings,
      documentIds: [],
    };
  },

  attachments(ctx: WorksheetContext) {
    if (!ctx.payslips?.length) return [];
    const payslips = ctx.payslips;
    const month = ctx.filing.periodStart.slice(0, 7);
    return [{ kind: "payslips-csv", label: "Employees of the month · payslips (CSV; kept on file, not sent to the BIR)", build: () => payslipCsv(ctx, month, payslips) }];
  },
};

const PAYSLIP_COLUMNS: { key: keyof PayslipRow; label: string; numeric?: boolean }[] = [
  { key: "employeeNo", label: "No." },
  { key: "employeeName", label: "Employee" },
  { key: "payPeriodEnd", label: "Pay period ending" },
  { key: "gross", label: "Gross pay", numeric: true },
  { key: "sss", label: "SSS", numeric: true },
  { key: "philhealth", label: "PhilHealth", numeric: true },
  { key: "pagibig", label: "Pag-IBIG", numeric: true },
  { key: "tax", label: "Tax withheld", numeric: true },
  { key: "otherDeductions", label: "Other deductions", numeric: true },
  { key: "net", label: "Net pay", numeric: true },
];

/** The month's employees and their payslips: the 1601-C's supporting schedule (not sent to the BIR). */
export function payslipSchedule(monthLabel: string, payslips: PayslipRow[]): WorksheetSchedule {
  return {
    title: `Employees of ${monthLabel} — payslips (supporting schedule; not sent to the BIR)`,
    columns: PAYSLIP_COLUMNS.map((c) => ({ key: c.key, label: c.label, ...(c.numeric ? { numeric: true } : {}) })),
    rows: payslips.map((p) => ({ ...p })),
  };
}

/** The same schedule as an Excel-compatible CSV. */
export function payslipCsv(ctx: Pick<WorksheetContext, "client">, month: string, payslips: PayslipRow[]): AttachmentFile {
  const rows: (string | number | null)[][] = [
    [`${ctx.client.name} — employees and payslips for ${month}`],
    ["Supporting schedule of BIR Form 1601-C; not sent to the BIR."],
    [],
    PAYSLIP_COLUMNS.map((c) => c.label),
    ...payslips.map((p) => PAYSLIP_COLUMNS.map((c) => (c.numeric ? toDecimalString(p[c.key] as number) : ((p[c.key] as string | null) ?? "")))),
    ["", "Total", "", ...PAYSLIP_COLUMNS.slice(3).map((c) => toDecimalString(payslips.reduce((a, p) => a + (p[c.key] as number), 0)))],
  ];
  return { fileName: `PAYSLIPS_1601C_${month}.csv`, contentType: "text/csv; charset=utf-8", body: csv(rows) };
}
