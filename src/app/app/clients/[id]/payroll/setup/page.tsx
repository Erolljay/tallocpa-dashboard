import { Suspense } from "react";
import { Card, LinkButton, PageHeader, Skeleton } from "@/components/ui";
import { loadItems, payrollAccess } from "@/lib/payroll/data";
import { CATEGORIES, CATEGORY_KEYS, ITEM_KINDS, sortItems } from "@/lib/payroll/items";
import { ItemForm } from "../forms";

export default function PayrollSetupPage(props: PageProps<"/app/clients/[id]/payroll/setup">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Setup params={props.params} />
    </Suspense>
  );
}

async function Setup({ params }: Pick<PageProps<"/app/clients/[id]/payroll/setup">, "params">) {
  const { id } = await params;
  const { supabase, client } = await payrollAccess(id);
  const items = sortItems(await loadItems(supabase, id, true));
  const usedCounts = await Promise.all(
    items.map((i) => supabase.from("payroll_entry_lines").select("id", { count: "exact", head: true }).eq("item_id", i.id).then((r) => [i.id, (r.count ?? 0) > 0] as const)),
  );
  const used = new Map(usedCounts);

  return (
    <>
      <PageHeader
        title="Payslip items"
        description={<>{client.name}: the earnings, deductions and employer contributions on this client&rsquo;s payroll. Each is a column of the Excel register and maps to a BIR category, which decides how it is taxed.</>}
        actions={<LinkButton href={`/app/clients/${id}/payroll`} variant="ghost">Back to payroll</LinkButton>}
      />
      <div className="space-y-6">
        {(["earning", "deduction", "employer_contribution"] as const).map((k) => (
          <Card key={k} title={`${ITEM_KINDS[k]}s`}>
            <ul className="space-y-4 divide-y divide-border">
              {items.filter((i) => i.kind === k).map((i) => (
                <li key={i.id} className="pt-4 first:pt-0"><ItemForm clientId={id} item={i} used={used.get(i.id) ?? false} /></li>
              ))}
            </ul>
          </Card>
        ))}
        <Card title="Add an item">
          <ItemForm clientId={id} item={null} used={false} />
        </Card>
        <Card title="What the BIR categories mean">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {CATEGORY_KEYS.map((c) => (
              <div key={c}>
                <dt className="font-medium text-ink-heading">{CATEGORIES[c].label} <span className="font-normal text-ink-subtle">· {ITEM_KINDS[CATEGORIES[c].kind]}</span></dt>
                <dd className="text-ink-muted">{CATEGORIES[c].help}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-ink-muted">An item already used on the payroll cannot be deleted or change category; deactivate it and add a new one. Deactivated items leave the Excel register but stay in past months.</p>
        </Card>
      </div>
    </>
  );
}
