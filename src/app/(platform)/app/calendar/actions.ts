"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { cancelReason } from "@/lib/calendar/cancel";
import { cancelClientMeeting } from "@/lib/calendar/cancel-server";
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
        await revoke(openToken(sealed, parseKey(env.tokenKey), me.userId));
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

/** Staff on the client cancel an upcoming client meeting, with an optional reason. */
export async function cancelMeetingAction(meetingId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireStaff();
  const r = await cancelClientMeeting(meetingId, cancelReason(form.get("reason")), "staff");
  if ("error" in r) return r;
  revalidatePath("/app/calendar");
  revalidatePath("/app/clients", "layout");
  return r;
}
