-- Remittances from the payroll, tasks as jobs, and the books (Owner, 26 November 2026):
--
-- "For SSS, PHIC, HDMF, HDMF loans and SSS loans, the source is the payroll. Once the
-- payroll is submitted and posted, along with it is the employees list, who has been
-- deducted and paid with contribution ER + EC, and how much. For November the client
-- sends the payroll for the 15th and the 30th, we post it to the books, then we prepare
-- the 1601-C, and we also prepare the SSS, PHIC and HDMF remittances based on that
-- payroll, and then we bill the client."
--
-- 1. Payroll: EC (Employees' Compensation) is its own employer contribution category,
--    'sss_ec', credited to SSS Payable with the SSS shares; payroll_run's dues carry it
--    (dues.sss.ec). Clients with an SSS employer share item get an "SSS EC" item. Each
--    employee keeps their SSS, PhilHealth and Pag-IBIG numbers for the contribution lists.
--
-- 2. Remittances come from the posted payroll, for clients the firm handles SSS,
--    PhilHealth and Pag-IBIG for (clients.handles_contributions, set by the Owner).
--    Posting a payroll run (or reversing one) brings the month's remittances in line:
--    one per agency and kind with an amount (EE, ER and EC from every posted run of the
--    month, and the employees counted), added if missing. While not yet approved, a
--    remittance follows the payroll: a prepared one whose amounts change goes back to
--    Not started (its PRN was for the old amount). Staff no longer type amounts:
--    preparing takes the PRN, with the PRN generated on the agency's site attached.
--    The month's contribution list per employee is public.remittance_employees().
--    The nightly job and "Refresh from payroll" run the same sync for the last three months.
--
-- 3. Books: when a client that pays the agencies itself has paid (recorded remitted),
--    the payment posts in its cash disbursements book, as a return's tax due does at
--    Filed & paid: Dr SSS / PhilHealth / Pag-IBIG (loans) Payable, Cr Cash. Stepping
--    back from Remitted reverses it. Firm-remits clients post when their payment to the
--    firm is verified (unchanged, 20261212000004).
--
-- 4. Tasks are jobs with a workflow: Client → Preparer → Reviewer → Done.
--      Client    "Ask the client first" sends the client a request (its thread is the
--                client's task in the portal); the client's reply moves the task on.
--      Preparer  the assignee does the work and submits it (to the reviewer, if any,
--                else it is done). The preparer may ask the client again.
--      Reviewer  approves (done) or sends it back with a note.
--    A task may name its job from the active fee schedule (e.g. "ORUS and BIR registration
--    updates", ₱1,500) with the price, changeable. When the task is done the job goes on
--    the client's statement items, unbilled: it waits in Collections → Ready to bill for
--    the Owner's billing run (the Owner may waive it). Reopening a task takes an unbilled
--    job off again.
--
-- 5. Registration: a completed case is billed as one job from the fee schedule (new
--    business by taxpayer type, BIR update, branch, permit renewal, closure), plus the
--    SSS, PhilHealth and Pag-IBIG employer registrations when the case registers an
--    employer. A job without a price in the schedule becomes a task for the Owner to
--    price and bill.

-- ---------------------------------------------------------------------------
-- 1. Payroll: EC, and employees' agency numbers.
-- ---------------------------------------------------------------------------
alter table public.payroll_items drop constraint payroll_items_bir_category_check;
alter table public.payroll_items drop constraint payroll_items_check;
alter table public.payroll_items add constraint payroll_items_bir_category_check check (bir_category in (
  'basic', 'overtime', 'holiday', 'night_diff', 'hazard', 'thirteenth_month', 'de_minimis', 'other_taxable',
  'separation', 'commission', 'profit_share', 'director_fee',
  'withholding_tax', 'sss_ee', 'phic_ee', 'hdmf_ee', 'sss_er', 'sss_ec', 'phic_er', 'hdmf_er', 'sss_loan', 'hdmf_loan', 'none'
));
alter table public.payroll_items add constraint payroll_items_check check (
  (kind = 'earning' and bir_category in ('basic', 'overtime', 'holiday', 'night_diff', 'hazard', 'thirteenth_month', 'de_minimis', 'other_taxable', 'separation', 'commission', 'profit_share', 'director_fee'))
  or (kind = 'deduction' and bir_category in ('withholding_tax', 'sss_ee', 'phic_ee', 'hdmf_ee', 'sss_loan', 'hdmf_loan', 'none'))
  or (kind = 'employer_contribution' and bir_category in ('sss_er', 'sss_ec', 'phic_er', 'hdmf_er', 'none'))
);

insert into public.payroll_items (client_id, name, kind, bir_category, sort_order)
select i.client_id, 'SSS EC', 'employer_contribution', 'sss_ec', i.sort_order + 1
from public.payroll_items i
where i.bir_category = 'sss_er' and i.active
  and not exists (select 1 from public.payroll_items x where x.client_id = i.client_id and (x.bir_category = 'sss_ec' or lower(btrim(x.name)) = 'sss ec'))
  and i.id = (select min(y.id::text)::uuid from public.payroll_items y where y.client_id = i.client_id and y.bir_category = 'sss_er' and y.active);

-- New clients start with the EC item too.
create or replace function public.ensure_payroll_items(p_client uuid) returns int
language plpgsql set search_path = '' as $$
declare
  n int;
begin
  if not private.can_payroll(p_client) then
    raise exception 'Only the Owner and staff assigned to this client can set up its payroll.' using errcode = '42501';
  end if;
  if exists (select 1 from public.payroll_items where client_id = p_client) then
    return 0;
  end if;
  insert into public.payroll_items (client_id, name, kind, bir_category, sort_order)
  values
    (p_client, 'Basic Pay', 'earning', 'basic', 10),
    (p_client, 'Overtime Pay', 'earning', 'overtime', 20),
    (p_client, 'Holiday Pay', 'earning', 'holiday', 30),
    (p_client, 'Night Differential', 'earning', 'night_diff', 40),
    (p_client, '13th Month Pay', 'earning', 'thirteenth_month', 50),
    (p_client, 'Rice Allowance', 'earning', 'de_minimis', 60),
    (p_client, 'Withholding Tax', 'deduction', 'withholding_tax', 10),
    (p_client, 'SSS (Employee)', 'deduction', 'sss_ee', 20),
    (p_client, 'PhilHealth (Employee)', 'deduction', 'phic_ee', 30),
    (p_client, 'Pag-IBIG (Employee)', 'deduction', 'hdmf_ee', 40),
    (p_client, 'SSS (Employer)', 'employer_contribution', 'sss_er', 10),
    (p_client, 'SSS EC', 'employer_contribution', 'sss_ec', 15),
    (p_client, 'PhilHealth (Employer)', 'employer_contribution', 'phic_er', 20),
    (p_client, 'Pag-IBIG (Employer)', 'employer_contribution', 'hdmf_er', 30);
  get diagnostics n = row_count;
  return n;
end;
$$;

alter table public.employees
  add column sss_no text check (sss_no is null or btrim(sss_no) <> ''),
  add column philhealth_no text check (philhealth_no is null or btrim(philhealth_no) <> ''),
  add column pagibig_no text check (pagibig_no is null or btrim(pagibig_no) <> '');

/** payroll_run as in 20261212000004, with EC ('sss_ec') to SSS Payable and in dues.sss.ec. */
create or replace function public.payroll_run(p_client uuid, p_month date, p_period_end date default null) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  salaries uuid := private.account_by_key(p_client, 'salaries');
  benefits uuid := coalesce(private.account_by_key(p_client, 'employee_benefits'), private.account_by_key(p_client, 'salaries'));
  contrib uuid := private.account_by_key(p_client, 'government_contributions');
  contrib_direct uuid := coalesce(private.account_by_key(p_client, 'contributions_direct'), private.account_by_key(p_client, 'government_contributions'));
  wtc uuid := private.account_by_key(p_client, 'wtc_payable');
  gov uuid := private.account_by_key(p_client, 'government_contributions_payable');
  gov_loans uuid := private.account_by_key(p_client, 'government_loans_payable');
  sss uuid := coalesce(private.account_by_key(p_client, 'sss_payable'), gov);
  phic uuid := coalesce(private.account_by_key(p_client, 'philhealth_payable'), gov);
  hdmf uuid := coalesce(private.account_by_key(p_client, 'pagibig_payable'), gov);
  sss_loans uuid := coalesce(private.account_by_key(p_client, 'sss_loans_payable'), gov_loans);
  hdmf_loans uuid := coalesce(private.account_by_key(p_client, 'pagibig_loans_payable'), gov_loans);
  other uuid := private.account_by_key(p_client, 'other_payables');
  cash uuid := private.first_control(p_client, 'cash');
  result jsonb;
begin
  if not private.can_payroll(p_client) then
    raise exception 'Only the Owner and staff assigned to this client can see its payroll.' using errcode = '42501';
  end if;
  with run as (
    select e.id, e.employee_id, e.adjustment
    from public.payroll_entries e
    where e.client_id = p_client and e.pay_month = m and e.pay_period_end is not distinct from p_period_end
  ),
  items as (
    select r.employee_id, i.kind, i.bir_category as cat, l.amount,
           coalesce(a.id, salaries) as pay_account, coalesce(a.type, 'expense') = 'cost' as direct
    from run r
    join public.payroll_entry_lines l on l.entry_id = r.id
    join public.payroll_items i on i.id = l.item_id
    join public.employees em on em.id = r.employee_id
    left join public.ledger_accounts a on a.id = em.pay_account_id and a.active
  ),
  -- Each line's account and side: positive = debit, negative = credit.
  posting as (
    select case
             when kind = 'earning' and cat in ('thirteenth_month', 'de_minimis') and not direct then benefits
             when kind = 'earning' then pay_account
             when kind = 'employer_contribution' and cat in ('sss_er', 'sss_ec', 'phic_er', 'hdmf_er') then case when direct then contrib_direct else contrib end
             when kind = 'employer_contribution' then case when direct then pay_account else benefits end
             when kind = 'deduction' and cat = 'withholding_tax' then wtc
             when kind = 'deduction' and cat = 'sss_ee' then sss
             when kind = 'deduction' and cat = 'phic_ee' then phic
             when kind = 'deduction' and cat = 'hdmf_ee' then hdmf
             when kind = 'deduction' and cat = 'sss_loan' then coalesce(sss_loans, other)
             when kind = 'deduction' and cat = 'hdmf_loan' then coalesce(hdmf_loans, other)
             else other end as account_id,
           case when kind = 'deduction' then -amount else amount end as amount
    from items
    union all
    -- The employer's side of each employer cost: payable to the agency, or other payables.
    select case cat when 'sss_er' then sss when 'sss_ec' then sss when 'phic_er' then phic when 'hdmf_er' then hdmf else other end, -amount from items where kind = 'employer_contribution'
    union all
    -- Adjustments of tax withheld (1601-C item 26) change what is remitted.
    select wtc, -adjustment from run where adjustment <> 0
  ),
  summed as (select account_id, sum(amount) as amount from posting group by account_id having sum(amount) <> 0),
  -- Net pay: whatever balances the entry, credited to Cash.
  with_cash as (
    select account_id, amount from summed
    union all
    select cash, -(select coalesce(sum(amount), 0) from summed) where (select coalesce(sum(amount), 0) from summed) <> 0
  )
  select jsonb_build_object(
    'employees', (select count(distinct employee_id) from run),
    'gross', coalesce((select sum(amount) from items where kind = 'earning'), 0),
    'deductions', coalesce((select sum(amount) from items where kind = 'deduction'), 0) + coalesce((select sum(adjustment) from run), 0),
    'employer', coalesce((select sum(amount) from items where kind = 'employer_contribution'), 0),
    'tax_withheld', coalesce((select sum(amount) from items where cat = 'withholding_tax'), 0) + coalesce((select sum(adjustment) from run), 0),
    'net', coalesce((select sum(amount) from items where kind = 'earning'), 0) - coalesce((select sum(amount) from items where kind = 'deduction'), 0) - coalesce((select sum(adjustment) from run), 0),
    'dues', jsonb_build_object(
      'sss', jsonb_build_object('ee', coalesce((select sum(amount) from items where cat = 'sss_ee'), 0), 'er', coalesce((select sum(amount) from items where cat = 'sss_er'), 0), 'ec', coalesce((select sum(amount) from items where cat = 'sss_ec'), 0)),
      'phic', jsonb_build_object('ee', coalesce((select sum(amount) from items where cat = 'phic_ee'), 0), 'er', coalesce((select sum(amount) from items where cat = 'phic_er'), 0)),
      'hdmf', jsonb_build_object('ee', coalesce((select sum(amount) from items where cat = 'hdmf_ee'), 0), 'er', coalesce((select sum(amount) from items where cat = 'hdmf_er'), 0)),
      'sss_loan', coalesce((select sum(amount) from items where kind = 'deduction' and cat = 'sss_loan'), 0),
      'hdmf_loan', coalesce((select sum(amount) from items where kind = 'deduction' and cat = 'hdmf_loan'), 0)),
    'lines', coalesce((
      select jsonb_agg(jsonb_build_object('account_id', w.account_id, 'code', a.code, 'name', a.name,
                                          'debit', greatest(w.amount, 0), 'credit', greatest(-w.amount, 0))
                       order by w.amount < 0, a.sort_order, a.code)
      from (select account_id, sum(amount) as amount from with_cash group by account_id having sum(amount) <> 0) w
      left join public.ledger_accounts a on a.id = w.account_id), '[]'::jsonb),
    'problems', to_jsonb(array_remove(array[
      case when not exists (select 1 from public.client_books where client_id = p_client) then 'Set up the account titles first.' end,
      case when exists (select 1 from posting where account_id is null) or cash is null then 'The chart lacks an account this payroll needs (salaries, employee benefits, contributions, withholding tax on compensation, SSS, PhilHealth or Pag-IBIG payable, other payables or cash).' end,
      case when (select coalesce(sum(amount), 0) from summed) < 0 then 'Deductions exceed pay: check the register.' end
    ], null))
  ) into result;
  return result;
end;
$$;

-- ---------------------------------------------------------------------------
-- 2. Remittances from the posted payroll.
-- ---------------------------------------------------------------------------
alter table public.clients add column handles_contributions boolean not null default false;

-- A deadline no longer needs the employer number (PhilHealth falls back to the 15th).
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

/** One kind's amounts in a month from every posted payroll run: EE (or loan payments), ER, EC, and the employees in it. */
create or replace function private.remittance_from_payroll(p_client uuid, p_kind text, p_month date)
returns table (ee numeric, er numeric, ec numeric, employees int)
language sql stable security definer set search_path = '' as $$
  with cats as (
    select case p_kind when 'sss' then 'sss_ee' when 'philhealth' then 'phic_ee' when 'pagibig' then 'hdmf_ee' when 'sss_loan' then 'sss_loan' else 'hdmf_loan' end as ee,
           case p_kind when 'sss' then 'sss_er' when 'philhealth' then 'phic_er' when 'pagibig' then 'hdmf_er' end as er,
           case p_kind when 'sss' then 'sss_ec' end as ec
  ),
  lines as (
    select e.employee_id, i.bir_category as cat, l.amount
    from public.payroll_entries e
    join public.payroll_postings p on p.client_id = e.client_id and p.period_end = coalesce(e.pay_period_end, e.pay_month)
    join public.journal_entries j on j.id = p.entry_id and j.status = 'posted'
    join public.payroll_entry_lines l on l.entry_id = e.id
    join public.payroll_items i on i.id = l.item_id
    cross join cats
    where e.client_id = p_client and e.pay_month = p_month and i.bir_category in (cats.ee, cats.er, cats.ec)
  )
  select coalesce(sum(amount) filter (where cat = (select ee from cats)), 0)::numeric(18, 2),
         coalesce(sum(amount) filter (where cat = (select er from cats)), 0)::numeric(18, 2),
         coalesce(sum(amount) filter (where cat = (select ec from cats)), 0)::numeric(18, 2),
         (select count(*) from (select employee_id from lines group by employee_id having sum(amount) <> 0) x)::int
  from lines
$$;

/**
 * Brings a client's remittances of one month in line with its posted payroll: adds the
 * kinds with an amount; updates those not yet approved (a prepared one whose amounts
 * change goes back to Not started); removes a not-started one the payroll no longer has.
 * Approved and remitted ones stay as they are.
 */
create or replace function private.sync_remittances(p_client uuid, p_month date) returns void
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  k text;
  a record;
  r public.contribution_remittances;
  v_id uuid;
begin
  select * into c from public.clients where id = p_client;
  if c.id is null or not c.handles_contributions then return; end if;
  foreach k in array array['sss', 'philhealth', 'pagibig', 'sss_loan', 'pagibig_loan'] loop
    select * into a from private.remittance_from_payroll(p_client, k, p_month);
    select * into r from public.contribution_remittances where client_id = p_client and kind = k and period_month = p_month;
    if a.ee + a.er + a.ec > 0 then
      if r.id is null then
        v_id := private.add_remittance(p_client, k, p_month);
        select * into r from public.contribution_remittances where id = v_id;
      end if;
      if r.status in ('not_started', 'prepared', 'not_required')
         and (r.ee_share, r.er_share, r.ec_share, coalesce(r.employees, -1)) is distinct from (a.ee, a.er, a.ec, a.employees) then
        update public.contribution_remittances
        set ee_share = a.ee, er_share = a.er, ec_share = a.ec, employees = a.employees,
            status = case when r.status = 'not_required' then 'not_started' when r.status = 'prepared' and r.total <> a.ee + a.er + a.ec then 'not_started' else r.status end,
            prn = case when r.status = 'prepared' and r.total <> a.ee + a.er + a.ec then null else r.prn end,
            note = case when r.status = 'prepared' and r.total <> a.ee + a.er + a.ec then 'The payroll changed after the PRN was made: generate a new PRN for the new amount.' when r.status = 'not_required' then null else r.note end
        where id = r.id;
      end if;
    elsif r.id is not null and r.status = 'not_started'
          and not exists (select 1 from public.contribution_remittance_files f where f.remittance_id = r.id) then
      delete from public.contribution_remittances where id = r.id;
    elsif r.id is not null and r.status in ('not_started', 'prepared') then
      update public.contribution_remittances
      set ee_share = 0, er_share = 0, ec_share = 0, employees = 0, status = 'not_started', prn = null,
          note = 'The posted payroll has no amount for this month.'
      where id = r.id;
    end if;
  end loop;
end;
$$;

-- A prepared remittance kept a note; the check only needs one for Not required.
create or replace function private.sync_remittances_on_posting() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'DELETE' then
    perform private.sync_remittances(old.client_id, old.pay_month);
    return null;
  end if;
  perform private.sync_remittances(new.client_id, new.pay_month);
  return null;
end;
$$;
create trigger sync_remittances after insert or update or delete on public.payroll_postings
  for each row execute function private.sync_remittances_on_posting();

create or replace function private.sync_remittances_on_reversal() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  p record;
begin
  for p in select client_id, pay_month from public.payroll_postings where entry_id = new.id loop
    perform private.sync_remittances(p.client_id, p.pay_month);
  end loop;
  return null;
end;
$$;
create trigger sync_remittances after update of status on public.journal_entries
  for each row when (old.status is distinct from new.status) execute function private.sync_remittances_on_reversal();

/**
 * The nightly job and "Refresh from payroll": syncs the last three months and this one
 * for every client the firm handles contributions for (that the person sees). Returns
 * how many remittances there are for those months afterwards.
 */
drop function public.generate_contribution_remittances(date);
create function public.generate_contribution_remittances(p_today date default null) returns int
language plpgsql security definer set search_path = '' as $$
declare
  today date := coalesce(p_today, private.manila_today());
  first_month date := (date_trunc('month', today) - interval '3 months')::date;
  c record;
  m date;
  n int;
begin
  if auth.uid() is not null and not private.is_staff() then
    raise exception 'Only staff refresh remittances' using errcode = '42501';
  end if;
  for c in select id from public.clients where handles_contributions and status in ('onboarding', 'active')
           and (auth.uid() is null or private.can_access_client(id)) loop
    m := first_month;
    while m <= date_trunc('month', today) loop
      perform private.sync_remittances(c.id, m);
      m := (m + interval '1 month')::date;
    end loop;
  end loop;
  select count(*) into n from public.contribution_remittances r
  where r.period_month >= first_month and (auth.uid() is null or private.can_access_client(r.client_id));
  return n;
end;
$$;

/** The Owner turns on (or off) handling a client's SSS, PhilHealth and Pag-IBIG; on, the months with posted payroll come in. */
create or replace function public.set_handles_contributions(p_client uuid, p_on boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare
  m date;
begin
  perform private.require_owner();
  update public.clients set handles_contributions = coalesce(p_on, false) where id = p_client;
  if not found then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if p_on then
    for m in select distinct pay_month from public.payroll_postings where client_id = p_client and pay_month >= (date_trunc('month', private.manila_today()) - interval '3 months')::date loop
      perform private.sync_remittances(p_client, m);
    end loop;
  end if;
end;
$$;

-- Months come from the payroll now, not by hand.
drop function public.add_contribution_remittance(uuid, text, date);

/**
 * Staff on the client prepare a remittance from the payroll: the PRN generated on the
 * agency's site, with the PRN attached. The amounts are the posted payroll's.
 */
drop function public.prepare_contribution_remittance(uuid, numeric, numeric, numeric, int, text, date);
create function public.prepare_contribution_remittance(p_id uuid, p_prn text) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances := private.remittance_for_change(p_id);
  c text;
begin
  if not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client prepare its remittances' using errcode = '42501';
  end if;
  perform private.sync_remittances(r.client_id, r.period_month);
  select * into r from public.contribution_remittances where id = p_id;
  if r.id is null then raise exception 'The posted payroll has nothing to remit for this month' using errcode = '22023'; end if;
  if r.status not in ('not_started', 'prepared') then raise exception 'This remittance is already approved' using errcode = '22023'; end if;
  if r.total <= 0 then raise exception 'Post the month''s payroll first: the amounts come from it' using errcode = '22023'; end if;
  if coalesce(btrim(p_prn), '') = '' then raise exception 'Enter the PRN (payment reference number)' using errcode = '22023'; end if;
  if length(btrim(p_prn)) > 60 then raise exception 'The PRN is too long' using errcode = '22023'; end if;
  if not exists (select 1 from public.contribution_remittance_files f where f.remittance_id = r.id and f.kind = 'prn') then
    raise exception 'Attach the PRN from the agency''s site first' using errcode = '22023';
  end if;
  update public.contribution_remittances
  set prn = btrim(p_prn), status = 'prepared', note = null, prepared_by = auth.uid(), prepared_at = now()
  where id = r.id returning * into r;
  select name into c from public.clients where id = r.client_id;
  perform private.notify(private.owner_ids(), 'remittance_ready_for_approval',
    c || ': ' || private.remittance_label(r) || ' is ready for approval',
    '₱' || to_char(r.total, 'FM999,999,990.00') || ' due ' || to_char(r.due_date, 'FMMon FMDD'),
    '/app/remittances/' || r.id, r.client_id);
  return r;
end;
$$;

/** Not required (e.g. the employees pay a loan directly): the payroll's amounts stay, so the next sync leaves it. */
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
  update public.contribution_remittances set status = 'not_required', note = left(btrim(p_note), 500), prn = null
  where id = r.id returning * into r;
  return r;
end;
$$;

-- The PRN of a prepared remittance stays until another is attached.
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
  if f.kind = 'prn' and r.status in ('prepared', 'approved')
     and not exists (select 1 from public.contribution_remittance_files x where x.remittance_id = r.id and x.kind = 'prn' and x.id <> f.id) then
    raise exception 'A prepared remittance keeps its PRN: attach the new one first' using errcode = '22023';
  end if;
  delete from public.contribution_remittance_files where id = f.id;
end;
$$;

/** The month's contribution list, per employee, for the agency's site (staff on the client). */
create or replace function public.remittance_employees(p_id uuid)
returns table (employee_id uuid, employee_no text, last_name text, first_name text, middle_name text, agency_no text, ee numeric, er numeric, ec numeric, total numeric)
language plpgsql stable security definer set search_path = '' as $$
declare
  r public.contribution_remittances;
begin
  select * into r from public.contribution_remittances where id = p_id;
  if r.id is null or not (private.is_staff() and private.can_access_client(r.client_id)) then
    raise exception 'Remittance not found' using errcode = 'P0002';
  end if;
  return query
    with cats as (
      select case r.kind when 'sss' then 'sss_ee' when 'philhealth' then 'phic_ee' when 'pagibig' then 'hdmf_ee' when 'sss_loan' then 'sss_loan' else 'hdmf_loan' end as ee,
             case r.kind when 'sss' then 'sss_er' when 'philhealth' then 'phic_er' when 'pagibig' then 'hdmf_er' end as er,
             case r.kind when 'sss' then 'sss_ec' end as ec
    ),
    lines as (
      select e.employee_id, i.bir_category as cat, l.amount
      from public.payroll_entries e
      join public.payroll_postings p on p.client_id = e.client_id and p.period_end = coalesce(e.pay_period_end, e.pay_month)
      join public.journal_entries j on j.id = p.entry_id and j.status = 'posted'
      join public.payroll_entry_lines l on l.entry_id = e.id
      join public.payroll_items i on i.id = l.item_id
      cross join cats
      where e.client_id = r.client_id and e.pay_month = r.period_month and i.bir_category in (cats.ee, cats.er, cats.ec)
    ),
    s as (
      select lines.employee_id,
             coalesce(sum(amount) filter (where cat = (select cats.ee from cats)), 0) as ee,
             coalesce(sum(amount) filter (where cat = (select cats.er from cats)), 0) as er,
             coalesce(sum(amount) filter (where cat = (select cats.ec from cats)), 0) as ec
      from lines group by lines.employee_id
    )
    select em.id, em.employee_no, em.last_name, em.first_name, em.middle_name,
           case when r.kind like 'sss%' then em.sss_no when r.kind = 'philhealth' then em.philhealth_no else em.pagibig_no end,
           s.ee::numeric(18, 2), s.er::numeric(18, 2), s.ec::numeric(18, 2), (s.ee + s.er + s.ec)::numeric(18, 2)
    from s join public.employees em on em.id = s.employee_id
    where s.ee + s.er + s.ec <> 0
    order by em.last_name, em.first_name;
end;
$$;

-- ---------------------------------------------------------------------------
-- 3. Books: a client that pays the agency itself.
-- ---------------------------------------------------------------------------
alter table public.return_book_entries add column remittance_id uuid references public.contribution_remittances (id) on delete set null;
create index return_book_entries_remittance_idx on public.return_book_entries (remittance_id) where remittance_id is not null;

/** Posts (or records why it could not) a remittance the client paid to the agency itself: Dr the payable, Cr cash. */
create or replace function private.book_remittance_payment(r public.contribution_remittances) returns void
language plpgsql security definer set search_path = '' as $$
declare
  e uuid;
  dated date;
begin
  begin
    dated := private.dues_entry_date(r.client_id, r.remitted_on);
    e := private.post_dues_entry(r.client_id, r.remitted_on, r.total,
      private.contribution_payable(r.client_id, r.kind, null), private.dues_cash_account(r.client_id, 'transfer'),
      private.contribution_party(r.kind, null), private.remittance_label(r) || ' paid', coalesce(r.remit_reference, r.prn));
    insert into public.return_book_entries (client_id, kind, remittance_id, entry_date, amount, status, entry_id)
    values (r.client_id, 'dues_payment', r.id, dated, r.total, 'posted', e);
  exception when others then
    insert into public.return_book_entries (client_id, kind, remittance_id, entry_date, amount, status, note)
    values (r.client_id, 'dues_payment', r.id, r.remitted_on, r.total, case when sqlstate = 'P0002' then 'skipped' else 'failed' end, sqlerrm);
  end;
end;
$$;

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
  else
    -- The client paid the agency: the payment goes in its books now.
    perform private.book_remittance_payment(r);
  end if;
  perform private.notify(private.client_portal_ids(r.client_id), 'remittance_remitted',
    private.remittance_label(r) || ' was paid', 'Paid ' || to_char(p_paid_on, 'FMMon FMDD, YYYY') || coalesce(' · ' || r.remit_reference, ''),
    '/portal/remittances', r.client_id);
  return r;
end;
$$;

create or replace function public.reopen_contribution_remittance(p_id uuid) returns public.contribution_remittances
language plpgsql security definer set search_path = '' as $$
declare
  r public.contribution_remittances;
  d public.client_dues;
  b record;
begin
  perform private.require_owner();
  r := private.remittance_for_change(p_id);
  if r.status = 'remitted' then
    update public.contribution_remittances set status = 'approved', remitted_on = null, remit_reference = null, remitted_by = null
    where id = r.id returning * into r;
    if r.due_id is not null then
      update public.client_dues set remitted_on = null, remit_reference = null, remitted_by = null where id = r.due_id;
    end if;
    -- The payment booked for a client that paid the agency is reversed.
    for b in select id, entry_id from public.return_book_entries where remittance_id = r.id and status = 'posted' loop
      update public.return_book_entries
      set status = 'reversed', reversal_id = private.reverse_entry_quietly(b.entry_id, private.manila_today(), private.remittance_label(r) || ': payment taken back')
      where id = b.id;
    end loop;
    update public.return_book_entries set status = 'reversed' where remittance_id = r.id and status in ('failed', 'skipped');
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

-- ---------------------------------------------------------------------------
-- 4. Tasks as jobs: Client → Preparer → Reviewer → Done, billed when done.
-- ---------------------------------------------------------------------------
alter table public.staff_tasks
  add column stage text not null default 'preparer' check (stage in ('client', 'preparer', 'reviewer')),
  add column reviewer_id uuid references auth.users (id),
  add column job_code text,
  add column job_label text check (job_label is null or btrim(job_label) <> ''),
  add column job_price numeric(18, 2) check (job_price is null or job_price >= 0),
  add column due_id uuid references public.client_dues (id) on delete set null,
  add column return_note text check (return_note is null or length(return_note) <= 2000),
  add constraint staff_tasks_job_client check (job_label is null or client_id is not null),
  add constraint staff_tasks_reviewer_not_assignee check (reviewer_id is null or reviewer_id <> assigned_to);
create index staff_tasks_reviewer_idx on public.staff_tasks (reviewer_id, stage) where status = 'open';

drop policy staff_tasks_read on public.staff_tasks;
create policy staff_tasks_read on public.staff_tasks for select to authenticated using (
  private.is_staff() and (
    private.is_owner() or assigned_to = auth.uid() or created_by = auth.uid() or reviewer_id = auth.uid()
    or (client_id is not null and private.can_access_client(client_id))
  )
);

/** The active fee schedule's item for a client's brand: its label and price (null when not set or quoted per job). */
create or replace function private.fee_job(p_client uuid, p_code text) returns table (label text, price numeric)
language sql stable security definer set search_path = '' as $$
  select i.label || coalesce(' (' || i.band_label || ')', ''), i.price
  from public.clients c
  join public.fee_schedules s on s.brand_id = c.brand_id and s.status = 'active'
  join public.fee_items i on i.schedule_id = s.id and i.code = p_code
  where c.id = p_client
$$;

/** Who may move a task on: its assignee (preparer), its reviewer, whoever created it, the Owner. */
create or replace function private.task_for_change(p_task uuid) returns public.staff_tasks
language plpgsql stable security definer set search_path = '' as $$
declare
  t public.staff_tasks;
begin
  select * into t from public.staff_tasks where id = p_task;
  if t.id is null or not private.is_staff() then raise exception 'Task not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or t.assigned_to = auth.uid() or coalesce(t.created_by = auth.uid(), false) or coalesce(t.reviewer_id = auth.uid(), false)) then
    raise exception 'Only the person it is assigned to, its reviewer, whoever created it or the Owner change a task' using errcode = '42501';
  end if;
  return t;
end;
$$;

drop function public.create_staff_task(text, uuid, date, text, text, uuid, date, uuid);
/**
 * Anyone on staff creates a task (a job) and assigns it. Optional: a reviewer; the job
 * from the fee schedule and its price (billed when done); a message that asks the client
 * first (the task starts with the client, as a request in the portal).
 */
create function public.create_staff_task(
  p_title text, p_assignee uuid, p_due date default null, p_priority text default 'normal',
  p_notes text default null, p_client uuid default null, p_period date default null, p_request uuid default null,
  p_reviewer uuid default null, p_job_code text default null, p_job_price numeric default null, p_ask_client text default null
) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks;
  c uuid;
  who text;
  v_label text;
  v_price numeric;
  rq public.client_requests;
  ask text := nullif(btrim(coalesce(p_ask_client, '')), '');
begin
  if not private.is_staff() then raise exception 'Only staff create tasks' using errcode = '42501'; end if;
  c := private.check_task(p_title, p_assignee, coalesce(p_priority, 'normal'), p_client, p_period, p_request);
  if p_reviewer is not null then
    if p_reviewer = p_assignee then raise exception 'The reviewer is someone other than the person who does it' using errcode = '22023'; end if;
    if not exists (select 1 from public.staff_profiles where user_id = p_reviewer and active) or (c is not null and not private.staff_sees_client(p_reviewer, c)) then
      raise exception 'Choose a reviewer who works on this client' using errcode = '22023';
    end if;
  end if;
  if p_job_code is not null then
    if c is null then raise exception 'A job is for a client: choose the client' using errcode = '22023'; end if;
    select f.label, f.price into v_label, v_price from private.fee_job(c, p_job_code) f;
    if v_label is null then raise exception 'That job is not in the active fee schedule' using errcode = '22023'; end if;
  end if;
  if p_job_price is not null and (p_job_price < 0 or round(p_job_price, 2) <> p_job_price) then raise exception 'Enter the price, at most two decimals' using errcode = '22023'; end if;
  if ask is not null and c is null then raise exception 'Choose the client to ask' using errcode = '22023'; end if;
  if ask is not null and p_request is not null then
    perform public.reply_client_request(p_request, ask);
  elsif ask is not null then
    rq := public.create_client_request(c, btrim(p_title), ask, p_due, null);
    update public.client_requests set assigned_to = p_assignee where id = rq.id;
  end if;
  insert into public.staff_tasks (title, notes, client_id, period_month, request_id, assigned_to, due_date, priority,
                                  stage, reviewer_id, job_code, job_label, job_price)
  values (btrim(p_title), nullif(btrim(coalesce(p_notes, '')), ''), c, p_period, coalesce(p_request, rq.id), p_assignee, p_due, coalesce(p_priority, 'normal'),
          case when ask is not null then 'client' else 'preparer' end, p_reviewer, p_job_code, v_label, coalesce(p_job_price, v_price))
  returning * into t;
  select full_name into who from public.staff_profiles where user_id = auth.uid();
  perform private.notify(array[p_assignee], 'task_assigned',
    coalesce(who, 'Someone') || ' gave you a task: ' || t.title,
    case when t.stage = 'client' then 'Waiting on the client first. ' else '' end || coalesce('Due ' || to_char(p_due, 'FMMon FMDD, YYYY'), ''),
    '/app/tasks/' || t.id, c);
  return t;
end;
$$;

drop function public.update_staff_task(uuid, text, uuid, date, text, text, date);
/** Changes an open task's details: who does it, who reviews it, the job and its price. */
create function public.update_staff_task(
  p_task uuid, p_title text, p_assignee uuid, p_due date, p_priority text, p_notes text, p_period date default null,
  p_reviewer uuid default null, p_job_code text default null, p_job_price numeric default null
) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
  v_label text;
  v_price numeric;
begin
  if t.status <> 'open' then raise exception 'Reopen the task to change it' using errcode = '22023'; end if;
  perform private.check_task(p_title, p_assignee, coalesce(p_priority, 'normal'), t.client_id, p_period, t.request_id);
  if p_reviewer is not null and (p_reviewer = p_assignee or not exists (select 1 from public.staff_profiles where user_id = p_reviewer and active)
     or (t.client_id is not null and not private.staff_sees_client(p_reviewer, t.client_id))) then
    raise exception 'Choose a reviewer, other than the person who does it, who works on this client' using errcode = '22023';
  end if;
  if p_job_code is not null then
    if t.client_id is null then raise exception 'A job is for a client' using errcode = '22023'; end if;
    select f.label, f.price into v_label, v_price from private.fee_job(t.client_id, p_job_code) f;
    if v_label is null then raise exception 'That job is not in the active fee schedule' using errcode = '22023'; end if;
  end if;
  if p_job_price is not null and (p_job_price < 0 or round(p_job_price, 2) <> p_job_price) then raise exception 'Enter the price, at most two decimals' using errcode = '22023'; end if;
  update public.staff_tasks
  set title = btrim(p_title), assigned_to = p_assignee, due_date = p_due, priority = coalesce(p_priority, 'normal'),
      notes = nullif(btrim(coalesce(p_notes, '')), ''), period_month = p_period, reviewer_id = p_reviewer,
      job_code = p_job_code,
      job_label = case when p_job_code is null then null when p_job_code is distinct from t.job_code then v_label else t.job_label end,
      job_price = case when p_job_code is null then null else coalesce(p_job_price, case when p_job_code is distinct from t.job_code then v_price else t.job_price end) end,
      stage = case when t.stage = 'reviewer' and p_reviewer is null then 'preparer' else t.stage end
  where id = t.id returning * into t;
  return t;
end;
$$;

/** The preparer hands the work in: to the reviewer, or done when the task has none. */
create or replace function public.submit_staff_task(p_task uuid, p_note text default null) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
  who text;
begin
  if not (private.is_owner() or t.assigned_to = auth.uid()) then raise exception 'Only the person it is assigned to hands it in' using errcode = '42501'; end if;
  if t.status <> 'open' or t.stage <> 'preparer' then raise exception 'This task is not with the preparer' using errcode = '22023'; end if;
  if t.reviewer_id is not null then
    update public.staff_tasks set stage = 'reviewer', return_note = null where id = t.id returning * into t;
    select full_name into who from public.staff_profiles where user_id = auth.uid();
    perform private.notify(array[t.reviewer_id], 'task_assigned', coalesce(who, 'Someone') || ' sent a task for your review: ' || t.title,
      nullif(btrim(coalesce(p_note, '')), ''), '/app/tasks/' || t.id, t.client_id);
  else
    update public.staff_tasks set status = 'done', done_at = now(), done_by = auth.uid() where id = t.id returning * into t;
  end if;
  return t;
end;
$$;

/** The reviewer approves (done) or sends the task back to the preparer with a note. */
create or replace function public.review_staff_task(p_task uuid, p_approve boolean, p_note text default null) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
  who text;
begin
  if not (private.is_owner() or coalesce(t.reviewer_id = auth.uid(), false)) then raise exception 'Only the task''s reviewer or the Owner reviews it' using errcode = '42501'; end if;
  if t.status <> 'open' or t.stage <> 'reviewer' then raise exception 'This task is not waiting for review' using errcode = '22023'; end if;
  if p_approve then
    update public.staff_tasks set status = 'done', done_at = now(), done_by = auth.uid() where id = t.id returning * into t;
  else
    if coalesce(btrim(p_note), '') = '' then raise exception 'Say what to fix' using errcode = '22023'; end if;
    update public.staff_tasks set stage = 'preparer', return_note = left(btrim(p_note), 2000) where id = t.id returning * into t;
    select full_name into who from public.staff_profiles where user_id = auth.uid();
    perform private.notify(array[t.assigned_to], 'task_assigned', coalesce(who, 'The reviewer') || ' sent a task back: ' || t.title,
      left(btrim(p_note), 280), '/app/tasks/' || t.id, t.client_id);
  end if;
  return t;
end;
$$;

/** The preparer asks the client for something: the task waits on the client until they reply. */
create or replace function public.ask_client_on_task(p_task uuid, p_message text) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
  rq public.client_requests;
begin
  if t.status <> 'open' then raise exception 'The task is closed' using errcode = '22023'; end if;
  if t.client_id is null then raise exception 'A firm task has no client to ask' using errcode = '22023'; end if;
  if coalesce(btrim(p_message), '') = '' then raise exception 'Write what you need from the client' using errcode = '22023'; end if;
  select * into rq from public.client_requests where id = t.request_id;
  if rq.id is not null and rq.status <> 'closed' then
    perform public.reply_client_request(rq.id, p_message);
  else
    rq := public.create_client_request(t.client_id, t.title, p_message, t.due_date, null);
    update public.client_requests set assigned_to = t.assigned_to where id = rq.id;
  end if;
  update public.staff_tasks set stage = 'client', request_id = rq.id where id = t.id returning * into t;
  return t;
end;
$$;

/** Done (allowed when no review is due), cancelled, or open again (back with the preparer). */
create or replace function public.set_staff_task_status(p_task uuid, p_status text) returns public.staff_tasks
language plpgsql security definer set search_path = '' as $$
declare
  t public.staff_tasks := private.task_for_change(p_task);
begin
  if p_status not in ('open', 'done', 'cancelled') then raise exception 'Unknown status' using errcode = '22023'; end if;
  if t.status = p_status then return t; end if;
  if p_status = 'done' and t.reviewer_id is not null and not (private.is_owner() or coalesce(t.reviewer_id = auth.uid(), false)) then
    raise exception 'This task has a reviewer: hand it in for review' using errcode = '22023';
  end if;
  update public.staff_tasks
  set status = p_status,
      stage = case when p_status = 'open' then 'preparer' else stage end,
      done_at = case when p_status = 'open' then null else now() end,
      done_by = case when p_status = 'open' then null else auth.uid() end
  where id = t.id returning * into t;
  return t;
end;
$$;

-- The client's reply on a task's request hands the task back to the preparer.
create or replace function private.task_on_client_reply() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  t record;
  c text;
begin
  if new.from_firm then return null; end if;
  for t in update public.staff_tasks set stage = 'preparer'
           where request_id = new.request_id and status = 'open' and stage = 'client'
           returning id, title, assigned_to, client_id loop
    select name into c from public.clients where id = t.client_id;
    perform private.notify(array[t.assigned_to], 'task_assigned', c || ' answered: ' || t.title || ' is back with you',
      left(regexp_replace(coalesce(new.body, ''), '\s+', ' ', 'g'), 280), '/app/tasks/' || t.id, t.client_id);
  end loop;
  return null;
end;
$$;
create trigger task_on_client_reply after insert on public.client_request_messages
  for each row execute function private.task_on_client_reply();

-- The job goes on the client's statement items (unbilled, Ready to bill) when the task is done;
-- reopening takes an unbilled job off again.
create or replace function private.bill_task_job() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  d public.client_dues;
begin
  if new.status = 'done' and old.status <> 'done' and new.due_id is null and new.client_id is not null and coalesce(new.job_price, 0) > 0 then
    insert into public.client_dues (client_id, kind, description, amount, due_on, created_by)
    values (new.client_id, 'other', left(coalesce(new.job_label, new.title) || case when new.job_label is not null and new.job_label <> new.title then ': ' || new.title else '' end, 300),
            new.job_price, private.manila_today(), auth.uid())
    returning * into d;
    new.due_id := d.id;
  elsif new.status <> 'done' and old.status = 'done' and new.due_id is not null then
    -- Unbilled: it comes off (after the update, see private.unbill_task_job).
    select * into d from public.client_dues where id = new.due_id;
    if d.id is not null and d.soa_id is null and d.waived_at is null and not exists (select 1 from public.payment_allocations a where a.due_id = d.id) then
      new.due_id := null;
    end if;
  end if;
  return new;
end;
$$;
create trigger bill_job before update of status on public.staff_tasks for each row execute function private.bill_task_job();

create or replace function private.unbill_task_job() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  delete from public.client_dues where id = old.due_id and soa_id is null;
  return null;
end;
$$;
create trigger unbill_job after update of status on public.staff_tasks
  for each row when (old.due_id is not null and new.due_id is null) execute function private.unbill_task_job();

-- ---------------------------------------------------------------------------
-- 5. Registration: a completed case is billed as one job.
-- ---------------------------------------------------------------------------
alter table public.registration_cases add column billed_at timestamptz;

create or replace function private.bill_registration_case() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
  code text;
  codes text[];
  v_label text;
  v_price numeric;
  label text;
  owner uuid := (select user_id from public.staff_profiles where role = 'owner' and active order by created_at limit 1);
begin
  if new.status <> 'completed' or old.status = 'completed' or new.billed_at is not null then return new; end if;
  select * into c from public.clients where id = new.client_id;
  codes := array[case new.kind
    when 'new_business' then case when c.taxpayer_type = 'individual' then 'I.registration_individual' else 'I.registration_non_individual' end
    when 'closure' then 'I.closure'
    when 'renewal' then 'I.business_permit'
    else 'I.orus' end];
  if new.kind = 'new_business' and new.employer then
    codes := codes || array['I.sss_registration', 'I.philhealth_registration', 'I.pagibig_registration'];
  end if;
  label := case new.kind when 'new_business' then 'business registration' when 'closure' then 'closure of business'
    when 'renewal' then 'permit renewal ' || coalesce(new.period_year::text, '') when 'branch' then 'branch registration' else 'BIR update' end;
  foreach code in array codes loop
    v_label := null; v_price := null;
    select f.label, f.price into v_label, v_price from private.fee_job(new.client_id, code) f;
    if coalesce(v_price, 0) > 0 then
      insert into public.client_dues (client_id, kind, description, amount, due_on, created_by)
      values (new.client_id, 'other', left(v_label, 300), v_price, private.manila_today(), auth.uid());
    elsif owner is not null then
      -- No price in the schedule: the Owner prices and bills it.
      insert into public.staff_tasks (title, notes, client_id, assigned_to, priority, job_code, job_label, created_by)
      values (left('Price and bill: ' || coalesce(v_label, code) || ' (' || label || ')', 200),
              'The ' || label || ' is completed. The active fee schedule has no price for this job: set the price here, then mark the task done to bill it.',
              new.client_id, owner, 'high', case when v_label is not null then code end, v_label, null);
    end if;
  end loop;
  new.billed_at := now();
  return new;
end;
$$;
create trigger bill_case before update of status on public.registration_cases for each row execute function private.bill_registration_case();

revoke execute on function private.remittance_from_payroll(uuid, text, date) from public, anon, authenticated;
revoke execute on function private.sync_remittances(uuid, date) from public, anon, authenticated;
revoke execute on function private.sync_remittances_on_posting() from public, anon, authenticated;
revoke execute on function private.sync_remittances_on_reversal() from public, anon, authenticated;
revoke execute on function private.book_remittance_payment(public.contribution_remittances) from public, anon, authenticated;
revoke execute on function private.fee_job(uuid, text) from public, anon, authenticated;
revoke execute on function private.task_on_client_reply() from public, anon, authenticated;
revoke execute on function private.bill_task_job() from public, anon, authenticated;
revoke execute on function private.unbill_task_job() from public, anon, authenticated;
revoke execute on function private.bill_registration_case() from public, anon, authenticated;
revoke execute on function public.generate_contribution_remittances(date) from public, anon;
revoke execute on function public.set_handles_contributions(uuid, boolean) from public, anon;
revoke execute on function public.prepare_contribution_remittance(uuid, text) from public, anon;
revoke execute on function public.remittance_employees(uuid) from public, anon;
revoke execute on function public.create_staff_task(text, uuid, date, text, text, uuid, date, uuid, uuid, text, numeric, text) from public, anon;
revoke execute on function public.update_staff_task(uuid, text, uuid, date, text, text, date, uuid, text, numeric) from public, anon;
revoke execute on function public.submit_staff_task(uuid, text) from public, anon;
revoke execute on function public.review_staff_task(uuid, boolean, text) from public, anon;
revoke execute on function public.ask_client_on_task(uuid, text) from public, anon;
grant execute on function public.generate_contribution_remittances(date) to authenticated, service_role;
grant execute on function public.set_handles_contributions(uuid, boolean) to authenticated;
grant execute on function public.prepare_contribution_remittance(uuid, text) to authenticated;
grant execute on function public.remittance_employees(uuid) to authenticated;
grant execute on function public.create_staff_task(text, uuid, date, text, text, uuid, date, uuid, uuid, text, numeric, text) to authenticated;
grant execute on function public.update_staff_task(uuid, text, uuid, date, text, text, date, uuid, text, numeric) to authenticated;
grant execute on function public.submit_staff_task(uuid, text) to authenticated;
grant execute on function public.review_staff_task(uuid, boolean, text) to authenticated;
grant execute on function public.ask_client_on_task(uuid, text) to authenticated;
