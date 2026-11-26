"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState, useTransition } from "react";
import { Button, Field, Input, Notice, Textarea } from "@/components/ui";
import {
  addRemittanceFile,
  approveRemittanceAction,
  generateRemittancesAction,
  prepareRemittanceAction,
  remitRemittanceAction,
  removeRemittanceFile,
  reopenRemittanceAction,
  setDueDateAction,
  setEmployerNumberAction,
  setHandlesContributionsAction,
  skipRemittanceAction,
  startRemittanceUpload,
  type RemittanceState,
} from "@/lib/remittances/actions";
import { AGENCIES, FILE_KINDS, type Agency, type RemittanceFileKind } from "@/lib/remittances/labels";

function Result({ state }: { state: RemittanceState }) {
  if (state.error && !state.fieldErrors) return <Notice tone="blocked">{state.error}</Notice>;
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

/** Uploads a file to a remittance: straight to storage, then recorded. */
export function RemittanceFileUpload({ id, kind, hint }: { id: string; kind: RemittanceFileKind; hint?: string }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<RemittanceState>({});
  const [busy, setBusy] = useState(false);
  const inputId = `${id}-${kind}-file`;

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setState({ error: "Choose the file." });
    setBusy(true);
    setState({});
    try {
      const started = await startRemittanceUpload({ id, mimeType: file.type, size: file.size });
      if ("error" in started) throw new Error(started.error);
      const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).storage.from("remittance-files");
      const { error } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: file.type });
      if (error) throw new Error(error.message);
      const result = await addRemittanceFile({ id, kind, path: started.path, fileName: file.name, mimeType: file.type, size: file.size });
      setState(result);
      if (result.ok) {
        form.current?.reset();
        setFile(null);
        router.refresh();
      }
    } catch (err) {
      setState({ error: (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form ref={form} onSubmit={send} className="flex flex-col gap-2">
      <Field label={`Attach ${FILE_KINDS[kind].toLowerCase()}`} htmlFor={inputId} hint={hint}>
        <Input id={inputId} type="file" accept="application/pdf,image/*,.xlsx,.csv,.txt" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="py-1.5" />
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" variant="secondary" disabled={busy || !file}>{busy ? "Attaching…" : "Attach"}</Button>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

/** A button that runs one action and shows its answer. */
export function RemittanceButton({ id, action, label, busyLabel, variant = "primary", fileId }: {
  id: string;
  action: "approve" | "reopen" | "remove_file" | "generate";
  label: string;
  busyLabel: string;
  variant?: "primary" | "secondary" | "ghost";
  fileId?: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<RemittanceState>({});
  const [pending, start] = useTransition();
  const run = () =>
    start(async () => {
      const r = action === "approve" ? await approveRemittanceAction(id)
        : action === "reopen" ? await reopenRemittanceAction(id)
        : action === "generate" ? await generateRemittancesAction()
        : await removeRemittanceFile(id, fileId!);
      setState(r);
      if (r.ok) router.refresh();
    });
  return (
    <span className="inline-flex flex-col gap-2">
      <Button size={action === "remove_file" ? "sm" : "md"} variant={variant} onClick={run} disabled={pending}>{pending ? busyLabel : label}</Button>
      {action !== "remove_file" && <Result state={state} />}
      {action === "remove_file" && state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </span>
  );
}

/** Prepared: the PRN from the agency's site (the amounts are the posted payroll's). */
export function PrepareForm({ id, prn, ready }: { id: string; prn: string; ready: boolean }) {
  const [state, action, pending] = useActionState(prepareRemittanceAction, {} as RemittanceState);
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <input type="hidden" name="id" value={id} />
      <Field label="PRN (payment reference number)" htmlFor={`${id}-prn`} error={state.fieldErrors?.prn}>
        <Input id={`${id}-prn`} name="prn" maxLength={60} defaultValue={prn} required dir="ltr" />
      </Field>
      <Button type="submit" disabled={pending || !ready}>{pending ? "Saving…" : "Mark prepared"}</Button>
      <div className="sm:col-span-2"><Result state={state} /></div>
    </form>
  );
}

/** The Owner's switch: we handle this client's SSS, PhilHealth and Pag-IBIG. */
export function HandlesContributionsSwitch({ clientId, on, owner }: { clientId: string; on: boolean; owner: boolean }) {
  const router = useRouter();
  const [state, setState] = useState<RemittanceState>({});
  const [pending, start] = useTransition();
  if (!owner) return <p className="text-body-regular text-text-secondary">{on ? "We prepare and remit this client's SSS, PhilHealth and Pag-IBIG from its payroll." : "We do not handle this client's SSS, PhilHealth and Pag-IBIG. The Owner turns it on."}</p>;
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-start gap-3 text-body-regular text-text-primary">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-accent-600"
          checked={on}
          disabled={pending}
          onChange={(e) => start(async () => {
            const r = await setHandlesContributionsAction(clientId, e.target.checked);
            setState(r);
            if (r.ok) router.refresh();
          })}
        />
        <span>
          We handle this client&rsquo;s SSS, PhilHealth and Pag-IBIG
          <span className="block text-caption-1-regular text-text-tertiary">Each posted payroll makes the month&rsquo;s remittances (contributions with EC, and loan payments), beside the 1601-C.</span>
        </span>
      </label>
      <Result state={state} />
    </div>
  );
}

/** Not required this month, with the reason. */
export function SkipForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState(skipRemittanceAction, {} as RemittanceState);
  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="id" value={id} />
      <Field label="Why nothing is remitted" htmlFor={`${id}-note`}>
        <Textarea id={`${id}-note`} name="note" rows={2} maxLength={500} placeholder="No employees this month" />
      </Field>
      <div className="flex justify-end"><Button type="submit" variant="secondary" disabled={pending}>Mark not required</Button></div>
      <Result state={state} />
    </form>
  );
}

/** Remitted: the date paid and the reference (the proof is attached separately). */
export function RemitForm({ id, today }: { id: string; today: string }) {
  const [state, action, pending] = useActionState(remitRemittanceAction, {} as RemittanceState);
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="id" value={id} />
      <Field label="Date paid" htmlFor={`${id}-paid_on`} error={state.fieldErrors?.paid_on}>
        <Input id={`${id}-paid_on`} name="paid_on" type="date" max={today} defaultValue={today} required />
      </Field>
      <Field label="Receipt or transaction no." htmlFor={`${id}-reference`}>
        <Input id={`${id}-reference`} name="reference" maxLength={100} />
      </Field>
      <div className="flex justify-end sm:col-span-2"><Button type="submit" disabled={pending}>{pending ? "Saving…" : "Record as remitted"}</Button></div>
      <div className="sm:col-span-2"><Result state={state} /></div>
    </form>
  );
}

export function DueDateForm({ id, due }: { id: string; due: string }) {
  const [state, action, pending] = useActionState(setDueDateAction, {} as RemittanceState);
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <Field label="Due date" htmlFor={`${id}-due`} hint="Change it only when the agency moves the deadline.">
        <Input id={`${id}-due`} name="due_date" type="date" defaultValue={due} required />
      </Field>
      <div className="flex justify-end"><Button type="submit" size="sm" variant="secondary" disabled={pending}>Change</Button></div>
      <Result state={state} />
    </form>
  );
}

/** A client's employer number with one agency. */
export function EmployerNumberForm({ clientId, agency, current }: {
  clientId: string;
  agency: Agency;
  current: { employer_number: string; registered_name: string | null; start_month: string; end_month: string | null } | null;
}) {
  const [state, action, pending] = useActionState(setEmployerNumberAction, {} as RemittanceState);
  const e = state.fieldErrors ?? {};
  const f = (k: string) => `${clientId}-${agency}-${k}`;
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="client_id" value={clientId} />
      <input type="hidden" name="agency" value={agency} />
      <div className="sm:col-span-2">
        <Field label={AGENCIES[agency].number} htmlFor={f("number")} error={e.employer_number}>
          <Input id={f("number")} name="employer_number" maxLength={40} defaultValue={current?.employer_number} required />
        </Field>
      </div>
      <Field label="First month with employees" htmlFor={f("start")} error={e.start_month}>
        <Input id={f("start")} name="start_month" type="month" defaultValue={current?.start_month.slice(0, 7)} required />
      </Field>
      <Field label="Last month" htmlFor={f("end")} error={e.end_month} hint="Only when it stopped.">
        <Input id={f("end")} name="end_month" type="month" defaultValue={current?.end_month?.slice(0, 7) ?? ""} />
      </Field>
      {agency === "pagibig" && (
        <div className="sm:col-span-2">
          <Field label="Registered employer name" htmlFor={f("name")} hint="When it differs from the client's name: its first letter sets the deadline.">
            <Input id={f("name")} name="registered_name" maxLength={200} defaultValue={current?.registered_name ?? ""} />
          </Field>
        </div>
      )}
      <div className="flex justify-end sm:col-span-2"><Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Saving…" : "Save"}</Button></div>
      <div className="sm:col-span-2"><Result state={state} /></div>
    </form>
  );
}
