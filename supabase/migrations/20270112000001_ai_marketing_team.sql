-- AI employees: the Marketing Team connector (docs/AI-WORKFORCE.md §3, §6, §7.2; Owner's
-- choice "one connector for the whole department"). The five marketing roles work from
-- Claude Code through one AI employee, `marketing_team`, with client_data = false.
--
-- Marketing never sees client data (§6): no client, no books, no returns, no documents,
-- no receivables, no client contacts. It reads the firm's public facts, the fee schedule
-- and the leads (prospects who asked for a quote), and it drafts proposals and follow-ups
-- for the Owner. Nothing here opens a table to AI employees; five read-only functions
-- answer only the switched-on Marketing Team, only for its own brand:
--
--   * public.ai_marketing_profile(): the firm's public facts from Settings → Brand (what
--     the website already prints);
--   * public.ai_fee_schedule(): the active fee schedule and its items;
--   * public.ai_leads(stage, channel, from, to, limit): the pipeline (no email or mobile);
--   * public.ai_lead(id): one lead, with the contact details a follow-up needs, its
--     discovery calls and proposals; a lead that became a client shows only "converted"
--     and when, never the client's records;
--   * public.ai_marketing_report(from, to): leads, quotes, won and lost by channel,
--     campaign and month, and campaign-link clicks (the Owner's Firm → Marketing report).
--
-- Its drafts go through public.ai_save_draft() with no client id, so only the Owner reads
-- and decides them (20270108000001). Test leads (made while the funnel was closed) are
-- left out everywhere.
--
-- AI employees may now run on Claude Code as well as Cowork and the app.

alter table public.ai_employees drop constraint if exists ai_employees_runs_on_check;
alter table public.ai_employees add constraint ai_employees_runs_on_check
  check (runs_on in ('cowork', 'app', 'both', 'claude_code'));

create or replace function private.ai_marketing_caller() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e
  where e.user_id = auth.uid() and e.enabled and e.key = 'marketing_team'
$$;

create or replace function public.ai_marketing_profile() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_marketing_caller();
  out jsonb;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Marketing Team can read this' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'display_name', b.display_name, 'legal_name', b.legal_name, 'business_address', b.business_address,
    'phone', b.phone, 'email', b.reply_to_email, 'website', b.website, 'facebook_url', b.facebook_url,
    'cpa_license_no', b.cpa_license_no, 'boa_firm_accreditation_no', b.boa_firm_accreditation_no,
    'boa_individual_accreditation_no', b.boa_individual_accreditation_no,
    'bir_tax_agent_accreditation_no', b.bir_tax_agent_accreditation_no, 'funnel_open', b.funnel_open
  ) into out
  from public.brands b where b.id = me.brand_id;
  return out;
end;
$$;

create or replace function public.ai_fee_schedule() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_marketing_caller();
  out jsonb;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Marketing Team can read the fee schedule' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'name', s.name, 'effective_from', s.effective_from, 'prices_include_tax', s.prices_include_tax,
    'quote_valid_days', s.quote_valid_days, 'minimum_monthly_retainer', s.minimum_monthly_retainer,
    'items', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', i.code, 'component', i.component, 'label', i.label, 'band_label', i.band_label, 'billing', i.billing,
        'price', i.price, 'is_custom_quote', i.is_custom_quote, 'unit_label', i.unit_label, 'conditions', i.conditions
      ) order by i.component, i.sort_order, i.code)
      from public.fee_items i where i.schedule_id = s.id
    ), '[]'::jsonb)
  ) into out
  from public.fee_schedules s where s.brand_id = me.brand_id and s.status = 'active';
  return out;
end;
$$;

/** A lead's channel, as the Owner's marketing report counts it. */
create or replace function private.lead_channel(l public.leads, ml public.marketing_links) returns text
language sql stable set search_path = '' as $$
  select coalesce(ml.platform, l.utm_source, private.referrer_channel(l.referrer), case when l.source = 'staff' then 'staff' end, 'direct')
$$;

create or replace function public.ai_leads(
  p_stage text default null, p_channel text default null, p_from date default null, p_to date default null, p_limit integer default 100
)
returns table (
  id uuid, business_name text, contact_name text, taxpayer_type text, services text[], stage text, channel text, campaign text,
  created_at timestamptz, stage_changed_at timestamptz, monthly_quote numeric, proposals bigint, converted boolean
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_marketing_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Marketing Team can read the leads' using errcode = '42501';
  end if;
  return query
    select l.id, l.business_name, l.contact_name, l.taxpayer_type, l.services, l.stage, private.lead_channel(l, ml),
           coalesce(ml.campaign, l.utm_campaign), l.created_at, l.stage_changed_at,
           case when jsonb_typeof(l.quote -> 'monthlyRetainer') = 'number' then (l.quote ->> 'monthlyRetainer')::numeric end,
           (select count(*) from public.proposals p where p.lead_id = l.id),
           (l.client_id is not null or l.stage in ('won', 'onboarding'))
    from public.leads l
    left join public.marketing_links ml on ml.id = l.marketing_link_id
    where l.brand_id = me.brand_id and not l.test
      and (p_stage is null or l.stage = p_stage)
      and (p_channel is null or private.lead_channel(l, ml) = p_channel)
      and (p_from is null or (l.created_at at time zone 'Asia/Manila')::date >= p_from)
      and (p_to is null or (l.created_at at time zone 'Asia/Manila')::date <= p_to)
    order by l.created_at desc, l.id
    limit greatest(1, least(coalesce(p_limit, 100), 500));
end;
$$;

create or replace function public.ai_lead(p_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_marketing_caller();
  l public.leads;
  ml public.marketing_links;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Marketing Team can read the leads' using errcode = '42501';
  end if;
  select * into l from public.leads where leads.id = p_id and brand_id = me.brand_id and not test;
  if l.id is null then
    raise exception 'No lead %', p_id using errcode = 'P0002';
  end if;
  select * into ml from public.marketing_links where marketing_links.id = l.marketing_link_id;
  return jsonb_build_object(
    'id', l.id, 'business_name', l.business_name, 'contact_name', l.contact_name, 'email', l.email, 'mobile', l.mobile,
    'taxpayer_type', l.taxpayer_type, 'services', to_jsonb(l.services), 'profile', l.profile, 'message', l.message,
    'monthly_quote', l.quote -> 'monthlyRetainer', 'stage', l.stage, 'stage_changed_at', l.stage_changed_at,
    'lost_reason', l.lost_reason, 'created_at', l.created_at, 'from', l.source,
    'channel', private.lead_channel(l, ml), 'campaign', coalesce(ml.campaign, l.utm_campaign), 'landing_path', l.landing_path,
    -- A lead that became a client: only that it did and when. The client's records stay out of marketing.
    'converted', (l.client_id is not null or l.stage in ('won', 'onboarding')),
    'converted_at', case when l.client_id is not null or l.stage in ('won', 'onboarding') then l.stage_changed_at end,
    'discovery_calls', coalesce((
      select jsonb_agg(jsonb_build_object('scheduled_at', c.scheduled_at, 'held_at', c.held_at, 'cancelled', c.cancelled_at is not null, 'notes', c.notes)
        order by coalesce(c.held_at, c.scheduled_at))
      from public.discovery_calls c where c.lead_id = l.id
    ), '[]'::jsonb),
    'proposals', coalesce((
      select jsonb_agg(jsonb_build_object('created_at', p.created_at, 'status', p.status, 'monthly_retainer', p.monthly_retainer,
        'first_year_total', p.first_year_total, 'valid_until', p.valid_until, 'emailed', p.emailed_at is not null) order by p.created_at)
      from public.proposals p where p.lead_id = l.id
    ), '[]'::jsonb)
  );
end;
$$;

create or replace function public.ai_marketing_report(p_from date, p_to date)
returns table (
  month date, channel text, campaign text, link_code text, link_label text,
  clicks bigint, leads bigint, quoted bigint, won bigint, lost bigint, quoted_monthly numeric
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
declare
  me public.ai_employees := private.ai_marketing_caller();
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Marketing Team can read the marketing report' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_from > p_to or p_to - p_from > 800 then
    raise exception 'Give a period of at most 800 days' using errcode = '22023';
  end if;
  return query
  with lead_rows as (
    select date_trunc('month', l.created_at at time zone 'Asia/Manila')::date as month,
      private.lead_channel(l, ml) as channel, coalesce(ml.campaign, l.utm_campaign) as campaign, ml.id as link_id,
      (l.stage in ('won', 'onboarding') or l.client_id is not null) as is_won, l.stage = 'lost' as is_lost,
      coalesce(jsonb_typeof(l.quote) = 'object', false) as has_quote,
      case when jsonb_typeof(l.quote -> 'monthlyRetainer') = 'number' then (l.quote ->> 'monthlyRetainer')::numeric end as monthly
    from public.leads l left join public.marketing_links ml on ml.id = l.marketing_link_id
    where l.brand_id = me.brand_id and not l.test and (l.created_at at time zone 'Asia/Manila')::date between p_from and p_to
  ),
  lead_totals as (
    select r.month, r.channel, r.campaign, r.link_id, count(*) as leads, count(*) filter (where r.has_quote) as quoted,
      count(*) filter (where r.is_won) as won, count(*) filter (where r.is_lost) as lost, coalesce(sum(r.monthly), 0) as quoted_monthly
    from lead_rows r group by r.month, r.channel, r.campaign, r.link_id
  ),
  click_totals as (
    select date_trunc('month', c.day)::date as month, ml.platform as channel, ml.campaign, ml.id as link_id, sum(c.clicks)::bigint as clicks
    from public.marketing_link_clicks c join public.marketing_links ml on ml.id = c.link_id
    where ml.brand_id = me.brand_id and c.day between p_from and p_to
    group by 1, ml.platform, ml.campaign, ml.id
  )
  select coalesce(t.month, k.month), coalesce(t.channel, k.channel), coalesce(t.campaign, k.campaign), ml.code, ml.label,
    coalesce(k.clicks, 0)::bigint, coalesce(t.leads, 0)::bigint, coalesce(t.quoted, 0)::bigint, coalesce(t.won, 0)::bigint,
    coalesce(t.lost, 0)::bigint, coalesce(t.quoted_monthly, 0)::numeric
  from lead_totals t
  full join click_totals k on k.month = t.month and k.link_id = t.link_id and k.channel = t.channel and k.campaign is not distinct from t.campaign
  left join public.marketing_links ml on ml.id = coalesce(t.link_id, k.link_id)
  order by 1, coalesce(t.leads, 0) desc, coalesce(k.clicks, 0) desc, 2, 3 nulls last;
end;
$$;

revoke all on function private.ai_marketing_caller() from public;
revoke all on function private.lead_channel(public.leads, public.marketing_links) from public;
revoke all on function public.ai_marketing_profile() from public;
revoke all on function public.ai_fee_schedule() from public;
revoke all on function public.ai_leads(text, text, date, date, integer) from public;
revoke all on function public.ai_lead(uuid) from public;
revoke all on function public.ai_marketing_report(date, date) from public;
grant execute on function private.ai_marketing_caller() to authenticated;
grant execute on function public.ai_marketing_profile() to authenticated;
grant execute on function public.ai_fee_schedule() to authenticated;
grant execute on function public.ai_leads(text, text, date, date, integer) to authenticated;
grant execute on function public.ai_lead(uuid) to authenticated;
grant execute on function public.ai_marketing_report(date, date) to authenticated;
