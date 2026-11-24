import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { showMonth } from "@/lib/documents/labels";
import { previewOf } from "@/lib/payroll/apply";
import { employeesForMonth, loadEmployees, loadItems, loadPriorEmployers, loadStored, monthLocked, payrollAccess } from "@/lib/payroll/data";
import { checkRegister, type RegisterRow } from "@/lib/payroll/register";
import { toEntries } from "@/lib/payroll/rows";
import { byName } from "@/lib/payroll/year";
import { MonthGrid, RegisterUpload, SubmissionReview, type GridRow } from "../../forms";

export default function PayrollMonthPage(props: PageProps<"/app/clients/[id]/payroll/month/[month]">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <PayrollMonth params={props.params} />
    </Suspense>
  );
}

const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Manila" }).format(new Date(iso));

async function PayrollMonth({ params }: Pick<PageProps<"/app/clients/[id]/payroll/month/[month]">, "params">) {
  const { id, month: ym } = await params;
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(ym)) notFound();
  const month = `${ym}-01`;
  const year = Number(ym.slice(0, 4));
  const m = Number(ym.slice(5, 7)) - 1;
  const { supabase, client } = await payrollAccess(id);
  const items = await loadItems(supabase, id, true);
  const [employees, stored, locked, submissions, prior] = await Promise.all([
    loadEmployees(supabase, id),
    loadStored(supabase, id, `${year}-01-01`, month),
    monthLocked(supabase, id, month),
    supabase.from("payroll_submissions").select("id, file_name, rows, late, created_at").eq("client_id", id).eq("pay_month", month).eq("status", "pending").order("created_at"),
    loadPriorEmployers(supabase, id, year),
  ]);
  const earlier = toEntries(stored.filter((s) => s.payMonth < month), items);
  const current = new Map(stored.filter((s) => s.payMonth === month).map((s) => [s.employeeId, s]));
  const onGrid = employeesForMonth(employees, month, new Set(current.keys())).sort(byName);
  const rows: GridRow[] = onGrid.map((e) => {
    const cur = current.get(e.id);
    return {
      employee: e,
      lines: Object.fromEntries(cur?.lines ?? []),
      adjustment: cur?.adjustment ?? 0,
      note: cur?.note ?? null,
      prior: prior.find((p) => p.employeeId === e.id) ?? null,
      earlier: Array.from({ length: m }, (_, i) => earlier.find((x) => x.employeeId === e.id && x.payMonth === `${year}-${String(i + 1).padStart(2, "0")}-01`) ?? null),
    };
  });
  const activeItems = items.filter((i) => i.active).length;

  return (
    <>
      <PageHeader
        title={`Payroll · ${showMonth(month)}`}
        description={client.name}
        actions={
          <>
            <LinkButton href={`/app/clients/${id}/payroll`} variant="ghost">All months</LinkButton>
            <LinkButton href={`/app/clients/${id}/payroll/export?kind=template&month=${ym}`} variant="secondary" prefetch={false}>Download register (.xlsx)</LinkButton>
          </>
        }
      />
      <div className="space-y-6">
        {locked && <Notice tone="done">The 1601-C for {showMonth(month)} is filed: this month&rsquo;s payroll is locked.</Notice>}

        {(submissions.data ?? []).map((s) => (
          <Card key={s.id} title={`Sent by the client · ${when(s.created_at)}${s.late ? " · late" : ""}`}>
            <p className="mb-3 text-sm text-ink-muted">
              {s.file_name} · <a href={`/app/clients/${id}/payroll/export?kind=submission&id=${s.id}`} className="text-link underline">download the file</a>. Posting replaces this month&rsquo;s figures for the employees in it; tax adjustments and notes are kept.
            </p>
            <SubmissionReview clientId={id} submissionId={s.id} preview={previewOf(checkRegister(s.rows as RegisterRow[], employees, items, month), employees, items)} />
          </Card>
        ))}

        {!locked && (
          <Card title="Upload a filled-in register">
            <p className="mb-3 text-sm text-ink-muted">
              Download the register, fill in one row per employee per payday (one column for each of the {activeItems} active payslip items), then upload it here.
              Rows are matched by Employee No.; several rows for one employee in the month are added together. Columns are matched by header. You see a preview before anything is saved.
            </p>
            <RegisterUpload clientId={id} month={month} />
          </Card>
        )}

        <Card title="Monthly payroll">
          {rows.length === 0 ? (
            <p className="text-sm text-ink-muted">No active employees for this month. Add employees first, or upload a register.</p>
          ) : (
            <>
              <p className="mb-4 text-sm text-ink-muted">
                Amounts in pesos, one input per payslip item (<a href={`/app/clients/${id}/payroll/setup`} className="text-link underline">set up items</a>). Under each employee: gross, deductions and net pay as on the client&rsquo;s register,
                taxable compensation (1601-C item 22) and the suggested tax — the BIR monthly table, or in December (and the month an employee leaves) the year-end adjustment. A difference of more than ₱1 is flagged.
                Tax adjustment: corrections of earlier months&rsquo; tax for the employee, negative for a refund.
              </p>
              <MonthGrid clientId={id} month={month} locked={locked} rows={rows} items={items} />
            </>
          )}
        </Card>
      </div>
    </>
  );
}
