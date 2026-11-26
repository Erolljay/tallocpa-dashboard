-- SSS, PhilHealth and Pag-IBIG monthly remittances, run like a return (Owner, 26 November
-- 2026): "It will be the same with filings, with the attachments like employer share,
-- employee share, EC … Once we do the SSS, PHIC and HDMF, we are the ones to prepare the
-- PRN and the amount the client pays, and we remit, same with filing tax due."
--
-- Employer numbers (public.client_employer_numbers): one per client and agency, with the
-- month the client started reporting employees (and stopped, if it did). They decide which
-- remittances a client has and their deadlines.
--
-- Remittances (public.contribution_remittances): one per client, agency and month, for
-- SSS, PhilHealth and Pag-IBIG contributions, and SSS and Pag-IBIG loan payments (the same
-- five kinds as client_dues.contribution). The nightly job and staff create the
-- contribution months; loan months are added by staff when the payroll withholds loans.
--
--   not_started → prepared → approved → remitted       (or not_required: no employees)
--
--   Prepared  staff on the client enter the employee, employer and EC shares (EC on SSS
--             only), the headcount and the PRN, with the contribution report attached
--             (SSS R-3 / contribution list, PhilHealth RF-1, Pag-IBIG MCRF or the loan
--             list). The Owner is notified.
--   Approved  the Owner approves. For a client whose taxes the firm remits
--             (payment_mode 'firm_remits') this puts the total on the client's next
--             statement as a contribution item (client_dues), exactly as a return's tax
--             due; an unbilled item for the same agency and month entered by hand is
--             used instead of adding a second.
--   Remitted  the date paid and the payment reference, with the proof of payment
--             attached. When the firm remits, only the Owner records it (as
--             mark_contribution_remitted): the statement item is marked remitted, so its
--             money is no longer held as cash for remittance. When the client pays the
--             agency, staff on the client record it from the client's proof.
--
-- Deadlines (private.remittance_due_date; to verify against the agencies' current
-- circulars, like the BIR rules marked UNVERIFIED):
--   SSS and SSS loans          last day of the month after the applicable month
--   PhilHealth                 15th of the next month if the employer number (PEN) ends
--                              in 0–4, the 20th if it ends in 5–9
--   Pag-IBIG and Pag-IBIG loans by the first letter of the employer's registered name:
--                              A–D the 14th, E–L the 19th, M–Q the 24th, R–Z the last day
--                              of the next month
-- A deadline on a weekend or national holiday moves to the next working day. Staff may
-- change a remittance's due date (e.g. an agency advisory moves it).
--
-- Files sit in the private "remittance-files" bucket under <client id>/<remittance id>/.
-- The client's portal users see a remittance once approved (the PRN and amount to pay),
-- and its files once remitted.

-- ---------------------------------------------------------------------------
-- Employer numbers.
-- ---------------------------------------------------------------------------
create table public.client_employer_numbers (
  client_id uuid not null references public.clients (id) on delete cascade,
  agency text not null check (agency in ('sss', 'philhealth', 'pagibig')),
  employer_number text not null check (btrim(employer_number) <> '' and length(employer_number) <= 40),
  -- The employer's name as registered with the agency, when it differs from the client's (Pag-IBIG deadlines).
  registered_name text check (registered_name is null or btrim(registered_name) <> ''),
  start_month date not null check (extract(day from start_month) = 1),
  end_month date check (end_month is null or extract(day from end_month) = 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (client_id, agency),
  check (end_month is null or end_month >= start_month)
);
create trigger audit after insert or update or delete on public.client_employer_numbers for each row execute function private.audit();
create trigger touch_updated_at before update on public.client_employer_numbers for each row execute function private.touch_updated_at();
alter table public.client_employer_numbers enable row level security;
create policy client_employer_numbers_read on public.client_employer_numbers for select to authenticated
  using ((private.is_staff() and private.can_access_client(client_id)) or private.is_client_user(client_id));
revoke insert, update, delete on public.client_employer_numbers from authenticated;
grant select on public.client_employer_numbers to authenticated;

-- ---------------------------------------------------------------------------
-- Remittances.
-- ---------------------------------------------------------------------------
create table public.contribution_remittances (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('sss', 'philhealth', 'pagibig', 'sss_loan', 'pagibig_loan')),
  -- The applicable month (first day).
  period_month date not null check (extract(day from period_month) = 1),
  statutory_due_date date not null,
  due_date date not null,
  status text not null default 'not_started' check (status in ('not_started', 'prepared', 'approved', 'remitted', 'not_required')),
  -- Shares in pesos. A loan's payments are in ee_share; EC is SSS only.
  ee_share numeric(18, 2) not null default 0 check (ee_share >= 0),
  er_share numeric(18, 2) not null default 0 check (er_share >= 0),
  ec_share numeric(18, 2) not null default 0 check (ec_share >= 0),
  total numeric(18, 2) generated always as (ee_share + er_share + ec_share) stored,
  employees int check (employees is null or employees >= 0),
  -- Payment Reference Number (or the agency's payment slip number).
  prn text check (prn is null or (btrim(prn) <> '' and length(prn) <= 60)),
  note text check (note is null or length(note) <= 500),
  prepared_by uuid references auth.users (id),
  prepared_at timestamptz,
  approved_by uuid references auth.users (id),
  approved_at timestamptz,
  -- The client's statement item, when the firm remits.
  due_id uuid unique references public.client_dues (id) on delete set null,
  remitted_on date,
  remit_reference text check (remit_reference is null or length(remit_reference) <= 100),
  remitted_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, kind, period_month),
  check (kind in ('sss') or ec_share = 0),
  check (kind not in ('sss_loan', 'pagibig_loan') or (er_share = 0 and ec_share = 0)),
  check ((status = 'remitted') = (remitted_on is not null)),
  check (status not in ('prepared', 'approved', 'remitted') or (prn is not null and ee_share + er_share + ec_share > 0)),
  check (status <> 'not_required' or note is not null)
);
create index contribution_remittances_due_idx on public.contribution_remittances (due_date, status);
create index contribution_remittances_client_idx on public.contribution_remittances (client_id, period_month desc);
create trigger audit after insert or update or delete on public.contribution_remittances for each row execute function private.audit();
create trigger touch_updated_at before update on public.contribution_remittances for each row execute function private.touch_updated_at();
alter table public.contribution_remittances enable row level security;
create policy contribution_remittances_read_staff on public.contribution_remittances for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy contribution_remittances_read_client on public.contribution_remittances for select to authenticated
  using (status in ('approved', 'remitted') and private.is_client_user(client_id));
revoke insert, update, delete on public.contribution_remittances from authenticated;
grant select on public.contribution_remittances to authenticated;

-- Files: the contribution report, the PRN statement, the proof of payment.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('remittance-files', 'remittance-files', false, 26214400, array[
  'application/pdf', 'image/jpeg', 'image/png', 'image/webp',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv', 'text/plain'
])
on conflict (id) do nothing;

create table public.contribution_remittance_files (
  id uuid primary key default gen_random_uuid(),
  remittance_id uuid not null references public.contribution_remittances (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('report', 'prn', 'proof')),
  file_name text not null check (btrim(file_name) <> ''),
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  storage_path text not null unique,
  uploaded_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now()
);
create index contribution_remittance_files_idx on public.contribution_remittance_files (remittance_id, kind, created_at);
create trigger audit after insert or update or delete on public.contribution_remittance_files for each row execute function private.audit();
alter table public.contribution_remittance_files enable row level security;
create policy remittance_files_read_staff on public.contribution_remittance_files for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy remittance_files_read_client on public.contribution_remittance_files for select to authenticated
  using (private.is_client_user(client_id) and exists (
    select 1 from public.contribution_remittances r where r.id = remittance_id
      and (r.status = 'remitted' or (r.status = 'approved' and contribution_remittance_files.kind = 'prn'))
  ));
revoke insert, update, delete on public.contribution_remittance_files from authenticated;
grant select on public.contribution_remittance_files to authenticated;

create policy remittance_files_object_read on storage.objects for select to authenticated using (
  bucket_id = 'remittance-files' and exists (select 1 from public.contribution_remittance_files f where f.storage_path = name)
);
create policy remittance_files_object_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'remittance-files' and private.can_keep_books(private.document_client(name))
);

-- ---------------------------------------------------------------------------
-- Deadlines.
-- ---------------------------------------------------------------------------
/** The day itself, or the next day that is not a weekend or a national holiday. */
create or replace function private.remittance_working_day(p_date date) returns date
language plpgsql stable security definer set search_path = '' as $$
declare
  d date := p_date;
begin
  while extract(isodow from d) in (6, 7) or exists (select 1 from public.holidays h where h.date = d and h.kind <> 'local') loop
    d := d + 1;
  end loop;
  return d;
end;
$$;

/** The agency's deadline for one month's remittance, before moving off weekends and holidays. */
create or replace function private.remittance_statutory_due(p_kind text, p_month date, p_number text, p_name text) returns date
language plpgsql immutable set search_path = '' as $$
declare
  nxt date := (date_trunc('month', p_month) + interval '1 month')::date;
  last_day date := (date_trunc('month', p_month) + interval '2 months - 1 day')::date;
  digit int := nullif(right(regexp_replace(coalesce(p_number, ''), '\D', '', 'g'), 1), '')::int;
  letter text := upper(left(regexp_replace(coalesce(p_name, ''), '[^A-Za-z]', '', 'g'), 1));
begin
  return case
    when p_kind in ('sss', 'sss_loan') then last_day
    when p_kind = 'philhealth' then nxt + case when digit between 5 and 9 then 19 else 14 end
    when p_kind in ('pagibig', 'pagibig_loan') then case
      when letter between 'A' and 'D' then nxt + 13
      when letter between 'E' and 'L' then nxt + 18
      when letter between 'M' and 'Q' then nxt + 23
      else last_day
    end
  end;
end;
$$;

/** Adds a client's remittance for one month (if it is not there yet) with its deadline; returns its id. */
create or replace function private.add_remittance(p_client uuid, p_kind text, p_month date) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  n public.client_employer_numbers;
  c public.clients;
  due date;
  v_id uuid;
begin
  select * into n from public.client_employer_numbers
  where client_id = p_client and agency = case p_kind when 'sss_loan' then 'sss' when 'pagibig_loan' then 'pagibig' else p_kind end;
  if n.client_id is null then
    raise exception 'Enter the client''s % employer number first', case when p_kind like 'sss%' then 'SSS' when p_kind = 'philhealth' then 'PhilHealth' else 'Pag-IBIG' end using errcode = '22023';
  end if;
  select * into c from public.clients where id = p_client;
  due := private.remittance_statutory_due(p_kind, p_month, n.employer_number, coalesce(n.registered_name, c.name));
  insert into public.contribution_remittances (client_id, kind, period_month, statutory_due_date, due_date)
  values (p_client, p_kind, p_month, due, private.remittance_working_day(due))
  on conflict (client_id, kind, period_month) do nothing
  returning id into v_id;
  if v_id is null then
    select id into v_id from public.contribution_remittances where client_id = p_client and kind = p_kind and period_month = p_month;
  end if;
  return v_id;
end;
$$;

/**
 * Creates the contribution remittances (SSS, PhilHealth, Pag-IBIG) of every active client
 * with employer numbers, for the months from three months back to the month of p_today,
 * within each number's start and end months. The nightly job runs it; staff may too.
 * Returns how many were added.
 */
create or replace function public.generate_contribution_remittances(p_today date default null) returns int
language plpgsql security definer set search_path = '' as $$
declare
  today date := coalesce(p_today, private.manila_today());
  first_month date := (date_trunc('month', today) - interval '3 months')::date;
  this_month date := date_trunc('month', today)::date;
  before int;
  after int;
  r record;
begin
  if auth.uid() is not null and not private.is_staff() then
    raise exception 'Only staff create remittances' using errcode = '42501';
  end if;
  select count(*) into before from public.contribution_remittances;
  for r in
    select n.client_id, n.agency, m::date as month
    from public.client_employer_numbers n
    join public.clients c on c.id = n.client_id and c.status in ('onboarding', 'active')
    cross join lateral generate_series(greatest(n.start_month, first_month), least(coalesce(n.end_month, this_month), this_month), interval '1 month') m
    where auth.uid() is null or private.can_access_client(n.client_id)
  loop
    perform private.add_remittance(r.client_id, r.agency, r.month);
  end loop;
  select count(*) into after from public.contribution_remittances;
  return after - before;
end;
$$;

/** Staff on the client add one month's remittance by hand: an SSS or Pag-IBIG loan, or an earlier month. */
create or replace function public.add_contribution_remittance(p_client uuid, p_kind text, p_month date) returns uuid
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client add its remittances' using errcode = '42501';
  end if;
  if p_kind not in ('sss', 'philhealth', 'pagibig', 'sss_loan', 'pagibig_loan') then raise exception 'Choose what is remitted' using errcode = '22023'; end if;
  if p_month is null or extract(day from p_month) <> 1 then raise exception 'Choose the month' using errcode = '22023'; end if;
  if p_month > date_trunc('month', private.manila_today()) then raise exception 'That month has not started' using errcode = '22023'; end if;
  return private.add_remittance(p_client, p_kind, p_month);
end;
$$;

/** Staff on the client (the Owner too) enter or change an agency's employer number. */
create or replace function public.set_employer_number(
  p_client uuid, p_agency text, p_number text, p_start date, p_end date default null, p_registered_name text default null
) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client change its employer numbers' using errcode = '42501';
  end if;
  if p_agency not in ('sss', 'philhealth', 'pagibig') then raise exception 'Choose the agency' using errcode = '22023'; end if;
  if coalesce(btrim(p_number), '') = '' then raise exception 'Enter the employer number' using errcode = '22023'; end if;
  if p_start is null or extract(day from p_start) <> 1 then raise exception 'Enter the first month with employees' using errcode = '22023'; end if;
  if p_end is not null and (extract(day from p_end) <> 1 or p_end < p_start) then raise exception 'The last month is on or after the first' using errcode = '22023'; end if;
  insert into public.client_employer_numbers (client_id, agency, employer_number, registered_name, start_month, end_month)
  values (p_client, p_agency, btrim(p_number), nullif(btrim(coalesce(p_registered_name, '')), ''), p_start, p_end)
  on conflict (client_id, agency) do update
    set employer_number = excluded.employer_number, registered_name = excluded.registered_name,
        start_month = excluded.start_month, end_month = excluded.end_month;
  -- Deadlines of months not yet remitted follow the number and name.
  update public.contribution_remittances r
  set statutory_due_date = d.due, due_date = private.remittance_working_day(d.due)
  from (
    select r2.id, private.remittance_statutory_due(r2.kind, r2.period_month, btrim(p_number),
             coalesce(nullif(btrim(coalesce(p_registered_name, '')), ''), (select name from public.clients where id = p_client))) as due
    from public.contribution_remittances r2
    where r2.client_id = p_client and r2.status in ('not_started', 'prepared')
      and case r2.kind when 'sss_loan' then 'sss' when 'pagibig_loan' then 'pagibig' else r2.kind end = p_agency
  ) d
  -- A due date staff changed by hand stays.
  where r.id = d.id and r.due_date = private.remittance_working_day(r.statutory_due_date) and r.statutory_due_date <> d.due;
end;
$$;

-- ---------------------------------------------------------------------------
-- The steps.
-- ---------------------------------------------------------------------------
create or replace function private.remittance_for_change(p_id uuid) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances;
begin
  select * into r from public.contribution_remittances where id = p_id for update;
  if r.id is null or not (private.is_staff() and private.can_access_client(r.client_id)) then
    raise exception 'Remittance not found' using errcode = 'P0002';
  end if;
  return r;
end;
$$;

create or replace function private.remittance_label(r public.contribution_remittances) returns text
language sql immutable set search_path = '' as $$
  select case r.kind
    when 'sss' then 'SSS contributions' when 'philhealth' then 'PhilHealth contributions' when 'pagibig' then 'Pag-IBIG contributions'
    when 'sss_loan' then 'SSS loan payments' else 'Pag-IBIG loan payments' end
    || ', ' || to_char(r.period_month, 'FMMonth YYYY')
$$;

/**
 * Staff on the client prepare a remittance: the shares, headcount and PRN, with the
 * contribution report attached. A remittance already prepared may be prepared again.
 */
create or replace function public.prepare_contribution_remittance(
  p_id uuid, p_ee numeric, p_er numeric, p_ec numeric, p_employees int, p_prn text, p_due date default null
) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances := private.remittance_for_change(p_id);
  c text;
begin
  if not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client prepare its remittances' using errcode = '42501';
  end if;
  if r.status not in ('not_started', 'prepared', 'not_required') then
    raise exception 'This remittance is already approved' using errcode = '22023';
  end if;
  if coalesce(p_ee, 0) < 0 or coalesce(p_er, 0) < 0 or coalesce(p_ec, 0) < 0 then raise exception 'Shares are not negative' using errcode = '22023'; end if;
  if round(coalesce(p_ee, 0), 2) <> coalesce(p_ee, 0) or round(coalesce(p_er, 0), 2) <> coalesce(p_er, 0) or round(coalesce(p_ec, 0), 2) <> coalesce(p_ec, 0) then
    raise exception 'Use at most two decimals' using errcode = '22023';
  end if;
  if r.kind <> 'sss' and coalesce(p_ec, 0) <> 0 then raise exception 'EC is paid with SSS contributions only' using errcode = '22023'; end if;
  if r.kind in ('sss_loan', 'pagibig_loan') and coalesce(p_er, 0) <> 0 then raise exception 'A loan has payments only, no employer share' using errcode = '22023'; end if;
  if coalesce(p_ee, 0) + coalesce(p_er, 0) + coalesce(p_ec, 0) <= 0 then
    raise exception 'Enter the amounts. With no employees this month, mark it Not required instead' using errcode = '22023';
  end if;
  if p_employees is not null and p_employees < 0 then raise exception 'The headcount is not negative' using errcode = '22023'; end if;
  if coalesce(btrim(p_prn), '') = '' then raise exception 'Enter the PRN (payment reference number)' using errcode = '22023'; end if;
  if length(btrim(p_prn)) > 60 then raise exception 'The PRN is too long' using errcode = '22023'; end if;
  if not exists (select 1 from public.contribution_remittance_files f where f.remittance_id = r.id and f.kind = 'report') then
    raise exception 'Attach the contribution report first' using errcode = '22023';
  end if;
  update public.contribution_remittances
  set ee_share = coalesce(p_ee, 0), er_share = coalesce(p_er, 0), ec_share = coalesce(p_ec, 0), employees = p_employees,
      prn = btrim(p_prn), due_date = coalesce(p_due, due_date), status = 'prepared', note = null,
      prepared_by = auth.uid(), prepared_at = now()
  where id = r.id returning * into r;
  select name into c from public.clients where id = r.client_id;
  perform private.notify(private.owner_ids(), 'remittance_ready_for_approval',
    c || ': ' || private.remittance_label(r) || ' is ready for approval',
    '₱' || to_char(r.total, 'FM999,999,990.00') || ' due ' || to_char(r.due_date, 'FMMon FMDD'),
    '/app/remittances/' || r.id, r.client_id);
  return r;
end;
$$;

/** Staff on the client mark a month Not required (e.g. no employees), with the reason. */
create or replace function public.skip_contribution_remittance(p_id uuid, p_note text) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances := private.remittance_for_change(p_id);
begin
  if not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client change its remittances' using errcode = '42501';
  end if;
  if r.status not in ('not_started', 'prepared') then raise exception 'This remittance is already approved' using errcode = '22023'; end if;
  if coalesce(btrim(p_note), '') = '' then raise exception 'Say why nothing is remitted this month' using errcode = '22023'; end if;
  update public.contribution_remittances
  set status = 'not_required', note = left(btrim(p_note), 500), prn = null, ee_share = 0, er_share = 0, ec_share = 0
  where id = r.id returning * into r;
  return r;
end;
$$;

/**
 * The Owner approves a prepared remittance. When the firm remits for the client, the
 * total goes on the client's next statement as a contribution item (an unbilled item
 * already entered by hand for the same agency and month is used instead).
 */
create or replace function public.approve_contribution_remittance(p_id uuid) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances;
  c public.clients;
  d public.client_dues;
  label text;
begin
  perform private.require_owner();
  r := private.remittance_for_change(p_id);
  if r.status <> 'prepared' then raise exception 'Only a prepared remittance is approved' using errcode = '22023'; end if;
  select * into c from public.clients where id = r.client_id;
  label := private.remittance_label(r);
  if c.payment_mode = 'firm_remits' then
    select * into d from public.client_dues x
    where x.client_id = r.client_id and x.kind = 'contribution' and x.contribution = r.kind and x.description = label
      and x.soa_id is null and x.waived_at is null and x.remitted_on is null
      and not exists (select 1 from public.contribution_remittances y where y.due_id = x.id)
    order by x.created_at limit 1;
    if d.id is not null then
      update public.client_dues set amount = r.total, due_on = r.due_date where id = d.id;
    else
      insert into public.client_dues (client_id, kind, description, amount, due_on, created_by, contribution)
      values (r.client_id, 'contribution', label, r.total, r.due_date, auth.uid(), r.kind)
      returning * into d;
    end if;
  end if;
  update public.contribution_remittances
  set status = 'approved', approved_by = auth.uid(), approved_at = now(), due_id = d.id
  where id = r.id returning * into r;
  return r;
end;
$$;

/**
 * Records that the remittance was paid to the agency, with the proof of payment attached.
 * When the firm remits, only the Owner records it, and the statement item is marked
 * remitted; when the client pays the agency, staff on the client record it.
 */
create or replace function public.remit_contribution_remittance(p_id uuid, p_paid_on date, p_reference text) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances := private.remittance_for_change(p_id);
  c public.clients;
begin
  select * into c from public.clients where id = r.client_id;
  if c.payment_mode = 'firm_remits' or r.due_id is not null then
    perform private.require_owner();
  elsif not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client record its remittances' using errcode = '42501';
  end if;
  if r.status <> 'approved' then raise exception 'Approve the remittance before recording it paid' using errcode = '22023'; end if;
  if p_paid_on is null then raise exception 'Enter the date it was paid' using errcode = '22023'; end if;
  if p_paid_on > private.manila_today() then raise exception 'The date paid cannot be in the future' using errcode = '22023'; end if;
  if length(coalesce(p_reference, '')) > 100 then raise exception 'Keep the reference under 100 characters' using errcode = '22023'; end if;
  if not exists (select 1 from public.contribution_remittance_files f where f.remittance_id = r.id and f.kind = 'proof') then
    raise exception 'Attach the proof of payment first' using errcode = '22023';
  end if;
  update public.contribution_remittances
  set status = 'remitted', remitted_on = p_paid_on, remit_reference = nullif(btrim(coalesce(p_reference, '')), ''), remitted_by = auth.uid()
  where id = r.id returning * into r;
  if r.due_id is not null then
    update public.client_dues
    set remitted_on = p_paid_on, remit_reference = coalesce(r.remit_reference, r.prn), remitted_by = auth.uid()
    where id = r.due_id and remitted_on is null;
  end if;
  perform private.notify(private.client_portal_ids(r.client_id), 'remittance_remitted',
    private.remittance_label(r) || ' was paid', 'Paid ' || to_char(p_paid_on, 'FMMon FMDD, YYYY') || coalesce(' · ' || r.remit_reference, ''),
    '/portal/remittances', r.client_id);
  return r;
end;
$$;

/**
 * The Owner takes a step back: remitted → approved (the statement item is held again),
 * approved → prepared (the statement item comes off, if it is not on a statement yet),
 * not required → not started.
 */
create or replace function public.reopen_contribution_remittance(p_id uuid) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances;
  d public.client_dues;
begin
  perform private.require_owner();
  r := private.remittance_for_change(p_id);
  if r.status = 'remitted' then
    update public.contribution_remittances set status = 'approved', remitted_on = null, remit_reference = null, remitted_by = null
    where id = r.id returning * into r;
    if r.due_id is not null then
      update public.client_dues set remitted_on = null, remit_reference = null, remitted_by = null where id = r.due_id;
    end if;
  elsif r.status = 'approved' then
    if r.due_id is not null then
      select * into d from public.client_dues where id = r.due_id;
      if d.soa_id is not null or exists (select 1 from public.payment_allocations a where a.due_id = d.id) then
        raise exception 'The amount is already on a statement. Waive or adjust the statement item from Collections instead' using errcode = '22023';
      end if;
    end if;
    update public.contribution_remittances set status = 'prepared', approved_by = null, approved_at = null, due_id = null
    where id = r.id returning * into r;
    if d.id is not null then delete from public.client_dues where id = d.id; end if;
  elsif r.status = 'not_required' then
    update public.contribution_remittances set status = 'not_started', note = null where id = r.id returning * into r;
  else
    raise exception 'Nothing to undo' using errcode = '22023';
  end if;
  return r;
end;
$$;

/** Staff on the client change the due date of a remittance not yet remitted (e.g. an agency advisory). */
create or replace function public.set_remittance_due_date(p_id uuid, p_due date) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances := private.remittance_for_change(p_id);
begin
  if not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client change its remittances' using errcode = '42501';
  end if;
  if r.status in ('remitted', 'not_required') then raise exception 'This remittance is closed' using errcode = '22023'; end if;
  if p_due is null then raise exception 'Enter the due date' using errcode = '22023'; end if;
  update public.contribution_remittances set due_date = p_due where id = r.id returning * into r;
  if r.due_id is not null then update public.client_dues set due_on = p_due where id = r.due_id and soa_id is null; end if;
  return r;
end;
$$;

-- ---------------------------------------------------------------------------
-- Files.
-- ---------------------------------------------------------------------------
/** Records a file staff uploaded to a remittance: the report, the PRN statement or the proof of payment. */
create or replace function public.add_remittance_file(
  p_remittance uuid, p_kind text, p_path text, p_file_name text, p_mime text, p_size bigint
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances := private.remittance_for_change(p_remittance);
  v_id uuid;
begin
  if not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client attach files to its remittances' using errcode = '42501';
  end if;
  if p_kind not in ('report', 'prn', 'proof') then raise exception 'Unknown kind of file' using errcode = '22023'; end if;
  if r.status = 'remitted' then raise exception 'This remittance is closed' using errcode = '22023'; end if;
  if p_kind = 'proof' and r.status <> 'approved' then raise exception 'Attach the proof of payment once the remittance is approved' using errcode = '22023'; end if;
  if p_path is null or p_path not like r.client_id::text || '/' || r.id::text || '/%' then
    raise exception 'The file is not in this remittance''s folder' using errcode = '22023';
  end if;
  if not exists (select 1 from storage.objects o where o.bucket_id = 'remittance-files' and o.name = p_path) then
    raise exception 'The file has not been uploaded' using errcode = '22023';
  end if;
  if coalesce(p_size, 0) <= 0 then raise exception 'The file is empty' using errcode = '22023'; end if;
  insert into public.contribution_remittance_files (remittance_id, client_id, kind, file_name, mime_type, size_bytes, storage_path)
  values (r.id, r.client_id, p_kind, coalesce(nullif(btrim(p_file_name), ''), 'file'), coalesce(nullif(p_mime, ''), 'application/octet-stream'), p_size, p_path)
  returning id into v_id;
  return v_id;
end;
$$;

/** Takes a file off a remittance that is not yet remitted (the stored copy is kept). */
create or replace function public.remove_remittance_file(p_file uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  f public.contribution_remittance_files;
  r public.contribution_remittances;
begin
  select * into f from public.contribution_remittance_files where id = p_file;
  if f.id is null then raise exception 'File not found' using errcode = 'P0002'; end if;
  r := private.remittance_for_change(f.remittance_id);
  if not private.can_keep_books(r.client_id) then raise exception 'Only the Owner or staff assigned to this client remove its files' using errcode = '42501'; end if;
  if r.status = 'remitted' then raise exception 'This remittance is closed' using errcode = '22023'; end if;
  if f.kind = 'report' and r.status in ('prepared', 'approved')
     and not exists (select 1 from public.contribution_remittance_files x where x.remittance_id = r.id and x.kind = 'report' and x.id <> f.id) then
    raise exception 'A prepared remittance keeps its contribution report: attach the corrected one first' using errcode = '22023';
  end if;
  delete from public.contribution_remittance_files where id = f.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Notifications.
-- ---------------------------------------------------------------------------
alter table public.notifications drop constraint notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check check (kind in (
  'return_ready_for_review', 'return_for_client_approval', 'return_ready_for_approval', 'return_sent_back',
  'return_client_query', 'return_query_answered', 'return_approved', 'return_filed', 'esubmission_result',
  'unlock_requested', 'unlock_decided',
  'payment_proof_submitted', 'payment_verified', 'payment_rejected', 'statement_issued',
  'request_from_firm', 'request_from_client', 'request_assigned', 'task_assigned',
  'remittance_ready_for_approval', 'remittance_remitted',
  'lead_new', 'discovery_call_booked', 'client_meeting_booked'
));

revoke execute on function private.remittance_working_day(date) from public, anon, authenticated;
revoke execute on function private.remittance_statutory_due(text, date, text, text) from public, anon, authenticated;
revoke execute on function private.add_remittance(uuid, text, date) from public, anon, authenticated;
revoke execute on function private.remittance_for_change(uuid) from public, anon, authenticated;
revoke execute on function private.remittance_label(public.contribution_remittances) from public, anon, authenticated;
revoke execute on function public.generate_contribution_remittances(date) from public, anon;
revoke execute on function public.add_contribution_remittance(uuid, text, date) from public, anon;
revoke execute on function public.set_employer_number(uuid, text, text, date, date, text) from public, anon;
revoke execute on function public.prepare_contribution_remittance(uuid, numeric, numeric, numeric, int, text, date) from public, anon;
revoke execute on function public.skip_contribution_remittance(uuid, text) from public, anon;
revoke execute on function public.approve_contribution_remittance(uuid) from public, anon;
revoke execute on function public.remit_contribution_remittance(uuid, date, text) from public, anon;
revoke execute on function public.reopen_contribution_remittance(uuid) from public, anon;
revoke execute on function public.set_remittance_due_date(uuid, date) from public, anon;
revoke execute on function public.add_remittance_file(uuid, text, text, text, text, bigint) from public, anon;
revoke execute on function public.remove_remittance_file(uuid) from public, anon;
grant execute on function public.generate_contribution_remittances(date) to authenticated, service_role;
grant execute on function public.add_contribution_remittance(uuid, text, date) to authenticated;
grant execute on function public.set_employer_number(uuid, text, text, date, date, text) to authenticated;
grant execute on function public.prepare_contribution_remittance(uuid, numeric, numeric, numeric, int, text, date) to authenticated;
grant execute on function public.skip_contribution_remittance(uuid, text) to authenticated;
grant execute on function public.approve_contribution_remittance(uuid) to authenticated;
grant execute on function public.remit_contribution_remittance(uuid, date, text) to authenticated;
grant execute on function public.reopen_contribution_remittance(uuid) to authenticated;
grant execute on function public.set_remittance_due_date(uuid, date) to authenticated;
grant execute on function public.add_remittance_file(uuid, text, text, text, text, bigint) to authenticated;
grant execute on function public.remove_remittance_file(uuid) to authenticated;
