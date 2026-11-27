-- Catch-up accounting (Owner, 27 November 2026).
--
-- A client can be put in catch-up up to a month end ("catch-up through"): its past periods
-- are entered after the fact. The returns for those periods were already filed with the
-- BIR outside the app, so they skip the five-step sign-off:
--
--   record   staff assigned to the client (or the Owner) enter what was filed: tax due,
--            filing date and reference, payment date and reference. The filed copy is
--            optional. Nothing goes to the client.
--   confirm  the client's reviewer (not the person who recorded it) or the Owner checks it
--            against the BIR copy: the return becomes Filed. Or sends it back with a reason.
--
-- While the client is in catch-up:
--   - a return recorded this way does not lock its months in the Books, so documents and
--     entries go in and are corrected in any order; the months lock as usual once the
--     Owner ends catch-up for the client;
--   - documents dated in the catch-up months stay in their own month: never late, never
--     prior-year, never carried forward, no late-submission surcharge;
--   - catch-up returns are never billed (the tax was paid long ago), never scored late,
--     and the catch-up periods do not wait on Books locks in the Filings lists.
-- Ending catch-up needs every recorded return confirmed (or sent back) first.

alter table public.clients add column catch_up_through date
  check (catch_up_through is null or catch_up_through = (date_trunc('month', catch_up_through) + interval '1 month - 1 day')::date);
comment on column public.clients.catch_up_through is
  'Catch-up accounting: periods ending on or before this month end are entered after the fact (migration 20270104000001). Null: not in catch-up.';

alter table public.filing_instances
  add column catch_up boolean not null default false,
  add column catch_up_recorded_by uuid references auth.users (id),
  add column catch_up_recorded_at timestamptz;
comment on column public.filing_instances.catch_up is 'Recorded as filed outside the app during catch-up (migration 20270104000001).';

create index filing_instances_catch_up_idx on public.filing_instances (client_id) where catch_up_recorded_at is not null and status <> 'filed';

/** The client is in catch-up now. */
create or replace function private.in_catch_up(p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select c.catch_up_through is not null from public.clients c where c.id = p_client), false)
$$;

/** p_date falls in the client's catch-up months. */
create or replace function private.catch_up_covers(p_client uuid, p_date date) returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select p_date <= c.catch_up_through from public.clients c where c.id = p_client), false)
$$;

-- Only the Owner puts a client in catch-up or ends it.
create or replace function private.catch_up_owner_only() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.catch_up_through is distinct from old.catch_up_through and auth.uid() is not null and not private.is_owner() then
    raise exception 'Only the Owner puts a client in catch-up or ends it' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger catch_up_owner_only before update of catch_up_through on public.clients
  for each row execute function private.catch_up_owner_only();

-- ---------------------------------------------------------------------------
-- Starting and ending catch-up
-- ---------------------------------------------------------------------------

/** The Owner puts a client in catch-up through the month of p_through, or ends it (null). */
create or replace function public.set_catch_up(p_client uuid, p_through date) returns public.clients
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  through date := (date_trunc('month', p_through) + interval '1 month - 1 day')::date;
  today date := (now() at time zone 'Asia/Manila')::date;
  waiting integer;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner puts a client in catch-up or ends it' using errcode = '42501';
  end if;
  select * into c from public.clients where id = p_client for update;
  if c.id is null then raise exception 'Client not found' using errcode = 'P0002'; end if;

  if p_through is not null then
    -- Up to the end of this calendar year (e.g. through December 2026, decided 27 Nov 2026).
    if through > make_date(extract(year from today)::int, 12, 31) then
      raise exception 'Catch-up runs up to December % at the latest', extract(year from today)::int using errcode = '22023';
    end if;
  else
    select count(*) into waiting from public.filing_instances
      where client_id = p_client and catch_up_recorded_at is not null and status <> 'filed';
    if waiting > 0 then
      raise exception '% catch-up % still waiting for the reviewer to confirm. Confirm or send them back first.',
        waiting, case when waiting = 1 then 'return is' else 'returns are' end using errcode = '22023';
    end if;
  end if;

  -- Returns recorded for months a shorter catch-up no longer covers must be confirmed first.
  if p_through is not null and c.catch_up_through is not null and through < c.catch_up_through then
    select count(*) into waiting from public.filing_instances
      where client_id = p_client and catch_up_recorded_at is not null and status <> 'filed' and period_end > through;
    if waiting > 0 then
      raise exception 'Returns after % are recorded and waiting for confirmation. Confirm or send them back first.',
        to_char(through, 'FMMonth YYYY') using errcode = '22023';
    end if;
  end if;

  update public.clients set catch_up_through = case when p_through is null then null else through end
    where id = p_client returning * into c;
  -- Documents already in for the catch-up months go back to their own month (the trigger below).
  if c.catch_up_through is not null then
    update public.documents set period = period
      where client_id = p_client and document_month <= c.catch_up_through
        and (late or prior_year or carried_from is not null or period <> document_month);
  end if;
  return c;
end;
$$;

-- ---------------------------------------------------------------------------
-- Recording and confirming a catch-up return
-- ---------------------------------------------------------------------------

/**
 * Staff assigned to the client (or the Owner) record a return of a catch-up month as filed
 * outside the app. p_data: tax_due, filed_on, filing_reference (optional), paid_on and
 * payment_reference (optional) when tax is due. Recording again replaces the figures.
 */
create or replace function public.record_catch_up_filing(p_filing uuid, p_data jsonb, p_note text default null)
returns public.filing_instances
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  c public.clients;
  data jsonb := coalesce(p_data, '{}'::jsonb);
  today date := (now() at time zone 'Asia/Manila')::date;
  tax numeric;
  filed date;
  paid date;
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null or not private.can_access_client(f.client_id) then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or private.is_assigned(f.client_id)) then
    raise exception 'Only staff assigned to this client record its returns' using errcode = '42501';
  end if;
  select * into c from public.clients where id = f.client_id;
  if c.catch_up_through is null then
    raise exception 'This client is not in catch-up' using errcode = '22023';
  end if;
  if f.period_end > c.catch_up_through then
    raise exception 'Only returns for periods up to % are recorded as catch-up', to_char(c.catch_up_through, 'FMMonth YYYY') using errcode = '22023';
  end if;
  if f.status <> 'not_started' then
    raise exception 'This return is already in the sign-off chain (%)', f.status using errcode = '22023';
  end if;

  if nullif(data ->> 'tax_due', '') is null then raise exception 'Enter the tax due on the filed return (0 if none)' using errcode = '22023'; end if;
  tax := (data ->> 'tax_due')::numeric;
  if tax < 0 then raise exception 'The tax due cannot be negative' using errcode = '22023'; end if;
  filed := nullif(data ->> 'filed_on', '')::date;
  if filed is null then raise exception 'Enter the date it was filed' using errcode = '22023'; end if;
  if filed > today then raise exception 'The filing date cannot be in the future' using errcode = '22023'; end if;
  paid := nullif(data ->> 'paid_on', '')::date;
  if tax > 0 and paid is null then raise exception 'Enter the date the tax was paid' using errcode = '22023'; end if;
  if paid > today then raise exception 'The payment date cannot be in the future' using errcode = '22023'; end if;

  update public.filing_instances
    set tax_due = tax,
        filed_on = filed,
        filing_reference = nullif(btrim(coalesce(data ->> 'filing_reference', '')), ''),
        paid_on = case when tax > 0 then paid end,
        payment_reference = case when tax > 0 then nullif(btrim(coalesce(data ->> 'payment_reference', '')), '') end,
        catch_up = true, catch_up_recorded_by = auth.uid(), catch_up_recorded_at = now(), open_query = null
    where id = f.id returning * into f;
  insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
  values (f.id, f.status, f.status, auth.uid(), nullif(btrim(coalesce(p_note, '')), ''), 'catch_up_record',
          jsonb_build_object('tax_due', tax, 'filed_on', filed, 'filing_reference', f.filing_reference,
                             'paid_on', f.paid_on, 'payment_reference', f.payment_reference));
  return f;
end;
$$;

/**
 * The client's reviewer (never the person who recorded it) or the Owner confirms a recorded
 * catch-up return (p_action 'confirm': it becomes Filed) or sends it back ('send_back', with
 * a reason: the recorded figures are cleared).
 */
create or replace function public.confirm_catch_up_filing(p_filing uuid, p_action text, p_note text default null)
returns public.filing_instances
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  owner boolean := private.is_owner();
  note text := nullif(btrim(coalesce(p_note, '')), '');
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null or not private.can_access_client(f.client_id) then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  if not (owner or private.is_assigned(f.client_id, 'reviewer')) then
    raise exception 'Only the client''s reviewer or the Owner confirms a catch-up return' using errcode = '42501';
  end if;
  if f.catch_up_recorded_at is null or f.status <> 'not_started' then
    raise exception 'This return is not waiting for a catch-up confirmation' using errcode = '22023';
  end if;
  if not owner and f.catch_up_recorded_by = auth.uid() then
    raise exception 'You recorded this return; another person must confirm it' using errcode = '42501';
  end if;

  if p_action = 'confirm' then
    if not private.catch_up_covers(f.client_id, f.period_end) then
      raise exception 'This client is no longer in catch-up for this period' using errcode = '22023';
    end if;
    update public.filing_instances set status = 'filed' where id = f.id returning * into f;
    insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
    values (f.id, 'not_started', 'filed', auth.uid(), note, 'catch_up_confirm', jsonb_build_object('catch_up', true));
    perform private.on_return_filed(f.id);
    select * into f from public.filing_instances where id = f.id;
  elsif p_action = 'send_back' then
    if note is null then raise exception 'Say what needs fixing' using errcode = '22023'; end if;
    update public.filing_instances
      set catch_up = false, catch_up_recorded_by = null, catch_up_recorded_at = null,
          filed_on = null, filing_reference = null, paid_on = null, payment_reference = null
      where id = f.id returning * into f;
    insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
    values (f.id, 'not_started', 'not_started', auth.uid(), note, 'catch_up_send_back', '{}'::jsonb);
  else
    raise exception 'Unknown action %', p_action using errcode = '22023';
  end if;
  return f;
end;
$$;

/** Catch-up returns waiting for confirmation, for the Review page (clients the caller sees). */
create or replace function public.catch_up_waiting()
returns table (filing_id uuid, client_id uuid, client_name text, form text, period_label text, period_end date,
               tax_due numeric, filed_on date, recorded_by uuid, recorded_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select f.id, f.client_id, c.name, f.form, f.period_label, f.period_end, f.tax_due, f.filed_on,
         f.catch_up_recorded_by, f.catch_up_recorded_at
  from public.filing_instances f
  join public.clients c on c.id = f.client_id
  where f.catch_up_recorded_at is not null and f.status = 'not_started'
    and private.is_staff() and private.can_access_client(f.client_id)
  order by c.name, f.period_end, f.form
$$;

/** Unfiled returns of catch-up periods the caller sees: kept out of the overdue and deadline lists. */
create or replace function public.catch_up_open_filings()
returns table (filing_id uuid)
language sql stable security definer set search_path = '' as $$
  select f.id
  from public.filing_instances f
  join public.clients c on c.id = f.client_id
  where c.catch_up_through is not null and f.period_end <= c.catch_up_through
    and f.status not in ('filed', 'paid', 'proof_uploaded')
    and private.is_staff() and private.can_access_client(f.client_id)
$$;

-- The bell: the reviewer (else the Owner) when a catch-up return is recorded; the person who
-- recorded it when it is sent back.
create or replace function private.notify_catch_up_event() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  c text;
  label text;
  href text := '/app/filings/' || new.filing_instance_id;
  recorder uuid;
begin
  if new.action not in ('catch_up_record', 'catch_up_send_back') then return null; end if;
  select * into f from public.filing_instances where id = new.filing_instance_id;
  select name into c from public.clients where id = f.client_id;
  label := private.filing_label(f);
  if new.action = 'catch_up_record' then
    perform private.notify(
      case when cardinality(private.client_staff_ids(f.client_id, 'reviewer')) > 0
           then private.client_staff_ids(f.client_id, 'reviewer') else private.owner_ids() end,
      'return_ready_for_review', c || ': catch-up ' || label || ' recorded',
      'Check it against the BIR copy, then confirm it as filed or send it back.', href, f.client_id);
  else
    select e.actor into recorder from public.filing_events e
      where e.filing_instance_id = f.id and e.action = 'catch_up_record' order by e.created_at desc, e.id desc limit 1;
    perform private.notify(array[recorder], 'return_sent_back', c || ': catch-up ' || label || ' was sent back',
      coalesce('Reason: ' || nullif(btrim(new.note), ''), 'Open the return to see what needs fixing.'), href, f.client_id);
  end if;
  return null;
end;
$$;

create trigger notify_catch_up after insert on public.filing_events
  for each row execute function private.notify_catch_up_event();

-- A catch-up return keeps the tax due on the filed return, not a worksheet's figure.
create or replace function private.tax_due_from_worksheet() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  v_due text;
begin
  if new.catch_up then return new; end if;
  select w.figures ->> '__tax_due' into v_due
  from public.return_worksheets w
  where w.filing_instance_id = new.id and w.result is not null and w.figures ? '__tax_due';
  if v_due is not null then
    new.tax_due := (v_due::numeric / 100)::numeric(18, 2);
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Locks: a catch-up return locks its months only once catch-up ends
-- ---------------------------------------------------------------------------

create or replace function private.locking_filing(p_client uuid, p_month date, p_doc_type text) returns uuid
language sql stable security definer set search_path = '' as $$
  select f.id from public.filing_instances f
  where f.client_id = p_client
    and f.status in ('filed', 'paid', 'proof_uploaded')
    and not (f.catch_up and private.in_catch_up(f.client_id))
    and (p_doc_type is null or f.form = any (private.book_lock_forms(p_doc_type)))
    and p_month between date_trunc('month', f.period_start)::date and f.period_end
  order by f.period_end desc
  limit 1;
$$;

create or replace function private.books_locked_by(p_client uuid, p_date date, p_doc_type text) returns text
language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select string_agg(f.form || ' ' || f.period_label, ', ' order by f.period_start, f.form)
     from public.filing_instances f
     where f.client_id = p_client
       and f.form = any (private.book_lock_forms(p_doc_type))
       and p_date between f.period_start and f.period_end
       and f.status in ('filed', 'paid', 'proof_uploaded')
       and not (f.catch_up and private.in_catch_up(f.client_id))
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

create or replace function private.payroll_month_locked(p_client uuid, p_month date) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.filing_instances f
    where f.client_id = p_client and f.form = '1601-C'
      and p_month between f.period_start and f.period_end
      and f.status in ('filed', 'paid', 'proof_uploaded')
      and not (f.catch_up and private.in_catch_up(f.client_id))
  )
$$;

-- A catch-up period never waits on Books locks in the Filings lists.
create or replace function public.filing_books_ready(p_filing uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select case
    when f.id is null then null
    when not (f.form = any (private.book_lock_forms())) then true
    when b.client_id is null then true
    when private.catch_up_covers(f.client_id, f.period_end) then true
    else not exists (
      select 1 from generate_series(date_trunc('month', greatest(f.period_start, b.books_start)), date_trunc('month', f.period_end), interval '1 month') g
      where private.books_locked_by(f.client_id, g::date) is null)
  end
  from (select 1) one
  left join public.filing_instances f on f.id = p_filing
    and ((private.is_staff() and private.can_access_client(f.client_id)) or private.acting_sees_filing(f.id))
  left join public.client_books b on b.client_id = f.client_id
$$;

create or replace function public.books_still_open(p_today date default null)
returns table (
  client_id uuid, client_name text, month date, status text, nearest_due_date date,
  filing_id uuid, form text, period_label text, filings integer
)
language sql stable security definer set search_path = '' as $$
  with t as (select coalesce(p_today, (now() at time zone 'Asia/Manila')::date) as today),
  months as (
    select b.client_id, g::date as m
    from public.client_books b
    cross join t
    cross join lateral generate_series(date_trunc('month', b.books_start), date_trunc('month', t.today), interval '1 month') g
    where private.is_staff() and private.can_access_client(b.client_id)
  ),
  open_months as (select * from months where private.books_locked_by(months.client_id, months.m) is null),
  cov as (
    select o.client_id, o.m, f.id, f.form, f.period_label, f.due_date,
           row_number() over (partition by o.client_id, o.m order by f.due_date, f.form) as rn,
           count(*) over (partition by o.client_id, o.m) as n
    from open_months o
    join public.filing_instances f on f.client_id = o.client_id and f.form = any (private.book_lock_forms())
      and o.m between date_trunc('month', f.period_start)::date and f.period_end
      and f.status not in ('filed', 'paid', 'proof_uploaded')
      and not private.catch_up_covers(f.client_id, f.period_end)
  )
  select c.client_id, cl.name, c.m,
         case when exists (select 1 from public.books_lock_requests r where r.client_id = c.client_id and r.month = c.m and r.kind = 'lock' and r.status = 'requested')
              then 'lock_requested' else 'open' end,
         c.due_date, c.id, c.form, c.period_label, c.n::integer
  from cov c
  join public.clients cl on cl.id = c.client_id
  where c.rn = 1
  order by c.due_date, cl.name, c.m
$$;

-- ---------------------------------------------------------------------------
-- Documents of the catch-up months stay in their own month
-- ---------------------------------------------------------------------------

-- Runs after place_document (triggers fire by name): whatever the cycle or the cutoff would
-- do, a document dated in a catch-up month is processed in that month, on time.
create or replace function private.catch_up_place_document() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.document_month is null or not private.catch_up_covers(new.client_id, new.document_month) then
    return new;
  end if;
  new.period := new.document_month;
  new.late := false;
  new.prior_year := false;
  new.carried_from := null;
  if new.exception_status = 'open'
     and new.exception_reason in ('From a prior taxable year', 'Its taxable year is closed', 'Not posted when the taxable year closed')
     and (tg_op = 'INSERT' or old.exception_status is distinct from 'open') then
    new.exception_status := null;
    new.exception_reason := null;
  end if;
  return new;
end;
$$;

create trigger zz_catch_up_place_document before insert or update on public.documents
  for each row execute function private.catch_up_place_document();

-- ---------------------------------------------------------------------------
-- Never billed, never scored late
-- ---------------------------------------------------------------------------

create or replace function private.ready_to_bill(p_date date, p_client uuid default null)
returns table (
  client_id uuid,
  kind text,
  description text,
  amount numeric(18, 2),
  reason text,
  days_to_due integer,
  filing_instance_id uuid,
  due_id uuid,
  period_month date
)
language sql stable security definer set search_path = '' as $$
  -- Every retainer month up to the billing month not yet billed (or waived).
  select rm.client_id, 'retainer', 'Monthly retainer, ' || trim(to_char(rm.first_day, 'FMMonth YYYY')),
         rm.amount, case when rm.first_day = date_trunc('month', p_date)::date then 'retainer' else 'retainer_unbilled' end,
         null::integer, null::uuid, null::uuid, rm.first_day
  from (
    select e.client_id, m.first_day::date as first_day, sum(e.monthly_retainer)::numeric(18, 2) as amount
    from public.engagements e
    cross join lateral generate_series(
      date_trunc('month', e.start_date),
      date_trunc('month', least(coalesce(e.end_date, p_date), p_date)),
      interval '1 month'
    ) as m (first_day)
    where (p_client is null or e.client_id = p_client)
      and (e.status = 'active' or e.end_date is not null)
      and e.start_date <= p_date
    group by e.client_id, m.first_day
    having sum(e.monthly_retainer) > 0
  ) rm
  where not exists (
    select 1 from public.client_dues d where d.client_id = rm.client_id and d.kind = 'retainer' and d.period_month = rm.first_day
  )

  union all

  -- Returns the firm remits: approved by the client, or reviewed and two days or less from the BIR deadline.
  -- Catch-up returns were paid when they were filed: never billed.
  select f.client_id, 'tax', 'Tax due, ' || f.form || ' ' || f.period_label, f.tax_due::numeric(18, 2),
         case when f.status = 'reviewed' then 'due_soon' else 'client_approved' end,
         (f.due_date - p_date)::integer, f.id, null::uuid, null::date
  from public.filing_instances f
  join public.clients cl on cl.id = f.client_id
  where (p_client is null or f.client_id = p_client)
    and cl.payment_mode = 'firm_remits'
    and coalesce(f.tax_due, 0) > 0
    and (f.status in ('client_approved', 'owner_approved', 'filed') or (f.status = 'reviewed' and p_date >= f.due_date - 2))
    and not f.catch_up
    and not private.catch_up_covers(f.client_id, f.period_end)
    and not exists (select 1 from public.client_dues d where d.filing_instance_id = f.id)

  union all

  -- Contributions and other charges entered and not yet on a statement.
  select d.client_id, d.kind, d.description, d.amount, 'charge', null::integer, null::uuid, d.id, null::date
  from public.client_dues d
  where (p_client is null or d.client_id = p_client) and d.soa_id is null and d.waived_at is null
$$;

create or replace function private.late_filing_causes(p_from date, p_to date, p_today date)
returns table (
  filing_id uuid, client_id uuid, form text, period_label text, period_end date, due_date date, filed_on date,
  status text, preparer uuid, missed_cutoff boolean, late_documents boolean, waited_for_client boolean, unpaid_tax boolean, cause text
)
language sql stable security definer set search_path = '' as $$
  with f as (
    select fi.*, date_trunc('month', fi.period_end)::date as last_month
    from public.filing_instances fi
    where fi.due_date between p_from and p_to
      and fi.due_date < p_today
      and (fi.filed_on > fi.due_date or (fi.filed_on is null and fi.status not in ('filed', 'paid', 'proof_uploaded')))
      -- An amended return has no statutory deadline of its own: not scored as late.
      and fi.amendment_no = 0
      -- Catch-up returns were filed before the client came to the app: not scored.
      and not fi.catch_up
      and not private.catch_up_covers(fi.client_id, fi.period_end)
  ),
  x as (
    select
      f.*,
      coalesce(y.missed_cutoff, false) as missed,
      coalesce(y.cutoff_date is not null and exists (
        select 1 from public.documents d
        where d.client_id = f.client_id
          and d.document_month between date_trunc('month', f.period_start)::date and f.last_month
          and private.is_submission(d.doc_type) and not d.prior_year and d.status <> 'uploading'
          and (d.created_at at time zone 'Asia/Manila')::date > y.cutoff_date
      ), false) as late_docs,
      (
        exists (select 1 from public.filing_events e where e.filing_instance_id = f.id and e.action = 'review'
                and (e.created_at at time zone 'Asia/Manila')::date <= f.due_date)
        and not exists (select 1 from public.filing_events e where e.filing_instance_id = f.id and e.action = 'client_approve'
                and (e.created_at at time zone 'Asia/Manila')::date <= f.due_date)
      ) as waited,
      exists (
        select 1 from public.client_dues du
        where du.filing_instance_id = f.id and du.waived_at is null
          and du.amount > coalesce((
            select sum(a.amount) from public.payment_allocations a
            join public.client_deposits dep on dep.id = a.deposit_id
            where a.due_id = du.id and dep.voided_at is null and dep.received_on <= f.due_date
          ), 0)
      ) as unpaid,
      coalesce(
        (select e.actor from public.filing_events e where e.filing_instance_id = f.id and e.action = 'prepare'
         order by e.created_at desc, e.id desc limit 1),
        (select sa.user_id from public.staff_assignments sa where sa.client_id = f.client_id and sa.role = 'preparer'
         order by sa.created_at, sa.user_id limit 1)
      ) as prep
    from f
    left join public.document_cycles y on y.client_id = f.client_id and y.period = f.last_month
  )
  select id, client_id, form, period_label, period_end, due_date, filed_on, status, prep,
         missed, late_docs, waited, unpaid,
         case when missed or late_docs or waited or unpaid then 'client' else 'staff' end
  from x
$$;

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
revoke execute on function private.in_catch_up(uuid) from public, anon, authenticated;
revoke execute on function private.catch_up_covers(uuid, date) from public, anon, authenticated;
revoke execute on function private.catch_up_owner_only() from public, anon, authenticated;
revoke execute on function private.notify_catch_up_event() from public, anon, authenticated;
revoke execute on function private.catch_up_place_document() from public, anon, authenticated;
revoke execute on function public.set_catch_up(uuid, date) from public, anon;
revoke execute on function public.record_catch_up_filing(uuid, jsonb, text) from public, anon;
revoke execute on function public.confirm_catch_up_filing(uuid, text, text) from public, anon;
revoke execute on function public.catch_up_waiting() from public, anon;
revoke execute on function public.catch_up_open_filings() from public, anon;
grant execute on function public.catch_up_open_filings() to authenticated;
grant execute on function public.set_catch_up(uuid, date) to authenticated;
grant execute on function public.record_catch_up_filing(uuid, jsonb, text) to authenticated;
grant execute on function public.confirm_catch_up_filing(uuid, text, text) to authenticated;
grant execute on function public.catch_up_waiting() to authenticated;
