import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, peso, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { itemName, toSettings, unpricedItems } from "@/lib/fees/schedule";
import { COMPONENTS, type ComponentLetter } from "@/lib/fees/types";
import { supabaseServer } from "@/lib/supabase/server";
import { loadItems, loadSchedule, loadTaxOnFee, longDate, statusLabel, statusTone } from "../data";
import { ActivateForm, DeleteDraftButton, PricesForm, ScheduleSettingsForm } from "../forms";

export default function FeeScheduleEditorPage(props: PageProps<"/app/settings/fees/[id]">) {
  return (
    <Suspense fallback={<Skeleton rows={12} />}>
      <Editor params={props.params} />
    </Suspense>
  );
}

const TAX_LABEL = { percentage_tax_3: "3% percentage tax (non-VAT)", vat_12: "12% VAT" } as const;

async function Editor({ params }: Pick<PageProps<"/app/settings/fees/[id]">, "params">) {
  const { id } = await params;
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const schedule = await loadSchedule(supabase, id);
  if (!schedule || schedule.brand_id !== owner.staff.brandId) notFound();
  const [items, taxOnFee] = await Promise.all([loadItems(supabase, id), loadTaxOnFee(supabase, owner.staff.brandId)]);
  const settings = toSettings(schedule);
  const draft = schedule.status === "draft";
  const unpriced = unpricedItems(items).map(itemName);

  return (
    <>
      <PageHeader
        title={schedule.name}
        description={
          <>
            <Badge tone={statusTone[schedule.status]}>{statusLabel[schedule.status]}</Badge>{" "}
            Takes effect {longDate(schedule.effective_from)}.{" "}
            {draft ? "Enter prices, then activate. Nothing here reaches clients until it is active." : "This schedule can no longer be edited. To change prices, start a new version."}{" "}
            <Link href="/app/settings/fees" className="text-button-ghost-foreground hover:underline">All schedules</Link>
          </>
        }
        actions={<LinkButton href={`/app/settings/fees/quote?schedule=${schedule.id}`} variant="secondary">Preview a quote</LinkButton>}
      />

      {draft ? (
        <div className="space-y-6">
          <Card title="Schedule settings">
            <ScheduleSettingsForm
              scheduleId={schedule.id}
              taxLabel={TAX_LABEL[taxOnFee]}
              values={{
                name: schedule.name,
                effective_from: schedule.effective_from,
                prices_include_tax: settings.pricesIncludeTax,
                quote_valid_days: settings.quoteValidDays,
                minimum_monthly_retainer: settings.minimumMonthlyRetainer,
                late_surcharge_amount: settings.lateSurchargeAmount,
                late_surcharge_auto: settings.lateSurchargeAuto,
                notes: schedule.notes,
              }}
            />
          </Card>

          <PricesForm
            scheduleId={schedule.id}
            rows={items.map((i) => ({ id: i.id, component: i.component, label: i.label, band: i.band, billing: i.billing, unit: i.unit, isCustomQuote: i.isCustomQuote, price: i.price }))}
          />

          <Card title="Activate">
            <ActivateForm scheduleId={schedule.id} unpriced={unpriced} />
          </Card>

          <DeleteDraftButton scheduleId={schedule.id} />
        </div>
      ) : (
        <ReadOnly items={items} settings={settings} taxLabel={TAX_LABEL[taxOnFee]} notes={schedule.notes} />
      )}
    </>
  );
}

function ReadOnly({ items, settings, taxLabel, notes }: { items: Awaited<ReturnType<typeof loadItems>>; settings: ReturnType<typeof toSettings>; taxLabel: string; notes: string | null }) {
  const groups = new Map<ComponentLetter, typeof items>();
  for (const i of items) groups.set(i.component, [...(groups.get(i.component) ?? []), i]);
  const show = (i: (typeof items)[number]) => {
    if (i.isCustomQuote) return "On request";
    if (i.price === null) return "—";
    return i.billing === "multiplier" ? `× ${i.price}` : peso.format(i.price);
  };
  return (
    <div className="space-y-6">
      <Card title="Schedule settings">
        <dl className="grid gap-x-6 gap-y-3 text-body-regular sm:grid-cols-2">
          <div><dt className="text-text-secondary">Tax on our fee</dt><dd className="text-text-primary">{taxLabel}, {settings.pricesIncludeTax ? "included in prices" : "added on top"}</dd></div>
          <div><dt className="text-text-secondary">Quotes valid for</dt><dd className="text-text-primary">{settings.quoteValidDays} days</dd></div>
          <div><dt className="text-text-secondary">Minimum monthly retainer</dt><dd className="amount text-start text-text-primary">{settings.minimumMonthlyRetainer === null ? "None" : peso.format(settings.minimumMonthlyRetainer)}</dd></div>
          <div>
            <dt className="text-text-secondary">Late-submission surcharge</dt>
            <dd className="text-text-primary">{settings.lateSurchargeAmount === null ? "None" : `${peso.format(settings.lateSurchargeAmount)} a month, ${settings.lateSurchargeAuto ? "added automatically" : "after Owner approval"}`}</dd>
          </div>
          {notes && <div className="sm:col-span-2"><dt className="text-text-secondary">Notes</dt><dd className="whitespace-pre-line text-text-primary">{notes}</dd></div>}
        </dl>
      </Card>
      {[...groups.entries()].map(([letter, list]) => (
        <Card key={letter} title={`${letter}. ${COMPONENTS[letter].title}`}>
          <ul className="divide-y divide-separator-border text-body-regular">
            {list.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-4 py-2">
                <span className="min-w-0 flex-1 text-text-primary">{itemName(i)}</span>
                <span className="amount shrink-0 tabular-nums text-text-primary">{show(i)}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
      {items.length === 0 && <Notice tone="waiting">This schedule has no items.</Notice>}
    </div>
  );
}
