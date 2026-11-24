import "server-only";
/**
 * Builds the WorksheetContext for one filing (spec §3.7) as the signed-in user,
 * so row-level security decides what they may see. Conversion of rows lives in
 * source.ts (pure, tested); this file only queries.
 */
import { moduleForForm } from "./registry";
import { buildPriorFigures, isApproved, monthOf, taxableYearStart, toSourceDocument, withDirectoryParty, type DocumentRow } from "./source";
import type { Centavos, FormModule, LedgerContext, LedgerMovement, SourceDocument, TaxpayerType, WorksheetContext, WorksheetResult } from "./types";
import { toCentavos } from "./money";
import { supabaseServer } from "@/lib/supabase/server";
import { lookupParties } from "@/lib/parties/lookup";
import { loadPayrollContext } from "@/lib/payroll/load";
import type { Party } from "@/lib/parties/format";

type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

interface FilingRow {
  id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_start: string;
  period_end: string;
  due_date: string;
  status: string;
  deadline_rules: { calendar_year: boolean } | null;
  clients: {
    id: string;
    name: string;
    tin: string | null;
    rdo_code: string | null;
    registered_address: string | null;
    taxpayer_type: TaxpayerType;
    fiscal_year_end_month: number;
  };
}

export interface SavedWorksheet {
  inputs: Record<string, string>;
  result: WorksheetResult | null;
  computedAt: string | null;
  computedBy: string | null;
}

/** An approved document of the period, for the list of sources on the worksheet page. */
export interface ListedDocument {
  id: string;
  fileName: string;
  source: SourceDocument;
}

export interface LoadedWorksheet {
  filing: { id: string; clientId: string; clientName: string; form: string; periodLabel: string; status: string };
  module: FormModule | null;
  /** Null when there is no module for the form. */
  ctx: WorksheetContext | null;
  saved: SavedWorksheet | null;
  documents: ListedDocument[];
}

/** Forms computed from per-employee payroll rather than documents. */
const PAYROLL_FORM_CODES = new Set(["1601-C", "1604-C"]);

/** Statuses from which the worksheet is locked (database trigger return_worksheet_guard). */
export { LOCKED_STATUSES } from "@/lib/documents/lock";

/**
 * One approved document row → SourceDocument. The single place where rows
 * become source documents (e.g. to fill party details from a directory later).
 */
function toSource(row: DocumentRow): SourceDocument | null {
  return toSourceDocument(row);
}


/** The worksheet's context, module and saved state; null if the filing is not visible to the user. */
export async function loadWorksheet(filingId: string, supabase?: Supabase): Promise<LoadedWorksheet | null> {
  const db = supabase ?? (await supabaseServer());
  const { data } = await db
    .from("filing_instances")
    .select(
      "id, client_id, form, period_label, period_start, period_end, due_date, status, deadline_rules(calendar_year), clients(id, name, tin, rdo_code, registered_address, taxpayer_type, fiscal_year_end_month)",
    )
    .eq("id", filingId)
    .maybeSingle();
  if (!data) return null;
  const f = data as unknown as FilingRow;
  const formModule = moduleForForm(f.form);

  const { data: savedRow } = await db
    .from("return_worksheets")
    .select("inputs, result, computed_at, computed_by")
    .eq("filing_instance_id", f.id)
    .maybeSingle();
  const saved: SavedWorksheet | null = savedRow
    ? {
        inputs: (savedRow.inputs ?? {}) as Record<string, string>,
        result: (savedRow.result ?? null) as WorksheetResult | null,
        computedAt: savedRow.computed_at,
        computedBy: savedRow.computed_by,
      }
    : null;

  const filing = { id: f.id, clientId: f.client_id, clientName: f.clients.name, form: f.form, periodLabel: f.period_label, status: f.status };
  if (!formModule) return { filing, module: null, ctx: null, saved, documents: [] };

  // Withholding forms follow the calendar year; the others the client's taxable year (spec §3.3).
  const fyeMonth = f.deadline_rules?.calendar_year ? 12 : f.clients.fiscal_year_end_month;
  const yearStart = taxableYearStart(f.period_end, fyeMonth);
  const docsFrom = formModule.documentScope === "year_to_date" ? yearStart : monthOf(f.period_start);

  const [{ data: vat }, { data: docRows }, { data: priorRows }] = await Promise.all([
    // VAT-registered: an obligation to file 2550Q that is open during the period.
    db
      .from("obligations")
      .select("id")
      .eq("client_id", f.client_id)
      .eq("form", "2550Q")
      .lte("start_date", f.period_end)
      .or(`end_date.is.null,end_date.gte.${f.period_start}`)
      .limit(1),
    db
      .from("documents")
      .select("id, doc_type, document_month, status, file_name, extractions(approved_fields)")
      .eq("client_id", f.client_id)
      .eq("status", "posted")
      .gte("document_month", docsFrom)
      .lte("document_month", monthOf(f.period_end))
      .order("document_month")
      .order("created_at"),
    // Earlier worksheets of the same client in the same taxable year.
    db
      .from("return_worksheets")
      .select("figures, filing_instances!inner(form, period_start, period_end)")
      .eq("client_id", f.client_id)
      .neq("filing_instance_id", f.id)
      .gte("filing_instances.period_start", yearStart)
      .lt("filing_instances.period_end", f.period_start),
  ]);

  const documents: ListedDocument[] = [];
  for (const row of (docRows ?? []) as (DocumentRow & { file_name: string })[]) {
    if (!isApproved(row)) continue;
    const source = toSource(row);
    if (source) documents.push({ id: row.id, fileName: row.file_name, source });
  }
  const directory = await lookupParties(db, documents.map((d) => d.source.partyTin)).catch(() => new Map<string, Party>());
  for (const d of documents) d.source = withDirectoryParty(d.source, directory);

  const prior = ((priorRows ?? []) as unknown as { figures: Record<string, Centavos>; filing_instances: { form: string; period_start: string } | { form: string; period_start: string }[] }[]).map((r) => {
    const fi = Array.isArray(r.filing_instances) ? r.filing_instances[0] : r.filing_instances;
    return { form: fi.form, periodStart: fi.period_start, figures: r.figures ?? {} };
  });

  const ctx: WorksheetContext = {
    client: {
      id: f.clients.id,
      name: f.clients.name,
      tin: f.clients.tin,
      rdoCode: f.clients.rdo_code,
      registeredAddress: f.clients.registered_address,
      taxpayerType: f.clients.taxpayer_type,
      fiscalYearEndMonth: f.clients.fiscal_year_end_month,
      vatRegistered: (vat ?? []).length > 0,
    },
    filing: { id: f.id, form: f.form, periodLabel: f.period_label, periodStart: f.period_start, periodEnd: f.period_end, dueDate: f.due_date },
    documents: documents.map((d) => d.source),
    inputs: saved?.inputs ?? {},
    priorFigures: buildPriorFigures(prior),
  };
  if (PAYROLL_FORM_CODES.has(f.form)) ctx.payroll = await loadPayrollContext(db, f.clients.id, f.form, f.period_start, f.period_end);
  if (formModule.usesLedger) {
    const ledger = await loadLedger(db, f.client_id, yearStart, f.period_start, f.period_end);
    if (ledger) ctx.ledger = ledger;
  }
  return { filing, module: formModule, ctx, saved, documents };
}

const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);

/**
 * The client's posted income and expenses for the income tax worksheets (spec
 * §3.6–3.7, slice 5): this period and the taxable year before it, from the
 * database function ledger_income. Null when the client has no books.
 */
async function loadLedger(db: Supabase, clientId: string, yearStart: string, periodStart: string, periodEnd: string): Promise<LedgerContext | null> {
  const { data: books } = await db.from("client_books").select("books_start").eq("client_id", clientId).maybeSingle();
  if (!books) return null;
  const movements = async (from: string, to: string): Promise<LedgerMovement[]> => {
    if (to < from) return [];
    const { data, error } = await db.rpc("ledger_income", { p_client: clientId, p_from: from, p_to: to });
    if (error) throw new Error(`Could not read the books: ${error.message}`);
    return ((data ?? []) as { code: string; name: string; type: LedgerMovement["type"]; bir_line: string | null; net: string | number }[]).map((r) => ({
      code: r.code,
      name: r.name,
      type: r.type,
      birLine: r.bir_line,
      net: toCentavos(String(r.net)) ?? 0,
    }));
  };
  const [period, earlier, { count }] = await Promise.all([
    movements(periodStart, periodEnd),
    movements(yearStart, dayBefore(periodStart)),
    db.from("journal_entries").select("id", { count: "exact", head: true }).eq("client_id", clientId).eq("status", "suggested").gte("entry_date", yearStart).lte("entry_date", periodEnd),
  ]);
  return { booksStart: books.books_start as string, period, earlier, suggested: count ?? 0 };
}
