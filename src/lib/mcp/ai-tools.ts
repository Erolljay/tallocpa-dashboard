/** Connector tools every AI employee can be granted. */
import { z } from "zod";
import { BOOKS_LEVELS, DEPARTMENTS } from "@/lib/ai/workforce";
import { defineTool } from "./tool";

export const whoami = defineTool({
  name: "whoami",
  title: "Who am I",
  description: "Your name, department, job, books access, the tools you have been granted and how many calls you have made today.",
  input: z.object({}),
  employees: "all",
  effect: "read",
  async run({ caller, db }) {
    const { rows } = await db.query<{ n: number }>(`select count(*)::int as n from public.ai_assignments`);
    return {
      name: caller.name,
      department: DEPARTMENTS[caller.department],
      job: caller.job,
      books_access: caller.clientData ? BOOKS_LEVELS[caller.booksLevel].label : "None (no client data)",
      assigned_clients: rows[0]?.n ?? 0,
      tools: [...caller.grants].sort(),
      daily_limit: caller.dailyLimit,
    };
  },
});
