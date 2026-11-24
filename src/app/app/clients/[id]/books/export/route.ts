import { NextResponse, type NextRequest } from "next/server";
import { booksAccess, loadAccounts, loadOpening } from "@/lib/ledger/data";
import { buildOpeningTemplate, XLSX_TYPE } from "@/lib/ledger/opening-xlsx";

const safe = (s: string) => s.replace(/[\\/:*?"<>|]+/g, "").trim().replace(/\s+/g, "_");

const dayBefore = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);

/**
 * Books downloads for staff (Owner and staff assigned to the client):
 *   ?kind=opening   the opening balances workbook (.xlsx), prefilled with the chart and any balances already saved
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/app/clients/[id]/books/export">) {
  const { id } = await ctx.params;
  const kind = request.nextUrl.searchParams.get("kind");
  const { supabase, client, books } = await booksAccess(id);
  if (!books) return new NextResponse("Set up the books first", { status: 409 });
  if (kind === "opening") {
    const [accounts, opening] = await Promise.all([loadAccounts(supabase, id), loadOpening(supabase, id)]);
    const asOf = dayBefore(books.booksStart);
    const buf = await buildOpeningTemplate({ clientName: client.name, asOf, accounts, balances: opening.balances, items: opening.items });
    return new NextResponse(new Uint8Array(buf), {
      headers: { "Content-Type": XLSX_TYPE, "Content-Disposition": `attachment; filename="Opening_Balances_${safe(client.name)}_${asOf}.xlsx"`, "Cache-Control": "no-store" },
    });
  }
  return new NextResponse("Unknown download", { status: 400 });
}
