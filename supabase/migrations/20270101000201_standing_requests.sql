-- Standing monthly requests (spec §3.6 "Requests & tickets"; changes Q35, no chat).
--
-- Per client, staff on the client (or the Owner) switch on standing requests:
--   arap_update      the monthly AR/AP update: collections from customers and payments
--                    to suppliers on charge sales and purchases (the AR/AP update
--                    workbook, or the client's own list). The client may answer
--                    "No collections or payments this month".
--   bank_statements  one bank statement per bank account: the accounts staff list, else
--                    every active bank account in the client's books, else one request
--                    for "bank statements".
--
-- Each month, for each kind switched on, a request for that month opens by itself, due
-- on the client's document cutoff: when the month's document cycle opens (nightly), and
-- again each night so a bank account added later gets its request. Switching a kind on
-- opens it for any open month whose cutoff has not passed. Nothing opens after a month's
-- cutoff, and a month opens each request once (idempotent).
--
-- A standing request is an ordinary client request (to_client), so the portal's
-- Requests tab, its count, My work, notifications and row-level security work as for
-- any request. There is no chat: the client uploads files (or says there was nothing),
-- which hands it to the firm; staff accept it (close) or return it with a reason, which
-- hands it back to the client. Open standing requests block nothing: they show in the
-- client's month checklist and in My work.

create table public.client_standing_requests (
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('arap_update', 'bank_statements')),
  -- Bank statements: the accounts to ask for, by name. Empty: the bank accounts in the books.
  accounts text[] not null default '{}',
  switched_on_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (client_id, kind),
  check (kind = 'bank_statements' or cardinality(accounts) = 0)
);
create trigger audit after insert or update or delete on public.client_standing_requests for each row execute function private.audit();
create trigger touch_updated_at before update on public.client_standing_requests for each row execute function private.touch_updated_at();
alter table public.client_standing_requests enable row level security;
-- Read: as for requests (staff on the client, the Owner, the client's own users). Writes go through set_standing_request().
create policy client_standing_requests_read on public.client_standing_requests for select to authenticated
  using ((private.is_staff() and private.can_access_client(client_id)) or private.is_client_user(client_id));

alter table public.client_requests
  add column standing_kind text check (standing_kind in ('arap_update', 'bank_statement')),
  -- The month it is for (first day).
  add column period date check (period is null or extract(day from period) = 1),
  -- Which one of the month: '' for the AR/AP update or a single bank-statements request;
  -- a books bank account's id, or the lower-cased name staff listed.
  add column standing_key text,
  -- The client answered "No collections or payments this month".
  add column no_activity boolean not null default false,
  add constraint client_requests_standing_check check (
    (standing_kind is null) = (period is null) and (standing_kind is null) = (standing_key is null)
    and (not no_activity or standing_kind = 'arap_update')
  );
create unique index client_requests_standing_idx on public.client_requests (client_id, standing_kind, period, standing_key) where standing_kind is not null;

/**
 * Opens the standing requests due for open months (cycle not closed, cutoff today or
 * later): of one cycle, of one client, or (both null) every client. Returns how many opened.
 */
create or replace function private.open_standing_requests(p_today date, p_client uuid default null, p_cycle uuid default null)
returns int
language plpgsql security definer set search_path = '' as $$
declare
  n int;
begin
  with cycles as (
    select y.client_id, y.period, y.cutoff_date
    from public.document_cycles y
    join public.clients c on c.id = y.client_id and c.status = 'active'
    where y.closed_at is null and y.cutoff_date >= p_today
      and (p_client is null or y.client_id = p_client)
      and (p_cycle is null or y.id = p_cycle)
  ),
  wanted as (
    -- The AR/AP update.
    select y.client_id, y.period, y.cutoff_date, 'arap_update' as kind, '' as key,
           'AR/AP update for ' || to_char(y.period, 'FMMonth YYYY') as subject
    from cycles y join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'arap_update'
    union all
    -- Bank statements: the accounts staff listed.
    select y.client_id, y.period, y.cutoff_date, 'bank_statement', lower(btrim(a.name)),
           'Bank statement for ' || to_char(y.period, 'FMMonth YYYY') || ': ' || btrim(a.name)
    from cycles y
    join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'bank_statements'
    cross join lateral unnest(s.accounts) as a(name)
    where btrim(a.name) <> ''
    union all
    -- Else every active bank account in the books.
    select y.client_id, y.period, y.cutoff_date, 'bank_statement', l.id::text,
           'Bank statement for ' || to_char(y.period, 'FMMonth YYYY') || ': ' || l.name
    from cycles y
    join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'bank_statements' and cardinality(s.accounts) = 0
    join public.ledger_accounts l on l.client_id = y.client_id and l.control = 'bank' and l.active
    union all
    -- Else one request for every bank statement.
    select y.client_id, y.period, y.cutoff_date, 'bank_statement', '',
           'Bank statements for ' || to_char(y.period, 'FMMonth YYYY')
    from cycles y
    join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'bank_statements' and cardinality(s.accounts) = 0
    where not exists (select 1 from public.ledger_accounts l where l.client_id = y.client_id and l.control = 'bank' and l.active)
  ),
  ins as (
    -- Each goes to the client's preparer (not whoever switched it on), as every month after.
    insert into public.client_requests (client_id, direction, subject, due_date, standing_kind, period, standing_key, assigned_to)
    select distinct on (w.client_id, w.kind, w.period, w.key) w.client_id, 'to_client', w.subject, w.cutoff_date, w.kind, w.period, w.key,
           private.default_request_owner(w.client_id)
    from wanted w
    on conflict (client_id, standing_kind, period, standing_key) where standing_kind is not null do nothing
    returning 1
  )
  select count(*) into n from ins;
  return n;
end;
$$;

/** A month's cycle opening opens its standing requests. */
create or replace function private.open_cycle_standing_requests() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform private.open_standing_requests(private.manila_today(), new.client_id, new.id);
  return null;
end;
$$;
create trigger open_standing_requests after insert on public.document_cycles
  for each row execute function private.open_cycle_standing_requests();

/** Nightly job (service role only): the monthly cycle, then the standing requests due. */
create or replace function public.run_document_cycles(p_today date) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  r := private.run_cycles(p_today);
  return jsonb_build_object('opened', r.opened, 'missed', r.missed, 'closed', r.closed,
    'standing', private.open_standing_requests(p_today));
end;
$$;

/**
 * Staff on the client (or the Owner) switch a standing request on or off. Bank
 * statements take an optional list of account names (else the books' bank accounts).
 * Switching on opens it for open months at once; switching off closes the ones of
 * that kind still waiting on the client. Returns how many opened.
 */
create or replace function public.set_standing_request(p_client uuid, p_kind text, p_on boolean, p_accounts text[] default '{}')
returns int
language plpgsql security definer set search_path = '' as $$
declare
  names text[];
begin
  if private.request_side(p_client) is not true then
    raise exception 'Only staff on this client change its standing requests' using errcode = '42501';
  end if;
  if p_kind not in ('arap_update', 'bank_statements') then
    raise exception 'Unknown standing request' using errcode = '22023';
  end if;
  if not p_on then
    delete from public.client_standing_requests where client_id = p_client and kind = p_kind;
    update public.client_requests set status = 'closed', closed_by = auth.uid(), closed_at = now()
    where client_id = p_client and status = 'open'
      and standing_kind = case p_kind when 'arap_update' then 'arap_update' else 'bank_statement' end;
    return 0;
  end if;
  if p_kind = 'bank_statements' then
    select coalesce(array_agg(x order by o), '{}') into names
    from (select distinct on (lower(btrim(a))) btrim(a) as x, o from unnest(coalesce(p_accounts, '{}')) with ordinality as u(a, o)
          where btrim(a) <> '' order by lower(btrim(a)), o) d;
    if exists (select 1 from unnest(names) x where length(x) > 80) then
      raise exception 'Keep each account name under 80 characters' using errcode = '22023';
    end if;
  else
    names := '{}';
  end if;
  insert into public.client_standing_requests (client_id, kind, accounts, switched_on_by)
  values (p_client, p_kind, names, auth.uid())
  on conflict (client_id, kind) do update set accounts = excluded.accounts;
  return private.open_standing_requests(private.manila_today(), p_client);
end;
$$;

/** The client says there were no collections or payments in the month (AR/AP update only). */
create or replace function public.standing_no_activity(p_request uuid) returns public.client_requests
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
begin
  select * into r from public.client_requests where id = p_request for update;
  if r.id is null or private.request_side(r.client_id) is null then raise exception 'Request not found' using errcode = 'P0002'; end if;
  if private.request_side(r.client_id) then raise exception 'Only the client answers this' using errcode = '42501'; end if;
  if r.standing_kind is distinct from 'arap_update' then raise exception 'This is not an AR/AP update' using errcode = '22023'; end if;
  if r.status = 'closed' then raise exception 'This request is closed' using errcode = '22023'; end if;
  insert into public.client_request_messages (request_id, author, from_firm, body)
  values (r.id, auth.uid(), false, 'No collections or payments this month.');
  update public.client_requests set status = 'answered', no_activity = true where id = r.id returning * into r;
  return r;
end;
$$;

/** Staff return what the client sent for a standing request, with the reason; it waits on the client again. */
create or replace function public.return_standing_request(p_request uuid, p_reason text) returns public.client_requests
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
begin
  select * into r from public.client_requests where id = p_request for update;
  if r.id is null or private.request_side(r.client_id) is not true then raise exception 'Request not found' using errcode = 'P0002'; end if;
  if r.standing_kind is null then raise exception 'Only a standing request is returned; reply to this one instead' using errcode = '22023'; end if;
  if r.status <> 'answered' then raise exception 'There is nothing from the client to return' using errcode = '22023'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Say why you are returning it' using errcode = '22023'; end if;
  insert into public.client_request_messages (request_id, author, from_firm, body)
  values (r.id, auth.uid(), true, 'Returned: ' || left(btrim(p_reason), 2000));
  update public.client_requests set status = 'open', no_activity = false where id = r.id returning * into r;
  return r;
end;
$$;

-- Months already open get their requests when a kind is switched on, so nothing to backfill.

revoke execute on function private.open_standing_requests(date, uuid, uuid) from public, anon, authenticated;
revoke execute on function private.open_cycle_standing_requests() from public, anon, authenticated;
revoke execute on function public.run_document_cycles(date) from public, anon, authenticated;
revoke execute on function public.set_standing_request(uuid, text, boolean, text[]) from public, anon;
revoke execute on function public.standing_no_activity(uuid) from public, anon;
revoke execute on function public.return_standing_request(uuid, text) from public, anon;
grant execute on function public.set_standing_request(uuid, text, boolean, text[]) to authenticated;
grant execute on function public.standing_no_activity(uuid) to authenticated;
grant execute on function public.return_standing_request(uuid, text) to authenticated;
