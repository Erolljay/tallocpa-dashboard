/**
 * Lead-source tracking (migration 20261214000001_lead_attribution.sql): the
 * Owner's campaign links, the click count behind /go/<code>, first-touch
 * attribution on each lead through submit_lead, and the marketing report.
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
const DB_NAME = "lead_attribution_test";

const OWNER = "00000000-0000-0000-0000-0000000000c1";
const STAFF = "00000000-0000-0000-0000-0000000000c2";
const LEAD = { business_name: "Jaro Print Shop", contact_name: "Ben Cruz", email: "ben@example.com", taxpayer_type: "individual", services: ["tax_compliance"] };

type LinkRow = { id: string; code: string; platform: string; utm_medium: string; campaign: string; content: string | null; target_path: string; clicks: string };
type ReportRow = { channel: string; campaign: string | null; link_id: string | null; link_code: string | null; clicks: string; leads: string; won: string; lost: string; quoted: string; quoted_monthly: string };

describe.skipIf(!url)("lead attribution: campaign links, first touch and the report", () => {
  const admin = new Client({ connectionString: url });
  let db: Client;

  async function as(user: string | null, sql: string, params: unknown[] = [], role?: string) {
    await db.query("begin");
    await db.query("select set_config('request.jwt.claim.sub', $1, true)", [user ?? ""]);
    await db.query(`set local role ${role ?? (user ? "authenticated" : "anon")}`);
    try {
      const r = await db.query(sql, params);
      await db.query("commit");
      return r;
    } catch (e) {
      await db.query("rollback");
      throw e;
    }
  }
  const createLink = (user: string, label: string, platform: string, campaign: string, content: string | null = null, target = "/", code: string | null = null, medium = "social") =>
    as(user, `select * from public.create_marketing_link($1, $2, $3, $4, $5, $6, $7)`, [label, platform, campaign, content, target, code, medium]).then((r) => r.rows[0] as LinkRow);
  const click = (code: string, count = true) => as(null, `select public.record_marketing_click($1, $2) as r`, [code, count], "service_role").then((r) => r.rows[0].r);
  const submit = (attribution: unknown, quote: unknown = { monthlyRetainer: 5000 }, user: string | null = null) =>
    as(user, `select public.submit_lead('TC', $1, $2) as id`, [JSON.stringify({ ...LEAD, ...(attribution === undefined ? {} : { attribution }) }), JSON.stringify(quote)]).then((r) => r.rows[0].id as string);
  const leadRow = (id: string) =>
    db.query(`select utm_source, utm_medium, utm_campaign, utm_content, referrer, landing_path, marketing_link_id, first_touch_at, test from public.leads where id = $1`, [id]).then((r) => r.rows[0]);
  const today = () => db.query(`select (now() at time zone 'Asia/Manila')::date::text as d`).then((r) => r.rows[0].d as string);
  const report = (user: string, from: string, to: string) => as(user, `select * from public.marketing_report($1, $2)`, [from, to]).then((r) => r.rows as ReportRow[]);

  beforeAll(async () => {
    await admin.connect();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.query(`create database ${DB_NAME}`);
    db = new Client({ connectionString: url!.replace(/^(postgres(?:ql)?:\/\/[^/]*\/)[^?]*/, `$1${DB_NAME}`) });
    await db.connect();
    await db.query(read("tests/supabase-stub.sql"));
    for (const f of readdirSync(path.join(root, "migrations")).sort()) await db.query(read(`migrations/${f}`));
    await db.query(read("tests/grants.sql"));
    await db.query(`grant usage on schema public to service_role`);
    await db.query(read("seed.sql"));
    await db.query(`insert into auth.users (id) values ($1), ($2)`, [OWNER, STAFF]);
    const brand = (await db.query(`select id from public.brands where code = 'TC'`)).rows[0].id;
    await db.query(`insert into public.staff_profiles (user_id, brand_id, full_name, role) values ($1, $3, 'Owner', 'owner'), ($2, $3, 'Staff', 'staff')`, [OWNER, STAFF, brand]);
    // Live, so the public's leads are not tests.
    await db.query(`update public.brands set funnel_open = true where code = 'TC'`);
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`drop database if exists ${DB_NAME}`);
    await admin.end();
  });

  let spring: LinkRow;
  let ad: LinkRow;

  it("only the Owner makes and archives links; staff read them; the public cannot", async () => {
    await expect(createLink(STAFF, "Post", "facebook", "Spring")).rejects.toThrow(/Only the Owner/);
    spring = await createLink(OWNER, "Spring post 1", "facebook", "Spring promo", "post-1", "/services", "spring-1");
    expect(spring).toMatchObject({ code: "spring-1", platform: "facebook", utm_medium: "social", campaign: "Spring promo", content: "post-1", target_path: "/services", clicks: "0" });
    ad = await createLink(OWNER, "Tax season ad", "facebook", "Tax Season 2027!", null, "/start", null, "paid_social");
    expect(ad.code).toMatch(/^tax-season-2027-[0-9a-f]{4}$/);
    expect((await as(STAFF, `select count(*)::int as n from public.marketing_links`)).rows[0].n).toBe(2);
    await expect(as(null, `select count(*) from public.marketing_links`)).rejects.toThrow(/permission denied/);
    await expect(as(OWNER, `insert into public.marketing_links (brand_id, code, label, campaign) select brand_id, 'x', 'x', 'x' from public.marketing_links limit 1`)).rejects.toThrow(/row-level security|permission denied/);
  });

  it("checks the code, the page and the platform", async () => {
    await expect(createLink(OWNER, "Dup", "facebook", "Spring", null, "/", "spring-1")).rejects.toThrow(/taken/);
    await expect(createLink(OWNER, "Bad", "facebook", "Spring", null, "/", "Bad Code!")).rejects.toThrow(/lowercase/);
    await expect(createLink(OWNER, "Off-site", "facebook", "Spring", null, "//evil.com")).rejects.toThrow(/path on the site/);
    await expect(createLink(OWNER, "Off-site", "facebook", "Spring", null, "https://evil.com")).rejects.toThrow(/path on the site/);
    await expect(createLink(OWNER, "Myspace", "myspace", "Spring")).rejects.toThrow(/platform/);
    await expect(createLink(OWNER, "  ", "facebook", "Spring")).rejects.toThrow(/label/);
  });

  it("counts clicks for the server only, per day; robots and unknown codes count nothing", async () => {
    await expect(as(OWNER, `select public.record_marketing_click('spring-1')`)).rejects.toThrow(/permission denied/);
    await expect(as(null, `select public.record_marketing_click('spring-1')`)).rejects.toThrow(/permission denied/);
    const r = await click("spring-1");
    expect(r).toMatchObject({ code: "spring-1", target_path: "/services", utm_source: "facebook", utm_medium: "social", utm_campaign: "Spring promo", utm_content: "post-1" });
    await click("SPRING-1");
    await click("spring-1", false);
    for (let i = 0; i < 3; i++) await click(ad.code);
    expect(await click("nope")).toBeNull();
    const counts = (await db.query(`select code, clicks::int from public.marketing_links order by code`)).rows;
    expect(counts).toEqual([{ code: "spring-1", clicks: 2 }, { code: ad.code, clicks: 3 }]);
    expect((await db.query(`select sum(clicks)::int as n from public.marketing_link_clicks`)).rows[0].n).toBe(5);
  });

  it("an archived link goes nowhere and counts nothing", async () => {
    const old = await createLink(OWNER, "Old", "instagram", "Old", null, "/", "old-1");
    await expect(as(STAFF, `select public.archive_marketing_link($1)`, [old.id])).rejects.toThrow(/Only the Owner/);
    await as(OWNER, `select public.archive_marketing_link($1)`, [old.id]);
    await expect(as(OWNER, `select public.archive_marketing_link($1)`, [old.id])).rejects.toThrow(/already archived/);
    expect(await click("old-1")).toBeNull();
    expect((await db.query(`select clicks::int from public.marketing_links where id = $1`, [old.id])).rows[0].clicks).toBe(0);
  });

  let viaLink: string;
  let viaUtm: string;
  let direct: string;

  it("submit_lead keeps the first touch: a link's ref fills its utm tags", async () => {
    viaLink = await submit({ ref: "Spring-1", referrer: "https://l.facebook.com/l.php?u=https%3A%2F%2Ftallocpa.com", landing_path: "/services", first_touch_at: "2026-11-20T01:00:00Z" });
    const l = await leadRow(viaLink);
    expect(l).toMatchObject({ utm_source: "facebook", utm_medium: "social", utm_campaign: "Spring promo", utm_content: "post-1", referrer: "l.facebook.com", landing_path: "/services", marketing_link_id: spring.id, test: false });
    expect(new Date(l.first_touch_at).toISOString()).toBe("2026-11-20T01:00:00.000Z");
  });

  it("cleans and cuts what it is sent, and never fails a request over it", async () => {
    viaUtm = await submit({
      utm_source: " Instagram\u0001 ", utm_medium: "x".repeat(300), utm_campaign: "Bio link", utm_content: "", ref: "unknown-code",
      referrer: "javascript:alert(1)", landing_path: "//evil.com", first_touch_at: "not a date", extra: "ignored",
    });
    const l = await leadRow(viaUtm);
    expect(l).toMatchObject({ utm_source: "instagram", utm_campaign: "Bio link", utm_content: null, referrer: null, landing_path: null, marketing_link_id: null });
    expect(l.utm_medium).toHaveLength(100);
    expect(Date.now() - new Date(l.first_touch_at).getTime()).toBeLessThan(60_000);
    // A first touch in the future, or a year ago, is taken as now.
    const future = await leadRow(await submit({ utm_source: "tiktok", first_touch_at: "2099-01-01T00:00:00Z" }, null));
    expect(Date.now() - new Date(future.first_touch_at).getTime()).toBeLessThan(60_000);
    // Not an object, or none at all: no source.
    direct = await submit("facebook");
    expect(await leadRow(direct)).toMatchObject({ utm_source: null, marketing_link_id: null, referrer: null });
    const none = await leadRow(await submit(undefined, null));
    expect(none).toMatchObject({ utm_source: null, landing_path: null });
  });

  it("keeps every earlier rule of submit_lead", async () => {
    await expect(as(null, `select public.submit_lead('XX', $1, null)`, [JSON.stringify(LEAD)])).rejects.toThrow(/Not found/);
    const staffLead = await submit({ utm_source: "facebook", utm_campaign: "Walk-in from FB" }, null, STAFF);
    const row = (await db.query(`select source, stage, email, utm_campaign from public.leads where id = $1`, [staffLead])).rows[0];
    expect(row).toEqual({ source: "website", stage: "lead", email: "ben@example.com", utm_campaign: "Walk-in from FB" });
    // Closed funnel: the public is refused, staff leads are tests.
    await db.query(`update public.brands set funnel_open = false where code = 'TC'`);
    await expect(submit({ ref: "spring-1" })).rejects.toThrow(/Not found/);
    const test = await submit({ ref: "spring-1" }, null, STAFF);
    expect((await leadRow(test)).test).toBe(true);
    await db.query(`update public.brands set funnel_open = true where code = 'TC'`);
    await db.query(`delete from public.leads where id in ($1, $2)`, [staffLead, test]);
  });

  it("reports clicks, leads, won, lost and the monthly fees quoted, per channel, campaign and link — Owner only", async () => {
    // Another lead through the same link, won; one more lost.
    const won = await submit({ ref: "spring-1" }, { monthlyRetainer: 7000 });
    await db.query(`update public.leads set stage = 'prospect' where id = $1`, [won]);
    await db.query(`update public.leads set stage = 'won' where id = $1`, [won]);
    await db.query(`update public.leads set stage = 'lost', lost_reason = 'Too dear' where id = $1`, [viaLink]);
    // A test lead is left out.
    await db.query(`update public.leads set test = true where id = $1`, [direct]);

    await expect(report(STAFF, "2026-01-01", "2099-12-31")).rejects.toThrow(/Only the Owner/);
    await expect(report(OWNER, "2026-12-31", "2026-01-01")).rejects.toThrow(/period/);
    const d = await today();
    const rows = await report(OWNER, d, d);
    const springRow = rows.find((r) => r.link_code === "spring-1")!;
    expect(springRow).toMatchObject({ channel: "facebook", campaign: "Spring promo", clicks: "2", leads: "2", won: "1", lost: "1", quoted: "2" });
    expect(Number(springRow.quoted_monthly)).toBe(12000);
    const adRow = rows.find((r) => r.link_code === ad.code)!;
    expect(adRow).toMatchObject({ channel: "facebook", campaign: "Tax Season 2027!", clicks: "3", leads: "0", won: "0" });
    const ig = rows.find((r) => r.channel === "instagram" && r.campaign === "Bio link")!;
    expect(ig).toMatchObject({ link_id: null, clicks: "0", leads: "1", quoted: "1" });
    expect(Number(ig.quoted_monthly)).toBe(5000);
    const directRow = rows.find((r) => r.channel === "direct")!;
    expect(directRow).toMatchObject({ leads: "1", quoted: "0" });
    expect(rows.reduce((n, r) => n + Number(r.leads), 0)).toBe(5);

    // Another period: no leads and no clicks.
    expect(await report(OWNER, "2020-01-01", "2020-01-31")).toEqual([]);
  });
});
