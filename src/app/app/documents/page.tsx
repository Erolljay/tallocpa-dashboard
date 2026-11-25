import Link from "next/link";
import { Suspense } from "react";
import { RiArrowDownLine, RiArrowUpLine, RiCheckLine, RiLockLine } from "@remixicon/react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { LOCKED_STATUSES, lockingFiling, type LockFiling } from "@/lib/documents/lock";
import { DOC_TYPES, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { bulkReadiness, type AccountSource } from "@/lib/documents/bulk";
import { ACCOUNT_TYPES } from "@/lib/ledger/types";
import { LOW_CONFIDENCE, normalizeFields, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { ClientSelect, PeriodFilter } from "./filters";
import { PendingReview, type PendingRow } from "./pending-review";
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
  extractions: { status: string; fields: Record<string, string | null> | null; confidence: Record<string, number> | null; error: string | null; approved_at: string | null; approved_fields: Record<string, string | null> | null } | null;
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
    .select("id, client_id, doc_type, period, document_month, late, prior_year, carried_from, file_name, status, created_at, extractions(status, fields, confidence, error, approved_at, approved_fields)")
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

      {/* BoardUI underline tabs (components/base/tabs), as links so each list has its own URL. */}
      <nav aria-label="Document lists" className="mb-5 flex gap-1 border-b border-separator-border">
        {([["pending", "Pending review", pendingTotal], ["approved", "Approved history", null]] as const).map(([t, label, count]) => (
          <Link
            key={t}
            href={link({ tab: t })}
            aria-current={tab === t ? "page" : undefined}
            className={cx(
              "-mb-px inline-flex items-center gap-2.5 border-b-2 px-2.5 py-2 whitespace-nowrap transition-colors duration-150",
              "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-border-focus-ring",
              tab === t ? "border-accent-600 text-body-medium text-accent-600" : "border-transparent text-body-regular text-text-primary hover:text-text-secondary",
            )}
          >
            {label}
            {count != null && (
              <span className={cx("rounded-sm px-1 py-px text-caption-1-medium tabular-nums", tab === t ? "bg-tab-count-selected-background text-accent-600" : "bg-background-tertiary-default text-text-secondary")}>
                {count}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <form id={FORM_ID} role="search" className="mb-6">
        {tab === "approved" && <input type="hidden" name="tab" value="approved" />}
        {sort !== "name" && <input type="hidden" name="sort" value={sort} />}
        <PeriodFilter period={range?.key ?? "all"} from={range ? range.from.slice(0, 7) : ""} to={range ? range.to.slice(0, 7) : ""} />
        {tab === "approved" && <p className="mt-2 text-caption-1-regular text-text-tertiary">Approved figures can be corrected until the return for their month is filed. After that the month is locked.</p>}
      </form>

      {!client ? (
        <ClientList clients={clients} tab={tab} sort={sort} link={link} counts={tab === "pending" ? pendingCounts : countBy(rows)} complete={await confirmedMonths(supabase, clients.map((c) => c.id))} />
      ) : tab === "pending" ? (
        <Suspense fallback={<Skeleton rows={6} />}>
          <ClientPending rows={rows} clientId={clientId} />
        </Suspense>
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

/** Open months each client confirmed as complete in the portal (P1): staff can start before the cutoff. */
async function confirmedMonths(supabase: Awaited<ReturnType<typeof supabaseServer>>, ids: string[]): Promise<Map<string, string[]>> {
  if (ids.length === 0) return new Map();
  const { data } = await supabase.from("document_cycles").select("client_id, period").in("client_id", ids).not("client_confirmed_at", "is", null).is("closed_at", null).order("period");
  const out = new Map<string, string[]>();
  for (const y of data ?? []) out.set(y.client_id, [...(out.get(y.client_id) ?? []), showMonth(String(y.period))]);
  return out;
}

/** The client list from the sketch: name, then the count waiting (or a check when none). */
function ClientList({ clients, tab, sort, link, counts, complete }: { clients: { id: string; name: string }[]; tab: Tab; sort: Sort; link: (o: Record<string, string>) => string; counts: Map<string, number>; complete: Map<string, string[]> }) {
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
        <p className="text-body-regular text-text-secondary">No clients assigned to you.</p>
      ) : (
        <table className="w-full text-body-regular">
          <thead className="text-start text-body-medium text-text-tertiary">
            <tr>
              <th scope="col" aria-sort={sort === "name" ? "ascending" : sort === "-name" ? "descending" : undefined} className="text-start pb-2">
                <Link href={link({ sort: sort === "name" ? "-name" : "" })} className="inline-flex items-center gap-1 hover:text-text-primary">
                  Client name <SortIcon on={sort === "name" || sort === "-name"} desc={sort === "-name"} />
                </Link>
              </th>
              <th scope="col" aria-sort={sort === "count" ? "ascending" : sort === "-count" ? "descending" : undefined} className="pb-2 text-end">
                <Link href={link({ sort: sort === "-count" ? "count" : "-count" })} className="inline-flex items-center gap-1 hover:text-text-primary">
                  {countLabel} <SortIcon on={sort === "count" || sort === "-count"} desc={sort === "-count"} />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const count = n(c.id);
              return (
                <tr key={c.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                  <td className="py-2.5 pe-4">
                    <Link href={link({ client: c.id })} className="font-medium text-button-ghost-foreground hover:underline">{c.name}</Link>
                    {(complete.get(c.id) ?? []).map((m) => (
                      <span key={m} className="ms-2 inline-block align-middle"><Badge tone="done">Sent everything for {m}</Badge></span>
                    ))}
                  </td>
                  <td className="py-2.5 text-end tabular-nums">
                    {tab === "pending" && count === 0 ? (
                      <span className="inline-flex items-center gap-1 text-status-lime-text" title="Nothing waiting for review">
                        <RiCheckLine aria-hidden className="size-4" />
                        <span className="sr-only">Nothing waiting</span>
                      </span>
                    ) : (
                      <span className={tab === "pending" ? "font-semibold text-text-primary" : "text-text-secondary"}>({count})</span>
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
  return desc ? <RiArrowDownLine aria-hidden className="size-3.5" /> : <RiArrowUpLine aria-hidden className="size-3.5" />;
}

function MonthCell({ r }: { r: Row }) {
  return (
    <td className="py-2 pe-4 text-text-secondary">
      {showMonth(r.period)}
      {r.late && <span className="ms-1 text-caption-1-regular text-status-yellow-text">late</span>}
      {r.carried_from && <span className="ms-1 text-caption-1-regular text-status-yellow-text" title={`Carried from ${showMonth(r.carried_from)}`}>late-recorded</span>}
      {r.prior_year && <span className="ms-1 text-caption-1-regular text-text-error-primary">prior year</span>}
    </td>
  );
}

const BOOKED_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"];

/**
 * One client's documents waiting for review (P1): titles from this client's chart,
 * where each came from, and "Approve selected" for the ones OCR read cleanly.
 */
async function ClientPending({ rows, clientId }: { rows: Row[]; clientId: string }) {
  const supabase = await supabaseServer();
  const [{ data: books }, { data: accounts }, { data: suggestions }, { data: approved }] = await Promise.all([
    supabase.from("client_books").select("client_id").eq("client_id", clientId).maybeSingle(),
    supabase.from("ledger_accounts").select("id, code, name, type, active").eq("client_id", clientId).eq("active", true).order("sort_order").order("code"),
    supabase.rpc("pending_document_accounts", { p_client: clientId }),
    supabase.from("extractions").select("approved_fields, documents!inner(client_id)").eq("documents.client_id", clientId).not("approved_fields", "is", null).limit(5000),
  ]);
  const suggested = new Map(((suggestions ?? []) as { document_id: string; account_id: string | null; source: AccountSource }[]).map((x) => [x.document_id, x]));
  const dupes = new Set(
    (approved ?? []).map((a) => {
      const f = a.approved_fields as Record<string, string | null> | null;
      return f?.party_tin && f.number ? `${f.party_tin}|${f.number}` : "";
    }).filter(Boolean),
  );
  const today = manilaToday();
  const pending: PendingRow[] = rows.map((r) => {
    const e = r.extractions;
    const fields = normalizeFields((e?.fields ?? {}) as OcrFields);
    const readiness = bulkReadiness(e && { status: e.status, fields, confidence: e.confidence as OcrConfidence | null }, {
      today,
      priorYear: r.prior_year,
      duplicate: Boolean(fields.party_tin && fields.number && dupes.has(`${fields.party_tin}|${fields.number}`)),
    });
    const low = e?.status === "done" ? Object.values(e.confidence ?? {}).filter((c) => c < LOW_CONFIDENCE).length : 0;
    const ocr: PendingRow["ocr"] = !e
      ? { label: "Not read yet", tone: "neutral" }
      : e.status === "failed"
        ? { label: "Failed", tone: "blocked" }
        : e.status === "pending"
          ? { label: "Reading…", tone: "progress" }
          : low
            ? { label: `${low} to check`, tone: "waiting" }
            : readiness.ready
              ? { label: "Ready", tone: "done" }
              : { label: "Check", tone: "waiting" };
    const total = fields.total != null && fields.total !== "" ? Number(fields.total) : null;
    const booked = Boolean(books) && BOOKED_TYPES.includes(r.doc_type);
    const s = suggested.get(r.id);
    return {
      id: r.id,
      received: when(r.created_at),
      typeLabel: DOC_TYPES[r.doc_type],
      fileName: r.file_name,
      month: showMonth(r.period),
      flags: [
        ...(r.late ? [{ label: "late", tone: "warn" as const }] : []),
        ...(r.carried_from ? [{ label: "late-recorded", tone: "warn" as const }] : []),
        ...(r.prior_year ? [{ label: "prior year", tone: "bad" as const }] : []),
      ],
      party: fields.party_name ?? null,
      number: fields.number ?? null,
      total: total == null || Number.isNaN(total) ? null : peso.format(total),
      ocr,
      ready: readiness.ready,
      reason: readiness.reason,
      booked,
      titled: r.doc_type === "sales_invoice" || r.doc_type === "purchase_receipt",
      account: booked ? { id: s?.account_id ?? null, source: s?.source ?? "choose" } : null,
    };
  });
  return (
    <PendingReview
      clientId={clientId}
      rows={pending}
      accounts={(accounts ?? []).map((a) => ({ id: a.id, label: `${a.code} · ${a.name}`, group: ACCOUNT_TYPES[a.type as keyof typeof ACCOUNT_TYPES] }))}
    />
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
    <Card title={`Approved (${rows.length})`} actions={<span className="text-caption-1-regular text-text-tertiary">Newest approval first</span>}>
      {rows.length === 0 ? (
        <p className="text-body-regular text-text-secondary">No approved documents for this period.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-body-regular">
            <thead className="text-start text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="text-start pb-2">Approved</th>
                <th scope="col" className="text-start pb-2">Document</th>
                <th scope="col" className="text-start pb-2">Month</th>
                <th scope="col" className="pb-2 text-end">Total</th>
                <th scope="col" className="text-start pb-2 ps-4">Edit</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const f = r.extractions?.approved_fields ?? {};
                const total = f.total != null && f.total !== "" ? Number(f.total) : null;
                const lock = lockingFiling(r.client_id, r.document_month, filings);
                return (
                  <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                    <td className="py-2 pe-4 tabular-nums text-text-secondary">{when(r.extractions?.approved_at ?? r.created_at)}</td>
                    <td className="py-2 pe-4">
                      <Link href={`/app/documents/${r.id}`} className="font-medium text-button-ghost-foreground hover:underline">{DOC_TYPES[r.doc_type]}{f.number ? ` ${f.number}` : ""}</Link>
                      <p className="max-w-56 truncate text-caption-1-regular text-text-tertiary">{f.party_name ?? r.file_name}</p>
                    </td>
                    <MonthCell r={r} />
                    <td className="amount py-2 pe-4 text-end tabular-nums text-text-primary">{total == null || Number.isNaN(total) ? "—" : peso.format(total)}</td>
                    <td className="py-2 ps-4">
                      {lock ? (
                        <span className="inline-flex items-center gap-1.5 text-caption-1-regular text-text-secondary" title={`${lock.form} ${lock.period_label} has been filed`}>
                          <RiLockLine aria-hidden className="size-3.5" /> Locked · {lock.form} {lock.period_label} filed
                        </span>
                      ) : (
                        <Link href={`/app/documents/${r.id}`} className="text-caption-1-medium text-button-ghost-foreground hover:underline">Edit figures</Link>
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
