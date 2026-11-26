"use client";

import { useActionState, useMemo, useState, useTransition } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { PRICE_SECTIONS, priceSection } from "@/lib/fees/sections";
import { COMPONENTS, type ComponentLetter } from "@/lib/fees/types";
import {
  activateAction,
  createFromTemplateAction,
  deleteDraftAction,
  saveSettingsAction,
  savePricesAction,
  startNewVersionAction,
  type FeeFormState,
} from "./actions";

function Result({ state }: { state: FeeFormState }) {
  if (state.error) {
    return (
      <Notice tone="blocked">
        {state.error}
        {state.unpriced && state.unpriced.length > 0 && (
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {state.unpriced.map((u) => <li key={u}>{u}</li>)}
          </ul>
        )}
      </Notice>
    );
  }
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

function NewDraftForm({ action, label, defaultName, defaultDate, hint }: { action: typeof createFromTemplateAction; label: string; defaultName: string; defaultDate: string; hint: string }) {
  const [state, run, pending] = useActionState(action, {} as FeeFormState);
  const id = label.replace(/\W+/g, "-").toLowerCase();
  return (
    <details className="rounded-xl border border-separator-border">
      <summary className="cursor-pointer list-none px-4 py-3 text-body-medium text-button-ghost-foreground hover:underline">{label}</summary>
      <form action={run} className="grid gap-3 border-t border-separator-border bg-background-secondary-default p-4 sm:grid-cols-2">
        <p className="text-body-regular text-text-secondary sm:col-span-2">{hint}</p>
        <Field label="Name" htmlFor={`${id}-name`}>
          <Input id={`${id}-name`} name="name" defaultValue={defaultName} required />
        </Field>
        <Field label="Takes effect" htmlFor={`${id}-date`}>
          <Input id={`${id}-date`} name="effective_from" type="date" defaultValue={defaultDate} required />
        </Field>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <Button type="submit" disabled={pending}>{pending ? "Creating…" : label}</Button>
          <Result state={state} />
        </div>
      </form>
    </details>
  );
}

export function CreateFromTemplateForm({ defaultDate }: { defaultDate: string }) {
  return (
    <NewDraftForm
      action={createFromTemplateAction}
      label="Create draft from template"
      defaultName={`Fee schedule ${defaultDate.slice(0, 4)}`}
      defaultDate={defaultDate}
      hint="Adds every component and band of the draft structure (spec Appendix A) with no prices. You enter the prices, then activate."
    />
  );
}

export function StartNewVersionForm({ defaultDate, activeName }: { defaultDate: string; activeName: string }) {
  return (
    <NewDraftForm
      action={startNewVersionAction}
      label="Start new version"
      defaultName={`Fee schedule from ${defaultDate}`}
      defaultDate={defaultDate}
      hint={`Copies “${activeName}” with its prices into a new draft. It must take effect after the current schedule; activating it retires the current one. Existing clients keep their fees until their renewal.`}
    />
  );
}

export interface SettingsValues {
  name: string;
  effective_from: string;
  prices_include_tax: boolean;
  quote_valid_days: number;
  minimum_monthly_retainer: number | null;
  late_surcharge_amount: number | null;
  late_surcharge_auto: boolean;
  monthly_cap: number | null;
  catch_up_factor: number | null;
  notes: string | null;
}

export function ScheduleSettingsForm({ scheduleId, values, taxLabel }: { scheduleId: string; values: SettingsValues; taxLabel: string }) {
  const [state, run, pending] = useActionState(saveSettingsAction.bind(null, scheduleId), {} as FeeFormState);
  return (
    <form action={run} className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="fs-name">
        <Input id="fs-name" name="name" defaultValue={values.name} required />
      </Field>
      <Field label="Takes effect" htmlFor="fs-date">
        <Input id="fs-date" name="effective_from" type="date" defaultValue={values.effective_from} required />
      </Field>
      <Field label="Prices include tax on our fee" htmlFor="fs-tax" hint={`Our fee is currently subject to ${taxLabel}.`}>
        <Select id="fs-tax" name="prices_include_tax" defaultValue={values.prices_include_tax ? "1" : "0"}>
          <option value="1">Yes, prices include it</option>
          <option value="0">No, it is added on top</option>
        </Select>
      </Field>
      <Field label="Quotes valid for (days)" htmlFor="fs-valid">
        <Input id="fs-valid" name="quote_valid_days" type="number" min={1} max={365} defaultValue={values.quote_valid_days} required className="tabular-nums" />
      </Field>
      <Field label="Minimum monthly retainer (₱)" htmlFor="fs-min" hint="Leave empty for no minimum.">
        <Input id="fs-min" name="minimum_monthly_retainer" inputMode="decimal" defaultValue={values.minimum_monthly_retainer ?? ""} className="text-end tabular-nums" />
      </Field>
      <Field label="Late-submission surcharge (₱ a month)" htmlFor="fs-late" hint="Component J. Leave empty for no surcharge.">
        <Input id="fs-late" name="late_surcharge_amount" inputMode="decimal" defaultValue={values.late_surcharge_amount ?? ""} className="text-end tabular-nums" />
      </Field>
      <Field label="Surcharge goes on the statement" htmlFor="fs-auto">
        <Select id="fs-auto" name="late_surcharge_auto" defaultValue={values.late_surcharge_auto ? "1" : "0"}>
          <option value="0">After I approve it</option>
          <option value="1">Automatically</option>
        </Select>
      </Field>
      <Field label="Monthly cap (₱)" htmlFor="fs-cap" hint="Above it the website quote shows no price: the business is quoted on request in the proposal. Empty for no cap.">
        <Input id="fs-cap" name="monthly_cap" inputMode="decimal" defaultValue={values.monthly_cap ?? ""} className="text-end tabular-nums" />
      </Field>
      <Field label="Catch-up factor" htmlFor="fs-catchup" hint="Per month behind, × the monthly retainer. 0.5 = half. Empty: catch-up on request.">
        <Input id="fs-catchup" name="catch_up_factor" inputMode="decimal" defaultValue={values.catch_up_factor ?? ""} className="text-end tabular-nums" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Notes (optional)" htmlFor="fs-notes">
          <Textarea id="fs-notes" name="notes" rows={2} defaultValue={values.notes ?? ""} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save Settings"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

export interface PriceRow {
  id: string;
  code: string;
  component: ComponentLetter;
  label: string;
  band: string | null;
  billing: string;
  unit: string | null;
  isCustomQuote: boolean;
  price: number | null;
}

const billingHint: Record<string, string> = {
  monthly: "a month",
  annual: "a year, in the proposal",
  one_time: "when done, in the proposal",
  per_unit_monthly: "a month each",
  multiplier: "factor",
};


/** Every price of a draft in one form, in sections and grouped by component; one Save for all. */
export function PricesForm({ scheduleId, rows }: { scheduleId: string; rows: PriceRow[] }) {
  const [state, run, pending] = useActionState(savePricesAction.bind(null, scheduleId), {} as FeeFormState);
  const [values, setValues] = useState(() => Object.fromEntries(rows.map((r) => [r.id, r.price === null ? "" : String(r.price)])));
  const sections = useMemo(
    () =>
      PRICE_SECTIONS.map((s) => {
        const map = new Map<ComponentLetter, PriceRow[]>();
        for (const r of rows.filter((x) => priceSection(x) === s.key)) map.set(r.component, [...(map.get(r.component) ?? []), r]);
        return { ...s, groups: [...map.entries()] };
      }).filter((s) => s.groups.length > 0),
    [rows],
  );
  const empty = rows.filter((r) => !r.isCustomQuote && priceSection(r) === "monthly" && (values[r.id] ?? "").trim() === "").length;

  return (
    <form action={run} className="space-y-6">
      {sections.map((section) => (
      <div key={section.key} className="space-y-4">
        <div>
          <h2 className="text-title-2-medium text-text-primary">{section.title}</h2>
          <p className="text-body-regular text-text-secondary">{section.hint}</p>
        </div>
      {section.groups.map(([letter, items]) => (
        <section key={letter} className="rounded-3xl border border-border-button-default bg-background-primary-default p-4 shadow-xs sm:p-6">
          {section.key !== "audit" && (
            <>
              <h3 className="text-title-3-semibold text-text-primary">
                <span className="text-text-tertiary">{letter}.</span> {COMPONENTS[letter].title}
              </h3>
              <p className="mb-3 text-body-regular text-text-secondary">{COMPONENTS[letter].hint}</p>
            </>
          )}
          <ul className="divide-y divide-separator-border">
            {items.map((r) => {
              const factor = r.billing === "multiplier";
              return (
                <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <label htmlFor={`p-${r.id}`} className="min-w-0 flex-1 text-body-regular">
                    <span className="block font-medium text-text-primary">{r.band ?? r.label}</span>
                    <span className="block text-caption-1-regular text-text-tertiary">
                      {r.band ? `${r.label} · ` : ""}
                      {factor ? (r.unit === "month" ? "× monthly retainer, per month" : "× bookkeeping fee") : `${billingHint[r.billing]}${r.unit && r.billing !== "multiplier" ? ` · per ${r.unit}` : ""}`}
                    </span>
                  </label>
                  {r.isCustomQuote ? (
                    <span className="shrink-0 rounded-full bg-background-tertiary-default px-3 py-1 text-caption-1-medium text-text-primary">Price on request</span>
                  ) : (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span aria-hidden className="w-3 text-end text-body-regular text-text-tertiary">{factor ? "×" : "₱"}</span>
                      <Input
                        id={`p-${r.id}`}
                        name={`price:${r.id}`}
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder={priceSection(r) === "monthly" ? "Not set" : "Optional"}
                        value={values[r.id] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [r.id]: e.target.value }))}
                        className="w-28 text-end tabular-nums sm:w-32"
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      </div>
      ))}
      <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center gap-3 border-t border-separator-border bg-background-primary-default/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save Prices"}</Button>
        <span className="text-body-regular text-text-secondary">{empty === 0 ? "Every monthly item has a price." : `${empty} monthly item${empty === 1 ? "" : "s"} without a price.`}</span>
        <Result state={state} />
      </div>
    </form>
  );
}

export function ActivateForm({ scheduleId, unpriced }: { scheduleId: string; unpriced: string[] }) {
  const [state, run, pending] = useActionState(activateAction.bind(null, scheduleId), {} as FeeFormState);
  return (
    <form action={run} className="space-y-3">
      {unpriced.length > 0 ? (
        <Notice tone="waiting">
          {unpriced.length} item{unpriced.length === 1 ? "" : "s"} still need{unpriced.length === 1 ? "s" : ""} a price before this schedule can be activated. Enter 0 for anything included at no charge.
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {unpriced.map((u) => <li key={u}>{u}</li>)}
          </ul>
        </Notice>
      ) : (
        <p className="text-body-regular text-text-secondary">Every item has a price. Activating makes this the schedule quotes use and retires the current one. An active schedule cannot be edited; you start a new version instead.</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Activating…" : "Activate"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

export function DeleteDraftButton({ scheduleId }: { scheduleId: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={pending}
        onClick={() => {
          if (!window.confirm("Delete this draft and its prices?")) return;
          start(async () => {
            const r = await deleteDraftAction(scheduleId);
            if (r?.error) setError(r.error);
          });
        }}
      >
        {pending ? "Deleting…" : "Delete Draft"}
      </Button>
      {error && <Notice tone="blocked">{error}</Notice>}
    </div>
  );
}
