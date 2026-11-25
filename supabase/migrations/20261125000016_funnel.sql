-- Phase 2, the funnel (spec §2; Q17, Q43). It is built now but not live
-- (Owner, 25 November 2026): it can be tried end to end before it opens.
--
-- The steps:
--   1. A prospect asks for a quote on the website page (/start). The quote comes
--      from the brand's active fee schedule.
--   2. The prospect becomes a lead.
--   3. Staff send a proposal: the quote at that date, plus the engagement terms.
--   4. The prospect accepts it online by typing their name. The acceptance is
--      the e-signature: when, from where, and a hash of exactly what was accepted.
--   5. The Owner converts the lead into a client in Onboarding, with the
--      engagement and the retainer. The accepted proposal shows on the client's
--      Onboarding tab as its proposal and signed contract.
--
-- Not live: brands.funnel_open is false. Until the Owner opens it, the public
-- pages and functions answer signed-in staff only. Leads made while it is closed
-- are marked as tests.

alter table public.brands add column funnel_open boolean not null default false;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands (id),
  business_name text not null check (btrim(business_name) <> ''),
  contact_name text not null check (btrim(contact_name) <> ''),
  email text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  mobile text,
  taxpayer_type text not null check (taxpayer_type in ('individual', 'opc', 'partnership', 'corporation', 'non_stock')),
  -- Service lines asked for (tax_compliance, bookkeeping, business_registration).
  services text[] not null default '{}',
  -- What the quote was worked out from (src/lib/fees/types.ts ClientProfile).
  profile jsonb not null default '{}'::jsonb,
  -- The instant quote shown on the website, as shown.
  quote jsonb,
  message text,
  source text not null default 'website' check (source in ('website', 'staff')),
  status text not null default 'new' check (status in ('new', 'proposal_sent', 'accepted', 'converted', 'lost')),
  lost_reason text,
  -- Made while the funnel was closed (a staff member trying it).
  test boolean not null default false,
  client_id uuid references public.clients (id) on delete set null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_brand_idx on public.leads (brand_id, created_at desc);
create trigger touch_updated_at before update on public.leads for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.leads for each row execute function private.audit();
alter table public.leads enable row level security;
-- The Owner reads every lead; staff on a converted client read that client's lead (its proposal shows on Onboarding).
create policy leads_read on public.leads for select to authenticated
  using (private.is_owner() or (client_id is not null and private.is_staff() and private.can_access_client(client_id)));

create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  -- The link sent to the prospect.
  token text not null unique default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  -- The quote at the proposal date (src/lib/fees/quote.ts Quote) and the engagement terms.
  quote jsonb not null,
  terms text not null check (btrim(terms) <> ''),
  monthly_retainer numeric(18, 2) not null default 0,
  first_year_total numeric(18, 2) not null default 0,
  valid_until date not null,
  status text not null default 'sent' check (status in ('sent', 'accepted', 'withdrawn')),
  created_by uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  -- The acceptance (e-signature).
  accepted_at timestamptz,
  accepted_name text,
  accepted_position text,
  accepted_ip text,
  accepted_user_agent text,
  -- SHA-256 of the proposal content the prospect saw and accepted.
  accepted_hash text,
  check ((status = 'accepted') = (accepted_at is not null))
);
create index proposals_lead_idx on public.proposals (lead_id, created_at desc);
create trigger audit after insert or update or delete on public.proposals for each row execute function private.audit();
alter table public.proposals enable row level security;
create policy proposals_read on public.proposals for select to authenticated
  using (private.is_owner() or exists (
    select 1 from public.leads l where l.id = lead_id and l.client_id is not null and private.is_staff() and private.can_access_client(l.client_id)
  ));

/** Whether the brand's public funnel pages answer the public. Staff always may (to try it). */
create or replace function public.funnel_open(p_brand_code text) returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select funnel_open from public.brands where code = p_brand_code), false) or private.is_staff()
$$;

/**
 * Step 1: a prospect's request for a quote becomes a lead. p_lead holds the
 * contact details, the services and the profile; p_quote holds the instant quote
 * as shown. Refused while the funnel is closed, unless staff are trying it.
 */
create or replace function public.submit_lead(p_brand_code text, p_lead jsonb, p_quote jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.brands;
  v_staff boolean := private.is_staff();
  v_id uuid;
begin
  select * into b from public.brands where code = p_brand_code;
  if b.id is null or not (b.funnel_open or v_staff) then raise exception 'Not found' using errcode = 'P0002'; end if;
  insert into public.leads (brand_id, business_name, contact_name, email, mobile, taxpayer_type, services, profile, quote, message, source, test, created_by)
  values (
    b.id, btrim(p_lead ->> 'business_name'), btrim(p_lead ->> 'contact_name'), lower(btrim(p_lead ->> 'email')),
    nullif(btrim(p_lead ->> 'mobile'), ''), p_lead ->> 'taxpayer_type',
    coalesce((select array_agg(s) from jsonb_array_elements_text(p_lead -> 'services') s
              where s in ('tax_compliance', 'bookkeeping', 'business_registration')), '{}'),
    coalesce(p_lead -> 'profile', '{}'::jsonb), p_quote, left(nullif(btrim(p_lead ->> 'message'), ''), 2000),
    case when v_staff and (p_lead ->> 'source') = 'staff' then 'staff' else 'website' end,
    not b.funnel_open, auth.uid()
  ) returning id into v_id;
  return v_id;
end;
$$;

/** Step 3: the Owner sends a proposal. Earlier unaccepted proposals of the lead are withdrawn. */
create or replace function public.create_proposal(p_lead uuid, p_quote jsonb, p_terms text, p_monthly numeric, p_first_year numeric, p_valid_until date)
returns public.proposals
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
  p public.proposals;
begin
  if not private.is_owner() then raise exception 'Only the Owner can send proposals' using errcode = '42501'; end if;
  select * into l from public.leads where id = p_lead for update;
  if l.id is null then raise exception 'Lead not found' using errcode = 'P0002'; end if;
  if l.status in ('accepted', 'converted') then raise exception 'This lead has already accepted a proposal' using errcode = '22023'; end if;
  update public.proposals set status = 'withdrawn' where lead_id = l.id and status = 'sent';
  insert into public.proposals (lead_id, quote, terms, monthly_retainer, first_year_total, valid_until, created_by)
  values (l.id, p_quote, p_terms, p_monthly, p_first_year, p_valid_until, auth.uid())
  returning * into p;
  update public.leads set status = 'proposal_sent', lost_reason = null where id = l.id;
  return p;
end;
$$;

/**
 * What the prospect sees at their link: the proposal, the lead it is for and the
 * brand. Null when the link is unknown or the funnel is closed to the public.
 */
create or replace function public.proposal_by_token(p_token text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'id', p.id, 'status', p.status, 'quote', p.quote, 'terms', p.terms, 'valid_until', p.valid_until, 'created_at', p.created_at,
    'monthly_retainer', p.monthly_retainer, 'first_year_total', p.first_year_total,
    'accepted_at', p.accepted_at, 'accepted_name', p.accepted_name, 'accepted_position', p.accepted_position,
    'lead', jsonb_build_object('business_name', l.business_name, 'contact_name', l.contact_name, 'email', l.email, 'services', l.services, 'taxpayer_type', l.taxpayer_type),
    'brand', jsonb_build_object('display_name', b.display_name, 'legal_name', b.legal_name, 'tin', b.tin)
  )
  from public.proposals p join public.leads l on l.id = p.lead_id join public.brands b on b.id = l.brand_id
  where p.token = p_token and (b.funnel_open or private.is_staff())
$$;

/**
 * Step 4: the prospect accepts at their link by typing their name. Records the
 * e-signature (time, name, position, IP, browser and the hash of the content
 * accepted) and moves the lead to accepted.
 */
create or replace function public.accept_proposal(p_token text, p_name text, p_position text, p_hash text, p_ip text, p_user_agent text)
returns void
language plpgsql security definer set search_path = '' as $$
declare
  p public.proposals;
  open boolean;
begin
  select pr.* into p from public.proposals pr where pr.token = p_token for update;
  select b.funnel_open into open from public.leads l join public.brands b on b.id = l.brand_id where l.id = p.lead_id;
  if p.id is null or not (open or private.is_staff()) then raise exception 'Proposal not found' using errcode = 'P0002'; end if;
  if p.status = 'accepted' then raise exception 'This proposal has already been accepted' using errcode = '22023'; end if;
  if p.status = 'withdrawn' then raise exception 'This proposal has been replaced; please use the latest link we sent' using errcode = '22023'; end if;
  if p.valid_until < (now() at time zone 'Asia/Manila')::date then
    raise exception 'This proposal expired on %; please ask us for a new one', to_char(p.valid_until, 'FMMonth FMDD, YYYY') using errcode = '22023';
  end if;
  if btrim(coalesce(p_name, '')) = '' then raise exception 'Type your full name to accept' using errcode = '22023'; end if;
  if coalesce(p_hash, '') !~ '^[0-9a-f]{64}$' then raise exception 'The proposal could not be verified' using errcode = '22023'; end if;
  update public.proposals set status = 'accepted', accepted_at = now(), accepted_name = btrim(p_name), accepted_position = nullif(btrim(p_position), ''),
    accepted_ip = left(p_ip, 100), accepted_user_agent = left(p_user_agent, 500), accepted_hash = p_hash
  where id = p.id;
  update public.leads set status = 'accepted' where id = p.lead_id;
end;
$$;

/**
 * Step 5: the Owner makes the client from an accepted lead. The client starts in
 * Onboarding with an engagement per service line asked for. The whole monthly
 * retainer goes on the first service line. The COR, obligations and team follow
 * on the Onboarding tab.
 */
create or replace function public.convert_lead(p_lead uuid, p_start date) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
  p public.proposals;
  c uuid;
  s text;
  first boolean := true;
begin
  if not private.is_owner() then raise exception 'Only the Owner can convert a lead' using errcode = '42501'; end if;
  select * into l from public.leads where id = p_lead for update;
  if l.id is null then raise exception 'Lead not found' using errcode = 'P0002'; end if;
  if l.client_id is not null then raise exception 'This lead is already a client' using errcode = '22023'; end if;
  select * into p from public.proposals where lead_id = l.id and status = 'accepted' order by accepted_at desc limit 1;
  if p.id is null then raise exception 'The lead has not accepted a proposal yet' using errcode = '22023'; end if;

  insert into public.clients (brand_id, code, name, taxpayer_type, status)
  values (l.brand_id, private.next_client_code(l.brand_id), l.business_name, l.taxpayer_type, 'onboarding')
  returning id into c;
  insert into public.client_registrations (client_id, registration_date, tax_types) values (c, null, '[]'::jsonb);
  foreach s in array (case when cardinality(l.services) = 0 then array['tax_compliance'] else l.services end) loop
    insert into public.engagements (client_id, service_line, monthly_retainer, start_date, notes)
    values (c, s, case when first then p.monthly_retainer else 0 end, p_start, 'From proposal accepted ' || to_char(p.accepted_at at time zone 'Asia/Manila', 'YYYY-MM-DD'));
    first := false;
  end loop;
  update public.leads set status = 'converted', client_id = c where id = l.id;
  return c;
end;
$$;

/** The Owner marks a lead lost (or back to new). */
create or replace function public.set_lead_status(p_lead uuid, p_status text, p_reason text default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner can change a lead' using errcode = '42501'; end if;
  if p_status not in ('new', 'lost') then raise exception 'A lead can be set to new or lost only' using errcode = '22023'; end if;
  update public.leads set status = p_status, lost_reason = case when p_status = 'lost' then nullif(btrim(p_reason), '') end
  where id = p_lead and status not in ('accepted', 'converted');
  if not found then raise exception 'Lead not found, or it has already accepted' using errcode = '22023'; end if;
end;
$$;

/** The Owner opens or closes the public funnel. */
create or replace function public.set_funnel_open(p_open boolean) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner can open the funnel' using errcode = '42501'; end if;
  update public.brands set funnel_open = p_open where id = (select brand_id from public.staff_profiles where user_id = auth.uid());
end;
$$;

revoke execute on function public.funnel_open(text) from public;
grant execute on function public.funnel_open(text) to anon, authenticated;
revoke execute on function public.submit_lead(text, jsonb, jsonb) from public;
grant execute on function public.submit_lead(text, jsonb, jsonb) to anon, authenticated;
revoke execute on function public.proposal_by_token(text) from public;
grant execute on function public.proposal_by_token(text) to anon, authenticated;
revoke execute on function public.accept_proposal(text, text, text, text, text, text) from public;
grant execute on function public.accept_proposal(text, text, text, text, text, text) to anon, authenticated;
revoke execute on function public.create_proposal(uuid, jsonb, text, numeric, numeric, date) from public, anon;
grant execute on function public.create_proposal(uuid, jsonb, text, numeric, numeric, date) to authenticated;
revoke execute on function public.convert_lead(uuid, date) from public, anon;
grant execute on function public.convert_lead(uuid, date) to authenticated;
revoke execute on function public.set_lead_status(uuid, text, text) from public, anon;
grant execute on function public.set_lead_status(uuid, text, text) to authenticated;
revoke execute on function public.set_funnel_open(boolean) from public, anon;
grant execute on function public.set_funnel_open(boolean) to authenticated;
