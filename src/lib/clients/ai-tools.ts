/**
 * Connector tools on client records (docs/AI-WORKFORCE.md §7.2). The database shows an
 * AI employee only the clients assigned to it (or every client when the Owner ticks
 * that), and nothing to marketing.
 */
import { z } from "zod";
import { CLIENT_DATA_EMPLOYEES, defineTool } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";

/** A client by id or by code (e.g. TC-0012), among the clients the AI employee may read. */
export const clientRef = z.string().trim().min(1, "Give the client's id or code.").max(60);

export async function findClient(db: Queryable, ref: string): Promise<{ id: string; code: string; name: string } | null> {
  const { rows } = await db.query<{ id: string; code: string; name: string }>(
    `select id, code, name from public.clients where id::text = $1 or upper(code) = upper($1) limit 1`,
    [ref],
  );
  return rows[0] ?? null;
}

export const notYours = (ref: string) => new Error(`No client "${ref}" among the clients assigned to you.`);

export const listMyClients = defineTool({
  name: "list_my_clients",
  title: "List my clients",
  description: "The clients assigned to you, optionally filtered by part of the name or code. Returns id, code, name, taxpayer type, TIN, RDO and status.",
  input: z.object({ query: z.string().trim().max(80).optional().describe("Part of the client's name or code") }),
  employees: CLIENT_DATA_EMPLOYEES,
  effect: "read",
  async run({ db }, { query }) {
    const { rows } = await db.query(
      `select id, code, name, taxpayer_type, tin, rdo_code, status
       from public.clients
       where $1::text is null or name ilike '%' || $1 || '%' or code ilike '%' || $1 || '%'
       order by name limit 200`,
      [query || null],
    );
    return { clients: rows };
  },
});

export const getClient = defineTool({
  name: "get_client",
  title: "Get a client",
  description: "One of your clients by id or code: registration details and the BIR returns it must file (form and frequency).",
  input: z.object({ client: clientRef.describe("The client's id or code") }),
  employees: CLIENT_DATA_EMPLOYEES,
  effect: "read",
  async run({ db, noteClient }, { client }) {
    const found = await findClient(db, client);
    if (!found) throw notYours(client);
    noteClient(found.id);
    const [{ rows: detail }, { rows: obligations }] = [
      await db.query(
        `select id, code, name, taxpayer_type, tin, rdo_code, registered_address, fiscal_year_end_month, filing_channel, book_type, payment_mode, submission_cutoff_day, status
         from public.clients where id = $1`,
        [found.id],
      ),
      await db.query(
        `select form, frequency, start_date, end_date from public.obligations where client_id = $1 and (end_date is null or end_date >= current_date) order by form`,
        [found.id],
      ),
    ];
    return { client: detail[0], returns: obligations };
  },
});
