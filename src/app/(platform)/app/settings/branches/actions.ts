"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { branchSchema, branchUpdateSchema } from "@/lib/branches";
import { formToObject } from "@/lib/clients/schema";
import { supabaseServer } from "@/lib/supabase/server";

export type BranchState = { ok?: string; error?: string; fieldErrors?: Record<string, string> };

function errors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

function refresh() {
  revalidatePath("/app/settings/branches");
  revalidatePath("/app/staff");
  revalidatePath("/app/clients", "layout");
}

export async function addBranchAction(_: BranchState, form: FormData): Promise<BranchState> {
  const owner = await requireOwner();
  const parsed = branchSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: errors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("branches").insert({ brand_id: owner.staff.brandId, ...parsed.data, address: parsed.data.address ?? null });
  if (error) return { error: error.code === "23505" ? `A branch with code ${parsed.data.code} already exists.` : `Could not add the branch: ${error.message}` };
  refresh();
  return { ok: `${parsed.data.name} added.` };
}

/** Renames a branch, changes its address, or closes / reopens it. The code stays. */
export async function updateBranchAction(id: string, _: BranchState, form: FormData): Promise<BranchState> {
  await requireOwner();
  const parsed = branchUpdateSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: Object.values(errors(parsed.error.issues))[0] };
  const supabase = await supabaseServer();
  if (!parsed.data.active) {
    const { count } = await supabase.from("branches").select("id", { count: "exact", head: true }).eq("active", true).neq("id", id);
    if (!count) return { error: "Keep at least one branch open." };
  }
  const { error } = await supabase.from("branches").update({ ...parsed.data, address: parsed.data.address ?? null }).eq("id", id);
  if (error) return { error: `Could not save: ${error.message}` };
  refresh();
  return { ok: "Saved." };
}
