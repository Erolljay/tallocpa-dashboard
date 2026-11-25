"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, peso } from "@/components/ui";
import { suggestTicks, tickedSplit } from "@/lib/collections/collections";
import { rejectProofAction, verifyProofAction, type ProofState } from "@/lib/collections/proof-actions";
import type { OpenStatementItem } from "@/lib/collections/statement";
import { showDate } from "@/lib/filings/labels";

/**
 * Owner only. Verify records the payment as a deposit applied to the items the
 * Owner ticks (decision 16): oldest first, preselected up to the amount received.
 * Unticked items stay open; what is left over is the client's credit. Reject tells
 * the client why.
 */
export function ProofReview({ soaId, proofId, amount, paidOn, items }: { soaId: string; proofId: string; amount: number; paidOn: string; items: OpenStatementItem[] }) {
  const [mode, setMode] = useState<"verify" | "reject" | null>(null);
  const [verifyState, verify, verifying] = useActionState(verifyProofAction.bind(null, soaId, proofId), {} as ProofState);
  const [rejectState, reject, rejecting] = useActionState(rejectProofAction.bind(null, soaId, proofId), {} as ProofState);
  const [received, setReceived] = useState(amount.toFixed(2));
  const [ticked, setTicked] = useState(() => new Set(suggestTicks(items, amount)));
  const state = mode === "reject" ? rejectState : verifyState;
  const split = tickedSplit(items.filter((i) => ticked.has(i.id)), Number(received) || 0);
  const toggle = (id: string) =>
    setTicked((t) => {
      const n = new Set(t);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={mode === "verify" ? "primary" : "secondary"} onClick={() => setMode(mode === "verify" ? null : "verify")}>Verify payment</Button>
        <Button size="sm" variant="secondary" onClick={() => setMode(mode === "reject" ? null : "reject")}>Reject</Button>
      </div>
      {mode === "verify" && (
        <form action={verify} className="space-y-3 rounded-xl border border-separator-border p-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Amount received" htmlFor={`v_amount_${proofId}`}>
              <Input
                id={`v_amount_${proofId}`}
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={received}
                onChange={(e) => setReceived(e.target.value)}
                required
                className="text-end tabular-nums"
              />
            </Field>
            <Field label="Date received" htmlFor={`v_date_${proofId}`}>
              <Input id={`v_date_${proofId}`} name="received_on" type="date" defaultValue={paidOn} required />
            </Field>
            <Field label="BIR invoice no." htmlFor={`v_bir_${proofId}`} hint="Optional">
              <Input id={`v_bir_${proofId}`} name="bir_invoice_number" maxLength={40} />
            </Field>
          </div>

          <fieldset className="space-y-2">
            <legend className="mb-1 text-body-medium text-text-primary">Items this payment pays</legend>
            {items.length === 0 ? (
              <p className="text-body-regular text-text-secondary">Nothing is open on this client&apos;s statements. The payment is kept as credit.</p>
            ) : (
              <ul className="divide-y divide-separator-border rounded-xl border border-separator-border">
                {items.map((i) => (
                  <li key={i.id}>
                    <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-body-regular hover:bg-background-secondary-hover pointer-coarse:min-h-11">
                      <input
                        type="checkbox"
                        name="due_ids"
                        value={i.id}
                        checked={ticked.has(i.id)}
                        onChange={() => toggle(i.id)}
                        className="size-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-text-primary">{i.description}</span>
                        <span className="block text-caption-1-regular text-text-tertiary">
                          Due {showDate(i.due_on)}
                          {i.thisStatement ? "" : " · earlier statement"}
                        </span>
                      </span>
                      <span className="shrink-0 tabular-nums text-text-primary">{peso.format(i.open)}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-body-regular text-text-secondary">
              Applied to the ticked items, oldest first: <span className="tabular-nums text-text-primary">{peso.format(split.applied)}</span>
              {split.credit > 0 && (
                <>
                  {" "}· kept as credit: <span className="tabular-nums text-text-primary">{peso.format(split.credit)}</span>
                </>
              )}
              {split.stillOpen > 0 && (
                <>
                  {" "}· still open on the ticked items: <span className="tabular-nums text-text-primary">{peso.format(split.stillOpen)}</span>
                </>
              )}
              . Unticked items stay open.
            </p>
          </fieldset>

          <Button type="submit" size="sm" disabled={verifying}>{verifying ? "Recording…" : "Confirm, apply to ticked items"}</Button>
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
