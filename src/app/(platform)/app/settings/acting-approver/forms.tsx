"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { appointActingAction, endActingAction, type ActingState } from "./actions";

export function AppointForm({ reviewers, today }: { reviewers: { user_id: string; full_name: string }[]; today: string }) {
  const [state, action, pending] = useActionState(appointActingAction, {} as ActingState);
  const e = state.fieldErrors ?? {};
  if (reviewers.length === 0) {
    return <p className="text-body-regular text-text-secondary">Only a Reviewer can stand in for you. Make someone a Reviewer on the Staff page first.</p>;
  }
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field label="Reviewer" htmlFor="delegate_user_id" error={e.delegate_user_id}>
        <Select id="delegate_user_id" name="delegate_user_id" defaultValue="" required>
          <option value="" disabled>Choose…</option>
          {reviewers.map((r) => <option key={r.user_id} value={r.user_id}>{r.full_name}</option>)}
        </Select>
      </Field>
      <Field label="Approval limit (₱ tax due per return)" htmlFor="max_tax_due" hint="Returns with more tax due wait for you." error={e.max_tax_due}>
        <Input id="max_tax_due" name="max_tax_due" type="number" min={0} step="0.01" required className="text-end tabular-nums" />
      </Field>
      <Field label="First day" htmlFor="from" error={e.from}>
        <Input id="from" name="from" type="date" min={today} defaultValue={today} required />
      </Field>
      <Field label="Last day" htmlFor="to" hint="They can approve until the end of this day." error={e.to}>
        <Input id="to" name="to" type="date" min={today} required />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Reason" htmlFor="reason" error={e.reason}>
          <Input id="reason" name="reason" placeholder="On leave 1–7 Dec" maxLength={200} required />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Name acting approver"}</Button>
        {(state.ok || (state.error && !state.fieldErrors)) && <Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice>}
      </div>
    </form>
  );
}

export function EndButton({ id, upcoming }: { id: string; upcoming: boolean }) {
  const [state, action, pending] = useActionState(async () => endActingAction(id), {} as ActingState);
  return (
    <form action={action} className="flex items-center gap-2">
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Ending…" : upcoming ? "Cancel" : "End now"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
