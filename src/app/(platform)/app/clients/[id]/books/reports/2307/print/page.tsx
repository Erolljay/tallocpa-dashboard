import { Suspense } from "react";
import { Form2307Sheet } from "@/components/bir/form-2307";
import { PrintButton } from "@/components/bir/print-button";
import { LinkButton, Notice, PageHeader, Skeleton } from "@/components/ui";
import { booksContext, one } from "../../../books-context";
import { load2307Staff } from "../scope";

export default function Print2307Page(props: PageProps<"/app/clients/[id]/books/reports/2307/print">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Print params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/** One BIR 2307 (?form=…) or all of the period's (optionally one supplier's), one per printed page. */
async function Print({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/reports/2307/print">, "params" | "searchParams">) {
  const c = await booksContext(params, searchParams);
  const { set, by, supplier, period } = await load2307Staff(c);
  const key = one(c.sp.form);
  const forms = key ? set.forms.filter((f) => f.key === key) : set.forms;
  const back = new URLSearchParams({ month: c.month, by });
  if (supplier) back.set("supplier", supplier);
  const warned = forms.filter((f) => f.warnings.length > 0);
  const title = key && forms[0] ? `BIR 2307 · ${forms[0].payee.name}` : `BIR 2307s · ${period.label}`;
  return (
    <>
      <div className="print:hidden">
        <PageHeader
          title={title}
          description={<>{c.client.name}: {forms.length} certificate{forms.length === 1 ? "" : "s"}, one per page (A4 portrait). Sign as the payor&rsquo;s authorized representative and give each supplier its copy.</>}
          actions={
            <>
              <LinkButton href={`/app/clients/${c.id}/books/reports/2307?${back.toString()}`} variant="ghost">Back</LinkButton>
              {forms.length > 0 && <PrintButton label={forms.length > 1 ? "Print all" : undefined} />}
            </>
          }
        />
        <div className="mb-6 space-y-3">
          {forms.length === 0 && <Notice tone="waiting">No 2307 to print for {period.label}.</Notice>}
          {set.openMonths.length > 0 && <Notice tone="waiting">The Books are not locked for {set.openMonths.join(", ")}: these figures may still change.</Notice>}
          {warned.length > 0 && (
            <Notice tone="waiting">
              <ul className="list-disc ps-5">{warned.map((f) => <li key={f.key}><span className="text-body-medium">{f.payee.name}:</span> {f.warnings.join(" ")}</li>)}</ul>
            </Notice>
          )}
        </div>
      </div>
      <Form2307Sheet forms={forms} />
    </>
  );
}
