import Link from "next/link";
import { Suspense } from "react";
import { Badge, Card, LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase/server";
import { loadSchedules, longDate, nextEffectiveDate, statusLabel, statusTone } from "./data";
import { CreateFromTemplateForm, StartNewVersionForm } from "./forms";

export default function FeeSchedulePage() {
  return (
    <>
      <PageHeader
        title="Fee schedule"
        description="The price list for new clients. Quotes, and later proposals and the website calculator, read from the active schedule. Existing clients keep their fees until their annual renewal."
        actions={
          <>
            <LinkButton href="/app/settings/fees/quote" variant="secondary">Quote preview</LinkButton>
            <LinkButton href="/app/settings/fees/gap" variant="secondary">Current clients</LinkButton>
          </>
        }
      />
      <Suspense fallback={<Skeleton rows={5} />}>
        <Schedules />
      </Suspense>
    </>
  );
}

async function Schedules() {
  const owner = await requireOwner();
  const supabase = await supabaseServer();
  const schedules = await loadSchedules(supabase, owner.staff.brandId);
  const ids = schedules.map((s) => s.id);
  const { data: items } = ids.length ? await supabase.from("fee_items").select("schedule_id, price, is_custom_quote").in("schedule_id", ids) : { data: [] };
  const counts = new Map<string, { total: number; unpriced: number }>();
  for (const i of items ?? []) {
    const c = counts.get(i.schedule_id) ?? { total: 0, unpriced: 0 };
    c.total += 1;
    if (i.price === null && !i.is_custom_quote) c.unpriced += 1;
    counts.set(i.schedule_id, c);
  }
  const active = schedules.find((s) => s.status === "active");
  const defaultDate = nextEffectiveDate(active?.effective_from ?? null);

  return (
    <div className="space-y-6">
      {!active && (
        <Notice tone="waiting">
          No fee schedule is active yet. Quotes and the current-clients report need one. Create a draft from the template, enter the prices, then activate it. The prices are yours to set (open item O2).
        </Notice>
      )}

      <Card title="Schedules">
        {schedules.length === 0 ? (
          <p className="text-body-regular text-text-secondary">None yet.</p>
        ) : (
          <ul className="divide-y divide-separator-border">
            {schedules.map((s) => {
              const c = counts.get(s.id) ?? { total: 0, unpriced: 0 };
              return (
                <li key={s.id}>
                  <Link href={`/app/settings/fees/${s.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 hover:bg-background-secondary-hover sm:-mx-2 sm:rounded-lg sm:px-2">
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-text-primary">{s.name}</span>
                      <span className="block text-body-regular text-text-secondary">
                        Takes effect {longDate(s.effective_from)}
                        {s.status === "draft" && (c.unpriced ? ` · ${c.unpriced} of ${c.total} items without a price` : ` · all ${c.total} items priced`)}
                        {s.status === "retired" && s.retired_at && ` · retired ${longDate(s.retired_at)}`}
                      </span>
                    </span>
                    <Badge tone={statusTone[s.status]}>{statusLabel[s.status]}</Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-4 space-y-3">
          {active && <StartNewVersionForm defaultDate={defaultDate} activeName={active.name} />}
          <CreateFromTemplateForm defaultDate={defaultDate} />
        </div>
      </Card>
    </div>
  );
}
