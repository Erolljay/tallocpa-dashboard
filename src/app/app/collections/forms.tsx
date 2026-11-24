"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, peso, Select, Textarea } from "@/components/ui";
import { CONTRIBUTIONS, methodLabel, type DepositMethod } from "@/lib/collections/collections";
import {
  addChargeAction,
  applyCreditAction,
  recordDepositAction,
  runBillingAction,
  setBillingDaysAction,
  voidDepositAction,
  waiveDueAction,
  type MoneyState,
} from "./actions";

function Result({ state }: { state: MoneyState }) {
  if (state.error) return <Notice tone="blocked">{state.error}</Notice>;
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

/** Runs billing now: for every client scheduled on the date, or for one client. */
export function RunBillingForm({ clientId, today }: { clientId: string | null; today: string }) {
  const [state, run, pending] = useActionState(runBillingAction.bind(null, clientId), {} as MoneyState);
  return (
    <details className="group relative">
      <summary className="pressable inline-flex h-10 cursor-pointer list-none items-center rounded-2lg border border-border-button-default bg-background-primary-default px-5 text-body-medium text-text-primary shadow-xs hover:bg-background-secondary-hover pointer-coarse:h-11">
        {clientId ? "Bill this client now" : "Run billing"}
      </summary>
      <form action={run} className="absolute right-0 z-10 mt-2 w-80 space-y-3 rounded-3xl border border-border-button-default bg-background-primary-default p-4 shadow-lift">
        <Field label="Billing date" htmlFor="billing_date" hint={clientId ? "Issues a statement with everything ready to bill." : "Bills every client whose billing days include this day."}>
          <Input id="billing_date" name="billing_date" type="date" defaultValue={today} required />
        </Field>
        <Button type="submit" disabled={pending} className="w-full">{pending ? "Billing…" : "Issue Statements"}</Button>
        <Result state={state} />
      </form>
    </details>
  );
}

export interface OpenItem {
  id: string;
  description: string;
  due_on: string;
  open_amount: number;
}

export interface PaymentAccount {
  id: string;
  label: string;
}

/** Records money received and matches it to the ticked open items, oldest first. */
export function RecordDepositForm(props: { clientId: string; today: string; items: OpenItem[]; accounts: PaymentAccount[]; staff: { id: string; name: string }[] }) {
  const [state, run, pending] = useActionState(recordDepositAction.bind(null, props.clientId), {} as MoneyState);
  const [method, setMethod] = useState<DepositMethod>("transfer");
  const [ticked, setTicked] = useState(() => new Set(props.items.map((i) => i.id)));
  const tickedTotal = props.items.filter((i) => ticked.has(i.id)).reduce((s, i) => s + i.open_amount, 0);
  const toggle = (id: string) => setTicked((t) => {
    const n = new Set(t);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    return n;
  });

  return (
    <form action={run} className="space-y-4">
      {props.items.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="mb-1 text-body-medium text-text-primary">Apply to</legend>
          <ul className="divide-y divide-separator-border rounded-xl border border-separator-border">
            {props.items.map((i) => (
              <li key={i.id}>
                <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-body-regular hover:bg-background-secondary-hover pointer-coarse:min-h-11">
                  <input type="checkbox" name="due_ids" value={i.id} checked={ticked.has(i.id)} onChange={() => toggle(i.id)} className="size-4" />
                  <span className="min-w-0 flex-1 text-text-primary">{i.description}</span>
                  <span className="amount shrink-0 text-text-primary">{peso.format(i.open_amount)}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="text-body-regular text-text-secondary">Ticked: <span className="tabular-nums text-text-primary">{peso.format(tickedTotal)}</span>. Paid oldest first; anything left over becomes the client&apos;s credit.</p>
        </fieldset>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Amount received (₱)" htmlFor="amount">
          <Input id="amount" name="amount" type="number" inputMode="decimal" min="0.01" step="0.01" required defaultValue={tickedTotal ? tickedTotal.toFixed(2) : undefined} key={tickedTotal} className="text-end tabular-nums" />
        </Field>
        <Field label="Date received" htmlFor="received_on">
          <Input id="received_on" name="received_on" type="date" required defaultValue={props.today} max={props.today} />
        </Field>
        <Field label="How the client paid" htmlFor="method">
          <Select id="method" name="method" value={method} onChange={(e) => setMethod(e.target.value as DepositMethod)}>
            {(Object.keys(methodLabel) as DepositMethod[]).map((m) => (
              <option key={m} value={m}>{methodLabel[m]}</option>
            ))}
          </Select>
        </Field>
        <Field label="Received in" htmlFor="payment_account_id" hint="The firm account the money landed in.">
          <Select id="payment_account_id" name="payment_account_id" defaultValue="">
            <option value="">Not recorded</option>
            {props.accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </Select>
        </Field>
        <Field label={method === "check" ? "Check number" : method === "cash" ? "Deposit slip number" : "Transfer reference"} htmlFor="reference">
          <Input id="reference" name="reference" required={method === "check"} />
        </Field>
        {method === "cash" ? (
          <Field label="Deposited by" htmlFor="deposited_by" hint="Cash is deposited to the bank by our staff.">
            <Select id="deposited_by" name="deposited_by" required defaultValue="">
              <option value="" disabled>Choose…</option>
              {props.staff.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </Select>
          </Field>
        ) : (
          <Field label="BIR invoice number" htmlFor="bir_invoice_number" hint="From the registered booklet, if issued.">
            <Input id="bir_invoice_number" name="bir_invoice_number" />
          </Field>
        )}
      </div>
      {method === "cash" && (
        <Field label="BIR invoice number" htmlFor="bir_invoice_number" hint="From the registered booklet, if issued.">
          <Input id="bir_invoice_number" name="bir_invoice_number" />
        </Field>
      )}
      <Field label="Note (optional)" htmlFor="note">
        <Textarea id="note" name="note" rows={2} />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Record Payment"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

/** Adds an SSS / PhilHealth / Pag-IBIG contribution or a one-off charge for the next statement. */
export function AddChargeForm({ clientId, today }: { clientId: string; today: string }) {
  const [state, run, pending] = useActionState(addChargeAction.bind(null, clientId), {} as MoneyState);
  const [kind, setKind] = useState<"contribution" | "other">("contribution");
  const lastMonth = (() => {
    const [y, m] = today.split("-").map(Number);
    return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
  })();
  return (
    <form action={run} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Kind" htmlFor="kind">
          <Select id="kind" name="kind" value={kind} onChange={(e) => setKind(e.target.value as "contribution" | "other")}>
            <option value="contribution">Contribution (SSS, PhilHealth, Pag-IBIG)</option>
            <option value="other">Other charge</option>
          </Select>
        </Field>
        {kind === "contribution" ? (
          <>
            <Field label="Agency" htmlFor="agency">
              <Select id="agency" name="agency" required defaultValue="SSS">
                {CONTRIBUTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="For the month of" htmlFor="month">
              <Input id="month" name="month" type="month" required defaultValue={lastMonth} />
            </Field>
          </>
        ) : (
          <Field label="Description" htmlFor="description" hint="As the client will read it, e.g. ORUS registration.">
            <Input id="description" name="description" required />
          </Field>
        )}
        <Field label="Amount (₱)" htmlFor="charge_amount">
          <Input id="charge_amount" name="amount" type="number" inputMode="decimal" min="0.01" step="0.01" required className="text-end tabular-nums" />
        </Field>
        <Field label="Due on" htmlFor="due_on" hint="When the client must pay it.">
          <Input id="due_on" name="due_on" type="date" required defaultValue={today} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Adding…" : "Add to Next Statement"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

/** A small "with a reason" action behind a disclosure: void a payment, waive an item. */
function ReasonAction({ label, confirm, reasonLabel, action }: { label: string; confirm: string; reasonLabel: string; action: (s: MoneyState, f: FormData) => Promise<MoneyState> }) {
  const [state, run, pending] = useActionState(action, {} as MoneyState);
  return (
    <details>
      <summary className="cursor-pointer list-none text-body-regular text-text-error-primary hover:underline">{label}</summary>
      <form action={run} className="mt-2 space-y-2">
        <Field label={reasonLabel} htmlFor={`${label}-reason`}>
          <Input id={`${label}-reason`} name="reason" required />
        </Field>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" variant="secondary" size="sm" disabled={pending} className="border-border-error-default text-text-error-primary">{pending ? "Saving…" : confirm}</Button>
          <Result state={state} />
        </div>
      </form>
    </details>
  );
}

export function VoidDepositForm({ clientId, depositId }: { clientId: string; depositId: string }) {
  return <ReasonAction label="Void" confirm="Void Payment" reasonLabel="Why (e.g. bounced check)" action={voidDepositAction.bind(null, clientId, depositId)} />;
}

export function WaiveDueForm({ clientId, dueId }: { clientId: string; dueId: string }) {
  return <ReasonAction label="Waive" confirm="Waive the Rest" reasonLabel="Why it is waived" action={waiveDueAction.bind(null, clientId, dueId)} />;
}

export function ApplyCreditButton({ clientId }: { clientId: string }) {
  const [state, run, pending] = useActionState(applyCreditAction.bind(null, clientId), {} as MoneyState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Applying…" : "Apply Credit Now"}</Button>
      <Result state={state} />
    </form>
  );
}

export function BillingDaysForm({ clientId, days }: { clientId: string; days: number[] }) {
  const [state, run, pending] = useActionState(setBillingDaysAction.bind(null, clientId), {} as MoneyState);
  return (
    <form action={run} className="flex flex-wrap items-end gap-3">
      <Field label="Billing days" htmlFor="billing_days" hint="Days of the month, e.g. 10, 20 (or just 10 to bill once a month).">
        <Input id="billing_days" name="billing_days" defaultValue={days.join(", ")} required className="w-40" />
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      <Result state={state} />
    </form>
  );
}
