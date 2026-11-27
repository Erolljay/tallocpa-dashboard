"use client";

import { RiAttachment2 } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState, useTransition } from "react";
import { Button, Field, Notice, Textarea } from "@/components/ui";
import { replyRequest, returnStandingAction, setStandingRequestAction, standingNoActivityAction, type RequestFormState } from "@/lib/requests/actions";
import { STANDING_SETTINGS, type StandingKind, type StandingSetting } from "@/lib/requests/labels";
import { uploadRequestFile } from "./reply-form";

/**
 * The client fulfils a standing monthly request (no chat): upload the files, or for the
 * AR/AP update say nothing was collected or paid. Each file goes to the request's folder.
 */
export function StandingUpload({ requestId, kind }: { requestId: string; kind: StandingKind }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<RequestFormState>({});
  const [busy, setBusy] = useState(false);
  const [nothing, startNothing] = useTransition();

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (files.length === 0) return setState({ error: "Choose the files to upload." });
    setBusy(true);
    setState({});
    try {
      for (const file of files) {
        const { path, type } = await uploadRequestFile(requestId, file);
        const result = await replyRequest({ requestId, body: "", path, fileName: file.name, mimeType: type });
        if (result.error) throw new Error(result.error);
      }
      setFiles([]);
      if (input.current) input.current.value = "";
      setState({ ok: true });
      router.refresh();
    } catch (err) {
      setState({ error: (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={send} className="flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-body-medium text-button-ghost-foreground outline-none hover:bg-background-secondary-hover focus-within:ring-2 focus-within:ring-border-focus-ring pointer-coarse:min-h-11">
          <RiAttachment2 aria-hidden className="size-5 shrink-0" />
          <span className="max-w-64 truncate">{files.length === 0 ? "Choose files" : files.length === 1 ? files[0].name : `${files.length} files`}</span>
          <input ref={input} type="file" multiple className="sr-only" accept="image/*,application/pdf,.xlsx,.docx" onChange={(ev) => setFiles([...(ev.target.files ?? [])])} />
        </label>
        <Button type="submit" disabled={busy || nothing}>{busy ? "Uploading…" : "Upload"}</Button>
      </form>
      {kind === "arap_update" && (
        <Button
          variant="secondary"
          disabled={busy || nothing}
          onClick={() => startNothing(async () => {
            const r = await standingNoActivityAction(requestId);
            setState(r);
            if (r.ok) router.refresh();
          })}
        >
          {nothing ? "Saving…" : "No collections or payments this month"}
        </Button>
      )}
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      {state.ok && <p role="status" className="text-body-regular text-text-secondary">Thank you. We&apos;ll check it and let you know if anything is missing.</p>}
    </div>
  );
}

/** Staff return what the client sent, with the reason the client will see. */
export function ReturnStandingForm({ requestId }: { requestId: string }) {
  const [state, action, pending] = useActionState(returnStandingAction, {} as RequestFormState);
  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="request_id" value={requestId} />
      <Field label="Return it to the client" htmlFor={`return-${requestId}`} error={state.fieldErrors?.reason} hint="Say what is wrong or missing; the client sees this.">
        <Textarea id={`return-${requestId}`} name="reason" rows={2} />
      </Field>
      <div className="flex items-center gap-3">
        <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Returning…" : "Return"}</Button>
        {state.error && !state.fieldErrors && <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
      </div>
    </form>
  );
}

/** Staff on the client: switch each standing monthly request on or off; bank statements may list the accounts. */
export function StandingSwitches({ clientId, on, accounts, booksAccounts }: { clientId: string; on: Record<StandingSetting, boolean>; accounts: string[]; booksAccounts: string[] }) {
  const [error, setError] = useState<string>();
  const [pending, start] = useTransition();
  const [list, setList] = useState(accounts.join("\n"));
  const save = (kind: StandingSetting, value: boolean) =>
    start(async () => setError((await setStandingRequestAction(clientId, kind, value, kind === "bank_statements" ? list.split("\n") : [])).error));

  return (
    <div className="flex flex-col gap-4">
      {(Object.keys(STANDING_SETTINGS) as StandingSetting[]).map((kind) => (
        <div key={kind} className="flex flex-col gap-2 border-t border-separator-border pt-4 first:border-t-0 first:pt-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-body-medium text-text-primary">{STANDING_SETTINGS[kind].label}</p>
              <p className="text-caption-1-regular text-text-tertiary">{STANDING_SETTINGS[kind].hint}</p>
            </div>
            <Button size="sm" variant={on[kind] ? "secondary" : "primary"} disabled={pending} onClick={() => save(kind, !on[kind])}>
              {on[kind] ? "Turn off" : "Turn on"}
            </Button>
          </div>
          {kind === "bank_statements" && (
            <div className="flex flex-col gap-2">
              <Field
                label="Accounts to ask for"
                htmlFor={`standing-accounts-${clientId}`}
                hint={booksAccounts.length ? `One per line. Leave empty to ask for each bank account in the books: ${booksAccounts.join(", ")}.` : "One per line, e.g. BDO Savings 1234. Leave empty to ask for the bank statements in one request."}
              >
                <Textarea id={`standing-accounts-${clientId}`} rows={3} value={list} onChange={(e) => setList(e.target.value)} />
              </Field>
              {on.bank_statements && list.split("\n").map((a) => a.trim()).filter(Boolean).join("\n") !== accounts.join("\n") && (
                <div><Button size="sm" variant="secondary" disabled={pending} onClick={() => save("bank_statements", true)}>Save accounts</Button></div>
              )}
            </div>
          )}
        </div>
      ))}
      {error && <Notice tone="blocked">{error}</Notice>}
    </div>
  );
}
