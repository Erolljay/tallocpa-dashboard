import { Suspense } from "react";
import { Form2307List, Form2307Pickers } from "@/components/bir/form-2307-list";
import { LinkButton, Notice, Skeleton } from "@/components/ui";
import { BY_2307 } from "@/lib/books/form-2307";
import { BooksFrame } from "../../books-frame";
import { booksContext } from "../../books-context";
import { load2307Staff, print2307Href } from "./scope";

export default function Staff2307Page(props: PageProps<"/app/clients/[id]/books/reports/2307">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <Certificates params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

/**
 * BIR 2307s the client issues to its suppliers for the EWT on its Purchase Invoices:
 * per quarter (the quarter of the Books month), per month or per transaction (the Books
 * month), for every supplier or one; each to view and print, or all at once.
 */
async function Certificates({ params, searchParams }: Pick<PageProps<"/app/clients/[id]/books/reports/2307">, "params" | "searchParams">) {
  const c = await booksContext(params, searchParams);
  const { set, by, supplier, period } = await load2307Staff(c);
  const path = `/app/clients/${c.id}/books/reports/2307`;
  return (
    <BooksFrame range={c.range} supabase={c.supabase} clientId={c.id} clientName={c.client.name} booksStart={c.books.booksStart} month={c.month} active="reports" sub="/2307" query={{ by, supplier }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-title-2-medium text-text-primary">BIR 2307 to suppliers</h2>
          <p className="mt-1 text-body-regular text-text-secondary">
            Certificates of Creditable Tax Withheld at Source (BIR Form 2307, January 2018 ENCS) for the EWT on Purchase Invoices: {BY_2307[set.by].toLowerCase()}, {period.label}.
          </p>
        </div>
        {set.forms.length > 0 && (
          <LinkButton href={print2307Href(c.id, c.month, set.by, supplier)}>
            {supplier ? "Print this supplier's 2307s" : set.by === "quarter" ? "Print all suppliers for the quarter" : "Print all"}
          </LinkButton>
        )}
      </div>
      <div className="rounded-3xl border border-border-button-default bg-background-primary-default p-5">
        <Form2307Pickers action={path} hidden={{ month: c.month }} period={period} by={set.by} suppliers={set.suppliers} supplier={supplier} />
        <p className="mt-3 text-caption-1-regular text-text-tertiary">
          The period follows the Books month above: per quarter, its calendar quarter; per month and per transaction, the month. The authorized representative is the one in Payroll setup (as on the 2316); the client&rsquo;s ZIP code comes from the client&rsquo;s record. The client prints these in the portal once the months are locked.
        </p>
      </div>
      {set.openMonths.length > 0 && (
        <Notice tone="waiting">The Books are not locked for {set.openMonths.join(", ")}: these figures may still change, and the client does not see them in the portal yet.</Notice>
      )}
      {set.forms.length === 0 ? (
        <Notice tone="waiting">No Purchase Invoice with EWT (a WC / WI withholding code) in {period.label}{supplier ? " for this supplier" : ""}.</Notice>
      ) : (
        <Form2307List forms={set.forms} hrefFor={(f) => print2307Href(c.id, c.month, set.by, supplier, f.key)} />
      )}
    </BooksFrame>
  );
}
