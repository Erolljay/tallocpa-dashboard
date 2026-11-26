-- Lead-source tracking (Owner, 26 November 2026). The Owner markets on a Facebook
-- Page, with posts and ads, and wants to know which posts and campaigns bring
-- leads and clients.
--
--   1. Campaign links. The Owner makes a short link per post or ad
--      (https://tallocpa.com/go/<code>). /go/<code> counts the click, keeps the
--      visitor's first touch in a cookie (tc_attr) and sends them to the page with
--      the utm_* tags added.
--   2. First-touch attribution on each lead. /start passes what it knows (the
--      cookie, else the page's utm_* and ref, and the referrer's host) to
--      submit_lead as p_lead.attribution.
--   3. The report: per channel, campaign and link, the clicks, leads, won, lost and
--      the monthly fees quoted.

-- ---------------------------------------------------------------------------
-- Campaign links
-- ---------------------------------------------------------------------------
create table public.marketing_links (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands (id),
  code text not null unique check (code ~ '^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$'),
  label text not null check (btrim(label) <> '' and length(label) <= 100),
  platform text not null default 'facebook' check (platform in ('facebook', 'instagram', 'linkedin', 'tiktok', 'email', 'print', 'other')),
  utm_medium text not null default 'social' check (utm_medium ~ '^[a-z0-9_-]{1,50}$'),
  campaign text not null check (btrim(campaign) <> '' and length(campaign) <= 100),
  content text check (content is null or (btrim(content) <> '' and length(content) <= 100)),
  target_path text not null default '/' check (target_path ~ '^/([A-Za-z0-9._~%/-]*)$' and target_path !~ '^//' and length(target_path) <= 200),
  clicks bigint not null default 0 check (clicks >= 0),
  archived_at timestamptz,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);
create index marketing_links_brand_idx on public.marketing_links (brand_id, created_at desc);
-- Audited when made, changed or archived; a click (clicks + 1) is not.
create trigger audit after insert or update of label, platform, utm_medium, campaign, content, target_path, archived_at or delete on public.marketing_links
  for each row execute function private.audit();
alter table public.marketing_links enable row level security;
create policy marketing_links_read on public.marketing_links for select to authenticated using (private.is_staff());

-- Clicks per link per Manila day, so the report can count the clicks of a period.
create table public.marketing_link_clicks (
  link_id uuid not null references public.marketing_links (id) on delete cascade,
  day date not null,
  clicks bigint not null default 0 check (clicks >= 0),
  primary key (link_id, day)
);
alter table public.marketing_link_clicks enable row level security;
create policy marketing_link_clicks_read on public.marketing_link_clicks for select to authenticated using (private.is_staff());

-- ---------------------------------------------------------------------------
-- First touch on each lead
-- ---------------------------------------------------------------------------
alter table public.leads
  add column utm_source text check (length(utm_source) <= 100),
  add column utm_medium text check (length(utm_medium) <= 100),
  add column utm_campaign text check (length(utm_campaign) <= 100),
  add column utm_content text check (length(utm_content) <= 100),
  -- The referring site's host only (l.facebook.com), never its full address.
  add column referrer text check (referrer ~ '^[a-z0-9.-]{1,100}$'),
  add column landing_path text check (landing_path ~ '^/' and landing_path !~ '^//' and length(landing_path) <= 200),
  add column marketing_link_id uuid references public.marketing_links (id) on delete set null,
  add column first_touch_at timestamptz;
create index leads_marketing_link_idx on public.leads (marketing_link_id) where marketing_link_id is not null;

/** A short text from the website: control characters out, trimmed, at most p_max characters; null when empty. */
create or replace function private.clean_text(p_value text, p_max int default 100) returns text
language sql immutable set search_path = '' as $$
  select nullif(left(btrim(regexp_replace(coalesce(p_value, ''), '[[:cntrl:]]+', ' ', 'g')), p_max), '')
$$;

/** The host of a referrer (a full address or a bare host), lowercased; null when it is not a plain host name. */
create or replace function private.referrer_host(p_value text) returns text
language sql immutable set search_path = '' as $$
  select h from (
    select lower(split_part(split_part(split_part(regexp_replace(btrim(coalesce(p_value, '')), '^[A-Za-z][A-Za-z0-9+.-]*://', ''), '/', 1), '?', 1), '#', 1)) as h0
  ) s, lateral (select regexp_replace(regexp_replace(h0, '^[^@]*@', ''), ':[0-9]*$', '') as h) t
  where h ~ '^[a-z0-9]([a-z0-9.-]{0,98}[a-z0-9])?$' and h ~ '\.'
$$;

/** The channel a referrer host stands for: the big social sites and Google by name, else the host. */
create or replace function private.referrer_channel(p_host text) returns text
language sql immutable set search_path = '' as $$
  select case
    when p_host is null then null
    when p_host ~ '(^|\.)(facebook\.com|fb\.com|fb\.me)$' then 'facebook'
    when p_host ~ '(^|\.)instagram\.com$' then 'instagram'
    when p_host ~ '(^|\.)(linkedin\.com|lnkd\.in)$' then 'linkedin'
    when p_host ~ '(^|\.)tiktok\.com$' then 'tiktok'
    when p_host ~ '(^|\.)google\.[a-z.]+$' then 'google'
    else regexp_replace(p_host, '^www\.', '')
  end
$$;

/**
 * Step 1, now with the lead's source: a prospect's request for a quote becomes a
 * lead. Unchanged from 20261125000016 except p_lead.attribution, which may hold
 * utm_source, utm_medium, utm_campaign, utm_content, ref (a campaign link's code),
 * referrer, landing_path and first_touch_at. Each text is cleaned and cut to 100
 * characters; the referrer is kept as its host only; a ref that names one of the
 * brand's links ties the lead to it and fills the utm_* the link stands for.
 * Nothing in it can make the request fail.
 */
create or replace function public.submit_lead(p_brand_code text, p_lead jsonb, p_quote jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.brands;
  v_staff boolean := private.is_staff();
  v_id uuid;
  a jsonb := case when jsonb_typeof(p_lead -> 'attribution') = 'object' then p_lead -> 'attribution' else '{}'::jsonb end;
  ml public.marketing_links;
  v_landing text := private.clean_text(a ->> 'landing_path', 200);
  v_touch timestamptz;
begin
  select * into b from public.brands where code = p_brand_code;
  if b.id is null or not (b.funnel_open or v_staff) then raise exception 'Not found' using errcode = 'P0002'; end if;

  select * into ml from public.marketing_links where brand_id = b.id and code = lower(private.clean_text(a ->> 'ref', 40));
  if v_landing is not null and (v_landing !~ '^/' or v_landing ~ '^//' or v_landing ~ '\s') then v_landing := null; end if;
  begin
    v_touch := (a ->> 'first_touch_at')::timestamptz;
  exception when others then
    v_touch := null;
  end;
  if v_touch is null or v_touch > now() or v_touch < now() - interval '1 year' then v_touch := now(); end if;

  insert into public.leads (brand_id, business_name, contact_name, email, mobile, taxpayer_type, services, profile, quote, message, source, test, created_by,
    utm_source, utm_medium, utm_campaign, utm_content, referrer, landing_path, marketing_link_id, first_touch_at)
  values (
    b.id, btrim(p_lead ->> 'business_name'), btrim(p_lead ->> 'contact_name'), lower(btrim(p_lead ->> 'email')),
    nullif(btrim(p_lead ->> 'mobile'), ''), p_lead ->> 'taxpayer_type',
    coalesce((select array_agg(s) from jsonb_array_elements_text(p_lead -> 'services') s
              where s in ('tax_compliance', 'bookkeeping', 'business_registration')), '{}'),
    coalesce(p_lead -> 'profile', '{}'::jsonb), p_quote, left(nullif(btrim(p_lead ->> 'message'), ''), 2000),
    case when v_staff and (p_lead ->> 'source') = 'staff' then 'staff' else 'website' end,
    not b.funnel_open, auth.uid(),
    coalesce(lower(private.clean_text(a ->> 'utm_source')), ml.platform),
    coalesce(lower(private.clean_text(a ->> 'utm_medium')), ml.utm_medium),
    coalesce(private.clean_text(a ->> 'utm_campaign'), ml.campaign),
    coalesce(private.clean_text(a ->> 'utm_content'), ml.content),
    private.referrer_host(left(a ->> 'referrer', 2000)),
    v_landing, ml.id, v_touch
  ) returning id into v_id;
  return v_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- The Owner's links
-- ---------------------------------------------------------------------------

/**
 * The Owner makes a campaign link. With no code, one is made from the campaign
 * (spring-promo-4f2a). The target is a page of the site: a path from '/'.
 */
create or replace function public.create_marketing_link(
  p_label text, p_platform text, p_campaign text, p_content text default null, p_target_path text default '/',
  p_code text default null, p_utm_medium text default 'social'
) returns public.marketing_links
language plpgsql security definer set search_path = '' as $$
declare
  v_brand uuid;
  v_code text := lower(private.clean_text(p_code, 40));
  v_target text := coalesce(private.clean_text(p_target_path, 200), '/');
  v_campaign text := private.clean_text(p_campaign);
  v_medium text := lower(coalesce(private.clean_text(p_utm_medium, 50), 'social'));
  l public.marketing_links;
begin
  if not private.is_owner() then raise exception 'Only the Owner can make campaign links' using errcode = '42501'; end if;
  select brand_id into v_brand from public.staff_profiles where user_id = auth.uid();
  if private.clean_text(p_label) is null then raise exception 'Give the link a label' using errcode = '22023'; end if;
  if v_campaign is null then raise exception 'Give the campaign a name' using errcode = '22023'; end if;
  if coalesce(p_platform, '') not in ('facebook', 'instagram', 'linkedin', 'tiktok', 'email', 'print', 'other') then
    raise exception 'Choose the platform' using errcode = '22023';
  end if;
  if v_medium !~ '^[a-z0-9_-]{1,50}$' then raise exception 'The medium takes lowercase letters, digits, - and _ only' using errcode = '22023'; end if;
  if v_target !~ '^/([A-Za-z0-9._~%/-]*)$' or v_target ~ '^//' then
    raise exception 'The page must be a path on the site, like /services' using errcode = '22023';
  end if;
  if v_code is null then
    v_code := btrim(left(regexp_replace(lower(v_campaign), '[^a-z0-9]+', '-', 'g'), 30), '-');
    v_code := case when v_code = '' then '' else v_code || '-' end || left(md5(gen_random_uuid()::text), 4);
  elsif v_code !~ '^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$' then
    raise exception 'The code takes lowercase letters, digits and - only (at most 40)' using errcode = '22023';
  end if;
  if exists (select 1 from public.marketing_links where code = v_code) then
    raise exception 'The code % is taken; choose another', v_code using errcode = '23505';
  end if;
  insert into public.marketing_links (brand_id, code, label, platform, utm_medium, campaign, content, target_path, created_by)
  values (v_brand, v_code, private.clean_text(p_label), p_platform, v_medium, v_campaign, private.clean_text(p_content), v_target, auth.uid())
  returning * into l;
  return l;
end;
$$;

/** The Owner retires a link: /go/<code> then goes to the home page and counts nothing. Its leads keep it. */
create or replace function public.archive_marketing_link(p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner can archive campaign links' using errcode = '42501'; end if;
  update public.marketing_links set archived_at = now()
  where id = p_id and archived_at is null and brand_id = (select brand_id from public.staff_profiles where user_id = auth.uid());
  if not found then raise exception 'Link not found, or already archived' using errcode = 'P0002'; end if;
end;
$$;

/**
 * /go/<code> (the server, with the secret key): counts the click, unless p_count
 * is false (a link-preview robot), and answers where to send the visitor. Null for
 * an unknown or archived code.
 */
create or replace function public.record_marketing_click(p_code text, p_count boolean default true) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  l public.marketing_links;
begin
  select * into l from public.marketing_links where code = lower(btrim(coalesce(p_code, ''))) and archived_at is null;
  if l.id is null then return null; end if;
  if p_count then
    update public.marketing_links set clicks = clicks + 1 where id = l.id;
    insert into public.marketing_link_clicks (link_id, day, clicks) values (l.id, (now() at time zone 'Asia/Manila')::date, 1)
    on conflict (link_id, day) do update set clicks = public.marketing_link_clicks.clicks + 1;
  end if;
  return jsonb_build_object(
    'id', l.id, 'code', l.code, 'target_path', l.target_path,
    'utm_source', l.platform, 'utm_medium', l.utm_medium, 'utm_campaign', l.campaign, 'utm_content', l.content
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- The report
-- ---------------------------------------------------------------------------

/**
 * The Owner's marketing report for p_from..p_to (Manila dates, inclusive): per
 * channel, campaign and link, the link's clicks in the period and the leads first
 * received in the period (test leads left out), how many were won (Won,
 * Onboarding, or made a client) and lost, and the monthly retainer quoted on the
 * website (leads.quote.monthlyRetainer) with how many leads had a quote.
 * Channel: the link's platform, else utm_source, else the referrer's site, else
 * 'staff' for leads staff typed in, else 'direct'.
 */
create or replace function public.marketing_report(p_from date, p_to date)
returns table (
  channel text, campaign text, link_id uuid, link_code text, link_label text,
  clicks bigint, leads bigint, won bigint, lost bigint, quoted bigint, quoted_monthly numeric
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
declare
  v_brand uuid;
begin
  if not private.is_owner() then raise exception 'Only the Owner can see the marketing report' using errcode = '42501'; end if;
  if p_from is null or p_to is null or p_from > p_to then raise exception 'Choose a period: from on or before to' using errcode = '22023'; end if;
  select sp.brand_id into v_brand from public.staff_profiles sp where sp.user_id = auth.uid();
  return query
  with lead_rows as (
    select
      coalesce(ml.platform, l.utm_source, private.referrer_channel(l.referrer), case when l.source = 'staff' then 'staff' end, 'direct') as channel,
      coalesce(ml.campaign, l.utm_campaign) as campaign,
      ml.id as link_id,
      (l.stage in ('won', 'onboarding') or l.client_id is not null) as is_won,
      l.stage = 'lost' as is_lost,
      coalesce(jsonb_typeof(l.quote) = 'object', false) as has_quote,
      case when jsonb_typeof(l.quote -> 'monthlyRetainer') = 'number' then (l.quote ->> 'monthlyRetainer')::numeric end as monthly
    from public.leads l
    left join public.marketing_links ml on ml.id = l.marketing_link_id
    where l.brand_id = v_brand and not l.test
      and (l.created_at at time zone 'Asia/Manila')::date between p_from and p_to
  ),
  lead_totals as (
    select r.channel, r.campaign, r.link_id, count(*) as leads, count(*) filter (where r.is_won) as won,
      count(*) filter (where r.is_lost) as lost, count(*) filter (where r.has_quote) as quoted, coalesce(sum(r.monthly), 0) as quoted_monthly
    from lead_rows r group by r.channel, r.campaign, r.link_id
  ),
  click_totals as (
    select ml.platform as channel, ml.campaign, ml.id as link_id, sum(c.clicks)::bigint as clicks
    from public.marketing_link_clicks c join public.marketing_links ml on ml.id = c.link_id
    where ml.brand_id = v_brand and c.day between p_from and p_to
    group by ml.platform, ml.campaign, ml.id
  )
  select
    coalesce(t.channel, k.channel), coalesce(t.campaign, k.campaign), coalesce(t.link_id, k.link_id), ml.code, ml.label,
    coalesce(k.clicks, 0)::bigint, coalesce(t.leads, 0)::bigint, coalesce(t.won, 0)::bigint, coalesce(t.lost, 0)::bigint,
    coalesce(t.quoted, 0)::bigint, coalesce(t.quoted_monthly, 0)::numeric
  from lead_totals t
  full join click_totals k on k.link_id = t.link_id and k.channel = t.channel and k.campaign is not distinct from t.campaign
  left join public.marketing_links ml on ml.id = coalesce(t.link_id, k.link_id)
  order by coalesce(t.leads, 0) desc, coalesce(k.clicks, 0) desc, 1, 2 nulls last;
end;
$$;

revoke execute on function private.clean_text(text, int), private.referrer_host(text), private.referrer_channel(text) from public, anon, authenticated;
revoke execute on function public.submit_lead(text, jsonb, jsonb) from public;
grant execute on function public.submit_lead(text, jsonb, jsonb) to anon, authenticated;
revoke execute on function public.create_marketing_link(text, text, text, text, text, text, text) from public, anon;
grant execute on function public.create_marketing_link(text, text, text, text, text, text, text) to authenticated;
revoke execute on function public.archive_marketing_link(uuid) from public, anon;
grant execute on function public.archive_marketing_link(uuid) to authenticated;
revoke execute on function public.marketing_report(date, date) from public, anon;
grant execute on function public.marketing_report(date, date) to authenticated;
revoke execute on function public.record_marketing_click(text, boolean) from public, anon, authenticated;
grant execute on function public.record_marketing_click(text, boolean) to service_role;
