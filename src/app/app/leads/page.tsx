import Link from "next/link";
import { Suspense } from "react";
import { RiLayoutColumnLine, RiListUnordered } from "@remixicon/react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwnerOrReviewer } from "@/lib/auth";
import { LEAD_STAGE_ORDER, LEAD_STAGES, type LeadStage } from "@/lib/funnel/labels";
import { leadSourceLabel, type LeadSourceRow } from "@/lib/marketing/links";
import { SERVICE_LABELS } from "@/lib/funnel/terms";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { FunnelSwitch } from "./forms";

export default function LeadsPage(props: PageProps<"/app/leads">) {
  return (
    <>
      <PageHeader
        title="Leads"
        description="Lead → Prospect → Won → Onboarding, or Lost. The Owner assigns each lead a reviewer, who holds the discovery call."
        actions={<LinkButton href="/start" variant="secondary" target="_blank">Try the website form</LinkButton>}
      />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Leads searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

type Row = LeadSourceRow & {
  id: string;
  business_name: string;
  contact_name: string;
  services: string[];
  quote: { monthlyRetainer?: number } | null;
  stage: LeadStage;
  test: boolean;
  reviewer_id: string | null;
  lost_reason: string | null;
  created_at: string;
  stage_changed_at: string;
};

const day = (iso: string) => String(iso).slice(0, 10);

async function Leads({ searchParams }: Pick<PageProps<"/app/leads">, "searchParams">) {
  const me = await requireOwnerOrReviewer();
  const isOwner = me.staff.role === "owner";
  const { view } = await searchParams;
  const list = view === "list";
  const supabase = await supabaseServer();
  const [{ data: brand }, { data: leads }, { data: staff }] = await Promise.all([
    supabase.from("brands").select("funnel_open").eq("id", me.staff.brandId).single(),
    supabase
      .from("leads")
      .select("id, business_name, contact_name, services, quote, stage, test, reviewer_id, lost_reason, created_at, stage_changed_at, source, utm_source, utm_campaign, referrer, marketing_links(label, platform, campaign, code)")
      .order("stage_changed_at", { ascending: false })
      .limit(300),
    supabase.from("staff_profiles").select("user_id, full_name"),
  ]);
  const rows = (leads ?? []) as unknown as Row[];
  const nameOf = new Map((staff ?? []).map((s) => [s.user_id as string, s.full_name as string]));
  const byStage = new Map(LEAD_STAGE_ORDER.map((s) => [s, rows.filter((r) => r.stage === s)]));
  const open = Boolean(brand?.funnel_open);
  const unassigned = rows.filter((r) => !r.reviewer_id && (r.stage === "lead" || r.stage === "prospect")).length;

  return (
    <div className="space-y-6">
      {isOwner && (
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
      )}
      {isOwner && unassigned > 0 && <Notice tone="waiting">{unassigned} open lead{unassigned === 1 ? " has" : "s have"} no reviewer yet. Open the lead to assign one.</Notice>}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-body-regular text-text-secondary">
          {isOwner ? "Every lead." : "The leads assigned to you."}{" "}
          <span className="tabular-nums">{LEAD_STAGE_ORDER.map((s) => `${LEAD_STAGES[s].label} ${byStage.get(s)!.length}`).join(" · ")}</span>
        </p>
        <nav aria-label="View" className="flex gap-1 rounded-xl bg-background-secondary-default p-1">
          <ViewLink href="/app/leads" active={!list} icon={RiLayoutColumnLine} label="Board" />
          <ViewLink href="/app/leads?view=list" active={list} icon={RiListUnordered} label="List" />
        </nav>
      </div>

      {rows.length === 0 ? (
        <Card><p className="text-body-regular text-text-secondary">{isOwner ? "No leads yet. Try the website form to make one." : "No leads are assigned to you."}</p></Card>
      ) : list ? (
        <div className="space-y-6">
          {LEAD_STAGE_ORDER.map((s) => (
            <Card key={s} title={`${LEAD_STAGES[s].label} · ${byStage.get(s)!.length}`}>
              {byStage.get(s)!.length === 0 ? (
                <p className="text-body-regular text-text-tertiary">None.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[52rem] text-body-regular">
                    <thead className="text-body-medium text-text-tertiary">
                      <tr>
                        <th scope="col" className="pb-2 text-start">Business</th>
                        <th scope="col" className="pb-2 text-start">Services</th>
                        <th scope="col" className="pb-2 text-start">Source</th>
                        <th scope="col" className="pb-2 text-start">Reviewer</th>
                        <th scope="col" className="pb-2 text-end">Quoted / month</th>
                        <th scope="col" className="pb-2 ps-3 text-start">Since</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byStage.get(s)!.map((l) => (
                        <tr key={l.id} className="border-t border-separator-border hover:bg-background-secondary-hover">
                          <td className="py-2 pe-3">
                            <Link href={`/app/leads/${l.id}`} className="text-body-medium text-text-primary hover:underline">{l.business_name}</Link>
                            <span className="text-text-tertiary"> · {l.contact_name}</span>
                            {l.test && <span className="ms-2 inline-flex"><Badge tone="neutral">Test</Badge></span>}
                            {l.stage === "lost" && l.lost_reason && <p className="text-caption-1-regular text-text-secondary">{l.lost_reason}</p>}
                          </td>
                          <td className="py-2 pe-3 text-text-secondary">{l.services.map((x) => SERVICE_LABELS[x] ?? x).join(", ")}</td>
                          <td className="py-2 pe-3 text-text-secondary">{leadSourceLabel(l)}</td>
                          <td className="py-2 pe-3 text-text-secondary">{l.reviewer_id ? nameOf.get(l.reviewer_id) ?? "—" : "Not assigned"}</td>
                          <td className="py-2 text-end tabular-nums">{l.quote?.monthlyRetainer != null ? peso.format(l.quote.monthlyRetainer) : "—"}</td>
                          <td className="py-2 ps-3 tabular-nums text-text-secondary">{day(l.stage_changed_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LEAD_STAGE_ORDER.map((s) => (
            <section key={s} aria-labelledby={`stage-${s}`} className="flex min-w-0 flex-col gap-2 rounded-3xl border border-border-button-default bg-background-secondary-default p-3">
              <header className="flex items-center justify-between gap-2 px-1">
                <h2 id={`stage-${s}`} className="text-headline-medium text-text-primary">{LEAD_STAGES[s].label}</h2>
                <span className="rounded-full bg-background-tertiary-default px-2 text-caption-1-semibold tabular-nums text-text-secondary">{byStage.get(s)!.length}</span>
              </header>
              <p className="px-1 text-caption-1-regular text-text-tertiary">{LEAD_STAGES[s].hint}</p>
              <ul className="flex flex-col gap-2">
                {byStage.get(s)!.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/app/leads/${l.id}`}
                      className="flex flex-col gap-1 rounded-2xl bg-background-primary-default p-3 shadow-xs transition-colors duration-150 hover:bg-background-secondary-hover outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                    >
                      <span className="text-body-medium break-words text-text-primary">{l.business_name}</span>
                      <span className="text-caption-1-regular text-text-secondary">{l.contact_name}</span>
                      <span className="text-caption-1-regular text-text-tertiary">From {leadSourceLabel(l)}</span>
                      {l.stage === "lost" && l.lost_reason && <span className="text-caption-1-regular text-text-secondary">{l.lost_reason}</span>}
                      <span className="flex flex-wrap items-center gap-1 pt-1">
                        <span className={cx("text-caption-1-regular", l.reviewer_id ? "text-text-tertiary" : "text-text-error-primary")}>
                          {l.reviewer_id ? nameOf.get(l.reviewer_id) ?? "—" : "No reviewer"}
                        </span>
                        {l.quote?.monthlyRetainer != null && <span className="text-caption-1-regular tabular-nums text-text-tertiary">· {peso.format(l.quote.monthlyRetainer)}/mo</span>}
                        {l.test && <Badge tone="neutral">Test</Badge>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function ViewLink({ href, active, icon: Icon, label }: { href: string; active: boolean; icon: typeof RiListUnordered; label: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cx(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-body-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11",
        active ? "bg-background-primary-default text-text-primary shadow-xs" : "text-text-secondary hover:text-text-primary",
      )}
    >
      <Icon aria-hidden className="size-4" />
      {label}
    </Link>
  );
}
