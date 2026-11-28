"use client";

import { useActionState } from "react";
import { acceptBirMailMatchAction, attachBirConfirmationAction, checkBirMailboxAction, dismissBirMailAction, linkBirMailAction, type BirMailState } from "@/app/(platform)/app/bir-mail/actions";
import { Button, Field, Select } from "@/components/ui";
import { decideAiDraftAction, type DraftDecisionState } from "@/lib/ai/draft-actions";

function Result({ state }: { state: BirMailState }) {
  if (!state.error && !state.ok) return null;
  return <span className={state.error ? "text-caption-1-regular text-text-error-primary" : "text-caption-1-regular text-text-secondary"}>{state.error ?? state.ok}</span>;
}

/**
 * Accept (links the email as proposed) or reject the BIR Mail Clerk's proposal. For a
 * filing confirmation that names a return, the first button attaches the confirmation's
 * PDF to the return as well (attach_bir_confirmation).
 */
export function BirMailProposalButtons({ draftId, path, confirmation = false }: { draftId: string; path: string; confirmation?: boolean }) {
  const [accState, accept, accepting] = useActionState(acceptBirMailMatchAction.bind(null, draftId, path), {} as BirMailState);
  const [attState, attach, attaching] = useActionState(attachBirConfirmationAction.bind(null, draftId, path), {} as BirMailState);
  const [rejState, reject, rejecting] = useActionState(decideAiDraftAction.bind(null, draftId, false, path), {} as DraftDecisionState);
  const busy = accepting || attaching || rejecting;
  const state = attState.error || attState.ok ? attState : accState.error || accState.ok ? accState : rejState;
  return (
    <form action={confirmation ? attach : accept} className="flex flex-wrap items-center gap-2">
      {confirmation ? (
        <>
          <Button type="submit" size="sm" disabled={busy}>{attaching ? "Attaching…" : "Attach confirmation"}</Button>
          <Button type="submit" size="sm" variant="secondary" formAction={accept} disabled={busy}>{accepting ? "Linking…" : "Link only"}</Button>
        </>
      ) : (
        <Button type="submit" size="sm" disabled={busy}>{accepting ? "Linking…" : "Accept and link"}</Button>
      )}
      <Button type="submit" size="sm" variant="secondary" formAction={reject} disabled={busy}>{rejecting ? "Rejecting…" : "Reject"}</Button>
      <Result state={state} />
    </form>
  );
}

export function CheckMailboxButton() {
  const [state, run, pending] = useActionState(checkBirMailboxAction, {} as BirMailState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Checking…" : "Check the mailboxes now"}</Button>
      <Result state={state} />
    </form>
  );
}

export function DismissBirMailButton({ mailId }: { mailId: string }) {
  const [state, run, pending] = useActionState(dismissBirMailAction.bind(null, mailId), {} as BirMailState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" variant="ghost" disabled={pending}>{pending ? "Setting aside…" : "Not a client's: set aside"}</Button>
      <Result state={state} />
    </form>
  );
}

/** The Owner links an email to a client (and, optionally, one of its returns) himself. */
export function LinkBirMailForm({ mailId, clients, returns }: { mailId: string; clients: { id: string; label: string }[]; returns: { id: string; clientId: string; label: string }[] }) {
  const [state, run, pending] = useActionState(linkBirMailAction.bind(null, mailId), {} as BirMailState);
  return (
    <form action={run} className="flex flex-col gap-3">
      <Field label="Client" htmlFor="bir-link-client">
        <Select id="bir-link-client" name="client_id" required defaultValue="">
          <option value="" disabled>Choose the client</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </Select>
      </Field>
      {returns.length > 0 && (
        <Field label="Return (optional)" htmlFor="bir-link-filing" hint="Returns of the clients whose TIN the email names.">
          <Select id="bir-link-filing" name="filing_id" defaultValue="">
            <option value="">No particular return</option>
            {returns.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </Select>
        </Field>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm" disabled={pending}>{pending ? "Linking…" : "Link"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}
