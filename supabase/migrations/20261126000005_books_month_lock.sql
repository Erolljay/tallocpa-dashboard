-- Rework phase 2 (docs/REWORK.md, decision 9): the reviewer locks a month of the Books.
--
--   books_month_locks    a client's locked months. The client's reviewer (or the Owner)
--                        locks a month once its Inbox is clear (no document of the month
--                        received or under review).
--   books_lock_requests  the preparer asks for a lock (once the Inbox is clear); the
--                        reviewer asks for an unlock with a reason, and only the Owner or
--                        the acting approver in office decides it (the Owner's own request
--                        unlocks at once).
--
-- Posting into a locked month is refused by the existing journal lock: a lock row now
-- locks the month as a filed return always has (private.books_locked_by). A month
-- whose return was already filed is reopened by an unlock through the existing
-- amendment flow: a 'reopened' ledger_amendments row for that return (linked to the
-- unlock request), which flags the return for an amended return; the other months of
-- the return's period stay locked. Locking the month again marks that amendment
-- relocked; the flag stays until the amended return is started (amend_filing).
--
-- Months already locked by a filed return get a lock row (source 'filed').

create table public.books_month_locks (
  client_id uuid not null references public.clients (id) on delete cascade,
  month date not null check (extract(day from month) = 1),
  source text not null default 'reviewer' check (source in ('reviewer', 'filed')),
  note text,
  locked_by uuid references auth.users (id) default auth.uid(),
  locked_at timestamptz not null default now(),
  primary key (client_id, month)
);

create table public.books_lock_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  month date not null check (extract(day from month) = 1),
  kind text not null check (kind in ('lock', 'unlock')),
  reason text,
  status text not null default 'requested' check (status in ('requested', 'approved', 'rejected')),
  requested_by uuid references auth.users (id) default auth.uid(),
  requested_at timestamptz not null default now(),
  decided_by uuid references auth.users (id),
  decided_at timestamptz,
  decision_note text,
  check (kind = 'lock' or btrim(coalesce(reason, '')) <> ''),
  check ((status = 'requested') = (decided_at is null)),
  check (status <> 'rejected' or btrim(coalesce(decision_note, '')) <> '')
);
create unique index books_lock_requests_one_open on public.books_lock_requests (client_id, month, kind) where status = 'requested';
create index books_lock_requests_client_idx on public.books_lock_requests (client_id, month);

alter table public.ledger_amendments add column unlock_request_id uuid references public.books_lock_requests (id);

create trigger audit after insert or update or delete on public.books_month_locks for each row execute function private.audit();
create trigger audit after insert or update or delete on public.books_lock_requests for each row execute function private.audit();

alter table public.books_month_locks enable row level security;
alter table public.books_lock_requests enable row level security;
create policy books_locks_read on public.books_month_locks for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy books_lock_requests_read on public.books_lock_requests for select to authenticated
  using (private.is_staff() and (private.can_access_client(client_id) or (private.acting_delegation()).id is not null));

-- ---------------------------------------------------------------------------
-- The lock itself.
-- ---------------------------------------------------------------------------

-- Why the month of p_date is locked, or null when it is open: the filed return(s) that
-- lock it (unless an amendment reopened it), else the reviewer's lock.
create or replace function private.books_locked_by(p_client uuid, p_date date) returns text
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select string_agg(f.form || ' ' || f.period_label, ', ' order by f.period_start, f.form)
     from public.filing_instances f
     where f.client_id = p_client
       and f.form = any (private.book_lock_forms())
       and p_date between f.period_start and f.period_end
       and f.status in ('filed', 'paid', 'proof_uploaded')
       and not exists (
         select 1 from public.ledger_amendments a
         where a.client_id = p_client and a.status = 'reopened' and p_date between a.period_start and a.period_end
       )
       and not exists (
         -- An unlock decided after the lock row was removed reopens a filed month too.
         select 1 from public.books_lock_requests r
         where r.client_id = p_client and r.kind = 'unlock' and r.status = 'approved'
           and r.month = date_trunc('month', p_date)::date
           and not exists (select 1 from public.books_month_locks l where l.client_id = p_client and l.month = r.month)
       )),
    (select 'locked by the reviewer' from public.books_month_locks l
     where l.client_id = p_client and l.month = date_trunc('month', p_date)::date))
$$;

create or replace function private.check_books_open(p_client uuid, p_date date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  why text := private.books_locked_by(p_client, p_date);
begin
  if why = 'locked by the reviewer' then
    raise exception '% is locked by the reviewer. Ask the reviewer to request an unlock to change the books.',
      to_char(p_date, 'FMMonth YYYY') using errcode = '42501';
  elsif why is not null then
    raise exception '% is locked: % filed. Ask for an amendment on that return to change the books.',
      to_char(p_date, 'FMMonth YYYY'), why using errcode = '42501';
  end if;
end;
$$;

/** Documents of a client's month still waiting in the Inbox. */
create or replace function private.books_inbox_waiting(p_client uuid, p_month date) returns integer
language sql stable security definer set search_path = '' as $$
  select count(*)::integer from public.documents
  where client_id = p_client and document_month = p_month and status in ('received', 'under_review')
$$;

/** The month p_month (any day of it) can be locked: books set up, in the books, not in the future. */
create or replace function private.books_lock_month(p_client uuid, p_month date) returns date
language plpgsql stable security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  b public.client_books;
begin
  if p_month is null then raise exception 'Choose the month' using errcode = '22023'; end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  if m < date_trunc('month', b.books_start)::date then raise exception '% is before the books start', to_char(m, 'FMMonth YYYY') using errcode = '22023'; end if;
  if m > date_trunc('month', now() at time zone 'Asia/Manila')::date then
    raise exception '% has not started yet', to_char(m, 'FMMonth YYYY') using errcode = '22023';
  end if;
  return m;
end;
$$;

create or replace function private.check_inbox_clear(p_client uuid, p_month date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  n integer := private.books_inbox_waiting(p_client, p_month);
begin
  if n > 0 then
    raise exception '% document% of % % still in the Inbox: approve or return %',
      n, case when n = 1 then '' else 's' end, to_char(p_month, 'FMMonth YYYY'), case when n = 1 then 'is' else 'are' end,
      case when n = 1 then 'it' else 'them' end using errcode = '22023';
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Lock.
-- ---------------------------------------------------------------------------

/** The preparer (any staff assigned to the client, or the Owner) asks the reviewer to lock a month. */
create or replace function public.request_books_lock(p_client uuid, p_month date) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  m date;
  r uuid;
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(p_client) then
    raise exception 'Only staff assigned to this client can ask for a lock' using errcode = '42501';
  end if;
  m := private.books_lock_month(p_client, p_month);
  if private.books_locked_by(p_client, m) is not null then raise exception '% is already locked', to_char(m, 'FMMonth YYYY') using errcode = '22023'; end if;
  if exists (select 1 from public.books_lock_requests where client_id = p_client and month = m and kind = 'lock' and status = 'requested') then
    raise exception 'A lock of % is already requested', to_char(m, 'FMMonth YYYY') using errcode = '22023';
  end if;
  perform private.check_inbox_clear(p_client, m);
  insert into public.books_lock_requests (client_id, month, kind) values (p_client, m, 'lock') returning id into r;
  return r;
end;
$$;

/** The client's reviewer, or the Owner, locks a month of the Books (its Inbox must be clear). */
create or replace function public.lock_books_month(p_client uuid, p_month date, p_note text default null) returns void
language plpgsql security definer set search_path = '' as $$
declare
  m date;
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(p_client, 'reviewer')) then
    raise exception 'Only the client''s reviewer or the Owner locks a month' using errcode = '42501';
  end if;
  m := private.books_lock_month(p_client, p_month);
  if exists (select 1 from public.books_month_locks where client_id = p_client and month = m) or private.books_locked_by(p_client, m) is not null then
    raise exception '% is already locked', to_char(m, 'FMMonth YYYY') using errcode = '22023';
  end if;
  perform private.check_inbox_clear(p_client, m);
  insert into public.books_month_locks (client_id, month, source, note) values (p_client, m, 'reviewer', nullif(btrim(p_note), ''));
  update public.books_lock_requests set status = 'approved', decided_by = auth.uid(), decided_at = now()
    where client_id = p_client and month = m and kind = 'lock' and status = 'requested';
  -- A return's months reopened by an unlock are locked again once every month is.
  update public.ledger_amendments a
    set status = 'relocked', relocked_by = auth.uid(), relocked_at = now(),
        changes_note = coalesce(nullif(btrim(p_note), ''), 'Months locked again by the reviewer')
    where a.client_id = p_client and a.status = 'reopened'
      and not exists (
        select 1 from generate_series(date_trunc('month', a.period_start), a.period_end, interval '1 month') g
        where not exists (select 1 from public.books_month_locks l where l.client_id = p_client and l.month = g::date)
      );
end;
$$;

-- ---------------------------------------------------------------------------
-- Unlock.
-- ---------------------------------------------------------------------------

/** Opens a locked month (an approved unlock); a filed return covering it is flagged for an amended return. */
create or replace function private.books_unlock(p_request uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  r public.books_lock_requests;
  b public.client_books;
  f public.filing_instances;
  g date;
begin
  select * into r from public.books_lock_requests where id = p_request;
  select * into b from public.client_books where client_id = r.client_id;
  for f in
    select fi.* from public.filing_instances fi
    where fi.client_id = r.client_id and fi.form = any (private.book_lock_forms())
      and r.month between date_trunc('month', fi.period_start)::date and fi.period_end
      and fi.status in ('filed', 'paid', 'proof_uploaded')
      and fi.amendment_no = (select max(x.amendment_no) from public.filing_instances x
                             where x.obligation_id = fi.obligation_id and x.period_end = fi.period_end and x.status in ('filed', 'paid', 'proof_uploaded'))
  loop
    -- The return's other months stay locked.
    for g in select gs::date from generate_series(date_trunc('month', greatest(f.period_start, b.books_start)), f.period_end, interval '1 month') gs loop
      if g <> r.month and private.books_locked_by(r.client_id, g) is not null then
        insert into public.books_month_locks (client_id, month, source, note, locked_by)
        values (r.client_id, g, 'filed', 'Return filed: ' || f.form || ' ' || f.period_label, null)
        on conflict (client_id, month) do nothing;
      end if;
    end loop;
    if exists (select 1 from public.ledger_amendments where filing_instance_id = f.id and status = 'requested') then
      update public.ledger_amendments set status = 'reopened', decided_by = auth.uid(), decided_at = now(), unlock_request_id = r.id
        where filing_instance_id = f.id and status = 'requested';
    elsif not exists (select 1 from public.ledger_amendments where filing_instance_id = f.id and status = 'reopened') then
      insert into public.ledger_amendments (client_id, filing_instance_id, period_start, period_end, reason, status, decided_by, decided_at, unlock_request_id)
      values (r.client_id, f.id, greatest(f.period_start, b.books_start), f.period_end, 'Month unlocked: ' || r.reason, 'reopened', auth.uid(), now(), r.id);
    end if;
  end loop;
  delete from public.books_month_locks where client_id = r.client_id and month = r.month;
end;
$$;

/** The client's reviewer (or the Owner) asks to unlock a month, with the reason. The Owner's own request unlocks at once. */
create or replace function public.request_books_unlock(p_client uuid, p_month date, p_reason text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  r uuid;
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(p_client, 'reviewer')) then
    raise exception 'Only the client''s reviewer or the Owner asks to unlock a month' using errcode = '42501';
  end if;
  if m is null then raise exception 'Choose the month' using errcode = '22023'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason for unlocking' using errcode = '22023'; end if;
  if private.books_locked_by(p_client, m) is null then raise exception '% is not locked', to_char(m, 'FMMonth YYYY') using errcode = '22023'; end if;
  if exists (select 1 from public.books_lock_requests where client_id = p_client and month = m and kind = 'unlock' and status = 'requested') then
    raise exception 'An unlock of % is already requested', to_char(m, 'FMMonth YYYY') using errcode = '22023';
  end if;
  insert into public.books_lock_requests (client_id, month, kind, reason) values (p_client, m, 'unlock', btrim(p_reason)) returning id into r;
  if private.is_owner() then
    update public.books_lock_requests set status = 'approved', decided_by = auth.uid(), decided_at = now() where id = r;
    perform private.books_unlock(r);
  end if;
  return r;
end;
$$;

/** The Owner or the acting approver in office approves (the month opens) or rejects (with a note) an unlock. */
create or replace function public.decide_books_unlock(p_request uuid, p_approve boolean, p_note text default null) returns void
language plpgsql security definer set search_path = '' as $$
declare
  r public.books_lock_requests;
begin
  select * into r from public.books_lock_requests where id = p_request for update;
  if r.id is null or r.kind <> 'unlock' or not private.is_staff() then raise exception 'Unlock request not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or (private.acting_delegation()).id is not null) then
    raise exception 'Only the Owner or the acting approver unlocks a month' using errcode = '42501';
  end if;
  if r.status <> 'requested' then raise exception 'This request was already decided' using errcode = '22023'; end if;
  if not coalesce(p_approve, false) and coalesce(btrim(p_note), '') = '' then
    raise exception 'Give the reason for rejecting it' using errcode = '22023';
  end if;
  update public.books_lock_requests
    set status = case when p_approve then 'approved' else 'rejected' end, decided_by = auth.uid(), decided_at = now(),
        decision_note = nullif(btrim(p_note), '')
    where id = p_request;
  if p_approve then perform private.books_unlock(p_request); end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- What the UI shows.
-- ---------------------------------------------------------------------------

/**
 * Each month of p_year for a client: open, lock_requested, locked or unlock_requested,
 * why it is locked ('reviewer' or 'filed'), the open request, and documents still in
 * the Inbox. in_books is false for months before the books start.
 */
create or replace function public.books_month_status(p_client uuid, p_year integer)
returns table (
  month date, status text, lock_source text, locked_by uuid, locked_at timestamptz,
  request_id uuid, request_kind text, requested_by uuid, requested_at timestamptz, request_reason text,
  waiting_documents integer, in_books boolean
)
language sql stable security definer set search_path = '' as $$
  with months as (
    select gs::date as m from generate_series(make_date(p_year, 1, 1), make_date(p_year, 12, 1), interval '1 month') gs
  ),
  x as (
    select ms.m,
           private.books_locked_by(p_client, ms.m) as why,
           l.locked_by, l.locked_at,
           (select r from public.books_lock_requests r where r.client_id = p_client and r.month = ms.m and r.status = 'requested'
            order by r.kind = 'unlock' desc, r.requested_at desc limit 1) as req
    from months ms
    left join public.books_month_locks l on l.client_id = p_client and l.month = ms.m
  )
  select x.m,
         case when (x.req).kind = 'unlock' then 'unlock_requested'
              when x.why is not null then 'locked'
              when (x.req).kind = 'lock' then 'lock_requested'
              else 'open' end,
         case when x.why is null then null when x.why = 'locked by the reviewer' then 'reviewer' else 'filed' end,
         x.locked_by, x.locked_at,
         (x.req).id, (x.req).kind, (x.req).requested_by, (x.req).requested_at, (x.req).reason,
         private.books_inbox_waiting(p_client, x.m),
         coalesce(x.m >= date_trunc('month', b.books_start)::date, false)
  from x
  left join public.client_books b on b.client_id = p_client
  where private.is_staff() and private.can_access_client(p_client)
  order by x.m
$$;

/** Unlock requests waiting for the Owner or the acting approver. */
create or replace function public.books_unlock_requests()
returns table (id uuid, client_id uuid, client_name text, month date, reason text, requested_by uuid, requested_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select r.id, r.client_id, c.name, r.month, r.reason, r.requested_by, r.requested_at
  from public.books_lock_requests r
  join public.clients c on c.id = r.client_id
  where r.kind = 'unlock' and r.status = 'requested'
    and (private.is_owner() or (private.acting_delegation()).id is not null)
  order by r.requested_at
$$;

/**
 * Filed returns whose months were unlocked: each needs an amended return, until one is
 * started (amend_filing).
 */
create or replace function public.filings_needing_amendment(p_client uuid default null)
returns table (filing_id uuid, client_id uuid, form text, period_label text, period_start date, period_end date, reason text, unlocked_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select f.id, f.client_id, f.form, f.period_label, f.period_start, f.period_end, a.reason, a.decided_at
  from public.ledger_amendments a
  join public.filing_instances f on f.id = a.filing_instance_id
  where a.unlock_request_id is not null and a.status in ('reopened', 'relocked')
    and (p_client is null or f.client_id = p_client)
    and private.is_staff() and private.can_access_client(f.client_id)
    and not exists (
      select 1 from public.filing_instances n
      where n.obligation_id = f.obligation_id and n.period_end = f.period_end and n.amendment_no > f.amendment_no
    )
  order by f.period_end, f.form
$$;

-- Months already locked by a filed return keep their lock as a lock row.
insert into public.books_month_locks (client_id, month, source, note, locked_by)
select b.client_id, g::date, 'filed', 'Return filed: ' || private.books_locked_by(b.client_id, g::date), null
from public.client_books b
cross join lateral generate_series(date_trunc('month', b.books_start), date_trunc('month', now() at time zone 'Asia/Manila'), interval '1 month') g
where private.books_locked_by(b.client_id, g::date) is not null
on conflict (client_id, month) do nothing;

revoke execute on function public.request_books_lock(uuid, date) from public, anon;
revoke execute on function public.lock_books_month(uuid, date, text) from public, anon;
revoke execute on function public.request_books_unlock(uuid, date, text) from public, anon;
revoke execute on function public.decide_books_unlock(uuid, boolean, text) from public, anon;
revoke execute on function public.books_month_status(uuid, integer) from public, anon;
revoke execute on function public.books_unlock_requests() from public, anon;
revoke execute on function public.filings_needing_amendment(uuid) from public, anon;
grant execute on function public.request_books_lock(uuid, date) to authenticated;
grant execute on function public.lock_books_month(uuid, date, text) to authenticated;
grant execute on function public.request_books_unlock(uuid, date, text) to authenticated;
grant execute on function public.decide_books_unlock(uuid, boolean, text) to authenticated;
grant execute on function public.books_month_status(uuid, integer) to authenticated;
grant execute on function public.books_unlock_requests() to authenticated;
grant execute on function public.filings_needing_amendment(uuid) to authenticated;
revoke execute on function private.books_locked_by(uuid, date) from public, anon, authenticated;
revoke execute on function private.check_books_open(uuid, date) from public, anon, authenticated;
revoke execute on function private.books_inbox_waiting(uuid, date) from public, anon, authenticated;
revoke execute on function private.books_lock_month(uuid, date) from public, anon, authenticated;
revoke execute on function private.check_inbox_clear(uuid, date) from public, anon, authenticated;
revoke execute on function private.books_unlock(uuid) from public, anon, authenticated;
