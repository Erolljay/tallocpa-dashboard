import "server-only";
/**
 * The quote a proposal starts from: the lead's profile priced on the brand's active
 * fee schedule today, and the annual and ad hoc jobs the Owner can add to it
 * (src/lib/fees/proposal.ts). Runs as the signed-in staff member (RLS applies).
 */
import { profileFromStored } from "@/lib/fees/params";
import { jobOptions, type JobOption } from "@/lib/fees/proposal";
import { buildQuote, type Quote } from "@/lib/fees/quote";
import { FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, toFeeItem, toSettings, type FeeItemRow, type FeeScheduleRow } from "@/lib/fees/schedule";
import type { ScheduleSettings } from "@/lib/fees/types";
import { manilaToday } from "@/lib/filings/run";
import type { supabaseServer } from "@/lib/supabase/server";

type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

export interface ProposalStart {
  quote: Quote;
  jobs: JobOption[];
  settings: ScheduleSettings;
  scheduleName: string;
}

export async function proposalStart(supabase: Supabase, brandId: string, rawProfile: unknown): Promise<ProposalStart | { error: string }> {
  const { data: schedule } = await supabase.from("fee_schedules").select(FEE_SCHEDULE_COLUMNS).eq("brand_id", brandId).eq("status", "active").maybeSingle();
  if (!schedule) return { error: "The Owner activates a fee schedule first (Settings → Fee schedule)." };
  const s = schedule as FeeScheduleRow;
  const [{ data: rows, error }, { data: brand }] = await Promise.all([
    supabase.from("fee_items").select(FEE_ITEM_COLUMNS).eq("schedule_id", s.id).order("sort_order").order("code"),
    supabase.from("brands").select("tax_on_fee").eq("id", brandId).single(),
  ]);
  if (error) return { error: `Reading the fee schedule: ${error.message}` };
  const items = ((rows ?? []) as FeeItemRow[]).map(toFeeItem);
  const profile = profileFromStored(rawProfile);
  const settings = toSettings(s);
  const quote = buildQuote({ profile, items, settings, taxOnFee: brand?.tax_on_fee === "vat_12" ? "vat_12" : "percentage_tax_3", quoteDate: manilaToday() });
  return { quote, jobs: jobOptions(items, profile), settings, scheduleName: s.name };
}

/** What the lead page's proposal form needs (src/app/app/leads/forms.tsx ProposalSetup). */
export async function proposalSetup(supabase: Supabase, brandId: string, rawProfile: unknown, services: string[] | null) {
  const start = await proposalStart(supabase, brandId, rawProfile);
  if ("error" in start) return start;
  if (start.quote.outdatedSchedule) return { error: "The active fee schedule is from before 26 Nov 2026. Start a new version, price it and activate it first." };
  return {
    jobs: start.jobs,
    monthlyRetainer: start.quote.monthlyRetainer,
    overCap: start.quote.overCap,
    monthlyCap: start.quote.monthlyCap,
    keepsBooks: start.quote.monthly.some((l) => l.component === "F") || (services ?? []).includes("bookkeeping"),
  };
}
