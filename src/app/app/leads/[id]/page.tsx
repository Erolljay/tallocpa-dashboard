import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProposalView, type ProposalData } from "@/components/funnel/proposal-view";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { addDays } from "@/lib/deadlines/dates";
import type { ClientProfile } from "@/lib/fees/types";
import { manilaToday } from "@/lib/filings/run";
import { LEAD_STATUS, type LeadStatus } from "@/lib/funnel/labels";
import { defaultTerms, SERVICE_LABELS } from "@/lib/funnel/terms";
import { supabaseServer } from "@/lib/supabase/server";
import { ConvertForm, LostForm, ProposalForm } from "../forms";

export default function LeadPage(props: PageProps<"/app/leads/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Lead params={props.params} />
    </Suspense>
  );
}

const TYPE_LABEL: Record<string, string> = { individual: "Sole proprietor or professional", opc: "One Person Corporation", partnership: "Partnership", corporation: "Corporation", non_stock: "Non-stock, non-profit" };

async function Lead({ params }: Pick<PageProps<"/app/leads/[id]">, "params">) {
  const { id } = await params;
  await requireOwner();
  const supabase = await supabaseServer();
  const { data: lead } = await supabase.from("leads").select("*, brands(display_name, legal_name, tin)").eq("id", id).maybeSingle();
  if (!lead) notFound();
  const { data: proposals } = await supabase.from("proposals").select("*").eq("lead_id", id).order("created_at", { ascending: false });
  const brand = lead.brands as { display_name: string; legal_name: string; tin: string | null };
  const status = lead.status as LeadStatus;
  const [label, tone] = LEAD_STATUS[status];
  const profile = lead.profile as Partial<ClientProfile>;
  const latest = (proposals ?? []).find((p) => p.status !== "withdrawn") ?? null;
  const view = (p: Record<string, unknown>): ProposalData => ({ ...(p as unknown as ProposalData), lead: { business_name: lead.business_name, contact_name: lead.contact_name, email: lead.email, services: lead.services, taxpayer_type: lead.taxpayer_type }, brand });
  const nextMonth = `${addDays(`${manilaToday().slice(0, 7)}-28`, 7).slice(0, 7)}-01`;

  return (
    <>
      <PageHeader
        title={lead.business_name}
        description={<><Link href="/app/leads" className="text-button-ghost-foreground hover:underline">Leads</Link> · received {String(lead.created_at).slice(0, 10)} from the {lead.source === "staff" ? "staff" : "website"}</>}
        actions={<span className="inline-flex gap-1"><Badge tone={tone}>{label}</Badge>{lead.test && <Badge tone="neutral">Test</Badge>}</span>}
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,24rem)_1fr] xl:items-start">
        <div className="space-y-6">
          <Card title="Contact">
            <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5 text-body-regular">
              <dt className="text-text-tertiary">Name</dt><dd>{lead.contact_name}</dd>
              <dt className="text-text-tertiary">Email</dt><dd className="break-all"><bdi dir="ltr"><a href={`mailto:${lead.email}`} className="underline">{lead.email}</a></bdi></dd>
              <dt className="text-text-tertiary">Mobile</dt><dd><bdi dir="ltr">{lead.mobile ?? "—"}</bdi></dd>
              <dt className="text-text-tertiary">Type</dt><dd>{TYPE_LABEL[lead.taxpayer_type] ?? lead.taxpayer_type}</dd>
              <dt className="text-text-tertiary">Services</dt><dd>{(lead.services as string[]).map((s) => SERVICE_LABELS[s] ?? s).join(", ") || "—"}</dd>
              <dt className="text-text-tertiary">Profile</dt>
              <dd className="text-text-secondary">
                {profile.vatRegistered ? "VAT" : "Non-VAT"} · {profile.documentsPerMonth ?? 0} documents a month · {profile.employees ?? 0} employees · {profile.branches ?? 0} branches · bookkeeping {profile.bookkeeping ?? "none"}
              </dd>
              {lead.quote && <><dt className="text-text-tertiary">Website quote</dt><dd className="tabular-nums">{peso.format((lead.quote as { monthlyRetainer: number }).monthlyRetainer)} / month</dd></>}
              {lead.message && <><dt className="text-text-tertiary">Message</dt><dd className="whitespace-pre-line">{lead.message}</dd></>}
              {lead.lost_reason && <><dt className="text-text-tertiary">Lost</dt><dd>{lead.lost_reason}</dd></>}
            </dl>
          </Card>

          {(proposals ?? []).length > 0 && (
            <Card title="Proposals">
              <ul className="divide-y divide-separator-border text-body-regular">
                {(proposals ?? []).map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                    <span>
                      <a href={`/proposal/${p.token}`} target="_blank" rel="noreferrer" className="underline">{String(p.created_at).slice(0, 10)}</a>
                      <span className="text-text-tertiary"> · {peso.format(Number(p.monthly_retainer))} / month · valid to {p.valid_until}</span>
                    </span>
                    <Badge tone={p.status === "accepted" ? "done" : p.status === "withdrawn" ? "neutral" : "waiting"}>
                      {p.status === "accepted" ? `Accepted by ${p.accepted_name}` : p.status === "withdrawn" ? "Replaced" : "Sent"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {status === "accepted" && (
            <Card title="Make the client">
              <div className="space-y-3">
                <p className="text-body-regular text-text-secondary">Creates the client in Onboarding with the engagement and the retainer. The accepted proposal becomes its proposal and signed contract on the Onboarding tab.</p>
                <ConvertForm leadId={id} defaultStart={nextMonth} />
              </div>
            </Card>
          )}
          {status === "converted" && lead.client_id && (
            <Notice tone="done">This lead is a client. <Link href={`/app/clients/${lead.client_id}/onboarding`} className="underline">Open its onboarding</Link>.</Notice>
          )}
          {(status === "new" || status === "proposal_sent" || status === "lost") && (
            <Card title={status === "lost" ? "Lost" : "Not going ahead?"}><LostForm leadId={id} lost={status === "lost"} /></Card>
          )}
        </div>

        <div className="space-y-6">
          {(status === "new" || status === "proposal_sent") && (
            <Card title={status === "new" ? "Send a proposal" : "Send a new proposal"}>
              <ProposalForm leadId={id} defaultTerms={defaultTerms(brand.legal_name, lead.services as string[])} />
            </Card>
          )}
          {latest && <ProposalView p={view(latest)} />}
        </div>
      </div>
    </>
  );
}
