/**
 * QAP — Quarterly Alphalist of Payees, attachment to BIR Form 1601-EQ
 * (RMC No. 15-2025, Annex A). Ported from taxify.ph reports/qap-report.js:
 *   - rows: one per payee per ATC, with the three months of the quarter
 *     (`buildQAPRows`), sorted by payee name then ATC;
 *   - DAT: `exportQAPDat` (Header HQAP / Details D1 / Control C1, CRLF lines);
 *   - Excel: `exportQAPExcel` Sheet1, written as CSV (Excel opens it).
 * Field order, quoting, padding and defaults are kept exactly as taxify writes
 * them, since that output has been accepted by the BIR validation module.
 *
 * What this OS does not capture (taxify read it from Manager's supplier card):
 *   - the payee's branch code: taken from the TIN's digits after the 9th
 *     (123-456-789-00002 → 0002); head office '0000' when the TIN shows none.
 *     Each branch of a payee is its own row;
 *   - an individual payee's last / first / middle name: the 2307 has one
 *     name. A payee whose ATC is for individuals (WI…) and whose name is
 *     written "LAST, FIRST MIDDLE" goes in the individual columns (last name
 *     before the comma, the rest as first name); otherwise the name goes in
 *     the registered-name column.
 */
import { branchOfTin, payeeKeyOf, tin9, tinHasBranch } from "@/lib/parties/tin";
import { lookupAtc } from "../../atc";
import { toDecimalString } from "../../money";
import type { AttachmentFile, Centavos, WorksheetContext } from "../../types";
import { tinDashed } from "./agent";
import { tinDigits, type EwtLine } from "./ewt";

const FORM_TYPE = "1601EQ";
const MONTH_NAMES = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

export interface QapRow {
  tin: string | null;
  /** Four digits; "0000" (head office) when the TIN shows no branch. */
  branchCode: string;
  name: string;
  /** Set when the payee is an individual whose name is written "LAST, FIRST MIDDLE". */
  individual: { lastName: string; firstName: string; middleName: string } | null;
  atc: string;
  desc: string;
  rate: number;
  base: Centavos;
  withheld: Centavos;
  months: [{ base: Centavos; withheld: Centavos }, { base: Centavos; withheld: Centavos }, { base: Centavos; withheld: Centavos }];
}

/** Branch code from the TIN's digits after the 9th, as 4 digits; null if the TIN has none. */
export function branchFromTin(tin: string | null): string | null {
  return tinHasBranch(tin) ? branchOfTin(tin) : null;
}

/** "DELA CRUZ, JUAN" → individual name parts, for payees whose ATC is for individuals. */
export function splitIndividualName(name: string, atc: string): QapRow["individual"] {
  const info = lookupAtc(atc);
  const individualAtc = info ? info.payee === "individual" : atc.startsWith("WI");
  if (!individualAtc) return null;
  const i = name.indexOf(",");
  if (i < 0) return null;
  const lastName = name.slice(0, i).trim();
  const firstName = name.slice(i + 1).trim();
  if (!lastName || !firstName) return null;
  return { lastName, firstName, middleName: "" };
}

/** taxify buildQAPRows: payee × ATC with month 1/2/3 buckets. `quarterStart` is the first day of the quarter. */
export function buildQapRows(lines: EwtLine[], quarterStart: string): QapRow[] {
  const months = quarterMonths(quarterStart);
  const agg = new Map<string, QapRow>();
  for (const l of lines) {
    // One row per payee per branch (head office when the TIN shows none) per ATC.
    const payeeKey = payeeKeyOf(l.payeeTin) ?? l.payeeName.toUpperCase();
    const k = `${payeeKey}|${l.atc}`;
    let r = agg.get(k);
    if (!r) {
      r = {
        tin: l.payeeTin,
        branchCode: branchOfTin(l.payeeTin),
        name: l.payeeName,
        individual:
          l.party?.kind === "individual" && l.party.lastName
            ? { lastName: l.party.lastName, firstName: l.party.firstName ?? "", middleName: l.party.middleName ?? "" }
            : l.party?.kind === "non_individual"
              ? null
              : splitIndividualName(l.payeeName, l.atc),
        atc: l.atc,
        desc: l.desc,
        rate: l.rate ?? 0,
        base: 0,
        withheld: 0,
        months: [{ base: 0, withheld: 0 }, { base: 0, withheld: 0 }, { base: 0, withheld: 0 }],
      };
      agg.set(k, r);
    }
    // taxify: monthIdx = clamp(month - quarter start month, 0, 2).
    const idx = Math.max(0, months.indexOf(l.month.slice(0, 10)));
    r.base += l.base;
    r.withheld += l.withheld;
    r.months[idx].base += l.base;
    r.months[idx].withheld += l.withheld;
  }
  return [...agg.values()].sort((a, b) => a.name.localeCompare(b.name) || a.atc.localeCompare(b.atc));
}

/** First days of the three months starting at `quarterStart`. */
export function quarterMonths(quarterStart: string): string[] {
  const y = Number(quarterStart.slice(0, 4));
  const m = Number(quarterStart.slice(5, 7));
  return [0, 1, 2].map((i) => {
    const mm = ((m - 1 + i) % 12) + 1;
    const yy = y + Math.floor((m - 1 + i) / 12);
    return `${yy}-${String(mm).padStart(2, "0")}-01`;
  });
}

/** "2026-03-01" → "03/2026". */
const mmYYYY = (iso: string) => `${iso.slice(5, 7)}/${iso.slice(0, 4)}`;

/** taxify tin9: first 9 digits, zero-padded; '000000000' when blank. */
export { tin9 };

/** taxify stripSpecial: the validation module rejects names with commas and most symbols. */
export function stripSpecial(v: string | null | undefined): string {
  return (v ?? "").replace(/[^A-Za-z0-9\s.\-/]/g, "");
}

/** taxify qd: D1 detail rows leave blank fields empty (no quotes); only quote when present. */
const qd = (v: string) => (v ? `"${v}"` : "");

export interface QapAgent {
  tin: string | null;
  rdoCode: string | null;
  name: string;
}

/** Problems the BIR validation module would reject (taxify validateQAPDat), shown as warnings. */
export function qapWarnings(rows: QapRow[]): string[] {
  const out: string[] = [];
  for (const r of rows) {
    const issues: string[] = [];
    if (tinDigits(r.tin).length < 9) issues.push("missing/invalid TIN");
    if (tinDigits(r.tin).length === 9) issues.push("no branch code in the TIN, so it is filed as head office (0000); if the payee is a branch, add its branch digits, e.g. 123-456-789-00002");
    if (!r.individual && (lookupAtc(r.atc)?.payee === "individual" || (!lookupAtc(r.atc) && r.atc.startsWith("WI")))) {
      issues.push(`individual payee (ATC ${r.atc}): write the name as LAST, FIRST MIDDLE so it goes in the individual columns`);
    }
    if (issues.length) out.push(`QAP — ${r.name}: ${issues.join("; ")}.`);
  }
  return out;
}

/** taxify exportQAPDat: the QAP DAT file for the quarter starting `quarterStart`. */
export function qapDat(rows: QapRow[], agent: QapAgent, quarterStart: string): AttachmentFile {
  const ourTin = tin9(agent.tin);
  const rdo = (agent.rdoCode ?? "").padStart(3, "0").substring(0, 3);
  const monthsInQ = quarterMonths(quarterStart).map(mmYYYY);
  const agentName = stripSpecial(agent.name).toUpperCase();

  const lines: string[] = [];
  lines.push(["HQAP", `H${FORM_TYPE}`, ourTin, "0000", `"${agentName}"`, monthsInQ[0], rdo].join(","));

  let totBase = 0;
  let totEwt = 0;
  rows.forEach((r, i) => {
    totBase += r.base;
    totEwt += r.withheld;
    const corpName = stripSpecial(r.individual ? "" : r.name).toUpperCase();
    const ln = stripSpecial(r.individual?.lastName).toUpperCase();
    const fn = stripSpecial(r.individual?.firstName).toUpperCase();
    const mn = stripSpecial(r.individual?.middleName).toUpperCase();
    const m = r.months;
    lines.push(
      [
        "D1", FORM_TYPE, i + 1, tin9(r.tin), r.branchCode,
        qd(corpName), qd(ln), qd(fn), qd(mn),
        monthsInQ[0], r.atc, r.rate.toFixed(2), toDecimalString(m[0].base), toDecimalString(m[0].withheld),
        monthsInQ[1], toDecimalString(m[1].base), toDecimalString(m[1].withheld),
        monthsInQ[2], toDecimalString(m[2].base), toDecimalString(m[2].withheld),
      ].join(","),
    );
  });
  lines.push(["C1", FORM_TYPE, ourTin, "0000", monthsInQ[2], toDecimalString(totBase), toDecimalString(totEwt)].join(","));

  const qEnd = quarterMonths(quarterStart)[2];
  return {
    fileName: `${ourTin}0000${qEnd.slice(5, 7)}${qEnd.slice(0, 4)}${FORM_TYPE}.DAT`,
    contentType: "text/plain; charset=utf-8",
    body: lines.join("\r\n") + "\r\n",
  };
}

/** One CSV cell: numbers as is, text quoted when it has a comma, quote or line break. */
function csvCell(v: string | number): string {
  if (typeof v === "number") return String(v);
  return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

/** taxify exportQAPExcel, Sheet1, as CSV. `periodLabel` names the file. */
export function qapCsv(rows: QapRow[], agent: QapAgent, quarterStart: string, periodLabel: string): AttachmentFile {
  const qEnd = quarterMonths(quarterStart)[2];
  const qEndMonthName = MONTH_NAMES[Number(qEnd.slice(5, 7)) - 1];
  const year = qEnd.slice(0, 4);
  const agentName = agent.name.toUpperCase();
  const num = (c: Centavos) => toDecimalString(c);

  const data: (string | number)[][] = [
    ["Attachment to BIR Form 1601-EQ"],
    ["QUARTERLY ALPHABETICAL LIST OF PAYEES SUBJECTED TO EXPANDED WITHHOLDING TAX & PAYEES WHOSE INCOME PAYMENTS ARE EXEMPT "],
    [`FOR THE QUARTER ENDING ${qEndMonthName}, ${year}`],
    [`TIN : ${tinDashed(agent.tin)}-0000`],
    [`WITHHOLDING AGENT'S NAME: ${agentName}`],
    [],
    [
      "SEQ NO", "TAXPAYER IDENTIFICATION NUMBER", "CORPORATION (Registered Name)",
      "INDIVIDUAL (Last Name, First Name, Middle Name)", "ATC CODE", "NATURE OF PAYMENT",
      "1ST MONTH OF QUARTER", "", "",
      "2ND MONTH OF QUARTER", "", "",
      "3RD MONTH OF QUARTER", "", "",
      "TOTAL FOR QUARTER", "",
    ],
    [
      "", "", "", "", "", "",
      "AMOUNT OF INCOME PAYMENT", "TAX RATE", "TAX WITHHELD",
      "AMOUNT OF INCOME PAYMENT", "TAX RATE", "TAX WITHHELD",
      "AMOUNT OF INCOME PAYMENT", "TAX RATE", "TAX WITHHELD",
      "TOTAL AMOUNT", "TOTAL TAX WITHHELD",
    ],
  ];

  let totBase = 0;
  let totEwt = 0;
  rows.forEach((r, i) => {
    const ind = r.individual;
    const corpName = ind ? "" : r.name.toUpperCase().padEnd(50, " ");
    const indName = ind ? [ind.lastName, ind.firstName, ind.middleName].filter(Boolean).join(", ").toUpperCase().padEnd(50, " ") : "".padEnd(50, " ");
    const m = r.months;
    totBase += r.base;
    totEwt += r.withheld;
    data.push([
      i + 1,
      `${tinDashed(r.tin)}-${r.branchCode}`,
      corpName,
      indName,
      r.atc,
      r.desc,
      num(m[0].base), r.rate, num(m[0].withheld),
      num(m[1].base), r.rate, num(m[1].withheld),
      num(m[2].base), r.rate, num(m[2].withheld),
      num(r.base), num(r.withheld),
    ]);
  });
  data.push(["", "", "", "", "", "Grand Total :", "", "", "", "", "", "", "", "", "", num(totBase), num(totEwt)]);
  data.push(["------------------"]);
  data.push(["=================="]);
  data.push(["END OF REPORT"]);

  return {
    fileName: `QAP_${FORM_TYPE}_${periodLabel.replace(/[\s()–/]/g, "_")}.csv`,
    contentType: "text/csv; charset=utf-8",
    // BOM so Excel reads the file as UTF-8 (ñ in names).
    body: "﻿" + data.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n",
  };
}

export const qapAgent = (ctx: Pick<WorksheetContext, "client">): QapAgent => ({ tin: ctx.client.tin, rdoCode: ctx.client.rdoCode, name: ctx.client.name });
