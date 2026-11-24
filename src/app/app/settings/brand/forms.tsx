"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState, type ComponentProps } from "react";
import { Badge, Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { BRAND_FILES, type BrandFileKind } from "@/lib/brand/files";
import { expiryStatus, INVOICE_METHODS, TAX_ON_FEE, type Section, type TaxOnFee } from "@/lib/brand/profile";
import { finishBrandUpload, saveBrandSectionAction, startBrandUpload, type BrandSettingsState } from "./actions";

function Result({ state }: { state: BrandSettingsState }) {
  if (state.error) return <Notice tone="blocked">{state.error}</Notice>;
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

interface FieldDef {
  name: string;
  label: string;
  hint?: string;
  kind?: "text" | "email" | "tel" | "url" | "date" | "textarea" | "select";
  options?: Record<string, string>;
  /** Spans both columns on wider screens. */
  wide?: boolean;
  required?: boolean;
  inputMode?: ComponentProps<"input">["inputMode"];
  placeholder?: string;
  /** For valid-until dates: show an "Expires in N days" / "Expired" badge. */
  expiry?: boolean;
}

const FIELDS: Record<Exclude<Section, "tax">, FieldDef[]> = {
  identity: [
    { name: "display_name", label: "Display name", hint: "The name clients know us by, e.g. Tallo CPA.", required: true },
    { name: "legal_name", label: "Legal name", hint: "Exactly as on the COR and DTI certificate.", required: true },
  ],
  bir: [
    { name: "tin", label: "TIN", hint: "9 digits, e.g. 123-456-789.", inputMode: "numeric", placeholder: "000-000-000" },
    { name: "tin_branch_code", label: "Branch code", hint: "00000 (or 000) for the head office.", inputMode: "numeric", placeholder: "00000" },
    { name: "rdo_code", label: "RDO code", hint: "The Revenue District Office on the COR, e.g. 074.", placeholder: "074" },
    { name: "registered_address", label: "Registered address", hint: "As printed on the COR.", kind: "textarea", wide: true },
  ],
  contact: [
    { name: "business_address", label: "Office or mailing address", hint: "Only if different from the registered address.", kind: "textarea", wide: true },
    { name: "phone", label: "Phone", kind: "tel", inputMode: "tel", placeholder: "0917 123 4567" },
    { name: "reply_to_email", label: "Reply-to email", hint: "Where clients' replies to our emails go.", kind: "email", inputMode: "email" },
    { name: "website", label: "Website", kind: "url", inputMode: "url", placeholder: "tallocpa.com" },
    { name: "facebook_url", label: "Facebook page", kind: "url", inputMode: "url", placeholder: "facebook.com/tallocpa" },
  ],
  credentials: [
    { name: "cpa_license_no", label: "CPA licence (PRC) number", inputMode: "numeric" },
    { name: "dti_business_name_no", label: "DTI business name number" },
    { name: "boa_firm_accreditation_no", label: "BOA accreditation, firm" },
    { name: "boa_firm_accreditation_valid_until", label: "Firm accreditation valid until", kind: "date", expiry: true },
    { name: "boa_individual_accreditation_no", label: "BOA accreditation, individual" },
    { name: "boa_individual_accreditation_valid_until", label: "Individual accreditation valid until", kind: "date", expiry: true },
    { name: "bir_tax_agent_accreditation_no", label: "BIR tax agent accreditation" },
    { name: "bir_tax_agent_accreditation_valid_until", label: "BIR accreditation valid until", kind: "date", expiry: true },
    { name: "ptr_no", label: "PTR number", hint: "Professional Tax Receipt, renewed every January.", inputMode: "numeric" },
    { name: "ptr_date", label: "PTR date", kind: "date" },
    { name: "ptr_place", label: "PTR place of issue", hint: "E.g. Iloilo City.", wide: true },
  ],
  signatory: [
    { name: "signatory_name", label: "Name", hint: "Who signs reports and letters, e.g. Juan dela Cruz, CPA." },
    { name: "signatory_title", label: "Title", hint: "E.g. Managing Partner." },
  ],
  invoicing: [
    { name: "invoice_method", label: "How we issue Service Invoices", kind: "select", options: INVOICE_METHODS, wide: true },
    { name: "invoice_series_prefix", label: "Series prefix", hint: "If the invoice numbers carry one, e.g. SI-." },
    { name: "atp_or_permit_no", label: "ATP or CAS permit number", hint: "Authority to Print for booklets and loose-leaf; the permit for a CAS." },
  ],
};

const SUBMIT: Record<Exclude<Section, "tax">, string> = {
  identity: "Save Names",
  bir: "Save Registration",
  contact: "Save Contact",
  credentials: "Save Credentials",
  signatory: "Save Signatory",
  invoicing: "Save Invoicing",
};

/** One card's form. `values` are the saved values; what was typed is kept when saving fails. */
export function SectionForm({ section, values, today }: { section: Exclude<Section, "tax">; values: Record<string, string>; today: string }) {
  const [state, run, pending] = useActionState(saveBrandSectionAction.bind(null, section), {} as BrandSettingsState);
  const shown = state.values ?? values;
  return (
    <form action={run} className="grid gap-4 sm:grid-cols-2">
      {FIELDS[section].map((f) => {
        const id = `brand-${f.name}`;
        const value = shown[f.name] ?? "";
        const exp = f.expiry ? expiryStatus(values[f.name] || null, today) : null;
        return (
          <div key={f.name} className={f.wide ? "sm:col-span-2" : undefined}>
            <Field label={f.label} hint={f.hint} htmlFor={id}>
              {f.kind === "textarea" ? (
                <Textarea id={id} name={f.name} rows={2} defaultValue={value} />
              ) : f.kind === "select" ? (
                <Select id={id} name={f.name} defaultValue={value}>
                  <option value="">Not set</option>
                  {Object.entries(f.options ?? {}).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </Select>
              ) : (
                <Input
                  id={id}
                  name={f.name}
                  type={f.kind ?? "text"}
                  defaultValue={value}
                  required={f.required}
                  inputMode={f.inputMode}
                  placeholder={f.placeholder}
                  autoComplete="off"
                  className={f.kind === "date" ? "tabular-nums" : undefined}
                />
              )}
            </Field>
            {exp?.label && (
              <div className="mt-2">
                <Badge tone={exp.tone === "expired" ? "blocked" : "waiting"}>{exp.label}</Badge>
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : SUBMIT[section]}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

const pesoInput = (n: number) => n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Tax on our fee, with a confirmation that spells out what a switch changes. */
export function TaxForm({ taxOnFee, warning }: { taxOnFee: TaxOnFee; warning: number }) {
  const [state, run, pending] = useActionState(saveBrandSectionAction.bind(null, "tax"), {} as BrandSettingsState);
  const [chosen, setChosen] = useState<TaxOnFee>(taxOnFee);
  const switching = chosen !== taxOnFee;
  return (
    <form action={run} className="space-y-4">
      <fieldset>
        <legend className="mb-2 text-body-medium text-text-primary">Tax on our fee</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(TAX_ON_FEE) as TaxOnFee[]).map((k) => (
            <label key={k} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-body-regular ${chosen === k ? "border-accent-500 bg-background-secondary-default" : "border-separator-border"}`}>
              <input type="radio" name="tax_on_fee" value={k} checked={chosen === k} onChange={() => setChosen(k)} className="mt-0.5 size-4 accent-action" />
              <span>
                <span className="block font-medium text-text-primary">{TAX_ON_FEE[k]}</span>
                <span className="text-text-secondary">{k === "vat_12" ? "Only once the firm is registered for VAT with the BIR." : "For a non-VAT firm with gross receipts up to ₱3,000,000 a year."}</span>
                {k === taxOnFee && <span className="mt-1 block text-caption-1-regular text-text-tertiary">Current setting</span>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {switching && (
        <Notice tone="waiting">
          <p className="font-medium">
            {chosen === "vat_12" ? "Switch to 12% VAT?" : "Switch back to 3% percentage tax?"}
          </p>
          <p className="mt-1">
            New statements and quotes will show {chosen === "vat_12" ? "12% VAT" : "3% percentage tax"} on our fee from now on. Existing retainers and fee prices are not
            changed: review them in the fee schedule. Statements already issued stay as they are.
          </p>
          <label className="mt-3 flex items-start gap-2">
            <input type="checkbox" name="confirm_tax_switch" value="yes" required className="mt-0.5 size-4" />
            <span>I understand. {chosen === "vat_12" ? "The firm is registered for VAT." : "The firm is no longer VAT-registered."}</span>
          </label>
        </Notice>
      )}
      <Field label="Warn me when gross receipts reach" htmlFor="gross_receipts_warning" hint="Year-to-date fees collected. The VAT registration threshold is ₱3,000,000.">
        <Input id="gross_receipts_warning" name="gross_receipts_warning" inputMode="decimal" defaultValue={state.values?.gross_receipts_warning ?? pesoInput(warning)} required className="w-48 text-end tabular-nums" />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant={switching ? "primary" : "secondary"} disabled={pending}>{pending ? "Saving…" : switching ? "Confirm Switch" : "Save"}</Button>
        <Result state={state} />
      </div>
    </form>
  );
}

/** Uploads the COR or the logo straight to storage through a one-time link, then records it. */
export function BrandFileUpload({ kind, hasFile }: { kind: BrandFileKind; hasFile: boolean }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<BrandSettingsState>({});
  const spec = BRAND_FILES[kind];
  const noun = kind === "cor" ? "COR" : "logo";

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setState({});
    try {
      const started = await startBrandUpload(kind, file.type, file.size);
      if ("error" in started) throw new Error(started.error);
      const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).storage.from("brand-files");
      const { error } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: file.type });
      if (error) throw new Error(error.message);
      const done = await finishBrandUpload(kind, started.path);
      setState(done);
      if (done.ok) router.refresh();
    } catch (e) {
      setState({ error: (e as Error).message });
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input ref={input} type="file" accept={spec.accept} className="sr-only" id={`upload-${kind}`} onChange={(e) => upload(e.target.files?.[0])} disabled={busy} />
      <Button type="button" variant="secondary" size="sm" disabled={busy} onClick={() => input.current?.click()}>
        {busy ? "Uploading…" : hasFile ? `Replace ${noun}` : `Upload ${noun}`}
      </Button>
      <span className="text-caption-1-regular text-text-tertiary">{kind === "cor" ? "PDF, PNG or JPEG, up to 5 MB." : "SVG or PNG, up to 1 MB."}</span>
      <Result state={state} />
    </div>
  );
}
