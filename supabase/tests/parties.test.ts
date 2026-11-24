/**
 * Parties directory database tests (migration 20261123000016_parties.sql):
 * staff read and edit unverified parties, the Owner or a reviewer verifies,
 * only the Owner changes a verified party, deletes or merges; client links
 * follow client access; approving a document records the party.
 *
 * Runs in its own database so it can run alongside db.test.ts. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "parties_test";

const OWNER = "00000000-0000-0000-0000-000000000021";
const STAFF = "00000000-0000-0000-0000-000000000022";
const REVIEWER = "00000000-0000-0000-0000-000000000023";
const CLIENT_USER = "00000000-0000-0000-0000-000000000024";
const OTHER_STAFF = "00000000-0000-0000-0000-000000000025";

describe.skipIf(!url)("parties directory database", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let clientA: string;
  let clientB: string;

  /** Runs `fn` signed in as `user` inside a transaction that is rolled back. */
  async function as<T>(user: string, fn: () => Promise<T>): Promise<T> {
    await db.query("begin");
    try {
      await signIn(user);
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }
  const signIn = async (user: string) => {
    await db.query("reset role");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
  };

  /** Expects `sql` to fail with `pattern`, without aborting the surrounding transaction. */
  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }

  const addParty = (values: Record<string, unknown>) => {
    const cols = Object.keys(values);
    return db
      .query(`insert into public.parties (${cols.join(", ")}) values (${cols.map((_, i) => `$${i + 1}`).join(", ")}) returning *`, Object.values(values))
      .then((r) => r.rows[0]);
  };

  /** A document with OCR figures, as the service role would leave it, ready for approval. */
  const addDocument = async (client: string, docType: string, fields: Record<string, string>) => {
    await db.query("reset role");
    const doc = (
      await db.query(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status)
         values ($1::uuid, $2, 'staff', $3, '2026-11-01', '2026-11-01', 'r.jpg', 'image/jpeg', 10, $1::text || '/' || gen_random_uuid() || '/r.jpg', 'under_review') returning id`,
        [client, STAFF, docType],
      )
    ).rows[0].id as string;
    await db.query(`insert into public.extractions (document_id, status, fields, confidence) values ($1, 'done', $2, '{}')`, [doc, JSON.stringify(fields)]);
    return doc;
  };
  const approve = (doc: string, fields: Record<string, string>) => db.query(`select public.approve_document($1, $2::jsonb)`, [doc, JSON.stringify(fields)]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, STAFF, REVIEWER, CLIENT_USER, OTHER_STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
       ($1, $5, 'Owner', 'owner'), ($2, $5, 'Staff', 'staff'), ($3, $5, 'Reviewer', 'reviewer'), ($4, $5, 'Other', 'staff')`,
      [OWNER, STAFF, REVIEWER, OTHER_STAFF, brand],
    );
    const ins = `insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, $2, $3, 'corporation') returning id`;
    clientA = (await db.query(ins, [brand, "TC-9201", "Client A"])).rows[0].id;
    clientB = (await db.query(ins, [brand, "TC-9202", "Client B"])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer'), ($4, $5, 'preparer')`, [clientA, STAFF, REVIEWER, clientB, OTHER_STAFF]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Client A owner')`, [CLIENT_USER, clientA]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("tidies the TIN and branch code and checks the name fits the kind", async () => {
    await as(STAFF, async () => {
      const p = await addParty({ tin: "123456789", branch_code: "000", registered_name: "  Acme Trading Corp. ", zip_code: "5000" });
      expect(p).toMatchObject({ tin: "123-456-789", branch_code: "00000", kind: "non_individual", registered_name: "Acme Trading Corp.", display_name: "Acme Trading Corp.", vat_status: "unknown", source: "manual", created_by: STAFF });
      const ind = await addParty({ tin: "222-333-444", branch_code: "1", kind: "individual", last_name: "Dela Cruz", first_name: "Juan", middle_name: "Santos" });
      expect(ind).toMatchObject({ branch_code: "00001", display_name: "Dela Cruz, Juan Santos" });
      await fails(`insert into public.parties (tin, registered_name) values ('123-456-789', 'Acme again')`, [], /duplicate key/);
      await fails(`insert into public.parties (tin, branch_code, registered_name) values ('123-456-789', '00000000', 'Acme again')`, [], /branch_code_check/);
      await fails(`insert into public.parties (tin, registered_name) values ('12345', 'Short')`, [], /tin_check/);
      await fails(`insert into public.parties (tin, registered_name) values ('000000000', 'Zero')`, [], /tin_check/);
      await fails(`insert into public.parties (tin, kind, registered_name) values ('333-333-333', 'individual', 'Juan')`, [], /name_matches_kind/);
      await fails(`insert into public.parties (tin, kind, last_name) values ('333-333-333', 'non_individual', 'Cruz')`, [], /name_matches_kind/);
      await fails(`insert into public.parties (tin, registered_name, zip_code) values ('333-333-333', 'X', '500')`, [], /zip_code_check/);
    });
  });

  it("staff read and edit unverified parties; only the Owner or a reviewer verifies; client users see none", async () => {
    await db.query("begin");
    try {
      await signIn(STAFF);
      const p = await addParty({ tin: "111-222-333", registered_name: "Beta Inc." });
      await fails(`insert into public.parties (tin, registered_name, verified_at) values ('111-222-334', 'Gamma', now())`, [], /row-level security/);
      // A staff member cannot mark it verified: the update is refused.
      await fails(`update public.parties set verified_at = now() where id = $1`, [p.id], /row-level security/);
      expect((await db.query(`update public.parties set registered_name = 'Beta Incorporated' where id = $1 returning registered_name`, [p.id])).rows).toEqual([{ registered_name: "Beta Incorporated" }]);
      expect((await db.query(`delete from public.parties where id = $1 returning id`, [p.id])).rows).toEqual([]);

      await signIn(CLIENT_USER);
      expect((await db.query(`select id from public.parties`)).rows).toEqual([]);
      await fails(`insert into public.parties (tin, registered_name) values ('111-222-335', 'Delta')`, [], /row-level security/);

      await signIn(REVIEWER);
      const v = (await db.query(`update public.parties set verified_at = '2000-01-01' where id = $1 returning verified_by, verified_at > now() - interval '1 minute' as now`, [p.id])).rows[0];
      expect(v).toEqual({ verified_by: REVIEWER, now: true });
      // Verified: staff and reviewers can no longer change it.
      expect((await db.query(`update public.parties set registered_name = 'Changed' where id = $1 returning id`, [p.id])).rows).toEqual([]);
      await signIn(STAFF);
      expect((await db.query(`update public.parties set registered_name = 'Changed' where id = $1 returning id`, [p.id])).rows).toEqual([]);

      await signIn(OWNER);
      const o = (await db.query(`update public.parties set registered_name = 'Beta Inc.', verified_at = now() where id = $1 returning registered_name, verified_by`, [p.id])).rows[0];
      expect(o).toEqual({ registered_name: "Beta Inc.", verified_by: REVIEWER });
      expect((await db.query(`update public.parties set verified_at = null where id = $1 returning verified_by`, [p.id])).rows).toEqual([{ verified_by: null }]);
      expect((await db.query(`delete from public.parties where id = $1 returning id`, [p.id])).rows).toHaveLength(1);
      expect((await db.query(`select count(*)::int n from public.audit_log where table_name = 'parties' and row_pk = $1`, [p.id])).rows[0].n).toBeGreaterThanOrEqual(4);
    } finally {
      await db.query("rollback");
    }
  });

  it("approving a document records the party and links it to the client, without overwriting a verified party", async () => {
    await db.query("begin");
    try {
      const sale = await addDocument(clientA, "sales_invoice", { party_tin: "444-555-666", party_name: "Buyer Corp", date: "2026-10-05" });
      await signIn(STAFF);
      await approve(sale, { party_tin: "444-555-666-000", party_name: "Buyer Corporation", party_address: "Iloilo City", date: "2026-10-05" });
      const p = (await db.query(`select id, tin, branch_code, kind, registered_name, registered_address, source, created_by from public.parties where tin = '444-555-666'`)).rows[0];
      expect(p).toMatchObject({ branch_code: "00000", kind: "non_individual", registered_name: "Buyer Corporation", registered_address: "Iloilo City", source: "ocr", created_by: STAFF });
      expect((await db.query(`select role, first_seen::text, last_seen::text from public.client_parties where client_id = $1 and party_id = $2`, [clientA, p.id])).rows).toEqual([
        { role: "customer", first_seen: "2026-10-05", last_seen: "2026-10-05" },
      ]);

      // A later purchase from the same TIN: the link becomes "both", the dates widen, OCR's newer name wins on an unverified OCR party.
      const buy = await addDocument(clientA, "purchase_receipt", {});
      await signIn(STAFF);
      await approve(buy, { party_tin: "444555666", party_name: "Buyer Corp.", date: "2026-11-02" });
      expect((await db.query(`select role, first_seen::text, last_seen::text from public.client_parties where party_id = $1`, [p.id])).rows).toEqual([
        { role: "both", first_seen: "2026-10-05", last_seen: "2026-11-02" },
      ]);
      expect((await db.query(`select registered_name, registered_address from public.parties where id = $1`, [p.id])).rows[0]).toEqual({ registered_name: "Buyer Corp.", registered_address: "Iloilo City" });

      // Verified: a later approval never changes its names.
      await signIn(OWNER);
      await db.query(`update public.parties set registered_name = 'BUYER CORPORATION', verified_at = now() where id = $1`, [p.id]);
      const again = await addDocument(clientA, "bir_2307_received", {});
      await signIn(REVIEWER);
      await approve(again, { party_tin: "444-555-666", party_name: "Buyr Corp", party_address: "Somewhere", date: "2026-11-20" });
      expect((await db.query(`select registered_name, registered_address from public.parties where id = $1`, [p.id])).rows[0]).toEqual({ registered_name: "BUYER CORPORATION", registered_address: "Iloilo City" });

      // A branch is its own party; a COR, a missing name for a new TIN or a bad TIN records nothing.
      const branch = await addDocument(clientA, "purchase_receipt", {});
      const cor = await addDocument(clientA, "cor", {});
      const noName = await addDocument(clientA, "purchase_receipt", {});
      const badTin = await addDocument(clientA, "purchase_receipt", {});
      await signIn(STAFF);
      await approve(branch, { party_tin: "444-555-666-00002", party_name: "Buyer Corp Cebu", date: "2026-11-03" });
      await approve(cor, { party_tin: "777-777-777", party_name: "Client A itself" });
      await approve(noName, { party_tin: "888-888-888" });
      await approve(badTin, { party_tin: "12-34", party_name: "Nobody" });
      expect((await db.query(`select tin, branch_code from public.parties order by tin, branch_code`)).rows).toEqual([
        { tin: "444-555-666", branch_code: "00000" },
        { tin: "444-555-666", branch_code: "00002" },
      ]);
    } finally {
      await db.query("rollback");
    }
  });

  it("keeps client links to staff who can see the client", async () => {
    await db.query("begin");
    try {
      await signIn(STAFF);
      const p = await addParty({ tin: "555-000-111", registered_name: "Supplier Co" });
      await db.query(`insert into public.client_parties (client_id, party_id, role, first_seen, last_seen) values ($1, $2, 'supplier', '2026-01-01', '2026-02-01')`, [clientA, p.id]);
      await fails(`insert into public.client_parties (client_id, party_id, role, first_seen, last_seen) values ($1, $2, 'supplier', '2026-01-01', '2026-02-01')`, [clientB, p.id], /row-level security/);
      expect((await db.query(`delete from public.client_parties where party_id = $1 returning id`, [p.id])).rows).toEqual([]);

      await signIn(OTHER_STAFF);
      expect((await db.query(`select id from public.client_parties`)).rows).toEqual([]);
      expect((await db.query(`select id from public.parties where id = $1`, [p.id])).rows).toHaveLength(1);

      await signIn(CLIENT_USER);
      expect((await db.query(`select id from public.client_parties`)).rows).toEqual([]);

      await signIn(REVIEWER);
      expect((await db.query(`delete from public.client_parties where party_id = $1 returning id`, [p.id])).rows).toHaveLength(1);
    } finally {
      await db.query("rollback");
    }
  });

  it("the Owner merges duplicates, keeping the verified one", async () => {
    await db.query("begin");
    try {
      await signIn(OWNER);
      const good = await addParty({ tin: "600-600-600", registered_name: "Right Name Inc.", verified_at: new Date().toISOString() });
      const dup = await addParty({ tin: "600-600-601", registered_name: "Rigth Name", registered_address: "Jaro, Iloilo City", zip_code: "5000", source: "ocr" });
      await db.query(
        `insert into public.client_parties (client_id, party_id, role, first_seen, last_seen) values
         ($1, $3, 'customer', '2026-03-01', '2026-03-31'), ($1, $4, 'supplier', '2026-01-01', '2026-02-01'), ($2, $4, 'supplier', '2026-05-01', '2026-05-01')`,
        [clientA, clientB, good.id, dup.id],
      );

      await signIn(STAFF);
      await fails(`select public.merge_parties($1, $2)`, [dup.id, good.id], /Only the Owner/);

      await signIn(OWNER);
      // Passed the wrong way round: the verified one is still kept.
      const kept = (await db.query(`select (m).id, (m).registered_name, (m).registered_address, (m).zip_code, (m).notes from public.merge_parties($1, $2) m`, [dup.id, good.id])).rows[0];
      expect(kept).toMatchObject({ id: good.id, registered_name: "Right Name Inc.", registered_address: "Jaro, Iloilo City", zip_code: "5000" });
      expect(kept.notes).toMatch(/Merged from 600-600-601-00000 \(Rigth Name\)/);
      expect((await db.query(`select id from public.parties where id = $1`, [dup.id])).rows).toEqual([]);
      const links = (await db.query(`select client_id = $1 as a, role, first_seen::text, last_seen::text from public.client_parties where party_id = $2 order by 1 desc`, [clientA, good.id])).rows;
      expect(links).toEqual([
        { a: true, role: "both", first_seen: "2026-01-01", last_seen: "2026-03-31" },
        { a: false, role: "supplier", first_seen: "2026-05-01", last_seen: "2026-05-01" },
      ]);
    } finally {
      await db.query("rollback");
    }
  });

  it("backfills parties from documents approved before the migration", async () => {
    // Re-run the backfill block on a fresh approval made with the trigger disabled.
    await db.query("begin");
    try {
      const doc = await addDocument(clientB, "purchase_receipt", {});
      await db.query("reset role");
      await db.query("alter table public.extractions disable trigger record_party");
      await db.query(`update public.extractions set approved_fields = $2, approved_at = '2026-06-01 10:00+08', approved_by = $3 where document_id = $1`, [
        doc,
        JSON.stringify({ party_tin: "900-100-200", party_name: "Old Supplier", date: "2026-05-31" }),
        OTHER_STAFF,
      ]);
      await db.query("alter table public.extractions enable trigger record_party");
      const migration = read("migrations/20261123000016_parties.sql");
      await db.query(migration.slice(migration.indexOf("-- Backfill")));
      expect((await db.query(`select p.registered_name, p.created_by, cp.role, cp.last_seen::text from public.parties p join public.client_parties cp on cp.party_id = p.id where p.tin = '900-100-200'`)).rows).toEqual([
        { registered_name: "Old Supplier", created_by: OTHER_STAFF, role: "supplier", last_seen: "2026-05-31" },
      ]);
    } finally {
      await db.query("rollback");
    }
  });
});
