/**
 * Notifications database tests (migration 20261213000001_notifications.sql): each event
 * notifies the right people, never the person who caused it; each person reads only their
 * own; email can be turned off per kind; the email queue hands each email out once.
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
const DB_NAME = "notifications_test";

const OWNER = "00000000-0000-0000-0000-0000000000a1";
const PREPARER = "00000000-0000-0000-0000-0000000000a2";
const REVIEWER = "00000000-0000-0000-0000-0000000000a3";
const CLIENT_USER = "00000000-0000-0000-0000-0000000000a4";
const OUTSIDER = "00000000-0000-0000-0000-0000000000a5";

interface Row {
  user_id: string;
  kind: string;
  title: string;
  body: string | null;
  href: string | null;
  email_status: string;
}

describe.skipIf(!url)("notifications", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;
  let filing: string;

  /** Runs `sql` as `user` in a committed transaction, as the API would. */
  async function as(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  /** Runs `sql` as the database owner with `user` as the signed-in person (triggers see auth.uid()). */
  async function acting(user: string | null, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user ?? ""]);
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const latest = async (kind: string): Promise<Row[]> =>
    (await db.query(`select user_id, kind, title, body, href, email_status from public.notifications where kind = $1 order by id`, [kind])).rows;
  const usersOf = async (kind: string) => (await latest(kind)).map((r) => r.user_id).sort();
  const step = (actor: string, action: string, from: string, to: string, note: string | null = null) =>
    acting(actor, `insert into public.filing_events (filing_instance_id, from_status, to_status, actor, action, note) values ($1, $2, $3, $4, $5, $6)`, [filing, from, to, actor, action, note]);

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
    await db.query(
      `insert into auth.users (id, email) values ($1, 'owner@x.ph'), ($2, 'prep@x.ph'), ($3, 'rev@x.ph'), ($4, 'juan@client.ph'), ($5, 'out@x.ph')`,
      [OWNER, PREPARER, REVIEWER, CLIENT_USER, OUTSIDER],
    );
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
       ($1, $5, 'Owner', 'owner'), ($2, $5, 'Prep', 'staff'), ($3, $5, 'Rev', 'reviewer'), ($4, $5, 'Out', 'staff')`,
      [OWNER, PREPARER, REVIEWER, OUTSIDER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9901', 'Jaro Foods', 'corporation') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer'), ($1, $3, 'reviewer')`, [client, PREPARER, REVIEWER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Juan')`, [CLIENT_USER, client]);
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '2550Q', 'quarterly', '2026-01-01') returning id`, [client])).rows[0].id;
    filing = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, tax_due)
       values ($1, $2, '2550Q', 'FY2027-Q1', '2027-01-01', '2027-03-31', '2550Q', '2027-04-25', '2027-04-26', 1500) returning id`,
      [ob, client],
    )).rows[0].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("walks a return through its steps, telling whoever acts next", async () => {
    await step(PREPARER, "prepare", "not_started", "prepared");
    expect(await usersOf("return_ready_for_review")).toEqual([REVIEWER]);

    await step(REVIEWER, "review", "prepared", "reviewed");
    const forClient = await latest("return_for_client_approval");
    expect(forClient.map((r) => r.user_id)).toEqual([CLIENT_USER]);
    expect(forClient[0]).toMatchObject({ title: "Your 2550Q FY2027-Q1 is ready for your approval", href: "/portal/returns" });

    await step(CLIENT_USER, "client_query", "reviewed", "reviewed", "Why is output VAT higher?");
    expect(await usersOf("return_client_query")).toEqual([PREPARER, REVIEWER].sort());
    expect((await latest("return_client_query"))[0].body).toBe("Why is output VAT higher?");

    await step(CLIENT_USER, "client_approve", "reviewed", "client_approved");
    expect(await usersOf("return_ready_for_approval")).toEqual([OWNER]);

    await step(OWNER, "owner_approve", "client_approved", "owner_approved");
    expect(await usersOf("return_approved")).toEqual([PREPARER, REVIEWER].sort());

    await step(PREPARER, "file", "owner_approved", "filed");
    expect(await usersOf("return_filed")).toEqual([OWNER, CLIENT_USER].sort());
    const filed = await latest("return_filed");
    expect(filed.find((r) => r.user_id === OWNER)?.href).toBe(`/app/filings/${filing}`);
    expect(filed.find((r) => r.user_id === CLIENT_USER)?.href).toBe("/portal/returns");
  });

  it("sends a return back to its preparer with the reason, and never notifies the one who acted", async () => {
    await step(REVIEWER, "kick_back", "prepared", "not_started", "Input VAT missing November receipts");
    const back = await latest("return_sent_back");
    expect(back.map((r) => r.user_id)).toEqual([PREPARER]);
    expect(back[0].body).toBe("Reason: Input VAT missing November receipts");
    // The reviewer prepared and sent back nothing here; the preparer acted on prepare: never notified themselves.
    expect((await latest("return_ready_for_review")).some((r) => r.user_id === PREPARER)).toBe(false);
  });

  it("tells the acting approver too, within their limit", async () => {
    await db.query(
      `insert into public.acting_approver_delegations (delegate_user_id, starts_at, ends_at, max_tax_due, reason, created_by)
       values ($1, now() - interval '1 day', now() + interval '1 day', 1000, 'Owner on leave', $2)`,
      [REVIEWER, OWNER],
    );
    await db.query(`delete from public.notifications where kind = 'return_ready_for_approval'`);
    await step(CLIENT_USER, "client_approve", "reviewed", "client_approved");
    // Tax due 1,500 is over the acting approver's 1,000: the Owner only.
    expect(await usersOf("return_ready_for_approval")).toEqual([OWNER]);
    await db.query(`update public.filing_instances set tax_due = 800 where id = $1`, [filing]);
    await step(CLIENT_USER, "client_approve", "reviewed", "client_approved");
    expect(await usersOf("return_ready_for_approval")).toEqual([OWNER, OWNER, REVIEWER].sort());
    await db.query(`delete from public.acting_approver_delegations`);
  });

  it("notifies the other side of a request or ticket", async () => {
    const t = (await as(CLIENT_USER, `select * from public.open_client_ticket($1, 'When is my COR ready?', 'Just checking')`, [client])).rows[0];
    const fromClient = await latest("request_from_client");
    // The ticket goes to the client's preparer, who answers for it (20261216000001).
    expect(fromClient.map((r) => r.user_id)).toEqual([PREPARER]);
    expect(fromClient[0]).toMatchObject({ title: "Jaro Foods opened a request: When is my COR ready?", href: `/app/requests/${t.id}`, body: "Just checking" });

    await as(PREPARER, `select * from public.reply_client_request($1, 'Next week', null, null, null)`, [t.id]);
    const fromFirm = await latest("request_from_firm");
    expect(fromFirm.map((r) => r.user_id)).toEqual([CLIENT_USER]);
    expect(fromFirm[0]).toMatchObject({ title: "Tallo CPA replied: When is my COR ready?", href: `/portal/requests/${t.id}` });
  });

  it("covers payments and statements", async () => {
    const soa = (await acting(OWNER, `insert into public.soas (client_id, billing_date, reference, due_on, created_by) values ($1, '2027-05-01', 'TC-9901-2027-05-01', '2027-05-15', $2) returning id`, [client, OWNER])).rows[0].id;
    // The statement's items come in the same run; the notice counts them at commit.
    await db.query("begin");
    await db.query(`insert into public.soas (client_id, billing_date, reference, due_on) values ($1, '2027-06-01', 'TC-9901-2027-06-01', '2027-06-15')`, [client]);
    await db.query(
      `insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on)
       select $1, id, 'other', 'June bookkeeping', 5000, '2027-06-15' from public.soas where reference = 'TC-9901-2027-06-01'`,
      [client],
    );
    await db.query("commit");
    const statements = await latest("statement_issued");
    expect(statements.map((r) => r.user_id)).toEqual([CLIENT_USER, CLIENT_USER]);
    expect(statements[1].title).toBe("New statement of account: ₱5,000.00");

    const proof = (await acting(CLIENT_USER,
      `insert into public.payment_proofs (client_id, soa_id, amount, paid_on, reference, storage_path, file_name, mime_type, submitted_by)
       values ($1, $2, 5000, '2027-05-10', 'GC-1', 'p/1.png', '1.png', 'image/png', $3) returning id`,
      [client, soa, CLIENT_USER])).rows[0].id;
    expect(await usersOf("payment_proof_submitted")).toEqual([OWNER]);
    expect((await latest("payment_proof_submitted"))[0].title).toBe("Jaro Foods sent proof of payment: ₱5,000.00");

    await acting(OWNER, `update public.payment_proofs set status = 'rejected', reject_reason = 'Amount does not match the bank', reviewed_by = $2, reviewed_at = now() where id = $1`, [proof, OWNER]);
    const rejected = await latest("payment_rejected");
    expect(rejected.map((r) => r.user_id)).toEqual([CLIENT_USER]);
    expect(rejected[0].body).toMatch(/^Reason: Amount does not match the bank/);
  });

  it("tells the Owner about website inquiries, not test or staff-typed leads", async () => {
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await acting(null, `insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type, source) values ($1, 'Molo Bakery', 'Ana', 'ana@molo.ph', 'individual', 'website')`, [brand]);
    await acting(null, `insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type, source, test) values ($1, 'Test Co', 'T', 't@t.ph', 'individual', 'website', true)`, [brand]);
    await acting(OWNER, `insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type, source) values ($1, 'Walk-in Co', 'W', 'w@w.ph', 'individual', 'staff')`, [brand]);
    const leads = await latest("lead_new");
    expect(leads.map((r) => r.title)).toEqual(["New inquiry: Molo Bakery"]);
    expect(leads[0].user_id).toBe(OWNER);
  });

  it("keeps each person to their own notifications; they mark them read", async () => {
    const mine = (await as(CLIENT_USER, `select user_id from public.notifications`)).rows;
    expect(mine.length).toBeGreaterThan(0);
    expect(mine.every((r) => r.user_id === CLIENT_USER)).toBe(true);
    expect((await as(OUTSIDER, `select 1 from public.notifications`)).rows).toEqual([]);
    // No write policy: a direct update changes nothing, an insert is refused.
    expect((await as(CLIENT_USER, `update public.notifications set read_at = now()`)).rowCount).toBe(0);
    await expect(as(CLIENT_USER, `insert into public.notifications (user_id, kind, title) values ($1, 'lead_new', 'x')`, [CLIENT_USER])).rejects.toThrow(/row-level security/);

    const one = (await as(CLIENT_USER, `select id from public.notifications order by id limit 1`)).rows[0].id;
    expect((await as(CLIENT_USER, `select public.mark_notifications_read(array[$1]::bigint[]) as n`, [one])).rows[0].n).toBe(1);
    // Someone else's id does nothing.
    expect((await as(OUTSIDER, `select public.mark_notifications_read(array[$1]::bigint[]) as n`, [one])).rows[0].n).toBe(0);
    await as(CLIENT_USER, `select public.mark_notifications_read()`);
    expect((await as(CLIENT_USER, `select count(*)::int as n from public.notifications where read_at is null`)).rows[0].n).toBe(0);
  });

  it("lets a person turn an email kind off; the bell still shows it", async () => {
    await as(OWNER, `select public.set_notification_email('lead_new', false)`);
    expect((await as(OWNER, `select kind, email from public.notification_preferences`)).rows).toEqual([{ kind: "lead_new", email: false }]);
    // The waiting email for that kind is dropped too.
    expect((await latest("lead_new"))[0].email_status).toBe("skipped");
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await acting(null, `insert into public.leads (brand_id, business_name, contact_name, email, taxpayer_type) values ($1, 'Arevalo Hardware', 'Ben', 'ben@a.ph', 'individual')`, [brand]);
    expect((await latest("lead_new")).map((r) => r.email_status)).toEqual(["skipped", "skipped"]);
    await as(OWNER, `select public.set_notification_email('lead_new', true)`);
    expect((await as(OWNER, `select 1 from public.notification_preferences`)).rows).toEqual([]);
  });

  it("hands each waiting email out once, to the server only, and retries failures", async () => {
    await expect(as(OWNER, `select * from public.claim_notification_emails(10)`)).rejects.toThrow(/permission denied/);
    await db.query("set role service_role");
    try {
      const first = (await db.query(`select * from public.claim_notification_emails(100)`)).rows;
      expect(first.length).toBeGreaterThan(0);
      expect(first[0]).toHaveProperty("email");
      expect(first.find((r) => r.user_id === OWNER)?.is_staff).toBe(true);
      expect(first.find((r) => r.user_id === CLIENT_USER)?.is_staff).toBe(false);
      // Claimed: a second sender gets nothing.
      expect((await db.query(`select * from public.claim_notification_emails(100)`)).rows).toEqual([]);

      await db.query(`select public.finish_notification_email($1, 'sent')`, [first[0].id]);
      await db.query(`select public.finish_notification_email($1, 'failed', 'Resend 500')`, [first[1].id]);
      // Read the rows back as the database owner (in Supabase the service role can read every table).
      await db.query("reset role");
      const after = (await db.query(`select id, email_status, emailed_at is not null as emailed, email_error from public.notifications where id = any($1) order by id`, [[first[0].id, first[1].id]])).rows;
      await db.query("set role service_role");
      expect(after[0]).toMatchObject({ email_status: "sent", emailed: true });
      // A failure goes back in the queue until its fifth try.
      expect(after[1]).toMatchObject({ email_status: "pending", email_error: "Resend 500" });
      expect((await db.query(`select id from public.claim_notification_emails(100)`)).rows.map((r) => r.id)).toEqual([first[1].id]);
    } finally {
      await db.query("reset role");
    }
  });
});
