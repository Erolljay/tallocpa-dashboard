import { showDate } from "@/lib/filings/labels";

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

type Shared = {
  soa: { reference: string; due_on: string };
  client: { name: string };
  brand: { display_name: string };
  totalDue: number;
};

/** The note the Owner pastes into Viber, Messenger, SMS or email before the statement's link. */
export function shareMessage(s: Shared): string {
  const firm = s.brand.display_name || "Tallo CPA";
  if (s.totalDue <= 0) {
    return `Hi ${s.client.name}, here is your Statement of Account ${s.soa.reference} from ${firm}. Nothing is due on it. Thank you!`;
  }
  return [
    `Hi ${s.client.name}, here is your Statement of Account ${s.soa.reference} from ${firm}.`,
    `Total amount due: ${peso.format(s.totalDue)}, payable by ${showDate(s.soa.due_on)}.`,
    `Open the link to see the details and our bank and e-wallet accounts (with QR codes). Please put ${s.soa.reference} in the transfer note. Thank you!`,
  ].join("\n");
}
