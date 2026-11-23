import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { TaxType } from "@/lib/clients/obligations";
import { supabaseServer } from "@/lib/supabase/server";
import { updateClientAction } from "../../actions";
import { ClientForm, type ClientValues } from "../../client-form";

export default function EditClientPage(props: PageProps<"/app/clients/[id]/edit">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <EditClient params={props.params} />
    </Suspense>
  );
}

async function EditClient({ params }: { params: PageProps<"/app/clients/[id]/edit">["params"] }) {
  const { id } = await params;
  await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: client }, { data: registration }, { data: open }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).maybeSingle(),
    supabase.from("client_registrations").select("tax_types").eq("client_id", id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("obligations").select("form").eq("client_id", id).is("end_date", null),
  ]);
  if (!client) notFound();

  const values: ClientValues = {
    name: client.name,
    taxpayer_type: client.taxpayer_type,
    tin: client.tin,
    rdo_code: client.rdo_code,
    registered_address: client.registered_address,
    fiscal_year_end_month: client.fiscal_year_end_month,
    filing_channel: client.filing_channel,
    efps_group: client.efps_group,
    book_type: client.book_type,
    payment_mode: client.payment_mode,
    submission_cutoff_day: client.submission_cutoff_day,
    tax_types: (registration?.tax_types ?? []) as TaxType[],
    open_forms: (open ?? []).map((o) => o.form),
  };

  return (
    <>
      <PageHeader title={`Edit ${client.name}`} description={<span className="tabular-nums">{client.code}</span>} />
      <ClientForm mode="edit" action={updateClientAction.bind(null, id)} client={values} />
    </>
  );
}
