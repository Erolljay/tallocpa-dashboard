"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { createRequestAction, type RequestFormState } from "@/lib/requests/actions";

/**
 * Ask a client for something. With `stepId`, the request is for a registration
 * step: the client and the step are fixed and the step goes to "Waiting on client".
 */
export function NewRequestForm({ clients, clientId, stepId, defaultSubject, compact = false }: {
  clients?: { id: string; name: string }[];
  clientId?: string;
  stepId?: string;
  defaultSubject?: string;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState(createRequestAction, {} as RequestFormState);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) form.current?.reset();
  }, [state]);
  const e = state.fieldErrors ?? {};
  const id = (f: string) => `${stepId ?? "new"}-${f}`;
  return (
    <form ref={form} action={action} className="grid gap-3 sm:grid-cols-2">
      {clientId ? (
        <input type="hidden" name="client_id" value={clientId} />
      ) : (
        <div className="sm:col-span-2">
          <Field label="Client" htmlFor={id("client_id")} error={e.client_id}>
            <Select id={id("client_id")} name="client_id" defaultValue="" required>
              <option value="" disabled>Choose…</option>
              {(clients ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>
        </div>
      )}
      {stepId && <input type="hidden" name="step_id" value={stepId} />}
      <div className="sm:col-span-2">
        <Field label="What we need" htmlFor={id("subject")} error={e.subject}>
          <Input id={id("subject")} name="subject" required defaultValue={defaultSubject} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Message" htmlFor={id("body")} error={e.body} hint="The client sees this in the portal under Requests.">
          <Textarea id={id("body")} name="body" rows={compact ? 2 : 3} />
        </Field>
      </div>
      <Field label="Needed by" htmlFor={id("due_date")} error={e.due_date}>
        <Input id={id("due_date")} name="due_date" type="date" />
      </Field>
      <div className="flex items-end justify-end">
        <Button type="submit" variant={compact ? "secondary" : "primary"} disabled={pending}>{pending ? "Sending…" : "Send request"}</Button>
      </div>
      {state.ok && <div className="sm:col-span-2"><Notice tone="done">Sent. The client sees it in the portal under Requests.</Notice></div>}
      {state.error && !state.fieldErrors && <div className="sm:col-span-2"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}
