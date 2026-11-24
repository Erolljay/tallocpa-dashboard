-- Bookkeeping, Phase 1B slice 1 (spec §3.6): one double-entry ledger per
-- bookkeeping client.
--
--   client_books      a client's books: the chart-of-accounts template it started
--                     from and the first month of the books (1 January 2027 for
--                     the go-live clients, Q34).
--   ledger_accounts   the client's chart of accounts, copied from a template
--                     (src/lib/ledger/coa) and editable. Every account carries
--                     the FS line it is reported on (fs_line) and, for income and
--                     expense accounts, the BIR income tax line it feeds
--                     (bir_line), and the template key it came from. `control` marks the accounts the app posts to
--                     by itself (AR, AP, input/output VAT, CWT…).
--   journal_entries   entries in the books: suggested (from an approved document,
--                     slice 2) → posted → reversed. "Posted" here is the ledger's
--                     own state; documents.status 'posted' still means approved.
--   journal_lines     debit or credit lines, fixed-precision pesos.
--   open_items        receivables and payables by customer / supplier, opened by
--                     the opening balances (and by charge invoices, slice 2).
--
-- Rules the database enforces:
--   - every entry balances (debits = credits, at least two lines), checked at
--     commit;
--   - a posted entry never changes: it is reversed by a new entry;
--   - entries are written only through the functions below (no direct writes).

create table public.client_books (
  client_id uuid primary key references public.clients (id) on delete cascade,
  template text not null check (template in ('sole_proprietorship', 'partnership', 'stock_corporation', 'opc', 'non_stock')),
  -- First day of the first month kept in the OS; the opening balances are dated the day before.
  books_start date not null check (extract(day from books_start) = 1),
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ledger_accounts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  code text not null check (code ~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,19}$'),
  name text not null check (btrim(name) <> ''),
  type text not null check (type in ('asset', 'liability', 'equity', 'revenue', 'cost', 'expense', 'other_income', 'income_tax')),
  -- Contra accounts (accumulated depreciation, drawings, sales returns) carry the side opposite their type.
  normal_side text not null check (normal_side in ('debit', 'credit')),
  fs_line text not null check (fs_line ~ '^[a-z][a-z0-9_]*$'),
  bir_line text check (bir_line ~ '^[a-z][a-z0-9_]*$'),
  control text check (control in (
    'cash', 'bank', 'ar', 'ap', 'input_vat', 'output_vat', 'cwt', 'ewt_payable', 'percentage_tax_payable',
    'income_tax_payable', 'inventory', 'capital', 'drawings', 'retained_earnings'
  )),
  -- The template account it came from (e.g. 'representation'): the same key in every
  -- client's books, so a supplier's preset account title (parties directory, slice 2)
  -- finds each client's own account whatever its code or name.
  template_key text check (template_key ~ '^[a-z][a-z0-9_]*$'),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, code),
  unique (client_id, template_key),
  unique (client_id, id)
);

-- One account per single-purpose control (cash, bank, capital and drawings may repeat: several banks, several partners).
create unique index ledger_accounts_one_control on public.ledger_accounts (client_id, control)
  where control in ('ar', 'ap', 'input_vat', 'output_vat', 'cwt', 'ewt_payable', 'percentage_tax_payable', 'income_tax_payable', 'inventory', 'retained_earnings');

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  entry_date date not null,
  -- First day of the entry's month (immutable arithmetic, usable in a generated column).
  period date generated always as (entry_date - (extract(day from entry_date)::integer - 1)) stored,
  book text not null default 'general_journal' check (book in ('general_journal', 'cash_receipts', 'cash_disbursements', 'sales', 'purchases')),
  source text not null check (source in ('opening', 'manual', 'document', 'arap_update', 'reversal', 'closing')),
  document_id uuid references public.documents (id) on delete restrict,
  status text not null default 'suggested' check (status in ('suggested', 'posted', 'reversed')),
  reference text,
  memo text not null check (btrim(memo) <> ''),
  reverses uuid references public.journal_entries (id),
  created_by uuid references auth.users (id) default auth.uid(),
  created_at timestamptz not null default now(),
  posted_by uuid references auth.users (id),
  posted_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (client_id, id),
  check ((status = 'suggested') = (posted_at is null)),
  check ((source = 'reversal') = (reverses is not null))
);

create index journal_entries_client_date_idx on public.journal_entries (client_id, entry_date);
create index journal_entries_document_idx on public.journal_entries (document_id) where document_id is not null;
create unique index journal_entries_one_opening on public.journal_entries (client_id) where source = 'opening';
create unique index journal_entries_one_reversal on public.journal_entries (reverses) where reverses is not null;

create table public.journal_lines (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null,
  entry_id uuid not null,
  line_no smallint not null check (line_no > 0),
  account_id uuid not null,
  party_id uuid references public.parties (id),
  description text,
  debit numeric(18, 2) not null default 0 check (debit >= 0),
  credit numeric(18, 2) not null default 0 check (credit >= 0),
  check ((debit > 0) <> (credit > 0)),
  unique (entry_id, line_no),
  foreign key (client_id, entry_id) references public.journal_entries (client_id, id) on delete cascade,
  -- An account of the same client; an account with lines cannot be deleted.
  foreign key (client_id, account_id) references public.ledger_accounts (client_id, id)
);

create index journal_lines_account_idx on public.journal_lines (account_id);

create table public.open_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('receivable', 'payable')),
  party_id uuid references public.parties (id),
  party_name text not null check (btrim(party_name) <> ''),
  party_tin text check (party_tin ~ '^\d{3}-\d{3}-\d{3}$'),
  doc_number text,
  doc_date date,
  due_date date,
  -- Positive: owed to (receivable) or by (payable) the client. Negative: an unapplied credit.
  amount numeric(18, 2) not null check (amount <> 0),
  balance numeric(18, 2) not null,
  account_id uuid not null,
  source_entry_id uuid not null references public.journal_entries (id) on delete cascade,
  created_at timestamptz not null default now(),
  foreign key (client_id, account_id) references public.ledger_accounts (client_id, id)
);

create index open_items_client_idx on public.open_items (client_id, kind);

-- ---------------------------------------------------------------------------
-- Guards.
-- ---------------------------------------------------------------------------

-- Every entry balances, checked when the transaction commits.
create or replace function private.journal_balance_check() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  target uuid;
  n integer;
  dr numeric;
  cr numeric;
begin
  if tg_table_name = 'journal_entries' then
    target := case when tg_op = 'DELETE' then old.id else new.id end;
  else
    target := case when tg_op = 'DELETE' then old.entry_id else new.entry_id end;
  end if;
  if not exists (select 1 from public.journal_entries where id = target) then return null; end if;
  select count(*), coalesce(sum(debit), 0), coalesce(sum(credit), 0) into n, dr, cr
    from public.journal_lines where entry_id = target;
  if n < 2 or dr <> cr or dr = 0 then
    raise exception 'A journal entry must balance: debits % and credits % on % line(s)', dr, cr, n using errcode = '23514';
  end if;
  return null;
end;
$$;

create constraint trigger balanced after insert or update or delete on public.journal_lines
  deferrable initially deferred for each row execute function private.journal_balance_check();
create constraint trigger balanced after insert or update on public.journal_entries
  deferrable initially deferred for each row execute function private.journal_balance_check();

-- Lines change only while their entry is a suggestion.
create or replace function private.journal_lines_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  st text;
  target uuid := case when tg_op = 'DELETE' then old.entry_id else new.entry_id end;
begin
  select status into st from public.journal_entries where id = target;
  if st is null then
    if tg_op = 'DELETE' then return old; end if; -- the entry is being deleted (cascade)
    raise exception 'Journal entry not found' using errcode = 'P0002';
  end if;
  if st <> 'suggested' then
    raise exception 'A posted journal entry cannot be changed; reverse it instead' using errcode = '42501';
  end if;
  if tg_op = 'UPDATE' and (new.entry_id <> old.entry_id or new.client_id <> old.client_id) then
    raise exception 'A line stays with its entry' using errcode = '22023';
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

create trigger guard before insert or update or delete on public.journal_lines
  for each row execute function private.journal_lines_guard();

-- A posted entry is final: the only change is posted → reversed. Only suggestions
-- (and the opening entry, when the opening balances are imported again) are deleted.
create or replace function private.journal_entries_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'DELETE' then
    if old.status = 'suggested' then return old; end if;
    if old.source = 'opening' and current_setting('ledger.replace_opening', true) = 'on' then return old; end if;
    -- The client itself is being deleted.
    if not exists (select 1 from public.clients where id = old.client_id) then return old; end if;
    raise exception 'A posted journal entry cannot be deleted; reverse it instead' using errcode = '42501';
  end if;
  if new.client_id <> old.client_id then
    raise exception 'An entry stays with its client' using errcode = '22023';
  end if;
  if old.status = 'suggested' then
    if new.status = 'reversed' then raise exception 'Post the entry before reversing it' using errcode = '22023'; end if;
    return new;
  end if;
  if not (old.status = 'posted' and new.status = 'reversed')
     -- period is generated after BEFORE triggers run, so NEW does not carry it yet.
     or (to_jsonb(new) - array['status', 'updated_at', 'period']) <> (to_jsonb(old) - array['status', 'updated_at', 'period']) then
    raise exception 'A posted journal entry cannot be changed; reverse it instead' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger guard before update or delete on public.journal_entries
  for each row execute function private.journal_entries_guard();

-- Once an account has lines, its type, normal side and control role are fixed.
create or replace function private.ledger_accounts_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.client_id <> old.client_id then
    raise exception 'An account stays with its client' using errcode = '22023';
  end if;
  if (new.type, new.normal_side, new.control) is distinct from (old.type, old.normal_side, old.control)
     and exists (select 1 from public.journal_lines where account_id = old.id) then
    raise exception 'This account has entries: its type, normal balance and control role cannot change. Add a new account instead.' using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger guard before update on public.ledger_accounts
  for each row execute function private.ledger_accounts_guard();

do $$
declare t text;
begin
  foreach t in array array['client_books', 'ledger_accounts', 'journal_entries', 'open_items'] loop
    execute format('create trigger audit after insert or update or delete on public.%I for each row execute function private.audit()', t);
  end loop;
  foreach t in array array['client_books', 'ledger_accounts', 'journal_entries'] loop
    execute format('create trigger touch_updated_at before update on public.%I for each row execute function private.touch_updated_at()', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row-level security: staff who can see the client read the books; the Owner and
-- the staff assigned to the client keep the chart of accounts. Entries, lines and
-- open items are written only by the functions below. Client users see reports
-- once released (slice 6), never the ledger itself.
-- ---------------------------------------------------------------------------
alter table public.client_books enable row level security;
alter table public.ledger_accounts enable row level security;
alter table public.journal_entries enable row level security;
alter table public.journal_lines enable row level security;
alter table public.open_items enable row level security;

create policy books_read on public.client_books for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy accounts_read on public.ledger_accounts for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy entries_read on public.journal_entries for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy lines_read on public.journal_lines for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy open_items_read on public.open_items for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));

create policy accounts_insert on public.ledger_accounts for insert to authenticated with check (
  (private.is_owner() or private.is_assigned(client_id))
  and exists (select 1 from public.client_books b where b.client_id = ledger_accounts.client_id)
);
create policy accounts_update on public.ledger_accounts for update to authenticated
  using (private.is_owner() or private.is_assigned(client_id))
  with check (private.is_owner() or private.is_assigned(client_id));
create policy accounts_delete on public.ledger_accounts for delete to authenticated
  using (private.is_owner() or private.is_assigned(client_id));

-- ---------------------------------------------------------------------------
-- Functions.
-- ---------------------------------------------------------------------------

create or replace function private.can_keep_books(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_owner() or private.is_assigned(target)
$$;

-- Starts a client's books from a chart-of-accounts template. p_accounts is the
-- template's account list (src/lib/ledger/coa), possibly edited:
--   [{key, code, name, type, normal_side, fs_line, bir_line, control, sort_order}]
create or replace function public.setup_books(p_client uuid, p_template text, p_books_start date, p_accounts jsonb)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can set up its books' using errcode = '42501';
  end if;
  if not exists (
    select 1 from public.engagements
    where client_id = p_client and service_line = 'bookkeeping' and status = 'active'
  ) then
    raise exception 'This client has no active Bookkeeping engagement' using errcode = '22023';
  end if;
  if exists (select 1 from public.client_books where client_id = p_client) then
    raise exception 'This client''s books are already set up' using errcode = '22023';
  end if;
  if p_accounts is null or jsonb_typeof(p_accounts) <> 'array' or jsonb_array_length(p_accounts) = 0 then
    raise exception 'The chart of accounts is empty' using errcode = '22023';
  end if;

  insert into public.client_books (client_id, template, books_start) values (p_client, p_template, p_books_start);
  insert into public.ledger_accounts (client_id, template_key, code, name, type, normal_side, fs_line, bir_line, control, sort_order)
  select p_client, nullif(a.key, ''), a.code, a.name, a.type, a.normal_side, a.fs_line, nullif(a.bir_line, ''), nullif(a.control, ''), coalesce(a.sort_order, 0)
  from jsonb_to_recordset(p_accounts) as a(key text, code text, name text, type text, normal_side text, fs_line text, bir_line text, control text, sort_order integer);
end;
$$;

-- Posts a balanced entry made of p_lines ([{account_id, debit, credit, description, party_id}]).
-- Internal: callers check access and dates.
create or replace function private.post_entry(
  p_client uuid, p_date date, p_book text, p_source text, p_memo text, p_reference text, p_lines jsonb, p_reverses uuid default null
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  e uuid;
begin
  if p_lines is null or jsonb_typeof(p_lines) <> 'array' or jsonb_array_length(p_lines) < 2 then
    raise exception 'An entry needs at least two lines' using errcode = '22023';
  end if;
  insert into public.journal_entries (client_id, entry_date, book, source, memo, reference, reverses)
  values (p_client, p_date, p_book, p_source, p_memo, nullif(btrim(p_reference), ''), p_reverses)
  returning id into e;
  insert into public.journal_lines (client_id, entry_id, line_no, account_id, party_id, description, debit, credit)
  select p_client, e, l.n, (l.x ->> 'account_id')::uuid, nullif(l.x ->> 'party_id', '')::uuid, nullif(btrim(l.x ->> 'description'), ''),
         coalesce(nullif(l.x ->> 'debit', '')::numeric(18, 2), 0), coalesce(nullif(l.x ->> 'credit', '')::numeric(18, 2), 0)
  from jsonb_array_elements(p_lines) with ordinality as l(x, n);
  update public.journal_entries set status = 'posted', posted_by = auth.uid(), posted_at = now() where id = e;
  return e;
end;
$$;

-- The opening trial balance (as of the day before the books start) and the open
-- receivables and payables that make up the AR and AP balances. Importing again
-- replaces the previous opening balances.
--   p_lines  [{account_id, debit, credit}]
--   p_items  [{kind: receivable|payable, party_name, party_tin, doc_number, doc_date, due_date, amount}]
create or replace function public.save_opening_balances(p_client uuid, p_lines jsonb, p_items jsonb default '[]'::jsonb)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
  e uuid;
  ar uuid;
  ap uuid;
  ar_balance numeric := 0;
  ap_balance numeric := 0;
  ar_items numeric;
  ap_items numeric;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can enter its opening balances' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  p_items := coalesce(p_items, '[]'::jsonb);

  perform set_config('ledger.replace_opening', 'on', true);
  delete from public.journal_entries where client_id = p_client and source = 'opening';
  perform set_config('ledger.replace_opening', 'off', true);

  e := private.post_entry(p_client, b.books_start - 1, 'general_journal', 'opening', 'Opening balances', null, p_lines);

  select id into ar from public.ledger_accounts where client_id = p_client and control = 'ar';
  select id into ap from public.ledger_accounts where client_id = p_client and control = 'ap';
  select coalesce(sum(debit - credit), 0) into ar_balance from public.journal_lines where entry_id = e and account_id = ar;
  select coalesce(sum(credit - debit), 0) into ap_balance from public.journal_lines where entry_id = e and account_id = ap;
  select coalesce(sum((x ->> 'amount')::numeric(18, 2)) filter (where x ->> 'kind' = 'receivable'), 0),
         coalesce(sum((x ->> 'amount')::numeric(18, 2)) filter (where x ->> 'kind' = 'payable'), 0)
    into ar_items, ap_items
    from jsonb_array_elements(p_items) as x;
  if ar_items <> ar_balance then
    raise exception 'The receivables listed (%) do not add up to the Accounts Receivable balance (%)', ar_items, ar_balance using errcode = '22023';
  end if;
  if ap_items <> ap_balance then
    raise exception 'The payables listed (%) do not add up to the Accounts Payable balance (%)', ap_items, ap_balance using errcode = '22023';
  end if;

  insert into public.open_items (client_id, kind, party_id, party_name, party_tin, doc_number, doc_date, due_date, amount, balance, account_id, source_entry_id)
  select p_client, i.kind,
         (select p.id from public.parties p where p.tin = nullif(i.party_tin, '') and p.branch_code = '00000'),
         btrim(i.party_name), nullif(i.party_tin, ''), nullif(btrim(i.doc_number), ''), i.doc_date, i.due_date,
         i.amount, i.amount, case when i.kind = 'receivable' then ar else ap end, e
  from jsonb_to_recordset(p_items) as i(kind text, party_name text, party_tin text, doc_number text, doc_date date, due_date date, amount numeric(18, 2));
  return e;
end;
$$;

-- A manual entry (adjustments, depreciation, corrections), posted at once.
create or replace function public.post_journal_entry(p_client uuid, p_date date, p_memo text, p_reference text, p_lines jsonb)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  b public.client_books;
begin
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = p_client;
  if b.client_id is null then raise exception 'Set up the books first' using errcode = 'P0002'; end if;
  if p_date is null or p_date < b.books_start then
    raise exception 'The date must be on or after the start of the books (%)', b.books_start using errcode = '22023';
  end if;
  return private.post_entry(p_client, p_date, 'general_journal', 'manual', p_memo, p_reference, p_lines);
end;
$$;

-- Reverses a posted entry with a new entry dated p_date (debits and credits swapped).
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

  select jsonb_agg(jsonb_build_object('account_id', account_id, 'party_id', party_id, 'description', description, 'debit', credit, 'credit', debit) order by line_no)
    into lines from public.journal_lines where entry_id = p_entry;
  r := private.post_entry(j.client_id, p_date, 'general_journal', 'reversal', 'Reversal: ' || btrim(p_reason), j.reference, lines, p_entry);
  update public.journal_entries set status = 'reversed' where id = p_entry;
  return r;
end;
$$;

-- Trial balance for a date range: the balance before p_from, the period's
-- debits and credits, and the closing balance (debit positive). Runs with the
-- caller's rights, so row-level security applies.
create or replace function public.trial_balance(p_client uuid, p_from date, p_to date)
returns table (account_id uuid, code text, name text, type text, normal_side text, fs_line text, bir_line text, opening numeric, debit numeric, credit numeric, closing numeric)
language sql stable security invoker set search_path = '' as $$
  select a.id, a.code, a.name, a.type, a.normal_side, a.fs_line, a.bir_line,
         coalesce(sum(l.debit - l.credit) filter (where e.entry_date < p_from), 0),
         coalesce(sum(l.debit) filter (where e.entry_date between p_from and p_to), 0),
         coalesce(sum(l.credit) filter (where e.entry_date between p_from and p_to), 0),
         coalesce(sum(l.debit - l.credit) filter (where e.entry_date <= p_to), 0)
  from public.ledger_accounts a
  left join public.journal_lines l on l.account_id = a.id
  left join public.journal_entries e on e.id = l.entry_id and e.status in ('posted', 'reversed')
  where a.client_id = p_client
  group by a.id
  order by a.sort_order, a.code
$$;

revoke execute on function public.setup_books(uuid, text, date, jsonb) from public, anon;
revoke execute on function public.save_opening_balances(uuid, jsonb, jsonb) from public, anon;
revoke execute on function public.post_journal_entry(uuid, date, text, text, jsonb) from public, anon;
revoke execute on function public.reverse_journal_entry(uuid, date, text) from public, anon;
revoke execute on function public.trial_balance(uuid, date, date) from public, anon;
grant execute on function public.setup_books(uuid, text, date, jsonb) to authenticated;
grant execute on function public.save_opening_balances(uuid, jsonb, jsonb) to authenticated;
grant execute on function public.post_journal_entry(uuid, date, text, text, jsonb) to authenticated;
grant execute on function public.reverse_journal_entry(uuid, date, text) to authenticated;
grant execute on function public.trial_balance(uuid, date, date) to authenticated;
revoke execute on function private.post_entry(uuid, date, text, text, text, text, jsonb, uuid) from public, anon, authenticated;
