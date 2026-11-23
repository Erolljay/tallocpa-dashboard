import { Suspense } from "react";
import { PageHeader, Skeleton } from "@/components/ui";
import { requireOwner } from "@/lib/auth";
import { NewClientForm } from "./new-client-form";

export default function NewClientPage() {
  return (
    <>
      <PageHeader title="New client" description="Enter the details from the client's Certificate of Registration (BIR Form 2303)." />
      <Suspense fallback={<Skeleton rows={8} />}>
        <OwnerOnly />
      </Suspense>
    </>
  );
}

async function OwnerOnly() {
  await requireOwner();
  return <NewClientForm />;
}
