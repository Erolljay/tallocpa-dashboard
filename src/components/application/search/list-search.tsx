"use client";

import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState, useTransition } from "react";
import { Input, Select } from "@/components/ui";
import { cx } from "@/utils/cx";

export interface ListOption {
  value: string;
  label: string;
}

export interface ListFilter {
  /** The query param it writes, e.g. `status`. */
  param: string;
  /** Accessible name and the "any" option's text, e.g. "Any status". */
  label: string;
  anyLabel: string;
  options: ListOption[];
}

export interface ListToolbarProps {
  label: string;
  placeholder: string;
  filters?: ListFilter[];
  /** Sort choices; the first is the default and is left out of the URL. */
  sorts?: ListOption[];
  className?: string;
}

/**
 * The toolbar over a list page: a search box, the page's filters and a sort.
 * Everything lives in the URL (`?q=`, each filter's param, `?sort=`), so the
 * server renders the filtered, sorted list and the view can be bookmarked or
 * shared. Typing is debounced; a filter or sort applies at once. Params the
 * toolbar does not own (the page's view pills) are kept.
 */
export function ListToolbar(props: ListToolbarProps) {
  return (
    <Suspense fallback={<Toolbar {...props} inert />}>
      <LiveToolbar {...props} />
    </Suspense>
  );
}

function LiveToolbar(props: ListToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const apply = (changes: Record<string, string>) => {
    const q = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v.trim()) q.set(k, v.trim());
      else q.delete(k);
    }
    startTransition(() => router.replace(`${pathname}${q.size ? `?${q}` : ""}`, { scroll: false }));
  };

  return <Toolbar {...props} params={params} apply={apply} pending={pending} />;
}

function Toolbar({
  label,
  placeholder,
  filters = [],
  sorts = [],
  className,
  params,
  apply,
  pending,
  inert,
}: ListToolbarProps & { params?: URLSearchParams; apply?: (c: Record<string, string>) => void; pending?: boolean; inert?: boolean }) {
  const current = params?.get("q") ?? "";
  const [value, setValue] = useState(current);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Back/forward or a pill link changed the URL: follow it.
  const [seen, setSeen] = useState(current);
  if (seen !== current) {
    setSeen(current);
    setValue(current);
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  const active = filters.filter((f) => params?.get(f.param)).length + (current ? 1 : 0);

  return (
    <form
      role="search"
      aria-busy={pending || undefined}
      className={cx("mb-4 flex flex-wrap items-center gap-2", className)}
      onSubmit={(e) => {
        e.preventDefault();
        clearTimeout(timer.current);
        apply?.({ q: value });
      }}
    >
      <div className="relative min-w-56 flex-1 sm:max-w-sm">
        <label htmlFor="list_q" className="sr-only">{label}</label>
        <RiSearchLine aria-hidden className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-foreground-icon-tertiary" />
        <Input
          id="list_q"
          name="q"
          type="search"
          autoComplete="off"
          disabled={inert}
          value={value}
          placeholder={placeholder}
          className="ps-9"
          onChange={(e) => {
            const next = e.target.value;
            setValue(next);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => apply?.({ q: next }), 250);
          }}
        />
      </div>
      {filters.map((f) => (
        <div key={f.param} className="min-w-36 max-sm:flex-1">
          <label htmlFor={`list_${f.param}`} className="sr-only">{f.label}</label>
          <Select id={`list_${f.param}`} name={f.param} disabled={inert} value={params?.get(f.param) ?? ""} onChange={(e) => apply?.({ [f.param]: e.target.value })}>
            <option value="">{f.anyLabel}</option>
            {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </div>
      ))}
      {sorts.length > 0 && (
        <div className="min-w-44 max-sm:flex-1">
          <label htmlFor="list_sort" className="sr-only">Sort by</label>
          <Select id="list_sort" name="sort" disabled={inert} value={params?.get("sort") ?? ""} onChange={(e) => apply?.({ sort: e.target.value })}>
            {sorts.map((o, i) => <option key={o.value} value={i === 0 ? "" : o.value}>Sort: {o.label}</option>)}
          </Select>
        </div>
      )}
      {active > 0 && (
        <button
          type="button"
          onClick={() => {
            clearTimeout(timer.current);
            setValue("");
            apply?.(Object.fromEntries([["q", ""], ...filters.map((f) => [f.param, ""])]));
          }}
          className="inline-flex h-9 items-center gap-1 rounded-2lg px-2.5 text-body-medium text-text-secondary transition-colors hover:bg-background-secondary-hover hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:h-11"
        >
          <RiCloseLine aria-hidden className="size-4" />
          Clear{active > 1 ? ` (${active})` : ""}
        </button>
      )}
    </form>
  );
}
