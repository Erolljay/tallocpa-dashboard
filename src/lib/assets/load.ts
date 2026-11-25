import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { toCentavos } from "@/lib/returns/money";
import type { Asset } from "./schedule";

interface Row {
  id: string;
  number: number;
  source: Asset["source"];
  document_id: string | null;
  description: string;
  acquired_on: string;
  cost: string | number;
  input_vat: string | number;
  residual: string | number;
  life_months: number | null;
  tax_life_months: number | null;
  status: Asset["status"];
  ledger_accounts: { name: string } | { name: string }[] | null;
}

/** A client's fixed asset register (A1), in number order. Row-level security applies. */
export async function loadAssets(db: SupabaseClient, clientId: string): Promise<Asset[]> {
  const { data, error } = await db
    .from("fixed_assets")
    .select("id, number, source, document_id, description, acquired_on, cost, input_vat, residual, life_months, tax_life_months, status, ledger_accounts!fixed_assets_client_id_asset_account_id_fkey(name)")
    .eq("client_id", clientId)
    .order("number");
  if (error) throw new Error(`Could not load the fixed asset register: ${error.message}`);
  return ((data ?? []) as unknown as Row[]).map((r) => {
    const acct = Array.isArray(r.ledger_accounts) ? r.ledger_accounts[0] : r.ledger_accounts;
    return {
      id: r.id, number: r.number, source: r.source, documentId: r.document_id, description: r.description,
      assetAccount: acct?.name ?? "—", acquiredOn: String(r.acquired_on).slice(0, 10),
      cost: toCentavos(r.cost) ?? 0, inputVat: toCentavos(r.input_vat) ?? 0, residual: toCentavos(r.residual) ?? 0,
      lifeMonths: r.life_months, taxLifeMonths: r.tax_life_months, status: r.status,
    };
  });
}
