import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { TaskForm, TaskStatusButtons } from "@/components/tasks/task-form";
import { requireStaff } from "@/lib/auth";
import { showDate } from "@/lib/filings/labels";
import { manilaToday } from "@/lib/filings/run";
import { monthLabel } from "@/lib/remittances/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { loadJobs } from "@/lib/tasks/jobs";
import { PRIORITIES, sortTasks, taskBadge, type Priority, type TaskStage, type TaskStatus } from "@/lib/tasks/labels";
import { cx } from "@/utils/cx";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function TasksPage(props: PageProps<"/app/tasks">) {
  return (
    <Suspense fallback={<><PageHeader title="Tasks" /><Skeleton rows={8} /></>}>
      <Tasks searchParams={props.searchParams} />
    </Suspense>
  );
}

export interface TaskRow {
  id: string;
  title: string;
  status: TaskStatus;
  stage: TaskStage;
  reviewer_id: string | null;
  job_label: string | null;
  priority: Priority;
  due_date: string | null;
  period_month: string | null;
  client_id: string | null;
  request_id: string | null;
  assigned_to: string;
  created_by: string | null;
  created_at: string;
  clients: { name: string } | null;
}

const VIEWS = { mine: "Assigned to me", review: "To review", given: "I gave others", all: "Everyone's" } as const;
type View = keyof typeof VIEWS;

/**
 * Tasks (migration 20261216000001): the firm's own to-dos, beside the work the app
 * works out by itself on My work. Mine, the ones I gave others, or everyone's I can see.
 */
async function Tasks({ searchParams }: Pick<PageProps<"/app/tasks">, "searchParams">) {
  const me = await requireStaff();
  const sp = await searchParams;
  const view: View = sp.view === "given" || sp.view === "all" || sp.view === "review" ? sp.view : "mine";
  const done = sp.show === "done";
  const supabase = await supabaseServer();
  let q = supabase
    .from("staff_tasks")
    .select("id, title, status, stage, reviewer_id, job_label, priority, due_date, period_month, client_id, request_id, assigned_to, created_by, created_at, clients(name)")
    .order("due_date", { ascending: true, nullsFirst: false })
    .limit(300);
  q = done ? q.neq("status", "open") : q.eq("status", "open");
  if (view === "mine") q = q.eq("assigned_to", me.userId);
  if (view === "given") q = q.eq("created_by", me.userId).neq("assigned_to", me.userId);
  if (view === "review") q = done ? q.eq("reviewer_id", me.userId) : q.eq("reviewer_id", me.userId).eq("stage", "reviewer");
  const [{ data, error }, { data: staff }, { data: clients }, jobs, steps] = await Promise.all([
    q,
    supabase.from("staff_profiles").select("user_id, full_name").eq("active", true).order("full_name"),
    supabase.from("clients").select("id, name").in("status", ["onboarding", "active"]).order("name"),
    loadJobs(supabase),
    view === "mine" && !done ? registrationSteps(supabase, me.userId, me.staff.role === "owner") : Promise.resolve([]),
  ]);
  if (error) throw error;
  const today = manilaToday();
  const rows = sortTasks((data ?? []) as unknown as TaskRow[]);
  const names = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  const link = (v: View, d = done) => `/app/tasks?${new URLSearchParams({ ...(v !== "mine" ? { view: v } : {}), ...(d ? { show: "done" } : {}) })}`;
  const pill = (on: boolean) => cx("rounded-full px-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", on ? "bg-background-tertiary-default text-text-primary" : "text-text-secondary hover:bg-background-secondary-hover");

  return (
    <>
      <PageHeader title="Tasks" description="To-dos the team gives each other, for a client or for the firm. Returns, documents and payroll show on My work by themselves." />
      <SectionTabs section="home" active="tasks" />
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-medium">
        <div className="flex gap-1">
          {(Object.keys(VIEWS) as View[]).map((v) => (
            <Link key={v} href={link(v)} aria-current={v === view ? "page" : undefined} className={pill(v === view)}>{VIEWS[v]}</Link>
          ))}
        </div>
        <div className="flex gap-1">
          <Link href={link(view, false)} aria-current={!done ? "page" : undefined} className={pill(!done)}>Open</Link>
          <Link href={link(view, true)} aria-current={done ? "page" : undefined} className={pill(done)}>Done</Link>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_26rem]">
        {rows.length === 0 ? (
          <div className="self-start rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
            <p className="text-body-medium text-text-primary">{done ? "Nothing done yet" : "No open tasks"}</p>
            <p className="mt-1 text-body-regular text-text-secondary">Create one here, or from a client&rsquo;s ticket with &ldquo;Make a task&rdquo;.</p>
          </div>
        ) : (
          <ul className="divide-y divide-separator-border self-start rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
            {rows.map((t) => {
              const due = taskBadge(t.status, t.stage, t.due_date, today);
              return (
                <li key={t.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <Link href={`/app/tasks/${t.id}`} className="text-body-medium text-text-primary hover:underline">{t.title}</Link>
                    <p className="text-caption-1-regular text-text-tertiary">
                      {[
                        t.clients?.name,
                        t.job_label,
                        t.period_month && monthLabel(t.period_month),
                        view !== "mine" && `for ${names.get(t.assigned_to) ?? "someone"}`,
                        t.due_date && `due ${showDate(t.due_date)}`,
                        t.priority !== "normal" && `${PRIORITIES[t.priority]} priority`,
                      ].filter(Boolean).join(" · ") || "Firm task"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge tone={due.tone}>{due.label}</Badge>
                    {(t.status !== "open" || (t.stage === "preparer" && !t.reviewer_id)) && <TaskStatusButtons taskId={t.id} status={t.status} compact />}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Card title="New task">
          <TaskForm staff={staff ?? []} clients={clients ?? []} me={me.userId} jobs={jobs} />
        </Card>
      </div>
      {steps.length > 0 && (
        <section className="mt-8 flex flex-col gap-3" aria-labelledby="reg-steps">
          <h2 id="reg-steps" className="text-title-3-semibold text-text-primary">Registration steps</h2>
          <p className="text-body-regular text-text-secondary">Open steps of the registrations on your clients. The case is billed as one job when it is completed.</p>
          <ul className="divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
            {steps.map((st) => (
              <li key={st.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
                <span className="min-w-0">
                  <Link href={`/app/registrations/${st.case_id}`} className="text-body-medium text-text-primary hover:underline">{st.label}</Link>
                  <span className="block text-caption-1-regular text-text-tertiary">{st.client} · {STEP_STATUS[st.status] ?? st.status}{st.target_date ? ` · target ${showDate(st.target_date)}` : ""}</span>
                </span>
                <Badge tone={st.status === "waiting_client" ? "waiting" : st.status === "waiting_agency" ? "neutral" : "progress"}>{st.status === "waiting_client" ? "Client's task" : st.status === "waiting_agency" ? "At the agency" : "Our task"}</Badge>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

const STEP_STATUS: Record<string, string> = { pending: "Not started", in_progress: "In progress", waiting_client: "Waiting on the client", waiting_agency: "Waiting on the agency" };

/** Registration steps as tasks: the open steps of open cases on the person's clients (every client for the Owner). */
async function registrationSteps(supabase: Awaited<ReturnType<typeof supabaseServer>>, userId: string, owner: boolean) {
  let clientIds: string[] | null = null;
  if (!owner) {
    const { data } = await supabase.from("staff_assignments").select("client_id").eq("user_id", userId);
    clientIds = [...new Set((data ?? []).map((a) => a.client_id))];
    if (clientIds.length === 0) return [];
  }
  let q = supabase
    .from("registration_steps")
    .select("id, label, status, case_id, registration_cases!inner(client_id, status, target_date, clients(name))")
    .in("status", ["pending", "in_progress", "waiting_client", "waiting_agency"])
    .eq("registration_cases.status", "open")
    .order("sort_order")
    .limit(100);
  if (clientIds) q = q.in("registration_cases.client_id", clientIds);
  const { data } = await q;
  return ((data ?? []) as unknown as { id: string; label: string; status: string; case_id: string; registration_cases: { target_date: string | null; clients: { name: string } | null } }[])
    .map((s) => ({ id: s.id, label: s.label, status: s.status, case_id: s.case_id, target_date: s.registration_cases.target_date, client: s.registration_cases.clients?.name ?? "" }));
}
