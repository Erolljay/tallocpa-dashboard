import Link from "next/link";
import { Suspense } from "react";
import { DocumentUpload } from "@/components/document-upload";
import { Badge, Card, Notice, Skeleton } from "@/components/ui";
import { NothingToSubmitButton } from "@/components/cycle-forms";
import { monthChoices, nextCutoff } from "@/lib/documents/cutoff";
import { CLIENT_DOC_TYPES, showMonth } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { missingRanges, monthTimeline, type MissingNumber } from "@/lib/cycle/month";
import { portalContext, type PortalClient } from "./client-context";
import { MonthComplete, type SentRow } from "./month-complete";

export default function PortalHome() {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <Home />
    </Suspense>
  );
}

async function Home() {
  const { id, supabase, clients } = await portalContext();
  const today = manilaToday();
  const first = id.clients[0];
  if (clients.length === 0) {
    return <p className="rounded-3xl border border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">Your portal is being set up. Please check back soon.</p>;
  }
  const [{ count: returned }, { count: approvals }] = await Promise.all([
    supabase.from("documents").select("id", { count: "exact", head: true }).eq("status", "returned"),
    supabase.from("filing_instances").select("id", { count: "exact", head: true }).eq("status", "reviewed"),
  ]);
  const main = clients[0];
  const c = nextCutoff(today, main.submission_cutoff_day);
  // This month's cycle for each business: whether something came in, or "nothing to submit" (spec §3.10).
  const months = clients.map((x) => ({ client: x, month: nextCutoff(today, x.submission_cutoff_day).month }));
  const [{ data: cycles }, { data: sent }] = await Promise.all([
    supabase.from("document_cycles").select("client_id, period, cutoff_date, nothing_to_submit_at, closed_at, client_confirmed_at, confirmed_documents").in("period", [...new Set(months.map((m) => m.month))]),
    supabase.from("documents").select("client_id, document_month").in("document_month", [...new Set(months.map((m) => m.month))]).neq("status", "uploading").not("doc_type", "in", "(filed_return,payment_proof,cor)").limit(1000),
  ]);
  const status = months.map(({ client, month }) => {
    const y = (cycles ?? []).find((r) => r.client_id === client.id && r.period === month);
    const count = (sent ?? []).filter((d) => d.client_id === client.id && d.document_month === month).length;
    return {
      client, month, open: !!y && !y.closed_at, nothing: !!y?.nothing_to_submit_at, count,
      cutoff: (y?.cutoff_date as string | undefined) ?? nextCutoff(today, client.submission_cutoff_day).cutoff,
      confirmedAt: (y?.client_confirmed_at as string | null | undefined) ?? null,
      confirmedCount: (y?.confirmed_documents as number | null | undefined) ?? null,
    };
  });
  // "I've sent everything" for each business with something sent this month (P1).
  const completable = status.filter((x) => x.open && !x.nothing && (x.count > 0 || x.confirmedAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-1-medium text-text-primary">Hi{first ? `, ${first.fullName.split(" ")[0]}` : ""}</h1>
        <p className="mt-1 text-body-regular text-text-secondary">{clients.map((x) => x.name).join(" · ")}</p>
      </div>

      {(returned ?? 0) > 0 && (
        <Notice tone="blocked">
          {returned} document{returned === 1 ? " was" : "s were"} returned to you. <Link href="/portal/documents" className="font-medium underline">See why</Link>
        </Notice>
      )}
      {(approvals ?? 0) > 0 && (
        <Notice tone="waiting">
          {approvals} return{approvals === 1 ? " is" : "s are"} waiting for your approval. <Link href="/portal/returns" className="font-medium underline">Review</Link>
        </Notice>
      )}

      <Card title="Send your documents">
        <p className="mb-4 text-body-regular text-text-secondary">
          {showMonth(c.month)} documents are due by <span className="font-medium text-text-primary">{showDate(c.cutoff)}</span>
          {c.daysLeft > 0 ? ` — ${c.daysLeft} day${c.daysLeft === 1 ? "" : "s"} left.` : " — today is the last day."}
          {" "}Take a clear photo of each receipt, flat and in good light.
        </p>
        <ul className="mb-4 space-y-2">
          {status.map((x) => (
            <li key={x.client.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body-regular">
              {clients.length > 1 && <span className="font-medium text-text-primary">{x.client.name}:</span>}
              {x.nothing ? (
                <Badge tone="done">Nothing to submit for {showMonth(x.month)}</Badge>
              ) : x.confirmedAt ? (
                <Badge tone="done">{showMonth(x.month)} complete</Badge>
              ) : x.count > 0 ? (
                <Badge tone="done">{x.count} document{x.count === 1 ? "" : "s"} sent for {showMonth(x.month)}</Badge>
              ) : (
                <>
                  <span className="text-text-secondary">Nothing sent yet for {showMonth(x.month)}.</span>
                  {x.open && <NothingToSubmitButton clientId={x.client.id} period={x.month} label="No transactions this month" />}
                </>
              )}
            </li>
          ))}
        </ul>
        <DocumentUpload clients={clients.map((x) => ({ id: x.id, name: x.name }))} docTypes={CLIENT_DOC_TYPES} months={monthChoices(today, 6)} defaultMonth={c.month} />
      </Card>

      {completable.map((x) => (
        <Suspense key={x.client.id} fallback={<Skeleton rows={4} />}>
          <MonthCard client={x.client} several={clients.length > 1} period={x.month} cutoff={x.cutoff} today={today} confirmedAt={x.confirmedAt} confirmedCount={x.confirmedCount} />
        </Suspense>
      ))}
    </div>
  );
}

const shortDay = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
const manilaDay = (ts: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date(ts));

/** Sent documents by kind, in the order a client thinks of them. */
const KINDS: { label: string; types: string[] }[] = [
  { label: "Sales invoices", types: ["sales_invoice"] },
  { label: "Receipts for purchases and expenses", types: ["purchase_receipt"] },
  { label: "2307s from customers", types: ["bir_2307_received"] },
  { label: "2307s you issued", types: ["bir_2307_issued"] },
  { label: "Other documents", types: ["other"] },
];

/** One business's month: what was sent, the gaps to answer, the confirm step and what happens next. */
async function MonthCard(props: { client: PortalClient; several: boolean; period: string; cutoff: string; today: string; confirmedAt: string | null; confirmedCount: number | null }) {
  const { supabase } = await portalContext();
  const { client, period } = props;
  const [check, { data: docs }, { data: payroll }, { data: filings }, { data: hols }] = await Promise.all([
    supabase.rpc("month_check", { p_client: client.id, p_period: period }),
    supabase.from("documents").select("doc_type, status").eq("client_id", client.id).eq("document_month", period).not("status", "in", "(uploading)").not("doc_type", "in", "(filed_return,payment_proof,cor)").limit(5000),
    supabase.from("payroll_submissions").select("status").eq("client_id", client.id).eq("pay_month", period),
    supabase.from("filing_instances").select("form, period_label, period_start, period_end, due_date, status").eq("client_id", client.id).lte("period_start", period).gte("period_end", period).neq("status", "proof_uploaded"),
    supabase.from("holidays").select("date"),
  ]);
  const c = (check.data ?? { missing: [], cwt: [], reading: 0 }) as { missing: MissingNumber[]; cwt: { party: string; amount: number }[]; reading: number };
  const sent: SentRow[] = KINDS.map((k) => {
    const of = (docs ?? []).filter((d) => k.types.includes(d.doc_type));
    return { label: k.label, count: of.length, checked: of.filter((d) => d.status === "posted").length };
  }).filter((r) => r.count > 0);
  if ((payroll ?? []).length) sent.push({ label: "Payroll register", count: payroll!.length, checked: payroll!.filter((p) => p.status === "posted").length });
  const holidays = new Set((hols ?? []).map((h: { date: string }) => String(h.date).slice(0, 10)));
  const confirmedOn = props.confirmedAt ? manilaDay(props.confirmedAt) : null;
  const timeline = monthTimeline({
    cutoff: props.cutoff,
    confirmedOn,
    cutoffDay: client.submission_cutoff_day,
    holidays,
    filings: (filings ?? []).map((f) => ({ form: f.form, periodLabel: f.period_label, periodStart: f.period_start, periodEnd: f.period_end, dueDate: f.due_date, status: f.status })),
  });
  const daysLeft = Math.round((Date.parse(`${props.cutoff}T00:00:00Z`) - Date.parse(`${props.today}T00:00:00Z`)) / 86_400_000);
  return (
    <MonthComplete
      clientId={client.id}
      business={props.several ? client.name : null}
      period={period}
      month={showMonth(period)}
      cutoff={shortDay(props.cutoff)}
      daysLeft={daysLeft}
      canUndo={props.today <= props.cutoff}
      confirmed={confirmedOn ? { on: shortDay(confirmedOn), count: props.confirmedCount } : null}
      sent={sent}
      ranges={missingRanges(c.missing)}
      cwt={c.cwt}
      reading={c.reading}
      timeline={timeline.map((t) => ({ ...t, date: shortDay(t.date) }))}
    />
  );
}
