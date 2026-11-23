import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { LOW_CONFIDENCE } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";

export default function DocumentsQueuePage() {
  return (
    <>
      <PageHeader title="Documents" description="Uploaded receipts and invoices waiting for review. OCR reads each one; check the figures, then approve or return it to the client." />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Queue />
      </Suspense>
    </>
  );
}

interface Row {
  id: string;
  client_id: string;
  doc_type: DocType;
  period: string;
  late: boolean;
  prior_year: boolean;
  file_name: string;
  status: keyof typeof docStatusTone;
  created_at: string;
  clients: { name: string } | null;
  extractions: { status: string; confidence: Record<string, number>; error: string | null } | null;
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));

async function Queue() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const [{ data }, { data: assignments }] = await Promise.all([
    supabase
      .from("documents")
      .select("id, client_id, doc_type, period, late, prior_year, file_name, status, created_at, clients(name), extractions(status, confidence, error)")
      .in("status", ["received", "under_review"])
      .not("doc_type", "in", "(filed_return,payment_proof)")
      .order("created_at")
      .limit(300),
    supabase.from("staff_assignments").select("client_id").eq("user_id", me.userId),
  ]);
  const mine = new Set((assignments ?? []).map((a) => a.client_id));
  const rows = ((data ?? []) as unknown as Row[]).filter((r) => me.staff.role === "owner" || mine.has(r.client_id));

  return (
    <Card title={`Waiting for review (${rows.length})`} actions={<span className="text-xs text-ink-subtle">Oldest first</span>}>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">Nothing waiting. New uploads appear here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="text-left text-ink-subtle">
              <tr>
                <th scope="col" className="pb-2 font-medium">Received</th>
                <th scope="col" className="pb-2 font-medium">Client</th>
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
                    <td className="py-2 pr-4 text-ink-heading">{r.clients?.name ?? "—"}</td>
                    <td className="py-2 pr-4">
                      <Link href={`/app/documents/${r.id}`} className="font-medium text-link hover:underline">{DOC_TYPES[r.doc_type]}</Link>
                      <p className="max-w-56 truncate text-xs text-ink-subtle">{r.file_name}</p>
                    </td>
                    <td className="py-2 pr-4 text-ink-muted">
                      {showMonth(r.period)}
                      {r.late && <span className="ml-1 text-xs text-warning">late</span>}
                      {r.prior_year && <span className="ml-1 text-xs text-danger-text">prior year</span>}
                    </td>
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
