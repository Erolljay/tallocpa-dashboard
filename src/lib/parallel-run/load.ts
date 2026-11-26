import "server-only";
/**
 * Loads the parallel run (compare.ts) as the signed-in user: the register lines (row-level
 * security: staff who see the client), the Books' figures by tax code (books_parallel_run:
 * the Owner or the staff assigned to the client), the posted Book invoices for matching,
 * and the client's 2550Q obligations. Read only.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { RegisterSourceRow } from "@/lib/returns/source";
import { compareParallelRun, unmatchedIds, vatMonths, type BookInvoiceRow, type MonthComparison, type ParallelBooksRow } from "./compare";

const REGISTER_COLUMNS = "document_id, kind, month, line_date, reference, party_name, party_tin, party_address, vatable, vat_exempt, zero_rated, vat, total, atc, withholding, slp_category";
const INVOICE_COLUMNS = "id, kind, issue_date, reference, party_name, total, document_id, cwt_document_id, cwt_claim, journal_entries(status)";
const CHUNK = 100;

/** "YYYY-MM" or "YYYY-MM-DD" → the last day of its month. */
export function monthEnd(month: string): string {
  const [y, m] = month.slice(0, 7).split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
}

type InvoiceWithEntry = BookInvoiceRow & { journal_entries: { status: string } | { status: string }[] | null };

/** Only invoices whose entry is posted count on the returns (as books_return_sources). */
function posted(rows: InvoiceWithEntry[]): BookInvoiceRow[] {
  return rows
    .filter((r) => {
      const j = Array.isArray(r.journal_entries) ? r.journal_entries[0] : r.journal_entries;
      return j?.status === "posted";
    })
    .map(({ journal_entries: _entry, ...r }) => {
      void _entry;
      return { ...r, issue_date: String(r.issue_date).slice(0, 10) };
    });
}

async function chunked<T>(ids: string[], run: (part: string[]) => PromiseLike<{ data: unknown; error: { message: string } | null }>): Promise<T[]> {
  const out: T[] = [];
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await run(ids.slice(i, i + CHUNK));
    if (error) throw new Error(`Could not match the documents: ${error.message}`);
    out.push(...((data ?? []) as T[]));
  }
  return out;
}

/** The parallel run of one client for `months` (first days, in order, at most twelve). */
export async function loadParallelRun(supabase: SupabaseClient, clientId: string, months: string[]): Promise<MonthComparison[]> {
  if (months.length === 0) return [];
  const from = months[0].slice(0, 10);
  const to = monthEnd(months[months.length - 1]);
  const [books, register, invoices, obligations] = await Promise.all([
    supabase.rpc("books_parallel_run", { p_client: clientId, p_from: from, p_to: to }),
    supabase.from("register_lines").select(REGISTER_COLUMNS).eq("client_id", clientId).gte("month", from).lte("month", to).limit(20000),
    supabase.from("book_invoices").select(INVOICE_COLUMNS).eq("client_id", clientId).is("voided_at", null).gte("issue_date", from).lte("issue_date", to).limit(20000),
    supabase.from("obligations").select("start_date, end_date").eq("client_id", clientId).eq("form", "2550Q"),
  ]);
  if (books.error) throw new Error(`Could not read the Books: ${books.error.message}`);
  if (register.error) throw new Error(`Could not read the register: ${register.error.message}`);
  if (invoices.error) throw new Error(`Could not read the Book invoices: ${invoices.error.message}`);
  if (obligations.error) throw new Error(`Could not read the client's obligations: ${obligations.error.message}`);

  const registerRows = (register.data ?? []) as unknown as RegisterSourceRow[];
  const invoiceRows = posted((invoices.data ?? []) as unknown as InvoiceWithEntry[]);
  const missing = unmatchedIds({ register: registerRows, invoices: invoiceRows });

  // Where the unmatched documents sit outside the months.
  const [lines, byDocument, byCwt] = await Promise.all([
    chunked<{ document_id: string; month: string }>(missing.invoiceDocs, (part) => supabase.from("register_lines").select("document_id, month").eq("client_id", clientId).in("document_id", part)),
    chunked<InvoiceWithEntry>(missing.registerDocs, (part) => supabase.from("book_invoices").select(INVOICE_COLUMNS).eq("client_id", clientId).is("voided_at", null).in("document_id", part)),
    chunked<InvoiceWithEntry>(missing.cwtDocs, (part) => supabase.from("book_invoices").select(INVOICE_COLUMNS).eq("client_id", clientId).is("voided_at", null).in("cwt_document_id", part)),
  ]);

  return compareParallelRun({
    months,
    vatRegistered: vatMonths((obligations.data ?? []) as { start_date: string; end_date: string | null }[]),
    register: registerRows,
    books: (books.data ?? []) as ParallelBooksRow[],
    invoices: invoiceRows,
    elsewhere: {
      registerMonth: new Map(lines.map((l) => [l.document_id, String(l.month).slice(0, 10)])),
      invoices: posted([...byDocument, ...byCwt]),
    },
  });
}

export interface FirmClientRun {
  clientId: string;
  name: string;
  code: string | null;
  booksStart: string;
  /** One per month asked for; null for a month before the Books start. */
  months: (Pick<MonthComparison, "month" | "status" | "counts"> & { differences: number } | null)[];
  error?: string;
}

/** Every client with Books (that the user may keep books for), each month's status. For the Owner. */
export async function loadFirmParallelRun(supabase: SupabaseClient, months: string[]): Promise<FirmClientRun[]> {
  const { data, error } = await supabase.from("client_books").select("client_id, books_start, clients(name, code, status)");
  if (error) throw new Error(`Could not read the clients' Books: ${error.message}`);
  type Row = { client_id: string; books_start: string; clients: { name: string; code: string | null; status: string } | { name: string; code: string | null; status: string }[] | null };
  const clients = ((data ?? []) as unknown as Row[])
    .map((r) => ({ id: r.client_id, booksStart: String(r.books_start).slice(0, 10), c: Array.isArray(r.clients) ? r.clients[0] : r.clients }))
    .filter((r) => r.c && r.c.status !== "archived")
    .sort((a, b) => a.c!.name.localeCompare(b.c!.name));

  const out: FirmClientRun[] = [];
  // A few clients at a time: each is a handful of queries.
  for (let i = 0; i < clients.length; i += 4) {
    const part = await Promise.all(
      clients.slice(i, i + 4).map(async (c): Promise<FirmClientRun> => {
        const start = `${c.booksStart.slice(0, 7)}-01`;
        const inBooks = months.filter((m) => m >= start);
        const base = { clientId: c.id, name: c.c!.name, code: c.c!.code, booksStart: c.booksStart };
        try {
          const run = await loadParallelRun(supabase, c.id, inBooks);
          const byMonth = new Map(run.map((m) => [m.month, m]));
          return {
            ...base,
            months: months.map((m) => {
              const r = byMonth.get(m);
              if (!r) return null;
              const differences = [...r.sales, ...r.purchases].filter((f) => f.compared && f.old !== f.new).length + [...r.sls, ...r.slp, ...r.sawt, ...r.qap].filter((x) => !x.agrees).length;
              return { month: r.month, status: r.status, counts: r.counts, differences };
            }),
          };
        } catch (e) {
          return { ...base, months: months.map(() => null), error: e instanceof Error ? e.message : String(e) };
        }
      }),
    );
    out.push(...part);
  }
  return out;
}
