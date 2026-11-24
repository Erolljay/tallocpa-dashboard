import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { portalContext } from "./client-context";
import { PortalNav } from "./nav/portal-nav";

/** Client portal (spec §3.4): mobile first, tabs at the bottom on phones. Header and tab bar are translucent material. */
export default function PortalLayout({ children }: LayoutProps<"/portal">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="material material-edge-b sticky top-0 z-10 print:hidden">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Lockup />
          <form action="/auth/signout" method="post">
            <button className="pressable rounded-[6px] px-2 py-1 text-sm text-link hover:text-link-hover hover:underline pointer-coarse:min-h-11">Sign out</button>
          </form>
        </div>
        <div className="mx-auto hidden w-full max-w-3xl px-4 sm:block">
          <Suspense fallback={null}>
            <Nav variant="top" />
          </Suspense>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-28 sm:pb-10 print:max-w-none print:p-0">{children}</main>
      <nav aria-label="Portal" className="material material-edge-t fixed inset-x-0 bottom-0 z-10 pb-[env(safe-area-inset-bottom)] sm:hidden print:hidden">
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
