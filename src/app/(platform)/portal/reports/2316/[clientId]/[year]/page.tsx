import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Form2316Sheet } from "@/components/bir/form-2316-sheet";
import { PrintButton } from "@/components/bir/print-button";
import { Skeleton } from "@/components/ui";
import { load2316 } from "@/lib/payroll/load";
import { cx } from "@/utils/cx";
import { portalContext } from "../../../../client-context";
import { linkClass, reportsHref } from "../../../shared";

export default function Portal2316Page(props: PageProps<"/portal/reports/2316/[clientId]/[year]">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Portal2316 params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/**
 * A client user's BIR 2316s for a year, once staff released them: one per
 * employee (?employee=…) or all of them. Rendered on the server from
 * payroll_2316_data(), which checks that the user belongs to the client and that
 * the year is released; client users never read the payroll tables themselves.
 */
async function Portal2316({ params, searchParams }: Pick<PageProps<"/portal/reports/2316/[clientId]/[year]">, "params" | "searchParams">) {
  const { clientId, year: y } = await params;
  const { employee } = await searchParams;
  if (!/^\d{4}$/.test(y)) notFound();
  const { supabase, all: clients } = await portalContext();
  if (!clients.some((c) => c.id === clientId)) notFound();
  const set = await load2316(supabase, clientId, Number(y));
  if (!set || !set.releasedAt) notFound();
  const one = typeof employee === "string" ? set.forms.find((f) => f.employeeId === employee) : undefined;
  const forms = one ? [one] : set.forms;
  const base = `/portal/reports/2316/${clientId}/${y}`;
  const chip = "inline-flex items-center rounded-full border px-3 py-1 text-body-medium outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-11";

  return (
    <div className="space-y-6">
      <div className="space-y-3 print:hidden">
        <Link href={reportsHref("/portal/reports", { client: clients.length > 1 ? clientId : null })} className={linkClass}>All reports</Link>
        <h1 className="text-title-1-medium text-text-primary">BIR 2316 · {y}</h1>
        <p className="text-body-regular text-text-secondary">
          {set.clientName}: {set.forms.length} certificate{set.forms.length === 1 ? "" : "s"}, one per page. Print them (or save as PDF), have your authorized representative and each employee sign, and give each employee their copy.
        </p>
        {set.forms.length > 1 && (
          <nav aria-label="Employees" className="flex flex-wrap gap-2">
            <Link href={base} aria-current={!one ? "page" : undefined} className={cx(chip, !one ? "border-accent-600 bg-accent-50 text-text-primary" : "border-border-button-default text-text-secondary hover:bg-background-secondary-hover")}>
              All employees
            </Link>
            {set.forms.map((f) => (
              <Link key={f.employeeId} href={`${base}?employee=${f.employeeId}`} aria-current={one?.employeeId === f.employeeId ? "page" : undefined} className={cx(chip, one?.employeeId === f.employeeId ? "border-accent-600 bg-accent-50 text-text-primary" : "border-border-button-default text-text-secondary hover:bg-background-secondary-hover")}>
                {f.employee.name}
              </Link>
            ))}
          </nav>
        )}
        {forms.length > 0 && <PrintButton label={one ? `Print ${one.employee.name}'s 2316` : "Print all / save as PDF"} />}
      </div>
      <div className="-mx-4 overflow-x-auto px-4 print:mx-0 print:overflow-visible print:px-0">
        <Form2316Sheet forms={forms} />
      </div>
    </div>
  );
}
