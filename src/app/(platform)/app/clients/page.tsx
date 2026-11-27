import Link from "next/link";
import { Suspense } from "react";
import { RiAddLine } from "@remixicon/react";
import { Badge, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { BOOKS_GO_LIVE } from "@/lib/ledger/types";
import { SetupCharts } from "./setup-charts";
import { requireStaff } from "@/lib/auth";
import { statusLabel, statusTone, taxpayerTypeLabel } from "@/lib/clients/labels";
import { supabaseServer } from "@/lib/supabase/server";
import { SectionTabs } from "@/app/(platform)/app/nav/section-tabs";
import { ListToolbar } from "@/components/application/search/list-search";
import { byText, matchesSearch, pickParam, searchParam } from "@/lib/search/match";

export default function ClientsPage(props: PageProps<"/app/clients">) {
  return (
    <Suspense fallback={<><PageHeader title="Clients" /><Skeleton rows={6} /></>}>
      <ClientList searchParams={props.searchParams} />
    </Suspense>
  );
}

const SORTS = [
  { value: "name", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
  { value: "code", label: "Client code" },
  { value: "type", label: "Type" },
  { value: "status", label: "Status" },
  { value: "preparer", label: "Preparer" },
];

interface Row {
  id: string;
  code: string;
  name: string;
  taxpayer_type: string;
  tin: string | null;
  filing_channel: string;
  efps_group: string | null;
  status: keyof typeof statusTone;
  catch_up_through: string | null;
  staff_assignments: { role: string; staff_profiles: { full_name: string } | null }[];
}

async function ClientList({ searchParams }: Pick<PageProps<"/app/clients">, "searchParams">) {
  const me = await requireStaff();
  const sp = await searchParams;
  const search = searchParam(sp.q);
  const status = pickParam(sp.status, Object.keys(statusLabel));
  const type = pickParam(sp.type, Object.keys(taxpayerTypeLabel));
  const filing = pickParam(sp.filing, ["efps", "ebirforms"] as const);
  const preparer = searchParam(sp.preparer);
  const sort = pickParam(sp.sort, SORTS.map((s) => s.value));
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("clients")
    .select("id, code, name, taxpayer_type, tin, filing_channel, efps_group, status, catch_up_through, staff_assignments(role, staff_profiles(full_name))")
    .order("name");
  if (error) throw error;
  const rows = (data ?? []) as unknown as Row[];
  const isOwner = me.staff.role === "owner";
  // Clients without account titles (decision 2), for the Owner.
  const { data: books } = isOwner ? await supabase.from("client_books").select("client_id") : { data: null };
  const charted = new Set((books ?? []).map((b) => b.client_id));
  const preparers = (c: Row) => c.staff_assignments.filter((a) => a.role === "preparer").map((a) => a.staff_profiles?.full_name).join(", ");
  const preparerNames = [...new Set(rows.flatMap((c) => c.staff_assignments.filter((a) => a.role === "preparer").map((a) => a.staff_profiles?.full_name ?? "")))].filter(Boolean).sort(byText);
  const statusRank = { active: 0, onboarding: 1, inactive: 2, archived: 3 } as const;
  const shown = rows
    .filter((c) => matchesSearch(search, [c.name, c.code, c.tin, preparers(c), taxpayerTypeLabel[c.taxpayer_type], statusLabel[c.status]]))
    .filter((c) => !status || c.status === status)
    .filter((c) => !type || c.taxpayer_type === type)
    .filter((c) => !filing || (filing === "efps" ? c.filing_channel === "efps" : c.filing_channel !== "efps"))
    .filter((c) => !preparer || (preparer === "none" ? !preparers(c) : c.staff_assignments.some((a) => a.role === "preparer" && a.staff_profiles?.full_name === preparer)))
    .sort((a, b) => {
      switch (sort) {
        case "name_desc": return byText(b.name, a.name);
        case "code": return byText(a.code, b.code);
        case "type": return byText(taxpayerTypeLabel[a.taxpayer_type], taxpayerTypeLabel[b.taxpayer_type]) || byText(a.name, b.name);
        case "status": return statusRank[a.status] - statusRank[b.status] || byText(a.name, b.name);
        case "preparer": return byText(preparers(a), preparers(b)) || byText(a.name, b.name);
        default: return byText(a.name, b.name);
      }
    });
  const noChart = isOwner ? rows.filter((r) => r.status !== "archived" && !charted.has(r.id)).map((r) => r.name) : [];

  return (
    <>
      <PageHeader
        title="Clients"
        description={isOwner ? "Every client of the firm." : "Clients assigned to you."}
        actions={isOwner && <LinkButton href="/app/clients/new"><RiAddLine aria-hidden className="size-4" />New client</LinkButton>}
      />
      <SectionTabs section="clients" active="clients" />
      {noChart.length > 0 && <SetupCharts missing={noChart} defaultMonth={BOOKS_GO_LIVE.slice(0, 7)} />}
      {rows.length > 0 && (
        <ListToolbar
          label="Search clients"
          placeholder="Search name, code, TIN or preparer"
          filters={[
            { param: "status", label: "Status", anyLabel: "Any status", options: Object.entries(statusLabel).map(([value, label]) => ({ value, label })) },
            { param: "type", label: "Taxpayer type", anyLabel: "Any type", options: Object.entries(taxpayerTypeLabel).map(([value, label]) => ({ value, label })) },
            { param: "filing", label: "Filing channel", anyLabel: "Any filing", options: [{ value: "efps", label: "eFPS" }, { value: "ebirforms", label: "eBIRForms" }] },
            ...(preparerNames.length > 1 || isOwner
              ? [{ param: "preparer", label: "Preparer", anyLabel: "Any preparer", options: [...preparerNames.map((n) => ({ value: n, label: n })), { value: "none", label: "No preparer" }] }]
              : []),
          ]}
          sorts={SORTS}
        />
      )}
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
          <p className="font-medium text-text-primary">No clients yet</p>
          <p className="mt-1 text-body-regular text-text-secondary">
            {isOwner ? "Add the first client from their COR." : "The Owner has not assigned any clients to you."}
          </p>
        </div>
      ) : shown.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-10 text-center">
          <p className="text-body-medium text-text-primary">No client matches</p>
          <p className="mt-1 text-body-regular text-text-secondary">Try another name, client code, TIN or preparer, or clear the filters.</p>
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
              {shown.map((c) => (
                <tr key={c.id} className="border-t border-separator-border transition-colors first:border-t-0 hover:bg-background-secondary-hover">
                  <td className="px-4 py-3">
                    <Link href={`/app/clients/${c.id}`} className="font-medium text-text-primary hover:underline">{c.name}</Link>
                    <p className="text-caption-1-regular tabular-nums text-text-tertiary">{c.code}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{taxpayerTypeLabel[c.taxpayer_type]}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-text-secondary">{c.tin ?? "—"}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.filing_channel === "efps" ? `eFPS · Group ${c.efps_group}` : "eBIRForms"}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {preparers(c) || "—"}
                  </td>
                  <td className="px-4 py-3"><span className="flex flex-wrap gap-1"><Badge tone={statusTone[c.status]}>{statusLabel[c.status]}</Badge>{c.catch_up_through && <Badge tone="waiting">Catch-up</Badge>}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
