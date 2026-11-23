import { Suspense } from "react";
import { Lockup } from "@/components/brand/lockup";
import { getIdentity } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { NavLinks, NavLinksFallback, type NavKey } from "./nav/app-nav";

const nav = ["dashboard", "clients", "deadlines", "documents"] as const satisfies readonly NavKey[];
/** Shown to the Owner and to anyone who reviews a client's returns. */
const reviewNav = ["review"] as const satisfies readonly NavKey[];
/** Shown only to the Owner. */
const ownerNav = ["staff", "settings"] as const satisfies readonly NavKey[];

const roleLabel = { owner: "Owner", reviewer: "Reviewer", staff: "Staff" } as const;

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      {/* Translucent sidebar material; on phones it sits above the page as a header. */}
      <aside className="material material-edge-b z-20 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:material-edge-r">
        <div className="flex h-full flex-col gap-4 px-4 py-3 md:gap-8 md:px-3 md:py-5">
          <div className="md:px-2">
            <Lockup />
          </div>
          <nav aria-label="Main" className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-col md:px-0">
            <Suspense fallback={<NavLinksFallback keys={nav} />}>
              <NavLinks keys={nav} />
            </Suspense>
            <Suspense fallback={null}>
              <OwnerNavLinks />
            </Suspense>
          </nav>
          <div className="md:mt-auto">
            <Suspense fallback={<div className="h-12 animate-pulse rounded-[8px] bg-surface-sunken" />}>
              <UserMenu />
            </Suspense>
          </div>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 py-8 sm:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}

async function OwnerNavLinks() {
  const id = await getIdentity();
  if (!id.staff) return null;
  if (id.staff.role === "owner") return <NavLinks keys={[...reviewNav, ...ownerNav]} />;
  if (id.staff.role === "reviewer") return <NavLinks keys={reviewNav} />;
  // A staff member assigned as a client's reviewer also gets the Review page.
  const supabase = await supabaseServer();
  const { count } = await supabase.from("staff_assignments").select("client_id", { count: "exact", head: true }).eq("user_id", id.userId).eq("role", "reviewer");
  return count ? <NavLinks keys={reviewNav} /> : null;
}

async function UserMenu() {
  const id = await getIdentity();
  const name = id.staff?.fullName ?? id.email;
  return (
    <div className="flex items-center gap-3 border-t border-border pt-3 md:px-2 md:pt-4">
      <div aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-action text-sm font-semibold text-ink-on-action">
        {(name ?? "?").trim().charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink-heading">{name}</p>
        {id.staff && <p className="text-xs text-ink-subtle">{roleLabel[id.staff.role]}</p>}
      </div>
      <form action="/auth/signout" method="post">
        <button className="pressable rounded-[6px] px-2 py-1 text-sm text-link hover:text-link-hover hover:underline">Sign out</button>
      </form>
    </div>
  );
}
