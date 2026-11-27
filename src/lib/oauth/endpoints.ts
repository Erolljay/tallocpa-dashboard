/**
 * The OAuth endpoints over a Connector (the service connection). Each request runs in one
 * transaction, so a failure part-way leaves nothing half-written. A refused token request
 * still commits: the code it presented is spent, as OAuth requires (one try per code).
 */
import type { Connector, Queryable } from "@/lib/mcp/types";
import { registerClient, token, type OAuthReply } from "./server";

async function inTransaction(conn: Connector, fn: (db: Queryable) => Promise<OAuthReply>, keepRefused: boolean): Promise<OAuthReply> {
  const db = await conn.connect();
  try {
    await db.query("begin");
    try {
      const reply = await fn(db);
      await db.query(reply.status < 400 || keepRefused ? "commit" : "rollback");
      return reply;
    } catch (e) {
      await db.query("rollback").catch(() => undefined);
      throw e;
    }
  } finally {
    db.release();
  }
}

export const registerEndpoint = (conn: Connector, body: unknown, now: Date) => inTransaction(conn, (db) => registerClient(db, body, now), false);

export const tokenEndpoint = (conn: Connector, form: URLSearchParams, now: Date) => inTransaction(conn, (db) => token(db, form, now), true);
