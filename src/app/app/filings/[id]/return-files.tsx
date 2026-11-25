"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState, useTransition } from "react";
import { Button, Field, Input, Notice, Textarea } from "@/components/ui";
import {
  addReturnFile,
  checkEsubmissionReplyAction,
  markEsubmissionSentAction,
  recordEsubmissionErrorsAction,
  retryReturnBookEntryAction,
  sendEsubmissionAction,
  startReturnFileUpload,
  type ReturnFileState,
} from "../return-file-actions";

/**
 * Uploads a file to the return: the ONE scanned copy (decision 14) or the BIR's
 * validation report (decision 15, manual fallback). The file goes straight to storage,
 * then it is recorded.
 */
export function ReturnFileUpload({ filingId, kind, label }: { filingId: string; kind: "filed_copy" | "validation_report"; label: string }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ReturnFileState>({});
  const [busy, setBusy] = useState(false);
  const inputId = `${kind}-file`;

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setState({ error: "Choose the file." });
    setBusy(true);
    setState({});
    try {
      const started = await startReturnFileUpload({ filingId, mimeType: file.type, size: file.size });
      if ("error" in started) throw new Error(started.error);
      const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).storage.from("filing-files");
      const { error } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: file.type });
      if (error) throw new Error(error.message);
      const result = await addReturnFile({ filingId, kind, path: started.path, fileName: file.name, mimeType: file.type, size: file.size });
      setState(result);
      if (result.ok) {
        form.current?.reset();
        setFile(null);
        router.refresh();
      }
    } catch (err) {
      setState({ error: (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form ref={form} onSubmit={send} className="space-y-2">
      <Field label={label} htmlFor={inputId} hint={kind === "filed_copy" ? "One PDF or photo: the return, the proof of payment and the attachments." : "The BIR's reply or its attached report."}>
        <Input id={inputId} type="file" accept={kind === "filed_copy" ? "application/pdf,image/*" : "application/pdf,image/*,text/plain,text/html"} onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="py-1.5" />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm" variant="secondary" disabled={busy || !file}>{busy ? "Attaching…" : "Attach"}</Button>
        {state.ok && <span className="text-caption-1-regular text-text-secondary">{state.ok}</span>}
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

/** A button that runs one server action and shows its answer. */
function ActionButton({ run, label, busyLabel, variant = "secondary" }: { run: () => Promise<ReturnFileState>; label: string; busyLabel: string; variant?: "primary" | "secondary" }) {
  const router = useRouter();
  const [state, setState] = useState<ReturnFileState>({});
  const [pending, start] = useTransition();
  return (
    <div className="space-y-2">
      <Button
        size="sm"
        variant={variant}
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await run();
            setState(r);
            if (r.ok) router.refresh();
          })
        }
      >
        {pending ? busyLabel : label}
      </Button>
      {state.ok && <p className="text-caption-1-regular text-text-secondary">{state.ok}</p>}
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </div>
  );
}

/** What staff can do on the return's eSubmission, by its state (decision 15). */
export function EsubmissionControls({ filingId, state, configured }: { filingId: string; state: "not_sent" | "sent" | "validated" | "errors"; configured: boolean }) {
  const [sentState, markSent, marking] = useActionState(markEsubmissionSentAction.bind(null, filingId), {} as ReturnFileState);
  const [errState, recordErrors, recording] = useActionState(recordEsubmissionErrorsAction.bind(null, filingId), {} as ReturnFileState);

  if (state === "validated") return null;
  const canSend = state === "not_sent" || state === "errors";
  return (
    <div className="space-y-4">
      {canSend && (
        <div className="space-y-3">
          {configured ? (
            <ActionButton run={() => sendEsubmissionAction(filingId)} label={state === "errors" ? "Send the corrected DAT files" : "Send the DAT files to the BIR"} busyLabel="Sending…" variant="primary" />
          ) : (
            <Notice tone="waiting">The eSubmission mailbox is not set up yet (docs/SETUP.md). Download the DAT files from the worksheet, email them to esubmission@bir.gov.ph yourself, then mark them sent.</Notice>
          )}
          <form action={markSent} className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="sm" variant="secondary" disabled={marking}>{marking ? "Saving…" : "Mark sent (sent by hand)"}</Button>
            {sentState.error && <Notice tone="blocked">{sentState.error}</Notice>}
          </form>
        </div>
      )}
      {state === "sent" && (
        <div className="space-y-4">
          {configured && <ActionButton run={() => checkEsubmissionReplyAction(filingId)} label="Check the mailbox for the reply" busyLabel="Checking…" />}
          <ReturnFileUpload filingId={filingId} kind="validation_report" label="Validation report (validated)" />
          <form action={recordErrors} className="space-y-2">
            <Field label="Or: the BIR found errors" htmlFor="esub-errors">
              <Textarea id="esub-errors" name="note" rows={2} placeholder="What to fix, from the BIR's reply" />
            </Field>
            <Button type="submit" size="sm" variant="secondary" disabled={recording}>{recording ? "Saving…" : "Record errors"}</Button>
            {errState.error && <Notice tone="blocked">{errState.error}</Notice>}
          </form>
        </div>
      )}
    </div>
  );
}

export function RetryBookEntry({ filingId, rowId }: { filingId: string; rowId: string }) {
  return <ActionButton run={() => retryReturnBookEntryAction(filingId, rowId)} label="Post again" busyLabel="Posting…" />;
}
