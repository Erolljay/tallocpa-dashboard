import { Suspense } from "react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
import { supabaseServer } from "@/lib/supabase/server";
import { createClientAction } from "../actions";
import { ClientForm } from "../client-form";

export default function NewClientPage() {
  return (
    <>
      <PageHeader title="New client" description="Enter the details from the client's Certificate of Registration (BIR Form 2303)." />
      <Suspense fallback={<Skeleton rows={8} />}>
        <OwnerOnly />
      </Suspense>
    </>
  );
}

async function OwnerOnly() {
  await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: staff }, { data: branches }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role, branch_id").eq("active", true).order("full_name"),
    supabase.from("branches").select("id, code, name, address, active").order("name"),
  ]);
  return <ClientForm mode="new" action={createClientAction} staff={staff ?? []} branches={(branches ?? []) as Branch[]} />;
}
