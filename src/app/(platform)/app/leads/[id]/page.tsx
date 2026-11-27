import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, Suspense, type ReactNode } from "react";
import { RiCalendarScheduleLine } from "@remixicon/react";
import { CancelBooking } from "@/components/booking/cancel-booking";
import { ProposalView, type ProposalData } from "@/components/funnel/proposal-view";
import { NotesTimeline } from "@/components/leads/notes-timeline";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwnerOrReviewer } from "@/lib/auth";
import { taxpayerTypeLabel } from "@/lib/clients/labels";
import { addDays } from "@/lib/deadlines/dates";
import { manilaToday } from "@/lib/filings/run";
import { LEAD_STAGES, isOpenStage, type LeadStage } from "@/lib/funnel/labels";
import { defaultTerms, SERVICE_LABELS } from "@/lib/funnel/terms";
import { notesTimeline, type NoteRow } from "@/lib/leads/notes";
import { manilaNowLocal } from "@/lib/leads/time";
import { channelLabel, leadChannel, type LeadSourceRow } from "@/lib/marketing/links";
import { proposalSetup } from "@/lib/funnel/proposal-quote";
import { supabaseServer } from "@/lib/supabase/server";
import { cancelCallAction } from "../actions";
import { BookingLink, ConvertForm, DiscoveryCallForm, LostForm, ProposalForm, ReopenForm, ReviewerForm } from "../forms";

export default function LeadPage(props: PageProps<"/app/leads/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Lead params={props.params} />
    </Suspense>
  );
}

type Person = { user_id: string; full_name: string; role: string; active: boolean };

const bookedTime = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

async function Lead({ params }: Pick<PageProps<"/app/leads/[id]">, "params">) {
  const { id } = await params;
  const me = await requireOwnerOrReviewer();
  const isOwner = me.staff.role === "owner";
  const supabase = await supabaseServer();
  const { data: lead } = await supabase.from("leads").select("*, brands(display_name, legal_name, tin), marketing_links(label, platform, campaign, code)").eq("id", id).maybeSingle();
  if (!lead) notFound();
  const [{ data: proposals }, { data: notes }, { data: staffRows }, { data: booked }] = await Promise.all([
    supabase.from("proposals").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
    supabase.from("lead_notes").select("source, source_id, at, author, body, details").eq("lead_id", id),
    supabase.from("staff_profiles").select("user_id, full_name, role, active").order("full_name"),
    supabase.from("discovery_calls").select("id, scheduled_at, meet_url, booked_via").eq("lead_id", id).is("held_at", null).is("cancelled_at", null).maybeSingle(),
  ]);
  const bookedCall = booked as { id: string; scheduled_at: string | null; meet_url: string | null } | null;
  const staff = (staffRows ?? []) as Person[];
  const nameOf = new Map(staff.map((s) => [s.user_id, s.full_name]));
  const active = staff.filter((s) => s.active);
  const reviewers = active.filter((s) => s.role === "owner" || s.role === "reviewer");

  const brand = lead.brands as { display_name: string; legal_name: string; tin: string | null };
  const stage = lead.stage as LeadStage;
  const { label, tone } = LEAD_STAGES[stage];
  const canWork = isOwner || lead.reviewer_id === me.userId;
  const latest = (proposals ?? []).find((p) => p.status !== "withdrawn") ?? null;
  const view = (p: Record<string, unknown>): ProposalData => ({ ...(p as unknown as ProposalData), lead: { business_name: lead.business_name, contact_name: lead.contact_name, email: lead.email, services: lead.services, taxpayer_type: lead.taxpayer_type }, brand });
  const nextMonth = `${addDays(`${manilaToday().slice(0, 7)}-28`, 7).slice(0, 7)}-01`;
  const timeline = notesTimeline((notes ?? []) as NoteRow[]);
  const calls = timeline.filter((n) => n.source === "discovery_call").length;

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
              <dt className="text-text-tertiary">Type</dt><dd>{taxpayerTypeLabel[lead.taxpayer_type] ?? lead.taxpayer_type}</dd>
              <dt className="text-text-tertiary">Services</dt><dd>{(lead.services as string[]).map((s) => SERVICE_LABELS[s] ?? s).join(", ") || "—"}</dd>
              {lead.quote && <><dt className="text-text-tertiary">Website quote</dt><dd className="tabular-nums">{peso.format((lead.quote as { monthlyRetainer: number }).monthlyRetainer)} / month</dd></>}
              {stage === "lost" && <><dt className="text-text-tertiary">Lost</dt><dd>{lead.lost_reason}</dd></>}
            </dl>
          </Card>

          <LeadSource lead={lead as LeadSourceRow & LeadTouch} />

          <Card title="Reviewer">
            {isOwner && stage !== "onboarding" ? (
              <ReviewerForm leadId={id} current={lead.reviewer_id} reviewers={reviewers} />
            ) : (
              <p className="text-body-regular text-text-primary">{lead.reviewer_id ? nameOf.get(lead.reviewer_id) ?? "—" : "Not assigned"}</p>
            )}
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

          {stage === "won" && (
            <Card title="Make the client">
              {isOwner ? (
                <div className="space-y-3">
                  <p className="text-body-regular text-text-secondary">Creates the client in Onboarding with the engagement and the retainer, and its own preparer and reviewer. The accepted proposal becomes its proposal and signed contract on the Onboarding tab.</p>
                  <ConvertForm leadId={id} defaultStart={nextMonth} staff={active} reviewers={reviewers} leadReviewer={lead.reviewer_id} />
                </div>
              ) : (
                <p className="text-body-regular text-text-secondary">Won. The Owner makes the client and picks its preparer and reviewer.</p>
              )}
            </Card>
          )}
          {stage === "onboarding" && lead.client_id && (
            <Notice tone="done">This lead is a client. <Link href={`/app/clients/${lead.client_id}/onboarding`} className="underline">Open its onboarding</Link>; these notes are in its Notes on the Overview.</Notice>
          )}
          {canWork && isOpenStage(stage) && <Card title="Not going ahead?"><LostForm leadId={id} /></Card>}
          {canWork && stage === "lost" && <Card title="Lost"><div className="space-y-3"><p className="text-body-regular text-text-secondary">{lead.lost_reason}</p><ReopenForm leadId={id} /></div></Card>}
        </div>

        <div className="space-y-6">
          {canWork && isOpenStage(stage) && (
            <Card title={calls ? "Record another discovery call" : "Discovery call"}>
              <div className="space-y-4">
                <div className="flex items-start gap-2.5 rounded-2xl bg-background-secondary-default p-3 text-body-regular text-text-secondary">
                  <RiCalendarScheduleLine aria-hidden className="mt-0.5 size-4 shrink-0 text-foreground-icon-tertiary" />
                  {bookedCall?.scheduled_at ? (
                    <p>
                      Booked for {bookedTime.format(new Date(bookedCall.scheduled_at))}
                      {bookedCall.meet_url?.startsWith("https://") && <> · <a href={bookedCall.meet_url} target="_blank" rel="noreferrer" className="underline">Google Meet</a></>}. Record the notes below after the call.
                    </p>
                  ) : (
                    <p>The lead books the call on {lead.reviewer_id ? `${nameOf.get(lead.reviewer_id) ?? "the reviewer"}'s` : "the reviewer's"} free times from the booking link, with a Meet link. Or arrange it yourself and record it below.</p>
                  )}
                </div>
                {bookedCall?.scheduled_at && (
                  <CancelBooking
                    action={cancelCallAction.bind(null, id, bookedCall.id)}
                    label="Cancel the call"
                    confirmLabel="Cancel the call"
                    reasonHint="Optional. It goes in the email to the lead and the notice to the team."
                  />
                )}
                {!bookedCall?.scheduled_at && lead.reviewer_id && (stage === "lead" || stage === "prospect") && <BookingLink leadId={id} />}
                <DiscoveryCallForm leadId={id} defaultAt={manilaNowLocal()} />
              </div>
            </Card>
          )}

          <Card title="Notes">
            <NotesTimeline entries={timeline} nameOf={nameOf} empty="No notes yet." />
          </Card>

          {canWork && (stage === "lead" || stage === "prospect") && (
            <Card title={latest ? "Send a new proposal" : "Send a proposal"}>
              <ProposalForm leadId={id} defaultTerms={defaultTerms(brand.legal_name, lead.services as string[])} setup={await proposalSetup(supabase, me.staff.brandId, lead.profile, lead.services as string[])} />
            </Card>
          )}
          {latest && <ProposalView p={view(latest)} />}
        </div>
      </div>
    </>
  );
}

type LeadTouch = { utm_medium: string | null; utm_content: string | null; landing_path: string | null; first_touch_at: string | null };

/** Where the lead came from: its first touch (migration 20261214000001_lead_attribution.sql). */
function LeadSource({ lead }: { lead: LeadSourceRow & LeadTouch }) {
  const link = lead.marketing_links;
  const campaign = link?.campaign ?? lead.utm_campaign;
  const rows: [string, ReactNode][] = [["Channel", channelLabel(leadChannel(lead))]];
  if (campaign) rows.push(["Campaign", campaign]);
  if (link) rows.push(["Link", <>{link.label} · <bdi dir="ltr">/go/{link.code}</bdi></>]);
  if (lead.utm_medium) rows.push(["Medium", lead.utm_medium]);
  if (lead.utm_content) rows.push(["Content", lead.utm_content]);
  if (lead.referrer) rows.push(["Referred by", <bdi key="r" dir="ltr">{lead.referrer}</bdi>]);
  if (lead.landing_path) rows.push(["Landed on", <bdi key="p" dir="ltr">{lead.landing_path}</bdi>]);
  if (lead.first_touch_at) rows.push(["First visit", bookedTime.format(new Date(lead.first_touch_at))]);
  return (
    <Card title="Source">
      <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5 text-body-regular">
        {rows.map(([k, v]) => (
          <Fragment key={k}>
            <dt className="text-text-tertiary">{k}</dt>
            <dd className="min-w-0 break-words">{v}</dd>
          </Fragment>
        ))}
      </dl>
    </Card>
  );
}
