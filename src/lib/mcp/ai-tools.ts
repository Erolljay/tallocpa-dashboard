/** Connector tools every AI employee can be granted. */
import { z } from "zod";
import { BOOKS_LEVELS, DEPARTMENTS } from "@/lib/ai/workforce";
import { defineTool } from "./tool";

export const whoami = defineTool({
  name: "whoami",
  title: "Who am I",
  description: "Your name, department, job, books access, which clients you can work on (every client, or your assigned ones, with the count), and the tools you have been granted.",
  input: z.object({}),
  employees: "all",
  effect: "read",
  async run({ caller, db }) {
    // What it can actually reach: every client of the brand when the Owner ticked "Every
    // client", otherwise its assigned clients (row-level security counts them).
    const { rows } = await db.query<{ every: boolean | null; n: number }>(
      `select (select all_clients from public.ai_employees where user_id = auth.uid()) as every, (select count(*)::int from public.clients) as n`,
    );
    const every = Boolean(rows[0]?.every) && caller.clientData;
    const n = rows[0]?.n ?? 0;
    return {
      name: caller.name,
      department: DEPARTMENTS[caller.department],
      job: caller.job,
      books_access: caller.clientData ? BOOKS_LEVELS[caller.booksLevel].label : "None (no client data)",
      clients: !caller.clientData ? "None (no client data)" : every ? `Every client of the firm (${n})` : `Assigned clients (${n})`,
      client_count: n,
      tools: [...caller.grants].sort(),
      daily_limit: caller.dailyLimit,
    };
  },
});
