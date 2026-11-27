"use client";

import { useActionState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { ACCESS_HINT, ACCESS_LABEL, CONTACT_ACCESS, type ContactAccess } from "@/lib/contacts/access";
import {
  addContactBusinessAction,
  createContactAction,
  removeContactBusinessAction,
  saveContactDetailsAction,
  updateContactAccessAction,
  type ContactFormState,
} from "./actions";

type Business = { id: string; name: string };

function AccessOptions() {
  return CONTACT_ACCESS.map((a) => (
    <option key={a} value={a}>{ACCESS_LABEL[a]}</option>
  ));
}

function Result({ state }: { state: ContactFormState }) {
  if (!state.ok && !(state.error && !state.fieldErrors)) return null;
  return <div className="sm:col-span-2"><Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice></div>;
}

/** Clients → Contacts → New contact: the person, their email (their login) and their first business. */
export function NewContactForm({ businesses }: { businesses: Business[] }) {
  const [state, action, pending] = useActionState(createContactAction, {} as ContactFormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <Field label="Full name" htmlFor="nc_full_name" error={e.full_name}>
        <Input id="nc_full_name" name="full_name" required autoComplete="off" />
      </Field>
      <Field label="Email" htmlFor="nc_email" error={e.email} hint="Their login. An email already used for another business is reused.">
        <Input id="nc_email" name="email" type="email" required autoComplete="off" />
      </Field>
      <Field label="Mobile (optional)" htmlFor="nc_mobile" error={e.mobile}>
        <Input id="nc_mobile" name="mobile" type="tel" inputMode="tel" placeholder="0917 123 4567" dir="ltr" autoComplete="off" />
      </Field>
      <Field label="Business" htmlFor="nc_client" error={e.client_id}>
        <Select id="nc_client" name="client_id" required defaultValue="">
          <option value="" disabled>Choose a business…</option>
          {businesses.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Select>
      </Field>
      <Field label="Position (optional)" htmlFor="nc_position" error={e.position}>
        <Input id="nc_position" name="position" placeholder="Owner, bookkeeper…" />
      </Field>
      <Field label="Access" htmlFor="nc_access" error={e.access} hint={`${ACCESS_LABEL.uploader}: ${ACCESS_HINT.uploader} ${ACCESS_LABEL.viewer}: ${ACCESS_HINT.viewer}`}>
        <Select id="nc_access" name="access" defaultValue="full"><AccessOptions /></Select>
      </Field>
      <div className="flex items-end">
        <Button type="submit" disabled={pending} className="w-full">{pending ? "Adding…" : "Add contact"}</Button>
      </div>
      <Result state={state} />
    </form>
  );
}

/** One more business for this contact. */
export function AddBusinessForm({ userId, businesses }: { userId: string; businesses: Business[] }) {
  const [state, action, pending] = useActionState(addContactBusinessAction.bind(null, userId), {} as ContactFormState);
  const e = state.fieldErrors ?? {};
  if (businesses.length === 0) return <p className="text-body-regular text-text-secondary">This contact already has access to every business you can see.</p>;
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <Field label="Business" htmlFor="ab_client" error={e.client_id}>
        <Select id="ab_client" name="client_id" required defaultValue="">
          <option value="" disabled>Choose a business…</option>
          {businesses.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Select>
      </Field>
      <Field label="Position (optional)" htmlFor="ab_position" error={e.position}>
        <Input id="ab_position" name="position" placeholder="Owner, bookkeeper…" />
      </Field>
      <Field label="Access" htmlFor="ab_access" error={e.access}>
        <Select id="ab_access" name="access" defaultValue="full"><AccessOptions /></Select>
      </Field>
      <div className="flex items-end">
        <Button type="submit" variant="secondary" disabled={pending} className="w-full">{pending ? "Adding…" : "Give access"}</Button>
      </div>
      <Result state={state} />
    </form>
  );
}

/** Position and access level for one business, saved together. */
export function AccessRowForm({ userId, clientId, clientName, position, access }: { userId: string; clientId: string; clientName: string; position: string | null; access: ContactAccess }) {
  const [state, action, pending] = useActionState(updateContactAccessAction.bind(null, userId, clientId), {} as ContactFormState);
  const id = `ar_${clientId}`;
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <div className="w-40">
        <label htmlFor={`${id}_position`} className="sr-only">Position at {clientName}</label>
        <Input id={`${id}_position`} name="position" defaultValue={position ?? ""} placeholder="Position" />
      </div>
      <div className="w-36">
        <label htmlFor={`${id}_access`} className="sr-only">Access to {clientName}</label>
        <Select id={`${id}_access`} name="access" defaultValue={access}><AccessOptions /></Select>
      </div>
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
      {state.ok && <span role="status" className="text-caption-1-regular text-text-secondary">{state.ok}</span>}
      {state.error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

export function RemoveBusinessButton({ userId, clientId, clientName }: { userId: string; clientId: string; clientName: string }) {
  const [state, action, pending] = useActionState(async () => removeContactBusinessAction(userId, clientId), {} as ContactFormState);
  return (
    <form
      action={action}
      onSubmit={(ev) => {
        if (!confirm(`Remove this contact's access to ${clientName}? They keep their other businesses.`)) ev.preventDefault();
      }}
    >
      <Button type="submit" size="sm" variant="ghost" disabled={pending} aria-label={`Remove access to ${clientName}`}>{pending ? "Removing…" : "Remove"}</Button>
      {state.error && <span role="alert" className="ms-2 text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

/** The contact's own name and mobile number, the same on every business. */
export function ContactDetailsForm({ userId, fullName, mobile }: { userId: string; fullName: string; mobile: string | null }) {
  const [state, action, pending] = useActionState(saveContactDetailsAction.bind(null, userId), {} as ContactFormState);
  const e = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-2">
      <Field label="Full name" htmlFor="cd_full_name" error={e.full_name}>
        <Input id="cd_full_name" name="full_name" defaultValue={fullName} required />
      </Field>
      <Field label="Mobile (optional)" htmlFor="cd_mobile" error={e.mobile}>
        <Input id="cd_mobile" name="mobile" type="tel" inputMode="tel" defaultValue={mobile ?? ""} placeholder="0917 123 4567" dir="ltr" />
      </Field>
      <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
        <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
        {state.ok && <span role="status" className="text-caption-1-regular text-text-secondary">{state.ok}</span>}
        {state.error && !state.fieldErrors && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
      </div>
    </form>
  );
}
