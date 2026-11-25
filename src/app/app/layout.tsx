import { Suspense } from "react";
import { RiLogoutBoxRLine } from "@remixicon/react";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { Avatar } from "@/components/base/avatar/avatar";
import { Skeleton } from "@/components/base/skeleton/skeleton";
import { Lockup } from "@/components/brand/lockup";
import { getIdentity } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { NavLinks, NavLinksFallback, type NavKey } from "./nav/app-nav";

const nav = ["dashboard", "work", "clients", "deadlines", "documents", "cycle", "registrations", "requests"] as const satisfies readonly NavKey[];
/** Shown to the Owner and to anyone who reviews a client's returns. */
const reviewNav = ["review"] as const satisfies readonly NavKey[];
/** Shown only to the Owner. */
const ownerNav = ["collections", "scores", "staff", "settings"] as const satisfies readonly NavKey[];

const roleLabel = { owner: "Owner", reviewer: "Reviewer", staff: "Staff" } as const;

/*
 * BoardUI dashboard shell: a floating sidebar panel (rounded-3xl, secondary
 * surface, sidebar shadow) on the page ground, content beside it. On phones the
 * panel becomes a top bar with a scrolling row of nav pills.
 */
export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex flex-1 flex-col bg-background-full md:flex-row md:gap-2 md:p-2">
      <aside className="z-20 print:hidden md:sticky md:top-2 md:h-[calc(100dvh-16px)] md:w-[260px] md:shrink-0">
        <div className="flex h-full flex-col gap-4 border-b border-separator-border bg-background-secondary-default px-4 py-3 md:gap-6 md:rounded-3xl md:border md:border-border-button-white md:p-3 md:shadow-sidebar">
          <div className="flex items-center justify-between gap-3 md:px-1 md:pt-1">
            <Lockup />
            <ThemeToggle appearance="sidebar" collapsed className="md:hidden" />
          </div>
          <nav aria-label="Main" className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] max-md:mask-r-from-85% md:mx-0 md:flex-1 md:flex-col md:overflow-y-auto md:px-0">
            <Suspense fallback={<NavLinksFallback keys={nav} />}>
              <NavLinks keys={nav} />
            </Suspense>
            <Suspense fallback={null}>
              <OwnerNavLinks />
            </Suspense>
          </nav>
          <div className="hidden flex-col gap-3 md:flex">
            <ThemeToggle appearance="sidebar" />
            <Suspense fallback={<Skeleton className="h-12 w-full" />}>
              <UserMenu />
            </Suspense>
          </div>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 px-4 py-6 sm:px-8 md:py-8 print:max-w-none print:p-0">
        {children}
      </main>
      <div className="border-t border-separator-border px-4 py-3 md:hidden print:hidden">
        <Suspense fallback={null}>
          <UserMenu />
        </Suspense>
      </div>
    </div>
  );
}

async function OwnerNavLinks() {
  const id = await getIdentity();
  if (!id.staff) return null;
  if (id.staff.role === "owner") {
    return (
      <>
        <p className="hidden px-2 pt-4 pb-1 text-caption-1-semibold text-text-tertiary md:block">Firm</p>
        <NavLinks keys={[...reviewNav, ...ownerNav]} />
      </>
    );
  }
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
    <div className="flex items-center gap-2.5 rounded-2xl bg-background-primary-default p-2 shadow-xs">
      <Avatar size="md" color="blue" initials={(name ?? "?").trim().charAt(0).toUpperCase()} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-body-medium text-text-primary">{name}</p>
        {id.staff && <p className="text-caption-1-medium text-text-tertiary">{roleLabel[id.staff.role]}</p>}
      </div>
      <form action="/auth/signout" method="post">
        <button
          aria-label="Sign out"
          title="Sign out"
          className="grid size-8 place-items-center rounded-lg text-foreground-icon-secondary transition-colors hover:bg-background-secondary-hover hover:text-foreground-icon-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:size-11"
        >
          <RiLogoutBoxRLine aria-hidden className="size-[18px]" />
        </button>
      </form>
    </div>
  );
}
