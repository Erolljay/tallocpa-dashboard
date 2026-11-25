"use client";

import { useActionState } from "react";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { SIGNED_REFS, type SignedRef } from "@/lib/workpapers/review";
import { noteAction, raiseNoteAction, signWorkpaperAction, type ExplainState } from "./actions";

function Msg({ s }: { s: ExplainState }) {
  if (s.error) return <span role="alert" className="text-caption-1-regular text-text-error-primary">{s.error}</span>;
  return null;
}

/** Preparer and reviewer signatures on one workpaper. */
export function SignButtons(props: { clientId: string; month: string; refId: SignedRef; prepared: boolean; reviewed: boolean; canReview: boolean }) {
  const act = (a: "prepare" | "unprepare" | "review" | "unreview") => () => signWorkpaperAction(props.clientId, props.month, props.refId, a);
  const [ps, prep, pp] = useActionState(act(props.prepared ? "unprepare" : "prepare"), {} as ExplainState);
  const [rs, rev, rp] = useActionState(act(props.reviewed ? "unreview" : "review"), {} as ExplainState);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {!props.reviewed && (
        <form action={prep}>
          <Button type="submit" size="sm" variant={props.prepared ? "ghost" : "secondary"} disabled={pp}>{props.prepared ? "Unsign" : "Sign as prepared"}</Button>
        </form>
      )}
      {props.canReview && props.prepared && (
        <form action={rev}>
          <Button type="submit" size="sm" variant={props.reviewed ? "ghost" : "primary"} disabled={rp}>{props.reviewed ? "Take review back" : "Sign as reviewed"}</Button>
        </form>
      )}
      <Msg s={ps} />
      <Msg s={rs} />
    </div>
  );
}

export function RaiseNoteForm({ clientId, month, refs }: { clientId: string; month: string; refs: SignedRef[] }) {
  const [state, run, pending] = useActionState(raiseNoteAction.bind(null, clientId, month), {} as ExplainState);
  return (
    <form action={run} className="flex flex-wrap items-end gap-2">
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">
        Workpaper
        <Select name="ref" defaultValue={refs[0]} className="w-auto">
          {refs.map((r) => <option key={r} value={r}>{r} · {SIGNED_REFS[r]}</option>)}
        </Select>
      </label>
      <label className="flex min-w-60 flex-1 flex-col gap-1 text-caption-1-medium text-text-secondary">
        Note
        <Input name="note" required placeholder="What the preparer should look at" />
      </label>
      <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Raising…" : "Raise note"}</Button>
      <Msg s={state} />
    </form>
  );
}

export function NoteActions({ clientId, noteId, open, canReview, response }: { clientId: string; noteId: string; open: boolean; canReview: boolean; response: string | null }) {
  const [rs, respond, rp] = useActionState(noteAction.bind(null, clientId, noteId, "respond"), {} as ExplainState);
  const [cs, clear, cp] = useActionState(noteAction.bind(null, clientId, noteId, open ? "clear" : "reopen"), {} as ExplainState);
  return (
    <div className="space-y-2">
      {open && (
        <form action={respond} className="space-y-2">
          <label htmlFor={`resp-${noteId}`} className="sr-only">Answer</label>
          <Textarea id={`resp-${noteId}`} name="text" rows={2} defaultValue={response ?? ""} placeholder="Answer for the reviewer" />
          <Button type="submit" size="sm" variant="secondary" disabled={rp}>{response ? "Update answer" : "Answer"}</Button>
          <Msg s={rs} />
        </form>
      )}
      {canReview && (
        <form action={clear} className="flex items-center gap-2">
          <Button type="submit" size="sm" variant={open ? "primary" : "ghost"} disabled={cp}>{open ? "Clear note" : "Reopen"}</Button>
          <Msg s={cs} />
        </form>
      )}
    </div>
  );
}
