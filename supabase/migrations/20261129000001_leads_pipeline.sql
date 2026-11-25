-- Leads pipeline (rework decisions 20–21, Owner 25 November 2026).
--
--   Lead → Prospect → Won → Onboarding, or Lost (with a reason).
--
-- * The Owner assigns a reviewer to each lead. The reviewer sees only the leads
--   assigned to them; the Owner sees every lead.
-- * The assigned reviewer holds the discovery call and writes its notes. The
--   quote and the proposal (the funnel of 20261125000016) follow from the lead.
-- * When the lead has won, the Owner makes the client in Onboarding and picks the
--   client's preparer and reviewer there; they may differ from the lead's reviewer.
-- * Notes: the website inquiry answers are the lead's first note. With the
--   discovery-call notes, every onboarding answer and note, and the notes staff
--   write on the client, they make one Notes timeline on the client's Overview.
--   The timeline is a view over the rows that already hold them: nothing copied.
--
-- Stages, from the funnel's statuses:
--   new → lead · proposal_sent → prospect · accepted → won · converted → onboarding · lost → lost
--
-- Later phase: booking the discovery call through Google Calendar. discovery_calls
-- already carries scheduled_at, calendar_event_id and meet_url for it; the
-- booking page will insert a scheduled call and the reviewer records it after.

-- ---------------------------------------------------------------------------
-- Stage
-- ---------------------------------------------------------------------------
alter table public.leads drop constraint leads_status_check;
alter table public.leads rename column status to stage;
update public.leads set stage = case stage
  when 'new' then 'lead'
  when 'proposal_sent' then 'prospect'
  when 'accepted' then 'won'
  when 'converted' then 'onboarding'
  else stage end;
-- Lost now needs a reason; older lost leads may not have one.
update public.leads set lost_reason = 'Not recorded' where stage = 'lost' and coalesce(btrim(lost_reason), '') = '';
alter table public.leads alter column stage set default 'lead';
alter table public.leads add constraint leads_stage_check check (stage in ('lead', 'prospect', 'won', 'onboarding', 'lost'));
alter table public.leads add constraint leads_lost_reason check (stage <> 'lost' or coalesce(btrim(lost_reason), '') <> '');

alter table public.leads add column reviewer_id uuid references public.staff_profiles (user_id);
alter table public.leads add column stage_changed_at timestamptz not null default now();
update public.leads set stage_changed_at = updated_at;
create index leads_reviewer_idx on public.leads (reviewer_id, stage);

/**
 * The pipeline's moves. A lead starts at Lead; it moves forward one stage at a
 * time, or to Lost from any stage before Onboarding; a lost lead reopens to the
 * stage its record supports. Onboarding needs the client.
 */
create or replace function private.lead_stage_guard() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    if new.stage <> 'lead' then raise exception 'A new lead starts at the Lead stage' using errcode = '22023'; end if;
    return new;
  end if;
  if new.stage is not distinct from old.stage then return new; end if;
  if not (
    (old.stage = 'lead' and new.stage in ('prospect', 'lost'))
    or (old.stage = 'prospect' and new.stage in ('won', 'lost'))
    or (old.stage = 'won' and new.stage in ('onboarding', 'lost'))
    or (old.stage = 'lost' and new.stage in ('lead', 'prospect', 'won'))
  ) then
    raise exception 'A lead cannot move from % to %', old.stage, new.stage using errcode = '22023';
  end if;
  if new.stage = 'onboarding' and new.client_id is null then
    raise exception 'Onboarding needs the client' using errcode = '22023';
  end if;
  if old.stage = 'lost' then new.lost_reason := null; end if;
  new.stage_changed_at := now();
  return new;
end;
$$;
create trigger stage_guard before insert or update of stage on public.leads for each row execute function private.lead_stage_guard();

/** The Owner, or the reviewer the lead is assigned to. */
create or replace function private.can_work_lead(p_lead uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner() or exists (
    select 1 from public.leads l join public.staff_profiles sp on sp.user_id = l.reviewer_id and sp.active
    where l.id = p_lead and l.reviewer_id = auth.uid()
  )
$$;

-- Reading: the Owner, the lead's reviewer, and staff on the client a lead became.
drop policy leads_read on public.leads;
create policy leads_read on public.leads for select to authenticated using (
  private.is_owner()
  or (reviewer_id = auth.uid() and private.is_staff())
  or (client_id is not null and private.is_staff() and private.can_access_client(client_id))
);
drop policy proposals_read on public.proposals;
create policy proposals_read on public.proposals for select to authenticated using (
  exists (select 1 from public.leads l where l.id = lead_id)
);

-- ---------------------------------------------------------------------------
-- Discovery calls
-- ---------------------------------------------------------------------------
create table public.discovery_calls (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  -- When the call took place. Null while it is only booked (later phase).
  held_at timestamptz,
  notes text,
  -- Later phase, Google Calendar booking: the slot booked, the calendar event and its Meet link.
  scheduled_at timestamptz,
  calendar_event_id text,
  meet_url text,
  booked_via text not null default 'staff' check (booked_via in ('staff', 'booking_page')),
  recorded_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (held_at is not null or scheduled_at is not null),
  check (held_at is not null or notes is null)
);
create index discovery_calls_lead_idx on public.discovery_calls (lead_id, coalesce(held_at, scheduled_at) desc);
create trigger touch_updated_at before update on public.discovery_calls for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.discovery_calls for each row execute function private.audit();
alter table public.discovery_calls enable row level security;
-- Whoever can read the lead reads its calls.
create policy discovery_calls_read on public.discovery_calls for select to authenticated using (
  exists (select 1 from public.leads l where l.id = lead_id)
);

-- ---------------------------------------------------------------------------
-- Notes written on the client
-- ---------------------------------------------------------------------------
create table public.client_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  body text not null check (btrim(body) <> '' and length(body) <= 4000),
  created_by uuid not null references auth.users (id),
  created_at timestamptz not null default now()
);
create index client_notes_client_idx on public.client_notes (client_id, created_at desc);
create trigger audit after insert or update or delete on public.client_notes for each row execute function private.audit();
alter table public.client_notes enable row level security;
create policy client_notes_read on public.client_notes for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));

-- ---------------------------------------------------------------------------
-- The Notes timelines (views run with the reader's rights, so each source's
-- own row-level security applies).
-- ---------------------------------------------------------------------------

/** A lead's notes: the website inquiry answers, then each discovery call. */
create view public.lead_notes with (security_invoker = true) as
  select l.id as lead_id, l.client_id, 'inquiry'::text as source, l.id as source_id, l.created_at as at,
         l.created_by as author, l.message as body,
         jsonb_build_object(
           'from', l.source, 'business_name', l.business_name, 'contact_name', l.contact_name, 'email', l.email, 'mobile', l.mobile,
           'taxpayer_type', l.taxpayer_type, 'services', to_jsonb(l.services), 'profile', l.profile,
           'monthly_quote', l.quote -> 'monthlyRetainer'
         ) as details
  from public.leads l
  union all
  select c.lead_id, l.client_id, 'discovery_call', c.id, c.held_at, c.recorded_by, c.notes, null::jsonb
  from public.discovery_calls c join public.leads l on l.id = c.lead_id
  where c.held_at is not null;

/** A client's Notes on the Overview: its lead's notes, every onboarding answer and note, and notes written on the client. */
create view public.client_notes_timeline with (security_invoker = true) as
  select n.client_id, n.source, n.source_id::text as source_id, n.at, n.author, n.body, n.details
  from public.lead_notes n where n.client_id is not null
  union all
  select t.client_id, 'onboarding', t.item, t.done_at, t.done_by, t.note, jsonb_build_object('item', t.item)
  from public.onboarding_ticks t
  union all
  select n.client_id, 'note', n.id::text, n.created_at, n.created_by, n.body, null
  from public.client_notes n;

-- ---------------------------------------------------------------------------
-- Actions
-- ---------------------------------------------------------------------------

/** The Owner assigns the reviewer who holds the discovery call (a reviewer, or the Owner). Null unassigns. */
create or replace function public.assign_lead_reviewer(p_lead uuid, p_reviewer uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_owner() then raise exception 'Only the Owner can assign a lead' using errcode = '42501'; end if;
  if p_reviewer is not null and not exists (
    select 1 from public.staff_profiles where user_id = p_reviewer and active and role in ('owner', 'reviewer')
  ) then
    raise exception 'Assign a reviewer' using errcode = '22023';
  end if;
  update public.leads set reviewer_id = p_reviewer where id = p_lead;
  if not found then raise exception 'Lead not found' using errcode = 'P0002'; end if;
end;
$$;

/**
 * The assigned reviewer (or the Owner) records the discovery call: when it was
 * held and its notes. A lead at the Lead stage becomes a Prospect.
 */
create or replace function public.record_discovery_call(p_lead uuid, p_held_at timestamptz, p_notes text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
  v_id uuid;
begin
  if not private.can_work_lead(p_lead) then raise exception 'Only the Owner or the lead''s reviewer can record its discovery call' using errcode = '42501'; end if;
  select * into l from public.leads where id = p_lead for update;
  if l.id is null then raise exception 'Lead not found' using errcode = 'P0002'; end if;
  if l.stage in ('lost', 'onboarding') then raise exception 'This lead is no longer open' using errcode = '22023'; end if;
  if p_held_at is null then raise exception 'Enter when the call was held' using errcode = '22023'; end if;
  if p_held_at > now() + interval '1 day' then raise exception 'The call has not happened yet' using errcode = '22023'; end if;
  if coalesce(btrim(p_notes), '') = '' then raise exception 'Write the notes of the call' using errcode = '22023'; end if;
  insert into public.discovery_calls (lead_id, held_at, notes, recorded_by)
  values (l.id, p_held_at, left(btrim(p_notes), 8000), auth.uid())
  returning id into v_id;
  if l.stage = 'lead' then update public.leads set stage = 'prospect' where id = l.id; end if;
  return v_id;
end;
$$;

/** Lost, with the reason; from any stage before Onboarding. The Owner or the lead's reviewer. */
create or replace function public.mark_lead_lost(p_lead uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_work_lead(p_lead) then raise exception 'Only the Owner or the lead''s reviewer can change this lead' using errcode = '42501'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason the lead was lost' using errcode = '22023'; end if;
  update public.leads set stage = 'lost', lost_reason = left(btrim(p_reason), 500) where id = p_lead and stage in ('lead', 'prospect', 'won');
  if not found then raise exception 'Lead not found, or it is already onboarding or lost' using errcode = '22023'; end if;
end;
$$;

/** Reopens a lost lead at the stage its record supports: Won with an accepted proposal, Prospect after a call or a proposal, else Lead. */
create or replace function public.reopen_lead(p_lead uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare
  v_stage text;
begin
  if not private.can_work_lead(p_lead) then raise exception 'Only the Owner or the lead''s reviewer can change this lead' using errcode = '42501'; end if;
  select case
    when exists (select 1 from public.proposals where lead_id = p_lead and status = 'accepted') then 'won'
    when exists (select 1 from public.proposals where lead_id = p_lead and status = 'sent')
      or exists (select 1 from public.discovery_calls where lead_id = p_lead and held_at is not null) then 'prospect'
    else 'lead' end into v_stage;
  update public.leads set stage = v_stage where id = p_lead and stage = 'lost';
  if not found then raise exception 'Lead not found, or it is not lost' using errcode = '22023'; end if;
  return v_stage;
end;
$$;

drop function public.set_lead_status(uuid, text, text);

/** Step 3 of the funnel: the Owner or the lead's reviewer sends a proposal; the lead is a Prospect. Earlier unaccepted proposals are withdrawn. */
create or replace function public.create_proposal(p_lead uuid, p_quote jsonb, p_terms text, p_monthly numeric, p_first_year numeric, p_valid_until date)
returns public.proposals
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
  p public.proposals;
begin
  if not private.can_work_lead(p_lead) then raise exception 'Only the Owner or the lead''s reviewer can send proposals' using errcode = '42501'; end if;
  select * into l from public.leads where id = p_lead for update;
  if l.id is null then raise exception 'Lead not found' using errcode = 'P0002'; end if;
  if l.stage in ('won', 'onboarding') then raise exception 'This lead has already accepted a proposal' using errcode = '22023'; end if;
  if l.stage = 'lost' then raise exception 'Reopen the lead first' using errcode = '22023'; end if;
  update public.proposals set status = 'withdrawn' where lead_id = l.id and status = 'sent';
  insert into public.proposals (lead_id, quote, terms, monthly_retainer, first_year_total, valid_until, created_by)
  values (l.id, p_quote, p_terms, p_monthly, p_first_year, p_valid_until, auth.uid())
  returning * into p;
  if l.stage = 'lead' then update public.leads set stage = 'prospect' where id = l.id; end if;
  return p;
end;
$$;

/** Step 4: the prospect accepts at their link (the e-signature); the lead is Won. */
create or replace function public.accept_proposal(p_token text, p_name text, p_position text, p_hash text, p_ip text, p_user_agent text)
returns void
language plpgsql security definer set search_path = '' as $$
declare
  p public.proposals;
  l public.leads;
  open boolean;
begin
  select pr.* into p from public.proposals pr where pr.token = p_token for update;
  select b.funnel_open into open from public.leads x join public.brands b on b.id = x.brand_id where x.id = p.lead_id;
  if p.id is null or not (open or private.is_staff()) then raise exception 'Proposal not found' using errcode = 'P0002'; end if;
  if p.status = 'accepted' then raise exception 'This proposal has already been accepted' using errcode = '22023'; end if;
  if p.status = 'withdrawn' then raise exception 'This proposal has been replaced; please use the latest link we sent' using errcode = '22023'; end if;
  select * into l from public.leads where id = p.lead_id for update;
  if l.stage = 'lost' then raise exception 'This proposal is no longer open; please contact us' using errcode = '22023'; end if;
  if p.valid_until < (now() at time zone 'Asia/Manila')::date then
    raise exception 'This proposal expired on %; please ask us for a new one', to_char(p.valid_until, 'FMMonth FMDD, YYYY') using errcode = '22023';
  end if;
  if btrim(coalesce(p_name, '')) = '' then raise exception 'Type your full name to accept' using errcode = '22023'; end if;
  if coalesce(p_hash, '') !~ '^[0-9a-f]{64}$' then raise exception 'The proposal could not be verified' using errcode = '22023'; end if;
  update public.proposals set status = 'accepted', accepted_at = now(), accepted_name = btrim(p_name), accepted_position = nullif(btrim(p_position), ''),
    accepted_ip = left(p_ip, 100), accepted_user_agent = left(p_user_agent, 500), accepted_hash = p_hash
  where id = p.id;
  if l.stage = 'prospect' then update public.leads set stage = 'won' where id = l.id; end if;
end;
$$;

/**
 * Step 5: the Owner makes the client from a won lead, in Onboarding, with an
 * engagement per service line asked for (the whole retainer on the first). The
 * client's preparer and reviewer are picked here, separately from the lead's
 * reviewer; either can be left for the Team card (the onboarding checklist asks).
 */
drop function public.convert_lead(uuid, date);
create or replace function public.convert_lead(p_lead uuid, p_start date, p_preparer uuid default null, p_reviewer uuid default null) returns uuid
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
  if l.stage <> 'won' then raise exception 'Only a won lead becomes a client' using errcode = '22023'; end if;
  select * into p from public.proposals where lead_id = l.id and status = 'accepted' order by accepted_at desc limit 1;
  if p.id is null then raise exception 'The lead has not accepted a proposal yet' using errcode = '22023'; end if;
  if p_start is null then raise exception 'Choose the date the services start' using errcode = '22023'; end if;
  if p_preparer is not null and not exists (select 1 from public.staff_profiles where user_id = p_preparer and active) then
    raise exception 'Choose an active staff member as preparer' using errcode = '22023';
  end if;
  if p_reviewer is not null and not exists (select 1 from public.staff_profiles where user_id = p_reviewer and active and role in ('owner', 'reviewer')) then
    raise exception 'Choose a reviewer for the client' using errcode = '22023';
  end if;

  insert into public.clients (brand_id, code, name, taxpayer_type, status)
  values (l.brand_id, private.next_client_code(l.brand_id), l.business_name, l.taxpayer_type, 'onboarding')
  returning id into c;
  insert into public.client_registrations (client_id, registration_date, tax_types) values (c, null, '[]'::jsonb);
  foreach s in array (case when cardinality(l.services) = 0 then array['tax_compliance'] else l.services end) loop
    insert into public.engagements (client_id, service_line, monthly_retainer, start_date, notes)
    values (c, s, case when first then p.monthly_retainer else 0 end, p_start, 'From proposal accepted ' || to_char(p.accepted_at at time zone 'Asia/Manila', 'YYYY-MM-DD'));
    first := false;
  end loop;
  if p_preparer is not null then insert into public.staff_assignments (client_id, user_id, role) values (c, p_preparer, 'preparer'); end if;
  if p_reviewer is not null then insert into public.staff_assignments (client_id, user_id, role) values (c, p_reviewer, 'reviewer'); end if;
  update public.leads set stage = 'onboarding', client_id = c where id = l.id;
  return c;
end;
$$;

/** A note written on the client, by the Owner or staff assigned to it. */
create or replace function public.add_client_note(p_client uuid, p_body text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_id uuid;
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if coalesce(btrim(p_body), '') = '' then raise exception 'Write the note' using errcode = '22023'; end if;
  insert into public.client_notes (client_id, body, created_by) values (p_client, left(btrim(p_body), 4000), auth.uid()) returning id into v_id;
  return v_id;
end;
$$;

revoke execute on function private.can_work_lead(uuid) from public;
grant execute on function private.can_work_lead(uuid) to authenticated;
revoke execute on function public.assign_lead_reviewer(uuid, uuid) from public, anon;
grant execute on function public.assign_lead_reviewer(uuid, uuid) to authenticated;
revoke execute on function public.record_discovery_call(uuid, timestamptz, text) from public, anon;
grant execute on function public.record_discovery_call(uuid, timestamptz, text) to authenticated;
revoke execute on function public.mark_lead_lost(uuid, text) from public, anon;
grant execute on function public.mark_lead_lost(uuid, text) to authenticated;
revoke execute on function public.reopen_lead(uuid) from public, anon;
grant execute on function public.reopen_lead(uuid) to authenticated;
revoke execute on function public.create_proposal(uuid, jsonb, text, numeric, numeric, date) from public, anon;
grant execute on function public.create_proposal(uuid, jsonb, text, numeric, numeric, date) to authenticated;
revoke execute on function public.accept_proposal(text, text, text, text, text, text) from public;
grant execute on function public.accept_proposal(text, text, text, text, text, text) to anon, authenticated;
revoke execute on function public.convert_lead(uuid, date, uuid, uuid) from public, anon;
grant execute on function public.convert_lead(uuid, date, uuid, uuid) to authenticated;
revoke execute on function public.add_client_note(uuid, text) from public, anon;
grant execute on function public.add_client_note(uuid, text) to authenticated;
