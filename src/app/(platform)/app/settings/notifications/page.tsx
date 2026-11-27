import { Suspense } from "react";
import { NotificationSettingsView } from "@/components/application/notifications/notification-settings-view";
import { TelegramLinkButton, TelegramUnlinkButton } from "@/components/telegram/telegram-link";
import { Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { telegramEnv } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";

/** Personal, not firm settings: every staff member can open it (the rest of /app/settings is the Owner's). */
export default function NotificationSettingsPage() {
  return (
    <Suspense fallback={<><PageHeader title="Notification settings" /><Skeleton rows={8} /></>}>
      <Content />
    </Suspense>
  );
}

async function Content() {
  const id = await requireStaff();
  const supabase = await supabaseServer();
  const { data: links } = telegramEnv()
    ? await supabase.from("telegram_links").select("chat_id, username, clients(name)").eq("user_id", id.userId).eq("staff", true)
    : { data: null };
  return (
    <>
      <NotificationSettingsView audience="staff" userId={id.userId} role={id.staff.role} />
      {links && (
        <div className="mt-6">
          <Card title="Send documents by Telegram">
            <p className="mb-4 text-body-regular text-text-secondary">
              Link your Telegram to send a client&apos;s documents to the bot. In the bot, choose the client with /client and part of the name or code, send
              the files, then tap what they are and the month. They arrive in that client&apos;s Inbox as Telegram uploads, under your name. Only clients
              assigned to you are offered.
            </p>
            {(links as unknown as { chat_id: number; username: string | null; clients: { name: string } | null }[]).map((l) => (
              <p key={l.chat_id} className="mb-3 flex flex-wrap items-center gap-3 text-body-regular text-text-secondary">
                Linked{l.username ? <> to <bdi dir="ltr">@{l.username}</bdi></> : null}
                {l.clients ? ` · now sending for ${l.clients.name}` : ""}
                <TelegramUnlinkButton chatId={l.chat_id} />
              </p>
            ))}
            <div className="max-w-xs">
              <TelegramLinkButton label={links.length ? "Link another chat" : "Link Telegram"} />
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
