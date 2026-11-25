"use client";

import { useActionState } from "react";
import { Button, Field, Textarea } from "@/components/ui";
import { addClientNoteAction, type NoteState } from "./notes-actions";

export function ClientNoteForm({ clientId }: { clientId: string }) {
  const [state, action, pending] = useActionState(addClientNoteAction.bind(null, clientId), {} as NoteState);
  return (
    <form action={action} className="mt-4 space-y-3 border-t border-separator-border pt-4">
      <Field label="Add a note" htmlFor="client-note" error={state.error}>
        <Textarea id="client-note" name="body" rows={3} maxLength={4000} />
      </Field>
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>{pending ? "Saving…" : "Add the note"}</Button>
    </form>
  );
}
