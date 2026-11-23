"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { runFilingGeneration } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type GenerateState = { message?: string; error?: string };

export async function generateFilingsNow(): Promise<GenerateState> {
  await requireOwner();
  try {
    const r = await runFilingGeneration(supabaseAdmin());
    revalidatePath("/app/deadlines");
    revalidatePath("/app");
    const missing = r.missingRules.length ? ` ${r.missingRules.length} filing period(s) have no deadline rule — check the forms on those clients.` : "";
    return { message: `Created ${r.created} new filing(s); ${r.considered - r.created} already existed.${missing}` };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
