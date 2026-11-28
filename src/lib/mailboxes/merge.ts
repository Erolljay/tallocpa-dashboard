/**
 * Which mailboxes to read (pure): the mailboxes the Owner connected in Settings →
 * Mailboxes, then the ones set in the environment (the eSubmission mailbox, an optional
 * payment mailbox), each address once. A connected mailbox wins over the environment's
 * copy of the same address, so its last check and errors show in Settings.
 */
export type Purpose = "bir_mail" | "payment_mail";

export interface MailboxRef<T> {
  email: string;
  /** The connected mailbox's id; null for a mailbox set in the environment. */
  connectedId: string | null;
  data: T;
}

export function mergeMailboxes<T>(connected: MailboxRef<T>[], fromEnv: MailboxRef<T>[]): MailboxRef<T>[] {
  const seen = new Set<string>();
  const out: MailboxRef<T>[] = [];
  for (const m of [...connected, ...fromEnv]) {
    const key = m.email.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ ...m, email: key });
  }
  return out;
}

/** An RFC 822 Message-ID, normalised for comparison ("<abc@x>" → "abc@x"); null when absent. */
export function messageIdKey(header: string | null | undefined): string | null {
  const v = (header ?? "").trim().replace(/^<|>$/g, "").trim().toLowerCase();
  return v ? v.slice(0, 500) : null;
}
