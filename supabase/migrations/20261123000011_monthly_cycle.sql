-- Monthly cycle and cutoff (spec §3.10, §3.11, §4.2; Q22, Q28, Q29).
--
-- One cycle per active client per month of documents. The nightly job:
--  - opens the cycle for the month now open for documents;
--  - once the month has ended, sends the document request (the 1st), and a
--    reminder the day before the cutoff (the 4th for a cutoff on the 5th);
--  - after the cutoff, records whether the client missed it;
--  - on the 1st of the second month after, closes the cycle.
-- Closing a cycle (nightly, or by staff any time after its cutoff) moves every
-- document not yet posted to the next month of the same taxable year, flagged
-- "late-recorded" (carried_from). At the end of a taxable year nothing is carried
-- forward: those documents go to the prior-year exceptions queue, where the
-- Reviewer or Owner decides what to do with them.

create table public.document_cycles (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  -- First day of the month of documents.
  period date not null check (extract(day from period) = 1),
  cutoff_date date not null,
  requested_at timestamptz,
  reminded_at timestamptz,
  -- The client (or staff for them) said there are no documents this month.
  nothing_to_submit_at timestamptz,
  nothing_to_submit_by uuid references auth.users (id),
  -- Set once the cutoff has passed: true when nothing came in by the cutoff.
  missed_cutoff boolean,
  closed_at timestamptz,
  closed_by uuid references auth.users (id),
  -- Documents moved to the next month, or to the exceptions queue, on close.
  carried_forward int not null default 0,
  to_exceptions int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, period)
);

create index document_cycles_period_idx on public.document_cycles (period, client_id);

create trigger touch_updated_at before update on public.document_cycles for each row execute function private.touch_updated_at();
create trigger audit after insert or update or delete on public.document_cycles for each row execute function private.audit();

alter table public.document_cycles enable row level security;
-- Read: anyone who can see the client. Writes go through the functions below.
create policy document_cycles_read on public.document_cycles for select to authenticated using (private.can_access_client(client_id));

-- Late-recorded: the month the document was first counted in, before a close moved it.
alter table public.documents add column carried_from date check (carried_from is null or extract(day from carried_from) = 1);
-- Prior-year exceptions queue (§3.10): open until the Reviewer or Owner decides.
alter table public.documents add column exception_status text check (exception_status in ('open', 'amend', 'non_deductible', 'record_current'));
alter table public.documents add column exception_reason text;
alter table public.documents add column exception_note text;
alter table public.documents add column exception_decided_by uuid references auth.users (id);
alter table public.documents add column exception_decided_at timestamptz;

create index documents_exceptions_idx on public.documents (created_at) where exception_status = 'open';

-- Documents that count as the client's monthly submission (not staff filing papers).
create or replace function private.is_submission(doc_type text) returns boolean
language sql immutable as $$
  select doc_type not in ('filed_return', 'payment_proof', 'cor')
$$;

/**
 * Keeps documents out of closed months: a document placed in a month whose cycle is
 * closed moves to the next month still open in the same taxable year, flagged
 * late-recorded. If the taxable year has no open month left it stays put and goes
 * to the exceptions queue. Prior-year documents always go to the exceptions queue.
 */
create or replace function private.place_document() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  fye int;
  m date;
begin
  if private.is_submission(new.doc_type) and not new.prior_year
     and (tg_op = 'INSERT' or new.period is distinct from old.period) then
    select fiscal_year_end_month into fye from public.clients where id = new.client_id;
    m := new.period;
    while exists (select 1 from public.document_cycles y where y.client_id = new.client_id and y.period = m and y.closed_at is not null) loop
      m := (m + interval '1 month')::date;
    end loop;
    if m <> new.period then
      if private.taxable_year(m, fye) = private.taxable_year(new.period, fye) then
        new.carried_from := coalesce(new.carried_from, new.period);
        new.period := m;
      elsif new.exception_status is null then
        new.exception_status := 'open';
        new.exception_reason := 'Its taxable year is closed';
      end if;
    end if;
  end if;
  if new.prior_year and new.exception_status is null and private.is_submission(new.doc_type) then
    new.exception_status := 'open';
    new.exception_reason := 'From a prior taxable year';
  end if;
  return new;
end;
$$;

create trigger place_document before insert or update of period, prior_year on public.documents
for each row execute function private.place_document();

-- Documents already flagged prior-year go to the queue.
update public.documents set exception_status = 'open', exception_reason = 'From a prior taxable year'
where prior_year and exception_status is null and private.is_submission(doc_type);

/** Closes one cycle: carries unposted documents forward, or to the exceptions queue at year end. */
create or replace function private.close_cycle(p_cycle uuid, p_by uuid) returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
  fye int;
  next_m date;
  moved int := 0;
  queued int := 0;
begin
  select * into y from public.document_cycles where id = p_cycle for update;
  if y.closed_at is not null then return y; end if;
  select fiscal_year_end_month into fye from public.clients where id = y.client_id;
  next_m := (y.period + interval '1 month')::date;

  update public.document_cycles set closed_at = now(), closed_by = p_by where id = y.id;

  if private.taxable_year(next_m, fye) = private.taxable_year(y.period, fye) then
    -- The place_document trigger moves each one past any closed months.
    with moved_docs as (
      update public.documents d set period = next_m, carried_from = coalesce(d.carried_from, y.period)
      where d.client_id = y.client_id and d.period = y.period and d.status <> 'posted'
        and private.is_submission(d.doc_type) and not d.prior_year and d.exception_status is null
      returning 1
    ) select count(*) into moved from moved_docs;
  else
    with queued_docs as (
      update public.documents d set exception_status = 'open', exception_reason = 'Not posted when the taxable year closed'
      where d.client_id = y.client_id and d.period = y.period and d.status <> 'posted'
        and private.is_submission(d.doc_type) and d.exception_status is null
      returning 1
    ) select count(*) into queued from queued_docs;
  end if;

  update public.document_cycles set carried_forward = moved, to_exceptions = queued where id = y.id returning * into y;
  return y;
end;
$$;

/** Whether anything for the month came in by its cutoff (documents, or "nothing to submit"). */
create or replace function private.cycle_submitted(y public.document_cycles) returns boolean
language sql stable security definer set search_path = '' as $$
  select (y.nothing_to_submit_at is not null and (y.nothing_to_submit_at at time zone 'Asia/Manila')::date <= y.cutoff_date)
    or exists (
      select 1 from public.documents d
      where d.client_id = y.client_id and d.document_month = y.period and d.status <> 'uploading'
        and private.is_submission(d.doc_type) and (d.created_at at time zone 'Asia/Manila')::date <= y.cutoff_date
    )
$$;

/**
 * The nightly step for every active client, as of `p_today` (Manila):
 * opens this month's cycle, records missed cutoffs, closes cycles two months on.
 * Returns how many cycles were opened, marked missed and closed.
 */
create or replace function private.run_cycles(p_today date, out opened int, out missed int, out closed int)
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
  sent boolean;
begin
  with ins as (
    insert into public.document_cycles (client_id, period, cutoff_date)
    select c.id, o.m, (o.m + interval '1 month')::date + (c.submission_cutoff_day - 1)
    from public.clients c
    cross join lateral (
      select case when extract(day from p_today) <= c.submission_cutoff_day
                  then (date_trunc('month', p_today) - interval '1 month')::date
                  else date_trunc('month', p_today)::date end as m
    ) o
    where c.status = 'active'
    on conflict (client_id, period) do nothing
    returning 1
  ) select count(*) into opened from ins;

  missed := 0;
  for y in select * from public.document_cycles where missed_cutoff is null and cutoff_date < p_today for update loop
    sent := private.cycle_submitted(y);
    update public.document_cycles set missed_cutoff = not sent where id = y.id;
    if not sent then missed := missed + 1; end if;
  end loop;

  closed := 0;
  for y in select * from public.document_cycles
           where closed_at is null and (period + interval '2 months')::date <= p_today
           order by period loop
    perform private.close_cycle(y.id, null);
    closed := closed + 1;
  end loop;
end;
$$;

/** Nightly job (service role only). */
create or replace function public.run_document_cycles(p_today date) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  r := private.run_cycles(p_today);
  return jsonb_build_object('opened', r.opened, 'missed', r.missed, 'closed', r.closed);
end;
$$;

/**
 * Cycles that need an email today (service role only): the request once the month
 * has ended, and a reminder the day before the cutoff if nothing has come in yet.
 */
create or replace function public.cycle_notices_due(p_today date)
returns table (cycle_id uuid, client_id uuid, kind text, period date, cutoff_date date)
language sql stable security definer set search_path = '' as $$
  select y.id, y.client_id, 'request', y.period, y.cutoff_date
  from public.document_cycles y join public.clients c on c.id = y.client_id and c.status = 'active'
  where y.requested_at is null and y.closed_at is null
    and p_today >= (y.period + interval '1 month')::date and p_today <= y.cutoff_date
  union all
  select y.id, y.client_id, 'reminder', y.period, y.cutoff_date
  from public.document_cycles y join public.clients c on c.id = y.client_id and c.status = 'active'
  where y.reminded_at is null and y.requested_at is not null and y.closed_at is null
    and (y.requested_at at time zone 'Asia/Manila')::date < p_today
    and p_today >= y.cutoff_date - 1 and p_today <= y.cutoff_date
    and y.nothing_to_submit_at is null
    and not exists (
      select 1 from public.documents d
      where d.client_id = y.client_id and d.document_month = y.period and d.status <> 'uploading' and private.is_submission(d.doc_type)
    )
$$;

/** Records that a request or reminder went out (service role only). */
create or replace function public.mark_cycle_notice(p_cycle uuid, p_kind text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if p_kind = 'request' then
    update public.document_cycles set requested_at = coalesce(requested_at, now()) where id = p_cycle;
  elsif p_kind = 'reminder' then
    update public.document_cycles set reminded_at = coalesce(reminded_at, now()) where id = p_cycle;
  else
    raise exception 'Unknown notice %', p_kind using errcode = '22023';
  end if;
end;
$$;

/** Staff close a month after its cutoff: assigned staff or the Owner. */
create or replace function public.close_document_cycle(p_client uuid, p_period date) returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
begin
  if not (private.is_owner() or private.is_assigned(p_client)) then
    raise exception 'Only staff assigned to this client can close its month' using errcode = '42501';
  end if;
  select * into y from public.document_cycles where client_id = p_client and period = date_trunc('month', p_period)::date;
  if y.id is null then raise exception 'That month has no cycle yet' using errcode = 'P0002'; end if;
  if y.closed_at is not null then raise exception 'That month is already closed' using errcode = '22023'; end if;
  if private.manila_today() <= y.cutoff_date then
    raise exception 'A month can be closed only after its cutoff (%)', to_char(y.cutoff_date, 'FMMonth FMDD') using errcode = '22023';
  end if;
  if y.missed_cutoff is null then
    update public.document_cycles set missed_cutoff = not private.cycle_submitted(y) where id = y.id;
  end if;
  return private.close_cycle(y.id, auth.uid());
end;
$$;

/** The client (or staff for them) says there is nothing to submit for the month. */
create or replace function public.declare_nothing_to_submit(p_client uuid, p_period date) returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
begin
  if not private.can_upload(p_client) then
    raise exception 'You cannot do this for this client' using errcode = '42501';
  end if;
  select * into y from public.document_cycles where client_id = p_client and period = date_trunc('month', p_period)::date for update;
  if y.id is null then raise exception 'That month is not open for documents' using errcode = 'P0002'; end if;
  if y.closed_at is not null then raise exception 'That month is closed' using errcode = '22023'; end if;
  update public.document_cycles set nothing_to_submit_at = coalesce(nothing_to_submit_at, now()), nothing_to_submit_by = coalesce(nothing_to_submit_by, auth.uid())
  where id = y.id returning * into y;
  return y;
end;
$$;

/**
 * The Reviewer or Owner decides a prior-year exception: amend the prior-year return,
 * treat the document as non-deductible, or record it in the current period.
 */
create or replace function public.decide_exception(p_document uuid, p_decision text, p_note text) returns public.documents
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  note text := nullif(trim(coalesce(p_note, '')), '');
begin
  select * into d from public.documents where id = p_document for update;
  if d.id is null or not private.can_access_client(d.client_id) then
    raise exception 'Document not found' using errcode = 'P0002';
  end if;
  if not private.can_manage_client(d.client_id) then
    raise exception 'Only the client''s Reviewer or the Owner decides exceptions' using errcode = '42501';
  end if;
  if d.exception_status is distinct from 'open' then
    raise exception 'This document is not waiting for a decision' using errcode = '22023';
  end if;
  if p_decision not in ('amend', 'non_deductible', 'record_current') then
    raise exception 'Choose amend, non-deductible or record in the current period' using errcode = '22023';
  end if;
  if note is null then raise exception 'Add a note for the file' using errcode = '22023'; end if;
  update public.documents
    set exception_status = p_decision, exception_note = note, exception_decided_by = auth.uid(), exception_decided_at = now()
    where id = d.id returning * into d;
  return d;
end;
$$;

revoke execute on function private.is_submission(text) from public, anon;
revoke execute on function private.place_document() from public, anon, authenticated;
revoke execute on function private.close_cycle(uuid, uuid) from public, anon, authenticated;
revoke execute on function private.cycle_submitted(public.document_cycles) from public, anon, authenticated;
revoke execute on function private.run_cycles(date) from public, anon, authenticated;
revoke execute on function public.run_document_cycles(date) from public, anon, authenticated;
revoke execute on function public.cycle_notices_due(date) from public, anon, authenticated;
revoke execute on function public.mark_cycle_notice(uuid, text) from public, anon, authenticated;
revoke execute on function public.close_document_cycle(uuid, date) from public, anon;
revoke execute on function public.declare_nothing_to_submit(uuid, date) from public, anon;
revoke execute on function public.decide_exception(uuid, text, text) from public, anon;
grant execute on function private.is_submission(text) to authenticated;
grant execute on function public.close_document_cycle(uuid, date) to authenticated;
grant execute on function public.declare_nothing_to_submit(uuid, date) to authenticated;
grant execute on function public.decide_exception(uuid, text, text) to authenticated;
