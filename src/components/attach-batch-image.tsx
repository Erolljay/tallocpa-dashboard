"use client";

import { createClient } from "@supabase/supabase-js";
import { RiImageAddLine, RiLoader4Line } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { finishBatchImage, startBatchImage } from "@/lib/documents/actions";
import { shrinkImage } from "@/lib/documents/shrink";
import { cx } from "@/utils/cx";

/**
 * Attach the source image (or PDF) to a batch-uploaded row (B1). The file goes to the
 * documents bucket like any upload; the row's approved figures and entries stay as they
 * are, so this works in a locked month too.
 */
export function AttachBatchImage({ documentId, size = "sm" }: { documentId: string; size?: "sm" | "md" }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function attach(list: FileList | null) {
    const picked = list?.[0];
    if (!picked) return;
    setBusy(true);
    setError(null);
    try {
      const file = await shrinkImage(picked);
      const mimeType = file.type || "application/octet-stream";
      const started = await startBatchImage({ documentId, fileName: file.name || "image.jpg", mimeType, size: file.size });
      if ("error" in started) throw new Error(started.error);
      const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).storage.from("documents");
      const { error: upError } = await storage.uploadToSignedUrl(started.path, started.token, file, { contentType: mimeType });
      if (upError) throw new Error(upError.message);
      const done = await finishBatchImage({ documentId, path: started.path, mimeType, size: file.size });
      if ("error" in done) throw new Error(done.error);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
        className={cx(
          "inline-flex items-center gap-1.5 rounded-lg text-button-ghost-foreground outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:opacity-60",
          size === "sm" ? "text-caption-1-medium" : "text-body-medium",
        )}
      >
        {busy ? <RiLoader4Line aria-hidden className="size-4 animate-spin" /> : <RiImageAddLine aria-hidden className="size-4" />}
        {busy ? "Attaching…" : "Attach image"}
      </button>
      <input ref={input} type="file" accept="image/*,application/pdf" className="sr-only" tabIndex={-1} aria-hidden onChange={(e) => attach(e.target.files)} />
      {error && <span role="alert" className="text-caption-1-regular text-text-error-primary">{error}</span>}
    </span>
  );
}
