/**
 * Parallel run (docs/REWORK.md, "What changes underneath"): the returns' figures from the
 * old register beside the same figures from the Books by tax code, month by month, to the
 * centavo. Pure: load.ts does the querying.
 *
 *   Old  register_lines, read as the return worksheets read them before the Books
 *        (source.ts fromRegisterLine, then the worksheets' own VAT split, vatSplit).
 *   New  books_parallel_run (the query books_return_sources runs for a filing), read as
 *        the worksheets read it (fromBooksRow).
 *
 * A month agrees when every compared figure, every SLS / SLP party and every SAWT / QAP
 * ATC is the same on both sides. Documents are matched by their id: a register line's
 * document_id with a Book invoice's document_id (sales and purchases) or cwt_document_id
 * (2307s received). The lists of documents only on one side explain a difference; they do
 * not decide it.
 */
import { atcInfo, atcKind } from "@/lib/returns/forms/business/atc";
import { netOfVat, tinDigits, vatSplit } from "@/lib/returns/forms/business/util";
import { lookupAtc, normalizeAtc } from "@/lib/returns/atc";
import { grossUp } from "@/lib/returns/money";
import { vatRate } from "@/lib/returns/rates";
import { fromBooksRow, fromRegisterLine, type BooksSourceRow, type RegisterSourceRow } from "@/lib/returns/source";
import type { Centavos, SourceDocument } from "@/lib/returns/types";

/** A row of books_parallel_run: a books_return_sources row plus the 2307 behind a Sales Invoice's CWT. */
export interface ParallelBooksRow extends BooksSourceRow {
  cwt_document_id: string | null;
}

/** A posted, not void Book invoice, for matching with the register. */
export interface BookInvoiceRow {
  id: string;
  kind: "sales" | "purchase";
  issue_date: string;
  reference: string | null;
  party_name: string | null;
  total: string | number;
  document_id: string | null;
  cwt_document_id: string | null;
  /** Year-end decision on a missing 2307 (decision 12): 'stop' leaves the CWT off the SAWT. */
  cwt_claim?: string | null;
}

export interface ParallelRunInput {
  /** First days ("YYYY-MM-01") of the months to compare. */
  months: string[];
  /** VAT-registered in the month: an open 2550Q obligation (as the worksheets decide). */
  vatRegistered: (month: string) => boolean;
  register: RegisterSourceRow[];
  books: ParallelBooksRow[];
  /** Posted, not void Book invoices dated in the months. */
  invoices: BookInvoiceRow[];
  /** Where documents of one side that are not in the months sit on the other side (see unmatchedIds). */
  elsewhere?: {
    /** document_id → month of its register line, for documents of invoices in the months. */
    registerMonth?: Map<string, string>;
    /** Book invoices outside the months whose document (or 2307) has a register line in the months. */
    invoices?: BookInvoiceRow[];
  };
}

export type FigureGroup = "sales" | "purchases";

export interface Figure {
  key: string;
  label: string;
  old: Centavos;
  new: Centavos;
  /** False when the figure is on none of this client's returns that month (shown, not counted). */
  compared: boolean;
}

export interface PartyComparison {
  key: string;
  name: string;
  tin: string;
  old: Record<string, Centavos>;
  new: Record<string, Centavos>;
  agrees: boolean;
}

export type WithholdingKind = "cwt" | "vat" | "percentage" | "ewt";

export interface AtcComparison {
  atc: string;
  kind: WithholdingKind;
  desc: string;
  old: { base: Centavos; withheld: Centavos; count: number };
  new: { base: Centavos; withheld: Centavos; count: number };
  agrees: boolean;
}

export type DocumentReason = "old_only" | "new_only" | "other_month" | "figures";

export interface DocumentDifference {
  reason: DocumentReason;
  kind: "sale" | "purchase" | "cwt";
  documentId: string | null;
  invoiceId: string | null;
  date: string | null;
  reference: string | null;
  party: string | null;
  /** What the side counts on the returns (net of VAT plus VAT; CWT for a 2307); null when the side has none. */
  old: Centavos | null;
  new: Centavos | null;
  /** The month the other side counts it in. */
  otherMonth?: string;
  note: string;
}

export type MonthStatus = "agree" | "differ" | "no_old" | "empty";

export interface MonthComparison {
  month: string;
  vatRegistered: boolean;
  status: MonthStatus;
  sales: Figure[];
  purchases: Figure[];
  sls: PartyComparison[];
  slp: PartyComparison[];
  sawt: AtcComparison[];
  qap: AtcComparison[];
  documents: DocumentDifference[];
  counts: { old: number; new: number };
}

export const SLS_COLUMNS = [
  ["vatable", "VATable"],
  ["exempt", "Exempt"],
  ["zeroRated", "Zero-rated"],
  ["vat", "Output VAT"],
] as const;

export const SLP_COLUMNS = [
  ["capital", "Capital goods"],
  ["goods", "Other goods"],
  ["services", "Services"],
  ["exempt", "Exempt"],
  ["zeroRated", "Zero-rated"],
  ["nonVat", "Non-VAT"],
  ["vat", "Input VAT"],
] as const;

export const WITHHOLDING_LABELS: Record<WithholdingKind, string> = {
  cwt: "CWT received (SAWT)",
  vat: "VAT withheld (SAWT, WV)",
  percentage: "Percentage tax withheld (SAWT, WB)",
  ewt: "EWT withheld (QAP)",
};

export const STATUS_LABELS: Record<MonthStatus, string> = { agree: "Agrees", differ: "Differs", no_old: "No old data", empty: "Nothing either side" };

const monthOf = (iso: string) => `${String(iso).slice(0, 7)}-01`;
const sumOf = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const NO_ATC = "(no ATC)";

/** Old side: register lines as SourceDocuments (one per document). */
function oldDocs(rows: RegisterSourceRow[]): SourceDocument[] {
  return rows.map(fromRegisterLine);
}

/** New side: the Books rows as SourceDocuments, with the client's decision to stop claiming a missing 2307 (as load.ts). */
function newDocs(rows: ParallelBooksRow[], invoices: BookInvoiceRow[]): SourceDocument[] {
  const stopped = new Set(invoices.filter((i) => i.cwt_claim === "stop").map((i) => i.id));
  return rows.map((r) => {
    const d = fromBooksRow(r);
    if (d.docType === "bir_2307_received" && d.cwtSupported === false && stopped.has(d.id) && !(d.taxCode ?? "").startsWith("WV")) d.cwtStopped = true;
    return d;
  });
}

interface SaleSplit {
  doc: SourceDocument;
  vatable: Centavos;
  exempt: Centavos;
  zeroRated: Centavos;
  vat: Centavos;
  nonVat: Centavos;
}

/** A sale or purchase as its returns read it: the worksheets' VAT split (old figures may be inferred from a bare total). */
function split(d: SourceDocument, side: "sale" | "purchase"): SaleSplit {
  const s = vatSplit(d, side, vatRate(d.month));
  return { doc: d, vatable: s.vatable, exempt: s.exempt, zeroRated: s.zeroRated, vat: s.vat, nonVat: d.nonVat ?? 0 };
}

/** As read, nothing inferred: for a non-VAT client's month, where the VAT split is on no return. */
function raw(d: SourceDocument): SaleSplit {
  return { doc: d, vatable: d.vatable, exempt: d.vatExempt, zeroRated: d.zeroRated, vat: d.vat, nonVat: d.nonVat ?? 0 };
}

/** The SLP column of a purchase's VATable amount: the register's or the tax code's category, else other goods (as the 2550Q). */
const slpColumn = (d: SourceDocument): "capital" | "services" | "goods" =>
  d.slpCategory === "capital_goods" ? "capital" : d.slpCategory === "services" ? "services" : "goods";

/** Same party on the SLS / SLP: the first 9 digits of the TIN, else the name (as the 2550Q). */
export const partyKeyOf = (d: SourceDocument) => {
  const tin = tinDigits(d.partyTin).substring(0, 9);
  return tin || `n:${(d.partyName ?? "").trim().toUpperCase()}`;
};

function partyRows(
  oldRows: SaleSplit[],
  newRows: SaleSplit[],
  columns: readonly (readonly [string, string])[],
  values: (s: SaleSplit) => Record<string, Centavos>,
): PartyComparison[] {
  const out = new Map<string, PartyComparison>();
  const zero = () => Object.fromEntries(columns.map(([k]) => [k, 0])) as Record<string, Centavos>;
  const add = (side: "old" | "new", s: SaleSplit) => {
    const v = values(s);
    if (Object.values(v).every((x) => x === 0)) return;
    const key = partyKeyOf(s.doc);
    const p = out.get(key) ?? { key, name: s.doc.partyName ?? "", tin: s.doc.partyTin ?? "", old: zero(), new: zero(), agrees: true };
    if (!p.name && s.doc.partyName) p.name = s.doc.partyName;
    if (!p.tin && s.doc.partyTin) p.tin = s.doc.partyTin;
    for (const [k] of columns) p[side][k] += v[k] ?? 0;
    out.set(key, p);
  };
  for (const s of oldRows) add("old", s);
  for (const s of newRows) add("new", s);
  const rows = [...out.values()];
  for (const p of rows) p.agrees = columns.every(([k]) => p.old[k] === p.new[k]);
  return rows.sort((a, b) => Number(a.agrees) - Number(b.agrees) || a.name.localeCompare(b.name) || a.key.localeCompare(b.key));
}

const slsValues = (s: SaleSplit) => ({ vatable: s.vatable, exempt: s.exempt, zeroRated: s.zeroRated, vat: s.vat });
const slpValues = (s: SaleSplit) => {
  const col = slpColumn(s.doc);
  return {
    capital: col === "capital" ? s.vatable : 0,
    goods: col === "goods" ? s.vatable : 0,
    services: col === "services" ? s.vatable : 0,
    exempt: s.exempt,
    zeroRated: s.zeroRated,
    nonVat: s.nonVat,
    vat: s.vat,
  };
};

interface Bucket {
  atc: string;
  kind: WithholdingKind;
  desc: string;
  base: Centavos;
  withheld: Centavos;
  count: number;
}

/** CWT / VAT / percentage tax withheld by customers per ATC, as the SAWT counts it (income payment: the total, else grossed up). */
function sawtBuckets(docs: SourceDocument[]): Map<string, Bucket> {
  const out = new Map<string, Bucket>();
  for (const d of docs) {
    if (d.docType !== "bir_2307_received") continue;
    if (d.fromBooks && d.withholding <= 0) continue;
    if (d.cwtStopped) continue;
    const atc = normalizeAtc(d.atc);
    const info = atc ? atcInfo(atc) : null;
    const k = atc ? atcKind(atc) : "income";
    const kind: WithholdingKind = k === "income" ? "cwt" : k;
    const base = d.total > 0 ? d.total : info?.rate ? grossUp(d.withholding, info.rate) : 0;
    const key = atc ?? NO_ATC;
    const b = out.get(key) ?? { atc: key, kind, desc: info?.desc ?? (atc ? "Not in the ATC table" : "No ATC: on no SAWT"), base: 0, withheld: 0, count: 0 };
    b.base += base;
    b.withheld += d.withholding;
    b.count += 1;
    out.set(key, b);
  }
  return out;
}

/** EWT the client withheld per ATC, as the QAP counts it (income payment: the total, else grossed up). */
function qapBuckets(docs: SourceDocument[]): Map<string, Bucket> {
  const out = new Map<string, Bucket>();
  for (const d of docs) {
    if (d.docType !== "bir_2307_issued") continue;
    if (d.fromBooks && d.withholding <= 0) continue;
    const atc = normalizeAtc(d.atc);
    const info = atc ? lookupAtc(atc) : null;
    const base = d.total > 0 ? d.total : info?.rate ? grossUp(d.withholding, info.rate) : 0;
    const key = atc ?? NO_ATC;
    const b = out.get(key) ?? { atc: key, kind: "ewt" as const, desc: info?.desc ?? (atc ? "Not in the ATC table" : "No ATC: on no QAP"), base: 0, withheld: 0, count: 0 };
    b.base += base;
    b.withheld += d.withholding;
    b.count += 1;
    out.set(key, b);
  }
  return out;
}

function atcRows(oldB: Map<string, Bucket>, newB: Map<string, Bucket>): AtcComparison[] {
  const keys = [...new Set([...oldB.keys(), ...newB.keys()])];
  const empty = { base: 0, withheld: 0, count: 0 };
  return keys
    .map((atc) => {
      const o = oldB.get(atc);
      const n = newB.get(atc);
      const old = o ? { base: o.base, withheld: o.withheld, count: o.count } : empty;
      const nw = n ? { base: n.base, withheld: n.withheld, count: n.count } : empty;
      return { atc, kind: (o ?? n)!.kind, desc: (n ?? o)!.desc, old, new: nw, agrees: old.base === nw.base && old.withheld === nw.withheld };
    })
    .sort((a, b) => a.kind.localeCompare(b.kind) || a.atc.localeCompare(b.atc));
}

/** What a sale or purchase counts on the returns: net of VAT (every column) plus VAT. */
const returnsAmount = (s: SaleSplit) => s.vatable + s.exempt + s.zeroRated + s.nonVat + s.vat;

const KIND_OF_DOC = { sales_invoice: "sale", purchase_receipt: "purchase", bir_2307_received: "cwt" } as const;
const fmtMonthShort = (m: string) => m.slice(0, 7);

/**
 * The document ids the loader still has to look up on the other side, outside the months:
 * register documents (sales, purchases, 2307s received) with no Book invoice in the months,
 * and Book invoices whose document has no register line in the months.
 */
export function unmatchedIds(input: Pick<ParallelRunInput, "register" | "invoices">): { registerDocs: string[]; cwtDocs: string[]; invoiceDocs: string[] } {
  const invDocs = new Set(input.invoices.map((i) => i.document_id).filter((x): x is string => !!x));
  const cwtDocs = new Set(input.invoices.map((i) => i.cwt_document_id).filter((x): x is string => !!x));
  const regDocs = new Set(input.register.map((r) => r.document_id));
  return {
    registerDocs: input.register.filter((r) => (r.kind === "sale" || r.kind === "purchase") && !invDocs.has(r.document_id)).map((r) => r.document_id),
    cwtDocs: input.register.filter((r) => r.kind === "cwt_received" && !cwtDocs.has(r.document_id)).map((r) => r.document_id),
    invoiceDocs: [...invDocs].filter((d) => !regDocs.has(d)),
  };
}

/** The parallel run for each month of the input. */
export function compareParallelRun(input: ParallelRunInput): MonthComparison[] {
  const oldAll = oldDocs(input.register);
  const newAll = newDocs(input.books, input.invoices);
  const allInvoices = [...input.invoices, ...(input.elsewhere?.invoices ?? [])];
  const invoiceByDoc = new Map<string, BookInvoiceRow>();
  const invoicesByCwt = new Map<string, BookInvoiceRow[]>();
  for (const i of allInvoices) {
    if (i.document_id) invoiceByDoc.set(i.document_id, i);
    if (i.cwt_document_id) invoicesByCwt.set(i.cwt_document_id, [...(invoicesByCwt.get(i.cwt_document_id) ?? []), i]);
  }
  const registerMonth = new Map<string, string>(input.elsewhere?.registerMonth ?? []);
  for (const r of input.register) registerMonth.set(r.document_id, monthOf(r.month));

  return input.months.map((m) => {
    const month = monthOf(m);
    const vat = input.vatRegistered(month);
    const od = oldAll.filter((d) => monthOf(d.month) === month);
    const nd = newAll.filter((d) => monthOf(d.month) === month);
    const pick = vat ? split : (d: SourceDocument) => raw(d);
    const oSales = od.filter((d) => d.docType === "sales_invoice").map((d) => pick(d, "sale"));
    const nSales = nd.filter((d) => d.docType === "sales_invoice").map((d) => pick(d, "sale"));
    const oPurch = od.filter((d) => d.docType === "purchase_receipt").map((d) => split(d, "purchase"));
    const nPurch = nd.filter((d) => d.docType === "purchase_receipt").map((d) => split(d, "purchase"));
    const total = (xs: SaleSplit[], f: (s: SaleSplit) => number) => sumOf(xs.map(f));
    const uncoded = (docType: SourceDocument["docType"]) => sumOf(nd.filter((d) => d.docType === docType).map((d) => d.uncoded ?? 0));

    const fig = (key: string, label: string, old: Centavos, nw: Centavos, compared = true): Figure => ({ key, label, old, new: nw, compared });
    const sales: Figure[] = [
      fig("vatable", "VATable sales", total(oSales, (s) => s.vatable), total(nSales, (s) => s.vatable), vat),
      fig("exempt", "VAT-exempt sales", total(oSales, (s) => s.exempt), total(nSales, (s) => s.exempt), vat),
      fig("zero_rated", "Zero-rated sales", total(oSales, (s) => s.zeroRated), total(nSales, (s) => s.zeroRated), vat),
      fig("non_vat", "Non-VAT sales", total(oSales, (s) => s.nonVat), total(nSales, (s) => s.nonVat), vat),
      fig("output_vat", "Output VAT", total(oSales, (s) => s.vat), total(nSales, (s) => s.vat), vat),
    ];
    if (!vat) {
      // A non-VAT client's percentage tax base (2551Q): every sale net of VAT.
      const oDocs = od.filter((d) => d.docType === "sales_invoice");
      const nDocs = nd.filter((d) => d.docType === "sales_invoice");
      sales.push(fig("gross_sales", "Gross sales, net of VAT (2551Q)", sumOf(oDocs.map(netOfVat)), sumOf(nDocs.map(netOfVat))));
    }
    sales.push(fig("uncoded_sales", "Sales lines without a tax code", 0, uncoded("sales_invoice")));

    const pCol = (col: string) => (s: SaleSplit) => (slpColumn(s.doc) === col ? s.vatable : 0);
    const purchases: Figure[] = [
      fig("capital_goods", "Capital goods", total(oPurch, pCol("capital")), total(nPurch, pCol("capital")), vat),
      fig("other_goods", "Other goods", total(oPurch, pCol("goods")), total(nPurch, pCol("goods")), vat),
      fig("services", "Services", total(oPurch, pCol("services")), total(nPurch, pCol("services")), vat),
      fig("exempt", "VAT-exempt purchases", total(oPurch, (s) => s.exempt), total(nPurch, (s) => s.exempt), vat),
      fig("zero_rated", "Zero-rated purchases", total(oPurch, (s) => s.zeroRated), total(nPurch, (s) => s.zeroRated), vat),
      fig("non_vat", "Non-VAT purchases", total(oPurch, (s) => s.nonVat), total(nPurch, (s) => s.nonVat), vat),
      fig("input_vat", "Input VAT", total(oPurch, (s) => s.vat), total(nPurch, (s) => s.vat), vat),
      fig("uncoded_purchases", "Purchase lines without a tax code", 0, uncoded("purchase_receipt"), vat),
    ];

    const sls = vat ? partyRows(oSales, nSales, SLS_COLUMNS, slsValues) : [];
    const slp = vat ? partyRows(oPurch, nPurch, SLP_COLUMNS, slpValues) : [];
    const sawt = atcRows(sawtBuckets(od), sawtBuckets(nd));
    const qap = atcRows(qapBuckets(od), qapBuckets(nd));

    // Documents on one side only, in another month, or with other figures.
    const documents: DocumentDifference[] = [];
    const newByInvoice = new Map<string, SaleSplit[]>();
    for (const s of [...nSales, ...nPurch]) newByInvoice.set(s.doc.id, [...(newByInvoice.get(s.doc.id) ?? []), s]);
    for (const s of [...oSales, ...oPurch]) {
      const d = s.doc;
      const kind = KIND_OF_DOC[d.docType as "sales_invoice" | "purchase_receipt"];
      const inv = invoiceByDoc.get(d.id);
      const base = { kind, documentId: d.id, date: d.date, reference: d.number, party: d.partyName, old: returnsAmount(s) } as const;
      if (!inv) {
        documents.push({ ...base, reason: "old_only", invoiceId: null, new: null, note: "No Book invoice was posted from this document." });
        continue;
      }
      const invMonth = monthOf(inv.issue_date);
      if (invMonth !== month) {
        documents.push({ ...base, reason: "other_month", invoiceId: inv.id, new: null, otherMonth: invMonth, note: `In the Books in ${fmtMonthShort(invMonth)} (the invoice date); in the register in ${fmtMonthShort(month)}.` });
        continue;
      }
      const nw = sumOf((newByInvoice.get(inv.id) ?? []).map(returnsAmount));
      const nVat = sumOf((newByInvoice.get(inv.id) ?? []).map((x) => x.vat));
      if (nw !== base.old || nVat !== s.vat)
        documents.push({ ...base, reason: "figures", invoiceId: inv.id, new: nw, note: nVat !== s.vat ? "The VAT differs." : "The amounts on the returns differ." });
    }
    for (const d of od.filter((x) => x.docType === "bir_2307_received")) {
      const invs = invoicesByCwt.get(d.id) ?? [];
      const base = { kind: "cwt" as const, documentId: d.id, date: d.date, reference: d.number, party: d.partyName, old: d.withholding };
      if (invs.length === 0) {
        documents.push({ ...base, reason: "old_only", invoiceId: null, new: null, note: "This 2307 supports no Sales Invoice in the Books; its tax is not on the new SAWT unless an invoice carries it." });
        continue;
      }
      const months = [...new Set(invs.map((i) => monthOf(i.issue_date)))].sort();
      if (months.some((x) => x !== month))
        documents.push({ ...base, reason: "other_month", invoiceId: invs[0].id, new: null, otherMonth: months.find((x) => x !== month), note: `The Books claim it in the month of the Sales Invoice (${months.map(fmtMonthShort).join(", ")}); the register in the month of the 2307 (${fmtMonthShort(month)}).` });
    }
    const listed = new Set<string>();
    for (const inv of input.invoices) {
      if (monthOf(inv.issue_date) !== month || listed.has(inv.id)) continue;
      listed.add(inv.id);
      const rows = newByInvoice.get(inv.id) ?? [];
      const base = { kind: inv.kind === "sales" ? ("sale" as const) : ("purchase" as const), invoiceId: inv.id, date: inv.issue_date.slice(0, 10), reference: inv.reference, party: inv.party_name, new: sumOf(rows.map(returnsAmount)) };
      if (!inv.document_id) {
        documents.push({ ...base, reason: "new_only", documentId: null, old: null, note: rows.length ? "Entered in the Books; no document, so no register line." : "Entered in the Books; on no return (ND / NR lines only)." });
        continue;
      }
      const rm = registerMonth.get(inv.document_id);
      if (!rm) documents.push({ ...base, reason: "new_only", documentId: inv.document_id, old: null, note: "Its document has no register line (not approved, or not a sales invoice or purchase receipt)." });
      else if (rm !== month) documents.push({ ...base, reason: "other_month", documentId: inv.document_id, old: null, otherMonth: rm, note: `In the register in ${fmtMonthShort(rm)} (the document's month); in the Books in ${fmtMonthShort(month)}.` });
    }

    const counts = { old: od.length, new: new Set(nd.map((d) => d.id)).size };
    const agrees =
      [...sales, ...purchases].every((f) => !f.compared || f.old === f.new) && sls.every((p) => p.agrees) && slp.every((p) => p.agrees) && sawt.every((a) => a.agrees) && qap.every((a) => a.agrees);
    const hasOld = input.register.some((r) => monthOf(r.month) === month);
    const status: MonthStatus = !hasOld ? (counts.new === 0 ? "empty" : "no_old") : agrees ? "agree" : "differ";
    return { month, vatRegistered: vat, status, sales, purchases, sls, slp, sawt, qap, documents, counts };
  });
}

/** Whether a figure differs (and counts). */
export const differs = (f: Figure) => f.compared && f.old !== f.new;

/** Months of a client from the obligations: VAT-registered when a 2550Q obligation is open at any time in the month. */
export function vatMonths(obligations: { start_date: string; end_date: string | null }[]): (month: string) => boolean {
  return (month) => {
    const from = monthOf(month);
    const [y, mo] = from.split("-").map(Number);
    const to = new Date(Date.UTC(y, mo, 0)).toISOString().slice(0, 10);
    return obligations.some((o) => String(o.start_date).slice(0, 10) <= to && (o.end_date == null || String(o.end_date).slice(0, 10) >= from));
  };
}
