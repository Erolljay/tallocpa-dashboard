import "server-only";
/**
 * Gathers one client's period file (W1): the month's register lines, the quarter's
 * to date, the books' totals (workpaper_ledger) and the payroll register's totals,
 * with the written explanations, and works out the tie-outs. Runs as the signed-in
 * user, so row-level security applies.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadPayrollContext } from "@/lib/payroll/load";
import { buildYear, month1601C } from "@/lib/payroll/year";
import { toRegisterLine, type RegisterLine, type RegisterRow } from "@/lib/register/parts";
import { toCentavos } from "@/lib/returns/money";
import { loadAssets } from "@/lib/assets/load";
import { monthTotals } from "@/lib/assets/schedule";
import type { MonthActivity, SignedRef, Signoff } from "./review";
import { tieOuts, type AssetTotals, type LedgerTotals, type PayrollTotals, type TieId, type TieOut } from "./tieouts";

const COLUMNS =
  "id, document_id, kind, source, month, line_date, reference, party_name, party_tin, terms, vatable, vat_exempt, zero_rated, vat, total, discount, vat_withheld, other_deduction, atc, withholding, net, slp_category, vat_registered";

const c = (v: unknown) => toCentavos(v as string | number | null) ?? 0;

export const monthEnd = (month: string) => {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
};
const quarterStart = (month: string) => {
  const m = Number(month.slice(5, 7));
  return `${month.slice(0, 4)}-${String(m - ((m - 1) % 3)).padStart(2, "0")}-01`;
};

export interface PeriodFile {
  month: string;
  lines: RegisterLine[];
  quarterToDate: RegisterLine[];
  ledger: LedgerTotals | null;
  payroll: PayrollTotals | null;
  assets: AssetTotals | null;
  ties: TieOut[];
  explainedBy: Partial<Record<TieId, { at: string }>>;
  activity: MonthActivity;
  signoffs: Signoff[];
  notes: ReviewNote[];
  adjustments: Adjustment[];
}

/** An adjustment of the month (a journal entry marked as one; recommendation 2). */
export interface Adjustment {
  entryId: string;
  date: string;
  memo: string;
  reference: string | null;
  kind: string;
  reason: string;
  documentId: string | null;
  amount: number;
  reversed: boolean;
  tickedAt: string | null;
}

export interface ReviewNote {
  id: string;
  ref: SignedRef;
  note: string;
  raisedAt: string;
  response: string | null;
  respondedAt: string | null;
  clearedAt: string | null;
}

/** The period file for `month` (YYYY-MM-01). */
export async function loadPeriodFile(db: SupabaseClient, clientId: string, month: string): Promise<PeriodFile> {
  const to = monthEnd(month);
  const [{ data: rows, error }, { data: books }, { data: notes }, { count: paid }, { data: signRows }, { data: noteRows }] = await Promise.all([
    db.from("register_lines").select(COLUMNS).eq("client_id", clientId).gte("month", quarterStart(month)).lte("month", month).limit(20000),
    db.from("client_books").select("client_id").eq("client_id", clientId).maybeSingle(),
    db.from("workpaper_explanations").select("tie, explanation, explained_at").eq("client_id", clientId).eq("period", month),
    db.from("payroll_entries").select("id", { count: "exact", head: true }).eq("client_id", clientId).eq("pay_month", month),
    db.from("workpaper_signoffs").select("ref, prepared_at, reviewed_at").eq("client_id", clientId).eq("period", month),
    db.from("review_notes").select("id, ref, note, raised_at, response, responded_at, cleared_at").eq("client_id", clientId).eq("period", month).order("raised_at"),
  ]);
  if (error) throw new Error(`Could not load the register: ${error.message}`);
  const all = ((rows ?? []) as unknown as RegisterRow[]).map(toRegisterLine);
  const lines = all.filter((l) => l.month === month);

  let ledger: LedgerTotals | null = null;
  if (books) {
    const { data: l, error: le } = await db.rpc("workpaper_ledger", { p_client: clientId, p_from: month, p_to: to });
    if (le) throw new Error(`Could not read the books: ${le.message}`);
    const j = (l ?? {}) as Record<string, unknown>;
    ledger = {
      revenue: c(j.revenue), outputVat: c(j.output_vat), inputVat: c(j.input_vat), ewtPayable: c(j.ewt_payable),
      wtcPayable: c(j.wtc_payable), compensation: c(j.compensation), cashFromSales: c(j.cash_from_sales),
      ppeAdditions: c(j.ppe_additions), depreciation: c(j.depreciation), suggested: Number(j.suggested ?? 0),
    };
  }

  // The fixed asset register's month (T-9, T-10).
  let assets: AssetTotals | null = null;
  if (books) {
    const list = await loadAssets(db, clientId);
    const t = monthTotals(list, month);
    assets = { additions: t.additions, depreciation: t.book, waiting: t.waiting.filter((a) => a.acquiredOn < month).length };
  }

  let payroll: PayrollTotals | null = null;
  if ((paid ?? 0) > 0) {
    const ctx = await loadPayrollContext(db, clientId, "1601-C", month, to);
    const { totals } = month1601C(buildYear(ctx), Number(month.slice(5, 7)) - 1, Number(month.slice(0, 4)));
    payroll = { gross: totals.l14, taxWithheld: totals.l25 + totals.l26 };
  }

  const explanations: Partial<Record<TieId, string>> = {};
  const explainedBy: PeriodFile["explainedBy"] = {};
  for (const n of (notes ?? []) as { tie: TieId; explanation: string; explained_at: string }[]) {
    explanations[n.tie] = n.explanation;
    explainedBy[n.tie] = { at: n.explained_at };
  }
  const { data: adjRows } = await db
    .from("adjustments")
    .select("entry_id, entry_date, kind, reason, document_id, ticked_at, journal_entries(memo, reference, status, journal_lines(debit))")
    .eq("client_id", clientId).gte("entry_date", month).lte("entry_date", to).order("entry_date");
  const adjustments: Adjustment[] = ((adjRows ?? []) as unknown as {
    entry_id: string; entry_date: string; kind: string; reason: string; document_id: string | null; ticked_at: string | null;
    journal_entries: { memo: string; reference: string | null; status: string; journal_lines: { debit: string | number }[] } | null;
  }[]).map((a) => ({
    entryId: a.entry_id, date: String(a.entry_date).slice(0, 10), memo: a.journal_entries?.memo ?? "", reference: a.journal_entries?.reference ?? null,
    kind: a.kind, reason: a.reason, documentId: a.document_id, tickedAt: a.ticked_at, reversed: a.journal_entries?.status === "reversed",
    amount: (a.journal_entries?.journal_lines ?? []).reduce((s2, l) => s2 + c(l.debit), 0),
  }));
  const activity: MonthActivity = {
    payroll: payroll != null,
    certificatesReceived: lines.some((l) => l.kind === "cwt_received"),
    ewtOnPurchases: lines.some((l) => l.kind === "purchase" && l.withholding > 0),
    fixedAssets: Boolean(assets && (assets.additions > 0 || assets.depreciation > 0)),
  };
  return {
    month, lines, quarterToDate: all, ledger, payroll, assets,
    ties: tieOuts({ month: lines, quarterToDate: all, ledger, payroll, assets, explanations }), explainedBy, activity,
    adjustments,
    signoffs: ((signRows ?? []) as { ref: SignedRef; prepared_at: string | null; reviewed_at: string | null }[]).map((r) => ({ ref: r.ref, preparedAt: r.prepared_at, reviewedAt: r.reviewed_at })),
    notes: ((noteRows ?? []) as { id: string; ref: SignedRef; note: string; raised_at: string; response: string | null; responded_at: string | null; cleared_at: string | null }[]).map((n) => ({
      id: n.id, ref: n.ref, note: n.note, raisedAt: n.raised_at, response: n.response, respondedAt: n.responded_at, clearedAt: n.cleared_at,
    })),
  };
}
