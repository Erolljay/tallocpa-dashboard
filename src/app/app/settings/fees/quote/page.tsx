import Link from "next/link";
import { Suspense } from "react";
import { Badge, Button, Card, Field, Input, Notice, PageHeader, peso, Select, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { TAXPAYER_TYPES } from "@/lib/clients/obligations";
import { manilaToday } from "@/lib/filings/run";
import { profileFromQuery } from "@/lib/fees/params";
import { buildQuote, type Quote, type QuoteLine } from "@/lib/fees/quote";
import { itemName, toSettings } from "@/lib/fees/schedule";
import { COMPLEXITY_FLAGS, type ClientProfile, type FeeItem } from "@/lib/fees/types";
import { supabaseServer } from "@/lib/supabase/server";
import { loadItems, loadSchedules, loadTaxOnFee, longDate } from "../data";

export default function QuotePreviewPage(props: PageProps<"/app/settings/fees/quote">) {
  return (
    <>
      <PageHeader
        title="Quote preview"
        description={
          <>
            Work out what a new client would pay. Nothing is saved; proposals come in Phase 2.{" "}
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
  const { profile } = profileFromQuery(q, items);
  const quote = buildQuote({ profile, items, settings: toSettings(schedule), taxOnFee, quoteDate: manilaToday() });
  const isDraft = schedule.status === "draft";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start">
      <Card title="Client">
        <ProfileForm profile={profile} items={items} scheduleId={schedule.id} schedules={schedules.map((s) => ({ id: s.id, label: `${s.name}${s.status === "draft" ? " (draft)" : ""}` }))} />
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

function ProfileForm({ profile, items, scheduleId, schedules }: { profile: ClientProfile; items: FeeItem[]; scheduleId: string; schedules: { id: string; label: string }[] }) {
  const annual = items.filter((i) => i.billing === "annual");
  const oneTime = items.filter((i) => i.billing === "one_time" || (i.billing === "multiplier" && i.conditions.of === "monthly_retainer"));
  const qty = new Map(profile.oneTimeItems.map((o) => [o.code, o.quantity]));
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
          <option value="rental">Rental only</option>
          <option value="tamp_regular">TAMP or regular</option>
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
        <Field label="Bookkeeping" htmlFor="qp-books">
          <Select id="qp-books" name="bookkeeping" defaultValue={profile.bookkeeping}>
            <option value="none">None</option>
            <option value="light">Light</option>
            <option value="standard">Standard</option>
            <option value="heavy">Heavy</option>
          </Select>
        </Field>
        <Field label="Branches" htmlFor="qp-branches">
          <Input id="qp-branches" name="branches" type="number" min={0} defaultValue={profile.branches} className="tabular-nums" />
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
      {annual.length > 0 && (
        <fieldset className="space-y-1.5">
          <legend className="text-body-medium text-text-primary">Annual package</legend>
          {annual.map((i) => (
            <label key={i.code} className="flex items-start gap-2 text-body-regular text-text-primary">
              <input type="checkbox" name="annual" value={i.code} defaultChecked={profile.annualItems.includes(i.code)} className={`${checkbox} mt-0.5`} /> {itemName(i)}
            </label>
          ))}
        </fieldset>
      )}
      {oneTime.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="text-body-medium text-text-primary">One-time and other work</legend>
          {oneTime.map((i) => (
            <div key={i.code} className="flex items-center justify-between gap-3">
              <label htmlFor={`qp-${i.code}`} className="min-w-0 flex-1 text-body-regular text-text-primary">
                {itemName(i)}
                {i.unit === "month" && <span className="block text-caption-1-regular text-text-tertiary">Months behind</span>}
                {i.isCustomQuote && <span className="block text-caption-1-regular text-text-tertiary">Price on request</span>}
              </label>
              <Input id={`qp-${i.code}`} name={`once.${i.code}`} type="number" min={0} defaultValue={qty.get(i.code) ?? 0} className="w-20 text-end tabular-nums" />
            </div>
          ))}
        </fieldset>
      )}
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
            {l.quantity !== 1 && l.unitPrice !== null && l.billing !== "multiplier" && (
              <span className="block text-caption-1-regular text-text-tertiary">{l.quantity} × {peso.format(l.unitPrice)}</span>
            )}
            {l.billing === "multiplier" && l.unitPrice !== null && (
              <span className="block text-caption-1-regular text-text-tertiary">{l.code.startsWith("I.") ? `${l.quantity} month${l.quantity === 1 ? "" : "s"} × ${l.unitPrice} × monthly retainer` : `Bookkeeping × ${l.unitPrice}`}</span>
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
    <div className={`flex items-center justify-between gap-4 border-t border-separator-border pt-3 ${strong ? "text-headline-semibold" : "text-body-regular"}`}>
      <span className="text-text-primary">{label}</span>
      <span className="amount tabular-nums text-text-primary">{peso.format(value)}</span>
    </div>
  );
}

function QuoteView({ quote, scheduleName, draft }: { quote: Quote; scheduleName: string; draft: boolean }) {
  const t = quote.tax;
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-body-medium text-text-secondary">Monthly retainer{draft ? " (DRAFT)" : ""}</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(quote.monthlyRetainer)}</p>
          <p className="mt-2 text-body-regular text-text-secondary">{quote.minimumTopUp > 0 ? "Minimum retainer applies." : "Every month."}</p>
        </Card>
        <Card>
          <p className="text-body-medium text-text-secondary">First-year total{draft ? " (DRAFT)" : ""}</p>
          <p className="mt-2 text-title-1-semibold tabular-nums text-text-primary">{peso.format(quote.firstYearTotal)}</p>
          <p className="mt-2 text-body-regular text-text-secondary">12 × monthly + annual package + one-time.</p>
        </Card>
      </div>

      {(quote.missingPrices.length > 0 || quote.customQuote.length > 0 || quote.unknownCodes.length > 0) && (
        <Notice tone="waiting">
          {quote.missingPrices.length > 0 && (
            <p>Not priced yet, left out of the totals: {quote.missingPrices.map((l) => (l.band ? `${l.label} (${l.band})` : l.label)).join("; ")}.</p>
          )}
          {quote.customQuote.length > 0 && (
            <p className={quote.missingPrices.length ? "mt-1" : ""}>Needs a custom quote: {quote.customQuote.map((c) => (c.band ? `${c.label} (${c.band})` : c.label)).join("; ")}.</p>
          )}
          {quote.unknownCodes.length > 0 && <p className="mt-1">Not in this schedule: {quote.unknownCodes.join(", ")}.</p>}
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
      </Card>

      <Card title="Annual package">
        {quote.annual.length ? <Lines lines={quote.annual} /> : <p className="text-body-regular text-text-secondary">None chosen.</p>}
        <Total label="Annual package" value={quote.annualTotal} />
      </Card>

      {quote.oneTime.length > 0 && (
        <Card title="One-time">
          <Lines lines={quote.oneTime} />
          <Total label="One-time" value={quote.oneTimeTotal} />
        </Card>
      )}

      <Card title="First year">
        <div className="space-y-3">
          <div className="flex justify-between gap-4 text-body-regular"><span className="text-text-secondary">12 × {peso.format(quote.monthlyRetainer)}</span><span className="amount tabular-nums">{peso.format(Math.round(quote.monthlyRetainer * 1200) / 100)}</span></div>
          <div className="flex justify-between gap-4 text-body-regular"><span className="text-text-secondary">Annual package</span><span className="amount tabular-nums">{peso.format(quote.annualTotal)}</span></div>
          <div className="flex justify-between gap-4 text-body-regular"><span className="text-text-secondary">One-time</span><span className="amount tabular-nums">{peso.format(quote.oneTimeTotal)}</span></div>
          <Total label="First-year total" value={quote.firstYearTotal} strong />
          {!t.inclusive && <Total label={`First year with ${t.kind === "vat_12" ? "VAT" : "percentage tax"}`} value={t.firstYearWithTax} />}
        </div>
        <ul className="mt-5 space-y-2 text-body-regular text-text-secondary">
          <li>
            {t.note} {t.inclusive ? `Of the first-year total, ${peso.format(t.firstYear)} is that tax.` : `That is ${peso.format(t.monthly)} on the monthly retainer.`}
          </li>
          <li>{quote.ewtNote}</li>
          {quote.lateSurcharge && (
            <li>
              Documents sent after the monthly cutoff: {peso.format(quote.lateSurcharge.amount)} for that month{quote.lateSurcharge.auto ? "." : ", charged after our review."}
            </li>
          )}
          <li>
            Quote dated {longDate(quote.quoteDate)}, valid until {longDate(quote.validUntil)}. From “{scheduleName}”{draft ? " (DRAFT)" : ""}.
          </li>
        </ul>
      </Card>
    </>
  );
}
