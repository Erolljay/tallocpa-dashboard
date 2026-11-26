"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice } from "@/components/ui";
import { generatePastFilingsAction, type GenerateState } from "@/app/app/deadlines/actions";

/** Owner: create this client's returns for past periods, e.g. to rehearse 2026 on its actual data. */
export function PastReturnsForm({ clientId, defaultMonth }: { clientId: string; defaultMonth: string }) {
  const [state, action, pending] = useActionState(generatePastFilingsAction.bind(null, clientId), {} as GenerateState);
  return (
    <form action={action} className="space-y-3">
      <p className="text-body-regular text-text-secondary">
        Returns are made automatically only for deadlines from 60 days back. To work on earlier periods (for example the whole of 2026 on the client&rsquo;s actual data), create them here from the first month. Returns that already exist are left as they are; each still waits for its months to be locked.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <Field label="From the period of" htmlFor="from_month">
          <Input id="from_month" name="from_month" type="month" required defaultValue={defaultMonth} className="w-44" />
        </Field>
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Creating…" : "Create past returns"}</Button>
      </div>
      {(state.message || state.error) && <Notice tone={state.error ? "blocked" : "done"}>{state.error ?? state.message}</Notice>}
    </form>
  );
}
