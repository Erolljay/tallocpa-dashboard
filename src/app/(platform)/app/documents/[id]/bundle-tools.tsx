"use client";

import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";
import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import { runOcrAction, type DocActionState } from "@/lib/documents/actions";
import { cx } from "@/utils/cx";
import { addBundleInvoiceAction, deleteBundleInvoiceAction, setBundlePageAction } from "./bundle-actions";

function Status({ state }: { state: DocActionState }) {
  if (!state.ok && !state.error) return null;
  return (
    <p role={state.error ? "alert" : "status"} className={cx("text-caption-1-regular", state.error ? "text-text-error-primary" : "text-status-lime-text")}>
      {state.error ?? state.ok}
    </p>
  );
}

/** Adds an invoice OCR missed on a page of the PDF; opens it to type the figures. */
export function AddBundleInvoice({ documentId, maxPage, defaultPage = 1 }: { documentId: string; maxPage: number; defaultPage?: number }) {
  const [state, add, pending] = useActionState(addBundleInvoiceAction.bind(null, documentId), {} as DocActionState);
  const id = `add-page-${documentId}`;
  return (
    <form action={add} className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={id} className="text-body-regular text-text-secondary">Add an invoice OCR missed, on page</label>
        <Input id={id} name="page" type="number" min={1} max={maxPage} defaultValue={defaultPage} required className="w-20" />
        <Button type="submit" size="sm" variant="secondary" disabled={pending}>
          <RiAddLine aria-hidden className="size-4" />
          {pending ? "Adding…" : "Add invoice"}
        </Button>
      </div>
      <Status state={state} />
    </form>
  );
}

/** The page an invoice of a bundle is on. */
export function BundlePage({ documentId, page, maxPage }: { documentId: string; page: number; maxPage: number }) {
  const [state, save, pending] = useActionState(setBundlePageAction.bind(null, documentId), {} as DocActionState);
  const id = `page-${documentId}`;
  return (
    <form action={save} className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={id} className="text-body-regular text-text-secondary">On page</label>
        <Input key={page} id={id} name="page" type="number" min={1} max={maxPage} defaultValue={page} required className="w-20" />
        <Button type="submit" size="sm" variant="ghost" disabled={pending}>{pending ? "Saving…" : "Change page"}</Button>
      </div>
      <Status state={state} />
    </form>
  );
}

/** Removes an invoice of a bundle that is not approved, after a confirmation. */
export function RemoveBundleInvoice({ documentId, label }: { documentId: string; label: string }) {
  const [asking, setAsking] = useState(false);
  const [state, remove, pending] = useActionState(async () => deleteBundleInvoiceAction(documentId), {} as DocActionState);
  if (!asking) {
    return (
      <Button size="sm" variant="ghost" onClick={() => setAsking(true)}>
        <RiDeleteBinLine aria-hidden className="size-4" />
        Remove this invoice
      </Button>
    );
  }
  return (
    <form action={remove} className="space-y-2 rounded-2xl border border-border-error-default p-3">
      <p className="text-body-regular text-text-primary">Remove {label}? Use this when OCR read something that is not a separate invoice. The PDF itself is kept.</p>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" size="sm" variant="danger" disabled={pending}>{pending ? "Removing…" : "Yes, remove it"}</Button>
        <Button size="sm" variant="ghost" onClick={() => setAsking(false)} disabled={pending}>Keep it</Button>
      </div>
      <Status state={state} />
    </form>
  );
}

/** Reads the whole PDF again: replaces the invoices not yet approved. */
export function ReadBundleAgain({ documentId }: { documentId: string }) {
  const [state, read, pending] = useActionState(async () => runOcrAction(documentId), {} as DocActionState);
  return (
    <form action={read} className="space-y-1">
      <Button type="submit" size="sm" variant="ghost" disabled={pending}>{pending ? "Reading…" : "Read the PDF again"}</Button>
      <Status state={state} />
    </form>
  );
}
