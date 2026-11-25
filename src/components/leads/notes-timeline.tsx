import { RiChat3Line, RiCheckboxCircleLine, RiGlobalLine, RiPhoneLine, type RemixiconComponentType } from "@remixicon/react";
import type { NoteEntry, NoteSource } from "@/lib/leads/notes";

const ICON: Record<NoteSource, RemixiconComponentType> = {
  inquiry: RiGlobalLine,
  discovery_call: RiPhoneLine,
  onboarding: RiCheckboxCircleLine,
  note: RiChat3Line,
};

const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" });

/** The Notes timeline, newest first, each entry labelled with where it came from. */
export function NotesTimeline({ entries, nameOf, empty }: { entries: NoteEntry[]; nameOf: Map<string, string>; empty: string }) {
  if (entries.length === 0) return <p className="text-body-regular text-text-secondary">{empty}</p>;
  return (
    <ol className="flex flex-col">
      {entries.map((e, i) => {
        const Icon = ICON[e.source];
        return (
          <li key={e.key} className="relative flex gap-3 pb-5 last:pb-0">
            {i < entries.length - 1 && <span aria-hidden className="absolute start-4 top-9 bottom-1 w-px bg-separator-border" />}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-background-tertiary-default">
              <Icon aria-hidden className="size-4 text-foreground-icon-secondary" />
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-body-medium text-text-primary">{e.label}</p>
              <p className="text-caption-1-regular text-text-tertiary">
                <time dateTime={e.at}>{when.format(new Date(e.at))}</time>
                {e.author && nameOf.get(e.author) ? ` · ${nameOf.get(e.author)}` : ""}
              </p>
              {e.answers.length > 0 && (
                <dl className="mt-2 grid grid-cols-[minmax(0,8rem)_1fr] gap-x-3 gap-y-1 text-body-regular">
                  {e.answers.map((a) => (
                    <div key={a.question} className="contents">
                      <dt className="text-text-tertiary">{a.question}</dt>
                      <dd className="min-w-0 break-words text-text-primary">{a.answer}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {e.body && <p className="mt-2 whitespace-pre-line break-words text-body-regular text-text-primary">{e.body}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
