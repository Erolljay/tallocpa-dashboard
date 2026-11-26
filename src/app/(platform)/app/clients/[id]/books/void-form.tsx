"use client";

import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import { voidInvoiceAction, voidSettlementAction, type TxState } from "./transactions-actions";

/** Void an invoice, receipt or payment with a reason; its entry is reversed. */
export function VoidForm({ clientId, target }: { clientId: string; target: { invoiceId: string; kind: "sales" | "purchase" } | { settlementId: string; kind: "receipt" | "payment" } }) {
  const action = "invoiceId" in target
    ? voidInvoiceAction.bind(null, clientId, target.invoiceId, target.kind)
    : voidSettlementAction.bind(null, clientId, target.settlementId, target.kind);
  const [state, run, pending] = useActionState(action, {} as TxState);
  const [open, setOpen] = useState(false);
  if (!open) {
    return <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>Void…</Button>;
  }
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <label htmlFor="void-reason" className="sr-only">Reason</label>
      <Input id="void-reason" name="reason" required placeholder="Why it is void, e.g. entered twice" className="min-w-64 flex-1" />
      <Button type="submit" variant="danger" size="sm" disabled={pending}>{pending ? "Voiding…" : "Void"}</Button>
      <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
      {state.error && <p role="alert" className="w-full text-body-regular text-text-error-primary">{state.error}</p>}
    </form>
  );
}
