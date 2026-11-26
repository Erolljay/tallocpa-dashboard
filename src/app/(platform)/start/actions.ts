"use server";

import { cookies } from "next/headers";
import type { InstantQuote } from "@/lib/fees/quote";
import { FUNNEL_BRAND, funnelOpen, instantQuote } from "@/lib/funnel/public";
import { ATTR_COOKIE, firstTouch, parseAttrCookie, sanitize, type Attribution } from "@/lib/marketing/attribution";
import { supabaseServer } from "@/lib/supabase/server";

export type StartState = { error?: string; quote?: InstantQuote | null; name?: string };
export type PreviewState = { error?: string; quote?: InstantQuote | null };

const SERVICES = ["tax_compliance", "bookkeeping", "business_registration"];

/** The website's quote request: works out the instant quote and records the lead (public.submit_lead). */
export async function requestQuoteAction(_: StartState, form: FormData): Promise<StartState> {
  const text = (k: string, max = 200) => String(form.get(k) ?? "").trim().slice(0, max);
  const lead = {
    business_name: text("business_name"),
    contact_name: text("contact_name"),
    email: text("email"),
    mobile: text("mobile", 40),
    taxpayer_type: text("taxpayer_type", 20),
    message: text("message", 2000),
    services: form.getAll("services").map(String).filter((s) => SERVICES.includes(s)),
  };
  if (!lead.business_name || !lead.contact_name) return { error: "Enter the business name and your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) return { error: "Enter a valid email address, so we can send the proposal." };
  if (lead.services.length === 0) return { error: "Choose at least one service." };

  const { profile, quote, view } = await instantQuote(quoteFields(form));

  // Where the lead came from: the first-touch cookie a campaign link set, else this page's utm_*, ref and referrer.
  const attribution = firstTouch(parseAttrCookie((await cookies()).get(ATTR_COOKIE)?.value), pageAttribution(form));

  const supabase = await supabaseServer();
  const { error } = await supabase.rpc("submit_lead", {
    p_brand_code: FUNNEL_BRAND,
    p_lead: { ...lead, profile, ...(attribution ? { attribution } : {}) },
    p_quote: quote,
  });
  if (error) return { error: error.message === "Not found" ? "Quote requests are not open yet." : "We could not record your request. Please try again." };
  return { quote: view, name: lead.contact_name };
}

/**
 * Step 1 of the form: the fee for the answers so far, before any contact details.
 * Nothing is recorded, so the visitor can change the answers and see the fee again
 * until it fits their budget. Gated like the page, since the schedule is read with the secret key.
 */
export async function previewQuoteAction(form: FormData): Promise<PreviewState> {
  if (!(await funnelOpen())) return { error: "Quote requests are not open yet." };
  const services = form.getAll("services").map(String).filter((s) => SERVICES.includes(s));
  if (services.length === 0) return { error: "Choose at least one service." };
  const { view } = await instantQuote(quoteFields(form));
  return { quote: view };
}

/** The same fields as the Owner's quote preview (src/lib/fees/params.ts). Every client is
 *  charged bookkeeping by documents a month, so there is no bookkeeping question. */
function quoteFields(form: FormData): Record<string, string | string[]> {
  const q: Record<string, string | string[]> = {};
  for (const k of ["taxpayer_type", "vat", "ewt", "employees", "contributions", "documents", "branches", "behind"]) q[k] = String(form.get(k) ?? "").trim().slice(0, 20);
  q.complexity = form.getAll("complexity").map(String);
  return q;
}

/** What the form's page knew (src/app/start/form.tsx sends it as JSON in "attribution"). */
function pageAttribution(form: FormData): Attribution | null {
  const raw = String(form.get("attribution") ?? "");
  if (!raw || raw.length > 2000) return null;
  try {
    return sanitize(JSON.parse(raw));
  } catch {
    return null;
  }
}
