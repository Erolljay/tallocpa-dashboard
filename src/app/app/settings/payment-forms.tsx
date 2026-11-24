"use client";

import { useActionState, useTransition } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { addPaymentAccountAction, replaceQrAction, setAccountActiveAction, setPaymentDaysAction, type PaymentSettingsState } from "./payment-actions";

function Result({ state }: { state: PaymentSettingsState }) {
  if (state.error) return <Notice tone="blocked">{state.error}</Notice>;
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

export function AddPaymentAccountForm() {
  const [state, run, pending] = useActionState(addPaymentAccountAction, {} as PaymentSettingsState);
  return (
    <details>
      <summary className="cursor-pointer list-none text-body-medium text-button-ghost-foreground hover:underline">Add a bank or e-wallet account</summary>
      <form action={run} className="mt-3 grid gap-3 rounded-3xl border border-border-button-default bg-background-secondary-default p-4 sm:grid-cols-2">
        <Field label="Type" htmlFor="pa-kind">
          <Select id="pa-kind" name="kind" defaultValue="bank">
            <option value="bank">Bank</option>
            <option value="ewallet">E-wallet</option>
          </Select>
        </Field>
        <Field label="Bank or e-wallet" htmlFor="pa-institution" hint="As clients know it, e.g. BDO, BPI, GCash, Maya.">
          <Input id="pa-institution" name="institution" required />
        </Field>
        <Field label="Account name" htmlFor="pa-name">
          <Input id="pa-name" name="account_name" required />
        </Field>
        <Field label="Account number" htmlFor="pa-number" hint="For an e-wallet, the mobile number.">
          <Input id="pa-number" name="account_number" required inputMode="numeric" />
        </Field>
        <Field label="Used for" htmlFor="pa-purpose" hint="Tax money is best kept in a separate account.">
          <Select id="pa-purpose" name="purpose" defaultValue="fees">
            <option value="fees">Our fees</option>
            <option value="client_tax_funds">Client tax payments</option>
          </Select>
        </Field>
        <Field label="QR code" htmlFor="pa-qr" hint="PNG, JPEG or WebP, up to 1 MB.">
          <Input id="pa-qr" name="qr" type="file" accept="image/png,image/jpeg,image/webp" className="py-2" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Instructions for clients (optional)" htmlFor="pa-instructions" hint="E.g. InstaPay and PESONet accepted. Send a screenshot of the transfer.">
            <Textarea id="pa-instructions" name="instructions" rows={2} />
          </Field>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Add Account"}</Button>
          <Result state={state} />
        </div>
      </form>
    </details>
  );
}

export function ReplaceQrForm({ accountId, oldPath }: { accountId: string; oldPath: string | null }) {
  const [state, run, pending] = useActionState(replaceQrAction.bind(null, accountId, oldPath), {} as PaymentSettingsState);
  return (
    <details>
      <summary className="cursor-pointer list-none text-body-regular text-button-ghost-foreground hover:underline">{oldPath ? "Replace QR" : "Add QR"}</summary>
      <form action={run} className="mt-2 flex flex-wrap items-end gap-2">
        <Input name="qr" type="file" accept="image/png,image/jpeg,image/webp" required aria-label="QR code image" className="w-60 py-2" />
        <Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Uploading…" : "Upload"}</Button>
        <Result state={state} />
      </form>
    </details>
  );
}

export function ToggleAccountButton({ accountId, active }: { accountId: string; active: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" disabled={pending} onClick={() => start(async () => void (await setAccountActiveAction(accountId, !active)))} className="text-body-regular text-button-ghost-foreground hover:underline disabled:opacity-50">
      {pending ? "Saving…" : active ? "Hide" : "Show again"}
    </button>
  );
}

export function PaymentDaysForm({ days }: { days: number }) {
  const [state, run, pending] = useActionState(setPaymentDaysAction, {} as PaymentSettingsState);
  return (
    <form action={run} className="flex flex-wrap items-end gap-3">
      <Field label="Days to pay a statement" htmlFor="soa_payment_days" hint="A statement issued on the 10th with 5 days is payable by the 15th. Tax items keep their own BIR due date.">
        <Input id="soa_payment_days" name="soa_payment_days" type="number" min={0} max={31} defaultValue={days} required className="w-24 text-end tabular-nums" />
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      <Result state={state} />
    </form>
  );
}
