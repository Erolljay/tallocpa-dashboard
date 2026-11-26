import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Form2307Sheet } from "@/components/bir/form-2307";
import { PrintButton } from "@/components/bir/print-button";
import { Skeleton } from "@/components/ui";
import { portal2307, portal2307Href } from "../scope";

export default function PortalPrint2307Page(props: PageProps<"/portal/reports/2307/print">) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Print searchParams={props.searchParams} />
    </Suspense>
  );
}

/** One of the client's BIR 2307s (?form=…) or all of the period's, one per printed page; locked months only. */
async function Print({ searchParams }: Pick<PageProps<"/portal/reports/2307/print">, "searchParams">) {
  const sp = await searchParams;
  const { client, set, by, supplier } = await portal2307(sp);
  // Only the period asked for: a period that is not (or no longer) locked is not printed.
  if (!client || !set || set.period.value !== sp.period) notFound();
  const key = typeof sp.form === "string" ? sp.form : "";
  const forms = key ? set.forms.filter((f) => f.key === key) : set.forms;
  if (forms.length === 0) notFound();
  return (
    <div className="space-y-6">
      <div className="space-y-2 print:hidden">
        <Link href={portal2307Href("", { client: client.id, period: set.period.value, by, supplier })} className="text-body-medium text-button-ghost-foreground hover:underline">← BIR 2307</Link>
        <h1 className="text-title-1-medium text-text-primary">{key ? `BIR 2307 · ${forms[0].payee.name}` : `BIR 2307s · ${set.period.label}`}</h1>
        <p className="text-body-regular text-text-secondary">
          {set.clientName}: {forms.length} certificate{forms.length === 1 ? "" : "s"}, one per page. Print them (or save as PDF), have your authorized representative sign, and give each supplier its copy.
        </p>
        <PrintButton label={forms.length > 1 ? "Print all" : undefined} />
      </div>
      <Form2307Sheet forms={forms} />
    </div>
  );
}
