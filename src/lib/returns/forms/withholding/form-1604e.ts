/**
 * BIR Form 1604-E — Annual Information Return of Creditable Income Taxes Withheld
 * (Expanded) / Income Payments Exempt from Withholding Tax (docs/REWORK.md,
 * decisions 11 and 23). Built from the year's QAP: the EWT on the year's Purchase
 * Invoices in the Books (or, for a client without Books, the 2307s it issued).
 *
 *   Part I    the withholding agent (items 1 and 4 to 7);
 *   Part II   the summary of remittances per BIR Form 1601-EQ, one row per quarter,
 *             from the four 1601-EQ returns of the year (database function
 *             ewt_year_remittances): taxes withheld (item 19 of each), penalties,
 *             total remitted, and the filing and payment references;
 *   Schedule  the annual alphalist of payees: payee × ATC for the whole year.
 *
 * The DAT for eSubmission follows the Alphalist Data Entry layout of the 1604-C DAT
 * (src/lib/payroll/alphalist.ts): header H1604E, one D3 line per payee and ATC, control
 * C3, file <TIN9><branch4>1231<year>1604E.DAT. Field order within D3 follows the QAP's
 * D1 (ATC, rate, income payment, tax withheld). It has not yet been run through the BIR
 * validation module: the worksheet says so until the Owner confirms a file was accepted.
 */
import { backgroundLines } from "../../inputs";
import { formatAmount, toDecimalString } from "../../money";
import type { AttachmentFile, Centavos, FormModule, WorksheetContext, WorksheetLine, WorksheetResult } from "../../types";
import { agentBackground, agentErrors, tinDashed } from "./agent";
import { atcSchedule, detailSchedule, ewtLines, totalsByAtc, type EwtLine } from "./ewt";
import { buildQapRows, qapAgent, qapWarnings, stripSpecial, tin9, type QapAgent } from "./qap";

const QUARTER = ["1st", "2nd", "3rd", "4th"];

export interface AnnualPayeeRow {
  tin: string | null;
  /** Four digits; "0000" (head office) when the TIN shows no branch. */
  branchCode: string;
  name: string;
  individual: { lastName: string; firstName: string; middleName: string } | null;
  atc: string;
  desc: string;
  rate: number;
  base: Centavos;
  withheld: Centavos;
}

/** The year's payees by ATC: the QAP grouping (payee × ATC) over twelve months. */
export function annualPayeeRows(lines: EwtLine[], yearStart: string): AnnualPayeeRow[] {
  // buildQapRows groups by payee and ATC; its month buckets are not used for a year.
  return buildQapRows(lines, yearStart).map((r) => ({
    tin: r.tin, branchCode: r.branchCode, name: r.name, individual: r.individual, atc: r.atc, desc: r.desc, rate: r.rate, base: r.base, withheld: r.withheld,
  }));
}

const qd = (v: string) => (v ? `"${v}"` : "");

/** The 1604-E alphalist DAT for the calendar year `year`. */
export function form1604eDat(rows: AnnualPayeeRow[], agent: QapAgent, year: number): AttachmentFile {
  const ourTin = tin9(agent.tin);
  const branch = "0000";
  const asOf = `12/31/${year}`;
  const rdo = (agent.rdoCode ?? "").padStart(3, "0").substring(0, 3);
  const lines: string[] = [["H1604E", ourTin, branch, asOf, rdo].join(",")];
  let totBase = 0;
  let totWithheld = 0;
  rows.forEach((r, i) => {
    totBase += r.base;
    totWithheld += r.withheld;
    lines.push(
      [
        "D3", "1604E", ourTin, branch, asOf, i + 1, tin9(r.tin), r.branchCode,
        qd(stripSpecial(r.individual ? "" : r.name).toUpperCase()),
        qd(stripSpecial(r.individual?.lastName).toUpperCase()),
        qd(stripSpecial(r.individual?.firstName).toUpperCase()),
        qd(stripSpecial(r.individual?.middleName).toUpperCase()),
        r.atc, r.rate.toFixed(2), toDecimalString(r.base), toDecimalString(r.withheld),
      ].join(","),
    );
  });
  lines.push(["C3", "1604E", ourTin, branch, asOf, toDecimalString(totBase), toDecimalString(totWithheld)].join(","));
  return {
    fileName: `${ourTin}${branch}1231${year}1604E.DAT`,
    contentType: "text/plain; charset=utf-8",
    body: lines.join("\r\n") + "\r\n",
  };
}

function csvCell(v: string | number): string {
  if (typeof v === "number") return String(v);
  return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** The annual alphalist of payees as a spreadsheet (CSV). */
export function form1604eCsv(rows: AnnualPayeeRow[], agent: QapAgent, year: number): AttachmentFile {
  const data: (string | number)[][] = [
    ["Attachment to BIR Form 1604-E"],
    ["ALPHABETICAL LIST OF PAYEES SUBJECTED TO EXPANDED WITHHOLDING TAX"],
    [`FOR THE YEAR ENDED DECEMBER 31, ${year}`],
    [`TIN : ${tinDashed(agent.tin)}-0000`],
    [`WITHHOLDING AGENT'S NAME: ${agent.name.toUpperCase()}`],
    [],
    ["SEQ NO", "TAXPAYER IDENTIFICATION NUMBER", "CORPORATION (Registered Name)", "INDIVIDUAL (Last Name, First Name, Middle Name)", "ATC CODE", "NATURE OF PAYMENT", "AMOUNT OF INCOME PAYMENT", "TAX RATE", "AMOUNT OF TAX WITHHELD"],
  ];
  let totBase = 0;
  let totWithheld = 0;
  rows.forEach((r, i) => {
    totBase += r.base;
    totWithheld += r.withheld;
    const ind = r.individual;
    data.push([
      i + 1,
      `${tinDashed(r.tin)}-${r.branchCode}`,
      ind ? "" : r.name.toUpperCase(),
      ind ? [ind.lastName, ind.firstName, ind.middleName].filter(Boolean).join(", ").toUpperCase() : "",
      r.atc,
      r.desc,
      toDecimalString(r.base),
      r.rate,
      toDecimalString(r.withheld),
    ]);
  });
  data.push(["", "", "", "", "", "Grand Total :", toDecimalString(totBase), "", toDecimalString(totWithheld)]);
  data.push(["END OF REPORT"]);
  return {
    fileName: `1604E_Alphalist_${year}.csv`,
    contentType: "text/csv; charset=utf-8",
    body: "﻿" + data.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n",
  };
}

const yearOf = (ctx: WorksheetContext) => Number(ctx.filing.periodEnd.slice(0, 4));

export const form1604E: FormModule = {
  forms: ["1604-E"],
  title: "1604-E · Annual Information Return of Creditable Income Taxes Withheld (Expanded)",
  manualInputs: () => [],

  compute(ctx: WorksheetContext): WorksheetResult {
    const { lines, errors: docErrors, warnings } = ewtLines(ctx.documents);
    const errors = [...agentErrors(ctx), ...docErrors];
    const totals = totalsByAtc(lines);
    const withheldYear = totals.reduce((a, t) => a + t.withheld, 0);
    const year = yearOf(ctx);
    const rows = annualPayeeRows(lines, ctx.filing.periodStart);
    warnings.push(...qapWarnings(rows.map((r) => ({ ...r, months: [{ base: 0, withheld: 0 }, { base: 0, withheld: 0 }, { base: 0, withheld: 0 }] }))));

    // Part II: one row per quarter from its 1601-EQ.
    const quarters = ctx.ewtYear ?? [];
    const quarterLines: WorksheetLine[] = [];
    let totalWithheld = 0;
    let totalPenalties = 0;
    QUARTER.forEach((name, i) => {
      const q = quarters[i];
      const qStart = `${year}-${String(i * 3 + 1).padStart(2, "0")}-01`;
      const qEnd = `${year}-${String(i * 3 + 4).padStart(2, "0")}-01`;
      const qapWithheld = lines.filter((l) => l.month >= qStart && l.month < qEnd).reduce((a, l) => a + l.withheld, 0);
      if (!q?.periodLabel) {
        if (qapWithheld > 0) warnings.push(`${name} quarter: EWT of ${formatAmount(qapWithheld)} but no 1601-EQ; nothing is shown as remitted for it.`);
        quarterLines.push({ key: `q${i + 1}_remitted`, line: `II-${i + 1}`, label: `${name} Quarter – no 1601-EQ`, amount: 0 });
        return;
      }
      if (!q.settled) warnings.push(`The 1601-EQ for ${q.periodLabel} is not filed and paid yet. File it before the 1604-E.`);
      else if (!q.computed) warnings.push(`The 1601-EQ for ${q.periodLabel} has no worksheet; its figures are taken as zero.`);
      if (q.computed && q.withheld !== qapWithheld) {
        warnings.push(`${q.periodLabel}: the 1601-EQ shows taxes withheld of ${formatAmount(q.withheld)} but the year's QAP now has ${formatAmount(qapWithheld)} for that quarter. The difference needs an amended 1601-EQ.`);
      }
      totalWithheld += q.withheld;
      totalPenalties += q.penalties;
      const paid = [q.filedOn && `filed ${q.filedOn}`, q.paymentReference && `ref. ${q.paymentReference}`, q.paidOn && `paid ${q.paidOn}`].filter(Boolean).join(" · ");
      quarterLines.push({
        key: `q${i + 1}_remitted`,
        line: `II-${i + 1}`,
        label: `${name} Quarter – taxes withheld ${formatAmount(q.withheld)}, penalties ${formatAmount(q.penalties)}`,
        amount: q.withheld + q.penalties,
        basis: `1601-EQ ${q.periodLabel}${paid ? ` · ${paid}` : ""}`,
      });
    });

    if (withheldYear !== totalWithheld && quarters.length) {
      warnings.push(`The 1601-EQ returns show ${formatAmount(totalWithheld)} withheld for the year; the alphalist of payees totals ${formatAmount(withheldYear)}.`);
    }
    if (lines.length === 0 && errors.length === 0)
      warnings.push(ctx.source === "books" ? "No Purchase Invoice of the year carries tax withheld (EWT)." : "No approved 2307s issued this year.");
    if (rows.length) warnings.push("The 1604-E DAT has not yet been accepted by the BIR validation module; validate it there before the first eSubmission.");

    return {
      sections: [
        {
          title: "Part I – Background Information",
          lines: [{ key: "for_the_year", line: "1", label: "For the Year", amount: null, basis: String(year) }, ...backgroundLines(agentBackground(ctx, ["4", "5", "6", "7"]))],
        },
        {
          title: "Part II – Summary of Remittances per BIR Form No. 1601-EQ",
          lines: [
            ...quarterLines,
            { key: "total_taxes_withheld", line: "Total", label: "Total Taxes Withheld for the Year", amount: totalWithheld, emphasis: "subtotal" },
            { key: "total_penalties", line: "Total", label: "Total Penalties", amount: totalPenalties },
            { key: "total_remitted", line: "Total", label: "Total Amount Remitted", amount: totalWithheld + totalPenalties, emphasis: "total" },
            { key: "alphalist_withheld", line: "Sch.", label: "Tax withheld per the alphalist of payees", amount: withheldYear },
          ],
        },
      ],
      schedules: [
        atcSchedule("Alphalist by ATC", totals),
        {
          title: "Alphalist of payees for the year",
          columns: [
            { key: "tin", label: "TIN" },
            { key: "name", label: "Payee" },
            { key: "atc", label: "ATC" },
            { key: "rate", label: "Rate" },
            { key: "base", label: "Income payment", numeric: true },
            { key: "withheld", label: "Tax withheld", numeric: true },
          ],
          rows: rows.map((r) => ({ tin: r.tin, name: r.name, atc: r.atc, rate: `${r.rate}%`, base: r.base, withheld: r.withheld })),
        },
        detailSchedule(ctx.source === "books" ? "Purchase Invoices with EWT in the year" : "2307s issued in the year", lines),
      ],
      errors,
      warnings,
      documentIds: [...new Set(lines.map((l) => l.documentId))],
    };
  },

  attachments(ctx: WorksheetContext) {
    const rows = annualPayeeRows(ewtLines(ctx.documents).lines, ctx.filing.periodStart);
    const agent = qapAgent(ctx);
    const year = yearOf(ctx);
    return [
      { kind: "alphalist-dat", label: "1604-E alphalist · DAT file for eSubmission", build: () => form1604eDat(rows, agent, year) },
      { kind: "alphalist-csv", label: "1604-E alphalist · spreadsheet (CSV)", build: () => form1604eCsv(rows, agent, year) },
    ];
  },
};
