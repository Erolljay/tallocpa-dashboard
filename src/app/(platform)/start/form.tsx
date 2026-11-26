"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { fromPage } from "@/lib/marketing/attribution";
import type { InstantQuote } from "@/lib/fees/quote";
import type { StartPrefill } from "@/lib/site/intake";
import { requestQuoteAction, type StartState } from "./actions";

const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const checkbox = "size-4 rounded border-border-button-default accent-accent-600";

/** `prefill` comes from the website's "Tell us about your business" picker (src/lib/site/intake.ts): default values only. */
export function StartForm({ prefill }: { prefill?: StartPrefill } = {}) {
  const services = prefill?.services.length ? prefill.services : ["tax_compliance"];
  const [state, dispatch, pending] = useActionState(requestQuoteAction, {} as StartState);
  // Where the visitor came from (the page's utm_* and ref, and the referrer), sent with the request.
  const action = (form: FormData) => {
    const { search, pathname, hostname } = window.location;
    form.set("attribution", JSON.stringify(fromPage({ search, pathname, hostname, referrer: document.referrer })));
    dispatch(form);
  };
  if (state.name) return <Thanks name={state.name} quote={state.quote ?? null} />;
  return (
    <form action={action} className="space-y-5">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-headline-medium text-text-primary">Your business</legend>
        <Field label="Business name" htmlFor="s-biz"><Input id="s-biz" name="business_name" required autoComplete="organization" /></Field>
        <Field label="Type" htmlFor="s-type">
          <Select id="s-type" name="taxpayer_type" defaultValue={prefill?.taxpayerType ?? "individual"}>
            <option value="individual">Sole proprietor or professional</option>
            <option value="opc">One Person Corporation</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="non_stock">Non-stock, non-profit</option>
          </Select>
        </Field>
        <Field label="Documents a month" htmlFor="s-docs" hint="Sales invoices, receipts, purchases and 2307s, about how many a month.">
          <Input id="s-docs" name="documents" type="number" min={0} defaultValue={30} className="tabular-nums" />
        </Field>
        <Field label="Employees" htmlFor="s-emp"><Input id="s-emp" name="employees" type="number" min={0} defaultValue={0} className="tabular-nums" /></Field>
        <Field label="Branches besides the main office" htmlFor="s-br"><Input id="s-br" name="branches" type="number" min={0} defaultValue={0} className="tabular-nums" /></Field>
        <Field label="Months behind" htmlFor="s-behind" hint="Months of books and returns not done yet. 0 if you are up to date.">
          <Input id="s-behind" name="behind" type="number" min={0} max={120} defaultValue={0} className="tabular-nums" />
        </Field>
        <div className="flex flex-col justify-end gap-2 text-body-regular">
          <label className="flex items-center gap-2"><input type="checkbox" name="vat" value="1" defaultChecked={prefill?.vat === true} className={checkbox} /> VAT-registered</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="contributions" value="1" className={checkbox} /> We remit SSS, PhilHealth, Pag-IBIG</label>
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-headline-medium text-text-primary">Services</legend>
        <label className="flex items-center gap-2 text-body-regular"><input type="checkbox" name="services" value="tax_compliance" defaultChecked={services.includes("tax_compliance")} className={checkbox} /> Tax compliance (BIR returns)</label>
        <label className="flex items-center gap-2 text-body-regular"><input type="checkbox" name="services" value="bookkeeping" defaultChecked={services.includes("bookkeeping")} className={checkbox} /> Bookkeeping</label>
        <label className="flex items-center gap-2 text-body-regular"><input type="checkbox" name="services" value="business_registration" className={checkbox} /> Business registration</label>
        <div className="flex flex-wrap gap-4 text-body-regular">
          <label className="flex items-center gap-2"><input type="checkbox" name="complexity" value="inventory" defaultChecked={prefill?.complexity.includes("inventory")} className={checkbox} /> Inventory</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="complexity" value="manufacturing" defaultChecked={prefill?.complexity.includes("manufacturing")} className={checkbox} /> Manufacturing</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="complexity" value="construction" defaultChecked={prefill?.complexity.includes("construction")} className={checkbox} /> Construction</label>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-headline-medium text-text-primary">How to reach you</legend>
        <Field label="Your name" htmlFor="s-name"><Input id="s-name" name="contact_name" required autoComplete="name" /></Field>
        <Field label="Email" htmlFor="s-email"><Input id="s-email" name="email" type="email" required autoComplete="email" /></Field>
        <Field label="Mobile (optional)" htmlFor="s-mobile"><Input id="s-mobile" name="mobile" type="tel" autoComplete="tel" /></Field>
        <div className="sm:col-span-2">
          <Field label="Anything we should know (optional)" htmlFor="s-msg"><Textarea id="s-msg" name="message" rows={3} defaultValue={prefill?.message} /></Field>
        </div>
      </fieldset>

      <p className="text-caption-1-regular text-text-secondary">We use these details only to prepare your quote and proposal (Data Privacy Act of 2012).</p>
      <Button type="submit" disabled={pending}>{pending ? "Working it out…" : "Get my quote"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

/** After the request: the monthly fee and catch-up, or the components when the fee is quoted in the proposal. */
function Thanks({ name, quote: q }: { name: string; quote: InstantQuote | null }) {
  const notIncluded = q ? [...q.notIncluded.annual, ...q.notIncluded.adHoc, ...q.notIncluded.audit.map((a) => `${a} (separate engagement)`)] : [];
  return (
    <div className="space-y-4">
      <h2 className="text-title-2-medium text-text-primary">Thank you, {name}.</h2>
      {q ? (
        <>
          {q.priced ? (
            <>
              <p className="text-body-regular text-text-secondary">Your monthly fee, from our current fee schedule:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-background-secondary-default p-4">
                  <p className="text-caption-1-regular text-text-tertiary">Monthly retainer</p>
                  <p className="text-title-2-medium tabular-nums text-text-primary">{php.format(q.monthlyRetainer ?? 0)}</p>
                </div>
                {q.catchUp && q.catchUp.amount !== null && (
                  <div className="rounded-2xl bg-background-secondary-default p-4">
                    <p className="text-caption-1-regular text-text-tertiary">Catch-up, one time ({q.catchUp.months} month{q.catchUp.months === 1 ? "" : "s"} behind)</p>
                    <p className="text-title-2-medium tabular-nums text-text-primary">{php.format(q.catchUp.amount)}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-body-regular text-text-secondary">
              {q.reason === "over_cap"
                ? "Your business needs more than our standard monthly packages, so we will quote your fee in the proposal."
                : "Part of your fee is quoted for your business, so we will confirm it in the proposal."}
            </p>
          )}
          <ul className="divide-y divide-separator-border text-body-regular">
            {q.lines.map((l, n) => (
              <li key={n} className="flex items-start justify-between gap-4 py-2">
                <span className="text-text-primary">{l.label}{l.band ? <span className="text-text-tertiary"> · {l.band}</span> : null}</span>
                {l.amount !== null && <span className="shrink-0 tabular-nums text-text-primary">{php.format(l.amount)}</span>}
              </li>
            ))}
          </ul>
          {notIncluded.length > 0 && (
            <div className="space-y-1">
              <p className="text-body-medium text-text-primary">Not included in this quote</p>
              <p className="text-body-regular text-text-secondary">Annual returns and one-off jobs are priced in your proposal when you need them: {notIncluded.join("; ")}.</p>
            </div>
          )}
          <div className="space-y-1 text-caption-1-regular text-text-secondary">
            <p>{q.taxNote}</p>
            <p>{q.ewtNote}</p>
          </div>
        </>
      ) : (
        <p className="text-body-regular text-text-secondary">We will work out your fee and send it with the proposal.</p>
      )}
      <p className="text-body-regular text-text-primary">We will email your proposal within one working day. You can accept it online.</p>
    </div>
  );
}
