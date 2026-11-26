import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { FUNNEL_BRAND, funnelLive } from "@/lib/funnel/public";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { BRAND_NAME } from "./config";

/**
 * What the public website shows about the firm, read from public.brands (code 'TC').
 * Every contact detail and credential comes from the Owner's brand settings: the
 * site prints what is set and leaves out what is not. Nothing here is hardcoded,
 * so when the database cannot be reached the site still renders, with the name only.
 */
export interface SiteBrand {
  displayName: string;
  legalName: string | null;
  businessAddress: string | null;
  registeredAddress: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  facebookUrl: string | null;
  cpaLicenseNo: string | null;
  boaFirmAccreditationNo: string | null;
  boaIndividualAccreditationNo: string | null;
  birTaxAgentAccreditationNo: string | null;
  /** Whether the quote funnel (/start) is open to the public. */
  funnelLive: boolean;
}

export const FALLBACK_BRAND: SiteBrand = {
  displayName: BRAND_NAME,
  legalName: null,
  businessAddress: null,
  registeredAddress: null,
  phone: null,
  email: null,
  website: null,
  facebookUrl: null,
  cpaLicenseNo: null,
  boaFirmAccreditationNo: null,
  boaIndividualAccreditationNo: null,
  birTaxAgentAccreditationNo: null,
  funnelLive: false,
};

const COLUMNS =
  "display_name, legal_name, business_address, registered_address, phone, reply_to_email, website, facebook_url, cpa_license_no, boa_firm_accreditation_no, boa_individual_accreditation_no, bir_tax_agent_accreditation_no";

const clean = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

/** The brand for the website. Cached for a few minutes; the funnel switch shows up within that window. */
export async function getSiteBrand(): Promise<SiteBrand> {
  "use cache";
  cacheLife("minutes");
  cacheTag("site-brand");
  try {
    const [{ data }, live] = await Promise.all([
      supabaseAdmin().from("brands").select(COLUMNS).eq("code", FUNNEL_BRAND).maybeSingle(),
      funnelLive(),
    ]);
    if (!data) return FALLBACK_BRAND;
    const row = data as Record<string, unknown>;
    return {
      displayName: clean(row.display_name) ?? BRAND_NAME,
      legalName: clean(row.legal_name),
      businessAddress: clean(row.business_address),
      registeredAddress: clean(row.registered_address),
      phone: clean(row.phone),
      email: clean(row.reply_to_email),
      website: clean(row.website),
      facebookUrl: clean(row.facebook_url),
      cpaLicenseNo: clean(row.cpa_license_no),
      boaFirmAccreditationNo: clean(row.boa_firm_accreditation_no),
      boaIndividualAccreditationNo: clean(row.boa_individual_accreditation_no),
      birTaxAgentAccreditationNo: clean(row.bir_tax_agent_accreditation_no),
      funnelLive: live,
    };
  } catch {
    // No Supabase environment (local preview, a fresh deployment): render with defaults.
    return FALLBACK_BRAND;
  }
}

/**
 * Where "Get a quote" goes. The quote form at /start while the funnel is open to
 * the public; until then the contact page (or, on the contact page, an email),
 * so the site never links to a page that answers 404.
 */
export function quoteTarget(brand: SiteBrand, { onContactPage = false } = {}): { href: string; toFunnel: boolean } {
  if (brand.funnelLive) return { href: "/start", toFunnel: true };
  if (onContactPage && brand.email) return { href: `mailto:${brand.email}?subject=${encodeURIComponent("Quote request")}`, toFunnel: false };
  return { href: "/contact#reach-us", toFunnel: false };
}

/** The firm's phone numbers as tel: links ("0917 123 4567 / 0938 777 7795" holds two). */
export function phoneLinks(phone: string | null): { label: string; href: string }[] {
  if (!phone) return [];
  return phone
    .split(/\s*\/\s*|\s*;\s*/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((label) => {
      const digits = label.replace(/[^\d+]/g, "");
      const intl = digits.startsWith("0") ? `+63${digits.slice(1)}` : digits;
      return { label, href: `tel:${intl}` };
    });
}
