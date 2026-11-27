"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Textarea } from "@/components/ui";
import { confirmCatchUpAction, recordCatchUpAction, type CatchUpState } from "./catch-up-actions";

export interface CatchUpRecorded {
  taxDue: number | null;
  filedOn: string | null;
  filingReference: string | null;
  paidOn: string | null;
  paymentReference: string | null;
}

/** Staff enter what was filed with the BIR outside the app (catch-up). */
export function CatchUpRecordForm({ filingId, recorded }: { filingId: string; recorded?: CatchUpRecorded | null }) {
  const [state, run, pending] = useActionState(recordCatchUpAction.bind(null, filingId), {} as CatchUpState);
  return (
    <form action={run} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Tax due on the filed return (₱)" htmlFor="cu_tax_due" hint="0 for a nil return.">
          <Input id="cu_tax_due" name="tax_due" type="number" min={0} step="0.01" required defaultValue={recorded?.taxDue ?? undefined} className="text-end tabular-nums" />
        </Field>
        <Field label="Filed on" htmlFor="cu_filed_on" hint="The date on the BIR confirmation.">
          <Input id="cu_filed_on" name="filed_on" type="date" required defaultValue={recorded?.filedOn ?? undefined} />
        </Field>
        <Field label="Filing reference (optional)" htmlFor="cu_filing_reference">
          <Input id="cu_filing_reference" name="filing_reference" defaultValue={recorded?.filingReference ?? undefined} />
        </Field>
        <Field label="Paid on" htmlFor="cu_paid_on" hint="Needed when tax was due.">
          <Input id="cu_paid_on" name="paid_on" type="date" defaultValue={recorded?.paidOn ?? undefined} />
        </Field>
        <Field label="Payment reference (optional)" htmlFor="cu_payment_reference">
          <Input id="cu_payment_reference" name="payment_reference" defaultValue={recorded?.paymentReference ?? undefined} />
        </Field>
      </div>
      <Field label="Note (optional)" htmlFor="cu_note">
        <Textarea id="cu_note" name="note" rows={2} />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : recorded ? "Record again" : "Record as filed"}</Button>
        {state.error && <Notice tone="blocked">{state.error}</Notice>}
        {state.ok && <Notice tone="done">{state.ok}</Notice>}
      </div>
    </form>
  );
}

/** The reviewer or the Owner confirms a recorded catch-up return, or sends it back. */
export function CatchUpConfirmForms({ filingId }: { filingId: string }) {
  const [confirmState, confirm, confirming] = useActionState(confirmCatchUpAction.bind(null, filingId, "confirm"), {} as CatchUpState);
  const [backState, sendBack, sending] = useActionState(confirmCatchUpAction.bind(null, filingId, "send_back"), {} as CatchUpState);
  return (
    <div className="space-y-4">
      <form action={confirm} className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={confirming}>{confirming ? "Saving…" : "Confirm as filed"}</Button>
        {confirmState.error && <Notice tone="blocked">{confirmState.error}</Notice>}
      </form>
      <form action={sendBack} className="space-y-3 border-t border-separator-border pt-4">
        <Field label="Send back: what needs fixing" htmlFor="cu_back_note">
          <Textarea id="cu_back_note" name="note" rows={2} required />
        </Field>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="secondary" disabled={sending}>{sending ? "Saving…" : "Send back"}</Button>
          {backState.error && <Notice tone="blocked">{backState.error}</Notice>}
        </div>
      </form>
    </div>
  );
}
