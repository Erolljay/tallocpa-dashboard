import { RiCheckLine } from "@remixicon/react";
import Link from "next/link";
import { cx } from "@/utils/cx";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { activeFor, type Delegation } from "@/lib/acting/period";
import { availableActions, SIGN_OFF_STEPS, stepIndex, type FilingStatus } from "@/lib/filings/sign-off";
import { supabaseServer } from "@/lib/supabase/server";
import { DocumentUpload } from "@/components/document-upload";
import { DOC_TYPES, type DocType } from "@/lib/documents/labels";
import { SignOffActions, type PaymentCheck } from "../sign-off-actions";

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
  file: "recorded the filing",
  pay: "recorded the payment",
  send_proof: "marked the proof sent",
};
const paymentText: Record<string, string> = { paid: "Paid", partial: "Partially paid", unpaid: "Unpaid", not_applicable: "Nothing to pay" };

async function Filing({ params }: { params: PageProps<"/app/filings/[id]">["params"] }) {
  const { id } = await params;
  const me = await requireStaff();
  const supabase = await supabaseServer();

  const { data: f } = await supabase
    .from("filing_instances")
    .select("id, client_id, form, period_label, period_start, period_end, due_date, statutory_due_date, status, tax_due, filing_reference, filed_on, payment_reference, paid_on, open_query, clients(id, name, code, payment_mode)")
    .eq("id", id)
    .maybeSingle();
  if (!f) notFound();
  const client = f.clients as unknown as { id: string; name: string; code: string; payment_mode: string };

  const [{ data: events }, { data: team }, { data: staff }, { data: clientUsers }, { data: attachments }, { data: delegations }] = await Promise.all([
    supabase.from("filing_events").select("id, from_status, to_status, action, actor, note, data, created_at").eq("filing_instance_id", id).order("created_at").order("id"),
    supabase.from("staff_assignments").select("user_id, role").eq("client_id", f.client_id),
    supabase.from("staff_profiles").select("user_id, full_name"),
    supabase.from("client_users").select("user_id, full_name").eq("client_id", f.client_id),
    supabase.from("documents").select("id, doc_type, file_name, created_at").eq("filing_instance_id", id).neq("status", "uploading").order("created_at"),
    me.staff.role === "reviewer"
      ? supabase.from("acting_approver_delegations").select("id, delegate_user_id, starts_at, ends_at, max_tax_due, reason, ended_at").eq("delegate_user_id", me.userId).is("ended_at", null)
      : Promise.resolve({ data: [] as Delegation[] }),
  ]);
  const acting = activeFor((delegations ?? []) as Delegation[], me.userId);
  const canAttach = me.staff.role === "owner" || (team ?? []).some((t) => t.user_id === me.userId);
  const thisMonth = `${new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date()).slice(0, 7)}-01`;
  const nameOf = new Map([...(staff ?? []), ...(clientUsers ?? [])].map((p) => [p.user_id, p.full_name]));
  const history = (events ?? []) as Event[];
  const preparedBy = [...history].reverse().find((e) => e.action === "prepare")?.actor ?? null;
  const status = f.status as FilingStatus;
  const done = stepIndex(status);

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
        actions={<Badge tone={filingStatusTone[status]}>{filingStatusLabel[status]}</Badge>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-6">
          <Card title="Sign-off">
            {/* One row of steps: scrolls sideways on phones, shares the width on wider screens. */}
            <ol className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
              {SIGN_OFF_STEPS.map((s, i) => {
                const state = i < done ? "done" : i === done ? "current" : "todo";
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
                    <span className="text-caption-2-regular text-text-tertiary">{s.by}</span>
                  </li>
                );
              })}
            </ol>
            {f.open_query && (
              <div className="mt-4"><Notice tone="waiting">Client asked: “{f.open_query}”</Notice></div>
            )}
            <div className="mt-4">
              {actions.length > 0 ? (
                <SignOffActions filingId={f.id} actions={actions} taxDue={f.tax_due == null ? null : Number(f.tax_due)} paymentMode={client.payment_mode} paymentCheck={paymentCheck} clientId={client.id} actingLimit={me.staff.role === "owner" || !acting ? null : Number(acting.max_tax_due)} />
              ) : (
                <p className="text-body-regular text-text-secondary">{status === "proof_uploaded" ? "This return is done." : "Nothing for you to do on this return right now."}</p>
              )}
            </div>
          </Card>

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
          <div className="mt-4 space-y-3 border-t border-separator-border pt-4">
            <p className="text-body-medium text-text-primary">Filed return and proof</p>
            {(attachments ?? []).length === 0 ? (
              <p className="text-caption-1-regular text-text-tertiary">Nothing attached yet. The client sees these under Returns.</p>
            ) : (
              <ul className="space-y-1 text-body-regular">
                {(attachments ?? []).map((a) => (
                  <li key={a.id}>
                    <a href={`/files/${a.id}`} target="_blank" rel="noopener" className="text-button-ghost-foreground hover:underline">{DOC_TYPES[a.doc_type as DocType]}</a>
                    <span className="text-caption-1-regular text-text-tertiary"> · {a.file_name}</span>
                  </li>
                ))}
              </ul>
            )}
            {canAttach && (
              <DocumentUpload clients={[{ id: f.client_id, name: client.name }]} docTypes={["filed_return", "payment_proof"]} months={[thisMonth]} defaultMonth={thisMonth} filingId={f.id} compact />
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
