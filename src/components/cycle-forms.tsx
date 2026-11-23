"use client";

import { useActionState, useState } from "react";
import { Button, Input, Select } from "@/components/ui";
import { closeCycleAction, decideExceptionAction, nothingToSubmitAction, type CycleState } from "@/lib/cycle/actions";
import { EXCEPTION_DECISIONS } from "@/lib/cycle/summary";

function Message({ state }: { state: CycleState }) {
  if (state.error) return <span role="alert" className="text-xs text-danger-text">{state.error}</span>;
  if (state.ok) return <span role="status" className="text-xs text-success">{state.ok}</span>;
  return null;
}

/** Closes a client's month after its cutoff; asks first, since unposted documents move on. */
export function CloseCycleButton({ clientId, period }: { clientId: string; period: string }) {
  const [state, run, pending] = useActionState(() => closeCycleAction(clientId, period), {} as CycleState);
  const [asking, setAsking] = useState(false);
  if (state.ok) return <Message state={state} />;
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {asking ? (
        <form action={run} className="flex items-center gap-2">
          <span className="text-xs text-ink-muted">Unposted documents move to next month.</span>
          <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Closing…" : "Close month"}</Button>
          <button type="button" onClick={() => setAsking(false)} className="text-xs text-ink-muted hover:underline">Cancel</button>
        </form>
      ) : (
        <button type="button" onClick={() => setAsking(true)} className="text-xs font-medium text-link hover:underline">Close month…</button>
      )}
      <Message state={state} />
    </div>
  );
}

/** Records "nothing to submit" for the month (client portal, or staff on the client's word). */
export function NothingToSubmitButton({ clientId, period, label = "Nothing to submit" }: { clientId: string; period: string; label?: string }) {
  const [state, run, pending] = useActionState(() => nothingToSubmitAction(clientId, period), {} as CycleState);
  if (state.ok) return <Message state={state} />;
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Saving…" : label}</Button>
      <Message state={state} />
    </form>
  );
}

/** The Reviewer or Owner decides what happens to a prior-year document. */
export function DecideExceptionForm({ documentId }: { documentId: string }) {
  const [state, run, pending] = useActionState(decideExceptionAction.bind(null, documentId), {} as CycleState);
  if (state.ok) return <Message state={state} />;
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <label htmlFor={`decision-${documentId}`} className="sr-only">Decision</label>
      <Select id={`decision-${documentId}`} name="decision" required defaultValue="" className="w-auto text-xs">
        <option value="" disabled>Decide…</option>
        {Object.entries(EXCEPTION_DECISIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </Select>
      <label htmlFor={`note-${documentId}`} className="sr-only">Note</label>
      <Input id={`note-${documentId}`} name="note" required placeholder="Note for the file" className="min-w-40 flex-1 text-xs" />
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>Save</Button>
      <Message state={state} />
    </form>
  );
}
