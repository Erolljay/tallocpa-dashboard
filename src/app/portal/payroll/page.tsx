import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, Skeleton } from "@/components/ui";
import { showMonth } from "@/lib/documents/labels";
import { manilaToday } from "@/lib/filings/run";
import { portalContext } from "../client-context";
import { PortalPayrollUpload } from "./upload";

export default function PortalPayroll() {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <Payroll />
    </Suspense>
  );
}

const STATUS = { pending: ["Waiting for review", "progress"], posted: ["Recorded", "done"], returned: ["Returned", "blocked"] } as const;
const when = (iso: string) => new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "Asia/Manila" }).format(new Date(iso));

/**
 * Client portal payroll: download the month's register (columns = the business's payslip items,
 * rows = its employees), upload it filled in, and follow what happened to each one sent.
 * Client users never see the recorded payroll itself, only their own submissions.
 */
async function Payroll() {
  const { supabase, clients } = await portalContext();
  const ids = clients.map((c) => c.id);
  const [{ data: items }, { data: subs }, { data: releases }] = await Promise.all([
    supabase.from("payroll_items").select("client_id").in("client_id", ids).eq("active", true),
    supabase.from("payroll_submissions").select("id, client_id, pay_month, file_name, status, return_reason, late, created_at").in("client_id", ids).order("created_at", { ascending: false }).limit(50),
    supabase.from("payroll_2316_releases").select("client_id, year, released_at").in("client_id", ids).order("year", { ascending: false }),
  ]);
  const ready = clients.filter((c) => (items ?? []).some((i) => i.client_id === c.id));
  const today = manilaToday();
  const months = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(`${today.slice(0, 7)}-01T00:00:00Z`);
    d.setUTCMonth(d.getUTCMonth() - i);
    return d.toISOString().slice(0, 10);
  });
  const nameOf = new Map(clients.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl font-semibold text-ink-heading">Payroll</h1>
      {ready.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border-strong bg-surface p-6 text-sm text-ink-muted">Payroll is not set up for your business yet. We will tell you when you can send it here.</p>
      ) : (
        <Card title="Send your payroll">
          <PortalPayrollUpload clients={ready.map((c) => ({ id: c.id, name: c.name }))} months={months} />
        </Card>
      )}
      {(releases ?? []).length > 0 && (
        <section className="space-y-2">
          <h2 className="font-medium text-ink-heading">BIR 2316 certificates</h2>
          <p className="text-sm text-ink-muted">Your employees&rsquo; Certificates of Compensation Payment / Tax Withheld, ready to print, sign and give to each employee.</p>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-surface text-sm shadow-sm">
            {releases!.map((r) => (
              <li key={`${r.client_id}:${r.year}`} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-ink-heading">{r.year}{clients.length > 1 ? ` · ${nameOf.get(r.client_id)}` : ""}</p>
                  <p className="text-xs text-ink-subtle">released {when(r.released_at)}</p>
                </div>
                <Link href={`/portal/payroll/2316/${r.client_id}/${r.year}`} className="text-link hover:underline">Print 2316s</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {(subs ?? []).length > 0 && (
        <section className="space-y-2">
          <h2 className="font-medium text-ink-heading">Sent</h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-surface text-sm shadow-sm">
            {subs!.map((s) => {
              const [label, tone] = STATUS[s.status as keyof typeof STATUS];
              return (
                <li key={s.id} className="space-y-1 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-ink-heading">{showMonth(s.pay_month)} · {s.file_name}</p>
                      <p className="text-xs text-ink-subtle">sent {when(s.created_at)}{s.late ? " · late" : ""}{clients.length > 1 ? ` · ${nameOf.get(s.client_id)}` : ""}</p>
                    </div>
                    <Badge tone={tone}>{label}</Badge>
                  </div>
                  {s.status === "returned" && <p className="text-sm text-danger-text">Reason: “{s.return_reason}”. Fix the file and send it again.</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
