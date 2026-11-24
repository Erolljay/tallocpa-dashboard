import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { periodTitle, REPORT_KINDS, type ReportKind } from "@/lib/ledger/statements";
import { portalContext } from "../client-context";

export default function PortalReports() {
  return (
    <Suspense fallback={<Skeleton rows={5} />}>
      <Reports />
    </Suspense>
  );
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(new Date(iso));

/** Client portal reports (spec §3.4 screen 5): financial statements the firm has released (Q42), newest first. */
async function Reports() {
  const { supabase, clients } = await portalContext();
  const { data } = await supabase
    .from("client_reports")
    .select("id, client_id, kind, period_end, note, released_at")
    .in("client_id", clients.map((c) => c.id))
    .order("period_end", { ascending: false })
    .order("kind")
    .limit(100);
  const rows = (data ?? []) as { id: string; client_id: string; kind: ReportKind; period_end: string; note: string | null; released_at: string }[];
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <h1 className="text-title-1-medium text-text-primary">Reports</h1>
      {rows.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">
          Your financial statements will appear here once we release them.
        </p>
      ) : (
        <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={`/portal/reports/${r.id}`} className="flex items-center justify-between gap-3 px-4 py-3 outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring first:rounded-t-3xl last:rounded-b-3xl pointer-coarse:min-h-14">
                <span className="min-w-0">
                  <span className="block text-body-medium text-text-primary">{REPORT_KINDS[r.kind]} financial statements</span>
                  <span className="block truncate text-caption-1-regular text-text-tertiary">
                    {periodTitle(r.kind, r.period_end).replace(/^For the /, "")}
                    {clients.length > 1 ? ` · ${nameOf.get(r.client_id)}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-caption-1-regular text-text-tertiary">{when(r.released_at)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
