"use client";

import { useActionState } from "react";
import { Button, Field, Notice, Textarea } from "@/components/ui";
import { reviewDocumentAction, type DocActionState } from "@/lib/documents/actions";

/**
 * Payroll the client sent in their own format (rework): staff put it into the Tallo
 * standard template, load it on the Payroll page, then mark the document done. Or
 * return it with a reason (missing pages, wrong month).
 */
export function PayrollIntake({ documentId, open, templateHref, monthHref }: { documentId: string; open: boolean; templateHref: string; monthHref: string }) {
  const [done, markDone, doing] = useActionState(reviewDocumentAction.bind(null, documentId, "post"), {} as DocActionState);
  const [back, sendBack, returning] = useActionState(reviewDocumentAction.bind(null, documentId, "return"), {} as DocActionState);
  if (!open) return <Notice tone="done">This payroll has been loaded.</Notice>;
  return (
    <div className="space-y-4">
      <ol className="list-decimal space-y-2 ps-5 text-body-regular text-text-primary">
        <li>Open the client&apos;s file on the left.</li>
        <li>
          Copy the figures into the <a href={templateHref} className="text-button-ghost-foreground underline">Tallo payroll template for this month</a>. It comes prefilled with the client&apos;s employees and pay items.
        </li>
        <li>
          Upload the filled template on the <a href={monthHref} className="text-button-ghost-foreground underline">client&apos;s Payroll page</a> and post it.
        </li>
      </ol>
      <form action={markDone}>
        <Button type="submit" disabled={doing}>Mark done: payroll loaded</Button>
        {done.error && <p className="mt-2 text-body-regular text-text-error-primary">{done.error}</p>}
      </form>
      <form action={sendBack} className="space-y-2 border-t border-separator-border pt-4">
        <Field label="Return to the client" htmlFor="return_reason" hint="Say what is missing, e.g. page 2 of the payroll, or the wrong month.">
          <Textarea id="return_reason" name="reason" rows={2} required />
        </Field>
        <Button type="submit" variant="secondary" disabled={returning}>Return</Button>
        {back.error && <p className="text-body-regular text-text-error-primary">{back.error}</p>}
      </form>
    </div>
  );
}
