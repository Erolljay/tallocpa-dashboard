"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, requireOwnerOrReviewer } from "@/lib/auth";
import { emailConfigured, sendBrandedEmail } from "@/lib/cycle/email";
import { addDays } from "@/lib/deadlines/dates";
import { auditIndependenceWarning, buildProposalQuote, parseSales, readJobs } from "@/lib/fees/proposal";
import { parsePrice } from "@/lib/fees/schedule";
import { manilaToday } from "@/lib/filings/run";
import { loadEmailBrand, requestOrigin, siteOrigin } from "@/lib/email/brand";
import { NOTE_MAX, proposalDate, proposalEmail } from "@/lib/funnel/proposal-email";
import { proposalStart } from "@/lib/funnel/proposal-quote";
import { supabaseServer } from "@/lib/supabase/server";

export type LeadState = { ok?: string; error?: string; link?: string };

const refresh = (id?: string) => {
  revalidatePath("/app/leads");
  if (id) revalidatePath(`/app/leads/${id}`);
};
const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const uuidOrNull = (v: string) => (/^[0-9a-f-]{36}$/i.test(v) ? v : null);

export async function setFunnelOpenAction(open: boolean): Promise<LeadState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("set_funnel_open", { p_open: open });
  if (error) return { error: error.message };
  refresh();
  return { ok: open ? "The funnel is open to the public." : "The funnel is closed; only staff can try it." };
}

/** The Owner assigns the reviewer who holds the discovery call. */
export async function assignReviewerAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("assign_lead_reviewer", { p_lead: leadId, p_reviewer: uuidOrNull(text(form, "reviewer")) });
  if (error) return { error: error.message };
  refresh(leadId);
  return { ok: "Saved." };
}

/** The assigned reviewer records the discovery call. The time is entered in Manila time. */
export async function recordCallAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  await requireOwnerOrReviewer();
  const heldAt = text(form, "held_at");
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(heldAt)) return { error: "Enter the date and time of the call." };
  const notes = text(form, "notes");
  if (!notes) return { error: "Write the notes of the call." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("record_discovery_call", { p_lead: leadId, p_held_at: `${heldAt}:00+08:00`, p_notes: notes });
  if (error) return { error: error.message };
  refresh(leadId);
  return { ok: "Discovery call recorded." };
}

/**
 * Funnel step 3: a proposal from the lead's profile, priced on today's active fee
 * schedule: the monthly retainer and catch-up, plus the annual and ad hoc jobs
 * ticked (and the audit, shown for information as a separate engagement). Above the
 * monthly cap the agreed retainer is entered. The Owner or the lead's reviewer.
 */
export async function sendProposalAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  const me = await requireOwnerOrReviewer();
  const supabase = await supabaseServer();
  const { data: lead } = await supabase.from("leads").select("id, profile, services").eq("id", leadId).maybeSingle();
  if (!lead) return { error: "Lead not found." };
  const start = await proposalStart(supabase, me.staff.brandId, lead.profile);
  if ("error" in start) return { error: start.error };
  const value = (k: string) => (typeof form.get(k) === "string" ? String(form.get(k)) : null);
  const sales = parseSales(value("annual_sales"));
  if ("error" in sales) return { error: sales.error };
  const jobs = readJobs(start.jobs, value, sales.value);
  if ("error" in jobs) return { error: jobs.error };
  const agreedRaw = parsePrice(text(form, "agreed_monthly"));
  if ("error" in agreedRaw) return { error: `Agreed monthly retainer: ${agreedRaw.error}` };
  const built = buildProposalQuote(start.quote, jobs.jobs, { monthly: start.quote.overCap ? agreedRaw.value : null, catchUpFactor: start.settings.catchUpFactor, annualSales: sales.value });
  if ("error" in built) return { error: built.error };
  const terms = text(form, "terms");
  if (!terms) return { error: "The proposal needs its terms of engagement." };
  const days = Math.min(Math.max(Number(form.get("valid_days") ?? 30) || 30, 1), 120);
  const today = manilaToday();
  const { data, error } = await supabase.rpc("create_proposal", {
    // first_year_total is no longer filled (26 Nov 2026): the proposal has no grand total.
    p_lead: leadId, p_quote: built.quote, p_terms: terms, p_monthly: built.quote.monthlyRetainer, p_first_year: 0, p_valid_until: addDays(today, days),
  });
  if (error) return { error: error.message };
  refresh(leadId);
  const keepsBooks = built.quote.monthly.some((l) => l.component === "F") || ((lead.services as string[] | null) ?? []).includes("bookkeeping");
  const warning = auditIndependenceWarning(built.quote.audit ? [built.quote.audit] : [], keepsBooks);
  return { ok: `Proposal ready. Email it to the prospect, or copy the link.${warning ? ` ${warning}` : ""}`, link: `/proposal/${(data as { token: string }).token}` };
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const EMAIL_NOT_SET_UP = "Email is not set up on this app (RESEND_API_KEY and EMAIL_FROM), so nothing was sent. Copy the link and send it yourself.";

/**
 * Emails the open proposal's link to the prospect through Resend, in the brand's
 * layout, then records to whom, when and by whom on the proposal. Test leads still
 * send, with "[Test]" in the subject. Every failure is reported with the link to copy.
 */
export async function emailProposalAction(proposalId: string, _: LeadState, form: FormData): Promise<LeadState> {
  const me = await requireOwnerOrReviewer();
  const supabase = await supabaseServer();
  const { data: p } = await supabase
    .from("proposals")
    .select("id, lead_id, token, status, quote, valid_until, leads(business_name, contact_name, brand_id, test, stage, reviewer_id)")
    .eq("id", proposalId)
    .maybeSingle();
  if (!p) return { error: "Proposal not found." };
  const link = `/proposal/${p.token}`;
  const lead = p.leads as unknown as { business_name: string; contact_name: string; brand_id: string; test: boolean; stage: string; reviewer_id: string | null };
  if (me.staff.role !== "owner" && lead.reviewer_id !== me.userId) return { error: "Only the Owner or the lead's reviewer can send proposals." };
  if (p.status === "withdrawn") return { error: "This proposal has been replaced; send the latest one." };
  if (p.status === "accepted") return { error: "This proposal has already been accepted." };
  if (lead.stage !== "lead" && lead.stage !== "prospect") return { error: "This lead is no longer open for a proposal.", link };
  if (String(p.valid_until) < manilaToday()) return { error: `This proposal expired on ${proposalDate(String(p.valid_until))}. Prepare a new one.`, link };
  const to = text(form, "to").toLowerCase();
  if (!EMAIL_RE.test(to) || to.length > 320) return { error: "Enter a valid email address.", link };
  const note = text(form, "note");
  if (note.length > NOTE_MAX) return { error: `Keep the note under ${NOTE_MAX} characters.`, link };
  if (!emailConfigured()) return { error: EMAIL_NOT_SET_UP, link };
  const origin = siteOrigin() ?? (await requestOrigin());
  if (!origin) return { error: "The app's public address is not known (NEXT_PUBLIC_SITE_URL), so nothing was sent. Copy the link and send it yourself.", link };

  const brand = await loadEmailBrand(lead.brand_id);
  const quote = p.quote as { monthlyRetainer: number; tax?: { note?: string } };
  const content = proposalEmail({
    brandName: brand.displayName,
    businessName: lead.business_name,
    contactName: lead.contact_name,
    monthlyRetainer: Number(quote.monthlyRetainer),
    taxNote: quote.tax?.note ?? null,
    validUntil: String(p.valid_until),
    url: `${origin}${link}`,
    note,
    senderName: me.staff.fullName,
    test: lead.test,
  });
  try {
    const sent = await sendBrandedEmail(to, content, { brand, footerNote: `you asked ${brand.displayName} for a proposal`, hideSettings: true });
    if (sent !== "sent") return { error: EMAIL_NOT_SET_UP, link };
  } catch (e) {
    return { error: `The email was not sent: ${e instanceof Error ? e.message : String(e)}. Try again, or copy the link and send it yourself.`, link };
  }
  const { error } = await supabase.rpc("record_proposal_email", { p_proposal: p.id, p_to: to });
  refresh(p.lead_id);
  if (error) return { error: `The email was sent to ${to}, but it could not be recorded: ${error.message}`, link };
  return { ok: `Sent to ${to}.`, link };
}

/** Lost needs its reason. */
export async function markLostAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  await requireOwnerOrReviewer();
  const reason = text(form, "reason");
  if (!reason) return { error: "Give the reason the lead was lost." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("mark_lead_lost", { p_lead: leadId, p_reason: reason });
  if (error) return { error: error.message };
  refresh(leadId);
  return { ok: "Marked lost." };
}

export async function reopenLeadAction(leadId: string): Promise<LeadState> {
  await requireOwnerOrReviewer();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("reopen_lead", { p_lead: leadId });
  if (error) return { error: error.message };
  refresh(leadId);
  return { ok: "Reopened." };
}

/** Funnel step 5: the client, in Onboarding, with its own preparer and reviewer. */
export async function convertLeadAction(leadId: string, _: LeadState, form: FormData): Promise<LeadState> {
  await requireOwner();
  const start = text(form, "start");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) return { error: "Choose the date the services start." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("convert_lead", {
    p_lead: leadId, p_start: start, p_preparer: uuidOrNull(text(form, "preparer")), p_reviewer: uuidOrNull(text(form, "reviewer")),
  });
  if (error) return { error: error.message };
  refresh(leadId);
  redirect(`/app/clients/${data as string}/onboarding`);
}

/** The lead's booking page link (decision 22): the reviewer's free times; the lead books the discovery call. */
export async function bookingLinkAction(leadId: string): Promise<LeadState> {
  await requireOwnerOrReviewer();
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("lead_booking_token", { p_lead: leadId });
  if (error) return { error: error.message };
  return { ok: "Send this link to the lead.", link: `/book/${data as string}` };
}
