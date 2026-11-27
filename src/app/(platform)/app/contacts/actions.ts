"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { grantClientAccess } from "@/lib/contacts/grant";
import { contactAccessSchema, contactLinkSchema, contactNameSchema, newContactSchema } from "@/lib/people/schema";
import { supabaseServer } from "@/lib/supabase/server";

export type ContactFormState = { error?: string; fieldErrors?: Record<string, string>; ok?: string };

function errorsOf(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

function refresh(userId: string | null, clientId: string | null) {
  revalidatePath("/app/contacts");
  if (userId) revalidatePath(`/app/contacts/${userId}`);
  if (clientId) revalidatePath(`/app/clients/${clientId}`);
}

/** A new contact and their first business. An email that already has a login is reused. */
export async function createContactAction(_: ContactFormState, form: FormData): Promise<ContactFormState> {
  await requireOwner();
  const parsed = newContactSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: errorsOf(parsed.error.issues) };
  const supabase = await supabaseServer();
  const r = await grantClientAccess(supabase, parsed.data);
  if ("error" in r) return { error: r.error };
  refresh(r.userId, parsed.data.client_id);
  redirect(`/app/contacts/${r.userId}`);
}

/** Gives an existing contact access to one more business. */
export async function addContactBusinessAction(userId: string, _: ContactFormState, form: FormData): Promise<ContactFormState> {
  await requireOwner();
  const parsed = contactLinkSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: errorsOf(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { data: existing } = await supabase.from("client_users").select("full_name").eq("user_id", userId).limit(1).maybeSingle();
  if (!existing) return { error: "Contact not found." };
  const { error } = await supabase.from("client_users").insert({
    user_id: userId,
    client_id: parsed.data.client_id,
    full_name: existing.full_name,
    position: parsed.data.position ?? null,
    access: parsed.data.access,
  });
  if (error) return { error: error.code === "23505" ? "This contact already has access to that business." : `Could not add: ${error.message}` };
  refresh(userId, parsed.data.client_id);
  return { ok: "Access given. They see this business the next time they open the portal." };
}

/** Changes a contact's position and access level for one business. */
export async function updateContactAccessAction(userId: string, clientId: string, _: ContactFormState, form: FormData): Promise<ContactFormState> {
  await requireOwner();
  const parsed = contactAccessSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: errorsOf(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("client_users")
    .update({ position: parsed.data.position ?? null, access: parsed.data.access })
    .eq("user_id", userId)
    .eq("client_id", clientId)
    .select("user_id");
  if (error) return { error: `Could not save: ${error.message}` };
  if (!data?.length) return { error: "Access not found." };
  refresh(userId, clientId);
  return { ok: "Saved." };
}

/** Removes a contact's access to one business. Their login stays for their other businesses. */
export async function removeContactBusinessAction(userId: string, clientId: string): Promise<ContactFormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("client_users").delete().eq("user_id", userId).eq("client_id", clientId);
  if (error) return { error: `Could not remove: ${error.message}` };
  refresh(userId, clientId);
  return { ok: "Removed." };
}

/** Renames a contact on every business they are linked to. */
export async function renameContactAction(userId: string, _: ContactFormState, form: FormData): Promise<ContactFormState> {
  await requireOwner();
  const parsed = contactNameSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: errorsOf(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("client_users").update({ full_name: parsed.data.full_name }).eq("user_id", userId);
  if (error) return { error: `Could not save: ${error.message}` };
  refresh(userId, null);
  revalidatePath("/app/clients", "layout");
  return { ok: "Saved." };
}
