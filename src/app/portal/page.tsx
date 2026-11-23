import Link from "next/link";
import { Suspense } from "react";
import { DocumentUpload } from "@/components/document-upload";
import { Card, Notice, Skeleton } from "@/components/ui";
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
    return <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">Your portal is being set up. Please check back soon.</p>;
  }
  const [{ count: returned }, { count: approvals }] = await Promise.all([
    supabase.from("documents").select("id", { count: "exact", head: true }).eq("status", "returned"),
    supabase.from("filing_instances").select("id", { count: "exact", head: true }).eq("status", "reviewed"),
  ]);
  const main = clients[0];
  const c = nextCutoff(today, main.submission_cutoff_day);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-heading">Hi{first ? `, ${first.fullName.split(" ")[0]}` : ""}</h1>
        <p className="mt-1 text-sm text-ink-muted">{clients.map((x) => x.name).join(" · ")}</p>
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
        <p className="mb-4 text-sm text-ink-muted">
          {showMonth(c.month)} documents are due by <span className="font-medium text-ink-heading">{showDate(c.cutoff)}</span>
          {c.daysLeft > 0 ? ` — ${c.daysLeft} day${c.daysLeft === 1 ? "" : "s"} left.` : " — today is the last day."}
          {" "}Take a clear photo of each receipt, flat and in good light.
        </p>
        <DocumentUpload clients={clients.map((x) => ({ id: x.id, name: x.name }))} docTypes={CLIENT_DOC_TYPES} months={monthChoices(today, 6)} defaultMonth={c.month} />
      </Card>
    </div>
  );
}
