import Link from "next/link";
import { Suspense } from "react";
import { RiArrowDownLine, RiArrowUpLine, RiCheckLine } from "@remixicon/react";
import { Badge, Card, LinkButton, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { LOCKED_STATUSES, lockKind, lockingFiling, type LockFiling } from "@/lib/documents/lock";
import { bundleLabel, DOC_TYPES, docStatusTone, showMonth, SOURCE_LABELS, STREAMS, streamOf, type DocType, type Stream } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { bulkReadiness, type AccountSource } from "@/lib/documents/bulk";
import { ACCOUNT_TYPES } from "@/lib/ledger/types";
import { booksMonthStatus, pendingDocumentTaxCodes, type BooksMonthRow, type PendingTaxCodes } from "@/lib/books/actions";
import { loadTaxCodes } from "@/lib/books/data";
import { LOW_CONFIDENCE, normalizeFields, type OcrConfidence, type OcrFields } from "@/lib/ocr/fields";
import { currentClientStatuses } from "@/lib/clients/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { ClientSelect, PeriodFilter } from "./filters";
import { ApprovedReview, type ApprovedRow } from "./approved-review";
import { PendingReview, type PendingRow } from "./pending-review";
import { periodRange } from "./period";

export default function DocumentsPage(props: PageProps<"/app/documents">) {
  return (
    <Suspense fallback={<><PageHeader title="Inbox" /><Skeleton rows={8} /></>}>
      <Documents searchParams={props.searchParams} />
    </Suspense>
  );
}

const FORM_ID = "doc-filters";
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));

type Tab = Stream;
/** Inside each stream: what is waiting for approval, or what was approved. */
type View = "waiting" | "approved";
const STREAM_KEYS = Object.keys(STREAMS) as Stream[];
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
  deferred_from: string | null;
  deferred_reason: string | null;
  file_name: string;
  bundle_id: string | null;
  bundle_page: number | null;
  bundle_index: number | null;
  status: keyof typeof docStatusTone;
  source: string;
  uploaded_by: string;
  created_at: string;
  extractions: { status: string; fields: Record<string, string | null> | null; confidence: Record<string, number> | null; error: string | null; approved_at: string | null; approved_fields: Record<string, string | null> | null } | null;
}

interface Submission {
  id: string;
  client_id: string;
  pay_month: string;
  file_name: string;
  row_count: number;
  late: boolean;
  created_at: string;
}

async function Documents({ searchParams }: Pick<PageProps<"/app/documents">, "searchParams">) {
  const me = await requireStaff();
  const owner = me.staff.role === "owner";
  const sp = await searchParams;
  // Inbox tabs: one per intake stream (Sales, Purchases & Expenses, Payroll, Other), each
  // with "Waiting approval" and "Approved". The old ?tab=approved opens Sales, Approved.
  const tabParam = one(sp.tab);
  const tab: Tab = STREAM_KEYS.find((k) => k === tabParam) ?? "sales";
  const view: View = tabParam === "approved" || one(sp.view) === "approved" ? "approved" : "waiting";
  const sortParam = one(sp.sort);
  const sort: Sort = (["name", "-name", "count", "-count"] as const).find((s) => s === sortParam) ?? "name";
  const range = periodRange(one(sp.period), manilaToday(), one(sp.from), one(sp.to));
  const supabase = await supabaseServer();

  // Clients this person works on: every current client for the Owner, assigned ones for
  // staff. Inactive and archived clients are left out, as on Home and Filings.
  const [{ data: clientRows }, { data: assignments }] = await Promise.all([
    supabase.from("clients").select("id, name").in("status", currentClientStatuses).order("name"),
    owner ? Promise.resolve({ data: null }) : supabase.from("staff_assignments").select("client_id").eq("user_id", me.userId),
  ]);
  const mine = new Set((assignments ?? []).map((a) => a.client_id));
  const clients = (clientRows ?? []).filter((c) => owner || mine.has(c.id));
  const clientId = clients.some((c) => c.id === one(sp.client)) ? one(sp.client) : "";
  const client = clients.find((c) => c.id === clientId);
  // Moving a sale or purchase to a later period, or taking an approval back: the client's reviewer or the Owner.
  const [{ data: reviewerOf }, { data: clientInfo }] = clientId
    ? await Promise.all([
        owner ? Promise.resolve({ data: null }) : supabase.from("staff_assignments").select("client_id").eq("client_id", clientId).eq("user_id", me.userId).eq("role", "reviewer").maybeSingle(),
        supabase.from("clients").select("fiscal_year_end_month").eq("id", clientId).maybeSingle(),
      ])
    : [{ data: null }, { data: null }];
  const canMove = Boolean(clientId) && (owner || Boolean(reviewerOf));
  const fyeMonth = Number(clientInfo?.fiscal_year_end_month ?? 12) || 12;

  const select = "id, client_id, doc_type, period, document_month, late, prior_year, carried_from, deferred_from, deferred_reason, file_name, bundle_id, bundle_page, bundle_index, status, source, uploaded_by, created_at, extractions(status, fields, confidence, error, approved_at, approved_fields)";
  // Everything waiting, across the streams: the tab counts need all of it.
  let pendingQuery = supabase.from("documents").select(select).not("doc_type", "in", "(filed_return,payment_proof)").in("status", ["received", "under_review"]).order("created_at").limit(1000);
  // Payroll registers clients sent in the Tallo template (portal Payroll tab) wait in the Payroll tab too.
  let subQuery = supabase.from("payroll_submissions").select("id, client_id, pay_month, file_name, row_count, late, created_at").eq("status", "pending").order("created_at").limit(500);
  if (clientId) {
    pendingQuery = pendingQuery.eq("client_id", clientId);
    subQuery = subQuery.eq("client_id", clientId);
  }
  if (range) {
    pendingQuery = pendingQuery.gte("period", range.from).lte("period", range.to);
    subQuery = subQuery.gte("pay_month", range.from).lte("pay_month", range.to);
  }
  let approvedQuery = supabase.from("documents").select(select).in("doc_type", [...STREAMS[tab].types]).eq("status", "posted").order("created_at", { ascending: false }).limit(1000);
  if (clientId) approvedQuery = approvedQuery.eq("client_id", clientId);
  if (range) approvedQuery = approvedQuery.gte("period", range.from).lte("period", range.to);
  const [pendingRes, subRes, approvedRes] = await Promise.all([pendingQuery, subQuery, approvedQuery]);
  if (pendingRes.error) throw pendingRes.error;
  if (approvedRes.error) throw approvedRes.error;
  const ids = new Set(clients.map((c) => c.id));
  const pendingAll = ((pendingRes.data ?? []) as unknown as Row[]).filter((r) => ids.has(r.client_id));
  const submissions = ((subRes.data ?? []) as Submission[]).filter((r) => ids.has(r.client_id));
  const waitingRows = pendingAll.filter((r) => streamOf(r.doc_type) === tab);
  const approvedRows = ((approvedRes.data ?? []) as unknown as Row[]).filter((r) => ids.has(r.client_id));
  const rows = view === "approved" ? approvedRows : waitingRows;
  const inClient = (list: { client_id: string }[]) => (clientId ? list.filter((r) => r.client_id === clientId) : list).length;
  const subs = tab === "payroll" ? inClient(submissions) : 0;
  const viewCounts: Record<View, number> = { waiting: inClient(waitingRows) + subs, approved: inClient(approvedRows) };

  // Waiting per stream (the tab counts) and per client in the open tab (the client list).
  const streamCounts = new Map<Stream, number>(STREAM_KEYS.map((k) => [k, 0]));
  for (const r of pendingAll) {
    const st = streamOf(r.doc_type);
    if (st) streamCounts.set(st, streamCounts.get(st)! + 1);
  }
  streamCounts.set("payroll", streamCounts.get("payroll")! + submissions.length);
  const pendingCounts = new Map<string, number>();
  for (const r of view === "approved" ? approvedRows : waitingRows) pendingCounts.set(r.client_id, (pendingCounts.get(r.client_id) ?? 0) + 1);
  if (tab === "payroll" && view === "waiting") for (const r of submissions) pendingCounts.set(r.client_id, (pendingCounts.get(r.client_id) ?? 0) + 1);

  const link = (over: Record<string, string>) => {
    const p = new URLSearchParams();
    const base: Record<string, string> = { client: clientId, tab, view, period: range?.key ?? "", from: one(sp.from), to: one(sp.to), sort: sort === "name" ? "" : sort };
    for (const [k, v] of Object.entries({ ...base, ...over })) if (v && !(k === "tab" && v === "sales") && !(k === "view" && v === "waiting") && !((k === "from" || k === "to") && (over.period ?? base.period) !== "custom")) p.set(k, v);
    const s = p.toString();
    return s ? `/app/documents?${s}` : "/app/documents";
  };

  return (
    <>
      <PageHeader
        title="Inbox"
        description={client ? `${client.name}: what came in, waiting for approval or approved.` : "Everything clients sent, by kind. OCR reads each receipt; check the figures, then approve it into the Books or return it to the client."}
        actions={
          <>
            <ClientSelect form={FORM_ID} value={clientId} clients={clients} />
            <LinkButton href="/app/cycle" variant="secondary">Month status</LinkButton>
          </>
        }
      />

      {/* BoardUI underline tabs (components/base/tabs), as links so each list has its own URL. */}
      <nav aria-label="Inbox" className="mb-5 flex gap-1 overflow-x-auto border-b border-separator-border">
        {STREAM_KEYS.map((k) => [k, STREAMS[k].label, streamCounts.get(k) ?? 0] as const).map(([t, label, count]) => (
          <Link
            key={t}
            href={link({ tab: t, view: "waiting" })}
            aria-current={tab === t ? "page" : undefined}
            className={cx(
              "-mb-px inline-flex items-center gap-2.5 border-b-2 px-2.5 py-2 whitespace-nowrap transition-colors duration-150",
              "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-border-focus-ring",
              tab === t ? "border-accent-600 text-body-medium text-accent-600" : "border-transparent text-body-regular text-text-primary hover:text-text-secondary",
            )}
          >
            {label}
            <span className={cx("rounded-sm px-1 py-px text-caption-1-medium tabular-nums", tab === t ? "bg-tab-count-selected-background text-accent-600" : "bg-background-tertiary-default text-text-secondary")}>
              {count}
            </span>
          </Link>
        ))}
      </nav>

      <ViewSwitch view={view} counts={viewCounts} link={link} />

      <form id={FORM_ID} role="search" className="mb-6">
        {tab !== "sales" && <input type="hidden" name="tab" value={tab} />}
        {view === "approved" && <input type="hidden" name="view" value="approved" />}
        {sort !== "name" && <input type="hidden" name="sort" value={sort} />}
        <PeriodFilter period={range?.key ?? "all"} from={range ? range.from.slice(0, 7) : ""} to={range ? range.to.slice(0, 7) : ""} />
        {view === "approved" && <p className="mt-2 text-caption-1-regular text-text-tertiary">Approved figures can be corrected until the return for their month is filed. After that the month is locked.</p>}
      </form>

      {!client ? (
        <ClientList clients={clients} view={view} sort={sort} link={link} counts={pendingCounts} complete={await confirmedMonths(supabase, clients.map((c) => c.id))} />
      ) : view === "approved" ? (
        <Suspense fallback={<Skeleton rows={6} />}>
          <ApprovedTable rows={rows} clientId={clientId} canMove={canMove} fyeMonth={fyeMonth} />
        </Suspense>
      ) : tab === "payroll" ? (
        <PayrollPending rows={rows} submissions={submissions} clientId={clientId} />
      ) : (
        <Suspense fallback={<Skeleton rows={6} />}>
          <ClientPending rows={rows} clientId={clientId} canMove={canMove} fyeMonth={fyeMonth} />
        </Suspense>
      )}
    </>
  );
}

/** "Waiting approval" and "Approved" inside a stream tab: BoardUI's segmented control, as links. */
function ViewSwitch({ view, counts, link }: { view: View; counts: Record<View, number>; link: (o: Record<string, string>) => string }) {
  const items: [View, string][] = [["waiting", "Waiting approval"], ["approved", "Approved"]];
  return (
    <nav aria-label="Approval" className="mb-4 inline-flex items-start gap-0.5 rounded-2lg bg-segmented-control-background p-1">
      {items.map(([v, label]) => (
        <Link
          key={v}
          href={link({ view: v })}
          aria-current={view === v ? "page" : undefined}
          className={cx(
            "inline-flex items-center gap-2 rounded-md px-2.5 py-1 whitespace-nowrap transition-colors duration-200 ease",
            "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
            view === v ? "bg-segmented-control-selected-background text-body-medium text-text-primary shadow-2xs" : "text-body-regular text-text-secondary hover:text-text-primary",
          )}
        >
          {label}
          <span className="text-caption-1-medium tabular-nums text-text-tertiary">{counts[v]}</span>
        </Link>
      ))}
    </nav>
  );
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
function ClientList({ clients, view, sort, link, counts, complete }: { clients: { id: string; name: string }[]; view: View; sort: Sort; link: (o: Record<string, string>) => string; counts: Map<string, number>; complete: Map<string, string[]> }) {
  const n = (id: string) => counts.get(id) ?? 0;
  const sorted = [...clients].sort((a, b) => {
    if (sort === "count" || sort === "-count") {
      const d = sort === "-count" ? n(b.id) - n(a.id) : n(a.id) - n(b.id);
      if (d) return d;
    }
    return sort === "-name" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
  });
  const waiting = view === "waiting";
  const countLabel = waiting ? "Waiting" : "Approved";

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
                    {waiting && count === 0 ? (
                      <span className="inline-flex items-center gap-1 text-status-lime-text" title="Nothing waiting for review">
                        <RiCheckLine aria-hidden className="size-4" />
                        <span className="sr-only">Nothing waiting</span>
                      </span>
                    ) : (
                      <span className={waiting ? "font-semibold text-text-primary" : "text-text-secondary"}>({count})</span>
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
      {r.deferred_from && <span className="ms-1 text-caption-1-regular text-status-yellow-text" title={movedTitle(r)}>moved from {showMonth(r.deferred_from)}</span>}
      {r.prior_year && <span className="ms-1 text-caption-1-regular text-text-error-primary">prior year</span>}
    </td>
  );
}

const movedTitle = (r: Row) => `Reported in ${showMonth(r.document_month)}, moved from ${showMonth(r.deferred_from!)}${r.deferred_reason ? `: ${r.deferred_reason}` : ""}`;
const monthFlags = (r: Row): { label: string; title?: string; tone: "warn" | "bad" }[] => [
  ...(r.late ? [{ label: "late", tone: "warn" as const }] : []),
  ...(r.carried_from ? [{ label: "late-recorded", title: `Carried from ${showMonth(r.carried_from)}`, tone: "warn" as const }] : []),
  ...(r.deferred_from ? [{ label: `moved from ${showMonth(r.deferred_from)}`, title: movedTitle(r), tone: "warn" as const }] : []),
  ...(r.prior_year ? [{ label: "prior year", tone: "bad" as const }] : []),
];

const BOOKED_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"];

/** "Invoice 3 of 25 · page 4" for each row that is an invoice of a bundled PDF. */
async function bundleLabels(supabase: Awaited<ReturnType<typeof supabaseServer>>, rows: Row[]): Promise<Map<string, string>> {
  const ids = [...new Set(rows.map((r) => r.bundle_id).filter((b): b is string => Boolean(b)))];
  const out = new Map<string, string>();
  if (ids.length === 0) return out;
  const { data } = await supabase.from("documents").select("id, bundle_count").in("id", ids);
  const count = new Map((data ?? []).map((b) => [b.id as string, b.bundle_count as number | null]));
  for (const r of rows) if (r.bundle_id && r.bundle_index && r.bundle_page) out.set(r.id, bundleLabel(r.doc_type, r.bundle_index, count.get(r.bundle_id), r.bundle_page));
  return out;
}

/**
 * One client's documents waiting for review (P1): titles from this client's chart,
 * where each came from, and "Approve selected" for the ones OCR read cleanly.
 */
async function ClientPending({ rows, clientId, canMove, fyeMonth }: { rows: Row[]; clientId: string; canMove: boolean; fyeMonth: number }) {
  const supabase = await supabaseServer();
  // Who sent each document, by name (staff or the client's portal user).
  const senders = [...new Set(rows.map((r) => r.uploaded_by))];
  const [{ data: staffNames }, { data: clientNames }] = senders.length
    ? await Promise.all([
        supabase.from("staff_profiles").select("user_id, full_name").in("user_id", senders),
        supabase.from("client_users").select("user_id, full_name").eq("client_id", clientId).in("user_id", senders),
      ])
    : [{ data: [] }, { data: [] }];
  const nameOf = new Map([...(clientNames ?? []), ...(staffNames ?? [])].map((u) => [u.user_id as string, u.full_name as string]));
  const [{ data: books }, { data: accounts }, { data: suggestions }, { data: approved }] = await Promise.all([
    supabase.from("client_books").select("client_id").eq("client_id", clientId).maybeSingle(),
    supabase.from("ledger_accounts").select("id, code, name, type, active, control").eq("client_id", clientId).eq("active", true).order("sort_order").order("code"),
    supabase.rpc("pending_document_accounts", { p_client: clientId }),
    supabase.from("extractions").select("approved_fields, documents!inner(client_id)").eq("documents.client_id", clientId).not("approved_fields", "is", null).limit(5000),
  ]);
  // Tax codes per document (rework): suggested from the party default or OCR; a client without books has none.
  const [taxSuggestions, taxCodes] = books
    ? await Promise.all([pendingDocumentTaxCodes(clientId, supabase).catch(() => [] as PendingTaxCodes[]), loadTaxCodes(supabase)])
    : [[] as PendingTaxCodes[], []];
  const codesOf = new Map(taxSuggestions.map((t) => [t.document_id, t]));
  const inBundle = await bundleLabels(supabase, rows);
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
      docType: r.doc_type,
      documentMonth: r.document_month,
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
      bundle: inBundle.get(r.id) ?? null,
      via: [SOURCE_LABELS[r.source] ?? r.source, nameOf.get(r.uploaded_by)].filter(Boolean).join(" · "),
      telegram: r.source === "telegram",
      month: showMonth(r.period),
      documentMonth: r.document_month,
      flags: monthFlags(r),
      party: fields.party_name ?? null,
      number: fields.number ?? null,
      total: total == null || Number.isNaN(total) ? null : peso.format(total),
      ocr,
      ready: readiness.ready,
      reason: readiness.reason,
      booked,
      titled: r.doc_type === "sales_invoice" || r.doc_type === "purchase_receipt",
      account: booked ? { id: s?.account_id ?? null, source: s?.source ?? "choose" } : null,
      invoiceKind: booked && r.doc_type === "sales_invoice" ? "sales" : booked && r.doc_type === "purchase_receipt" ? "purchase" : null,
      codes: booked ? codesOf.get(r.id) ?? null : null,
      terms: fields.payment_terms === "charge" ? "charge" : "cash",
      cashAccountId: fields.payment_account ?? null,
    };
  });
  return (
    <PendingReview
      clientId={clientId}
      rows={pending}
      accounts={(accounts ?? []).map((a) => ({ id: a.id, label: `${a.code} · ${a.name}`, group: ACCOUNT_TYPES[a.type as keyof typeof ACCOUNT_TYPES] }))}
      cashAccounts={(accounts ?? []).filter((a) => a.control === "cash" || a.control === "bank").map((a) => ({ id: a.id, label: `${a.code} · ${a.name}` }))}
      taxCodes={taxCodes}
      canMove={canMove}
      fyeMonth={fyeMonth}
    />
  );
}

/** Approved documents, newest first. Open ones can still be corrected; filed months are locked. */
async function ApprovedTable({ rows, clientId, canMove, fyeMonth }: { rows: Row[]; clientId: string; canMove: boolean; fyeMonth: number }) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, period_start, period_end, status")
    .eq("client_id", clientId)
    .in("status", LOCKED_STATUSES);
  const filings = (data ?? []) as LockFiling[];
  const inBundle = await bundleLabels(supabase, rows);
  const sorted = [...rows].sort((a, b) => (b.extractions?.approved_at ?? b.created_at).localeCompare(a.extractions?.approved_at ?? a.created_at));
  // The Books lock of each month shown: a reviewer's lock must be lifted before a document in it moves.
  const years = [...new Set(rows.map((r) => Number(r.document_month.slice(0, 4))))];
  const months = new Map<string, BooksMonthRow>();
  if (canMove) {
    const all = await Promise.all(years.map((y) => booksMonthStatus(clientId, y, supabase).catch(() => [] as BooksMonthRow[])));
    for (const m of all.flat()) months.set(String(m.month).slice(0, 10), m);
  }
  const booksOf = (month: string): ApprovedRow["books"] => {
    const m = months.get(month.slice(0, 10));
    if (!m) return null;
    if (m.status === "unlock_requested") return "requested";
    return m.status === "locked" && m.lock_source === "reviewer" ? "locked" : null;
  };
  const approved: ApprovedRow[] = sorted.map((r) => {
    const f = r.extractions?.approved_fields ?? {};
    const total = f.total != null && f.total !== "" ? Number(f.total) : null;
    const lock = lockingFiling(r.client_id, r.document_month, filings, lockKind(r.doc_type, f));
    return {
      id: r.id,
      approved: when(r.extractions?.approved_at ?? r.created_at),
      label: `${DOC_TYPES[r.doc_type]}${f.number ? ` ${f.number}` : ""}`,
      party: [inBundle.get(r.id), f.party_name ?? r.file_name].filter(Boolean).join(" · "),
      month: showMonth(r.period),
      flags: [
        ...monthFlags(r),
        ...(booksOf(r.document_month) === "locked" ? [{ label: "Books locked", title: "Request the unlock before moving or taking it back", tone: "warn" as const }] : []),
        ...(booksOf(r.document_month) === "requested" ? [{ label: "unlock requested", title: "Waiting for the Owner to unlock the month", tone: "warn" as const }] : []),
      ],
      documentMonth: r.document_month,
      total: total == null || Number.isNaN(total) ? "—" : peso.format(total),
      lock: lock ? `${lock.form} ${lock.period_label}` : null,
      titled: r.doc_type === "sales_invoice" || r.doc_type === "purchase_receipt",
      books: booksOf(r.document_month),
    };
  });
  return <ApprovedReview clientId={clientId} rows={approved} canMove={canMove} fyeMonth={fyeMonth} />;
}

/**
 * One client's payroll waiting to be loaded (rework): files in the client's own
 * format (Excel, PDF or a photo), which staff put into the Tallo template, and
 * registers the client already sent in the template from the portal.
 */
function PayrollPending({ rows, submissions, clientId }: { rows: Row[]; submissions: Submission[]; clientId: string }) {
  const subs = submissions.filter((s) => s.client_id === clientId);
  const total = rows.length + subs.length;
  return (
    <Card title={`Payroll waiting (${total})`}>
      {total === 0 ? (
        <p className="text-body-regular text-text-secondary">No payroll waiting for this client.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-body-regular">
            <thead className="text-start text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="text-start pb-2">Received</th>
                <th scope="col" className="text-start pb-2">File</th>
                <th scope="col" className="text-start pb-2">Month</th>
                <th scope="col" className="text-start pb-2">Format</th>
                <th scope="col" className="pb-2 text-end"><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                  <td className="py-2 pe-4 tabular-nums text-text-secondary">{when(r.created_at)}</td>
                  <td className="max-w-64 truncate py-2 pe-4 text-text-primary">{r.file_name}</td>
                  <MonthCell r={r} />
                  <td className="py-2 pe-4"><Badge tone="waiting">Client&apos;s format</Badge></td>
                  <td className="py-2 text-end"><Link href={`/app/documents/${r.id}`} className="font-medium text-button-ghost-foreground hover:underline">Load</Link></td>
                </tr>
              ))}
              {subs.map((s) => (
                <tr key={s.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover">
                  <td className="py-2 pe-4 tabular-nums text-text-secondary">{when(s.created_at)}</td>
                  <td className="max-w-64 truncate py-2 pe-4 text-text-primary">{s.file_name} <span className="text-text-tertiary">· {s.row_count} row{s.row_count === 1 ? "" : "s"}</span></td>
                  <td className="py-2 pe-4 text-text-secondary">{showMonth(s.pay_month)}{s.late && <span className="ms-1 text-caption-1-regular text-status-yellow-text">late</span>}</td>
                  <td className="py-2 pe-4"><Badge tone="done">Tallo template</Badge></td>
                  <td className="py-2 text-end"><Link href={`/app/clients/${clientId}/payroll/month/${s.pay_month.slice(0, 7)}`} className="font-medium text-button-ghost-foreground hover:underline">Review &amp; post</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
