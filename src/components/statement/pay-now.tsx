"use client";

import { RiBuilding2Line, RiCheckLine, RiFileCopyLine, RiWallet3Line } from "@remixicon/react";
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
    return <p className="text-body-regular text-text-secondary">Payment details will appear here once the firm adds them. Please contact us for how to pay.</p>;
  }

  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Pay through" className="grid gap-2 sm:grid-cols-2">
        {accounts.map((a) => {
          const on = a.id === chosen;
          const Icon = a.kind === "bank" ? RiBuilding2Line : RiWallet3Line;
          return (
            <button
              key={a.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setChosen(a.id)}
              className={`pressable flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 text-start ${
                on ? "border-accent-500 bg-button-ghost-background shadow-xs" : "border-separator-border bg-background-primary-default hover:bg-background-secondary-hover"
              }`}
            >
              <Icon aria-hidden className={`size-5 shrink-0 ${on ? "text-button-ghost-foreground" : "text-button-ghost-foreground"}`} />
              <span className="min-w-0 flex-1">
                <span className="block text-body-medium text-text-primary">{a.institution}</span>
                <span className="block text-caption-1-regular text-text-tertiary">{a.purpose === "client_tax_funds" ? "For tax payments" : "For our fees"}</span>
              </span>
              {on && <RiCheckLine aria-hidden className="size-4 shrink-0 text-button-ghost-foreground" />}
            </button>
          );
        })}
      </div>

      {account && (
        <div className="grid gap-5 rounded-2xl bg-background-secondary-default p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          {account.qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
            <img src={account.qrUrl} alt={`QR code for ${account.institution}`} className="mx-auto size-48 rounded-xl border border-separator-border bg-white object-contain p-2 sm:mx-0" />
          ) : (
            <div className="grid place-items-center rounded-xl border border-dashed border-border-button-default px-3 py-2 text-center text-caption-1-regular text-text-secondary sm:size-48 sm:p-4 sm:text-body-regular">No QR code for this account</div>
          )}
          <dl className="space-y-3">
            <Detail label="Account name" value={account.account_name} />
            <Detail label="Account number" value={account.account_number} copy mono />
            <Detail label="Payment reference" value={reference} copy mono />
            {account.instructions && <p className="text-body-regular text-text-secondary">{account.instructions}</p>}
          </dl>
        </div>
      )}
      <p className="text-body-regular text-text-secondary">
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
      <dt className="text-caption-1-regular text-text-tertiary">{label}</dt>
      <dd className="flex items-center gap-2">
        <span className={`text-[17px] font-semibold text-text-primary ${mono ? "tabular-nums tracking-wide" : ""}`}>{value}</span>
        {copy && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(value.replace(/\s/g, "")).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="pressable inline-flex items-center gap-1 rounded-full px-2 py-1 text-caption-1-medium text-button-ghost-foreground hover:bg-background-tertiary-default pointer-coarse:min-h-9"
          >
            {copied ? <RiCheckLine aria-hidden className="size-3.5" /> : <RiFileCopyLine aria-hidden className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </dd>
    </div>
  );
}
