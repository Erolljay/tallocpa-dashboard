import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { ContactAccess } from "@/lib/contacts/access";
import { supabaseServer } from "@/lib/supabase/server";

export type StaffRole = "owner" | "reviewer" | "staff";

export interface Identity {
  userId: string;
  email: string | null;
  staff: { fullName: string; role: StaffRole; brandId: string } | null;
  /**
   * For a client contact: each business they are linked to and what they may do there.
   * `accessEndsOn` (YYYY-MM-DD) is set when the firm no longer handles the business: the
   * contact has view-only access until that day, then the business drops off.
   */
  clients: { clientId: string; fullName: string; clientName: string; access: ContactAccess; accessEndsOn: string | null }[];
}

interface IdentityRow {
  user_id: string;
  staff: { full_name: string; role: StaffRole; brand_id: string } | null;
  clients: { client_id: string; full_name: string; client_name: string; access?: ContactAccess; access_ends_on?: string | null }[];
}

/**
 * The signed-in person, or a redirect to sign-in. Wrapped in React's cache() so one
 * request looks it up once: the staff layout (bell, Firm link, user menu) and the page
 * all ask, and each lookup is two calls to Supabase.
 */
export const getIdentity = cache(async (): Promise<Identity> => {
  const supabase = await supabaseServer();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) redirect("/login");
  const { data, error } = await supabase.rpc("current_identity");
  if (error) throw error;
  const row = data as IdentityRow;
  return {
    userId: row.user_id,
    email: (claims.claims.email as string | undefined) ?? null,
    staff: row.staff ? { fullName: row.staff.full_name, role: row.staff.role, brandId: row.staff.brand_id } : null,
    clients: row.clients.map((c) => ({ clientId: c.client_id, fullName: c.full_name, clientName: c.client_name, access: c.access ?? "full", accessEndsOn: c.access_ends_on ?? null })),
  };
});

/** Staff only; client users go to their portal. */
export async function requireStaff(): Promise<Identity & { staff: NonNullable<Identity["staff"]> }> {
  const id = await getIdentity();
  if (!id.staff) redirect(id.clients.length ? "/portal" : "/login?error=no_access");
  return id as Identity & { staff: NonNullable<Identity["staff"]> };
}

export async function requireOwner() {
  const id = await requireStaff();
  if (id.staff.role !== "owner") redirect("/app?error=owner_only");
  return id;
}

/** The Owner or a reviewer: Firm → Leads (reviewers see the leads assigned to them). */
export async function requireOwnerOrReviewer() {
  const id = await requireStaff();
  if (id.staff.role === "staff") redirect("/app?error=owner_only");
  return id;
}

/** Where a person lands after signing in. */
export function homeFor(id: Identity): string {
  if (id.staff) return "/app";
  if (id.clients.length) return "/portal";
  return "/login?error=no_access";
}
