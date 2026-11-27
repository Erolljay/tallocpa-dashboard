/**
 * Collections summary for the Collections Clerk (collections_summary): what was billed
 * and collected in a period, with the money collected split by what it is for, and
 * where the Owner deposits each part. A report only: nobody moves money from it.
 *
 * The app records what each payment paid: the Owner ticks the statement items a
 * deposit settles (public.payment_allocations, 20261201000001), so collections are
 * split by the items actually paid, never pro rata. Money received and not yet applied
 * to an item (the client's credit) is shown on its own.
 */

export const SUMMARY_BUCKETS = ["tax", "fees", "sss", "philhealth", "pagibig", "others"] as const;
export type SummaryBucket = (typeof SUMMARY_BUCKETS)[number];

export const bucketLabel: Record<SummaryBucket, string> = {
  tax: "Tax dues (BIR, remitted by the firm)",
  fees: "Retainers and professional fees",
  sss: "SSS remittances",
  philhealth: "PhilHealth remittances",
  pagibig: "Pag-IBIG (HDMF) remittances",
  others: "Others",
};

/** The remittance buckets, shown separately and as a subtotal. */
export const REMITTANCE_BUCKETS: readonly SummaryBucket[] = ["sss", "philhealth", "pagibig"];

/**
 * Where the Owner deposits each kind of money: a hint only, by bank name. The Owner may
 * change these names here. Never put account numbers in this file or anywhere else.
 */
export const DEPOSIT_TO: Record<SummaryBucket, string> = {
  tax: "UnionBank",
  sss: "Security Bank",
  philhealth: "Security Bank",
  pagibig: "Security Bank",
  fees: "BPI",
  others: "BPI",
};

/** A statement item as the database records it (client_dues.kind and .contribution). */
export interface ItemCategory {
  kind: string;
  contribution: string | null;
}

/**
 * Which bucket a statement item's money belongs to. client_dues.kind: 'tax' (a return's
 * tax due, firm-remits clients), 'retainer' (monthly fee), 'contribution' with
 * client_dues.contribution 'sss' | 'sss_loan' | 'philhealth' | 'pagibig' |
 * 'pagibig_loan', and 'other' (any other charge). Anything else goes to Others.
 */
export function bucketFor(item: ItemCategory): SummaryBucket {
  switch (item.kind) {
    case "tax":
      return "tax";
    case "retainer":
      return "fees";
    case "contribution":
      switch (item.contribution) {
        case "sss":
        case "sss_loan":
          return "sss";
        case "philhealth":
          return "philhealth";
        case "pagibig":
        case "pagibig_loan":
          return "pagibig";
        default:
          return "others";
      }
    default:
      return "others";
  }
}

/** The real name of what landed in Others, so nothing is hidden. */
export function othersName(item: ItemCategory & { description: string }): string {
  if (item.kind === "contribution") return `Contribution, agency not recorded: ${item.description}`;
  if (item.kind === "other") return `Other charge: ${item.description}`;
  if (item.kind === "unapplied") return "Received, not yet applied to a statement item (client credit)";
  return `${item.kind}: ${item.description}`;
}

export interface SummaryRow extends ItemCategory {
  source: "billed" | "collected" | "unapplied";
  description: string;
  amount: number | string;
}

const toCents = (v: number | string) => Math.round(Number(v) * 100);

/** Totals billed and collected by bucket, with the deposit hints. Sums in centavos. */
export function summarize(rows: SummaryRow[]) {
  const billed = Object.fromEntries(SUMMARY_BUCKETS.map((b) => [b, 0])) as Record<SummaryBucket, number>;
  const collected = { ...billed };
  const others = new Map<string, { billed: number; collected: number }>();
  for (const r of rows) {
    const bucket = r.source === "unapplied" ? "others" : bucketFor(r);
    const c = toCents(r.amount);
    if (r.source === "billed") billed[bucket] += c;
    else collected[bucket] += c;
    if (bucket === "others") {
      const name = othersName(r.source === "unapplied" ? { kind: "unapplied", contribution: null, description: "" } : r);
      const o = others.get(name) ?? { billed: 0, collected: 0 };
      if (r.source === "billed") o.billed += c;
      else o.collected += c;
      others.set(name, o);
    }
  }
  const sum = (o: Record<SummaryBucket, number>, keys: readonly SummaryBucket[] = SUMMARY_BUCKETS) => keys.reduce((s, k) => s + o[k], 0);
  const peso = (c: number) => c / 100;
  return {
    total_billed: peso(sum(billed)),
    total_collected: peso(sum(collected)),
    difference: peso(sum(billed) - sum(collected)),
    allocation: "as applied by the Owner" as const,
    by_bucket: SUMMARY_BUCKETS.map((b) => ({ bucket: b, label: bucketLabel[b], billed: peso(billed[b]), collected: peso(collected[b]), deposit_to: DEPOSIT_TO[b] })),
    remittances_subtotal: { billed: peso(sum(billed, REMITTANCE_BUCKETS)), collected: peso(sum(collected, REMITTANCE_BUCKETS)), deposit_to: DEPOSIT_TO.sss },
    others: [...others].map(([name, v]) => ({ name, billed: peso(v.billed), collected: peso(v.collected) })),
  };
}
