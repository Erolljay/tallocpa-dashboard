import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { dtiRenewalDue } from "@/lib/registration/steps";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientCaseForm, NewRegistrationForm } from "../forms";
import { manilaDate } from "../slip";

/** /app/registrations/new — a new business; ?client=…&kind=renewal|closure — a renewal or closure for a client. */
export default function NewRegistrationPage(props: PageProps<"/app/registrations/new">) {
  return (
    <Suspense fallback={<><PageHeader title="New registration" /><Skeleton rows={8} /></>}>
      <OwnerOnly searchParams={props.searchParams} />
    </Suspense>
  );
}

async function OwnerOnly({ searchParams }: Pick<PageProps<"/app/registrations/new">, "searchParams">) {
  await requireOwner();
  const { client: clientId, kind } = await searchParams;
  const supabase = await supabaseServer();

  if (typeof clientId === "string" && (kind === "renewal" || kind === "closure")) {
    const { data: client } = await supabase.from("clients").select("id, name, taxpayer_type").eq("id", clientId).maybeSingle();
    if (!client) notFound();
    const today = manilaDate(new Date());
    // From October on, the renewal being prepared is next year's.
    const year = Number(today.slice(0, 4)) + (Number(today.slice(5, 7)) >= 10 ? 1 : 0);
    const { data: dti } = await supabase
      .from("registration_steps")
      .select("done_on, registration_cases!inner(client_id, kind)")
      .eq("registration_cases.client_id", clientId)
      .eq("registration_cases.kind", "new_business")
      .eq("code", "dti_business_name")
      .eq("status", "done")
      .maybeSingle();
    return (
      <>
        <PageHeader
          title={kind === "renewal" ? "Annual renewal" : "Close the business"}
          description={kind === "renewal" ? `${client.name}: barangay, fire, sanitary and mayor's permits, and the year's SEC or DTI filings.` : `${client.name}: barangay and City Hall retirement, BIR cancellation, DTI or SEC, and the employer numbers.`}
        />
        <ClientCaseForm clientId={client.id} taxpayerType={client.taxpayer_type as TaxpayerType} kind={kind} year={year} dtiDue={dtiRenewalDue(dti?.done_on ?? null, year)} />
      </>
    );
  }

  const [{ data: staff }, { data: branches }] = await Promise.all([
    supabase.from("staff_profiles").select("user_id, full_name, role, branch_id").eq("active", true).order("full_name"),
    supabase.from("branches").select("id, code, name, address, active").order("name"),
  ]);
  return (
    <>
      <PageHeader title="New registration" description="Register a new business: DTI or SEC, barangay, City Hall, BIR, and SSS, PhilHealth and Pag-IBIG." />
      <NewRegistrationForm staff={staff ?? []} branches={(branches ?? []) as Branch[]} />
    </>
  );
}
