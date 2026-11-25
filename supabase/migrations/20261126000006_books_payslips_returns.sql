-- Rework phase 2 (docs/REWORK.md, decisions 5, 9 and 10).
--
--   payslips()              Payslips in the Books: one row per employee per pay period of a
--                           month, from the payroll the engine already keeps and posts
--                           (migrations 20261123000017, 20261125000010); the engine is unchanged.
--   filing_books_ready()    a return appears only when the Books of its whole period are
--                           locked (all three months of a quarterly return). Returns that
--                           do not come from the books (1604-C, 1604-E, Inventory List…),
--                           months before the books start, and clients without books are
--                           not held back.
--   books_still_open()      for Filings: each client's months still open that an unfiled
--                           return covers, with the nearest BIR due date among them.

/**
 * Payslips of a client's month: gross pay, the employee's SSS, PhilHealth and Pag-IBIG,
 * tax withheld (with its adjustment), other deductions (loans, advances), net pay, the
 * employer's contributions, and the payroll entry that posted the run, if any.
 * deductions = SSS + PhilHealth + Pag-IBIG + tax; net = gross − deductions − other_deductions.
 */
create or replace function public.payslips(p_client uuid, p_month date)
returns table (
  payroll_entry_id uuid, employee_id uuid, employee_no text, employee_name text, pay_month date, pay_period_end date,
  gross numeric, sss numeric, philhealth numeric, pagibig numeric, tax numeric, deductions numeric,
  other_deductions numeric, net numeric, employer_contributions numeric, journal_entry_id uuid
)
language sql stable security definer set search_path = '' as $$
  with s as (
    select e.id, e.client_id, e.employee_id, e.pay_month, e.pay_period_end, e.adjustment,
           coalesce(sum(l.amount) filter (where i.kind = 'earning'), 0) as gross,
           coalesce(sum(l.amount) filter (where i.bir_category = 'sss_ee'), 0) as sss,
           coalesce(sum(l.amount) filter (where i.bir_category = 'phic_ee'), 0) as phic,
           coalesce(sum(l.amount) filter (where i.bir_category = 'hdmf_ee'), 0) as hdmf,
           coalesce(sum(l.amount) filter (where i.bir_category = 'withholding_tax'), 0) + e.adjustment as tax,
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
         (s.sss + s.phic + s.hdmf + s.tax)::numeric(18, 2), s.other::numeric(18, 2),
         (s.gross - s.sss - s.phic - s.hdmf - s.tax - s.other)::numeric(18, 2), s.er::numeric(18, 2),
         (select p.entry_id from public.payroll_postings p join public.journal_entries j on j.id = p.entry_id and j.status = 'posted'
          where p.client_id = s.client_id and p.period_end = coalesce(s.pay_period_end, s.pay_month))
  from s
  join public.employees em on em.id = s.employee_id
  order by em.last_name, em.first_name, s.pay_period_end nulls last
$$;

/** True when every month of the return's period is locked in the Books (see above); null when not visible. */
create or replace function public.filing_books_ready(p_filing uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select case
    when f.id is null then null
    when not (f.form = any (private.book_lock_forms())) then true
    when b.client_id is null then true
    else not exists (
      select 1 from generate_series(date_trunc('month', greatest(f.period_start, b.books_start)), date_trunc('month', f.period_end), interval '1 month') g
      where private.books_locked_by(f.client_id, g::date) is null)
  end
  from (select 1) one
  left join public.filing_instances f on f.id = p_filing
    and ((private.is_staff() and private.can_access_client(f.client_id)) or private.acting_sees_filing(f.id))
  left join public.client_books b on b.client_id = f.client_id
$$;

/** filing_books_ready for a list of returns (to filter the Returns and Filings lists). */
create or replace function public.filings_books_ready(p_filings uuid[])
returns table (filing_id uuid, ready boolean)
language sql stable security definer set search_path = '' as $$
  select x.id, public.filing_books_ready(x.id) from unnest(p_filings) as x(id)
$$;

/**
 * Books still open: for each client the caller sees, each month from the books start to
 * the current month that is not locked and that an unfiled return covers, with the
 * nearest due date among those returns (and that return), how many returns wait on it,
 * and whether a lock is already requested. Nearest due date first.
 */
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

revoke execute on function public.payslips(uuid, date) from public, anon;
revoke execute on function public.filing_books_ready(uuid) from public, anon;
revoke execute on function public.filings_books_ready(uuid[]) from public, anon;
revoke execute on function public.books_still_open(date) from public, anon;
grant execute on function public.payslips(uuid, date) to authenticated;
grant execute on function public.filing_books_ready(uuid) to authenticated;
grant execute on function public.filings_books_ready(uuid[]) to authenticated;
grant execute on function public.books_still_open(date) to authenticated;
