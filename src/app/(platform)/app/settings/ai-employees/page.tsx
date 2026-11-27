import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { BOOKS_LEVELS, DEPARTMENT_ORDER, DEPARTMENTS, RUNS_ON, STANDARD_WORKFORCE, type BooksLevel, type Department, type RunsOn } from "@/lib/ai/workforce";
import { supabaseServer } from "@/lib/supabase/server";
import { ActivityList, type ActivityRow } from "./activity";
import { AddWorkforceButton, EnabledSwitch } from "./forms";

export default function AiEmployeesPage() {
  return (
    <>
      <p className="mb-3 text-body-regular">
        <Link href="/app/settings" className="text-button-ghost-foreground hover:underline">Settings</Link>
      </p>
      <PageHeader
        title="AI employees"
        description="AI employees prepare work; people review, approve and sign. They cannot sign off, post, lock, release or file anything: the database refuses them. Each starts switched off and reads only the clients you assign, and the books only at Full access."
      />
      <Suspense fallback={<Skeleton rows={12} />}>
        <Workforce />
      </Suspense>
    </>
  );
}

interface Row {
  user_id: string;
  key: string;
  name: string;
  department: Department;
  job: string;
  runs_on: RunsOn;
  enabled: boolean;
  books_level: BooksLevel;
  all_clients: boolean;
  client_data: boolean;
  supervisor_user_id: string | null;
  ai_assignments: { count: number }[];
}

async function Workforce() {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: rows, error }, { data: staff }, { data: activity }] = await Promise.all([
    supabase
      .from("ai_employees")
      .select("user_id, key, name, department, job, runs_on, enabled, books_level, all_clients, client_data, supervisor_user_id, ai_assignments(count)")
      .eq("brand_id", owner.staff.brandId)
      .order("name"),
    supabase.from("staff_profiles").select("user_id, full_name"),
    supabase.from("ai_activity").select("id, ai_user_id, tool, outcome, created_at, clients(name)").order("created_at", { ascending: false }).limit(25),
  ]);
  if (error) return <Notice tone="blocked">Could not load AI employees: {error.message}</Notice>;
  const list = (rows ?? []) as unknown as Row[];
  const staffName = new Map((staff ?? []).map((s) => [s.user_id, s.full_name]));
  const aiName = new Map(list.map((r) => [r.user_id, r.name]));
  const have = new Set(list.map((r) => r.key));
  const missing = STANDARD_WORKFORCE.filter((e) => !have.has(e.key)).length;
  const on = list.filter((r) => r.enabled).length;

  return (
    <div className="flex flex-col gap-6">
      {missing > 0 && (
        <Card title={list.length ? "Missing from the standard workforce" : "Set up the workforce"}>
          <div className="flex flex-col gap-4">
            <p className="text-body-regular text-text-secondary">
              {list.length
                ? `${missing} of the ${STANDARD_WORKFORCE.length} standard AI employees are not here yet.`
                : `Adds the ${STANDARD_WORKFORCE.length} AI employees of the design note in 6 departments, with the books access the note proposes. They start switched off and do nothing until you switch them on, assign clients and create a key.`}
            </p>
            <AddWorkforceButton missing={missing} />
          </div>
        </Card>
      )}

      {list.length > 0 && (
        <p className="text-body-regular text-text-secondary">
          <span className="tabular-nums">{on}</span> of <span className="tabular-nums">{list.length}</span> switched on.
        </p>
      )}

      {DEPARTMENT_ORDER.map((d) => {
        const members = list.filter((r) => r.department === d);
        if (members.length === 0) return null;
        return (
          <Card key={d} title={DEPARTMENTS[d]}>
            <ul className="flex flex-col divide-y divide-separator-border">
              {members.map((r) => {
                const clients = r.ai_assignments[0]?.count ?? 0;
                return (
                  <li key={r.user_id} className="flex flex-wrap items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1 basis-72">
                      <p className="flex flex-wrap items-center gap-2 text-body-medium text-text-primary">
                        <Link href={`/app/settings/ai-employees/${r.key}`} className="hover:underline">{r.name}</Link>
                        <Badge tone={r.enabled ? "done" : "neutral"}>{r.enabled ? "On" : "Off"}</Badge>
                      </p>
                      <p className="text-caption-1-regular text-text-tertiary">
                        {RUNS_ON[r.runs_on]} · reports to {r.supervisor_user_id ? staffName.get(r.supervisor_user_id) ?? "—" : "the Owner"} ·{" "}
                        {r.client_data ? (
                          <>
                            books {BOOKS_LEVELS[r.books_level].label} · {r.all_clients ? "every client" : `${clients} client${clients === 1 ? "" : "s"}`}
                          </>
                        ) : (
                          "no client data"
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/app/settings/ai-employees/${r.key}`} className="text-body-regular text-button-ghost-foreground hover:underline">Open</Link>
                      <EnabledSwitch userId={r.user_id} aiKey={r.key} enabled={r.enabled} name={r.name} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        );
      })}

      {list.length > 0 && (
        <Card title="Recent activity">
          <ActivityList rows={(activity ?? []) as unknown as ActivityRow[]} nameOf={aiName} />
        </Card>
      )}
    </div>
  );
}
