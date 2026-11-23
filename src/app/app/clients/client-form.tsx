"use client";

import { useActionState, useState } from "react";
import { Badge, Button, Card, Field, Input, Notice, Select } from "@/components/ui";
import { months, taxpayerTypeLabel } from "@/lib/clients/labels";
import { obligationChanges, obligationsForTaxTypes, TAX_TYPES, TAXPAYER_TYPES, type PlannedObligation, type TaxpayerType, type TaxType } from "@/lib/clients/obligations";
import type { FormState } from "./actions";

const frequencyLabel = { monthly: "Monthly", quarterly: "Quarterly", annual: "Annual" };

/** A client's saved details, to fill the edit form. */
export interface ClientValues {
  name: string;
  taxpayer_type: TaxpayerType;
  tin: string | null;
  rdo_code: string | null;
  registered_address: string | null;
  fiscal_year_end_month: number;
  filing_channel: "ebirforms" | "efps";
  efps_group: string | null;
  book_type: "manual" | "loose_leaf";
  payment_mode: "client_pays_direct" | "firm_remits";
  submission_cutoff_day: number;
  tax_types: TaxType[];
  /** Forms the client files now (open obligations). */
  open_forms: string[];
}

type Props =
  | {
      mode: "new";
      action: (state: FormState, form: FormData) => Promise<FormState>;
      /** Active staff who can be assigned as preparer or reviewer. */
      staff: { user_id: string; full_name: string; role: string }[];
    }
  | { mode: "edit"; action: (state: FormState, form: FormData) => Promise<FormState>; client: ClientValues };

/** New-client and edit-client form (spec §3.2). */
export function ClientForm(props: Props) {
  const initial = props.mode === "edit" ? props.client : undefined;
  const [state, action, pending] = useActionState(props.action, {} as FormState);
  const [type, setType] = useState<TaxpayerType>(initial?.taxpayer_type ?? "corporation");
  const [taxTypes, setTaxTypes] = useState<TaxType[]>(initial?.tax_types ?? ["income_tax"]);
  const [channel, setChannel] = useState<string>(initial?.filing_channel ?? "ebirforms");
  const e = state.fieldErrors ?? {};

  let preview: PlannedObligation[] = [];
  let previewError: string | undefined;
  try {
    preview = obligationsForTaxTypes(type, taxTypes);
  } catch (err) {
    previewError = (err as Error).message;
  }
  const changes = initial ? obligationChanges(initial.open_forms.map((form) => ({ form })), preview) : { add: [], end: [] };
  const starting = new Set(changes.add.map((o) => o.form));
  const taxSetupChanged = changes.add.length > 0 || changes.end.length > 0;

  const toggle = (t: TaxType) => setTaxTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-6">
        {state.error && <Notice tone="blocked">{state.error}</Notice>}
        <Card title="Registration (from the COR)">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Registered name" htmlFor="name" error={e.name}>
                <Input id="name" name="name" required defaultValue={initial?.name} />
              </Field>
            </div>
            <Field label="Taxpayer type" htmlFor="taxpayer_type" error={e.taxpayer_type}>
              <Select id="taxpayer_type" name="taxpayer_type" value={type} onChange={(ev) => setType(ev.target.value as TaxpayerType)}>
                {TAXPAYER_TYPES.map((t) => <option key={t} value={t}>{taxpayerTypeLabel[t]}</option>)}
              </Select>
            </Field>
            <Field label="TIN" htmlFor="tin" error={e.tin}>
              <Input id="tin" name="tin" inputMode="numeric" placeholder="123-456-789-00000" defaultValue={initial?.tin ?? undefined} />
            </Field>
            <Field label="RDO" htmlFor="rdo_code" error={e.rdo_code}>
              <Input id="rdo_code" name="rdo_code" placeholder="074" defaultValue={initial?.rdo_code ?? undefined} />
            </Field>
            {props.mode === "new" && (
              <Field label="Registration date" htmlFor="registration_date" hint="Filing starts from this date." error={e.registration_date}>
                <Input id="registration_date" name="registration_date" type="date" required />
              </Field>
            )}
            <div className="sm:col-span-2">
              <Field label="Registered address" htmlFor="registered_address" error={e.registered_address}>
                <Input id="registered_address" name="registered_address" defaultValue={initial?.registered_address ?? undefined} />
              </Field>
            </div>
          </div>
        </Card>

        <Card title="Tax types">
          <fieldset>
            <legend className="sr-only">Tax types on the COR</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(TAX_TYPES) as TaxType[]).map((t) => (
                <label key={t} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-ink-strong has-checked:border-action has-checked:bg-surface-tint">
                  <input type="checkbox" name="tax_types" value={t} checked={taxTypes.includes(t)} onChange={() => toggle(t)} className="size-4 accent-[var(--action)]" />
                  {TAX_TYPES[t]}
                </label>
              ))}
            </div>
            {(e.tax_types || previewError) && <p className="mt-2 text-xs text-danger-text">{e.tax_types ?? previewError}</p>}
          </fieldset>
          {taxSetupChanged && (
            <div className="mt-4 border-t border-border pt-4">
              <Field
                label="Change took effect on"
                htmlFor="effective_date"
                hint="Usually the date on the updated COR. New forms start, and dropped forms stop, from this date."
                error={e.effective_date}
              >
                <Input id="effective_date" name="effective_date" type="date" required />
              </Field>
            </div>
          )}
        </Card>

        <Card title="How we work with this client">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Filing channel" htmlFor="filing_channel">
              <Select id="filing_channel" name="filing_channel" value={channel} onChange={(ev) => setChannel(ev.target.value)}>
                <option value="ebirforms">eBIRForms</option>
                <option value="efps">eFPS</option>
              </Select>
            </Field>
            {channel === "efps" && (
              <Field label="eFPS group" htmlFor="efps_group" error={e.efps_group}>
                <Select id="efps_group" name="efps_group" defaultValue={initial?.efps_group ?? ""}>
                  <option value="" disabled>Choose…</option>
                  {["A", "B", "C", "D", "E"].map((g) => <option key={g} value={g}>Group {g}</option>)}
                </Select>
              </Field>
            )}
            <Field label="Taxable year ends" htmlFor="fiscal_year_end_month">
              <Select id="fiscal_year_end_month" name="fiscal_year_end_month" defaultValue={String(initial?.fiscal_year_end_month ?? 12)}>
                {months.map((m, i) => <option key={m} value={i + 1}>{m}{i === 11 ? " (calendar year)" : ""}</option>)}
              </Select>
            </Field>
            <Field label="Books" htmlFor="book_type">
              <Select id="book_type" name="book_type" defaultValue={initial?.book_type ?? "manual"}>
                <option value="manual">Manual books</option>
                <option value="loose_leaf">Loose-leaf books</option>
              </Select>
            </Field>
            <Field label="Who pays BIR" htmlFor="payment_mode" hint="Firm-remits clients deposit tax dues with us first.">
              <Select id="payment_mode" name="payment_mode" defaultValue={initial?.payment_mode ?? "client_pays_direct"}>
                <option value="client_pays_direct">Client pays BIR directly</option>
                <option value="firm_remits">We remit for the client</option>
              </Select>
            </Field>
            <Field label="Document cutoff" htmlFor="submission_cutoff_day" hint="Day of the following month documents are due." error={e.submission_cutoff_day}>
              <Input id="submission_cutoff_day" name="submission_cutoff_day" type="number" min={1} max={28} defaultValue={initial?.submission_cutoff_day ?? 5} />
            </Field>
          </div>
        </Card>

        {props.mode === "new" && (
          <Card title="Team">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preparer" htmlFor="preparer_id" hint="Does the client's work." error={e.preparer_id}>
                <Select id="preparer_id" name="preparer_id" defaultValue="">
                  <option value="">Assign later</option>
                  {props.staff.filter((s) => s.role !== "owner").map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
                </Select>
              </Field>
              <Field label="Reviewer" htmlFor="reviewer_id" hint="Checks the work before it goes to you." error={e.reviewer_id}>
                <Select id="reviewer_id" name="reviewer_id" defaultValue="">
                  <option value="">Assign later</option>
                  {props.staff.filter((s) => s.role !== "owner").map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
                </Select>
              </Field>
            </div>
          </Card>
        )}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
        <Card title="Filing obligations">
          {preview.length === 0 && changes.end.length === 0 ? (
            <p className="text-sm text-ink-muted">Tick the tax types on the COR to see the forms this client will file.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {preview.map((o) => (
                <li key={o.form} className="flex items-center justify-between gap-2 py-2">
                  <span className="font-medium text-ink-heading">{o.form}</span>
                  <span className="flex items-center gap-2 text-ink-muted">
                    {starting.has(o.form) && initial && <Badge tone="progress">Starts</Badge>}
                    {frequencyLabel[o.frequency]}
                  </span>
                </li>
              ))}
              {changes.end.map((form) => (
                <li key={form} className="flex items-center justify-between gap-2 py-2">
                  <span className="font-medium text-ink-subtle line-through">{form}</span>
                  <Badge tone="waiting">Stops</Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-ink-subtle">
            {props.mode === "new" ? "Check against the COR. You can edit the client after saving." : "Filings already started stay; dropped forms stop from the effective date."}
          </p>
        </Card>
        <Button type="submit" className="w-full" disabled={pending || Boolean(previewError)}>
          {pending ? "Saving…" : props.mode === "new" ? "Save client" : "Save changes"}
        </Button>
      </aside>
    </form>
  );
}
