"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { decideAiDraftAction, type DraftDecisionState } from "@/lib/ai/draft-actions";
import { sendRunnerRequestsAction, type RunnerSendState } from "./runner-actions";

/** Send the drafted requests to the client (as the signed-in staff member), or reject the draft. */
export function SendRunnerRequestsButtons({ draftId, caseId, path }: { draftId: string; caseId: string; path: string }) {
  const [sendState, send, sending] = useActionState(sendRunnerRequestsAction.bind(null, draftId, caseId), {} as RunnerSendState);
  const [rejState, reject, rejecting] = useActionState(decideAiDraftAction.bind(null, draftId, false, path), {} as DraftDecisionState);
  const state = sendState.error || sendState.ok ? sendState : rejState;
  return (
    <form action={send} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" disabled={sending || rejecting}>{sending ? "Sending…" : "Send to the client"}</Button>
      <Button type="submit" size="sm" variant="secondary" formAction={reject} disabled={sending || rejecting}>{rejecting ? "Rejecting…" : "Reject"}</Button>
      {(state.error || state.ok) && (
        <span className={state.error ? "text-caption-1-regular text-text-error-primary" : "text-caption-1-regular text-text-secondary"}>{state.error ?? state.ok}</span>
      )}
    </form>
  );
}
