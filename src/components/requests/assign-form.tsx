"use client";

import { useActionState } from "react";
import { Button, Field, Notice, Select } from "@/components/ui";
import { assignRequestAction, type RequestFormState } from "@/lib/requests/actions";
import { PRIORITIES, PRIORITY_KEYS, type Priority } from "@/lib/tasks/labels";

/** Who answers for a request or ticket, and its priority. */
export function AssignRequestForm({ requestId, staff, assignee, priority }: {
  requestId: string;
  staff: { user_id: string; full_name: string }[];
  assignee: string | null;
  priority: Priority;
}) {
  const [state, action, pending] = useActionState(assignRequestAction, {} as RequestFormState);
  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="request_id" value={requestId} />
      <Field label="Answers for it" htmlFor={`${requestId}-assignee`} error={state.fieldErrors?.assignee}>
        <Select id={`${requestId}-assignee`} name="assignee" defaultValue={assignee ?? ""} required>
          <option value="" disabled>Choose…</option>
          {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
        </Select>
      </Field>
      <Field label="Priority" htmlFor={`${requestId}-priority`}>
        <Select id={`${requestId}-priority`} name="priority" defaultValue={priority}>
          {PRIORITY_KEYS.map((p) => <option key={p} value={p}>{PRIORITIES[p]}</option>)}
        </Select>
      </Field>
      <div className="flex justify-end">
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      </div>
      {state.ok && <Notice tone="done">Saved. A new person is notified.</Notice>}
      {state.error && !state.fieldErrors && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
