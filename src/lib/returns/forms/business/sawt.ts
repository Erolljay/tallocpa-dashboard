/**
 * SAWT — Summary Alphalist of Withholding Taxes: the BIR 2307s the client
 * received (tax its customers withheld), attached to 2551Q / 2550Q / 1701Q /
 * 1702Q. Ported from taxify reports/sawt-report.js: rows aggregate per
 * customer per ATC; the DAT file is filed per month (one file per month of
 * the quarter, `exportSAWTDatSimple`), the Excel export covers the period.
 */
import { grossUp } from "../../money";
import type { AttachmentFile, Centavos, SourceDocument, WorksheetContext, WorksheetSchedule } from "../../types";
import { atcInfo, atcKind, normalizeAtc, type AtcKind } from "./atc";
import {
  MONTH_NAMES, branchCode, crlf, csv, datMonth, docLabel, filerOf, monthKeyOf, monthsBetween, plain, qd, stripSpecial, tin9, tinDashed, tinDigits,
} from "./util";

export type SawtForm = "2551Q" | "2550Q" | "1701Q" | "1702Q";

export interface SawtRow {
  partyName: string;
  partyTin: string | null;
  atc: string;
  desc: string;
  /** Percent. */
  rate: number;
  base: Centavos;
  withheld: Centavos;
  /** Per "YYYY-MM": income payment and tax withheld. */
  months: Record<string, { base: Centavos; withheld: Centavos }>;
  documentIds: string[];
}

export interface SawtResult {
  rows: SawtRow[];
  /** CWT claimed from Sales Invoices whose customer's 2307 is not in yet (decision 12: claimed and followed up). */
  missing2307: SourceDocument[];
  total: Centavos;
  errors: string[];
  warnings: string[];
  documentIds: string[];
}

/**
 * Income payment on a 2307: the total OCR read, else the tax grossed up at the
 * ATC rate (taxify grosses a pass-through withholding line up the same way).
 */
function incomePayment(d: SourceDocument, rate: number): Centavos {
  if (d.total > 0) return d.total;
  return rate > 0 ? grossUp(d.withholding, rate) : 0;
}

const invoiceLabel = (d: SourceDocument) => `Sales Invoice ${d.number ?? "(no number)"}${d.partyName ? ` — ${d.partyName}` : ""}${d.date ? ` (${d.date})` : ""}`;

/** SAWT rows from the 2307s received in `docs` whose ATC is of one of `kinds`. */
export function buildSawt(docs: SourceDocument[], kinds: AtcKind[]): SawtResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const groups = new Map<string, SawtRow>();
  const missing2307: SourceDocument[] = [];
  for (const d of docs) {
    if (d.docType !== "bir_2307_received") continue;
    // A withholding code with nothing withheld on the Sales Invoice: nothing to claim.
    if (d.fromBooks && d.withholding <= 0) continue;
    const atc = normalizeAtc(d.atc);
    if (!atc) {
      // Only blocking for the forms it could belong to: an unknown ATC could be any of them.
      errors.push(
        d.fromBooks
          ? `${invoiceLabel(d)} has tax withheld but no withholding code, so it cannot be placed on the SAWT. Give it its WC / WI or WV code in the Books.`
          : `${docLabel(d)} has no ATC, so it cannot be placed on the SAWT. Add the ATC in review.`,
      );
      continue;
    }
    if (!kinds.includes(atcKind(atc))) continue;
    const info = atcInfo(atc);
    let rate = info?.rate ?? 0;
    if (!info) {
      if (d.total > 0 && d.withholding > 0) rate = Math.round((d.withholding / d.total) * 10000) / 100;
      warnings.push(`${docLabel(d)}: ATC ${atc} is not in the ATC table; rate taken as ${rate}% from the amounts.`);
    }
    if (d.withholding <= 0) warnings.push(`${docLabel(d)} shows no tax withheld.`);
    if (tinDigits(d.partyTin).length < 9) warnings.push(`${docLabel(d)}: the withholding agent has no valid TIN; the SAWT will carry 000000000, which the BIR Validation Module rejects.`);
    if (d.total <= 0 && d.withholding > 0) warnings.push(`${docLabel(d)}: no income payment read; grossed up from the tax withheld at ${rate}%.`);
    if (d.fromBooks && d.cwtSupported === false && d.withholding > 0) {
      missing2307.push(d);
      warnings.push(
        d.cwtFollowedUpAt
          ? `${invoiceLabel(d)}: the customer's 2307 (${atc}) is not in yet. The tax withheld is claimed; followed up on ${d.cwtFollowedUpAt.slice(0, 10)}.`
          : `${invoiceLabel(d)}: the customer's 2307 (${atc}) is not in yet. The tax withheld is claimed; ask the customer for it and mark it followed up.`,
      );
    }
    const base = incomePayment(d, rate);
    const key = `${tinDigits(d.partyTin).substring(0, 9) || "n:" + (d.partyName ?? "").trim().toUpperCase()}|${atc}`;
    let g = groups.get(key);
    if (!g) {
      g = { partyName: d.partyName ?? "", partyTin: d.partyTin, atc, desc: info?.desc ?? atc, rate, base: 0, withheld: 0, months: {}, documentIds: [] };
      groups.set(key, g);
    }
    const mk = monthKeyOf(d);
    g.months[mk] ??= { base: 0, withheld: 0 };
    g.months[mk].base += base;
    g.months[mk].withheld += d.withholding;
    g.base += base;
    g.withheld += d.withholding;
    g.documentIds.push(d.id);
  }
  const rows = [...groups.values()].sort((a, b) => a.partyName.localeCompare(b.partyName) || a.atc.localeCompare(b.atc));
  return { rows, missing2307, total: rows.reduce((s, r) => s + r.withheld, 0), errors, warnings, documentIds: [...new Set(rows.flatMap((r) => r.documentIds))] };
}

export function sawtSchedule(title: string, rows: SawtRow[]): WorksheetSchedule {
  return {
    title,
    columns: [
      { key: "tin", label: "TIN" },
      { key: "name", label: "Withholding agent" },
      { key: "atc", label: "ATC" },
      { key: "nature", label: "Nature of income payment" },
      { key: "rate", label: "Rate" },
      { key: "base", label: "Income payment", numeric: true },
      { key: "withheld", label: "Tax withheld", numeric: true },
    ],
    rows: rows.map((r) => ({ tin: r.partyTin ? tinDashed(r.partyTin) : "", name: r.partyName, atc: r.atc, nature: r.desc, rate: `${r.rate}%`, base: r.base, withheld: r.withheld })),
  };
}

/** One month's SAWT DAT (taxify `exportSAWTDatSimple`, ptype "monthly"). */
export function sawtDat(ctx: WorksheetContext, form: SawtForm, mk: string, rows: SawtRow[]): AttachmentFile {
  const f = filerOf(ctx);
  const rdo = f.rdo.padStart(3, "0").substring(0, 3);
  const period = datMonth(mk);
  const payee = stripSpecial(f.name).toUpperCase();
  const [ln, fn, mn] = [f.lastName, f.firstName, f.middleName].map((v) => stripSpecial(v).toUpperCase());
  const lines = [["HSAWT", `H${form}`, f.tin9, "0000", `"${payee}"`, qd(ln) || '""', qd(fn) || '""', qd(mn) || '""', period, rdo].join(",")];
  let totBase = 0;
  let totTax = 0;
  rows.forEach((r, i) => {
    totBase += r.base;
    totTax += r.withheld;
    lines.push(
      ["DSAWT", `D${form}`, i + 1, tin9(r.partyTin), branchCode(r.partyTin), qd(stripSpecial(r.partyName).toUpperCase()), "", "", "", period, "", r.atc, r.rate.toFixed(2), plain(r.base), plain(r.withheld)].join(","),
    );
  });
  lines.push(["CSAWT", `C${form}`, f.tin9, "0000", period, plain(totBase), plain(totTax)].join(","));
  return { fileName: `${f.tin9}0000${mk.slice(5, 7)}${mk.slice(0, 4)}${form}.DAT`, contentType: "text/plain", body: crlf(lines) };
}

/** The Excel-compatible SAWT for the whole period (taxify `exportSAWTExcel`, as CSV). */
export function sawtCsv(ctx: WorksheetContext, form: SawtForm, start: string, end: string, rows: SawtRow[]): AttachmentFile {
  const f = filerOf(ctx);
  const sm = Number(start.slice(5, 7)) - 1;
  const em = Number(end.slice(5, 7)) - 1;
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  const title = sameMonth
    ? `FOR THE MONTH OF ${MONTH_NAMES[sm].toUpperCase()}, ${start.slice(0, 4)}`
    : `FOR THE PERIOD ${MONTH_NAMES[sm].toUpperCase()} ${start.slice(0, 4)} TO ${MONTH_NAMES[em].toUpperCase()} ${end.slice(0, 4)}`;
  const dash = "------------------------------";
  const data: (string | number | null)[][] = [
    [`BIR FORM ${form}`],
    ["SUMMARY ALPHALIST OF WITHHOLDING TAXES (SAWT)"],
    [title],
    [],
    [],
    [`TIN : ${tinDashed(ctx.client.tin)}-0000`],
    [`PAYEE'S NAME: ${f.name.toUpperCase()}`],
    [],
    [],
    [],
    ["SEQ", "TAXPAYER", "CORPORATION", "INDIVIDUAL", "ATC CODE", "NATURE OF PAYMENT", "AMOUNT OF", "TAX RATE", "AMOUNT OF"],
    ["NO", "IDENTIFICATION", "(Registered Name)", "(Last Name, First Name, Middle Name)", "", "", "INCOME PAYMENT", "", "TAX WITHHELD"],
    ["", "NUMBER", "", "", "", "", "", "", ""],
    ["(1)", "(2)", "(3)", "(4)", "(5)", "", "(6)", "(7)", "(8)"],
    Array(9).fill(dash),
  ];
  let totBase = 0;
  let totTax = 0;
  rows.forEach((r, i) => {
    totBase += r.base;
    totTax += r.withheld;
    data.push([i + 1, `${tinDashed(r.partyTin)}-${branchCode(r.partyTin)}`, r.partyName.toUpperCase(), "", r.atc, r.desc, plain(r.base), r.rate, plain(r.withheld)]);
  });
  data.push(["", "", "", "", "", "", "------------------", "------------------", "------------------"]);
  data.push(["Grand Total :", 0, "", "", "", "", plain(totBase), "", plain(totTax)]);
  data.push(["", "", "", "", "", "", "==================", "==================", "=================="]);
  data.push(["END OF REPORT"]);
  return { fileName: `SAWT_${form}_${start.slice(0, 7)}_${end.slice(0, 7)}.csv`, contentType: "text/csv; charset=utf-8", body: csv(data) };
}

/** Attachment entries: one DAT per month of the period with withholding, plus the period CSV. */
export function sawtAttachments(ctx: WorksheetContext, form: SawtForm, sawt: SawtResult, start: string, end: string) {
  if (!sawt.rows.length) return [];
  const out: { kind: string; label: string; build(): AttachmentFile }[] = [];
  for (const mk of monthsBetween(start, end)) {
    const mRows = sawt.rows
      .map((r) => ({ ...r, base: r.months[mk]?.base ?? 0, withheld: r.months[mk]?.withheld ?? 0 }))
      .filter((r) => r.base !== 0 || r.withheld !== 0);
    if (!mRows.length) continue;
    const name = `${MONTH_NAMES[Number(mk.slice(5, 7)) - 1]} ${mk.slice(0, 4)}`;
    out.push({ kind: `sawt_dat_${mk}`, label: `SAWT DAT — ${name}`, build: () => sawtDat(ctx, form, mk, mRows) });
  }
  out.push({ kind: "sawt_csv", label: "SAWT (Excel CSV)", build: () => sawtCsv(ctx, form, start, end, sawt.rows) });
  return out;
}
