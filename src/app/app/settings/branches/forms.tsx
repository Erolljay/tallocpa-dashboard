"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice } from "@/components/ui";
import type { Branch } from "@/lib/branches";
import { addBranchAction, updateBranchAction, type BranchState } from "./actions";

export function AddBranchForm() {
  const [state, action, pending] = useActionState(addBranchAction, {} as BranchState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[7rem_1fr_1.5fr_auto] sm:items-end">
      <Field label="Code" htmlFor="code" error={e.code}>
        <Input id="code" name="code" placeholder="BAC" maxLength={6} required className="uppercase" />
      </Field>
      <Field label="Name" htmlFor="name" error={e.name}>
        <Input id="name" name="name" placeholder="Bacolod" required />
      </Field>
      <Field label="Address" htmlFor="address" error={e.address}>
        <Input id="address" name="address" />
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Adding…" : "Add branch"}</Button>
      {(state.ok || (state.error && !state.fieldErrors)) && (
        <div className="sm:col-span-4"><Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice></div>
      )}
    </form>
  );
}

export function BranchRowForm({ branch }: { branch: Branch }) {
  const [state, action, pending] = useActionState(updateBranchAction.bind(null, branch.id), {} as BranchState);
  return (
    <form action={action} className="grid gap-2 sm:grid-cols-[1fr_1.5fr_auto_auto] sm:items-center">
      <label className="sr-only" htmlFor={`name-${branch.id}`}>Name</label>
      <Input id={`name-${branch.id}`} name="name" defaultValue={branch.name} required />
      <label className="sr-only" htmlFor={`address-${branch.id}`}>Address</label>
      <Input id={`address-${branch.id}`} name="address" defaultValue={branch.address ?? ""} placeholder="Address" />
      <label className="flex items-center gap-1.5 text-body-regular text-text-primary">
        <input type="checkbox" name="active" defaultChecked={branch.active} className="size-4" /> Open
      </label>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary sm:col-span-4">{state.error}</span>}
      {state.ok && !pending && <span className="text-caption-1-regular text-status-lime-text sm:col-span-4">{state.ok}</span>}
    </form>
  );
}
