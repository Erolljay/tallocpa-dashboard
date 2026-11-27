/** Connector tools on BIR returns (docs/AI-WORKFORCE.md §7.2). Read-only. */
import { z } from "zod";
import { clientRef, findClient, notYours } from "@/lib/clients/ai-tools";
import { addDays } from "@/lib/deadlines/dates";
import { CLIENT_DATA_EMPLOYEES, defineTool } from "@/lib/mcp/tool";

export const upcomingFilings = defineTool({
  name: "upcoming_filings",
  title: "Upcoming and overdue returns",
  description:
    "Returns of your clients not yet filed that are overdue or due within the next N days (default 30): form, period, due date and status. Optionally for one client.",
  input: z.object({
    days: z.number().int().min(1).max(366).default(30).describe("How many days ahead"),
    client: clientRef.optional().describe("Only this client (id or code)"),
  }),
  employees: CLIENT_DATA_EMPLOYEES,
  effect: "read",
  async run({ db, today, noteClient }, { days, client }) {
    let clientId: string | null = null;
    if (client) {
      const found = await findClient(db, client);
      if (!found) throw notYours(client);
      clientId = found.id;
      noteClient(found.id);
    }
    const { rows } = await db.query(
      `select c.code as client_code, c.name as client, f.form, f.period_label, f.due_date::text, f.status,
              (f.due_date < $1::date) as overdue
       from public.filing_instances f join public.clients c on c.id = f.client_id
       where f.status <> 'filed'
         and f.due_date <= $2::date
         and ($3::uuid is null or f.client_id = $3)
       order by f.due_date, c.name, f.form
       limit 500`,
      [today, addDays(today, days), clientId],
    );
    return { today, through: addDays(today, days), returns: rows };
  },
});

// The Pre-Review Assistant's tools live beside the rest of the filings code.
export { preReviewReturn, returnsToPreReview, saveReviewMemo } from "./pre-review-tools";
