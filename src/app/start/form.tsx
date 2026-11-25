"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select, Textarea } from "@/components/ui";
import { requestQuoteAction, type StartState } from "./actions";

const php = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const checkbox = "size-4 rounded border-border-button-default accent-accent-600";

export function StartForm() {
  const [state, action, pending] = useActionState(requestQuoteAction, {} as StartState);
  if (state.name) {
    const q = state.quote;
    return (
      <div className="space-y-4">
        <h2 className="text-title-2-medium text-text-primary">Thank you, {state.name}.</h2>
        {q ? (
          <>
            <p className="text-body-regular text-text-secondary">Your estimate, from our current fee schedule:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-background-secondary-default p-4">
                <p className="text-caption-1-regular text-text-tertiary">Monthly retainer</p>
                <p className="text-title-2-medium tabular-nums">{php.format(q.monthlyRetainer)}</p>
              </div>
              <div className="rounded-2xl bg-background-secondary-default p-4">
                <p className="text-caption-1-regular text-text-tertiary">First year, all in</p>
                <p className="text-title-2-medium tabular-nums">{php.format(q.firstYearTotal)}</p>
              </div>
            </div>
            {!q.complete && <p className="text-body-regular text-text-secondary">Some items are priced on request; we will confirm them in your proposal.</p>}
            <p className="text-caption-1-regular text-text-secondary">{q.tax.note}</p>
          </>
        ) : (
          <p className="text-body-regular text-text-secondary">We will work out your fee and send it with the proposal.</p>
        )}
        <p className="text-body-regular text-text-primary">We will email your proposal within one working day. You can accept it online.</p>
      </div>
    );
  }
  return (
    <form action={action} className="space-y-5">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-headline-medium text-text-primary">Your business</legend>
        <Field label="Business name" htmlFor="s-biz"><Input id="s-biz" name="business_name" required autoComplete="organization" /></Field>
        <Field label="Type" htmlFor="s-type">
          <Select id="s-type" name="taxpayer_type" defaultValue="individual">
            <option value="individual">Sole proprietor or professional</option>
            <option value="opc">One Person Corporation</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="non_stock">Non-stock, non-profit</option>
          </Select>
        </Field>
        <Field label="Invoices and receipts a month" htmlFor="s-docs"><Input id="s-docs" name="documents" type="number" min={0} defaultValue={30} className="tabular-nums" /></Field>
        <Field label="Employees" htmlFor="s-emp"><Input id="s-emp" name="employees" type="number" min={0} defaultValue={0} className="tabular-nums" /></Field>
        <Field label="Branches besides the main office" htmlFor="s-br"><Input id="s-br" name="branches" type="number" min={0} defaultValue={0} className="tabular-nums" /></Field>
        <div className="flex flex-col justify-end gap-2 text-body-regular">
          <label className="flex items-center gap-2"><input type="checkbox" name="vat" value="1" className={checkbox} /> VAT-registered</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="contributions" value="1" className={checkbox} /> We remit SSS, PhilHealth, Pag-IBIG</label>
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-headline-medium text-text-primary">Services</legend>
        <label className="flex items-center gap-2 text-body-regular"><input type="checkbox" name="services" value="tax_compliance" defaultChecked className={checkbox} /> Tax compliance (BIR returns)</label>
        <label className="flex items-center gap-2 text-body-regular"><input type="checkbox" name="services" value="bookkeeping" className={checkbox} /> Bookkeeping</label>
        <label className="flex items-center gap-2 text-body-regular"><input type="checkbox" name="services" value="business_registration" className={checkbox} /> Business registration</label>
        <Field label="Bookkeeping load" htmlFor="s-books">
          <Select id="s-books" name="bookkeeping" defaultValue="standard">
            <option value="light">Light</option>
            <option value="standard">Standard</option>
            <option value="heavy">Heavy</option>
          </Select>
        </Field>
        <div className="flex flex-wrap gap-4 text-body-regular">
          <label className="flex items-center gap-2"><input type="checkbox" name="complexity" value="inventory" className={checkbox} /> Inventory</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="complexity" value="manufacturing" className={checkbox} /> Manufacturing</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="complexity" value="construction" className={checkbox} /> Construction</label>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-headline-medium text-text-primary">How to reach you</legend>
        <Field label="Your name" htmlFor="s-name"><Input id="s-name" name="contact_name" required autoComplete="name" /></Field>
        <Field label="Email" htmlFor="s-email"><Input id="s-email" name="email" type="email" required autoComplete="email" /></Field>
        <Field label="Mobile (optional)" htmlFor="s-mobile"><Input id="s-mobile" name="mobile" type="tel" autoComplete="tel" /></Field>
        <div className="sm:col-span-2">
          <Field label="Anything we should know (optional)" htmlFor="s-msg"><Textarea id="s-msg" name="message" rows={3} /></Field>
        </div>
      </fieldset>

      <p className="text-caption-1-regular text-text-secondary">We use these details only to prepare your quote and proposal (Data Privacy Act of 2012).</p>
      <Button type="submit" disabled={pending}>{pending ? "Working it out…" : "Get my quote"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}
