-- Contributions and loans to their own payables (Owner, December 2026): "We have
-- different types of contribution, and on the payroll they have different columns. It
-- should be separated. We have SSS payable, PhilHealth payable, Pag-IBIG payable. We
-- also have SSS loans payable and Pag-IBIG loans payable."
--
-- Chart of accounts: five payables in every client's chart (template keys), added to
-- books already set up beside their combined accounts:
--     2061 SSS Payable              sss_payable
--     2062 PhilHealth Payable       philhealth_payable
--     2063 Pag-IBIG Payable         pagibig_payable
--     2066 SSS Loans Payable        sss_loans_payable
--     2067 Pag-IBIG Loans Payable   pagibig_loans_payable
--   The combined 2060 "SSS, PhilHealth and Pag-IBIG Payable" and 2065 "SSS and Pag-IBIG
--   Loans Payable" stay in charts that have them, holding what was booked to them before
--   this migration; new charts no longer get them (src/lib/ledger/coa).
--
-- Payroll: loan payments withheld from pay get their own BIR categories, sss_loan and
-- hdmf_loan (deductions that are not BIR figures, as 'none': they change net pay only).
-- payroll_run() credits each employee and employer share to its agency's payable and
-- each loan payment to its loans payable (other 'none' deductions still go to Other
-- Payables), and lists the loans among the run's dues. payslips() shows SSS and
-- Pag-IBIG loan payments as their own columns. A used deduction may move between 'none',
-- 'sss_loan' and 'hdmf_loan' (the tax figures do not change); deductions already named
-- as an SSS or a Pag-IBIG loan move now.
--
-- Billing: each contribution item names what it settles in a structured field,
-- client_dues.contribution ('sss', 'philhealth', 'pagibig', 'sss_loan', 'pagibig_loan'),
-- one item per agency and kind. add_client_charge() takes it (p_contribution); a caller
-- that sends none gets it from the description, and a description naming no agency or
-- several (e.g. "SSS, PhilHealth and Pag-IBIG …") is refused.
--
-- Dues payment: the contribution items a verified payment pays post ONE entry for the
-- payment (dated by private.dues_entry_date), one debit line per item to the payable
-- its contribution field names, and one credit to cash. Items entered before this
-- migration (no contribution field) are paid from the combined account their payroll
-- was booked to, or, when the chart has none, from the payable their description names
-- (combined descriptions then fail and wait for staff). Tax items are unchanged: one
-- entry per item. Remitting stays per item (mark_contribution_remitted).

-- ---------------------------------------------------------------------------
-- Chart of accounts.
-- ---------------------------------------------------------------------------
insert into public.ledger_accounts (client_id, template_key, code, name, type, normal_side, fs_line, bir_line, control, sort_order)
select b.client_id, a.key,
       case when exists (select 1 from public.ledger_accounts x where x.client_id = b.client_id and x.code = a.code) then a.code || '-R' else a.code end,
       a.name, 'liability', 'credit', 'accrued_liabilities', null, null,
       coalesce((select x.sort_order from public.ledger_accounts x where x.client_id = b.client_id and x.template_key = a.after),
                (select x.sort_order from public.ledger_accounts x where x.client_id = b.client_id and x.template_key = 'wtc_payable'), 0) + a.n
from public.client_books b
cross join (values
  ('sss_payable', '2061', 'SSS Payable', 'government_contributions_payable', 1),
  ('philhealth_payable', '2062', 'PhilHealth Payable', 'government_contributions_payable', 2),
  ('pagibig_payable', '2063', 'Pag-IBIG Payable', 'government_contributions_payable', 3),
  ('sss_loans_payable', '2066', 'SSS Loans Payable', 'government_loans_payable', 1),
  ('pagibig_loans_payable', '2067', 'Pag-IBIG Loans Payable', 'government_loans_payable', 2)
) as a(key, code, name, after, n)
where not exists (select 1 from public.ledger_accounts x where x.client_id = b.client_id and x.template_key = a.key);

-- ---------------------------------------------------------------------------
-- Payroll: loan payments as their own categories.
-- ---------------------------------------------------------------------------
alter table public.payroll_items drop constraint payroll_items_bir_category_check;
alter table public.payroll_items drop constraint payroll_items_check;
alter table public.payroll_items add constraint payroll_items_bir_category_check check (bir_category in (
  'basic', 'overtime', 'holiday', 'night_diff', 'hazard', 'thirteenth_month', 'de_minimis', 'other_taxable',
  'separation', 'commission', 'profit_share', 'director_fee',
  'withholding_tax', 'sss_ee', 'phic_ee', 'hdmf_ee', 'sss_er', 'phic_er', 'hdmf_er', 'sss_loan', 'hdmf_loan', 'none'
));
alter table public.payroll_items add constraint payroll_items_check check (
  (kind = 'earning' and bir_category in ('basic', 'overtime', 'holiday', 'night_diff', 'hazard', 'thirteenth_month', 'de_minimis', 'other_taxable', 'separation', 'commission', 'profit_share', 'director_fee'))
  or (kind = 'deduction' and bir_category in ('withholding_tax', 'sss_ee', 'phic_ee', 'hdmf_ee', 'sss_loan', 'hdmf_loan', 'none'))
  or (kind = 'employer_contribution' and bir_category in ('sss_er', 'phic_er', 'hdmf_er', 'none'))
);

-- An item's kind and BIR category change only while no payroll uses it, except a deduction
-- moving between 'none', 'sss_loan' and 'hdmf_loan': none of them is a BIR figure.
create or replace function private.payroll_items_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (new.kind, new.bir_category, new.client_id) is distinct from (old.kind, old.bir_category, old.client_id)
     and not (new.client_id = old.client_id and new.kind = 'deduction' and old.kind = 'deduction'
              and new.bir_category in ('none', 'sss_loan', 'hdmf_loan') and old.bir_category in ('none', 'sss_loan', 'hdmf_loan'))
     and exists (select 1 from public.payroll_entry_lines l where l.item_id = old.id) then
    raise exception 'The payslip item "%" is already used on the payroll: its kind and BIR category cannot change. Deactivate it and add a new item instead.', old.name using errcode = '42501';
  end if;
  return new;
end;
$$;

-- Deductions already named as one agency's loan ("SSS Loan", "HDMF Calamity Loan").
update public.payroll_items set bir_category = 'sss_loan'
where kind = 'deduction' and bir_category = 'none' and name ~* 'loan' and name ~* '\msss\M' and name !~* 'pag-?\s*ibig|hdmf';
update public.payroll_items set bir_category = 'hdmf_loan'
where kind = 'deduction' and bir_category = 'none' and name ~* 'loan' and name ~* 'pag-?\s*ibig|hdmf' and name !~* '\msss\M';

/**
 * A payroll run's totals and the entry it would post (as in 20261125000010), with each
 * agency's shares to its own payable and loan payments to their loans payable.
 *   dues: {sss: {ee, er}, phic: {…}, hdmf: {…}, sss_loan, hdmf_loan}
 * Charts without the new accounts fall back to the combined ones.
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
             when kind = 'employer_contribution' and cat in ('sss_er', 'phic_er', 'hdmf_er') then case when direct then contrib_direct else contrib end
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
    select case cat when 'sss_er' then sss when 'phic_er' then phic when 'hdmf_er' then hdmf else other end, -amount from items where kind = 'employer_contribution'
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

/**
 * Payslips of a client's month (as in 20261126000006), with SSS and Pag-IBIG loan
 * payments as their own columns.
 * deductions = SSS + PhilHealth + Pag-IBIG + tax;
 * net = gross − deductions − sss_loan − pagibig_loan − other_deductions.
 */
drop function public.payslips(uuid, date);
create function public.payslips(p_client uuid, p_month date)
returns table (
  payroll_entry_id uuid, employee_id uuid, employee_no text, employee_name text, pay_month date, pay_period_end date,
  gross numeric, sss numeric, philhealth numeric, pagibig numeric, tax numeric, deductions numeric,
  sss_loan numeric, pagibig_loan numeric, other_deductions numeric, net numeric, employer_contributions numeric, journal_entry_id uuid
)
language sql stable security definer set search_path = '' as $$
  with s as (
    select e.id, e.client_id, e.employee_id, e.pay_month, e.pay_period_end, e.adjustment,
           coalesce(sum(l.amount) filter (where i.kind = 'earning'), 0) as gross,
           coalesce(sum(l.amount) filter (where i.bir_category = 'sss_ee'), 0) as sss,
           coalesce(sum(l.amount) filter (where i.bir_category = 'phic_ee'), 0) as phic,
           coalesce(sum(l.amount) filter (where i.bir_category = 'hdmf_ee'), 0) as hdmf,
           coalesce(sum(l.amount) filter (where i.bir_category = 'withholding_tax'), 0) + e.adjustment as tax,
           coalesce(sum(l.amount) filter (where i.bir_category = 'sss_loan'), 0) as sss_loan,
           coalesce(sum(l.amount) filter (where i.bir_category = 'hdmf_loan'), 0) as hdmf_loan,
           coalesce(sum(l.amount) filter (where i.kind = 'deduction' and i.bir_category = 'none'), 0) as other,
           coalesce(sum(l.amount) filter (where i.kind = 'employer_contribution'), 0) as er
    from public.payroll_entries e
    left join public.payroll_entry_lines l on l.entry_id = e.id
    left join public.payroll_items i on i.id = l.item_id
    where e.client_id = p_client and e.pay_month = date_trunc('month', p_month)::date and private.can_payroll(p_client)
    group by e.id
  )
  select s.id, em.id, em.employee_no,
         em.last_name || ', ' || em.first_name || coalesce(' ' || nullif(left(btrim(em.middle_name), 1), '') || '.', ''),
         s.pay_month, s.pay_period_end,
         s.gross::numeric(18, 2), s.sss::numeric(18, 2), s.phic::numeric(18, 2), s.hdmf::numeric(18, 2), s.tax::numeric(18, 2),
         (s.sss + s.phic + s.hdmf + s.tax)::numeric(18, 2), s.sss_loan::numeric(18, 2), s.hdmf_loan::numeric(18, 2), s.other::numeric(18, 2),
         (s.gross - s.sss - s.phic - s.hdmf - s.tax - s.sss_loan - s.hdmf_loan - s.other)::numeric(18, 2), s.er::numeric(18, 2),
         (select p.entry_id from public.payroll_postings p join public.journal_entries j on j.id = p.entry_id and j.status = 'posted'
          where p.client_id = s.client_id and p.period_end = coalesce(s.pay_period_end, s.pay_month))
  from s
  join public.employees em on em.id = s.employee_id
  order by em.last_name, em.first_name, s.pay_period_end nulls last
$$;

-- ---------------------------------------------------------------------------
-- Billing: what each contribution item settles.
-- ---------------------------------------------------------------------------
alter table public.client_dues
  add column contribution text check (contribution in ('sss', 'philhealth', 'pagibig', 'sss_loan', 'pagibig_loan')),
  add constraint client_dues_contribution_kind check (contribution is null or kind = 'contribution');

/**
 * The one agency and kind a description names ('sss', 'philhealth', 'pagibig',
 * 'sss_loan', 'pagibig_loan'), or null when it names none or several. Used to fill
 * client_dues.contribution for callers that send none, and for items entered before it.
 */
create or replace function private.contribution_of(p_description text) returns text
language sql immutable set search_path = '' as $$
  select case
    when n.sss::int + n.phic::int + n.hdmf::int <> 1 then null
    when n.loan and n.phic then null
    when n.loan and n.sss then 'sss_loan'
    when n.loan then 'pagibig_loan'
    when n.sss then 'sss'
    when n.phic then 'philhealth'
    else 'pagibig'
  end
  from (select coalesce(p_description, '') ~* '\msss\M' as sss,
               coalesce(p_description, '') ~* 'phil-?\s*health|\mphic\M' as phic,
               coalesce(p_description, '') ~* 'pag-?\s*ibig|\mhdmf\M' as hdmf,
               coalesce(p_description, '') ~* '\mloans?\M' as loan) n
$$;

-- A contribution (one agency and kind: p_contribution, or else the one its description
-- names) or a one-off charge (e.g. ORUS registration). It goes on the client's next statement.
drop function public.add_client_charge(uuid, text, text, numeric, date);
create function public.add_client_charge(
  p_client uuid, p_kind text, p_description text, p_amount numeric, p_due_on date, p_contribution text default null
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  new_id uuid;
  c text := nullif(trim(coalesce(p_contribution, '')), '');
begin
  perform private.require_owner();
  if p_kind not in ('contribution', 'other') then raise exception 'Choose the kind of charge' using errcode = '22023'; end if;
  if nullif(trim(coalesce(p_description, '')), '') is null then raise exception 'Describe the charge' using errcode = '22023'; end if;
  if p_amount is null or p_amount <= 0 then raise exception 'Enter the amount' using errcode = '22023'; end if;
  if round(p_amount, 2) <> p_amount then raise exception 'Use at most two decimals' using errcode = '22023'; end if;
  if p_due_on is null then raise exception 'Enter the due date' using errcode = '22023'; end if;
  if not exists (select 1 from public.clients where id = p_client) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if p_kind = 'other' and c is not null then raise exception 'Only a contribution names an agency' using errcode = '22023'; end if;
  if p_kind = 'contribution' then
    c := coalesce(c, private.contribution_of(p_description));
    if c is null then
      raise exception 'Enter one item per agency and kind: SSS, PhilHealth or Pag-IBIG contributions, SSS loans or Pag-IBIG loans' using errcode = '22023';
    end if;
    if c not in ('sss', 'philhealth', 'pagibig', 'sss_loan', 'pagibig_loan') then raise exception 'Unknown contribution' using errcode = '22023'; end if;
  end if;
  insert into public.client_dues (client_id, kind, description, amount, due_on, created_by, contribution)
  values (p_client, p_kind, trim(p_description), p_amount, p_due_on, auth.uid(), c)
  returning id into new_id;
  return new_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Dues payment of contributions: one entry per payment, a debit per item.
-- ---------------------------------------------------------------------------

/**
 * The first open month on or after a payment's date: the payment date if its month is
 * open, else the first day of the next open month. (Same body as 20261212000001.)
 */
create or replace function private.dues_entry_date(p_client uuid, p_date date) returns date
language plpgsql stable security definer set search_path = '' as $$
declare m date := date_trunc('month', p_date)::date;
begin
  if private.books_locked_by(p_client, p_date) is null then return p_date; end if;
  for i in 1..24 loop
    m := (m + interval '1 month')::date;
    if private.books_locked_by(p_client, m) is null then return m; end if;
  end loop;
  return p_date;
end;
$$;

/**
 * The payable a contribution item settles: its contribution field's account; for an item
 * entered before the field, the combined account its payroll was booked to and the
 * earlier dues payments paid (as 20261127100004), or else, in a chart without it, the
 * payable its description names. Null when the chart has none of them.
 */
create or replace function private.contribution_payable(p_client uuid, p_contribution text, p_description text) returns uuid
language sql stable security definer set search_path = '' as $$
  select case
    when p_contribution is not null then private.account_by_key(p_client, case p_contribution
      when 'sss' then 'sss_payable' when 'philhealth' then 'philhealth_payable' when 'pagibig' then 'pagibig_payable'
      when 'sss_loan' then 'sss_loans_payable' when 'pagibig_loan' then 'pagibig_loans_payable' end)
    else coalesce(
      private.account_by_key(p_client, 'government_contributions_payable'),
      private.account_by_key(p_client, case private.contribution_of(p_description)
        when 'sss' then 'sss_payable' when 'philhealth' then 'philhealth_payable' when 'pagibig' then 'pagibig_payable'
        when 'sss_loan' then 'sss_loans_payable' when 'pagibig_loan' then 'pagibig_loans_payable' end))
  end
$$;

/** Who a contribution item is paid to. */
create or replace function private.contribution_party(p_contribution text, p_description text) returns text
language sql immutable set search_path = '' as $$
  select case coalesce(p_contribution, private.contribution_of(p_description))
    when 'sss' then 'SSS' when 'sss_loan' then 'SSS'
    when 'philhealth' then 'PhilHealth'
    when 'pagibig' then 'Pag-IBIG Fund' when 'pagibig_loan' then 'Pag-IBIG Fund'
    else 'SSS, PhilHealth and Pag-IBIG' end
$$;

/**
 * Posts (or records why it could not) the dues payment of a verified payment's
 * contribution items not yet in the Books: one entry dated by dues_entry_date, a debit
 * per item to its payable, a credit to cash. Each item's allocation gets its own
 * return_book_entries row, all pointing at the entry. Returns the entry.
 */
create or replace function private.book_contribution_payment(p_deposit uuid, p_raise boolean default false) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  dep public.client_deposits;
  b public.client_books;
  ids bigint[];
  r record;
  lines jsonb := '[]'::jsonb;
  total numeric(18, 2) := 0;
  descs text[] := '{}';
  cash uuid;
  dated date;
  memo text;
  e uuid;
begin
  select * into dep from public.client_deposits where id = p_deposit;
  if dep.id is null then return null; end if;
  delete from public.return_book_entries x
    using public.payment_allocations a, public.client_dues d
    where x.allocation_id = a.id and a.deposit_id = dep.id and d.id = a.due_id and d.kind = 'contribution' and x.status in ('failed', 'skipped');
  select array_agg(a.id order by d.due_on, d.description, a.id) into ids
    from public.payment_allocations a
    join public.client_dues d on d.id = a.due_id and d.kind = 'contribution'
    where a.deposit_id = dep.id and not exists (select 1 from public.return_book_entries x where x.allocation_id = a.id);
  if ids is null then return null; end if;
  dated := dep.received_on;
  begin
    select * into b from public.client_books where client_id = dep.client_id;
    if b.client_id is null then raise exception 'The client keeps no books with us' using errcode = 'P0002'; end if;
    if dep.received_on < b.books_start then raise exception 'The payment date is before the books start (%)', b.books_start using errcode = '22023'; end if;
    for r in
      select a.amount, d.description,
             private.contribution_payable(d.client_id, d.contribution, d.description) as account_id,
             private.contribution_party(d.contribution, d.description) as party
      from unnest(ids) with ordinality u(id, o)
      join public.payment_allocations a on a.id = u.id
      join public.client_dues d on d.id = a.due_id
      order by u.o
    loop
      if r.account_id is null then
        raise exception 'The chart of accounts lacks the payable account for %', r.description using errcode = '22023';
      end if;
      lines := lines || jsonb_build_array(jsonb_build_object('account_id', r.account_id, 'party_name', r.party, 'debit', r.amount, 'description', 'Payment of ' || r.description));
      total := total + r.amount;
      descs := descs || r.description;
    end loop;
    cash := private.dues_cash_account(dep.client_id, dep.method);
    if cash is null then raise exception 'The chart of accounts lacks a cash or bank account' using errcode = '22023'; end if;
    dated := private.dues_entry_date(dep.client_id, dep.received_on);
    memo := 'Payment of ' || array_to_string(descs, '; ') || ' (paid through Tallo CPA)'
            || case when dated <> dep.received_on then
                 ' · paid ' || to_char(dep.received_on, 'FMMon FMDD, YYYY') || ', booked in ' || to_char(dated, 'FMMonth YYYY')
                 || ' (' || to_char(dep.received_on, 'FMMonth') || ' was locked)'
               else '' end;
    e := private.post_entry(dep.client_id, dated, 'cash_disbursements', 'dues_payment', memo, dep.reference,
           lines || jsonb_build_array(jsonb_build_object('account_id', cash, 'credit', total, 'description', memo)));
    insert into public.return_book_entries (client_id, kind, due_id, allocation_id, entry_date, amount, status, entry_id)
    select dep.client_id, 'dues_payment', a.due_id, a.id, dated, a.amount, 'posted', e
    from public.payment_allocations a where a.id = any (ids);
  exception when others then
    if p_raise then raise; end if;
    insert into public.return_book_entries (client_id, kind, due_id, allocation_id, entry_date, amount, status, note)
    select dep.client_id, 'dues_payment', a.due_id, a.id, dated, a.amount, case when sqlstate = 'P0002' then 'skipped' else 'failed' end, sqlerrm
    from public.payment_allocations a where a.id = any (ids);
    e := null;
  end;
  return e;
end;
$$;

/**
 * Posts (or records why it could not) the dues payment of one verified allocation. A
 * tax item: as in 20261127100004. A contribution item: with the payment's other
 * contribution items (book_contribution_payment). Returns the item's row.
 */
create or replace function private.book_dues_allocation(p_allocation bigint, p_raise boolean default false) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  a public.payment_allocations;
  d public.client_dues;
  dep public.client_deposits;
  f public.filing_instances;
  payable uuid;
  memo text;
  e uuid;
  row_id uuid;
begin
  select * into a from public.payment_allocations where id = p_allocation;
  select * into d from public.client_dues where id = a.due_id;
  if a.id is null or coalesce(d.kind, '') not in ('tax', 'contribution') then return null; end if;
  if d.kind = 'contribution' then
    perform private.book_contribution_payment(a.deposit_id, p_raise);
    return (select id from public.return_book_entries where allocation_id = a.id);
  end if;
  select * into dep from public.client_deposits where id = a.deposit_id;
  select * into f from public.filing_instances where id = d.filing_instance_id;
  delete from public.return_book_entries where allocation_id = a.id and status in ('failed', 'skipped');
  if exists (select 1 from public.return_book_entries where allocation_id = a.id) then return null; end if;
  payable := private.dues_payable_account(d.client_id, f.form, d.kind);
  memo := 'Payment of ' || d.description || ' (paid through Tallo CPA)';
  if payable is null and f.form not in ('0619-E', '1601-EQ', '1601-C', '2550Q', '2550M') then
    insert into public.return_book_entries (client_id, kind, filing_instance_id, due_id, allocation_id, entry_date, amount, status, note)
    values (d.client_id, 'dues_payment', f.id, d.id, a.id, dep.received_on, a.amount, 'skipped', 'No payable account is paid for ' || f.form || ' in the Books')
    returning id into row_id;
    return row_id;
  end if;
  begin
    e := private.post_dues_entry(d.client_id, dep.received_on, a.amount, payable, private.dues_cash_account(d.client_id, dep.method), 'Bureau of Internal Revenue', memo, dep.reference);
    insert into public.return_book_entries (client_id, kind, filing_instance_id, due_id, allocation_id, entry_date, amount, status, entry_id)
    values (d.client_id, 'dues_payment', f.id, d.id, a.id, dep.received_on, a.amount, 'posted', e)
    returning id into row_id;
  exception when others then
    if p_raise then raise; end if;
    insert into public.return_book_entries (client_id, kind, filing_instance_id, due_id, allocation_id, entry_date, amount, status, note)
    values (d.client_id, 'dues_payment', f.id, d.id, a.id, dep.received_on, a.amount,
            case when sqlstate = 'P0002' then 'skipped' else 'failed' end, sqlerrm)
    returning id into row_id;
  end;
  return row_id;
end;
$$;

/**
 * Listening to Collections. A tax item's allocation posts at once; contribution items
 * post when the transaction commits (contribution_payment_on_allocation), so all the
 * items one payment pays make one entry. Removing an allocation (a voided deposit)
 * reverses its entry; items of the same entry still paid are booked again.
 */
create or replace function private.dues_payment_on_allocation() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r public.return_book_entries;
  rev uuid;
begin
  if tg_op = 'INSERT' then
    if exists (select 1 from public.client_dues d where d.id = new.due_id and d.kind = 'tax') then
      perform private.book_dues_allocation(new.id);
    end if;
    return null;
  end if;
  select * into r from public.return_book_entries where allocation_id = old.id;
  if r.id is null then return null; end if;
  if r.status = 'posted' then
    begin
      rev := private.reverse_entry_quietly(r.entry_id, private.manila_today(), 'The client''s payment was voided');
      update public.return_book_entries set status = 'reversed', reversal_id = rev where entry_id = r.entry_id and status = 'posted';
      update public.return_book_entries set allocation_id = null where id = r.id;
    exception when others then
      update public.return_book_entries set status = 'failed', allocation_id = null,
        note = 'The payment was voided but its entry could not be reversed: ' || sqlerrm
        where id = r.id;
      return null;
    end;
    -- Items of the reversed entry whose payment still stands are booked again.
    update public.return_book_entries x set allocation_id = null
      where x.entry_id = r.entry_id and x.id <> r.id and x.allocation_id is not null;
    perform private.book_contribution_payment(old.deposit_id);
  elsif r.status = 'reversed' then
    -- Its entry was reversed with another item of the same payment.
    update public.return_book_entries set allocation_id = null where id = r.id;
  else
    delete from public.return_book_entries where id = r.id;
  end if;
  return null;
end;
$$;

create or replace function private.contribution_payment_on_allocation() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.payment_allocations a join public.client_dues d on d.id = a.due_id and d.kind = 'contribution' where a.id = new.id) then
    perform private.book_contribution_payment(new.deposit_id);
  end if;
  return null;
end;
$$;

create constraint trigger contribution_payment_on_allocation after insert on public.payment_allocations
  deferrable initially deferred
  for each row execute function private.contribution_payment_on_allocation();

/** Posts again an entry that could not be posted (after fixing the cause); raises the reason if it still cannot. */
create or replace function public.retry_return_book_entry(p_row uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  r public.return_book_entries;
begin
  select * into r from public.return_book_entries where id = p_row;
  if r.id is null or not (private.is_staff() and private.can_access_client(r.client_id)) then
    raise exception 'Entry not found' using errcode = 'P0002';
  end if;
  if not private.can_keep_books(r.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  if r.status not in ('failed', 'skipped') then raise exception 'This entry is already in the Books' using errcode = '22023'; end if;
  if r.note like 'The payment was voided%' then
    raise exception 'Reverse that entry in the Books by hand' using errcode = '22023';
  end if;
  if r.kind = 'vat_closing' then
    perform private.book_vat_closing(r.filing_instance_id, true);
  elsif r.allocation_id is not null then
    perform private.book_dues_allocation(r.allocation_id, true);
  else
    perform private.book_direct_payment(r.filing_instance_id, true);
  end if;
end;
$$;

revoke execute on function public.payroll_run(uuid, date, date) from public, anon;
grant execute on function public.payroll_run(uuid, date, date) to authenticated;
revoke execute on function public.payslips(uuid, date) from public, anon;
grant execute on function public.payslips(uuid, date) to authenticated;
revoke execute on function public.add_client_charge(uuid, text, text, numeric, date, text) from public, anon;
grant execute on function public.add_client_charge(uuid, text, text, numeric, date, text) to authenticated;
revoke execute on function public.retry_return_book_entry(uuid) from public, anon;
grant execute on function public.retry_return_book_entry(uuid) to authenticated;
revoke execute on function private.payroll_items_guard() from public, anon, authenticated;
revoke execute on function private.contribution_of(text) from public, anon, authenticated;
revoke execute on function private.dues_entry_date(uuid, date) from public, anon, authenticated;
revoke execute on function private.contribution_payable(uuid, text, text) from public, anon, authenticated;
revoke execute on function private.contribution_party(text, text) from public, anon, authenticated;
revoke execute on function private.book_contribution_payment(uuid, boolean) from public, anon, authenticated;
revoke execute on function private.book_dues_allocation(bigint, boolean) from public, anon, authenticated;
revoke execute on function private.dues_payment_on_allocation() from public, anon, authenticated;
revoke execute on function private.contribution_payment_on_allocation() from public, anon, authenticated;
