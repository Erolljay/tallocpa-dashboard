/**
 * Connected mailboxes (migration 20270111000001): the Gmail inboxes the app reads, read
 * only, for BIR mail and payment confirmations.
 *
 *   - only the Owner reads which mailboxes are connected; staff, client contacts and AI
 *     employees read none, and nobody writes the table directly;
 *   - the encrypted refresh tokens are out of reach of every signed-in user, and only the
 *     server (service role) may save or read them;
 *   - the Owner chooses what a mailbox is read for and removes it; staff cannot;
 *   - mailbox_tokens() returns the mailboxes for one purpose; removing one drops its token;
 *   - a message that reached two mailboxes is kept once (Message-ID).
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "connected_mailboxes_test";

const OWNER = "00000000-0000-0000-0000-00000000e501";
const STAFF = "00000000-0000-0000-0000-00000000e502";
const CLIENT_USER = "00000000-0000-0000-0000-00000000e503";
const AI = "00000000-0000-0000-0000-00000000e5a1";

describe.skipIf(!url)("Connected mailboxes: Owner only, tokens out of reach, AI employees see nothing", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let ownerBox: string;
  let supportBox: string;

  async function as(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r.rows;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  async function asService(sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("set local role service_role");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r.rows;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));
    await db.query(`grant usage on schema public to service_role`);
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, STAFF, CLIENT_USER, AI]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    const client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9951', 'Jaro Trading', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Jaro owner')`, [CLIENT_USER, client]);
    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, enabled, all_clients) values ($1, $2, 'bir_mail_clerk', 'BIR Mail Clerk', 'compliance', 'cowork', true, true)`, [AI, brand]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("only the server saves a mailbox and its token", async () => {
    await expect(as(OWNER, `select public.mailbox_save('owner@tallocpa.com', 'sealed', $1)`, [OWNER])).rejects.toThrow(/permission denied/);
    ownerBox = (await asService(`select public.mailbox_save(' Owner@TalloCPA.com ', 'sealed-owner', $1) as id`, [OWNER]))[0].id;
    supportBox = (await asService(`select public.mailbox_save('support@tallocpa.com', 'sealed-support', $1) as id`, [OWNER]))[0].id;
    // Reconnecting the same address keeps one row and replaces the token.
    expect((await asService(`select public.mailbox_save('owner@tallocpa.com', 'sealed-owner-2', $1) as id`, [OWNER]))[0].id).toBe(ownerBox);
    expect((await db.query(`select email from public.connected_mailboxes order by email`)).rows.map((r) => r.email)).toEqual(["owner@tallocpa.com", "support@tallocpa.com"]);
  });

  it("only the Owner reads the mailboxes; staff, clients and AI employees read none and write none", async () => {
    expect(await as(OWNER, `select email from public.connected_mailboxes`)).toHaveLength(2);
    expect(await as(STAFF, `select email from public.connected_mailboxes`)).toHaveLength(0);
    expect(await as(CLIENT_USER, `select email from public.connected_mailboxes`)).toHaveLength(0);
    expect(await as(AI, `select email from public.connected_mailboxes`)).toHaveLength(0);
    await expect(as(OWNER, `insert into public.connected_mailboxes (email) values ('x@tallocpa.com')`)).rejects.toThrow(/row-level security/);
    expect(await as(OWNER, `update public.connected_mailboxes set for_bir_mail = false returning id`)).toHaveLength(0);
  });

  it("the tokens are out of reach of every signed-in user", async () => {
    for (const user of [OWNER, STAFF, AI]) {
      await expect(as(user, `select refresh_token from private.connected_mailbox_tokens`)).rejects.toThrow(/permission denied/);
      await expect(as(user, `select * from public.mailbox_tokens('bir_mail')`)).rejects.toThrow(/permission denied/);
      await expect(as(user, `select * from public.mailbox_token($1)`, [ownerBox])).rejects.toThrow(/permission denied/);
      await expect(as(user, `select public.mailbox_checked($1, '')`, [ownerBox])).rejects.toThrow(/permission denied/);
    }
    expect(await asService(`select email, refresh_token from public.mailbox_tokens('bir_mail') order by email`)).toEqual([
      { email: "owner@tallocpa.com", refresh_token: "sealed-owner-2" },
      { email: "support@tallocpa.com", refresh_token: "sealed-support" },
    ]);
  });

  it("the Owner chooses what each mailbox is read for; staff and AI employees cannot", async () => {
    await expect(as(STAFF, `select public.mailbox_set_purposes($1, false, true)`, [supportBox])).rejects.toThrow(/Only the Owner/);
    await expect(as(AI, `select public.mailbox_set_purposes($1, false, true)`, [supportBox])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.mailbox_set_purposes($1, false, true)`, [supportBox]);
    expect((await asService(`select email from public.mailbox_tokens('bir_mail')`)).map((r) => r.email)).toEqual(["owner@tallocpa.com"]);
    expect((await asService(`select email from public.mailbox_tokens('payment_mail') order by email`)).map((r) => r.email)).toEqual(["owner@tallocpa.com", "support@tallocpa.com"]);
  });

  it("records a check and Google's error", async () => {
    await asService(`select public.mailbox_checked($1, 'invalid_grant')`, [supportBox]);
    expect((await db.query(`select last_error, last_checked_at is not null as checked from public.connected_mailboxes where id = $1`, [supportBox])).rows[0]).toEqual({ last_error: "invalid_grant", checked: true });
    await asService(`select public.mailbox_checked($1, '')`, [supportBox]);
    expect((await db.query(`select last_error from public.connected_mailboxes where id = $1`, [supportBox])).rows[0].last_error).toBeNull();
  });

  it("the Owner removes a mailbox and its token goes with it; staff cannot", async () => {
    await expect(as(STAFF, `select public.mailbox_remove($1)`, [supportBox])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.mailbox_remove($1)`, [supportBox]);
    expect((await db.query(`select count(*)::int as n from private.connected_mailbox_tokens where mailbox_id = $1`, [supportBox])).rows[0].n).toBe(0);
    await expect(as(OWNER, `select public.mailbox_remove($1)`, [supportBox])).rejects.toThrow(/No such mailbox/);
  });

  it("keeps a message that reached two mailboxes once (Message-ID)", async () => {
    const add = (gmailId: string, mailbox: string) =>
      db.query(
        `insert into public.bir_mail (gmail_message_id, received_at, from_address, subject, kind, rfc822_message_id, mailbox) values ($1, now(), 'efps@bir.gov.ph', 'x', 'other', 'abc@bir.gov.ph', $2)`,
        [gmailId, mailbox],
      );
    await add("g-1", "owner@tallocpa.com");
    await expect(add("g-2", "support@tallocpa.com")).rejects.toThrow(/bir_mail_rfc822/);
  });
});
