"use client";

import { useActionState } from "react";
import { Button, Textarea } from "@/components/ui";
import type { TieId } from "@/lib/workpapers/tieouts";
import { explainTieAction, type ExplainState } from "./actions";

/** The written explanation of a tie-out difference (decision 7: anything over ₱1). */
export function ExplainForm({ clientId, month, tie, value }: { clientId: string; month: string; tie: TieId; value: string | null }) {
  const [state, run, pending] = useActionState(explainTieAction.bind(null, clientId, month, tie), {} as ExplainState);
  return (
    <form action={run} className="mt-2 space-y-2">
      <label htmlFor={`explain-${tie}`} className="sr-only">Explanation for {tie}</label>
      <Textarea id={`explain-${tie}`} name="explanation" rows={2} defaultValue={value ?? ""} placeholder="What causes the difference, and what was done about it" className="text-body-regular" />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Saving…" : value ? "Update explanation" : "Explain"}</Button>
        {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
        {state.ok && <span role="status" className="text-caption-1-regular text-status-lime-text">{state.ok}</span>}
      </div>
    </form>
  );
}
