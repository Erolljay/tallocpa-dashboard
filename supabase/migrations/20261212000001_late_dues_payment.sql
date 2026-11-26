-- A client's payment dated in a month that is already locked (Owner, 26 November 2026).
--
-- Found by the December rehearsal: the Owner verifies a payment the client made on, say,
-- 29 December after December is locked. Its dues payment entry (Dr the payables, Cr Cash,
-- migration 20261127100004) was refused ("December 2026 is locked"), and retrying failed
-- too; the only way out was an unlock, which restarts or flags December's returns.
--
-- Now the entry is recorded in the next open month instead, on its first day, and its memo
-- says when the client paid. The payment's own date is unchanged everywhere else
-- (return_book_entries.entry_date, the deposit, the statement). Months already locked stay
-- untouched. When no later month is open within two years, the entry fails as before.

/** The date to book a dues payment made on p_date: p_date if its month is open, else the first day of the next open month. */
create or replace function private.dues_entry_date(p_client uuid, p_date date) returns date
language plpgsql stable security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_date)::date;
begin
  if private.books_locked_by(p_client, p_date) is null then return p_date; end if;
  for i in 1..24 loop
    m := (m + interval '1 month')::date;
    if private.books_locked_by(p_client, m) is null then return m; end if;
  end loop;
  return p_date;
end;
$$;

create or replace function private.post_dues_entry(
  p_client uuid, p_date date, p_amount numeric, p_payable uuid, p_cash uuid, p_party text, p_memo text, p_reference text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
  v_date date;
  v_memo text := p_memo;
begin
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'The client keeps no books with us' using errcode = 'P0002'; end if;
  if p_date < b.books_start then raise exception 'The payment date is before the books start (%)', b.books_start using errcode = '22023'; end if;
  if p_payable is null then raise exception 'The chart of accounts lacks the payable account for this payment' using errcode = '22023'; end if;
  if p_cash is null then raise exception 'The chart of accounts lacks a cash or bank account' using errcode = '22023'; end if;
  v_date := private.dues_entry_date(p_client, p_date);
  if v_date <> p_date then
    v_memo := p_memo || ' · paid ' || to_char(p_date, 'FMMon FMDD, YYYY') || ', booked in ' || to_char(v_date, 'FMMonth YYYY') || ' (' || to_char(p_date, 'FMMonth') || ' was locked)';
  end if;
  return private.post_entry(p_client, v_date, 'cash_disbursements', 'dues_payment', v_memo, p_reference,
    jsonb_build_array(
      jsonb_build_object('account_id', p_payable, 'party_name', p_party, 'debit', p_amount, 'description', v_memo),
      jsonb_build_object('account_id', p_cash, 'credit', p_amount, 'description', v_memo)));
end;
$$;

revoke execute on function private.dues_entry_date(uuid, date) from public, anon, authenticated;
revoke execute on function private.post_dues_entry(uuid, date, numeric, uuid, uuid, text, text, text) from public, anon, authenticated;
