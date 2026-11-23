-- Collections & Statement of Account (spec §3.9; Q24–Q27, Q31, Q32).
--
-- What a client owes is a list of dues: the monthly retainer, the tax due on a
-- return the firm remits for the client (firm-remits clients only), SSS /
-- PhilHealth / Pag-IBIG contributions the firm remits, and one-off charges.
-- What a client pays is a deposit, which the Owner matches to dues by hand
-- (Q24). Part of a due can stay open (Q31); the part of a deposit not matched to
-- any due is the client's credit, used up oldest-due-first on the next statement.
--
-- Billing runs on each client's billing days (usually the 10th and the 20th, or
-- once a month). A run issues a statement (SOA) with everything ready to bill
-- that is not billed yet: withholding and VAT returns once reviewed,
-- contributions entered, and the month's retainer on the month's first
-- statement. Nothing new to bill means no statement. Each statement has a unique
-- payment reference, e.g. TC-0042-2026-11-10. The nightly job runs the day's
-- billing; the Owner can also run it by hand.
--
-- Only the Owner sees and changes money (Collections is Owner-only, Q31); a
-- client user sees their own business. Every change goes through a function
-- below and into the audit log.

-- Where clients pay: each bank or e-wallet account can carry its QR code and a
-- line of instructions, shown on the statement under "Pay now".
alter table public.brand_payment_accounts
  add column qr_path text,
  add column instructions text,
  add column sort_order smallint not null default 0;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payment-qr', 'payment-qr', false, 2097152, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do nothing;

-- Payment QR codes are meant to be shared: anyone signed in may view them; only the Owner changes them.
create policy payment_qr_read on storage.objects for select to authenticated using (bucket_id = 'payment-qr');
create policy payment_qr_insert on storage.objects for insert to authenticated with check (bucket_id = 'payment-qr' and private.is_owner());
create policy payment_qr_update on storage.objects for update to authenticated using (bucket_id = 'payment-qr' and private.is_owner());
create policy payment_qr_delete on storage.objects for delete to authenticated using (bucket_id = 'payment-qr' and private.is_owner());

-- Days of the month this client is billed (1–28), e.g. {10,20} or {10}.
alter table public.clients
  add column billing_days smallint[] not null default '{10,20}'
    check (cardinality(billing_days) between 1 and 4 and 1 <= all (billing_days) and 28 >= all (billing_days));

-- A statement is payable this many days after it is issued (Owner setting).
alter table public.brands
  add column soa_payment_days smallint not null default 5 check (soa_payment_days between 0 and 31);

create table public.soas (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  billing_date date not null,
  reference text not null unique,
  due_on date not null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (client_id, billing_date)
);

create table public.client_dues (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  soa_id uuid references public.soas (id),
  kind text not null check (kind in ('retainer', 'tax', 'contribution', 'other')),
  description text not null check (length(trim(description)) > 0),
  amount numeric(18, 2) not null check (amount > 0),
  due_on date not null,
  -- The month a retainer is for.
  period_month date check (period_month is null or extract(day from period_month) = 1),
  -- The return a tax due is for (firm-remits clients, Q23/Q32).
  filing_instance_id uuid unique references public.filing_instances (id),
  waived_at timestamptz,
  waived_by uuid references auth.users (id),
  waive_reason text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  check ((kind = 'tax') = (filing_instance_id is not null)),
  check ((kind = 'retainer') = (period_month is not null)),
  check ((waived_at is null) = (waive_reason is null))
);

create unique index client_dues_one_retainer_per_month on public.client_dues (client_id, period_month) where kind = 'retainer';
create index client_dues_client_idx on public.client_dues (client_id, due_on);

create table public.client_deposits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  received_on date not null,
  amount numeric(18, 2) not null check (amount > 0),
  payment_account_id uuid references public.brand_payment_accounts (id),
  reference text,
  -- How the money came: fund transfer, check, e-wallet, or cash (which staff deposit to the bank).
  method text not null default 'transfer' check (method in ('transfer', 'check', 'ewallet', 'cash')),
  -- For cash: the staff member who deposited it.
  deposited_by uuid references auth.users (id),
  -- Q27: the firm's BIR invoice is issued by hand from the registered booklet; the number is recorded here.
  bir_invoice_number text,
  note text,
  voided_at timestamptz,
  voided_by uuid references auth.users (id),
  void_reason text,
  recorded_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  check ((voided_at is null) = (void_reason is null))
);

create index client_deposits_client_idx on public.client_deposits (client_id, received_on);

create table public.payment_allocations (
  id bigint generated always as identity primary key,
  deposit_id uuid not null references public.client_deposits (id) on delete cascade,
  due_id uuid not null references public.client_dues (id) on delete cascade,
  amount numeric(18, 2) not null check (amount > 0),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create index payment_allocations_due_idx on public.payment_allocations (due_id);
create index payment_allocations_deposit_idx on public.payment_allocations (deposit_id);

-- What is paid and still open on each due, and what is unused on each deposit.
-- security_invoker: the views see only the rows the reader's policies allow.
create view public.due_balances with (security_invoker = true) as
select
  d.*,
  coalesce(p.paid, 0)::numeric(18, 2) as paid,
  (case when d.waived_at is not null then 0 else d.amount - coalesce(p.paid, 0) end)::numeric(18, 2) as open_amount
from public.client_dues d
left join (select due_id, sum(amount) as paid from public.payment_allocations group by due_id) p on p.due_id = d.id;

create view public.deposit_balances with (security_invoker = true) as
select
  dep.*,
  coalesce(a.used, 0)::numeric(18, 2) as allocated,
  (case when dep.voided_at is not null then 0 else dep.amount - coalesce(a.used, 0) end)::numeric(18, 2) as unallocated
from public.client_deposits dep
left join (select deposit_id, sum(amount) as used from public.payment_allocations group by deposit_id) a on a.deposit_id = dep.id;

do $$
declare t text;
begin
  foreach t in array array['soas', 'client_dues', 'client_deposits', 'payment_allocations'] loop
    execute format('create trigger audit after insert or update or delete on public.%I for each row execute function private.audit()', t);
  end loop;
end;
$$;

-- Read access only; every write goes through the functions below.
alter table public.soas enable row level security;
alter table public.client_dues enable row level security;
alter table public.client_deposits enable row level security;
alter table public.payment_allocations enable row level security;

create policy soas_read on public.soas for select to authenticated using (private.is_owner() or private.is_client_user(client_id));
create policy dues_read on public.client_dues for select to authenticated using (private.is_owner() or private.is_client_user(client_id));
create policy deposits_read on public.client_deposits for select to authenticated using (private.is_owner() or private.is_client_user(client_id));
create policy allocations_read on public.payment_allocations for select to authenticated using (
  exists (select 1 from public.client_deposits d where d.id = deposit_id and (private.is_owner() or private.is_client_user(d.client_id)))
);

-- ---------------------------------------------------------------------------
-- Helpers.
-- ---------------------------------------------------------------------------
create or replace function private.manila_today() returns date
language sql stable set search_path = '' as $$
  select (now() at time zone 'Asia/Manila')::date
$$;

create or replace function private.require_owner() returns void
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can manage collections' using errcode = '42501';
  end if;
end;
$$;

-- Uses the client's unmatched deposits on its open dues, oldest due first. Returns the amount applied.
create or replace function private.apply_credit(p_client uuid) returns numeric
language plpgsql security definer set search_path = '' as $$
declare
  due record;
  dep record;
  take numeric(18, 2);
  need numeric(18, 2);
  applied numeric(18, 2) := 0;
begin
  for due in
    select id, open_amount from public.due_balances
    where client_id = p_client and open_amount > 0
    order by due_on, created_at, id
  loop
    need := due.open_amount;
    for dep in
      select id, unallocated from public.deposit_balances
      where client_id = p_client and unallocated > 0
      order by received_on, created_at, id
    loop
      exit when need <= 0;
      take := least(need, dep.unallocated);
      insert into public.payment_allocations (deposit_id, due_id, amount, created_by) values (dep.id, due.id, take, auth.uid());
      need := need - take;
      applied := applied + take;
    end loop;
  end loop;
  return applied;
end;
$$;

-- One billing run for one client on one date. Issues (or tops up) that day's
-- statement with everything ready to bill, then applies any credit.
-- Returns true when the statement was created or changed.
create or replace function private.bill_client(p_client uuid, p_billing_date date) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  c record;
  m date := date_trunc('month', p_billing_date)::date;
  m_end date := (date_trunc('month', p_billing_date) + interval '1 month - 1 day')::date;
  s public.soas;
  retainer numeric(18, 2);
  retainer_billed boolean;
  changed integer := 0;
  n integer;
begin
  select cl.id, cl.code, cl.payment_mode, b.soa_payment_days into c
    from public.clients cl join public.brands b on b.id = cl.brand_id
    where cl.id = p_client;
  if c.id is null then raise exception 'Client not found' using errcode = 'P0002'; end if;

  select coalesce(sum(monthly_retainer), 0) into retainer from public.engagements
    where client_id = c.id and status = 'active' and start_date <= m_end and (end_date is null or end_date >= m);
  retainer_billed := exists (select 1 from public.client_dues where client_id = c.id and kind = 'retainer' and period_month = m);

  if c.payment_mode = 'firm_remits' then
    -- A return re-prepared with a different tax due updates its due, if no more than that is paid.
    update public.client_dues d set amount = f.tax_due
      from public.filing_instances f, public.due_balances b
      where d.filing_instance_id = f.id and b.id = d.id and d.client_id = c.id and d.waived_at is null
        and f.tax_due > 0 and d.amount <> f.tax_due and f.tax_due >= b.paid;
    get diagnostics n = row_count;
    changed := changed + n;
  end if;

  select * into s from public.soas where client_id = c.id and billing_date = p_billing_date;
  -- A statement only when there is something on it.
  if s.id is null and (
    (retainer > 0 and not retainer_billed)
    or exists (select 1 from public.client_dues d where d.client_id = c.id and d.soa_id is null and d.waived_at is null)
    or (c.payment_mode = 'firm_remits' and exists (
      select 1 from public.filing_instances f
      where f.client_id = c.id and coalesce(f.tax_due, 0) > 0
        and f.status in ('reviewed', 'client_approved', 'owner_approved', 'filed', 'paid', 'proof_uploaded')
        and not exists (select 1 from public.client_dues d where d.filing_instance_id = f.id)))
  ) then
    insert into public.soas (client_id, billing_date, reference, due_on, created_by)
    values (c.id, p_billing_date, c.code || '-' || to_char(p_billing_date, 'YYYY-MM-DD'), p_billing_date + c.soa_payment_days, auth.uid())
    returning * into s;
    changed := changed + 1;
  end if;
  if s.id is null then
    return changed > 0;
  end if;

  -- The month's retainer goes on the month's first statement.
  if retainer > 0 and not retainer_billed then
    insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, period_month, created_by)
    values (c.id, s.id, 'retainer', 'Monthly retainer, ' || trim(to_char(m, 'FMMonth YYYY')), retainer, s.due_on, m, auth.uid());
    changed := changed + 1;
  end if;

  if c.payment_mode = 'firm_remits' then
    insert into public.client_dues (client_id, soa_id, kind, description, amount, due_on, filing_instance_id, created_by)
    select c.id, s.id, 'tax', 'Tax due, ' || f.form || ' ' || f.period_label, f.tax_due, f.due_date, f.id, auth.uid()
    from public.filing_instances f
    where f.client_id = c.id and coalesce(f.tax_due, 0) > 0
      and f.status in ('reviewed', 'client_approved', 'owner_approved', 'filed', 'paid', 'proof_uploaded')
      and not exists (select 1 from public.client_dues d where d.filing_instance_id = f.id);
    get diagnostics n = row_count;
    changed := changed + n;
  end if;

  -- Contributions and other charges entered since the last statement.
  update public.client_dues set soa_id = s.id where client_id = c.id and soa_id is null and waived_at is null;
  get diagnostics n = row_count;
  changed := changed + n;

  if private.apply_credit(c.id) > 0 then changed := changed + 1; end if;
  return changed > 0;
end;
$$;

-- The day's scheduled run: every active client whose billing days include this day.
create or replace function private.run_billing(p_billing_date date) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  c record;
  touched integer := 0;
begin
  for c in
    select id from public.clients
    where status in ('onboarding', 'active') and extract(day from p_billing_date)::smallint = any (billing_days)
    order by code
  loop
    if private.bill_client(c.id, p_billing_date) then touched := touched + 1; end if;
  end loop;
  return touched;
end;
$$;

-- The payment check shown at the Owner's final approval (Q21, Q25): the tax due on
-- this return (when the firm remits it) and whatever else the client owes that is due.
create or replace function private.payment_check(p_filing uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  f public.filing_instances;
  mode text;
  tax_amount numeric(18, 2) := 0;
  tax_paid numeric(18, 2) := 0;
  tax_status text := 'not_applicable';
  other_open numeric(18, 2);
  status text;
begin
  select * into f from public.filing_instances where id = p_filing;
  select payment_mode into mode from public.clients where id = f.client_id;
  if mode = 'firm_remits' and coalesce(f.tax_due, 0) > 0 then
    tax_amount := f.tax_due;
    select coalesce(sum(paid), 0) into tax_paid from public.due_balances where filing_instance_id = f.id and waived_at is null;
    tax_status := case when tax_paid >= tax_amount then 'paid' when tax_paid > 0 then 'partial' else 'unpaid' end;
  end if;
  select coalesce(sum(open_amount), 0) into other_open from public.due_balances
    where client_id = f.client_id and kind <> 'tax' and open_amount > 0 and due_on <= private.manila_today();
  status := case
    when tax_status = 'unpaid' then 'unpaid'
    when tax_status = 'partial' or other_open > 0 then 'partial'
    when tax_status = 'paid' then 'paid'
    else 'not_applicable'
  end;
  return jsonb_build_object(
    'status', status,
    'tax_status', tax_status,
    'tax_due', tax_amount,
    'tax_paid', tax_paid,
    'other_open', other_open
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- Owner actions.
-- ---------------------------------------------------------------------------

-- Runs billing by hand: one client (any day), or every client scheduled on that day.
-- Returns the number of statements created or changed.
create or replace function public.run_billing(p_billing_date date, p_client uuid default null) returns integer
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if p_billing_date is null then raise exception 'Choose the billing date' using errcode = '22023'; end if;
  if p_client is not null then
    return case when private.bill_client(p_client, p_billing_date) then 1 else 0 end;
  end if;
  return private.run_billing(p_billing_date);
end;
$$;

-- The nightly job's entry point. Only the server (service role) can call it.
create or replace function public.run_scheduled_billing(p_billing_date date) returns integer
language plpgsql security definer set search_path = '' as $$
begin
  return private.run_billing(p_billing_date);
end;
$$;

create or replace function public.set_billing_days(p_client uuid, p_days smallint[]) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if cardinality(coalesce(p_days, '{}')) = 0 then raise exception 'Choose at least one billing day' using errcode = '22023'; end if;
  update public.clients set billing_days = (select array_agg(distinct d order by d) from unnest(p_days) d) where id = p_client;
  if not found then raise exception 'Client not found' using errcode = 'P0002'; end if;
end;
$$;

-- Records money received and matches it to the ticked dues, oldest first; any
-- remainder is the client's credit (Q31). Returns the deposit's id.
create or replace function public.record_deposit(
  p_client uuid,
  p_received_on date,
  p_amount numeric,
  p_payment_account uuid,
  p_reference text,
  p_bir_invoice_number text,
  p_note text,
  p_due_ids uuid[],
  p_method text default 'transfer',
  p_deposited_by uuid default null
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  dep_id uuid;
  left_over numeric(18, 2) := p_amount;
  due record;
  take numeric(18, 2);
begin
  perform private.require_owner();
  if p_amount is null or p_amount <= 0 then raise exception 'Enter the amount received' using errcode = '22023'; end if;
  if round(p_amount, 2) <> p_amount then raise exception 'Use at most two decimals' using errcode = '22023'; end if;
  if p_received_on is null then raise exception 'Enter the date the money was received' using errcode = '22023'; end if;
  if p_received_on > private.manila_today() then raise exception 'The date received cannot be in the future' using errcode = '22023'; end if;
  if not exists (select 1 from public.clients where id = p_client) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if coalesce(p_method, '') not in ('transfer', 'check', 'ewallet', 'cash') then raise exception 'Choose how the client paid' using errcode = '22023'; end if;
  if p_method = 'check' and nullif(trim(coalesce(p_reference, '')), '') is null then raise exception 'Enter the check number' using errcode = '22023'; end if;
  if p_method = 'cash' and p_deposited_by is null then raise exception 'Choose who deposited the cash' using errcode = '22023'; end if;
  if exists (
    select 1 from unnest(coalesce(p_due_ids, '{}')) as x(id)
    where not exists (select 1 from public.client_dues d where d.id = x.id and d.client_id = p_client)
  ) then
    raise exception 'A ticked item does not belong to this client' using errcode = '22023';
  end if;

  insert into public.client_deposits (client_id, received_on, amount, method, deposited_by, payment_account_id, reference, bir_invoice_number, note, recorded_by)
  values (p_client, p_received_on, p_amount, p_method, case when p_method = 'cash' then p_deposited_by end, p_payment_account,
          nullif(trim(p_reference), ''), nullif(trim(p_bir_invoice_number), ''), nullif(trim(p_note), ''), auth.uid())
  returning id into dep_id;

  for due in
    select id, open_amount from public.due_balances
    where id = any(coalesce(p_due_ids, '{}')) and open_amount > 0
    order by due_on, created_at, id
  loop
    exit when left_over <= 0;
    take := least(left_over, due.open_amount);
    insert into public.payment_allocations (deposit_id, due_id, amount, created_by) values (dep_id, due.id, take, auth.uid());
    left_over := left_over - take;
  end loop;
  return dep_id;
end;
$$;

-- Undoes a deposit recorded by mistake; what it paid becomes open again.
create or replace function public.void_deposit(p_deposit uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if nullif(trim(coalesce(p_reason, '')), '') is null then raise exception 'Say why the deposit is voided' using errcode = '22023'; end if;
  update public.client_deposits set voided_at = now(), voided_by = auth.uid(), void_reason = trim(p_reason)
    where id = p_deposit and voided_at is null;
  if not found then raise exception 'Deposit not found or already voided' using errcode = 'P0002'; end if;
  delete from public.payment_allocations where deposit_id = p_deposit;
end;
$$;

create or replace function public.apply_client_credit(p_client uuid) returns numeric
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  return private.apply_credit(p_client);
end;
$$;

-- A contribution (SSS, PhilHealth, Pag-IBIG) or a one-off charge (e.g. ORUS
-- registration, late-submission surcharge). It goes on the client's next statement.
create or replace function public.add_client_charge(p_client uuid, p_kind text, p_description text, p_amount numeric, p_due_on date) returns uuid
language plpgsql security definer set search_path = '' as $$
declare new_id uuid;
begin
  perform private.require_owner();
  if p_kind not in ('contribution', 'other') then raise exception 'Choose the kind of charge' using errcode = '22023'; end if;
  if nullif(trim(coalesce(p_description, '')), '') is null then raise exception 'Describe the charge' using errcode = '22023'; end if;
  if p_amount is null or p_amount <= 0 then raise exception 'Enter the amount' using errcode = '22023'; end if;
  if round(p_amount, 2) <> p_amount then raise exception 'Use at most two decimals' using errcode = '22023'; end if;
  if p_due_on is null then raise exception 'Enter the due date' using errcode = '22023'; end if;
  if not exists (select 1 from public.clients where id = p_client) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  insert into public.client_dues (client_id, kind, description, amount, due_on, created_by)
  values (p_client, p_kind, trim(p_description), p_amount, p_due_on, auth.uid())
  returning id into new_id;
  return new_id;
end;
$$;

-- Writes off what is still open on a due, with a reason. What was paid stays paid.
create or replace function public.waive_due(p_due uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.require_owner();
  if nullif(trim(coalesce(p_reason, '')), '') is null then raise exception 'Say why it is waived' using errcode = '22023'; end if;
  update public.client_dues set waived_at = now(), waived_by = auth.uid(), waive_reason = trim(p_reason)
    where id = p_due and waived_at is null;
  if not found then raise exception 'Item not found or already waived' using errcode = 'P0002'; end if;
end;
$$;

create or replace function public.filing_payment_check(p_filing uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.require_owner();
  return private.payment_check(p_filing);
end;
$$;

revoke execute on function public.run_billing(date, uuid) from public, anon;
revoke execute on function public.run_scheduled_billing(date) from public, anon, authenticated;
revoke execute on function public.set_billing_days(uuid, smallint[]) from public, anon;
revoke execute on function public.record_deposit(uuid, date, numeric, uuid, text, text, text, uuid[], text, uuid) from public, anon;
revoke execute on function public.void_deposit(uuid, text) from public, anon;
revoke execute on function public.apply_client_credit(uuid) from public, anon;
revoke execute on function public.add_client_charge(uuid, text, text, numeric, date) from public, anon;
revoke execute on function public.waive_due(uuid, text) from public, anon;
revoke execute on function public.filing_payment_check(uuid) from public, anon;
grant execute on function public.run_billing(date, uuid) to authenticated;
grant execute on function public.run_scheduled_billing(date) to service_role;
grant execute on function public.set_billing_days(uuid, smallint[]) to authenticated;
grant execute on function public.record_deposit(uuid, date, numeric, uuid, text, text, text, uuid[], text, uuid) to authenticated;
grant execute on function public.void_deposit(uuid, text) to authenticated;
grant execute on function public.apply_client_credit(uuid) to authenticated;
grant execute on function public.add_client_charge(uuid, text, text, numeric, date) to authenticated;
grant execute on function public.waive_due(uuid, text) to authenticated;
grant execute on function public.filing_payment_check(uuid) to authenticated;
revoke execute on function private.apply_credit(uuid) from public, anon, authenticated;
revoke execute on function private.bill_client(uuid, date) from public, anon, authenticated;
revoke execute on function private.run_billing(date) from public, anon, authenticated;
revoke execute on function private.payment_check(uuid) from public, anon, authenticated;
revoke execute on function private.require_owner() from public, anon;
grant execute on function private.require_owner() to authenticated;
revoke execute on function private.manila_today() from public, anon;
grant execute on function private.manila_today() to authenticated;
-- ---------------------------------------------------------------------------
-- Sign-off chain: the Owner's approval now records the payment check computed
-- from Collections instead of a value typed into the form. Unchanged otherwise.
-- ---------------------------------------------------------------------------
create or replace function public.advance_filing(
  p_filing uuid,
  p_action text,
  p_note text default null,
  p_data jsonb default '{}'::jsonb
) returns public.filing_instances
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  owner boolean := private.is_owner();
  note text := nullif(trim(coalesce(p_note, '')), '');
  data jsonb := coalesce(p_data, '{}'::jsonb);
  next_status text;
  prior_status text;
  preparer uuid;
begin
  select * into f from public.filing_instances where id = p_filing for update;
  if f.id is null then
    raise exception 'Filing not found' using errcode = 'P0002';
  end if;
  prior_status := f.status;
  if not private.can_access_client(f.client_id) then
    raise exception 'You do not have access to this client' using errcode = '42501';
  end if;

  if p_action = 'prepare' then
    if f.status <> 'not_started' then raise exception 'Only a return not yet started can be marked prepared' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can prepare the return' using errcode = '42501'; end if;
    if (data ->> 'tax_due') is null then raise exception 'Enter the tax due on the return (0 if none)' using errcode = '22023'; end if;
    update public.filing_instances set tax_due = (data ->> 'tax_due')::numeric where id = f.id;
    next_status := 'prepared';

  elsif p_action = 'review' then
    if f.status <> 'prepared' then raise exception 'Only a prepared return can be reviewed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id, 'reviewer')) then raise exception 'Only the client''s reviewer or the Owner can review' using errcode = '42501'; end if;
    -- Nobody reviews their own work, except the Owner (who signs off last anyway).
    select actor into preparer from public.filing_events
      where filing_instance_id = f.id and action = 'prepare' order by created_at desc, id desc limit 1;
    if not owner and preparer = auth.uid() then raise exception 'You prepared this return; another person must review it' using errcode = '42501'; end if;
    next_status := 'reviewed';

  elsif p_action = 'kick_back' then
    if f.status not in ('prepared', 'reviewed') then raise exception 'Only a prepared or reviewed return can be sent back' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id, 'reviewer')) then raise exception 'Only the client''s reviewer or the Owner can send a return back' using errcode = '42501'; end if;
    if note is null then raise exception 'Say what needs fixing' using errcode = '22023'; end if;
    next_status := 'not_started';

  elsif p_action = 'client_approve' then
    if f.status <> 'reviewed' then raise exception 'Only a reviewed return can be approved by the client' using errcode = '22023'; end if;
    if private.is_client_user(f.client_id) then
      null;
    elsif owner then
      if note is null then raise exception 'Note how the client approved (e.g. email of 12 Jan)' using errcode = '22023'; end if;
    else
      raise exception 'Only the client (or the Owner on their behalf) can approve' using errcode = '42501';
    end if;
    update public.filing_instances set open_query = null where id = f.id;
    next_status := 'client_approved';

  elsif p_action = 'client_query' then
    if f.status <> 'reviewed' then raise exception 'You can ask about a return while it waits for your approval' using errcode = '22023'; end if;
    if not private.is_client_user(f.client_id) then raise exception 'Only the client can send a query' using errcode = '42501'; end if;
    if note is null then raise exception 'Write your question' using errcode = '22023'; end if;
    update public.filing_instances set open_query = note where id = f.id;
    next_status := f.status;

  elsif p_action = 'answer_query' then
    if f.open_query is null then raise exception 'There is no open query' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can answer' using errcode = '42501'; end if;
    if note is null then raise exception 'Write the answer' using errcode = '22023'; end if;
    update public.filing_instances set open_query = null where id = f.id;
    next_status := f.status;

  elsif p_action = 'owner_approve' then
    if f.status <> 'client_approved' then raise exception 'Only a client-approved return can get the final approval' using errcode = '22023'; end if;
    if not owner then raise exception 'Only the Owner gives the final approval' using errcode = '42501'; end if;
    -- The payment check comes from Collections (spec §3.9), not from the form, and is
    -- recorded with the step. A tax due not yet on a statement counts as unpaid.
    data := data || jsonb_build_object('payment_check', private.payment_check(f.id));
    data := data || jsonb_build_object('payment_status', data -> 'payment_check' ->> 'status');
    -- Approving without full payment is allowed for the Owner (Q25) but must be deliberate.
    if data ->> 'payment_status' in ('partial', 'unpaid') and coalesce((data ->> 'approve_unpaid')::boolean, false) is not true then
      raise exception 'Tick "approve even though unpaid" to approve an unpaid return' using errcode = '22023';
    end if;
    next_status := 'owner_approved';

  elsif p_action = 'file' then
    if f.status <> 'owner_approved' then raise exception 'Only an approved return can be filed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can record the filing' using errcode = '42501'; end if;
    if nullif(trim(coalesce(data ->> 'filing_reference', '')), '') is null or (data ->> 'filed_on') is null then
      raise exception 'Enter the filing reference and date' using errcode = '22023';
    end if;
    update public.filing_instances set filing_reference = trim(data ->> 'filing_reference'), filed_on = (data ->> 'filed_on')::date where id = f.id;
    next_status := 'filed';

  elsif p_action = 'pay' then
    if f.status <> 'filed' then raise exception 'Only a filed return can be marked paid' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can record the payment' using errcode = '42501'; end if;
    if coalesce(f.tax_due, 0) > 0 and (nullif(trim(coalesce(data ->> 'payment_reference', '')), '') is null or (data ->> 'paid_on') is null) then
      raise exception 'Enter the payment reference and date' using errcode = '22023';
    end if;
    update public.filing_instances
      set payment_reference = nullif(trim(coalesce(data ->> 'payment_reference', '')), ''), paid_on = (data ->> 'paid_on')::date
      where id = f.id;
    next_status := 'paid';

  elsif p_action = 'send_proof' then
    if f.status <> 'paid' then raise exception 'Only a paid return can be closed' using errcode = '22023'; end if;
    if not (owner or private.is_assigned(f.client_id)) then raise exception 'Only staff assigned to this client can close the return' using errcode = '42501'; end if;
    next_status := 'proof_uploaded';

  else
    raise exception 'Unknown action %', p_action using errcode = '22023';
  end if;

  update public.filing_instances set status = next_status where id = f.id returning * into f;
  insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
  values (f.id, prior_status, next_status, auth.uid(), note, p_action, data);
  return f;
end;
$$;
