"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { PARTY_KINDS, VAT_STATUSES, type Party, type PartyKind } from "@/lib/parties/format";
import { mergePartyAction, savePartyAction, setPartyVerifiedAction, type PartyFormState } from "./actions";

/** New or edit. Names go in the registered-name box for companies, or last / first / middle for individuals, as on the COR. */
export function PartyForm({ party, disabled }: { party?: Party; disabled?: boolean }) {
  const [state, action, pending] = useActionState(savePartyAction.bind(null, party?.id ?? null), {} as PartyFormState);
  const [kind, setKind] = useState<PartyKind>(party?.kind ?? "non_individual");
  const e = state.fieldErrors ?? {};
  const text = (name: keyof Party, label: string, opts: { hint?: string; wide?: boolean; placeholder?: string } = {}) => (
    <div className={opts.wide ? "sm:col-span-2" : undefined}>
      <Field label={label} htmlFor={`p-${name}`} hint={opts.hint} error={e[name]}>
        <Input id={`p-${name}`} name={name} defaultValue={(party?.[name] as string | null) ?? ""} placeholder={opts.placeholder} disabled={disabled} aria-invalid={e[name] ? true : undefined} />
      </Field>
    </div>
  );

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {text("tin", "TIN", { placeholder: "123-456-789" })}
        {text("branch_code", "Branch code", { hint: "000 or 00000 for the head office.", placeholder: "00000" })}
        <Field label="Taxpayer kind" htmlFor="p-kind">
          <Select id="p-kind" name="kind" value={kind} onChange={(ev) => setKind(ev.target.value as PartyKind)} disabled={disabled}>
            {Object.entries(PARTY_KINDS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </Field>
        <Field label="VAT status" htmlFor="p-vat_status">
          <Select id="p-vat_status" name="vat_status" defaultValue={party?.vat_status ?? "unknown"} disabled={disabled}>
            {Object.entries(VAT_STATUSES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </Field>
        {kind === "non_individual" ? (
          text("registered_name", "Registered name", { wide: true, hint: "Exactly as on the COR; BIR attachments use it." })
        ) : (
          <>
            {text("last_name", "Last name")}
            {text("first_name", "First name")}
            {text("middle_name", "Middle name")}
          </>
        )}
        {text("trade_name", "Trade name", { wide: kind === "non_individual" })}
        {text("registered_address", "Registered address", { wide: true })}
        {text("zip_code", "ZIP code", { placeholder: "5000" })}
        <div className="sm:col-span-2">
          <Field label="Notes" htmlFor="p-notes" error={e.notes}>
            <Textarea id="p-notes" name="notes" rows={2} defaultValue={party?.notes ?? ""} disabled={disabled} />
          </Field>
        </div>
      </div>
      {!disabled && (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending}>{pending ? "Saving…" : party ? "Save" : "Add party"}</Button>
          {state.ok && <span className="text-body-regular text-status-lime-text">{state.ok}</span>}
        </div>
      )}
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

export function VerifyButton({ partyId, verified }: { partyId: string; verified: boolean }) {
  const [state, action, pending] = useActionState(async () => setPartyVerifiedAction(partyId, !verified), {} as PartyFormState);
  return (
    <form action={action} className="flex items-center gap-2">
      <Button type="submit" variant={verified ? "ghost" : "secondary"} size="sm" disabled={pending}>
        {verified ? "Undo verification" : "Mark verified"}
      </Button>
      {state.error && <span className="text-body-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

export function MergeForm({ partyId }: { partyId: string }) {
  const [state, action, pending] = useActionState(mergePartyAction.bind(null, partyId), {} as PartyFormState);
  return (
    <form action={action} className="space-y-3">
      <p className="text-body-regular text-text-secondary">
        Moves the duplicate&rsquo;s client links here, fills blanks from it, then deletes it. A verified party is always the one kept.
        Documents already approved keep the TIN they were approved with.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-56 flex-1">
          <Field label="Duplicate's TIN and branch" htmlFor="duplicate">
            <Input id="duplicate" name="duplicate" required placeholder="123-456-789-00000" />
          </Field>
        </div>
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Merging…" : "Merge into this party"}</Button>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
