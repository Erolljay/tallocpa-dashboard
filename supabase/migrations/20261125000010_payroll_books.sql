-- Payroll to the books (Owner, 25 November 2026):
--  - a client can send several payrolls a month (the 15th and the 30th, or one file per
--    cost section); each upload carries its pay period, and posting it replaces only
--    that period's figures for its employees;
--  - staff review each payroll run's totals and the dues to SSS, PhilHealth and Pag-IBIG,
--    then post it to the books as one entry;
--  - each employee has an account title for their pay (Salaries and Wages, Direct Labor,
--    …); the employer share of a cost-of-services employee goes to "SSS, PhilHealth and
--    Pag-IBIG Contributions - Direct" (as taxify), of everyone else to the operating
--    contributions account; net pay is credited to Cash.
-- The entry, per run:
--   Dr each employee's pay account          earnings (13th month and de minimis of
--                                            operating staff to Employee Benefits)
--   Dr Contributions (operating or direct)   employer shares
--   Cr Withholding Tax Payable - Compensation   tax withheld and its adjustments
--   Cr SSS, PhilHealth and Pag-IBIG Payable  employee and employer shares
--   Cr Other Payables                        other deductions (loans, advances) and other employer costs
--   Cr Cash                                  net pay

alter table public.employees add column pay_account_id uuid;
alter table public.employees add constraint employees_pay_account_fkey
  foreign key (client_id, pay_account_id) references public.ledger_accounts (client_id, id);

alter table public.payroll_submissions add column pay_period_end date;
alter table public.payroll_submissions add constraint payroll_submissions_period_check
  check (pay_period_end is null or date_trunc('month', pay_period_end)::date = pay_month);

-- Contributions of cost-of-services staff (taxify "Contributions - Direct").
insert into public.ledger_accounts (client_id, template_key, code, name, type, normal_side, fs_line, bir_line, control, sort_order)
select b.client_id, 'contributions_direct',
       case when exists (select 1 from public.ledger_accounts x where x.client_id = b.client_id and x.code = '5105') then '5105-R' else '5105' end,
       'SSS, PhilHealth and Pag-IBIG Contributions - Direct', 'cost', 'debit', 'cost_of_services', 'cost_of_services', null, 1005
from public.client_books b
where not exists (select 1 from public.ledger_accounts x where x.client_id = b.client_id and x.template_key = 'contributions_direct');

/**
 * Saving payroll (grid, staff upload, posting a client submission). An element with a
 * pay_period_end replaces only that employee's entry for that period; one without
 * replaces the employee's whole month (the grid works on month totals). Otherwise as
 * before (migration 20261123000017_payroll.sql).
 */
create or replace function public.save_payroll_month(p_client uuid, p_month date, p_entries jsonb, p_submission uuid default null)
returns int
language plpgsql set search_path = '' as $$
declare
  n int := 0;
  x jsonb;
  e jsonb;
  new_id uuid;
begin
  if not private.can_payroll(p_client) then
    raise exception 'Only the Owner and staff assigned to this client can change its payroll.' using errcode = '42501';
  end if;
  for x in select distinct jsonb_build_object('employee_id', y ->> 'employee_id', 'pay_period_end', nullif(y ->> 'pay_period_end', '')) from jsonb_array_elements(p_entries) y loop
    if x ->> 'pay_period_end' is null then
      delete from public.payroll_entries where client_id = p_client and employee_id = (x ->> 'employee_id')::uuid and pay_month = p_month;
    else
      delete from public.payroll_entries where client_id = p_client and employee_id = (x ->> 'employee_id')::uuid and pay_month = p_month
        and pay_period_end = (x ->> 'pay_period_end')::date;
    end if;
    n := n + 1;
  end loop;
  for e in select y from jsonb_array_elements(p_entries) y loop
    if jsonb_array_length(coalesce(e -> 'lines', '[]'::jsonb)) = 0
       and coalesce((e ->> 'adjustment')::numeric, 0) = 0 and nullif(btrim(e ->> 'note'), '') is null then
      continue;
    end if;
    insert into public.payroll_entries (client_id, employee_id, pay_month, pay_period_end, taxable_compensation, adjustment, note)
    values (p_client, (e ->> 'employee_id')::uuid, p_month, nullif(e ->> 'pay_period_end', '')::date,
            coalesce((e ->> 'taxable_compensation')::numeric, 0), coalesce((e ->> 'adjustment')::numeric, 0), nullif(btrim(e ->> 'note'), ''))
    returning id into new_id;
    insert into public.payroll_entry_lines (entry_id, client_id, item_id, amount)
    select new_id, p_client, (l ->> 'item_id')::uuid, sum((l ->> 'amount')::numeric)
    from jsonb_array_elements(coalesce(e -> 'lines', '[]'::jsonb)) l
    group by (l ->> 'item_id')::uuid
    having sum((l ->> 'amount')::numeric) <> 0;
  end loop;
  if p_submission is not null then
    update public.payroll_submissions set status = 'posted'
    where id = p_submission and client_id = p_client and pay_month = p_month;
    if not found then
      raise exception 'Payroll submission not found for this client and month.' using errcode = 'P0002';
    end if;
  end if;
  return n;
end;
$$;

-- One entry per payroll run (client, month, pay period; a whole month is keyed by its first day).
create table public.payroll_postings (
  client_id uuid not null references public.clients (id) on delete cascade,
  pay_month date not null check (extract(day from pay_month) = 1),
  period_end date not null,
  entry_id uuid not null references public.journal_entries (id),
  posted_by uuid references auth.users (id) default auth.uid(),
  posted_at timestamptz not null default now(),
  primary key (client_id, period_end)
);
create trigger audit after insert or update or delete on public.payroll_postings for each row execute function private.audit();
alter table public.payroll_postings enable row level security;
create policy payroll_postings_read on public.payroll_postings for select to authenticated using (private.can_payroll(client_id));

/**
 * A payroll run's totals and the entry it would post. p_period_end null is the run
 * entered for the whole month. Amounts in pesos.
 *   {employees, gross, deductions, employer, net, dues: {sss: {ee, er}, phic: {…}, hdmf: {…}},
 *    tax_withheld, lines: [{account_id, code, name, debit, credit}], problems: [text]}
 */
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
             when kind = 'employer_contribution' and cat in ('sss_er', 'phic_er', 'hdmf_er') then case when direct then contrib_direct else contrib end
             when kind = 'employer_contribution' then case when direct then pay_account else benefits end
             when kind = 'deduction' and cat = 'withholding_tax' then wtc
             when kind = 'deduction' and cat in ('sss_ee', 'phic_ee', 'hdmf_ee') then gov
             else other end as account_id,
           case when kind = 'deduction' then -amount else amount end as amount
    from items
    union all
    -- The employer's side of each employer cost: payable to the agency, or other payables.
    select case when cat in ('sss_er', 'phic_er', 'hdmf_er') then gov else other end, -amount from items where kind = 'employer_contribution'
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
      'sss', jsonb_build_object('ee', coalesce((select sum(amount) from items where cat = 'sss_ee'), 0), 'er', coalesce((select sum(amount) from items where cat = 'sss_er'), 0)),
      'phic', jsonb_build_object('ee', coalesce((select sum(amount) from items where cat = 'phic_ee'), 0), 'er', coalesce((select sum(amount) from items where cat = 'phic_er'), 0)),
      'hdmf', jsonb_build_object('ee', coalesce((select sum(amount) from items where cat = 'hdmf_ee'), 0), 'er', coalesce((select sum(amount) from items where cat = 'hdmf_er'), 0))),
    'lines', coalesce((
      select jsonb_agg(jsonb_build_object('account_id', w.account_id, 'code', a.code, 'name', a.name,
                                          'debit', greatest(w.amount, 0), 'credit', greatest(-w.amount, 0))
                       order by w.amount < 0, a.sort_order, a.code)
      from (select account_id, sum(amount) as amount from with_cash group by account_id having sum(amount) <> 0) w
      left join public.ledger_accounts a on a.id = w.account_id), '[]'::jsonb),
    'problems', to_jsonb(array_remove(array[
      case when not exists (select 1 from public.client_books where client_id = p_client) then 'Set up the account titles first.' end,
      case when exists (select 1 from posting where account_id is null) or cash is null then 'The chart lacks an account this payroll needs (salaries, employee benefits, contributions, withholding tax on compensation, SSS/PhilHealth/Pag-IBIG payable, other payables or cash).' end,
      case when (select coalesce(sum(amount), 0) from summed) < 0 then 'Deductions exceed pay: check the register.' end
    ], null))
  ) into result;
  return result;
end;
$$;

/**
 * Posts a payroll run to the books after review: one entry dated the pay period's end
 * (or the month's end). Refused when the run is already posted (reverse its entry to post
 * it again), has problems, or is empty.
 */
create or replace function public.post_payroll(p_client uuid, p_month date, p_period_end date default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  -- The run's key: its pay period's end, or the month's first day for the whole month.
  k date := coalesce(p_period_end, date_trunc('month', p_month)::date);
  dated date := coalesce(p_period_end, (date_trunc('month', p_month) + interval '1 month - 1 day')::date);
  r jsonb;
  e uuid;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  -- Everything dated in a month grosses up to the month (as taxify): editing the grid merges the
  -- month's runs into one. Posting that whole-month run on top of runs already in the books would
  -- book the pay twice.
  if p_period_end is null and exists (
    select 1 from public.payroll_postings p join public.journal_entries j on j.id = p.entry_id
    where p.client_id = p_client and p.pay_month = m and p.period_end <> k and j.status <> 'reversed'
  ) then
    raise exception 'Payroll runs of this month are already in the books; reverse them first, or book the change by journal entry' using errcode = '22023';
  end if;
  if exists (select 1 from public.payroll_postings p join public.journal_entries j on j.id = p.entry_id
             where p.client_id = p_client and p.period_end = k and j.status <> 'reversed') then
    raise exception 'This payroll is already in the books; reverse its entry to post it again' using errcode = '22023';
  end if;
  r := public.payroll_run(p_client, m, p_period_end);
  if jsonb_array_length(r -> 'problems') > 0 then raise exception '%', r -> 'problems' ->> 0 using errcode = '22023'; end if;
  if jsonb_array_length(r -> 'lines') < 2 then raise exception 'There is no payroll to post for this period' using errcode = '22023'; end if;
  e := private.insert_entry(p_client, dated, 'cash_disbursements', 'manual',
         'Payroll ' || case when p_period_end is null then to_char(m, 'FMMonth YYYY') else to_char(m, 'FMMonth') || ' ' || case when extract(day from k) <= 15 then '1' else '16' end || '–' || to_char(k, 'FMDD, YYYY') end,
         'PAY ' || to_char(dated, 'YYYY-MM-DD') || case when p_period_end is null then ' (month)' else '' end,
         (select jsonb_agg(jsonb_build_object('account_id', x ->> 'account_id', 'debit', x ->> 'debit', 'credit', x ->> 'credit', 'description', 'Payroll')) from jsonb_array_elements(r -> 'lines') x),
         null, null);
  perform public.confirm_journal_entry(e);
  insert into public.payroll_postings (client_id, pay_month, period_end, entry_id) values (p_client, m, k, e)
  on conflict (client_id, period_end) do update set entry_id = excluded.entry_id, posted_by = auth.uid(), posted_at = now();
  return e;
end;
$$;

-- T-7 counts any account set as an employee's pay account as compensation too.
create or replace function public.workpaper_ledger(p_client uuid, p_from date, p_to date) returns jsonb
language sql stable security invoker set search_path = '' as $$
  with lines as (
    select a.id as account_id, a.type, a.control, a.template_key, a.fs_line, a.normal_side, l.debit, l.credit
    from public.journal_lines l
    join public.journal_entries e on e.id = l.entry_id
    join public.ledger_accounts a on a.id = l.account_id
    where l.client_id = p_client and e.status in ('posted', 'reversed') and e.source <> 'opening'
      and not private.is_closing(e) and e.entry_date between p_from and p_to
  )
  select jsonb_build_object(
    'revenue', coalesce((select sum(credit - debit) from lines where type = 'revenue'), 0),
    'output_vat', coalesce((select sum(credit - debit) from lines where control = 'output_vat'), 0),
    'input_vat', coalesce((select sum(debit - credit) from lines where control = 'input_vat'), 0),
    'ewt_payable', coalesce((select sum(credit - debit) from lines where control = 'ewt_payable'), 0),
    'wtc_payable', coalesce((select sum(credit - debit) from lines where template_key = 'wtc_payable'), 0),
    'compensation', coalesce((select sum(debit - credit) from lines where template_key in ('salaries', 'employee_benefits', 'direct_labor')
      or account_id in (select e.pay_account_id from public.employees e where e.client_id = p_client and e.pay_account_id is not null)), 0),
    'cash_from_sales', coalesce((
      select sum(l.debit)
      from public.register_lines r
      join public.journal_entries e on e.document_id = r.document_id and e.status = 'posted'
      join public.journal_lines l on l.entry_id = e.id
      join public.ledger_accounts a on a.id = l.account_id and a.control in ('cash', 'bank')
      where r.client_id = p_client and r.kind = 'sale' and r.terms = 'cash' and r.month between date_trunc('month', p_from)::date and p_to
    ), 0),
    'ppe_additions', coalesce((select sum(debit - credit) from lines where fs_line = 'ppe' and normal_side = 'debit' and coalesce(template_key, '') <> 'land'), 0),
    'depreciation', coalesce((select sum(debit - credit) from lines where template_key in ('depreciation', 'depreciation_direct')), 0),
    'suggested', (select count(*) from public.journal_entries e where e.client_id = p_client and e.status = 'suggested' and e.entry_date between p_from and p_to)
  )
$$;


revoke execute on function public.payroll_run(uuid, date, date) from public, anon;
revoke execute on function public.post_payroll(uuid, date, date) from public, anon;
grant execute on function public.payroll_run(uuid, date, date) to authenticated;
grant execute on function public.post_payroll(uuid, date, date) to authenticated;
