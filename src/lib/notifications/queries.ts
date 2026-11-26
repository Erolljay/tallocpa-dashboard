import "server-only";
import { cache } from "react";
import { supabaseServer } from "@/lib/supabase/server";
import { isNotificationKind, type NotificationKind } from "./kinds";

/** One row as the bell and the notifications page show it (RLS: the person's own rows only). */
export interface NotificationItem {
  id: number;
  kind: string;
  title: string;
  body: string | null;
  href: string | null;
  created_at: string;
  read_at: string | null;
}

/** What the bell needs; also the body of GET /api/notifications. */
export interface BellData {
  unread: number;
  latest: NotificationItem[];
}

export type NotificationFilter = "all" | "unread";

export const BELL_LIMIT = 10;
export const PAGE_SIZE = 30;

const COLUMNS = "id, kind, title, body, href, created_at, read_at";

type Supabase = Awaited<ReturnType<typeof supabaseServer>>;

/**
 * The signed-in user's Supabase client and id, or null when nobody is signed in. Unlike
 * getIdentity() it never redirects, so the route handler can answer 401.
 */
export async function notificationSession(): Promise<{ supabase: Supabase; userId: string } | null> {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  return typeof userId === "string" && userId ? { supabase, userId } : null;
}

/** Unread notifications for the bell's badge. */
export async function unreadCount(supabase: Supabase, userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("read_at", null);
  if (error) throw error;
  return count ?? 0;
}

/** The newest notifications, read or not, for the bell's popover. */
export async function latestNotifications(supabase: Supabase, userId: string, limit = BELL_LIMIT): Promise<NotificationItem[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select(COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as NotificationItem[];
}

async function loadBellData(supabase: Supabase, userId: string): Promise<BellData> {
  const [unread, latest] = await Promise.all([unreadCount(supabase, userId), latestNotifications(supabase, userId)]);
  return { unread, latest };
}

/** Unread count and the latest few. Cached per request: the layouts render more than one bell. */
export const bellData = cache(async (userId: string): Promise<BellData> => loadBellData(await supabaseServer(), userId));

/** Same, with a client already in hand (the route handler). */
export const bellDataFor = loadBellData;

/** One page of the notifications page, newest first. `page` starts at 1. */
export async function listNotifications(
  userId: string,
  { filter = "all", page = 1, pageSize = PAGE_SIZE }: { filter?: NotificationFilter; page?: number; pageSize?: number } = {},
): Promise<{ rows: NotificationItem[]; hasMore: boolean; page: number }> {
  const supabase = await supabaseServer();
  const p = Number.isInteger(page) && page > 0 ? page : 1;
  const from = (p - 1) * pageSize;
  let query = supabase
    .from("notifications")
    .select(COLUMNS)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    // One extra row tells whether there is a next page.
    .range(from, from + pageSize);
  if (filter === "unread") query = query.is("read_at", null);
  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as NotificationItem[];
  return { rows: rows.slice(0, pageSize), hasMore: rows.length > pageSize, page: p };
}

/** The kinds this person turned email off for (no row means on). */
export async function emailOffKinds(userId: string): Promise<Set<NotificationKind>> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("notification_preferences").select("kind, email").eq("user_id", userId);
  if (error) throw error;
  const off = new Set<NotificationKind>();
  for (const row of (data ?? []) as { kind: string; email: boolean }[]) {
    if (!row.email && isNotificationKind(row.kind)) off.add(row.kind);
  }
  return off;
}

/** Email on or off for each of the given kinds. */
export async function emailPreferences(userId: string, kinds: readonly NotificationKind[]): Promise<Record<NotificationKind, boolean>> {
  const off = await emailOffKinds(userId);
  return Object.fromEntries(kinds.map((k) => [k, !off.has(k)])) as Record<NotificationKind, boolean>;
}
