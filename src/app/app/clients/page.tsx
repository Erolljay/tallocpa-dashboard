import Link from "next/link";
import { Suspense } from "react";
import { RiAddLine } from "@remixicon/react";
import { Badge, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { manilaToday } from "@/lib/filings/run";
import { chartStart } from "@/lib/ledger/types";
import { SetupCharts } from "./setup-charts";
import { requireStaff } from "@/lib/auth";
import { statusLabel, statusTone, taxpayerTypeLabel } from "@/lib/clients/labels";
import { supabaseServer } from "@/lib/supabase/server";

export default function ClientsPage() {
  return (
    <Suspense fallback={<><PageHeader title="Clients" /><Skeleton rows={6} /></>}>
      <ClientList />
    </Suspense>
  );
}

interface Row {
  id: string;
  code: string;
  name: string;
  taxpayer_type: string;
  tin: string | null;
  filing_channel: string;
  efps_group: string | null;
  status: keyof typeof statusTone;
  staff_assignments: { role: string; staff_profiles: { full_name: string } | null }[];
}

async function ClientList() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("clients")
    .select("id, code, name, taxpayer_type, tin, filing_channel, efps_group, status, staff_assignments(role, staff_profiles(full_name))")
    .order("name");
  if (error) throw error;
  const rows = (data ?? []) as unknown as Row[];
  const isOwner = me.staff.role === "owner";
  // Clients without account titles (decision 2), for the Owner.
  const { data: books } = isOwner ? await supabase.from("client_books").select("client_id") : { data: null };
  const charted = new Set((books ?? []).map((b) => b.client_id));
  const noChart = isOwner ? rows.filter((r) => r.status !== "archived" && !charted.has(r.id)).map((r) => r.name) : [];
  const today = manilaToday();

  return (
    <>
      <PageHeader
        title="Clients"
        description={isOwner ? "Every client of the firm." : "Clients assigned to you."}
        actions={isOwner && <LinkButton href="/app/clients/new"><RiAddLine aria-hidden className="size-4" />New client</LinkButton>}
      />
      {noChart.length > 0 && <SetupCharts missing={noChart} defaultMonth={chartStart(today).slice(0, 7)} />}
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
          <p className="font-medium text-text-primary">No clients yet</p>
          <p className="mt-1 text-body-regular text-text-secondary">
            {isOwner ? "Add the first client from their COR." : "The Owner has not assigned any clients to you."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
          <table className="w-full min-w-[44rem] text-body-regular">
            <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="text-start px-4 py-3">Client</th>
                <th scope="col" className="text-start px-4 py-3">Type</th>
                <th scope="col" className="text-start px-4 py-3">TIN</th>
                <th scope="col" className="text-start px-4 py-3">Filing</th>
                <th scope="col" className="text-start px-4 py-3">Preparer</th>
                <th scope="col" className="text-start px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-separator-border transition-colors first:border-t-0 hover:bg-background-secondary-hover">
                  <td className="px-4 py-3">
                    <Link href={`/app/clients/${c.id}`} className="font-medium text-text-primary hover:underline">{c.name}</Link>
                    <p className="text-caption-1-regular tabular-nums text-text-tertiary">{c.code}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{taxpayerTypeLabel[c.taxpayer_type]}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-text-secondary">{c.tin ?? "—"}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.filing_channel === "efps" ? `eFPS · Group ${c.efps_group}` : "eBIRForms"}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {c.staff_assignments.filter((a) => a.role === "preparer").map((a) => a.staff_profiles?.full_name).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3"><Badge tone={statusTone[c.status]}>{statusLabel[c.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
