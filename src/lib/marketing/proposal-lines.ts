/**
 * Prices a proposal draft's lines from the active fee schedule (the Marketing Team's
 * draft_proposal). Pure. The price always comes from the schedule: the Marketing Team
 * names items and quantities, never amounts. Multiplier items (a factor of another fee)
 * are left to the Owner's quote engine; price-on-request items are listed without a price.
 */

export interface ScheduleItem {
  code: string;
  component: string;
  label: string;
  band_label: string | null;
  billing: "monthly" | "annual" | "one_time" | "per_unit_monthly" | "multiplier";
  price: string | number | null;
  is_custom_quote: boolean;
  unit_label: string | null;
}

export interface PricedLine {
  code: string;
  label: string;
  billing: ScheduleItem["billing"];
  quantity: number;
  /** Pesos for the line, or null when the price is on request. */
  amount: number | null;
  /** How the line reads for the Owner. */
  display: string;
  /** Set when the line cannot be proposed this way. */
  refusal?: string;
}

const money = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });
const PER: Record<string, string> = { monthly: "a month", annual: "a year", one_time: "one time", per_unit_monthly: "a month" };

export function feeLine(item: ScheduleItem, quantity: number): PricedLine {
  const label = item.band_label ? `${item.label} (${item.band_label})` : item.label;
  const base = { code: item.code, label, billing: item.billing, quantity };
  if (item.billing === "multiplier") {
    return { ...base, amount: null, display: "applied by the quote engine", refusal: `${item.code} is a multiplier; leave it to the Owner's quote.` };
  }
  if (item.is_custom_quote) return { ...base, amount: null, display: "price on request" };
  if (item.price === null || item.price === undefined) {
    return { ...base, amount: null, display: "no price set", refusal: `${item.code} has no price in the schedule yet; ask the Owner.` };
  }
  if (quantity > 1 && item.billing !== "per_unit_monthly") {
    return { ...base, amount: null, display: "", refusal: `${item.code} is not priced per unit; propose it once.` };
  }
  const amount = Math.round(Number(item.price) * quantity * 100) / 100;
  const unit = item.billing === "per_unit_monthly" && item.unit_label ? ` (${quantity} ${item.unit_label})` : "";
  return { ...base, amount, display: `${money.format(amount)} ${PER[item.billing]}${unit}` };
}

export interface ProposalTotals {
  monthly: number;
  annual: number;
  one_time: number;
  /** Twelve months of the monthly fees, plus the annual and one-time fees. */
  first_year: number;
  on_request: string[];
}

export function proposalTotals(lines: PricedLine[]): ProposalTotals {
  const cents = (b: (l: PricedLine) => boolean) => lines.filter((l) => l.amount !== null && b(l)).reduce((s, l) => s + Math.round(l.amount! * 100), 0);
  const monthly = cents((l) => l.billing === "monthly" || l.billing === "per_unit_monthly");
  const annual = cents((l) => l.billing === "annual");
  const oneTime = cents((l) => l.billing === "one_time");
  return {
    monthly: monthly / 100,
    annual: annual / 100,
    one_time: oneTime / 100,
    first_year: (monthly * 12 + annual + oneTime) / 100,
    on_request: lines.filter((l) => l.amount === null && !l.refusal).map((l) => `${l.code} ${l.label}`),
  };
}
