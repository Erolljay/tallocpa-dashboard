import "server-only";
/**
 * Server side of the public funnel pages. The brand's active fee schedule is read
 * with the secret key, because the public cannot read it, and only after
 * public.funnel_open has let the visitor in.
 */
import { createHash } from "node:crypto";
import { profileFromQuery, type QuerySource } from "@/lib/fees/params";
import { buildQuote, type Quote } from "@/lib/fees/quote";
import { FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, toFeeItem, toSettings, type FeeItemRow, type FeeScheduleRow } from "@/lib/fees/schedule";
import type { ClientProfile } from "@/lib/fees/types";
import { manilaToday } from "@/lib/filings/run";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { canonicalContent, type ProposalContent } from "./terms";

/** The brand the public pages are for. One brand today. */
export const FUNNEL_BRAND = "TC";

export async function funnelOpen(): Promise<boolean> {
  const supabase = await supabaseServer();
  const { data } = await supabase.rpc("funnel_open", { p_brand_code: FUNNEL_BRAND });
  return data === true;
}

/** Whether the public itself can see the pages (false: only signed-in staff are trying them). */
export async function funnelLive(): Promise<boolean> {
  const { data } = await supabaseAdmin().from("brands").select("funnel_open").eq("code", FUNNEL_BRAND).maybeSingle();
  return Boolean(data?.funnel_open);
}

export async function brandSchedule(brandCode = FUNNEL_BRAND) {
  const admin = supabaseAdmin();
  const { data: brand } = await admin.from("brands").select("id, display_name, legal_name, tax_on_fee").eq("code", brandCode).single();
  if (!brand) return null;
  const { data: schedule } = await admin.from("fee_schedules").select(FEE_SCHEDULE_COLUMNS).eq("brand_id", brand.id).eq("status", "active").order("effective_from", { ascending: false }).limit(1).maybeSingle();
  if (!schedule) return { brand, schedule: null, items: [] };
  const { data: items } = await admin.from("fee_items").select(FEE_ITEM_COLUMNS).eq("schedule_id", (schedule as FeeScheduleRow).id).order("sort_order").order("code");
  return { brand, schedule: schedule as FeeScheduleRow, items: ((items ?? []) as FeeItemRow[]).map(toFeeItem) };
}

/** The instant quote for a profile from the website form. */
export async function instantQuote(q: QuerySource): Promise<{ profile: ClientProfile; quote: Quote | null }> {
  const s = await brandSchedule();
  const { profile } = profileFromQuery(q, s?.items ?? []);
  if (!s?.schedule) return { profile, quote: null };
  const taxOnFee = s.brand.tax_on_fee === "vat_12" ? "vat_12" : "percentage_tax_3";
  return { profile, quote: buildQuote({ profile, items: s.items, settings: toSettings(s.schedule), taxOnFee, quoteDate: manilaToday() }) };
}

export const contentHash = (p: ProposalContent) => createHash("sha256").update(canonicalContent(p)).digest("hex");
