"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { inviteStaffAction, updateStaffAction, type FormState } from "./actions";

type BranchOption = { id: string; name: string; active: boolean };

function BranchOptions({ branches, current }: { branches: BranchOption[]; current?: string | null }) {
  return branches
    .filter((b) => b.active || b.id === current)
    .map((b) => <option key={b.id} value={b.id}>{b.name}{b.active ? "" : " (closed)"}</option>);
}

export function InviteStaffForm({ branches }: { branches: BranchOption[] }) {
  const [state, action, pending] = useActionState(inviteStaffAction, {} as FormState);
  const e = state.fieldErrors ?? {};
  const open = branches.filter((b) => b.active);
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_9rem_10rem_auto] lg:items-end">
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
      <Field label="Branch" htmlFor="branch_id" error={e.branch_id}>
        <Select id="branch_id" name="branch_id" defaultValue={open.length === 1 ? open[0].id : ""} required>
          {open.length !== 1 && <option value="" disabled>Choose…</option>}
          <BranchOptions branches={branches} />
        </Select>
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Adding…" : "Add staff"}</Button>
      {(state.ok || (state.error && !state.fieldErrors)) && (
        <div className="sm:col-span-2 lg:col-span-5"><Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice></div>
      )}
    </form>
  );
}

export function StaffRowForm({ userId, role, capacity, active, branchId, branches }: { userId: string; role: string; capacity: number; active: boolean; branchId: string | null; branches: BranchOption[] }) {
  const [state, action, pending] = useActionState(updateStaffAction.bind(null, userId), {} as FormState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor={`role-${userId}`}>Role</label>
      <Select id={`role-${userId}`} name="role" defaultValue={role} className="w-32">
        <option value="staff">Staff</option>
        <option value="reviewer">Reviewer</option>
      </Select>
      <label className="sr-only" htmlFor={`branch-${userId}`}>Branch</label>
      <Select id={`branch-${userId}`} name="branch_id" defaultValue={branchId ?? ""} className="w-36" required>
        {!branchId && <option value="" disabled>Branch…</option>}
        <BranchOptions branches={branches} current={branchId} />
      </Select>
      <label className="sr-only" htmlFor={`cap-${userId}`}>Capacity points</label>
      <Input id={`cap-${userId}`} name="capacity_points" type="number" min={0} max={500} step="1" defaultValue={capacity} className="w-20 text-end tabular-nums" />
      <label className="flex items-center gap-1.5 text-body-regular text-text-primary">
        <input type="checkbox" name="active" defaultChecked={active} className="size-4" /> Active
      </label>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
      {state.ok && !pending && <span className="text-caption-1-regular text-status-lime-text">{state.ok}</span>}
    </form>
  );
}
