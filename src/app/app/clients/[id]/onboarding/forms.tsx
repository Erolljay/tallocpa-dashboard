"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { CLIENT_FILE_KINDS, type ClientFileKind } from "@/lib/onboarding/files";
import { addClientFile, removeClientFileAction, startClientFileUpload, tickOnboardingAction, type OnboardingState } from "./actions";

/** Attach a proposal, the signed contract or another file. The file goes straight to storage, then it is recorded. */
export function ClientFileForm({ clientId }: { clientId: string }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState<ClientFileKind>("proposal");
  const [state, setState] = useState<OnboardingState>({});
  const [busy, setBusy] = useState(false);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setState({ error: "Choose the file." });
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setState({});
    try {
      const started = await startClientFileUpload({ clientId, mimeType: file.type, size: file.size });
      if ("error" in started) throw new Error(started.error);
      const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).storage.from("client-files");
      const { error } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: file.type });
      if (error) throw new Error(error.message);
      const result = await addClientFile({
        clientId,
        kind,
        title: String(fd.get("title") ?? ""),
        path: started.path,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        signedOn: kind === "contract" ? String(fd.get("signed_on") ?? "") || null : null,
      });
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
    <form ref={form} onSubmit={send} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="What it is" htmlFor="file_kind">
          <Select id="file_kind" value={kind} onChange={(e) => setKind(e.target.value as ClientFileKind)}>
            {Object.entries(CLIENT_FILE_KINDS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </Select>
        </Field>
        <Field label="Title" htmlFor="file_title" hint="Optional; the file name if blank.">
          <Input id="file_title" name="title" placeholder={kind === "contract" ? "Engagement letter 2027" : kind === "proposal" ? "Proposal, bookkeeping and tax" : ""} />
        </Field>
        {kind === "contract" && (
          <Field label="Signed on" htmlFor="file_signed">
            <Input id="file_signed" name="signed_on" type="date" />
          </Field>
        )}
        <Field label="File (PDF, Word, Excel or photo, up to 20 MB)" htmlFor="file_input">
          <Input id="file_input" type="file" accept="application/pdf,.docx,.xlsx,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="py-1.5" />
        </Field>
      </div>
      <Button type="submit" disabled={busy || !file}>{busy ? "Attaching…" : "Attach"}</Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

export function RemoveFileButton({ clientId, fileId }: { clientId: string; fileId: string }) {
  const [state, action, pending] = useActionState(async () => removeClientFileAction(clientId, fileId), {} as OnboardingState);
  return (
    <form action={action}>
      <Button type="submit" variant="ghost" size="sm" disabled={pending}>{pending ? "Removing…" : "Remove"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}

export function TickForm({ clientId, item, done }: { clientId: string; item: string; done: boolean }) {
  const [state, action, pending] = useActionState(tickOnboardingAction.bind(null, clientId, item, !done), {} as OnboardingState);
  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      {!done && <Input name="note" aria-label="Note" placeholder="Note (optional)" className="w-48" />}
      <Button type="submit" variant={done ? "ghost" : "secondary"} size="sm" disabled={pending}>{pending ? "Saving…" : done ? "Untick" : "Mark done"}</Button>
      {state.error && <span className="text-caption-1-regular text-text-error-primary">{state.error}</span>}
    </form>
  );
}
