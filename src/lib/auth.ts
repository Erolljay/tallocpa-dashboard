import "server-only";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export type StaffRole = "owner" | "reviewer" | "staff";

export interface Identity {
  userId: string;
  email: string | null;
  staff: { fullName: string; role: StaffRole; brandId: string } | null;
  clients: { clientId: string; fullName: string; clientName: string }[];
}

interface IdentityRow {
  user_id: string;
  staff: { full_name: string; role: StaffRole; brand_id: string } | null;
  clients: { client_id: string; full_name: string; client_name: string }[];
}

/** The signed-in person, or a redirect to sign-in. */
export async function getIdentity(): Promise<Identity> {
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
    clients: row.clients.map((c) => ({ clientId: c.client_id, fullName: c.full_name, clientName: c.client_name })),
  };
}

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
