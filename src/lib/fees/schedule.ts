/**
 * Reading fee schedules from the database and checking Owner input.
 * The database enforces the same rules (migration 20261123000014_fee_schedule.sql);
 * these give the Owner a clear sentence before a save is attempted.
 */
import { z } from "zod";
import { BILLINGS, COMPONENT_LETTERS, COMPLEXITY_FLAGS, type Conditions, type FeeItem, type ScheduleSettings } from "./types";

export type ScheduleStatus = "draft" | "active" | "retired";

/** A fee_items row as selected from the database. */
export interface FeeItemRow {
  id: string;
  code: string;
  component: string;
  label: string;
  band_label: string | null;
  billing: string;
  price: string | number | null;
  is_custom_quote: boolean;
  unit_label: string | null;
  conditions: unknown;
  sort_order: number;
}

export const FEE_ITEM_COLUMNS = "id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, conditions, sort_order";

/** A fee_schedules row as selected from the database. */
export interface FeeScheduleRow {
  id: string;
  brand_id: string;
  name: string;
  effective_from: string;
  status: ScheduleStatus;
  prices_include_tax: boolean;
  quote_valid_days: number;
  minimum_monthly_retainer: string | number | null;
  late_surcharge_amount: string | number | null;
  late_surcharge_auto: boolean;
  notes: string | null;
  activated_at: string | null;
  retired_at: string | null;
  created_at: string;
}

export const FEE_SCHEDULE_COLUMNS =
  "id, brand_id, name, effective_from, status, prices_include_tax, quote_valid_days, minimum_monthly_retainer, late_surcharge_amount, late_surcharge_auto, notes, activated_at, retired_at, created_at";

const range = z.object({ min: z.number().int().min(0), max: z.number().int().min(0).nullable() });
export const conditionsSchema = z
  .object({
    taxpayer_types: z.array(z.enum(["individual", "opc", "partnership", "corporation", "non_stock"])).optional(),
    vat: z.boolean().optional(),
    ewt: z.enum(["rental", "tamp_regular", "any"]).optional(),
    employees: range.optional(),
    remits_contributions: z.boolean().optional(),
    documents: range.optional(),
    bookkeeping: z.enum(["light", "standard", "heavy", "any"]).optional(),
    complexity: z.enum(COMPLEXITY_FLAGS).optional(),
    per: z.enum(["employee", "branch"]).optional(),
    above: z.number().int().min(0).optional(),
    of: z.enum(["bookkeeping", "monthly_retainer"]).optional(),
  })
  .strict();

const num = (v: string | number | null): number | null => (v === null || v === "" ? null : Number(v));

export function toFeeItem(r: FeeItemRow): FeeItem & { id: string; sortOrder: number } {
  const component = z.enum(COMPONENT_LETTERS as [string, ...string[]]).parse(r.component) as FeeItem["component"];
  return {
    id: r.id,
    code: r.code,
    component,
    label: r.label,
    band: r.band_label,
    billing: z.enum(BILLINGS).parse(r.billing),
    isCustomQuote: r.is_custom_quote,
    unit: r.unit_label,
    conditions: conditionsSchema.parse(r.conditions ?? {}) as Conditions,
    price: num(r.price),
    sortOrder: r.sort_order,
  };
}

export function toSettings(s: FeeScheduleRow): ScheduleSettings {
  return {
    pricesIncludeTax: s.prices_include_tax,
    quoteValidDays: s.quote_valid_days,
    minimumMonthlyRetainer: num(s.minimum_monthly_retainer),
    lateSurchargeAmount: num(s.late_surcharge_amount),
    lateSurchargeAuto: s.late_surcharge_auto,
  };
}

/** Items that still need a price before the schedule can be activated. */
export function unpricedItems<T extends Pick<FeeItem, "price" | "isCustomQuote">>(items: readonly T[]): T[] {
  return items.filter((i) => i.price === null && !i.isCustomQuote);
}

/** "A.individual — Base (Individual)" style label for messages. */
export function itemName(i: Pick<FeeItem, "label" | "band">): string {
  return i.band ? `${i.label} (${i.band})` : i.label;
}

/**
 * Parses a price typed by the Owner: "1,500", "₱1500.50", "" (not set).
 * Returns null for empty, a number, or an error sentence.
 */
export function parsePrice(raw: string, kind: "amount" | "factor" = "amount"): { value: number | null } | { error: string } {
  const s = raw.replace(/[₱,\s]/g, "");
  if (s === "") return { value: null };
  if (!/^\d+(\.\d{1,2})?$/.test(s)) {
    return { error: kind === "factor" ? "Enter the factor as a number with up to 2 decimals." : "Enter the amount in pesos, with up to 2 decimals." };
  }
  const value = Number(s);
  if (value > 9_999_999_999) return { error: "That amount is too large." };
  if (kind === "factor" && value < 1) return { error: "A factor is 1 or more (1 = no extra charge)." };
  return { value };
}

const optionalAmount = z
  .string()
  .transform((s) => s.replace(/[₱,\s]/g, ""))
  .refine((s) => s === "" || /^\d+(\.\d{1,2})?$/.test(s), "Enter an amount in pesos, with up to 2 decimals, or leave it empty.")
  .transform((s) => (s === "" ? null : Number(s)));

export const settingsSchema = z.object({
  name: z.string().trim().min(2, "Give the schedule a name.").max(120),
  effective_from: z.iso.date("Choose the date the schedule takes effect."),
  prices_include_tax: z.boolean(),
  quote_valid_days: z.coerce.number().int("Enter whole days.").min(1, "At least 1 day.").max(365, "At most 365 days."),
  minimum_monthly_retainer: optionalAmount,
  late_surcharge_amount: optionalAmount,
  late_surcharge_auto: z.boolean(),
  notes: z.string().trim().max(2000).transform((s) => (s === "" ? null : s)),
});
export type SettingsInput = z.input<typeof settingsSchema>;
