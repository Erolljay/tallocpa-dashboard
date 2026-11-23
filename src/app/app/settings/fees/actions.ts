"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireOwner } from "@/lib/auth";
import { itemName, parsePrice, settingsSchema, unpricedItems } from "@/lib/fees/schedule";
import { templateRows } from "@/lib/fees/template";
import { supabaseServer } from "@/lib/supabase/server";
import { loadItems, loadSchedule, loadSchedules } from "./data";

export type FeeFormState = { ok?: string; error?: string; unpriced?: string[] };

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const newDraftSchema = z.object({
  name: z.string().trim().min(2, "Give the schedule a name.").max(120),
  effective_from: z.iso.date("Choose the date the schedule takes effect."),
});

function refresh(id?: string) {
  revalidatePath("/app/settings/fees");
  if (id) revalidatePath(`/app/settings/fees/${id}`);
}

/** "Create draft from template": every item of Appendix A, no prices. */
export async function createFromTemplateAction(_: FeeFormState, form: FormData): Promise<FeeFormState> {
  const owner = await requireOwner();
  const parsed = newDraftSchema.safeParse({ name: text(form.get("name")), effective_from: text(form.get("effective_from")) });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("create_fee_schedule_draft", {
    p_schedule: { brand_id: owner.staff.brandId, ...parsed.data },
    p_items: templateRows(),
  });
  if (error) return { error: error.message };
  refresh();
  redirect(`/app/settings/fees/${data as string}`);
}

/** "Start new version": a draft copy of the active schedule, taking effect later. */
export async function startNewVersionAction(_: FeeFormState, form: FormData): Promise<FeeFormState> {
  const owner = await requireOwner();
  const parsed = newDraftSchema.safeParse({ name: text(form.get("name")), effective_from: text(form.get("effective_from")) });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await supabaseServer();
  const active = (await loadSchedules(supabase, owner.staff.brandId)).find((s) => s.status === "active");
  if (!active) return { error: "There is no active schedule to copy. Create a draft from the template instead." };
  if (parsed.data.effective_from <= active.effective_from) {
    return { error: `The new version must take effect after the current one (${active.effective_from}).` };
  }
  const items = await loadItems(supabase, active.id);
  const { data, error } = await supabase.rpc("create_fee_schedule_draft", {
    p_schedule: {
      brand_id: owner.staff.brandId,
      ...parsed.data,
      prices_include_tax: active.prices_include_tax,
      quote_valid_days: active.quote_valid_days,
      minimum_monthly_retainer: active.minimum_monthly_retainer,
      late_surcharge_amount: active.late_surcharge_amount,
      late_surcharge_auto: active.late_surcharge_auto,
      notes: active.notes,
    },
    p_items: items.map((i) => ({
      code: i.code,
      component: i.component,
      label: i.label,
      band_label: i.band,
      billing: i.billing,
      price: i.price,
      is_custom_quote: i.isCustomQuote,
      unit_label: i.unit,
      conditions: i.conditions,
      sort_order: i.sortOrder,
    })),
  });
  if (error) return { error: error.message };
  refresh();
  redirect(`/app/settings/fees/${data as string}`);
}

export async function saveSettingsAction(scheduleId: string, _: FeeFormState, form: FormData): Promise<FeeFormState> {
  await requireOwner();
  const parsed = settingsSchema.safeParse({
    name: text(form.get("name")),
    effective_from: text(form.get("effective_from")),
    prices_include_tax: form.get("prices_include_tax") === "1",
    quote_valid_days: text(form.get("quote_valid_days")),
    minimum_monthly_retainer: text(form.get("minimum_monthly_retainer")),
    late_surcharge_amount: text(form.get("late_surcharge_amount")),
    late_surcharge_auto: form.get("late_surcharge_auto") === "1",
    notes: text(form.get("notes")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const supabase = await supabaseServer();
  const { error } = await supabase.from("fee_schedules").update(parsed.data).eq("id", scheduleId);
  if (error) return { error: error.message };
  refresh(scheduleId);
  return { ok: "Settings saved." };
}

/** Saves every price that changed. Fields are named price:<item id>. */
export async function savePricesAction(scheduleId: string, _: FeeFormState, form: FormData): Promise<FeeFormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const items = await loadItems(supabase, scheduleId);
  const changes: { id: string; price: number | null }[] = [];
  const problems: string[] = [];
  for (const i of items) {
    const raw = form.get(`price:${i.id}`);
    if (typeof raw !== "string" || i.isCustomQuote) continue;
    const parsed = parsePrice(raw, i.billing === "multiplier" ? "factor" : "amount");
    if ("error" in parsed) {
      problems.push(`${itemName(i)}: ${parsed.error}`);
      continue;
    }
    if (parsed.value !== i.price) changes.push({ id: i.id, price: parsed.value });
  }
  if (problems.length) return { error: `Nothing saved. ${problems.join(" ")}` };
  for (const c of changes) {
    const { error } = await supabase.from("fee_items").update({ price: c.price }).eq("id", c.id).eq("schedule_id", scheduleId);
    if (error) {
      refresh(scheduleId);
      return { error: error.message };
    }
  }
  refresh(scheduleId);
  return { ok: changes.length ? `${changes.length} price${changes.length === 1 ? "" : "s"} saved.` : "No changes to save." };
}

export async function activateAction(scheduleId: string): Promise<FeeFormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const items = await loadItems(supabase, scheduleId);
  const missing = unpricedItems(items);
  if (missing.length) return { error: "Set a price for every item first. Enter 0 for anything included at no charge.", unpriced: missing.map(itemName) };
  const { error } = await supabase.from("fee_schedules").update({ status: "active" }).eq("id", scheduleId);
  if (error) return { error: error.message };
  refresh(scheduleId);
  return { ok: "Activated. Quotes now use this schedule; the previous one is retired." };
}

export async function deleteDraftAction(scheduleId: string): Promise<FeeFormState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const schedule = await loadSchedule(supabase, scheduleId);
  if (!schedule || schedule.status !== "draft") return { error: "Only a draft can be deleted." };
  const { error } = await supabase.from("fee_schedules").delete().eq("id", scheduleId);
  if (error) return { error: error.message };
  refresh();
  redirect("/app/settings/fees");
}

