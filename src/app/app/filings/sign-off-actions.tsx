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
  /** The tax due is on a statement (it has an item in Collections). */
  billed?: boolean;
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
  /** Set when the viewer gives the final approval as acting approver (Q58): their limit. */
  actingLimit?: number | null;
  /** An amended return (its tax due is what remains after the earlier return). */
  amended?: boolean;
  /** The scanned copy is attached (needed for Filed & paid). */
  hasFiledCopy?: boolean;
  /** Prepared: the tax due from the saved worksheet (pesos); "missing" until it is saved; null/absent when the form has no worksheet (typed). */
  worksheetTaxDue?: number | "missing" | null;
  worksheetHref?: string;
}) {
  if (props.actions.length === 0) return null;
  return (
    <div className="divide-y divide-separator-border [&>form]:py-4 [&>form:first-child]:pt-0 [&>form:last-child]:pb-0">
      {props.actions.map((a) => (
        <StepForm key={a} {...props} action={a} />
      ))}
    </div>
  );
}

function StepForm({ filingId, action, taxDue, paymentMode, audience = "staff", paymentCheck, clientId, actingLimit, amended = false, hasFiledCopy = true, worksheetTaxDue = null, worksheetHref }: { filingId: string; action: SignOffAction; taxDue: number | null; paymentMode: string; audience?: "staff" | "client"; paymentCheck?: PaymentCheck | null; clientId?: string; actingLimit?: number | null; amended?: boolean; hasFiledCopy?: boolean; worksheetTaxDue?: number | "missing" | null; worksheetHref?: string }) {
  const [state, run, pending] = useActionState(advanceFilingAction.bind(null, filingId, action), {} as SignOffState);
  const id = (n: string) => `${action}-${n}`;
  const secondary = action === "kick_back" || action === "client_query";

  return (
    <form action={run} className="space-y-3">
      {action === "prepare" && worksheetTaxDue === "missing" && (
        <Notice tone="waiting">
          Compute and save the {worksheetHref ? <Link href={worksheetHref} className="underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">worksheet</Link> : "worksheet"} first: the tax due comes from it.
        </Notice>
      )}
      {action === "prepare" && typeof worksheetTaxDue === "number" && (
        <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-background-secondary-default px-4 py-3">
          <span className="text-body-regular text-text-secondary">{amended ? "Tax still due on this amended return, from the worksheet" : "Tax due, from the worksheet"}{worksheetTaxDue === 0 ? " (nil: skips the client's approval)" : ""}</span>
          <span className="amount text-headline-medium tabular-nums text-text-primary">{peso.format(worksheetTaxDue)}</span>
          <input type="hidden" name="tax_due_from_worksheet" value="1" />
        </div>
      )}
      {action === "prepare" && worksheetTaxDue == null && (
        <Field
          label={amended ? "Tax still due on this amended return (₱)" : "Tax due on this return (₱)"}
          htmlFor={id("tax_due")}
          hint={amended ? "After what the earlier return paid; 0 if nothing more is payable." : "0 for a nil return: it skips the client's approval."}
        >
          <Input id={id("tax_due")} name="tax_due" type="number" min={0} step="0.01" required className="text-end tabular-nums" />
        </Field>
      )}

      {action === "owner_approve" && <PaymentCheckView check={paymentCheck ?? null} taxDue={taxDue} paymentMode={paymentMode} clientId={actingLimit == null ? clientId : undefined} actingLimit={actingLimit ?? null} />}

      {action === "file" && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Filing reference" htmlFor={id("filing_reference")} hint="eFPS or eBIRForms reference number.">
              <Input id={id("filing_reference")} name="filing_reference" required />
            </Field>
            <Field label="Filed on" htmlFor={id("filed_on")}>
              <Input id={id("filed_on")} name="filed_on" type="date" required defaultValue={today()} />
            </Field>
            <Field label="Payment reference" htmlFor={id("payment_reference")} hint={taxDue ? "Bank or eFPS confirmation number." : "Leave blank: nothing was payable."}>
              <Input id={id("payment_reference")} name="payment_reference" required={Boolean(taxDue)} />
            </Field>
            <Field label="Paid on" htmlFor={id("paid_on")}>
              <Input id={id("paid_on")} name="paid_on" type="date" required={Boolean(taxDue)} defaultValue={taxDue ? today() : undefined} />
            </Field>
          </div>
          {!hasFiledCopy && <Notice tone="waiting">Attach the scanned copy (the return, the proof of payment and the attachments, in one file) under Return first.</Notice>}
        </div>
      )}

      {needsNote(action, audience) && (
        <Field label={noteLabel(action, audience)} htmlFor={id("note")}>
          <Textarea id={id("note")} name="note" rows={2} required={noteRequired(action, audience)} />
        </Field>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant={secondary ? "secondary" : "primary"} disabled={pending || (action === "prepare" && worksheetTaxDue === "missing")}>
          {pending ? "Saving…" : audience === "client" && action === "client_approve" ? "Approve this return" : ACTION_LABEL[action]}
        </Button>
        {state.error && <Notice tone="blocked">{state.error}</Notice>}
      </div>
    </form>
  );
}

function needsNote(action: SignOffAction, audience: "staff" | "client") {
  if (action === "client_approve") return audience === "staff";
  return ["kick_back", "client_query", "answer_query", "review", "prepare", "owner_approve", "file"].includes(action);
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

/**
 * The payment check at the final approval (decision 13): the client's payment for this
 * return's own statement item. The approval waits until it is verified; other balances
 * (the retainer) are shown, not checked.
 */
function PaymentCheckView({ check, taxDue, paymentMode, clientId, actingLimit }: { check: PaymentCheck | null; taxDue: number | null; paymentMode: string; clientId?: string; actingLimit: number | null }) {
  const short = check && (check.status === "partial" || check.status === "unpaid");
  const acting = actingLimit != null;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-body-medium text-text-primary">Payment for this return</span>
        {check && <Badge tone={checkTone[check.status]}>{checkWord[check.status]}</Badge>}
      </div>
      <dl className="grid gap-x-6 gap-y-1 text-body-regular sm:grid-cols-2">
        <dt className="text-text-secondary">This return&rsquo;s item</dt>
        <dd className="tabular-nums text-text-primary">
          {paymentMode !== "firm_remits"
            ? `${taxDue ? peso.format(taxDue) : "—"} · client pays BIR directly`
            : check
              ? check.tax_due > 0
                ? check.billed === false
                  ? `${peso.format(check.tax_due)} · not on a statement yet`
                  : `${peso.format(check.tax_paid)} paid of ${peso.format(check.tax_due)}`
                : "Nothing to pay"
              : "—"}
        </dd>
        <dt className="text-text-secondary">Other balances (retainer, charges)</dt>
        <dd className="tabular-nums text-text-primary">{check ? (check.other_open > 0 ? `${peso.format(check.other_open)} unpaid, not part of the check` : "None") : "—"}</dd>
      </dl>
      {clientId && (
        <Link href={`/app/collections/${clientId}`} className="text-body-regular text-button-ghost-foreground hover:underline">Open the client in Collections</Link>
      )}
      {short && (
        <Notice tone="blocked">
          {check?.billed === false
            ? "The tax due is not on the client's statement yet: run billing for the client in Collections. Approve once its payment is verified."
            : "The client's payment for this return is not verified yet. Approve once its item in Collections is paid."}
        </Notice>
      )}
      {acting && !short && (
        <Notice tone="waiting">{`You approve as acting approver (limit ${peso.format(actingLimit)} tax due). The Owner sees this in the daily digest.`}</Notice>
      )}
    </div>
  );
}
