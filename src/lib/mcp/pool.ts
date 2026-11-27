import "server-only";
import { Pool } from "pg";
import { poolConfig } from "./pool-config";
import type { Connector } from "./types";

/**
 * Postgres connections for the MCP server (docs/SETUP.md, "AI employees' connector"):
 *
 *   SUPABASE_DB_URL   the session pooler connection string (the same value as the
 *                     migrations workflow's secret);
 *   SUPABASE_DB_CA    Supabase's root certificate (Database settings → SSL
 *                     configuration → Download certificate), so the connection is
 *                     encrypted AND the server is verified. Without it the connection
 *                     is still encrypted, but the server's identity is not checked.
 *
 * Each tool call borrows one connection for one transaction and gives it back.
 */
let pool: Pool | null = null;
let warned = false;

export function mcpConnector(): Connector | null {
  const url = process.env.SUPABASE_DB_URL;
  if (!url) return null;
  const ca = process.env.SUPABASE_DB_CA?.replace(/\\n/g, "\n");
  if (!ca && !warned) {
    warned = true;
    console.warn("MCP: SUPABASE_DB_CA is not set; the database connection is encrypted but the server is not verified (docs/SETUP.md).");
  }
  pool ??= new Pool(poolConfig(url, ca));
  return { connect: () => pool!.connect() };
}
