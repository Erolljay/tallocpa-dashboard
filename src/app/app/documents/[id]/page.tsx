import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { checkFields } from "@/lib/ocr/checks";
import type { OcrConfidence, OcrFields } from "@/lib/ocr/fields";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { ReviewForm } from "./review-form";

export default function DocumentReviewPage(props: PageProps<"/app/documents/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Review params={props.params} />
    </Suspense>
  );
}

async function Review({ params }: { params: PageProps<"/app/documents/[id]">["params"] }) {
  const { id } = await params;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: doc } = await supabase
    .from("documents")
    .select("id, client_id, doc_type, period, late, prior_year, file_name, mime_type, status, source, return_reason, client_reply, created_at, clients(name)")
    .eq("id", id)
    .maybeSingle();
  if (!doc) notFound();
  const [{ data: ext }, { data: team }] = await Promise.all([
    supabase.from("extractions").select("status, model, fields, confidence, error, approved_fields, approved_at").eq("document_id", id).maybeSingle(),
    supabase.from("staff_assignments").select("user_id").eq("client_id", doc.client_id).eq("user_id", me.userId),
  ]);
  const canAct = me.staff.role === "owner" || (team ?? []).length > 0;
  const fields = (ext?.approved_fields ?? ext?.fields ?? {}) as OcrFields;
  const confidence = (ext?.approved_fields ? {} : ext?.confidence ?? {}) as OcrConfidence;

  // Duplicate: another approved document of this client with the same supplier TIN and number.
  let duplicateOf: string | null = null;
  if (fields.party_tin && fields.number) {
    const { data: dup } = await supabase
      .from("extractions")
      .select("document_id, documents!inner(client_id)")
      .eq("documents.client_id", doc.client_id)
      .eq("approved_fields->>party_tin", fields.party_tin)
      .eq("approved_fields->>number", fields.number)
      .neq("document_id", id)
      .limit(1);
    duplicateOf = dup?.[0]?.document_id ?? null;
  }
  const issues = checkFields(fields, { today: manilaToday(), duplicateOf, priorYear: doc.prior_year });
  const client = doc.clients as unknown as { name: string } | null;
  const isPdf = doc.mime_type === "application/pdf";

  return (
    <>
      <PageHeader
        title={DOC_TYPES[doc.doc_type as DocType]}
        description={
          <span>
            <Link href={`/app/clients/${doc.client_id}`} className="text-link hover:underline">{client?.name}</Link> · {showMonth(doc.period)}
            {doc.late ? " · late" : ""}{doc.prior_year ? " · prior taxable year" : ""} · {doc.source === "staff" ? "staff upload" : "from client"}
          </span>
        }
        actions={<Badge tone={docStatusTone[doc.status as keyof typeof docStatusTone]}>{docStatusLabel[doc.status]}</Badge>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={doc.file_name}>
          {isPdf ? (
            <iframe src={`/files/${doc.id}`} title={doc.file_name} className="h-[70vh] w-full rounded-lg border border-border" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- a short-lived signed link, not an optimisable asset
            <img src={`/files/${doc.id}`} alt={`${DOC_TYPES[doc.doc_type as DocType]} uploaded by the client`} className="max-h-[75vh] w-full rounded-lg border border-border object-contain" />
          )}
          <a href={`/files/${doc.id}`} target="_blank" rel="noopener" className="mt-2 inline-block text-sm text-link hover:underline">Open full size</a>
        </Card>
        <div className="space-y-4">
          {doc.client_reply && <Notice tone="waiting">Client replied: “{doc.client_reply}”</Notice>}
          {!ext && <Notice>OCR has not read this document yet{process.env.GEMINI_API_KEY ? "." : " (no GEMINI_API_KEY is set). You can type the figures yourself."}</Notice>}
          {ext?.status === "pending" && <Notice>OCR is reading this document. Refresh in a moment.</Notice>}
          {ext?.status === "failed" && <Notice tone="blocked">OCR could not read it: {ext.error}. Read it again, or type the figures.</Notice>}
          {ext?.approved_at && <Notice tone="done">Approved. These are the approved figures.</Notice>}
          <ReviewForm
            documentId={doc.id}
            fields={fields}
            confidence={confidence}
            issues={issues}
            canAct={canAct && ["received", "under_review"].includes(doc.status)}
            canRead={canAct && !ext?.approved_at}
            model={ext?.model ?? null}
          />
        </div>
      </div>
    </>
  );
}
