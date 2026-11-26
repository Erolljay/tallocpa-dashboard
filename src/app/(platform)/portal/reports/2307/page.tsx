import Link from "next/link";
import { Suspense } from "react";
import { Form2307List, Form2307Pickers } from "@/components/bir/form-2307-list";
import { LinkButton, Select, Skeleton } from "@/components/ui";
import { BY_2307 } from "@/lib/books/form-2307";
import { portal2307, portal2307Href } from "./scope";

export default function Portal2307Page(props: PageProps<"/portal/reports/2307">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Portal2307 searchParams={props.searchParams} />
    </Suspense>
  );
}

const empty = "rounded-3xl border border-dashed border-border-button-default bg-background-primary-default p-6 text-body-regular text-text-secondary";

/**
 * The client's BIR 2307s to its suppliers, for the EWT it withheld on its purchases:
 * per quarter, month or transaction, for months whose books are locked. Rendered on the
 * server from books_2307_data(); client users never read the Books themselves.
 */
async function Portal2307({ searchParams }: Pick<PageProps<"/portal/reports/2307">, "searchParams">) {
  const { clients, client, periods, set, by, supplier } = await portal2307(await searchParams);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/portal/reports" className="text-body-medium text-button-ghost-foreground hover:underline">← Reports</Link>
        <h1 className="text-title-1-medium text-text-primary">BIR 2307 to your suppliers</h1>
        <p className="text-body-regular text-text-secondary">
          Certificates of Creditable Tax Withheld at Source (BIR Form 2307) for the tax you withheld on your suppliers&rsquo; invoices. Print them (or save as PDF), have your authorized representative sign, and give each supplier its copy. Months appear once we have closed their books.
        </p>
      </div>

      {!client ? (
        <p className={empty}>Your account is not linked to a business yet.</p>
      ) : !set ? (
        <p className={empty}>No month of {client.name}&rsquo;s books is closed yet. Your 2307s will appear here once it is.</p>
      ) : (
        <>
          <div className="space-y-3 rounded-3xl border border-border-button-default bg-background-primary-default p-5">
            <Form2307Pickers
              action="/portal/reports/2307"
              hidden={clients.length > 1 ? {} : { client: client.id }}
              leading={clients.length > 1 && (
                <label className="flex min-w-40 flex-col gap-1.5 text-body-medium text-text-primary">
                  Business
                  <Select name="client" defaultValue={client.id}>
                    {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </Select>
                </label>
              )}
              periods={periods}
              period={set.period}
              by={set.by}
              suppliers={set.suppliers}
              supplier={supplier}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-body-regular text-text-secondary">
              {set.forms.length} certificate{set.forms.length === 1 ? "" : "s"} · {BY_2307[set.by].toLowerCase()} · {set.period.label}
            </p>
            {set.forms.length > 0 && (
              <LinkButton href={portal2307Href("/print", { client: client.id, period: set.period.value, by, supplier })}>
                {supplier ? "Print this supplier's 2307s" : set.by === "quarter" ? "Print all suppliers for the quarter" : "Print all"}
              </LinkButton>
            )}
          </div>
          {set.forms.length === 0 ? (
            <p className={empty}>No tax withheld from suppliers in {set.period.label}{supplier ? " for this supplier" : ""}.</p>
          ) : (
            <Form2307List
              forms={set.forms}
              showWarnings={false}
              hrefFor={(f) => portal2307Href("/print", { client: client.id, period: set.period.value, by, supplier, form: f.key })}
            />
          )}
        </>
      )}
    </div>
  );
}
