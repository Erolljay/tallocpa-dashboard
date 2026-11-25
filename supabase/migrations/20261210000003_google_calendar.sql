-- Rework phase 5 (docs/REWORK.md, decisions 18, 20 and 22): Google Calendar.
--
--   google_calendar_links   each staff member's Google Calendar, connected with the firm's
--                           internal OAuth client (tallocpa.com). Staff see who is
--                           connected. The refresh token is encrypted by the app
--                           (AES-256-GCM, GOOGLE_TOKEN_KEY) and kept in the private
--                           schema; only the server (service role) reads or writes it.
--   leads.booking_token     the link of a lead's public booking page: the assigned
--                           reviewer's free times; booking makes the discovery call
--                           (discovery_calls.scheduled_at, calendar event, Meet link).
--   client_meetings         meetings a client books from the portal with its reviewer
--                           (or preparer), with the calendar event and Meet link.
--
-- Bookings are written by the server after it checks the token (or the signed-in client)
-- and the slot; the browser never writes them directly.

-- ---------------------------------------------------------------------------
-- Staff calendars.
-- ---------------------------------------------------------------------------

-- Who is connected, readable by staff. No token here.
create table public.google_calendar_links (
  user_id uuid primary key references public.staff_profiles (user_id) on delete cascade,
  google_email text not null,
  connected_at timestamptz not null default now(),
  last_error text,
  last_error_at timestamptz
);
alter table public.google_calendar_links enable row level security;
create policy google_calendar_links_read on public.google_calendar_links for select to authenticated using (private.is_staff());
revoke insert, update, delete on public.google_calendar_links from anon, authenticated;
create trigger audit after insert or update or delete on public.google_calendar_links for each row execute function private.audit();

-- The refresh tokens, in the private schema (not exposed through the API), encrypted by
-- the app: AES-256-GCM, "iv.ciphertext.tag" in base64 (src/lib/google/crypto.ts).
create table private.google_calendar_tokens (
  user_id uuid primary key references public.google_calendar_links (user_id) on delete cascade,
  refresh_token text not null
);
revoke all on private.google_calendar_tokens from public, anon, authenticated;

/** Saves a staff member's connection (server only, after the OAuth callback). */
create or replace function public.calendar_link_save(p_user uuid, p_email text, p_token text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.google_calendar_links (user_id, google_email) values (p_user, lower(btrim(p_email)))
  on conflict (user_id) do update set google_email = excluded.google_email, connected_at = now(), last_error = null, last_error_at = null;
  insert into private.google_calendar_tokens (user_id, refresh_token) values (p_user, p_token)
  on conflict (user_id) do update set refresh_token = excluded.refresh_token;
end;
$$;

/** The encrypted refresh tokens of these staff members (server only). */
create or replace function public.calendar_tokens(p_users uuid[])
returns table (user_id uuid, google_email text, refresh_token text)
language sql stable security definer set search_path = '' as $$
  select l.user_id, l.google_email, t.refresh_token
  from public.google_calendar_links l join private.google_calendar_tokens t on t.user_id = l.user_id
  where l.user_id = any (p_users)
$$;

/** Records that Google refused a connection (revoked, expired), or clears it. Server only. */
create or replace function public.calendar_link_error(p_user uuid, p_error text) returns void
language sql security definer set search_path = '' as $$
  update public.google_calendar_links set last_error = nullif(left(p_error, 500), ''), last_error_at = case when coalesce(p_error, '') = '' then null else now() end
  where user_id = p_user
$$;

/** Removes a connection (server only, after checking it is the user's own). */
create or replace function public.calendar_link_remove(p_user uuid) returns void
language sql security definer set search_path = '' as $$
  delete from public.google_calendar_links where user_id = p_user
$$;

revoke execute on function public.calendar_link_save(uuid, text, text) from public, anon, authenticated;
revoke execute on function public.calendar_tokens(uuid[]) from public, anon, authenticated;
revoke execute on function public.calendar_link_error(uuid, text) from public, anon, authenticated;
revoke execute on function public.calendar_link_remove(uuid) from public, anon, authenticated;
grant execute on function public.calendar_link_save(uuid, text, text) to service_role;
grant execute on function public.calendar_tokens(uuid[]) to service_role;
grant execute on function public.calendar_link_error(uuid, text) to service_role;
grant execute on function public.calendar_link_remove(uuid) to service_role;

-- ---------------------------------------------------------------------------
-- A lead's booking link.
-- ---------------------------------------------------------------------------

alter table public.leads add column booking_token text unique check (booking_token ~ '^[0-9a-f]{64}$');

/** The lead's booking link token, made on first ask. The Owner or the lead's reviewer, once a reviewer is assigned. */
create or replace function public.lead_booking_token(p_lead uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
begin
  select * into l from public.leads where id = p_lead;
  if l.id is null or not private.can_work_lead(p_lead) then
    raise exception 'Lead not found' using errcode = 'P0002';
  end if;
  if l.reviewer_id is null then
    raise exception 'Assign a reviewer first: the booking page offers the reviewer''s free times' using errcode = '22023';
  end if;
  if l.stage not in ('lead', 'prospect') then
    raise exception 'The discovery call is booked while the lead is a Lead or Prospect' using errcode = '22023';
  end if;
  if l.booking_token is null then
    update public.leads set booking_token = replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '') where id = p_lead returning booking_token into l.booking_token;
  end if;
  return l.booking_token;
end;
$$;

revoke execute on function public.lead_booking_token(uuid) from public, anon;
grant execute on function public.lead_booking_token(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Meetings a client books from the portal.
-- ---------------------------------------------------------------------------

create table public.client_meetings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  staff_user_id uuid not null references public.staff_profiles (user_id),
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  topic text,
  calendar_event_id text not null,
  meet_url text,
  booked_by uuid not null references auth.users (id),
  cancelled_at timestamptz,
  created_at timestamptz not null default now()
);
create index client_meetings_client_idx on public.client_meetings (client_id, starts_at desc);
create trigger audit after insert or update or delete on public.client_meetings for each row execute function private.audit();
alter table public.client_meetings enable row level security;
create policy client_meetings_read on public.client_meetings for select to authenticated using (
  private.is_client_user(client_id) or (private.is_staff() and private.can_access_client(client_id))
);
revoke insert, update, delete on public.client_meetings from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Discovery calls booked from the booking page.
-- ---------------------------------------------------------------------------

-- One booked call waiting to be held per lead.
create unique index discovery_calls_one_booked on public.discovery_calls (lead_id) where held_at is null;

/** Recording the call's notes fills the booked call, if there is one; otherwise a new call. Unchanged otherwise. */
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
    where lead_id = l.id and held_at is null
    returning id into v_id;
  if v_id is null then
    insert into public.discovery_calls (lead_id, held_at, notes, recorded_by)
    values (l.id, p_held_at, left(btrim(p_notes), 8000), auth.uid())
    returning id into v_id;
  end if;
  if l.stage = 'lead' then update public.leads set stage = 'prospect' where id = l.id; end if;
  return v_id;
end;
$$;

/**
 * The booking page's view of a lead (server only, after it checks the link's form): the
 * names to greet, the reviewer whose times are offered, and the call already booked.
 */
create or replace function public.booking_lead(p_token text)
returns table (lead_id uuid, business_name text, contact_name text, email text, reviewer_id uuid, reviewer_name text, open boolean,
               booked_at timestamptz, meet_url text)
language sql stable security definer set search_path = '' as $$
  select l.id, l.business_name, l.contact_name, l.email, l.reviewer_id, sp.full_name, l.stage in ('lead', 'prospect') and sp.active,
         c.scheduled_at, c.meet_url
  from public.leads l
  join public.staff_profiles sp on sp.user_id = l.reviewer_id
  left join public.discovery_calls c on c.lead_id = l.id and c.held_at is null
  where l.booking_token = p_token
$$;

/** Claims the slot for the lead (server only), before the calendar event is made. Fails if a call is already booked. */
create or replace function public.booking_claim(p_lead uuid, p_at timestamptz) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_id uuid;
begin
  if not exists (select 1 from public.leads where id = p_lead and stage in ('lead', 'prospect')) then
    raise exception 'This booking link is closed' using errcode = '22023';
  end if;
  insert into public.discovery_calls (lead_id, scheduled_at, booked_via) values (p_lead, p_at, 'booking_page') returning id into v_id;
  return v_id;
exception when unique_violation then
  raise exception 'A call is already booked' using errcode = '22023';
end;
$$;

/** Saves the calendar event of a claimed slot, or releases the claim when the event could not be made (server only). */
create or replace function public.booking_confirm(p_call uuid, p_event text, p_meet text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if p_event is null then
    delete from public.discovery_calls where id = p_call and held_at is null and calendar_event_id is null;
  else
    update public.discovery_calls set calendar_event_id = p_event, meet_url = p_meet where id = p_call;
  end if;
end;
$$;

revoke execute on function public.booking_lead(text) from public, anon, authenticated;
revoke execute on function public.booking_claim(uuid, timestamptz) from public, anon, authenticated;
revoke execute on function public.booking_confirm(uuid, text, text) from public, anon, authenticated;
grant execute on function public.booking_lead(text) to service_role;
grant execute on function public.booking_claim(uuid, timestamptz) to service_role;
grant execute on function public.booking_confirm(uuid, text, text) to service_role;

-- ---------------------------------------------------------------------------
-- The client's "Book a meeting": with its reviewer (or else its preparer).
-- ---------------------------------------------------------------------------

/** Whom the client books with from the portal, and whether that calendar is connected. */
create or replace function public.portal_meeting_host(p_client uuid)
returns table (user_id uuid, full_name text, role text, connected boolean)
language plpgsql stable security definer set search_path = '' as $$
begin
  if p_client is null or not private.can_see_portal(p_client) then
    raise exception 'Business not found' using errcode = '42501';
  end if;
  return query
    select sa.user_id, sp.full_name, sa.role, exists (select 1 from public.google_calendar_links g where g.user_id = sa.user_id and g.last_error is null)
    from public.staff_assignments sa
    join public.staff_profiles sp on sp.user_id = sa.user_id and sp.active
    where sa.client_id = p_client and sa.role in ('reviewer', 'preparer')
    order by case sa.role when 'reviewer' then 0 else 1 end, sp.full_name
    limit 1;
end;
$$;

revoke execute on function public.portal_meeting_host(uuid) from public, anon;
grant execute on function public.portal_meeting_host(uuid) to authenticated;
