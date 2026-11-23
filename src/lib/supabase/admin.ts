import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/env";

/**
 * Supabase client with the secret key. Bypasses row-level security, so only use it
 * after checking the caller (Owner-only actions) or in the scheduled job.
 */
export function supabaseAdmin() {
  const { url } = supabaseEnv();
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new Error("SUPABASE_SECRET_KEY is not set. Add the Supabase secret key to the environment (see docs/SETUP.md).");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
