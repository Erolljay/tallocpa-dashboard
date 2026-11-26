"use client";

import { useActionState } from "react";
import { Button, Input, Select } from "@/components/ui";
import { addOpeningAssetAction, runDepreciationAction, setupAssetAction, type AssetState } from "./actions";

function Message({ state }: { state: AssetState }) {
  if (state.error) return <span role="alert" className="text-caption-1-regular text-text-error-primary">{state.error}</span>;
  if (state.ok) return <span role="status" className="text-caption-1-regular text-status-lime-text">{state.ok}</span>;
  return null;
}

/** Useful life for this item (decision 13); the tax life is the same unless changed (decision 17). */
export function SetupAssetForm({ clientId, assetId, description }: { clientId: string; assetId: string; description: string }) {
  const [state, run, pending] = useActionState(setupAssetAction.bind(null, clientId, assetId), {} as AssetState);
  return (
    <form action={run} className="flex flex-wrap items-end gap-2">
      <label className="flex min-w-48 flex-1 flex-col gap-1 text-caption-1-medium text-text-secondary">
        What it is
        <Input name="description" defaultValue={description} className="text-body-regular" />
      </label>
      <label className="flex w-32 flex-col gap-1 text-caption-1-medium text-text-secondary">
        Life (months)
        <Input name="life_months" inputMode="numeric" required placeholder="60" className="text-end tabular-nums" />
      </label>
      <label className="flex w-36 flex-col gap-1 text-caption-1-medium text-text-secondary">
        Tax life (months)
        <Input name="tax_life_months" inputMode="numeric" placeholder="Same" className="text-end tabular-nums" />
      </label>
      <Button type="submit" size="sm" disabled={pending}>{pending ? "Saving…" : "Set up"}</Button>
      <Message state={state} />
    </form>
  );
}

export function OpeningAssetForm({ clientId, accounts, before }: { clientId: string; accounts: { id: string; label: string }[]; before: string }) {
  const [state, run, pending] = useActionState(addOpeningAssetAction.bind(null, clientId), {} as AssetState);
  return (
    <form action={run} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">What it is<Input name="description" required /></label>
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">
        Account
        <Select name="asset_account" required defaultValue="">
          <option value="" disabled>Choose…</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </Select>
      </label>
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">Bought on (before {before})<Input name="acquired_on" type="date" required max={before} /></label>
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">Cost<Input name="cost" inputMode="decimal" required className="text-end tabular-nums" /></label>
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">Life (months)<Input name="life_months" inputMode="numeric" required className="text-end tabular-nums" /></label>
      <label className="flex flex-col gap-1 text-caption-1-medium text-text-secondary">Tax life (months)<Input name="tax_life_months" inputMode="numeric" placeholder="Same" className="text-end tabular-nums" /></label>
      <div className="flex flex-wrap items-center gap-2 sm:col-span-2 lg:col-span-3">
        <Button type="submit" size="sm" variant="secondary" disabled={pending}>{pending ? "Adding…" : "Add opening asset"}</Button>
        <Message state={state} />
      </div>
    </form>
  );
}

export function RunDepreciationButton({ clientId, month, label }: { clientId: string; month: string; label: string }) {
  const [state, run, pending] = useActionState(() => runDepreciationAction(clientId, month), {} as AssetState);
  return (
    <form action={run} className="flex flex-wrap items-center gap-2">
      <Button type="submit" size="sm" disabled={pending}>{pending ? "Posting…" : `Run ${label} depreciation`}</Button>
      <Message state={state} />
    </form>
  );
}
