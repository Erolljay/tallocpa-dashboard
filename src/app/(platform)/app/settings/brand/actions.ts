"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { BRAND_FILES, type BrandFileKind } from "@/lib/brand/files";
import { parseSection, SECTION_FIELDS, SECTIONS, type Section } from "@/lib/brand/profile";
import { supabaseServer } from "@/lib/supabase/server";

/** `values` echoes what was typed when saving fails, so the form keeps it. */
export type BrandSettingsState = { ok?: string; error?: string; values?: Record<string, string> };

const SAVED: Record<Section, string> = {
  identity: "Name saved.",
  bir: "BIR registration saved.",
  contact: "Contact details saved. New statements show them.",
  credentials: "Credentials saved.",
  signatory: "Signatory saved.",
  invoicing: "Invoicing saved.",
  tax: "Saved.",
};

function refresh() {
  revalidatePath("/app/settings/brand");
  revalidatePath("/app/settings");
  revalidatePath("/app/collections", "layout");
  revalidatePath("/portal/billing", "layout");
}

/** Saves one card of the brand settings. Changing the tax on our fee needs the Owner's explicit confirmation. */
export async function saveBrandSectionAction(section: Section, _: BrandSettingsState, form: FormData): Promise<BrandSettingsState> {
  const owner = await requireOwner();
  if (!Object.hasOwn(SECTIONS, section)) return { error: "Unknown section." };
  const typed = Object.fromEntries(SECTION_FIELDS[section].map((k) => [k, String(form.get(k) ?? "")]));
  const fail = (error: string): BrandSettingsState => ({ error, values: typed });
  const parsed = parseSection(section, typed);
  if ("error" in parsed) return fail(parsed.error);
  const supabase = await supabaseServer();

  let message = SAVED[section];
  if (section === "tax") {
    const { data: current } = await supabase.from("brands").select("tax_on_fee").eq("id", owner.staff.brandId).single();
    if (current && current.tax_on_fee !== parsed.data.tax_on_fee) {
      if (form.get("confirm_tax_switch") !== "yes") return fail("Tick the box to confirm the change of tax on our fee.");
      message =
        parsed.data.tax_on_fee === "vat_12"
          ? "Switched to 12% VAT. New statements and quotes use it; existing prices stay as they are."
          : "Switched to 3% percentage tax. New statements and quotes use it; existing prices stay as they are.";
    }
  }

  const { error } = await supabase.from("brands").update(parsed.data).eq("id", owner.staff.brandId);
  if (error) return fail(error.message);
  refresh();
  return { ok: message };
}

export type StartBrandUpload = { path: string; token: string } | { error: string };

/**
 * Step 1 of a COR or logo upload: checks the file and returns a one-time signed
 * link the browser sends it to directly (server actions are limited to 1 MB;
 * a scanned COR can be up to 5 MB).
 */
export async function startBrandUpload(kind: BrandFileKind, mimeType: string, size: number): Promise<StartBrandUpload> {
  const owner = await requireOwner();
  if (!Object.hasOwn(BRAND_FILES, kind)) return { error: "Unknown file." };
  const spec = BRAND_FILES[kind];
  const ext = Object.hasOwn(spec.types, mimeType) ? spec.types[mimeType] : undefined;
  if (!ext) return { error: spec.typeError };
  if (!Number.isFinite(size) || size <= 0 || size > spec.maxBytes) return { error: spec.sizeError };
  const supabase = await supabaseServer();
  const path = `${owner.staff.brandId}/${kind}/${Date.now()}.${ext}`;
  const { data, error } = await supabase.storage.from("brand-files").createSignedUploadUrl(path);
  if (error || !data) return { error: `Could not start the upload: ${error?.message ?? "no link"}` };
  return { path: data.path, token: data.token };
}

/** Step 3: once the file is in storage, point the brand at it and remove the old one. */
export async function finishBrandUpload(kind: BrandFileKind, path: string): Promise<BrandSettingsState> {
  const owner = await requireOwner();
  const spec = Object.hasOwn(BRAND_FILES, kind) ? BRAND_FILES[kind] : null;
  if (!spec || typeof path !== "string" || !path.startsWith(`${owner.staff.brandId}/${kind}/`) || path.includes("..")) return { error: "Unknown file." };
  const supabase = await supabaseServer();
  const files = supabase.storage.from("brand-files");
  const { data: there } = await files.exists(path);
  if (!there) return { error: "The file did not arrive. Try the upload again." };
  const { data: before } = await supabase.from("brands").select(spec.column).eq("id", owner.staff.brandId).single();
  const old = (before as Record<string, string | null> | null)?.[spec.column] ?? null;
  const { error } = await supabase.from("brands").update({ [spec.column]: path }).eq("id", owner.staff.brandId);
  if (error) return { error: error.message };
  // Only remove files this page stored (an older logo_path may point elsewhere).
  if (old && old !== path && old.startsWith(`${owner.staff.brandId}/${kind}/`)) await files.remove([old]);
  refresh();
  return { ok: kind === "cor" ? "COR uploaded." : "Logo updated." };
}
