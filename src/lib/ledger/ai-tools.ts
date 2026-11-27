/**
 * Connector tools on the books (docs/AI-WORKFORCE.md §6–§7). The trial balance works at
 * Summary or Full books access; the database refuses everyone else.
 */
import { z } from "zod";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { CLIENT_DATA_EMPLOYEES, defineTool } from "@/lib/mcp/tool";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.");

export const trialBalance = defineTool({
  name: "trial_balance",
  title: "Trial balance",
  description:
    "A client's trial balance for a period: for each account, the balance before the period, debits and credits in it, and the closing balance (debit positive). Needs Summary or Full books access.",
  input: z.object({
    client: clientRef.describe("The client's id or code"),
    from: isoDate.describe("First day, YYYY-MM-DD"),
    to: isoDate.describe("Last day, YYYY-MM-DD"),
  }),
  employees: CLIENT_DATA_EMPLOYEES,
  effect: "read",
  async run({ db, noteClient }, { client, from, to }) {
    const found = await findClient(db, client);
    if (!found) throw notYours(client);
    noteClient(found.id);
    const { rows } = await db.query(
      `select code, name, type, fs_line, opening::text, debit::text, credit::text, closing::text
       from public.ai_trial_balance($1, $2::date, $3::date)`,
      [found.id, from, to],
    );
    return { client: { code: found.code, name: found.name }, from, to, accounts: rows };
  },
});
