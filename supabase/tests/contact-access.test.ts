/**
 * Contacts and access levels (migration 20270102000001_contact_access.sql): one person
 * linked to several businesses, with a level per business. Full contacts approve and
 * pay; uploaders upload and answer requests; viewers only read. Staff are not affected.
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
const DB_NAME = "contact_access_test";

const OWNER = "00000000-0000-0000-0000-000000000c01";
const STAFF = "00000000-0000-0000-0000-000000000c02";
/** Full on Alpha, viewer on Beta. */
const MARIA = "00000000-0000-0000-0000-000000000c03";
/** Uploader on Alpha. */
const BEN = "00000000-0000-0000-0000-000000000c04";
/** Viewer on Alpha. */
const VIC = "00000000-0000-0000-0000-000000000c05";

describe.skipIf(!url)("contact access levels", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let alpha: string;
  let beta: string;
  let filing: string;
  let soa: string;

  /** Runs `fn` signed in as `user` (or as the service role when null) in a transaction that is rolled back. */
  async function as<T>(user: string | null, fn: () => Promise<T>): Promise<T> {
    await db.query("begin");
    try {
      if (user) {
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
        await db.query("set local role authenticated");
      }
      return await fn();
    } finally {
      await db.query("rollback");
    }
  }
  const q = async <T = Record<string, unknown>>(sql: string, params: unknown[] = []) => (await db.query(sql, params)).rows as T[];
  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }
  async function works(sql: string, params: unknown[] = []) {
    await db.query("savepoint s");
    await db.query(sql, params);
    await db.query("release savepoint s");
  }
  const upload = (client: string) =>
    `select public.register_document('${client}', 'bir_2307_received', date_trunc('month', now())::date, 'a.jpg', 'image/jpeg', 2048)`;
  const ticket = (client: string) => `select public.open_client_ticket('${client}', 'Question', 'Hello')`;
  const approve = () => `select public.advance_filing('${filing}', 'client_approve', null, '{}'::jsonb)`;
  // The proof file is stored beforehand (beforeAll), so this checks the payment itself.
  const pay = () =>
    `select public.submit_payment_proof('${soa}', '${alpha}/${soa}/proof.jpg', 'proof.jpg', 'image/jpeg', 1000, '2026-11-20', null, 'CHK-1', 'check')`;

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4), ($5)`, [OWNER, STAFF, MARIA, BEN, VIC]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    alpha = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9601', 'Alpha Co', 'corporation') returning id`, [brand])).rows[0].id;
    beta = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9602', 'Beta Co', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($3, $2, 'preparer')`, [alpha, STAFF, beta]);
    await db.query(
      `insert into public.client_users (client_id, user_id, full_name, access) values
         ($1, $3, 'Maria', 'full'), ($2, $3, 'Maria', 'viewer'), ($1, $4, 'Ben', 'uploader'), ($1, $5, 'Vic', 'viewer')`,
      [alpha, beta, MARIA, BEN, VIC],
    );
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2020-01-01') returning id`, [alpha])).rows[0].id;
    filing = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '2550Q', 'Q1 2026', '2026-01-01', '2026-03-31', '2550Q', '2026-04-25', '2026-04-25', 'reviewed') returning id`,
      [ob, alpha],
    )).rows[0].id;
    soa = (await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2026-11-10', 'TC-9601-2026-11-10', '2026-11-15') returning id`, [alpha])).rows[0].id;
    await db.query(`insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on) values ($1, $2, 'other', 'Retainer', 1000, '2026-11-05')`, [alpha, soa]);
    await db.query(`insert into storage.objects (bucket_id, name) values ('payment-proofs', $1)`, [`${alpha}/${soa}/proof.jpg`]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("existing and new contacts default to full access", async () => {
    const col = await q<{ column_default: string }>(`select column_default from information_schema.columns where table_name = 'client_users' and column_name = 'access'`);
    expect(col[0].column_default).toContain("full");
  });

  it("one contact sees every business they are linked to, each with its own level", async () => {
    const [{ id }] = await as(MARIA, () => q<{ id: { clients: { client_name: string; access: string }[] } }>(`select public.current_identity() as id`));
    expect(id.clients.map((c) => [c.client_name, c.access])).toEqual([["Alpha Co", "full"], ["Beta Co", "viewer"]]);
    const seen = await as(MARIA, () => q<{ name: string }>(`select name from public.clients order by name`));
    expect(seen.map((c) => c.name)).toEqual(["Alpha Co", "Beta Co"]);
  });

  it("full access uploads, approves returns and pays", async () => {
    await as(MARIA, async () => {
      await works(upload(alpha));
      await works(ticket(alpha));
      await works(approve());
      await works(pay());
    });
  });

  it("an uploader uploads and opens tickets but cannot approve or pay", async () => {
    await as(BEN, async () => {
      await works(upload(alpha));
      await works(ticket(alpha));
      await fails(approve(), [], /Approving returns and paying are for its full-access contacts/);
      await fails(pay(), [], /full-access contacts/);
    });
  });

  it("a viewer reads but changes nothing", async () => {
    await as(VIC, async () => {
      expect(await q(`select id from public.filing_instances where id = $1`, [filing])).toHaveLength(1);
      expect(await q(`select id from public.soas where id = $1`, [soa])).toHaveLength(1);
      await fails(upload(alpha), [], /view only/);
      await fails(ticket(alpha), [], /view only/);
      await fails(approve(), [], /view only/);
      await fails(pay(), [], /view only/);
    });
  });

  it("the level applies per business: full on one does not carry to another", async () => {
    await as(MARIA, async () => {
      await fails(upload(beta), [], /view only/);
      await fails(ticket(beta), [], /view only/);
    });
  });

  it("service-role uploads made for a viewer (Telegram) are refused too", async () => {
    await as(null, async () => {
      await fails(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, storage_path, file_name, mime_type, size_bytes)
         values ($1, $2, 'telegram', 'bir_2307_received', date_trunc('month', now())::date, date_trunc('month', now())::date, 'x/y.jpg', 'y.jpg', 'image/jpeg', 1)`,
        [alpha, VIC],
        /view only/,
      );
    });
  });

  it("a Telegram upload for someone removed from the business is refused", async () => {
    await db.query("begin");
    try {
      await db.query(`delete from public.client_users where user_id = $1 and client_id = $2`, [BEN, alpha]);
      await fails(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, storage_path, file_name, mime_type, size_bytes)
         values ($1, $2, 'telegram', 'bir_2307_received', date_trunc('month', now())::date, date_trunc('month', now())::date, 'x/z.jpg', 'z.jpg', 'image/jpeg', 1)`,
        [alpha, BEN],
        /no longer has access/,
      );
    } finally {
      await db.query("rollback");
    }
  });

  it("the firm's own processing of a viewer's earlier upload (a bundle split) is not blocked", async () => {
    await as(null, async () => {
      await works(
        `insert into public.documents (client_id, uploaded_by, source, doc_type, period, document_month, storage_path, file_name, mime_type, size_bytes)
         values ($1, $2, 'portal', 'bir_2307_received', date_trunc('month', now())::date, date_trunc('month', now())::date, 'x/s.jpg', 's.jpg', 'image/jpeg', 1)`,
        [alpha, VIC],
      );
    });
  });

  it("AR/AP updates need upload access", async () => {
    // As the function inserts them: the signed-in contact, past row-level security.
    await db.query("begin");
    try {
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [VIC]);
      await fails(`insert into public.arap_updates (client_id, month, source, rows) values ($1, date_trunc('month', now())::date, 'portal', '[]')`, [alpha], /view only/);
      await db.query("select set_config('request.jwt.claim.sub', $1, true)", [BEN]);
      await works(`insert into public.arap_updates (client_id, month, source, rows) values ($1, date_trunc('month', now())::date, 'portal', '[]')`, [alpha]);
    } finally {
      await db.query("rollback");
    }
  });

  it("files: viewers add none, uploaders add no proofs of payment", async () => {
    const add = (bucket: string) => `insert into storage.objects (bucket_id, name) values ('${bucket}', '${alpha}/f/${bucket}.jpg')`;
    await as(VIC, async () => {
      for (const b of ["documents", "requests", "payroll", "payment-proofs"]) await fails(add(b), [], /row-level security/);
    });
    await as(BEN, async () => {
      for (const b of ["documents", "requests", "payroll"]) await works(add(b));
      await fails(add("payment-proofs"), [], /row-level security/);
    });
    await as(MARIA, async () => {
      await works(add("payment-proofs"));
    });
  });

  it("staff are not affected", async () => {
    await as(STAFF, async () => {
      await works(upload(alpha));
      await works(upload(beta));
    });
  });

  it("only the Owner changes a contact's level, and the change is in the audit log", async () => {
    await as(STAFF, async () => {
      expect(await q(`update public.client_users set access = 'full' where user_id = $1 returning user_id`, [VIC])).toEqual([]);
    });
    await as(VIC, async () => {
      expect(await q(`update public.client_users set access = 'full' where user_id = $1 returning user_id`, [VIC])).toEqual([]);
    });
    await as(OWNER, async () => {
      await works(`update public.client_users set access = 'uploader' where user_id = $1 and client_id = $2`, [VIC, alpha]);
      const log = await q<{ old: string; new: string }>(
        `select old_row ->> 'access' as old, new_row ->> 'access' as new from public.audit_log where table_name = 'client_users' and row_pk = $1 and action = 'UPDATE'`,
        [VIC],
      );
      expect(log).toEqual([{ old: "viewer", new: "uploader" }]);
      await fails(`update public.client_users set access = 'admin' where user_id = $1`, [VIC], /check constraint/);
    });
  });
});
