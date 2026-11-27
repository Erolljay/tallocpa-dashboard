"use client";

import { createClient } from "@supabase/supabase-js";
import { RiAttachment2 } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { Button, Notice, Textarea } from "@/components/ui";
import { shrinkImage } from "@/lib/documents/shrink";
import { closeRequestAction, replyRequest, startRequestUpload, type RequestFormState } from "@/lib/requests/actions";

/** Puts one file in the request's folder through a one-time link; returns where it went. */
export async function uploadRequestFile(requestId: string, file: File): Promise<{ path: string; type: string }> {
  const upload = file.type.startsWith("image/") ? await shrinkImage(file) : file;
  const started = await startRequestUpload({ requestId, mimeType: upload.type, size: upload.size });
  if ("error" in started) throw new Error(started.error);
  const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  }).storage.from("requests");
  const { error } = await storage.uploadToSignedUrl(started.path, started.token, upload, { contentType: upload.type });
  if (error) throw new Error(error.message);
  return { path: started.path, type: upload.type };
}

/**
 * Reply to a request or ticket, with a message, a file or both. The file goes
 * straight to storage through a one-time link, then the reply is saved.
 */
export function ReplyForm({ requestId, placeholder }: { requestId: string; placeholder: string }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<RequestFormState>({});
  const [busy, setBusy] = useState(false);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = String(new FormData(e.currentTarget).get("body") ?? "");
    if (!body.trim() && !file) return setState({ error: "Write a message or attach a file." });
    setBusy(true);
    setState({});
    try {
      let path: string | null = null;
      let type: string | null = null;
      if (file) ({ path, type } = await uploadRequestFile(requestId, file));
      const result = await replyRequest({ requestId, body, path, fileName: file?.name ?? null, mimeType: type });
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
    <form ref={form} onSubmit={send} className="flex flex-col gap-3">
      <label htmlFor={`reply-${requestId}`} className="sr-only">Reply</label>
      <Textarea id={`reply-${requestId}`} name="body" rows={3} placeholder={placeholder} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-body-medium text-button-ghost-foreground outline-none hover:bg-background-secondary-hover focus-within:ring-2 focus-within:ring-border-focus-ring pointer-coarse:min-h-11">
          <RiAttachment2 aria-hidden className="size-5 shrink-0" />
          <span className="max-w-56 truncate">{file ? file.name : "Attach a photo or file"}</span>
          <input
            type="file"
            className="sr-only"
            accept="image/*,application/pdf,.xlsx,.docx"
            onChange={(ev) => setFile(ev.target.files?.[0] ?? null)}
          />
        </label>
        <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Send"}</Button>
      </div>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </form>
  );
}

export function CloseRequestButton({ requestId, label = "Close" }: { requestId: string; label?: string }) {
  const [state, action, pending] = useActionState(async () => closeRequestAction(requestId), {} as RequestFormState);
  return (
    <form action={action} className="flex flex-col items-end gap-1">
      <Button type="submit" variant="secondary" disabled={pending}>{pending ? "Closing…" : label}</Button>
      {state.error && <p className="text-caption-1-regular text-text-error-primary">{state.error}</p>}
    </form>
  );
}
