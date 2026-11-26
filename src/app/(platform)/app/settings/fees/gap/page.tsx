import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { manilaToday } from "@/lib/filings/run";
import { gapFor, lastWholeMonths, type GapRow } from "@/lib/fees/gap";
import { isLegacySchedule } from "@/lib/fees/template";
import { toSettings } from "@/lib/fees/schedule";
import { supabaseServer } from "@/lib/supabase/server";
import { loadItems, loadSchedules, loadTaxOnFee } from "../data";

export default function FeeGapPage() {
  return (
    <>
      <PageHeader
        title="Current clients vs schedule"
        description={
          <>
            Existing clients keep their fees until their annual renewal. This compares each client&apos;s current monthly retainer with what the active schedule would charge a month, bookkeeping by the documents they send, and flags volume above the first band.{" "}
            <Link href="/app/settings/fees" className="text-button-ghost-foreground hover:underline">Fee schedule</Link>
          </>
        }
      />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Gap />
      </Suspense>
    </>
  );
}

const WINDOW_MONTHS = 3;

interface EngagementRow {
  client_id: string;
  service_line: string;
  monthly_retainer: string;
  start_date: string;
  clients: { id: string; name: string; code: string; taxpayer_type: TaxpayerType; brand_id: string } | null;
}

async function Gap() {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const active = (await loadSchedules(supabase, owner.staff.brandId)).find((s) => s.status === "active");
  if (!active) {
    return (
      <Notice tone="waiting">
        No fee schedule is active, so there is nothing to compare with. <Link href="/app/settings/fees" className="font-medium underline">Set up the fee schedule</Link> first.
      </Notice>
    );
  }

  const today = manilaToday();
  const months = lastWholeMonths(today, WINDOW_MONTHS);
  const [items, taxOnFee, engagements, obligations, volume] = await Promise.all([
    loadItems(supabase, active.id),
    loadTaxOnFee(supabase, owner.staff.brandId),
    supabase.from("engagements").select("client_id, service_line, monthly_retainer, start_date, clients(id, name, code, taxpayer_type, brand_id)").eq("status", "active"),
    supabase.from("obligations").select("client_id, form, end_date"),
    supabase.rpc("client_document_volume", { p_from: months[0], p_to: months[months.length - 1] }),
  ]);
  const settings = toSettings(active);

  const byClient = new Map<string, { name: string; code: string; taxpayerType: TaxpayerType; current: number; lines: Set<string>; start: string }>();
  for (const e of (engagements.data ?? []) as unknown as EngagementRow[]) {
    if (!e.clients || e.clients.brand_id !== owner.staff.brandId) continue;
    const c = byClient.get(e.client_id) ?? { name: e.clients.name, code: e.clients.code, taxpayerType: e.clients.taxpayer_type, current: 0, lines: new Set<string>(), start: e.start_date };
    c.current = Math.round((c.current + Number(e.monthly_retainer)) * 100) / 100;
    c.lines.add(e.service_line);
    if (e.start_date < c.start) c.start = e.start_date;
    byClient.set(e.client_id, c);
  }
  const forms = new Map<string, string[]>();
  for (const o of obligations.data ?? []) {
    if (o.end_date && o.end_date < today) continue;
    forms.set(o.client_id, [...(forms.get(o.client_id) ?? []), o.form]);
  }
  const docs = new Map<string, number>();
  for (const v of (volume.data ?? []) as { client_id: string; month: string; documents: number }[]) docs.set(`${v.client_id}|${v.month}`, v.documents);

  const rows: (GapRow & { id: string; name: string; code: string })[] = [...byClient.entries()]
    .map(([id, c]) => {
      // Only months the client was with us count toward the average.
      const startMonth = `${c.start.slice(0, 7)}-01`;
      const monthlyDocuments = months.filter((m) => m >= startMonth).map((m) => docs.get(`${id}|${m}`) ?? 0);
      const g = gapFor({ taxpayerType: c.taxpayerType, openForms: forms.get(id) ?? [], monthlyDocuments, currentMonthly: c.current }, { items, settings, taxOnFee }, today);
      return { ...g, id, name: c.name, code: c.code };
    })
    .sort((a, b) => b.gap - a.gap || a.name.localeCompare(b.name));

  const totalCurrent = rows.reduce((s, r) => s + r.currentMonthly, 0);
  const totalComputed = rows.reduce((s, r) => s + r.computedMonthly, 0);
  const above = rows.filter((r) => r.aboveFirstBand).length;
  const legacy = isLegacySchedule(items);
  const monthName = (m: string) => new Intl.DateTimeFormat("en-PH", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${m}T00:00:00Z`));

  return (
    <div className="space-y-6">
      {legacy && (
        <Notice tone="blocked">
          The active schedule is from before 26 Nov 2026: its bookkeeping (G) is not priced on the new structure, so these figures leave it out. Start a new version, price it and activate it.
        </Notice>
      )}
      <Notice tone="waiting">
        Estimate only. The OS does not record headcount, the kind of withholding, branches or complexity, so those take the lowest band (or none) and are listed under each client: the computed fee is a floor. Bookkeeping is priced by the documents each client sent, with or without the bookkeeping service. Document volume is the monthly average from {monthName(months[0])} to {monthName(months[months.length - 1])}. Schedule: “{active.name}”.
      </Notice>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-body-medium text-text-secondary">Current retainers</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(Math.round(totalCurrent * 100) / 100)}</p>
          <p className="mt-2 text-body-regular text-text-secondary">{rows.length} client{rows.length === 1 ? "" : "s"} with an active engagement.</p>
        </Card>
        <Card>
          <p className="text-body-medium text-text-secondary">At schedule prices (estimate)</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(Math.round(totalComputed * 100) / 100)}</p>
          <p className="mt-2 text-body-regular text-text-secondary">A month, at least.</p>
        </Card>
        <Card>
          <p className="text-body-medium text-text-secondary">Above the first band</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{above}</p>
          <p className="mt-2 text-body-regular text-text-secondary">Clients sending more documents than the first bookkeeping band.</p>
        </Card>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border-button-default bg-background-primary-default p-8 text-center text-body-regular text-text-secondary">No client has an active engagement.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-border-button-default bg-background-primary-default shadow-xs">
          <table className="w-full min-w-[52rem] text-body-regular">
            <thead className="border-b border-separator-border bg-background-secondary-default text-start text-body-medium text-text-tertiary">
              <tr>
                <th scope="col" className="text-start px-4 py-3">Client</th>
                <th scope="col" className="px-4 py-3 text-end">Current a month</th>
                <th scope="col" className="px-4 py-3 text-end">Schedule (estimate)</th>
                <th scope="col" className="px-4 py-3 text-end">Gap</th>
                <th scope="col" className="text-start px-4 py-3">Documents a month</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-separator-border transition-colors duration-150 hover:bg-background-secondary-hover align-top">
                  <td className="px-4 py-3">
                    <Link href={`/app/clients/${r.id}`} className="font-medium text-text-primary hover:text-button-ghost-foreground hover:underline">{r.name}</Link>
                    <p className="text-caption-1-regular text-text-tertiary">{r.code}</p>
                    {r.assumptions.length > 0 && (
                      <ul className="mt-1 space-y-0.5 text-caption-1-regular text-text-secondary">
                        {r.assumptions.map((a) => <li key={a}>{a}</li>)}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3 text-end tabular-nums text-text-primary">{peso.format(r.currentMonthly)}</td>
                  <td className="px-4 py-3 text-end tabular-nums text-text-primary">
                    {peso.format(r.computedMonthly)}
                    {r.incomplete && <p className="text-caption-1-regular text-text-tertiary">plus items on request</p>}
                  </td>
                  <td className={`px-4 py-3 text-end tabular-nums ${r.gap > 0 ? "font-medium text-text-error-primary" : "text-text-secondary"}`}>
                    {r.gap === 0 ? "—" : r.gap > 0 ? `${peso.format(r.gap)} under` : `${peso.format(-r.gap)} over`}
                  </td>
                  <td className="px-4 py-3">
                    <p className="tabular-nums text-text-primary">{r.averageDocuments} <span className="text-text-tertiary">(busiest {r.peakDocuments})</span></p>
                    <p className="text-caption-1-regular text-text-tertiary">{r.volumeBand ?? "No band"}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {r.volumeNeedsCustomQuote ? <Badge tone="blocked">Custom quote volume</Badge> : r.aboveFirstBand ? <Badge tone="waiting">Above the first band</Badge> : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
