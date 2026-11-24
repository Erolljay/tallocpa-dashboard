"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Badge, Button, Field, Input, Notice, peso, Textarea } from "@/components/ui";
import { ACTION_LABEL, type SignOffAction } from "@/lib/filings/sign-off";
import { advanceFilingAction, type SignOffState } from "./actions";

/** From filing_payment_check(): what the client has paid, worked out from Collections. */
export interface PaymentCheck {
  status: "paid" | "partial" | "unpaid" | "not_applicable";
  tax_status: "paid" | "partial" | "unpaid" | "not_applicable";
  tax_due: number;
  tax_paid: number;
  other_open: number;
}

const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date());

/** Every step the viewer can take on a filing now, each as its own small form. */
export function SignOffActions(props: {
  filingId: string;
  actions: SignOffAction[];
  taxDue: number | null;
  paymentMode: string;
  /** "client" shows client-facing wording in the portal. */
  audience?: "staff" | "client";
  paymentCheck?: PaymentCheck | null;
  clientId?: string;
}) {
  if (props.actions.length === 0) return null;
  return (
    <div className={props.audience === "client" ? "divide-y divide-separator-border [&>form]:py-4 [&>form:first-child]:pt-0 [&>form:last-child]:pb-0" : "space-y-4"}>
      {props.actions.map((a) => (
        <StepForm key={a} {...props} action={a} />
      ))}
    </div>
  );
}

function StepForm({ filingId, action, taxDue, paymentMode, audience = "staff", paymentCheck, clientId }: { filingId: string; action: SignOffAction; taxDue: number | null; paymentMode: string; audience?: "staff" | "client"; paymentCheck?: PaymentCheck | null; clientId?: string }) {
  const [state, run, pending] = useActionState(advanceFilingAction.bind(null, filingId, action), {} as SignOffState);
  const id = (n: string) => `${action}-${n}`;
  const secondary = action === "kick_back" || action === "client_query";

  return (
    <form action={run} className={audience === "client" ? "space-y-3" : "space-y-3 rounded-2xl border border-separator-border p-4"}>
      {action === "prepare" && (
        <Field label="Tax due on this return (₱)" htmlFor={id("tax_due")} hint="0 if nothing is payable.">
          <Input id={id("tax_due")} name="tax_due" type="number" min={0} step="0.01" required className="text-end tabular-nums" />
        </Field>
      )}

      {action === "owner_approve" && <PaymentCheckView check={paymentCheck ?? null} taxDue={taxDue} paymentMode={paymentMode} clientId={clientId} />}

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

const checkTone = { paid: "done", partial: "waiting", unpaid: "blocked", not_applicable: "neutral" } as const;
const checkWord = { paid: "Paid", partial: "Partly paid", unpaid: "Unpaid", not_applicable: "Nothing to pay" } as const;

/** The payment check at the Owner's approval (Q21, Q25), with the tick to approve anyway. */
function PaymentCheckView({ check, taxDue, paymentMode, clientId }: { check: PaymentCheck | null; taxDue: number | null; paymentMode: string; clientId?: string }) {
  const short = check && (check.status === "partial" || check.status === "unpaid");
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-body-medium text-text-primary">Payment check</span>
        {check && <Badge tone={checkTone[check.status]}>{checkWord[check.status]}</Badge>}
      </div>
      <dl className="grid gap-x-6 gap-y-1 text-body-regular sm:grid-cols-2">
        <dt className="text-text-secondary">Tax on this return</dt>
        <dd className="tabular-nums text-text-primary">
          {paymentMode !== "firm_remits"
            ? `${taxDue ? peso.format(taxDue) : "—"} · client pays BIR directly`
            : check
              ? `${peso.format(check.tax_paid)} paid of ${peso.format(check.tax_due)}`
              : "—"}
        </dd>
        <dt className="text-text-secondary">Other balances due (retainer, charges)</dt>
        <dd className="tabular-nums text-text-primary">{check ? (check.other_open > 0 ? `${peso.format(check.other_open)} unpaid` : "None") : "—"}</dd>
      </dl>
      {clientId && (
        <Link href={`/app/collections/${clientId}`} className="text-body-regular text-button-ghost-foreground hover:underline">Open the client in Collections</Link>
      )}
      {short && (
        <label className="flex items-center gap-2 text-body-regular text-text-primary">
          <input type="checkbox" name="approve_unpaid" className="size-4" />
          Approve even though unpaid (the balance stays a client receivable{paymentMode === "firm_remits" ? ": an advance to the client for taxes" : ""})
        </label>
      )}
    </div>
  );
}
