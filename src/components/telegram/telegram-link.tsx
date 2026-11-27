"use client";

import { RiExternalLinkLine, RiTelegram2Line } from "@remixicon/react";
import { useState, useTransition } from "react";
import { AnchorButton, Button, Notice } from "@/components/ui";
import { setTelegramEnabledAction, telegramLinkAction, telegramUnlinkAction } from "@/lib/telegram/actions";

/** Portal: open the bot with a one-time code that links this chat to the client. */
export function TelegramLinkButton({ clientId, label = "Link Telegram" }: { clientId: string; label?: string }) {
  const [state, setState] = useState<{ url?: string; error?: string }>({});
  const [pending, start] = useTransition();
  if (state.url) {
    return (
      <div className="flex flex-col gap-2">
        <AnchorButton href={state.url} target="_blank" rel="noopener noreferrer">
          <RiTelegram2Line aria-hidden className="size-5" /> Open Telegram <RiExternalLinkLine aria-hidden className="size-4" />
        </AnchorButton>
        <p className="text-caption-1-regular text-text-tertiary">Tap Start in the bot. This link works once, for 15 minutes.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <Button variant="secondary" disabled={pending} onClick={() => start(async () => setState(await telegramLinkAction(clientId)))}>
        <RiTelegram2Line aria-hidden className="size-5" /> {pending ? "Preparing…" : label}
      </Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
    </div>
  );
}

/** Portal or staff: stop a linked chat sending documents. */
export function TelegramUnlinkButton({ chatId }: { chatId: number }) {
  const [error, setError] = useState<string>();
  const [pending, start] = useTransition();
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => start(async () => setError((await telegramUnlinkAction(chatId)).error))}
        className="rounded-md text-caption-1-regular text-text-error-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring"
      >
        {pending ? "Unlinking…" : "Unlink"}
      </button>
      {error && <span className="text-caption-1-regular text-text-error-primary">{error}</span>}
    </span>
  );
}

/** Staff: switch Telegram uploads on or off for a client. */
export function TelegramSwitch({ clientId, on }: { clientId: string; on: boolean }) {
  const [error, setError] = useState<string>();
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-col items-start gap-2">
      <Button variant={on ? "secondary" : "primary"} size="sm" disabled={pending} onClick={() => start(async () => setError((await setTelegramEnabledAction(clientId, !on)).error))}>
        {pending ? "Saving…" : on ? "Turn off Telegram" : "Turn on Telegram"}
      </Button>
      {error && <Notice tone="blocked">{error}</Notice>}
    </div>
  );
}
