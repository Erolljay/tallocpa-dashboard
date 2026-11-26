"use client";

/**
 * A website page that failed to render, inside the site's header and footer (the
 * (site) root layout). Next sends it with every website page, so it stays plain
 * markup: a native button on BoardUI's primary button tokens, not the Button
 * component, whose class merging would add tailwind-merge to every page's scripts.
 */
export default function SiteError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <section className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <h1 className="text-display-4-semibold text-text-primary md:text-display-3-semibold">Something went wrong on this page.</h1>
        <p className="max-w-[52ch] text-title-3-regular text-text-secondary">Try again, or come back in a moment.</p>
        <div>
          <button
            type="button"
            onClick={() => retry()}
            className="bg-button-primary button-press-motion inline-flex h-12 items-center justify-center rounded-2lg px-5 text-body-medium text-text-white shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
