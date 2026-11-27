import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ensureLogin } from "@/lib/people/accounts";
import type { ContactAccess } from "./access";

/**
 * Links a contact (found or created by email: one login per person) to a business at
 * the given level. Owner-only callers; the database's client_users policy enforces it.
 */
export async function grantClientAccess(
  asOwner: SupabaseClient,
  input: { email: string; full_name: string; position?: string; access: ContactAccess; client_id: string },
): Promise<{ userId: string } | { error: string }> {
  let userId: string;
  try {
    userId = await ensureLogin(asOwner, input.email);
  } catch (e) {
    return { error: `Could not create the login: ${(e as Error).message}` };
  }
  const { data: isStaff } = await asOwner.from("staff_profiles").select("user_id").eq("user_id", userId).maybeSingle();
  if (isStaff) return { error: "That email belongs to a staff member. Use a different email for the client." };
  const { error } = await asOwner.from("client_users").insert({
    user_id: userId,
    client_id: input.client_id,
    full_name: input.full_name,
    position: input.position ?? null,
    access: input.access,
  });
  if (error) return { error: error.code === "23505" ? "That person already has access to this business." : `Could not add: ${error.message}` };
  return { userId };
}
