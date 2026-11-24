/**
 * Branches and the acting approver (spec §3.1, §3.8; Q58, Q68;
 * migration 20261124000002_branches_acting_approver.sql).
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
const DB_NAME = "acting_approver_test";

const OWNER = "00000000-0000-0000-0000-000000000031";
const REVIEWER = "00000000-0000-0000-0000-000000000032";
const STAFF = "00000000-0000-0000-0000-000000000033";
const OTHER_REVIEWER = "00000000-0000-0000-0000-000000000034";

describe.skipIf(!url)("branches and the acting approver", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let brand: string;
  let mainBranch: string;
  /** Client paying BIR directly, nobody from the test assigned except STAFF. */
  let direct: string;
  /** Client whose taxes the firm remits. */
  let remits: string;

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
  async function signIn(user: string) {
    await db.query("reset role");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
  }

  /** Expects `sql` to fail with `pattern`, without aborting the surrounding transaction. */
  async function fails(sql: string, params: unknown[], pattern: RegExp) {
    await db.query("savepoint s");
    await expect(db.query(sql, params)).rejects.toThrow(pattern);
    await db.query("rollback to savepoint s");
  }

  let seq = 0;
  /** A client-approved return for `client`, prepared by `preparer`, as the database superuser. */
  async function approvedReturn(client: string, taxDue: number, preparer = STAFF): Promise<string> {
    await db.query("reset role");
    const start = `${2027 + seq++}-01-01`;
    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601-C', 'monthly', $2) returning id`, [client, start])).rows[0].id;
    const id = (
      await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status, tax_due)
         values ($1, $2, '1601-C', '2027-01', '2027-01-01', '2027-01-31', '1601C', '2027-02-10', '2027-02-10', 'client_approved', $3) returning id`,
        [ob, client, taxDue],
      )
    ).rows[0].id;
    await db.query(`insert into public.filing_events (filing_instance_id, from_status, to_status, actor, action) values ($1, 'not_started', 'prepared', $2, 'prepare')`, [id, preparer]);
    return id;
  }

  /** Names REVIEWER acting approver from now for a week, with `limit` on the tax due. */
  async function delegate(limit: number) {
    await db.query("reset role");
    return (
      await db.query(
        `insert into public.acting_approver_delegations (delegate_user_id, starts_at, ends_at, max_tax_due, reason, created_by)
         values ($1, now() - interval '1 hour', now() + interval '7 days', $2, 'Owner on leave', $3) returning id`,
        [REVIEWER, limit, OWNER],
      )
    ).rows[0].id as string;
  }

  const approve = (filing: string) => db.query(`select (f).status from public.advance_filing($1, 'owner_approve', null, '{}'::jsonb) as f`, [filing]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, REVIEWER, STAFF, OTHER_REVIEWER]);
    brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values
         ($1, $5, 'Owner', 'owner'), ($2, $5, 'Reviewer', 'reviewer'), ($3, $5, 'Staff', 'staff'), ($4, $5, 'Other reviewer', 'reviewer')`,
      [OWNER, REVIEWER, STAFF, OTHER_REVIEWER, brand],
    );
    direct = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9201', 'Direct Co', 'corporation') returning id`, [brand])).rows[0].id;
    remits = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode) values ($1, 'TC-9202', 'Remits Co', 'corporation', 'firm_remits') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $3, 'preparer'), ($2, $3, 'preparer')`, [direct, remits, STAFF]);
    mainBranch = (await db.query(`select id from public.branches where brand_id = $1`, [brand])).rows[0].id;
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  describe("branches", () => {
    it("a new brand gets one branch; clients and staff (not the Owner) are put in it", async () => {
      const branches = (await db.query(`select code, name from public.branches where brand_id = $1`, [brand])).rows;
      expect(branches).toEqual([{ code: "MAIN", name: "Main office" }]);
      const staff = (await db.query(`select role, branch_id from public.staff_profiles order by role`)).rows;
      expect(staff.find((s) => s.role === "owner").branch_id).toBeNull();
      expect(staff.filter((s) => s.role !== "owner").every((s) => s.branch_id === mainBranch)).toBe(true);
      expect((await db.query(`select branch_id from public.clients where id = $1`, [direct])).rows[0].branch_id).toBe(mainBranch);
    });

    it("the Owner adds and closes branches; staff only read them", async () => {
      await as(OWNER, async () => {
        const id = (await db.query(`insert into public.branches (brand_id, code, name) values ($1, 'BAC', 'Bacolod') returning id`, [brand])).rows[0].id;
        await db.query(`update public.clients set branch_id = $2 where id = $1`, [direct, id]);
        await db.query(`update public.branches set active = false where id = $1`, [id]);
        // A client already there keeps its branch; nobody new is put in a closed one.
        await db.query(`update public.clients set name = 'Direct Co.' where id = $1`, [direct]);
        await fails(`update public.clients set branch_id = $2 where id = $1`, [remits, id], /closed/);
      });
      await as(STAFF, async () => {
        expect((await db.query(`select count(*)::int as n from public.branches`)).rows[0].n).toBe(1);
        await fails(`insert into public.branches (brand_id, code, name) values ($1, 'CEB', 'Cebu')`, [brand], /row-level security/);
      });
    });

    it("the client form saves the branch, and blank keeps the current one", async () => {
      await as(OWNER, async () => {
        const id = (await db.query(`insert into public.branches (brand_id, code, name) values ($1, 'ROX', 'Roxas') returning id`, [brand])).rows[0].id;
        const client = { brand_id: brand, branch_id: id, name: "New Co", taxpayer_type: "individual" };
        const c = (await db.query(`select (c).id, (c).branch_id from public.create_client_with_obligations($1::jsonb, '[]'::jsonb, '2027-01-04', '[]'::jsonb) as c`, [JSON.stringify(client)])).rows[0];
        expect(c.branch_id).toBe(id);
        const edit = { name: "New Co", taxpayer_type: "individual", fiscal_year_end_month: 12, filing_channel: "ebirforms", book_type: "manual", payment_mode: "client_pays_direct", submission_cutoff_day: 5, branch_id: "" };
        const after = (await db.query(`select (c).branch_id from public.update_client_with_obligations($1, $2::jsonb, null, null, '[]'::jsonb, '{}') as c`, [c.id, JSON.stringify(edit)])).rows[0];
        expect(after.branch_id).toBe(id);
      });
    });
  });

  describe("acting approver", () => {
    it("only an active Reviewer can be named, one at a time", async () => {
      await db.query("begin");
      try {
        await signIn(OWNER);
        const add = `insert into public.acting_approver_delegations (delegate_user_id, starts_at, ends_at, max_tax_due, reason, created_by)
                     values ($1, now(), now() + interval '3 days', 50000, 'Leave', $2)`;
        await fails(add, [STAFF, OWNER], /active Reviewer/);
        await db.query(add, [REVIEWER, OWNER]);
        await fails(add, [OTHER_REVIEWER, OWNER], /Another acting approver/);
      } finally {
        await db.query("rollback");
      }
      await as(REVIEWER, () =>
        fails(`insert into public.acting_approver_delegations (delegate_user_id, starts_at, ends_at, max_tax_due, reason, created_by) values ($1, now(), now() + interval '1 day', 1, 'x', $1)`, [REVIEWER], /row-level security/),
      );
    });

    it("without an appointment, a reviewer cannot see or approve other clients' returns", async () => {
      await db.query("begin");
      try {
        const filing = await approvedReturn(direct, 1000);
        await signIn(REVIEWER);
        expect((await db.query(`select id from public.filing_instances where id = $1`, [filing])).rows).toEqual([]);
        await fails(`select public.advance_filing($1, 'owner_approve', null, '{}'::jsonb)`, [filing], /access/);
      } finally {
        await db.query("rollback");
      }
    });

    it("while named, approves a paid return under the limit; the step is marked and goes into the digest", async () => {
      await db.query("begin");
      try {
        const delegation = await delegate(50000);
        const filing = await approvedReturn(direct, 20000);
        await signIn(REVIEWER);
        const seen = (await db.query(`select f.id, c.name from public.filing_instances f join public.clients c on c.id = f.client_id where f.id = $1`, [filing])).rows;
        expect(seen).toEqual([{ id: filing, name: "Direct Co" }]);
        expect((await db.query(`select (public.filing_payment_check($1)) ->> 'status' as s`, [filing])).rows[0].s).toBe("not_applicable");
        expect((await approve(filing)).rows[0].status).toBe("owner_approved");
        const step = (await db.query(`select data from public.filing_events where filing_instance_id = $1 and action = 'owner_approve'`, [filing])).rows[0].data;
        expect(step).toMatchObject({ acting_approver: true, delegation_id: delegation, payment_status: "not_applicable" });
        // They can still open what they approved.
        expect((await db.query(`select status from public.filing_instances where id = $1`, [filing])).rows).toEqual([{ status: "owner_approved" }]);
        await db.query("reset role");
        const today = (await db.query(`select (now() at time zone 'Asia/Manila')::date::text as d`)).rows[0].d;
        const digest = (await db.query(`select client_name, form, approver from public.acting_approvals_on($1)`, [today])).rows;
        expect(digest).toEqual([{ client_name: "Direct Co", form: "1601-C", approver: "Reviewer" }]);
      } finally {
        await db.query("rollback");
      }
    });

    it("cannot approve above the limit, an unpaid return, or a return they prepared", async () => {
      await db.query("begin");
      try {
        await delegate(50000);
        const big = await approvedReturn(direct, 80000);
        const unpaid = await approvedReturn(remits, 1000);
        const own = await approvedReturn(direct, 1000, REVIEWER);
        await signIn(REVIEWER);
        await fails(`select public.advance_filing($1, 'owner_approve', null, '{}'::jsonb)`, [big], /above your approval limit of ₱50,000\.00/);
        await fails(`select public.advance_filing($1, 'owner_approve', null, '{"approve_unpaid": true}'::jsonb)`, [unpaid], /only the Owner can approve it/);
        await fails(`select public.advance_filing($1, 'owner_approve', null, '{}'::jsonb)`, [own], /You prepared this return/);
        // Other steps on clients they are not assigned to stay closed.
        await fails(`select public.advance_filing($1, 'file', null, '{"filing_reference":"x","filed_on":"2027-02-09"}'::jsonb)`, [big], /access|approved/);
      } finally {
        await db.query("rollback");
      }
    });

    it("stops when the Owner ends the appointment", async () => {
      await db.query("begin");
      try {
        const delegation = await delegate(50000);
        const filing = await approvedReturn(direct, 1000);
        await signIn(OWNER);
        await db.query(`update public.acting_approver_delegations set ended_at = now(), ended_by = $2 where id = $1`, [delegation, OWNER]);
        await fails(`update public.acting_approver_delegations set max_tax_due = 1 where id = $1`, [delegation], /End this acting approver/);
        await signIn(REVIEWER);
        expect((await db.query(`select id from public.filing_instances where id = $1`, [filing])).rows).toEqual([]);
        await fails(`select public.advance_filing($1, 'owner_approve', null, '{}'::jsonb)`, [filing], /access/);
      } finally {
        await db.query("rollback");
      }
    });

    it("the Owner still approves anything, unpaid included when ticked", async () => {
      await db.query("begin");
      try {
        await delegate(50000);
        const unpaid = await approvedReturn(remits, 90000);
        await signIn(OWNER);
        await fails(`select public.advance_filing($1, 'owner_approve', null, '{}'::jsonb)`, [unpaid], /approve even though unpaid/);
        const r = await db.query(`select (f).status from public.advance_filing($1, 'owner_approve', null, '{"approve_unpaid": true}'::jsonb) as f`, [unpaid]);
        expect(r.rows[0].status).toBe("owner_approved");
        const step = (await db.query(`select data from public.filing_events where filing_instance_id = $1 and action = 'owner_approve'`, [unpaid])).rows[0].data;
        expect(step.acting_approver).toBeUndefined();
      } finally {
        await db.query("rollback");
      }
    });
  });
});
