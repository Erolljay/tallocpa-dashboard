import { Suspense } from "react";
import { Notice, PageHeader, Skeleton } from "@/components/ui";
import { addDays } from "@/lib/deadlines/dates";
import { requireStaff } from "@/lib/auth";
import { manilaToday } from "@/lib/filings/run";
import { supabaseServer } from "@/lib/supabase/server";
import { FilingTable, type FilingListRow } from "./filing-table";
import { GenerateButton } from "./generate-button";

export default function DeadlinesPage() {
  return (
    <>
      <PageHeader title="Deadlines" description="BIR filings for your clients: anything overdue, then the next 60 days. Created every night from each client's obligations." />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Deadlines />
      </Suspense>
    </>
  );
}

const select = "id, form, period_label, due_date, statutory_due_date, status, clients(id, name, code)";

async function Deadlines() {
  const me = await requireStaff();
  const supabase = await supabaseServer();
  const today = manilaToday();
  const [overdue, upcoming] = await Promise.all([
    supabase.from("filing_instances").select(select).lt("due_date", today).not("status", "in", "(filed,paid,proof_uploaded)").order("due_date").limit(200),
    supabase.from("filing_instances").select(select).gte("due_date", today).lte("due_date", addDays(today, 60)).order("due_date").limit(500),
  ]);
  const rows = [...((overdue.data ?? []) as unknown as FilingListRow[]), ...((upcoming.data ?? []) as unknown as FilingListRow[])];
  return (
    <div className="space-y-6">
      <Notice>Deadline rules and holidays are starting figures and have not been checked against current BIR issuances yet.</Notice>
      {me.staff.role === "owner" && <GenerateButton />}
      <FilingTable rows={rows} today={today} empty="No filings yet. Add clients with tax types, then generate filings." />
    </div>
  );
}
