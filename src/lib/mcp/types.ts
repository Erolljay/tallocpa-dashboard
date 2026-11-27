/**
 * Shared types of the TalloCPA OS MCP server (docs/AI-WORKFORCE.md §7). The server
 * talks to Postgres directly so that an AI employee's tools run under the same
 * row-level security the database tests check (supabase/tests/ai-employees.test.ts).
 */
import type { BooksLevel, Department } from "@/lib/ai/workforce";

/** Anything that runs SQL: a pg client or pool client. */
export interface Queryable {
  query<R extends Record<string, unknown> = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<{ rows: R[] }>;
}

/** A connection that can be borrowed for one transaction and given back. */
export interface Borrowed extends Queryable {
  release(): void;
}

/** Where connections come from: the pg pool in production, one test client in tests. */
export interface Connector {
  connect(): Promise<Borrowed>;
}

/** The AI employee behind a request, after its key is checked. */
export interface AiCaller {
  userId: string;
  key: string;
  name: string;
  brandId: string;
  department: Department;
  job: string;
  booksLevel: BooksLevel;
  clientData: boolean;
  dailyLimit: number;
  grants: Set<string>;
  credentialId: string;
  /** Switched on by the Owner. A switched-off AI employee is let in but given no tools. */
  enabled: boolean;
}
