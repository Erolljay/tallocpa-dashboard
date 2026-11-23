"use client";

import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import { reviewDocumentAction, type DocActionState } from "@/lib/documents/actions";

/** Staff actions on one document: accept, mark posted, or return with a reason. */
export function DocReviewActions({ documentId, status }: { documentId: string; status: string }) {
  const [returning, setReturning] = useState(false);
  const [accState, accept, accPending] = useActionState(reviewDocumentAction.bind(null, documentId, "accept"), {} as DocActionState);
  const [postState, post, postPending] = useActionState(reviewDocumentAction.bind(null, documentId, "post"), {} as DocActionState);
  const [retState, ret, retPending] = useActionState(reviewDocumentAction.bind(null, documentId, "return"), {} as DocActionState);
  const error = accState.error ?? postState.error ?? retState.error;
  if (!["received", "under_review"].includes(status)) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "received" && (
        <form action={accept}><Button type="submit" variant="secondary" className="px-3 py-1 text-xs" disabled={accPending}>Accept</Button></form>
      )}
      <form action={post}><Button type="submit" variant="secondary" className="px-3 py-1 text-xs" disabled={postPending}>Mark posted</Button></form>
      {returning ? (
        <form action={ret} className="flex flex-1 flex-wrap items-center gap-2">
          <label htmlFor={`reason-${documentId}`} className="sr-only">Reason</label>
          <Input id={`reason-${documentId}`} name="reason" required placeholder="Blurry, please retake" className="min-w-48 flex-1 py-1 text-xs" />
          <Button type="submit" variant="secondary" className="px-3 py-1 text-xs" disabled={retPending}>Return to client</Button>
        </form>
      ) : (
        <button type="button" onClick={() => setReturning(true)} className="text-xs text-danger-text hover:underline">Return…</button>
      )}
      {error && <span className="text-xs text-danger-text">{error}</span>}
    </div>
  );
}
