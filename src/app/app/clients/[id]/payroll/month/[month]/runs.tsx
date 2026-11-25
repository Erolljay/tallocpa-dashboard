import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import type { payrollAccess } from "@/lib/payroll/data";
import { periodLabel } from "@/lib/payroll/periods";
import { formatAmount, toCentavos } from "@/lib/returns/money";
import { PostPayrollButton } from "./post-button";

type Db = Awaited<ReturnType<typeof payrollAccess>>["supabase"];
const p = (v: unknown) => formatAmount(toCentavos(v as number) ?? 0);

interface Run {
  employees: number;
  gross: number;
  deductions: number;
  employer: number;
  net: number;
  tax_withheld: number;
  dues: Record<"sss" | "phic" | "hdmf", { ee: number; er: number }>;
  lines: { account_id: string; code: string | null; name: string | null; debit: number; credit: number }[];
  problems: string[];
}

const AGENCIES = { sss: "SSS", phic: "PhilHealth", hdmf: "Pag-IBIG" } as const;

/**
 * Payroll to the books (Owner, 25 November 2026): each payroll run of the month — the
 * whole month, or the 15th and the 30th — with its totals and the dues to SSS,
 * PhilHealth and Pag-IBIG for staff to check, the entry it makes, and "Post to books".
 */
export async function PayrollRuns({ supabase, clientId, month }: { supabase: Db; clientId: string; month: string }) {
  const [{ data: entries }, { data: postings }, { data: books }] = await Promise.all([
    supabase.from("payroll_entries").select("pay_period_end").eq("client_id", clientId).eq("pay_month", month),
    supabase.from("payroll_postings").select("period_end, entry_id, posted_at, journal_entries(status)").eq("client_id", clientId).eq("pay_month", month),
    supabase.from("client_books").select("client_id").eq("client_id", clientId).maybeSingle(),
  ]);
  const periods = [...new Set((entries ?? []).map((e) => (e.pay_period_end ? String(e.pay_period_end).slice(0, 10) : "")))].sort();
  if (periods.length === 0) return null;
  const runs = await Promise.all(
    periods.map(async (period) => {
      const { data, error } = await supabase.rpc("payroll_run", { p_client: clientId, p_month: month, p_period_end: period || null });
      const posting = (postings ?? []).find((x) => String(x.period_end).slice(0, 10) === (period || month));
      const posted = posting && (posting.journal_entries as unknown as { status: string } | null)?.status === "posted";
      return { period, run: (data ?? null) as Run | null, error: error?.message ?? null, posted };
    }),
  );

  return (
    <Card title="Payroll runs and the books">
      <p className="mb-4 text-body-regular text-text-secondary">
        Check each run&apos;s totals and the dues to SSS, PhilHealth and Pag-IBIG, then post it. Pay goes to each employee&apos;s pay account (Salaries and Wages unless set on the employee), employer shares of cost-of-services staff to the direct contributions account, and net pay to Cash.
      </p>
      <div className="space-y-6">
        {runs.map(({ period, run, error, posted }) => (
          <section key={period || "month"} className="space-y-3 rounded-2xl border border-separator-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-headline-semibold text-text-primary">{periodLabel(month, period || null)}</h3>
              {posted ? <Badge tone="done">In the books</Badge> : <Badge tone="waiting">To review</Badge>}
            </div>
            {error || !run ? (
              <p role="alert" className="text-body-regular text-text-error-primary">{error ?? "Could not read this run."}</p>
            ) : (
              <>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-body-regular sm:grid-cols-4">
                  {([["Employees", String(run.employees)], ["Gross pay", p(run.gross)], ["Deductions", p(run.deductions)], ["Net pay (to Cash)", p(run.net)]] as const).map(([k, v]) => (
                    <div key={k}><dt className="text-caption-1-regular text-text-tertiary">{k}</dt><dd className="tabular-nums text-text-primary">{v}</dd></div>
                  ))}
                </dl>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[28rem] text-body-regular">
                    <thead className="text-caption-1-regular text-text-tertiary">
                      <tr><th scope="col" className="pb-1 text-start">Dues</th><th scope="col" className="pb-1 text-end">Employee share</th><th scope="col" className="pb-1 text-end">Employer share</th><th scope="col" className="pb-1 text-end">To remit</th></tr>
                    </thead>
                    <tbody>
                      {(Object.keys(AGENCIES) as (keyof typeof AGENCIES)[]).map((k) => (
                        <tr key={k} className="border-t border-separator-border">
                          <td className="py-1.5">{AGENCIES[k]}</td>
                          <td className="py-1.5 text-end tabular-nums">{p(run.dues[k].ee)}</td>
                          <td className="py-1.5 text-end tabular-nums">{p(run.dues[k].er)}</td>
                          <td className="py-1.5 text-end tabular-nums font-medium">{p(run.dues[k].ee + run.dues[k].er)}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-separator-border">
                        <td className="py-1.5">Withholding tax on compensation</td><td className="py-1.5 text-end tabular-nums">{p(run.tax_withheld)}</td><td /><td className="py-1.5 text-end tabular-nums font-medium">{p(run.tax_withheld)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <details className="group">
                  <summary className="cursor-pointer text-body-medium text-button-ghost-foreground hover:underline">The entry ({run.lines.length} lines)</summary>
                  <table className="mt-2 w-full text-body-regular">
                    <tbody>
                      {run.lines.map((l) => (
                        <tr key={l.account_id} className="border-t border-separator-border">
                          <td className="py-1.5 pe-3">{l.code} · {l.name}</td>
                          <td className="py-1.5 text-end tabular-nums">{l.debit ? p(l.debit) : ""}</td>
                          <td className="py-1.5 text-end tabular-nums">{l.credit ? p(l.credit) : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
                {run.problems.length > 0 && <p role="alert" className="text-body-regular text-text-error-primary">{run.problems.join(" ")}</p>}
                {posted ? (
                  <p className="text-caption-1-regular text-text-tertiary">Posted. To post it again, reverse its entry on the <Link href={`/app/clients/${clientId}/books/tools#journal`} className="text-button-ghost-foreground hover:underline">Books</Link> page.</p>
                ) : books && run.problems.length === 0 ? (
                  <PostPayrollButton clientId={clientId} month={month} periodEnd={period || null} label={periodLabel(month, period || null)} />
                ) : null}
              </>
            )}
          </section>
        ))}
      </div>
    </Card>
  );
}
