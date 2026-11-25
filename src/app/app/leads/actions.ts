"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { addDays } from "@/lib/deadlines/dates";
import { buildQuote } from "@/lib/fees/quote";
import { toSettings } from "@/lib/fees/schedule";
import type { ClientProfile } from "@/lib/fees/types";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { loadItems, loadSchedules, loadTaxOnFee } from "../settings/fees/data";

export type LeadState = { ok?: string; error?: string; link?: string };

const refresh = (id?: string) => {
  revalidatePath("/app/leads");
  if (id) revalidatePath(`/app/leads/${id}`);
};

export async function setFunnelOpenAction(open: boolean): Promise<LeadState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_funnel_open", { p_open: open });
  if (error) return { error: error.message };
  refresh();
  return { ok: open ? "The funnel is open to the public." : "The funnel is closed; only staff can try it." };
}

/** Phase 2, step 3: a proposal from the lead's profile, priced on today's active fee schedule. */
export async function sendProposalAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const { data: lead } = await supabase.from("leads").select("id, profile").eq("id", leadId).maybeSingle();
  if (!lead) return { error: "Lead not found." };
  const schedule = (await loadSchedules(supabase, owner.staff.brandId)).find((s) => s.status === "active");
  if (!schedule) return { error: "Activate a fee schedule first (Settings → Fee schedule)." };
  const [items, taxOnFee] = await Promise.all([loadItems(supabase, schedule.id), loadTaxOnFee(supabase, owner.staff.brandId)]);
  const today = manilaToday();
  const quote = buildQuote({ profile: lead.profile as ClientProfile, items, settings: toSettings(schedule), taxOnFee, quoteDate: today });
  const terms = String(form.get("terms") ?? "").trim();
  if (!terms) return { error: "The proposal needs its terms of engagement." };
  const days = Math.min(Math.max(Number(form.get("valid_days") ?? 30) || 30, 1), 120);
  const { data, error } = await supabase.rpc("create_proposal", {
    p_lead: leadId, p_quote: quote, p_terms: terms, p_monthly: quote.monthlyRetainer, p_first_year: quote.firstYearTotal, p_valid_until: addDays(today, days),
  });
  if (error) return { error: error.message };
  refresh(leadId);
  return { ok: "Proposal ready. Send the link to the prospect.", link: `/proposal/${(data as { token: string }).token}` };
}

export async function setLeadStatusAction(leadId: string, status: "new" | "lost", _: LeadState, form: FormData): Promise<LeadState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_lead_status", { p_lead: leadId, p_status: status, p_reason: String(form.get("reason") ?? "") || null });
  if (error) return { error: error.message };
  refresh(leadId);
  return { ok: status === "lost" ? "Marked lost." : "Reopened." };
}

/** Phase 2, step 5: the client, in Onboarding. */
export async function convertLeadAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  await requireOwner();
  const start = String(form.get("start") ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) return { error: "Choose the date the services start." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("convert_lead", { p_lead: leadId, p_start: start });
  if (error) return { error: error.message };
  refresh(leadId);
  redirect(`/app/clients/${data as string}/onboarding`);
}
