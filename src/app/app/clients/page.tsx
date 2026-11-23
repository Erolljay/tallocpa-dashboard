import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Badge, LinkButton, PageHeader, Skeleton } from "@/components/ui";
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

  return (
    <>
      <PageHeader
        title="Clients"
        description={isOwner ? "Every client of the firm." : "Clients assigned to you."}
        actions={isOwner && <LinkButton href="/app/clients/new"><Plus aria-hidden className="size-4" />New client</LinkButton>}
      />
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
          <p className="font-medium text-ink-heading">No clients yet</p>
          <p className="mt-1 text-sm text-ink-muted">
            {isOwner ? "Add the first client from their COR, or wait for the Moxie import." : "The Owner has not assigned any clients to you."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="bg-surface-sunken text-left text-ink-strong">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Client</th>
                <th scope="col" className="px-4 py-3 font-medium">Type</th>
                <th scope="col" className="px-4 py-3 font-medium">TIN</th>
                <th scope="col" className="px-4 py-3 font-medium">Filing</th>
                <th scope="col" className="px-4 py-3 font-medium">Preparer</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <Link href={`/app/clients/${c.id}`} className="font-medium text-ink-heading hover:underline">{c.name}</Link>
                    <p className="text-xs tabular-nums text-ink-subtle">{c.code}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{taxpayerTypeLabel[c.taxpayer_type]}</td>
                  <td className="px-4 py-3 tabular-nums text-ink-muted">{c.tin ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-muted">{c.filing_channel === "efps" ? `eFPS · Group ${c.efps_group}` : "eBIRForms"}</td>
                  <td className="px-4 py-3 text-ink-muted">
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
