-- Bookkeeping, Phase 1B slice 2 (spec §3.6): approved documents become
-- suggested journal entries, and receivables and payables are kept by customer
-- and supplier.
--
--   parties.preset_account_key   a supplier's or customer's usual account title,
--                                firm-wide, as a template key (e.g. Starbucks →
--                                'representation'); each client's own account is
--                                found by ledger_accounts.template_key.
--   client_party_accounts        the account a client last used for a party:
--                                it comes before the firm-wide preset.
--   documents.ledger_account_id  the account title chosen on the document.
--   open_item_applications       collections and payments applied to open
--                                receivables and payables (balance kept on the item).
--   arap_updates                 the monthly AR/AP update: the client (or staff)
--                                fills in what was collected and paid against
--                                each open invoice; staff post it to the Cash
--                                Receipts / Cash Disbursements Books.
--
-- The cash / charge terms of an invoice are an approved field
-- (approved_fields.payment_terms), read by OCR and confirmed on review.

alter table public.parties
  add column preset_account_key text check (preset_account_key ~ '^[a-z][a-z0-9_]*$');

create table public.client_party_accounts (
  client_id uuid not null references public.clients (id) on delete cascade,
  party_id uuid not null references public.parties (id) on delete cascade,
  kind text not null check (kind in ('sale', 'purchase')),
  account_id uuid not null,
  updated_at timestamptz not null default now(),
  primary key (client_id, party_id, kind),
  foreign key (client_id, account_id) references public.ledger_accounts (client_id, id) on delete cascade
);

alter table public.documents add column ledger_account_id uuid;
alter table public.documents add constraint documents_ledger_account_fkey
  foreign key (client_id, ledger_account_id) references public.ledger_accounts (client_id, id);

alter table public.journal_lines add column party_name text;
alter table public.journal_lines add column open_item_id uuid references public.open_items (id);

create table public.open_item_applications (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  -- An item with applications cannot be deleted (e.g. by importing the opening balances again).
  open_item_id uuid not null references public.open_items (id) on delete restrict,
  entry_id uuid not null references public.journal_entries (id) on delete cascade,
  amount numeric(18, 2) not null check (amount > 0),
  created_at timestamptz not null default now()
);
create index open_item_applications_item_idx on public.open_item_applications (open_item_id);
create index open_item_applications_entry_idx on public.open_item_applications (entry_id);

create table public.arap_updates (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  month date not null check (extract(day from month) = 1),
  source text not null check (source in ('portal', 'staff')),
  status text not null default 'submitted' check (status in ('submitted', 'posted', 'returned')),
  -- [{open_item_id, amount, date, account_id, reference}]
  rows jsonb not null check (jsonb_typeof(rows) = 'array'),
  submitted_by uuid references auth.users (id) default auth.uid(),
  submitted_at timestamptz not null default now(),
  decided_by uuid references auth.users (id),
  decided_at timestamptz,
  return_reason text,
  check ((status = 'returned') = (return_reason is not null))
);
create index arap_updates_client_idx on public.arap_updates (client_id, month);

do $$
declare t text;
begin
  foreach t in array array['client_party_accounts', 'open_item_applications', 'arap_updates'] loop
    execute format('create trigger audit after insert or update or delete on public.%I for each row execute function private.audit()', t);
  end loop;
end;
$$;

alter table public.client_party_accounts enable row level security;
alter table public.open_item_applications enable row level security;
alter table public.arap_updates enable row level security;

create policy party_accounts_read on public.client_party_accounts for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy applications_read on public.open_item_applications for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
-- Client users follow their own AR/AP updates in the portal.
create policy arap_updates_read on public.arap_updates for select to authenticated
  using (private.can_access_client(client_id));

-- ---------------------------------------------------------------------------
-- The approved figures of a document with a posted entry cannot change: reverse
-- the entry first.
-- ---------------------------------------------------------------------------
create or replace function private.extractions_ledger_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.approved_fields is distinct from old.approved_fields
     and exists (select 1 from public.journal_entries where document_id = new.document_id and status = 'posted') then
    raise exception 'This document is in the books: reverse its journal entry before changing the figures' using errcode = '42501';
  end if;
  return new;
end;
$$;
create trigger ledger_guard before update on public.extractions
  for each row execute function private.extractions_ledger_guard();

-- ---------------------------------------------------------------------------
-- Subledger: posting an entry opens and settles receivables and payables.
--   AR debit / AP credit       opens an item for the line's party;
--   AR credit / AP debit       settles the line's open_item_id, or the party's
--                              oldest open items; what is left is a credit.
-- ---------------------------------------------------------------------------
create or replace function private.post_subledger(p_entry uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  e public.journal_entries;
  l record;
  it public.open_items;
  v_kind text;
  delta numeric;
  amt numeric;
  take numeric;
begin
  select * into e from public.journal_entries where id = p_entry;
  for l in
    select jl.*, a.control, p.display_name as p_name, p.tin as p_tin
    from public.journal_lines jl
    join public.ledger_accounts a on a.id = jl.account_id
    left join public.parties p on p.id = jl.party_id
    where jl.entry_id = p_entry and a.control in ('ar', 'ap')
    order by jl.line_no
  loop
    v_kind := case when l.control = 'ar' then 'receivable' else 'payable' end;
    delta := case when v_kind = 'receivable' then l.debit - l.credit else l.credit - l.debit end;
    if delta > 0 then
      if l.open_item_id is not null then
        raise exception 'An invoice to settle can only be reduced' using errcode = '22023';
      end if;
      insert into public.open_items (client_id, kind, party_id, party_name, party_tin, doc_number, doc_date, amount, balance, account_id, source_entry_id)
      values (e.client_id, v_kind, l.party_id, coalesce(nullif(btrim(l.party_name), ''), l.p_name, e.memo), l.p_tin, e.reference, e.entry_date, delta, delta, l.account_id, p_entry);
    else
      amt := -delta;
      if l.open_item_id is not null then
        select * into it from public.open_items where id = l.open_item_id for update;
        if it.id is null or it.client_id <> e.client_id or it.kind <> v_kind then
          raise exception 'Open invoice not found' using errcode = 'P0002';
        end if;
        if it.balance < amt then
          raise exception 'Only % is still open on % %', it.balance, it.party_name, coalesce(it.doc_number, '') using errcode = '22023';
        end if;
        insert into public.open_item_applications (client_id, open_item_id, entry_id, amount) values (e.client_id, it.id, p_entry, amt);
        update public.open_items set balance = balance - amt where id = it.id;
        amt := 0;
      elsif l.party_id is not null then
        for it in
          select * from public.open_items
          where client_id = e.client_id and kind = v_kind and party_id = l.party_id and balance > 0
          order by doc_date nulls last, created_at
          for update
        loop
          exit when amt = 0;
          take := least(it.balance, amt);
          insert into public.open_item_applications (client_id, open_item_id, entry_id, amount) values (e.client_id, it.id, p_entry, take);
          update public.open_items set balance = balance - take where id = it.id;
          amt := amt - take;
        end loop;
      end if;
      if amt > 0 then
        -- Nothing left to settle: an unapplied credit for the party.
        insert into public.open_items (client_id, kind, party_id, party_name, party_tin, doc_number, doc_date, amount, balance, account_id, source_entry_id)
        values (e.client_id, v_kind, l.party_id, coalesce(nullif(btrim(l.party_name), ''), l.p_name, e.memo), l.p_tin, e.reference, e.entry_date, -amt, -amt, l.account_id, p_entry);
      end if;
    end if;
  end loop;
end;
$$;

-- Undoes what posting an entry did to the subledger (before it is reversed).
create or replace function private.undo_subledger(p_entry uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if exists (
    select 1 from public.open_item_applications ap
    join public.open_items oi on oi.id = ap.open_item_id
    where oi.source_entry_id = p_entry and ap.entry_id <> p_entry
  ) then
    raise exception 'Collections or payments were already applied to this entry''s invoice; reverse those first' using errcode = '22023';
  end if;
  update public.open_items oi set balance = oi.balance + s.amt
    from (select open_item_id, sum(amount) as amt from public.open_item_applications where entry_id = p_entry group by open_item_id) s
    where oi.id = s.open_item_id;
  delete from public.open_item_applications where entry_id = p_entry;
  delete from public.open_items where source_entry_id = p_entry;
end;
$$;

-- post_entry (slice 1) now carries the party name and the invoice a line settles,
-- and updates the subledger (the opening balances bring their own open items; a
-- reversal undoes the original's instead).
create or replace function private.post_entry(
  p_client uuid, p_date date, p_book text, p_source text, p_memo text, p_reference text, p_lines jsonb, p_reverses uuid default null
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  e uuid;
begin
  e := private.insert_entry(p_client, p_date, p_book, p_source, p_memo, p_reference, p_lines, p_reverses, null);
  update public.journal_entries set status = 'posted', posted_by = auth.uid(), posted_at = now() where id = e;
  if p_source not in ('opening', 'reversal') then perform private.post_subledger(e); end if;
  return e;
end;
$$;

-- Inserts an entry and its lines as a suggestion.
create or replace function private.insert_entry(
  p_client uuid, p_date date, p_book text, p_source text, p_memo text, p_reference text, p_lines jsonb, p_reverses uuid, p_document uuid
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  e uuid;
begin
  if p_lines is null or jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) < 2 then
    raise exception 'An entry needs at least two lines' using errcode = '22023';
  end if;
  insert into public.journal_entries (client_id, entry_date, book, source, memo, reference, reverses, document_id)
  values (p_client, p_date, p_book, p_source, p_memo, nullif(btrim(p_reference), ''), p_reverses, p_document)
  returning id into e;
  insert into public.journal_lines (client_id, entry_id, line_no, account_id, party_id, party_name, open_item_id, description, debit, credit)
  select p_client, e, l.n, (l.x ->> 'account_id')::uuid, nullif(l.x ->> 'party_id', '')::uuid, nullif(btrim(l.x ->> 'party_name'), ''),
         nullif(l.x ->> 'open_item_id', '')::uuid, nullif(btrim(l.x ->> 'description'), ''),
         coalesce(nullif(l.x ->> 'debit', '')::numeric(18, 2), 0), coalesce(nullif(l.x ->> 'credit', '')::numeric(18, 2), 0)
  from jsonb_array_elements(p_lines) with ordinality as l(x, n);
  return e;
end;
$$;

create or replace function public.reverse_journal_entry(p_entry uuid, p_date date, p_reason text)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  j public.journal_entries;
  lines jsonb;
  r uuid;
begin
  select * into j from public.journal_entries where id = p_entry;
  if j.id is null then raise exception 'Journal entry not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(j.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can reverse its entries' using errcode = '42501';
  end if;
  if j.status <> 'posted' then raise exception 'Only a posted entry can be reversed' using errcode = '22023'; end if;
  if j.source = 'opening' then raise exception 'Correct the opening balances by importing them again' using errcode = '22023'; end if;
  if p_date is null or p_date < j.entry_date then
    raise exception 'The reversal cannot be dated before the entry (%)', j.entry_date using errcode = '22023';
  end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason for the reversal' using errcode = '22023'; end if;

  perform private.undo_subledger(p_entry);
  select jsonb_agg(jsonb_build_object('account_id', account_id, 'party_id', party_id, 'party_name', party_name, 'description', description, 'debit', credit, 'credit', debit) order by line_no)
    into lines from public.journal_lines where entry_id = p_entry;
  r := private.post_entry(j.client_id, p_date, 'general_journal', 'reversal', 'Reversal: ' || btrim(p_reason), j.reference, lines, p_entry);
  update public.journal_entries set status = 'reversed' where id = p_entry;
  return r;
end;
$$;

-- ---------------------------------------------------------------------------
-- Documents → suggested entries.
-- ---------------------------------------------------------------------------

/** The party of a document's approved TIN ("123-456-789" or "123-456-789-00002"). */
create or replace function private.document_party(p_tin text) returns uuid
language sql stable security definer set search_path = '' as $$
  select p.id from public.parties p
  where p_tin ~ '^\d{3}-\d{3}-\d{3}'
    and p.tin = substr(p_tin, 1, 11)
    and p.branch_code = case when length(p_tin) > 12 then lpad(substr(p_tin, 13), 5, '0') else '00000' end
$$;

create or replace function private.account_by_key(p_client uuid, p_key text) returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.ledger_accounts where client_id = p_client and template_key = p_key and active
$$;

create or replace function private.first_control(p_client uuid, p_control text) returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.ledger_accounts where client_id = p_client and control = p_control and active order by sort_order, code limit 1
$$;

/**
 * The account title a document is booked to unless staff choose another:
 * sales and purchases: the client's last account for the party, then the
 * party's firm-wide preset, then the template default; 2307s: the party's open
 * receivable / payable if it has one, else cash on hand.
 */
create or replace function private.document_account(d public.documents) returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare
  party uuid := private.document_party((select approved_fields ->> 'party_tin' from public.extractions where document_id = d.id));
  v_kind text := case d.doc_type when 'sales_invoice' then 'sale' when 'purchase_receipt' then 'purchase' end;
  acc uuid;
begin
  if v_kind is not null then
    if party is not null then
      select cpa.account_id into acc from public.client_party_accounts cpa
        join public.ledger_accounts a on a.id = cpa.account_id and a.active
        where cpa.client_id = d.client_id and cpa.party_id = party and cpa.kind = v_kind;
      if acc is not null then return acc; end if;
      acc := private.account_by_key(d.client_id, (select preset_account_key from public.parties where id = party));
      if acc is not null then return acc; end if;
    end if;
    return coalesce(
      case v_kind when 'sale' then coalesce(private.account_by_key(d.client_id, 'sales'), private.account_by_key(d.client_id, 'service_income'))
                else private.account_by_key(d.client_id, 'miscellaneous') end,
      null);
  end if;
  if d.doc_type in ('bir_2307_received', 'bir_2307_issued') then
    if party is not null and exists (
      select 1 from public.open_items where client_id = d.client_id and party_id = party and balance > 0
        and kind = case d.doc_type when 'bir_2307_received' then 'receivable' else 'payable' end
    ) then
      return private.first_control(d.client_id, case d.doc_type when 'bir_2307_received' then 'ar' else 'ap' end);
    end if;
    return private.first_control(d.client_id, 'cash');
  end if;
  return null;
end;
$$;

/** For the review screen: the account title the document would be booked to now. */
create or replace function public.document_account_default(p_document uuid) returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare
  d public.documents;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not (private.is_staff() and private.can_access_client(d.client_id)) then return null; end if;
  return coalesce(d.ledger_account_id, private.document_account(d));
end;
$$;

/**
 * Books an approved document of a bookkeeping client as a suggested entry
 * (replacing an earlier suggestion), booked to p_account or the default title.
 * Returns the entry, or null when the document is not booked: the client keeps
 * no books, the type is not booked, or it is dated before the books start.
 *
 *   sales invoice   Dr Cash (cash) / Accounts Receivable (charge)   total
 *                   Cr the account title                             net of VAT
 *                   Cr Output VAT                                    VAT (VAT-registered client)
 *   purchase        Dr the account title                             net of VAT (VAT included for a non-VAT client)
 *                   Dr Input VAT                                     VAT (VAT-registered client)
 *                   Cr Cash / Accounts Payable                       total
 *   2307 received   Dr Creditable Withholding Tax / Cr the account title (AR, else cash)   tax withheld
 *   2307 issued     Dr the account title (AP, else cash) / Cr Withholding Tax Payable      tax withheld
 */
create or replace function public.book_document(p_document uuid, p_account uuid default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  b public.client_books;
  f jsonb;
  acc public.ledger_accounts;
  party uuid;
  party_name text;
  doc_date date;
  charge boolean;
  vat_reg boolean;
  v_vat numeric;
  v_total numeric;
  v_net numeric;
  v_wh numeric;
  cash uuid;
  lines jsonb;
  book text;
  label text;
  e uuid;
  n numeric;
  k text;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can book its documents' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = d.client_id;
  if b.client_id is null or d.doc_type not in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued') then return null; end if;
  if d.status <> 'posted' then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  if exists (select 1 from public.journal_entries where document_id = d.id and status = 'posted') then
    raise exception 'This document is already in the books; reverse its entry to book it again' using errcode = '22023';
  end if;
  select approved_fields into f from public.extractions where document_id = d.id;
  doc_date := nullif(f ->> 'date', '')::date;
  if doc_date is null then raise exception 'The document has no date' using errcode = '22023'; end if;

  select * into acc from public.ledger_accounts where id = coalesce(p_account, private.document_account(d)) and client_id = d.client_id and active;
  if acc.id is null then raise exception 'Choose the account title' using errcode = '22023'; end if;
  update public.documents set ledger_account_id = acc.id where id = d.id;
  delete from public.journal_entries where document_id = d.id and status = 'suggested';
  if doc_date < b.books_start then return null; end if;

  party := private.document_party(f ->> 'party_tin');
  party_name := coalesce(nullif(btrim(f ->> 'party_name'), ''), (select display_name from public.parties where id = party));
  n := 0;
  v_vat := coalesce(nullif(f ->> 'vat', '')::numeric, 0);
  v_net := coalesce(nullif(f ->> 'vatable', '')::numeric, 0) + coalesce(nullif(f ->> 'vat_exempt', '')::numeric, 0) + coalesce(nullif(f ->> 'zero_rated', '')::numeric, 0);
  v_total := coalesce(nullif(f ->> 'total', '')::numeric, 0);
  if v_total <= 0 then v_total := v_net + v_vat; end if;
  v_wh := coalesce(nullif(f ->> 'withholding', '')::numeric, 0);
  charge := coalesce(f ->> 'payment_terms', 'cash') = 'charge';
  vat_reg := exists (
    select 1 from public.obligations where client_id = d.client_id and form = '2550Q'
      and start_date <= doc_date and (end_date is null or end_date >= doc_date)
  );
  if not vat_reg then v_vat := 0; end if;
  v_net := v_total - v_vat;
  cash := private.first_control(d.client_id, 'cash');
  label := case d.doc_type when 'sales_invoice' then 'Sales invoice' when 'purchase_receipt' then 'Purchase'
                           when 'bir_2307_received' then 'BIR 2307 received' else 'BIR 2307 issued' end;

  if d.doc_type = 'sales_invoice' then
    if v_total <= 0 then raise exception 'The document has no amount' using errcode = '22023'; end if;
    book := case when charge then 'sales' else 'cash_receipts' end;
    lines := jsonb_build_array(
      jsonb_build_object('account_id', case when charge then private.first_control(d.client_id, 'ar') else cash end, 'party_id', party, 'party_name', party_name, 'debit', v_total),
      jsonb_build_object('account_id', acc.id, 'party_id', party, 'credit', v_net));
    if v_vat > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'output_vat'), 'credit', v_vat); end if;
    k := 'sale';
  elsif d.doc_type = 'purchase_receipt' then
    if v_total <= 0 then raise exception 'The document has no amount' using errcode = '22023'; end if;
    book := case when charge then 'purchases' else 'cash_disbursements' end;
    lines := jsonb_build_array(jsonb_build_object('account_id', acc.id, 'party_id', party, 'debit', v_net));
    if v_vat > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'input_vat'), 'debit', v_vat); end if;
    lines := lines || jsonb_build_object('account_id', case when charge then private.first_control(d.client_id, 'ap') else cash end, 'party_id', party, 'party_name', party_name, 'credit', v_total);
    k := 'purchase';
  else
    if v_wh <= 0 then raise exception 'The 2307 has no tax withheld' using errcode = '22023'; end if;
    book := 'general_journal';
    if d.doc_type = 'bir_2307_received' then
      lines := jsonb_build_array(
        jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt'), 'party_id', party, 'debit', v_wh),
        jsonb_build_object('account_id', acc.id, 'party_id', party, 'party_name', party_name, 'credit', v_wh));
    else
      lines := jsonb_build_array(
        jsonb_build_object('account_id', acc.id, 'party_id', party, 'party_name', party_name, 'debit', v_wh),
        jsonb_build_object('account_id', private.first_control(d.client_id, 'ewt_payable'), 'party_id', party, 'credit', v_wh));
    end if;
  end if;
  if exists (select 1 from jsonb_array_elements(lines) x where x ->> 'account_id' is null) then
    raise exception 'The chart of accounts lacks a control account this entry needs (cash, AR, AP, VAT, CWT or EWT payable)' using errcode = '22023';
  end if;

  e := private.insert_entry(d.client_id, doc_date, book, 'document',
    label || coalesce(' ' || nullif(btrim(f ->> 'number'), ''), '') || coalesce(' · ' || party_name, ''),
    f ->> 'number', lines, null, d.id);

  if k is not null and party is not null then
    insert into public.client_party_accounts (client_id, party_id, kind, account_id) values (d.client_id, party, k, acc.id)
    on conflict (client_id, party_id, kind) do update set account_id = excluded.account_id, updated_at = now();
  end if;
  return e;
end;
$$;

-- Confirms a suggested entry: it is posted and updates the subledger.
create or replace function public.confirm_journal_entry(p_entry uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  j public.journal_entries;
  b public.client_books;
begin
  select * into j from public.journal_entries where id = p_entry for update;
  if j.id is null or not private.can_access_client(j.client_id) then raise exception 'Journal entry not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(j.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  if j.status <> 'suggested' then raise exception 'This entry is already posted' using errcode = '22023'; end if;
  select * into b from public.client_books where client_id = j.client_id;
  if j.entry_date < b.books_start then
    raise exception 'The entry is dated before the books start (%)', b.books_start using errcode = '22023';
  end if;
  update public.journal_entries set status = 'posted', posted_by = auth.uid(), posted_at = now() where id = p_entry;
  perform private.post_subledger(p_entry);
end;
$$;

-- ---------------------------------------------------------------------------
-- The monthly AR/AP update.
-- ---------------------------------------------------------------------------

/** What the AR/AP update workbook lists: open receivables and payables, and the cash and bank accounts. */
create or replace function public.arap_workbook(p_client uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.can_access_client(p_client) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not exists (select 1 from public.client_books where client_id = p_client) then
    raise exception 'The books of this business are not set up yet' using errcode = '22023';
  end if;
  return jsonb_build_object(
    'items', coalesce((
      select jsonb_agg(jsonb_build_object('id', id, 'kind', kind, 'party_name', party_name, 'party_tin', party_tin, 'doc_number', doc_number,
                                          'doc_date', doc_date, 'due_date', due_date, 'amount', amount, 'balance', balance)
                       order by kind, party_name, doc_date nulls last)
      from public.open_items where client_id = p_client and balance > 0), '[]'::jsonb),
    'accounts', coalesce((
      select jsonb_agg(jsonb_build_object('id', id, 'code', code, 'name', name) order by sort_order, code)
      from public.ledger_accounts where client_id = p_client and control in ('cash', 'bank') and active), '[]'::jsonb));
end;
$$;

/** Checks the rows of an update against the open items now; raises on the first problem. */
create or replace function private.check_arap_rows(p_client uuid, p_month date, p_rows jsonb) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  b public.client_books;
  r record;
  it public.open_items;
begin
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'The books of this business are not set up yet' using errcode = '22023'; end if;
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) = 0 then
    raise exception 'The update has no collections or payments' using errcode = '22023';
  end if;
  for r in
    select (x ->> 'open_item_id')::uuid as item, sum((x ->> 'amount')::numeric(18, 2)) as amount,
           bool_and((x ->> 'amount')::numeric > 0) as positive,
           bool_and((x ->> 'date')::date between p_month and (p_month + interval '1 month - 1 day')::date) as in_month,
           bool_and((x ->> 'date')::date >= b.books_start) as after_start,
           bool_and(exists (select 1 from public.ledger_accounts a where a.id = (x ->> 'account_id')::uuid and a.client_id = p_client and a.control in ('cash', 'bank') and a.active)) as account_ok
    from jsonb_array_elements(p_rows) x
    group by 1
  loop
    select * into it from public.open_items where id = r.item and client_id = p_client;
    if it.id is null then raise exception 'An invoice in the update is not open for this business' using errcode = '22023'; end if;
    if not r.positive then raise exception '%: enter amounts above zero', it.party_name using errcode = '22023'; end if;
    if not r.in_month then raise exception '%: the date must fall in %', it.party_name, to_char(p_month, 'FMMonth YYYY') using errcode = '22023'; end if;
    if not r.after_start then raise exception '%: the date is before the books start', it.party_name using errcode = '22023'; end if;
    if not r.account_ok then raise exception '%: choose the cash or bank account', it.party_name using errcode = '22023'; end if;
    if r.amount > it.balance then
      raise exception '%: % is more than the % still open on %', it.party_name, r.amount, it.balance, coalesce(it.doc_number, 'the invoice') using errcode = '22023';
    end if;
  end loop;
end;
$$;

create or replace function private.post_arap(p_update uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  u public.arap_updates;
  x jsonb;
  it public.open_items;
  amt numeric;
  ref text;
begin
  select * into u from public.arap_updates where id = p_update for update;
  perform private.check_arap_rows(u.client_id, u.month, u.rows);
  for x in select * from jsonb_array_elements(u.rows) loop
    select * into it from public.open_items where id = (x ->> 'open_item_id')::uuid;
    amt := (x ->> 'amount')::numeric(18, 2);
    ref := nullif(btrim(x ->> 'reference'), '');
    if it.kind = 'receivable' then
      perform private.post_entry(u.client_id, (x ->> 'date')::date, 'cash_receipts', 'arap_update',
        'Collection · ' || it.party_name || coalesce(' · ' || it.doc_number, ''), ref,
        jsonb_build_array(
          jsonb_build_object('account_id', x ->> 'account_id', 'debit', amt),
          jsonb_build_object('account_id', it.account_id, 'party_id', it.party_id, 'party_name', it.party_name, 'open_item_id', it.id, 'credit', amt)));
    else
      perform private.post_entry(u.client_id, (x ->> 'date')::date, 'cash_disbursements', 'arap_update',
        'Payment · ' || it.party_name || coalesce(' · ' || it.doc_number, ''), ref,
        jsonb_build_array(
          jsonb_build_object('account_id', it.account_id, 'party_id', it.party_id, 'party_name', it.party_name, 'open_item_id', it.id, 'debit', amt),
          jsonb_build_object('account_id', x ->> 'account_id', 'credit', amt)));
    end if;
  end loop;
  update public.arap_updates set status = 'posted', decided_by = auth.uid(), decided_at = now() where id = p_update;
end;
$$;

/**
 * The client (portal) or staff send the month's collections and payments:
 * [{open_item_id, amount, date, account_id, reference}]. Staff updates are posted
 * at once; a client's waits for the assigned staff to post or return it.
 */
create or replace function public.submit_arap_update(p_client uuid, p_month date, p_rows jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  staff boolean := private.is_staff();
  u uuid;
begin
  if not private.can_access_client(p_client) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if staff and not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can post its AR/AP update' using errcode = '42501';
  end if;
  if p_month is null or extract(day from p_month) <> 1 then raise exception 'Choose the month' using errcode = '22023'; end if;
  perform private.check_arap_rows(p_client, p_month, p_rows);
  insert into public.arap_updates (client_id, month, source, rows)
  values (p_client, p_month, case when staff then 'staff' else 'portal' end, p_rows)
  returning id into u;
  if staff then perform private.post_arap(u); end if;
  return u;
end;
$$;

create or replace function public.post_arap_update(p_update uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  u public.arap_updates;
begin
  select * into u from public.arap_updates where id = p_update;
  if u.id is null or not private.can_access_client(u.client_id) then raise exception 'Update not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(u.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post its AR/AP update' using errcode = '42501';
  end if;
  if u.status <> 'submitted' then raise exception 'This update was already %', u.status using errcode = '22023'; end if;
  perform private.post_arap(p_update);
end;
$$;

create or replace function public.return_arap_update(p_update uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  u public.arap_updates;
begin
  select * into u from public.arap_updates where id = p_update;
  if u.id is null or not private.can_access_client(u.client_id) then raise exception 'Update not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(u.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can return its AR/AP update' using errcode = '42501';
  end if;
  if u.status <> 'submitted' then raise exception 'This update was already %', u.status using errcode = '22023'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason' using errcode = '22023'; end if;
  update public.arap_updates set status = 'returned', return_reason = btrim(p_reason), decided_by = auth.uid(), decided_at = now() where id = p_update;
end;
$$;

-- Any staff member sets a party's preset account title (verified parties included:
-- it is a bookkeeping classification, not registration details).
create or replace function public.set_party_preset(p_party uuid, p_key text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_staff() then raise exception 'Only staff set account title presets' using errcode = '42501'; end if;
  update public.parties set preset_account_key = nullif(btrim(p_key), '') where id = p_party;
  if not found then raise exception 'Party not found' using errcode = 'P0002'; end if;
end;
$$;

revoke execute on function public.set_party_preset(uuid, text) from public, anon;
grant execute on function public.set_party_preset(uuid, text) to authenticated;
revoke execute on function public.document_account_default(uuid) from public, anon;
revoke execute on function public.book_document(uuid, uuid) from public, anon;
revoke execute on function public.confirm_journal_entry(uuid) from public, anon;
revoke execute on function public.arap_workbook(uuid) from public, anon;
revoke execute on function public.submit_arap_update(uuid, date, jsonb) from public, anon;
revoke execute on function public.post_arap_update(uuid) from public, anon;
revoke execute on function public.return_arap_update(uuid, text) from public, anon;
grant execute on function public.document_account_default(uuid) to authenticated;
grant execute on function public.book_document(uuid, uuid) to authenticated;
grant execute on function public.confirm_journal_entry(uuid) to authenticated;
grant execute on function public.arap_workbook(uuid) to authenticated;
grant execute on function public.submit_arap_update(uuid, date, jsonb) to authenticated;
grant execute on function public.post_arap_update(uuid) to authenticated;
grant execute on function public.return_arap_update(uuid, text) to authenticated;
revoke execute on function private.insert_entry(uuid, date, text, text, text, text, jsonb, uuid, uuid) from public, anon, authenticated;
revoke execute on function private.post_subledger(uuid) from public, anon, authenticated;
revoke execute on function private.undo_subledger(uuid) from public, anon, authenticated;
revoke execute on function private.post_arap(uuid) from public, anon, authenticated;
revoke execute on function private.check_arap_rows(uuid, date, jsonb) from public, anon, authenticated;
revoke execute on function private.document_account(public.documents) from public, anon, authenticated;
