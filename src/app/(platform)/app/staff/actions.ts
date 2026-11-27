"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { grantClientAccess } from "@/lib/contacts/grant";
import { ensureLogin } from "@/lib/people/accounts";
import { clientUserSchema, inviteStaffSchema, updateStaffSchema } from "@/lib/people/schema";
import { supabaseServer } from "@/lib/supabase/server";

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: string };

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

export async function inviteStaffAction(_: FormState, form: FormData): Promise<FormState> {
  const owner = await requireOwner();
  const parsed = inviteStaffSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  let userId: string;
  try {
    userId = await ensureLogin(supabase, parsed.data.email);
  } catch (e) {
    return { error: `Could not create the login: ${(e as Error).message}` };
  }
  const { error } = await supabase.from("staff_profiles").insert({
    user_id: userId,
    brand_id: owner.staff.brandId,
    full_name: parsed.data.full_name,
    role: parsed.data.role,
    branch_id: parsed.data.branch_id,
  });
  if (error) return { error: error.code === "23505" ? "That person is already on the staff list." : `Could not add staff: ${error.message}` };
  revalidatePath("/app/staff");
  return { ok: `${parsed.data.full_name} can now sign in with ${parsed.data.email}.` };
}

export async function updateStaffAction(userId: string, _: FormState, form: FormData): Promise<FormState> {
  const owner = await requireOwner();
  if (userId === owner.userId) return { error: "You cannot change your own Owner account here." };
  const parsed = updateStaffSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the values." };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("staff_profiles").update(parsed.data).eq("user_id", userId);
  if (error) return { error: `Could not save: ${error.message}` };
  revalidatePath("/app/staff");
  return { ok: "Saved." };
}

export async function addClientUserAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireOwner();
  const parsed = clientUserSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const r = await grantClientAccess(supabase, { ...parsed.data, client_id: clientId });
  if ("error" in r) return { error: r.error };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/app/contacts", "layout");
  return { ok: `${parsed.data.full_name} can now sign in to the portal with ${parsed.data.email}.` };
}

export async function removeClientUserAction(clientId: string, userId: string): Promise<FormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("client_users").delete().eq("client_id", clientId).eq("user_id", userId);
  if (error) return { error: `Could not remove: ${error.message}` };
  revalidatePath(`/app/clients/${clientId}`);
  revalidatePath("/app/contacts", "layout");
  return { ok: "Removed." };
}
