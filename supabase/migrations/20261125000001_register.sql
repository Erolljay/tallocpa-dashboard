-- One register (Owner's decision, 25 November 2026; docs/UX-REVIEW.md, R11).
--
-- Bookkeeping and tax compliance are one service from one data source: every
-- approved sales invoice, purchase receipt and 2307 becomes a register line,
-- whatever channel it came in by (portal, staff, and later email and batch).
-- A line carries the figures of its three parts:
--   sales part        amounts, terms, withholding, the net that reached or left cash
--   bookkeeping part  the account title (documents.ledger_account_id, else the
--                     account the document would be booked to)
--   tax part          VAT status at the line's date and the SLP purchase category
-- The entries and the tax lines themselves are worked out from the line
-- (src/lib/register/parts.ts). The return worksheets read the register
-- (src/lib/returns/load.ts); the books follow in a later slice.
--
-- The register is maintained by the database: a line is written whenever a
-- document's approved figures, status, month or account title change, and
-- removed when the document is no longer approved. Staff read it; nobody
-- writes it directly.

-- Intake channels for the register (email to invoices@tallocpa.com; batch upload at onboarding).
alter table public.documents drop constraint documents_source_check;
alter table public.documents add constraint documents_source_check check (source in ('portal', 'staff', 'email', 'batch'));

create table public.register_lines (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  document_id uuid not null unique references public.documents (id) on delete cascade,
  kind text not null check (kind in ('sale', 'purchase', 'cwt_received', 'ewt_issued')),
  source text not null check (source in ('portal', 'staff', 'email', 'batch')),
  -- First day of the month the line counts in (the document's month).
  month date not null check (extract(day from month) = 1),
  line_date date,
  reference text,
  party_id uuid references public.parties (id) on delete set null,
  party_name text,
  party_tin text,
  party_address text,
  terms text not null default 'cash' check (terms in ('cash', 'charge')),
  vatable numeric(18, 2) not null default 0,
  vat_exempt numeric(18, 2) not null default 0,
  zero_rated numeric(18, 2) not null default 0,
  vat numeric(18, 2) not null default 0,
  -- The total as approved (0 when none was read); `net` fills a missing total from the amounts.
  total numeric(18, 2) not null default 0,
  -- SC/PWD discount (sales), VAT withheld by a government payor, other deductions.
  discount numeric(18, 2) not null default 0,
  vat_withheld numeric(18, 2) not null default 0,
  other_deduction numeric(18, 2) not null default 0,
  -- CWT on a sale, EWT on a purchase, or the tax on a 2307.
  atc text,
  withholding numeric(18, 2) not null default 0,
  -- What reached cash (sales) or left it (purchases): total less withholding and
  -- deductions. Zero for 2307 lines, which move no cash.
  net numeric(18, 2) not null default 0,
  account_id uuid,
  slp_category text check (slp_category in ('capital_goods', 'other_goods', 'services', 'zero_rated', 'exempt')),
  vat_registered boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (client_id, account_id) references public.ledger_accounts (client_id, id)
);

create index register_lines_client_month_idx on public.register_lines (client_id, month, kind);

create trigger touch_updated_at before update on public.register_lines for each row execute function private.touch_updated_at();

alter table public.register_lines enable row level security;
create policy register_read on public.register_lines for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));

/** "1120.50" → 1120.50; anything that is not a plain number → 0. */
create or replace function private.register_amount(v text) returns numeric
language sql immutable set search_path = '' as $$
  select case when btrim(coalesce(v, '')) ~ '^-?\d+(\.\d+)?$' then round(btrim(v)::numeric, 2) else 0 end
$$;

/** Writes, rewrites or removes the register line of one document. */
create or replace function private.sync_register_line(p_document uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  f jsonb;
  v_kind text;
  v_date date;
  v_vatable numeric; v_exempt numeric; v_zero numeric; v_vat numeric; v_total numeric;
  v_wh numeric; v_wv numeric; v_other numeric; v_disc numeric;
  v_account uuid;
  v_fs text;
  v_vat_reg boolean;
  v_slp text;
begin
  select * into d from public.documents where id = p_document;
  select approved_fields into f from public.extractions where document_id = p_document;
  v_kind := case d.doc_type when 'sales_invoice' then 'sale' when 'purchase_receipt' then 'purchase'
                            when 'bir_2307_received' then 'cwt_received' when 'bir_2307_issued' then 'ewt_issued' end;
  if d.id is null or d.status <> 'posted' or f is null or v_kind is null then
    delete from public.register_lines where document_id = p_document;
    return;
  end if;

  begin
    v_date := nullif(f ->> 'date', '')::date;
  exception when others then
    v_date := null;
  end;
  v_vatable := private.register_amount(f ->> 'vatable');
  v_exempt := private.register_amount(f ->> 'vat_exempt');
  v_zero := private.register_amount(f ->> 'zero_rated');
  v_vat := private.register_amount(f ->> 'vat');
  v_total := private.register_amount(f ->> 'total');
  v_wh := private.register_amount(f ->> 'withholding');
  v_wv := private.register_amount(f ->> 'vat_withheld');
  v_other := private.register_amount(f ->> 'other_deduction');
  v_disc := private.register_amount(f ->> 'discount');

  -- VAT-registered at the line's date: an open 2550Q obligation (as book_document).
  v_vat_reg := exists (
    select 1 from public.obligations o where o.client_id = d.client_id and o.form = '2550Q'
      and o.start_date <= coalesce(v_date, d.document_month) and (o.end_date is null or o.end_date >= coalesce(v_date, d.document_month))
  );

  -- The account title chosen on the document, else the one it would be booked to.
  v_account := coalesce(d.ledger_account_id, case when v_kind in ('sale', 'purchase') then private.document_account(d) end);
  select fs_line into v_fs from public.ledger_accounts where id = v_account;

  v_slp := nullif(f ->> 'slp_category', '');
  if v_slp is not null and v_slp not in ('capital_goods', 'other_goods', 'services', 'zero_rated', 'exempt') then v_slp := null; end if;
  if v_kind = 'purchase' and v_slp is null then
    v_slp := case when v_fs = 'ppe' then 'capital_goods'
                  when v_vatable = 0 and v_zero > 0 then 'zero_rated'
                  when v_vatable = 0 and v_exempt > 0 then 'exempt' end;
  end if;
  if v_kind <> 'purchase' then v_slp := null; end if;

  insert into public.register_lines as r (
    client_id, document_id, kind, source, month, line_date, reference, party_id, party_name, party_tin, party_address, terms,
    vatable, vat_exempt, zero_rated, vat, total, discount, vat_withheld, other_deduction, atc, withholding, net,
    account_id, slp_category, vat_registered
  ) values (
    d.client_id, d.id, v_kind, d.source, d.document_month, v_date, nullif(btrim(f ->> 'number'), ''),
    private.document_party(f ->> 'party_tin'), nullif(btrim(f ->> 'party_name'), ''), nullif(btrim(f ->> 'party_tin'), ''), nullif(btrim(f ->> 'party_address'), ''),
    case when f ->> 'payment_terms' = 'charge' then 'charge' else 'cash' end,
    v_vatable, v_exempt, v_zero, v_vat, v_total, v_disc, v_wv, v_other, nullif(upper(btrim(f ->> 'atc')), ''), v_wh,
    -- As book_document: a missing total is the amounts plus VAT.
    case when v_kind in ('sale', 'purchase') then (case when v_total > 0 then v_total else v_vatable + v_exempt + v_zero + v_vat end) - v_wh - v_wv - v_other else 0 end,
    v_account, v_slp, v_vat_reg
  )
  on conflict (document_id) do update set
    kind = excluded.kind, source = excluded.source, month = excluded.month, line_date = excluded.line_date,
    reference = excluded.reference, party_id = excluded.party_id, party_name = excluded.party_name, party_tin = excluded.party_tin, party_address = excluded.party_address,
    terms = excluded.terms, vatable = excluded.vatable, vat_exempt = excluded.vat_exempt, zero_rated = excluded.zero_rated,
    vat = excluded.vat, total = excluded.total, discount = excluded.discount, vat_withheld = excluded.vat_withheld,
    other_deduction = excluded.other_deduction, atc = excluded.atc, withholding = excluded.withholding, net = excluded.net,
    account_id = excluded.account_id, slp_category = excluded.slp_category, vat_registered = excluded.vat_registered;
end;
$$;

create or replace function private.register_on_extraction() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform private.sync_register_line(new.document_id);
  return null;
end;
$$;

create or replace function private.register_on_document() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform private.sync_register_line(new.id);
  return null;
end;
$$;

create trigger register_sync after insert or update of approved_fields on public.extractions
  for each row execute function private.register_on_extraction();
create trigger register_sync after update of status, document_month, ledger_account_id, doc_type on public.documents
  for each row execute function private.register_on_document();

-- Every document approved before the register existed.
select private.sync_register_line(d.id)
from public.documents d join public.extractions e on e.document_id = d.id
where d.status = 'posted' and e.approved_fields is not null;

revoke execute on function private.register_amount(text) from public, anon, authenticated;
revoke execute on function private.sync_register_line(uuid) from public, anon, authenticated;
revoke execute on function private.register_on_extraction() from public, anon, authenticated;
revoke execute on function private.register_on_document() from public, anon, authenticated;
