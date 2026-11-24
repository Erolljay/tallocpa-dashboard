"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, requireStaff } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { partySchema } from "@/lib/parties/schema";
import { parseTin, partyKeyOf } from "@/lib/parties/tin";
import { supabaseServer } from "@/lib/supabase/server";

export type PartyFormState = { error?: string; fieldErrors?: Record<string, string>; ok?: string };

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

/** New party (partyId null) or an edit. The database lets any staff member change an unverified party, only the Owner a verified one. */
export async function savePartyAction(partyId: string | null, _: PartyFormState, form: FormData): Promise<PartyFormState> {
  await requireStaff();
  const parsed = partySchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const duplicate = { error: `${partyKeyOf(parsed.data.tin, parsed.data.branch_code)} is already in the directory.` };

  if (!partyId) {
    const { data, error } = await supabase.from("parties").insert({ ...parsed.data, source: "manual" }).select("id").single();
    if (error) return error.code === "23505" ? duplicate : { error: `Could not save: ${error.message}` };
    revalidatePath("/app/parties");
    redirect(`/app/parties/${data.id}`);
  }
  const { data, error } = await supabase.from("parties").update(parsed.data).eq("id", partyId).select("id");
  if (error) return error.code === "23505" ? duplicate : { error: `Could not save: ${error.message}` };
  if (!data?.length) return { error: "Only the Owner can change a verified party." };
  revalidatePath("/app/parties", "layout");
  return { ok: "Saved." };
}

/** The Owner or a reviewer confirms the details against a COR or 2307 (or, the Owner only, takes that back). */
export async function setPartyVerifiedAction(partyId: string, verified: boolean): Promise<PartyFormState> {
  const me = await requireStaff();
  if (!(me.staff.role === "owner" || (me.staff.role === "reviewer" && verified))) return { error: verified ? "Only the Owner or a reviewer can verify a party." : "Only the Owner can undo a verification." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("parties").update({ verified_at: verified ? new Date().toISOString() : null }).eq("id", partyId).select("id");
  if (error) return { error: `Could not save: ${error.message}` };
  if (!data?.length) return { error: "This party could not be changed." };
  revalidatePath("/app/parties", "layout");
  return { ok: verified ? "Marked verified." : "Verification removed." };
}

/** The Owner merges a duplicate (given by its TIN and branch) into this party; the database keeps the verified one. */
export async function mergePartyAction(partyId: string, _: PartyFormState, form: FormData): Promise<PartyFormState> {
  await requireOwner();
  const raw = String(form.get("duplicate") ?? "");
  const t = parseTin(raw);
  if (!t) return { error: "Enter the duplicate's TIN and branch, like 123-456-789-00000." };
  const supabase = await supabaseServer();
  const { data: dup } = await supabase.from("parties").select("id").eq("tin", t.tin).eq("branch_code", t.branch).maybeSingle();
  if (!dup) return { error: `${partyKeyOf(t.tin, t.branch)} is not in the directory.` };
  if (dup.id === partyId) return { error: "That is this party." };
  const { data, error } = await supabase.rpc("merge_parties", { p_keep: partyId, p_drop: dup.id });
  if (error) return { error: error.message };
  revalidatePath("/app/parties", "layout");
  redirect(`/app/parties/${(data as { id: string }).id}`);
}

/** A party's preset account title for the books (a template key; "" clears it). Any staff member. */
export async function setPresetAccountAction(partyId: string, _: PartyFormState, form: FormData): Promise<PartyFormState> {
  await requireStaff();
  const key = String(form.get("preset_account_key") ?? "");
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_party_preset", { p_party: partyId, p_key: key });
  if (error) return { error: error.message };
  revalidatePath(`/app/parties/${partyId}`);
  return { ok: key ? "Preset saved." : "Preset cleared." };
}
