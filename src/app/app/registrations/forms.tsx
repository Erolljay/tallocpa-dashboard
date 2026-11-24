"use client";

import { useActionState, useState } from "react";
import { Badge, Button, Card, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import type { Branch } from "@/lib/branches";
import { months, taxpayerTypeLabel } from "@/lib/clients/labels";
import { TAXPAYER_TYPES, type TaxpayerType } from "@/lib/clients/obligations";
import { AGENCIES, STEP_STATUSES, stepsFor, type StepStatus } from "@/lib/registration/steps";
import { StaffOptions } from "../clients/client-form";
import { cancelRegistrationAction, completeRegistrationAction, openRegistrationAction, updateStepAction, type FormState } from "./actions";

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" });

/** New registration: the proposed business, what the firm handles, and a preview of the checklist. */
export function NewRegistrationForm({ staff, branches }: { staff: { user_id: string; full_name: string; role: string; branch_id: string | null }[]; branches: Branch[] }) {
  const [state, action, pending] = useActionState(openRegistrationAction, {} as FormState);
  const [type, setType] = useState<TaxpayerType>("individual");
  const [lguServed, setLguServed] = useState(true);
  const [employer, setEmployer] = useState(false);
  const openBranches = branches.filter((b) => b.active);
  const [branch, setBranch] = useState(openBranches.length === 1 ? openBranches[0].id : "");
  const e = state.fieldErrors ?? {};
  const preview = stepsFor(type, { lguServed, employer });

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-6">
        {state.error && <Notice tone="blocked">{state.error}</Notice>}
        <Card title="The business">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Proposed business name" htmlFor="name" error={e.name} hint="The name to register with DTI or SEC. It can be changed later if the name is not approved.">
                <Input id="name" name="name" required />
              </Field>
            </div>
            <Field label="Kind of business" htmlFor="taxpayer_type" error={e.taxpayer_type}>
              <Select id="taxpayer_type" name="taxpayer_type" value={type} onChange={(ev) => setType(ev.target.value as TaxpayerType)}>
                {TAXPAYER_TYPES.map((t) => <option key={t} value={t}>{t === "individual" ? "Sole proprietorship (Individual)" : taxpayerTypeLabel[t]}</option>)}
              </Select>
            </Field>
            <Field label="Taxable year ends" htmlFor="fiscal_year_end_month" error={e.fiscal_year_end_month}>
              <Select id="fiscal_year_end_month" name="fiscal_year_end_month" defaultValue="12" disabled={type === "individual"}>
                {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </Select>
              {type === "individual" && <input type="hidden" name="fiscal_year_end_month" value="12" />}
            </Field>
            <div className="sm:col-span-2">
              <Field label="Business address" htmlFor="registered_address" error={e.registered_address}>
                <Input id="registered_address" name="registered_address" />
              </Field>
            </div>
            <Field label="City / municipality" htmlFor="lgu" error={e.lgu} hint="Where the mayor's permit is applied for.">
              <Input id="lgu" name="lgu" placeholder="Iloilo City" />
            </Field>
            <Field label="Branch" htmlFor="branch_id" error={e.branch_id}>
              <Select id="branch_id" name="branch_id" value={branch} onChange={(ev) => setBranch(ev.target.value)} required>
                {!branch && <option value="" disabled>Choose…</option>}
                {openBranches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </Select>
            </Field>
          </div>
        </Card>

        <Card title="What we handle">
          <div className="grid gap-3">
            <label className="flex items-start gap-3 text-body-regular text-text-primary">
              <input type="checkbox" name="lgu_served" checked={lguServed} onChange={(ev) => setLguServed(ev.target.checked)} className="mt-1 size-4 shrink-0" />
              <span>Barangay clearance and mayor&rsquo;s permit (City Hall)<span className="block text-caption-1-regular text-text-tertiary">Leave unticked when the client gets these themselves.</span></span>
            </label>
            <label className="flex items-start gap-3 text-body-regular text-text-primary">
              <input type="checkbox" name="employer" checked={employer} onChange={(ev) => setEmployer(ev.target.checked)} className="mt-1 size-4 shrink-0" />
              <span>The business will have employees<span className="block text-caption-1-regular text-text-tertiary">Adds employer registration with SSS, PhilHealth (PHIC) and Pag-IBIG (HDMF).</span></span>
            </label>
          </div>
          <div className="mt-4 grid gap-4 border-t border-separator-border pt-4 sm:grid-cols-2">
            <Field label="Start date" htmlFor="start_date" error={e.start_date}>
              <Input id="start_date" name="start_date" type="date" required defaultValue={today()} />
            </Field>
            <Field label="Target date" htmlFor="target_date" error={e.target_date} hint="When the client wants to start operating.">
              <Input id="target_date" name="target_date" type="date" />
            </Field>
            <Field label="Preparer" htmlFor="preparer_id" error={e.preparer_id}>
              <Select id="preparer_id" name="preparer_id" defaultValue="">
                <option value="">Assign later</option>
                <StaffOptions staff={staff} branches={branches} branch={branch || null} />
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes" htmlFor="notes" error={e.notes}>
                <Textarea id="notes" name="notes" rows={3} />
              </Field>
            </div>
          </div>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" disabled={pending}>{pending ? "Opening…" : "Open registration"}</Button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <Card title="Checklist">
          <ol className="space-y-2 text-body-regular">
            {preview.map((s) => (
              <li key={s.code} className="flex items-start justify-between gap-3">
                <span className={s.status === "not_applicable" ? "text-text-tertiary line-through" : "text-text-primary"}>
                  <span className="text-caption-1-semibold text-text-tertiary">{AGENCIES[s.agency]}</span>
                  <span className="block">{s.label}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-caption-1-regular text-text-tertiary">Opening the registration adds the business as a client (Onboarding) with a Business Registration engagement.</p>
        </Card>
      </aside>
    </form>
  );
}

export interface StepRow {
  id: string;
  code: string;
  agency: keyof typeof AGENCIES;
  label: string;
  reference_label: string;
  status: StepStatus;
  reference_no: string | null;
  done_on: string | null;
  government_fee: string | null;
  notes: string | null;
}

/** One step, editable in place while the case is open. */
export function StepForm({ caseId, step, editable }: { caseId: string; step: StepRow; editable: boolean }) {
  const [state, action, pending] = useActionState(updateStepAction.bind(null, caseId, step.id), {} as FormState);
  const [status, setStatus] = useState<StepStatus>(step.status);
  const e = state.fieldErrors ?? {};
  const id = (f: string) => `${step.id}-${f}`;
  if (!editable) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="min-w-0">
          <p className="text-body-medium text-text-primary">{step.label}</p>
          <p className="text-caption-1-regular text-text-tertiary">
            {step.reference_no ? `${step.reference_label} ${step.reference_no}` : null}
            {step.done_on ? ` · ${step.done_on}` : null}
            {step.notes ? ` · ${step.notes}` : null}
          </p>
        </div>
        <StepBadge status={step.status} />
      </div>
    );
  }
  return (
    <form action={action} className="grid gap-3 py-4 sm:grid-cols-[1fr_11rem] sm:items-start">
      <div className="min-w-0">
        <p className="text-body-medium text-text-primary">{step.label}</p>
        {state.ok && !pending && <p className="text-caption-1-regular text-text-tertiary">Saved.</p>}
      </div>
      <Field label="Status" htmlFor={id("status")} error={e.status}>
        <Select id={id("status")} name="status" value={status} onChange={(ev) => setStatus(ev.target.value as StepStatus)}>
          {Object.entries(STEP_STATUSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </Select>
      </Field>
      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-[1fr_10rem_9rem]">
        <Field label={step.reference_label} htmlFor={id("reference_no")} error={e.reference_no}>
          <Input id={id("reference_no")} name="reference_no" defaultValue={step.reference_no ?? ""} placeholder={step.code === "bir_cor" ? "123-456-789-00000" : undefined} className="tabular-nums" />
        </Field>
        <Field label="Date done" htmlFor={id("done_on")} error={e.done_on}>
          <Input id={id("done_on")} name="done_on" type="date" defaultValue={step.done_on ?? ""} required={status === "done"} />
        </Field>
        <Field label="Gov't fee (₱)" htmlFor={id("government_fee")} error={e.government_fee}>
          <Input id={id("government_fee")} name="government_fee" type="number" min={0} step="0.01" defaultValue={step.government_fee ?? ""} className="text-end tabular-nums" />
        </Field>
      </div>
      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-[1fr_auto] sm:items-end">
        <Field label="Notes" htmlFor={id("notes")} error={e.notes}>
          <Input id={id("notes")} name="notes" defaultValue={step.notes ?? ""} />
        </Field>
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      </div>
      {state.error && !state.fieldErrors && <div className="sm:col-span-2"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}

const statusTone: Record<StepStatus, "neutral" | "progress" | "done" | "waiting" | "blocked"> = {
  pending: "neutral",
  in_progress: "progress",
  waiting_client: "waiting",
  waiting_agency: "waiting",
  done: "done",
  not_applicable: "neutral",
};

export function StepBadge({ status }: { status: StepStatus }) {
  return <Badge tone={statusTone[status]}>{STEP_STATUSES[status]}</Badge>;
}

export function CompleteButton({ caseId }: { caseId: string }) {
  const [state, action, pending] = useActionState(async () => completeRegistrationAction(caseId), {} as FormState);
  return (
    <form action={action} className="flex flex-col items-end gap-2">
      <Button type="submit" disabled={pending}>{pending ? "Completing…" : "Complete registration"}</Button>
      {state.error && <p className="max-w-xs text-end text-caption-1-regular text-text-error-primary">{state.error}</p>}
    </form>
  );
}

export function CancelForm({ caseId }: { caseId: string }) {
  const [state, action, pending] = useActionState(cancelRegistrationAction.bind(null, caseId), {} as FormState);
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <Field label="Reason for cancelling" htmlFor="reason" error={state.fieldErrors?.reason}>
        <Input id="reason" name="reason" required />
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Cancelling…" : "Cancel registration"}</Button>
      {state.error && !state.fieldErrors && <div className="sm:col-span-2"><Notice tone="blocked">{state.error}</Notice></div>}
    </form>
  );
}
