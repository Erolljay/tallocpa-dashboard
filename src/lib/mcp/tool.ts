/**
 * How a connector tool is defined (docs/AI-WORKFORCE.md §7.2–§7.3). Tools live beside
 * their feature in a file named `ai-tools.ts`; src/lib/mcp/registry.ts collects them and
 * registry.test.ts fails the build when a file is not collected or a tool breaks the
 * rules (unique name, known AI employees, read or draft only, no sign-off verbs).
 *
 * A tool runs inside a transaction as the AI employee (role `authenticated`, its own
 * user id), so the database decides what it may read. `read` tools run in a read-only
 * transaction.
 */
import type { z } from "zod";
import { STANDARD_WORKFORCE } from "@/lib/ai/workforce";
import type { AiCaller, Queryable } from "./types";

export type ToolEffect = "read" | "draft";

export interface ToolContext {
  /** Runs SQL as the AI employee, under row-level security. */
  db: Queryable;
  caller: AiCaller;
  /** Today in Manila, YYYY-MM-DD. */
  today: string;
  /** Records which client the call is about, for the activity log. */
  noteClient(clientId: string): void;
}

export interface AiTool<S extends z.ZodObject = z.ZodObject> {
  name: string;
  title: string;
  description: string;
  input: S;
  /** The AI employees (by key) whose work this tool is for; the Owner still grants each one. */
  employees: readonly string[] | "all";
  effect: ToolEffect;
  run(ctx: ToolContext, input: z.output<S>): Promise<unknown>;
}

export function defineTool<S extends z.ZodObject>(tool: AiTool<S>): AiTool {
  return tool as unknown as AiTool;
}

/** A request the AI employee may not make (not its client, no access): logged as refused, not as an error. */
export class ToolRefusal extends Error {}

/** AI employees allowed client data (everyone but marketing). */
export const CLIENT_DATA_EMPLOYEES = STANDARD_WORKFORCE.filter((e) => e.clientData).map((e) => e.key);

export const toolFor = (tool: Pick<AiTool, "employees">, key: string) => tool.employees === "all" || tool.employees.includes(key);
