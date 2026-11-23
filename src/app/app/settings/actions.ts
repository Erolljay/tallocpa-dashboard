"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { dayBefore, holidaySchema, ruleEditSchema } from "@/lib/deadlines/settings-schema";
import { formToObject } from "@/lib/clients/schema";
import { refreshDueDates } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";

export type SettingsState = { ok?: string; error?: string; fieldErrors?: Record<string, string> };

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

/** Moves due dates of unfiled filings to match the changed rules and holidays. */
async function refreshAfterChange(saved: string): Promise<SettingsState> {
  revalidatePath("/app/settings");
  revalidatePath("/app/deadlines");
  revalidatePath("/app");
  try {
    const r = await refreshDueDates(supabaseAdmin());
    return { ok: `${saved} ${r.moved === 0 ? "No open filing dates changed." : `${r.moved} open filing(s) moved to the new due date.`}` };
  } catch (e) {
    return { ok: `${saved} Open filings were not updated yet (${(e as Error).message}); the next nightly run uses the new rule for new filings.` };
  }
}

interface RuleRow {
  id: string;
  form: string;
  frequency: string;
  period_filter: string;
  calendar_year: boolean;
  channel: string | null;
  efps_group: string | null;
  effective_from: string;
}

/**
 * Owner changes a deadline rule. If the change applies from the rule's own start
 * date, the rule is corrected in place. If it applies from a later date (a new BIR
 * issuance), the old rule ends the day before and a new one takes over, so periods
 * already past keep the deadline that applied to them.
 */
export async function updateRuleAction(ruleId: string, _: SettingsState, form: FormData): Promise<SettingsState> {
  const me = await requireOwner();
  const parsed = ruleEditSchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const v = parsed.data;
  const supabase = await supabaseServer();

  const { data: rule, error: readError } = await supabase.from("deadline_rules").select("id, form, frequency, period_filter, calendar_year, channel, efps_group, effective_from").eq("id", ruleId).single<RuleRow>();
  if (readError || !rule) return { error: `Rule not found: ${readError?.message ?? ruleId}` };

  let targets: RuleRow[] = [rule];
  if (v.allEfpsGroups && rule.channel === "efps") {
    const { data, error } = await supabase
      .from("deadline_rules")
      .select("id, form, frequency, period_filter, calendar_year, channel, efps_group, effective_from")
      .match({ form: rule.form, frequency: rule.frequency, channel: "efps" })
      .is("effective_to", null);
    if (error) return { error: error.message };
    targets = (data ?? []) as RuleRow[];
  }

  const verification = v.verified ? { verified_by: me.userId, verified_at: new Date().toISOString() } : { verified_by: null, verified_at: null };
  for (const t of targets) {
    if (v.appliesFrom <= t.effective_from) {
      // An original rule (not a later version) can reach back to earlier periods.
      const reachBack = v.appliesFrom < t.effective_from && !t.id.includes("@") ? { effective_from: v.appliesFrom } : {};
      const { error } = await supabase.from("deadline_rules").update({ due: v.due, source: v.source, ...reachBack, ...verification }).eq("id", t.id);
      if (error) return { error: `Could not save ${t.id}: ${error.message}` };
    } else {
      const { error: endError } = await supabase.from("deadline_rules").update({ effective_to: dayBefore(v.appliesFrom) }).eq("id", t.id);
      if (endError) return { error: `Could not end ${t.id}: ${endError.message}` };
      const { error } = await supabase.from("deadline_rules").insert({
        id: `${t.id.split("@")[0]}@${v.appliesFrom}`,
        form: t.form,
        frequency: t.frequency,
        period_filter: t.period_filter,
        calendar_year: t.calendar_year,
        channel: t.channel,
        efps_group: t.efps_group,
        due: v.due,
        effective_from: v.appliesFrom,
        source: v.source,
        ...verification,
      });
      if (error) return { error: `Could not add the new rule for ${t.form}: ${error.message}` };
    }
  }
  const what = targets.length > 1 ? `${rule.form} saved for all ${targets.length} eFPS groups.` : `${rule.form} saved.`;
  return refreshAfterChange(what);
}

export async function addHolidayAction(_: SettingsState, form: FormData): Promise<SettingsState> {
  await requireOwner();
  const parsed = holidaySchema.safeParse(formToObject(form));
  if (!parsed.success) return { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error.issues) };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("holidays").upsert(parsed.data, { onConflict: "date" });
  if (error) return { error: `Could not save the holiday: ${error.message}` };
  return refreshAfterChange(`${parsed.data.name} saved.`);
}

export async function removeHolidayAction(date: string): Promise<SettingsState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.from("holidays").delete().eq("date", date);
  if (error) return { error: `Could not remove the holiday: ${error.message}` };
  return refreshAfterChange("Holiday removed.");
}
