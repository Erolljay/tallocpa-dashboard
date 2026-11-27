import "server-only";
import { redirect } from "next/navigation";
import { getIdentity } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";

export interface PortalClient {
  id: string;
  name: string;
  submission_cutoff_day: number;
  payment_mode: string;
  /** Telegram uploads switched on for this client by staff (opt-in). */
  telegram_enabled: boolean;
}

/** The signed-in client user and the businesses they are linked to. Staff go to /app. */
export async function portalContext() {
  const id = await getIdentity();
  if (id.staff) redirect("/app");
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("clients")
    .select("id, name, submission_cutoff_day, payment_mode, telegram_enabled")
    .in("id", id.clients.map((c) => c.clientId))
    .order("name");
  return { id, supabase, clients: (data ?? []) as PortalClient[] };
}
