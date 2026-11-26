import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { TaskForm, TaskStatusButtons } from "@/components/tasks/task-form";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { monthLabel } from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { PRIORITIES, taskDue, type Priority, type TaskStatus } from "@/lib/tasks/labels";

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
    .select("id, title, notes, status, priority, due_date, period_month, client_id, request_id, assigned_to, created_by, created_at, done_at, done_by, clients(name), client_requests(subject, direction)")
    .eq("id", id)
    .maybeSingle();
  if (!t) notFound();
  const [{ data: staff }, { data: onClient }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role").eq("active", true).order("full_name"),
    t.client_id ? supabase.from("staff_assignments").select("user_id").eq("client_id", t.client_id) : Promise.resolve({ data: null }),
  ]);
  const names = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  // Someone who works on the task's client (the Owner sees every client).
  const assignable = (staff ?? []).filter((s) => !t.client_id || s.role === "owner" || (onClient ?? []).some((a) => a.user_id === s.user_id));
  const client = t.clients as unknown as { name: string } | null;
  const request = t.client_requests as unknown as { subject: string; direction: string } | null;
  const status = t.status as TaskStatus;
  const due = taskDue(status, t.due_date, manilaToday());
  const canChange = me.staff.role === "owner" || t.assigned_to === me.userId || t.created_by === me.userId;

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
            {canChange && <TaskStatusButtons taskId={t.id} status={status} />}
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <Card title={status === "open" && canChange ? "Details" : undefined}>
          {status === "open" && canChange ? (
            <TaskForm
              staff={assignable}
              me={me.userId}
              defaults={{ id: t.id, title: t.title, notes: t.notes, assignee: t.assigned_to, due_date: t.due_date, priority: t.priority as Priority, client_id: t.client_id, period: t.period_month?.slice(0, 7) ?? null }}
            />
          ) : (
            <div className="flex flex-col gap-3 text-body-regular">
              <p className="whitespace-pre-wrap text-text-primary">{t.notes || <span className="text-text-tertiary">No notes.</span>}</p>
              {t.done_at && <p className="text-text-secondary">{status === "done" ? "Done" : "Cancelled"} by {names.get(t.done_by ?? "") ?? "someone"} on {showDate(t.done_at.slice(0, 10))}.</p>}
            </div>
          )}
        </Card>
        <Card title="About">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-body-regular">
            <dt className="text-text-secondary">Due</dt>
            <dd className="text-text-primary">{t.due_date ? showDate(t.due_date) : "No due date"}</dd>
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
