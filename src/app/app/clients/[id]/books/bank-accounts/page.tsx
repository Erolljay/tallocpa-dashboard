import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { BankAccounts } from "../module-pages";

export default function BankAccountsRoute(props: PageProps<"/app/clients/[id]/books/bank-accounts">) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <BankAccounts params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
