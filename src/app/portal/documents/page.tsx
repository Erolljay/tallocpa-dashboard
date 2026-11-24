import { Suspense } from "react";
import { Badge, Skeleton } from "@/components/ui";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { portalContext } from "../client-context";
import { ReplyForm } from "./reply-form";

export default function PortalDocuments() {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Documents />
    </Suspense>
  );
}

interface Doc {
  id: string;
  client_id: string;
  doc_type: DocType;
  period: string;
  late: boolean;
  file_name: string;
  status: keyof typeof docStatusTone;
  return_reason: string | null;
  client_reply: string | null;
  created_at: string;
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));

async function Documents() {
  const { supabase, clients } = await portalContext();
  const { data } = await supabase
    .from("documents")
    .select("id, client_id, doc_type, period, late, file_name, status, return_reason, client_reply, created_at")
    .not("doc_type", "in", "(filed_return,payment_proof)")
    .neq("status", "uploading")
    .order("created_at", { ascending: false })
    .limit(300);
  const docs = (data ?? []) as Doc[];
  const returned = docs.filter((d) => d.status === "returned");
  const byMonth = new Map<string, Doc[]>();
  for (const d of docs.filter((x) => x.status !== "returned")) byMonth.set(d.period, [...(byMonth.get(d.period) ?? []), d]);
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));
  const several = clients.length > 1;

  return (
    <div className="space-y-8">
      <h1 className="text-title-1-medium text-text-primary">Your documents</h1>

      {returned.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-title-3-semibold text-text-error-primary">Returned to you</h2>
          {returned.map((d) => (
            <article key={d.id} className="space-y-3 rounded-3xl border border-border-button-default bg-background-primary-default p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a href={`/files/${d.id}`} target="_blank" rel="noopener" className="block truncate font-medium text-button-ghost-foreground underline">{d.file_name}</a>
                  <p className="text-caption-1-regular text-text-secondary">{DOC_TYPES[d.doc_type]} · {showMonth(d.period)}{several ? ` · ${nameOf.get(d.client_id)}` : ""}</p>
                </div>
                <Badge tone="blocked">Returned</Badge>
              </div>
              <p className="text-body-regular text-text-primary">Reason: “{d.return_reason}”</p>
              <p className="text-caption-1-regular text-text-secondary">Upload a new copy from the Upload tab if needed, then tell us here.</p>
              <ReplyForm documentId={d.id} />
            </article>
          ))}
        </section>
      )}

      {docs.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary">No documents yet. Use the Upload tab to send your first receipts.</p>
      ) : (
        [...byMonth.entries()].map(([month, list]) => (
          <section key={month} className="space-y-2">
            <h2 className="text-title-3-semibold text-text-primary">{showMonth(month)} <span className="text-body-regular text-text-tertiary">· {list.length}</span></h2>
            <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular">
              {list.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <a href={`/files/${d.id}`} target="_blank" rel="noopener" className="block truncate text-text-primary hover:underline">{d.file_name}</a>
                    <p className="text-caption-1-regular text-text-secondary">
                      {DOC_TYPES[d.doc_type]} · sent {when(d.created_at)}{d.late ? " · late" : ""}{several ? ` · ${nameOf.get(d.client_id)}` : ""}
                    </p>
                  </div>
                  <Badge tone={docStatusTone[d.status]}>{docStatusLabel[d.status]}</Badge>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
