import { NextResponse } from "next/server";
import { bellDataFor, notificationSession } from "@/lib/notifications/queries";

/**
 * The bell's poll: the signed-in person's unread count and latest notifications. The bell
 * calls it every minute and when the window regains focus, so the badge stays current
 * without reloading the page.
 */
export async function GET() {
  const session = await notificationSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  try {
    const data = await bellDataFor(session.supabase, session.userId);
    return NextResponse.json(data, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
