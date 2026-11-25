-- Portal Home (docs/REWORK.md, decision 18): what the client sees about their own Books
-- and their team. The Books and the staff directory are staff-only under RLS, so the
-- portal reads them through these two functions, each limited to a business the
-- signed-in client user belongs to (or a client the staff member can open).
--
--   portal_books_summary(client, from, to)  balances at the end of `to` by account type
--                                           and control (cash, bank, AR, AP), the
--                                           month-by-month movement by account type
--                                           (closing entries left out, so a year-end
--                                           close does not wipe December's income),
--                                           and which months are locked. Posted
--                                           entries only, locked or not: the portal
--                                           labels unlocked months as not final.
--   portal_client_team(client)              the assigned preparer and reviewer: name,
--                                           email and photo (from the sign-in profile).

create or replace function private.can_see_portal(p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_client_user(p_client) or (private.is_staff() and private.can_access_client(p_client))
$$;

create or replace function public.portal_books_summary(p_client uuid, p_from date, p_to date) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  f date := date_trunc('month', p_from)::date;
  t date := (date_trunc('month', p_to) + interval '1 month - 1 day')::date;
begin
  if p_client is null or not private.can_see_portal(p_client) then
    raise exception 'Business not found' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or t < f or f < (t - interval '24 months')::date then
    raise exception 'Choose a range of up to two years' using errcode = '22023';
  end if;
  return jsonb_build_object(
    'as_of', t,
    'balances', coalesce((
      select jsonb_agg(jsonb_build_object('type', b.type, 'control', b.control, 'debit', b.debit, 'credit', b.credit) order by b.type, b.control)
      from (
        select a.type, a.control, sum(l.debit)::numeric(18, 2) as debit, sum(l.credit)::numeric(18, 2) as credit
        from public.journal_lines l
        join public.journal_entries e on e.client_id = l.client_id and e.id = l.entry_id
        join public.ledger_accounts a on a.client_id = l.client_id and a.id = l.account_id
        where l.client_id = p_client and e.status <> 'suggested' and e.entry_date <= t
        group by a.type, a.control
      ) b), '[]'::jsonb),
    'months', coalesce((
      select jsonb_agg(jsonb_build_object('month', m.period, 'type', m.type, 'debit', m.debit, 'credit', m.credit) order by m.period, m.type)
      from (
        select e.period, a.type, sum(l.debit)::numeric(18, 2) as debit, sum(l.credit)::numeric(18, 2) as credit
        from public.journal_lines l
        join public.journal_entries e on e.client_id = l.client_id and e.id = l.entry_id
        join public.ledger_accounts a on a.client_id = l.client_id and a.id = l.account_id
        where l.client_id = p_client and e.status <> 'suggested' and e.source <> 'closing'
          and e.entry_date between f and t
          and a.type in ('revenue', 'other_income', 'cost', 'expense', 'income_tax')
        group by e.period, a.type
      ) m), '[]'::jsonb),
    'locked', coalesce((
      select jsonb_agg(g.m::date order by g.m)
      from generate_series(f, t, interval '1 month') g(m)
      where private.books_locked_by(p_client, g.m::date) is not null), '[]'::jsonb),
    'has_books', exists (select 1 from public.ledger_accounts where client_id = p_client)
  );
end;
$$;

create or replace function public.portal_client_team(p_client uuid)
returns table (role text, full_name text, email text, photo_url text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if p_client is null or not private.can_see_portal(p_client) then
    raise exception 'Business not found' using errcode = '42501';
  end if;
  return query
    select sa.role, sp.full_name, u.email::text,
           coalesce(u.raw_user_meta_data ->> 'avatar_url', u.raw_user_meta_data ->> 'picture')
    from public.staff_assignments sa
    join public.staff_profiles sp on sp.user_id = sa.user_id and sp.active
    join auth.users u on u.id = sa.user_id
    where sa.client_id = p_client
    order by case sa.role when 'preparer' then 0 else 1 end, sp.full_name;
end;
$$;

revoke execute on function private.can_see_portal(uuid) from public, anon;
revoke execute on function public.portal_books_summary(uuid, date, date) from public, anon;
revoke execute on function public.portal_client_team(uuid) from public, anon;
grant execute on function private.can_see_portal(uuid) to authenticated;
grant execute on function public.portal_books_summary(uuid, date, date) to authenticated;
grant execute on function public.portal_client_team(uuid) to authenticated;
