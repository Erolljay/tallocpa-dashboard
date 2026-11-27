"use client";

import { RiAttachment2, RiCloseLine, RiFileTextLine, RiImageLine } from "@remixicon/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Button, Input, Notice } from "@/components/ui";
import { addStepFile, removeStepFile, startStepFileUpload } from "./actions";

export interface StepFile {
  id: string;
  file_name: string;
  mime_type: string;
}

/** The proof files on a step: each opens through /registration-files/[id]; staff may take one off while the case is open. */
export function StepFileList({ caseId, files, removable }: { caseId: string; files: StepFile[]; removable: boolean }) {
  if (files.length === 0) return null;
  return (
    <ul className="mt-1 flex flex-wrap gap-2">
      {files.map((f) => <FileChip key={f.id} caseId={caseId} file={f} removable={removable} />)}
    </ul>
  );
}

function FileChip({ caseId, file, removable }: { caseId: string; file: StepFile; removable: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const Icon = file.mime_type.startsWith("image/") ? RiImageLine : RiFileTextLine;
  const remove = () =>
    start(async () => {
      const r = await removeStepFile(caseId, file.id);
      if (r.error) setError(r.error);
      else router.refresh();
    });
  return (
    <li className="flex max-w-full items-center gap-1 rounded-full border border-border-button-default bg-background-primary-default ps-2.5 pe-1 py-0.5">
      <Icon aria-hidden className="size-4 shrink-0 text-foreground-icon-tertiary" />
      <a href={`/registration-files/${file.id}`} className="min-w-0 truncate text-caption-1-medium text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">
        {file.file_name}
      </a>
      {removable && (
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          aria-label={`Remove ${file.file_name}`}
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-foreground-icon-tertiary outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:opacity-50"
        >
          <RiCloseLine aria-hidden className="size-4" />
        </button>
      )}
      {error && <span className="text-caption-1-regular text-text-error-primary">{error}</span>}
    </li>
  );
}

/** Attaches proof (receipts, certificates, permits) to a step: each file goes straight to storage, then is recorded. */
export function StepFileUpload({ caseId, stepId }: { caseId: string; stepId: string }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputId = `${stepId}-proof`;

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (files.length === 0) return setError("Choose the files.");
    setBusy(true);
    setError(null);
    const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    }).storage.from("registration-files");
    const failed: string[] = [];
    for (const file of files) {
      try {
        const started = await startStepFileUpload({ stepId, mimeType: file.type, size: file.size });
        if ("error" in started) throw new Error(started.error);
        const { error: upload } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: file.type });
        if (upload) throw new Error(upload.message);
        const result = await addStepFile({ caseId, stepId, path: started.path, fileName: file.name, mimeType: file.type, size: file.size });
        if (result.error) throw new Error(result.error);
      } catch (err) {
        failed.push(`${file.name}: ${(err as Error).message}`);
      }
    }
    setBusy(false);
    if (failed.length) setError(failed.join(" "));
    if (failed.length < files.length) {
      if (input.current) input.current.value = "";
      setFiles([]);
      router.refresh();
    }
  }

  return (
    <form onSubmit={send} className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-body-medium text-text-primary">Proof (receipts, certificates, permits)</label>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={input}
          id={inputId}
          type="file"
          multiple
          accept="application/pdf,image/jpeg,image/png,image/webp"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="min-w-0 flex-1 py-1.5"
        />
        <Button type="submit" size="sm" variant="secondary" disabled={busy || files.length === 0}>
          <RiAttachment2 aria-hidden className="size-4" />
          {busy ? "Attaching…" : files.length > 1 ? `Attach ${files.length} files` : "Attach"}
        </Button>
      </div>
      <p className="text-caption-1-regular text-text-tertiary">PDF or photos, up to 25 MB each. The client sees them on this step in the portal.</p>
      {error && <Notice tone="blocked">{error}</Notice>}
    </form>
  );
}
