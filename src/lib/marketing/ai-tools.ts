/**
 * The Marketing Team's connector tools (docs/AI-WORKFORCE.md §3, §6, §7.2; the Owner's
 * choice of one connector for the Marketing & Growth department, used from Claude Code).
 *
 * Marketing never sees client data: no client, books, return, document, receivable or
 * client contact. These tools read the firm's public facts, the website copy, the fee
 * schedule, the leads (prospects) and the Firm → Marketing report, and draft proposals
 * and follow-ups for the Owner. Nothing is sent, posted or published, and no price is
 * changed. Database reads go through read-only functions (migration
 * 20270112000001_ai_marketing_team.sql) that answer only the switched-on Marketing Team.
 * Drafts are saved with no client id, so only the Owner reads and decides them.
 */
import { z } from "zod";
import { saveDraft } from "@/lib/ai/drafts";
import { defineTool, ToolRefusal } from "@/lib/mcp/tool";
import type { Queryable } from "@/lib/mcp/types";
import { BRAND_NAME, PRACTITIONER, SITE_URL, TAGLINE } from "@/lib/site/config";
import { FAQ_GROUPS, HOW_STEPS, SAFEGUARDS, SERVICE_GROUPS, SERVICES } from "@/lib/site/content";
import { SITE_PAGES } from "@/lib/site/metadata";
import { feeLine, proposalTotals, type ScheduleItem } from "./proposal-lines";

const TEAM = ["marketing_team"] as const;
export const PROPOSAL_KIND = "proposal";
export const FOLLOW_UP_KIND = "lead_follow_up";

/** The stages of a lead (src/lib/funnel/labels.ts). */
const STAGES = ["lead", "prospect", "won", "onboarding", "lost"] as const;
const leadId = z.string().uuid("Give the lead's id (from leads_pipeline).");
const DAY = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const day = z.string().regex(DAY, "Use YYYY-MM-DD.");

/** Where the firm works (the website's structured data says the same). */
const SERVICE_AREAS = ["Iloilo City", "Iloilo", "Philippines (nationwide, online)"];

const money = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

async function readLead(db: Queryable, id: string): Promise<Record<string, unknown>> {
  try {
    const { rows } = await db.query<{ lead: Record<string, unknown> }>(`select public.ai_lead($1) as lead`, [id]);
    return rows[0].lead;
  } catch (e) {
    if (/No lead/.test((e as Error).message)) throw new ToolRefusal(`No lead ${id}.`);
    throw e;
  }
}

async function activeSchedule(db: Queryable): Promise<{ name: string; prices_include_tax: boolean; quote_valid_days: number; minimum_monthly_retainer: string | null; items: ScheduleItem[] } | null> {
  const { rows } = await db.query<{ s: Awaited<ReturnType<typeof activeSchedule>> }>(`select public.ai_fee_schedule() as s`);
  return rows[0]?.s ?? null;
}

export const firmProfile = defineTool({
  name: "firm_profile",
  title: "Firm profile",
  description:
    "Tallo CPA's public facts for marketing copy: names, tagline, the practitioner, credentials and accreditation numbers, public contact details, service areas, the services offered (as the website describes them) and the website. Only what the firm already publishes; no client, staff or financial data.",
  input: z.object({}),
  employees: TEAM,
  effect: "read",
  async run({ db }) {
    const { rows } = await db.query<{ p: Record<string, unknown> }>(`select public.ai_marketing_profile() as p`);
    const p = rows[0]?.p ?? {};
    return {
      brand: BRAND_NAME,
      tagline: TAGLINE,
      practitioner: PRACTITIONER,
      website: SITE_URL,
      from_settings: p,
      service_areas: SERVICE_AREAS,
      services: SERVICES.map((s) => ({ slug: s.slug, name: s.name, group: SERVICE_GROUPS[s.group], summary: s.summary, includes: s.includes, for_whom: s.forWhom, notes: s.notes ?? [] })),
      rules: "Public practice advertising: factual only; no testimonials, client names, rankings, guarantees or comparisons with other firms.",
    };
  },
});

export const feeSchedule = defineTool({
  name: "fee_schedule",
  title: "Fee schedule",
  description:
    "The firm's active fee schedule: each item's code, component, label, band, billing (monthly, annual, one time, per unit monthly, multiplier), price in pesos (or price on request) and when it applies, plus whether prices include the tax on the fee and the minimum monthly retainer. Read-only: quote only these prices, never change or discount them.",
  input: z.object({}),
  employees: TEAM,
  effect: "read",
  async run({ db }) {
    const s = await activeSchedule(db);
    if (!s) return { active: false, note: "No fee schedule is active. Ask the Owner to activate one in Firm → Fees." };
    return { active: true, ...s };
  },
});

export const leadsPipeline = defineTool({
  name: "leads_pipeline",
  title: "Leads pipeline",
  description:
    "The firm's leads (prospects who asked for a quote or were added by staff), newest first: business, contact name, taxpayer type, services asked for, stage (lead, prospect, won, onboarding, lost), channel and campaign that brought them, dates, the instant quote's monthly retainer and how many proposals were sent, with counts by stage and by channel. No email or mobile here: open one lead for its contact details. A lead that became a client shows only converted: true.",
  input: z.object({
    stage: z.enum(STAGES).optional().describe("Only this stage"),
    channel: z.string().trim().min(1).max(60).optional().describe("Only this channel (e.g. facebook, google, direct, staff)"),
    from: day.optional().describe("Created on or after, YYYY-MM-DD"),
    to: day.optional().describe("Created on or before, YYYY-MM-DD"),
    limit: z.number().int().min(1).max(500).default(100).describe("At most this many leads"),
  }),
  employees: TEAM,
  effect: "read",
  async run({ db }, { stage, channel, from, to, limit }) {
    const { rows } = await db.query<{
      id: string; business_name: string; contact_name: string; taxpayer_type: string; services: string[]; stage: string; channel: string;
      campaign: string | null; created_at: Date; stage_changed_at: Date; monthly_quote: string | null; proposals: string; converted: boolean;
    }>(`select * from public.ai_leads($1, $2, $3::date, $4::date, $5)`, [stage ?? null, channel ?? null, from ?? null, to ?? null, limit]);
    const count = (key: "stage" | "channel") => rows.reduce<Record<string, number>>((m, r) => ((m[r[key]] = (m[r[key]] ?? 0) + 1), m), {});
    return {
      total: rows.length,
      by_stage: count("stage"),
      by_channel: count("channel"),
      leads: rows.map((r) => ({
        id: r.id,
        business: r.business_name,
        contact: r.contact_name,
        taxpayer_type: r.taxpayer_type,
        services: r.services,
        stage: r.stage,
        channel: r.channel,
        campaign: r.campaign,
        created: new Date(r.created_at).toISOString().slice(0, 10),
        stage_since: new Date(r.stage_changed_at).toISOString().slice(0, 10),
        monthly_quote: r.monthly_quote === null ? null : Number(r.monthly_quote),
        proposals_sent: Number(r.proposals),
        converted: r.converted,
      })),
    };
  },
});

export const lead = defineTool({
  name: "lead",
  title: "A lead",
  description:
    "One lead in full, to draft a proposal or a follow-up: business and contact details (name, email, mobile), taxpayer type, services and business profile asked about, their message, the instant quote, stage and lost reason, the channel, campaign and landing page that brought them, discovery calls (with notes) and proposals sent. A lead that became a client shows only converted and when; the client's records are not marketing's.",
  input: z.object({ lead_id: leadId }),
  employees: TEAM,
  effect: "read",
  async run({ db }, { lead_id }) {
    return readLead(db, lead_id);
  },
});

export const marketingReport = defineTool({
  name: "marketing_report",
  title: "Marketing report",
  description:
    "The Owner's Firm → Marketing report by month, channel and campaign for a period: campaign-link clicks, leads, leads with a quote, won (became clients), lost, and the monthly retainers quoted, with totals and conversion rates. Numbers only, no client data. Default: the last 6 months.",
  input: z.object({
    from: day.optional().describe("First day, YYYY-MM-DD (default: 6 months ago)"),
    to: day.optional().describe("Last day, YYYY-MM-DD (default: today)"),
  }),
  employees: TEAM,
  effect: "read",
  async run({ db, today }, { from, to }) {
    const end = to ?? today;
    const start = from ?? (() => {
      const d = new Date(`${end}T00:00:00Z`);
      d.setUTCMonth(d.getUTCMonth() - 6);
      return d.toISOString().slice(0, 10);
    })();
    if (start > end) throw new ToolRefusal("Give a period whose start is on or before its end.");
    const { rows } = await db.query<{
      month: string; channel: string; campaign: string | null; link_code: string | null; link_label: string | null;
      clicks: string; leads: string; quoted: string; won: string; lost: string; quoted_monthly: string;
    }>(`select month::text, channel, campaign, link_code, link_label, clicks, leads, quoted, won, lost, quoted_monthly from public.ai_marketing_report($1::date, $2::date)`, [start, end]);
    const lines = rows.map((r) => ({
      month: r.month.slice(0, 7),
      channel: r.channel,
      campaign: r.campaign,
      link: r.link_code ? `${r.link_label ?? r.link_code} (${r.link_code})` : null,
      clicks: Number(r.clicks),
      leads: Number(r.leads),
      quoted: Number(r.quoted),
      won: Number(r.won),
      lost: Number(r.lost),
      quoted_monthly: Number(r.quoted_monthly),
    }));
    const sum = (k: "clicks" | "leads" | "quoted" | "won" | "lost") => lines.reduce((s, l) => s + l[k], 0);
    const leads = sum("leads");
    const byChannel = new Map<string, { leads: number; won: number; clicks: number }>();
    for (const l of lines) {
      const c = byChannel.get(l.channel) ?? { leads: 0, won: 0, clicks: 0 };
      c.leads += l.leads;
      c.won += l.won;
      c.clicks += l.clicks;
      byChannel.set(l.channel, c);
    }
    return {
      period: { from: start, to: end },
      totals: { clicks: sum("clicks"), leads, quoted: sum("quoted"), won: sum("won"), lost: sum("lost"), win_rate: leads ? Math.round((sum("won") / leads) * 1000) / 10 : null },
      by_channel: [...byChannel.entries()].map(([channel, c]) => ({ channel, ...c, win_rate: c.leads ? Math.round((c.won / c.leads) * 1000) / 10 : null })).sort((a, b) => b.leads - a.leads),
      lines,
    };
  },
});

export const websitePages = defineTool({
  name: "website_pages",
  title: "Website pages",
  description:
    "tallocpa.com as it is now: each page's path, primary search phrase and last update; each service page's SEO title, meta description, H1, opening, what it includes and related services; the FAQs; and the how-we-work steps and safeguards. For SEO and content work; site changes go in as pull requests for the Owner.",
  input: z.object({}),
  employees: TEAM,
  effect: "read",
  async run() {
    return {
      site: SITE_URL,
      pages: SITE_PAGES,
      service_pages: SERVICES.map((s) => ({
        path: `/services/${s.slug}`,
        keyword: s.keyword,
        seo_title: s.seoTitle,
        meta_description: s.metaDescription,
        h1: s.h1,
        opening: s.opening,
        includes: s.includes,
        related: s.related,
      })),
      faqs: FAQ_GROUPS.map((g) => ({ group: g.title, items: g.items.map((i) => ({ q: i.q, a: i.a.join("\n\n") })) })),
      how_we_work: HOW_STEPS.map((h) => ({ title: h.title, body: h.body })),
      safeguards: SAFEGUARDS,
    };
  },
});

export const draftProposal = defineTool({
  name: "draft_proposal",
  title: "Draft a proposal",
  description:
    "Save a proposal for one lead as a draft for the Owner: the fee items by code (from fee_schedule) with quantities, and a short cover message. Prices come from the active fee schedule only (you cannot set or discount a price); price-on-request items are listed as such. The Owner reviews it and sends the real proposal from the lead's page; nothing is sent by you. A new proposal draft for the same lead replaces your earlier one.",
  input: z.object({
    lead_id: leadId,
    lines: z
      .array(z.object({ code: z.string().trim().min(3).max(40).describe("Fee item code, e.g. D.10-29"), quantity: z.number().int().min(1).max(999).default(1) }))
      .min(1)
      .max(30)
      .describe("The fee items proposed"),
    cover_message: z.string().trim().min(40, "Write the cover message the Owner would send.").max(3000).describe("The proposal's cover message"),
    reason: z.string().trim().min(10, "Explain the proposal in a sentence or two.").max(1000).describe("Why these services, for the Owner"),
  }),
  employees: TEAM,
  effect: "draft",
  async run({ db }, { lead_id, lines, cover_message, reason }) {
    const l = await readLead(db, lead_id);
    if (l.converted) throw new ToolRefusal(`${String(l.business_name)} is already a client; proposals are for leads.`);
    if (l.stage === "lost") throw new ToolRefusal(`${String(l.business_name)} is marked lost; ask the Owner before proposing again.`);
    const s = await activeSchedule(db);
    if (!s) throw new ToolRefusal("No fee schedule is active, so there are no prices to propose.");
    const items = new Map(s.items.map((i) => [i.code, i]));
    const unknown = lines.filter((x) => !items.has(x.code)).map((x) => x.code);
    if (unknown.length) throw new ToolRefusal(`No fee item ${unknown.join(", ")} in the active schedule.`);
    const priced = lines.map((x) => feeLine(items.get(x.code)!, x.quantity));
    const bad = priced.find((p) => p.refusal);
    if (bad) throw new ToolRefusal(bad.refusal!);
    const totals = proposalTotals(priced);
    const summary = [
      { label: "Lead", value: `${String(l.business_name)} (${String(l.contact_name)})` },
      { label: "Items", value: priced.map((p) => `${p.code} ${p.label}${p.quantity > 1 ? ` × ${p.quantity}` : ""}: ${p.display}`).join("\n") },
      { label: "Monthly", value: money.format(totals.monthly) },
      ...(totals.annual ? [{ label: "Annual", value: money.format(totals.annual) }] : []),
      ...(totals.one_time ? [{ label: "One time", value: money.format(totals.one_time) }] : []),
      { label: "First year", value: money.format(totals.first_year) },
      ...(totals.on_request.length ? [{ label: "Price on request", value: totals.on_request.join(", ") }] : []),
      { label: "Prices", value: s.prices_include_tax ? "Include the tax on the fee" : "Before the tax on the fee" },
      { label: "Cover message", value: cover_message },
    ];
    const minimum = s.minimum_monthly_retainer === null ? null : Number(s.minimum_monthly_retainer);
    if (minimum && totals.monthly > 0 && totals.monthly < minimum) summary.push({ label: "Note", value: `Below the minimum monthly retainer of ${money.format(minimum)}.` });
    const draft = await saveDraft(db, {
      kind: PROPOSAL_KIND,
      // No client id: leads are the Owner's, so only the Owner reads and decides it.
      clientId: null,
      subject: { table: "leads", id: lead_id },
      summary,
      data: { lead_id, schedule: s.name, lines: priced.map((p) => ({ code: p.code, label: p.label, billing: p.billing, quantity: p.quantity, amount: p.amount })), totals, cover_message },
      note: reason,
    });
    return { saved: true, draft_id: draft.id, status: draft.status, for_owner: summary };
  },
});

export const draftFollowUp = defineTool({
  name: "draft_follow_up",
  title: "Draft a follow-up",
  description:
    "Save a follow-up message to one lead as a draft for the Owner: the channel (email, SMS, Messenger, call script) and the message text, with your reason. The Owner reads it and sends it himself; nothing is sent by you. Not for leads that became clients. A new follow-up for the same lead replaces your earlier one.",
  input: z.object({
    lead_id: leadId,
    channel: z.enum(["email", "sms", "messenger", "call_script"]).describe("How the Owner would send it"),
    subject: z.string().trim().max(150).optional().describe("Email subject, if by email"),
    message: z.string().trim().min(20, "Write the full message.").max(2000).describe("The message, ready to send"),
    reason: z.string().trim().min(10, "Explain the follow-up in a sentence or two.").max(1000).describe("Why now, for the Owner"),
  }),
  employees: TEAM,
  effect: "draft",
  async run({ db }, { lead_id, channel, subject, message, reason }) {
    const l = await readLead(db, lead_id);
    if (l.converted) throw new ToolRefusal(`${String(l.business_name)} is already a client; follow-ups are for leads.`);
    const to = channel === "email" ? (l.email as string | null) : channel === "call_script" ? (l.mobile as string | null) : (l.mobile as string | null);
    const summary = [
      { label: "Lead", value: `${String(l.business_name)} (${String(l.contact_name)})` },
      { label: "Stage", value: String(l.stage) },
      { label: "Channel", value: channel.replace("_", " ") },
      ...(to ? [{ label: "To", value: to }] : []),
      ...(subject ? [{ label: "Subject", value: subject }] : []),
      { label: "Message", value: message },
    ];
    const draft = await saveDraft(db, {
      kind: FOLLOW_UP_KIND,
      clientId: null,
      subject: { table: "leads", id: lead_id },
      summary,
      data: { lead_id, channel, subject: subject ?? null, message },
      note: reason,
    });
    return { saved: true, draft_id: draft.id, status: draft.status, for_owner: summary };
  },
});
