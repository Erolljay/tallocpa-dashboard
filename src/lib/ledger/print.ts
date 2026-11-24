/**
 * The books of account as printed pages, ruled like the columnar journal pads
 * the firm uses: a fixed number of numbered lines per page (numbered down both
 * edges), a wide particulars column, money columns split into pesos and
 * centavos, and, on the special journals and the General Journal, column totals
 * carried forward from page to page.
 *
 * Every printed line is one ruled line of the pad, so a page holds exactly
 * `linesPerPage` of them; unused lines print blank.
 */
import { BOOK_TITLES, columnarBook, generalJournal, generalLedger, type BookEntry, type BookKind } from "./books";
import type { Centavos, LedgerAccount } from "./types";

export interface PrintColumn {
  key: string;
  label: string;
  kind: "text" | "money";
  /** Relative width of a text column (money columns share a fixed width). */
  width?: number;
}

export interface PrintLine {
  /** Text cells by column key, and money cells (centavos) by column key. */
  text: Record<string, string>;
  money: Record<string, Centavos>;
  style?: "heading" | "total" | "note" | "indent";
}

export interface PrintBook {
  kind: BookKind;
  title: string;
  orientation: "portrait" | "landscape";
  columns: PrintColumn[];
  lines: PrintLine[];
  /** Money columns whose totals are carried forward from page to page. */
  carry: string[];
}

const fmtDay = (d: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

export function buildPrintBook(kind: BookKind, entries: BookEntry[], accounts: LedgerAccount[], openings: Map<string, Centavos>): PrintBook {
  const title = BOOK_TITLES[kind];
  if (kind === "general_journal") {
    const j = generalJournal(entries, accounts);
    const lines: PrintLine[] = [];
    for (const r of j.rows) {
      r.lines.forEach((l, i) => {
        lines.push({
          text: { date: i === 0 ? fmtDay(r.date) : "", ref: i === 0 ? (r.reference ?? "") : "", particulars: l.account },
          money: l.debit ? { debit: l.debit } : { credit: l.credit },
          style: l.credit ? "indent" : undefined,
        });
      });
      lines.push({ text: { particulars: r.memo }, money: {}, style: "note" });
    }
    return {
      kind, title, orientation: "portrait", carry: ["debit", "credit"], lines,
      columns: [
        { key: "date", label: "Date", kind: "text", width: 1.1 },
        { key: "ref", label: "Ref.", kind: "text", width: 1.1 },
        { key: "particulars", label: "Account Titles and Explanation", kind: "text", width: 6 },
        { key: "debit", label: "Debit", kind: "money" },
        { key: "credit", label: "Credit", kind: "money" },
      ],
    };
  }

  if (kind === "general_ledger") {
    const lines: PrintLine[] = [];
    for (const s of generalLedger(entries, accounts, openings)) {
      lines.push({ text: { particulars: `${s.code} ${s.name}` }, money: {}, style: "heading" });
      lines.push({ text: { particulars: "Balance forwarded" }, money: { balance: s.opening } });
      for (const l of s.lines) {
        lines.push({ text: { date: fmtDay(l.date), ref: [l.book, l.reference].filter(Boolean).join(" "), particulars: l.particulars }, money: { debit: l.debit, credit: l.credit, balance: l.balance } });
      }
      lines.push({ text: { particulars: "Totals" }, money: { debit: s.debit, credit: s.credit, balance: s.closing }, style: "total" });
    }
    return {
      kind, title, orientation: "portrait", carry: [], lines,
      columns: [
        { key: "date", label: "Date", kind: "text", width: 1.1 },
        { key: "ref", label: "Ref.", kind: "text", width: 1.6 },
        { key: "particulars", label: "Particulars", kind: "text", width: 5 },
        { key: "debit", label: "Debit", kind: "money" },
        { key: "credit", label: "Credit", kind: "money" },
        { key: "balance", label: "Balance", kind: "money" },
      ],
    };
  }

  const b = columnarBook(kind, entries, accounts);
  const lines: PrintLine[] = [];
  for (const r of b.rows) {
    const particulars = [r.party, r.tin ? `TIN ${r.tin}` : null].filter(Boolean).join(" · ") || r.particulars;
    const first = r.sundry[0];
    lines.push({
      text: { date: fmtDay(r.date), ref: r.reference ?? "", particulars, sundry: first?.account ?? "" },
      money: { ...r.amounts, ...(first ? { sundry_dr: first.debit, sundry_cr: first.credit } : {}) },
    });
    for (const s of r.sundry.slice(1)) lines.push({ text: { sundry: s.account }, money: { sundry_dr: s.debit, sundry_cr: s.credit } });
  }
  const moneyCols: PrintColumn[] = b.columns.map((c) => ({ key: c.key, label: c.label, kind: "money" }));
  return {
    kind, title, orientation: moneyCols.length > 3 ? "landscape" : "portrait", lines,
    carry: [...b.columns.map((c) => c.key), "sundry_dr", "sundry_cr"],
    columns: [
      { key: "date", label: "Date", kind: "text", width: 1.1 },
      { key: "ref", label: kind === "cash_disbursements" ? "CV / Check No." : kind === "cash_receipts" ? "OR No." : "Invoice No.", kind: "text", width: 1.4 },
      { key: "particulars", label: kind === "cash_receipts" || kind === "sales" ? "Customer / Particulars" : "Payee / Particulars", kind: "text", width: 4 },
      ...moneyCols,
      { key: "sundry", label: "Sundry Account", kind: "text", width: 2.6 },
      { key: "sundry_dr", label: "Sundry Dr", kind: "money" },
      { key: "sundry_cr", label: "Sundry Cr", kind: "money" },
    ],
  };
}

export const LINES_PER_PAGE = { portrait: 40, landscape: 28 } as const;

export interface PrintPage {
  number: number;
  /** Exactly linesPerPage lines (blank ones included). */
  lines: (PrintLine | null)[];
}

/**
 * Pages of `perPage` ruled lines. With carried columns, each page but the first
 * opens with "Brought forward" and each page but the last closes with "Carried
 * forward"; the last page closes with the totals. Pages are numbered from
 * `firstNumber`.
 */
export function pageBook(book: PrintBook, perPage: number, firstNumber: number): PrintPage[] {
  const carry = book.carry.length > 0;
  const body = carry ? perPage - 2 : perPage;
  const pages: PrintPage[] = [];
  const running: Record<string, Centavos> = Object.fromEntries(book.carry.map((k) => [k, 0]));
  let i = 0;
  let n = firstNumber;
  do {
    const lines: (PrintLine | null)[] = [];
    if (carry && pages.length > 0) lines.push({ text: { particulars: "Brought forward" }, money: { ...running }, style: "total" });
    const room = body - (carry && pages.length === 0 ? -1 : 0);
    let chunk = book.lines.slice(i, i + room);
    // A General Ledger page that starts inside an account repeats its title.
    if (book.kind === "general_ledger" && i > 0 && chunk[0]?.style !== "heading") {
      const heading = [...book.lines.slice(0, i)].reverse().find((l) => l.style === "heading");
      if (heading) chunk = [{ ...heading, text: { particulars: `${heading.text.particulars} (continued)` } }, ...book.lines.slice(i, i + room - 1)];
      i += chunk.length - 1;
    } else {
      i += chunk.length;
    }
    for (const l of chunk) {
      lines.push(l);
      if (l.style !== "total") for (const k of book.carry) running[k] += l.money[k] ?? 0;
    }
    const last = i >= book.lines.length;
    if (carry) {
      while (lines.length < perPage - 1) lines.push(null);
      lines.push({ text: { particulars: last ? "Totals" : "Carried forward" }, money: { ...running }, style: "total" });
    }
    while (lines.length < perPage) lines.push(null);
    pages.push({ number: n++, lines });
  } while (i < book.lines.length);
  return pages;
}

/** How many pages the book fills (to number a period's pages on from the earlier months of the year). */
export const pageCount = (book: PrintBook, perPage: number) => (book.lines.length === 0 ? 0 : pageBook(book, perPage, 1).length);

/** "11,200" and "00" for a money cell; empty for zero. Negatives in parentheses. */
export function splitAmount(c: Centavos | undefined): [string, string] {
  if (!c) return ["", ""];
  const a = Math.abs(c);
  const pesos = new Intl.NumberFormat("en-PH").format(Math.floor(a / 100));
  const cents = String(a % 100).padStart(2, "0");
  return c < 0 ? [`(${pesos}`, `${cents})`] : [pesos, cents];
}

