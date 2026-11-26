"use client";

import { useActionState, useState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { auditIndependenceWarning, bandForSales, JOB_GROUPS, jobField, parseSales, type JobOption } from "@/lib/fees/proposal";
import { parsePrice } from "@/lib/fees/schedule";
import { auditNote } from "@/lib/fees/template";
import {
  assignReviewerAction,
  bookingLinkAction,
  convertLeadAction,
  markLostAction,
  recordCallAction,
  reopenLeadAction,
  sendProposalAction,
  setFunnelOpenAction,
  type LeadState,
} from "./actions";

type Person = { user_id: string; full_name: string };

function Result({ state }: { state: LeadState }) {
  if (state.error) return <Notice tone="blocked">{state.error}</Notice>;
  if (state.ok) return <Notice tone="done">{state.ok}</Notice>;
  return null;
}

export function FunnelSwitch({ open }: { open: boolean }) {
  const [state, action, pending] = useActionState(async () => setFunnelOpenAction(!open), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant={open ? "secondary" : "primary"} disabled={pending}>{pending ? "Saving…" : open ? "Close the funnel" : "Open the funnel to the public"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** The Owner assigns the lead's reviewer. */
export function ReviewerForm({ leadId, current, reviewers }: { leadId: string; current: string | null; reviewers: Person[] }) {
  const [state, action, pending] = useActionState(assignReviewerAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <Field label="Reviewer" htmlFor="l-reviewer" hint="Holds the discovery call and writes its notes.">
        <Select id="l-reviewer" name="reviewer" defaultValue={current ?? ""} className="w-60">
          <option value="">Not assigned</option>
          {reviewers.map((r) => <option key={r.user_id} value={r.user_id}>{r.full_name}</option>)}
        </Select>
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Assign"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** The reviewer records the discovery call: when, and the notes. */
export function DiscoveryCallForm({ leadId, defaultAt }: { leadId: string; defaultAt: string }) {
  const [state, action, pending] = useActionState(recordCallAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="space-y-3">
      <Field label="Held on (Manila time)" htmlFor="d-at">
        <Input id="d-at" name="held_at" type="datetime-local" defaultValue={defaultAt} className="w-64 tabular-nums" />
      </Field>
      <Field label="Notes of the call" htmlFor="d-notes" hint="What the client needs, their records, deadlines at risk, and what was agreed next.">
        <Textarea id="d-notes" name="notes" rows={6} />
      </Field>
      <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Record the call"}</Button>
      <Result state={state} />
    </form>
  );
}

/** What the proposal form needs from the active schedule (src/lib/funnel/proposal-quote.ts). */
export interface ProposalSetup {
  jobs: JobOption[];
  monthlyRetainer: number;
  overCap: boolean;
  monthlyCap: number | null;
  /** We keep the client's books (every client pays bookkeeping by documents, or the lead asked for it). */
  keepsBooks: boolean;
}

const pesoFmt = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

/** One job row: tick, price (prefilled from the schedule or the sales band), and a note when the price changes. */
function JobRow({ o, sales, ticked, onTick }: { o: JobOption; sales: number | null; ticked: boolean; onTick: (on: boolean) => void }) {
  const band = o.bands ? (sales === null ? undefined : bandForSales(o.bands, sales)) : undefined;
  const reference = o.bands ? (band?.price ?? null) : o.schedulePrice;
  const [price, setPrice] = useState("");
  const typed = parsePrice(price);
  const differs = ticked && "value" in typed && typed.value !== null && reference !== null && typed.value !== reference;
  const id = `job-${o.code}`;
  const hint = o.bands
    ? sales === null
      ? "Priced by annual gross sales: enter them above."
      : band
        ? `${band.band ?? ""}: ${band.price === null ? "quoted on request" : pesoFmt.format(band.price)}`
        : "No band for these sales."
    : o.onRequest
      ? "Quoted on request"
      : o.schedulePrice === null
        ? "No price in the schedule"
        : pesoFmt.format(o.schedulePrice);
  return (
    <li className="space-y-2 py-3">
      <div className="flex flex-wrap items-start gap-3">
        <label htmlFor={id} className="flex min-w-0 flex-1 items-start gap-2 text-body-regular text-text-primary">
          <input id={id} type="checkbox" name={jobField.ticked(o.code)} value="1" checked={ticked} onChange={(e) => onTick(e.target.checked)} className="mt-1 size-4 shrink-0 accent-accent-600" />
          <span className="min-w-0">
            {o.label}
            {o.band ? <span className="text-text-tertiary"> · {o.band}</span> : null}
            <span className="block text-caption-1-regular text-text-tertiary">{hint} · {o.billed}{o.suggested ? "" : " · not suggested for this lead"}</span>
          </span>
        </label>
        {ticked && (
          <Input
            name={jobField.price(o.code)}
            inputMode="decimal"
            aria-label={`Price of ${o.label}`}
            placeholder={reference === null ? "Price" : String(reference)}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-32 text-end tabular-nums"
          />
        )}
      </div>
      {ticked && (differs || o.bands) && (
        <Input name={jobField.note(o.code)} aria-label={`Note on the price of ${o.label}`} placeholder={differs ? "Why the price differs (required), e.g. annual sales about ₱12M" : "Note (optional)"} className="ms-6" />
      )}
    </li>
  );
}

export function ProposalForm({ leadId, defaultTerms, setup }: { leadId: string; defaultTerms: string; setup: ProposalSetup | { error: string } }) {
  const [state, action, pending] = useActionState(sendProposalAction.bind(null, leadId), {} as LeadState);
  const [copied, setCopied] = useState(false);
  const [salesRaw, setSalesRaw] = useState("");
  const [ticked, setTicked] = useState<Set<string>>(() => new Set());
  const url = state.link && typeof window !== "undefined" ? `${window.location.origin}${state.link}` : state.link;
  const parsedSales = parseSales(salesRaw);
  const sales = "value" in parsedSales ? parsedSales.value : null;
  const ready = !("error" in setup);
  const jobs = ready ? setup.jobs : [];
  const auditTicked = jobs.filter((o) => o.group === "audit" && ticked.has(o.code)).map((o) => ({ label: o.label }));
  const warning = ready ? auditIndependenceWarning(auditTicked, setup.keepsBooks) : null;
  const tick = (code: string, on: boolean) => setTicked((t) => { const n = new Set(t); if (on) n.add(code); else n.delete(code); return n; });

  return (
    <form action={action} className="space-y-4">
      {!ready ? (
        <Notice tone="blocked">{setup.error}</Notice>
      ) : (
        <>
          <p className="text-body-regular text-text-secondary">
            Monthly retainer from the lead&apos;s profile: <span className="tabular-nums text-text-primary">{pesoFmt.format(setup.monthlyRetainer)}</span>
            {setup.overCap ? ` — above the monthly cap of ${pesoFmt.format(setup.monthlyCap ?? 0)}, so it is quoted for this client.` : "."}
          </p>
          {setup.overCap && (
            <Field label="Agreed monthly retainer (₱)" htmlFor="p-agreed" hint="Required above the cap. Catch-up is worked out on it.">
              <Input id="p-agreed" name="agreed_monthly" inputMode="decimal" required className="w-40 text-end tabular-nums" />
            </Field>
          )}
          <Field label="Annual gross sales (₱)" htmlFor="p-sales" hint="Once, for jobs priced by sales (the audit). An amount exactly on a band edge takes the lower band." error={"error" in parsedSales ? parsedSales.error : undefined}>
            <Input id="p-sales" name="annual_sales" inputMode="decimal" value={salesRaw} onChange={(e) => setSalesRaw(e.target.value)} className="w-48 text-end tabular-nums" />
          </Field>
          {(["annual", "ad_hoc", "audit"] as const).map((g) => {
            const list = jobs.filter((o) => o.group === g);
            if (list.length === 0) return null;
            return (
              <fieldset key={g} className="rounded-2xl border border-separator-border px-4 pt-3">
                <legend className="px-1 text-body-medium text-text-primary">{JOB_GROUPS[g].title}</legend>
                <p className="text-caption-1-regular text-text-secondary">{g === "audit" ? auditNote(null) : JOB_GROUPS[g].hint} Leave the price empty to use the schedule&apos;s.</p>
                <ul className="divide-y divide-separator-border">
                  {list.map((o) => <JobRow key={o.code} o={o} sales={sales} ticked={ticked.has(o.code)} onTick={(on) => tick(o.code, on)} />)}
                </ul>
              </fieldset>
            );
          })}
          {warning && <Notice tone="waiting">{warning}</Notice>}
        </>
      )}
      <Field label="Terms of engagement" htmlFor="p-terms" hint="Draft terms; edit them for this client if needed.">
        <Textarea id="p-terms" name="terms" rows={12} defaultValue={defaultTerms} />
      </Field>
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Valid for (days)" htmlFor="p-days"><Input id="p-days" name="valid_days" type="number" min={1} max={120} defaultValue={30} className="w-28 tabular-nums" /></Field>
        <Button type="submit" disabled={pending || !ready}>{pending ? "Preparing…" : "Prepare the proposal"}</Button>
      </div>
      <p className="text-caption-1-regular text-text-secondary">Priced on today&apos;s active fee schedule from the lead&apos;s profile. A new proposal replaces the one not yet accepted.</p>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      {state.ok && url && (
        <Notice tone="done">
          {state.ok}{" "}
          <a href={state.link} target="_blank" rel="noreferrer" className="underline">Open it</a>{" · "}
          <button type="button" className="underline" onClick={() => navigator.clipboard.writeText(url).then(() => setCopied(true))}>{copied ? "Link copied" : "Copy the link"}</button>
        </Notice>
      )}
    </form>
  );
}

/** Lost, with the reason (required). */
export function LostForm({ leadId }: { leadId: string }) {
  const [state, action, pending] = useActionState(markLostAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <Field label="Why it was lost" htmlFor="l-reason" error={state.error}>
        <Input id="l-reason" name="reason" required maxLength={500} className="w-72" />
      </Field>
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Mark lost"}</Button>
    </form>
  );
}

export function ReopenForm({ leadId }: { leadId: string }) {
  const [state, action, pending] = useActionState(async () => reopenLeadAction(leadId), {} as LeadState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Reopen the lead"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** Won → Onboarding: the client's own preparer and reviewer are picked here. */
export function ConvertForm({ leadId, defaultStart, staff, reviewers, leadReviewer }: { leadId: string; defaultStart: string; staff: Person[]; reviewers: Person[]; leadReviewer: string | null }) {
  const [state, action, pending] = useActionState(convertLeadAction.bind(null, leadId), {} as LeadState);
  return (
    <form action={action} className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Services start" htmlFor="c-start"><Input id="c-start" name="start" type="date" defaultValue={defaultStart} /></Field>
        <Field label="Client's preparer" htmlFor="c-prep">
          <Select id="c-prep" name="preparer" defaultValue="" className="w-56">
            <option value="">Assign later</option>
            {staff.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
          </Select>
        </Field>
        <Field label="Client's reviewer" htmlFor="c-rev">
          <Select id="c-rev" name="reviewer" defaultValue={leadReviewer ?? ""} className="w-56">
            <option value="">Assign later</option>
            {reviewers.map((s) => <option key={s.user_id} value={s.user_id}>{s.full_name}</option>)}
          </Select>
        </Field>
      </div>
      <p className="text-caption-1-regular text-text-secondary">The client&apos;s reviewer may differ from the lead&apos;s. Either can be left for the Team card; the onboarding checklist asks for both.</p>
      <Button type="submit" disabled={pending}>{pending ? "Creating…" : "Make the client (Onboarding)"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

/** Shows the lead's booking link, to copy into an email. */
export function BookingLink({ leadId }: { leadId: string }) {
  const [state, action, pending] = useActionState(async () => bookingLinkAction(leadId), {} as LeadState);
  const [copied, setCopied] = useState(false);
  const url = state.link && typeof window !== "undefined" ? `${window.location.origin}${state.link}` : state.link;
  if (state.link && url) {
    return (
      <div className="space-y-2">
        <p className="break-all rounded-xl bg-background-secondary-default px-3 py-2 font-mono text-caption-1-regular text-text-primary">{url}</p>
        <p className="text-body-regular text-text-secondary">
          {state.ok}{" "}
          <button
            type="button"
            className="underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true), () => setCopied(false))}
          >
            {copied ? "Link copied" : "Copy the link"}
          </button>
        </p>
      </div>
    );
  }
  return (
    <form action={action} className="space-y-2">
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Getting the link…" : "Get the booking link"}</Button>
      <Result state={state} />
    </form>
  );
}
