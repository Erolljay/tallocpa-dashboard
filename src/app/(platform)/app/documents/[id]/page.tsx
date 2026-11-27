import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { DOC_TYPES, docStatusLabel, docStatusTone, showMonth, SOURCE_LABELS, SPREADSHEET_TYPES, type DocType } from "@/lib/documents/labels";
import { LOCKED_STATUSES, lockingFiling, type LockFiling } from "@/lib/documents/lock";
import { checkFields } from "@/lib/ocr/checks";
import type { OcrConfidence, OcrFields } from "@/lib/ocr/fields";
import { manilaToday } from "@/lib/filings/run";
import { lookupParties } from "@/lib/parties/lookup";
import { resolveParty } from "@/lib/parties/resolve";
import { partyKey } from "@/lib/parties/tin";
import { supabaseServer } from "@/lib/supabase/server";
import { ACCOUNT_TYPES } from "@/lib/ledger/types";
import { pendingDocumentTaxCodes } from "@/lib/books/actions";
import { loadTaxCodes } from "@/lib/books/data";
import { loadEmployees, loadItems } from "@/lib/payroll/data";
import { sortItems } from "@/lib/payroll/items";
import { targetOptions } from "@/lib/payroll/read/columns";
import { initialDraft, matchesOf } from "@/lib/payroll/read/draft";
import type { PayrollDraft, PayrollRead } from "@/lib/payroll/read/types";
import { byName, displayName } from "@/lib/payroll/year";
import { PayrollIntake } from "./payroll-intake";
import { ColumnMapping, PayrollReadReview, ReadPayrollButton, SheetPreview } from "./payroll-read";
import { ReviewForm, type Booking } from "./review-form";
import { CwtMatch } from "./cwt-match";
import { ZoomPreview } from "./zoom-preview";

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
    .select("id, client_id, doc_type, period, document_month, late, prior_year, file_name, mime_type, status, source, uploaded_by, return_reason, client_reply, created_at, ledger_account_id, clients(name)")
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
  // How it came in and who sent it, e.g. "via Telegram · Maria Molo".
  const [{ data: staffName }, { data: clientName }] = await Promise.all([
    supabase.from("staff_profiles").select("full_name").eq("user_id", doc.uploaded_by).maybeSingle(),
    supabase.from("client_users").select("full_name").eq("user_id", doc.uploaded_by).eq("client_id", doc.client_id).maybeSingle(),
  ]);
  const via = `via ${[SOURCE_LABELS[doc.source] ?? doc.source, staffName?.full_name ?? clientName?.full_name].filter(Boolean).join(" · ")}`;
  if (doc.doc_type === "payroll") return <PayrollDocument doc={doc} canAct={canAct} via={via} />;
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
  const issues = checkFields(fields, { today: manilaToday(), duplicateOf, priorYear: doc.prior_year, documentMonth: doc.document_month });
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
            {doc.late ? " · late" : ""}{doc.prior_year ? " · prior taxable year" : ""} · {via}
          </span>
        }
        actions={<Badge tone={docStatusTone[doc.status as keyof typeof docStatusTone]}>{docStatusLabel[doc.status]}</Badge>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={doc.file_name}>
          {isPdf ? (
            <iframe src={`/files/${doc.id}`} title={doc.file_name} className="h-[70vh] w-full rounded-lg border border-separator-border" />
          ) : (
            <ZoomPreview src={`/files/${doc.id}`} alt={`${DOC_TYPES[doc.doc_type as DocType]} uploaded by the client`} />
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
          {doc.doc_type === "bir_2307_received" && doc.status !== "returned" && (
            <CwtMatch supabase={supabase} doc={doc} fields={fields} partyId={entry?.id ?? null} canAct={canAct} />
          )}
        </div>
      </div>
    </>
  );
}

const BOOKED_TYPES = ["sales_invoice", "purchase_receipt", "bir_2307_received", "bir_2307_issued"];

/**
 * Payroll in the client's own format (no register line): the file beside the
 * Tallo register read from it, for staff on the client to check, edit and load
 * into the month; or the manual steps when it has not been read.
 */
async function PayrollDocument({ doc, canAct, via }: { via: string; doc: { id: string; client_id: string; doc_type: string; period: string; late: boolean; file_name: string; mime_type: string; status: string; source: string; clients: unknown }; canAct: boolean }) {
  const client = doc.clients as { name: string } | null;
  const ym = doc.period.slice(0, 7);
  const isPdf = doc.mime_type === "application/pdf";
  const isImage = doc.mime_type.startsWith("image/");
  const open = ["received", "under_review"].includes(doc.status);
  const supabase = await supabaseServer();
  // RLS: only the Owner and staff assigned to the client read the payroll reading.
  const { data: ext } = canAct ? await supabase.from("payroll_extractions").select("status, result, draft, error, loaded_at, finished_at").eq("document_id", doc.id).maybeSingle() : { data: null };
  const read = ext?.status === "done" ? (ext.result as PayrollRead | null) : null;
  const sheetFile = SPREADSHEET_TYPES.includes(doc.mime_type) || /\.(xlsx|csv)$/i.test(doc.file_name);
  const canRead = canAct && open && (sheetFile || Boolean(process.env.GEMINI_API_KEY));
  let review: ReactNode = null;
  if (read) {
    const [items, employees] = await Promise.all([loadItems(supabase, doc.client_id), loadEmployees(supabase, doc.client_id)]);
    const draft = (ext?.draft as PayrollDraft | null) ?? initialDraft(read, employees);
    const active = sortItems(items.filter((i) => i.active));
    review = (
      <div className="space-y-4">
        {read.sheet && open && <ColumnMapping key={String(ext?.finished_at)} documentId={doc.id} read={read} options={targetOptions(items)} />}
        <PayrollReadReview
          key={String(ext?.finished_at)}
          documentId={doc.id}
          read={read}
          draft={draft}
          matches={matchesOf(read, employees)}
          employees={[...employees].sort(byName).map((e) => ({ id: e.id, label: `${displayName(e)}${e.employeeNo ? ` · ${e.employeeNo}` : ""}${e.active ? "" : " (inactive)"}` }))}
          items={active.map((i) => ({ id: i.id, name: i.name, kind: i.kind }))}
          open={open}
          downloadHref={`/app/clients/${doc.client_id}/payroll/export?kind=read&document=${doc.id}`}
        />
      </div>
    );
  }
  return (
    <>
      <PageHeader
        title={`Payroll · ${showMonth(doc.period)}`}
        description={
          <span>
            <Link href={`/app/clients/${doc.client_id}`} className="text-button-ghost-foreground hover:underline">{client?.name}</Link>
            {doc.late ? " · late" : ""} · {via}
          </span>
        }
        actions={<Badge tone={docStatusTone[doc.status as keyof typeof docStatusTone]}>{doc.status === "posted" ? "Loaded" : docStatusLabel[doc.status]}</Badge>}
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card title={doc.file_name} className="xl:sticky xl:top-4 xl:self-start">
          {isPdf ? (
            <iframe src={`/files/${doc.id}`} title={doc.file_name} className="h-[70vh] w-full rounded-lg border border-separator-border" />
          ) : isImage ? (
            <ZoomPreview src={`/files/${doc.id}`} alt={`Payroll for ${showMonth(doc.period)} sent by the client`} />
          ) : read?.sheet ? (
            <>
              <p className="mb-2 text-body-2-regular text-text-secondary">Sheet “{read.sheet.name}” as read; the heading row is shaded.</p>
              <SheetPreview grid={read.sheet.grid} headerRow={read.sheet.headerRow} />
            </>
          ) : (
            <p className="text-body-regular text-text-secondary">The client&apos;s own spreadsheet. Download it to open in Excel.</p>
          )}
          <a href={`/files/${doc.id}`} target="_blank" rel="noopener" className="mt-2 inline-block text-body-regular text-button-ghost-foreground hover:underline">
            {isPdf || isImage ? "Open full size" : "Download the client's file"}
          </a>
        </Card>
        <div className="min-w-0 space-y-6">
          {canAct && (
            <Card title="Tallo payroll register" actions={canRead ? <ReadPayrollButton documentId={doc.id} again={Boolean(ext)} /> : null}>
              <div className="space-y-4">
                {ext?.loaded_at && <Notice tone="done">Loaded into payroll.</Notice>}
                {!ext && <p className="text-body-regular text-text-secondary">{canRead ? "Not read yet. “Read payroll” fills the register from the client's file for you to check." : open ? "A PDF or photo needs the OCR key (GEMINI_API_KEY) to be read; copy it into the template below." : "Not read."}</p>}
                {ext?.status === "pending" && <Notice>Reading the client&apos;s file. Refresh in a moment.</Notice>}
                {ext?.status === "failed" && <Notice tone="blocked">The file could not be read: {ext.error}</Notice>}
                {review}
              </div>
            </Card>
          )}
          <Card title={read ? "Or by hand" : "Load into payroll"}>
            {canAct ? (
              <PayrollIntake
                documentId={doc.id}
                open={open}
                templateHref={`/app/clients/${doc.client_id}/payroll/export?kind=template&month=${ym}`}
                monthHref={`/app/clients/${doc.client_id}/payroll/month/${ym}`}
              />
            ) : (
              <p className="text-body-regular text-text-secondary">Only the Owner and the staff assigned to this client can load its payroll.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

/** The books side of the review: only for clients whose books are set up, and document types that are booked. */
async function loadBooking(
  supabase: Awaited<ReturnType<typeof supabaseServer>>,
  doc: { id: string; client_id: string; doc_type: string; ledger_account_id: string | null; status: string },
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
  // The Books (rework): suggested tax codes while waiting; the invoice once posted.
  const invoiceKind = doc.doc_type === "sales_invoice" ? "sales" : doc.doc_type === "purchase_receipt" ? "purchase" : null;
  const [codes, taxCodes, { data: posted }] = await Promise.all([
    invoiceKind && ["received", "under_review"].includes(doc.status)
      ? pendingDocumentTaxCodes(doc.client_id, supabase).then((all) => all.find((x) => x.document_id === doc.id) ?? null).catch(() => null)
      : Promise.resolve(null),
    invoiceKind ? loadTaxCodes(supabase) : Promise.resolve([]),
    supabase.from("book_invoices").select("id, kind").eq("document_id", doc.id).is("voided_at", null).maybeSingle(),
  ]);
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
    invoiceKind,
    codes,
    taxCodes,
    inBooks: posted ? `/app/clients/${doc.client_id}/books/${posted.kind === "sales" ? "sales-invoices" : "purchase-invoices"}/${posted.id}` : null,
  };
}
