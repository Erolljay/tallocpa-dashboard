"use client";

import { createClient } from "@supabase/supabase-js";
import { CheckCircle2, ScanLine, CircleAlert, FileUp, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { DocumentScanner } from "@/components/document-scanner";
import { Field, Select } from "@/components/ui";
import { finishUpload, startUpload } from "@/lib/documents/actions";
import { DOC_TYPES, showMonth, type DocType } from "@/lib/documents/labels";
import { shrinkImage } from "@/lib/documents/shrink";

type Item = { key: string; name: string; state: "waiting" | "sending" | "done" | "failed"; error?: string };

/**
 * Upload receipts and other documents: phone or tablet camera, or files. Each file
 * is registered with the database (which checks access and picks the month), sent
 * straight to storage through a one-time link, then confirmed.
 */
export function DocumentUpload(props: {
  clients: { id: string; name: string }[];
  docTypes: DocType[];
  months: string[];
  defaultMonth: string;
  /** Attach to a filing (filed return / proof of payment). */
  filingId?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [clientId, setClientId] = useState(props.clients[0]?.id ?? "");
  const [docType, setDocType] = useState<DocType>(props.docTypes[0]);
  const [month, setMonth] = useState(props.defaultMonth);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);
  const camera = useRef<HTMLInputElement>(null);
  const files = useRef<HTMLInputElement>(null);
  // Uploads run one after another, even when scans arrive while one is sending.
  const queue = useRef<Promise<void>>(Promise.resolve());

  const fieldCount = [props.clients.length > 1, props.docTypes.length > 1, props.months.length > 1].filter(Boolean).length;
  const set = (key: string, patch: Partial<Item>) => setItems((cur) => cur.map((i) => (i.key === key ? { ...i, ...patch } : i)));

  function send(list: FileList | File[] | null) {
    if (!list || list.length === 0) return;
    const picked = Array.from(list);
    queue.current = queue.current.then(() => upload(picked));
  }

  async function upload(picked: File[]) {
    const batch = picked.map((f, n) => ({ key: `${Date.now()}-${n}-${f.name}`, name: f.name || "Photo", state: "waiting" as const }));
    setItems((cur) => [...batch, ...cur]);
    setBusy(true);
    const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    }).storage.from("documents");

    for (let n = 0; n < picked.length; n++) {
      const key = batch[n].key;
      set(key, { state: "sending" });
      try {
        const file = await shrinkImage(picked[n]);
        const started = await startUpload({
          clientId,
          docType,
          month,
          fileName: file.name || `photo-${Date.now()}.jpg`,
          mimeType: file.type || "application/octet-stream",
          size: file.size,
          filingId: props.filingId,
        });
        if ("error" in started) throw new Error(started.error);
        const { error } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: file.type });
        if (error) throw new Error(error.message);
        const done = await finishUpload(started.documentId);
        if ("error" in done) throw new Error(done.error);
        set(key, { state: "done" });
      } catch (e) {
        set(key, { state: "failed", error: (e as Error).message });
      }
    }
    setBusy(false);
    if (camera.current) camera.current.value = "";
    if (files.current) files.current.value = "";
    router.refresh();
  }

  // No camera access in the browser (or permission refused): use the phone's own camera app.
  const cameraFallback = useCallback(() => {
    setScanning(false);
    camera.current?.click();
  }, []);
  const closeScanner = useCallback(() => setScanning(false), []);

  return (
    <div className="space-y-4">
      {scanning && <DocumentScanner onScan={(f) => send([f])} onClose={closeScanner} onUnavailable={cameraFallback} />}
      <div className={`grid gap-3 ${fieldCount >= 3 && !props.compact ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {props.clients.length > 1 && (
          <Field label="Business" htmlFor="up_client">
            <Select id="up_client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
              {props.clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>
        )}
        {props.docTypes.length > 1 && (
          <Field label="What is it?" htmlFor="up_type">
            <Select id="up_type" value={docType} onChange={(e) => setDocType(e.target.value as DocType)}>
              {props.docTypes.map((t) => <option key={t} value={t}>{DOC_TYPES[t]}</option>)}
            </Select>
          </Field>
        )}
        {props.months.length > 1 && (
          <Field label="For the month of" htmlFor="up_month">
            <Select id="up_month" value={month} onChange={(e) => setMonth(e.target.value)}>
              {props.months.map((m) => <option key={m} value={m}>{showMonth(m)}</option>)}
            </Select>
          </Field>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={busy || !clientId}
          onClick={() => ("getUserMedia" in (navigator.mediaDevices ?? {}) ? setScanning(true) : camera.current?.click())}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-action px-4 py-3 text-base font-medium text-ink-on-action hover:bg-action-hover disabled:opacity-60"
        >
          <ScanLine aria-hidden className="size-5" /> Scan document
        </button>
        <button
          type="button"
          disabled={busy || !clientId}
          onClick={() => files.current?.click()}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-3 text-base font-medium text-ink-heading hover:bg-surface-sunken disabled:opacity-60"
        >
          <FileUp aria-hidden className="size-5" /> Choose photos or PDFs
        </button>
        <input ref={camera} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1} aria-hidden onChange={(e) => send(e.target.files)} />
        <input ref={files} type="file" accept="image/*,application/pdf" multiple className="sr-only" tabIndex={-1} aria-hidden onChange={(e) => send(e.target.files)} />
      </div>

      {items.length > 0 && (
        <ul className="divide-y divide-border rounded-xl border border-border text-sm" aria-live="polite">
          {items.map((i) => (
            <li key={i.key} className="flex items-start gap-3 px-3 py-2">
              {i.state === "done" ? (
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
              ) : i.state === "failed" ? (
                <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-danger-text" />
              ) : (
                <LoaderCircle aria-hidden className="mt-0.5 size-4 shrink-0 animate-spin text-ink-subtle" />
              )}
              <div className="min-w-0">
                <p className="truncate text-ink-heading">{i.name}</p>
                <p className="text-xs text-ink-subtle">
                  {i.state === "done" ? "Received" : i.state === "failed" ? i.error : i.state === "sending" ? "Sending…" : "Waiting"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
