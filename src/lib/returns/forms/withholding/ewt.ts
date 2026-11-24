/**
 * Expanded withholding tax (EWT) lines from the BIR 2307s the client issued,
 * shared by 0619-E, 1601-EQ and the QAP.
 *
 * Ported from taxify.ph (reports/0619e-report.js `extractEWTLines0619`,
 * reports/1601eq-report.js `extractEWTLines` / `buildEWTAlphalist`,
 * helpers/ewt-helpers.js `extractEWT`). In taxify the figures came from
 * Manager.io purchase lines carrying an EWT tax code; here each approved
 * "BIR 2307 issued" document is one income payment to one payee:
 *   - ATC: the 2307's ATC, resolved through the ATC master (atc.ts);
 *   - rate: the ATC master rate (taxify used the ATC rate whenever the line
 *     amount was the tax withheld);
 *   - tax base (income payment): the 2307's total; when the total is blank,
 *     the tax withheld grossed up at the ATC rate (taxify: base = ewt / rate);
 *   - tax withheld: the 2307's tax withheld; when blank, base × rate.
 */
import { lookupAtc } from "../../atc";
import { applyRate, formatAmount, formatPeso, grossUp } from "../../money";
import type { Centavos, SourceDocument, WorksheetSchedule } from "../../types";

export interface EwtLine {
  documentId: string;
  /** First day of the month the 2307 counts in. */
  month: string;
  date: string | null;
  number: string | null;
  payeeName: string;
  payeeTin: string | null;
  atc: string;
  desc: string;
  /** Percent; null when the ATC is not in the master and no rate can be worked out. */
  rate: number | null;
  base: Centavos;
  withheld: Centavos;
  /** False when the ATC is not in the ATC master. */
  known: boolean;
  /** The payee's directory entry, when the TIN is in the parties directory. */
  party?: SourceDocument["party"];
}

export interface AtcTotal {
  atc: string;
  desc: string;
  rate: number | null;
  base: Centavos;
  withheld: Centavos;
  count: number;
}

const docLabel = (d: SourceDocument) => `2307${d.number ? ` no. ${d.number}` : ""}${d.partyName ? ` to ${d.partyName}` : ""}${d.date ? ` (${d.date})` : ""}`;

/** 9+ digits, as the alphalist validation module needs. */
export const tinDigits = (tin: string | null) => (tin ?? "").replace(/\D/g, "");

/**
 * EWT lines from the 2307s issued in `documents`. A 2307 without the payee's
 * TIN or without an ATC is a blocking error (the QAP and the BIR validation
 * module reject it); an ATC not in the master is a warning.
 */
export function ewtLines(documents: SourceDocument[]): { lines: EwtLine[]; errors: string[]; warnings: string[] } {
  const lines: EwtLine[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];
  for (const d of documents) {
    if (d.docType !== "bir_2307_issued") continue;
    const label = docLabel(d);
    let bad = false;
    if (!d.atc) {
      errors.push(`${label}: no ATC. Edit the document and enter the ATC.`);
      bad = true;
    }
    if (!d.partyTin) {
      errors.push(`${label}: no payee TIN. Edit the document and enter the payee's TIN.`);
      bad = true;
    } else if (tinDigits(d.partyTin).length < 9) {
      errors.push(`${label}: the payee TIN ${d.partyTin} is not 9 digits.`);
      bad = true;
    }
    if (bad || !d.atc) continue;

    const info = lookupAtc(d.atc);
    let rate: number | null = info?.rate ?? null;
    if (!info) {
      // Unknown ATC: keep the 2307's own figures and show the implied rate.
      if (d.total > 0 && d.withholding > 0) rate = Math.round((d.withholding / d.total) * 10000) / 100;
      warnings.push(`${label}: ATC ${d.atc} is not in the ATC table. Check the code; the figures are taken as written on the 2307.`);
    }

    let base = d.total;
    let withheld = d.withholding;
    if (base <= 0 && withheld > 0 && rate) {
      base = grossUp(withheld, rate);
      warnings.push(`${label}: no income payment on the 2307; worked back from the tax withheld at ${rate}% (${formatPeso(base)}).`);
    }
    if (withheld <= 0 && base > 0 && rate) {
      withheld = applyRate(base, rate);
      warnings.push(`${label}: no tax withheld on the 2307; computed at ${rate}% (${formatPeso(withheld)}).`);
    }
    if (base <= 0 && withheld <= 0) {
      errors.push(`${label}: no income payment or tax withheld. Edit the document and enter the amounts.`);
      continue;
    }
    if (info && base > 0 && withheld > 0) {
      const expected = applyRate(base, info.rate);
      // More than ₱1 off: a wrong ATC or a misread figure, most likely.
      if (Math.abs(expected - withheld) > 100) {
        warnings.push(`${label}: tax withheld ${formatAmount(withheld)} is not ${info.rate}% of ${formatAmount(base)} (expected ${formatAmount(expected)}). Check the ATC and amounts.`);
      }
    }

    lines.push({
      documentId: d.id,
      month: d.month,
      date: d.date,
      number: d.number,
      payeeName: d.partyName ?? "(no name)",
      payeeTin: d.partyTin,
      atc: info?.atc ?? d.atc,
      desc: info?.desc ?? "Not in the ATC table",
      rate,
      base,
      withheld,
      known: !!info,
      party: d.party,
    });
  }
  return { lines, errors, warnings };
}

/** Totals per ATC, sorted by ATC (taxify: atcRows sorted with localeCompare). */
export function totalsByAtc(lines: EwtLine[]): AtcTotal[] {
  const by = new Map<string, AtcTotal>();
  for (const l of lines) {
    const t = by.get(l.atc) ?? { atc: l.atc, desc: l.desc, rate: l.rate, base: 0, withheld: 0, count: 0 };
    t.base += l.base;
    t.withheld += l.withheld;
    t.count += 1;
    by.set(l.atc, t);
  }
  return [...by.values()].sort((a, b) => a.atc.localeCompare(b.atc));
}

export function atcSchedule(title: string, totals: AtcTotal[]): WorksheetSchedule {
  return {
    title,
    columns: [
      { key: "atc", label: "ATC" },
      { key: "desc", label: "Nature of income payment" },
      { key: "rate", label: "Rate" },
      { key: "count", label: "2307s" },
      { key: "base", label: "Tax base", numeric: true },
      { key: "withheld", label: "Tax withheld", numeric: true },
    ],
    rows: totals.map((t) => ({ atc: t.atc, desc: t.desc, rate: t.rate == null ? "—" : `${t.rate}%`, count: String(t.count), base: t.base, withheld: t.withheld })),
  };
}

/** Per-2307 detail (taxify's "Reference — EWT breakdown"), sorted by date. */
export function detailSchedule(title: string, lines: EwtLine[]): WorksheetSchedule {
  const sorted = [...lines].sort((a, b) => (a.date ?? a.month).localeCompare(b.date ?? b.month));
  return {
    title,
    columns: [
      { key: "date", label: "Date" },
      { key: "number", label: "Reference" },
      { key: "payee", label: "Payee" },
      { key: "tin", label: "TIN" },
      { key: "atc", label: "ATC" },
      { key: "base", label: "Tax base", numeric: true },
      { key: "rate", label: "Rate" },
      { key: "withheld", label: "Tax withheld", numeric: true },
    ],
    rows: sorted.map((l) => ({
      date: l.date ?? l.month.slice(0, 7),
      number: l.number,
      payee: l.payeeName,
      tin: l.payeeTin,
      atc: l.atc,
      base: l.base,
      rate: l.rate == null ? "—" : `${l.rate}%`,
      withheld: l.withheld,
    })),
  };
}
