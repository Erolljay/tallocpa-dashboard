"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { ordinal } from "@/lib/deadlines/describe";
import type { DueRule } from "@/lib/deadlines/engine";
import { addHolidayAction, removeHolidayAction, updateRuleAction, type SettingsState } from "./actions";

const periodWord = { monthly: "month", quarterly: "quarter", annual: "year" } as const;

export function RuleEditor(props: {
  ruleId: string;
  form: string;
  frequency: "monthly" | "quarterly" | "annual";
  due: DueRule;
  effectiveFrom: string;
  source: string;
  verified: boolean;
  isEfps: boolean;
}) {
  const [state, action, pending] = useActionState(updateRuleAction.bind(null, props.ruleId), {} as SettingsState);
  const [kind, setKind] = useState(props.due.kind);
  const e = state.fieldErrors ?? {};
  const p = periodWord[props.frequency];
  const id = (name: string) => `${props.ruleId}-${name}`;

  return (
    <details className="group">
      <summary className="cursor-pointer list-none text-body-regular text-button-ghost-foreground hover:underline">Edit</summary>
      <form action={action} className="mt-3 grid gap-3 rounded-3xl border border-border-button-default bg-background-secondary-default p-4 sm:grid-cols-2">
        <Field label="Due" htmlFor={id("due_kind")}>
          <Select id={id("due_kind")} name="due_kind" value={kind} onChange={(ev) => setKind(ev.target.value as DueRule["kind"])}>
            <option value="day_of_month_after">A day of a month after the {p}</option>
            <option value="days_after">A number of days after the {p} ends</option>
          </Select>
        </Field>
        {kind === "day_of_month_after" ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Day" htmlFor={id("day")} error={e.day}>
              <Select id={id("day")} name="day" defaultValue={props.due.kind === "day_of_month_after" ? String(props.due.day) : "10"}>
                {Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{ordinal(i + 1)}</option>)}
                <option value="last">Last day</option>
              </Select>
            </Field>
            <Field label="Of the" htmlFor={id("months_after")}>
              <Select id={id("months_after")} name="months_after" defaultValue={props.due.kind === "day_of_month_after" ? String(props.due.monthsAfter) : "1"}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i === 0 ? `month after the ${p}` : `${ordinal(i + 1)} month after`}</option>
                ))}
              </Select>
            </Field>
          </div>
        ) : (
          <Field label="Days after" htmlFor={id("days")} error={e.days}>
            <Input id={id("days")} name="days" type="number" min={1} max={366} defaultValue={props.due.kind === "days_after" ? props.due.days : 60} />
          </Field>
        )}
        <Field label="Applies to periods ending on or after" htmlFor={id("applies_from")} hint="Keep this date to correct the rule. Pick a later date for a new BIR issuance: earlier periods keep the old deadline." error={e.applies_from}>
          <Input id={id("applies_from")} name="applies_from" type="date" required defaultValue={props.effectiveFrom} />
        </Field>
        <Field label="BIR issuance" htmlFor={id("source")} hint="e.g. RR 8-2024, RMC 12-2026" error={e.source}>
          <Input id={id("source")} name="source" defaultValue={props.source === "UNVERIFIED" ? "" : props.source} />
        </Field>
        <label className="flex items-center gap-2 text-body-regular text-text-primary">
          <input type="checkbox" name="verified" defaultChecked={props.verified} className="size-4" />
          I checked this against the issuance
        </label>
        {props.isEfps && (
          <label className="flex items-center gap-2 text-body-regular text-text-primary">
            <input type="checkbox" name="all_efps_groups" className="size-4" />
            Use this deadline for all eFPS groups of {props.form}
          </label>
        )}
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save rule"}</Button>
          {(state.ok || state.error) && <Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice>}
        </div>
      </form>
    </details>
  );
}

export function HolidayForm() {
  const [state, action, pending] = useActionState(addHolidayAction, {} as SettingsState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-3 border-t border-separator-border pt-4 sm:grid-cols-[10rem_1fr_10rem_10rem_auto] sm:items-end">
      <Field label="Date" htmlFor="h_date" error={e.date}>
        <Input id="h_date" name="date" type="date" required />
      </Field>
      <Field label="Name" htmlFor="h_name" error={e.name}>
        <Input id="h_name" name="name" required placeholder="Eid'l Fitr" />
      </Field>
      <Field label="Kind" htmlFor="h_kind">
        <Select id="h_kind" name="kind" defaultValue="regular">
          <option value="regular">Regular holiday</option>
          <option value="special">Special non-working</option>
          <option value="suspension">Work suspension</option>
        </Select>
      </Field>
      <Field label="Proclamation" htmlFor="h_source">
        <Input id="h_source" name="source" placeholder="Proc. No. …" />
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Adding…" : "Add"}</Button>
      {(state.ok || state.error) && <div className="sm:col-span-5"><Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice></div>}
    </form>
  );
}

export function RemoveHolidayButton({ date }: { date: string }) {
  const [state, action, pending] = useActionState(async () => removeHolidayAction(date), {} as SettingsState);
  return (
    <form action={action}>
      <button type="submit" disabled={pending} className="text-caption-1-regular text-text-error-primary hover:underline">{pending ? "Removing…" : "Remove"}</button>
      {state.error && <span className="ml-2 text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
