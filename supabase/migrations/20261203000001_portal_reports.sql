-- Rework phase 4 (docs/REWORK.md, decision 19): portal Reports from the Books.
--
-- The client's users never read the ledger tables (their policies are staff only).
-- The portal reads the financial statements and the loose-leaf books through these
-- functions, which answer only for the caller's own business and only for LOCKED
-- months: every month from the start of the books up to the last month of the
-- period must be locked (decision 9), so what the client sees cannot change under
-- them. Staff who keep the client's books may call them too.
--
--   portal_books(client)                       books start, permit, locked-through date
--   portal_trial_balance(client, from, to)     trial_balance() for a locked range
--   portal_book_entries(client, from, to)      the chart of accounts and the posted entries
--                                              of a locked range, for the loose-leaf books
--
-- Filed returns, their scanned copy and validation report need nothing new: the
-- client's users already read their filing_instances and, once filed, the current
-- filed_copy and validation_report rows of filing_files (20261127100001).

/** The caller is one of the client's users, or staff who may see the client's books. */
create or replace function private.can_read_portal_books(p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_client_user(p_client) or (private.is_staff() and private.can_access_client(p_client))
$$;

/**
 * The last day of the unbroken run of locked months from the start of the books
 * (the month before the first open one), or null when the first month is open or
 * the books are not set up. A month reopened by an amendment or an unlock is open.
 */
create or replace function private.books_locked_through(p_client uuid) returns date
language sql stable security definer set search_path = '' as $$
  with b as (
    select date_trunc('month', books_start)::date as first_month from public.client_books where client_id = p_client
  ),
  months as (
    select gs::date as m
    from b, generate_series(b.first_month, date_trunc('month', now() at time zone 'Asia/Manila')::date, interval '1 month') gs
  ),
  first_open as (
    select min(m) as m from months where private.books_locked_by(p_client, m) is null
  )
  select case
    when (select first_month from b) is null then null
    when (select m from first_open) is null then ((select max(m) from months) + interval '1 month' - interval '1 day')::date
    when (select m from first_open) = (select first_month from b) then null
    else ((select m from first_open) - 1)
  end
$$;

create or replace function private.check_portal_books(p_client uuid, p_from date, p_to date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  through date;
begin
  if p_client is null or not private.can_read_portal_books(p_client) then
    raise exception 'Client not found' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_to < p_from then
    raise exception 'Choose the period' using errcode = '22023';
  end if;
  through := private.books_locked_through(p_client);
  if through is null or p_to > through then
    raise exception 'The books for % are not locked yet', to_char(p_to, 'FMMonth YYYY') using errcode = '42501';
  end if;
end;
$$;

/** What the portal needs to offer the client's reports: the books' start, the permit, and the locked-through date. */
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
      'locked_through', private.books_locked_through(p_client))
    from public.client_books b where b.client_id = p_client
  );
end;
$$;

/** The trial balance of a range whose months are all locked (same columns as trial_balance). */
create or replace function public.portal_trial_balance(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, type text, normal_side text, fs_line text, bir_line text, control text, cash_flow text,
               opening numeric, debit numeric, credit numeric, closing numeric)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.check_portal_books(p_client, p_from, p_to);
  return query select * from public.trial_balance(p_client, p_from, p_to);
end;
$$;

/**
 * The chart of accounts and the posted (and later reversed) entries dated p_from…p_to
 * of a locked range, oldest first, shaped like the app's own selects so the same
 * mappers build the loose-leaf books.
 */
create or replace function public.portal_book_entries(p_client uuid, p_from date, p_to date) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.check_portal_books(p_client, p_from, p_to);
  return jsonb_build_object(
    'accounts', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', a.id, 'template_key', a.template_key, 'code', a.code, 'name', a.name, 'type', a.type, 'normal_side', a.normal_side,
        'fs_line', a.fs_line, 'bir_line', a.bir_line, 'control', a.control, 'cash_flow', a.cash_flow, 'active', a.active, 'sort_order', a.sort_order)
        order by a.sort_order, a.code)
      from public.ledger_accounts a where a.client_id = p_client), '[]'::jsonb),
    'entries', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', e.id, 'entry_date', e.entry_date, 'book', e.book, 'reference', e.reference, 'memo', e.memo,
        'journal_lines', coalesce((
          select jsonb_agg(jsonb_build_object(
            'line_no', l.line_no, 'account_id', l.account_id, 'description', l.description, 'debit', l.debit, 'credit', l.credit,
            'party_name', l.party_name,
            'parties', (select jsonb_build_object('display_name', p.display_name, 'tin', p.tin) from public.parties p where p.id = l.party_id))
            order by l.line_no)
          from public.journal_lines l where l.entry_id = e.id), '[]'::jsonb))
        order by e.entry_date, e.created_at)
      from public.journal_entries e
      where e.client_id = p_client and e.status in ('posted', 'reversed') and e.entry_date between p_from and p_to), '[]'::jsonb));
end;
$$;

revoke execute on function private.can_read_portal_books(uuid) from public, anon, authenticated;
revoke execute on function private.books_locked_through(uuid) from public, anon, authenticated;
revoke execute on function private.check_portal_books(uuid, date, date) from public, anon, authenticated;
revoke execute on function public.portal_books(uuid) from public, anon;
revoke execute on function public.portal_trial_balance(uuid, date, date) from public, anon;
revoke execute on function public.portal_book_entries(uuid, date, date) from public, anon;
grant execute on function public.portal_books(uuid) to authenticated;
grant execute on function public.portal_trial_balance(uuid, date, date) to authenticated;
grant execute on function public.portal_book_entries(uuid, date, date) to authenticated;
