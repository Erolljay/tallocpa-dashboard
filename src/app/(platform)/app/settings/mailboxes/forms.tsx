"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui";
import { checkMailboxesNowAction, disconnectMailboxAction, setMailboxPurposesAction, type MailboxState } from "./actions";

function Result({ state }: { state: MailboxState }) {
  if (!state.error && !state.ok) return null;
  return (
    <span role={state.error ? "alert" : "status"} className={state.error ? "text-caption-1-regular text-text-error-primary" : "text-caption-1-regular text-text-secondary"}>
      {state.error ?? state.ok}
    </span>
  );
}

/** What a mailbox is read for: BIR mail, payment confirmations. */
export function MailboxPurposesForm({ id, birMail, paymentMail }: { id: string; birMail: boolean; paymentMail: boolean }) {
  const [state, run, pending] = useActionState(setMailboxPurposesAction.bind(null, id), {} as MailboxState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <label className="flex items-center gap-2 text-body-regular text-text-primary">
        <input type="checkbox" name="bir_mail" defaultChecked={birMail} className="size-4 shrink-0" />
        BIR mail
      </label>
      <label className="flex items-center gap-2 text-body-regular text-text-primary">
        <input type="checkbox" name="payment_mail" defaultChecked={paymentMail} className="size-4 shrink-0" />
        Payment confirmations
      </label>
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      <Result state={state} />
    </form>
  );
}

export function DisconnectMailboxButton({ id }: { id: string }) {
  const [state, run, pending] = useActionState(async () => disconnectMailboxAction(id), {} as MailboxState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" variant="ghost" disabled={pending}>{pending ? "Disconnecting…" : "Disconnect"}</Button>
      <Result state={state} />
    </form>
  );
}

export function CheckMailboxesButton() {
  const [state, run, pending] = useActionState(async () => checkMailboxesNowAction(), {} as MailboxState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Checking…" : "Check all mailboxes now"}</Button>
      <Result state={state} />
    </form>
  );
}
