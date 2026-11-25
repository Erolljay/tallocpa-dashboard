"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice } from "@/components/ui";
import { rejectProofAction, verifyProofAction, type ProofState } from "@/lib/collections/proof-actions";

/** Owner only: Verify records the payment as a deposit (statement becomes Paid once covered); Reject tells the client why. */
export function ProofReview({ soaId, proofId, amount, paidOn }: { soaId: string; proofId: string; amount: number; paidOn: string }) {
  const [mode, setMode] = useState<"verify" | "reject" | null>(null);
  const [verifyState, verify, verifying] = useActionState(verifyProofAction.bind(null, soaId, proofId), {} as ProofState);
  const [rejectState, reject, rejecting] = useActionState(rejectProofAction.bind(null, soaId, proofId), {} as ProofState);
  const state = mode === "reject" ? rejectState : verifyState;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={mode === "verify" ? "primary" : "secondary"} onClick={() => setMode(mode === "verify" ? null : "verify")}>Verify payment</Button>
        <Button size="sm" variant="secondary" onClick={() => setMode(mode === "reject" ? null : "reject")}>Reject</Button>
      </div>
      {mode === "verify" && (
        <form action={verify} className="grid gap-3 rounded-xl border border-separator-border p-3 sm:grid-cols-3">
          <Field label="Amount received" htmlFor={`v_amount_${proofId}`}>
            <Input id={`v_amount_${proofId}`} name="amount" type="number" step="0.01" min="0.01" defaultValue={amount.toFixed(2)} required />
          </Field>
          <Field label="Date received" htmlFor={`v_date_${proofId}`}>
            <Input id={`v_date_${proofId}`} name="received_on" type="date" defaultValue={paidOn} required />
          </Field>
          <Field label="BIR invoice no." htmlFor={`v_bir_${proofId}`} hint="Optional">
            <Input id={`v_bir_${proofId}`} name="bir_invoice_number" maxLength={40} />
          </Field>
          <div className="sm:col-span-3">
            <Button type="submit" size="sm" disabled={verifying}>{verifying ? "Recording…" : "Confirm, mark as paid"}</Button>
          </div>
        </form>
      )}
      {mode === "reject" && (
        <form action={reject} className="space-y-3 rounded-xl border border-separator-border p-3">
          <Field label="Reason the client sees" htmlFor={`r_reason_${proofId}`}>
            <Input id={`r_reason_${proofId}`} name="reason" placeholder="e.g. Not found in our BPI account; please check the amount" maxLength={500} required />
          </Field>
          <Button type="submit" size="sm" variant="secondary" disabled={rejecting}>{rejecting ? "Saving…" : "Reject proof"}</Button>
        </form>
      )}
      {mode && (state.error || state.ok) && <Notice tone={state.error ? "blocked" : "done"}>{state.error ?? state.ok}</Notice>}
    </div>
  );
}
