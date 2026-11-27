"use client";

import { useActionState, useId, useState } from "react";
import { Button, Field, Notice, Textarea } from "@/components/ui";
import { MAX_CANCEL_REASON } from "@/lib/calendar/cancel";

export type CancelState = { ok?: string; error?: string };

/**
 * Cancel a booked call or meeting, with an optional reason. A first click opens the
 * form, so nothing is cancelled by a stray tap. The server action does the rest.
 */
export function CancelBooking({
  action,
  label = "Cancel",
  confirmLabel = "Cancel the meeting",
  reasonHint = "Optional. It goes in the cancellation notice.",
}: {
  action: (state: CancelState, form: FormData) => Promise<CancelState>;
  label?: string;
  confirmLabel?: string;
  reasonHint?: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, submit, pending] = useActionState(action, {} as CancelState);
  const id = useId();

  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  if (!open) {
    return (
      <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(true)}>
        {label}
      </Button>
    );
  }
  return (
    <form action={submit} className="w-full space-y-3">
      <Field label="Reason" htmlFor={`${id}-reason`} hint={reasonHint}>
        <Textarea id={`${id}-reason`} name="reason" rows={2} maxLength={MAX_CANCEL_REASON} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" size="sm" variant="danger" disabled={pending}>
          {pending ? "Cancelling…" : confirmLabel}
        </Button>
        <Button type="button" size="sm" variant="ghost" disabled={pending} onClick={() => setOpen(false)}>
          Keep it
        </Button>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
