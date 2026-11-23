import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * The login for an email: the existing account if there is one, otherwise a new one.
 * New accounts are created without a password and marked confirmed, so the person can
 * sign in straight away with Google or an emailed link. Owner-only callers.
 */
export async function ensureLogin(asOwner: SupabaseClient, email: string): Promise<string> {
  const { data: existing, error: lookupError } = await asOwner.rpc("owner_find_user", { p_email: email });
  if (lookupError) throw new Error(lookupError.message);
  if (existing) return existing as string;
  const { data, error } = await supabaseAdmin().auth.admin.createUser({ email, email_confirm: true });
  if (error || !data.user) throw new Error(error?.message ?? "Could not create the login.");
  return data.user.id;
}
