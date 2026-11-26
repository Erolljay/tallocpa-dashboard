import "server-only";
import { addDays } from "@/lib/deadlines/dates";
import { manilaToday } from "@/lib/filings/run";
import { FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, toFeeItem, type FeeItemRow, type FeeScheduleRow } from "@/lib/fees/schedule";
import type { TaxOnFee } from "@/lib/fees/types";
import { supabaseServer } from "@/lib/supabase/server";

export type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

export async function loadSchedules(supabase: Supabase, brandId: string): Promise<FeeScheduleRow[]> {
  const { data, error } = await supabase.from("fee_schedules").select(FEE_SCHEDULE_COLUMNS).eq("brand_id", brandId).order("effective_from", { ascending: false }).order("created_at", { ascending: false });
  if (error) throw new Error(`Reading fee schedules: ${error.message}`);
  return (data ?? []) as FeeScheduleRow[];
}

export async function loadSchedule(supabase: Supabase, id: string): Promise<FeeScheduleRow | null> {
  const { data } = await supabase.from("fee_schedules").select(FEE_SCHEDULE_COLUMNS).eq("id", id).maybeSingle();
  return (data as FeeScheduleRow | null) ?? null;
}

export async function loadItems(supabase: Supabase, scheduleId: string) {
  const { data, error } = await supabase.from("fee_items").select(FEE_ITEM_COLUMNS).eq("schedule_id", scheduleId).order("sort_order").order("code");
  if (error) throw new Error(`Reading fee items: ${error.message}`);
  return ((data ?? []) as FeeItemRow[]).map(toFeeItem);
}

export async function loadTaxOnFee(supabase: Supabase, brandId: string): Promise<TaxOnFee> {
  const { data } = await supabase.from("brands").select("tax_on_fee").eq("id", brandId).single();
  return data?.tax_on_fee === "vat_12" ? "vat_12" : "percentage_tax_3";
}

export const statusTone = { draft: "waiting", active: "done", retired: "neutral" } as const;
export const statusLabel = { draft: "Draft", active: "Active", retired: "Retired" } as const;

/** The first date a new version could take effect: the day after the active one, or tomorrow. */
export function nextEffectiveDate(activeFrom: string | null): string {
  const tomorrow = addDays(manilaToday(), 1);
  if (!activeFrom) return tomorrow;
  const after = addDays(activeFrom, 1);
  return after > tomorrow ? after : tomorrow;
}

const dateFmt = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "UTC" });
/** "1 Jan 2027" style, for dates that need the year. */
export const longDate = (iso: string) => dateFmt.format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
