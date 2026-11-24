import { RiAttachment2 } from "@remixicon/react";
import { cx } from "@/utils/cx";

export interface ThreadMessage {
  id: string;
  from_firm: boolean;
  body: string | null;
  file_name: string | null;
  storage_path: string | null;
  created_at: string;
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));

/** A request or ticket as a conversation: the viewer's own side on the end edge, the other on the start edge. */
export function Thread({ messages, viewer, firmName = "Tallo CPA" }: { messages: ThreadMessage[]; viewer: "firm" | "client"; firmName?: string }) {
  if (messages.length === 0) return <p className="text-body-regular text-text-secondary">No messages yet.</p>;
  return (
    <ol className="flex flex-col gap-3">
      {messages.map((m) => {
        const mine = (viewer === "firm") === m.from_firm;
        return (
          <li key={m.id} className={cx("flex flex-col gap-1", mine ? "items-end" : "items-start")}>
            <div className={cx("max-w-[85%] rounded-2xl px-4 py-3 text-body-regular", mine ? "bg-accent-500/10 text-text-primary" : "bg-background-tertiary-default text-text-primary")}>
              {m.body && <p className="whitespace-pre-wrap break-words">{m.body}</p>}
              {m.storage_path && (
                <a href={`/request-files/${m.id}`} target="_blank" rel="noopener" className={cx("inline-flex items-center gap-1.5 text-body-medium text-button-ghost-foreground hover:underline", m.body && "mt-2")}>
                  <RiAttachment2 aria-hidden className="size-4 shrink-0" />
                  <span className="break-all">{m.file_name}</span>
                </a>
              )}
            </div>
            <span className="text-caption-1-regular text-text-tertiary">{m.from_firm ? firmName : "Client"} · {when(m.created_at)}</span>
          </li>
        );
      })}
    </ol>
  );
}
