/**
 * Telegram uploads (migrations 20261231000001_telegram_uploads.sql and
 * 20261231000002_telegram_send_mode.sql): off until staff
 * switch it on for a client; a portal user links a chat with a one-time code; the bot
 * (service role) files each upload as a Received document of that client, uploaded by
 * that portal user, with source 'telegram'.
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
const DB_NAME = "telegram_uploads_test";

const OWNER = "00000000-0000-0000-0000-000000000e01";
const CLIENT_USER = "00000000-0000-0000-0000-000000000e02";
const OTHER_USER = "00000000-0000-0000-0000-000000000e03";
const PREPARER = "00000000-0000-0000-0000-000000000e04";
const STAFF_CHAT = 555009;
const CHAT = 555001;

describe.skipIf(!url)("Telegram uploads", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let other: string;

  async function as(user: string | null, sql: string, params: unknown[] = [], role = "authenticated") {
    await db.query("begin");
    if (user) await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query(`set local role ${role}`);
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const bot = (sql: string, params: unknown[] = []) => as(null, sql, params, "service_role");
  const code = (user: string, c: string) => as(user, `select public.telegram_link_code($1) as c`, [c]).then((r) => r.rows[0].c as string);
  async function upload(): Promise<string> {
    return (await db.query(
      `insert into public.telegram_uploads (chat_id, user_id, client_id, file_id, file_name, mime_type, size_bytes)
       values ($1, $2, $3, 'tg-file', 'Resibo 1.jpg', 'image/jpeg', 1200) returning id`,
      [CHAT, CLIENT_USER, client],
    )).rows[0].id;
  }
  async function stored(docId: string) {
    const p = `${client}/${docId}/Resibo_1.jpg`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [p]);
    return p;
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
    // The bot writes its /send choice and reply ids to these tables directly, as Supabase's service role may.
    await db.query(`grant select, update on public.telegram_links, public.telegram_uploads to service_role`);
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, CLIENT_USER, OTHER_USER, PREPARER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Pia Preparer', 'staff')`, [OWNER, PREPARER, brand]);
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9951', 'Molo Bakeshop', 'individual') returning id`, [brand])).rows[0].id;
    other = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9952', 'Arevalo Hardware', 'individual') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Maria Molo'), ($3, $4, 'Ben Arevalo')`, [CLIENT_USER, client, OTHER_USER, other]);
    // The preparer is assigned to Arevalo Hardware only; neither client has Telegram on for staff to use it.
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [other, PREPARER]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("is off for every client until staff switch it on", async () => {
    await expect(code(CLIENT_USER, client)).rejects.toThrow(/not on for this client/);
    await as(OWNER, `update public.clients set telegram_enabled = true where id = $1`, [client]);
    expect(await code(CLIENT_USER, client)).toMatch(/^[0-9a-f]{32}$/);
  });

  it("gives codes only to the client's own portal users, and only the bot can use them", async () => {
    await expect(code(OTHER_USER, client)).rejects.toThrow(/cannot do this/);
    const c = await code(CLIENT_USER, client);
    await expect(as(CLIENT_USER, `select public.telegram_link_chat($1, $2, 'maria')`, [c, CHAT])).rejects.toThrow(/permission denied/);
    expect((await bot(`select public.telegram_link_chat($1, $2, 'maria') as n`, [c, CHAT])).rows[0].n).toBe("Molo Bakeshop");
    // A code works once.
    await expect(bot(`select public.telegram_link_chat($1, $2, 'maria')`, [c, CHAT + 1])).rejects.toThrow(/expired/);
  });

  it("shows a link to its portal user and the client's staff, not to others", async () => {
    expect((await as(CLIENT_USER, `select chat_id from public.telegram_links`)).rows).toEqual([{ chat_id: String(CHAT) }]);
    expect((await as(OWNER, `select chat_id from public.telegram_links where client_id = $1`, [client])).rows).toHaveLength(1);
    expect((await as(OTHER_USER, `select chat_id from public.telegram_links`)).rows).toEqual([]);
  });

  it("files an upload as a Received document of that client, by that portal user", async () => {
    const u = await upload();
    const id = (await db.query(`select gen_random_uuid() as id`)).rows[0].id;
    await expect(bot(`select public.telegram_file_document($1, $2, 'purchase_receipt', '2026-11-01', $3)`, [u, id, `${client}/${id}/Resibo_1.jpg`])).rejects.toThrow(/not arrived/);
    await expect(bot(`select public.telegram_file_document($1, $2, 'purchase_receipt', '2026-11-01', $3)`, [u, id, `${other}/${id}/x.jpg`])).rejects.toThrow(/Wrong storage path/);
    const p = await stored(id);
    const d = (await bot(`select client_id, uploaded_by, source, status, doc_type, storage_path from public.telegram_file_document($1, $2, 'purchase_receipt', '2026-11-01', $3)`, [u, id, p])).rows[0];
    expect(d).toEqual({ client_id: client, uploaded_by: CLIENT_USER, source: "telegram", status: "received", doc_type: "purchase_receipt", storage_path: p });
    expect((await db.query(`select status, document_id from public.telegram_uploads where id = $1`, [u])).rows[0]).toEqual({ status: "filed", document_id: id });
    // A second tap returns the same document.
    expect((await bot(`select id from public.telegram_file_document($1, gen_random_uuid(), 'other', '2026-11-01', $2)`, [u, p])).rows[0].id).toBe(id);
  });

  it("keeps a /send choice on the chat for the bot, only of a known type (20261231000002)", async () => {
    await bot(`update public.telegram_links set send_doc_type = 'purchase_receipt', send_month = null, send_active_at = now() where chat_id = $1`, [CHAT]);
    expect((await db.query(`select send_doc_type from public.telegram_links where chat_id = $1`, [CHAT])).rows[0]).toEqual({ send_doc_type: "purchase_receipt" });
    await expect(bot(`update public.telegram_links set send_doc_type = 'receipt' where chat_id = $1`, [CHAT])).rejects.toThrow(/check constraint/);
    await bot(`update public.telegram_uploads set reply_message_id = 42 where chat_id = $1`, [CHAT]);
    await bot(`update public.telegram_links set send_doc_type = null, send_month = null, send_active_at = null where chat_id = $1`, [CHAT]);
  });

  it("stops filing when staff switch it off or the person loses portal access", async () => {
    const u = await upload();
    const id = (await db.query(`select gen_random_uuid() as id`)).rows[0].id;
    const p = await stored(id);
    await as(OWNER, `update public.clients set telegram_enabled = false where id = $1`, [client]);
    await expect(bot(`select public.telegram_file_document($1, $2, 'sales_invoice', '2026-11-01', $3)`, [u, id, p])).rejects.toThrow(/not on for this account/);
    await as(OWNER, `update public.clients set telegram_enabled = true where id = $1`, [client]);
    await db.query(`delete from public.client_users where user_id = $1 and client_id = $2`, [CLIENT_USER, client]);
    await expect(bot(`select public.telegram_file_document($1, $2, 'sales_invoice', '2026-11-01', $3)`, [u, id, p])).rejects.toThrow(/not on for this account/);
  });

  describe("staff", () => {
    it("link their own chat and choose only clients they may upload for", async () => {
      await expect(as(CLIENT_USER, `select public.telegram_staff_link_code()`)).rejects.toThrow(/Only staff/);
      const c = (await as(PREPARER, `select public.telegram_staff_link_code() as c`)).rows[0].c;
      expect((await bot(`select public.telegram_link_chat($1, $2, 'pia') as n`, [c, STAFF_CHAT])).rows[0].n).toBe("Pia Preparer");
      expect((await bot(`select name from public.telegram_staff_clients($1, '')`, [STAFF_CHAT])).rows).toEqual([{ name: "Arevalo Hardware" }]);
      expect((await bot(`select name from public.telegram_staff_clients($1, 'molo')`, [STAFF_CHAT])).rows).toEqual([]);
      await expect(bot(`select public.telegram_set_client($1, $2)`, [STAFF_CHAT, client])).rejects.toThrow(/cannot send documents for this client/);
      expect((await bot(`select public.telegram_set_client($1, $2) as n`, [STAFF_CHAT, other])).rows[0].n).toBe("Arevalo Hardware");
      // A client's chat cannot choose a client.
      await expect(bot(`select public.telegram_set_client($1, $2)`, [CHAT, other])).rejects.toThrow(/not linked to a staff account/);
    });

    it("file for the chosen client in the month they choose, under their own name", async () => {
      const u = (await db.query(
        `insert into public.telegram_uploads (chat_id, user_id, client_id, file_id, file_name, mime_type, size_bytes)
         values ($1, $2, $3, 'tg', 'si.pdf', 'application/pdf', 10) returning id`,
        [STAFF_CHAT, PREPARER, other],
      )).rows[0].id;
      const id = (await db.query(`select gen_random_uuid() as id`)).rows[0].id;
      const p = `${other}/${id}/si.pdf`;
      await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [p]);
      const d = (await bot(`select client_id, uploaded_by, source, document_month::text from public.telegram_file_document($1, $2, 'sales_invoice', '2026-10-01', $3)`, [u, id, p])).rows[0];
      expect(d).toEqual({ client_id: other, uploaded_by: PREPARER, source: "telegram", document_month: "2026-10-01" });
    });

    it("keep their link private from other staff", async () => {
      expect((await as(OWNER, `select chat_id from public.telegram_links where staff`)).rows).toEqual([]);
      expect((await as(PREPARER, `select chat_id from public.telegram_links`)).rows).toEqual([{ chat_id: String(STAFF_CHAT) }]);
    });
  });
});
