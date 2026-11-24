import Link from "next/link";
import { Suspense } from "react";
import { ArrowDown, ArrowUp, Check, Lock } from "lucide-react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { LOCKED_STATUSES, lockingFiling, type LockFiling } from "@/lib/documents/lock";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { LOW_CONFIDENCE } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientSelect, PeriodFilter } from "./filters";
import { periodRange } from "./period";

export default function DocumentsPage(props: PageProps<"/app/documents">) {
  return (
    <Suspense fallback={<><PageHeader title="Documents" /><Skeleton rows={8} /></>}>
      <Documents searchParams={props.searchParams} />
    </Suspense>
  );
}

const FORM_ID = "doc-filters";
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));

type Tab = "pending" | "approved";
type Sort = "name" | "-name" | "count" | "-count";

interface Row {
  id: string;
  client_id: string;
  doc_type: DocType;
  period: string;
  document_month: string;
  late: boolean;
  prior_year: boolean;
  carried_from: string | null;
  file_name: string;
  status: keyof typeof docStatusTone;
  created_at: string;
  extractions: { status: string; confidence: Record<string, number> | null; error: string | null; approved_at: string | null; approved_fields: Record<string, string | null> | null } | null;
}

async function Documents({ searchParams }: Pick<PageProps<"/app/documents">, "searchParams">) {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const sp = await searchParams;
  const tab: Tab = one(sp.tab) === "approved" ? "approved" : "pending";
  const sortParam = one(sp.sort);
  const sort: Sort = (["name", "-name", "count", "-count"] as const).find((s) => s === sortParam) ?? "name";
  const range = periodRange(one(sp.period), manilaToday(), one(sp.from), one(sp.to));
  const supabase = await supabaseServer();

  // Clients this person works on: every client for the Owner, assigned ones for staff.
  const [{ data: clientRows }, { data: assignments }] = await Promise.all([
    supabase.from("clients").select("id, name").neq("status", "archived").order("name"),
    owner ? Promise.resolve({ data: null }) : supabase.from("staff_assignments").select("client_id").eq("user_id", me.userId),
  ]);
  const mine = new Set((assignments ?? []).map((a) => a.client_id));
  const clients = (clientRows ?? []).filter((c) => owner || mine.has(c.id));
  const clientId = clients.some((c) => c.id === one(sp.client)) ? one(sp.client) : "";
  const client = clients.find((c) => c.id === clientId);

  let query = supabase
    .from("documents")
    .select("id, client_id, doc_type, period, document_month, late, prior_year, carried_from, file_name, status, created_at, extractions(status, confidence, error, approved_at, approved_fields)")
    .not("doc_type", "in", "(filed_return,payment_proof)")
    .order("created_at", { ascending: tab === "pending" })
    .limit(1000);
  query = tab === "pending" ? query.in("status", ["received", "under_review"]) : query.eq("status", "posted");
  if (clientId) query = query.eq("client_id", clientId);
  if (range) query = query.gte("period", range.from).lte("period", range.to);
  const { data, error } = await query;
  if (error) throw error;
  const ids = new Set(clients.map((c) => c.id));
  const rows = ((data ?? []) as unknown as Row[]).filter((r) => ids.has(r.client_id));

  // Pending count per client, for the tab label and the client list.
  const pendingCounts = new Map<string, number>();
  if (tab === "pending") {
    for (const r of rows) pendingCounts.set(r.client_id, (pendingCounts.get(r.client_id) ?? 0) + 1);
  } else {
    let pq = supabase.from("documents").select("client_id").in("status", ["received", "under_review"]).not("doc_type", "in", "(filed_return,payment_proof)").limit(1000);
    if (clientId) pq = pq.eq("client_id", clientId);
    if (range) pq = pq.gte("period", range.from).lte("period", range.to);
    for (const r of (await pq).data ?? []) if (ids.has(r.client_id)) pendingCounts.set(r.client_id, (pendingCounts.get(r.client_id) ?? 0) + 1);
  }
  const pendingTotal = [...pendingCounts.values()].reduce((a, b) => a + b, 0);

  const link = (over: Record<string, string>) => {
    const p = new URLSearchParams();
    const base: Record<string, string> = { client: clientId, tab, period: range?.key ?? "", from: one(sp.from), to: one(sp.to), sort: sort === "name" ? "" : sort };
    for (const [k, v] of Object.entries({ ...base, ...over })) if (v && !(k === "tab" && v === "pending") && !((k === "from" || k === "to") && (over.period ?? base.period) !== "custom")) p.set(k, v);
    const s = p.toString();
    return s ? `/app/documents?${s}` : "/app/documents";
  };

  return (
    <>
      <PageHeader
        title="Documents"
        description={client ? `${client.name}: uploaded receipts and invoices.` : "Uploaded receipts and invoices. OCR reads each one; check the figures, then approve or return it to the client."}
        actions={<ClientSelect form={FORM_ID} value={clientId} clients={clients} />}
      />

      <nav aria-label="Document lists" className="mb-5 flex gap-1 border-b border-border">
        {([["pending", `Pending review (${pendingTotal})`], ["approved", "Approved history"]] as const).map(([t, label]) => (
          <Link
            key={t}
            href={link({ tab: t })}
            aria-current={tab === t ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium ${tab === t ? "border-action text-ink-heading" : "border-transparent text-ink-muted hover:text-ink-heading"}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <form id={FORM_ID} role="search" className="mb-6">
        {tab === "approved" && <input type="hidden" name="tab" value="approved" />}
        {sort !== "name" && <input type="hidden" name="sort" value={sort} />}
        <PeriodFilter period={range?.key ?? "all"} from={range ? range.from.slice(0, 7) : ""} to={range ? range.to.slice(0, 7) : ""} />
        {tab === "approved" && <p className="mt-2 text-xs text-ink-subtle">Approved figures can be corrected until the return for their month is filed. After that the month is locked.</p>}
      </form>

      {!client ? (
        <ClientList clients={clients} tab={tab} sort={sort} link={link} counts={tab === "pending" ? pendingCounts : countBy(rows)} />
      ) : tab === "pending" ? (
        <PendingTable rows={rows} />
      ) : (
        <Suspense fallback={<Skeleton rows={6} />}>
          <ApprovedTable rows={rows} clientId={clientId} />
        </Suspense>
      )}
    </>
  );
}

function countBy(rows: Row[]) {
  const m = new Map<string, number>();
  for (const r of rows) m.set(r.client_id, (m.get(r.client_id) ?? 0) + 1);
  return m;
}

/** The client list from the sketch: name, then the count waiting (or a check when none). */
function ClientList({ clients, tab, sort, link, counts }: { clients: { id: string; name: string }[]; tab: Tab; sort: Sort; link: (o: Record<string, string>) => string; counts: Map<string, number> }) {
  const n = (id: string) => counts.get(id) ?? 0;
  const sorted = [...clients].sort((a, b) => {
    if (sort === "count" || sort === "-count") {
      const d = sort === "-count" ? n(b.id) - n(a.id) : n(a.id) - n(b.id);
      if (d) return d;
    }
    return sort === "-name" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
  });
  const countLabel = tab === "pending" ? "Pending" : "Approved";

  return (
    <Card>
      {clients.length === 0 ? (
        <p className="text-sm text-ink-muted">No clients assigned to you.</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left text-ink-subtle">
            <tr>
              <th scope="col" aria-sort={sort === "name" ? "ascending" : sort === "-name" ? "descending" : undefined} className="pb-2 font-medium">
                <Link href={link({ sort: sort === "name" ? "-name" : "" })} className="inline-flex items-center gap-1 hover:text-ink-heading">
                  Client name <SortIcon on={sort === "name" || sort === "-name"} desc={sort === "-name"} />
                </Link>
              </th>
              <th scope="col" aria-sort={sort === "count" ? "ascending" : sort === "-count" ? "descending" : undefined} className="pb-2 text-right font-medium">
                <Link href={link({ sort: sort === "-count" ? "count" : "-count" })} className="inline-flex items-center gap-1 hover:text-ink-heading">
                  {countLabel} <SortIcon on={sort === "count" || sort === "-count"} desc={sort === "-count"} />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const count = n(c.id);
              return (
                <tr key={c.id} className="border-t border-border">
                  <td className="py-2.5 pr-4">
                    <Link href={link({ client: c.id })} className="font-medium text-link hover:underline">{c.name}</Link>
                  </td>
                  <td className="py-2.5 text-right tabular-nums">
                    {tab === "pending" && count === 0 ? (
                      <span className="inline-flex items-center gap-1 text-success" title="Nothing waiting for review">
                        <Check aria-hidden className="size-4" strokeWidth={3} />
                        <span className="sr-only">Nothing waiting</span>
                      </span>
                    ) : (
                      <span className={tab === "pending" ? "font-semibold text-ink-heading" : "text-ink-muted"}>({count})</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function SortIcon({ on, desc }: { on: boolean; desc: boolean }) {
  if (!on) return null;
  return desc ? <ArrowDown aria-hidden className="size-3.5" /> : <ArrowUp aria-hidden className="size-3.5" />;
}

function MonthCell({ r }: { r: Row }) {
  return (
    <td className="py-2 pr-4 text-ink-muted">
      {showMonth(r.period)}
      {r.late && <span className="ml-1 text-xs text-warning">late</span>}
      {r.carried_from && <span className="ml-1 text-xs text-warning" title={`Carried from ${showMonth(r.carried_from)}`}>late-recorded</span>}
      {r.prior_year && <span className="ml-1 text-xs text-danger-text">prior year</span>}
    </td>
  );
}

function PendingTable({ rows }: { rows: Row[] }) {
  return (
    <Card title={`Waiting for review (${rows.length})`} actions={<span className="text-xs text-ink-subtle">Oldest first</span>}>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">Nothing waiting for this period. New uploads appear here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-sm">
            <thead className="text-left text-ink-subtle">
              <tr>
                <th scope="col" className="pb-2 font-medium">Received</th>
                <th scope="col" className="pb-2 font-medium">Document</th>
                <th scope="col" className="pb-2 font-medium">Month</th>
                <th scope="col" className="pb-2 font-medium">OCR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const e = r.extractions;
                const low = e?.status === "done" ? Object.values(e.confidence ?? {}).filter((c) => c < LOW_CONFIDENCE).length : 0;
                return (
                  <tr key={r.id} className="border-t border-border">
                    <td className="py-2 pr-4 tabular-nums text-ink-muted">{when(r.created_at)}</td>
                    <td className="py-2 pr-4">
                      <Link href={`/app/documents/${r.id}`} className="font-medium text-link hover:underline">{DOC_TYPES[r.doc_type]}</Link>
                      <p className="max-w-56 truncate text-xs text-ink-subtle">{r.file_name}</p>
                    </td>
                    <MonthCell r={r} />
                    <td className="py-2">
                      {!e ? <Badge>Not read yet</Badge> : e.status === "failed" ? <Badge tone="blocked">Failed</Badge> : e.status === "pending" ? <Badge tone="progress">Reading…</Badge> : low ? <Badge tone="waiting">{low} to check</Badge> : <Badge tone={docStatusTone[r.status]}>{docStatusLabel[r.status]}</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

/** Approved documents, newest first. Open ones can still be corrected; filed months are locked. */
async function ApprovedTable({ rows, clientId }: { rows: Row[]; clientId: string }) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, period_start, period_end, status")
    .eq("client_id", clientId)
    .in("status", LOCKED_STATUSES);
  const filings = (data ?? []) as LockFiling[];
  const sorted = [...rows].sort((a, b) => (b.extractions?.approved_at ?? b.created_at).localeCompare(a.extractions?.approved_at ?? a.created_at));

  return (
    <Card title={`Approved (${rows.length})`} actions={<span className="text-xs text-ink-subtle">Newest approval first</span>}>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">No approved documents for this period.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="text-left text-ink-subtle">
              <tr>
                <th scope="col" className="pb-2 font-medium">Approved</th>
                <th scope="col" className="pb-2 font-medium">Document</th>
                <th scope="col" className="pb-2 font-medium">Month</th>
                <th scope="col" className="pb-2 text-right font-medium">Total</th>
                <th scope="col" className="pb-2 pl-4 font-medium">Edit</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const f = r.extractions?.approved_fields ?? {};
                const total = f.total != null && f.total !== "" ? Number(f.total) : null;
                const lock = lockingFiling(r.client_id, r.document_month, filings);
                return (
                  <tr key={r.id} className="border-t border-border">
                    <td className="py-2 pr-4 tabular-nums text-ink-muted">{when(r.extractions?.approved_at ?? r.created_at)}</td>
                    <td className="py-2 pr-4">
                      <Link href={`/app/documents/${r.id}`} className="font-medium text-link hover:underline">{DOC_TYPES[r.doc_type]}{f.number ? ` ${f.number}` : ""}</Link>
                      <p className="max-w-56 truncate text-xs text-ink-subtle">{f.party_name ?? r.file_name}</p>
                    </td>
                    <MonthCell r={r} />
                    <td className="amount py-2 pr-4 text-right tabular-nums text-ink-heading">{total == null || Number.isNaN(total) ? "—" : peso.format(total)}</td>
                    <td className="py-2 pl-4">
                      {lock ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted" title={`${lock.form} ${lock.period_label} has been filed`}>
                          <Lock aria-hidden className="size-3.5" /> Locked · {lock.form} {lock.period_label} filed
                        </span>
                      ) : (
                        <Link href={`/app/documents/${r.id}`} className="text-xs font-medium text-link hover:underline">Edit figures</Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
