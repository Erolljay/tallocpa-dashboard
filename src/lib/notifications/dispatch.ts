import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { after } from "next/server";
import { emailConfigured, sendEmail } from "@/lib/cycle/email";
import { loadEmailBrand, requestOrigin, siteOrigin } from "@/lib/email/brand";
import { renderEmail, settingsUrlFor } from "@/lib/email/layout";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { notifyTelegram } from "@/lib/telegram/notify";
import { isNotificationKind, NOTIFICATION_KINDS } from "./kinds";

/** A row from public.claim_notification_emails (migration 20261213000001_notifications.sql). */
export interface ClaimedNotification {
  id: number;
  user_id: string;
  email: string | null;
  kind: string;
  title: string;
  body: string | null;
  href: string | null;
  client_id: string | null;
  brand_id: string | null;
  is_staff: boolean;
  created_at: string;
}

export interface DispatchResult {
  claimed: number;
  sent: number;
  failed: number;
  skipped: number;
  error?: string;
}

type Finish = "sent" | "failed" | "skipped";

async function finish(admin: SupabaseClient, id: number, status: Finish, error: string | null) {
  try {
    const { error: e } = await admin.rpc("finish_notification_email", { p_id: id, p_status: status, p_error: error });
    if (e) console.error(`Notification email ${id}: could not record ${status}: ${e.message}`);
  } catch (e) {
    console.error(`Notification email ${id}: could not record ${status}:`, e instanceof Error ? e.message : e);
  }
}

/**
 * Claims up to `limit` pending notification emails, renders each in the branded layout
 * (heading = title, the body, a button to the notification's page) and sends it through
 * Resend, recording sent, failed (re-queued until the fifth try) or skipped. One bad
 * email never stops the others, and this never throws.
 */
export async function dispatchNotificationEmails(admin: SupabaseClient, origin: string, limit = 25): Promise<DispatchResult> {
  const result: DispatchResult = { claimed: 0, sent: 0, failed: 0, skipped: 0 };
  let rows: ClaimedNotification[];
  try {
    const { data, error } = await admin.rpc("claim_notification_emails", { p_limit: limit });
    if (error) return { ...result, error: error.message };
    rows = (data ?? []) as ClaimedNotification[];
  } catch (e) {
    return { ...result, error: e instanceof Error ? e.message : String(e) };
  }
  result.claimed = rows.length;
  if (rows.length === 0) return result;

  const base = origin.replace(/\/+$/, "");
  const configured = emailConfigured();
  for (const n of rows) {
    // Clients who linked Telegram also get it there (opt-in per client).
    await notifyTelegram(admin, n, base);
    if (!configured) {
      await finish(admin, n.id, "skipped", "email not configured");
      result.skipped += 1;
      continue;
    }
    if (!n.email) {
      await finish(admin, n.id, "skipped", "no email address");
      result.skipped += 1;
      continue;
    }
    try {
      const info = isNotificationKind(n.kind) ? NOTIFICATION_KINDS[n.kind] : null;
      const brand = await loadEmailBrand(n.brand_id, admin);
      const { html, text } = renderEmail({
        brand,
        preheader: n.body?.split("\n").find((l) => l.trim()) ?? n.title,
        heading: n.title,
        bodyText: n.body ?? "",
        action: n.href ? { label: info?.action ?? `Open ${brand.displayName}`, url: `${base}${n.href}` } : null,
        footerNote: info ? `you get emails for “${info.label}”` : `you have an account with ${brand.displayName}`,
        settingsUrl: settingsUrlFor(base, n.is_staff ? "staff" : "client"),
      });
      const status = await sendEmail({ to: n.email, subject: n.title, html, text, replyTo: brand.replyTo });
      if (status === "sent") {
        await finish(admin, n.id, "sent", null);
        result.sent += 1;
      } else {
        await finish(admin, n.id, "skipped", "email not configured");
        result.skipped += 1;
      }
    } catch (e) {
      await finish(admin, n.id, "failed", e instanceof Error ? e.message : String(e));
      result.failed += 1;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// The cheap trigger: flush the queue after a response that may have written rows.
// ---------------------------------------------------------------------------

const MIN_INTERVAL_MS = 2000;
let inFlight: Promise<void> | null = null;
let again = false;
let lastStart = 0;

async function drain(origin: string) {
  do {
    again = false;
    const wait = lastStart + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastStart = Date.now();
    try {
      await dispatchNotificationEmails(supabaseAdmin(), origin);
    } catch (e) {
      console.error("Notification emails:", e instanceof Error ? e.message : e);
      return;
    }
  } while (again);
}

/**
 * Sends pending notification emails once the current response is done (Next `after`).
 * Called from supabaseServer() and the public actions that write with the secret key.
 * Per server instance: at most one dispatch at a time and one start every ~2 s; a call
 * while one runs makes it run once more, so no new row waits for the next trigger.
 * Swallows every error (no secret key, outside a request, the database); the cron
 * route /api/cron/notifications is the backstop.
 */
export async function scheduleNotificationEmails(): Promise<void> {
  try {
    if (!process.env.SUPABASE_SECRET_KEY) return;
    // Request data must be read before `after` (Server Components cannot read it inside).
    const origin = siteOrigin() ?? (await requestOrigin());
    if (!origin) return;
    after(() => {
      if (inFlight) {
        again = true;
        return inFlight;
      }
      inFlight = drain(origin)
        .catch(() => undefined)
        .finally(() => {
          inFlight = null;
        });
      return inFlight;
    });
  } catch {
    // Outside a request scope (scripts, tests, build): nothing to flush after.
  }
}
