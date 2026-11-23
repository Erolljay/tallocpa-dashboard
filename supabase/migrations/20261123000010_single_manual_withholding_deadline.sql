-- One deadline per form for every client (spec §3.3).
--
-- The firm files 0619-E and 1601-C by the manual (eBIRForms) deadline, the 10th of
-- the following month, even for eFPS clients; it does not use the staggered eFPS
-- group dates. The eBIRForms rules become channel-less rules '0619E' and '1601C'
-- (keeping any due date, versions and verification the Owner already saved), the
-- eFPS group rules are removed, and open filings move to the manual due date.

-- 1. Channel-less copies of the eBIRForms rules, versions included ('1601C-ebir@2027-01-01' -> '1601C@2027-01-01').
insert into public.deadline_rules (
  id, form, frequency, period_filter, calendar_year, due, channel, efps_group,
  effective_from, effective_to, source, verified_by, verified_at
)
select
  regexp_replace(id, '-ebir', ''), form, frequency, period_filter, calendar_year, due, null, null,
  effective_from, effective_to, source, verified_by, verified_at
from public.deadline_rules
where id ~ '^(0619E|1601C)-ebir(@|$)'
on conflict (id) do nothing;

-- 2. Point every filing (filed or not) at the channel-less rule in force for its period.
update public.filing_instances f
set rule_id = (
  select r.id
  from public.deadline_rules r
  where r.form = f.form
    and r.channel is null
    and r.effective_from <= f.period_end
    and (r.effective_to is null or f.period_end <= r.effective_to)
  order by r.effective_from desc
  limit 1
)
where f.rule_id ~ '^(0619E|1601C)-(ebir|efps-[A-E])(@|$)';

-- 3. Open filings take the manual due date, moved past weekends and holidays.
create function pg_temp.next_working_day(d date) returns date
language plpgsql stable as $$
begin
  while extract(isodow from d) in (6, 7) or exists (select 1 from public.holidays h where h.date = d) loop
    d := d + 1;
  end loop;
  return d;
end;
$$;

with due as (
  select
    f.id,
    case r.due ->> 'day'
      when 'last' then (date_trunc('month', f.period_end) + make_interval(months => (r.due ->> 'monthsAfter')::int + 1) - interval '1 day')::date
      else (date_trunc('month', f.period_end) + make_interval(months => (r.due ->> 'monthsAfter')::int) + make_interval(days => (r.due ->> 'day')::int - 1))::date
    end as statutory
  from public.filing_instances f
  join public.deadline_rules r on r.id = f.rule_id
  where f.form in ('0619-E', '1601-C')
    and f.status not in ('filed', 'paid', 'proof_uploaded')
    and r.due ->> 'kind' = 'day_of_month_after'
)
update public.filing_instances f
set statutory_due_date = due.statutory,
    due_date = pg_temp.next_working_day(due.statutory)
from due
where f.id = due.id
  and (f.statutory_due_date, f.due_date) is distinct from (due.statutory, pg_temp.next_working_day(due.statutory));

-- 4. The eBIRForms and eFPS group rules are no longer used.
delete from public.deadline_rules
where id ~ '^(0619E|1601C)-(ebir|efps-[A-E])(@|$)';
