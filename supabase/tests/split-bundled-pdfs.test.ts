/**
 * Splitting a bundled PDF into one Inbox line per invoice (migration
 * 20261231000003_split_bundled_pdfs.sql): OCR (service role) turns a PDF with several
 * invoices into a bundle with one child document each; the bundle is never a line to
 * review or a document counted; each child is approved and registered like any other;
 * staff assigned to the client (or the Owner) add, remove and re-page invoices; a re-read
 * replaces the unapproved children and is refused once one is approved.
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
const DB_NAME = "split_bundled_pdfs_test";

const OWNER = "00000000-0000-0000-0000-000000000f01";
const PREPARER = "00000000-0000-0000-0000-000000000f02";
const OUTSIDER = "00000000-0000-0000-0000-000000000f03";
const CLIENT_USER = "00000000-0000-0000-0000-000000000f04";
const CUSTOMER = "123-456-789";
const MONTH = "2026-11-01";

type Part = { page: number; position?: string | null; fields: Record<string, string>; confidence?: Record<string, number> };
const sale = (number: string, total = "1120.00") => ({ date: "2026-11-10", number, party_tin: CUSTOMER, vatable: "1000.00", vat: "120.00", total, payment_terms: "charge" });

describe.skipIf(!url)("splitting a bundled PDF into one line per invoice", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;
  let client: string;

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
  const ocr = (doc: string, parts: Part[], pages: number | null = null) =>
    as(null, `select status, bundle_count, bundle_pages from public.split_document($1, $2, $3, 'gemini', 'gemini-test')`, [doc, pages, JSON.stringify(parts.map((p) => ({ confidence: {}, position: null, ...p })))], "service_role");
  /** A PDF the client sent, Received, its file in storage. */
  async function bundle(docType = "sales_invoice", mime = "application/pdf"): Promise<string> {
    const id = (await db.query(`select gen_random_uuid() as id`)).rows[0].id as string;
    const p = `${client}/${id}/bundle.pdf`;
    await db.query(`insert into storage.objects (bucket_id, name) values ('documents', $1)`, [p]);
    await db.query(
      `insert into public.documents (id, client_id, uploaded_by, source, doc_type, period, document_month, file_name, mime_type, size_bytes, storage_path, status, created_at)
       values ($1, $2, $3, 'portal', $4, $5, $5, 'bundle.pdf', $6, 9000, $7, 'received', '2026-11-12 10:00+08')`,
      [id, client, CLIENT_USER, docType, MONTH, mime, p],
    );
    return id;
  }
  const children = async (parent: string) =>
    (await db.query(
      `select d.id, d.bundle_index, d.bundle_page, d.status, d.storage_path, e.status as ocr, e.provider, e.fields
       from public.documents d left join public.extractions e on e.document_id = d.id
       where d.bundle_id = $1 order by d.bundle_index`,
      [parent],
    )).rows;
  const doc = async (id: string) => (await db.query(`select * from public.documents where id = $1`, [id])).rows[0];
  const approve = (user: string, id: string, fields: Record<string, string>) => as(user, `select status from public.approve_document($1, $2)`, [id, JSON.stringify(fields)]);
  const addInvoice = (user: string, id: string, page: number) => as(user, `select id, bundle_index, bundle_page from public.add_bundle_invoice($1, $2)`, [id, page]);
  const removeInvoice = (user: string, id: string) => as(user, `select bundle_count from public.delete_bundle_invoice($1)`, [id]);
  const setPage = (user: string, id: string, page: number) => as(user, `select bundle_index, bundle_page from public.set_bundle_page($1, $2)`, [id, page]);

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
    await db.query(`insert into auth.users (id) values ($1), ($2), ($3), ($4)`, [OWNER, PREPARER, OUTSIDER, CLIENT_USER]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(
      `insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $4, 'Owner', 'owner'), ($2, $4, 'Pia Preparer', 'staff'), ($3, $4, 'Oscar Outsider', 'staff')`,
      [OWNER, PREPARER, OUTSIDER, brand],
    );
    client = (await db.query(`insert into public.clients (brand_id, code, name, taxpayer_type) values ($1, 'TC-9961', 'Jaro Grocery', 'corporation') returning id`, [brand])).rows[0].id;
    // The outsider is staff, but not assigned to this client.
    await db.query(`insert into public.staff_assignments (client_id, user_id, role) values ($1, $2, 'preparer')`, [client, PREPARER]);
    await db.query(`insert into public.client_users (user_id, client_id, full_name) values ($1, $2, 'Gina Jaro')`, [CLIENT_USER, client]);
    await db.query(`insert into public.parties (tin, registered_name) values ($1, 'Bacolod Feeds Corp')`, [CUSTOMER]);
    await db.query(`insert into public.document_cycles (client_id, period, cutoff_date) values ($1, $2, '2099-01-05')`, [client, MONTH]);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let parent: string;

  it("lets only OCR (the service role) split a document", async () => {
    parent = await bundle();
    await expect(as(PREPARER, `select public.split_document($1, 2, '[]', 'x', 'y')`, [parent])).rejects.toThrow(/permission denied/);
    // One invoice found is not a split: the document is read as before.
    await expect(ocr(parent, [{ page: 1, fields: sale("SI-1") }])).rejects.toThrow(/Nothing to split/);
  });

  it("splits several invoices into children that inherit the document and share its file, in page order", async () => {
    const r = await ocr(parent, [{ page: 2, fields: sale("SI-3") }, { page: 1, fields: sale("SI-1") }, { page: 1, position: "bottom", fields: sale("SI-2") }], 2);
    expect(r.rows[0]).toEqual({ status: "split", bundle_count: 3, bundle_pages: 2 });
    const kids = await children(parent);
    expect(kids.map((k) => [k.bundle_index, k.bundle_page, k.status, k.storage_path, k.ocr])).toEqual([
      [1, 1, "under_review", null, "done"],
      [2, 1, "under_review", null, "done"],
      [3, 2, "under_review", null, "done"],
    ]);
    // Within a page, in the order read; pages first.
    expect(kids.map((k) => k.fields.number)).toEqual(["SI-1", "SI-2", "SI-3"]);
    const p = await doc(parent);
    for (const k of kids) {
      expect(await doc(k.id)).toMatchObject({
        client_id: client, doc_type: "sales_invoice", period: p.period, document_month: p.document_month, source: "portal",
        uploaded_by: CLIENT_USER, created_at: p.created_at, late: false, file_name: "bundle.pdf", mime_type: "application/pdf", bundle_id: parent,
      });
    }
    // The bundle keeps the read on record, with no figures of its own.
    expect((await db.query(`select status, fields from public.extractions where document_id = $1`, [parent])).rows[0]).toEqual({ status: "done", fields: {} });
  });

  it("never splits a photo or a document that is not an invoice, receipt or 2307", async () => {
    const photo = await bundle("sales_invoice", "image/jpeg");
    await expect(ocr(photo, [{ page: 1, fields: sale("A") }, { page: 1, fields: sale("B") }])).rejects.toThrow(/Only a PDF/);
    const other = await bundle("other");
    await expect(ocr(other, [{ page: 1, fields: sale("A") }, { page: 2, fields: sale("B") }])).rejects.toThrow(/Only a PDF/);
    await db.query(`delete from public.documents where id in ($1, $2)`, [photo, other]);
  });

  it("counts the invoices, never the bundle: Inbox, volume and the client's month", async () => {
    const waiting = (await as(PREPARER, `select id from public.documents where client_id = $1 and status in ('received', 'under_review')`, [client])).rows.map((r) => r.id);
    expect(waiting).toHaveLength(3);
    expect(waiting).not.toContain(parent);
    const volume = (await db.query(`select documents from public.client_document_volume($1, $1) where client_id = $2`, [MONTH, client])).rows[0];
    expect(volume.documents).toBe(3);
    const card = (await as(OWNER, `select documents from public.client_scorecard($1, $1, '2026-12-31') where client_id = $2`, [MONTH, client])).rows[0];
    expect(card.documents).toBe(3);
    const confirmed = (await as(CLIENT_USER, `select confirmed_documents from public.confirm_month_complete($1, $2)`, [client, MONTH])).rows[0];
    expect(confirmed.confirmed_documents).toBe(3);
  });

  it("serves the children the bundle's file: they are seen by exactly who can see the bundle", async () => {
    const kid = (await children(parent))[0].id;
    expect((await as(CLIENT_USER, `select b.storage_path from public.documents c join public.documents b on b.id = c.bundle_id where c.id = $1`, [kid])).rows).toEqual([
      { storage_path: (await doc(parent)).storage_path },
    ]);
    expect((await as(OUTSIDER, `select id from public.documents where id = $1 or id = $2`, [kid, parent])).rows).toEqual([]);
  });

  it("reads the bundle again without duplicating: unapproved children are replaced", async () => {
    const before = (await children(parent)).map((k) => k.id);
    await ocr(parent, [{ page: 1, fields: sale("SI-1") }, { page: 2, fields: sale("SI-3") }], 2);
    const after = await children(parent);
    expect(after.map((k) => k.fields.number)).toEqual(["SI-1", "SI-3"]);
    expect(after.some((k) => before.includes(k.id))).toBe(false);
    expect((await doc(parent)).bundle_count).toBe(2);
    expect((await db.query(`select count(*)::int as n from public.documents where bundle_id = $1`, [parent])).rows[0].n).toBe(2);
  });

  it("approves a child like any document: a register line for it, none for the bundle", async () => {
    const [first] = await children(parent);
    expect((await approve(PREPARER, first.id, sale("SI-1"))).rows[0].status).toBe("posted");
    const lines = (await db.query(`select document_id, kind, month::text, source from public.register_lines where client_id = $1`, [client])).rows;
    expect(lines).toEqual([{ document_id: first.id, kind: "sale", month: MONTH, source: "portal" }]);
    // The bundle cannot be reviewed or approved itself.
    await expect(approve(PREPARER, parent, sale("SI-X"))).rejects.toThrow(/received or under-review/);
    await expect(as(PREPARER, `select public.review_document($1, 'post')`, [parent])).rejects.toThrow(/cannot be done to a document that is split/);
  });

  it("still finds a duplicate (same customer TIN and number already approved) across children", async () => {
    const [, second] = await children(parent);
    const dup = (await as(PREPARER,
      `select e.document_id from public.extractions e join public.documents d on d.id = e.document_id
       where d.client_id = $1 and e.approved_fields ->> 'party_tin' = $2 and e.approved_fields ->> 'number' = 'SI-1' and e.document_id <> $3`,
      [client, CUSTOMER, second.id],
    )).rows;
    expect(dup).toHaveLength(1);
  });

  it("refuses to read the bundle again once a child is approved", async () => {
    await expect(ocr(parent, [{ page: 1, fields: sale("SI-1") }, { page: 2, fields: sale("SI-3") }], 2)).rejects.toThrow(/already approved/);
    expect(await children(parent)).toHaveLength(2);
  });

  it("lets staff assigned to the client (or the Owner) add an invoice OCR missed, on a page of the PDF", async () => {
    await expect(addInvoice(OUTSIDER, parent, 2)).rejects.toThrow(/Document not found/);
    await expect(addInvoice(CLIENT_USER, parent, 2)).rejects.toThrow(/Only staff assigned/);
    await expect(addInvoice(PREPARER, parent, 3)).rejects.toThrow(/Choose a page from 1 to 2/);
    const added = (await addInvoice(PREPARER, parent, 1)).rows[0];
    expect(added).toMatchObject({ bundle_index: 2, bundle_page: 1 });
    const kids = await children(parent);
    expect(kids.map((k) => [k.bundle_index, k.bundle_page, k.provider])).toEqual([[1, 1, "gemini"], [2, 1, "manual"], [3, 2, "gemini"]]);
    expect(kids[1]).toMatchObject({ status: "under_review", ocr: "done", fields: {} });
    expect((await doc(parent)).bundle_count).toBe(3);
    // From a child too, as the Owner.
    expect((await addInvoice(OWNER, kids[2].id, 2)).rows[0]).toMatchObject({ bundle_index: 4, bundle_page: 2 });
  });

  it("lets them change the page of an invoice; the numbering follows the pages", async () => {
    const kids = await children(parent);
    await expect(setPage(OUTSIDER, kids[1].id, 2)).rejects.toThrow(/Document not found/);
    await expect(setPage(CLIENT_USER, kids[1].id, 2)).rejects.toThrow(/Only staff assigned/);
    await expect(setPage(PREPARER, parent, 1)).rejects.toThrow(/Only an invoice of a bundled PDF/);
    // Pages first, then the order they had: moving invoice 2 to page 2 keeps it second.
    expect((await setPage(PREPARER, kids[1].id, 2)).rows[0]).toEqual({ bundle_index: 2, bundle_page: 2 });
    // Invoice 4 moved to page 1 becomes invoice 2.
    expect((await setPage(OWNER, kids[3].id, 1)).rows[0]).toEqual({ bundle_index: 2, bundle_page: 1 });
    expect((await children(parent)).map((k) => [k.id, k.bundle_page])).toEqual([[kids[0].id, 1], [kids[3].id, 1], [kids[1].id, 2], [kids[2].id, 2]]);
  });

  it("lets them remove an invoice that is not approved, with the numbering closed up; never an approved one or the last", async () => {
    const kids = await children(parent);
    await expect(removeInvoice(OUTSIDER, kids[3].id)).rejects.toThrow(/Document not found/);
    await expect(removeInvoice(CLIENT_USER, kids[3].id)).rejects.toThrow(/Only staff assigned/);
    await expect(removeInvoice(PREPARER, kids[0].id)).rejects.toThrow(/approved/);
    await expect(removeInvoice(PREPARER, parent)).rejects.toThrow(/Only an invoice of a bundled PDF/);
    expect((await removeInvoice(PREPARER, kids[3].id)).rows[0].bundle_count).toBe(3);
    expect((await children(parent)).map((k) => k.bundle_index)).toEqual([1, 2, 3]);
    expect(await doc(kids[3].id)).toBeUndefined();

    const two = await bundle();
    await ocr(two, [{ page: 1, fields: sale("T-1") }, { page: 2, fields: sale("T-2") }], 2);
    const [a, b] = await children(two);
    await removeInvoice(OWNER, a.id);
    await expect(removeInvoice(OWNER, b.id)).rejects.toThrow(/only invoice left/);
  });

  it("splits a PDF read as one invoice when staff add another; what was read becomes invoice 1", async () => {
    const single = await bundle();
    await db.query(`update public.documents set status = 'under_review' where id = $1`, [single]);
    await db.query(`insert into public.extractions (document_id, status, provider, fields, confidence) values ($1, 'done', 'gemini', $2, '{"total": 0.9}')`, [single, JSON.stringify(sale("S-1"))]);
    expect((await addInvoice(PREPARER, single, 3)).rows[0]).toMatchObject({ bundle_index: 2, bundle_page: 3 });
    expect(await doc(single)).toMatchObject({ status: "split", bundle_count: 2 });
    const kids = await children(single);
    expect(kids.map((k) => [k.bundle_index, k.bundle_page, k.provider, k.fields.number ?? null])).toEqual([[1, 1, "gemini", "S-1"], [2, 3, "manual", null]]);
    // The bundle no longer carries figures (they are on invoice 1).
    expect((await db.query(`select fields from public.extractions where document_id = $1`, [single])).rows[0].fields).toEqual({});
  });

  it("keeps the bundle's late flag: a client's month confirmation before the split does not make its invoices late", async () => {
    // The month was confirmed above; a document sent now is late, but this bundle came earlier.
    const early = await bundle();
    await db.query(`update public.documents set late = false where id = $1`, [early]);
    await ocr(early, [{ page: 1, fields: sale("E-1") }, { page: 2, fields: sale("E-2") }], 2);
    expect((await db.query(`select bool_or(late) as late from public.documents where bundle_id = $1`, [early])).rows[0].late).toBe(false);
    const sentLate = await bundle();
    expect((await doc(sentLate)).late).toBe(true);
    await ocr(sentLate, [{ page: 1, fields: sale("L-1") }, { page: 2, fields: sale("L-2") }], 2);
    expect((await db.query(`select bool_and(late) as late from public.documents where bundle_id = $1`, [sentLate])).rows[0].late).toBe(true);
  });

  it("reading a bundle again that now finds one invoice makes it a single document again", async () => {
    const again = await bundle();
    await ocr(again, [{ page: 1, fields: sale("R-1") }, { page: 2, fields: sale("R-2") }], 2);
    expect((await ocr(again, [{ page: 1, fields: sale("R-1") }])).rows[0]).toEqual({ status: "under_review", bundle_count: null, bundle_pages: null });
    expect(await children(again)).toEqual([]);
    expect((await db.query(`select fields ->> 'number' as n from public.extractions where document_id = $1`, [again])).rows[0].n).toBe("R-1");
  });

  it("carries unposted invoices when the month closes; the bundle is not carried or queued", async () => {
    const cycle = (await db.query(`select id from public.document_cycles where client_id = $1 and period = $2`, [client, MONTH])).rows[0].id;
    await db.query(`select private.close_cycle($1, $2)`, [cycle, OWNER]);
    const kids = await children(parent);
    const rows = (await db.query(`select id, status, period::text, carried_from::text, exception_status from public.documents where id = any($1)`, [[parent, ...kids.map((k) => k.id)]])).rows;
    const byId = new Map(rows.map((r) => [r.id, r]));
    expect(byId.get(parent)).toMatchObject({ status: "split", period: MONTH, carried_from: null, exception_status: null });
    expect(byId.get(kids[0].id)).toMatchObject({ status: "posted", period: MONTH });
    for (const k of kids.slice(1)) expect(byId.get(k.id)).toMatchObject({ period: "2026-12-01", carried_from: MONTH });
    // An invoice added to the bundle after the close is placed past the closed month.
    const added = (await addInvoice(PREPARER, parent, 2)).rows[0].id;
    expect((await doc(added)).period).toEqual(new Date(Date.UTC(2026, 11, 1)));
  });
});
