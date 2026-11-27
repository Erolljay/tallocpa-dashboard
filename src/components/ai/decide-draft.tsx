"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { decideAiDraftAction, type DraftDecisionState } from "@/lib/ai/draft-actions";

export function DecideDraftButtons({ id, path }: { id: string; path: string }) {
  const [accState, accept, accepting] = useActionState(decideAiDraftAction.bind(null, id, true, path), {} as DraftDecisionState);
  const [rejState, reject, rejecting] = useActionState(decideAiDraftAction.bind(null, id, false, path), {} as DraftDecisionState);
  const state = accState.error || accState.ok ? accState : rejState;
  return (
    <form action={accept} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" disabled={accepting || rejecting}>{accepting ? "Accepting…" : "Accept"}</Button>
      <Button type="submit" size="sm" variant="secondary" formAction={reject} disabled={accepting || rejecting}>{rejecting ? "Rejecting…" : "Reject"}</Button>
      {(state.error || state.ok) && (
        <span className={state.error ? "text-caption-1-regular text-text-error-primary" : "text-caption-1-regular text-text-secondary"}>{state.error ?? state.ok}</span>
      )}
    </form>
  );
}
