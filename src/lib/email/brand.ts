import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { DEFAULT_BRAND, type EmailBrand } from "./layout";

/**
 * The firm's footer details for emails (public.brands), cached for a few minutes per
 * server instance. Never throws: a missing brand, a missing secret key or a database
 * error gives the "Tallo CPA" defaults (and is not cached, so the next email retries).
 */
const TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { at: number; brand: EmailBrand }>();

interface BrandRow {
  display_name: string | null;
  legal_name: string | null;
  business_address: string | null;
  registered_address: string | null;
  phone: string | null;
  reply_to_email: string | null;
  website: string | null;
}

export function brandFromRow(r: BrandRow | null | undefined): EmailBrand {
  if (!r) return { ...DEFAULT_BRAND };
  const t = (v: string | null | undefined) => (v && v.trim() ? v.trim() : null);
  return {
    displayName: t(r.display_name) ?? DEFAULT_BRAND.displayName,
    legalName: t(r.legal_name) ?? t(r.display_name) ?? DEFAULT_BRAND.legalName,
    tagline: DEFAULT_BRAND.tagline,
    businessAddress: t(r.business_address) ?? t(r.registered_address),
    phone: t(r.phone),
    replyTo: t(r.reply_to_email),
    website: t(r.website),
  };
}

/** The brand by id, or the firm's first brand when no id is given. */
export async function loadEmailBrand(brandId?: string | null, admin?: SupabaseClient): Promise<EmailBrand> {
  const key = brandId ?? "*";
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.brand;
  try {
    const db = admin ?? supabaseAdmin();
    let q = db.from("brands").select("display_name, legal_name, business_address, registered_address, phone, reply_to_email, website");
    q = brandId ? q.eq("id", brandId) : q.order("created_at", { ascending: true });
    const { data, error } = await q.limit(1).maybeSingle();
    if (error || !data) return { ...DEFAULT_BRAND };
    const brand = brandFromRow(data as BrandRow);
    cache.set(key, { at: Date.now(), brand });
    return brand;
  } catch {
    return { ...DEFAULT_BRAND };
  }
}

/** For tests. */
export function clearEmailBrandCache() {
  cache.clear();
}

/** The app's public address from the environment (NEXT_PUBLIC_SITE_URL, else APP_URL), without a trailing slash. */
export function siteOrigin(): string | null {
  const v = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL;
  return v ? v.trim().replace(/\/+$/, "") || null : null;
}

/**
 * The current request's address (forwarded host and protocol), or null outside a request.
 * Call it before `after`: Server Components cannot read headers inside it.
 */
export async function requestOrigin(): Promise<string | null> {
  try {
    const h = await headers();
    const host = (h.get("x-forwarded-host") ?? h.get("host"))?.split(",")[0]?.trim();
    if (!host) return null;
    const local = /^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host);
    const proto = h.get("x-forwarded-proto")?.split(",")[0]?.trim() || (local ? "http" : "https");
    return `${proto}://${host}`;
  } catch {
    return null;
  }
}
