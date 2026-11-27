/**
 * The Pre-Review Assistant's connector tools (docs/AI-WORKFORCE.md §3, §7.2; build step 6).
 * Before a prepared return reaches the Reviewer it reads the return's worksheet, compares
 * it with the same form's earlier periods, runs the app's own tie-outs (sales vs the books,
 * CWT vs the 2307s received, …), checks the ₱3,000,000 VAT threshold and summarizes the
 * books for the period, and saves a draft review memo (ai_drafts) for the Reviewer.
 * Reviewing, sending back and approving stay with people (advance_filing is staff-only).
 *
 * Reads go through row-level security as the AI employee (migrations 20270107000002 and
 * 20270109000001): only its clients' returns and worksheets; the registers, explanations
 * and journal only at Full books access. Exported through ./ai-tools.ts for the registry.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { BOOKS_GO_LIVE } from "@/lib/ledger/types";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { grossSales, toRegisterLine, type RegisterLine, type RegisterRow } from "@/lib/register/parts";
import { toCentavos } from "@/lib/returns/money";
import type { Centavos, WorksheetResult } from "@/lib/returns/types";
import { TIES_FOR_FORM, monthsOf, tieOuts, type LedgerTotals, type TieId } from "@/lib/workpapers/tieouts";
import { compareLines, pesos, quarterStart, twelveMonthsFrom, vatThresholdStatus } from "./pre-review";

const ASSISTANT = ["pre_review_assistant"] as const;
/** A return waiting for the Reviewer: marked prepared, not yet reviewed. */
export const WAITING_FOR_REVIEW = "prepared";
const MEMO_KIND = "review_memo";
const FULL = "Needs Full books access.";

const filingId = z.string().uuid("Give the return's id (from returns_to_pre_review).");
const c = (v: unknown) => toCentavos(v as string | number | null) ?? 0;

interface FilingRow extends Record<string, unknown> {
  id: string;
  client_id: string;
  client_code: string;
  client: string;
  obligation_id: string;
  form: string;
  period_label: string;
  period_start: string;
  period_end: string;
  due_date: string;
  status: string;
  tax_due: string | null;
  amendment_no: number;
  open_query: string | null;
}

/** One of the AI employee's clients' returns, or a refusal (not visible, or not there). */
async function loadFiling(db: Queryable, id: string): Promise<FilingRow> {
  const { rows } = await db.query<FilingRow>(
    `select f.id, f.client_id, c.code as client_code, c.name as client, f.obligation_id, f.form, f.period_label,
            f.period_start::text, f.period_end::text, f.due_date::text, f.status, f.tax_due::text, f.amendment_no, f.open_query
     from public.filing_instances f join public.clients c on c.id = f.client_id
     where f.id = $1`,
    [id],
  );
  if (!rows[0]) throw new ToolRefusal(`No return ${id} among your clients' returns.`);
  return rows[0];
}

export const returnsToPreReview = defineTool({
  name: "returns_to_pre_review",
  title: "Returns to pre-review",
  description:
    "Your clients' returns marked prepared and waiting for the Reviewer, earliest due first: client, form, period, due date, tax due and whether a worksheet is saved. Returns you already wrote a memo on (still open, or accepted or rejected by a reviewer) are left out and only counted, so each run works new returns; pass include_reviewed to list them too. Optionally for one client.",
  input: z.object({
    client: clientRef.optional().describe("Only this client (id or code)"),
    limit: z.number().int().min(1).max(200).default(50).describe("At most this many returns"),
    include_reviewed: z.boolean().default(false).describe("Also list returns you already wrote a memo on"),
  }),
  employees: ASSISTANT,
  effect: "read",
  async run({ db, today, noteClient }, { client, limit, include_reviewed }) {
    let clientId: string | null = null;
    if (client) {
      const found = await findClient(db, client);
      if (!found) throw notYours(client);
      clientId = found.id;
      noteClient(found.id);
    }
    const { rows } = await db.query<{
      id: string;
      client_code: string;
      client: string;
      form: string;
      period_label: string;
      due_date: string;
      tax_due: string | null;
      amendment_no: number;
      worksheet: boolean;
      my_memo: string | null;
    }>(
      `with mine as (
         -- This AI employee's latest memo on each return (its own drafts only, by RLS).
         select distinct on (subject_id) subject_id, status
         from public.ai_drafts
         where ai_user_id = auth.uid() and subject_table = 'filing_instances' and kind = $5 and status <> 'withdrawn'
         order by subject_id, created_at desc
       )
       select f.id, c.code as client_code, c.name as client, f.form, f.period_label, f.due_date::text, f.tax_due::text,
              f.amendment_no, exists (select 1 from public.return_worksheets w where w.filing_instance_id = f.id and w.result is not null) as worksheet,
              m.status as my_memo
       from public.filing_instances f join public.clients c on c.id = f.client_id
       left join mine m on m.subject_id = f.id
       where f.status = $1 and ($2::uuid is null or f.client_id = $2) and ($4 or m.subject_id is null)
       order by f.due_date, c.name, f.form
       limit $3`,
      [WAITING_FOR_REVIEW, clientId, limit, include_reviewed, MEMO_KIND],
    );
    const { rows: counted } = await db.query<{ n: number }>(
      `select count(*)::int as n
       from public.filing_instances f
       where f.status = $1 and ($2::uuid is null or f.client_id = $2)
         and exists (select 1 from public.ai_drafts a
                     where a.ai_user_id = auth.uid() and a.subject_table = 'filing_instances' and a.subject_id = f.id
                       and a.kind = $3 and a.status <> 'withdrawn')`,
      [WAITING_FOR_REVIEW, clientId, MEMO_KIND],
    );
    return {
      today,
      already_reviewed: counted[0]?.n ?? 0,
      returns: rows.map((r) => ({
        id: r.id,
        client_code: r.client_code,
        client: r.client,
        form: r.form,
        period: r.period_label,
        due_date: r.due_date,
        overdue: r.due_date < today,
        tax_due: r.tax_due == null ? null : Number(r.tax_due),
        amended: r.amendment_no > 0,
        worksheet_saved: r.worksheet,
        my_memo: r.my_memo ?? "none",
      })),
    };
  },
});

interface Prior extends Record<string, unknown> {
  period_label: string;
  period_start: string;
  status: string;
  tax_due: string | null;
  figures: Record<string, Centavos> | null;
}

const REGISTER_COLUMNS =
  "id, document_id, kind, source, month::text, line_date::text, reference, party_name, party_tin, terms, vatable, vat_exempt, zero_rated, vat, total, discount, vat_withheld, other_deduction, atc, withholding, net, slp_category, vat_registered";

async function registerLines(db: Queryable, clientId: string, from: string, to: string): Promise<RegisterLine[]> {
  const { rows } = await db.query<RegisterRow & Record<string, unknown>>(
    `select ${REGISTER_COLUMNS} from public.register_lines where client_id = $1 and month between $2::date and $3::date order by month, line_date limit 20000`,
    [clientId, from, to],
  );
  return rows.map(toRegisterLine);
}

/** The tie-outs this form needs, month by month, as the app's workpapers compute them. */
async function formTieOuts(db: Queryable, f: FilingRow) {
  const needed = (TIES_FOR_FORM[f.form] ?? []) as TieId[];
  if (needed.length === 0) return { needed: [], note: "This form needs no tie-outs.", ties: [] };
  const { rows: books } = await db.query<{ books_start: string | null }>(`select books_start::text from public.client_books where client_id = $1`, [f.client_id]);
  if (!books[0]) return { needed, note: "This client has no books in TalloCPA OS, so there is nothing to tie out.", ties: [] };
  // Workpapers exist from the client's books start, not before the January 2027 cycle (as the approval memo).
  const start = books[0].books_start ? `${books[0].books_start.slice(0, 7)}-01` : null;
  const from = start && start > BOOKS_GO_LIVE ? start : BOOKS_GO_LIVE;
  const months = monthsOf(f.period_start, f.period_end).filter((m) => m >= from);
  if (months.length === 0) return { needed, note: "No workpapers for this period (before the books or the January 2027 cycle).", ties: [] };

  const all = await registerLines(db, f.client_id, quarterStart(months[0]), months[months.length - 1]);
  const { rows: notes } = await db.query<{ period: string; tie: TieId; explanation: string }>(
    `select period::text, tie, explanation from public.workpaper_explanations where client_id = $1 and period between $2::date and $3::date`,
    [f.client_id, months[0], months[months.length - 1]],
  );
  const ties = [];
  for (const m of months) {
    const [y, mm] = m.split("-").map(Number);
    const end = new Date(Date.UTC(y, mm, 0)).toISOString().slice(0, 10);
    const { rows } = await db.query<{ j: Record<string, unknown> }>(`select public.workpaper_ledger($1, $2::date, $3::date) as j`, [f.client_id, m, end]);
    const j = rows[0]?.j ?? {};
    const ledger: LedgerTotals = {
      revenue: c(j.revenue), outputVat: c(j.output_vat), inputVat: c(j.input_vat), ewtPayable: c(j.ewt_payable),
      wtcPayable: c(j.wtc_payable), compensation: c(j.compensation), cashFromSales: c(j.cash_from_sales),
      ppeAdditions: c(j.ppe_additions), depreciation: c(j.depreciation), suggested: Number(j.suggested ?? 0),
    };
    const explanations: Partial<Record<TieId, string>> = {};
    for (const n of notes) if (n.period === m) explanations[n.tie] = n.explanation;
    // Payroll and assets feed T-6, T-7, T-9 and T-10, which no return needs before it is prepared.
    const computed = tieOuts({
      month: all.filter((l) => l.month === m),
      quarterToDate: all.filter((l) => l.month >= quarterStart(m) && l.month <= m),
      ledger, payroll: null, assets: null, explanations,
    });
    for (const t of computed.filter((x) => needed.includes(x.id))) {
      ties.push({
        month: m, id: t.id, what: t.what, status: t.status,
        left: { label: t.left.label, amount: pesos(t.left.amount) }, right: { label: t.right.label, amount: pesos(t.right.amount) },
        difference: pesos(t.difference), note: t.note, explanation: t.explanation,
      });
    }
  }
  return { needed, note: null, ties, open: ties.filter((t) => t.status === "open").length };
}

export const preReviewReturn = defineTool({
  name: "pre_review_return",
  title: "Pre-review a return",
  description:
    "One of your clients' prepared returns, with what a reviewer checks first: the worksheet's lines with the app's errors and warnings; the same form's last three periods and the same period last year, with the lines that moved most; and, with Full books access, the tie-outs the form needs (sales vs the books, CWT vs the 2307s received, input and output VAT, EWT), customers whose CWT has no 2307 yet, the ₱3,000,000 VAT threshold on the last twelve months' sales, and the books for the period by account type. Amounts in pesos.",
  input: z.object({ filing_id: filingId }),
  employees: ASSISTANT,
  effect: "read",
  async run({ db, caller, noteClient }, { filing_id }) {
    const f = await loadFiling(db, filing_id);
    noteClient(f.client_id);

    const { rows: ws } = await db.query<{ result: WorksheetResult | null; figures: Record<string, Centavos>; computed_at: string | null }>(
      `select result, figures, computed_at::text from public.return_worksheets where filing_instance_id = $1`,
      [f.id],
    );
    const result = ws[0]?.result ?? null;

    // The same form's earlier periods (latest amendment of each), and the same period a year before.
    const { rows: prior } = await db.query<Prior>(
      `select distinct on (f.period_end) f.period_label, f.period_start::text, f.status, f.tax_due::text, w.figures
       from public.filing_instances f left join public.return_worksheets w on w.filing_instance_id = f.id
       where f.client_id = $1 and f.form = $2 and f.period_end < $3::date
       order by f.period_end desc, f.amendment_no desc
       limit 3`,
      [f.client_id, f.form, f.period_start],
    );
    const { rows: lastYear } = await db.query<Prior>(
      `select f.period_label, f.period_start::text, f.status, f.tax_due::text, w.figures
       from public.filing_instances f left join public.return_worksheets w on w.filing_instance_id = f.id
       where f.client_id = $1 and f.form = $2 and f.period_start = ($3::date - interval '1 year')::date
       order by f.amendment_no desc limit 1`,
      [f.client_id, f.form, f.period_start],
    );
    const showPrior = (p: Prior) => ({ period: p.period_label, status: p.status, tax_due: p.tax_due == null ? null : Number(p.tax_due), worksheet_saved: Boolean(p.figures && Object.keys(p.figures).length) });
    const moved = (p: Prior | undefined) =>
      p && result && p.figures ? compareLines(result, p.figures).map((l) => ({ ...l, current: pesos(l.current), previous: pesos(l.previous), change: pesos(l.change) })) : null;

    const full = caller.booksLevel === "full";
    let tieouts: unknown = FULL;
    let cwt: unknown = FULL;
    let threshold: unknown = FULL;
    let ledger: unknown = FULL;
    if (full) {
      tieouts = await formTieOuts(db, f);

      // Customers who withheld CWT this quarter without a 2307 yet (income tax forms only).
      const lastMonth = `${f.period_end.slice(0, 7)}-01`;
      if ((TIES_FOR_FORM[f.form] ?? []).includes("T-3")) {
        const q = await registerLines(db, f.client_id, quarterStart(lastMonth), lastMonth);
        const by = new Map<string, { customer: string; tin: string | null; cwt_on_sales: Centavos; received: Centavos }>();
        for (const l of q) {
          if (!(l.kind === "sale" && l.withholding > 0) && l.kind !== "cwt_received") continue;
          const k = l.partyTin ?? l.partyName ?? "?";
          const row = by.get(k) ?? { customer: l.partyName ?? "(no name)", tin: l.partyTin, cwt_on_sales: 0, received: 0 };
          if (l.kind === "sale") row.cwt_on_sales += l.withholding;
          else row.received += l.withholding;
          by.set(k, row);
        }
        cwt = [...by.values()]
          .filter((r) => r.cwt_on_sales - r.received > 100)
          .map((r) => ({ customer: r.customer, tin: r.tin, cwt_on_sales: pesos(r.cwt_on_sales), received_2307: pesos(r.received), missing: pesos(r.cwt_on_sales - r.received) }));
      } else {
        cwt = "Not an income tax return.";
      }

      // The ₱3,000,000 VAT threshold, on the sales register's last twelve months.
      const { rows: vat } = await db.query<{ registered: boolean }>(
        `select exists (select 1 from public.obligations o where o.client_id = $1 and o.form in ('2550M', '2550Q')
                          and o.start_date <= $3::date and (o.end_date is null or o.end_date >= $2::date)) as registered`,
        [f.client_id, f.period_start, f.period_end],
      );
      const sales = (await registerLines(db, f.client_id, twelveMonthsFrom(lastMonth), lastMonth)).filter((l) => l.kind === "sale").reduce((s, l) => s + grossSales(l), 0);
      const t = vatThresholdStatus(sales, Boolean(vat[0]?.registered));
      threshold = { ...t, threshold: pesos(t.threshold), sales_last_12_months: pesos(sales), from: twelveMonthsFrom(lastMonth), to: lastMonth, basis: "Sales register (approved documents) only." };

      // The books for the period, by account type (debits positive).
      const { rows: tb } = await db.query<{ type: string; debit: string; credit: string }>(
        `select type, sum(debit)::text as debit, sum(credit)::text as credit from public.ai_trial_balance($1, $2::date, $3::date) group by type order by type`,
        [f.client_id, f.period_start, f.period_end],
      );
      const active = tb.filter((r) => c(r.debit) !== 0 || c(r.credit) !== 0);
      ledger = active.length ? active.map((r) => ({ type: r.type, debits: pesos(c(r.debit)), credits: pesos(c(r.credit)), net_debit: pesos(c(r.debit) - c(r.credit)) })) : "No posted entries in the period, or no books.";
    }

    return {
      return: {
        id: f.id, client_code: f.client_code, client: f.client, form: f.form, period: f.period_label, period_start: f.period_start, period_end: f.period_end,
        due_date: f.due_date, status: f.status, tax_due: f.tax_due == null ? null : Number(f.tax_due), amended: f.amendment_no > 0, open_query: f.open_query,
      },
      worksheet: result
        ? {
            computed_at: ws[0]?.computed_at ?? null,
            errors: result.errors ?? [],
            warnings: result.warnings ?? [],
            lines: result.sections.flatMap((s) => s.lines.filter((l) => l.amount != null).map((l) => ({ section: s.title, line: l.line, label: l.label, amount: pesos(l.amount) }))),
          }
        : "No worksheet saved for this return.",
      prior_periods: prior.map(showPrior),
      same_period_last_year: lastYear[0] ? showPrior(lastYear[0]) : null,
      moved_vs_previous: moved(prior[0]) ?? "No earlier worksheet to compare with.",
      moved_vs_last_year: moved(lastYear[0]) ?? "No worksheet for the same period last year.",
      tie_outs: tieouts,
      customers_without_2307: cwt,
      vat_threshold: threshold,
      books_for_period: ledger,
    };
  },
});

const SEVERITY = ["high", "medium", "low"] as const;
const SEVERITY_LABEL: Record<(typeof SEVERITY)[number], string> = { high: "Must look", medium: "Check", low: "Note" };

export const saveReviewMemo = defineTool({
  name: "save_review_memo",
  title: "Save a review memo",
  description:
    "Save your pre-review memo on one prepared return as a draft for the Reviewer: a short summary and your findings (high = must look before reviewing, medium = check, low = note), each with what you saw and the figures. The Reviewer accepts or rejects it; it changes nothing on the return. A new memo on the same return replaces your earlier one. With no findings, say in the summary what you checked.",
  input: z.object({
    filing_id: filingId,
    summary: z.string().trim().min(10, "Sum up the return in a sentence or two.").max(1500).describe("Overall, for the Reviewer"),
    findings: z
      .array(
        z.object({
          severity: z.enum(SEVERITY).describe("high, medium or low"),
          item: z.string().trim().min(3).max(120).describe("What it is about, e.g. 'T-1 sales vs revenue, February'"),
          detail: z.string().trim().min(5).max(800).describe("What you saw, with the figures"),
        }),
      )
      .max(30)
      .default([]),
  }),
  employees: ASSISTANT,
  effect: "draft",
  async run({ db, noteClient }, { filing_id, summary, findings }) {
    const f = await loadFiling(db, filing_id);
    noteClient(f.client_id);
    if (f.status !== WAITING_FOR_REVIEW) {
      throw new ToolRefusal(`This return is ${f.status.replace(/_/g, " ")}; only prepared returns waiting for the Reviewer take a memo.`);
    }
    const order = (s: (typeof SEVERITY)[number]) => SEVERITY.indexOf(s);
    const sorted = [...findings].sort((a, b) => order(a.severity) - order(b.severity));
    const lines = [
      { label: "Return", value: `${f.form} · ${f.period_label} (${f.client_code})` },
      ...sorted.map((x) => ({ label: `${SEVERITY_LABEL[x.severity]}: ${x.item}`, value: x.detail })),
    ];
    if (sorted.length === 0) lines.push({ label: "Findings", value: "None" });
    const draft = await saveDraft(db, {
      kind: MEMO_KIND,
      clientId: f.client_id,
      subject: { table: "filing_instances", id: f.id },
      summary: lines,
      data: { filing_id: f.id, findings: sorted, high: sorted.filter((x) => x.severity === "high").length },
      note: summary,
    });
    return { saved: true, draft_id: draft.id, status: draft.status, for_reviewer: lines };
  },
});
