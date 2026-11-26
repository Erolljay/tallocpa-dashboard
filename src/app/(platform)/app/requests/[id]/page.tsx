import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { CloseRequestButton, ReplyForm } from "@/components/requests/reply-form";
import { Thread, type ThreadMessage } from "@/components/requests/thread";
import { AssignRequestForm } from "@/components/requests/assign-form";
import { TaskForm } from "@/components/tasks/task-form";
import { requireStaff } from "@/lib/auth";
import { manilaToday } from "@/lib/filings/run";
import { loadJobs } from "@/lib/tasks/jobs";
import { taskBadge, type Priority, type TaskStage, type TaskStatus } from "@/lib/tasks/labels";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import { supabaseServer } from "@/lib/supabase/server";

export default function RequestPage(props: PageProps<"/app/requests/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <RequestDetail params={props.params} />
    </Suspense>
  );
}

async function RequestDetail({ params }: Pick<PageProps<"/app/requests/[id]">, "params">) {
  const { id } = await params;
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data: r } = await supabase
    .from("client_requests")
    .select("id, client_id, direction, subject, status, priority, assigned_to, due_date, created_at, clients(name), registration_steps(label, case_id)")
    .eq("id", id)
    .maybeSingle();
  if (!r) notFound();
  const [{ data: messages }, { data: staff }, { data: onClient }, { data: tasks }, jobs] = await Promise.all([
    supabase.from("client_request_messages").select("id, from_firm, body, file_name, storage_path, created_at").eq("request_id", id).order("created_at"),
    supabase.from("staff_profiles").select("user_id, full_name, role").eq("active", true).order("full_name"),
    supabase.from("staff_assignments").select("user_id").eq("client_id", r.client_id),
    supabase.from("staff_tasks").select("id, title, status, stage, due_date, assigned_to").eq("request_id", id).order("created_at"),
    loadJobs(supabase),
  ]);
  // Who may answer for it or take a task on it: the Owner and staff on the client.
  const onIt = (staff ?? []).filter((s) => s.role === "owner" || (onClient ?? []).some((a) => a.user_id === s.user_id));
  const names = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  const today = manilaToday();
  const client = r.clients as unknown as { name: string } | null;
  const step = r.registration_steps as unknown as { label: string; case_id: string } | null;
  const view = statusFor("firm", r.direction as Direction, r.status as RequestStatus);
  const isOpen = r.status !== "closed";

  return (
    <>
      <PageHeader
        title={r.subject}
        description={<>{r.direction === "to_client" ? "Request to" : "Ticket from"} <Link href={`/app/clients/${r.client_id}`} className="hover:underline">{client?.name}</Link>{r.due_date ? ` · needed by ${r.due_date}` : ""}{r.assigned_to ? ` · ${names.get(r.assigned_to) ?? "staff"} answers for it` : ""}</>}
        actions={
          <div className="flex items-center gap-3">
            <Badge tone={view.tone}>{view.label}</Badge>
            {step && <LinkButton href={`/app/registrations/${step.case_id}`} variant="secondary">Routing slip</LinkButton>}
            {isOpen && <CloseRequestButton requestId={id} />}
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <Card title={step ? `For: ${step.label}` : "Messages"}>
          <Thread messages={(messages ?? []) as ThreadMessage[]} viewer="firm" />
          {isOpen && (
            <div className="mt-6 border-t border-separator-border pt-4">
              <ReplyForm requestId={id} placeholder="Write to the client…" />
            </div>
          )}
        </Card>
        <div className="flex flex-col gap-6 self-start">
          {isOpen && (
            <Card title="Owner and priority">
              <AssignRequestForm requestId={id} staff={onIt} assignee={r.assigned_to} priority={r.priority as Priority} />
            </Card>
          )}
          <Card title="Tasks">
            {(tasks ?? []).length > 0 && (
              <ul className="mb-4 divide-y divide-separator-border">
                {(tasks ?? []).map((t) => {
                  const due = taskBadge(t.status as TaskStatus, t.stage as TaskStage, t.due_date, today);
                  return (
                    <li key={t.id} className="flex items-start justify-between gap-3 py-2">
                      <span className="min-w-0">
                        <Link href={`/app/tasks/${t.id}`} className="text-body-regular text-text-primary hover:underline">{t.title}</Link>
                        <span className="block text-caption-1-regular text-text-tertiary">{names.get(t.assigned_to) ?? "staff"}</span>
                      </span>
                      <Badge tone={due.tone}>{due.label}</Badge>
                    </li>
                  );
                })}
              </ul>
            )}
            <details open={(tasks ?? []).length === 0}>
              <summary className="mb-3 cursor-pointer text-body-medium text-button-ghost-foreground hover:underline">Make a task (a job)</summary>
              <TaskForm staff={onIt} me={me.userId} jobs={jobs} requestId={id} fixedClient={{ id: r.client_id, name: client?.name ?? "" }} defaults={{ title: r.subject, priority: r.priority as Priority }} />
            </details>
          </Card>
        </div>
      </div>
    </>
  );
}
