-- AI employees: the Chief of Staff's `my_schedule` (docs/AI-WORKFORCE.md §8b).
--
-- One list of everything dated for the Owner, from TalloCPA OS itself, between two days
-- (Manila), for the morning brief:
--
--   * meeting    client meetings booked from the portal with the Owner (client_meetings);
--   * call       discovery calls booked with the Owner and not yet held (discovery_calls);
--   * returns    returns of the Chief of Staff's clients due that day and not yet filed,
--                one line per due date with the count per form (filing_instances);
--   * task       the Owner's open tasks due that day (staff_tasks);
--   * request    the Owner's open requests and tickets due that day (client_requests);
--   * registration  open registration cases with a target date that day (registration_cases).
--                The routing slip's steps carry no planned visit date (only the day a step
--                was done), so a case's target date is the only date to show.
--
-- Google Calendar events are not here: the app reads a staff member's calendar live with
-- that person's stored Google sign-in (src/lib/calendar/staff.ts) and keeps no copy, and an
-- AI employee never gets a Google sign-in. The Chief of Staff's desk keeps reading the
-- Owner's Google Calendar through Cowork's own Google Calendar connector.
--
-- No table is opened to AI employees. One read-only function hands the Chief of Staff
-- what the list needs, and only while it is switched on and allowed client data:
--   * the person is always the Owner: the Chief of Staff's supervisor when that is an
--     active Owner of its brand, else the brand's first active Owner;
--   * a client's code and name only for clients the AI employee may read
--     (private.ai_client_ids()); a meeting with another client shows without them, and
--     returns are counted only for its own clients;
--   * a discovery call shows the lead's business name (it is the Owner's own meeting);
--     no contact details, emails, notes, amounts or Google event ids;
--   * at most 31 days.
-- Nothing here writes: the Chief of Staff never creates, changes, accepts or declines
-- anything on a schedule.

create or replace function private.ai_schedule_caller() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e
  where e.user_id = auth.uid() and e.enabled and e.client_data and e.key = 'chief_of_staff'
$$;

create or replace function public.ai_my_schedule(p_from date, p_to date)
returns table (
  kind text,
  starts_at timestamptz,
  ends_at timestamptz,
  on_date date,
  title text,
  client_code text,
  client_name text,
  place text,
  source text
)
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_schedule_caller();
  owner uuid;
  mine uuid[];
  t_from timestamptz;
  t_to timestamptz;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Chief of Staff can read the schedule' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 30 then
    raise exception 'Give a period of at most 31 days' using errcode = '22023';
  end if;
  select sp.user_id into owner from public.staff_profiles sp
  where sp.brand_id = me.brand_id and sp.role = 'owner' and sp.active
  order by (sp.user_id = me.supervisor_user_id) desc, sp.created_at
  limit 1;
  if owner is null then
    raise exception 'No active Owner to read the schedule of' using errcode = 'P0002';
  end if;
  mine := private.ai_client_ids();
  t_from := (p_from::timestamp) at time zone 'Asia/Manila';
  t_to := ((p_to + 1)::timestamp) at time zone 'Asia/Manila';

  return query
    -- Client meetings booked with the Owner.
    select 'meeting', m.starts_at, m.ends_at, (m.starts_at at time zone 'Asia/Manila')::date,
           'Client meeting' || coalesce(': ' || m.topic, ''),
           case when c.id = any (mine) then c.code end, case when c.id = any (mine) then c.name end,
           m.meet_url, 'Portal booking'
    from public.client_meetings m join public.clients c on c.id = m.client_id
    where m.staff_user_id = owner and m.cancelled_at is null and m.starts_at < t_to and m.ends_at > t_from
    union all
    -- Discovery calls booked with the Owner, not yet held.
    select 'call', d.scheduled_at, d.scheduled_until, (d.scheduled_at at time zone 'Asia/Manila')::date,
           'Discovery call: ' || l.business_name, null, null, d.meet_url,
           case d.booked_via when 'booking_page' then 'Booking page' else 'Booked by staff' end
    from public.discovery_calls d join public.leads l on l.id = d.lead_id
    where d.host_user_id = owner and d.held_at is null and l.brand_id = me.brand_id
      and d.scheduled_at >= t_from and d.scheduled_at < t_to
    union all
    -- Returns due that day, not yet filed, of its own clients: one line per day.
    select 'returns', null::timestamptz, null::timestamptz, x.due_date,
           x.n || case when x.n = 1 then ' return due: ' else ' returns due: ' end || x.forms,
           null, null, null, 'Filing deadlines'
    from (
      select f.due_date, sum(f.k)::int as n,
             string_agg(f.form || case when f.k > 1 then ' ×' || f.k else '' end, ', ' order by f.form) as forms
      from (
        select fi.due_date, fi.form, count(*)::int as k
        from public.filing_instances fi
        where fi.client_id = any (mine) and fi.status <> 'filed' and fi.due_date between p_from and p_to
        group by fi.due_date, fi.form
      ) f
      group by f.due_date
    ) x
    union all
    -- The Owner's tasks due that day.
    select 'task', null, null, t.due_date,
           t.title || case t.priority when 'high' then ' (high priority)' else '' end,
           case when t.client_id = any (mine) then c.code end, case when t.client_id = any (mine) then c.name end,
           null, 'Task'
    from public.staff_tasks t left join public.clients c on c.id = t.client_id
    where t.assigned_to = owner and t.status = 'open' and t.due_date between p_from and p_to
    union all
    -- The Owner's open requests and tickets due that day.
    select 'request', null, null, r.due_date,
           case r.direction when 'to_client' then 'Request to client: ' else 'Client ticket: ' end || r.subject,
           case when r.client_id = any (mine) then c.code end, case when r.client_id = any (mine) then c.name end,
           null, 'Requests'
    from public.client_requests r join public.clients c on c.id = r.client_id
    where r.assigned_to = owner and r.status <> 'closed' and r.due_date between p_from and p_to
    union all
    -- Open registration cases with a target date that day, for its own clients.
    select 'registration', null, null, g.target_date,
           'Registration target date: ' || replace(g.kind, '_', ' '),
           c.code, c.name, g.lgu, 'Business registration'
    from public.registration_cases g join public.clients c on c.id = g.client_id
    where g.status = 'open' and g.client_id = any (mine) and g.target_date between p_from and p_to;
end;
$$;

revoke all on function private.ai_schedule_caller() from public;
revoke all on function public.ai_my_schedule(date, date) from public;
grant execute on function private.ai_schedule_caller() to authenticated;
grant execute on function public.ai_my_schedule(date, date) to authenticated;
