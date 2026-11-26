/**
 * The 2307 tracker: CWT customers withheld on the client's Sales Invoices beside the
 * 2307s the client sent us (database function cwt_2307_tracker, migration
 * 20261217000001), per customer and per quarter of the taxable year. Also why a 2307 did
 * not match an invoice (private.mark_cwt_supported: the customer's invoices in the 2307's
 * calendar quarter, then the quarter before; same ATC; one invoice of exactly the 2307's
 * amount, else the oldest invoices while their CWT adds up to no more than the 2307).
 */

export interface TrackerInvoice {
  invoice_id: string;
  issue_date: string;
  reference: string | null;
  party_key: string;
  party_name: string | null;
  party_tin: string | null;
  atc: string | null;
  withholding: string | number;
  /** The 2307 that supports it. */
  document_id: string | null;
  followed_up_at: string | null;
  follow_up_note: string | null;
  claim: "keep" | "stop" | null;
  locked: boolean;
}

export interface TrackerDocument {
  document_id: string;
  status: "received" | "under_review" | "posted";
  approved: boolean;
  file_name: string;
  date: string;
  number: string | null;
  party_key: string;
  party_name: string | null;
  party_tin: string | null;
  atc: string | null;
  withholding: string | number;
  created_at: string;
}

export interface TrackerData {
  months: { month: string; locked: boolean }[];
  invoices: TrackerInvoice[];
  documents: TrackerDocument[];
}

export type TrackerStatus = "complete" | "partial" | "missing";

export interface TrackerGroup {
  key: string;
  partyName: string;
  partyTin: string | null;
  quarter: Quarter;
  invoices: TrackerInvoice[];
  /** The distinct 2307s supporting these invoices. */
  documents: TrackerDocument[];
  /** CWT on the Sales Invoices. */
  cwt: number;
  /** Total of the 2307s received for them. */
  received: number;
  /** CWT less the 2307s received: positive while 2307s are still owed. */
  difference: number;
  /** CWT of the invoices no 2307 supports yet. */
  awaiting: number;
  status: TrackerStatus;
  /** Set when every invoice still waiting was followed up: the latest follow-up. */
  followedUpAt: string | null;
  /** Every invoice still waiting: the client decided not to claim it. */
  stopped: boolean;
}

export interface Quarter {
  /** 1 to 4 within the taxable year. */
  n: number;
  start: string;
  end: string;
  label: string;
}

const cents = (v: string | number | null | undefined) => Math.round(Number(v ?? 0) * 100);
const fromCents = (c: number) => c / 100;
const pad = (n: number) => String(n).padStart(2, "0");
const monthShort = new Intl.DateTimeFormat("en-PH", { month: "short", timeZone: "UTC" });
const short = (iso: string) => monthShort.format(new Date(`${iso.slice(0, 7)}-01T00:00:00Z`));

function addMonths(iso: string, k: number): string {
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7)) - 1 + k;
  const yy = y + Math.floor(m / 12);
  const mm = ((m % 12) + 12) % 12;
  return `${yy}-${pad(mm + 1)}-01`;
}
const lastDay = (monthStart: string) => {
  const next = addMonths(monthStart, 1);
  const d = new Date(`${next}T00:00:00Z`);
  d.setUTCDate(0);
  return d.toISOString().slice(0, 10);
};

/** The taxable year containing `date` for a year ending in `fyeMonth` (12 = calendar year). */
export function taxableYear(date: string, fyeMonth: number): { start: string; end: string; label: string } {
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const startMonth = (fyeMonth % 12) + 1;
  const startYear = m >= startMonth ? y : y - 1;
  const start = `${startYear}-${pad(startMonth)}-01`;
  const end = lastDay(addMonths(start, 11));
  const label = startMonth === 1 ? String(startYear) : `FY ending ${short(end)} ${end.slice(0, 4)}`;
  return { start, end, label };
}

/** The quarter of the taxable year (starting `yearStart`) that holds `date`. */
export function quarterOf(date: string, yearStart: string): Quarter {
  const months = (Number(date.slice(0, 4)) - Number(yearStart.slice(0, 4))) * 12 + Number(date.slice(5, 7)) - Number(yearStart.slice(5, 7));
  const n = Math.min(4, Math.max(1, Math.floor(months / 3) + 1));
  const start = addMonths(yearStart, (n - 1) * 3);
  const end = lastDay(addMonths(start, 2));
  return { n, start, end, label: `Q${n} · ${short(start)}–${short(end)} ${end.slice(0, 4)}` };
}

/** Customer × quarter rows, customers by name then quarter. */
export function buildTracker(data: TrackerData, yearStart: string): TrackerGroup[] {
  const docs = new Map(data.documents.map((d) => [d.document_id, d]));
  const groups = new Map<string, TrackerGroup>();
  for (const inv of data.invoices) {
    const quarter = quarterOf(inv.issue_date, yearStart);
    const key = `${inv.party_key}|${quarter.n}`;
    let g = groups.get(key);
    if (!g) {
      g = {
        key, partyName: inv.party_name?.trim() || "Customer", partyTin: inv.party_tin, quarter, invoices: [], documents: [],
        cwt: 0, received: 0, difference: 0, awaiting: 0, status: "missing", followedUpAt: null, stopped: false,
      };
      groups.set(key, g);
    }
    g.invoices.push(inv);
  }
  for (const g of groups.values()) {
    let cwt = 0;
    let awaiting = 0;
    const seen = new Set<string>();
    for (const inv of g.invoices) {
      cwt += cents(inv.withholding);
      if (!inv.document_id) {
        awaiting += cents(inv.withholding);
        continue;
      }
      if (seen.has(inv.document_id)) continue;
      seen.add(inv.document_id);
      const d = docs.get(inv.document_id);
      if (d) g.documents.push(d);
    }
    const received = g.documents.reduce((s, d) => s + cents(d.withholding), 0);
    const waiting = g.invoices.filter((i) => !i.document_id);
    g.cwt = fromCents(cwt);
    g.awaiting = fromCents(awaiting);
    g.received = fromCents(received);
    g.difference = fromCents(cwt - received);
    g.status = waiting.length === 0 ? "complete" : waiting.length === g.invoices.length ? "missing" : "partial";
    g.stopped = waiting.length > 0 && waiting.every((i) => i.claim === "stop");
    g.followedUpAt = waiting.length > 0 && waiting.every((i) => i.followed_up_at)
      ? waiting.map((i) => i.followed_up_at!).sort().at(-1)!
      : null;
  }
  return [...groups.values()].sort((a, b) => a.partyName.localeCompare(b.partyName) || a.quarter.n - b.quarter.n);
}

/** 2307s approved but supporting no invoice of the period, and 2307s still waiting for review. */
export function looseDocuments(data: TrackerData): { unmatched: TrackerDocument[]; pending: TrackerDocument[] } {
  const used = new Set(data.invoices.map((i) => i.document_id).filter(Boolean));
  return {
    unmatched: data.documents.filter((d) => d.status === "posted" && !used.has(d.document_id)),
    pending: data.documents.filter((d) => d.status !== "posted"),
  };
}

export interface TrackerTotals {
  cwt: number;
  received: number;
  awaiting: number;
  missing: number;
  partial: number;
}

export function trackerTotals(groups: TrackerGroup[]): TrackerTotals {
  const sum = (f: (g: TrackerGroup) => number) => fromCents(groups.reduce((s, g) => s + cents(f(g)), 0));
  return {
    cwt: sum((g) => g.cwt),
    received: sum((g) => g.received),
    awaiting: sum((g) => g.awaiting),
    missing: groups.filter((g) => g.status === "missing").length,
    partial: groups.filter((g) => g.status === "partial").length,
  };
}

export const STATUS_LABEL: Record<TrackerStatus, string> = { complete: "Complete", partial: "Partial", missing: "Missing" };
export const STATUS_TONE = { complete: "done", partial: "waiting", missing: "blocked" } as const satisfies Record<TrackerStatus, string>;

// ---------------------------------------------------------------------------
// Why a 2307 matched what it matched, or nothing.
// ---------------------------------------------------------------------------

/** A Sales Invoice of the 2307's customer, in the 2307's calendar quarter or the one before. */
export interface MatchCandidate {
  id: string;
  issue_date: string;
  reference: string | null;
  atc: string | null;
  withholding: number;
  /** The 2307 supporting it, if any. */
  document_id: string | null;
}

export interface MatchExplanation {
  /** The invoices this 2307 supports. */
  matched: MatchCandidate[];
  /** 2307 amount less the CWT of the invoices it supports (zero when it ties). */
  unexplained: number;
  /** Why nothing matched, in words; null when something matched. */
  reason: string | null;
}

/** First day of the calendar quarter of `date`. */
export const calendarQuarterStart = (date: string) => `${date.slice(0, 4)}-${pad(Math.floor((Number(date.slice(5, 7)) - 1) / 3) * 3 + 1)}-01`;

/** The window mark_cwt_supported searches: the calendar quarter before the 2307's, to the end of its own. */
export function matchWindow(date: string): { from: string; to: string; label: string } {
  const q = calendarQuarterStart(date);
  const from = addMonths(q, -3);
  const to = lastDay(addMonths(q, 2));
  return { from, to, label: `${short(from)} ${from.slice(0, 4)} to ${short(to)} ${to.slice(0, 4)}` };
}

const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

/**
 * What a 2307 supports and, when it supports nothing, the likeliest reason, following the
 * order mark_cwt_supported works in. `hasCustomer` is false when the 2307 has no payor TIN
 * the Books can tie to a customer.
 */
export function explainMatch(
  doc: { id: string; date: string; atc: string | null; withholding: number; approved: boolean },
  candidates: MatchCandidate[],
  hasCustomer: boolean,
): MatchExplanation {
  const matched = candidates.filter((c) => c.document_id === doc.id).sort((a, b) => a.issue_date.localeCompare(b.issue_date));
  const amount = cents(doc.withholding);
  if (matched.length) {
    return { matched, unexplained: fromCents(amount - matched.reduce((s, c) => s + cents(c.withholding), 0)), reason: null };
  }
  const w = matchWindow(doc.date);
  let reason: string;
  if (!doc.approved) reason = "Matched when the 2307 is approved.";
  else if (amount <= 0) reason = "The 2307 shows no tax withheld.";
  else if (!hasCustomer) reason = "The payor's TIN does not read as ###-###-###, so the 2307 cannot be tied to a customer. Correct the TIN.";
  else {
    const inWindow = candidates.filter((c) => c.issue_date >= w.from && c.issue_date <= w.to && c.withholding > 0);
    const open = inWindow.filter((c) => !c.document_id);
    const atc = doc.atc?.toUpperCase() ?? null;
    const sameAtc = open.filter((c) => !atc || !c.atc || c.atc.toUpperCase() === atc);
    if (inWindow.length === 0) {
      reason = `No Sales Invoice with tax withheld for this customer from ${w.label}. Key the invoice in the Books (with its WC / WI code), then match again.`;
    } else if (open.length === 0) {
      reason = `Every Sales Invoice with tax withheld for this customer from ${w.label} already has its 2307. This may be a duplicate, or the invoice is in another quarter.`;
    } else if (sameAtc.length === 0) {
      const codes = [...new Set(open.map((c) => c.atc).filter(Boolean))].join(", ");
      reason = `The open invoices of this customer use ${codes}; this 2307 says ${atc}. Correct the ATC on the 2307 or the withholding code on the invoice.`;
    } else {
      // Oldest first, adding while the total stays within the 2307: the earliest decides.
      const earliest = [...sameAtc].sort((a, b) => a.issue_date.localeCompare(b.issue_date))[0];
      const name = earliest.reference ? `invoice ${earliest.reference}` : "open invoice";
      reason = cents(earliest.withholding) > amount
        ? `The 2307 (${php.format(fromCents(amount))}) is less than the tax withheld on the earliest ${name} (${php.format(earliest.withholding)}). Check the amount on the 2307 or the invoice.`
        : "An invoice fits now (it was probably keyed after the 2307 was approved). Match again.";
    }
  }
  return { matched: [], unexplained: fromCents(amount), reason };
}
