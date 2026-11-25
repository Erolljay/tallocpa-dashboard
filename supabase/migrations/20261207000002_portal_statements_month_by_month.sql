-- Portal statements after the client's approval (Owner's answers, docs/REWORK.md 19a),
-- replacing the year-to-date reading of 20261207000001:
--
--   - Each month stands on its own returns: a closed month shows once every monthly or
--     quarterly return covering THAT month is client approved or later. A held earlier
--     month does not hold later months, although every statement reads the year to date.
--   - A quarter shows when its three months show; the year when its twelve months show
--     AND its annual income tax return (1701, 1701A, 1702-RT/EX/MX) is client approved or
--     later. Other annual returns (1604-C, 1604-E, inventory list) hold nothing.
--   - The latest return of a period decides (the highest amendment): once an amended
--     return is started, the period is held again until the client approves the
--     amended return, as the corrected books of that period wait for it; the
--     original's approval no longer counts. An approval sent back no longer counts.
--   - Unchanged: a month no return covers shows on the lock alone; staff see
--     everything; the loose-leaf books keep the lock-only rule.
--
-- portal_trial_balance now takes the report it serves (p_kind: monthly, quarterly or
-- annual; monthly by default) and checks, for a client user, the months that report
-- stands on, ending with the month of p_to: that month; its quarter's three months; or
-- the twelve months and the annual income tax return. Months before the books' start
-- hold nothing. The annual statement's prior-year column is read as a monthly report
-- of the prior year's last month.

drop function if exists public.portal_trial_balance(uuid, date, date);
drop function if exists private.check_portal_statements(uuid, date, date);
drop function if exists private.portal_statement_holds_for_caller(uuid);
drop function if exists private.portal_statement_holds(uuid);

/** Annual income tax returns: they hold the annual statements of their year. */
create or replace function private.annual_income_tax_forms() returns text[]
language sql immutable set search_path = '' as $$
  select array['1701', '1701A', '1702-RT', '1702-EX', '1702-MX']
$$;

/**
 * What holds the client's statements, each with the return that holds it: the latest
 * return of its period (the highest amendment), not yet client approved or later.
 *   scope 'month': a closed month covered by a monthly or quarterly return;
 *   scope 'year':  the last month of a taxable year whose annual income tax return
 *                  waits (listed once that month is closed).
 * amended: the holding return is an amended return (the period's books were corrected).
 * Ignores who is asking; callers decide whether holds apply.
 */
create or replace function private.portal_statement_holds(p_client uuid)
returns table (scope text, month date, filing_id uuid, form text, period_label text, status text, amended boolean)
language sql stable security definer set search_path = '' as $$
  with b as (
    select date_trunc('month', books_start)::date as first_month, private.books_locked_through(p_client) as through
    from public.client_books where client_id = p_client
  ),
  months as (
    select gs::date as m from b, generate_series(b.first_month, b.through, interval '1 month') gs where b.through is not null
  ),
  latest as (
    select distinct on (f.obligation_id, f.period_end)
           f.id, f.form, f.period_label, f.period_start, f.period_end, f.status, f.amendment_no,
           case when o.frequency = 'annual' then 'year' else 'month' end as scope
    from public.filing_instances f
    join public.obligations o on o.id = f.obligation_id
    where f.client_id = p_client
      and (o.frequency in ('monthly', 'quarterly') or (o.frequency = 'annual' and f.form = any (private.annual_income_tax_forms())))
    order by f.obligation_id, f.period_end, f.amendment_no desc
  )
  select l.scope, m.m, l.id, l.form, l.period_label, l.status, l.amendment_no > 0
  from latest l
  join months m
    on (l.scope = 'month' and l.period_start <= (m.m + interval '1 month' - interval '1 day')::date and l.period_end >= m.m)
    or (l.scope = 'year' and m.m = date_trunc('month', l.period_end)::date)
  where l.status not in ('client_approved', 'owner_approved', 'filed')
$$;

/** The holds that apply to the caller: the client's users only (staff see every closed month). */
create or replace function private.portal_statement_holds_for_caller(p_client uuid)
returns table (scope text, month date, filing_id uuid, form text, period_label text, status text, amended boolean)
language sql stable security definer set search_path = '' as $$
  select * from private.portal_statement_holds(p_client) where not private.is_staff()
$$;

/** The range is locked (check_portal_books) and, for a client user, the months the report stands on are not held. */
create or replace function private.check_portal_statements(p_client uuid, p_from date, p_to date, p_kind text) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  last_month date := date_trunc('month', p_to)::date;
  first_month date;
  held date;
begin
  if p_kind is null or p_kind not in ('monthly', 'quarterly', 'annual') then
    raise exception 'Choose the report' using errcode = '22023';
  end if;
  perform private.check_portal_books(p_client, p_from, p_to);
  first_month := (last_month - case p_kind when 'monthly' then interval '0 months' when 'quarterly' then interval '2 months' else interval '11 months' end)::date;
  select min(h.month) into held from private.portal_statement_holds_for_caller(p_client) h
    where h.scope = 'month' and h.month between first_month and last_month;
  if held is not null then
    raise exception 'The statements for % wait for your approval of its returns', to_char(held, 'FMMonth YYYY') using errcode = '42501';
  end if;
  if p_kind = 'annual' and exists (
    select 1 from private.portal_statement_holds_for_caller(p_client) h where h.scope = 'year' and h.month = last_month
  ) then
    raise exception 'The statements for the year ending % wait for your approval of its income tax return', to_char(p_to, 'FMMonth YYYY') using errcode = '42501';
  end if;
end;
$$;

/** What the portal needs to offer the client's reports: the books' start, the permit, the locked-through date and the holds. */
create or replace function public.portal_books(p_client uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  if p_client is null or not private.can_read_portal_books(p_client) then
    raise exception 'Client not found' using errcode = '42501';
  end if;
  return (
    select jsonb_build_object(
      'books_start', b.books_start,
      'permit', b.books_permit,
      'locked_through', private.books_locked_through(p_client),
      'statement_holds', coalesce((
        select jsonb_agg(jsonb_build_object('scope', h.scope, 'month', h.month, 'filing_id', h.filing_id, 'form', h.form, 'period_label', h.period_label, 'status', h.status, 'amended', h.amended)
          order by h.month, h.scope, h.form, h.period_label)
        from private.portal_statement_holds_for_caller(p_client) h), '[]'::jsonb))
    from public.client_books b where b.client_id = p_client
  );
end;
$$;

/** The trial balance of a locked range for a report (p_kind) whose months, for a client user, are not held (same columns as trial_balance). */
create or replace function public.portal_trial_balance(p_client uuid, p_from date, p_to date, p_kind text default 'monthly')
returns table (account_id uuid, code text, name text, type text, normal_side text, fs_line text, bir_line text, control text, cash_flow text,
               opening numeric, debit numeric, credit numeric, closing numeric)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.check_portal_statements(p_client, p_from, p_to, p_kind);
  return query select * from public.trial_balance(p_client, p_from, p_to);
end;
$$;

revoke execute on function private.annual_income_tax_forms() from public, anon, authenticated;
revoke execute on function private.portal_statement_holds(uuid) from public, anon, authenticated;
revoke execute on function private.portal_statement_holds_for_caller(uuid) from public, anon, authenticated;
revoke execute on function private.check_portal_statements(uuid, date, date, text) from public, anon, authenticated;
revoke execute on function public.portal_trial_balance(uuid, date, date, text) from public, anon;
grant execute on function public.portal_trial_balance(uuid, date, date, text) to authenticated;
