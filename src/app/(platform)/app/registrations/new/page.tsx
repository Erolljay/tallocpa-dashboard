import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { Branch } from "@/lib/branches";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { dtiRenewalDue } from "@/lib/registration/steps";
import { supabaseServer } from "@/lib/supabase/server";
import type { ClientCaseKind } from "../actions";
import { ClientCaseForm, NewRegistrationForm } from "../forms";
import { manilaDate } from "@/lib/registration/slip";

const clientCase: Record<ClientCaseKind, { title: string; description: string }> = {
  renewal: { title: "Annual renewal", description: "barangay, fire, sanitary and mayor's permits, and the year's SEC or DTI filings." },
  bir_update: { title: "BIR update (Form 1905)", description: "change of address or RDO, tax types, name or line of business, with the DTI/SEC and City Hall changes that go with it." },
  branch: { title: "New branch", description: "the branch's barangay clearance and mayor's permit, and BIR registration with a branch code, COR, books and invoices." },
  closure: { title: "Close the business", description: "barangay and City Hall retirement, BIR cancellation, DTI or SEC, and the employer numbers." },
};

/** /app/registrations/new — a new business; ?client=…&kind=renewal|bir_update|branch|closure — a case for an existing client. */
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

  if (typeof clientId === "string" && typeof kind === "string" && kind in clientCase) {
    const k = kind as ClientCaseKind;
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
        <PageHeader title={clientCase[k].title} description={`${client.name}: ${clientCase[k].description}`} />
        <ClientCaseForm clientId={client.id} taxpayerType={client.taxpayer_type as TaxpayerType} kind={k} year={year} dtiDue={dtiRenewalDue(dti?.done_on ?? null, year)} />
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
