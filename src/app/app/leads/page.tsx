import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { LEAD_STATUS } from "@/lib/funnel/labels";
import { SERVICE_LABELS } from "@/lib/funnel/terms";
import { supabaseServer } from "@/lib/supabase/server";
import { FunnelSwitch } from "./forms";


export default function LeadsPage() {
  return (
    <>
      <PageHeader title="Leads" description="Phase 2: quote requests from the website, proposals, online acceptance, and new clients." actions={<LinkButton href="/start" variant="secondary" target="_blank">Try the website form</LinkButton>} />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Leads />
      </Suspense>
    </>
  );
}

async function Leads() {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const [{ data: brand }, { data: leads }] = await Promise.all([
    supabase.from("brands").select("funnel_open").eq("id", owner.staff.brandId).single(),
    supabase.from("leads").select("id, business_name, contact_name, services, quote, status, test, source, created_at").order("created_at", { ascending: false }).limit(200),
  ]);
  const open = Boolean(brand?.funnel_open);
  return (
    <div className="space-y-6">
      <Card title="The funnel">
        <div className="space-y-3">
          <Notice tone={open ? "done" : "waiting"}>
            {open
              ? "Open: anyone with the link can request a quote at /start and accept a proposal."
              : "Not live: /start and proposal links answer signed-in staff only. Try the whole flow; leads made now are marked as tests."}
          </Notice>
          <FunnelSwitch open={open} />
        </div>
      </Card>
      <Card title="Leads">
        {(leads ?? []).length === 0 ? (
          <p className="text-body-regular text-text-secondary">No leads yet. Try the website form to make one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-body-regular">
              <thead className="text-body-medium text-text-tertiary">
                <tr><th className="pb-2 text-start">Received</th><th className="pb-2 text-start">Business</th><th className="pb-2 text-start">Services</th><th className="pb-2 text-end">Quoted / month</th><th className="pb-2 ps-3 text-start">Status</th></tr>
              </thead>
              <tbody>
                {(leads ?? []).map((l) => {
                  const [label, tone] = LEAD_STATUS[l.status as keyof typeof LEAD_STATUS];
                  const monthly = (l.quote as { monthlyRetainer?: number } | null)?.monthlyRetainer;
                  return (
                    <tr key={l.id} className="border-t border-separator-border hover:bg-background-secondary-hover">
                      <td className="py-2 pe-3 tabular-nums text-text-secondary">{String(l.created_at).slice(0, 10)}</td>
                      <td className="py-2 pe-3">
                        <Link href={`/app/leads/${l.id}`} className="font-medium text-text-primary hover:underline">{l.business_name}</Link>
                        <span className="text-text-tertiary"> · {l.contact_name}</span>
                      </td>
                      <td className="py-2 pe-3 text-text-secondary">{(l.services as string[]).map((s) => SERVICE_LABELS[s] ?? s).join(", ")}</td>
                      <td className="py-2 text-end tabular-nums">{monthly != null ? peso.format(monthly) : "—"}</td>
                      <td className="py-2 ps-3"><span className="inline-flex gap-1"><Badge tone={tone}>{label}</Badge>{l.test && <Badge tone="neutral">Test</Badge>}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
