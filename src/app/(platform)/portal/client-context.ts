import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIdentity } from "@/lib/auth";
import type { ContactAccess } from "@/lib/contacts/access";
import { supabaseServer } from "@/lib/supabase/server";
import { ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE } from "./business/constants";

export interface PortalClient {
  id: string;
  name: string;
  submission_cutoff_day: number;
  payment_mode: string;
  /** Telegram uploads switched on for this client by staff (opt-in). */
  telegram_enabled: boolean;
  /** What this contact may do for this business. */
  access: ContactAccess;
}

/**
 * The signed-in contact and the businesses they are linked to. Staff go to /app.
 *
 * `all` is every linked business; `active` the one chosen in the header's business
 * switcher (remembered in a cookie), or null for "All businesses". `clients` is what a
 * page shows: the active business alone, or all of them. One request looks it up once.
 */
export const portalContext = cache(async () => {
  const id = await getIdentity();
  if (id.staff) redirect("/app");
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("clients")
    .select("id, name, submission_cutoff_day, payment_mode, telegram_enabled")
    .in("id", id.clients.map((c) => c.clientId))
    .order("name");
  const accessOf = new Map(id.clients.map((c) => [c.clientId, c.access]));
  const all = ((data ?? []) as Omit<PortalClient, "access">[]).map((c) => ({ ...c, access: accessOf.get(c.id) ?? "full" })) as PortalClient[];
  const chosen = (await cookies()).get(PORTAL_BUSINESS_COOKIE)?.value;
  // One business: it is always the active one. Several: the remembered choice, else all.
  const active = all.length === 1 ? all[0] : chosen && chosen !== ALL_BUSINESSES ? (all.find((c) => c.id === chosen) ?? null) : null;
  return { id, supabase, all, active, clients: active ? [active] : all };
});

/** This contact's level for a business they are linked to (viewer when not linked, so nothing is offered). */
export function accessFor(clients: readonly PortalClient[], clientId: string | null | undefined): ContactAccess {
  return clients.find((c) => c.id === clientId)?.access ?? "viewer";
}
