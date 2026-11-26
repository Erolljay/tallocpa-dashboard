"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { contentHash } from "@/lib/funnel/public";
import { supabaseServer } from "@/lib/supabase/server";

export type AcceptState = { error?: string; ok?: boolean };

/**
 * Phase 2, step 4: the prospect accepts. The hash is of the proposal exactly as
 * stored now, so the record shows what was accepted.
 */
export async function acceptProposalAction(token: string, _: AcceptState, form: FormData): Promise<AcceptState> {
  const name = String(form.get("name") ?? "").trim().slice(0, 200);
  const position = String(form.get("position") ?? "").trim().slice(0, 200);
  if (!name) return { error: "Type your full name to accept." };
  if (form.get("agree") !== "on") return { error: "Tick the box to confirm you agree to the terms." };
  const supabase = await supabaseServer();
  const { data: p } = await supabase.rpc("proposal_by_token", { p_token: token });
  if (!p) return { error: "This proposal link is not valid." };
  const hash = contentHash({ firm: p.brand.legal_name, client: p.lead.business_name, quote: p.quote, terms: p.terms, validUntil: p.valid_until });
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || null;
  const { error } = await supabase.rpc("accept_proposal", { p_token: token, p_name: name, p_position: position || null, p_hash: hash, p_ip: ip, p_user_agent: h.get("user-agent") });
  if (error) return { error: error.message };
  revalidatePath(`/proposal/${token}`);
  return { ok: true };
}
