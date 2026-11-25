-- Rework phase 3 (docs/REWORK.md, decision 15b): what returns post in the client's Books.
--
-- VAT closing, when a 2550Q is Filed & paid, dated the last day of its quarter
-- (general journal, source 'vat_closing'), from the Books' balances on that day:
--     Dr Output VAT                     the output VAT balance
--        Cr Creditable VAT Withheld     up to the output VAT
--        Cr Input VAT                   up to what remains
--        Cr VAT Payable                 the rest, if any
--   Excess input VAT stays as Input VAT, carried over (no VAT payable line then).
--   Like the year-end closing it is not a change to the quarter's figures: the period
--   lock does not stop it, and ranges that contain it leave it out (private.is_closing),
--   so the quarter's workpapers and tie-outs still see its VAT. Filing an amended 2550Q
--   reverses the earlier closing of the quarter and closes it again.
--
-- Dues payment (cash disbursements book, source 'dues_payment'), with no clearing
-- account, dated the day the client paid:
--     Dr EWT payable (0619-E, 1601-EQ) / Withholding Tax Payable - Compensation (1601-C) /
--        VAT Payable (2550Q) / SSS, PhilHealth and Pag-IBIG Payable (contributions)
--        Cr Cash (cash on hand when the client paid in cash, else the first bank account)
--   - Firm-remits clients: each verified payment applied to a return's or a
--     contribution's statement item (a payment_allocations row) posts one entry for
--     the amount applied, dated the deposit's date. Removing the allocation (a voided
--     deposit) reverses it. Allocation logic itself is unchanged: this only listens.
--   - Clients who pay the BIR directly: Filed & paid posts the return's tax due, dated
--     the payment date on the return.
--
-- Posting never blocks a payment or a filing: when the Books cannot take the entry
-- (no books, a locked month, a missing account) the row records why, and staff post it
-- later with retry_return_book_entry().

alter table public.journal_entries drop constraint journal_entries_source_check;
alter table public.journal_entries add constraint journal_entries_source_check
  check (source in ('opening', 'manual', 'document', 'arap_update', 'reversal', 'closing', 'invoice', 'settlement', 'vat_closing', 'dues_payment'));

-- One standing VAT closing per client and quarter end.
create unique index journal_entries_one_vat_closing on public.journal_entries (client_id, entry_date) where source = 'vat_closing' and status = 'posted';

-- Closing entries (year-end and VAT) and their reversals.
create or replace function private.is_closing(p_entry public.journal_entries) returns boolean
language sql stable security definer set search_path = '' as $$
  select p_entry.source in ('closing', 'vat_closing')
      or (p_entry.source = 'reversal' and exists (select 1 from public.journal_entries c where c.id = p_entry.reverses and c.source in ('closing', 'vat_closing')))
$$;

create table public.return_book_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('vat_closing', 'dues_payment')),
  filing_instance_id uuid references public.filing_instances (id) on delete set null,
  due_id uuid references public.client_dues (id) on delete set null,
  -- The verified payment applied to the item (firm-remits clients).
  allocation_id bigint unique,
  entry_date date,
  amount numeric(18, 2),
  status text not null check (status in ('posted', 'skipped', 'failed', 'reversed')),
  note text,
  entry_id uuid references public.journal_entries (id),
  reversal_id uuid references public.journal_entries (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'posted' or entry_id is not null)
);
create index return_book_entries_filing_idx on public.return_book_entries (filing_instance_id);
create index return_book_entries_client_idx on public.return_book_entries (client_id, created_at);

create trigger audit after insert or update or delete on public.return_book_entries for each row execute function private.audit();
create trigger touch_updated_at before update on public.return_book_entries for each row execute function private.touch_updated_at();
alter table public.return_book_entries enable row level security;
create policy return_book_entries_read on public.return_book_entries for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));

-- ---------------------------------------------------------------------------
-- Internals.
-- ---------------------------------------------------------------------------

/** Reverses a posted entry without the caller checks of reverse_journal_entry (jobs and triggers). */
create or replace function private.reverse_entry_quietly(p_entry uuid, p_date date, p_reason text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  j public.journal_entries;
  lines jsonb;
  r uuid;
begin
  select * into j from public.journal_entries where id = p_entry;
  if j.id is null or j.status <> 'posted' then return null; end if;
  perform private.undo_subledger(p_entry);
  select jsonb_agg(jsonb_build_object('account_id', account_id, 'party_id', party_id, 'party_name', party_name, 'description', description, 'debit', credit, 'credit', debit) order by line_no)
    into lines from public.journal_lines where entry_id = p_entry;
  r := private.post_entry(j.client_id, greatest(p_date, j.entry_date), 'general_journal', 'reversal', 'Reversal: ' || btrim(p_reason), j.reference, lines, p_entry);
  update public.journal_entries set status = 'reversed' where id = p_entry;
  return r;
end;
$$;

/** The balance of a client's accounts with this control (debit positive) on p_date. */
create or replace function private.control_balance(p_client uuid, p_control text, p_date date) returns numeric
language sql stable security definer set search_path = '' as $$
  select coalesce(sum(l.debit - l.credit), 0)::numeric(18, 2)
  from public.journal_lines l
  join public.journal_entries e on e.id = l.entry_id and e.status in ('posted', 'reversed')
  join public.ledger_accounts a on a.id = l.account_id and a.control = p_control
  where l.client_id = p_client and e.entry_date <= p_date
$$;

/** The payable a return's tax due or a contribution is paid from, or null. */
create or replace function private.dues_payable_account(p_client uuid, p_form text, p_kind text) returns uuid
language sql stable security definer set search_path = '' as $$
  select case
    when p_kind = 'contribution' then private.account_by_key(p_client, 'government_contributions_payable')
    when p_form in ('0619-E', '1601-EQ') then private.first_control(p_client, 'ewt_payable')
    when p_form = '1601-C' then private.account_by_key(p_client, 'wtc_payable')
    when p_form in ('2550Q', '2550M') then private.account_by_key(p_client, 'vat_payable')
  end
$$;

/** Where the client's money came from: cash on hand for a cash payment, else the first bank account. */
create or replace function private.dues_cash_account(p_client uuid, p_method text) returns uuid
language sql stable security definer set search_path = '' as $$
  select case when p_method = 'cash' then coalesce(private.first_control(p_client, 'cash'), private.first_control(p_client, 'bank'))
              else coalesce(private.first_control(p_client, 'bank'), private.first_control(p_client, 'cash')) end
$$;

/**
 * Posts one dues payment entry (Dr the payable, Cr cash). Returns the entry. Raises
 * when the Books cannot take it.
 */
create or replace function private.post_dues_entry(
  p_client uuid, p_date date, p_amount numeric, p_payable uuid, p_cash uuid, p_party text, p_memo text, p_reference text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
begin
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'The client keeps no books with us' using errcode = 'P0002'; end if;
  if p_date < b.books_start then raise exception 'The payment date is before the books start (%)', b.books_start using errcode = '22023'; end if;
  if p_payable is null then raise exception 'The chart of accounts lacks the payable account for this payment' using errcode = '22023'; end if;
  if p_cash is null then raise exception 'The chart of accounts lacks a cash or bank account' using errcode = '22023'; end if;
  return private.post_entry(p_client, p_date, 'cash_disbursements', 'dues_payment', p_memo, p_reference,
    jsonb_build_array(
      jsonb_build_object('account_id', p_payable, 'party_name', p_party, 'debit', p_amount, 'description', p_memo),
      jsonb_build_object('account_id', p_cash, 'credit', p_amount, 'description', p_memo)));
end;
$$;

/** Posts (or records why it could not) the dues payment of one verified allocation. */
create or replace function private.book_dues_allocation(p_allocation bigint, p_raise boolean default false) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  a public.payment_allocations;
  d public.client_dues;
  dep public.client_deposits;
  f public.filing_instances;
  payable uuid;
  party text;
  memo text;
  e uuid;
  row_id uuid;
begin
  select * into a from public.payment_allocations where id = p_allocation;
  select * into d from public.client_dues where id = a.due_id;
  if a.id is null or coalesce(d.kind, '') not in ('tax', 'contribution') then return null; end if;
  select * into dep from public.client_deposits where id = a.deposit_id;
  select * into f from public.filing_instances where id = d.filing_instance_id;
  delete from public.return_book_entries where allocation_id = a.id and status in ('failed', 'skipped');
  if exists (select 1 from public.return_book_entries where allocation_id = a.id) then return null; end if;
  payable := private.dues_payable_account(d.client_id, f.form, d.kind);
  party := case when d.kind = 'contribution' then
                  case when d.description ~* 'philhealth' then 'PhilHealth' when d.description ~* 'pag-?ibig|hdmf' then 'Pag-IBIG Fund' when d.description ~* 'sss' then 'SSS' else 'SSS, PhilHealth and Pag-IBIG' end
                else 'Bureau of Internal Revenue' end;
  memo := 'Payment of ' || d.description || ' (paid through Tallo CPA)';
  if d.kind = 'tax' and payable is null and f.form not in ('0619-E', '1601-EQ', '1601-C', '2550Q', '2550M') then
    insert into public.return_book_entries (client_id, kind, filing_instance_id, due_id, allocation_id, entry_date, amount, status, note)
    values (d.client_id, 'dues_payment', f.id, d.id, a.id, dep.received_on, a.amount, 'skipped', 'No payable account is paid for ' || f.form || ' in the Books')
    returning id into row_id;
    return row_id;
  end if;
  begin
    e := private.post_dues_entry(d.client_id, dep.received_on, a.amount, payable, private.dues_cash_account(d.client_id, dep.method), party, memo, dep.reference);
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

/** The dues payment of a client who pays the BIR directly: the return's tax due on its payment date. */
create or replace function private.book_direct_payment(p_filing uuid, p_raise boolean default false) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  mode text;
  e uuid;
  row_id uuid;
begin
  select * into f from public.filing_instances where id = p_filing;
  select payment_mode into mode from public.clients where id = f.client_id;
  if f.id is null or mode = 'firm_remits' or coalesce(f.tax_due, 0) <= 0 or f.paid_on is null
     or f.form not in ('0619-E', '1601-EQ', '1601-C', '2550Q', '2550M') then
    return null;
  end if;
  delete from public.return_book_entries where filing_instance_id = f.id and kind = 'dues_payment' and allocation_id is null and status in ('failed', 'skipped');
  if exists (select 1 from public.return_book_entries where filing_instance_id = f.id and kind = 'dues_payment' and allocation_id is null and status = 'posted') then
    return null;
  end if;
  begin
    e := private.post_dues_entry(f.client_id, f.paid_on, f.tax_due, private.dues_payable_account(f.client_id, f.form, 'tax'),
           private.dues_cash_account(f.client_id, 'transfer'), 'Bureau of Internal Revenue',
           'Payment of ' || f.form || ' ' || f.period_label || ' to the BIR', f.payment_reference);
    insert into public.return_book_entries (client_id, kind, filing_instance_id, entry_date, amount, status, entry_id)
    values (f.client_id, 'dues_payment', f.id, f.paid_on, f.tax_due, 'posted', e)
    returning id into row_id;
  exception when others then
    if p_raise then raise; end if;
    insert into public.return_book_entries (client_id, kind, filing_instance_id, entry_date, amount, status, note)
    values (f.client_id, 'dues_payment', f.id, f.paid_on, f.tax_due, case when sqlstate = 'P0002' then 'skipped' else 'failed' end, sqlerrm)
    returning id into row_id;
  end;
  return row_id;
end;
$$;

/**
 * The VAT closing of a filed 2550Q (see the header). Reverses an earlier closing of the
 * same quarter (an amended return) first. Returns the return_book_entries row.
 */
create or replace function private.book_vat_closing(p_filing uuid, p_raise boolean default false) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  b public.client_books;
  prior record;
  c uuid;
  d date;
  output numeric(18, 2);
  input numeric(18, 2);
  wv numeric(18, 2);
  wv_used numeric(18, 2);
  input_used numeric(18, 2);
  payable numeric(18, 2);
  lines jsonb := '[]'::jsonb;
  e uuid;
  row_id uuid;
  why text;
begin
  select * into f from public.filing_instances where id = p_filing;
  if f.id is null or f.form <> '2550Q' then return null; end if;
  c := f.client_id;
  d := f.period_end;
  delete from public.return_book_entries where filing_instance_id = f.id and kind = 'vat_closing' and status in ('failed', 'skipped');
  if exists (select 1 from public.return_book_entries where filing_instance_id = f.id and kind = 'vat_closing' and status = 'posted') then return null; end if;
  select * into b from public.client_books where client_id = c;
  if b.client_id is null or d < b.books_start then
    insert into public.return_book_entries (client_id, kind, filing_instance_id, entry_date, status, note)
    values (c, 'vat_closing', f.id, d, 'skipped', 'The client keeps no books with us for this quarter')
    returning id into row_id;
    return row_id;
  end if;
  begin
    -- An amended return closes the quarter again: the earlier closing is reversed first.
    for prior in
      select r.id, r.entry_id from public.return_book_entries r
      join public.journal_entries j on j.id = r.entry_id and j.status = 'posted'
      where r.client_id = c and r.kind = 'vat_closing' and r.status = 'posted' and r.entry_date = d
    loop
      update public.return_book_entries
        set status = 'reversed', reversal_id = private.reverse_entry_quietly(prior.entry_id, d, 'VAT closed again by ' || f.form || ' ' || f.period_label)
        where id = prior.id;
    end loop;

    output := -private.control_balance(c, 'output_vat', d);
    input := private.control_balance(c, 'input_vat', d);
    wv := private.control_balance(c, 'vat_withheld', d);
    if output <= 0 then
      insert into public.return_book_entries (client_id, kind, filing_instance_id, entry_date, amount, status, note)
      values (c, 'vat_closing', f.id, d, 0, 'skipped', 'No output VAT to close; the input VAT is carried over')
      returning id into row_id;
      return row_id;
    end if;
    wv_used := least(greatest(wv, 0), output);
    input_used := least(greatest(input, 0), output - wv_used);
    payable := output - wv_used - input_used;
    lines := lines || jsonb_build_object('account_id', private.first_control(c, 'output_vat'), 'debit', output, 'description', 'Output VAT closed');
    if wv_used > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'vat_withheld'), 'credit', wv_used, 'description', 'Creditable VAT withheld applied');
    end if;
    if input_used > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'input_vat'), 'credit', input_used, 'description', 'Input VAT applied');
    end if;
    if payable > 0 then
      lines := lines || jsonb_build_object('account_id', private.account_by_key(c, 'vat_payable'), 'party_name', 'Bureau of Internal Revenue', 'credit', payable, 'description', 'VAT payable');
    end if;
    if exists (select 1 from jsonb_array_elements(lines) x where nullif(x ->> 'account_id', '') is null) then
      raise exception 'The chart of accounts lacks Output VAT, Input VAT, Creditable VAT Withheld or VAT Payable' using errcode = '22023';
    end if;
    e := private.post_entry(c, d, 'general_journal', 'vat_closing',
           'VAT closing, ' || f.form || ' ' || f.period_label || case when payable > 0 then '' else ' (excess input VAT carried over)' end,
           f.filing_reference, lines);
    insert into public.return_book_entries (client_id, kind, filing_instance_id, entry_date, amount, status, entry_id, note)
    values (c, 'vat_closing', f.id, d, payable, 'posted', e,
            case when input - input_used > 0 then 'Input VAT carried over: ' || to_char(input - input_used, 'FM999,999,999,990.00') end)
    returning id into row_id;
  exception when others then
    if p_raise then raise; end if;
    why := sqlerrm;
    insert into public.return_book_entries (client_id, kind, filing_instance_id, entry_date, status, note)
    values (c, 'vat_closing', f.id, d, 'failed', why)
    returning id into row_id;
  end;
  return row_id;
end;
$$;

/** Filed & paid: the VAT closing of a 2550Q and, for a client paying the BIR directly, its dues payment. */
create or replace function private.on_return_filed(p_filing uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform private.book_vat_closing(p_filing);
  perform private.book_direct_payment(p_filing);
end;
$$;

-- ---------------------------------------------------------------------------
-- Listening to Collections (the allocation logic is not changed).
-- ---------------------------------------------------------------------------
create or replace function private.dues_payment_on_allocation() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r public.return_book_entries;
begin
  if tg_op = 'INSERT' then
    perform private.book_dues_allocation(new.id);
    return null;
  end if;
  select * into r from public.return_book_entries where allocation_id = old.id;
  if r.id is not null then
    if r.status = 'posted' then
      begin
        update public.return_book_entries
          set status = 'reversed', allocation_id = null,
              reversal_id = private.reverse_entry_quietly(r.entry_id, private.manila_today(), 'The client''s payment was voided')
          where id = r.id;
      exception when others then
        update public.return_book_entries set status = 'failed', allocation_id = null,
          note = 'The payment was voided but its entry could not be reversed: ' || sqlerrm
          where id = r.id;
      end;
    else
      delete from public.return_book_entries where id = r.id;
    end if;
  end if;
  return null;
end;
$$;

create trigger dues_payment_on_allocation after insert or delete on public.payment_allocations
  for each row execute function private.dues_payment_on_allocation();

-- ---------------------------------------------------------------------------
-- Staff.
-- ---------------------------------------------------------------------------

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

revoke execute on function private.reverse_entry_quietly(uuid, date, text) from public, anon, authenticated;
revoke execute on function private.control_balance(uuid, text, date) from public, anon, authenticated;
revoke execute on function private.dues_payable_account(uuid, text, text) from public, anon, authenticated;
revoke execute on function private.dues_cash_account(uuid, text) from public, anon, authenticated;
revoke execute on function private.post_dues_entry(uuid, date, numeric, uuid, uuid, text, text, text) from public, anon, authenticated;
revoke execute on function private.book_dues_allocation(bigint, boolean) from public, anon, authenticated;
revoke execute on function private.book_direct_payment(uuid, boolean) from public, anon, authenticated;
revoke execute on function private.book_vat_closing(uuid, boolean) from public, anon, authenticated;
revoke execute on function private.on_return_filed(uuid) from public, anon, authenticated;
revoke execute on function private.dues_payment_on_allocation() from public, anon, authenticated;
revoke execute on function public.retry_return_book_entry(uuid) from public, anon;
grant execute on function public.retry_return_book_entry(uuid) to authenticated;
