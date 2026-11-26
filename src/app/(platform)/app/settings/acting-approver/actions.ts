"use server";

import { revalidatePath } from "next/cache";
import { appointmentRow, appointmentSchema } from "@/lib/acting/period";
import { requireOwner } from "@/lib/auth";
import { formToObject } from "@/lib/clients/schema";
import { supabaseServer } from "@/lib/supabase/server";

export type ActingState = { ok?: string; error?: string; fieldErrors?: Record<string, string> };

function refresh() {
  revalidatePath("/app/settings/acting-approver");
  revalidatePath("/app/review");
  revalidatePath("/app");
}

/** The Owner names a Reviewer to give the final approval while away (Q58). The database checks the rest. */
export async function appointActingAction(_: ActingState, form: FormData): Promise<ActingState> {
  const owner = await requireOwner();
  const parsed = appointmentSchema.safeParse(formToObject(form));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
    return { error: "Check the highlighted fields.", fieldErrors };
  }
  const supabase = await supabaseServer();
  const { error } = await supabase.from("acting_approver_delegations").insert({ ...appointmentRow(parsed.data), created_by: owner.userId });
  if (error) return { error: error.message };
  refresh();
  return { ok: "Saved. They see the final approvals on the Review page from the first day." };
}

/** Ends an appointment now (or cancels one not started yet). */
export async function endActingAction(id: string): Promise<ActingState> {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("acting_approver_delegations")
    .update({ ended_at: new Date().toISOString(), ended_by: owner.userId })
    .eq("id", id)
    .is("ended_at", null);
  if (error) return { error: error.message };
  refresh();
  return { ok: "Ended." };
}
