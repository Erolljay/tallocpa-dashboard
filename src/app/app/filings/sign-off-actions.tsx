"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { ACTION_LABEL, type SignOffAction } from "@/lib/filings/sign-off";
import { advanceFilingAction, type SignOffState } from "./actions";

const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date());

/** Every step the viewer can take on a filing now, each as its own small form. */
export function SignOffActions(props: {
  filingId: string;
  actions: SignOffAction[];
  taxDue: number | null;
  paymentMode: string;
  /** "client" shows client-facing wording in the portal. */
  audience?: "staff" | "client";
}) {
  if (props.actions.length === 0) return null;
  return (
    <div className="space-y-4">
      {props.actions.map((a) => (
        <StepForm key={a} {...props} action={a} />
      ))}
    </div>
  );
}

function StepForm({ filingId, action, taxDue, paymentMode, audience = "staff" }: { filingId: string; action: SignOffAction; taxDue: number | null; paymentMode: string; audience?: "staff" | "client" }) {
  const [state, run, pending] = useActionState(advanceFilingAction.bind(null, filingId, action), {} as SignOffState);
  const id = (n: string) => `${action}-${n}`;
  const secondary = action === "kick_back" || action === "client_query";

  return (
    <form action={run} className="space-y-3 rounded-xl border border-border p-4">
      {action === "prepare" && (
        <Field label="Tax due on this return (₱)" htmlFor={id("tax_due")} hint="0 if nothing is payable.">
          <Input id={id("tax_due")} name="tax_due" type="number" min={0} step="0.01" required className="text-right tabular-nums" />
        </Field>
      )}

      {action === "owner_approve" && (
        <>
          <p className="text-sm text-ink-muted">
            Payment check: tax due {taxDue == null ? "—" : `₱${taxDue.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`} ·{" "}
            {paymentMode === "firm_remits" ? "we remit for the client" : "client pays BIR directly"}. Record what the client has paid (tax dues and retainer).
          </p>
          <Field label="Client payment" htmlFor={id("payment_status")}>
            <Select id={id("payment_status")} name="payment_status" defaultValue="" required>
              <option value="" disabled>Choose…</option>
              <option value="paid">Paid</option>
              <option value="partial">Partially paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="not_applicable">Nothing to pay</option>
            </Select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-ink-strong">
            <input type="checkbox" name="approve_unpaid" className="size-4 accent-[var(--action)]" />
            Approve even though unpaid (the balance becomes a client receivable)
          </label>
        </>
      )}

      {action === "file" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Filing reference" htmlFor={id("filing_reference")} hint="eFPS or eBIRForms reference number.">
            <Input id={id("filing_reference")} name="filing_reference" required />
          </Field>
          <Field label="Filed on" htmlFor={id("filed_on")}>
            <Input id={id("filed_on")} name="filed_on" type="date" required defaultValue={today()} />
          </Field>
        </div>
      )}

      {action === "pay" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Payment reference" htmlFor={id("payment_reference")} hint={taxDue ? "Bank or eFPS confirmation number." : "Leave blank if nothing was payable."}>
            <Input id={id("payment_reference")} name="payment_reference" required={Boolean(taxDue)} />
          </Field>
          <Field label="Paid on" htmlFor={id("paid_on")}>
            <Input id={id("paid_on")} name="paid_on" type="date" required={Boolean(taxDue)} defaultValue={today()} />
          </Field>
        </div>
      )}

      {needsNote(action, audience) && (
        <Field label={noteLabel(action, audience)} htmlFor={id("note")}>
          <Textarea id={id("note")} name="note" rows={2} required={noteRequired(action, audience)} />
        </Field>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant={secondary ? "secondary" : "primary"} disabled={pending}>
          {pending ? "Saving…" : audience === "client" && action === "client_approve" ? "Approve this return" : ACTION_LABEL[action]}
        </Button>
        {state.error && <Notice tone="blocked">{state.error}</Notice>}
      </div>
    </form>
  );
}

function needsNote(action: SignOffAction, audience: "staff" | "client") {
  if (action === "client_approve") return audience === "staff";
  return ["kick_back", "client_query", "answer_query", "review", "prepare", "owner_approve", "send_proof"].includes(action);
}

function noteRequired(action: SignOffAction, audience: "staff" | "client") {
  return ["kick_back", "client_query", "answer_query"].includes(action) || (action === "client_approve" && audience === "staff");
}

function noteLabel(action: SignOffAction, audience: "staff" | "client") {
  switch (action) {
    case "kick_back":
      return "What needs fixing";
    case "client_query":
      return "Your question";
    case "answer_query":
      return "Answer to the client";
    case "client_approve":
      return audience === "staff" ? "How the client approved (e.g. email of 20 Apr)" : "Note";
    default:
      return "Note (optional)";
  }
}
