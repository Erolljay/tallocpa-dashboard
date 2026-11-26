-- December's 1601-C is due 15 January (Owner's decision, BIR 1601-C guidelines);
-- every other month stays due the 10th of the following month.
--
-- Mirrors src/lib/deadlines/engine.ts: two new period filters split a form between
-- two rules. '1601C' (and its later versions) now covers every month except the
-- year's last ('exclude_year_end_month'); the new rule '1601C-DEC' covers December
-- only ('year_end_month_only'), due the 15th of the following month. 1601-C follows
-- the calendar year, so the year's last month is December for every client.
-- Open December filings move to the new due date; filed ones keep theirs.

-- 1. The new period filters.
alter table public.deadline_rules drop constraint if exists deadline_rules_period_filter_check;
alter table public.deadline_rules add constraint deadline_rules_period_filter_check check (
  period_filter in ('all', 'exclude_quarter_end_months', 'exclude_last_quarter', 'exclude_year_end_month', 'year_end_month_only')
);

-- 2. The 1601-C rules hand December over to the new rule.
update public.deadline_rules
set period_filter = 'exclude_year_end_month', updated_at = now()
where form = '1601-C' and frequency = 'monthly' and period_filter = 'all';

-- 3. December's rule, in force from the first 1601-C rule's start. A new database
--    (no 1601-C rule yet) gets it from supabase/seed.sql instead.
insert into public.deadline_rules (id, form, frequency, period_filter, calendar_year, due, channel, efps_group, effective_from, source)
select '1601C-DEC', '1601-C', 'monthly', 'year_end_month_only', true,
       '{"kind":"day_of_month_after","monthsAfter":1,"day":15}'::jsonb, null, null, min(effective_from), 'UNVERIFIED'
from public.deadline_rules
where form = '1601-C' and frequency = 'monthly'
having count(*) > 0
on conflict (id) do nothing;

-- 4. Open December 1601-C filings take the new rule and due date (15 January,
--    moved past weekends and holidays). An open amendment keeps its own due date
--    (the day it was raised) and takes only the rule and statutory date.
create or replace function pg_temp.next_working_day(d date) returns date
language plpgsql stable as $$
begin
  while extract(isodow from d) in (6, 7) or exists (select 1 from public.holidays h where h.date = d) loop
    d := d + 1;
  end loop;
  return d;
end;
$$;

with due as (
  select f.id, f.amends, make_date(extract(year from f.period_end)::int + 1, 1, 15) as statutory
  from public.filing_instances f
  where f.form = '1601-C'
    and extract(month from f.period_end) = 12
    and f.status not in ('filed', 'paid', 'proof_uploaded')
    and exists (select 1 from public.deadline_rules r where r.id = '1601C-DEC')
)
update public.filing_instances f
set rule_id = '1601C-DEC',
    statutory_due_date = due.statutory,
    due_date = case when due.amends is null then pg_temp.next_working_day(due.statutory) else f.due_date end
from due
where f.id = due.id;

drop function pg_temp.next_working_day(date);
