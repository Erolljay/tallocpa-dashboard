import { RiCheckLine } from "@remixicon/react";
import Link from "next/link";
import { cx } from "@/utils/cx";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { esubmissionLabel, esubmissionTone, filingStatusLabel, filingStatusTone, showDate, type EsubmissionState } from "@/lib/filings/labels";
import { activeFor, type Delegation } from "@/lib/acting/period";
import { availableActions, isNilReturn, SIGN_OFF_STEPS, stepIndex, type FilingStatus } from "@/lib/filings/sign-off";
import { esubmissionMailEnv } from "@/lib/env";
import { moduleForForm } from "@/lib/returns/registry";
import { TAX_DUE_FIGURE, taxDueOf } from "@/lib/returns/source";
import type { WorksheetResult } from "@/lib/returns/types";
import { supabaseServer } from "@/lib/supabase/server";
import { manilaToday } from "@/lib/filings/run";
import { REMITTANCE_KINDS, remittanceBadge, type RemittanceKind, type RemittanceStatus } from "@/lib/remittances/labels";
import { filingsBooksReady, filingsNeedingAmendment } from "@/lib/books/actions";
import { DOC_TYPES, type DocType } from "@/lib/documents/labels";
import { SignOffActions, type PaymentCheck } from "../sign-off-actions";
import { CatchUpConfirmForms, CatchUpRecordForm } from "../catch-up-forms";
import { AmendFilingForm } from "../amend-form";
import { AiDraftsPanel } from "@/components/ai/ai-drafts-panel";
import { BirMailForFiling } from "@/components/bir-mail/panels";
import { PaymentProofSuggestions } from "./payment-proof";
import { ApprovalMemo } from "./approval-memo";
import { EsubmissionControls, ReturnFileUpload, RetryBookEntry } from "./return-files";

export default function FilingPage(props: PageProps<"/app/filings/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Filing params={props.params} />
    </Suspense>
  );
}

interface Event {
  id: number;
  from_status: string | null;
  to_status: string;
  action: string | null;
  actor: string | null;
  note: string | null;
  data: Record<string, unknown>;
  created_at: string;
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));
const eventText: Record<string, string> = {
  prepare: "marked it prepared",
  review: "marked it reviewed",
  kick_back: "sent it back to the preparer",
  client_approve: "recorded the client's approval",
  client_query: "asked a question",
  answer_query: "answered the client",
  owner_approve: "gave the final approval",
  file: "recorded it filed & paid",
  pay: "recorded the payment",
  send_proof: "marked the proof sent",
  amend: "started this amended return",
  skip_client_approval: "moved it past the client's approval (nil return)",
  migrate: "moved it to the five-step sign-off",
  restart: "sent it back to Not started",
};
const bookKind: Record<string, string> = { vat_closing: "VAT closing", dues_payment: "Payment of the dues" };
const bookStatus: Record<string, { label: string; tone: "done" | "waiting" | "blocked" | "neutral" }> = {
  posted: { label: "Posted", tone: "done" },
  skipped: { label: "Not posted", tone: "neutral" },
  failed: { label: "Could not post", tone: "blocked" },
  reversed: { label: "Reversed", tone: "neutral" },
};

interface FilingFile { id: string; kind: string; file_name: string; source: string; created_at: string; replaced_at: string | null; esubmission_id: string | null }
interface BookRow { id: string; kind: string; status: string; entry_date: string | null; amount: string | null; note: string | null; entry_id: string | null }
const paymentText: Record<string, string> = { paid: "Paid", partial: "Partially paid", unpaid: "Unpaid", not_applicable: "Nothing to pay" };

async function Filing({ params }: { params: PageProps<"/app/filings/[id]">["params"] }) {
  const { id } = await params;
  const me = await requireStaff();
  const supabase = await supabaseServer();

  const { data: f } = await supabase
    .from("filing_instances")
    .select("id, client_id, obligation_id, amendment_no, form, period_label, period_start, period_end, due_date, statutory_due_date, status, tax_due, filing_reference, filed_on, payment_reference, paid_on, open_query, esubmission_required, esubmission_files, catch_up, catch_up_recorded_by, catch_up_recorded_at, clients(id, name, code, payment_mode, catch_up_through)")
    .eq("id", id)
    .maybeSingle();
  if (!f) notFound();
  const client = f.clients as unknown as { id: string; name: string; code: string; payment_mode: string; catch_up_through: string | null };

  const [{ data: events }, { data: team }, { data: staff }, { data: clientUsers }, { data: attachments }, { data: delegations }, { data: versions }, { data: files }, { data: sends }, { data: bookRows }, { data: esubState }, { data: worksheetRow }] = await Promise.all([
    supabase.from("filing_events").select("id, from_status, to_status, action, actor, note, data, created_at").eq("filing_instance_id", id).order("created_at").order("id"),
    supabase.from("staff_assignments").select("user_id, role").eq("client_id", f.client_id),
    supabase.from("staff_profiles").select("user_id, full_name"),
    supabase.from("client_users").select("user_id, full_name").eq("client_id", f.client_id),
    supabase.from("documents").select("id, doc_type, file_name, created_at").eq("filing_instance_id", id).neq("status", "uploading").order("created_at"),
    me.staff.role === "reviewer"
      ? supabase.from("acting_approver_delegations").select("id, delegate_user_id, starts_at, ends_at, max_tax_due, reason, ended_at").eq("delegate_user_id", me.userId).is("ended_at", null)
      : Promise.resolve({ data: [] as Delegation[] }),
    // The original return of the period and its amended returns.
    supabase.from("filing_instances").select("id, period_label, status, amendment_no").eq("obligation_id", f.obligation_id).eq("period_end", f.period_end).order("amendment_no"),
    supabase.from("filing_files").select("id, kind, file_name, source, created_at, replaced_at, esubmission_id").eq("filing_instance_id", id).order("created_at"),
    supabase.from("esubmissions").select("id, method, files, status, sent_at, result_at, result_note").eq("filing_instance_id", id).is("superseded_at", null).maybeSingle(),
    supabase.from("return_book_entries").select("id, kind, status, entry_date, amount, note, entry_id").eq("filing_instance_id", id).order("created_at"),
    supabase.rpc("filing_esubmission_state", { p_filing: id }),
    supabase.from("return_worksheets").select("figures, result").eq("filing_instance_id", id).maybeSingle(),
  ]);
  // The tax due comes from the saved worksheet when the app has one for the form (Owner, 26 November 2026).
  const worksheetTaxDue: number | "missing" | null = !moduleForForm(f.form)
    ? null
    : !worksheetRow?.result
      ? "missing"
      : (((worksheetRow.figures ?? {}) as Record<string, number>)[TAX_DUE_FIGURE] ?? taxDueOf(worksheetRow.result as WorksheetResult)) / 100;
  // Month lock (docs/REWORK.md, decisions 9 and 10): a filed return whose month was unlocked
  // needs an amended return; an unfiled one waits until the Books of its period are locked.
  const [amendment, ready] = await Promise.all([
    filingsNeedingAmendment(f.client_id).then((rows) => rows.find((r) => r.filing_id === f.id) ?? null),
    filingsBooksReady([f.id]).then((m) => m.get(f.id) ?? true),
  ]);
  const later = (versions ?? []).some((v) => v.amendment_no > f.amendment_no);
  const canAmend =
    f.status === "filed" && !later &&
    (me.staff.role === "owner" || (team ?? []).some((t) => t.user_id === me.userId && t.role === "reviewer"));
  const acting = activeFor((delegations ?? []) as Delegation[], me.userId);
  const canAttach = me.staff.role === "owner" || (team ?? []).some((t) => t.user_id === me.userId);
  const allFiles = (files ?? []) as FilingFile[];
  const filedCopy = allFiles.find((x) => x.kind === "filed_copy" && !x.replaced_at) ?? null;
  const reports = allFiles.filter((x) => x.kind === "validation_report");
  const dats = allFiles.filter((x) => x.kind === "esubmission_dat");
  const proofs = allFiles.filter((x) => x.kind === "payment_proof" && !x.replaced_at);
  // The payment the staff attached from the Payment Proof Clerk's suggestion: Filed & paid offers its references and date.
  const { data: paidMail } = proofs.length
    ? await supabase.from("payment_mail").select("payment_reference, bir_reference, paid_on").eq("filing_instance_id", f.id).eq("status", "attached").order("attached_at", { ascending: false }).limit(1).maybeSingle()
    : { data: null };
  const paymentPrefill = paidMail?.payment_reference
    ? { reference: paidMail.bir_reference ? `${paidMail.payment_reference} · BIR ${paidMail.bir_reference}` : paidMail.payment_reference, paidOn: paidMail.paid_on as string | null }
    : null;
  const esub =(esubState ?? "not_required") as EsubmissionState;
  const send = sends as { id: string; method: string; files: string[]; status: string; sent_at: string; result_at: string | null; result_note: string | null } | null;
  const books = (bookRows ?? []) as BookRow[];
  const nil = isNilReturn(f.tax_due == null ? null : Number(f.tax_due));
  const nameOf = new Map([...(staff ?? []), ...(clientUsers ?? [])].map((p) => [p.user_id, p.full_name]));
  const history = (events ?? []) as Event[];
  const preparedBy = [...history].reverse().find((e) => e.action === "prepare")?.actor ?? null;
  const status = f.status as FilingStatus;
  const done = stepIndex(status);
  const complete = status === "filed" && (esub === "not_required" || esub === "validated");

  // Catch-up (migration 20270104000001): a past return filed outside the app is recorded by
  // staff and confirmed by the reviewer, with no other step.
  const catchUpPeriod = client.catch_up_through != null && f.period_end <= client.catch_up_through && status === "not_started";
  const assignedAs = (team ?? []).filter((t) => t.user_id === me.userId).map((t) => t.role);
  const isOwnerViewer = me.staff.role === "owner";
  const recorded = catchUpPeriod && f.catch_up_recorded_at != null;
  const canRecord = catchUpPeriod && (isOwnerViewer || assignedAs.length > 0);
  const canConfirm = recorded && (isOwnerViewer || (assignedAs.includes("reviewer") && f.catch_up_recorded_by !== me.userId));

  const actions = availableActions(
    { status, openQuery: f.open_query, preparedBy, taxDue: f.tax_due == null ? null : Number(f.tax_due) },
    {
      userId: me.userId,
      role: me.staff.role,
      assignedAs: (team ?? []).filter((t) => t.user_id === me.userId).map((t) => t.role as "preparer" | "reviewer"),
      actingLimit: acting ? Number(acting.max_tax_due) : null,
    },
  );

  // The payment check the Owner sees before the final approval (spec §3.8), from Collections.
  const paymentCheck = actions.includes("owner_approve")
    ? (((await supabase.rpc("filing_payment_check", { p_filing: f.id })).data as PaymentCheck | null) ?? null)
    : null;

  return (
    <>
      <PageHeader
        title={`${f.form} · ${f.period_label}`}
        description={
          <span>
            <Link href={`/app/clients/${client.id}`} className="text-button-ghost-foreground hover:underline">{client.name}</Link> · due {showDate(f.due_date)}
            {f.due_date !== f.statutory_due_date ? ` (moved from ${showDate(f.statutory_due_date)})` : ""}
          </span>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {amendment && <Badge tone="blocked">Needs amended return</Badge>}
            {status === "filed" && esub !== "not_required" && esub !== "validated" && <Badge tone="waiting">Validation report missing</Badge>}
            <Badge tone={filingStatusTone[status]}>{filingStatusLabel[status]}</Badge>
          </div>
        }
      />
      {amendment && (
        <div className="mb-6">
          <Notice tone="blocked">
            The Books of this period were unlocked{amendment.unlocked_at ? ` on ${showDate(amendment.unlocked_at.slice(0, 10))}` : ""}: {amendment.reason}. File an amended return once the month is locked again.
          </Notice>
        </div>
      )}
      {!ready && status !== "filed" && !catchUpPeriod && (
        <div className="mb-6">
          <Notice tone="waiting">
            The Books for this return&rsquo;s period are still open. It shows in the Filings lists once the reviewer locks every month of the period.{" "}
            <Link href={`/app/clients/${client.id}/books/months?year=${f.period_end.slice(0, 4)}`} className="font-medium underline">Month locks</Link>
          </Notice>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-6">
          {/* The Pre-Review Assistant's memo, for the Reviewer to accept or reject (renders nothing without one). */}
          <Suspense fallback={null}>
            <AiDraftsPanel subject={{ table: "filing_instances", id: f.id }} kinds={["review_memo"]} path={`/app/filings/${f.id}`} title="Suggested by the Pre-Review Assistant" />
          </Suspense>
          {/* The Payment Proof Clerk's match of a payment email to this return, for staff to attach. */}
          <Suspense fallback={null}>
            <PaymentProofSuggestions filingId={f.id} canAttach={canAttach} />
          </Suspense>
          {/* BIR emails linked to this return, and the BIR Mail Clerk's proposals naming it (nothing when neither). */}
          <Suspense fallback={null}>
            <BirMailForFiling filingId={f.id} />
          </Suspense>
          {/* W4: the approval memo, for the reviewer and the Owner once the return is reviewed. */}
          {(me.staff.role === "owner" || me.staff.role === "reviewer") && done >= stepIndex("reviewed") && status !== "filed" && (
            <Suspense fallback={<Skeleton rows={3} />}>
              <ApprovalMemo
                db={supabase}
                filing={{ id: f.id, clientId: f.client_id, obligationId: f.obligation_id, form: f.form, periodStart: f.period_start, periodEnd: f.period_end, taxDue: f.tax_due == null ? null : Number(f.tax_due) }}
                preparedBy={nameOf.get(preparedBy ?? "") ?? null}
                reviewedBy={nameOf.get([...history].reverse().find((e) => e.action === "review")?.actor ?? "") ?? null}
              />
            </Suspense>
          )}

          {catchUpPeriod && (
            <Card title="Catch-up: filed outside the app" actions={<Badge tone={recorded ? "waiting" : "neutral"}>{recorded ? "Waiting for confirmation" : "Not recorded"}</Badge>}>
              <p className="mb-4 text-body-regular text-text-secondary">
                This client is in catch-up through {showDate(client.catch_up_through!)}. Record what was filed with the BIR. The reviewer checks it against the BIR copy and confirms it. It skips the client&rsquo;s approval and the payment check, is not billed, and is not scored late. Attach the filed copy under Return if you have it.
              </p>
              {recorded && (
                <dl className="mb-4 grid grid-cols-[10rem_1fr] gap-x-4 gap-y-1 text-body-regular">
                  <dt className="text-text-tertiary">Tax due</dt><dd className="amount tabular-nums text-text-primary">{f.tax_due == null ? "—" : peso.format(Number(f.tax_due))}</dd>
                  <dt className="text-text-tertiary">Filed on</dt><dd className="tabular-nums text-text-primary">{f.filed_on ? showDate(f.filed_on) : "—"}{f.filing_reference ? ` · ${f.filing_reference}` : ""}</dd>
                  <dt className="text-text-tertiary">Paid on</dt><dd className="tabular-nums text-text-primary">{f.paid_on ? showDate(f.paid_on) : "—"}{f.payment_reference ? ` · ${f.payment_reference}` : ""}</dd>
                  <dt className="text-text-tertiary">Recorded by</dt><dd className="text-text-primary">{nameOf.get(f.catch_up_recorded_by ?? "") ?? "—"}</dd>
                </dl>
              )}
              <div className="space-y-6">
                {canConfirm && <CatchUpConfirmForms filingId={f.id} />}
                {canRecord && (
                  <div className={recorded ? "border-t border-separator-border pt-4" : undefined}>
                    <CatchUpRecordForm
                      filingId={f.id}
                      recorded={recorded ? { taxDue: f.tax_due == null ? null : Number(f.tax_due), filedOn: f.filed_on, filingReference: f.filing_reference, paidOn: f.paid_on, paymentReference: f.payment_reference } : null}
                    />
                  </div>
                )}
                {!canRecord && !canConfirm && <p className="text-body-regular text-text-secondary">{recorded ? "Waiting for the client's reviewer or the Owner to confirm it." : "Staff assigned to this client record it."}</p>}
                {recorded && !canConfirm && canRecord && f.catch_up_recorded_by === me.userId && <p className="text-caption-1-regular text-text-tertiary">You recorded it, so another person confirms it.</p>}
              </div>
            </Card>
          )}

          {f.catch_up && status === "filed" && (
            <Notice tone="done">Catch-up return: filed outside the app, recorded and confirmed here without the client&rsquo;s approval or the payment check.</Notice>
          )}

          {!catchUpPeriod && (
          <Card title="Sign-off">
            {/* One row of steps: scrolls sideways on phones, shares the width on wider screens. */}
            <ol className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {SIGN_OFF_STEPS.map((s, i) => {
                // A nil return skips the client's approval (decision 13).
                const skipped = nil && s.status === "client_approved";
                const state = skipped ? (done >= 2 ? "done" : "todo") : i < done ? "done" : i === done ? "current" : "todo";
                return (
                  <li
                    key={s.status}
                    aria-current={state === "current" ? "step" : undefined}
                    className={cx(
                      "flex min-w-24 flex-1 shrink-0 flex-col gap-0.5 rounded-xl border px-2.5 py-2",
                      state === "done" && "border-transparent bg-status-lime-background/60",
                      state === "current" && "border-accent-500 bg-button-ghost-background",
                      state === "todo" && "border-separator-border",
                    )}
                  >
                    <span className={cx("flex items-center gap-1 text-caption-1-semibold", state === "done" ? "text-status-lime-text" : state === "current" ? "text-text-primary" : "text-text-tertiary")}>
                      {state === "done" && <RiCheckLine aria-hidden className="size-3.5 shrink-0" />}
                      {s.label}
                    </span>
                    <span className="text-caption-2-regular text-text-tertiary">{skipped ? "Not needed: nil" : s.by}</span>
                  </li>
                );
              })}
            </ol>
            {f.open_query && (
              <div className="mt-4"><Notice tone="waiting">Client asked: “{f.open_query}”</Notice></div>
            )}
            <div className="mt-4">
              {actions.length > 0 ? (
                <SignOffActions filingId={f.id} actions={actions} taxDue={f.tax_due == null ? null : Number(f.tax_due)} paymentMode={client.payment_mode} paymentCheck={paymentCheck} clientId={client.id} actingLimit={me.staff.role === "owner" || !acting ? null : Number(acting.max_tax_due)} amended={f.amendment_no > 0} hasFiledCopy={Boolean(filedCopy)} worksheetTaxDue={worksheetTaxDue} worksheetHref={`/app/filings/${f.id}/worksheet`} paymentPrefill={paymentPrefill} />
              ) : (
                <p className="text-body-regular text-text-secondary">
                  {complete ? "This return is done." : status === "filed" ? "Filed & paid. It is complete once the BIR validates its DAT files (eSubmission below)." : "Nothing for you to do on this return right now."}
                </p>
              )}
            </div>
          </Card>
          )}

          {(f.esubmission_required || esub !== "not_required") && (status === "owner_approved" || status === "filed") && (
            <Card title="eSubmission" actions={<Badge tone={esubmissionTone[esub]}>{esubmissionLabel[esub]}</Badge>}>
              <div className="space-y-4">
                <p className="text-body-regular text-text-secondary">
                  The DAT files ({(send?.files.length ? send.files : (f.esubmission_files ?? [])).join(", ") || "from the worksheet"}) go from the firm&rsquo;s eSubmission mailbox to esubmission@bir.gov.ph. The return is complete once the BIR&rsquo;s validation report is attached.
                </p>
                {send && (
                  <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-1 text-body-regular">
                    <dt className="text-text-tertiary">Sent</dt>
                    <dd className="text-text-primary">{when(send.sent_at)} · {send.method === "gmail" ? "by the app" : "by hand"}</dd>
                    {send.result_at && (
                      <>
                        <dt className="text-text-tertiary">BIR&rsquo;s reply</dt>
                        <dd className="text-text-primary">{when(send.result_at)}{send.result_note ? ` · ${send.result_note}` : ""}</dd>
                      </>
                    )}
                  </dl>
                )}
                {(reports.length > 0 || dats.length > 0) && (
                  <ul className="space-y-1 text-body-regular">
                    {[...reports, ...dats].map((x) => (
                      <li key={x.id}>
                        <a href={`/filing-files/${x.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground hover:underline">{x.kind === "validation_report" ? "Validation report" : "DAT sent"}</a>
                        <span className="text-caption-1-regular text-text-tertiary"> · {x.file_name} · {when(x.created_at)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {canAttach && esub !== "not_required" && <EsubmissionControls filingId={f.id} state={esub} configured={esubmissionMailEnv() !== null} />}
              </div>
            </Card>
          )}

          {books.length > 0 && (
            <Card title="In the client's Books">
              <ul className="space-y-3 text-body-regular">
                {books.map((b) => (
                  <li key={b.id} className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {b.entry_id ? (
                        <Link href={`/app/clients/${client.id}/books/journal/${b.entry_id}`} className="text-button-ghost-foreground hover:underline">{bookKind[b.kind] ?? b.kind}</Link>
                      ) : (
                        <span className="text-text-primary">{bookKind[b.kind] ?? b.kind}</span>
                      )}
                      <Badge tone={bookStatus[b.status]?.tone ?? "neutral"}>{bookStatus[b.status]?.label ?? b.status}</Badge>
                      <span className="tabular-nums text-text-secondary">{b.entry_date ? showDate(b.entry_date) : ""}{b.amount != null ? ` · ${peso.format(Number(b.amount))}` : ""}</span>
                    </div>
                    {b.note && <p className="text-caption-1-regular text-text-secondary">{b.note}</p>}
                    {b.status === "failed" && canAttach && <RetryBookEntry filingId={f.id} rowId={b.id} />}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {canAmend && (
            <Card title="Amend this return">
              <AmendFilingForm filingId={f.id} />
            </Card>
          )}

          {f.form === "1601-C" && <MonthRemittances clientId={f.client_id} month={`${f.period_start.slice(0, 7)}-01`} />}

          <Card title="History">
            {history.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No steps taken yet.</p>
            ) : (
              <ol className="space-y-3 text-body-regular">
                {history.map((e) => (
                  <li key={e.id} className="border-l-2 border-separator-border pl-3">
                    <p className="text-text-primary">
                      <span className="font-medium">{(e.actor && nameOf.get(e.actor)) ?? "Someone"}</span> {eventText[e.action ?? ""] ?? `moved it to ${filingStatusLabel[e.to_status] ?? e.to_status}`}
                      {e.action === "owner_approve" && e.data.acting_approver === true ? " as acting approver" : ""}
                      {e.action === "owner_approve" && typeof e.data.payment_status === "string" ? ` · payment: ${paymentText[e.data.payment_status] ?? e.data.payment_status}${e.data.approve_unpaid ? " (approved unpaid)" : ""}` : ""}
                    </p>
                    {e.note && <p className="text-text-secondary">“{e.note}”</p>}
                    <p className="text-caption-1-regular text-text-tertiary">{when(e.created_at)}</p>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </div>

        <Card title="Return" actions={<Link href={`/app/filings/${f.id}/worksheet`} className="text-body-regular text-button-ghost-foreground hover:underline">Worksheet</Link>}>
          <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-2 text-body-regular">
            <dt className="text-text-tertiary">Period</dt><dd className="tabular-nums text-text-primary">{showDate(f.period_start)} – {showDate(f.period_end)}</dd>
            <dt className="text-text-tertiary">Tax due</dt><dd className="amount tabular-nums text-text-primary">{f.tax_due == null ? "—" : peso.format(Number(f.tax_due))}</dd>
            <dt className="text-text-tertiary">BIR payment</dt><dd className="text-text-primary">{client.payment_mode === "firm_remits" ? "We remit" : "Client pays directly"}</dd>
            <dt className="text-text-tertiary">Filing ref.</dt><dd className="text-text-primary">{f.filing_reference ?? "—"}{f.filed_on ? ` · ${showDate(f.filed_on)}` : ""}</dd>
            <dt className="text-text-tertiary">Payment ref.</dt><dd className="text-text-primary">{f.payment_reference ?? "—"}{f.paid_on ? ` · ${showDate(f.paid_on)}` : ""}</dd>
          </dl>
          {(versions ?? []).length > 1 && (
            <div className="mt-4 space-y-2 border-t border-separator-border pt-4">
              <p className="text-body-medium text-text-primary">Returns for this period</p>
              <ul className="space-y-1 text-body-regular">
                {(versions ?? []).map((v) => (
                  <li key={v.id} className="flex items-center justify-between gap-2">
                    {v.id === f.id ? (
                      <span className="text-text-primary">{v.period_label} (this one)</span>
                    ) : (
                      <Link href={`/app/filings/${v.id}`} className="text-button-ghost-foreground hover:underline">{v.period_label}</Link>
                    )}
                    <Badge tone={filingStatusTone[v.status as FilingStatus]}>{filingStatusLabel[v.status as FilingStatus]}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {proofs.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-separator-border pt-4">
              <p className="text-body-medium text-text-primary">Proof of payment</p>
              <ul className="space-y-1 text-body-regular">
                {proofs.map((x) => (
                  <li key={x.id}>
                    <a href={`/filing-files/${x.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground hover:underline">{x.file_name}</a>
                    <span className="text-caption-1-regular text-text-tertiary"> · from the payment email · {when(x.created_at)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-caption-1-regular text-text-tertiary">Staff only. The scanned copy below stays the one file the client sees.</p>
            </div>
          )}
          <div className="mt-4 space-y-3 border-t border-separator-border pt-4">
            <p className="text-body-medium text-text-primary">Scanned copy</p>
            {filedCopy ? (
              <p className="text-body-regular">
                <a href={`/filing-files/${filedCopy.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground hover:underline">{filedCopy.file_name}</a>
                <span className="text-caption-1-regular text-text-tertiary"> · {when(filedCopy.created_at)}</span>
              </p>
            ) : (
              <p className="text-caption-1-regular text-text-tertiary">
                {status === "owner_approved" || status === "filed" ? "Not attached yet. Needed for Filed & paid; the client sees it under Returns." : "Attached once the Owner approves the return."}
              </p>
            )}
            {canAttach && (status === "owner_approved" || status === "filed") && (
              <ReturnFileUpload filingId={f.id} kind="filed_copy" label={filedCopy ? "Replace the scanned copy" : "Attach the scanned copy"} />
            )}
          </div>
          {(attachments ?? []).length > 0 && (
          <div className="mt-4 space-y-3 border-t border-separator-border pt-4">
            <p className="text-body-medium text-text-primary">Earlier attachments</p>
            {(
              <ul className="space-y-1 text-body-regular">
                {(attachments ?? []).map((a) => (
                  <li key={a.id}>
                    <a href={`/files/${a.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground hover:underline">{DOC_TYPES[a.doc_type as DocType]}</a>
                    <span className="text-caption-1-regular text-text-tertiary"> · {a.file_name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          )}
        </Card>
      </div>
    </>
  );
}

/** The month's SSS, PhilHealth and Pag-IBIG remittances, made from the same posted payroll as this 1601-C. */
async function MonthRemittances({ clientId, month }: { clientId: string; month: string }) {
  const supabase = await supabaseServer();
  const [{ data: c }, { data }] = await Promise.all([
    supabase.from("clients").select("handles_contributions").eq("id", clientId).maybeSingle(),
    supabase.from("contribution_remittances").select("id, kind, due_date, status, total").eq("client_id", clientId).eq("period_month", month).order("kind"),
  ]);
  if (!c?.handles_contributions && (data ?? []).length === 0) return null;
  const today = manilaToday();
  return (
    <Card title="SSS, PhilHealth and Pag-IBIG">
      {(data ?? []).length === 0 ? (
        <p className="text-body-regular text-text-secondary">They come in when this month&rsquo;s payroll is posted.</p>
      ) : (
        <ul className="divide-y divide-separator-border text-body-regular">
          {(data ?? []).map((r) => {
            const badge = remittanceBadge(r.status as RemittanceStatus, r.due_date, today);
            return (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                <span className="min-w-0">
                  <Link href={`/app/remittances/${r.id}`} className="text-text-primary hover:underline">{REMITTANCE_KINDS[r.kind as RemittanceKind].option}</Link>
                  <span className="block text-caption-1-regular text-text-tertiary">{peso.format(Number(r.total))} · due {showDate(r.due_date)}</span>
                </span>
                <Badge tone={badge.tone}>{badge.label}</Badge>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
