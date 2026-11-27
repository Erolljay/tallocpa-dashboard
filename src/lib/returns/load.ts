import "server-only";
/**
 * Builds the WorksheetContext for one filing (spec §3.7; docs/REWORK.md decisions
 * 10–12) as the signed-in user, so row-level security decides what they may see.
 * For a client with Books, the invoices' figures come from the Books by tax code
 * (database function books_return_sources), which refuses until every month of the
 * period is locked; months before the books start, and clients without Books, read
 * the approved documents' register lines as before. Conversion of rows lives in
 * source.ts (pure, tested); this file only queries.
 */
import { moduleForForm } from "./registry";
import { buildPriorFigures, fromBooksRow, fromRegisterLine, monthOf, taxableYearStart, withDirectoryParty, type BooksSourceRow, type RegisterSourceRow } from "./source";
import type {
  Centavos, EwtQuarter, EwtRemittance, FormModule, IncomeTaxMethod, LedgerContext, LedgerMovement, PayslipRow, SourceDocument, TaxpayerType, VatCarryOver, WorksheetContext, WorksheetResult,
} from "./types";
import { toCentavos } from "./money";
import { withNonDeductible, type NonDeductibleRow } from "./forms/business/book-income";
import { buildStatements, type FinancialStatements } from "@/lib/ledger/statements";
import { defaultCashFlow, type CashFlowClass } from "@/lib/ledger/cash-flow";
import type { Control, NormalSide } from "@/lib/ledger/types";
import { supabaseServer } from "@/lib/supabase/server";
import { lookupParties } from "@/lib/parties/lookup";
import { loadPayrollContext } from "@/lib/payroll/load";
import { loadAssets } from "@/lib/assets/load";
import { rangeTotals } from "@/lib/assets/schedule";
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
    zip_code: string | null;
    taxpayer_type: TaxpayerType;
    fiscal_year_end_month: number;
    income_tax_method: IncomeTaxMethod | null;
  };
}

export interface SavedWorksheet {
  inputs: Record<string, string>;
  result: WorksheetResult | null;
  computedAt: string | null;
  computedBy: string | null;
}

/** A source of the period's figures, for the list on the worksheet page: an approved document, or an invoice in the Books. */
export interface ListedDocument {
  id: string;
  fileName: string;
  source: SourceDocument;
  /** Set for a Book invoice: where it opens, and what it is called. */
  href?: string;
  label?: string;
}

export interface LoadedWorksheet {
  filing: { id: string; clientId: string; clientName: string; form: string; periodLabel: string; status: string };
  module: FormModule | null;
  /** Null when there is no module for the form, or when the Books are not locked (see notReady). */
  ctx: WorksheetContext | null;
  saved: SavedWorksheet | null;
  documents: ListedDocument[];
  /** Set when the return cannot be worked out yet: the Books of its period are not locked. */
  notReady?: string;
}

/** Forms computed from per-employee payroll rather than documents. */
const PAYROLL_FORM_CODES = new Set(["1601-C", "1604-C"]);

/** Statuses from which the worksheet is locked (database trigger return_worksheet_guard). */
export { LOCKED_STATUSES } from "@/lib/documents/lock";

const num = (v: string | number | null | undefined): Centavos => toCentavos(v == null ? null : String(v)) ?? 0;

/** The worksheet's context, module and saved state; null if the filing is not visible to the user. */
export async function loadWorksheet(filingId: string, supabase?: Supabase): Promise<LoadedWorksheet | null> {
  const db = supabase ?? (await supabaseServer());
  const { data } = await db
    .from("filing_instances")
    .select(
      "id, client_id, form, period_label, period_start, period_end, due_date, status, deadline_rules(calendar_year), clients(id, name, tin, rdo_code, registered_address, zip_code, taxpayer_type, fiscal_year_end_month, income_tax_method)",
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

  const { data: books } = await db.from("client_books").select("books_start").eq("client_id", f.client_id).maybeSingle();
  // Months from the books start come from the Books; earlier ones (and clients without Books) from the register.
  const booksFrom = books ? monthOf(String(books.books_start)) : null;
  // Information returns (1604-C) do not come from the Books and wait for no lock.
  const useBooks = booksFrom != null && booksFrom <= monthOf(f.period_end) && f.form !== "1604-C";

  const [{ data: vat }, { data: docRows }, { data: priorRows }, booksRes] = await Promise.all([
    // VAT-registered: an obligation to file 2550Q that is open during the period.
    db
      .from("obligations")
      .select("id")
      .eq("client_id", f.client_id)
      .eq("form", "2550Q")
      .lte("start_date", f.period_end)
      .or(`end_date.is.null,end_date.gte.${f.period_start}`)
      .limit(1),
    // One register (slice 2): the approved documents' figures, as register lines.
    booksFrom != null && booksFrom <= docsFrom
      ? Promise.resolve({ data: [] })
      : db
          .from("register_lines")
          .select("document_id, kind, month, line_date, reference, party_name, party_tin, party_address, vatable, vat_exempt, zero_rated, vat, total, atc, withholding, slp_category, documents(file_name, created_at)")
          .eq("client_id", f.client_id)
          .gte("month", docsFrom)
          .lte("month", booksFrom != null && monthOf(dayBefore(booksFrom)) < monthOf(f.period_end) ? monthOf(dayBefore(booksFrom)) : monthOf(f.period_end)),
    // Earlier worksheets of the same client in the same taxable year.
    db
      .from("return_worksheets")
      .select("figures, filing_instances!inner(form, period_start, period_end)")
      .eq("client_id", f.client_id)
      .neq("filing_instance_id", f.id)
      .gte("filing_instances.period_start", yearStart)
      .lt("filing_instances.period_end", formModule.priorWithinPeriod ? f.period_end : f.period_start),
    // The Books by tax code, for locked months only (refused otherwise).
    useBooks ? db.rpc("books_return_sources", { p_filing: f.id, p_from: docsFrom }) : Promise.resolve({ data: [], error: null }),
  ]);

  if (booksRes.error) {
    // 55000: a month of the period is not locked yet (decision 10).
    if (booksRes.error.code === "55000") return { filing, module: formModule, ctx: null, saved, documents: [], notReady: booksRes.error.message };
    throw new Error(`Could not read the Books: ${booksRes.error.message}`);
  }

  type LineRow = RegisterSourceRow & { documents: { file_name: string; created_at: string } | { file_name: string; created_at: string }[] | null };
  const doc = (r: LineRow) => (Array.isArray(r.documents) ? r.documents[0] : r.documents);
  // Same order as before the register: by month, then by upload.
  const lineRows = ((docRows ?? []) as unknown as LineRow[]).sort(
    (a, b) => String(a.month).localeCompare(String(b.month)) || (doc(a)?.created_at ?? "").localeCompare(doc(b)?.created_at ?? ""),
  );
  const registerDocs: ListedDocument[] = lineRows.map((r) => ({ id: r.document_id, fileName: doc(r)?.file_name ?? "", source: fromRegisterLine(r) }));
  const bookSources = ((booksRes.data ?? []) as BooksSourceRow[]).map(fromBooksRow);
  // Decision 12: CWT whose 2307 never came and that the client chose to stop claiming.
  const cwtIds = [...new Set(bookSources.filter((s) => s.docType === "bir_2307_received" && s.cwtSupported === false).map((s) => s.id))];
  if (cwtIds.length) {
    const { data: stopped, error: stopError } = await db.from("book_invoices").select("id").eq("client_id", f.client_id).eq("cwt_claim", "stop").gte("issue_date", docsFrom).lte("issue_date", f.period_end);
    if (stopError) throw new Error(`Could not read the client's missing-2307 decisions: ${stopError.message}`);
    const ids = new Set(((stopped ?? []) as { id: string }[]).map((r) => r.id));
    for (const s of bookSources) if (ids.has(s.id) && s.docType === "bir_2307_received" && !(s.taxCode ?? "").startsWith("WV")) s.cwtStopped = true;
  }
  const directory = await lookupParties(db, [...registerDocs.map((d) => d.source.partyTin), ...bookSources.map((s) => s.partyTin)]).catch(() => new Map<string, Party>());
  for (const d of registerDocs) d.source = withDirectoryParty(d.source, directory);
  const sources = [...registerDocs.map((d) => d.source), ...bookSources.map((s) => withDirectoryParty(s, directory))];
  const documents = [...registerDocs, ...listInvoices(f.client_id, bookSources)];

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
      zipCode: f.clients.zip_code,
      taxpayerType: f.clients.taxpayer_type,
      fiscalYearEndMonth: f.clients.fiscal_year_end_month,
      vatRegistered: (vat ?? []).length > 0,
      incomeTaxMethod: f.clients.income_tax_method ?? null,
    },
    filing: { id: f.id, form: f.form, periodLabel: f.period_label, periodStart: f.period_start, periodEnd: f.period_end, dueDate: f.due_date },
    documents: sources,
    inputs: saved?.inputs ?? {},
    priorFigures: buildPriorFigures(prior),
    source: useBooks ? "books" : "documents",
  };
  if (f.form === "2550Q") ctx.vatCarryOver = await loadVatCarryOver(db, f.id);
  if (f.form === "1601-EQ") ctx.ewtRemittances = await loadEwtRemittances(db, f.id);
  if (f.form === "1604-E") ctx.ewtYear = await loadEwtYear(db, f.id);
  if (PAYROLL_FORM_CODES.has(f.form)) ctx.payroll = await loadPayrollContext(db, f.clients.id, f.form, f.period_start, f.period_end);
  if (f.form === "1601-C") ctx.payslips = await loadPayslips(db, f.client_id, f.period_start);
  if (formModule.usesLedger) {
    const ledger = await loadLedger(db, f.client_id, yearStart, f.period_start, f.period_end);
    if (ledger && formModule.priorWithinPeriod) ledger.statements = await loadYearStatements(db, ctx, yearStart);
    if (ledger) ctx.ledger = ledger;
  }
  return { filing, module: formModule, ctx, saved, documents };
}

/** One entry per Book invoice the figures came from, linking to it in the Books. */
function listInvoices(clientId: string, sources: SourceDocument[]): ListedDocument[] {
  const out = new Map<string, ListedDocument>();
  for (const s of sources) {
    const sale = s.docType === "sales_invoice" || s.docType === "bir_2307_received";
    const seen = out.get(s.id);
    const amount = s.docType === "sales_invoice" || s.docType === "purchase_receipt" ? s.total : 0;
    if (seen) {
      if (s.docType === "purchase_receipt") seen.source = { ...seen.source, total: seen.source.total + amount };
      continue;
    }
    out.set(s.id, {
      id: s.id,
      fileName: "",
      source: { ...s, total: amount },
      href: `/app/clients/${clientId}/books/${sale ? "sales-invoices" : "purchase-invoices"}/${s.id}`,
      label: `${sale ? "Sales Invoice" : "Purchase Invoice"}${s.number ? ` ${s.number}` : ""}`,
    });
  }
  return [...out.values()];
}

/** The previous 2550Q's excess input tax (database function vat_carry_over); null when there is none. */
async function loadVatCarryOver(db: Supabase, filingId: string): Promise<VatCarryOver | null> {
  const { data, error } = await db.rpc("vat_carry_over", { p_filing: filingId });
  if (error) throw new Error(`Could not read the previous 2550Q: ${error.message}`);
  const r = ((data ?? []) as { period_label: string; filed: boolean; computed: boolean; excess: string | number }[])[0];
  return r ? { periodLabel: r.period_label, filed: r.filed, computed: r.computed, excess: Number(r.excess) } : null;
}

/** The 0619-E of months 1 and 2 of a 1601-EQ's quarter (database function ewt_remittances). */
async function loadEwtRemittances(db: Supabase, filingId: string): Promise<EwtRemittance[]> {
  const { data, error } = await db.rpc("ewt_remittances", { p_filing: filingId });
  if (error) throw new Error(`Could not read the 0619-E returns: ${error.message}`);
  return ((data ?? []) as { month: string; period_label: string | null; status: string | null; settled: boolean; computed: boolean; remitted: string | number }[]).map((r) => ({
    month: String(r.month).slice(0, 10),
    periodLabel: r.period_label,
    status: r.status,
    settled: r.settled,
    computed: r.computed,
    remitted: Number(r.remitted),
  }));
}

/** The four 1601-EQ of a 1604-E's year (database function ewt_year_remittances). */
async function loadEwtYear(db: Supabase, filingId: string): Promise<EwtQuarter[]> {
  const { data, error } = await db.rpc("ewt_year_remittances", { p_filing: filingId });
  if (error) throw new Error(`Could not read the 1601-EQ returns: ${error.message}`);
  type R = { quarter_start: string; period_label: string | null; status: string | null; settled: boolean; computed: boolean; withheld: string | number; penalties: string | number; filed_on: string | null; payment_reference: string | null; paid_on: string | null };
  return ((data ?? []) as R[]).map((r) => ({
    quarterStart: String(r.quarter_start).slice(0, 10),
    periodLabel: r.period_label,
    status: r.status,
    settled: r.settled,
    computed: r.computed,
    withheld: Number(r.withheld),
    penalties: Number(r.penalties),
    filedOn: r.filed_on ? String(r.filed_on).slice(0, 10) : null,
    paymentReference: r.payment_reference,
    paidOn: r.paid_on ? String(r.paid_on).slice(0, 10) : null,
  }));
}

/** The month's payslips in the Books (database function payslips): the 1601-C's supporting schedule. */
async function loadPayslips(db: Supabase, clientId: string, month: string): Promise<PayslipRow[] | undefined> {
  const { data, error } = await db.rpc("payslips", { p_client: clientId, p_month: monthOf(month) });
  if (error) return undefined;
  type Raw = { employee_no: string | null; employee_name: string; pay_period_end: string | null; gross: string; sss: string; philhealth: string; pagibig: string; tax: string; sss_loan?: string; pagibig_loan?: string; other_deductions: string; net: string };
  return ((data ?? []) as Raw[]).map((r) => ({
    employeeNo: r.employee_no,
    employeeName: r.employee_name,
    payPeriodEnd: r.pay_period_end ? String(r.pay_period_end).slice(0, 10) : null,
    gross: num(r.gross),
    sss: num(r.sss),
    philhealth: num(r.philhealth),
    pagibig: num(r.pagibig),
    tax: num(r.tax),
    // The 1601-C schedule shows loan payments with the other deductions (not BIR figures).
    otherDeductions: num(r.other_deductions) + num(r.sss_loan ?? 0) + num(r.pagibig_loan ?? 0),
    net: num(r.net),
  }));
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
  // Lines coded ND stay in the books but are added back for income tax (decision 7).
  const nonDeductible = async (from: string, to: string): Promise<NonDeductibleRow[]> => {
    if (to < from) return [];
    const { data, error } = await db.rpc("books_non_deductible", { p_client: clientId, p_from: from, p_to: to });
    if (error) throw new Error(`Could not read the books: ${error.message}`);
    return ((data ?? []) as { code: string; amount: string | number }[]).map((r) => ({ code: r.code, amount: toCentavos(String(r.amount)) ?? 0 }));
  };
  const [rawPeriod, rawEarlier, ndPeriod, ndEarlier, { count }] = await Promise.all([
    movements(periodStart, periodEnd),
    movements(yearStart, dayBefore(periodStart)),
    nonDeductible(periodStart, periodEnd),
    nonDeductible(yearStart, dayBefore(periodStart)),
    db.from("journal_entries").select("id", { count: "exact", head: true }).eq("client_id", clientId).eq("status", "suggested").gte("entry_date", yearStart).lte("entry_date", periodEnd),
  ]);
  const p = withNonDeductible(rawPeriod, ndPeriod);
  const e = withNonDeductible(rawEarlier, ndEarlier);
  const period = p.rows;
  const earlier = e.rows;
  // Decision 17: the income tax return uses the fixed asset register's tax column.
  const assets = await loadAssets(db, clientId);
  const depreciation = assets.length
    ? (() => {
        const p = rangeTotals(assets, periodStart, periodEnd);
        const e = rangeTotals(assets, yearStart, dayBefore(periodStart));
        return { periodBook: p.book, periodTax: p.tax, earlierBook: e.book, earlierTax: e.tax };
      })()
    : undefined;
  // A mid-year cut-off: the opening (dated the day before the books start) carries the year to date.
  const booksStart = books.books_start as string;
  const openingYtd = booksStart > yearStart && (await movements(yearStart, dayBefore(booksStart))).some((m) => m.net !== 0);
  return {
    booksStart,
    period,
    earlier,
    suggested: count ?? 0,
    nonDeductible: { period: p.addedBack, earlier: e.addedBack },
    ...(openingYtd ? { openingYtd } : {}),
    ...(depreciation ? { depreciation } : {}),
  };
}

/** The year's financial statements at the period end, for an annual return's balance sheet schedule. */
async function loadYearStatements(db: Supabase, ctx: WorksheetContext, yearStart: string): Promise<FinancialStatements | undefined> {
  const { data, error } = await db.rpc("trial_balance", { p_client: ctx.client.id, p_from: yearStart, p_to: ctx.filing.periodEnd });
  if (error) return undefined;
  const rows = ((data ?? []) as Record<string, string | number | null>[]).map((r) => ({
    code: String(r.code),
    name: String(r.name),
    fsLine: String(r.fs_line),
    cashFlow: (r.cash_flow as CashFlowClass | null) ?? defaultCashFlow({ fsLine: String(r.fs_line), control: (r.control as Control | null) ?? null, normalSide: r.normal_side as NormalSide }),
    opening: toCentavos(String(r.opening)) ?? 0,
    debit: toCentavos(String(r.debit)) ?? 0,
    credit: toCentavos(String(r.credit)) ?? 0,
    closing: toCentavos(String(r.closing)) ?? 0,
  }));
  return buildStatements({
    kind: "annual",
    periodStart: yearStart,
    periodEnd: ctx.filing.periodEnd,
    yearStart,
    client: { name: ctx.client.name, tin: ctx.client.tin, address: ctx.client.registeredAddress },
    year: rows,
  });
}
