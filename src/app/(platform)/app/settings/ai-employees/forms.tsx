"use client";

import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { KEY_LIFETIMES } from "@/lib/ai/credentials";
import { BOOKS_LEVELS, type BooksLevel } from "@/lib/ai/workforce";
import { cx } from "@/utils/cx";
import {
  addWorkforceAction,
  assignClientAction,
  createKeyAction,
  revokeKeyAction,
  setAiEnabledAction,
  unassignClientAction,
  updateAiSettingsAction,
  type AiState,
} from "./actions";

function Result({ state }: { state: AiState }) {
  if (!state.ok && !(state.error && !state.fieldErrors)) return null;
  return <Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice>;
}

export function AddWorkforceButton({ missing }: { missing: number }) {
  const [state, action, pending] = useActionState(addWorkforceAction, {} as AiState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" disabled={pending}>
        {pending ? "Adding…" : `Add ${missing} AI employee${missing === 1 ? "" : "s"}`}
      </Button>
      <Result state={state} />
    </form>
  );
}

export function EnabledSwitch({ userId, aiKey, enabled, name }: { userId: string; aiKey: string; enabled: boolean; name: string }) {
  const [state, action, pending] = useActionState(async () => setAiEnabledAction(userId, aiKey, !enabled), {} as AiState);
  return (
    <form action={action} className="flex items-center gap-2">
      <Button type="submit" variant={enabled ? "secondary" : "primary"} size="sm" disabled={pending} aria-label={`${enabled ? "Switch off" : "Switch on"} ${name}`}>
        {pending ? "Saving…" : enabled ? "Switch off" : "Switch on"}
      </Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

export interface SettingsValues {
  supervisor_user_id: string | null;
  books_level: BooksLevel;
  all_clients: boolean;
  daily_limit: number;
  monthly_cap: string;
}

export function SettingsForm({
  userId,
  aiKey,
  values,
  staff,
  clientData,
  spendsOnApi,
}: {
  userId: string;
  aiKey: string;
  values: SettingsValues;
  staff: { user_id: string; full_name: string }[];
  clientData: boolean;
  spendsOnApi: boolean;
}) {
  const [state, action, pending] = useActionState(updateAiSettingsAction.bind(null, userId, aiKey), {} as AiState);
  const [level, setLevel] = useState<BooksLevel>(values.books_level);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field label="Supervisor" htmlFor="supervisor_user_id" hint="The person who checks its work." error={e.supervisor_user_id}>
        <Select id="supervisor_user_id" name="supervisor_user_id" defaultValue={values.supervisor_user_id ?? ""}>
          <option value="">The Owner</option>
          {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
        </Select>
      </Field>
      {clientData ? (
        <Field label="Books access" htmlFor="books_level" hint={BOOKS_LEVELS[level].detail} error={e.books_level}>
          <Select id="books_level" name="books_level" value={level} onChange={(ev) => setLevel(ev.target.value as BooksLevel)}>
            {(Object.keys(BOOKS_LEVELS) as BooksLevel[]).map((k) => <option key={k} value={k}>{BOOKS_LEVELS[k].label}</option>)}
          </Select>
        </Field>
      ) : (
        <div className="flex flex-col gap-1">
          <input type="hidden" name="books_level" value="none" />
          <p className="text-body-medium text-text-primary">Books access</p>
          <p className="text-body-regular text-text-secondary">None. Marketing never sees client records or books.</p>
        </div>
      )}
      <Field label="Calls per day" htmlFor="daily_limit" hint="It stops for the day at this number." error={e.daily_limit}>
        <Input id="daily_limit" name="daily_limit" type="number" min={0} max={100000} step={1} defaultValue={values.daily_limit} required className="text-end tabular-nums" />
      </Field>
      {spendsOnApi ? (
        <Field label="Monthly spending cap (₱)" htmlFor="monthly_cap" hint="Paid API use stops at this amount. ₱0 means it spends nothing." error={e.monthly_cap}>
          <Input id="monthly_cap" name="monthly_cap" type="number" min={0} step="0.01" defaultValue={values.monthly_cap} required className="text-end tabular-nums" />
        </Field>
      ) : (
        <div className="flex flex-col gap-1">
          <input type="hidden" name="monthly_cap" value={values.monthly_cap} />
          <p className="text-body-medium text-text-primary">Monthly spending cap</p>
          <p className="text-body-regular text-text-secondary">Not needed: it works in Cowork on your Claude plan.</p>
        </div>
      )}
      {clientData && (
        <label htmlFor="all_clients" className="flex items-start gap-2 text-body-regular text-text-primary sm:col-span-2">
          <input id="all_clients" type="checkbox" name="all_clients" defaultChecked={values.all_clients} className="mt-1 size-4 shrink-0" />
          <span>
            Every client
            <span className="block text-caption-1-regular text-text-tertiary">Instead of only the clients assigned below. Use for the Chief of Staff&apos;s summary view.</span>
          </span>
        </label>
      )}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save settings"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

export function AssignForm({ userId, aiKey, clients }: { userId: string; aiKey: string; clients: { id: string; name: string; code: string }[] }) {
  const [state, action, pending] = useActionState(assignClientAction.bind(null, userId, aiKey), {} as AiState);
  if (clients.length === 0) return <p className="text-body-regular text-text-secondary">Every client is already assigned.</p>;
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <div className="min-w-0 flex-1 basis-64">
        <Field label="Assign a client" htmlFor="client_id">
          <Select id="client_id" name="client_id" defaultValue="" required>
            <option value="" disabled>Choose…</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
          </Select>
        </Field>
      </div>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Assigning…" : "Assign"}</Button>
      <Result state={state} />
    </form>
  );
}

export function UnassignButton({ userId, aiKey, clientId, name }: { userId: string; aiKey: string; clientId: string; name: string }) {
  const [state, action, pending] = useActionState(async () => unassignClientAction(userId, aiKey, clientId), {} as AiState);
  return (
    <form action={action} className="flex items-center gap-2">
      <Button type="submit" variant="ghost" size="sm" disabled={pending} aria-label={`Remove ${name}`}>{pending ? "Removing…" : "Remove"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

function ShownOnce({ secret }: { secret: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border-button-default bg-background-secondary-default p-4 sm:col-span-2">
      <p className="text-body-medium text-text-primary">Copy this key now. It is not shown again.</p>
      <code dir="ltr" className="select-all break-all rounded-xl bg-background-primary-default px-3 py-2 font-mono text-body-regular text-text-primary">{secret}</code>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant="secondary" size="sm" onClick={copy}>
          {copied ? <RiCheckLine aria-hidden className="size-4" /> : <RiFileCopyLine aria-hidden className="size-4" />}
          {copied ? "Copied" : "Copy key"}
        </Button>
        <p role="status" aria-live="polite" className={cx("text-caption-1-regular", failed ? "text-text-error-primary" : "text-text-tertiary")}>
          {failed ? "Copy did not work here. Select the key above and copy it." : "Paste it into the AI employee's Cowork connector. Anyone with it can act as this AI employee."}
        </p>
      </div>
    </div>
  );
}

export function CreateKeyForm({ userId, aiKey }: { userId: string; aiKey: string }) {
  const [state, action, pending] = useActionState(createKeyAction.bind(null, userId, aiKey), {} as AiState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field label="Label" htmlFor="label" hint="Where it will be used." error={e.label}>
        <Input id="label" name="label" maxLength={80} placeholder="Cowork desk" />
      </Field>
      <Field label="Lasts" htmlFor="days" error={e.days}>
        <Select id="days" name="days" defaultValue="90">
          {Object.entries(KEY_LIFETIMES).map(([d, label]) => <option key={d} value={d}>{label}</option>)}
        </Select>
      </Field>
      {state.key && <ShownOnce secret={state.key} />}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Creating…" : "Create key"}</Button>
        {!state.key && <Result state={state} />}
      </div>
    </form>
  );
}

export function RevokeKeyButton({ id, aiKey }: { id: string; aiKey: string }) {
  const [confirming, setConfirming] = useState(false);
  const [state, action, pending] = useActionState(async () => revokeKeyAction(id, aiKey), {} as AiState);
  if (!confirming) {
    return <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(true)}>Revoke</Button>;
  }
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <span className="text-caption-1-regular text-text-secondary">Revoke for good?</span>
      <Button type="submit" variant="danger" size="sm" disabled={pending}>{pending ? "Revoking…" : "Yes, revoke"}</Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(false)}>Keep</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
