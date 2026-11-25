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
import { tieOuts, type LedgerTotals, type PayrollTotals, type TieId, type TieOut } from "./tieouts";

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
  ties: TieOut[];
  explainedBy: Partial<Record<TieId, { at: string }>>;
}

/** The period file for `month` (YYYY-MM-01). */
export async function loadPeriodFile(db: SupabaseClient, clientId: string, month: string): Promise<PeriodFile> {
  const to = monthEnd(month);
  const [{ data: rows, error }, { data: books }, { data: notes }, { count: paid }] = await Promise.all([
    db.from("register_lines").select(COLUMNS).eq("client_id", clientId).gte("month", quarterStart(month)).lte("month", month).limit(20000),
    db.from("client_books").select("client_id").eq("client_id", clientId).maybeSingle(),
    db.from("workpaper_explanations").select("tie, explanation, explained_at").eq("client_id", clientId).eq("period", month),
    db.from("payroll_entries").select("id", { count: "exact", head: true }).eq("client_id", clientId).eq("pay_month", month),
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
      wtcPayable: c(j.wtc_payable), compensation: c(j.compensation), cashFromSales: c(j.cash_from_sales), suggested: Number(j.suggested ?? 0),
    };
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
  return { month, lines, quarterToDate: all, ledger, payroll, ties: tieOuts({ month: lines, quarterToDate: all, ledger, payroll, explanations }), explainedBy };
}
