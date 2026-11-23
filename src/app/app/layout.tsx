import Link from "next/link";
import { Suspense } from "react";
import { CalendarClock, LayoutDashboard, Settings, UserCog, Users } from "lucide-react";
import { Lockup } from "@/components/brand/lockup";
import { getIdentity } from "@/lib/auth";

const nav = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/clients", label: "Clients", icon: Users },
  { href: "/app/deadlines", label: "Deadlines", icon: CalendarClock },
] as const;
/** Shown only to the Owner. */
const ownerNav = [
  { href: "/app/staff", label: "Staff", icon: UserCog },
  { href: "/app/settings", label: "Settings", icon: Settings },
] as const;

const roleLabel = { owner: "Owner", reviewer: "Reviewer", staff: "Staff" } as const;

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="border-b border-border bg-surface md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:border-r md:border-b-0">
        <div className="flex h-full flex-col gap-6 p-4">
          <Lockup />
          <nav aria-label="Main" className="flex gap-1 overflow-x-auto md:flex-col">
            <NavLinks items={nav} />
            <Suspense fallback={null}>
              <OwnerNavLinks />
            </Suspense>
          </nav>
          <div className="md:mt-auto">
            <Suspense fallback={<div className="h-12 animate-pulse rounded-lg bg-surface-sunken" />}>
              <UserMenu />
            </Suspense>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}

function NavLinks({ items }: { items: readonly { href: string; label: string; icon: typeof Users }[] }) {
  return items.map(({ href, label, icon: Icon }) => (
    <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-strong hover:bg-surface-sunken">
      <Icon aria-hidden className="size-4" strokeWidth={2} />
      {label}
    </Link>
  ));
}

async function OwnerNavLinks() {
  const id = await getIdentity();
  return id.staff?.role === "owner" ? <NavLinks items={ownerNav} /> : null;
}

async function UserMenu() {
  const id = await getIdentity();
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border pt-3 md:block md:space-y-2 md:pt-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink-heading">{id.staff?.fullName ?? id.email}</p>
        {id.staff && <p className="text-xs text-ink-subtle">{roleLabel[id.staff.role]}</p>}
      </div>
      <form action="/auth/signout" method="post">
        <button className="text-sm text-link hover:underline">Sign out</button>
      </form>
    </div>
  );
}
