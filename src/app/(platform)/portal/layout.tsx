import { Suspense } from "react";
import { RiLogoutBoxRLine } from "@remixicon/react";
import { Bell, BellFallback } from "@/components/application/notifications/bell";
import { IdleWatcher } from "@/components/application/session/idle-watcher";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { Lockup } from "@/components/brand/lockup";
import { BusinessSwitcher } from "./business/business-switcher";
import { portalContext } from "./client-context";
import { PortalNav } from "./nav/portal-nav";

/** Client portal (spec §3.4): mobile first, tabs at the bottom on phones. BoardUI surfaces: secondary-surface header and tab bar on the page ground. */
export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return (
    <div className="flex min-h-dvh flex-col bg-background-full">
      <header className="sticky top-0 z-10 border-b border-separator-border bg-background-secondary-default/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Lockup />
          <div className="flex items-center gap-1 sm:gap-2">
            <Suspense fallback={<BellFallback variant="icon" />}>
              <Bell audience="client" variant="icon" />
            </Suspense>
            <ThemeToggle appearance="sidebar" collapsed />
            <form action="/auth/signout" method="post">
              <button className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-body-medium text-text-secondary transition-colors hover:bg-background-secondary-hover hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11">
                <RiLogoutBoxRLine aria-hidden className="size-[18px]" />
                <span className="max-sm:sr-only">Sign out</span>
              </button>
            </form>
          </div>
        </div>
        <Suspense fallback={null}>
          <BusinessBar />
        </Suspense>
        <div className="mx-auto hidden w-full max-w-3xl px-4 sm:block">
          <Suspense fallback={null}>
            <Nav variant="top" />
          </Suspense>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-28 sm:pb-10 print:max-w-none print:p-0">{children}</main>
      <nav aria-label="Portal" className="fixed inset-x-0 bottom-0 z-10 border-t border-separator-border bg-background-secondary-default/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] sm:hidden print:hidden">
        <Suspense fallback={null}>
          <Nav variant="bottom" />
        </Suspense>
      </nav>
      <IdleWatcher audience="client" />
    </div>
  );
}

/** The tabs: Registration when we have registration work for them, and a count on Requests for what waits on them. */
async function Nav({ variant }: { variant: "top" | "bottom" }) {
  const { supabase, clients } = await portalContext();
  const ids = clients.map((c) => c.id);
  const [{ count: cases }, { count: pending }] = ids.length
    ? await Promise.all([
        supabase.from("registration_cases").select("id", { count: "exact", head: true }).in("client_id", ids).neq("status", "cancelled"),
        // Requests from us still waiting on the client.
        supabase.from("client_requests").select("id", { count: "exact", head: true }).in("client_id", ids).eq("direction", "to_client").eq("status", "open"),
      ])
    : [{ count: 0 }, { count: 0 }];
  return <PortalNav variant={variant} registration={(cases ?? 0) > 0} pending={pending ?? 0} />;
}

/** Under the contact's name: the business the portal is showing, and the switch to another (several businesses only). */
async function BusinessBar() {
  const { id, all, active } = await portalContext();
  if (all.length < 2) return null;
  const name = id.clients[0]?.fullName;
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-x-3 gap-y-1 px-4 pb-3 sm:pb-1">
      {name && <p className="text-body-regular text-text-secondary">{name}</p>}
      <BusinessSwitcher businesses={all.map((c) => ({ id: c.id, name: c.name, access: c.access }))} activeId={all.length > 1 ? (active?.id ?? null) : null} />
    </div>
  );
}
