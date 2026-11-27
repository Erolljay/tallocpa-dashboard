import type { PoolConfig } from "pg";

/**
 * Pool settings for the connector (see pool.ts). `sslmode` is taken out of the URL so it
 * cannot override the TLS settings here: verified against SUPABASE_DB_CA when given,
 * otherwise encrypted without verifying the server.
 */
export function poolConfig(url: string, ca: string | undefined): PoolConfig {
  const u = new URL(url);
  u.searchParams.delete("sslmode");
  return {
    connectionString: u.toString(),
    ssl: ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false },
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 8_000,
  };
}
