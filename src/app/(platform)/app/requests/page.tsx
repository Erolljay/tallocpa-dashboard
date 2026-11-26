import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { statusFor, type Direction, type RequestStatus } from "@/lib/requests/labels";
import type { Priority } from "@/lib/tasks/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { daysBetween } from "@/lib/registration/steps";
import { manilaDate } from "@/lib/registration/slip";
import { NewRequestForm } from "./new-request-form";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";

export default function RequestsPage(props: PageProps<"/app/requests">) {
  return (
    <Suspense fallback={<><PageHeader title="Requests & tickets" /><Skeleton rows={6} /></>}>
      <Requests searchParams={props.searchParams} />
    </Suspense>
  );
}

interface Row {
  id: string;
  direction: Direction;
  subject: string;
  status: RequestStatus;
  priority: Priority;
  assigned_to: string | null;
  due_date: string | null;
  updated_at: string;
  created_at: string;
  clients: { name: string } | null;
  registration_steps: { label: string; case_id: string } | null;
}

/** The inbox's views: mine, what waits on us, what waits on the client, every open one, closed. */
const VIEWS = { mine: "Mine", us: "Waiting on us", client: "Waiting on client", open: "All open", closed: "Closed" } as const;
type View = keyof typeof VIEWS;

async function Requests({ searchParams }: Pick<PageProps<"/app/requests">, "searchParams">) {
  const me = await requireStaff();
  const { show } = await searchParams;
  // The Owner sees every open one first; staff see their own.
  const view: View = typeof show === "string" && Object.hasOwn(VIEWS, show) ? (show as View) : me.staff.role === "owner" ? "open" : "mine";
  const closed = view === "closed";
  const supabase = await supabaseServer();
  const query = supabase
    .from("client_requests")
    .select("id, direction, subject, status, priority, assigned_to, due_date, updated_at, created_at, clients(name), registration_steps(label, case_id)")
    .order("updated_at", { ascending: false })
    .limit(300);
  const [{ data, error }, { data: clients }, { data: staff }] = await Promise.all([
    closed ? query.eq("status", "closed") : view === "mine" ? query.neq("status", "closed").eq("assigned_to", me.userId) : query.neq("status", "closed"),
    supabase.from("clients").select("id, name").in("status", ["onboarding", "active"]).order("name"),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  if (error) throw error;
  const today = manilaDate(new Date());
  const names = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  const rank: Record<Priority, number> = { high: 0, normal: 1, low: 2 };
  const rows = ((data ?? []) as unknown as Row[])
    .map((r) => ({ ...r, view: statusFor("firm", r.direction, r.status) }))
    .filter((r) => (view === "us" ? r.view.actionNeeded : view === "client" ? !r.view.actionNeeded : true));
  // What needs us first, then high priority.
  rows.sort((a, b) => Number(b.view.actionNeeded) - Number(a.view.actionNeeded) || rank[a.priority] - rank[b.priority]);
  const pill = (on: boolean) => cx("rounded-full px-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring", on ? "bg-background-tertiary-default text-text-primary" : "text-text-secondary hover:bg-background-secondary-hover");

  return (
    <>
      <PageHeader title="Requests & tickets" description="What we asked clients for, and what clients asked us, each with the person who answers for it. Clients see and answer these in the portal." />
      <SectionTabs section="clients" active="requests" />
      <div className="mb-4 flex flex-wrap gap-1 text-body-medium">
        {(Object.keys(VIEWS) as View[]).map((v) => (
          <Link key={v} href={`/app/requests?show=${v}`} aria-current={v === view ? "page" : undefined} className={pill(v === view)}>{VIEWS[v]}</Link>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_24rem]">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
            <p className="text-body-medium text-text-primary">{closed ? "Nothing closed yet" : view === "mine" ? "Nothing assigned to you is open" : "Nothing open"}</p>
            <p className="mt-1 text-body-regular text-text-secondary">Requests sent from a registration step or from here, and clients&rsquo; tickets, show here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-separator-border self-start rounded-3xl border border-border-button-default bg-background-primary-default text-body-regular shadow-xs">
            {rows.map((r) => (
              <li key={r.id}>
                <Link href={`/app/requests/${r.id}`} className="flex items-start justify-between gap-4 px-4 py-3 outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring first:rounded-t-3xl last:rounded-b-3xl">
                  <span className="min-w-0">
                    <span className="block text-caption-1-semibold text-text-tertiary">{r.direction === "to_client" ? "Request" : "Ticket"} · {r.clients?.name}</span>
                    <span className="block text-body-medium text-text-primary">{r.subject}</span>
                    <span className="block text-caption-1-regular text-text-tertiary">
                      {r.registration_steps ? `For: ${r.registration_steps.label} · ` : ""}
                      {daysBetween(manilaDate(new Date(r.created_at)), today)} days since asked
                      {r.due_date ? ` · needed by ${r.due_date}` : ""}
                      {view !== "mine" && r.assigned_to ? ` · ${names.get(r.assigned_to) ?? "staff"}` : ""}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {r.priority === "high" && <Badge tone="blocked">High</Badge>}
                    <Badge tone={r.due_date && r.due_date < today && r.view.label === "Waiting on client" ? "blocked" : r.view.tone}>{r.view.label}</Badge>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Card title="Ask a client">
          <NewRequestForm clients={clients ?? []} />
        </Card>
      </div>
    </>
  );
}
