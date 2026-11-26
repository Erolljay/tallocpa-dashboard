import Link from "next/link";
import { Suspense } from "react";
import { Badge, Button, Card, Field, Input, Notice, PageHeader, peso, Select, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { TAXPAYER_TYPES } from "@/lib/clients/obligations";
import { manilaToday } from "@/lib/filings/run";
import { profileFromQuery } from "@/lib/fees/params";
import { buildQuote, NOT_INCLUDED_NOTE, notIncludedName, type Quote, type QuoteLine } from "@/lib/fees/quote";
import { toSettings } from "@/lib/fees/schedule";
import { COMPLEXITY_FLAGS, type ClientProfile } from "@/lib/fees/types";
import { supabaseServer } from "@/lib/supabase/server";
import { cx } from "@/utils/cx";
import { loadItems, loadSchedules, loadTaxOnFee, longDate } from "../data";

export default function QuotePreviewPage(props: PageProps<"/app/settings/fees/quote">) {
  return (
    <>
      <PageHeader
        title="Quote preview"
        description={
          <>
            Work out what a new client would pay a month, and catch-up. Annual and ad hoc jobs are priced in the proposal. Nothing is saved.{" "}
            <Link href="/app/settings/fees" className="text-button-ghost-foreground hover:underline">Fee schedule</Link>
          </>
        }
      />
      <Suspense fallback={<Skeleton rows={10} />}>
        <Preview searchParams={props.searchParams} />
      </Suspense>
    </>
  );
}

const TAXPAYER_LABEL: Record<string, string> = { individual: "Individual", opc: "One Person Corporation", partnership: "Partnership", corporation: "Corporation", non_stock: "Non-stock, non-profit" };
const COMPLEXITY_LABEL: Record<string, string> = { inventory: "Inventory", manufacturing: "Manufacturing", construction: "Construction" };

async function Preview({ searchParams }: Pick<PageProps<"/app/settings/fees/quote">, "searchParams">) {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const q = await searchParams;
  const schedules = (await loadSchedules(supabase, owner.staff.brandId)).filter((s) => s.status !== "retired");
  const requested = typeof q.schedule === "string" ? q.schedule : undefined;
  const schedule = schedules.find((s) => s.id === requested) ?? schedules.find((s) => s.status === "active") ?? schedules[0];

  if (!schedule) {
    return (
      <Notice tone="waiting">
        There is no fee schedule yet. <Link href="/app/settings/fees" className="font-medium underline">Create a draft from the template</Link> and enter prices first.
      </Notice>
    );
  }

  const [items, taxOnFee] = await Promise.all([loadItems(supabase, schedule.id), loadTaxOnFee(supabase, owner.staff.brandId)]);
  const { profile } = profileFromQuery(q);
  const quote = buildQuote({ profile, items, settings: toSettings(schedule), taxOnFee, quoteDate: manilaToday() });
  const isDraft = schedule.status === "draft";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start">
      <Card title="Client">
        <ProfileForm profile={profile} scheduleId={schedule.id} schedules={schedules.map((s) => ({ id: s.id, label: `${s.name}${s.status === "draft" ? " (draft)" : ""}` }))} />
      </Card>
      <div className="space-y-6">
        {isDraft && (
          <Notice tone="waiting">
            <span className="font-bold">DRAFT</span> — priced from “{schedule.name}”, which is not active. Do not send these figures to a client.
          </Notice>
        )}
        {!schedules.some((s) => s.status === "active") && !isDraft && <Notice tone="waiting">No schedule is active.</Notice>}
        <QuoteView quote={quote} scheduleName={schedule.name} draft={isDraft} />
      </div>
    </div>
  );
}

function ProfileForm({ profile, scheduleId, schedules }: { profile: ClientProfile; scheduleId: string; schedules: { id: string; label: string }[] }) {
  const checkbox = "size-4 shrink-0";
  return (
    <form method="get" className="space-y-4">
      <input type="hidden" name="q" value="1" />
      {schedules.length > 1 && (
        <Field label="Fee schedule" htmlFor="qp-schedule">
          <Select id="qp-schedule" name="schedule" defaultValue={scheduleId}>
            {schedules.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </Select>
        </Field>
      )}
      {schedules.length === 1 && <input type="hidden" name="schedule" value={scheduleId} />}
      <Field label="Taxpayer type" htmlFor="qp-type">
        <Select id="qp-type" name="taxpayer_type" defaultValue={profile.taxpayerType}>
          {TAXPAYER_TYPES.map((t) => <option key={t} value={t}>{TAXPAYER_LABEL[t]}</option>)}
        </Select>
      </Field>
      <label className="flex items-center gap-2 text-body-regular text-text-primary">
        <input type="checkbox" name="vat" value="1" defaultChecked={profile.vatRegistered} className={checkbox} /> VAT-registered
      </label>
      <Field label="Expanded withholding" htmlFor="qp-ewt">
        <Select id="qp-ewt" name="ewt" defaultValue={profile.ewt}>
          <option value="none">None</option>
          <option value="rental">Rent or contractors</option>
          <option value="tamp_regular">Top withholding agent (TAMP)</option>
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Employees" htmlFor="qp-emp">
          <Input id="qp-emp" name="employees" type="number" min={0} defaultValue={profile.employees} className="tabular-nums" />
        </Field>
        <Field label="Documents a month" htmlFor="qp-docs">
          <Input id="qp-docs" name="documents" type="number" min={0} defaultValue={profile.documentsPerMonth} className="tabular-nums" />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-body-regular text-text-primary">
        <input type="checkbox" name="contributions" value="1" defaultChecked={profile.remitsContributions} className={checkbox} /> We remit SSS, PhilHealth, Pag-IBIG
      </label>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Branches" htmlFor="qp-branches">
          <Input id="qp-branches" name="branches" type="number" min={0} defaultValue={profile.branches} className="tabular-nums" />
        </Field>
        <Field label="Months behind" htmlFor="qp-behind">
          <Input id="qp-behind" name="behind" type="number" min={0} max={120} defaultValue={profile.monthsBehind} className="tabular-nums" />
        </Field>
      </div>
      <fieldset className="space-y-1.5">
        <legend className="text-body-medium text-text-primary">Business</legend>
        {COMPLEXITY_FLAGS.map((c) => (
          <label key={c} className="flex items-center gap-2 text-body-regular text-text-primary">
            <input type="checkbox" name="complexity" value={c} defaultChecked={profile.complexity.includes(c)} className={checkbox} /> {COMPLEXITY_LABEL[c]}
          </label>
        ))}
      </fieldset>
      <Button type="submit" className="w-full">Work out quote</Button>
    </form>
  );
}

function Lines({ lines }: { lines: QuoteLine[] }) {
  return (
    <ul className="divide-y divide-separator-border text-body-regular">
      {lines.map((l) => (
        <li key={l.code} className="flex items-start justify-between gap-4 py-2">
          <span className="min-w-0 flex-1">
            <span className="block text-text-primary">{l.band ? `${l.label} — ${l.band}` : l.label}</span>
            {l.quantity !== 1 && l.unitPrice !== null && (
              <span className="block text-caption-1-regular text-text-tertiary">{l.quantity} × {peso.format(l.unitPrice)}</span>
            )}
          </span>
          <span className="amount shrink-0 tabular-nums text-text-primary">{l.amount === null ? <Badge tone="waiting">No price</Badge> : peso.format(l.amount)}</span>
        </li>
      ))}
    </ul>
  );
}

function Total({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={cx("flex items-center justify-between gap-4 border-t border-separator-border pt-3", strong ? "text-headline-semibold" : "text-body-regular")}>
      <span className="text-text-primary">{label}</span>
      <span className="amount tabular-nums text-text-primary">{peso.format(value)}</span>
    </div>
  );
}

function QuoteView({ quote, scheduleName, draft }: { quote: Quote; scheduleName: string; draft: boolean }) {
  const t = quote.tax;
  const c = quote.catchUp;
  const annual = quote.notIncluded.filter((n) => n.group === "annual");
  const adHoc = quote.notIncluded.filter((n) => n.group === "ad_hoc");
  const audit = quote.notIncluded.filter((n) => n.group === "audit");
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-body-medium text-text-secondary">Monthly retainer{draft ? " (DRAFT)" : ""}</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(quote.monthlyRetainer)}</p>
          <p className="mt-2 text-body-regular text-text-secondary">
            {quote.overCap ? `Above the monthly cap of ${peso.format(quote.monthlyCap ?? 0)}: the prospect sees no price; it is quoted in the proposal.` : quote.minimumTopUp > 0 ? "Minimum retainer applies." : quote.monthlyCap !== null ? `Every month. Monthly cap ${peso.format(quote.monthlyCap)}.` : "Every month. No monthly cap."}
          </p>
        </Card>
        <Card>
          <p className="text-body-medium text-text-secondary">Catch-up, one time{draft ? " (DRAFT)" : ""}</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{c ? (c.amount === null ? "On request" : peso.format(c.amount)) : "—"}</p>
          <p className="mt-2 text-body-regular text-text-secondary">
            {c ? (c.factor === null ? `${c.months} month${c.months === 1 ? "" : "s"} behind, quoted on request.` : `${c.months} month${c.months === 1 ? "" : "s"} × ${c.factor} × monthly retainer.`) : "Not behind."}
          </p>
        </Card>
      </div>

      {(quote.outdatedSchedule || quote.missingPrices.length > 0 || quote.customQuote.length > 0) && (
        <Notice tone="waiting">
          {quote.outdatedSchedule && <p>This schedule is from before 26 Nov 2026: bookkeeping (G) is not priced. Start a new version to move it to the new structure.</p>}
          {quote.missingPrices.length > 0 && (
            <p>Not priced yet, left out of the totals: {quote.missingPrices.map((l) => (l.band ? `${l.label} (${l.band})` : l.label)).join("; ")}.</p>
          )}
          {quote.customQuote.length > 0 && <p>Quoted on request: {quote.customQuote.map((x) => (x.band ? `${x.label} (${x.band})` : x.label)).join("; ")}.</p>}
        </Notice>
      )}

      <Card title="Monthly">
        {quote.monthly.length ? <Lines lines={quote.monthly} /> : <p className="text-body-regular text-text-secondary">Nothing monthly applies.</p>}
        {quote.minimumTopUp > 0 && (
          <div className="flex items-center justify-between gap-4 border-t border-separator-border py-2 text-body-regular">
            <span className="text-text-primary">Up to the minimum monthly retainer</span>
            <span className="amount tabular-nums text-text-primary">{peso.format(quote.minimumTopUp)}</span>
          </div>
        )}
        <Total label="Monthly retainer" value={quote.monthlyRetainer} strong />
        {!t.inclusive && <Total label={`Monthly with ${t.kind === "vat_12" ? "VAT" : "percentage tax"}`} value={t.monthlyWithTax} />}
        {c && c.amount !== null && (
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-separator-border pt-3 text-body-regular">
            <span className="text-text-primary">Catch-up, one time · {c.months} × {peso.format(c.perMonth ?? 0)}</span>
            <span className="amount tabular-nums text-text-primary">{peso.format(c.amount)}</span>
          </div>
        )}
        <ul className="mt-5 space-y-2 text-body-regular text-text-secondary">
          <li>{t.note} {t.inclusive ? `Of the monthly retainer, ${peso.format(t.monthly)} is that tax.` : `That is ${peso.format(t.monthly)} on the monthly retainer.`}</li>
          <li>{quote.ewtNote}</li>
          {quote.lateSurcharge && (
            <li>Documents sent after the monthly cutoff: {peso.format(quote.lateSurcharge.amount)} for that month{quote.lateSurcharge.auto ? "." : ", charged after our review."}</li>
          )}
          <li>Quote dated {longDate(quote.quoteDate)}, valid until {longDate(quote.validUntil)}. From “{scheduleName}”{draft ? " (DRAFT)" : ""}.</li>
        </ul>
      </Card>

      {quote.notIncluded.length > 0 && (
        <Card title="Not included in this quote">
          <p className="text-body-regular text-text-secondary">{NOT_INCLUDED_NOTE}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[["Annual jobs", annual], ["Ad hoc jobs", adHoc], ["Audit (separate engagement)", audit]].filter(([, list]) => (list as typeof annual).length > 0).map(([title, list]) => (
              <div key={title as string}>
                <p className="text-body-medium text-text-primary">{title as string}</p>
                <ul className="mt-1 space-y-1 text-body-regular text-text-secondary">
                  {(list as typeof annual).map((n) => <li key={n.code}>{notIncludedName(n)}{n.onRequest ? " · on request" : ""}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
