import Link from "next/link";
import { Suspense } from "react";
import { Badge, Button, Card, Field, Input, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { manilaToday } from "@/lib/filings/run";
import { channelLabel, linkUrl, MEDIUMS, PLATFORMS, siteUrl } from "@/lib/marketing/links";
import { supabaseServer } from "@/lib/supabase/server";
import { ArchiveButton, CopyLink, CreateLinkForm, ReportTable, type ReportLine } from "./forms";

export default function FirmMarketingPage(props: PageProps<"/app/firm/marketing">) {
  return (
    <>
      <PageHeader
        title="Marketing"
        description="Campaign links for your Facebook posts and ads, and which ones bring leads and clients. Each lead keeps the first link or page tag that brought it."
      />
      <Suspense fallback={<Skeleton rows={10} />}>
        <Marketing searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

type LinkRow = {
  id: string;
  code: string;
  label: string;
  platform: string;
  utm_medium: string;
  campaign: string;
  content: string | null;
  target_path: string;
  clicks: number;
  archived_at: string | null;
  created_at: string;
};

type ReportRow = {
  channel: string;
  campaign: string | null;
  link_id: string | null;
  link_code: string | null;
  link_label: string | null;
  clicks: number | string;
  leads: number | string;
  won: number | string;
  lost: number | string;
  quoted: number | string;
  quoted_monthly: number | string;
};

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const platformLabel = (p: string) => PLATFORMS.find((x) => x.value === p)?.label ?? p;
const mediumLabel = (m: string) => MEDIUMS.find((x) => x.value === m)?.label ?? m;

async function Marketing({ searchParams }: Pick<PageProps<"/app/firm/marketing">, "searchParams">) {
  await requireOwner();
  const sp = await searchParams;
  const today = manilaToday();
  const monthStart = `${today.slice(0, 7)}-01`;
  const fromRaw = one(sp.from);
  const toRaw = one(sp.to);
  let from = ISO_DAY.test(fromRaw) ? fromRaw : monthStart;
  let to = ISO_DAY.test(toRaw) ? toRaw : today;
  if (from > to) [from, to] = [to, from];
  const showArchived = one(sp.archived) === "1";

  const base = siteUrl();
  const supabase = await supabaseServer();
  const [{ data: links }, { data: report, error }] = await Promise.all([
    supabase.from("marketing_links").select("id, code, label, platform, utm_medium, campaign, content, target_path, clicks, archived_at, created_at").order("created_at", { ascending: false }),
    supabase.rpc("marketing_report", { p_from: from, p_to: to }),
  ]);
  const all = (links ?? []) as LinkRow[];
  const active = all.filter((l) => !l.archived_at);
  const archived = all.filter((l) => l.archived_at);
  const shown = showArchived ? all : active;
  const lines: ReportLine[] = ((report ?? []) as ReportRow[]).map((r, i) => ({
    key: `${r.channel}|${r.campaign ?? ""}|${r.link_id ?? i}`,
    channel: channelLabel(r.channel),
    campaign: r.campaign,
    link: r.link_label ? `${r.link_label} · /go/${r.link_code}` : null,
    clicks: Number(r.clicks),
    leads: Number(r.leads),
    won: Number(r.won),
    lost: Number(r.lost),
    quotedMonthly: Number(r.quoted_monthly),
  }));

  return (
    <div className="flex flex-col gap-6">
      <Card title="Leads by source">
        <div className="flex flex-col gap-4">
          <form method="get" className="flex flex-wrap items-end gap-3">
            <Field label="From" htmlFor="r-from"><Input id="r-from" name="from" type="date" defaultValue={from} className="w-44 tabular-nums" /></Field>
            <Field label="To" htmlFor="r-to"><Input id="r-to" name="to" type="date" defaultValue={to} className="w-44 tabular-nums" /></Field>
            {showArchived && <input type="hidden" name="archived" value="1" />}
            <Button type="submit" variant="secondary">Show</Button>
          </form>
          {error ? (
            <Notice tone="blocked">{error.message}</Notice>
          ) : lines.length === 0 ? (
            <p className="text-body-regular text-text-secondary">No clicks or leads from {from} to {to}.</p>
          ) : (
            <ReportTable lines={lines} />
          )}
          <p className="text-caption-1-regular text-text-tertiary">
            Leads first received in the period, test leads left out; clicks on campaign links in the period. Won counts leads at Won or Onboarding, or made a client. Conversion is won ÷ leads. Quoted / month adds the monthly retainer of the website quotes. A lead with no link or tag is put under the site that referred it, else Direct.
          </p>
        </div>
      </Card>

      <Card title="Make a campaign link">
        <div className="flex flex-col gap-4">
          <p className="text-body-regular text-text-secondary">
            Make one link per post or ad and paste it in the post. Whoever clicks it is counted, and their quote request is tied to it, even if they come back days later (90 days).
          </p>
          <CreateLinkForm base={base} />
        </div>
      </Card>

      <Card
        title={`Campaign links · ${active.length}`}
        actions={archived.length > 0 ? (
          <Link href={`/app/firm/marketing?from=${from}&to=${to}${showArchived ? "" : "&archived=1"}`} className="text-body-medium text-text-secondary underline hover:text-text-primary">
            {showArchived ? "Hide archived" : `Show archived (${archived.length})`}
          </Link>
        ) : undefined}
      >
        {shown.length === 0 ? (
          <p className="text-body-regular text-text-secondary">No links yet. Make one above for your next post.</p>
        ) : (
          <ul className="divide-y divide-separator-border">
            {shown.map((l) => (
              <li key={l.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-body-medium text-text-primary">{l.label}</span>
                    <Badge tone="neutral">{platformLabel(l.platform)}</Badge>
                    {l.archived_at && <Badge tone="waiting">Archived</Badge>}
                  </span>
                  <span className="text-caption-1-regular text-text-tertiary">
                    {l.campaign}{l.content ? ` · ${l.content}` : ""} · {mediumLabel(l.utm_medium)} · opens <bdi dir="ltr">{l.target_path}</bdi> · made {String(l.created_at).slice(0, 10)}
                  </span>
                  {!l.archived_at && <CopyLink url={linkUrl(base, l.code)} />}
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-body-regular text-text-secondary tabular-nums">{Number(l.clicks).toLocaleString("en-PH")} click{Number(l.clicks) === 1 ? "" : "s"}</span>
                  {!l.archived_at && <ArchiveButton id={l.id} />}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
