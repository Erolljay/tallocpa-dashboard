"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import type { Branch } from "@/lib/branches";
import { StaffOptions } from "../client-form";
import { addEngagementAction, assignStaffAction, removeAssignmentAction, setClientStatusAction, setIncomeTaxMethodAction, type FormState } from "../actions";
import { addClientUserAction, removeClientUserAction, type FormState as StaffFormState } from "../../staff/actions";

export function EngagementForm({ clientId, serviceLines }: { clientId: string; serviceLines: { code: string; name: string }[] }) {
  const [state, action, pending] = useActionState(addEngagementAction.bind(null, clientId), {} as FormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="mt-4 grid gap-3 border-t border-separator-border pt-4 sm:grid-cols-[1fr_9rem_10rem_auto] sm:items-end">
      <Field label="Service line" htmlFor="service_line" error={e.service_line}>
        <Select id="service_line" name="service_line" defaultValue="tax_compliance">
          {serviceLines.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </Select>
      </Field>
      <Field label="Monthly fee (₱)" htmlFor="monthly_retainer" error={e.monthly_retainer}>
        <Input id="monthly_retainer" name="monthly_retainer" type="number" min={0} step="0.01" required className="text-end tabular-nums" />
      </Field>
      <Field label="Starts" htmlFor="start_date" error={e.start_date}>
        <Input id="start_date" name="start_date" type="date" required />
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Adding…" : "Add"}</Button>
      {state.error && !state.fieldErrors && <div className="sm:col-span-4"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}

export function AssignForm({ clientId, staff, branches, branch }: { clientId: string; staff: { user_id: string; full_name: string; role: string; branch_id: string | null }[]; branches: Branch[]; branch: string | null }) {
  const [state, action, pending] = useActionState(assignStaffAction.bind(null, clientId), {} as FormState);
  return (
    <form action={action} className="mt-4 grid gap-3 border-t border-separator-border pt-4 sm:grid-cols-[1fr_9rem_auto] sm:items-end">
      <p className="text-body-medium text-text-primary sm:col-span-3">Assign a preparer or reviewer</p>
      <Field label="Staff member" htmlFor="user_id">
        <Select id="user_id" name="user_id" defaultValue="" required>
          <option value="" disabled>Choose…</option>
          <StaffOptions staff={staff} branches={branches} branch={branch} />
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
      <button type="submit" disabled={pending} className="text-caption-1-regular text-text-error-primary hover:underline">{pending ? "Removing…" : "Remove"}</button>
      {state.error && <span className="ml-2 text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** The client's income tax method (OSD, itemized, or 8% for individuals), used by the 1701Q and 1702Q worksheets. */
export function IncomeTaxMethodForm({ clientId, value, individual, canEdit }: { clientId: string; value: string | null; individual: boolean; canEdit: boolean }) {
  const [state, action, pending] = useActionState(setIncomeTaxMethodAction.bind(null, clientId), {} as FormState);
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <Field label="Income tax method" htmlFor="income_tax_method" hint={individual ? "Used by the 1701Q (and the 2551Q: on 8% no percentage tax is due)." : "Used by the 1702Q."}>
        <Select id="income_tax_method" name="income_tax_method" defaultValue={value ?? ""} disabled={!canEdit}>
          <option value="">Not set</option>
          <option value="osd">Optional standard deduction (OSD, 40%)</option>
          <option value="itemized">Itemized deductions</option>
          {individual && <option value="eight_percent">8% on gross sales or receipts</option>}
        </Select>
      </Field>
      {canEdit && <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>}
      {state.error && <div className="sm:col-span-2"><Notice tone="blocked">{state.error}</Notice></div>}
      {state.ok && <div className="sm:col-span-2"><Notice tone="done">Saved.</Notice></div>}
    </form>
  );
}

export function StatusButton({ clientId, to, label }: { clientId: string; to: "active" | "inactive"; label: string }) {
  const [state, action, pending] = useActionState(setClientStatusAction.bind(null, clientId, to), {} as FormState);
  return (
    <form action={action}>
      <Button type="submit" variant={to === "active" ? "primary" : "secondary"} disabled={pending}>{label}</Button>
      {state.error && <p className="mt-2 text-caption-1-regular text-text-error-primary">{state.error}</p>}
    </form>
  );
}

export function ClientUserForm({ clientId }: { clientId: string }) {
  const [state, action, pending] = useActionState(addClientUserAction.bind(null, clientId), {} as StaffFormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="mt-4 grid gap-3 border-t border-separator-border pt-4 sm:grid-cols-2">
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
      <button type="submit" disabled={pending} className="text-caption-1-regular text-text-error-primary hover:underline">{pending ? "Removing…" : "Remove"}</button>
      {state.error && <span className="ml-2 text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
