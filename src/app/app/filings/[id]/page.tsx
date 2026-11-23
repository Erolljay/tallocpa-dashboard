import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { filingStatusLabel, filingStatusTone, showDate } from "@/lib/filings/labels";
import { availableActions, SIGN_OFF_STEPS, stepIndex, type FilingStatus } from "@/lib/filings/sign-off";
import { supabaseServer } from "@/lib/supabase/server";
import { SignOffActions } from "../sign-off-actions";

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

  const [{ data: events }, { data: team }, { data: staff }, { data: clientUsers }] = await Promise.all([
    supabase.from("filing_events").select("id, from_status, to_status, action, actor, note, data, created_at").eq("filing_instance_id", id).order("created_at").order("id"),
    supabase.from("staff_assignments").select("user_id, role").eq("client_id", f.client_id),
    supabase.from("staff_profiles").select("user_id, full_name"),
    supabase.from("client_users").select("user_id, full_name").eq("client_id", f.client_id),
  ]);
  const nameOf = new Map([...(staff ?? []), ...(clientUsers ?? [])].map((p) => [p.user_id, p.full_name]));
  const history = (events ?? []) as Event[];
  const preparedBy = [...history].reverse().find((e) => e.action === "prepare")?.actor ?? null;
  const status = f.status as FilingStatus;
  const done = stepIndex(status);

  const actions = availableActions(
    { status, openQuery: f.open_query, preparedBy },
    {
      userId: me.userId,
      role: me.staff.role,
      assignedAs: (team ?? []).filter((t) => t.user_id === me.userId).map((t) => t.role as "preparer" | "reviewer"),
    },
  );

  return (
    <>
      <PageHeader
        title={`${f.form} · ${f.period_label}`}
        description={
          <span>
            <Link href={`/app/clients/${client.id}`} className="text-link hover:underline">{client.name}</Link> · due {showDate(f.due_date)}
            {f.due_date !== f.statutory_due_date ? ` (moved from ${showDate(f.statutory_due_date)})` : ""}
          </span>
        }
        actions={<Badge tone={filingStatusTone[status]}>{filingStatusLabel[status]}</Badge>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Card title="Sign-off">
            <ol className="grid gap-2 sm:grid-cols-7">
              {SIGN_OFF_STEPS.map((s, i) => {
                const state = i < done ? "done" : i === done ? "current" : "todo";
                return (
                  <li key={s.status} className={`rounded-lg border px-3 py-2 text-xs ${state === "done" ? "border-success bg-success-surface text-success" : state === "current" ? "border-action bg-surface-tint text-ink-heading" : "border-border text-ink-subtle"}`}>
                    <p className="font-medium">{s.label}</p>
                    <p>{s.by}</p>
                  </li>
                );
              })}
            </ol>
            {f.open_query && (
              <div className="mt-4"><Notice tone="waiting">Client asked: “{f.open_query}”</Notice></div>
            )}
            <div className="mt-4">
              {actions.length > 0 ? (
                <SignOffActions filingId={f.id} actions={actions} taxDue={f.tax_due == null ? null : Number(f.tax_due)} paymentMode={client.payment_mode} />
              ) : (
                <p className="text-sm text-ink-muted">{status === "proof_uploaded" ? "This return is done." : "Nothing for you to do on this return right now."}</p>
              )}
            </div>
          </Card>

          <Card title="History">
            {history.length === 0 ? (
              <p className="text-sm text-ink-muted">No steps taken yet.</p>
            ) : (
              <ol className="space-y-3 text-sm">
                {history.map((e) => (
                  <li key={e.id} className="border-l-2 border-border pl-3">
                    <p className="text-ink-heading">
                      <span className="font-medium">{(e.actor && nameOf.get(e.actor)) ?? "Someone"}</span> {eventText[e.action ?? ""] ?? `moved it to ${filingStatusLabel[e.to_status] ?? e.to_status}`}
                      {e.action === "owner_approve" && typeof e.data.payment_status === "string" ? ` · payment: ${paymentText[e.data.payment_status] ?? e.data.payment_status}${e.data.approve_unpaid ? " (approved unpaid)" : ""}` : ""}
                    </p>
                    {e.note && <p className="text-ink-muted">“{e.note}”</p>}
                    <p className="text-xs text-ink-subtle">{when(e.created_at)}</p>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        </div>

        <Card title="Return">
          <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-2 text-sm">
            <dt className="text-ink-subtle">Period</dt><dd className="tabular-nums text-ink-heading">{showDate(f.period_start)} – {showDate(f.period_end)}</dd>
            <dt className="text-ink-subtle">Tax due</dt><dd className="amount tabular-nums text-ink-heading">{f.tax_due == null ? "—" : peso.format(Number(f.tax_due))}</dd>
            <dt className="text-ink-subtle">BIR payment</dt><dd className="text-ink-heading">{client.payment_mode === "firm_remits" ? "We remit" : "Client pays directly"}</dd>
            <dt className="text-ink-subtle">Filing ref.</dt><dd className="text-ink-heading">{f.filing_reference ?? "—"}{f.filed_on ? ` · ${showDate(f.filed_on)}` : ""}</dd>
            <dt className="text-ink-subtle">Payment ref.</dt><dd className="text-ink-heading">{f.payment_reference ?? "—"}{f.paid_on ? ` · ${showDate(f.paid_on)}` : ""}</dd>
          </dl>
          <p className="mt-4 text-xs text-ink-subtle">Uploading the filed return and proof of payment comes with the document upload feature.</p>
        </Card>
      </div>
    </>
  );
}
