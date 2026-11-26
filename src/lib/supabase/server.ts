import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "@/lib/env";
import { scheduleNotificationEmails } from "@/lib/notifications/dispatch";

/** Supabase client for Server Components, Server Actions and Route Handlers, acting as the signed-in user. */
export async function supabaseServer() {
  // Read cookies first: it marks the page as per-request before any config check runs.
  const store = await cookies();
  const { url, key } = supabaseEnv();
  // Anything this request writes may queue notification emails: send them once the response is done.
  await scheduleNotificationEmails();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // Called from a Server Component, where cookies are read-only. The proxy refreshes the session instead.
        }
      },
    },
  });
}
