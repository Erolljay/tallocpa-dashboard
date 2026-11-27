"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DocActionState } from "@/lib/documents/actions";
import { supabaseServer } from "@/lib/supabase/server";

/*
 * A reviewer's fixes to a bundled PDF (migration 20261231000003): the database
 * checks the person is the Owner or staff assigned to the client.
 */

const pageOf = (form: FormData) => {
  const n = Number(form.get("page"));
  return Number.isInteger(n) && n >= 1 ? n : null;
};

/** Adds an invoice OCR missed, on the page given, and opens it to type its figures. */
export async function addBundleInvoiceAction(documentId: string, _: DocActionState, form: FormData): Promise<DocActionState> {
  const page = pageOf(form);
  if (!page) return { error: "Enter the page number (1 or more)." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("add_bundle_invoice", { p_document: documentId, p_page: page });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  redirect(`/app/documents/${(data as { id: string }).id}`);
}

/** Removes an invoice of a bundle that is not approved; back to the bundle. */
export async function deleteBundleInvoiceAction(documentId: string): Promise<DocActionState> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("delete_bundle_invoice", { p_document: documentId });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  revalidatePath("/portal", "layout");
  redirect(`/app/documents/${(data as { id: string }).id}`);
}

/** Changes the page an invoice of a bundle is on. */
export async function setBundlePageAction(documentId: string, _: DocActionState, form: FormData): Promise<DocActionState> {
  const page = pageOf(form);
  if (!page) return { error: "Enter the page number (1 or more)." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_bundle_page", { p_document: documentId, p_page: page });
  if (error) return { error: error.message };
  revalidatePath("/app", "layout");
  return { ok: `Moved to page ${page}.` };
}
