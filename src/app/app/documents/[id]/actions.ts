"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DocActionState } from "@/lib/documents/actions";
import { normalizeFields, OCR_FIELDS, type OcrFields } from "@/lib/ocr/fields";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Staff approve the figures (as edited), or correct an approved document's figures
 * before its month is locked. Corrections from OCR are logged by the database.
 */
export async function approveDocumentAction(documentId: string, mode: "approve" | "edit", _: DocActionState, form: FormData): Promise<DocActionState> {
  const raw: OcrFields = {};
  for (const f of OCR_FIELDS) {
    const v = form.get(f.key);
    raw[f.key] = typeof v === "string" && v.trim() !== "" ? v.trim() : null;
  }
  const fields = normalizeFields(raw);
  for (const f of OCR_FIELDS) {
    if (f.kind === "amount" && raw[f.key] && !fields[f.key]) return { error: `${f.label}: enter a number like 1120.50.` };
  }
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("approve_document", { p_document: documentId, p_fields: fields });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  const clientId = (data as { client_id?: string } | null)?.client_id;
  if (mode === "edit" && clientId) redirect(`/app/documents?tab=approved&client=${clientId}`);
  redirect(clientId ? `/app/documents?client=${clientId}` : "/app/documents");
}
