import { Suspense } from "react";
import { RiLogoutBoxRLine } from "@remixicon/react";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { Lockup } from "@/components/brand/lockup";
import { portalContext } from "./client-context";
import { PortalNav } from "./nav/portal-nav";

/** Client portal (spec §3.4): mobile first, tabs at the bottom on phones. BoardUI surfaces: secondary-surface header and tab bar on the page ground. */
export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return (
    <div className="flex min-h-dvh flex-col bg-background-full">
      <header className="sticky top-0 z-10 border-b border-separator-border bg-background-secondary-default/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Lockup />
          <div className="flex items-center gap-2">
            <ThemeToggle appearance="sidebar" collapsed />
            <form action="/auth/signout" method="post">
              <button className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-body-medium text-text-secondary transition-colors hover:bg-background-secondary-hover hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11">
                <RiLogoutBoxRLine aria-hidden className="size-[18px]" />
                <span className="max-sm:sr-only">Sign out</span>
              </button>
            </form>
          </div>
        </div>
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
    </div>
  );
}

/** The tabs, with Payroll only for businesses whose payroll is set up (they have payslip items). */
async function Nav({ variant }: { variant: "top" | "bottom" }) {
  const { supabase, clients } = await portalContext();
  const { count } = clients.length
    ? await supabase.from("payroll_items").select("id", { count: "exact", head: true }).in("client_id", clients.map((c) => c.id)).eq("active", true)
    : { count: 0 };
  return <PortalNav variant={variant} payroll={(count ?? 0) > 0} />;
}
