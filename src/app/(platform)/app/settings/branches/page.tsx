import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
import { supabaseServer } from "@/lib/supabase/server";
import { AddBranchForm, BranchRowForm } from "./forms";

export default function BranchesPage() {
  return (
    <>
      <p className="mb-3 text-body-regular">
        <Link href="/app/settings" className="text-button-ghost-foreground hover:underline">Settings</Link>
      </p>
      <PageHeader
        title="Branches"
        description="Where clients are served from and where staff work. Each client and staff member belongs to one branch, so you see who works where when you assign a client. A closed branch keeps its history; nobody new can be put in it."
      />
      <Suspense fallback={<Skeleton rows={5} />}>
        <Branches />
      </Suspense>
    </>
  );
}

async function Branches() {
  await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: branches }, { data: staff }, { data: clients }] = await Promise.all([
    supabase.from("branches").select("id, code, name, address, active").order("active", { ascending: false }).order("name"),
    supabase.from("staff_profiles").select("branch_id").eq("active", true).neq("role", "owner"),
    supabase.from("clients").select("branch_id").in("status", ["onboarding", "active"]),
  ]);
  const count = (rows: { branch_id: string | null }[] | null, id: string) => (rows ?? []).filter((r) => r.branch_id === id).length;
  return (
    <div className="space-y-6">
      <Card title="Add a branch">
        <AddBranchForm />
      </Card>
      <Card title="Branches">
        <ul className="flex flex-col divide-y divide-separator-border">
          {((branches ?? []) as Branch[]).map((b) => (
            <li key={b.id} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
              <p className="flex flex-wrap items-center gap-2 text-body-medium text-text-primary">
                <span className="tabular-nums text-text-tertiary">{b.code}</span> {b.name}
                {!b.active && <Badge>Closed</Badge>}
                <span className="text-caption-1-regular text-text-tertiary">{count(staff, b.id)} staff · {count(clients, b.id)} clients</span>
              </p>
              <BranchRowForm branch={b} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
