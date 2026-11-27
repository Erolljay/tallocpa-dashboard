"use client";

import { RiBuilding2Line, RiCheckLine, RiFileCopyLine, RiWallet3Line } from "@remixicon/react";
import { useState } from "react";
import type { PayAccount } from "@/lib/collections/statement";
import { cx } from "@/utils/cx";
import { ProofUpload } from "./proof-upload";

/**
 * "Pay": the client chooses a bank or e-wallet and sees only that channel's QR
 * code, account name and number. Tax money goes to the client-tax-funds account
 * when there is one (Q26); fees go to the firm's own accounts. With a single
 * channel it is chosen already.
 */
/**
 * `signInHref`: on the public share page the client signs in to upload a proof, so this
 * links there instead; an empty string (no portal sign-in) asks for the proof back by message.
 */
export function PayNow(props: { accounts: PayAccount[]; reference: string; hasTax: boolean; soaId: string; amountDue: number; today: string; signInHref?: string }) {
  const { accounts, reference, hasTax } = props;
  const [chosen, setChosen] = useState<string | null>(accounts.length === 1 ? accounts[0].id : null);
  const account = accounts.find((a) => a.id === chosen) ?? null;
  const hasTaxAccount = accounts.some((a) => a.purpose === "client_tax_funds");

  if (accounts.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-body-regular text-text-secondary">Payment details will appear here once the firm adds them. Please contact us for how to pay.</p>
        {props.signInHref !== undefined ? <SignInToUpload href={props.signInHref} /> : <ProofUpload soaId={props.soaId} accounts={accounts} account={null} amountDue={props.amountDue} today={props.today} />}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p id="pay-through" className="text-headline-semibold text-text-primary">Choose a bank or e-wallet</p>
        <p className="text-body-regular text-text-secondary">We show its QR code and account details.</p>
      </div>
      <div role="radiogroup" aria-labelledby="pay-through" className="grid gap-2 sm:grid-cols-2">
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
              className={cx(
                "pressable flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3 text-start outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                on ? "border-accent-500 bg-button-ghost-background shadow-xs" : "border-separator-border bg-background-primary-default hover:bg-background-secondary-hover",
              )}
            >
              <Icon aria-hidden className="size-5 shrink-0 text-button-ghost-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block text-body-medium text-text-primary">{a.institution}</span>
                <span className="block text-caption-1-regular text-text-tertiary">
                  {a.kind === "bank" ? "Bank" : "E-wallet"} · {a.purpose === "client_tax_funds" ? "For tax payments" : "For our fees"}
                </span>
              </span>
              {on && <RiCheckLine aria-hidden className="size-4 shrink-0 text-button-ghost-foreground" />}
            </button>
          );
        })}
      </div>

      {account && (
        <div aria-live="polite" className="grid gap-5 rounded-2xl bg-background-secondary-default p-5 sm:grid-cols-[auto_1fr] sm:items-center">
          {account.qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL from storage
            <img src={account.qrUrl} alt={`QR code for ${account.institution}`} className="mx-auto size-56 rounded-xl border border-separator-border bg-white object-contain p-2 sm:mx-0 sm:size-48" />
          ) : (
            <div className="grid place-items-center rounded-xl border border-dashed border-border-button-default px-3 py-2 text-center text-caption-1-regular text-text-secondary sm:size-48 sm:p-4 sm:text-body-regular">No QR code for this account</div>
          )}
          <dl className="space-y-3">
            <Detail label={account.kind === "bank" ? "Bank" : "E-wallet"} value={account.institution} />
            <Detail label="Account name" value={account.account_name} />
            <Detail label={account.kind === "bank" ? "Account number" : "Mobile or account number"} value={account.account_number} copy mono />
            <Detail label="Payment reference" value={reference} copy mono />
            {account.instructions && <p className="text-body-regular text-text-secondary">{account.instructions}</p>}
          </dl>
        </div>
      )}
      <p className="text-body-regular text-text-secondary">
        Put the payment reference in the transfer note so we can match your payment.
        {hasTax && hasTaxAccount ? " Please send tax amounts to the account marked for tax payments, and our fees to an account for our fees." : ""}
      </p>
      {props.signInHref !== undefined ? <SignInToUpload href={props.signInHref} /> : <ProofUpload soaId={props.soaId} accounts={accounts} account={account} amountDue={props.amountDue} today={props.today} />}
    </div>
  );
}

function SignInToUpload({ href }: { href: string }) {
  if (!href) {
    return (
      <p className="rounded-2xl bg-background-secondary-default p-4 text-body-regular text-text-secondary">
        Already paid? Please send us the screenshot of the transfer or the bank-validated deposit slip in reply to the message with this link (Messenger, Viber or email).
      </p>
    );
  }
  return (
    <p className="rounded-2xl bg-background-secondary-default p-4 text-body-regular text-text-secondary">
      Already paid?{" "}
      <a href={href} className="font-medium text-button-ghost-foreground underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
        Sign in to your client portal
      </a>{" "}
      and upload the screenshot or bank-validated deposit slip under Billing, or send it to us in reply to this message.
    </p>
  );
}

function Detail({ label, value, copy, mono }: { label: string; value: string; copy?: boolean; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <dt className="text-caption-1-regular text-text-tertiary">{label}</dt>
      <dd className="flex flex-wrap items-center gap-2">
        <span className={cx("min-w-0 break-all text-headline-semibold text-text-primary", mono && "tabular-nums tracking-wide")}>{value}</span>
        {copy && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(value.replace(/\s/g, "")).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="pressable inline-flex items-center gap-1 rounded-full px-2 py-1 text-caption-1-medium text-button-ghost-foreground outline-none hover:bg-background-tertiary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring pointer-coarse:min-h-9"
          >
            {copied ? <RiCheckLine aria-hidden className="size-3.5" /> : <RiFileCopyLine aria-hidden className="size-3.5" />}
            <span aria-hidden>{copied ? "Copied" : "Copy"}</span>
            <span className="sr-only">{copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}</span>
          </button>
        )}
      </dd>
    </div>
  );
}
