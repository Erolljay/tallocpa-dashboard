import "server-only";
import { notFound } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireStaff } from "@/lib/auth";
import { toCentavos } from "@/lib/returns/money";
import { supabaseServer } from "@/lib/supabase/server";
import type { OpenItem } from "./arap";
import type { BookEntry } from "./books";
import type { OpeningItem } from "./opening";
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

const ACCOUNT_COLUMNS = "id, template_key, code, name, type, normal_side, fs_line, bir_line, control, active, sort_order";

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
  opening: Centavos;
  debit: Centavos;
  credit: Centavos;
  closing: Centavos;
}

export async function loadTrialBalance(supabase: SupabaseClient, clientId: string, from: string, to: string): Promise<TbRowOut[]> {
  const { data, error } = await supabase.rpc("trial_balance", { p_client: clientId, p_from: from, p_to: to });
  if (error) throw new Error(`Could not load the trial balance: ${error.message}`);
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    accountId: r.account_id as string,
    code: r.code as string,
    name: r.name as string,
    type: r.type as AccountType,
    normalSide: r.normal_side as NormalSide,
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
  return (data ?? []).map((e) => ({
    id: e.id,
    date: e.entry_date,
    book: e.book as Book,
    reference: e.reference,
    memo: e.memo,
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
  }));
}
