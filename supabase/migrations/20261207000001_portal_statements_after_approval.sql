-- Portal Reports (docs/REWORK.md, decisions 10, 13, 19; Owner, option b): the
-- financial statements of a period show in the client's portal only once the client
-- has approved that period's returns.
--
-- A closed month (it and every earlier month of the books locked, as before) is
-- HELD for the client's users while a monthly or quarterly return covering it has
-- not reached the client's approval:
--
--   - A return counts once its status is client_approved, owner_approved or filed.
--     A nil return skips the client's approval (reviewing it moves it to
--     client_approved), so it counts once it is past that step.
--   - Returns are taken per period of an obligation (obligation, period end): the
--     period counts when ANY of its returns (the original or an amendment) has
--     reached the client's approval. An amended return that starts over does not
--     hide what the client already approved. A return whose own approval was
--     withdrawn (unlocking a month sends an unfiled return back to Not started)
--     no longer counts: its figures changed, so the month waits for the new approval.
--   - Only monthly and quarterly obligations hold a month. Annual returns (income
--     tax, 1604-C/E, registration) do not: they are filed months after the year.
--   - A month that no return covers shows on the lock alone.
--
-- Every statement carries year-to-date figures (and the annual one the prior year),
-- so portal_trial_balance gives a client user a range only when no closed month in
-- it is held. The Reports page offers the same periods (src/lib/portal/report-periods.ts).
--
-- Staff who keep the client's books see everything as before. The loose-leaf books
-- (portal_book_entries, and their opening balances through portal_book_openings),
-- the 2307 page and portal Home keep the lock-only rule.

/**
 * The closed months of the client's books held for the client's users, each with the
 * return that holds it (the latest of its period: an amendment over the original).
 * Ignores who is asking; callers decide whether holds apply.
 */
create or replace function private.portal_statement_holds(p_client uuid)
returns table (month date, filing_id uuid, form text, period_label text, status text)
language sql stable security definer set search_path = '' as $$
  with b as (
    select date_trunc('month', books_start)::date as first_month, private.books_locked_through(p_client) as through
    from public.client_books where client_id = p_client
  ),
  months as (
    select gs::date as m from b, generate_series(b.first_month, b.through, interval '1 month') gs where b.through is not null
  ),
  waiting as (
    select f.obligation_id, f.period_end, min(f.period_start) as period_start
    from public.filing_instances f
    join public.obligations o on o.id = f.obligation_id
    where f.client_id = p_client and o.frequency in ('monthly', 'quarterly')
    group by f.obligation_id, f.period_end
    having not bool_or(f.status in ('client_approved', 'owner_approved', 'filed'))
  )
  select m.m, latest.id, latest.form, latest.period_label, latest.status
  from months m
  join waiting w on w.period_start <= (m.m + interval '1 month' - interval '1 day')::date and w.period_end >= m.m
  cross join lateral (
    select x.id, x.form, x.period_label, x.status from public.filing_instances x
    where x.obligation_id = w.obligation_id and x.period_end = w.period_end
    order by x.amendment_no desc limit 1
  ) latest
$$;

/** The holds that apply to the caller: the client's users only (staff see every closed month). */
create or replace function private.portal_statement_holds_for_caller(p_client uuid)
returns table (month date, filing_id uuid, form text, period_label text, status text)
language sql stable security definer set search_path = '' as $$
  select * from private.portal_statement_holds(p_client) where not private.is_staff()
$$;

/** The range is locked (check_portal_books) and, for a client user, no closed month in it is held. */
create or replace function private.check_portal_statements(p_client uuid, p_from date, p_to date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  held date;
begin
  perform private.check_portal_books(p_client, p_from, p_to);
  select min(h.month) into held from private.portal_statement_holds_for_caller(p_client) h
    where h.month between date_trunc('month', p_from)::date and p_to;
  if held is not null then
    raise exception 'The statements for % wait for your approval of its returns', to_char(held, 'FMMonth YYYY') using errcode = '42501';
  end if;
end;
$$;

/** What the portal needs to offer the client's reports: the books' start, the permit, the locked-through date and the held months. */
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
        select jsonb_agg(jsonb_build_object('month', h.month, 'filing_id', h.filing_id, 'form', h.form, 'period_label', h.period_label, 'status', h.status)
          order by h.month, h.form, h.period_label)
        from private.portal_statement_holds_for_caller(p_client) h), '[]'::jsonb))
    from public.client_books b where b.client_id = p_client
  );
end;
$$;

/** The trial balance of a range whose months are all locked and, for a client user, none held (same columns as trial_balance). */
create or replace function public.portal_trial_balance(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, type text, normal_side text, fs_line text, bir_line text, control text, cash_flow text,
               opening numeric, debit numeric, credit numeric, closing numeric)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.check_portal_statements(p_client, p_from, p_to);
  return query select * from public.trial_balance(p_client, p_from, p_to);
end;
$$;

/** The opening balance of each account for the loose-leaf books of a locked range (the lock-only rule). */
create or replace function public.portal_book_openings(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, opening numeric)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.check_portal_books(p_client, p_from, p_to);
  return query select t.account_id, t.opening from public.trial_balance(p_client, p_from, p_to) t;
end;
$$;

revoke execute on function private.portal_statement_holds(uuid) from public, anon, authenticated;
revoke execute on function private.portal_statement_holds_for_caller(uuid) from public, anon, authenticated;
revoke execute on function private.check_portal_statements(uuid, date, date) from public, anon, authenticated;
revoke execute on function public.portal_book_openings(uuid, date, date) from public, anon;
grant execute on function public.portal_book_openings(uuid, date, date) to authenticated;
