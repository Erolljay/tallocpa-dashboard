"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { googleCalendarEnv } from "@/lib/env";
import { revoke } from "@/lib/google/calendar";
import { openToken, parseKey } from "@/lib/google/crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type FormState = { error?: string; ok?: string };

/** Disconnects the signed-in staff member's own calendar, and tells Google to forget the token. */
export async function disconnectCalendarAction(): Promise<FormState> {
  const me = await requireStaff();
  const admin = supabaseAdmin();
  const env = googleCalendarEnv();
  if (env) {
    const { data } = await admin.rpc("calendar_tokens", { p_users: [me.userId] });
    const sealed = ((data ?? []) as { refresh_token: string }[])[0]?.refresh_token;
    if (sealed) {
      try {
        await revoke(openToken(sealed, parseKey(env.tokenKey)));
      } catch {
        // The token could not be read (key changed); removing the link is still right.
      }
    }
  }
  const { error } = await admin.rpc("calendar_link_remove", { p_user: me.userId });
  if (error) return { error: error.message };
  revalidatePath("/app/calendar");
  return { ok: "Disconnected." };
}
