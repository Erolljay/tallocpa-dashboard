"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { addEngagementAction, assignStaffAction, removeAssignmentAction, setClientStatusAction, type FormState } from "../actions";
import { addClientUserAction, removeClientUserAction, type FormState as StaffFormState } from "../../staff/actions";

export function EngagementForm({ clientId, serviceLines }: { clientId: string; serviceLines: { code: string; name: string }[] }) {
  const [state, action, pending] = useActionState(addEngagementAction.bind(null, clientId), {} as FormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-[1fr_9rem_10rem_auto] sm:items-end">
      <Field label="Service line" htmlFor="service_line" error={e.service_line}>
        <Select id="service_line" name="service_line" defaultValue="tax_compliance">
          {serviceLines.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </Select>
      </Field>
      <Field label="Monthly fee (₱)" htmlFor="monthly_retainer" error={e.monthly_retainer}>
        <Input id="monthly_retainer" name="monthly_retainer" type="number" min={0} step="0.01" required className="text-right tabular-nums" />
      </Field>
      <Field label="Starts" htmlFor="start_date" error={e.start_date}>
        <Input id="start_date" name="start_date" type="date" required />
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Adding…" : "Add"}</Button>
      {state.error && !state.fieldErrors && <div className="sm:col-span-4"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}

export function AssignForm({ clientId, staff }: { clientId: string; staff: { user_id: string; full_name: string }[] }) {
  const [state, action, pending] = useActionState(assignStaffAction.bind(null, clientId), {} as FormState);
  return (
    <form action={action} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-[1fr_9rem_auto] sm:items-end">
      <p className="text-sm font-medium text-ink-heading sm:col-span-3">Assign a preparer or reviewer</p>
      <Field label="Staff member" htmlFor="user_id">
        <Select id="user_id" name="user_id" defaultValue="" required>
          <option value="" disabled>Choose…</option>
          {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
        </Select>
      </Field>
      <Field label="Role" htmlFor="role">
        <Select id="role" name="role" defaultValue="preparer">
          <option value="preparer">Preparer</option>
          <option value="reviewer">Reviewer</option>
        </Select>
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Assigning…" : "Assign"}</Button>
      {state.error && <div className="sm:col-span-3"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}

export function RemoveAssignmentButton({ clientId, userId, role }: { clientId: string; userId: string; role: "preparer" | "reviewer" }) {
  const [state, action, pending] = useActionState(async () => removeAssignmentAction(clientId, userId, role), {} as FormState);
  return (
    <form action={action}>
      <button type="submit" disabled={pending} className="text-xs text-danger-text hover:underline">{pending ? "Removing…" : "Remove"}</button>
      {state.error && <span className="ml-2 text-xs text-danger-text">{state.error}</span>}
    </form>
  );
}

export function StatusButton({ clientId, to, label }: { clientId: string; to: "active" | "inactive"; label: string }) {
  const [state, action, pending] = useActionState(setClientStatusAction.bind(null, clientId, to), {} as FormState);
  return (
    <form action={action}>
      <Button type="submit" variant={to === "active" ? "primary" : "secondary"} disabled={pending}>{label}</Button>
      {state.error && <p className="mt-2 text-xs text-danger-text">{state.error}</p>}
    </form>
  );
}

export function ClientUserForm({ clientId }: { clientId: string }) {
  const [state, action, pending] = useActionState(addClientUserAction.bind(null, clientId), {} as StaffFormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
      <Field label="Full name" htmlFor="cu_full_name" error={e.full_name}>
        <Input id="cu_full_name" name="full_name" required />
      </Field>
      <Field label="Email" htmlFor="cu_email" error={e.email}>
        <Input id="cu_email" name="email" type="email" required />
      </Field>
      <Field label="Position (optional)" htmlFor="cu_position" error={e.position}>
        <Input id="cu_position" name="position" placeholder="Owner, bookkeeper…" />
      </Field>
      <div className="flex items-end">
        <Button type="submit" variant="secondary" disabled={pending} className="w-full">{pending ? "Adding…" : "Give portal access"}</Button>
      </div>
      {(state.ok || (state.error && !state.fieldErrors)) && (
        <div className="sm:col-span-2"><Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice></div>
      )}
    </form>
  );
}

export function RemoveClientUserButton({ clientId, userId }: { clientId: string; userId: string }) {
  const [state, action, pending] = useActionState(async () => removeClientUserAction(clientId, userId), {} as StaffFormState);
  return (
    <form action={action}>
      <button type="submit" disabled={pending} className="text-xs text-danger-text hover:underline">{pending ? "Removing…" : "Remove"}</button>
      {state.error && <span className="ml-2 text-xs text-danger-text">{state.error}</span>}
    </form>
  );
}
