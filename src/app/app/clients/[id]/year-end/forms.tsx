"use client";

import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import type { CheckItem } from "@/lib/year-end/checklist";
import { setYearEndCheckAction, type FormState } from "./actions";

/** Tick a step (with an optional note), or clear a ticked one. */
export function TickForm({ clientId, yearEnd, item, done }: { clientId: string; yearEnd: string; item: CheckItem; done: boolean }) {
  const [state, action, pending] = useActionState(setYearEndCheckAction.bind(null, clientId, yearEnd, item, !done), {} as FormState);
  const [open, setOpen] = useState(false);
  if (done) {
    return (
      <form action={action} className="flex items-center gap-2">
        <Button type="submit" size="sm" variant="ghost" disabled={pending}>{pending ? "Clearing…" : "Clear"}</Button>
        {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
      </form>
    );
  }
  if (!open) return <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Mark done</Button>;
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor={`note-${item}`}>Note</label>
      <Input id={`note-${item}`} name="note" placeholder="Note (optional)" maxLength={500} className="w-56" />
      <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : "Done"}</Button>
      <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
