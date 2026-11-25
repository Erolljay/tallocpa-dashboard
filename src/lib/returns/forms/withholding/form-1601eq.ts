/**
 * BIR Form 1601-EQ — Quarterly Remittance Return of Creditable Income Taxes
 * Withheld (Expanded), with the QAP attachment. Ported from taxify.ph
 * reports/1601eq-report.js (`render1601EQ`): Part I items 6–9, Part II items
 * 13–18 one per ATC (Schedule of alphalist by ATC), 19–31.
 *
 * The quarter's QAP is the EWT on the Purchase Invoices in the Books (or, for a
 * client without Books, the 2307s it issued). Items 20 and 21 (remittances for
 * months 1 and 2) come from this client's 0619-E returns for those months once
 * filed and paid (item 14 of their worksheets; `ctx.ewtRemittances`, database
 * function ewt_remittances), unless staff type the amount actually remitted.
 * taxify left them at zero.
 */
import { backgroundLines, penaltyLines, PENALTY_INPUTS, readNonNegative } from "../../inputs";
import { formatAmount } from "../../money";
import { priorKey } from "../../source";
import type { FormModule, ManualInput, WorksheetContext, WorksheetLine, WorksheetResult } from "../../types";
import { agentBackground, agentErrors } from "./agent";
import { atcSchedule, detailSchedule, ewtLines, totalsByAtc } from "./ewt";
import { buildQapRows, qapAgent, qapCsv, qapDat, qapWarnings, quarterMonths } from "./qap";

const MONTH = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });
const monthName = (iso: string) => MONTH.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));

const INPUTS = {
  month1: { key: "remitted_month1", label: "Remitted for month 1 (0619-E)", kind: "amount", required: false, help: "Leave blank to use the 0619-E worksheet for that month." },
  month2: { key: "remitted_month2", label: "Remitted for month 2 (0619-E)", kind: "amount", required: false, help: "Leave blank to use the 0619-E worksheet for that month." },
  amended: { key: "previously_filed", label: "Tax remitted in return previously filed", kind: "amount", required: false, help: "Only for an amended 1601-EQ (item 22)." },
  over: { key: "prior_over_remittance", label: "Over-remittance from previous quarter", kind: "amount", required: false, help: "Item 23, from the previous quarter's 1601-EQ." },
  other: { key: "other_payments", label: "Other payments made (BIR Form 0605)", kind: "amount", required: false, help: "Item 24." },
} satisfies Record<string, ManualInput>;

/** How many ATC lines the form has room for (items 13 to 18). */
const ATC_SLOTS = 6;

export const form1601EQ: FormModule = {
  forms: ["1601-EQ"],
  title: "1601-EQ · Quarterly Remittance Return of Creditable Income Taxes Withheld (Expanded)",
  manualInputs: () => [INPUTS.month1, INPUTS.month2, INPUTS.amended, INPUTS.over, INPUTS.other, ...PENALTY_INPUTS],

  compute(ctx: WorksheetContext): WorksheetResult {
    const { lines, errors: docErrors, warnings } = ewtLines(ctx.documents);
    const errors = [...agentErrors(ctx), ...docErrors];
    const totals = totalsByAtc(lines);
    const totalWithheld = totals.reduce((a, t) => a + t.withheld, 0);
    const months = quarterMonths(ctx.filing.periodStart);

    // Items 20–21: the 0619-E remittances for the first two months.
    const remitted = ([INPUTS.month1, INPUTS.month2] as const).map((def, i) => {
      const month = months[i];
      const typed = readNonNegative(ctx.inputs, def, errors);
      const prior = ctx.priorFigures[priorKey("0619-E", month)]?.amount_of_remittance;
      const withheldThisMonth = lines.filter((l) => l.month.slice(0, 10) === month).reduce((a, l) => a + l.withheld, 0);
      if (typed != null) return { amount: typed, basis: `Typed in for ${monthName(month)}` };
      const filed = ctx.ewtRemittances?.find((r) => r.month.slice(0, 10) === month);
      if (ctx.ewtRemittances) {
        // Decision 11: months 1 and 2 come off once their 0619-E is filed and paid.
        if (!filed?.periodLabel) {
          if (withheldThisMonth > 0) warnings.push(`${monthName(month)} has EWT of ${formatAmount(withheldThisMonth)} but no 0619-E; nothing is deducted for it.`);
          return { amount: 0, basis: `No 0619-E for ${monthName(month)}` };
        }
        if (!filed.settled) {
          warnings.push(`The 0619-E for ${monthName(month)} is not filed and paid yet, so it is not deducted (item ${20 + i}). File and pay it first, or enter what was remitted.`);
          return { amount: 0, basis: `0619-E for ${monthName(month)} not yet filed and paid` };
        }
        if (filed.remitted !== withheldThisMonth) {
          warnings.push(`${monthName(month)}: the 0619-E remitted ${formatAmount(filed.remitted)} but the EWT for that month now totals ${formatAmount(withheldThisMonth)}. The difference is due on this 1601-EQ.`);
        }
        return { amount: filed.remitted, basis: `0619-E for ${monthName(month)}, filed and paid (item 14)` };
      }
      if (prior != null) {
        if (prior !== withheldThisMonth) {
          warnings.push(`${monthName(month)}: the 0619-E remitted ${formatAmount(prior)} but the approved 2307s for that month total ${formatAmount(withheldThisMonth)}. Check for 2307s approved after the 0619-E.`);
        }
        return { amount: prior, basis: `0619-E worksheet for ${monthName(month)}, item 14` };
      }
      if (withheldThisMonth > 0) {
        warnings.push(`No 0619-E worksheet for ${monthName(month)}. If a 0619-E was filed, enter the amount remitted for month ${i + 1}.`);
      }
      return { amount: 0, basis: `No 0619-E worksheet for ${monthName(month)}` };
    });
    const amended = readNonNegative(ctx.inputs, INPUTS.amended, errors) ?? 0;
    const over = readNonNegative(ctx.inputs, INPUTS.over, errors) ?? 0;
    const other = readNonNegative(ctx.inputs, INPUTS.other, errors) ?? 0;
    const totalRemittances = remitted[0].amount + remitted[1].amount + amended + over + other;
    const stillDue = totalWithheld - totalRemittances;
    const penalties = penaltyLines(ctx, errors, ["27", "28", "29", "30"], "(Sum of Items 27 to 29)");

    if (totals.length > ATC_SLOTS) warnings.push(`${totals.length} ATCs this quarter: the form has room for ${ATC_SLOTS} (items 13–18); list the rest on an attachment.`);
    if (lines.length === 0 && errors.length === 0)
      warnings.push(ctx.source === "books" ? "No Purchase Invoice of this quarter carries tax withheld (EWT)." : "No approved 2307s issued this quarter.");

    const atcLines: WorksheetLine[] = totals.map((t, i) => ({
      key: `atc_${t.atc}`,
      line: i < ATC_SLOTS ? String(13 + i) : "Attach.",
      label: `${t.atc} — ${t.desc}`,
      amount: t.withheld,
      basis: `Tax base ${formatAmount(t.base)} at ${t.rate == null ? "?" : `${t.rate}%`}`,
    }));

    const rows = buildQapRows(lines, ctx.filing.periodStart);
    warnings.push(...qapWarnings(rows));

    return {
      sections: [
        { title: "Part I – Background Information", lines: backgroundLines(agentBackground(ctx, ["6", "7", "8", "9"])) },
        {
          title: "Part II – Computation of Tax (Schedule of Alphalist by ATC)",
          lines: [
            ...atcLines,
            { key: "total_taxes_withheld", line: "19", label: "Total Taxes Withheld for the Quarter (Sum of Items 13 to 18)", amount: totalWithheld, emphasis: "subtotal" },
            { key: "remitted_month1", line: "20", label: "Less: Remittances Made – 1st Month of the Quarter", amount: remitted[0].amount, basis: remitted[0].basis },
            { key: "remitted_month2", line: "21", label: "Less: Remittances Made – 2nd Month of the Quarter", amount: remitted[1].amount, basis: remitted[1].basis },
            { key: "previously_filed", line: "22", label: "Tax Remitted in Return Previously Filed, if amended", amount: amended },
            { key: "prior_over_remittance", line: "23", label: "Over-remittance from Previous Quarter", amount: over },
            { key: "other_payments", line: "24", label: "Other Payments Made (BIR Form 0605)", amount: other },
            { key: "total_remittances", line: "25", label: "Total Remittances Made (Sum of Items 20 to 24)", amount: totalRemittances, emphasis: "subtotal" },
            { key: "tax_still_due", line: "26", label: "Tax Still Due / (Over-remittance) (Item 19 Less Item 25)", amount: stillDue, emphasis: "subtotal" },
            ...penalties.lines,
            { key: "total_amount_due", line: "31", label: "TOTAL AMOUNT STILL DUE / (Over-remittance) (Sum of Items 26 and 30)", amount: stillDue + penalties.total, emphasis: "payable" },
          ],
        },
      ],
      schedules: [
        atcSchedule("Schedule 1 – Alphalist by ATC", totals),
        {
          title: "QAP – payees by ATC",
          columns: [
            { key: "tin", label: "TIN" },
            { key: "name", label: "Payee" },
            { key: "atc", label: "ATC" },
            { key: "rate", label: "Rate" },
            { key: "m1", label: `${monthName(months[0])} withheld`, numeric: true },
            { key: "m2", label: `${monthName(months[1])} withheld`, numeric: true },
            { key: "m3", label: `${monthName(months[2])} withheld`, numeric: true },
            { key: "base", label: "Income payment", numeric: true },
            { key: "withheld", label: "Tax withheld", numeric: true },
          ],
          rows: rows.map((r) => ({ tin: r.tin, name: r.name, atc: r.atc, rate: `${r.rate}%`, m1: r.months[0].withheld, m2: r.months[1].withheld, m3: r.months[2].withheld, base: r.base, withheld: r.withheld })),
        },
        detailSchedule(ctx.source === "books" ? "Purchase Invoices with EWT in the quarter" : "2307s issued in the quarter", lines),
      ],
      errors,
      warnings,
      documentIds: [...new Set(lines.map((l) => l.documentId))],
    };
  },

  attachments(ctx: WorksheetContext) {
    const rows = buildQapRows(ewtLines(ctx.documents).lines, ctx.filing.periodStart);
    const agent = qapAgent(ctx);
    return [
      { kind: "qap-dat", label: "QAP · DAT file for eSubmission", build: () => qapDat(rows, agent, ctx.filing.periodStart) },
      { kind: "qap-csv", label: "QAP · spreadsheet (CSV)", build: () => qapCsv(rows, agent, ctx.filing.periodStart, ctx.filing.periodLabel) },
    ];
  },
};
