"use client";

import { RiTimerLine } from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertDialog } from "@/components/base/modal/modal";
import {
  IDLE_COOKIE,
  IDLE_COOKIE_MAX_AGE,
  IDLE_WARNING_SECONDS,
  IDLE_WRITE_EVERY_MS,
  formatIdleCookie,
  idleLimitMs,
  parseIdleCookie,
  type IdleAudience,
} from "@/lib/session/idle";

const ACTIVITY = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

function readCookie() {
  const m = document.cookie.match(new RegExp(`(?:^|; )${IDLE_COOKIE}=([^;]*)`));
  return parseIdleCookie(m ? decodeURIComponent(m[1]) : null);
}

function writeCookie(sessionId: string, at: number) {
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${IDLE_COOKIE}=${encodeURIComponent(formatIdleCookie(sessionId, at))}; path=/; max-age=${IDLE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
}

/**
 * Signs the person out after no activity (src/lib/session/idle.ts), with a one-minute
 * warning. Activity in any tab counts for all of them: they share the cookie. The proxy
 * enforces the same limit on the next request, so closing the browser does not escape it.
 */
export function IdleWatcher({ audience }: { audience: IdleAudience }) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const lastWrite = useRef(0);
  const warning = useRef(false);
  const signingOut = useRef(false);
  const form = useRef<HTMLFormElement>(null);

  const touch = useCallback((force = false) => {
    const now = Date.now();
    if (!force && now - lastWrite.current < IDLE_WRITE_EVERY_MS) return;
    const current = readCookie();
    if (!current) return;
    lastWrite.current = now;
    writeCookie(current.sessionId, now);
  }, []);

  const signOut = useCallback(() => {
    if (signingOut.current) return;
    signingOut.current = true;
    form.current?.requestSubmit();
  }, []);

  useEffect(() => {
    // Moving the mouse while the warning shows does not dismiss it: the person answers it.
    const onActivity = () => {
      if (!warning.current) touch();
    };
    for (const e of ACTIVITY) window.addEventListener(e, onActivity, { passive: true, capture: true });

    const limit = idleLimitMs(audience);
    const tick = () => {
      const current = readCookie();
      if (!current) return;
      const left = Math.ceil((limit - (Date.now() - current.at)) / 1000);
      if (left <= 0) return signOut();
      const show = left <= IDLE_WARNING_SECONDS;
      warning.current = show;
      setSecondsLeft(show ? left : null);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    // A tab coming back from the background checks at once instead of on its next tick.
    document.addEventListener("visibilitychange", tick);
    return () => {
      for (const e of ACTIVITY) window.removeEventListener(e, onActivity, { capture: true });
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [audience, touch, signOut]);

  const stay = () => {
    warning.current = false;
    touch(true);
    setSecondsLeft(null);
  };

  const action = `/auth/signout?reason=idle_${audience}`;
  return (
    <>
      <form ref={form} action={action} method="post" hidden onSubmit={(e) => {
        // Come back to the same page after signing in again.
        e.currentTarget.action = `${action}&next=${encodeURIComponent(location.pathname + location.search)}`;
      }} />
      <AlertDialog
        isOpen={secondsLeft != null}
        onOpenChange={(open) => {
          // Escape or the close button: stay. "Sign out now" closes it too, so skip that case.
          if (!open && secondsLeft != null && !signingOut.current) stay();
        }}
        variant="default"
        icon={RiTimerLine}
        title="Are you still there?"
        description={`For security, you will be signed out in ${secondsLeft ?? 0} second${secondsLeft === 1 ? "" : "s"} because there has been no activity.`}
        confirmLabel="Stay signed in"
        cancelLabel="Sign out now"
        onConfirm={stay}
        onCancel={signOut}
      />
    </>
  );
}
