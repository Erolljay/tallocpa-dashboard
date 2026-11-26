import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { loadMyWork } from "@/lib/work/load";
import { nextActions, URGENCY_LABELS, type Urgency, type WorkItem } from "@/lib/work/next-actions";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import { sortTasks, taskDue, type Priority, type TaskStatus } from "@/lib/tasks/labels";
import { cx } from "@/utils/cx";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function MyWorkPage(props: PageProps<"/app/work">) {
  return (
    <Suspense fallback={<><PageHeader title="My work" /><Skeleton rows={8} /></>}>
      <MyWork searchParams={props.searchParams} />
    </Suspense>
  );
}

const TONE: Record<Urgency, "blocked" | "waiting" | "progress" | "neutral"> = { overdue: "blocked", critical: "blocked", at_risk: "waiting", due: "progress", open: "neutral" };
const short = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

/**
 * My work (W3; recommendation 5): one next action per client and period for the person
 * signed in — returns at their next step, documents to review, entries to confirm,
 * payroll to post, depreciation to run, review notes, reviews to sign, adjustments to
 * tick. The Owner sees their approvals, or every client's work.
 */
async function MyWork({ searchParams }: Pick<PageProps<"/app/work">, "searchParams">) {
  const me = await requireStaff();
  const sp = await searchParams;
  const owner = me.staff.role === "owner";
  const everything = owner && sp.show === "all";
  const supabase = await supabaseServer();
  const { items, roles } = await loadMyWork(supabase, { userId: me.userId, role: me.staff.role }, manilaToday(), everything);
  const rows = nextActions(items, roles);
  const total = items.filter((i) => roles.includes(i.role)).length;
  const today = manilaToday();
  // Tasks given to me, and requests and tickets I answer for that wait on us.
  const [{ data: taskData }, { data: requestData }] = await Promise.all([
    supabase.from("staff_tasks").select("id, title, status, priority, due_date, created_at, clients(name)").eq("assigned_to", me.userId).eq("status", "open").limit(50),
    supabase.from("client_requests").select("id, direction, subject, status, due_date, clients(name)").eq("assigned_to", me.userId).neq("status", "closed").limit(100),
  ]);
  const tasks = sortTasks((taskData ?? []) as unknown as { id: string; title: string; status: TaskStatus; priority: Priority; due_date: string | null; created_at: string; clients: { name: string } | null }[]);
  const requests = ((requestData ?? []) as unknown as { id: string; direction: Direction; subject: string; status: RequestStatus; due_date: string | null; clients: { name: string } | null }[])
    .map((r) => ({ ...r, view: statusFor("firm", r.direction, r.status) }))
    .filter((r) => r.view.actionNeeded);

  return (
    <>
      <PageHeader
        title="My work"
        description={owner ? (everything ? "Every client's next actions." : "Returns waiting for your approval, and your own clients.") : "The next action on each of your clients, most urgent first."}
        actions={
          owner && (
            <div className="flex gap-1 rounded-xl bg-background-secondary-default p-1 text-body-medium">
              {([["", "Mine"], ["all", "All clients"]] as const).map(([v, label]) => (
                <Link key={v} href={v ? "/app/work?show=all" : "/app/work"} aria-current={(v === "all") === everything ? "page" : undefined}
                  className={cx("rounded-lg px-3 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", (v === "all") === everything ? "bg-background-primary-default text-text-primary shadow-xs" : "text-text-secondary hover:text-text-primary")}>
                  {label}
                </Link>
              ))}
            </div>
          )
        }
      />
      <SectionTabs section="home" active="work" />
      {(tasks.length > 0 || requests.length > 0) && (
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Card title={`My tasks${tasks.length ? ` · ${tasks.length}` : ""}`} actions={<Link href="/app/tasks" className="text-body-medium text-button-ghost-foreground hover:underline">All tasks</Link>}>
            {tasks.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No open tasks.</p>
            ) : (
              <ul className="divide-y divide-separator-border">
                {tasks.slice(0, 8).map((t) => {
                  const due = taskDue(t.status, t.due_date, today);
                  return (
                    <li key={t.id} className="flex items-start justify-between gap-3 py-2">
                      <span className="min-w-0">
                        <Link href={`/app/tasks/${t.id}`} className="text-body-regular text-text-primary hover:underline">{t.title}</Link>
                        <span className="block text-caption-1-regular text-text-tertiary">{[t.clients?.name, t.due_date && `by ${short(t.due_date)}`, t.priority === "high" && "High priority"].filter(Boolean).join(" · ") || "Firm task"}</span>
                      </span>
                      <Badge tone={due.tone}>{due.label}</Badge>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
          <Card title={`Requests waiting on me${requests.length ? ` · ${requests.length}` : ""}`} actions={<Link href="/app/requests?show=mine" className="text-body-medium text-button-ghost-foreground hover:underline">All requests</Link>}>
            {requests.length === 0 ? (
              <p className="text-body-regular text-text-secondary">No client is waiting on you.</p>
            ) : (
              <ul className="divide-y divide-separator-border">
                {requests.slice(0, 8).map((r) => (
                  <li key={r.id} className="flex items-start justify-between gap-3 py-2">
                    <span className="min-w-0">
                      <Link href={`/app/requests/${r.id}`} className="text-body-regular text-text-primary hover:underline">{r.subject}</Link>
                      <span className="block text-caption-1-regular text-text-tertiary">{r.direction === "to_client" ? "Request" : "Ticket"} · {r.clients?.name}</span>
                    </span>
                    <Badge tone={r.view.tone}>{r.view.label}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
      <Card title={rows.length ? `${rows.length} client-month${rows.length === 1 ? "" : "s"} · ${total} action${total === 1 ? "" : "s"}` : undefined}>
        {rows.length === 0 ? (
          <p className="text-body-regular text-text-secondary">Nothing waiting for you. New documents, returns at your step and review notes show up here.</p>
        ) : (
          <ul className="divide-y divide-separator-border">
            {rows.map((r) => (
              <li key={`${r.clientId}|${r.period}`} className="py-3">
                <div className="flex flex-wrap items-start gap-x-4 gap-y-1">
                  <div className="w-44 shrink-0">
                    <Link href={`/app/clients/${r.clientId}`} className="text-body-medium text-text-primary hover:underline">{r.clientName}</Link>
                    <p className="text-caption-1-regular text-text-tertiary">{showMonth(`${r.period}-01`)}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Action item={r.next} primary />
                    {r.more.length > 0 && (
                      <details className="mt-1">
                        <summary className="cursor-pointer text-caption-1-medium text-button-ghost-foreground hover:underline">{r.more.length} more</summary>
                        <ul className="mt-1 space-y-1 ps-3">
                          {r.more.map((m) => <li key={`${m.label}|${m.href}`}><Action item={m} /></li>)}
                        </ul>
                      </details>
                    )}
                  </div>
                  <Badge tone={TONE[r.next.urgency]}>{URGENCY_LABELS[r.next.urgency]}</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function Action({ item, primary = false }: { item: WorkItem; primary?: boolean }) {
  return (
    <p className={primary ? "text-body-regular" : "text-caption-1-regular"}>
      <Link href={item.href} className="text-button-ghost-foreground hover:underline">{item.label}</Link>
      {item.due && <span className="text-text-tertiary"> · by {short(item.due)}</span>}
      {item.role !== "preparer" && <span className="text-text-tertiary"> · as {item.role}</span>}
    </p>
  );
}
