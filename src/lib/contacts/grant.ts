import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ensureLogin } from "@/lib/people/accounts";
import type { ContactAccess } from "./access";

export interface GrantInput {
  email: string;
  full_name: string;
  mobile?: string;
  position?: string;
  access: ContactAccess;
  client_id: string;
}

/** The login for a contact's email (found or created: one login per person), refusing staff emails. */
export async function contactLogin(asOwner: SupabaseClient, email: string): Promise<{ userId: string } | { error: string }> {
  let userId: string;
  try {
    userId = await ensureLogin(asOwner, email);
  } catch (e) {
    return { error: `Could not create the login: ${(e as Error).message}` };
  }
  const { data: isStaff } = await asOwner.from("staff_profiles").select("user_id").eq("user_id", userId).maybeSingle();
  if (isStaff) return { error: "That email belongs to a staff member. Use a different email for the client." };
  return { userId };
}

/**
 * Links a login to a business at the given level. A contact already linked elsewhere
 * keeps one mobile number: a new one given here is saved on all their businesses, and
 * none given keeps the one on file.
 */
export async function linkContact(asOwner: SupabaseClient, userId: string, input: Omit<GrantInput, "email">): Promise<{ userId: string } | { error: string }> {
  const { data: existing } = await asOwner.from("client_users").select("mobile").eq("user_id", userId).not("mobile", "is", null).limit(1).maybeSingle();
  const mobile = input.mobile ?? existing?.mobile ?? null;
  const { error } = await asOwner.from("client_users").insert({
    user_id: userId,
    client_id: input.client_id,
    full_name: input.full_name,
    mobile,
    position: input.position ?? null,
    access: input.access,
  });
  if (error) return { error: error.code === "23505" ? "That person already has access to this business." : `Could not add: ${error.message}` };
  if (input.mobile) await asOwner.from("client_users").update({ mobile: input.mobile }).eq("user_id", userId);
  return { userId };
}

/**
 * Links a contact (found or created by email) to a business at the given level.
 * Owner-only callers; the database's client_users policy enforces it.
 */
export async function grantClientAccess(asOwner: SupabaseClient, input: GrantInput): Promise<{ userId: string } | { error: string }> {
  const login = await contactLogin(asOwner, input.email);
  if ("error" in login) return login;
  return linkContact(asOwner, login.userId, input);
}
