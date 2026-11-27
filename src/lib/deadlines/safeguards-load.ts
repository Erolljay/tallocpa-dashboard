import "server-only";
/**
 * Reads what the deadline safeguards need (src/lib/deadlines/safeguards.ts and
 * coverage.ts): the filings around today with their client, team and document
 * cycle, and each client's tax setup for the coverage checks. Works with the
 * signed-in user's client (row-level security limits what they see) and with the
 * admin client used by the morning email job.
 */
import { currentClientStatuses } from "@/lib/clients/labels";
import type { SupabaseClient } from "@supabase/supabase-js";
import { catchUpOpenIds, withoutCatchUp } from "@/lib/filings/catch-up";
import type { TaxpayerType, TaxType } from "@/lib/clients/obligations";
import type { FilingStatus } from "@/lib/filings/sign-off";
import { coverageGaps, type CoverageClient, type Gap } from "./coverage";
import { addDays, type IsoDate } from "./dates";
import { riskOf, RISK_ORDER, stepsFor, type Risk, type Step } from "./safeguards";

export interface BoardRow {
  id: string;
  clientId: string;
  clientName: string;
  clientCode: string;
  form: string;
  periodLabel: string;
  periodEnd: IsoDate;
  dueDate: IsoDate;
  status: FilingStatus;
  /** Tax due on the return, once prepared (0 for a nil return). */
  taxDue: number | null;
  preparer: { userId: string; name: string } | null;
  reviewer: { userId: string; name: string } | null;
  steps: Step[];
  risk: Risk;
}

interface FilingRow {
  id: string;
  client_id: string;
  form: string;
  period_label: string;
  period_start: string | null;
  period_end: string;
  due_date: string;
  status: FilingStatus;
  tax_due: string | number | null;
  clients: { name: string; code: string; submission_cutoff_day: number | null } | null;
}

const monthStart = (iso: string) => `${iso.slice(0, 7)}-01`;

async function holidaySet(db: SupabaseClient): Promise<Set<IsoDate>> {
  // National days: a local holiday already moved the due dates of its RDOs' clients.
  const { data } = await db.from("holidays").select("date").neq("kind", "local");
  return new Set((data ?? []).map((h: { date: string }) => String(h.date).slice(0, 10)));
}

/**
 * Filings not yet Filed & paid that are overdue or due within
 * `days`, with their steps and status, worst first. `userId` narrows to the
 * filings of clients where that person is preparer or reviewer.
 */
export async function loadBoard(db: SupabaseClient, today: IsoDate, opts: { days?: number; userId?: string } = {}): Promise<BoardRow[]> {
  const until = addDays(today, opts.days ?? 60);
  const [{ data: filings, error }, holidays, catchUp] = await Promise.all([
    db
      .from("filing_instances")
      .select("id, client_id, form, period_label, period_start, period_end, due_date, status, tax_due, clients!inner(name, code, submission_cutoff_day)")
      // Current clients only: inactive and archived ones stay off the board, the morning email and My work.
      .in("clients.status", currentClientStatuses)
      .neq("status", "filed")
      .lte("due_date", until)
      .gte("due_date", addDays(today, -120))
      .order("due_date")
      .limit(1000),
    holidaySet(db),
    catchUpOpenIds(db),
  ]);
  if (error) throw new Error(`Could not load the filings: ${error.message}`);
  // Returns of catch-up periods were filed outside the app: never on the board.
  const rows = withoutCatchUp((filings ?? []) as unknown as FilingRow[], catchUp);
  const clientIds = [...new Set(rows.map((r) => r.client_id))];
  if (clientIds.length === 0) return [];

  const [{ data: team }, { data: people }, { data: cycles }] = await Promise.all([
    db.from("staff_assignments").select("client_id, user_id, role").in("client_id", clientIds),
    db.from("staff_profiles").select("user_id, full_name"),
    db.from("document_cycles").select("client_id, period, nothing_to_submit_at, missed_cutoff, closed_at, client_confirmed_at").in("client_id", clientIds).gte("period", monthStart(addDays(today, -150))),
  ]);
  const nameOf = new Map((people ?? []).map((p: { user_id: string; full_name: string }) => [p.user_id, p.full_name]));
  const member = (clientId: string, role: "preparer" | "reviewer") => {
    const a = (team ?? []).find((t: { client_id: string; role: string }) => t.client_id === clientId && t.role === role) as { user_id: string } | undefined;
    return a ? { userId: a.user_id, name: nameOf.get(a.user_id) ?? "—" } : null;
  };
  const cycleOf = new Map(
    (cycles ?? []).map((y: { client_id: string; period: string; nothing_to_submit_at: string | null; missed_cutoff: boolean | null; closed_at: string | null; client_confirmed_at: string | null }) => [
      `${y.client_id}|${String(y.period).slice(0, 10)}`,
      y,
    ]),
  );

  const board: BoardRow[] = [];
  for (const f of rows) {
    const preparer = member(f.client_id, "preparer");
    const reviewer = member(f.client_id, "reviewer");
    if (opts.userId && preparer?.userId !== opts.userId && reviewer?.userId !== opts.userId) continue;
    const steps = stepsFor({ dueDate: f.due_date, periodEnd: f.period_end, periodStart: f.period_start ?? undefined, cutoffDay: f.clients?.submission_cutoff_day ?? 5, holidays });
    // Documents for the period are in when its last month's cycle says so: the client confirmed
    // they sent everything (P1), nothing to submit, something came in by the cutoff, or the month was closed.
    const y = cycleOf.get(`${f.client_id}|${monthStart(f.period_end)}`);
    const documentsIn = Boolean(y && (y.client_confirmed_at || y.nothing_to_submit_at || y.closed_at || y.missed_cutoff === false));
    const risk = riskOf({ steps, status: f.status, documentsIn, today, holidays });
    board.push({
      id: f.id,
      clientId: f.client_id,
      clientName: f.clients?.name ?? "—",
      clientCode: f.clients?.code ?? "",
      form: f.form,
      periodLabel: f.period_label,
      periodEnd: f.period_end,
      dueDate: f.due_date,
      status: f.status,
      taxDue: f.tax_due == null ? null : Number(f.tax_due),
      preparer,
      reviewer,
      steps,
      risk,
    });
  }
  return board.sort((a, b) => RISK_ORDER[a.risk.state] - RISK_ORDER[b.risk.state] || a.dueDate.localeCompare(b.dueDate) || a.clientName.localeCompare(b.clientName));
}

/** Coverage gaps across the clients the user (or the admin client) can see. */
export async function loadCoverage(db: SupabaseClient, today: IsoDate): Promise<Gap[]> {
  const since = monthStart(addDays(today, -95));
  const [{ data: clients }, { data: regs }, { data: obligations }, { data: team }, { data: payroll }, { data: ewt }, { data: books }] = await Promise.all([
    db.from("clients").select("id, name, taxpayer_type").in("status", ["active", "onboarding"]),
    db.from("client_registrations").select("client_id, tax_types, created_at").order("created_at", { ascending: false }),
    db.from("obligations").select("client_id, form, end_date").or(`end_date.is.null,end_date.gte.${today}`),
    db.from("staff_assignments").select("client_id, role"),
    db.from("payroll_entries").select("client_id").gte("pay_month", since).limit(5000),
    db.from("register_lines").select("client_id").eq("kind", "purchase").gt("withholding", 0).gte("month", since).limit(5000),
    db.from("client_books").select("client_id"),
  ]);
  const charted = new Set((books ?? []).map((b: { client_id: string }) => b.client_id));
  const latestTaxTypes = new Map<string, TaxType[]>();
  for (const r of (regs ?? []) as { client_id: string; tax_types: TaxType[] | null }[]) if (!latestTaxTypes.has(r.client_id)) latestTaxTypes.set(r.client_id, r.tax_types ?? []);
  const withPayroll = new Set((payroll ?? []).map((p: { client_id: string }) => p.client_id));
  const withEwt = new Set((ewt ?? []).map((p: { client_id: string }) => p.client_id));
  const list: CoverageClient[] = ((clients ?? []) as { id: string; name: string; taxpayer_type: TaxpayerType }[]).map((c) => ({
    id: c.id,
    name: c.name,
    taxpayerType: c.taxpayer_type,
    taxTypes: latestTaxTypes.get(c.id) ?? [],
    openForms: (obligations ?? []).filter((o: { client_id: string }) => o.client_id === c.id).map((o: { form: string }) => o.form),
    hasPreparer: (team ?? []).some((t: { client_id: string; role: string }) => t.client_id === c.id && t.role === "preparer"),
    hasReviewer: (team ?? []).some((t: { client_id: string; role: string }) => t.client_id === c.id && t.role === "reviewer"),
    recentPayroll: withPayroll.has(c.id),
    recentEwt: withEwt.has(c.id),
    hasChart: charted.has(c.id),
  }));
  return coverageGaps(list);
}
