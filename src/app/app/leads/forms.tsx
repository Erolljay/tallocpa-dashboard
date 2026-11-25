"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import {
  assignReviewerAction,
  convertLeadAction,
  markLostAction,
  recordCallAction,
  reopenLeadAction,
  sendProposalAction,
  setFunnelOpenAction,
  type LeadState,
} from "./actions";

type Person = { user_id: string; full_name: string };

function Result({ state }: { state: LeadState }) {
  if (state.error) return <Notice tone="blocked">{state.error}</Notice>;
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

export function FunnelSwitch({ open }: { open: boolean }) {
  const [state, action, pending] = useActionState(async () => setFunnelOpenAction(!open), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant={open ? "secondary" : "primary"} disabled={pending}>{pending ? "Saving…" : open ? "Close the funnel" : "Open the funnel to the public"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** The Owner assigns the lead's reviewer. */
export function ReviewerForm({ leadId, current, reviewers }: { leadId: string; current: string | null; reviewers: Person[] }) {
  const [state, action, pending] = useActionState(assignReviewerAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <Field label="Reviewer" htmlFor="l-reviewer" hint="Holds the discovery call and writes its notes.">
        <Select id="l-reviewer" name="reviewer" defaultValue={current ?? ""} className="w-60">
          <option value="">Not assigned</option>
          {reviewers.map((r) => <option key={r.user_id} value={r.user_id}>{r.full_name}</option>)}
        </Select>
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Assign"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** The reviewer records the discovery call: when, and the notes. */
export function DiscoveryCallForm({ leadId, defaultAt }: { leadId: string; defaultAt: string }) {
  const [state, action, pending] = useActionState(recordCallAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="space-y-3">
      <Field label="Held on (Manila time)" htmlFor="d-at">
        <Input id="d-at" name="held_at" type="datetime-local" defaultValue={defaultAt} className="w-64 tabular-nums" />
      </Field>
      <Field label="Notes of the call" htmlFor="d-notes" hint="What the client needs, their records, deadlines at risk, and what was agreed next.">
        <Textarea id="d-notes" name="notes" rows={6} />
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Record the call"}</Button>
      <Result state={state} />
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

/** Lost, with the reason (required). */
export function LostForm({ leadId }: { leadId: string }) {
  const [state, action, pending] = useActionState(markLostAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <Field label="Why it was lost" htmlFor="l-reason" error={state.error}>
        <Input id="l-reason" name="reason" required maxLength={500} className="w-72" />
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Mark lost"}</Button>
    </form>
  );
}

export function ReopenForm({ leadId }: { leadId: string }) {
  const [state, action, pending] = useActionState(async () => reopenLeadAction(leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Reopen the lead"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** Won → Onboarding: the client's own preparer and reviewer are picked here. */
export function ConvertForm({ leadId, defaultStart, staff, reviewers, leadReviewer }: { leadId: string; defaultStart: string; staff: Person[]; reviewers: Person[]; leadReviewer: string | null }) {
  const [state, action, pending] = useActionState(convertLeadAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Services start" htmlFor="c-start"><Input id="c-start" name="start" type="date" defaultValue={defaultStart} /></Field>
        <Field label="Client's preparer" htmlFor="c-prep">
          <Select id="c-prep" name="preparer" defaultValue="" className="w-56">
            <option value="">Assign later</option>
            {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
          </Select>
        </Field>
        <Field label="Client's reviewer" htmlFor="c-rev">
          <Select id="c-rev" name="reviewer" defaultValue={leadReviewer ?? ""} className="w-56">
            <option value="">Assign later</option>
            {reviewers.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
          </Select>
        </Field>
      </div>
      <p className="text-caption-1-regular text-text-secondary">The client&apos;s reviewer may differ from the lead&apos;s. Either can be left for the Team card; the onboarding checklist asks for both.</p>
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Make the client (Onboarding)"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
