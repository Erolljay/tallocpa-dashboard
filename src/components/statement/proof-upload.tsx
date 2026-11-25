"use client";

import { createClient } from "@supabase/supabase-js";
import { RiFileUploadLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button, Field, Input, Notice, Select } from "@/components/ui";
import { shrinkImage } from "@/lib/documents/shrink";
import { startProofUpload, submitProof, type ProofState } from "@/lib/collections/proof-actions";
import type { PayAccount, ProofMethod } from "@/lib/collections/statement";

const METHODS: { value: ProofMethod; label: string; file: string; ref: string }[] = [
  { value: "transfer", label: "Online transfer or e-wallet", file: "Screenshot of the transfer", ref: "Transaction or reference number (optional)" },
  { value: "check", label: "Check", file: "Bank-validated deposit slip", ref: "Check number" },
  { value: "deposit", label: "Over-the-counter bank deposit", file: "Bank-validated deposit slip", ref: "Deposit reference (optional)" },
];

/**
 * "Already paid?": the client uploads a screenshot of the transfer, or the
 * bank-validated deposit slip for a check or counter deposit. The file goes
 * straight to storage through a one-time link; the statement then reads
 * For verification until the Owner verifies it.
 */
export function ProofUpload({ soaId, accounts, account, amountDue, today }: { soaId: string; accounts: PayAccount[]; account: PayAccount | null; amountDue: number; today: string }) {
  const router = useRouter();
  const [method, setMethod] = useState<ProofMethod>("transfer");
  const [accountId, setAccountId] = useState(account?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ProofState>({});
  const [busy, setBusy] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const m = METHODS.find((x) => x.value === method)!;
  // Follow the account picked above unless the client changes it here.
  const [lastPicked, setLastPicked] = useState(account?.id);
  if (account?.id !== lastPicked) {
    setLastPicked(account?.id);
    setAccountId(account?.id ?? "");
  }

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (accounts.length > 0 && !accountId) return setState({ error: "Choose the bank or e-wallet you paid to." });
    if (!file) return setState({ error: `Attach the ${m.file.toLowerCase()}.` });
    setBusy(true);
    setState({});
    try {
      const upload = await shrinkImage(file);
      const started = await startProofUpload({ soaId, mimeType: upload.type, size: upload.size });
      if ("error" in started) throw new Error(started.error);
      const storage = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
        auth: { persistSession: false, autoRefreshToken: false },
      }).storage.from("payment-proofs");
      const { error } = await storage.uploadToSignedUrl(started.path, started.token, upload, { contentType: upload.type });
      if (error) throw new Error(error.message);
      const result = await submitProof({
        soaId,
        path: started.path,
        fileName: file.name || "proof",
        mimeType: upload.type,
        amount: String(data.get("amount") ?? ""),
        paidOn: String(data.get("paid_on") ?? ""),
        accountId: accountId || null,
        method,
        reference: String(data.get("reference") ?? "").trim(),
      });
      setState(result);
      if (result.ok) {
        form.current?.reset();
        setFile(null);
        router.refresh();
      }
    } catch (err) {
      setState({ error: (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form ref={form} onSubmit={send} className="@container space-y-4 border-t border-separator-border pt-5">
      <div>
        <h3 className="text-headline-semibold text-text-primary">Already paid? Upload your proof of payment</h3>
        <p className="text-body-regular text-text-secondary">We verify it against our bank and mark your statement Paid.</p>
      </div>
      <div className="grid gap-3 @md:grid-cols-2">
        <Field label="How did you pay?" htmlFor="proof_method">
          <Select id="proof_method" value={method} onChange={(e) => setMethod(e.target.value as ProofMethod)}>
            {METHODS.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
          </Select>
        </Field>
        {accounts.length > 0 && (
          <Field label="Paid to" htmlFor="proof_account" hint={accountId ? undefined : "Choose a bank or e-wallet above, or here."}>
            <Select id="proof_account" value={accountId} onChange={(e) => setAccountId(e.target.value)} required>
              <option value="" disabled>Choose…</option>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.institution} · {a.account_number}</option>)}
            </Select>
          </Field>
        )}
        <Field label="Amount paid" htmlFor="proof_amount">
          <Input id="proof_amount" name="amount" type="number" inputMode="decimal" min="0.01" step="0.01" defaultValue={amountDue > 0 ? amountDue.toFixed(2) : ""} required />
        </Field>
        <Field label="Date paid" htmlFor="proof_date">
          <Input id="proof_date" name="paid_on" type="date" max={today} defaultValue={today} required />
        </Field>
        <Field label={m.ref} htmlFor="proof_ref">
          <Input id="proof_ref" name="reference" maxLength={100} required={method === "check"} />
        </Field>
        <Field label={m.file} htmlFor="proof_file" hint="Photo, screenshot or PDF, up to 10 MB.">
          <Input id="proof_file" type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
        </Field>
      </div>
      <Button type="submit" disabled={busy} className="w-full @md:w-auto">
        <RiFileUploadLine aria-hidden className="size-4" /> {busy ? "Sending…" : "Submit proof of payment"}
      </Button>
      {state.error && <Notice tone="blocked">{state.error}</Notice>}
      {state.ok && <Notice tone="done">{state.ok}</Notice>}
    </form>
  );
}
