import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, PageHeader, peso, Skeleton } from "@/components/ui";
import { TaskForm, TaskStatusButtons, TaskWorkflow } from "@/components/tasks/task-form";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { monthLabel } from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { loadJobs } from "@/lib/tasks/jobs";
import { PRIORITIES, taskBadge, type Priority, type TaskStage, type TaskStatus } from "@/lib/tasks/labels";

export default function TaskPage(props: PageProps<"/app/tasks/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <TaskDetail params={props.params} />
    </Suspense>
  );
}

async function TaskDetail({ params }: Pick<PageProps<"/app/tasks/[id]">, "params">) {
  const { id } = await params;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: t } = await supabase
    .from("staff_tasks")
    .select("id, title, notes, status, stage, reviewer_id, job_code, job_label, job_price, due_id, return_note, priority, due_date, period_month, client_id, request_id, assigned_to, created_by, created_at, done_at, done_by, clients(name), client_requests(subject, direction)")
    .eq("id", id)
    .maybeSingle();
  if (!t) notFound();
  const [{ data: staff }, { data: onClient }, jobs, { data: charge }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role").eq("active", true).order("full_name"),
    t.client_id ? supabase.from("staff_assignments").select("user_id").eq("client_id", t.client_id) : Promise.resolve({ data: null }),
    loadJobs(supabase),
    t.due_id ? supabase.from("client_dues").select("soa_id, waived_at").eq("id", t.due_id).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const names = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  // Someone who works on the task's client (the Owner sees every client).
  const assignable = (staff ?? []).filter((s) => !t.client_id || s.role === "owner" || (onClient ?? []).some((a) => a.user_id === s.user_id));
  const client = t.clients as unknown as { name: string } | null;
  const request = t.client_requests as unknown as { subject: string; direction: string } | null;
  const status = t.status as TaskStatus;
  const stage = t.stage as TaskStage;
  const due = taskBadge(status, stage, t.due_date, manilaToday());
  const owner = me.staff.role === "owner";
  const canChange = owner || t.assigned_to === me.userId || t.created_by === me.userId || t.reviewer_id === me.userId;
  const billing = !t.job_label ? null
    : t.due_id ? (charge?.waived_at ? "Waived" : charge?.soa_id ? "Billed on a statement" : "Waiting in Ready to bill")
    : status === "done" ? "Not billed (no price)" : "Billed when done";

  return (
    <>
      <PageHeader
        title={t.title}
        description={
          <>
            {client ? <Link href={`/app/clients/${t.client_id}`} className="hover:underline">{client.name}</Link> : "Firm task"}
            {t.period_month ? ` · ${monthLabel(t.period_month)}` : ""}
            {` · for ${names.get(t.assigned_to) ?? "someone"}`}
            {t.created_by ? ` · from ${names.get(t.created_by) ?? "someone"}` : ""}
          </>
        }
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={due.tone}>{due.label}</Badge>
            {canChange && (status !== "open" || (stage === "preparer" && !t.reviewer_id)) && <TaskStatusButtons taskId={t.id} status={status} />}
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-6">
        {status === "open" && (
          <Card title="Workflow">
            <TaskWorkflow
              taskId={t.id}
              stage={stage}
              canPrepare={owner || t.assigned_to === me.userId}
              canReview={owner || t.reviewer_id === me.userId}
              hasReviewer={Boolean(t.reviewer_id)}
              hasClient={Boolean(t.client_id)}
              returnNote={t.return_note}
            />
          </Card>
        )}
        <Card title={status === "open" && canChange ? "Details" : undefined}>
          {status === "open" && canChange ? (
            <TaskForm
              staff={assignable}
              me={me.userId}
              jobs={jobs}
              defaults={{ id: t.id, title: t.title, notes: t.notes, assignee: t.assigned_to, due_date: t.due_date, priority: t.priority as Priority, client_id: t.client_id, period: t.period_month?.slice(0, 7) ?? null, reviewer: t.reviewer_id, job_code: t.job_code, job_price: t.job_price == null ? null : Number(t.job_price) }}
            />
          ) : (
            <div className="flex flex-col gap-3 text-body-regular">
              <p className="whitespace-pre-wrap text-text-primary">{t.notes || <span className="text-text-tertiary">No notes.</span>}</p>
              {t.done_at && <p className="text-text-secondary">{status === "done" ? "Done" : "Cancelled"} by {names.get(t.done_by ?? "") ?? "someone"} on {showDate(t.done_at.slice(0, 10))}.</p>}
            </div>
          )}
        </Card>
        </div>
        <Card title="About">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-body-regular">
            <dt className="text-text-secondary">Due</dt>
            <dd className="text-text-primary">{t.due_date ? showDate(t.due_date) : "No due date"}</dd>
            <dt className="text-text-secondary">Reviewer</dt>
            <dd className="text-text-primary">{t.reviewer_id ? names.get(t.reviewer_id) ?? "someone" : "No review"}</dd>
            {t.job_label && (
              <>
                <dt className="text-text-secondary">Job</dt>
                <dd className="text-text-primary">{t.job_label}{t.job_price != null ? ` · ${peso.format(Number(t.job_price))}` : " · no price yet"}</dd>
                <dt className="text-text-secondary">Billing</dt>
                <dd className="text-text-primary">{t.client_id && t.due_id ? <Link href={`/app/collections/${t.client_id}`} className="hover:underline">{billing}</Link> : billing}</dd>
              </>
            )}
            <dt className="text-text-secondary">Priority</dt>
            <dd className="text-text-primary">{PRIORITIES[t.priority as Priority]}</dd>
            <dt className="text-text-secondary">Created</dt>
            <dd className="text-text-primary">{showDate(t.created_at.slice(0, 10))}</dd>
            {request && (
              <>
                <dt className="text-text-secondary">From</dt>
                <dd><Link href={`/app/requests/${t.request_id}`} className="text-text-primary hover:underline">{request.direction === "from_client" ? "Ticket" : "Request"}: {request.subject}</Link></dd>
              </>
            )}
          </dl>
        </Card>
      </div>
    </>
  );
}
