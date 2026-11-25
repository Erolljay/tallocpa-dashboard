import Link from "next/link";
import { Badge, peso } from "@/components/ui";
import { showDate } from "@/lib/filings/labels";
import { PROOF_STATUS, type OpenStatementItem, type PaymentProof } from "@/lib/collections/statement";
import { ProofReview } from "./proof-review";

const proofMethod: Record<PaymentProof["method"], string> = {
  transfer: "Online transfer",
  check: "Check",
  deposit: "Bank deposit",
};

/**
 * Payments the client sent, newest first: Pending verification, then Verified
 * (with the items the Owner ticked it against) or Rejected (with the reason).
 * The Owner verifies a pending one here, ticking the items it pays from
 * `openItems`, or rejects it. `statementHref` links each payment to its
 * statement (the portal Billing list spans statements).
 */
export function PaymentsList({
  proofs,
  owner = false,
  openItems = [],
  statementHref,
}: {
  proofs: PaymentProof[];
  owner?: boolean;
  openItems?: OpenStatementItem[];
  statementHref?: (soaId: string) => string;
}) {
  return (
    <ul className="divide-y divide-separator-border">
      {proofs.map((p) => {
        const status = p.reversed ? { tone: "neutral" as const, label: "Reversed" } : PROOF_STATUS[p.status];
        return (
          <li key={p.id} className="space-y-3 py-4 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-0.5">
                <p className="text-body-medium tabular-nums text-text-primary">
                  {peso.format(p.amount)} <span className="text-text-secondary">· paid {showDate(p.paid_on)}</span>
                </p>
                <p className="text-caption-1-regular text-text-tertiary">
                  {proofMethod[p.method]}
                  {p.institution ? ` to ${p.institution}` : ""}
                  {p.reference ? ` · ${p.method === "check" ? "Check no." : "Ref."} ${p.reference}` : ""}
                </p>
                {statementHref && p.soa_reference && (
                  <p className="text-caption-1-regular text-text-tertiary">
                    For{" "}
                    <Link href={statementHref(p.soa_id)} className="tabular-nums text-button-ghost-foreground hover:underline">
                      {p.soa_reference}
                    </Link>
                  </p>
                )}
              </div>
              <div className="shrink-0">
                <Badge tone={status.tone}>{status.label}</Badge>
              </div>
            </div>

            {p.status === "for_verification" && !owner && (
              <p className="text-body-regular text-text-secondary">We are checking this payment against our bank. You will see Verified here once it is confirmed.</p>
            )}
            {p.status === "rejected" && p.reject_reason && (
              <p className="rounded-xl bg-background-secondary-default px-3 py-2 text-body-regular text-text-error-primary">Not verified: {p.reject_reason}</p>
            )}
            {p.status === "verified" && p.reversed && (
              <p className="text-body-regular text-text-secondary">This payment was reversed. Please contact us if you have questions.</p>
            )}
            {p.status === "verified" && !p.reversed && <VerifiedItems p={p} />}

            {p.fileUrl && (
              <a href={p.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex text-body-regular text-button-ghost-foreground hover:underline pointer-coarse:min-h-11 pointer-coarse:items-center">
                View {p.method === "transfer" ? "proof of payment" : "deposit slip"}
              </a>
            )}
            {p.status === "for_verification" && owner && <ProofReview soaId={p.soa_id} proofId={p.id} amount={p.amount} paidOn={p.paid_on} items={openItems} />}
          </li>
        );
      })}
    </ul>
  );
}

/** What a verified payment paid: the items the Owner ticked, then any its leftover credit paid later, and the credit still unused. */
function VerifiedItems({ p }: { p: PaymentProof }) {
  const ticked = p.paidItems.filter((i) => !i.fromCredit);
  const later = p.paidItems.filter((i) => i.fromCredit);
  const left = credit(p);
  return (
    <div className="space-y-2 rounded-xl bg-background-secondary-default px-3 py-2">
      <div>
        <p className="text-caption-1-medium text-text-secondary">
          Verified{p.reviewed_at ? ` ${showDate(p.reviewed_at.slice(0, 10))}` : ""}. {ticked.length > 0 ? "Paid:" : "Kept as credit."}
        </p>
        {ticked.length > 0 && <ItemList items={ticked} />}
      </div>
      {later.length > 0 && (
        <div>
          <p className="text-caption-1-medium text-text-secondary">Later, from the credit:</p>
          <ItemList items={later} />
        </div>
      )}
      {left > 0 && <p className="text-caption-1-regular text-text-secondary">{peso.format(left)} kept as credit for your next statement.</p>}
    </div>
  );
}

function ItemList({ items }: { items: PaymentProof["paidItems"] }) {
  return (
    <ul className="mt-1 space-y-0.5 text-body-regular">
      {items.map((item) => (
        <li key={item.dueId} className="flex items-baseline justify-between gap-3">
          <span className="min-w-0 text-text-primary">{item.description}</span>
          <span className="shrink-0 tabular-nums text-text-secondary">{peso.format(item.amount)}</span>
        </li>
      ))}
    </ul>
  );
}

/** The part of a verified payment not applied to any item (the client's credit). */
function credit(p: PaymentProof) {
  return Math.round(((p.depositAmount ?? p.amount) - p.paidItems.reduce((s, i) => s + i.amount, 0)) * 100) / 100;
}
