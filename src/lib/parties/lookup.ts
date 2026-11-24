import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { PARTY_COLUMNS, type Party } from "./format";
import { HEAD_OFFICE, parseTin, partyKeyOf } from "./tin";

/**
 * Directory entries for the given TINs, as typed or read by OCR ("123456789",
 * "123-456-789-000", …), keyed by `partyKey(tin)`: "123-456-789-00000".
 *
 * A TIN with a branch code matches that branch only. A TIN without one matches
 * the head office ("00000"), or the only branch on file when there is just one.
 * TINs that are not on file, or not TINs, are left out of the map. Reads as the
 * signed-in user: staff see the whole directory; anyone else gets an empty map.
 */
export async function lookupParties(supabase: SupabaseClient, tins: (string | null | undefined)[]): Promise<Map<string, Party>> {
  const parsed = tins.map(parseTin).filter((p) => p != null);
  const out = new Map<string, Party>();
  const unique = [...new Set(parsed.map((p) => p.tin))];
  if (unique.length === 0) return out;

  const rows: Party[] = [];
  for (let i = 0; i < unique.length; i += 200) {
    const { data, error } = await supabase.from("parties").select(PARTY_COLUMNS).in("tin", unique.slice(i, i + 200));
    if (error) throw new Error(`Could not read the parties directory: ${error.message}`);
    rows.push(...((data ?? []) as unknown as Party[]));
  }
  const byTin = new Map<string, Party[]>();
  for (const r of rows) byTin.set(r.tin, [...(byTin.get(r.tin) ?? []), r]);

  for (const p of parsed) {
    const key = partyKeyOf(p.tin, p.branch);
    if (out.has(key)) continue;
    const branches = byTin.get(p.tin) ?? [];
    const exact = branches.find((r) => r.branch_code === p.branch);
    const match = exact ?? (!p.hasBranch && p.branch === HEAD_OFFICE && branches.length === 1 ? branches[0] : undefined);
    if (match) out.set(key, match);
  }
  return out;
}
