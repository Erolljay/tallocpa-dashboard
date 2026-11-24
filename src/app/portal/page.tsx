import Link from "next/link";
import { Suspense } from "react";
import { DocumentUpload } from "@/components/document-upload";
import { Badge, Card, Notice, Skeleton } from "@/components/ui";
import { NothingToSubmitButton } from "@/components/cycle-forms";
import { monthChoices, nextCutoff } from "@/lib/documents/cutoff";
import { CLIENT_DOC_TYPES, showMonth } from "@/lib/documents/labels";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { portalContext } from "./client-context";

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
    return <p className="rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs p-6 text-body-regular text-text-secondary">Your portal is being set up. Please check back soon.</p>;
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
    supabase.from("document_cycles").select("client_id, period, nothing_to_submit_at, closed_at").in("period", [...new Set(months.map((m) => m.month))]),
    supabase.from("documents").select("client_id, document_month").in("document_month", [...new Set(months.map((m) => m.month))]).neq("status", "uploading").not("doc_type", "in", "(filed_return,payment_proof,cor)").limit(1000),
  ]);
  const status = months.map(({ client, month }) => {
    const y = (cycles ?? []).find((r) => r.client_id === client.id && r.period === month);
    const count = (sent ?? []).filter((d) => d.client_id === client.id && d.document_month === month).length;
    return { client, month, open: !!y && !y.closed_at, nothing: !!y?.nothing_to_submit_at, count };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-title-1-bold text-text-primary">Hi{first ? `, ${first.fullName.split(" ")[0]}` : ""}</h1>
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
    </div>
  );
}
