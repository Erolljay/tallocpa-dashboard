"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { openTicketAction, type RequestFormState } from "@/lib/requests/actions";

/** A client asks the firm something. */
export function TicketForm({ clients }: { clients: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(openTicketAction, {} as RequestFormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="flex flex-col gap-3">
      {clients.length > 1 ? (
        <Field label="Business" htmlFor="ticket-client">
          <Select id="ticket-client" name="client_id" defaultValue={clients[0]?.id}>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
      ) : (
        <input type="hidden" name="client_id" value={clients[0]?.id ?? ""} />
      )}
      <Field label="Subject" htmlFor="ticket-subject" error={e.subject}>
        <Input id="ticket-subject" name="subject" required placeholder="e.g. When will my permit be ready?" />
      </Field>
      <Field label="Message" htmlFor="ticket-body" error={e.body}>
        <Textarea id="ticket-body" name="body" rows={3} required />
      </Field>
      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>{pending ? "Sending…" : "Send"}</Button>
      </div>
      {state.error && !state.fieldErrors && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
