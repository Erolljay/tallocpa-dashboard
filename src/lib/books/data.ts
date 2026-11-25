/**
 * Reads for the staff Books screens (rework phase 1): the invoice, receipt and
 * payment lists, tax codes, the module counts, and the lines of an entry for the
 * Transaction Journal view. Row-level security limits every read to staff who see
 * the client; writes go through ./actions.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cents, partyBalances, type BooksModule, type JournalLineIn } from "./ui";
import { toTaxCode, type TaxCode } from "./tax-codes";

export interface InvoiceRow {
  id: string;
  kind: "sales" | "purchase";
  party_id: string | null;
  party_name: string;
  party_tin: string | null;
  reference: string | null;
  issue_date: string;
  due_date: string | null;
  description: string | null;
  document_id: string | null;
  withholding_code_id: string | null;
  withholding: string;
  vat_withholding_code_id: string | null;
  vat_withheld: string;
  discount: string;
  subtotal: string;
  tax_total: string;
  total: string;
  amount_due: string;
  legacy: boolean;
  journal_entry_id: string | null;
  open_item_id: string | null;
  voided_at: string | null;
  void_reason: string | null;
  balance_due: string;
  withholding_code: string | null;
}

export interface SettlementRow {
  id: string;
  kind: "receipt" | "payment";
  settle_date: string;
  cash_account_id: string;
  party_id: string | null;
  party_name: string;
  reference: string | null;
  description: string | null;
  document_id: string | null;
  amount: string;
  deduction: string;
  deduction_account_id: string | null;
  legacy: boolean;
  journal_entry_id: string | null;
  voided_at: string | null;
  void_reason: string | null;
}

const INVOICE_COLUMNS =
  "id, kind, party_id, party_name, party_tin, reference, issue_date, due_date, description, document_id, withholding_code_id, withholding, vat_withholding_code_id, vat_withheld, discount, subtotal, tax_total, total, amount_due, legacy, journal_entry_id, open_item_id, voided_at, void_reason, balance_due, withholding_code";
const SETTLEMENT_COLUMNS =
  "id, kind, settle_date, cash_account_id, party_id, party_name, reference, description, document_id, amount, deduction, deduction_account_id, legacy, journal_entry_id, voided_at, void_reason";

/** The firm's tax codes, in their order. */
export async function loadTaxCodes(supabase: SupabaseClient): Promise<TaxCode[]> {
  const { data, error } = await supabase.from("tax_codes").select("id, code, name, kind, rate, atc, payee_type, active").order("sort_order").order("code");
  if (error) throw new Error(`Could not load the tax codes: ${error.message}`);
  return (data ?? []).map(toTaxCode);
}

/** A client's Sales or Purchase Invoices, newest first, optionally dated from…to and for one party. */
export async function loadInvoices(
  supabase: SupabaseClient,
  clientId: string,
  kind: "sales" | "purchase",
  opts: { from?: string; to?: string; partyId?: string | null; openOnly?: boolean } = {},
): Promise<InvoiceRow[]> {
  let q = supabase.from("book_invoice_list").select(INVOICE_COLUMNS).eq("client_id", clientId).eq("kind", kind);
  if (opts.from) q = q.gte("issue_date", opts.from);
  if (opts.to) q = q.lte("issue_date", opts.to);
  if (opts.partyId) q = q.eq("party_id", opts.partyId);
  if (opts.openOnly) q = q.is("voided_at", null).gt("balance_due", 0);
  const { data, error } = await q.order("issue_date", { ascending: false }).order("created_at", { ascending: false }).limit(5000);
  if (error) throw new Error(`Could not load the invoices: ${error.message}`);
  return (data ?? []) as unknown as InvoiceRow[];
}

export async function loadInvoice(supabase: SupabaseClient, clientId: string, invoiceId: string): Promise<InvoiceRow | null> {
  const { data } = await supabase.from("book_invoice_list").select(INVOICE_COLUMNS).eq("client_id", clientId).eq("id", invoiceId).maybeSingle();
  return (data as unknown as InvoiceRow | null) ?? null;
}

export interface InvoiceLineRow {
  line_no: number;
  account_id: string;
  description: string | null;
  amount: string;
  tax_code_id: string | null;
  tax_amount: string;
}

export async function loadInvoiceLines(supabase: SupabaseClient, invoiceId: string): Promise<InvoiceLineRow[]> {
  const { data, error } = await supabase.from("book_invoice_lines").select("line_no, account_id, description, amount, tax_code_id, tax_amount").eq("invoice_id", invoiceId).order("line_no");
  if (error) throw new Error(`Could not load the invoice lines: ${error.message}`);
  return (data ?? []) as InvoiceLineRow[];
}

/** A client's Receipts or Payments, newest first, optionally dated from…to. */
export async function loadSettlements(supabase: SupabaseClient, clientId: string, kind: "receipt" | "payment", opts: { from?: string; to?: string } = {}): Promise<SettlementRow[]> {
  let q = supabase.from("book_settlements").select(SETTLEMENT_COLUMNS).eq("client_id", clientId).eq("kind", kind);
  if (opts.from) q = q.gte("settle_date", opts.from);
  if (opts.to) q = q.lte("settle_date", opts.to);
  const { data, error } = await q.order("settle_date", { ascending: false }).order("created_at", { ascending: false }).limit(5000);
  if (error) throw new Error(`Could not load the ${kind}s: ${error.message}`);
  return (data ?? []) as SettlementRow[];
}

export async function loadSettlement(supabase: SupabaseClient, clientId: string, id: string): Promise<SettlementRow | null> {
  const { data } = await supabase.from("book_settlements").select(SETTLEMENT_COLUMNS).eq("client_id", clientId).eq("id", id).maybeSingle();
  return (data as SettlementRow | null) ?? null;
}

export interface AllocationRow {
  invoice_id: string;
  amount: string;
}

export async function loadAllocations(supabase: SupabaseClient, settlementId: string): Promise<AllocationRow[]> {
  const { data, error } = await supabase.from("book_settlement_allocations").select("invoice_id, amount").eq("settlement_id", settlementId);
  if (error) throw new Error(`Could not load what it settles: ${error.message}`);
  return (data ?? []) as AllocationRow[];
}

/** The invoices some ids name (for a receipt or payment's view and edit). */
export async function loadInvoicesById(supabase: SupabaseClient, clientId: string, ids: string[]): Promise<InvoiceRow[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase.from("book_invoice_list").select(INVOICE_COLUMNS).eq("client_id", clientId).in("id", ids);
  if (error) throw new Error(`Could not load the invoices: ${error.message}`);
  return (data ?? []) as unknown as InvoiceRow[];
}

/** The lines of a journal entry, for the Transaction Journal view. */
export async function loadEntryLines(supabase: SupabaseClient, entryId: string): Promise<JournalLineIn[]> {
  const { data, error } = await supabase
    .from("journal_lines")
    .select("line_no, account_id, description, debit, credit, party_name, open_item_id, parties(display_name)")
    .eq("entry_id", entryId)
    .order("line_no");
  if (error) throw new Error(`Could not load the entry: ${error.message}`);
  return (data ?? []).map((l) => {
    const p = (Array.isArray(l.parties) ? l.parties[0] : l.parties) as { display_name: string | null } | null;
    return {
      lineNo: l.line_no as number,
      accountId: l.account_id as string,
      partyName: (l.party_name as string | null) ?? p?.display_name ?? null,
      description: (l.description as string | null) ?? null,
      openItemId: (l.open_item_id as string | null) ?? null,
      debit: cents(l.debit as string),
      credit: cents(l.credit as string),
    };
  });
}

/** open item id → its invoice, for the lines of an entry that settle or open one. */
export async function loadInvoicesByOpenItem(supabase: SupabaseClient, clientId: string, openItemIds: string[]): Promise<Map<string, { reference: string | null; issue_date: string; kind: string }>> {
  if (openItemIds.length === 0) return new Map();
  const { data } = await supabase.from("book_invoices").select("open_item_id, reference, issue_date, kind").eq("client_id", clientId).in("open_item_id", openItemIds);
  return new Map((data ?? []).map((r) => [r.open_item_id as string, { reference: r.reference as string | null, issue_date: r.issue_date as string, kind: r.kind as string }]));
}

/** The counts beside the Books modules. Transactions count all months, payslips the month shown. */
export async function loadModuleCounts(supabase: SupabaseClient, clientId: string, month: string): Promise<Partial<Record<BooksModule, number>>> {
  const head = { count: "exact" as const, head: true };
  const [bank, receipts, payments, sales, purchases, parties, employees, payslips, journal] = await Promise.all([
    supabase.from("ledger_accounts").select("id", head).eq("client_id", clientId).eq("active", true).in("control", ["cash", "bank"]),
    supabase.from("book_settlements").select("id", head).eq("client_id", clientId).eq("kind", "receipt").is("voided_at", null),
    supabase.from("book_settlements").select("id", head).eq("client_id", clientId).eq("kind", "payment").is("voided_at", null),
    supabase.from("book_invoices").select("id", head).eq("client_id", clientId).eq("kind", "sales").is("voided_at", null),
    supabase.from("book_invoices").select("id", head).eq("client_id", clientId).eq("kind", "purchase").is("voided_at", null),
    supabase.from("book_invoices").select("kind, party_id, party_name").eq("client_id", clientId).is("voided_at", null).limit(20000),
    supabase.from("employees").select("id", head).eq("client_id", clientId).eq("active", true),
    supabase.from("payroll_entries").select("id", head).eq("client_id", clientId).eq("pay_month", `${month}-01`),
    supabase.from("journal_entries").select("id", head).eq("client_id", clientId).eq("source", "manual").neq("status", "suggested"),
  ]);
  const distinct = (kind: string) =>
    new Set(((parties.data ?? []) as { kind: string; party_id: string | null; party_name: string }[]).filter((r) => r.kind === kind).map((r) => r.party_id ?? r.party_name.trim().toLowerCase())).size;
  return {
    "bank-accounts": bank.count ?? 0,
    receipts: receipts.count ?? 0,
    payments: payments.count ?? 0,
    "sales-invoices": sales.count ?? 0,
    "purchase-invoices": purchases.count ?? 0,
    customers: distinct("sales"),
    suppliers: distinct("purchase"),
    employees: employees.count ?? 0,
    payslips: payslips.count ?? 0,
    journal: journal.count ?? 0,
  };
}

/** Customers or suppliers with their balances, from all their invoices. */
export async function loadPartyBalances(supabase: SupabaseClient, clientId: string, kind: "sales" | "purchase") {
  return partyBalances(await loadInvoices(supabase, clientId, kind));
}

/** Parties this client deals with, for the invoice form's customer or supplier picker. */
export async function loadClientParties(supabase: SupabaseClient, clientId: string, kind: "sales" | "purchase"): Promise<{ id: string; name: string; tin: string | null }[]> {
  const role = kind === "sales" ? "customer" : "supplier";
  const { data } = await supabase.from("client_parties").select("party_id, role, parties(display_name, tin, branch_code)").eq("client_id", clientId).in("role", [role, "both"]).limit(2000);
  const out = new Map<string, { id: string; name: string; tin: string | null }>();
  for (const r of data ?? []) {
    const p = (Array.isArray(r.parties) ? r.parties[0] : r.parties) as { display_name: string | null; tin: string | null; branch_code: string | null } | null;
    if (!p?.display_name) continue;
    out.set(r.party_id as string, { id: r.party_id as string, name: p.display_name, tin: p.tin ? `${p.tin}${p.branch_code ? `-${p.branch_code}` : ""}` : null });
  }
  return [...out.values()].sort((a, b) => a.name.localeCompare(b.name));
}
