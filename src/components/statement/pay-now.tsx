"use client";

import { Building2, Check, Copy, Wallet } from "lucide-react";
import { useState } from "react";
import type { PayAccount } from "@/lib/collections/statement";

/**
 * "Pay now": the client chooses a bank or e-wallet and sees its QR code, account
 * name and number. Tax money goes to the client-tax-funds account when there is
 * one (Q26); fees go to the firm's own accounts.
 */
export function PayNow({ accounts, reference, hasTax }: { accounts: PayAccount[]; reference: string; hasTax: boolean }) {
  const [chosen, setChosen] = useState(accounts[0]?.id ?? null);
  const account = accounts.find((a) => a.id === chosen) ?? null;
  const hasTaxAccount = accounts.some((a) => a.purpose === "client_tax_funds");

  if (accounts.length === 0) {
    return <p className="text-sm text-ink-muted">Payment details will appear here once the firm adds them. Please contact us for how to pay.</p>;
  }

  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Pay through" className="grid gap-2 sm:grid-cols-2">
        {accounts.map((a) => {
          const on = a.id === chosen;
          const Icon = a.kind === "bank" ? Building2 : Wallet;
          return (
            <button
              key={a.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setChosen(a.id)}
              className={`pressable flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 text-left ${
                on ? "border-action bg-surface-tint shadow-sm" : "border-border bg-surface hover:bg-surface-muted"
              }`}
            >
              <Icon aria-hidden className={`size-5 shrink-0 ${on ? "text-ink-on-tint" : "text-accent"}`} strokeWidth={2} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink-heading">{a.institution}</span>
                <span className="block text-xs text-ink-subtle">{a.purpose === "client_tax_funds" ? "For tax payments" : "For our fees"}</span>
              </span>
              {on && <Check aria-hidden className="size-4 shrink-0 text-ink-on-tint" strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      {account && (
        <div className="grid gap-5 rounded-2xl bg-surface-muted p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          {account.qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
            <img src={account.qrUrl} alt={`QR code for ${account.institution}`} className="mx-auto size-48 rounded-xl border border-border bg-white object-contain p-2 sm:mx-0" />
          ) : (
            <div className="mx-auto grid size-48 place-items-center rounded-xl border border-dashed border-border-strong p-4 text-center text-sm text-ink-muted sm:mx-0">No QR code for this account</div>
          )}
          <dl className="space-y-3">
            <Detail label="Account name" value={account.account_name} />
            <Detail label="Account number" value={account.account_number} copy mono />
            <Detail label="Payment reference" value={reference} copy mono />
            {account.instructions && <p className="text-sm text-ink-muted">{account.instructions}</p>}
          </dl>
        </div>
      )}
      <p className="text-sm text-ink-muted">
        Put the payment reference in the transfer note so we can match your payment.
        {hasTax && hasTaxAccount ? " Please send tax amounts to the account marked for tax payments, and our fees to an account for our fees." : ""}
      </p>
    </div>
  );
}

function Detail({ label, value, copy, mono }: { label: string; value: string; copy?: boolean; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <dt className="text-xs text-ink-subtle">{label}</dt>
      <dd className="flex items-center gap-2">
        <span className={`text-[17px] font-semibold text-ink-heading ${mono ? "tabular-nums tracking-wide" : ""}`}>{value}</span>
        {copy && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(value.replace(/\s/g, "")).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="pressable inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-link hover:bg-surface-sunken pointer-coarse:min-h-9"
          >
            {copied ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : <Copy aria-hidden className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </dd>
    </div>
  );
}
