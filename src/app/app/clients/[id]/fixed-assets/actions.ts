"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

export type AssetState = { ok?: string; error?: string };

const int = (v: FormDataEntryValue | null) => (typeof v === "string" && /^\d{1,4}$/.test(v.trim()) ? Number(v.trim()) : null);
const refresh = (clientId: string) => {
  revalidatePath(`/app/clients/${clientId}/fixed-assets`);
  revalidatePath(`/app/clients/${clientId}/workpapers`);
};

/** Sets up an asset's depreciation: its useful life for that item (decision 13) and its tax life (decision 17). */
export async function setupAssetAction(clientId: string, assetId: string, _: AssetState, form: FormData): Promise<AssetState> {
  const life = int(form.get("life_months"));
  if (!life) return { error: "Give the useful life in months." };
  const tax = int(form.get("tax_life_months"));
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("setup_fixed_asset", {
    p_asset: assetId, p_description: String(form.get("description") ?? ""), p_life_months: life, p_tax_life_months: tax, p_accum_account: null,
  });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Depreciation set up." };
}

/** An asset bought before the books start, brought in with the opening balances. */
export async function addOpeningAssetAction(clientId: string, _: AssetState, form: FormData): Promise<AssetState> {
  const life = int(form.get("life_months"));
  const cost = Number(String(form.get("cost") ?? "").replace(/[,₱\s]/g, ""));
  if (!life) return { error: "Give the useful life in months." };
  if (!Number.isFinite(cost) || cost <= 1) return { error: "Give the cost." };
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("add_opening_asset", {
    p_client: clientId, p_description: String(form.get("description") ?? ""), p_asset_account: String(form.get("asset_account") ?? ""),
    p_acquired_on: String(form.get("acquired_on") ?? ""), p_cost: cost, p_life_months: life, p_tax_life_months: int(form.get("tax_life_months")), p_accum_account: null,
  });
  if (error) return { error: error.message };
  refresh(clientId);
  return { ok: "Opening asset added." };
}

/** Posts a month's depreciation from the register (Dr Depreciation Expense / Cr Accumulated Depreciation). */
export async function runDepreciationAction(clientId: string, month: string): Promise<AssetState> {
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("run_depreciation", { p_client: clientId, p_month: month });
  if (error) return { error: error.message };
  refresh(clientId);
  revalidatePath(`/app/clients/${clientId}/books`);
  return { ok: "Depreciation posted to the books." };
}
