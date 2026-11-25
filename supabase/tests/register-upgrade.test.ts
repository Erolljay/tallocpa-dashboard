/**
 * Upgrading a live database from register slice 1 to slice 2: lines written by
 * 20261125000001_register.sql (which filled a missing total and had no party
 * address) are rewritten by 20261125000002_register_worksheets.sql with the
 * total as approved and the address.
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
const DB_NAME = "register_upgrade_test";
const SLICE_2 = "20261125000002_register_worksheets.sql";
const STAFF = "00000000-0000-0000-0000-000000000061";

describe.skipIf(!url)("register: upgrade from slice 1 to slice 2", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let doc: string;
  const migrations = readdirSync(path.join(root, "migrations")).sort();

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    // The database as it is after slice 1, with an approved document in it.
    for (const f of migrations.filter((f) => f < SLICE_2)) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1)`, [STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    const client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9601', 'Client U', 'corporation') returning id`, [brand])).rows[0].id;
    doc = (await db.query(
      `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
       values ($1, $2, 'portal', 'sales_invoice', '2027-01-01', '2027-01-01', 'x.jpg', 'image/jpeg', 1, gen_random_uuid()::text, 'posted') returning id`,
      [client, STAFF],
    )).rows[0].id;
    await db.query(`insert into public.extractions (document_id, status, fields, approved_fields, approved_by, approved_at) values ($1, 'done', '{}', $2, $3, now())`, [
      doc,
      JSON.stringify({ date: "2027-01-05", number: "SI-1", party_address: "Iloilo City", vatable: "1000.00", vat: "120.00", total: "" }),
      STAFF,
    ]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("slice 1 filled the missing total", async () => {
    expect((await db.query(`select total, net from public.register_lines where document_id = $1`, [doc])).rows[0]).toEqual({ total: "1120.00", net: "1120.00" });
  });

  it("slice 2 rewrites the line with the total as approved and the address", async () => {
    for (const f of migrations.filter((f) => f >= SLICE_2)) await db.query(read(`migrations/${f}`));
    expect((await db.query(`select total, net, party_address from public.register_lines where document_id = $1`, [doc])).rows[0]).toEqual({ total: "0.00", net: "1120.00", party_address: "Iloilo City" });
  });
});
