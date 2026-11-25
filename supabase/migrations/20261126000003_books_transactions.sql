-- Rework phase 1 (docs/REWORK.md, decisions 4–6): Books transactions, Manager.io style.
--
--   book_invoices                Sales Invoices and Purchase Invoices. Tax codes go only
--                                here: a VAT code on each line, a withholding code (CWT on
--                                a sale, EWT on a purchase) and, on a sale to the
--                                government, a VAT-withheld code (WV010 / WV020) on the
--                                invoice.
--   book_invoice_lines           account, amount (net of VAT), tax code, VAT.
--   book_settlements             Receipts (cash_receipts book) and Payments
--                                (cash_disbursements book): they only move cash and
--                                settle invoices. No tax codes.
--   book_settlement_allocations  which invoices a receipt or payment settles, and how much.
--
-- Posting (journal entries stay immutable; an edit is a reversal and a new entry):
--   Sales Invoice     sales book:     Dr Accounts Receivable (total less CWT and VAT withheld)
--                                     Dr Creditable Withholding Tax (CWT)  Dr Creditable VAT Withheld
--                                     Dr Sales Discount – SC/PWD  Cr each line's account  Cr Output VAT
--   Purchase Invoice  purchases book: Dr each line's account  Dr Input VAT
--                                     Cr Accounts Payable (total less EWT)  Cr EWT Payable
--   Receipt           cash_receipts:  Dr the cash or bank account  (Dr bank or card charges)  Cr AR per invoice
--   Payment           cash_disbursements: Dr AP per invoice  Cr the cash or bank account  (Cr a deduction)
-- The receivable or payable an invoice opens is an open_items row (the AR/AP reports
-- keep working); a receipt or payment settles it through the line's open_item_id, so
-- open_item_applications record it as before.
--
-- Every write goes through the functions below (staff assigned to the client, or the
-- Owner); posting in a locked month is refused by the existing journal lock.
-- Invoices and receipts that came across from the register (migration
-- 20261126000004) are `legacy`: they point at the entry the old flow posted.

alter table public.journal_entries drop constraint journal_entries_source_check;
alter table public.journal_entries add constraint journal_entries_source_check
  check (source in ('opening', 'manual', 'document', 'arap_update', 'reversal', 'closing', 'invoice', 'settlement'));

create table public.book_invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('sales', 'purchase')),
  party_id uuid references public.parties (id) on delete set null,
  party_name text not null check (btrim(party_name) <> ''),
  party_tin text,
  reference text,
  issue_date date not null,
  -- Null: due on the issue date.
  due_date date,
  description text,
  -- The approved Inbox document it was posted from (one active invoice per document).
  document_id uuid references public.documents (id) on delete restrict,
  withholding_code_id uuid references public.tax_codes (id),
  withholding numeric(18, 2) not null default 0 check (withholding >= 0),
  vat_withholding_code_id uuid references public.tax_codes (id),
  vat_withheld numeric(18, 2) not null default 0 check (vat_withheld >= 0),
  discount numeric(18, 2) not null default 0 check (discount >= 0),
  -- Sum of the lines' amounts (net of VAT), of their VAT, and total = subtotal + VAT − discount.
  subtotal numeric(18, 2) not null default 0,
  tax_total numeric(18, 2) not null default 0,
  total numeric(18, 2) not null default 0,
  -- What the customer owes or the client owes the supplier: total less CWT/EWT and VAT withheld
  -- (a legacy invoice: the receivable or payable the old entry opened).
  amount_due numeric(18, 2) not null default 0,
  -- The customer's BIR 2307 that supports the CWT on this Sales Invoice (approving it marks it).
  cwt_document_id uuid references public.documents (id) on delete set null,
  cwt_supported_at timestamptz,
  legacy boolean not null default false,
  journal_entry_id uuid references public.journal_entries (id),
  open_item_id uuid references public.open_items (id) on delete set null,
  voided_at timestamptz,
  voided_by uuid references auth.users (id),
  void_reason text,
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, id),
  check (due_date is null or due_date >= issue_date),
  check (kind = 'sales' or (discount = 0 and vat_withheld = 0 and vat_withholding_code_id is null and cwt_document_id is null)),
  check ((voided_at is null) = (void_reason is null)),
  check ((cwt_document_id is null) = (cwt_supported_at is null))
);

create unique index book_invoices_document_key on public.book_invoices (document_id) where document_id is not null and voided_at is null;
create index book_invoices_client_idx on public.book_invoices (client_id, kind, issue_date);
create index book_invoices_party_idx on public.book_invoices (client_id, party_id);
create index book_invoices_entry_idx on public.book_invoices (journal_entry_id);

create table public.book_invoice_lines (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  invoice_id uuid not null,
  line_no smallint not null check (line_no > 0),
  account_id uuid not null,
  description text,
  amount numeric(18, 2) not null check (amount <> 0),
  tax_code_id uuid references public.tax_codes (id),
  tax_amount numeric(18, 2) not null default 0,
  unique (invoice_id, line_no),
  foreign key (client_id, invoice_id) references public.book_invoices (client_id, id) on delete cascade,
  foreign key (client_id, account_id) references public.ledger_accounts (client_id, id)
);

create table public.book_settlements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('receipt', 'payment')),
  settle_date date not null,
  cash_account_id uuid not null,
  party_id uuid references public.parties (id) on delete set null,
  party_name text not null check (btrim(party_name) <> ''),
  reference text,
  description text,
  document_id uuid references public.documents (id) on delete restrict,
  -- What it settles on the invoices (the allocations' total).
  amount numeric(18, 2) not null check (amount > 0),
  -- Bank or card charges a receipt came in net of, or a deduction taken on a payment.
  deduction numeric(18, 2) not null default 0 check (deduction >= 0),
  deduction_account_id uuid,
  legacy boolean not null default false,
  journal_entry_id uuid references public.journal_entries (id),
  voided_at timestamptz,
  voided_by uuid references auth.users (id),
  void_reason text,
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, id),
  check (deduction < amount),
  check ((deduction > 0) = (deduction_account_id is not null)),
  check ((voided_at is null) = (void_reason is null)),
  foreign key (client_id, cash_account_id) references public.ledger_accounts (client_id, id),
  foreign key (client_id, deduction_account_id) references public.ledger_accounts (client_id, id)
);

create unique index book_settlements_document_key on public.book_settlements (document_id) where document_id is not null and voided_at is null;
create index book_settlements_client_idx on public.book_settlements (client_id, kind, settle_date);
create index book_settlements_entry_idx on public.book_settlements (journal_entry_id);

create table public.book_settlement_allocations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  settlement_id uuid not null,
  invoice_id uuid not null,
  amount numeric(18, 2) not null check (amount > 0),
  unique (settlement_id, invoice_id),
  foreign key (client_id, settlement_id) references public.book_settlements (client_id, id) on delete cascade,
  foreign key (client_id, invoice_id) references public.book_invoices (client_id, id)
);
create index book_settlement_allocations_invoice_idx on public.book_settlement_allocations (invoice_id);

do $$
declare t text;
begin
  foreach t in array array['book_invoices', 'book_invoice_lines', 'book_settlements', 'book_settlement_allocations'] loop
    execute format('create trigger audit after insert or update or delete on public.%I for each row execute function private.audit()', t);
    execute format('alter table public.%I enable row level security', t);
    -- Staff who see the client read its Books; client users do not. Written only by the functions below.
    execute format('create policy books_read on public.%I for select to authenticated using (private.is_staff() and private.can_access_client(client_id))', t);
  end loop;
  foreach t in array array['book_invoices', 'book_settlements'] loop
    execute format('create trigger touch_updated_at before update on public.%I for each row execute function private.touch_updated_at()', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Each invoice with its balance due. A posted invoice's balance is its open
-- receivable or payable (so AR/AP updates and the old reports agree); a legacy
-- cash invoice has none and is settled by its legacy receipt or payment.
-- ---------------------------------------------------------------------------
create view public.book_invoice_list with (security_invoker = true) as
select i.*,
       coalesce(a.allocated, 0)::numeric(18, 2) as allocated,
       (case when i.voided_at is not null then 0
             when i.open_item_id is not null then oi.balance
             when i.journal_entry_id is null then i.amount_due
             else greatest(i.amount_due - coalesce(a.allocated, 0), 0) end)::numeric(18, 2) as balance_due,
       w.code as withholding_code, w.atc as withholding_atc, v.code as vat_withholding_code
from public.book_invoices i
left join public.open_items oi on oi.id = i.open_item_id
left join public.tax_codes w on w.id = i.withholding_code_id
left join public.tax_codes v on v.id = i.vat_withholding_code_id
left join (
  select al.invoice_id, sum(al.amount) as allocated
  from public.book_settlement_allocations al
  join public.book_settlements s on s.id = al.settlement_id and s.voided_at is null
  group by al.invoice_id
) a on a.invoice_id = i.id;

revoke all on public.book_invoice_list from anon;
grant select on public.book_invoice_list to authenticated;

-- Undoing an entry's subledger (before it is reversed) keeps an open item that the lines
-- of an earlier, already reversed receipt or payment still point at: its balance goes
-- to zero instead of the row being deleted. Otherwise as migration 20261124000005.
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
  update public.open_items oi set balance = 0
    where oi.source_entry_id = p_entry and exists (select 1 from public.journal_lines l where l.open_item_id = oi.id);
  delete from public.open_items oi
    where oi.source_entry_id = p_entry and not exists (select 1 from public.journal_lines l where l.open_item_id = oi.id);
end;
$$;

-- ---------------------------------------------------------------------------
-- Internals (no access checks: the public functions check).
-- ---------------------------------------------------------------------------

/** Inserts and posts an entry (as private.post_entry), carrying the document it came from. */
create or replace function private.book_post(
  p_client uuid, p_date date, p_book text, p_source text, p_memo text, p_reference text, p_lines jsonb, p_document uuid
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  e uuid;
begin
  if exists (select 1 from jsonb_array_elements(p_lines) x where nullif(x ->> 'account_id', '') is null) then
    raise exception 'The chart of accounts lacks a control account this entry needs (cash or bank, AR, AP, Input or Output VAT, CWT, Creditable VAT Withheld, SC/PWD discount or EWT payable)' using errcode = '22023';
  end if;
  e := private.insert_entry(p_client, p_date, p_book, p_source, p_memo, p_reference, p_lines, null, p_document);
  update public.journal_entries set status = 'posted', posted_by = auth.uid(), posted_at = now() where id = e;
  perform private.post_subledger(e);
  return e;
end;
$$;

/** Reverses an entry of the Books (an edit or a void), dated the entry's own date. */
create or replace function private.book_reverse(p_entry uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  j public.journal_entries;
begin
  select * into j from public.journal_entries where id = p_entry;
  if j.id is null or j.status <> 'posted' then return; end if;
  perform set_config('books.reversing', 'on', true);
  perform public.reverse_journal_entry(p_entry, j.entry_date, p_reason);
  perform set_config('books.reversing', 'off', true);
end;
$$;

/** The books must be set up and the date on or after their start. */
create or replace function private.book_check_date(p_client uuid, p_date date) returns void
language plpgsql stable security definer set search_path = '' as $$
declare
  b public.client_books;
begin
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  if p_date is null or p_date < b.books_start then
    raise exception 'The date must be on or after the start of the books (%)', b.books_start using errcode = '22023';
  end if;
end;
$$;

/** Posts an invoice: its entry in the sales or purchases book and its open receivable or payable. */
create or replace function private.book_post_invoice(p_invoice uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  inv public.book_invoices;
  c uuid;
  lines jsonb := '[]'::jsonb;
  l record;
  e uuid;
  oi uuid;
  label text;
begin
  select * into inv from public.book_invoices where id = p_invoice;
  c := inv.client_id;
  perform private.book_check_date(c, inv.issue_date);
  label := case inv.kind when 'sales' then 'Sales Invoice' else 'Purchase Invoice' end;

  if inv.kind = 'sales' then
    if inv.amount_due > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'ar'), 'party_id', inv.party_id, 'party_name', inv.party_name, 'debit', inv.amount_due, 'description', inv.description);
    end if;
    if inv.withholding > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'cwt'), 'party_id', inv.party_id, 'debit', inv.withholding);
    end if;
    if inv.vat_withheld > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'vat_withheld'), 'party_id', inv.party_id, 'debit', inv.vat_withheld);
    end if;
    if inv.discount > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'sales_discount'), 'debit', inv.discount);
    end if;
    for l in select * from public.book_invoice_lines where invoice_id = inv.id order by line_no loop
      lines := lines || jsonb_build_object('account_id', l.account_id, 'party_id', inv.party_id, 'description', l.description,
                                           'debit', greatest(-l.amount, 0), 'credit', greatest(l.amount, 0));
    end loop;
    if inv.tax_total <> 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'output_vat'),
                                           'debit', greatest(-inv.tax_total, 0), 'credit', greatest(inv.tax_total, 0));
    end if;
  else
    for l in select * from public.book_invoice_lines where invoice_id = inv.id order by line_no loop
      lines := lines || jsonb_build_object('account_id', l.account_id, 'party_id', inv.party_id, 'description', l.description,
                                           'debit', greatest(l.amount, 0), 'credit', greatest(-l.amount, 0));
    end loop;
    if inv.tax_total <> 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'input_vat'),
                                           'debit', greatest(inv.tax_total, 0), 'credit', greatest(-inv.tax_total, 0));
    end if;
    if inv.amount_due > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'ap'), 'party_id', inv.party_id, 'party_name', inv.party_name, 'credit', inv.amount_due, 'description', inv.description);
    end if;
    if inv.withholding > 0 then
      lines := lines || jsonb_build_object('account_id', private.first_control(c, 'ewt_payable'), 'party_id', inv.party_id, 'credit', inv.withholding);
    end if;
  end if;

  e := private.book_post(c, inv.issue_date, case inv.kind when 'sales' then 'sales' else 'purchases' end, 'invoice',
         label || coalesce(' ' || inv.reference, '') || ' · ' || inv.party_name, inv.reference, lines, inv.document_id);
  select id into oi from public.open_items
    where source_entry_id = e and kind = case inv.kind when 'sales' then 'receivable' else 'payable' end and amount > 0
    order by created_at limit 1;
  if oi is not null then
    update public.open_items
      set due_date = coalesce(inv.due_date, inv.issue_date),
          party_tin = coalesce(party_tin, case when inv.party_tin ~ '^\d{3}-\d{3}-\d{3}' then substr(inv.party_tin, 1, 11) end)
      where id = oi;
  end if;
  update public.book_invoices set journal_entry_id = e, open_item_id = oi where id = inv.id;
  return e;
end;
$$;

/**
 * Writes an invoice (new when p_id is null, else replaces the header and lines of
 * p_id) from p, then posts it, or links it to p_link_entry (an entry the old flow
 * already posted; the migration). Validates the tax codes. Returns the invoice.
 *   p: {kind, party_id, party_name, party_tin, reference, issue_date, due_date, description,
 *       withholding_code_id, withholding, vat_withholding_code_id, vat_withheld, discount,
 *       lines: [{account_id, description, amount, tax_code_id, tax_amount}]}
 * Amounts are pesos, net of VAT; a missing tax_amount, withholding or vat_withheld is
 * worked out from the code's rate.
 */
create or replace function private.book_write_invoice(p_client uuid, p_id uuid, p jsonb, p_document uuid, p_link_entry uuid default null)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_kind text := p ->> 'kind';
  v_party uuid := nullif(p ->> 'party_id', '')::uuid;
  v_name text;
  v_tin text;
  v_issue date := nullif(p ->> 'issue_date', '')::date;
  v_due date := nullif(p ->> 'due_date', '')::date;
  v_disc numeric := coalesce(nullif(p ->> 'discount', '')::numeric(18, 2), 0);
  wcode public.tax_codes;
  vcode public.tax_codes;
  v_wh numeric;
  v_wv numeric;
  v_sub numeric;
  v_tax numeric;
  v_total numeric;
  v_due_amt numeric;
  inv uuid := p_id;
  x jsonb;
  n integer := 0;
  acc public.ledger_accounts;
  tc public.tax_codes;
  amt numeric;
  tax numeric;
  oi public.open_items;
  who text;
begin
  if v_kind is null or v_kind not in ('sales', 'purchase') then raise exception 'Choose a Sales Invoice or a Purchase Invoice' using errcode = '22023'; end if;
  who := case v_kind when 'sales' then 'customer' else 'supplier' end;
  if v_issue is null then raise exception 'Enter the invoice date' using errcode = '22023'; end if;
  if v_due is not null and v_due < v_issue then raise exception 'The due date cannot be before the invoice date' using errcode = '22023'; end if;
  if v_party is not null and not exists (select 1 from public.parties where id = v_party) then
    raise exception 'That % is not in the directory', who using errcode = 'P0002';
  end if;
  v_name := coalesce(nullif(btrim(p ->> 'party_name'), ''), (select display_name from public.parties where id = v_party));
  if v_name is null then raise exception 'Enter the %', who using errcode = '22023'; end if;
  v_tin := coalesce(nullif(btrim(p ->> 'party_tin'), ''), (select tin from public.parties where id = v_party));
  if jsonb_typeof(p -> 'lines') is distinct from 'array' or jsonb_array_length(p -> 'lines') = 0 then
    raise exception 'An invoice needs at least one line' using errcode = '22023';
  end if;
  if v_kind = 'purchase' and (v_disc <> 0 or coalesce(nullif(p ->> 'vat_withheld', '')::numeric, 0) <> 0 or nullif(p ->> 'vat_withholding_code_id', '') is not null) then
    raise exception 'A discount or VAT withheld goes only on a Sales Invoice' using errcode = '22023';
  end if;
  if v_disc < 0 then raise exception 'The discount cannot be negative' using errcode = '22023'; end if;

  if nullif(p ->> 'withholding_code_id', '') is not null then
    select * into wcode from public.tax_codes where id = (p ->> 'withholding_code_id')::uuid;
    if wcode.id is null or wcode.kind <> 'withholding' then
      raise exception 'Choose a withholding tax code (WC or WI) for the tax withheld' using errcode = '22023';
    end if;
  end if;
  if nullif(p ->> 'vat_withholding_code_id', '') is not null then
    select * into vcode from public.tax_codes where id = (p ->> 'vat_withholding_code_id')::uuid;
    if vcode.id is null or vcode.kind <> 'govt_vat_withheld' then
      raise exception 'Choose WV010 or WV020 for the VAT withheld' using errcode = '22023';
    end if;
  end if;

  if inv is null then
    insert into public.book_invoices (client_id, kind, party_id, party_name, party_tin, reference, issue_date, due_date, description, document_id,
                                      withholding_code_id, vat_withholding_code_id, discount, legacy)
    values (p_client, v_kind, v_party, v_name, v_tin, nullif(btrim(p ->> 'reference'), ''), v_issue, v_due, nullif(btrim(p ->> 'description'), ''), p_document,
            wcode.id, vcode.id, v_disc, p_link_entry is not null)
    returning id into inv;
  else
    update public.book_invoices
      set party_id = v_party, party_name = v_name, party_tin = v_tin, reference = nullif(btrim(p ->> 'reference'), ''),
          issue_date = v_issue, due_date = v_due, description = nullif(btrim(p ->> 'description'), ''),
          withholding_code_id = wcode.id, vat_withholding_code_id = vcode.id, discount = v_disc,
          journal_entry_id = null, open_item_id = null
      where id = inv;
    delete from public.book_invoice_lines where invoice_id = inv;
  end if;

  for x in select * from jsonb_array_elements(p -> 'lines') loop
    n := n + 1;
    select * into acc from public.ledger_accounts where id = nullif(x ->> 'account_id', '')::uuid and client_id = p_client;
    if acc.id is null or not acc.active then raise exception 'Line %: choose the account', n using errcode = '22023'; end if;
    if acc.control in ('ar', 'ap', 'input_vat', 'output_vat', 'cwt', 'cwt_awaiting', 'ewt_payable', 'vat_withheld') then
      raise exception 'Line %: % is posted by the Books itself; choose an income, expense or asset account', n, acc.name using errcode = '22023';
    end if;
    amt := nullif(x ->> 'amount', '')::numeric(18, 2);
    if amt is null or amt = 0 then raise exception 'Line %: enter the amount', n using errcode = '22023'; end if;
    tc := null;
    if nullif(x ->> 'tax_code_id', '') is not null then
      select * into tc from public.tax_codes where id = (x ->> 'tax_code_id')::uuid;
      if tc.id is null then raise exception 'Line %: tax code not found', n using errcode = 'P0002'; end if;
      if tc.kind in ('withholding', 'govt_vat_withheld') then
        raise exception 'Line %: % is a withholding code; put it on the invoice, not on a line', n, tc.code using errcode = '22023';
      end if;
      if tc.applies_to <> (case v_kind when 'sales' then 'sales' else 'purchases' end) then
        raise exception 'Line %: % cannot go on a % invoice', n, tc.name, case v_kind when 'sales' then 'sales' else 'purchase' end using errcode = '22023';
      end if;
    end if;
    tax := coalesce(nullif(x ->> 'tax_amount', '')::numeric(18, 2), round(amt * coalesce(tc.rate, 0), 2));
    if tax <> 0 and coalesce(tc.rate, 0) = 0 then
      raise exception 'Line %: only a 12%% VAT code carries VAT', n using errcode = '22023';
    end if;
    insert into public.book_invoice_lines (client_id, invoice_id, line_no, account_id, description, amount, tax_code_id, tax_amount)
    values (p_client, inv, n, acc.id, nullif(btrim(x ->> 'description'), ''), amt, tc.id, tax);
  end loop;

  select coalesce(sum(amount), 0), coalesce(sum(tax_amount), 0) into v_sub, v_tax from public.book_invoice_lines where invoice_id = inv;
  v_wh := coalesce(nullif(p ->> 'withholding', '')::numeric(18, 2), round((v_sub - v_disc) * coalesce(wcode.rate, 0), 2));
  v_wv := coalesce(nullif(p ->> 'vat_withheld', '')::numeric(18, 2), round(v_sub * coalesce(vcode.rate, 0), 2));
  if v_wh < 0 or v_wv < 0 then raise exception 'Tax withheld cannot be negative' using errcode = '22023'; end if;
  v_total := v_sub + v_tax - v_disc;
  if v_total <= 0 then raise exception 'The invoice total must be above zero' using errcode = '22023'; end if;
  v_due_amt := v_total - v_wh - v_wv;
  if v_due_amt < 0 then raise exception 'The tax withheld is more than the invoice total' using errcode = '22023'; end if;

  if p_link_entry is not null then
    -- Legacy: the old entry's receivable or payable is the balance.
    select * into oi from public.open_items
      where source_entry_id = p_link_entry and kind = case v_kind when 'sales' then 'receivable' else 'payable' end and amount > 0
      order by created_at limit 1;
    update public.book_invoices
      set subtotal = v_sub, tax_total = v_tax, total = v_total, withholding = v_wh, vat_withheld = v_wv,
          amount_due = coalesce(oi.amount, v_due_amt), journal_entry_id = p_link_entry, open_item_id = oi.id
      where id = inv;
  else
    update public.book_invoices
      set subtotal = v_sub, tax_total = v_tax, total = v_total, withholding = v_wh, vat_withheld = v_wv, amount_due = v_due_amt
      where id = inv;
    perform private.book_post_invoice(inv);
  end if;
  return inv;
end;
$$;

/**
 * Writes a receipt or payment (new when p_id is null, else replaces p_id) and posts
 * it, or links it to p_link_entry (legacy). Returns the settlement.
 *   p: {kind: receipt|payment, settle_date, cash_account_id, party_id, party_name, reference,
 *       description, deduction, deduction_account_id, allocations: [{invoice_id, amount}]}
 */
create or replace function private.book_write_settlement(p_client uuid, p_id uuid, p jsonb, p_document uuid, p_link_entry uuid default null)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_kind text := p ->> 'kind';
  v_date date := nullif(p ->> 'settle_date', '')::date;
  v_cash public.ledger_accounts;
  v_ded numeric := coalesce(nullif(p ->> 'deduction', '')::numeric(18, 2), 0);
  v_ded_acct public.ledger_accounts;
  v_party uuid := nullif(p ->> 'party_id', '')::uuid;
  v_name text;
  v_amount numeric;
  s uuid := p_id;
  x record;
  inv public.book_invoice_list;
  oi public.open_items;
  lines jsonb := '[]'::jsonb;
  first_inv public.book_invoices;
  e uuid;
  label text;
begin
  if v_kind is null or v_kind not in ('receipt', 'payment') then raise exception 'Choose a Receipt or a Payment' using errcode = '22023'; end if;
  if v_date is null then raise exception 'Enter the date' using errcode = '22023'; end if;
  select * into v_cash from public.ledger_accounts
    where id = nullif(p ->> 'cash_account_id', '')::uuid and client_id = p_client and active and control in ('cash', 'bank');
  if v_cash.id is null then raise exception 'Choose the cash or bank account' using errcode = '22023'; end if;
  if v_ded < 0 then raise exception 'The deduction cannot be negative' using errcode = '22023'; end if;
  if v_ded > 0 then
    select * into v_ded_acct from public.ledger_accounts where id = nullif(p ->> 'deduction_account_id', '')::uuid and client_id = p_client and active;
    if v_ded_acct.id is null then raise exception 'Choose the account for the deduction (for example Bank Charges)' using errcode = '22023'; end if;
  end if;
  if jsonb_typeof(p -> 'allocations') is distinct from 'array' or jsonb_array_length(p -> 'allocations') = 0 then
    raise exception 'Choose the invoices this % settles', v_kind using errcode = '22023';
  end if;
  if exists (select 1 from jsonb_array_elements(p -> 'allocations') a where coalesce(nullif(a ->> 'amount', '')::numeric, 0) <= 0) then
    raise exception 'Enter amounts above zero' using errcode = '22023';
  end if;
  if (select count(*) from jsonb_array_elements(p -> 'allocations')) <> (select count(distinct a ->> 'invoice_id') from jsonb_array_elements(p -> 'allocations') a) then
    raise exception 'An invoice is listed twice' using errcode = '22023';
  end if;
  select sum((a ->> 'amount')::numeric(18, 2)) into v_amount from jsonb_array_elements(p -> 'allocations') a;
  if v_ded >= v_amount then raise exception 'The deduction must be less than the amount' using errcode = '22023'; end if;
  select i.* into first_inv from public.book_invoices i
    where i.id = (p -> 'allocations' -> 0 ->> 'invoice_id')::uuid and i.client_id = p_client;
  v_party := coalesce(v_party, first_inv.party_id);
  v_name := coalesce(nullif(btrim(p ->> 'party_name'), ''), (select display_name from public.parties where id = v_party), first_inv.party_name);
  if v_name is null then raise exception 'Enter who paid or was paid' using errcode = '22023'; end if;

  if s is null then
    insert into public.book_settlements (client_id, kind, settle_date, cash_account_id, party_id, party_name, reference, description, document_id,
                                         amount, deduction, deduction_account_id, legacy, journal_entry_id)
    values (p_client, v_kind, v_date, v_cash.id, v_party, v_name, nullif(btrim(p ->> 'reference'), ''), nullif(btrim(p ->> 'description'), ''), p_document,
            v_amount, v_ded, v_ded_acct.id, p_link_entry is not null, p_link_entry)
    returning id into s;
  else
    update public.book_settlements
      set settle_date = v_date, cash_account_id = v_cash.id, party_id = v_party, party_name = v_name, reference = nullif(btrim(p ->> 'reference'), ''),
          description = nullif(btrim(p ->> 'description'), ''), amount = v_amount, deduction = v_ded, deduction_account_id = v_ded_acct.id, journal_entry_id = null
      where id = s;
    delete from public.book_settlement_allocations where settlement_id = s;
  end if;

  if v_kind = 'receipt' then
    lines := lines || jsonb_build_object('account_id', v_cash.id, 'debit', v_amount - v_ded, 'description', nullif(btrim(p ->> 'description'), ''));
    if v_ded > 0 then lines := lines || jsonb_build_object('account_id', v_ded_acct.id, 'debit', v_ded); end if;
  end if;
  for x in select (a ->> 'invoice_id')::uuid as invoice_id, (a ->> 'amount')::numeric(18, 2) as amount from jsonb_array_elements(p -> 'allocations') a loop
    select * into inv from public.book_invoice_list where id = x.invoice_id and client_id = p_client;
    if inv.id is null then raise exception 'An invoice in the % is not in this client''s Books', v_kind using errcode = 'P0002'; end if;
    if inv.voided_at is not null then raise exception '% % is void', coalesce(inv.reference, 'The invoice'), inv.party_name using errcode = '22023'; end if;
    if inv.kind <> (case v_kind when 'receipt' then 'sales' else 'purchase' end) then
      raise exception 'A % settles only % invoices', v_kind, case v_kind when 'receipt' then 'sales' else 'purchase' end using errcode = '22023';
    end if;
    insert into public.book_settlement_allocations (client_id, settlement_id, invoice_id, amount) values (p_client, s, inv.id, x.amount);
    if p_link_entry is null then
      if x.amount > inv.balance_due then
        raise exception 'Only % is still due on % %', inv.balance_due, inv.party_name, coalesce(inv.reference, '') using errcode = '22023';
      end if;
      select * into oi from public.open_items where id = inv.open_item_id;
      if oi.id is null then raise exception 'Nothing is due on % %', inv.party_name, coalesce(inv.reference, '') using errcode = '22023'; end if;
      lines := lines || jsonb_build_object('account_id', oi.account_id, 'party_id', oi.party_id, 'party_name', oi.party_name, 'open_item_id', oi.id,
                                           'debit', case v_kind when 'payment' then x.amount else 0 end,
                                           'credit', case v_kind when 'receipt' then x.amount else 0 end,
                                           'description', coalesce(inv.reference, inv.party_name));
    end if;
  end loop;
  if v_kind = 'payment' then
    lines := lines || jsonb_build_object('account_id', v_cash.id, 'credit', v_amount - v_ded, 'description', nullif(btrim(p ->> 'description'), ''));
    if v_ded > 0 then lines := lines || jsonb_build_object('account_id', v_ded_acct.id, 'credit', v_ded); end if;
  end if;

  if p_link_entry is null then
    perform private.book_check_date(p_client, v_date);
    label := case v_kind when 'receipt' then 'Receipt' else 'Payment' end;
    e := private.book_post(p_client, v_date, case v_kind when 'receipt' then 'cash_receipts' else 'cash_disbursements' end, 'settlement',
           label || coalesce(' ' || nullif(btrim(p ->> 'reference'), ''), '') || ' · ' || v_name, p ->> 'reference', lines, p_document);
    update public.book_settlements set journal_entry_id = e where id = s;
  end if;
  return s;
end;
$$;

/** Voids a receipt or payment: its entry is reversed (the invoices it settled are due again). */
create or replace function private.book_void_settlement(p_settlement uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  s public.book_settlements;
begin
  select * into s from public.book_settlements where id = p_settlement for update;
  if s.voided_at is not null then return; end if;
  if s.legacy and exists (select 1 from public.book_invoices i where i.journal_entry_id = s.journal_entry_id and i.voided_at is null) then
    raise exception 'This % came across from the register in one entry with its invoice: void the invoice instead', s.kind using errcode = '22023';
  end if;
  perform private.book_reverse(s.journal_entry_id, p_reason);
  update public.book_settlements set voided_at = now(), voided_by = auth.uid(), void_reason = p_reason where id = s.id;
end;
$$;

/**
 * Voids an invoice: the receipt or payment posted from the same document is voided
 * first, then the invoice's entry is reversed (refused while other receipts or
 * payments still settle it). A legacy cash invoice and its receipt share one entry.
 */
create or replace function private.book_void_invoice(p_invoice uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  inv public.book_invoices;
  s public.book_settlements;
begin
  select * into inv from public.book_invoices where id = p_invoice for update;
  if inv.voided_at is not null then return; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason' using errcode = '22023'; end if;
  for s in
    select * from public.book_settlements
    where voided_at is null and (journal_entry_id = inv.journal_entry_id or (inv.document_id is not null and document_id = inv.document_id))
  loop
    if s.journal_entry_id is distinct from inv.journal_entry_id then
      perform private.book_void_settlement(s.id, p_reason);
    else
      update public.book_settlements set voided_at = now(), voided_by = auth.uid(), void_reason = p_reason where id = s.id;
    end if;
  end loop;
  if exists (
    select 1 from public.book_settlement_allocations a join public.book_settlements x on x.id = a.settlement_id
    where a.invoice_id = inv.id and x.voided_at is null
  ) then
    raise exception 'Receipts or payments still settle this invoice: void them first' using errcode = '22023';
  end if;
  perform private.book_reverse(inv.journal_entry_id, p_reason);
  update public.book_invoices set voided_at = now(), voided_by = auth.uid(), void_reason = btrim(p_reason) where id = inv.id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Public functions.
-- ---------------------------------------------------------------------------

/** Creates (p_invoice without id) or edits (with id) a Sales or Purchase Invoice and posts it. */
create or replace function public.save_book_invoice(p_client uuid, p_invoice jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_id uuid := nullif(p_invoice ->> 'id', '')::uuid;
  inv public.book_invoices;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  if v_id is not null then
    select * into inv from public.book_invoices where id = v_id and client_id = p_client for update;
    if inv.id is null then raise exception 'Invoice not found' using errcode = 'P0002'; end if;
    if inv.voided_at is not null then raise exception 'This invoice is void' using errcode = '22023'; end if;
    if inv.kind <> p_invoice ->> 'kind' then raise exception 'An invoice keeps its kind' using errcode = '22023'; end if;
    if inv.document_id is not null then
      raise exception 'This invoice was posted from an approved document: correct the document in the Inbox' using errcode = '22023';
    end if;
    if inv.legacy then
      raise exception 'This invoice came across from the register: void it and enter it again' using errcode = '22023';
    end if;
    perform private.book_reverse(inv.journal_entry_id, 'Invoice edited');
  end if;
  return private.book_write_invoice(p_client, v_id, p_invoice, null);
end;
$$;

create or replace function public.void_book_invoice(p_invoice uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  inv public.book_invoices;
begin
  select * into inv from public.book_invoices where id = p_invoice;
  if inv.id is null or not private.can_access_client(inv.client_id) then raise exception 'Invoice not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(inv.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  if inv.voided_at is not null then raise exception 'This invoice is already void' using errcode = '22023'; end if;
  perform private.book_void_invoice(p_invoice, p_reason);
end;
$$;

/** Creates (without id) or edits (with id) a Receipt or Payment and posts it. */
create or replace function public.save_book_settlement(p_client uuid, p_settlement jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_id uuid := nullif(p_settlement ->> 'id', '')::uuid;
  s public.book_settlements;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  if v_id is not null then
    select * into s from public.book_settlements where id = v_id and client_id = p_client for update;
    if s.id is null then raise exception 'Receipt or payment not found' using errcode = 'P0002'; end if;
    if s.voided_at is not null then raise exception 'This % is void', s.kind using errcode = '22023'; end if;
    if s.kind <> p_settlement ->> 'kind' then raise exception 'A receipt stays a receipt and a payment a payment' using errcode = '22023'; end if;
    if s.legacy then raise exception 'This % came across from the register: void its invoice and enter both again', s.kind using errcode = '22023'; end if;
    perform private.book_reverse(s.journal_entry_id, initcap(s.kind) || ' edited');
  end if;
  return private.book_write_settlement(p_client, v_id, p_settlement, s.document_id);
end;
$$;

create or replace function public.void_book_settlement(p_settlement uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  s public.book_settlements;
begin
  select * into s from public.book_settlements where id = p_settlement;
  if s.id is null or not private.can_access_client(s.client_id) then raise exception 'Receipt or payment not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(s.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  if s.voided_at is not null then raise exception 'This % is already void', s.kind using errcode = '22023'; end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason' using errcode = '22023'; end if;
  perform private.book_void_settlement(p_settlement, btrim(p_reason));
end;
$$;

-- An entry of an invoice, receipt or payment is reversed by editing or voiding it in the
-- Books, not from the journal (else the invoice would outlive its entry). Otherwise as
-- migration 20261124000005.
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
  if current_setting('books.reversing', true) is distinct from 'on' and (
    exists (select 1 from public.book_invoices where journal_entry_id = p_entry and voided_at is null)
    or exists (select 1 from public.book_settlements where journal_entry_id = p_entry and voided_at is null)
  ) then
    raise exception 'This entry is an invoice, receipt or payment in the Books: edit or void it there' using errcode = '22023';
  end if;

  perform private.undo_subledger(p_entry);
  select jsonb_agg(jsonb_build_object('account_id', account_id, 'party_id', party_id, 'party_name', party_name, 'description', description, 'debit', credit, 'credit', debit) order by line_no)
    into lines from public.journal_lines where entry_id = p_entry;
  r := private.post_entry(j.client_id, p_date, 'general_journal', 'reversal', 'Reversal: ' || btrim(p_reason), j.reference, lines, p_entry);
  update public.journal_entries set status = 'reversed' where id = p_entry;
  return r;
end;
$$;

revoke execute on function public.save_book_invoice(uuid, jsonb) from public, anon;
revoke execute on function public.void_book_invoice(uuid, text) from public, anon;
revoke execute on function public.save_book_settlement(uuid, jsonb) from public, anon;
revoke execute on function public.void_book_settlement(uuid, text) from public, anon;
revoke execute on function public.reverse_journal_entry(uuid, date, text) from public, anon;
grant execute on function public.save_book_invoice(uuid, jsonb) to authenticated;
grant execute on function public.void_book_invoice(uuid, text) to authenticated;
grant execute on function public.save_book_settlement(uuid, jsonb) to authenticated;
grant execute on function public.void_book_settlement(uuid, text) to authenticated;
grant execute on function public.reverse_journal_entry(uuid, date, text) to authenticated;
revoke execute on function private.undo_subledger(uuid) from public, anon, authenticated;
revoke execute on function private.book_post(uuid, date, text, text, text, text, jsonb, uuid) from public, anon, authenticated;
revoke execute on function private.book_reverse(uuid, text) from public, anon, authenticated;
revoke execute on function private.book_check_date(uuid, date) from public, anon, authenticated;
revoke execute on function private.book_post_invoice(uuid) from public, anon, authenticated;
revoke execute on function private.book_write_invoice(uuid, uuid, jsonb, uuid, uuid) from public, anon, authenticated;
revoke execute on function private.book_write_settlement(uuid, uuid, jsonb, uuid, uuid) from public, anon, authenticated;
revoke execute on function private.book_void_settlement(uuid, text) from public, anon, authenticated;
revoke execute on function private.book_void_invoice(uuid, text) from public, anon, authenticated;
