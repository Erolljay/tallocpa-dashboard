import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isContactAccess, type ContactAccess } from "./access";

export interface ContactBusiness {
  clientId: string;
  clientName: string;
  clientCode: string;
  clientStatus: string;
  position: string | null;
  access: ContactAccess;
  since: string;
}

export interface Contact {
  userId: string;
  fullName: string;
  email: string | null;
  mobile: string | null;
  lastSignInAt: string | null;
  businesses: ContactBusiness[];
}

interface Row {
  user_id: string;
  client_id: string;
  full_name: string;
  mobile: string | null;
  position: string | null;
  access: string;
  created_at: string;
  clients: { name: string; code: string; status: string } | null;
}

/**
 * Contacts as staff see them: one entry per person, with every business they are linked
 * to that this staff member may see (the Owner sees all). `userId` narrows to one person.
 */
export async function loadContacts(supabase: SupabaseClient, userId?: string): Promise<Contact[]> {
  let query = supabase
    .from("client_users")
    .select("user_id, client_id, full_name, mobile, position, access, created_at, clients(name, code, status)")
    .order("full_name")
    .limit(5000);
  if (userId) query = query.eq("user_id", userId);
  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as unknown as Row[];
  const ids = [...new Set(rows.map((r) => r.user_id))];
  const { data: emails } = ids.length ? await supabase.rpc("user_emails", { p_user_ids: ids }) : { data: [] };
  const emailOf = new Map(((emails ?? []) as { user_id: string; email: string; last_sign_in_at: string | null }[]).map((e) => [e.user_id, e]));

  const byUser = new Map<string, Contact>();
  for (const r of rows) {
    let c = byUser.get(r.user_id);
    if (!c) {
      const e = emailOf.get(r.user_id);
      c = { userId: r.user_id, fullName: r.full_name, email: e?.email ?? null, mobile: r.mobile, lastSignInAt: e?.last_sign_in_at ?? null, businesses: [] };
      byUser.set(r.user_id, c);
    }
    c.mobile ??= r.mobile;
    c.businesses.push({
      clientId: r.client_id,
      clientName: r.clients?.name ?? "Business",
      clientCode: r.clients?.code ?? "",
      clientStatus: r.clients?.status ?? "",
      position: r.position,
      access: isContactAccess(r.access) ? r.access : "full",
      since: r.created_at,
    });
  }
  for (const c of byUser.values()) c.businesses.sort((a, b) => a.clientName.localeCompare(b.clientName));
  return [...byUser.values()].sort((a, b) => a.fullName.localeCompare(b.fullName));
}

/** Whether a contact matches a search: name, email or one of their businesses. */
export function contactMatches(c: Contact, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  // Mobile numbers match on their digits, so "0917 123" finds "0917-123-4567".
  const digits = needle.replace(/\D/g, "");
  return (
    c.fullName.toLowerCase().includes(needle) ||
    (c.email ?? "").toLowerCase().includes(needle) ||
    (digits.length >= 3 && (c.mobile ?? "").replace(/\D/g, "").includes(digits)) ||
    c.businesses.some((b) => b.clientName.toLowerCase().includes(needle) || b.clientCode.toLowerCase().includes(needle))
  );
}
