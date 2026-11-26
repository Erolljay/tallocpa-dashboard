"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { BellData, NotificationItem } from "@/lib/notifications/queries";

/**
 * One copy of the bell's data per tab, shared by every bell on the page (the staff
 * sidebar renders one for the phone top bar and one for the desktop rail). It polls
 * GET /api/notifications every minute while the tab is visible, at once when the window
 * regains focus, and whenever a page announces a change (notifyNotificationsChanged).
 */

export type { BellData, NotificationItem };

const POLL_MS = 60_000;
const CHANGED_EVENT = "tallo:notifications-changed";

let state: BellData | null = null;
let seededFrom: BellData | null = null;
let stopped = false;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function set(next: BellData) {
  state = next;
  emit();
}

/** Re-reads the count and the latest rows from the server. */
export function refreshBell(): Promise<void> {
  if (stopped) return Promise.resolve();
  inflight ??= fetch("/api/notifications", { cache: "no-store", credentials: "same-origin", headers: { accept: "application/json" } })
    .then(async (res) => {
      // Signed out (or idle-signed-out in another tab): stop asking until the next page load.
      if (res.status === 401) {
        stopped = true;
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as BellData;
      if (typeof data?.unread === "number" && Array.isArray(data.latest)) set(data);
    })
    .catch(() => {
      // Offline or a deploy in progress: the next poll tries again.
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Marks rows read here at once, before the server confirms. Omit `ids` for all. */
export function markReadLocally(ids?: readonly number[]) {
  if (!state) return;
  const now = new Date().toISOString();
  const hit = (n: NotificationItem) => n.read_at == null && (ids == null || ids.includes(n.id));
  const hits = state.latest.filter(hit).length;
  set({
    unread: ids == null ? 0 : Math.max(0, state.unread - hits),
    latest: state.latest.map((n) => (hit(n) ? { ...n, read_at: now } : n)),
  });
}

/** Tells every bell in this tab that notifications changed (read on a page, say). */
export function notifyNotificationsChanged() {
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}

let timer: number | undefined;
const onFocus = () => void refreshBell();
const onVisible = () => {
  if (document.visibilityState === "visible") void refreshBell();
};
const onChanged = () => void refreshBell();

function start() {
  timer = window.setInterval(() => {
    if (document.visibilityState === "visible") void refreshBell();
  }, POLL_MS);
  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onVisible);
  window.addEventListener(CHANGED_EVENT, onChanged);
}

function stop() {
  window.clearInterval(timer);
  window.removeEventListener("focus", onFocus);
  document.removeEventListener("visibilitychange", onVisible);
  window.removeEventListener(CHANGED_EVENT, onChanged);
}

/**
 * The bell's data: the server-rendered `initial` until the store holds something newer.
 * A fresh server render of the layout (a new `initial`) replaces the store's copy.
 */
export function useBellData(initial: BellData): BellData {
  useEffect(() => {
    if (seededFrom !== initial) {
      seededFrom = initial;
      set(initial);
    }
  }, [initial]);
  return useSyncExternalStore(subscribe, () => state ?? initial, () => initial);
}
