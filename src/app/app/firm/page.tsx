import Link from "next/link";
import { Suspense } from "react";
import { RiArrowRightSLine, RiBarChartBoxLine, RiFilter3Line, RiScales3Line, RiSettings4Line, RiTeamLine, RiWallet3Line } from "@remixicon/react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwnerOrReviewer } from "@/lib/auth";

/** The Owner's side of the practice, in one place (rework: the sidebar's "Firm"). Reviewers see Leads only, for their own leads. */
const REVIEWER_PLACES = new Set(["/app/leads"]);
const PLACES = [
  { href: "/app/leads", label: "Leads", hint: "Inquiries, discovery calls, quotes and proposals until the client signs.", icon: RiFilter3Line },
  { href: "/app/collections", label: "Collections", hint: "Retainers billed, payment proofs to verify, and what is overdue.", icon: RiWallet3Line },
  { href: "/app/staff", label: "Staff", hint: "Who works on which clients, and each person's load.", icon: RiTeamLine },
  { href: "/app/firm/parallel-run", label: "Parallel run", hint: "Old register beside the Books, client by client and month by month, before the old screens go.", icon: RiScales3Line },
  { href: "/app/scores", label: "Scores", hint: "On-time filing and turnaround, per person.", icon: RiBarChartBoxLine },
  { href: "/app/settings", label: "Settings", hint: "Brand, fees, branches and the acting approver.", icon: RiSettings4Line },
] as const;

export default function FirmPage() {
  return (
    <>
      <PageHeader title="Firm" description="Running the practice: new business, collections, the team and settings." />
      <Suspense fallback={<Skeleton rows={5} />}>
        <Places />
      </Suspense>
    </>
  );
}

async function Places() {
  const me = await requireOwnerOrReviewer();
  const places = me.staff.role === "owner" ? PLACES : PLACES.filter((p) => REVIEWER_PLACES.has(p.href));
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {places.map(({ href, label, hint, icon: Icon }) => (
        <li key={href}>
          <Link
            href={href}
            className="flex h-full items-center gap-4 rounded-3xl border border-border-button-default bg-background-primary-default p-5 transition-colors duration-150 hover:bg-background-secondary-hover outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-background-tertiary-default">
              <Icon aria-hidden className="size-5 text-foreground-icon-secondary" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-headline-medium text-text-primary">{label}</span>
              <span className="block text-body-regular text-text-secondary">{hint}</span>
            </span>
            <RiArrowRightSLine aria-hidden className="size-5 shrink-0 text-foreground-icon-tertiary rtl:rotate-180" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
