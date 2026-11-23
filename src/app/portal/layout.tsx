import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { PortalNav } from "./nav/portal-nav";

/** Client portal (spec §3.4): mobile first, tabs at the bottom on phones. */
export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Lockup />
          <form action="/auth/signout" method="post">
            <button className="text-sm text-link hover:underline">Sign out</button>
          </form>
        </div>
        <div className="mx-auto hidden w-full max-w-3xl px-4 sm:block">
          <Suspense fallback={null}>
            <PortalNav variant="top" />
          </Suspense>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-28 sm:pb-10">{children}</main>
      <nav aria-label="Portal" className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] sm:hidden">
        <Suspense fallback={null}>
          <PortalNav variant="bottom" />
        </Suspense>
      </nav>
    </div>
  );
}
