"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { inviteStaffAction, updateStaffAction, type FormState } from "./actions";

export function InviteStaffForm() {
  const [state, action, pending] = useActionState(inviteStaffAction, {} as FormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_9rem_auto] sm:items-end">
      <Field label="Full name" htmlFor="full_name" error={e.full_name}>
        <Input id="full_name" name="full_name" required />
      </Field>
      <Field label="Email" htmlFor="email" error={e.email}>
        <Input id="email" name="email" type="email" required />
      </Field>
      <Field label="Role" htmlFor="role" error={e.role}>
        <Select id="role" name="role" defaultValue="staff">
          <option value="staff">Staff</option>
          <option value="reviewer">Reviewer</option>
        </Select>
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Adding…" : "Add staff"}</Button>
      {(state.ok || (state.error && !state.fieldErrors)) && (
        <div className="sm:col-span-4"><Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice></div>
      )}
    </form>
  );
}

export function StaffRowForm({ userId, role, capacity, active }: { userId: string; role: string; capacity: number; active: boolean }) {
  const [state, action, pending] = useActionState(updateStaffAction.bind(null, userId), {} as FormState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor={`role-${userId}`}>Role</label>
      <Select id={`role-${userId}`} name="role" defaultValue={role} className="w-32">
        <option value="staff">Staff</option>
        <option value="reviewer">Reviewer</option>
      </Select>
      <label className="sr-only" htmlFor={`cap-${userId}`}>Capacity points</label>
      <Input id={`cap-${userId}`} name="capacity_points" type="number" min={0} max={500} step="1" defaultValue={capacity} className="w-20 text-right tabular-nums" />
      <label className="flex items-center gap-1.5 text-sm text-ink-strong">
        <input type="checkbox" name="active" defaultChecked={active} className="size-4 accent-[var(--action)]" /> Active
      </label>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      {state.error && <span className="text-xs text-danger-text">{state.error}</span>}
      {state.ok && !pending && <span className="text-xs text-success">{state.ok}</span>}
    </form>
  );
}
