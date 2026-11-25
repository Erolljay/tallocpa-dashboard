import "server-only";
/**
 * What the batch checks need from the database (B1): the chart, the books start,
 * months locked by a filed return, VAT registration, and the documents already
 * approved for the client. Runs as the signed-in staff member (RLS).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { manilaToday } from "@/lib/filings/run";
import { dupKey, type BatchAccount, type BatchContext, type BatchKind } from "./register";

const monthsBetween = (from: string, to: string) => {
  const out: string[] = [];
  const d = new Date(`${from.slice(0, 7)}-01T00:00:00Z`);
  while (d.toISOString().slice(0, 10) <= to && out.length < 240) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCMonth(d.getUTCMonth() + 1);
  }
  return out;
};

export async function loadAccounts(db: SupabaseClient, clientId: string): Promise<BatchAccount[]> {
  const { data } = await db.from("ledger_accounts").select("id, code, name, type, control").eq("client_id", clientId).eq("active", true).order("code");
  return (data ?? []) as BatchAccount[];
}

/** Null when the client has no chart of accounts yet. */
export async function loadBatchContext(db: SupabaseClient, clientId: string, kind: BatchKind): Promise<BatchContext | null> {
  const docType = kind === "sales" ? "sales_invoice" : "purchase_receipt";
  const [{ data: books }, accounts, { data: filed }, { data: vat }, { data: approved }] = await Promise.all([
    db.from("client_books").select("books_start").eq("client_id", clientId).maybeSingle(),
    loadAccounts(db, clientId),
    db.from("filing_instances").select("period_start, period_end").eq("client_id", clientId).in("status", ["filed", "paid", "proof_uploaded"]),
    db.from("obligations").select("start_date, end_date").eq("client_id", clientId).eq("form", "2550Q"),
    db.from("extractions").select("approved_fields, documents!inner(client_id, doc_type, status)").eq("documents.client_id", clientId).eq("documents.doc_type", docType).eq("documents.status", "posted").not("approved_fields", "is", null).limit(20000),
  ]);
  if (!books) return null;
  const lockedMonths = new Set((filed ?? []).flatMap((f) => monthsBetween(String(f.period_start), String(f.period_end))));
  const periods = (vat ?? []) as { start_date: string; end_date: string | null }[];
  const existing = new Set(
    (approved ?? []).map((a) => dupKey(kind, (a.approved_fields ?? {}) as { number?: string | null; party_tin?: string | null })).filter((k): k is string => Boolean(k)),
  );
  return {
    kind,
    accounts,
    today: manilaToday(),
    booksStart: String(books.books_start).slice(0, 10),
    lockedMonths,
    vatRegistered: (date) => periods.some((p) => String(p.start_date) <= date && (!p.end_date || String(p.end_date) >= date)),
    existing,
  };
}
