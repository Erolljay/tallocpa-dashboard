/**
 * The BIR Mail Clerk (migration 20270110000001, src/lib/bir-mail/ai-tools.ts;
 * docs/AI-WORKFORCE.md §3), end to end through the connector handler:
 *
 *   - its tools are listed only once granted;
 *   - it lists BIR mail not yet linked, newest first, never mail linked to another
 *     client, and skips mail it already proposed on unless asked;
 *   - read_bir_mail finds its clients by the TINs named and their returns around the date;
 *   - propose_bir_mail_match saves a draft for the Owner and the client's staff; an LOA is
 *     urgent and reaches the Owner at once; refused for other clients and their returns;
 *   - it still cannot read the table, link, set aside or change anything itself;
 *   - staff keeping the client's books accept, which links the mail to the return; other
 *     staff cannot; the Owner sets mail aside.
 *
 * Runs in its own database. `pnpm test:db`.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashKey, newKey } from "../../src/lib/ai/credentials";
import { asAi, handleMcp } from "../../src/lib/mcp/handler";
import type { Connector } from "../../src/lib/mcp/types";

const url = process.env.TEST_DATABASE_URL;
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const DB_NAME = "ai_bir_mail_clerk_test";

const OWNER = "00000000-0000-0000-0000-00000000a101";
const PREPARER = "00000000-0000-0000-0000-00000000a102";
const OTHER_STAFF = "00000000-0000-0000-0000-00000000a103";
const CLERK = "00000000-0000-0000-0000-00000000a1a1";
const NOW = new Date("2027-04-12T02:00:00Z");

describe.skipIf(!url)("AI BIR Mail Clerk: BIR mail matched to returns, notices flagged, people link", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let conn: Connector;
  let jaro: string;
  let molo: string;
  const filing: Record<string, string> = {};
  const mail: Record<string, string> = {};
  const key = newKey();
  let id = 0;

  type Reply = { result?: { isError?: boolean; structuredContent?: Record<string, unknown>; content: { text: string }[] }; error?: { message: string } };
  const call = async (name: string, args: Record<string, unknown> = {}) =>
    (await handleMcp(conn, { aiKey: "bir_mail_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/call", params: { name, arguments: args } }, now: NOW })).json as Reply;
  const data = async (name: string, args: Record<string, unknown> = {}) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(r)).toBeUndefined();
    return r.result!.structuredContent as Record<string, unknown>;
  };
  const refused = async (name: string, args: Record<string, unknown>) => {
    const r = await call(name, args);
    expect(r.result?.isError, JSON.stringify(args)).toBe(true);
    return r.result!.content[0].text;
  };
  async function as<T = Record<string, unknown>>(user: string, sql: string, params: unknown[] = []) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user]);
    await db.query("set local role authenticated");
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r.rows as T[];
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }

  async function addMail(m: { received: string; subject: string; text: string; kind: string; notice?: string; tins: string[]; client?: string; status?: string }) {
    return (await db.query(
      `insert into public.bir_mail (gmail_message_id, received_at, from_address, subject, body_text, kind, notice_type, tins, attachments, status, client_id)
       values (gen_random_uuid()::text, $1, 'eFPS <efps@bir.gov.ph>', $2, $3, $4, $5, $6, $7, $8, $9) returning id`,
      [m.received, m.subject, m.text, m.kind, m.notice ?? null, m.tins, JSON.stringify([{ path: "x/1-loa.pdf", file_name: "LOA.pdf", mime_type: "application/pdf", size: 2048 }]), m.status ?? "unmatched", m.client ?? null],
    )).rows[0].id as string;
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
    conn = { connect: async () => ({ query: (sql: string, params?: unknown[]) => db.query(sql, params), release: () => undefined }) } as unknown as Connector;

    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, OTHER_STAFF, CLERK]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Preparer', 'staff'), ($3, $4, 'Other', 'staff')`, [OWNER, PREPARER, OTHER_STAFF, brand]);
    jaro = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, tin) values ($1, 'TC-9911', 'Jaro Trading', 'corporation', 'firm_remits', '123-456-789-000') returning id`, [brand])).rows[0].id;
    molo = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type, payment_mode, tin) values ($1, 'TC-9912', 'Molo Foods', 'corporation', 'firm_remits', '987-654-321-000') returning id`, [brand])).rows[0].id;
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [jaro, PREPARER]);

    const ob = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601EQ', 'quarterly', '2020-01-01') returning id`, [jaro])).rows[0].id;
    const moloOb = (await db.query(`insert into public.obligations (client_id, form, frequency, start_date) values ($1, '1601EQ', 'quarterly', '2020-01-01') returning id`, [molo])).rows[0].id;
    const addFiling = async (client: string, o: string, label: string, start: string, end: string, due: string) =>
      (await db.query(
        `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
         values ($1, $2, '1601EQ', $3, $4, $5, '1601EQ', $6, $6, 'not_started') returning id`,
        [o, client, label, start, end, due],
      )).rows[0].id as string;
    filing.jaro = await addFiling(jaro, ob, "Q1 2027", "2027-01-01", "2027-03-31", "2027-04-30");
    filing.molo = await addFiling(molo, moloOb, "Q1 2027", "2027-01-01", "2027-03-31", "2027-04-30");

    mail.confirm = await addMail({ received: "2027-04-10T01:00:00Z", subject: "Tax Return Receipt Confirmation", text: "Your 1601EQ for TIN 123-456-789-000 was received. Filing Reference No. 555.", kind: "filing_confirmation", tins: ["123-456-789"] });
    mail.loa = await addMail({ received: "2027-04-11T01:00:00Z", subject: "Letter of Authority", text: "TIN 123456789000. Please present your books of accounts within fifteen (15) days from receipt hereof.", kind: "notice", notice: "loa", tins: ["123-456-789"] });
    mail.moloLinked = await addMail({ received: "2027-04-09T01:00:00Z", subject: "Molo confirmation", text: "TIN 987-654-321", kind: "filing_confirmation", tins: ["987-654-321"], client: molo, status: "matched" });

    await db.query(`insert into public.ai_employees (user_id, brand_id, key, name, department, runs_on, books_level, enabled) values ($1, $2, 'bir_mail_clerk', 'BIR Mail Clerk', 'compliance', 'cowork', 'none', true)`, [CLERK, brand]);
    await db.query(`insert into public.ai_assignments (ai_user_id, client_id) values ($1, $2)`, [CLERK, jaro]);
    await db.query(`insert into public.ai_credentials (ai_user_id, token_hash, token_hint, created_at, expires_at) values ($1, $2, right($3, 4), '2027-01-01', '2027-06-01')`, [CLERK, hashKey(key), key]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  it("lists its tools only once the Owner grants them", async () => {
    expect((await call("bir_mail_to_match")).error?.message).toMatch(/Unknown tool/);
    await db.query(`insert into public.ai_tool_grants (ai_user_id, tool) values ($1, 'bir_mail_to_match'), ($1, 'read_bir_mail'), ($1, 'propose_bir_mail_match')`, [CLERK]);
    const r = await handleMcp(conn, { aiKey: "bir_mail_clerk", authorization: `Bearer ${key}`, body: { jsonrpc: "2.0", id: ++id, method: "tools/list" }, now: NOW });
    const tools = (r.json as { result: { tools: { name: string; annotations: { readOnlyHint: boolean } }[] } }).result.tools;
    expect(tools.map((t) => t.name).sort()).toEqual(["bir_mail_to_match", "propose_bir_mail_match", "read_bir_mail"]);
    expect(tools.find((t) => t.name === "propose_bir_mail_match")?.annotations.readOnlyHint).toBe(false);
  });

  it("lists BIR mail not yet linked, newest first, the LOA marked urgent", async () => {
    const r = await data("bir_mail_to_match");
    const listed = r.mail as { id: string; urgent: boolean; notice: string | null; my_proposal: string }[];
    expect(listed.map((m) => m.id)).toEqual([mail.loa, mail.confirm]);
    expect(listed[0]).toMatchObject({ urgent: true, notice: "Letter of Authority (LOA)", my_proposal: "none" });
    expect(r.already_proposed).toBe(0);
  });

  it("reads an email with its clients by TIN, their returns around the date, and the deadline", async () => {
    const r = await data("read_bir_mail", { mail_id: mail.loa });
    expect(r.mail).toMatchObject({ received_on: "2027-04-11", respond_by: "2027-04-26", notice: { type: "loa", urgent: true } });
    expect((r.mail as { attachments: unknown[] }).attachments).toEqual([{ file_name: "LOA.pdf", mime_type: "application/pdf", size: 2048 }]);
    expect(r.candidate_clients).toEqual([expect.objectContaining({ code: "TC-9911" })]);
    const c = await data("read_bir_mail", { mail_id: mail.confirm });
    expect(c.candidate_returns).toEqual([expect.objectContaining({ id: filing.jaro, form: "1601EQ", form_mentioned: true })]);
    expect(await refused("read_bir_mail", { mail_id: mail.moloLinked })).toMatch(/No BIR mail/);
  });

  it("proposes a match as a draft; an LOA is urgent and reaches the Owner at once", async () => {
    const r = await data("propose_bir_mail_match", { mail_id: mail.loa, client: "TC-9911", message_kind: "notice", notice_type: "loa", notice_date: "2027-04-08", reason: "The LOA names Jaro's TIN and asks for its books." });
    expect(r).toMatchObject({ saved: true, urgency: "high", respond_by: "2027-04-23" });
    await data("propose_bir_mail_match", { mail_id: mail.confirm, client: "TC-9911", filing_id: filing.jaro, message_kind: "filing_confirmation", reason: "Confirmation of Jaro's 1601EQ Q1 2027 by TIN and form." });
    const { rows } = await db.query(`select kind, client_id, subject_table, subject_id, status, payload->>'urgency' as urgency, payload->>'filing_id' as filing from public.ai_drafts order by created_at`);
    expect(rows).toEqual([
      { kind: "bir_mail_match", client_id: jaro, subject_table: "bir_mail", subject_id: mail.loa, status: "open", urgency: "high", filing: null },
      { kind: "bir_mail_match", client_id: jaro, subject_table: "bir_mail", subject_id: mail.confirm, status: "open", urgency: "normal", filing: filing.jaro },
    ]);
    const n = (await db.query(`select user_id, kind, title, href from public.notifications where kind = 'bir_notice_flagged'`)).rows;
    expect(n).toEqual([{ user_id: OWNER, kind: "bir_notice_flagged", title: "TC-9911 Jaro Trading: Letter of Authority (LOA) received", href: `/app/bir-mail/${mail.loa}` }]);
    expect(await as(PREPARER, `select subject_id from public.ai_drafts where kind = 'bir_mail_match' order by created_at`)).toHaveLength(2);
    expect(await as(OTHER_STAFF, `select subject_id from public.ai_drafts`)).toHaveLength(0);
  });

  it("the next run skips mail it already proposed on, unless asked", async () => {
    const r = await data("bir_mail_to_match");
    expect(r.mail).toEqual([]);
    expect(r.already_proposed).toBe(2);
    const all = await data("bir_mail_to_match", { include_proposed: true });
    expect((all.mail as { my_proposal: string }[]).map((m) => m.my_proposal)).toEqual(["open", "open"]);
  });

  it("refuses another client, another client's return, and a notice without its type", async () => {
    expect(await refused("propose_bir_mail_match", { mail_id: mail.confirm, client: "TC-9912", message_kind: "filing_confirmation", reason: "Testing what is refused." })).toMatch(/No client "TC-9912"/);
    expect(await refused("propose_bir_mail_match", { mail_id: mail.confirm, client: "TC-9911", filing_id: filing.molo, message_kind: "filing_confirmation", reason: "Testing what is refused." })).toMatch(/No return/);
    expect(await refused("propose_bir_mail_match", { mail_id: mail.loa, client: "TC-9911", message_kind: "notice", reason: "Testing what is refused." })).toMatch(/notice_type/);
    expect(await refused("propose_bir_mail_match", { mail_id: mail.moloLinked, client: "TC-9911", message_kind: "other", reason: "Testing what is refused." })).toMatch(/No BIR mail/);
  });

  it("still cannot read the table, link, set aside or change anything itself", async () => {
    const seen = await asAi(conn, CLERK, true, async (q) => (await q.query(`select count(*)::int as n from public.bir_mail`)).rows[0].n);
    expect(seen).toBe(0);
    const changed = await asAi(conn, CLERK, false, async (q) => (await q.query(`update public.bir_mail set status = 'dismissed' returning id`)).rows.length);
    expect(changed).toBe(0);
    const draft = (await db.query(`select id from public.ai_drafts where subject_id = $1`, [mail.confirm])).rows[0].id;
    await expect(as(CLERK, `select public.accept_bir_mail_match($1)`, [draft])).rejects.toThrow(/Only the Owner or staff/);
    await expect(as(CLERK, `select public.link_bir_mail($1, $2)`, [mail.confirm, jaro])).rejects.toThrow(/Only the Owner/);
    await expect(as(CLERK, `select public.dismiss_bir_mail($1)`, [mail.confirm])).rejects.toThrow(/Only the Owner/);
    await expect(as(CLERK, `update public.filing_instances set status = 'filed' where id = $1 returning id`, [filing.jaro])).resolves.toHaveLength(0);
    // Staff cannot use the Clerk's reading functions.
    await expect(as(PREPARER, `select * from public.ai_bir_mail()`)).rejects.toThrow(/Only the switched-on BIR Mail Clerk/);
    await db.query(`update public.ai_employees set enabled = false where user_id = $1`, [CLERK]);
    await expect(as(CLERK, `select * from public.ai_bir_mail()`)).rejects.toThrow(/Only the switched-on BIR Mail Clerk/);
    await db.query(`update public.ai_employees set enabled = true where user_id = $1`, [CLERK]);
  });

  it("staff keeping the client's books accept, which links the mail to the return; others cannot", async () => {
    const draft = (await db.query(`select id from public.ai_drafts where subject_id = $1`, [mail.confirm])).rows[0].id;
    await expect(as(OTHER_STAFF, `select public.accept_bir_mail_match($1)`, [draft])).rejects.toThrow(/Only the Owner or staff/);
    expect(await as(PREPARER, `select id from public.bir_mail`)).toHaveLength(0);
    await as(PREPARER, `select public.accept_bir_mail_match($1, 'Right return')`, [draft]);
    const m = (await db.query(`select status, client_id, filing_instance_id, linked_by from public.bir_mail where id = $1`, [mail.confirm])).rows[0];
    expect(m).toEqual({ status: "matched", client_id: jaro, filing_instance_id: filing.jaro, linked_by: PREPARER });
    expect((await db.query(`select status, decided_by from public.ai_drafts where id = $1`, [draft])).rows[0]).toEqual({ status: "accepted", decided_by: PREPARER });
    expect(await as(PREPARER, `select id from public.bir_mail`)).toEqual([{ id: mail.confirm }]);
    expect(await as(OTHER_STAFF, `select id from public.bir_mail`)).toHaveLength(0);
    await expect(as(PREPARER, `select public.accept_bir_mail_match($1)`, [draft])).rejects.toThrow(/already accepted/);
  });

  it("reads an eBIRForms confirmation's form and period; staff attach it to the return (the AI cannot)", async () => {
    const ob = (await db.query(`select obligation_id from public.filing_instances where id = $1`, [filing.jaro])).rows[0].obligation_id;
    filing.jaroQ4 = (await db.query(
      `insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, status)
       values ($1, $2, '1601EQ', 'Q4 2026', '2026-10-01', '2026-12-31', '1601EQ', '2027-01-31', '2027-01-31', 'owner_approved') returning id`,
      [ob, jaro],
    )).rows[0].id;
    mail.ebir = (await db.query(
      `insert into public.bir_mail (gmail_message_id, received_at, from_address, subject, body_text, kind, tins, attachments, pdf_path, pdf_name, pdf_size, mailbox)
       values ('ebir-1', '2027-01-20T02:00:00Z', 'eBIRForms <ebirforms-noreply@bir.gov.ph>', 'Tax Return Receipt Confirmation',
               'This confirms receipt of your submission with the following details subject to validation by BIR:' || chr(10) || 'File name: 123456789000-1601EQv2018-122026.xml' || chr(10) || 'Date received by BIR: 20 Jan 2027' || chr(10) || 'Time received by BIR: 10:00 AM',
               'filing_confirmation', '{123-456-789}', '[]', '_bir-mail/ebir-1.pdf', 'bir-confirmation-1601EQ-2026-12.pdf', 1500, 'owner@tallocpa.com') returning id`,
    )).rows[0].id;

    const r = await data("read_bir_mail", { mail_id: mail.ebir });
    expect(r.confirmation).toMatchObject({ tin: "123-456-789-00000", form: "1601EQ", period_end: "2026-12-31", received: "20 Jan 2027 10:00 AM" });
    const candidates = r.candidate_returns as { id: string; form_matches: boolean; period_matches: boolean }[];
    expect(candidates.find((c) => c.id === filing.jaroQ4)).toMatchObject({ form_matches: true, period_matches: true });
    expect(candidates.find((c) => c.id === filing.jaro)).toMatchObject({ form_matches: true, period_matches: false });
    await data("propose_bir_mail_match", { mail_id: mail.ebir, client: "TC-9911", filing_id: filing.jaroQ4, message_kind: "filing_confirmation", reason: "eBIRForms confirms Jaro's 1601EQ for the quarter ending 2026-12-31." });
    const draft = (await db.query(`select id from public.ai_drafts where subject_id = $1 and status = 'open'`, [mail.ebir])).rows[0].id;

    // The AI employee cannot attach; nor can staff not on the client.
    await expect(as(CLERK, `select public.attach_bir_confirmation($1)`, [draft])).rejects.toThrow(/Return not found/);
    await expect(as(OTHER_STAFF, `select public.attach_bir_confirmation($1)`, [draft])).rejects.toThrow(/Return not found/);

    // The Owner attaches: the mail is linked to the return and its PDF becomes a file of the return.
    const fileId = (await as<{ id: string }>(OWNER, `select public.attach_bir_confirmation($1) as id`, [draft]))[0].id;
    expect((await db.query(`select filing_instance_id, client_id, kind, storage_path, file_name, size_bytes::int as size, source from public.filing_files where id = $1`, [fileId])).rows[0]).toEqual({
      filing_instance_id: filing.jaroQ4, client_id: jaro, kind: "bir_confirmation", storage_path: "_bir-mail/ebir-1.pdf", file_name: "bir-confirmation-1601EQ-2026-12.pdf", size: 1500, source: "mailbox",
    });
    expect((await db.query(`select status, client_id, filing_instance_id, linked_by from public.bir_mail where id = $1`, [mail.ebir])).rows[0]).toEqual({ status: "matched", client_id: jaro, filing_instance_id: filing.jaroQ4, linked_by: OWNER });
    expect((await db.query(`select status, decided_by from public.ai_drafts where id = $1`, [draft])).rows[0]).toEqual({ status: "accepted", decided_by: OWNER });
    // Staff on the client see the confirmation on the return; the return is not marked filed by it.
    expect(await as(PREPARER, `select kind from public.filing_files where filing_instance_id = $1`, [filing.jaroQ4])).toEqual([{ kind: "bir_confirmation" }]);
    expect((await db.query(`select status from public.filing_instances where id = $1`, [filing.jaroQ4])).rows[0].status).toBe("owner_approved");
    await expect(as(OWNER, `select public.attach_bir_confirmation($1)`, [draft])).rejects.toThrow(/already accepted/);
  });

  it("refuses to attach mail already linked, or a proposal that names no return", async () => {
    const linked = (await db.query(
      `insert into public.ai_drafts (ai_user_id, client_id, kind, subject_table, subject_id, payload) values ($1, $2, 'bir_mail_match', 'bir_mail', $3, $4) returning id`,
      [CLERK, jaro, mail.ebir, JSON.stringify({ filing_id: filing.jaroQ4 })],
    )).rows[0].id;
    await expect(as(OWNER, `select public.attach_bir_confirmation($1)`, [linked])).rejects.toThrow(/already linked/);
    const noReturn = (await db.query(
      `insert into public.ai_drafts (ai_user_id, client_id, kind, subject_table, subject_id, payload) values ($1, $2, 'bir_mail_match', 'bir_mail', $3, '{}') returning id`,
      [CLERK, jaro, mail.loa],
    )).rows[0].id;
    await expect(as(OWNER, `select public.attach_bir_confirmation($1)`, [noReturn])).rejects.toThrow(/names no return/);
    await db.query(`delete from public.ai_drafts where id = any ($1::uuid[])`, [[linked, noReturn]]);
  });

  it("the Owner sees all BIR mail and sets aside what is no client's", async () => {
    expect(await as(OWNER, `select id from public.bir_mail`)).toHaveLength(4);
    await expect(as(PREPARER, `select public.dismiss_bir_mail($1)`, [mail.loa])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.dismiss_bir_mail($1)`, [mail.loa]);
    expect((await db.query(`select status from public.bir_mail where id = $1`, [mail.loa])).rows[0].status).toBe("dismissed");
    expect((await db.query(`select status from public.ai_drafts where subject_id = $1`, [mail.loa])).rows[0].status).toBe("withdrawn");
  });
});
