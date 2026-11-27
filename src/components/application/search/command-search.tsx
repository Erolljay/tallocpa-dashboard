"use client";

import {
  RiArrowRightSLine,
  RiBriefcase4Line,
  RiContactsBook3Line,
  RiCornerDownLeftLine,
  RiGroupLine,
  RiQuestionAnswerLine,
  RiSearchLine,
  RiStore2Line,
  RiTaskLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Kbd } from "@/components/base/kbd/kbd";
import { Modal } from "@/components/base/modal/modal";
import { Spinner } from "@/components/base/spinner/spinner";
import { globalSearch, type SearchHit, type SearchKind } from "@/app/(platform)/app/search/actions";
import { cx } from "@/utils/cx";

type Icon = RemixiconComponentType;

const KINDS: Record<SearchKind | "page", { label: string; icon: Icon }> = {
  page: { label: "Pages", icon: RiArrowRightSLine },
  client: { label: "Clients", icon: RiGroupLine },
  contact: { label: "Contacts", icon: RiContactsBook3Line },
  party: { label: "Customers & suppliers", icon: RiStore2Line },
  request: { label: "Requests & tickets", icon: RiQuestionAnswerLine },
  task: { label: "Tasks", icon: RiTaskLine },
  lead: { label: "Leads", icon: RiBriefcase4Line },
};

/** Places to jump to by name; shown when the box is empty and matched as you type. */
const PAGES: { title: string; href: string; detail: string }[] = [
  { title: "Home", href: "/app", detail: "Overview" },
  { title: "My work", href: "/app/work", detail: "Home" },
  { title: "Tasks", href: "/app/tasks", detail: "Home" },
  { title: "Team calendar", href: "/app/calendar", detail: "Home" },
  { title: "Clients", href: "/app/clients", detail: "Clients" },
  { title: "New client", href: "/app/clients/new", detail: "Clients" },
  { title: "Contacts", href: "/app/contacts", detail: "Clients" },
  { title: "Customers & suppliers", href: "/app/parties", detail: "Clients" },
  { title: "Requests & tickets", href: "/app/requests", detail: "Clients" },
  { title: "Registrations", href: "/app/registrations", detail: "Clients" },
  { title: "Waiting for approval", href: "/app/documents", detail: "Inbox" },
  { title: "Month status", href: "/app/cycle", detail: "Inbox" },
  { title: "Deadlines", href: "/app/deadlines", detail: "Filings" },
  { title: "To review", href: "/app/review", detail: "Filings" },
  { title: "SSS · PhilHealth · Pag-IBIG", href: "/app/remittances", detail: "Filings" },
  { title: "Notifications", href: "/app/notifications", detail: "Account" },
];

type Row = SearchHit | (Omit<SearchHit, "kind"> & { kind: "page" });

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);
const noop = () => () => {};

/**
 * Global search: a sidebar button and ⌘K / Ctrl+K (or "/" outside a field)
 * open a dialog that searches clients, contacts, customers and suppliers,
 * requests, tasks and leads, plus the app's pages. Arrow keys move, Enter opens.
 */
export function CommandSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const mac = useSyncExternalStore(noop, isMac, () => true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-keyshortcuts="Meta+K Control+K"
        title="Search"
        className={cx(
          "flex w-full items-center gap-2 rounded-2lg bg-background-primary-default p-2 text-start shadow-xs ring-1 ring-border-button-default ring-inset transition-colors duration-150",
          "hover:ring-border-button-hover outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11",
          "md:sidebar-collapsed:justify-center",
          className,
        )}
      >
        <RiSearchLine aria-hidden className="size-5 shrink-0 text-foreground-icon-secondary" />
        <span className="flex-1 text-body-regular text-text-tertiary md:sidebar-collapsed:sr-only">Search</span>
        <Kbd className="px-1.5 max-md:hidden md:sidebar-collapsed:hidden">{mac ? "⌘K" : "Ctrl K"}</Kbd>
      </button>
      <Modal isOpen={open} onOpenChange={setOpen} size="lg" aria-label="Search" overlayClassName="items-start pt-[12vh]" className="gap-0 p-0">
        <SearchPanel onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}

function SearchPanel({ onDone }: { onDone: () => void }) {
  const router = useRouter();
  const listId = useId();
  const [q, setQ] = useState("");
  // The last answer and the text it answers; hits for older text are not shown.
  const [result, setResult] = useState<{ term: string; hits: SearchHit[] }>({ term: "", hits: [] });
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const wanted = q.trim();
  const hits = wanted.length >= 2 && result.term === wanted ? result.hits : [];
  const loading = wanted.length >= 2 && result.term !== wanted;

  useEffect(() => {
    if (wanted.length < 2) return;
    let live = true;
    const t = setTimeout(async () => {
      const found = await globalSearch(wanted).catch(() => [] as SearchHit[]);
      if (live) {
        setResult({ term: wanted, hits: found });
        setActive(0);
      }
    }, 200);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [wanted]);

  const term = q.trim().toLowerCase();
  const pages: Row[] = PAGES.filter((p) => !term || p.title.toLowerCase().includes(term) || p.detail.toLowerCase().includes(term))
    .slice(0, term ? 4 : PAGES.length)
    .map((p) => ({ kind: "page", id: p.href, title: p.title, detail: p.detail, href: p.href }));
  // Records first once there are any; pages trail as shortcuts.
  const rows: Row[] = [...hits, ...pages];
  const current = Math.min(active, Math.max(rows.length - 1, 0));

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${current}"]`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const go = (row: Row | undefined) => {
    if (!row) return;
    onDone();
    router.push(row.href);
  };

  const groups: { kind: Row["kind"]; rows: { row: Row; index: number }[] }[] = [];
  rows.forEach((row, index) => {
    const last = groups.at(-1);
    if (last?.kind === row.kind) last.rows.push({ row, index });
    else groups.push({ kind: row.kind, rows: [{ row, index }] });
  });

  return (
    <div className="flex max-h-[70vh] flex-col">
      <div className="flex items-center gap-2 border-b border-separator-border px-4">
        <RiSearchLine aria-hidden className="size-5 shrink-0 text-foreground-icon-tertiary" />
        <input
          autoFocus
          role="combobox"
          aria-expanded
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={rows.length ? `${listId}-${current}` : undefined}
          aria-label="Search clients, contacts, requests and more"
          placeholder="Search clients, TIN, contacts, requests…"
          autoComplete="off"
          spellCheck={false}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((current + 1) % Math.max(rows.length, 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((current - 1 + rows.length) % Math.max(rows.length, 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              go(rows[current]);
            }
          }}
          className="h-14 min-w-0 flex-1 bg-transparent text-headline-regular text-text-primary outline-none placeholder:text-text-placeholder sm:text-body-regular"
        />
        {loading && <Spinner size="sm" aria-label="Searching" />}
      </div>

      <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        {groups.map((g) => (
          <li key={`${g.kind}-${g.rows[0].index}`} role="presentation">
            <p aria-hidden className="px-2 pt-2 pb-1 text-caption-1-semibold text-text-tertiary">{KINDS[g.kind].label}</p>
            <ul role="group" aria-label={KINDS[g.kind].label}>
              {g.rows.map(({ row, index }) => {
                const Icon = KINDS[row.kind].icon;
                const on = index === current;
                return (
                  <li
                    key={`${row.kind}-${row.id}`}
                    id={`${listId}-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={on}
                    onMouseMove={() => setActive(index)}
                    onClick={() => go(row)}
                    className={cx("flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2", on && "bg-background-secondary-hover")}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-background-tertiary-default">
                      <Icon aria-hidden className="size-4 text-foreground-icon-secondary" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body-medium text-text-primary">{row.title}</span>
                      {row.detail && <span className="block truncate text-caption-1-regular tabular-nums text-text-tertiary">{row.detail}</span>}
                    </span>
                    {on && <RiCornerDownLeftLine aria-hidden className="size-4 shrink-0 text-foreground-icon-tertiary" />}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
        {term.length >= 2 && !loading && hits.length === 0 && (
          <li role="presentation" className="px-2 py-6 text-center text-body-regular text-text-secondary">
            No client, contact, request or task matches &ldquo;{q.trim()}&rdquo;.
          </li>
        )}
      </ul>

      <div className="flex items-center gap-4 border-t border-separator-border px-4 py-2 text-caption-1-regular text-text-tertiary max-sm:hidden">
        <span className="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd> move</span>
        <span className="flex items-center gap-1"><Kbd>↵</Kbd> open</span>
        <span className="flex items-center gap-1"><Kbd>Esc</Kbd> close</span>
      </div>
    </div>
  );
}
