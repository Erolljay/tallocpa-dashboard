"use server";

import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export type MarketingState = { ok?: string; error?: string; code?: string };

const text = (form: FormData, key: string, max = 100) => String(form.get(key) ?? "").trim().slice(0, max);

/** The Owner makes a campaign link (public.create_marketing_link). */
export async function createLinkAction(_: MarketingState, form: FormData): Promise<MarketingState> {
  await requireOwner();
  const label = text(form, "label");
  const campaign = text(form, "campaign");
  if (!label) return { error: "Give the link a label, like “Tax season post, 3 Dec”." };
  if (!campaign) return { error: "Name the campaign, like “tax-season-2027”." };
  const page = text(form, "target", 200);
  const target = page === "other" ? text(form, "target_custom", 200) : page;
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("create_marketing_link", {
    p_label: label,
    p_platform: text(form, "platform", 20),
    p_campaign: campaign,
    p_content: text(form, "content") || null,
    p_target_path: target || "/",
    p_code: text(form, "code", 40) || null,
    p_utm_medium: text(form, "medium", 50) || "social",
  });
  if (error) return { error: error.message };
  revalidatePath("/app/firm/marketing");
  return { ok: "Link made. Copy it into your post.", code: (data as { code: string }).code };
}

/** The Owner retires a link; /go/<code> then goes to the home page. */
export async function archiveLinkAction(id: string): Promise<MarketingState> {
  await requireOwner();
  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("archive_marketing_link", { p_id: id });
  if (error) return { error: error.message };
  revalidatePath("/app/firm/marketing");
  return { ok: "Archived." };
}
