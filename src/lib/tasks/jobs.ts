import "server-only";
import type { supabaseServer } from "@/lib/supabase/server";
import type { Job } from "./labels";

/**
 * The jobs a task can bill: the active fee schedule's ad hoc jobs (registration, permits,
 * updates …) and annual jobs, with their prices (null when quoted per job).
 */
export async function loadJobs(supabase: Awaited<ReturnType<typeof supabaseServer>>): Promise<Job[]> {
  const { data } = await supabase
    .from("fee_schedules")
    .select("fee_items(code, component, label, band_label, price, billing, sort_order)")
    .eq("status", "active")
    .limit(1)
    .maybeSingle();
  const items = ((data?.fee_items ?? []) as { code: string; component: string; label: string; band_label: string | null; price: string | null; billing: string; sort_order: number }[])
    .filter((i) => (i.component === "I" || i.component === "H") && (i.billing === "one_time" || i.billing === "annual"))
    .sort((a, b) => a.sort_order - b.sort_order);
  return items.map((i) => ({ code: i.code, label: i.band_label ? `${i.label} (${i.band_label})` : i.label, price: i.price == null ? null : Number(i.price) }));
}
