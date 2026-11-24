import { DocumentUpload } from "@/components/document-upload";
import { Badge, Card } from "@/components/ui";
import { monthChoices, openMonth } from "@/lib/documents/cutoff";
import { CLIENT_DOC_TYPES, DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { DocReviewActions } from "./doc-review-actions";

interface Doc {
  id: string;
  doc_type: DocType;
  period: string;
  late: boolean;
  prior_year: boolean;
  file_name: string;
  source: string;
  status: keyof typeof docStatusTone;
  return_reason: string | null;
  client_reply: string | null;
  created_at: string;
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" }).format(new Date(iso));

/** Client page: the client's documents with review actions, and staff upload (spec §3.4, Q61). */
export async function DocumentsCard({ clientId, clientName, cutoffDay, canAct }: { clientId: string; clientName: string; cutoffDay: number; canAct: boolean }) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("documents")
    .select("id, doc_type, period, late, prior_year, file_name, source, status, return_reason, client_reply, created_at")
    .eq("client_id", clientId)
    .neq("status", "uploading")
    .order("created_at", { ascending: false })
    .limit(50);
  const docs = (data ?? []) as Doc[];
  const today = manilaToday();
  const waiting = docs.filter((d) => d.status === "received").length;

  return (
    <Card title="Documents" actions={<span className="text-caption-1-regular text-text-tertiary">{waiting ? `${waiting} new` : "Latest 50"}</span>}>
      {docs.length === 0 ? (
        <p className="text-body-regular text-text-secondary">No documents yet.</p>
      ) : (
        <ul className="divide-y divide-separator-border text-body-regular">
          {docs.map((d) => (
            <li key={d.id} className="space-y-2 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a href={`/files/${d.id}`} target="_blank" rel="noopener" className="block truncate font-medium text-button-ghost-foreground hover:underline">{d.file_name}</a>
                  <p className="text-caption-1-regular text-text-tertiary">
                    {DOC_TYPES[d.doc_type]} · {showMonth(d.period)} · {d.source === "staff" ? "staff upload" : "from client"} · {when(d.created_at)}
                    {d.late ? " · late" : ""}{d.prior_year ? " · prior taxable year" : ""}
                  </p>
                </div>
                <Badge tone={docStatusTone[d.status]}>{docStatusLabel[d.status]}</Badge>
              </div>
              {d.status === "returned" && d.return_reason && <p className="text-caption-1-regular text-text-secondary">Returned: “{d.return_reason}”</p>}
              {d.client_reply && d.status !== "returned" && <p className="text-caption-1-regular text-text-secondary">Client replied: “{d.client_reply}”</p>}
              {canAct && <DocReviewActions documentId={d.id} status={d.status} />}
            </li>
          ))}
        </ul>
      )}
      {canAct && (
        <details className="mt-4 border-t border-separator-border pt-4">
          <summary className="cursor-pointer text-body-medium text-button-ghost-foreground">Upload for {clientName}</summary>
          <div className="mt-3">
            <DocumentUpload clients={[{ id: clientId, name: clientName }]} docTypes={CLIENT_DOC_TYPES} months={monthChoices(today, 15)} defaultMonth={openMonth(today, cutoffDay)} compact />
          </div>
        </details>
      )}
    </Card>
  );
}
