"use client";

import { useActionState } from "react";
import { Button, Field, Notice, Textarea } from "@/components/ui";
import { amendFilingAction, type SignOffState } from "./actions";

/** Starts an amended return of this filed one: a new filing of the same period through the sign-off chain. */
export function AmendFilingForm({ filingId }: { filingId: string }) {
  const [state, action, pending] = useActionState(amendFilingAction.bind(null, filingId), {} as SignOffState);
  return (
    <form action={action} className="space-y-3">
      <Field label="Reason for the amended return" htmlFor="amend_reason" hint="The filed return stays on record; the amended one goes through preparation, review and approvals again.">
        <Textarea id="amend_reason" name="reason" required rows={2} />
      </Field>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Starting…" : "Start the amended return"}</Button>
    </form>
  );
}
