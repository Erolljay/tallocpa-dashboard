"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice } from "@/components/ui";
import { decideAiDraftAction, type DraftDecisionState } from "@/lib/ai/draft-actions";
import { attachPaymentProofAction, type AttachProofState } from "../payment-proof-actions";

/** Attach the suggested proof of payment (references and date prefilled), or reject the suggestion. */
export function AttachProofForm(props: { draftId: string; filingId: string; reference: string; birReference: string; paidOn: string; canAttach: boolean }) {
  const [state, attach, attaching] = useActionState(attachPaymentProofAction.bind(null, props.draftId, props.filingId), {} as AttachProofState);
  const [rejState, reject, rejecting] = useActionState(decideAiDraftAction.bind(null, props.draftId, false, `/app/filings/${props.filingId}`), {} as DraftDecisionState);
  const id = (n: string) => `proof-${props.draftId}-${n}`;
  return (
    <div className="space-y-3">
      {props.canAttach && (
        <form action={attach} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Payment reference" htmlFor={id("ref")} hint="The bank's reference.">
              <Input id={id("ref")} name="payment_reference" required defaultValue={props.reference} />
            </Field>
            <Field label="BIR reference" htmlFor={id("bir")}>
              <Input id={id("bir")} name="bir_reference" defaultValue={props.birReference} />
            </Field>
            <Field label="Paid on" htmlFor={id("paid")}>
              <Input id={id("paid")} name="paid_on" type="date" required defaultValue={props.paidOn} />
            </Field>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" size="sm" disabled={attaching || rejecting}>{attaching ? "Attaching…" : "Attach proof"}</Button>
            <Button type="submit" size="sm" variant="secondary" formAction={reject} disabled={attaching || rejecting}>{rejecting ? "Rejecting…" : "Not this return"}</Button>
          </div>
        </form>
      )}
      {!props.canAttach && <p className="text-caption-1-regular text-text-tertiary">The Owner or staff assigned to this client attach it.</p>}
      {(state.error || state.ok) && <Notice tone={state.error ? "blocked" : "done"}>{state.error ?? state.ok}</Notice>}
      {(rejState.error || rejState.ok) && <Notice tone={rejState.error ? "blocked" : "done"}>{rejState.error ?? rejState.ok}</Notice>}
    </div>
  );
}
