import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import type { TaxpayerType } from "@/lib/clients/obligations";
import { manilaToday } from "@/lib/filings/run";
import { gapFor, lastWholeMonths, type GapRow } from "@/lib/fees/gap";
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
            Existing clients keep their fees until their annual renewal. This compares each client&apos;s current monthly retainer with what the active schedule would charge, and flags document volume above the included band.{" "}
            <Link href="/app/settings/fees" className="text-link hover:underline">Fee schedule</Link>
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
      const g = gapFor({ taxpayerType: c.taxpayerType, openForms: forms.get(id) ?? [], serviceLines: [...c.lines], monthlyDocuments, currentMonthly: c.current }, { items, settings, taxOnFee }, today);
      return { ...g, id, name: c.name, code: c.code };
    })
    .sort((a, b) => b.gap - a.gap || a.name.localeCompare(b.name));

  const totalCurrent = rows.reduce((s, r) => s + r.currentMonthly, 0);
  const totalComputed = rows.reduce((s, r) => s + r.computedMonthly, 0);
  const above = rows.filter((r) => r.aboveIncludedVolume).length;
  const monthName = (m: string) => new Intl.DateTimeFormat("en-PH", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${m}T00:00:00Z`));

  return (
    <div className="space-y-6">
      <Notice tone="waiting">
        Estimate only. The OS does not record headcount, the kind of withholding or bookkeeping load, so those take the lowest band and are listed under each client: the computed fee is a floor. Document volume is the monthly average from {monthName(months[0])} to {monthName(months[months.length - 1])}. Schedule: “{active.name}”.
      </Notice>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm font-medium text-ink-muted">Current retainers</p>
          <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{peso.format(Math.round(totalCurrent * 100) / 100)}</p>
          <p className="mt-2 text-sm text-ink-muted">{rows.length} client{rows.length === 1 ? "" : "s"} with an active engagement.</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-ink-muted">At schedule prices (estimate)</p>
          <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{peso.format(Math.round(totalComputed * 100) / 100)}</p>
          <p className="mt-2 text-sm text-ink-muted">A month, at least.</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-ink-muted">Above the included volume</p>
          <p className="mt-2 text-[28px] leading-none font-semibold tracking-tight tabular-nums text-ink-heading">{above}</p>
          <p className="mt-2 text-sm text-ink-muted">Clients sending more documents than their fee covers.</p>
        </Card>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border-strong bg-surface p-8 text-center text-sm text-ink-muted">No client has an active engagement.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[52rem] text-sm">
            <thead className="border-b border-border bg-surface-muted text-left text-xs text-ink-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Client</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Current a month</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Schedule (estimate)</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Gap</th>
                <th scope="col" className="px-4 py-3 font-medium">Documents a month</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <Link href={`/app/clients/${r.id}`} className="font-medium text-ink-heading hover:text-link hover:underline">{r.name}</Link>
                    <p className="text-xs text-ink-subtle">{r.code}{r.annualPackage > 0 ? ` · annual package ${peso.format(r.annualPackage)}` : ""}</p>
                    {r.assumptions.length > 0 && (
                      <ul className="mt-1 space-y-0.5 text-xs text-ink-muted">
                        {r.assumptions.map((a) => <li key={a}>{a}</li>)}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-heading">{peso.format(r.currentMonthly)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink-heading">
                    {peso.format(r.computedMonthly)}
                    {r.incomplete && <p className="text-xs text-ink-subtle">plus items on request</p>}
                  </td>
                  <td className={`px-4 py-3 text-right tabular-nums ${r.gap > 0 ? "font-medium text-danger-text" : "text-ink-muted"}`}>
                    {r.gap === 0 ? "—" : r.gap > 0 ? `${peso.format(r.gap)} under` : `${peso.format(-r.gap)} over`}
                  </td>
                  <td className="px-4 py-3">
                    <p className="tabular-nums text-ink-heading">{r.averageDocuments} <span className="text-ink-subtle">(busiest {r.peakDocuments})</span></p>
                    <p className="text-xs text-ink-subtle">{r.volumeBand ?? "No band"}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {r.volumeNeedsCustomQuote ? <Badge tone="blocked">Custom quote volume</Badge> : r.aboveIncludedVolume ? <Badge tone="waiting">Above included volume</Badge> : null}
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
