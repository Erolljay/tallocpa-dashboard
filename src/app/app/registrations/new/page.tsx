import { Suspense } from "react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
import { supabaseServer } from "@/lib/supabase/server";
import { NewRegistrationForm } from "../forms";

export default function NewRegistrationPage() {
  return (
    <>
      <PageHeader title="New registration" description="Register a new business: DTI or SEC, barangay, City Hall, BIR, and SSS, PhilHealth and Pag-IBIG." />
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
  return <NewRegistrationForm staff={staff ?? []} branches={(branches ?? []) as Branch[]} />;
}
