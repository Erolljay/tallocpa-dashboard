-- Bookkeeping, Phase 1B slice 4 (spec §3.6, §4.3; Q30): period lock and amendments.
--
-- A month of a client's books is locked once a return computed from the books
-- that covers the month is Filed (or Paid / Proof uploaded): the withholding,
-- business tax and income tax returns listed in private.book_lock_forms().
-- Information returns (1604-C, 1604-E, Inventory List) do not lock the books.
--
-- In a locked month nothing is posted: no manual entry, no confirmed
-- suggestion, no AR/AP update, no reversal dated in it, and the opening
-- balances cannot be replaced once the first month of the books is locked.
-- A reversal dated in an open month may still reverse an entry of a locked month
-- (the correction lands in the open month).
--
-- A document dated in a locked month (handed in late) is suggested on the first
-- day of the next open month of the same taxable year, with its own date in the
-- memo (spec §4.2). If the rest of the taxable year is locked too, it keeps its
-- date and cannot be posted until an amendment reopens the month.
--
--   ledger_amendments   Reviewer or Owner asks to reopen a filed return's months
--                       with a reason → the Owner approves (or rejects) → the
--                       months are open while the amendment is 'reopened' → the
--                       Owner or the client's reviewer locks them again, noting
--                       what changed. An Owner's own request reopens at once.
--                       The amended return itself is a new filing (§4.3), not
--                       part of this slice.

create or replace function private.book_lock_forms() returns text[]
language sql immutable set search_path = '' as $$
  select array['0619-E', '1601-C', '1601-EQ', '2550M', '2550Q', '2551M', '2551Q', '1701Q', '1702Q', '1701', '1701A', '1702-RT', '1702-EX', '1702-MX']
$$;

create table public.ledger_amendments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  filing_instance_id uuid not null references public.filing_instances (id) on delete cascade,
  -- The filing's period, copied when the amendment is requested: the months it reopens.
  period_start date not null,
  period_end date not null,
  reason text not null check (btrim(reason) <> ''),
  status text not null default 'requested' check (status in ('requested', 'reopened', 'rejected', 'relocked')),
  requested_by uuid references auth.users (id) default auth.uid(),
  requested_at timestamptz not null default now(),
  decided_by uuid references auth.users (id),
  decided_at timestamptz,
  decision_note text,
  relocked_by uuid references auth.users (id),
  relocked_at timestamptz,
  changes_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (period_start <= period_end),
  check ((status = 'requested') = (decided_at is null)),
  check ((status = 'relocked') = (relocked_at is not null)),
  check (status <> 'rejected' or coalesce(btrim(decision_note), '') <> '')
);

create index ledger_amendments_client_idx on public.ledger_amendments (client_id, requested_at desc);
-- At most one amendment in progress per return.
create unique index ledger_amendments_one_open on public.ledger_amendments (filing_instance_id) where status in ('requested', 'reopened');

create trigger audit after insert or update or delete on public.ledger_amendments for each row execute function private.audit();
create trigger touch_updated_at before update on public.ledger_amendments for each row execute function private.touch_updated_at();

alter table public.ledger_amendments enable row level security;
-- Staff who see the client see its amendments; written only by the functions below.
create policy amendments_read on public.ledger_amendments for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));

-- ---------------------------------------------------------------------------
-- The lock.
-- ---------------------------------------------------------------------------

-- The filed return(s) that lock the month of p_date, e.g. '2550Q Q1 2027', or null
-- when the month is open (nothing filed, or an amendment has reopened it).
create or replace function private.books_locked_by(p_client uuid, p_date date) returns text
language sql stable security definer set search_path = '' as $$
  select string_agg(f.form || ' ' || f.period_label, ', ' order by f.period_start, f.form)
  from public.filing_instances f
  where f.client_id = p_client
    and f.form = any (private.book_lock_forms())
    and p_date between f.period_start and f.period_end
    and f.status in ('filed', 'paid', 'proof_uploaded')
    and not exists (
      select 1 from public.ledger_amendments a
      where a.client_id = p_client and a.status = 'reopened' and p_date between a.period_start and a.period_end
    )
$$;

create or replace function private.check_books_open(p_client uuid, p_date date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  why text := private.books_locked_by(p_client, p_date);
begin
  if why is not null then
    raise exception '% is locked: % filed. Ask for an amendment on that return to change the books.',
      to_char(p_date, 'FMMonth YYYY'), why using errcode = '42501';
  end if;
end;
$$;

-- The first day of the next open month after p_date in the same taxable year, or null.
create or replace function private.next_open_month(p_client uuid, p_date date) returns date
language plpgsql stable security definer set search_path = '' as $$
declare
  fye integer;
  m date := (p_date - (extract(day from p_date)::integer - 1));
  year_end date;
begin
  select fiscal_year_end_month into fye from public.clients where id = p_client;
  year_end := (m + make_interval(months => (coalesce(fye, 12) - extract(month from m)::integer + 12) % 12))::date;
  loop
    m := (m + interval '1 month')::date;
    exit when m > year_end;
    if private.books_locked_by(p_client, m) is null then return m; end if;
  end loop;
  return null;
end;
$$;

create or replace function private.journal_period_lock() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  late date;
begin
  if tg_op = 'INSERT' then
    if new.status = 'suggested' and new.source = 'document' and private.books_locked_by(new.client_id, new.entry_date) is not null then
      late := private.next_open_month(new.client_id, new.entry_date);
      if late is not null then
        new.memo := new.memo || ' · dated ' || to_char(new.entry_date, 'FMMon FMDD, YYYY') || ', booked late';
        new.entry_date := late;
      end if;
    elsif new.status <> 'suggested' then
      perform private.check_books_open(new.client_id, case when new.source = 'opening' then new.entry_date + 1 else new.entry_date end);
    end if;
    return new;
  elsif tg_op = 'UPDATE' then
    -- Posting (suggested → posted). Marking an entry reversed is not checked: its reversal is.
    if old.status = 'suggested' and new.status = 'posted' then
      perform private.check_books_open(new.client_id, case when new.source = 'opening' then new.entry_date + 1 else new.entry_date end);
    end if;
    return new;
  end if;
  -- Replacing the opening balances (the client itself being deleted is not checked).
  if old.status <> 'suggested' and old.source = 'opening' and exists (select 1 from public.clients where id = old.client_id) then
    perform private.check_books_open(old.client_id, old.entry_date + 1);
  end if;
  return old;
end;
$$;

create trigger period_lock before insert or update or delete on public.journal_entries
  for each row execute function private.journal_period_lock();

-- ---------------------------------------------------------------------------
-- What the Books page shows: each month of the books up to p_to, the returns
-- filed for it and the amendment that has reopened it, if any.
-- ---------------------------------------------------------------------------
create or replace function public.books_periods(p_client uuid, p_to date)
returns table (month date, filed text, amendment_id uuid)
language sql stable security definer set search_path = '' as $$
  select m::date,
         (select string_agg(f.form || ' ' || f.period_label, ', ' order by f.period_start, f.form)
            from public.filing_instances f
            where f.client_id = p_client and f.form = any (private.book_lock_forms())
              and m::date between f.period_start and f.period_end
              and f.status in ('filed', 'paid', 'proof_uploaded')),
         (select a.id from public.ledger_amendments a
            where a.client_id = p_client and a.status = 'reopened' and m::date between a.period_start and a.period_end
            order by a.decided_at limit 1)
  from public.client_books b
  cross join lateral generate_series(b.books_start, greatest(b.books_start, p_to), interval '1 month') as m
  where b.client_id = p_client and private.is_staff() and private.can_access_client(p_client)
  order by 1
$$;

-- ---------------------------------------------------------------------------
-- Amendments.
-- ---------------------------------------------------------------------------

-- The Owner, or the client's assigned reviewer, asks to reopen a filed return's
-- months. The Owner's own request reopens them at once.
create or replace function public.request_ledger_amendment(p_filing uuid, p_reason text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  b public.client_books;
  a uuid;
begin
  select * into f from public.filing_instances where id = p_filing;
  if f.id is null or not private.can_access_client(f.client_id) then raise exception 'Return not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(f.client_id, 'reviewer')) then
    raise exception 'Only the Owner or the client''s reviewer can ask for an amendment' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = f.client_id;
  if b.client_id is null or f.period_end < b.books_start then
    raise exception 'This return is not kept in the books' using errcode = '22023';
  end if;
  if not (f.form = any (private.book_lock_forms())) then
    raise exception '% does not lock the books', f.form using errcode = '22023';
  end if;
  if f.status not in ('filed', 'paid', 'proof_uploaded') then
    raise exception 'This return is not filed yet: its months are still open' using errcode = '22023';
  end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason for the amendment' using errcode = '22023'; end if;
  if exists (select 1 from public.ledger_amendments where filing_instance_id = p_filing and status in ('requested', 'reopened')) then
    raise exception 'An amendment of this return is already in progress' using errcode = '22023';
  end if;

  insert into public.ledger_amendments (client_id, filing_instance_id, period_start, period_end, reason, status, decided_by, decided_at)
  values (f.client_id, f.id, greatest(f.period_start, b.books_start), f.period_end, btrim(p_reason),
          case when private.is_owner() then 'reopened' else 'requested' end,
          case when private.is_owner() then auth.uid() end,
          case when private.is_owner() then now() end)
  returning id into a;
  return a;
end;
$$;

-- The Owner approves (the months reopen) or rejects (with a note) a request.
create or replace function public.decide_ledger_amendment(p_amendment uuid, p_approve boolean, p_note text default null) returns void
language plpgsql security definer set search_path = '' as $$
declare
  a public.ledger_amendments;
begin
  select * into a from public.ledger_amendments where id = p_amendment for update;
  if a.id is null or not private.can_access_client(a.client_id) then raise exception 'Amendment not found' using errcode = 'P0002'; end if;
  if not private.is_owner() then raise exception 'Only the Owner approves amendments' using errcode = '42501'; end if;
  if a.status <> 'requested' then raise exception 'This amendment was already decided' using errcode = '22023'; end if;
  if not p_approve and coalesce(btrim(p_note), '') = '' then
    raise exception 'Give the reason for rejecting it' using errcode = '22023';
  end if;
  update public.ledger_amendments
    set status = case when p_approve then 'reopened' else 'rejected' end,
        decided_by = auth.uid(), decided_at = now(), decision_note = nullif(btrim(p_note), '')
    where id = p_amendment;
end;
$$;

-- The Owner or the client's reviewer locks the months again once the books are
-- corrected, noting what changed.
create or replace function public.relock_ledger_amendment(p_amendment uuid, p_changes text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  a public.ledger_amendments;
begin
  select * into a from public.ledger_amendments where id = p_amendment for update;
  if a.id is null or not private.can_access_client(a.client_id) then raise exception 'Amendment not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(a.client_id, 'reviewer')) then
    raise exception 'Only the Owner or the client''s reviewer can lock the months again' using errcode = '42501';
  end if;
  if a.status <> 'reopened' then raise exception 'These months are not reopened' using errcode = '22023'; end if;
  if coalesce(btrim(p_changes), '') = '' then raise exception 'Note what was changed in the books' using errcode = '22023'; end if;
  update public.ledger_amendments
    set status = 'relocked', relocked_by = auth.uid(), relocked_at = now(), changes_note = btrim(p_changes)
    where id = p_amendment;
end;
$$;

revoke execute on function public.books_periods(uuid, date) from public, anon;
revoke execute on function public.request_ledger_amendment(uuid, text) from public, anon;
revoke execute on function public.decide_ledger_amendment(uuid, boolean, text) from public, anon;
revoke execute on function public.relock_ledger_amendment(uuid, text) from public, anon;
grant execute on function public.books_periods(uuid, date) to authenticated;
grant execute on function public.request_ledger_amendment(uuid, text) to authenticated;
grant execute on function public.decide_ledger_amendment(uuid, boolean, text) to authenticated;
grant execute on function public.relock_ledger_amendment(uuid, text) to authenticated;
revoke execute on function private.books_locked_by(uuid, date) from public, anon, authenticated;
revoke execute on function private.check_books_open(uuid, date) from public, anon, authenticated;
revoke execute on function private.next_open_month(uuid, date) from public, anon, authenticated;
