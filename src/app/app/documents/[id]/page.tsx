import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, type DocType } from "@/lib/documents/labels";
import { LOCKED_STATUSES, lockingFiling, type LockFiling } from "@/lib/documents/lock";
import { checkFields } from "@/lib/ocr/checks";
import type { OcrConfidence, OcrFields } from "@/lib/ocr/fields";
import { manilaToday } from "@/lib/filings/run";
import { lookupParties } from "@/lib/parties/lookup";
import { resolveParty } from "@/lib/parties/resolve";
import { partyKey } from "@/lib/parties/tin";
import { supabaseServer } from "@/lib/supabase/server";
import { ACCOUNT_TYPES } from "@/lib/ledger/types";
import { ReviewForm, type Booking } from "./review-form";

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
    .select("id, client_id, doc_type, period, document_month, late, prior_year, file_name, mime_type, status, source, return_reason, client_reply, created_at, ledger_account_id, clients(name)")
    .eq("id", id)
    .maybeSingle();
  if (!doc) notFound();
  const posted = doc.status === "posted";
  const [{ data: ext }, { data: team }, { data: filed }] = await Promise.all([
    supabase.from("extractions").select("status, model, fields, confidence, error, approved_fields, approved_at").eq("document_id", id).maybeSingle(),
    supabase.from("staff_assignments").select("user_id").eq("client_id", doc.client_id).eq("user_id", me.userId),
    posted
      ? supabase.from("filing_instances").select("id, client_id, form, period_label, period_start, period_end, status").eq("client_id", doc.client_id).in("status", LOCKED_STATUSES)
      : Promise.resolve({ data: [] as LockFiling[] }),
  ]);
  const canAct = me.staff.role === "owner" || (team ?? []).length > 0;
  // An approved document stays editable until a return covering its month is filed.
  const lock = posted ? lockingFiling(doc.client_id, doc.document_month, (filed ?? []) as LockFiling[]) : null;
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
  // The parties directory: registered name and address for this TIN, and whether OCR disagrees.
  const key = partyKey(fields.party_tin);
  // A directory that cannot be read never blocks the review.
  const entry = key ? (await lookupParties(supabase, [fields.party_tin]).catch(() => null))?.get(key) : undefined;
  const resolved = entry ? resolveParty(fields.party_name, fields.party_tin, fields.party_address, entry) : null;
  const issues = checkFields(fields, { today: manilaToday(), duplicateOf, priorYear: doc.prior_year });
  const client = doc.clients as unknown as { name: string } | null;
  const booking = await loadBooking(supabase, doc, entry?.id ?? null);
  const isPdf = doc.mime_type === "application/pdf";

  return (
    <>
      <PageHeader
        title={DOC_TYPES[doc.doc_type as DocType]}
        description={
          <span>
            <Link href={`/app/clients/${doc.client_id}`} className="text-button-ghost-foreground hover:underline">{client?.name}</Link> · {showMonth(doc.period)}
            {doc.late ? " · late" : ""}{doc.prior_year ? " · prior taxable year" : ""} · {doc.source === "staff" ? "staff upload" : "from client"}
          </span>
        }
        actions={<Badge tone={docStatusTone[doc.status as keyof typeof docStatusTone]}>{docStatusLabel[doc.status]}</Badge>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={doc.file_name}>
          {isPdf ? (
            <iframe src={`/files/${doc.id}`} title={doc.file_name} className="h-[70vh] w-full rounded-lg border border-separator-border" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- a short-lived signed link, not an optimisable asset
            <img src={`/files/${doc.id}`} alt={`${DOC_TYPES[doc.doc_type as DocType]} uploaded by the client`} className="max-h-[75vh] w-full rounded-lg border border-separator-border object-contain" />
          )}
          <a href={`/files/${doc.id}`} target="_blank" rel="noopener" className="mt-2 inline-block text-body-regular text-button-ghost-foreground hover:underline">Open full size</a>
        </Card>
        <div className="space-y-4">
          {doc.client_reply && <Notice tone="waiting">Client replied: “{doc.client_reply}”</Notice>}
          {!ext && <Notice>OCR has not read this document yet{process.env.GEMINI_API_KEY ? "." : " (no GEMINI_API_KEY is set). You can type the figures yourself."}</Notice>}
          {ext?.status === "pending" && <Notice>OCR is reading this document. Refresh in a moment.</Notice>}
          {ext?.status === "failed" && <Notice tone="blocked">OCR could not read it: {ext.error}. Read it again, or type the figures.</Notice>}
          {ext?.approved_at && lock && (
            <Notice tone="done">Approved and locked: the {lock.form} return for {lock.period_label} has been filed, so these figures can no longer change.</Notice>
          )}
          {ext?.approved_at && !lock && (
            <Notice tone="done">Approved. {posted && canAct ? "You can still correct these figures until the return for this month is filed." : "These are the approved figures."}</Notice>
          )}
          <ReviewForm
            documentId={doc.id}
            docType={doc.doc_type}
            fields={fields}
            confidence={confidence}
            issues={issues}
            canAct={canAct && (["received", "under_review"].includes(doc.status) || (posted && !lock))}
            mode={posted ? "edit" : "approve"}
            canRead={canAct && !ext?.approved_at}
            model={ext?.model ?? null}
            directory={resolved && { partyId: resolved.party!.id, name: resolved.name, tin: resolved.tin, address: resolved.address, verified: Boolean(resolved.party!.verified_at), warning: resolved.warning }}
            booking={booking}
          />
        </div>
      </div>
    </>
  );
}

const BOOKED_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"];

/** The books side of the review: only for clients whose books are set up, and document types that are booked. */
async function loadBooking(
  supabase: Awaited<ReturnType<typeof supabaseServer>>,
  doc: { id: string; client_id: string; doc_type: string; ledger_account_id: string | null },
  partyId: string | null,
): Promise<Booking | null> {
  if (!BOOKED_TYPES.includes(doc.doc_type)) return null;
  const { data: books } = await supabase.from("client_books").select("client_id").eq("client_id", doc.client_id).maybeSingle();
  if (!books) return null;
  const [{ data: accounts }, { data: def }, { data: entries }, history, preset] = await Promise.all([
    supabase.from("ledger_accounts").select("id, code, name, type, active, control").eq("client_id", doc.client_id).order("sort_order").order("code"),
    supabase.rpc("document_account_default", { p_document: doc.id }),
    supabase.from("journal_entries").select("status, created_at").eq("document_id", doc.id).order("created_at", { ascending: false }).limit(1),
    partyId ? supabase.from("client_party_accounts").select("account_id").eq("client_id", doc.client_id).eq("party_id", partyId).limit(1) : Promise.resolve({ data: [] }),
    partyId ? supabase.from("parties").select("preset_account_key").eq("id", partyId).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const accountId = (def as string | null) ?? null;
  const source = doc.ledger_account_id
    ? "Chosen for this document."
    : (history.data ?? []).length
      ? "The account last used for this supplier or customer."
      : (preset.data as { preset_account_key: string | null } | null)?.preset_account_key
        ? "The preset account title for this supplier in the parties directory."
        : "The default for this kind of document; change it if needed.";
  return {
    accounts: (accounts ?? [])
      .filter((a) => a.active || a.id === accountId)
      .map((a) => ({ id: a.id, label: `${a.code} · ${a.name}`, group: ACCOUNT_TYPES[a.type as keyof typeof ACCOUNT_TYPES] })),
    cashAccounts: (accounts ?? []).filter((a) => a.active && (a.control === "cash" || a.control === "bank")).map((a) => ({ id: a.id, label: `${a.code} · ${a.name}` })),
    accountId,
    source,
    entry: entries?.[0] ? { status: entries[0].status as "suggested" | "posted" | "reversed" } : null,
    terms: doc.doc_type === "sales_invoice" || doc.doc_type === "purchase_receipt",
    booksHref: `/app/clients/${doc.client_id}/books`,
  };
}
