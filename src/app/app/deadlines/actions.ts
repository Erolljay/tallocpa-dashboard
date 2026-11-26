"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { runFilingGeneration } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type GenerateState = { message?: string; error?: string };

/**
 * Creates one client's returns for past periods, from the month chosen (e.g. to rehearse
 * a year on a client's actual data). The usual job only looks 60 days back. Existing
 * returns are left as they are. Owner only.
 */
export async function generatePastFilingsAction(clientId: string, _: GenerateState, form: FormData): Promise<GenerateState> {
  await requireOwner();
  const month = String(form.get("from_month") ?? "");
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return { error: "Choose the first month." };
  try {
    const r = await runFilingGeneration(supabaseAdmin(), undefined, { clientId, periodsFrom: `${month}-01` });
    revalidatePath(`/app/clients/${clientId}/returns`);
    revalidatePath("/app/deadlines");
    revalidatePath("/app");
    const missing = r.missingRules.length ? ` ${r.missingRules.length} period(s) have no deadline rule.` : "";
    return { message: `Created ${r.created} return(s) from ${month}; ${r.considered - r.created} already existed.${missing}` };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

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
