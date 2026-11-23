import { Suspense } from "react";
import { Card, PageHeader, Skeleton } from "@/components/ui";
import { requireStaff } from "@/lib/auth";
import { PartyForm } from "../forms";

export default function NewPartyPage() {
  return (
    <>
      <PageHeader title="New party" description="A customer or supplier, as registered with the BIR. Type it from their COR or a 2307." />
      <Suspense fallback={<Skeleton rows={6} />}>
        <NewParty />
      </Suspense>
    </>
  );
}

async function NewParty() {
  await requireStaff();
  return (
    <Card className="max-w-3xl">
      <PartyForm />
    </Card>
  );
}
