-- Tasks, and an owner for every request and ticket (Owner, 26 November 2026): "The last
-- piece of our app is the task, request, ticket …"
--
-- Requests & tickets: each one now has a staff member who answers for it (assigned_to)
-- and a priority. A request the firm sends belongs to whoever sent it; a client's ticket
-- goes to the client's preparer (else any staff on the client, else the Owner). Staff on
-- the client may hand it to another person who can see the client. The client's replies
-- notify the assigned person (else everyone on the client, as before).
--
-- Tasks (public.staff_tasks): the firm's own to-dos, which the app does not work out by
-- itself (My work already lists returns, documents, payroll …). Anyone on staff creates
-- one, optionally for a client and a month, and assigns it to a staff member with a due
-- date and a priority. A task may come from a client's ticket ("Make a task"), linked back
-- to it. The assignee, whoever created it and the Owner change, complete or cancel it.
-- Clients never see tasks.

-- ---------------------------------------------------------------------------
-- Requests & tickets: who answers for it, and its priority.
-- ---------------------------------------------------------------------------
alter table public.client_requests
  add column assigned_to uuid references auth.users (id),
  add column priority text not null default 'normal' check (priority in ('low', 'normal', 'high'));
create index client_requests_assigned_idx on public.client_requests (assigned_to, status) where status <> 'closed';

/** Whether a person is active staff who can see a client: the Owner, or staff assigned to it. */
create or replace function private.staff_sees_client(p_user uuid, p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.staff_profiles sp
    where sp.user_id = p_user and sp.active
      and (sp.role = 'owner' or exists (select 1 from public.staff_assignments a where a.client_id = p_client and a.user_id = p_user))
  )
$$;

/** Who answers for a client's ticket by default: its preparer, else anyone on it, else the Owner. */
create or replace function private.default_request_owner(p_client uuid) returns uuid
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select a.user_id from public.staff_assignments a join public.staff_profiles sp on sp.user_id = a.user_id and sp.active
     where a.client_id = p_client order by (a.role = 'preparer') desc, a.created_at limit 1),
    (select user_id from public.staff_profiles where role = 'owner' and active order by created_at limit 1)
  )
$$;

create or replace function private.client_request_owner() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.assigned_to is null then
    new.assigned_to := case
      when new.direction = 'to_client' and private.staff_sees_client(auth.uid(), new.client_id) then auth.uid()
      else private.default_request_owner(new.client_id)
    end;
  end if;
  return new;
end;
$$;
create trigger assign_owner before insert on public.client_requests for each row execute function private.client_request_owner();

-- Requests and tickets already open: the sender, or the client's preparer.
update public.client_requests r
set assigned_to = case
  when r.direction = 'to_client' and r.created_by is not null and private.staff_sees_client(r.created_by, r.client_id) then r.created_by
  else private.default_request_owner(r.client_id)
end
where r.assigned_to is null;

/** Staff on the client hand a request or ticket to someone who can see the client, and set its priority. */
create or replace function public.assign_client_request(p_request uuid, p_assignee uuid, p_priority text default null)
returns public.client_requests
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
  c text;
begin
  select * into r from public.client_requests where id = p_request for update;
  if r.id is null or private.request_side(r.client_id) is not true then
    raise exception 'Request not found' using errcode = 'P0002';
  end if;
  if p_assignee is null or not private.staff_sees_client(p_assignee, r.client_id) then
    raise exception 'Choose someone on staff who works on this client' using errcode = '22023';
  end if;
  if p_priority is not null and p_priority not in ('low', 'normal', 'high') then
    raise exception 'Unknown priority' using errcode = '22023';
  end if;
  update public.client_requests
  set assigned_to = p_assignee, priority = coalesce(p_priority, priority)
  where id = r.id returning * into r;
  if p_assignee is distinct from auth.uid() then
    select name into c from public.clients where id = r.client_id;
    perform private.notify(array[p_assignee], 'request_assigned',
      c || ': ' || r.subject || ' was handed to you', null, '/app/requests/' || r.id, r.client_id);
  end if;
  return r;
end;
$$;

-- A client's message notifies the person who answers for it (else everyone on the client, else the Owner).
create or replace function private.notify_request_message() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
  c text;
  first boolean;
  preview text := left(regexp_replace(coalesce(new.body, ''), '\s+', ' ', 'g'), 280);
  staff uuid[];
begin
  select * into r from public.client_requests where id = new.request_id;
  if r.id is null then return null; end if;
  select name into c from public.clients where id = r.client_id;
  first := not exists (select 1 from public.client_request_messages m where m.request_id = r.id and m.id <> new.id);
  if new.from_firm then
    perform private.notify(private.client_portal_ids(r.client_id), 'request_from_firm',
      case when first then 'Tallo CPA needs something from you: ' else 'Tallo CPA replied: ' end || r.subject,
      nullif(preview, ''), '/portal/requests/' || r.id, r.client_id);
  else
    staff := case
      when r.assigned_to is not null and exists (select 1 from public.staff_profiles sp where sp.user_id = r.assigned_to and sp.active) then array[r.assigned_to]
      when cardinality(private.client_staff_ids(r.client_id)) > 0 then private.client_staff_ids(r.client_id)
      else private.owner_ids()
    end;
    perform private.notify(staff, 'request_from_client',
      c || case when first and r.direction = 'from_client' then ' opened a request: ' else ' replied: ' end || r.subject,
      nullif(preview, ''), '/app/requests/' || r.id, r.client_id);
  end if;
  return null;
end;
$$;

-- ---------------------------------------------------------------------------
-- Tasks.
-- ---------------------------------------------------------------------------
create table public.staff_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (btrim(title) <> '' and length(title) <= 200),
  notes text check (length(notes) <= 4000),
  client_id uuid references public.clients (id) on delete cascade,
  -- The month the task is for (first day), when it is for one.
  period_month date check (period_month is null or extract(day from period_month) = 1),
  -- The ticket or request it came from.
  request_id uuid references public.client_requests (id) on delete set null,
  assigned_to uuid not null references auth.users (id),
  due_date date,
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high')),
  status text not null default 'open' check (status in ('open', 'done', 'cancelled')),
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  done_at timestamptz,
  done_by uuid references auth.users (id),
  check ((status = 'open') = (done_at is null)),
  check (request_id is null or client_id is not null)
);
create index staff_tasks_assigned_idx on public.staff_tasks (assigned_to, status, due_date);
create index staff_tasks_client_idx on public.staff_tasks (client_id, status) where client_id is not null;
create index staff_tasks_request_idx on public.staff_tasks (request_id) where request_id is not null;

create trigger audit after insert or update or delete on public.staff_tasks for each row execute function private.audit();
create trigger touch_updated_at before update on public.staff_tasks for each row execute function private.touch_updated_at();

alter table public.staff_tasks enable row level security;
-- The assignee, whoever created it, staff on its client, and the Owner see a task. Changes go through the functions below.
create policy staff_tasks_read on public.staff_tasks for select to authenticated using (
  private.is_staff() and (
    private.is_owner() or assigned_to = auth.uid() or created_by = auth.uid()
    or (client_id is not null and private.can_access_client(client_id))
  )
);
revoke insert, update, delete on public.staff_tasks from authenticated;
grant select on public.staff_tasks to authenticated;

/** Checks a task's fields; returns the client a request implies. */
create or replace function private.check_task(
  p_title text, p_assignee uuid, p_priority text, p_client uuid, p_period date, p_request uuid
) returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare
  rq public.client_requests;
  c uuid := p_client;
begin
  if coalesce(btrim(p_title), '') = '' then raise exception 'Say what needs doing' using errcode = '22023'; end if;
  if length(btrim(p_title)) > 200 then raise exception 'Keep the task under 200 characters; put the rest in the notes' using errcode = '22023'; end if;
  if p_priority not in ('low', 'normal', 'high') then raise exception 'Unknown priority' using errcode = '22023'; end if;
  if p_period is not null and extract(day from p_period) <> 1 then raise exception 'The month is its first day' using errcode = '22023'; end if;
  if p_request is not null then
    select * into rq from public.client_requests where id = p_request;
    if rq.id is null or not private.can_access_client(rq.client_id) then raise exception 'Request not found' using errcode = 'P0002'; end if;
    if c is not null and c <> rq.client_id then raise exception 'That request is another client''s' using errcode = '22023'; end if;
    c := rq.client_id;
  end if;
  if c is not null and not (private.is_staff() and private.can_access_client(c)) then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;
  if p_period is not null and c is null then raise exception 'Choose the client the month is for' using errcode = '22023'; end if;
  if p_assignee is null or not exists (select 1 from public.staff_profiles where user_id = p_assignee and active) then
    raise exception 'Choose who does it' using errcode = '22023';
  end if;
  if c is not null and not private.staff_sees_client(p_assignee, c) then
    raise exception 'That person does not work on this client. Assign them to it first, or choose someone who does' using errcode = '22023';
  end if;
  return c;
end;
$$;

/** Anyone on staff creates a task and assigns it; the assignee is notified. */
create or replace function public.create_staff_task(
  p_title text, p_assignee uuid, p_due date default null, p_priority text default 'normal',
  p_notes text default null, p_client uuid default null, p_period date default null, p_request uuid default null
) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks;
  c uuid;
  who text;
begin
  if not private.is_staff() then raise exception 'Only staff create tasks' using errcode = '42501'; end if;
  c := private.check_task(p_title, p_assignee, coalesce(p_priority, 'normal'), p_client, p_period, p_request);
  insert into public.staff_tasks (title, notes, client_id, period_month, request_id, assigned_to, due_date, priority)
  values (btrim(p_title), nullif(btrim(coalesce(p_notes, '')), ''), c, p_period, p_request, p_assignee, p_due, coalesce(p_priority, 'normal'))
  returning * into t;
  select full_name into who from public.staff_profiles where user_id = auth.uid();
  perform private.notify(array[p_assignee], 'task_assigned',
    coalesce(who, 'Someone') || ' gave you a task: ' || t.title,
    case when p_due is not null then 'Due ' || to_char(p_due, 'FMMon FMDD, YYYY') end,
    '/app/tasks/' || t.id, c);
  return t;
end;
$$;

/** Who may change a task: its assignee, whoever created it, and the Owner. */
create or replace function private.task_for_change(p_task uuid) returns public.staff_tasks
language plpgsql stable security definer set search_path = '' as $$
declare
  t public.staff_tasks;
begin
  select * into t from public.staff_tasks where id = p_task;
  if t.id is null or not private.is_staff() then raise exception 'Task not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or t.assigned_to = auth.uid() or t.created_by = auth.uid()) then
    raise exception 'Only the person it is assigned to, whoever created it or the Owner change a task' using errcode = '42501';
  end if;
  return t;
end;
$$;

/** Changes an open task's details; a new assignee is notified. */
create or replace function public.update_staff_task(
  p_task uuid, p_title text, p_assignee uuid, p_due date, p_priority text, p_notes text, p_period date default null
) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
begin
  if t.status <> 'open' then raise exception 'Reopen the task to change it' using errcode = '22023'; end if;
  perform private.check_task(p_title, p_assignee, coalesce(p_priority, 'normal'), t.client_id, p_period, t.request_id);
  update public.staff_tasks
  set title = btrim(p_title), assigned_to = p_assignee, due_date = p_due, priority = coalesce(p_priority, 'normal'),
      notes = nullif(btrim(coalesce(p_notes, '')), ''), period_month = p_period
  where id = t.id returning * into t;
  return t;
end;
$$;

-- A new assignee is notified from a trigger, so every way a task changes hands is covered.
create or replace function private.notify_task_reassigned() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  who text;
begin
  select full_name into who from public.staff_profiles where user_id = auth.uid();
  perform private.notify(array[new.assigned_to], 'task_assigned',
    coalesce(who, 'Someone') || ' handed you a task: ' || new.title,
    case when new.due_date is not null then 'Due ' || to_char(new.due_date, 'FMMon FMDD, YYYY') end,
    '/app/tasks/' || new.id, new.client_id);
  return null;
end;
$$;
create trigger notify_reassigned after update of assigned_to on public.staff_tasks
  for each row when (old.assigned_to is distinct from new.assigned_to) execute function private.notify_task_reassigned();

/** Marks a task done (or cancelled), or reopens it. */
create or replace function public.set_staff_task_status(p_task uuid, p_status text) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
begin
  if p_status not in ('open', 'done', 'cancelled') then raise exception 'Unknown status' using errcode = '22023'; end if;
  if t.status = p_status then return t; end if;
  update public.staff_tasks
  set status = p_status,
      done_at = case when p_status = 'open' then null else now() end,
      done_by = case when p_status = 'open' then null else auth.uid() end
  where id = t.id returning * into t;
  return t;
end;
$$;

-- ---------------------------------------------------------------------------
-- Notifications: a task given to you; a request or ticket handed to you.
-- ---------------------------------------------------------------------------
alter table public.notifications drop constraint notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check check (kind in (
  'return_ready_for_review', 'return_for_client_approval', 'return_ready_for_approval', 'return_sent_back',
  'return_client_query', 'return_query_answered', 'return_approved', 'return_filed', 'esubmission_result',
  'unlock_requested', 'unlock_decided',
  'payment_proof_submitted', 'payment_verified', 'payment_rejected', 'statement_issued',
  'request_from_firm', 'request_from_client', 'request_assigned', 'task_assigned',
  'lead_new', 'discovery_call_booked', 'client_meeting_booked'
));

revoke execute on function private.staff_sees_client(uuid, uuid) from public, anon;
revoke execute on function private.default_request_owner(uuid) from public, anon, authenticated;
revoke execute on function private.client_request_owner() from public, anon, authenticated;
revoke execute on function private.check_task(text, uuid, text, uuid, date, uuid) from public, anon, authenticated;
revoke execute on function private.task_for_change(uuid) from public, anon, authenticated;
revoke execute on function private.notify_task_reassigned() from public, anon, authenticated;
revoke execute on function public.assign_client_request(uuid, uuid, text) from public, anon;
revoke execute on function public.create_staff_task(text, uuid, date, text, text, uuid, date, uuid) from public, anon;
revoke execute on function public.update_staff_task(uuid, text, uuid, date, text, text, date) from public, anon;
revoke execute on function public.set_staff_task_status(uuid, text) from public, anon;
grant execute on function private.staff_sees_client(uuid, uuid) to authenticated;
grant execute on function public.assign_client_request(uuid, uuid, text) to authenticated;
grant execute on function public.create_staff_task(text, uuid, date, text, text, uuid, date, uuid) to authenticated;
grant execute on function public.update_staff_task(uuid, text, uuid, date, text, text, date) to authenticated;
grant execute on function public.set_staff_task_status(uuid, text) to authenticated;
