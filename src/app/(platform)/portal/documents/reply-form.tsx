"use client";

import { useActionState } from "react";
import { Button, Notice, Textarea } from "@/components/ui";
import { replyDocumentAction, type DocActionState } from "@/lib/documents/actions";

export function ReplyForm({ documentId }: { documentId: string }) {
  const [state, action, pending] = useActionState(replyDocumentAction.bind(null, documentId), {} as DocActionState);
  return (
    <form action={action} className="space-y-2">
      <label htmlFor={`reply-${documentId}`} className="sr-only">Your reply</label>
      <Textarea id={`reply-${documentId}`} name="reply" rows={2} required placeholder="e.g. Retook the photo and uploaded it again." />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Sending…" : "Send reply"}</Button>
        {(state.ok || state.error) && <Notice tone={state.ok ? "done" : "blocked"}>{state.ok ?? state.error}</Notice>}
      </div>
    </form>
  );
}
