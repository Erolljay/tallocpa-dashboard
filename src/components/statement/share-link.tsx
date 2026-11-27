"use client";

import { RiCheckLine, RiFileCopyLine, RiLinkM, RiMessage2Line, RiRefreshLine } from "@remixicon/react";
import { useState, useTransition } from "react";
import { statementLinkAction } from "@/app/(platform)/app/collections/actions";
import { cx } from "@/utils/cx";

const chip =
  "pressable inline-flex items-center gap-1.5 rounded-2lg px-2 py-1 text-body-regular text-button-ghost-foreground outline-none hover:text-text-primary hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11 disabled:opacity-60";

/**
 * Owner only: the statement's share link, to paste into Viber, Messenger, SMS or
 * email. The client opens it without signing in and sees what is due and how to
 * pay. "Copy message" adds a short note with the amount and the pay-by date.
 * "New link" stops the old link (e.g. it went to the wrong person).
 */
export function ShareLink({ soaId, message }: { soaId: string; /** The note before the link. */ message: string }) {
  const [path, setPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "message" | null>(null);
  const [pending, start] = useTransition();

  function copy(what: "link" | "message", renew = false) {
    setError(null);
    start(async () => {
      let p = renew ? null : path;
      if (!p) {
        const r = await statementLinkAction(soaId, renew);
        if (r.error || !r.path) {
          setError(r.error ?? "Could not make the link.");
          return;
        }
        p = r.path;
        setPath(p);
      }
      const url = `${window.location.origin}${p}`;
      try {
        await navigator.clipboard.writeText(what === "link" ? url : `${message}\n\n${url}`);
        setCopied(what);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        setError("Copy did not work here. Select the link below and copy it.");
      }
    });
  }

  const url = path && typeof window !== "undefined" ? `${window.location.origin}${path}` : null;
  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <div className="flex flex-wrap items-center gap-1 sm:justify-end">
        <button type="button" className={chip} disabled={pending} onClick={() => copy("link")}>
          {copied === "link" ? <RiCheckLine aria-hidden className="size-4" /> : <RiLinkM aria-hidden className="size-4" />}
          {copied === "link" ? "Link copied" : "Copy link for client"}
        </button>
        <button type="button" className={chip} disabled={pending} onClick={() => copy("message")}>
          {copied === "message" ? <RiCheckLine aria-hidden className="size-4" /> : <RiMessage2Line aria-hidden className="size-4" />}
          {copied === "message" ? "Message copied" : "Copy message"}
        </button>
      </div>
      <p role="status" aria-live="polite" className={cx("max-w-sm text-caption-1-regular sm:text-end", error ? "text-text-error-primary" : "text-text-tertiary")}>
        {error ??
          (url ? (
            <>
              <span dir="ltr" className="break-all font-mono">{url}</span>{" "}
              <button type="button" disabled={pending} onClick={() => copy("link", true)} className="inline-flex items-center gap-1 underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
                <RiRefreshLine aria-hidden className="size-3.5" />
                New link
              </button>
              <span className="sr-only"> (stops this link)</span>
            </>
          ) : pending ? (
            "Getting the link…"
          ) : (
            <span className="inline-flex items-center gap-1"><RiFileCopyLine aria-hidden className="size-3.5" />Anyone with the link sees this statement and how to pay.</span>
          ))}
      </p>
    </div>
  );
}
