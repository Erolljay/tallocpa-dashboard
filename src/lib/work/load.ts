import "server-only";
/**
 * Gathers "My work" (W3): every open action on the clients of the person signed in.
 * Runs as that person, so row-level security limits it to their clients. The roles
 * decide what is theirs (src/lib/work/next-actions.ts).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { monthTotals } from "@/lib/assets/schedule";
import { loadAssets } from "@/lib/assets/load";
import { addDays, type IsoDate } from "@/lib/deadlines/dates";
import { loadBoard } from "@/lib/deadlines/safeguards-load";
import { keepBooksReady } from "@/lib/filings/books-ready";
import { showMonth } from "@/lib/documents/labels";
import { periodLabel } from "@/lib/payroll/periods";
import { filingItem, type Role, type WorkItem } from "./next-actions";

const ym = (d: string) => String(d).slice(0, 7);
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const lastMonth = (today: IsoDate) => `${addDays(`${today.slice(0, 7)}-01`, -1).slice(0, 7)}-01`;

export interface MyWork {
  items: WorkItem[];
  /** The roles the person has on any client. */
  roles: Role[];
}

/**
 * `everything`: the Owner's "All clients", taking every role on every client; otherwise each
 * client's role from the staff assignments, and "owner" for the Owner's approvals.
 */
export async function loadMyWork(db: SupabaseClient, me: { userId: string; role: string }, today: IsoDate, everything: boolean): Promise<MyWork> {
  const owner = me.role === "owner";
  const { data: assigned } = await db.from("staff_assignments").select("client_id, role").eq("user_id", me.userId);
  const { data: clientRows } = await db.from("clients").select("id, name").neq("status", "archived");
  const names = new Map((clientRows ?? []).map((c) => [c.id, c.name as string]));
  const rolesOf = new Map<string, Set<Role>>();
  for (const c of clientRows ?? []) {
    const r = new Set<Role>();
    if (owner) r.add("owner");
    if (owner && everything) {
      r.add("preparer");
      r.add("reviewer");
    }
    rolesOf.set(c.id, r);
  }
  for (const a of (assigned ?? []) as { client_id: string; role: string }[]) {
    // A reviewer on the staff who is the client's preparer still prepares; the reviewer reviews.
    rolesOf.get(a.client_id)?.add(a.role === "reviewer" ? "reviewer" : "preparer");
  }
  const ids = [...rolesOf.entries()].filter(([, r]) => r.size > 0).map(([id]) => id);
  if (ids.length === 0) return { items: [], roles: [] };

  const items: WorkItem[] = [];
  const push = (clientId: string, period: string, role: Role, label: string, href: string, urgency: WorkItem["urgency"] = "open", due: string | null = null) => {
    if (!rolesOf.get(clientId)?.has(role)) return;
    items.push({ clientId, clientName: names.get(clientId) ?? "—", period, role, label, href, urgency, due });
  };

  const since = `${addDays(today, -120).slice(0, 7)}-01`;
  const [board, { data: docs }, { data: suggested }, { data: books }, { data: pay }, { data: postings }, { data: notes }, { data: signoffs }, { data: adjustments }] = await Promise.all([
    loadBoard(db, today, owner && everything ? {} : { days: 45 }),
    db.from("documents").select("client_id, document_month").in("client_id", ids).in("status", ["received", "under_review"]).limit(10000),
    db.from("journal_entries").select("client_id, entry_date").in("client_id", ids).eq("status", "suggested").limit(10000),
    db.from("client_books").select("client_id, books_start").in("client_id", ids),
    db.from("payroll_entries").select("client_id, pay_month, pay_period_end").in("client_id", ids).gte("pay_month", since).limit(20000),
    db.from("payroll_postings").select("client_id, pay_month, period_end, journal_entries(status)").in("client_id", ids).gte("pay_month", since),
    db.from("review_notes").select("client_id, period, response").in("client_id", ids).is("cleared_at", null),
    db.from("workpaper_signoffs").select("client_id, period, ref").in("client_id", ids).not("prepared_at", "is", null).is("reviewed_at", null),
    db.from("adjustments").select("client_id, entry_date, journal_entries(status)").in("client_id", ids).is("ticked_at", null),
  ]);

  // Returns: each one's next sign-off step, only once the Books of its period are locked
  // (docs/REWORK.md, decision 10); until then the month's Inbox and lock are the work.
  for (const r of await keepBooksReady(board, db)) {
    if (!ids.includes(r.clientId)) continue;
    const i = filingItem(r);
    if (i) push(i.clientId, i.period, i.role, i.label, i.href, i.urgency, i.due);
  }

  // Documents to review, by the month they are for.
  const count = <T,>(rows: T[] | null, key: (r: T) => string) => {
    const m = new Map<string, number>();
    for (const r of rows ?? []) m.set(key(r), (m.get(key(r)) ?? 0) + 1);
    return m;
  };
  for (const [k, n] of count(docs as { client_id: string; document_month: string }[] | null, (d) => `${d.client_id}|${ym(d.document_month)}`)) {
    const [c, p] = k.split("|");
    push(c, p, "preparer", `Review ${plural(n, "document")}`, `/app/documents?client=${c}`);
  }
  for (const [k, n] of count(suggested as { client_id: string; entry_date: string }[] | null, (e) => `${e.client_id}|${ym(e.entry_date)}`)) {
    const [c, p] = k.split("|");
    push(c, p, "preparer", `Confirm ${plural(n, "suggested entry", "suggested entries")}`, `/app/clients/${c}/books`);
  }

  // Payroll runs not in the books (clients with books, months from the books start).
  const startOf = new Map((books ?? []).map((b) => [b.client_id as string, String(b.books_start).slice(0, 10)]));
  const posted = new Set(
    ((postings ?? []) as unknown as { client_id: string; period_end: string; journal_entries: { status: string } | null }[])
      .filter((p) => p.journal_entries?.status === "posted")
      .map((p) => `${p.client_id}|${String(p.period_end).slice(0, 10)}`),
  );
  const runs = new Set(((pay ?? []) as { client_id: string; pay_month: string; pay_period_end: string | null }[]).map((r) => `${r.client_id}|${String(r.pay_month).slice(0, 10)}|${r.pay_period_end ? String(r.pay_period_end).slice(0, 10) : ""}`));
  for (const k of runs) {
    const [c, month, end] = k.split("|");
    const start = startOf.get(c);
    if (!start || month < `${start.slice(0, 7)}-01`) continue;
    if (posted.has(`${c}|${end || month}`)) continue;
    push(c, ym(month), "preparer", `Post payroll ${periodLabel(month, end || null)} to the books`, `/app/clients/${c}/payroll/month/${ym(month)}`);
  }

  // Fixed assets: depreciation to set up, and last month's run.
  const prev = lastMonth(today);
  const { data: withAssets } = await db.from("fixed_assets").select("client_id").in("client_id", [...startOf.keys()]);
  for (const c of new Set((withAssets ?? []).map((a) => a.client_id as string))) {
    const assets = await loadAssets(db, c);
    if (assets.length === 0) continue;
    const waiting = assets.filter((a) => a.status === "setup");
    if (waiting.length) push(c, ym(waiting[waiting.length - 1].acquiredOn), "preparer", `Set up the depreciation of ${plural(waiting.length, "asset")}`, `/app/clients/${c}/fixed-assets`);
    if (prev >= `${(startOf.get(c) ?? "").slice(0, 7)}-01` && monthTotals(assets, prev).book > 0) {
      const { data: run } = await db.from("depreciation_runs").select("journal_entries(status)").eq("client_id", c).eq("month", prev).maybeSingle();
      if ((run?.journal_entries as unknown as { status: string } | null)?.status !== "posted")
        push(c, ym(prev), "preparer", `Run depreciation for ${showMonth(prev)}`, `/app/clients/${c}/fixed-assets?month=${ym(prev)}`);
    }
  }

  // Workpapers: notes to answer or clear, reviews to sign, adjustments to tick.
  const wp = (c: string, period: string) => `/app/clients/${c}/workpapers?month=${ym(period)}`;
  const notesBy = count(notes as { client_id: string; period: string; response: string | null }[] | null, (n) => `${n.client_id}|${String(n.period).slice(0, 10)}|${n.response ? "answered" : "open"}`);
  for (const [k, n] of notesBy) {
    const [c, p, state] = k.split("|");
    if (state === "open") push(c, ym(p), "preparer", `Answer ${plural(n, "review note")}`, `${wp(c, p)}#notes`);
    else push(c, ym(p), "reviewer", `Clear ${plural(n, "answered review note")}`, `${wp(c, p)}#notes`);
  }
  const toSign = new Map<string, string[]>();
  for (const s of (signoffs ?? []) as { client_id: string; period: string; ref: string }[]) {
    const k = `${s.client_id}|${String(s.period).slice(0, 10)}`;
    toSign.set(k, [...(toSign.get(k) ?? []), s.ref]);
  }
  for (const [k, refs] of toSign) {
    const [c, p] = k.split("|");
    push(c, ym(p), "reviewer", `Sign the review of ${refs.sort().join(", ")}`, wp(c, p));
  }
  const adj = ((adjustments ?? []) as unknown as { client_id: string; entry_date: string; journal_entries: { status: string } | null }[]).filter((a) => a.journal_entries?.status === "posted");
  for (const [k, n] of count(adj, (a) => `${a.client_id}|${ym(a.entry_date)}`)) {
    const [c, p] = k.split("|");
    push(c, p, "reviewer", `Tick ${plural(n, "adjustment")}`, `${wp(c, `${p}-01`)}#adjustments`);
  }

  const roles = new Set<Role>();
  for (const id of ids) for (const r of rolesOf.get(id) ?? []) roles.add(r);
  return { items, roles: [...roles] };
}
