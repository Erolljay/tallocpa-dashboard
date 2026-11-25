import "server-only";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireStaff } from "@/lib/auth";
import { toCentavos } from "@/lib/returns/money";
import { supabaseServer } from "@/lib/supabase/server";
import type { OpenItem } from "./arap";
import type { BookEntry } from "./books";
import type { BooksReader } from "./loose-leaf";
import type { OpeningItem } from "./opening";
import { defaultCashFlow, type CashFlowClass } from "./cash-flow";
import { buildStatements, reportPeriod, taxableYearStart, type ReportKind, type StatementRow } from "./statements";
import type { AccountType, Book, Centavos, Control, EntrySource, LedgerAccount, NormalSide, TemplateCode } from "./types";

export interface BooksClient {
  id: string;
  name: string;
  tin: string | null;
  taxpayer_type: string;
  registered_address: string | null;
  book_type: "manual" | "loose_leaf";
  fiscal_year_end_month: number;
}

export interface ClientBooks {
  template: TemplateCode;
  booksStart: string;
  permit: string | null;
}

/**
 * The client whose books a staff screen shows: the Owner and staff assigned to
 * the client keep the books (RLS and the ledger functions enforce the same);
 * anyone else gets 404.
 */
export async function booksAccess(clientId: string) {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: client } = await supabase.from("clients").select("id, name, tin, taxpayer_type, registered_address, book_type, fiscal_year_end_month").eq("id", clientId).maybeSingle();
  if (!client) notFound();
  if (me.staff.role !== "owner") {
    const { data: a } = await supabase.from("staff_assignments").select("user_id").eq("client_id", clientId).eq("user_id", me.userId).limit(1);
    if (!a?.length) notFound();
  }
  const { data: b } = await supabase.from("client_books").select("template, books_start, books_permit").eq("client_id", clientId).maybeSingle();
  const books: ClientBooks | null = b ? { template: b.template as TemplateCode, booksStart: b.books_start as string, permit: (b.books_permit as string | null) ?? null } : null;
  return { me, supabase, client: client as BooksClient, books };
}

const ACCOUNT_COLUMNS = "id, template_key, code, name, type, normal_side, fs_line, bir_line, control, cash_flow, active, sort_order";

export function accountFromRow(r: Record<string, unknown>): LedgerAccount {
  return {
    id: r.id as string,
    key: (r.template_key as string | null) ?? null,
    code: r.code as string,
    name: r.name as string,
    type: r.type as AccountType,
    normalSide: r.normal_side as NormalSide,
    fsLine: r.fs_line as string,
    birLine: (r.bir_line as string | null) ?? null,
    control: (r.control as Control | null) ?? null,
    cashFlow: (r.cash_flow as CashFlowClass | null) ?? null,
    active: r.active as boolean,
    sortOrder: r.sort_order as number,
  };
}

export async function loadAccounts(supabase: SupabaseClient, clientId: string): Promise<LedgerAccount[]> {
  const { data, error } = await supabase.from("ledger_accounts").select(ACCOUNT_COLUMNS).eq("client_id", clientId).order("sort_order").order("code");
  if (error) throw new Error(`Could not load the chart of accounts: ${error.message}`);
  return (data ?? []).map((r) => accountFromRow(r as Record<string, unknown>));
}

const cents = (v: unknown): Centavos => toCentavos(v as string | number) ?? 0;

/** The opening entry's balances by account (debit positive) and its open items. */
export async function loadOpening(supabase: SupabaseClient, clientId: string) {
  const { data: entry } = await supabase.from("journal_entries").select("id, entry_date, posted_at").eq("client_id", clientId).eq("source", "opening").maybeSingle();
  const balances = new Map<string, Centavos>();
  const items: OpeningItem[] = [];
  if (entry) {
    const [lines, open] = await Promise.all([
      supabase.from("journal_lines").select("account_id, debit, credit").eq("entry_id", entry.id),
      supabase.from("open_items").select("kind, party_name, party_tin, doc_number, doc_date, due_date, amount").eq("source_entry_id", entry.id).order("party_name"),
    ]);
    for (const l of lines.data ?? []) balances.set(l.account_id, (balances.get(l.account_id) ?? 0) + cents(l.debit) - cents(l.credit));
    for (const o of open.data ?? []) {
      items.push({ kind: o.kind, partyName: o.party_name, partyTin: o.party_tin, docNumber: o.doc_number, docDate: o.doc_date, dueDate: o.due_date, amount: cents(o.amount) });
    }
  }
  return { entry: entry as { id: string; entry_date: string; posted_at: string } | null, balances, items };
}

export interface TbRowOut {
  accountId: string;
  code: string;
  name: string;
  type: AccountType;
  normalSide: NormalSide;
  fsLine: string;
  control: Control | null;
  cashFlow: CashFlowClass;
  opening: Centavos;
  debit: Centavos;
  credit: Centavos;
  closing: Centavos;
}

/** The trial balance of `from`…`to`: `trial_balance` for staff, `portal_trial_balance` (locked months only) for the portal. */
export async function loadTrialBalance(supabase: SupabaseClient, clientId: string, from: string, to: string, rpc: "trial_balance" | "portal_trial_balance" = "trial_balance"): Promise<TbRowOut[]> {
  const { data, error } = await supabase.rpc(rpc, { p_client: clientId, p_from: from, p_to: to });
  if (error) throw new Error(`Could not load the trial balance: ${error.message}`);
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    accountId: r.account_id as string,
    code: r.code as string,
    name: r.name as string,
    type: r.type as AccountType,
    normalSide: r.normal_side as NormalSide,
    fsLine: r.fs_line as string,
    control: (r.control as Control | null) ?? null,
    cashFlow: (r.cash_flow as CashFlowClass | null) ?? defaultCashFlow({ fsLine: r.fs_line as string, control: (r.control as Control | null) ?? null, normalSide: r.normal_side as NormalSide }),
    opening: cents(r.opening),
    debit: cents(r.debit),
    credit: cents(r.credit),
    closing: cents(r.closing),
  }));
}

export interface EntryLineOut {
  lineNo: number;
  accountId: string;
  description: string | null;
  debit: Centavos;
  credit: Centavos;
}

export interface EntryOut {
  id: string;
  date: string;
  book: Book;
  source: EntrySource;
  status: "suggested" | "posted" | "reversed";
  reference: string | null;
  memo: string;
  reverses: string | null;
  lines: EntryLineOut[];
}

/** Entries (newest first, or oldest first for suggestions), with their lines. `suggested`: only the suggestions waiting to be confirmed; otherwise the rest. */
export async function loadEntries(supabase: SupabaseClient, clientId: string, limit = 50, suggested = false): Promise<EntryOut[]> {
  let q = supabase
    .from("journal_entries")
    .select("id, entry_date, book, source, status, reference, memo, reverses, created_at, journal_lines(line_no, account_id, description, debit, credit)")
    .eq("client_id", clientId);
  q = suggested ? q.eq("status", "suggested") : q.neq("status", "suggested");
  const { data, error } = await q
    .order("entry_date", { ascending: !suggested ? false : true })
    .order("created_at", { ascending: !suggested ? false : true })
    .limit(limit);
  if (error) throw new Error(`Could not load journal entries: ${error.message}`);
  return (data ?? []).map((e) => ({
    id: e.id,
    date: e.entry_date,
    book: e.book as Book,
    source: e.source as EntrySource,
    status: e.status as EntryOut["status"],
    reference: e.reference,
    memo: e.memo,
    reverses: e.reverses,
    lines: ((e.journal_lines ?? []) as Record<string, unknown>[])
      .map((l) => ({ lineNo: l.line_no as number, accountId: l.account_id as string, description: (l.description as string | null) ?? null, debit: cents(l.debit), credit: cents(l.credit) }))
      .sort((a, b) => a.lineNo - b.lineNo),
  }));
}

/** Open receivables and payables (balance not zero), credits included. */
export async function loadOpenItems(supabase: SupabaseClient, clientId: string): Promise<OpenItem[]> {
  const { data, error } = await supabase
    .from("open_items")
    .select("id, kind, party_name, party_tin, doc_number, doc_date, due_date, amount, balance")
    .eq("client_id", clientId)
    .neq("balance", 0)
    .order("doc_date");
  if (error) throw new Error(`Could not load receivables and payables: ${error.message}`);
  return (data ?? []).map((i) => ({
    id: i.id, kind: i.kind, partyName: i.party_name, partyTin: i.party_tin, docNumber: i.doc_number,
    docDate: i.doc_date, dueDate: i.due_date, amount: cents(i.amount), balance: cents(i.balance),
  }));
}

/** One journal_entries row with its embedded journal_lines (and their parties), as a book entry. */
export function bookEntryFromRow(e: Record<string, unknown>): BookEntry {
  return {
    id: e.id as string,
    date: e.entry_date as string,
    book: e.book as Book,
    reference: (e.reference as string | null) ?? null,
    memo: e.memo as string,
    lines: ((e.journal_lines ?? []) as Record<string, unknown>[])
      .sort((a, b) => (a.line_no as number) - (b.line_no as number))
      .map((l) => {
        const p = (Array.isArray(l.parties) ? l.parties[0] : l.parties) as { display_name: string | null; tin: string } | null;
        return {
          accountId: l.account_id as string,
          partyName: (l.party_name as string | null) ?? p?.display_name ?? null,
          partyTin: p?.tin ?? null,
          description: (l.description as string | null) ?? null,
          debit: cents(l.debit),
          credit: cents(l.credit),
        };
      }),
  };
}

/** Posted (and later reversed) entries dated `from`…`to`, oldest first, for the books of account. */
export async function loadBookEntries(supabase: SupabaseClient, clientId: string, from: string, to: string): Promise<BookEntry[]> {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("id, entry_date, book, reference, memo, created_at, journal_lines(line_no, account_id, description, debit, credit, party_name, parties(display_name, tin))")
    .eq("client_id", clientId)
    .in("status", ["posted", "reversed"])
    .gte("entry_date", from)
    .lte("entry_date", to)
    .order("entry_date")
    .order("created_at");
  if (error) throw new Error(`Could not load the books: ${error.message}`);
  return (data ?? []).map((e) => bookEntryFromRow(e as Record<string, unknown>));
}

/** Staff reading a client's books directly (RLS: staff who keep them). */
export function staffBooksReader(supabase: SupabaseClient, clientId: string): BooksReader {
  return {
    entries: async (from, to) => {
      const [accounts, entries] = await Promise.all([loadAccounts(supabase, clientId), loadBookEntries(supabase, clientId, from, to)]);
      return { accounts, entries };
    },
    trialBalance: (from, to) => loadTrialBalance(supabase, clientId, from, to),
  };
}

/** A month of the books: open, locked by the returns filed for it, or reopened by an amendment. */
export interface BooksMonth {
  month: string;
  /** The filed returns that lock the month, e.g. "2550Q Q1 2027"; null when none. */
  filed: string | null;
  /** The amendment that has reopened the month, if any. */
  amendmentId: string | null;
}

export const monthState = (m: BooksMonth): "open" | "locked" | "reopened" => (!m.filed ? "open" : m.amendmentId ? "reopened" : "locked");

/** Each month of the books up to `to`, with its lock (spec §3.6, Q30). */
export async function loadBooksMonths(supabase: SupabaseClient, clientId: string, to: string): Promise<BooksMonth[]> {
  const { data, error } = await supabase.rpc("books_periods", { p_client: clientId, p_to: to });
  if (error) throw new Error(`Could not load the period lock: ${error.message}`);
  return ((data ?? []) as { month: string; filed: string | null; amendment_id: string | null }[]).map((r) => ({ month: r.month, filed: r.filed, amendmentId: r.amendment_id }));
}

export type AmendmentStatus = "requested" | "reopened" | "rejected" | "relocked";

export interface Amendment {
  id: string;
  filingId: string;
  filing: string;
  periodStart: string;
  periodEnd: string;
  reason: string;
  status: AmendmentStatus;
  requestedBy: string | null;
  requestedAt: string;
  decidedBy: string | null;
  decisionNote: string | null;
  relockedBy: string | null;
  relockedAt: string | null;
  changesNote: string | null;
}

/** The client's book amendments, newest first, with the names of the people involved. */
export async function loadAmendments(supabase: SupabaseClient, clientId: string): Promise<Amendment[]> {
  const { data, error } = await supabase
    .from("ledger_amendments")
    .select("id, filing_instance_id, period_start, period_end, reason, status, requested_by, requested_at, decided_by, decision_note, relocked_by, relocked_at, changes_note, filing_instances(form, period_label)")
    .eq("client_id", clientId)
    .order("requested_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(`Could not load the amendments: ${error.message}`);
  const ids = [...new Set((data ?? []).flatMap((a) => [a.requested_by, a.decided_by, a.relocked_by]).filter(Boolean))] as string[];
  const { data: people } = ids.length ? await supabase.from("staff_profiles").select("user_id, full_name").in("user_id", ids) : { data: [] };
  const name = new Map(((people ?? []) as { user_id: string; full_name: string }[]).map((p) => [p.user_id, p.full_name]));
  return (data ?? []).map((a) => {
    const f = (Array.isArray(a.filing_instances) ? a.filing_instances[0] : a.filing_instances) as { form: string; period_label: string } | null;
    return {
      id: a.id,
      filingId: a.filing_instance_id,
      filing: f ? `${f.form} ${f.period_label}` : "Return",
      periodStart: a.period_start,
      periodEnd: a.period_end,
      reason: a.reason,
      status: a.status as AmendmentStatus,
      requestedBy: a.requested_by ? name.get(a.requested_by) ?? null : null,
      requestedAt: a.requested_at,
      decidedBy: a.decided_by ? name.get(a.decided_by) ?? null : null,
      decisionNote: a.decision_note,
      relockedBy: a.relocked_by ? name.get(a.relocked_by) ?? null : null,
      relockedAt: a.relocked_at,
      changesNote: a.changes_note,
    };
  });
}

/**
 * The client's financial statements for a report (spec §3.6 slice 6), built
 * from the ledger now, with the number of suggested entries in the period not
 * yet posted. `endMonth` is "YYYY-MM".
 */
export async function loadStatements(supabase: SupabaseClient, client: BooksClient, kind: ReportKind, endMonth: string) {
  const { data: b } = await supabase.from("client_books").select("books_start").eq("client_id", client.id).maybeSingle();
  const result = await statementsFrom((from, to) => loadTrialBalance(supabase, client.id, from, to), client, kind, endMonth, (b?.books_start as string | undefined) ?? null);
  if (!result.fs) return { error: result.error } as const;
  const { count } = await supabase
    .from("journal_entries")
    .select("id", { count: "exact", head: true })
    .eq("client_id", client.id)
    .eq("status", "suggested")
    .gte("entry_date", result.fs.yearStart)
    .lte("entry_date", result.fs.periodEnd);
  return { fs: result.fs, suggested: count ?? 0 } as const;
}

/**
 * The financial statements for a report from a trial-balance reader (staff: the
 * ledger itself; the portal: locked months only). `booksStart` decides whether
 * an annual report shows the prior year beside it.
 */
export async function statementsFrom(
  tb: (from: string, to: string) => Promise<TbRowOut[]>,
  client: Pick<BooksClient, "name" | "tin" | "registered_address" | "fiscal_year_end_month">,
  kind: ReportKind,
  endMonth: string,
  booksStart: string | null,
) {
  const p = reportPeriod(kind, endMonth, client.fiscal_year_end_month);
  if ("error" in p) return { error: p.error } as const;
  const toRows = (rows: TbRowOut[]): StatementRow[] => rows.map((r) => ({ code: r.code, name: r.name, fsLine: r.fsLine, cashFlow: r.cashFlow, opening: r.opening, debit: r.debit, credit: r.credit, closing: r.closing }));
  // Annual: the prior taxable year beside it, when the books hold it (its balance sheet at least as the opening balances).
  const priorEnd = new Date(Date.parse(`${p.yearStart}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  const priorStart = taxableYearStart(priorEnd, client.fiscal_year_end_month);
  const start = booksStart ?? p.yearStart;
  const withPrior = kind === "annual" && priorEnd >= new Date(Date.parse(`${start}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  const [year, period, prior] = await Promise.all([
    tb(p.yearStart, p.end),
    p.start !== p.yearStart ? tb(p.start, p.end) : Promise.resolve(null),
    withPrior ? tb(priorStart, priorEnd) : Promise.resolve(null),
  ]);
  const fs = buildStatements({
    kind,
    periodStart: p.start,
    periodEnd: p.end,
    yearStart: p.yearStart,
    client: { name: client.name, tin: client.tin, address: client.registered_address },
    year: toRows(year),
    period: period ? toRows(period) : undefined,
    prior: prior ? { end: priorEnd, rows: toRows(prior), income: priorStart >= start } : undefined,
  });
  return { fs } as const;
}

export interface ReleasedReport {
  id: string;
  kind: ReportKind;
  periodStart: string;
  periodEnd: string;
  note: string | null;
  releasedAt: string;
}

/** Reports released to the client's portal, newest first (without the statements). */
export async function loadReleasedReports(supabase: SupabaseClient, clientId: string): Promise<ReleasedReport[]> {
  const { data, error } = await supabase.from("client_reports").select("id, kind, period_start, period_end, note, released_at").eq("client_id", clientId).order("period_end", { ascending: false }).order("kind");
  if (error) throw new Error(`Could not load the released reports: ${error.message}`);
  return (data ?? []).map((r) => ({ id: r.id, kind: r.kind as ReportKind, periodStart: r.period_start, periodEnd: r.period_end, note: r.note, releasedAt: r.released_at }));
}
