"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice } from "@/components/ui";
import { acceptProposalAction, type AcceptState } from "./actions";

export function AcceptForm({ token, contact }: { token: string; contact: string }) {
  const [state, action, pending] = useActionState(acceptProposalAction.bind(null, token), {} as AcceptState);
  if (state.ok) return <Notice tone="done">Accepted. Thank you. We will contact you to start onboarding.</Notice>;
  return (
    <form action={action} className="space-y-4 rounded-3xl border border-border-button-default bg-background-primary-default p-6 print:hidden">
      <h2 className="text-title-3-semibold text-text-primary">Accept this proposal</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your full name" htmlFor="a-name"><Input id="a-name" name="name" required defaultValue={contact} autoComplete="name" /></Field>
        <Field label="Position (optional)" htmlFor="a-pos"><Input id="a-pos" name="position" placeholder="Owner, President…" /></Field>
      </div>
      <label className="flex items-start gap-2 text-body-regular text-text-primary">
        <input type="checkbox" name="agree" className="mt-1 size-4 accent-accent-600" />
        I have read the proposal and the terms of engagement, I am authorized to accept them for the business, and I agree that typing my name here is my electronic signature.
      </label>
      <Button type="submit" disabled={pending}>{pending ? "Accepting…" : "Accept and sign"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
