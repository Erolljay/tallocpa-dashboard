"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button, Input } from "@/components/ui";
import { reviewDocumentAction, type DocActionState } from "@/lib/documents/actions";

/** Staff actions on one document: open it to check and approve the figures, or return it with a reason. */
export function DocReviewActions({ documentId, status }: { documentId: string; status: string }) {
  const [returning, setReturning] = useState(false);
  const [retState, ret, retPending] = useActionState(reviewDocumentAction.bind(null, documentId, "return"), {} as DocActionState);
  if (!["received", "under_review"].includes(status)) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={`/app/documents/${documentId}`} className="text-xs font-medium text-link hover:underline">Review figures</Link>
      {returning ? (
        <form action={ret} className="flex flex-1 flex-wrap items-center gap-2">
          <label htmlFor={`reason-${documentId}`} className="sr-only">Reason</label>
          <Input id={`reason-${documentId}`} name="reason" required placeholder="Blurry, please retake" className="min-w-48 flex-1 py-1 text-xs" />
          <Button type="submit" variant="secondary" className="px-3 py-1 text-xs" disabled={retPending}>Return to client</Button>
        </form>
      ) : (
        <button type="button" onClick={() => setReturning(true)} className="text-xs text-danger-text hover:underline">Return…</button>
      )}
      {retState.error && <span className="text-xs text-danger-text">{retState.error}</span>}
    </div>
  );
}
