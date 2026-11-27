-- Cancelling a discovery call or a client meeting, with a notice (docs/REWORK.md,
-- decision 22 follow-up).
--
--   cancel_discovery_call   the Owner or the lead's reviewer cancels the lead's booked call
--   cancel_client_meeting   staff who work on the client, or the client's own portal user,
--                           cancel an upcoming meeting
--
-- Cancelling keeps the row (cancelled_at, who, the optional reason) and frees the time:
-- a cancelled call or meeting no longer blocks the host's slot, and a lead whose call is
-- cancelled can book again from the same link. The app then removes the Google Calendar
-- event (Google emails the guests) when the host's calendar is connected.
--
-- Notices (one trigger per table, so every way of cancelling is covered; the person who
-- cancelled is not notified):
--   Kind                         To                                   Event
--   discovery_call_cancelled     lead's reviewer, host, Owner         a booked discovery call is cancelled
--   client_meeting_cancelled     the staff member booked              a client meeting is cancelled
--   meeting_cancelled            client's portal users                a meeting with the firm is cancelled
-- The lead has no account: the app emails them directly.

-- ---------------------------------------------------------------------------
-- Columns
-- ---------------------------------------------------------------------------
alter table public.discovery_calls
  add column cancelled_at timestamptz,
  add column cancelled_by uuid references auth.users (id),
  add column cancel_reason text,
  add constraint discovery_calls_cancel_check check (cancelled_at is null or held_at is null);

alter table public.client_meetings
  add column cancelled_by uuid references auth.users (id),
  add column cancel_reason text;

-- One booked call waiting to be held per lead: a cancelled one no longer counts.
drop index public.discovery_calls_one_booked;
create unique index discovery_calls_one_booked on public.discovery_calls (lead_id) where held_at is null and cancelled_at is null;

-- ---------------------------------------------------------------------------
-- A cancelled call frees its slot and its lead
-- ---------------------------------------------------------------------------
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
  update public.discovery_calls set held_at = p_held_at, notes = left(btrim(p_notes), 8000), recorded_by = auth.uid()
    where lead_id = l.id and held_at is null and cancelled_at is null
    returning id into v_id;
  if v_id is null then
    insert into public.discovery_calls (lead_id, held_at, notes, recorded_by)
    values (l.id, p_held_at, left(btrim(p_notes), 8000), auth.uid())
    returning id into v_id;
  end if;
  -- The link was for this call; another needs a new link.
  update public.leads set booking_token = null where id = l.id;
  if l.stage = 'lead' then update public.leads set stage = 'prospect' where id = l.id; end if;
  return v_id;
end;
$$;

create or replace function private.check_host_free(p_staff uuid, p_start timestamptz, p_end timestamptz) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended('calendar-host:' || p_staff::text, 0));
  if exists (
    select 1 from public.discovery_calls c
    where c.host_user_id = p_staff and c.held_at is null and c.cancelled_at is null and c.scheduled_at < p_end and c.scheduled_until > p_start
  ) or exists (
    select 1 from public.client_meetings m
    where m.staff_user_id = p_staff and m.cancelled_at is null and m.starts_at < p_end and m.ends_at > p_start
  ) then
    raise exception 'That time was just taken' using errcode = '23P01';
  end if;
end;
$$;

create or replace function public.booking_lead(p_token text)
returns table (lead_id uuid, business_name text, contact_name text, email text, reviewer_id uuid, reviewer_name text, open boolean,
               booked_at timestamptz, meet_url text)
language sql stable security definer set search_path = '' as $$
  select l.id, l.business_name, l.contact_name, l.email, l.reviewer_id, sp.full_name, l.stage in ('lead', 'prospect') and sp.active,
         c.scheduled_at, c.meet_url
  from public.leads l
  join public.staff_profiles sp on sp.user_id = l.reviewer_id
  left join public.discovery_calls c on c.lead_id = l.id and c.held_at is null and c.cancelled_at is null
  where l.booking_token = p_token
$$;

create or replace function public.booking_claim(p_lead uuid, p_at timestamptz, p_until timestamptz) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
  v_id uuid;
begin
  select * into l from public.leads where id = p_lead;
  if l.id is null or l.stage not in ('lead', 'prospect') or l.reviewer_id is null or l.booking_token is null then
    raise exception 'This booking link is closed' using errcode = '22023';
  end if;
  if p_until is null or p_until <= p_at then raise exception 'Give the slot''s end' using errcode = '22023'; end if;
  if exists (select 1 from public.discovery_calls where lead_id = p_lead and held_at is null and cancelled_at is null) then
    raise exception 'A call is already booked' using errcode = '22023';
  end if;
  perform private.check_host_free(l.reviewer_id, p_at, p_until);
  insert into public.discovery_calls (lead_id, scheduled_at, scheduled_until, host_user_id, booked_via)
  values (p_lead, p_at, p_until, l.reviewer_id, 'booking_page') returning id into v_id;
  return v_id;
exception when unique_violation then
  raise exception 'A call is already booked' using errcode = '22023';
end;
$$;

create or replace function public.booking_confirm(p_call uuid, p_event text, p_meet text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if p_event is null then
    delete from public.discovery_calls where id = p_call and held_at is null and cancelled_at is null and calendar_event_id is null;
  else
    update public.discovery_calls set calendar_event_id = p_event, meet_url = p_meet where id = p_call;
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Cancelling
-- ---------------------------------------------------------------------------
create or replace function private.cancel_reason(p_reason text) returns text
language sql immutable as $$
  select nullif(left(btrim(regexp_replace(coalesce(p_reason, ''), '\s+', ' ', 'g')), 500), '')
$$;

/**
 * The Owner or the lead's reviewer cancels the lead's booked call (not yet held). Returns
 * what the app needs to remove the calendar event and tell the lead.
 */
create or replace function public.cancel_discovery_call(p_call uuid, p_reason text default null) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  c public.discovery_calls;
  l public.leads;
begin
  select * into c from public.discovery_calls where id = p_call for update;
  if c.id is null or not private.can_work_lead(c.lead_id) then
    raise exception 'Discovery call not found' using errcode = 'P0002';
  end if;
  if c.held_at is not null then raise exception 'This call was held; record its notes instead' using errcode = '22023'; end if;
  if c.cancelled_at is not null then raise exception 'This call is already cancelled' using errcode = '22023'; end if;
  update public.discovery_calls set cancelled_at = now(), cancelled_by = auth.uid(), cancel_reason = private.cancel_reason(p_reason)
  where id = c.id returning * into c;
  select * into l from public.leads where id = c.lead_id;
  return jsonb_build_object(
    'id', c.id, 'lead_id', l.id, 'host_user_id', coalesce(c.host_user_id, l.reviewer_id), 'calendar_event_id', c.calendar_event_id,
    'scheduled_at', c.scheduled_at, 'reason', c.cancel_reason,
    'email', l.email, 'contact_name', l.contact_name, 'business_name', l.business_name, 'brand_id', l.brand_id,
    -- The lead can book again from the link while it is open.
    'booking_token', case when l.stage in ('lead', 'prospect') then l.booking_token end
  );
end;
$$;

/**
 * Cancels an upcoming client meeting: the client's own portal user, or the Owner or staff
 * assigned to the client. Returns the meeting, for the app to remove the calendar event.
 */
create or replace function public.cancel_client_meeting(p_meeting uuid, p_reason text default null) returns public.client_meetings
language plpgsql security definer set search_path = '' as $$
declare
  m public.client_meetings;
begin
  select * into m from public.client_meetings where id = p_meeting for update;
  if m.id is null or not (
    private.is_client_user(m.client_id)
    or (private.is_staff() and private.can_access_client(m.client_id) and (private.is_owner() or private.is_assigned(m.client_id)))
  ) then
    raise exception 'Meeting not found' using errcode = 'P0002';
  end if;
  if m.cancelled_at is not null then raise exception 'This meeting is already cancelled' using errcode = '22023'; end if;
  if m.starts_at <= now() then raise exception 'Only a meeting that has not started can be cancelled' using errcode = '22023'; end if;
  update public.client_meetings set cancelled_at = now(), cancelled_by = auth.uid(), cancel_reason = private.cancel_reason(p_reason)
  where id = m.id returning * into m;
  return m;
end;
$$;

-- ---------------------------------------------------------------------------
-- Notices
-- ---------------------------------------------------------------------------
alter table public.notifications drop constraint notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check check (kind in (
  'return_ready_for_review', 'return_for_client_approval', 'return_ready_for_approval', 'return_sent_back',
  'return_client_query', 'return_query_answered', 'return_approved', 'return_filed', 'esubmission_result',
  'unlock_requested', 'unlock_decided',
  'payment_proof_submitted', 'payment_verified', 'payment_rejected', 'statement_issued',
  'request_from_firm', 'request_from_client', 'request_assigned', 'task_assigned',
  'remittance_ready_for_approval', 'remittance_remitted',
  'lead_new', 'discovery_call_booked', 'client_meeting_booked',
  'discovery_call_cancelled', 'client_meeting_cancelled', 'meeting_cancelled'
));

create or replace function private.manila_when(t timestamptz) returns text
language sql immutable set search_path = '' as $$
  select to_char(t at time zone 'Asia/Manila', 'Dy, FMMonth FMDD, FMHH12:MI AM') || ' (Manila)'
$$;

create or replace function private.notify_discovery_call_cancelled() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
begin
  if old.cancelled_at is not null or new.cancelled_at is null then return null; end if;
  select * into l from public.leads where id = new.lead_id;
  perform private.notify(array[new.host_user_id, l.reviewer_id] || private.owner_ids(), 'discovery_call_cancelled',
    'Discovery call cancelled: ' || coalesce(nullif(btrim(l.business_name), ''), l.contact_name),
    concat_ws(' · ', case when new.scheduled_at is not null then 'Was ' || private.manila_when(new.scheduled_at) end,
              'Reason: ' || new.cancel_reason),
    '/app/leads/' || l.id, null);
  return null;
end;
$$;
create trigger notify_cancelled after update of cancelled_at on public.discovery_calls
  for each row execute function private.notify_discovery_call_cancelled();

create or replace function private.notify_client_meeting_cancelled() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  c text;
  by_client boolean;
  who text;
begin
  if old.cancelled_at is not null or new.cancelled_at is null then return null; end if;
  select name into c from public.clients where id = new.client_id;
  by_client := exists (select 1 from public.client_users where client_id = new.client_id and user_id = new.cancelled_by);
  who := case when by_client then c else coalesce((select full_name from public.staff_profiles where user_id = new.cancelled_by), 'Tallo CPA') end;
  -- The staff member it was booked with.
  perform private.notify(array[new.staff_user_id], 'client_meeting_cancelled',
    c || ': meeting on ' || private.manila_when(new.starts_at) || ' cancelled',
    concat_ws(' · ', 'Cancelled by ' || who, 'Reason: ' || new.cancel_reason, 'Topic: ' || nullif(btrim(new.topic), '')),
    '/app/calendar', new.client_id);
  -- The client's portal users (other than the one who cancelled).
  perform private.notify(private.client_portal_ids(new.client_id), 'meeting_cancelled',
    'Your meeting on ' || private.manila_when(new.starts_at) || ' is cancelled',
    concat_ws(' ', case when by_client then 'It was cancelled from your portal.' else 'Your team had to cancel it.' end,
              'Reason: ' || new.cancel_reason || '.', 'You can book another time from the portal.'),
    '/portal/book', new.client_id);
  return null;
end;
$$;
create trigger notify_cancelled after update of cancelled_at on public.client_meetings
  for each row execute function private.notify_client_meeting_cancelled();

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
revoke execute on function private.cancel_reason(text), private.manila_when(timestamptz),
  private.notify_discovery_call_cancelled(), private.notify_client_meeting_cancelled()
  from public, anon, authenticated;
revoke execute on function public.cancel_discovery_call(uuid, text), public.cancel_client_meeting(uuid, text) from public, anon;
grant execute on function public.cancel_discovery_call(uuid, text), public.cancel_client_meeting(uuid, text) to authenticated;
