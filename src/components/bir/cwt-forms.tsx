"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { markCwtFollowedUp, rematch2307, type CwtActionState } from "@/lib/books/cwt-actions";

/** Records that the customer was asked for a missing 2307, with an optional note. */
export function CwtFollowUpForm({ clientId, invoiceId, again }: { clientId: string; invoiceId: string; again?: boolean }) {
  const [state, run, pending] = useActionState(markCwtFollowedUp.bind(null, clientId, invoiceId), {} as CwtActionState);
  if (state.ok) return <span role="status" className="block text-caption-1-regular text-text-secondary">{state.ok}</span>;
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <label htmlFor={`fu-${invoiceId}`} className="sr-only">Follow-up note</label>
      <Input id={`fu-${invoiceId}`} name="note" autoComplete="off" placeholder="Note, e.g. emailed the customer" className="h-8 w-56 max-w-full" />
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Saving…" : again ? "Followed up again" : "Mark followed up"}</Button>
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** Runs the 2307's match against the Sales Invoices again. */
export function Rematch2307Button({ clientId, documentId }: { clientId: string; documentId: string }) {
  const [state, run, pending] = useActionState(async () => rematch2307(clientId, documentId), {} as CwtActionState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Matching…" : "Match again"}</Button>
      {state.ok && <span role="status" className="text-caption-1-regular text-text-secondary">{state.ok}</span>}
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
