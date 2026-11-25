import "server-only";
/**
 * A return's DAT attachments for eSubmission, built by the same worksheet generators as
 * the download route (src/app/app/filings/[id]/worksheet/[kind]/route.ts): the saved
 * figures once the return is filed, else the figures computed now. Read only; the
 * generators are not changed here.
 */
import { LOCKED_STATUSES, loadWorksheet } from "@/lib/returns/load";
import type { supabaseServer } from "@/lib/supabase/server";
import { isDatKind, type MailAttachment } from "./mime";

type Db = Awaited<ReturnType<typeof supabaseServer>>;

export type DatFiles = { files: MailAttachment[]; problem: string | null };

/** The DAT files of the return (none when its form has no DAT attachment), and why they cannot be sent yet, if so. */
export async function datFiles(filingId: string, db: Db): Promise<DatFiles> {
  const loaded = await loadWorksheet(filingId, db);
  if (!loaded?.module || !loaded.ctx) return { files: [], problem: null };
  const locked = LOCKED_STATUSES.includes(loaded.filing.status);
  const result = locked && loaded.saved?.result ? loaded.saved.result : loaded.module.compute(loaded.ctx);
  const dats = (loaded.module.attachments?.(loaded.ctx, result) ?? []).filter((a) => isDatKind(a.kind));
  const files = dats.map((a) => {
    const f = a.build();
    return { fileName: f.fileName, contentType: "application/octet-stream", body: f.body };
  });
  return { files, problem: result.errors.length && files.length ? "The worksheet has problems to fix first; see the worksheet page." : null };
}
