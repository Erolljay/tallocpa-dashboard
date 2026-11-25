"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, Textarea } from "@/components/ui";
import { convertLeadAction, sendProposalAction, setFunnelOpenAction, setLeadStatusAction, type LeadState } from "./actions";

export function FunnelSwitch({ open }: { open: boolean }) {
  const [state, action, pending] = useActionState(async () => setFunnelOpenAction(!open), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant={open ? "secondary" : "primary"} disabled={pending}>{pending ? "Saving…" : open ? "Close the funnel" : "Open the funnel to the public"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

export function ProposalForm({ leadId, defaultTerms }: { leadId: string; defaultTerms: string }) {
  const [state, action, pending] = useActionState(sendProposalAction.bind(null, leadId), {} as LeadState);
  const [copied, setCopied] = useState(false);
  const url = state.link && typeof window !== "undefined" ? `${window.location.origin}${state.link}` : state.link;
  return (
    <form action={action} className="space-y-3">
      <Field label="Terms of engagement" htmlFor="p-terms" hint="Draft terms; edit them for this client if needed.">
        <Textarea id="p-terms" name="terms" rows={12} defaultValue={defaultTerms} />
      </Field>
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Valid for (days)" htmlFor="p-days"><Input id="p-days" name="valid_days" type="number" min={1} max={120} defaultValue={30} className="w-28 tabular-nums" /></Field>
        <Button type="submit" disabled={pending}>{pending ? "Preparing…" : "Prepare the proposal"}</Button>
      </div>
      <p className="text-caption-1-regular text-text-secondary">Priced on today&apos;s active fee schedule from the lead&apos;s profile. A new proposal replaces the one not yet accepted.</p>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      {state.ok && url && (
        <Notice tone="done">
          {state.ok}{" "}
          <a href={state.link} target="_blank" rel="noreferrer" className="underline">Open it</a>{" · "}
          <button type="button" className="underline" onClick={() => navigator.clipboard.writeText(url).then(() => setCopied(true))}>{copied ? "Link copied" : "Copy the link"}</button>
        </Notice>
      )}
    </form>
  );
}

export function LostForm({ leadId, lost }: { leadId: string; lost: boolean }) {
  const [state, action, pending] = useActionState(setLeadStatusAction.bind(null, leadId, lost ? "new" : "lost"), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      {!lost && <Field label="Why lost (optional)" htmlFor="l-reason"><Input id="l-reason" name="reason" className="w-64" /></Field>}
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : lost ? "Reopen the lead" : "Mark lost"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

export function ConvertForm({ leadId, defaultStart }: { leadId: string; defaultStart: string }) {
  const [state, action, pending] = useActionState(convertLeadAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <Field label="Services start" htmlFor="c-start"><Input id="c-start" name="start" type="date" defaultValue={defaultStart} /></Field>
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Make the client (Onboarding)"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
