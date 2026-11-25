-- Rework phase 1 (docs/REWORK.md, decisions 6 and 7): tax codes.
--
-- One firm-wide list of tax codes, as in Manager.io. A code goes only on a line
-- of a Sales Invoice or a Purchase Invoice (VAT codes), or on the invoice itself
-- (withholding codes): Receipts and Payments carry none. Each code has a `kind`
-- the returns group on; which return lines each kind feeds is kept as data in
-- src/lib/books/tax-codes.ts (2550Q lines, SLS/SLP columns, 0619-E / 1601-EQ /
-- QAP, SAWT).
--
--   kind                   on              rate   what it is
--   output_vat             sales lines     12%    VATable sales
--   vat_exempt_sales       sales lines      0     VAT-exempt sales
--   zero_rated_sales       sales lines      0     zero-rated sales
--   input_vat_capital      purchase lines  12%    capital goods
--   input_vat_goods        purchase lines  12%    goods other than capital goods
--   input_vat_services     purchase lines  12%    services
--   vat_exempt_purchases   purchase lines   0     VAT-exempt purchases
--   zero_rated_purchases   purchase lines   0     zero-rated purchases
--   withholding            invoice         ATC    on a Purchase Invoice: EWT the client
--                                                 withholds (0619-E, 1601-EQ, QAP, 2307
--                                                 issued); on a Sales Invoice: CWT the
--                                                 customer withholds (SAWT, 2307 received)
--   govt_vat_withheld      sales invoice    5%    VAT withheld by a government customer
--                                                 (WV010 goods, WV020 services; 2550Q, SAWT)
--
-- Staff read the list; only the Owner changes it.

create table public.tax_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z0-9][A-Z0-9-]{0,19}$'),
  name text not null check (btrim(name) <> ''),
  kind text not null check (kind in (
    'output_vat', 'vat_exempt_sales', 'zero_rated_sales',
    'input_vat_capital', 'input_vat_goods', 'input_vat_services', 'vat_exempt_purchases', 'zero_rated_purchases',
    'withholding', 'govt_vat_withheld'
  )),
  -- 0.12 for 12%.
  rate numeric(6, 4) not null default 0 check (rate >= 0 and rate < 1),
  -- Withholding codes: the BIR ATC and who the payee is.
  atc text check (atc ~ '^[A-Z]{2}[0-9]{3}$'),
  payee_type text check (payee_type in ('corporate', 'individual')),
  -- Which invoices the code may go on, from its kind.
  applies_to text generated always as (
    case when kind in ('output_vat', 'vat_exempt_sales', 'zero_rated_sales', 'govt_vat_withheld') then 'sales'
         when kind = 'withholding' then 'both'
         else 'purchases' end
  ) stored,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((kind in ('withholding', 'govt_vat_withheld')) = (atc is not null)),
  check (kind = 'withholding' or payee_type is null)
);

create trigger audit after insert or update or delete on public.tax_codes for each row execute function private.audit();
create trigger touch_updated_at before update on public.tax_codes for each row execute function private.touch_updated_at();

alter table public.tax_codes enable row level security;
create policy tax_codes_read on public.tax_codes for select to authenticated using (private.is_staff());
create policy tax_codes_insert on public.tax_codes for insert to authenticated with check (private.is_owner());
create policy tax_codes_update on public.tax_codes for update to authenticated using (private.is_owner()) with check (private.is_owner());
create policy tax_codes_delete on public.tax_codes for delete to authenticated using (private.is_owner());

insert into public.tax_codes (code, name, kind, rate, atc, payee_type, sort_order) values
  ('OVAT12', 'Output VAT 12%', 'output_vat', 0.12, null, null, 10),
  ('VES', 'VAT Exempt Sales', 'vat_exempt_sales', 0, null, null, 20),
  ('ZRS', 'Zero-Rated Sales', 'zero_rated_sales', 0, null, null, 30),
  ('IVAT12-CG', 'Input VAT 12% (Capital Goods)', 'input_vat_capital', 0.12, null, null, 40),
  ('IVAT12-OG', 'Input VAT 12% (Other Goods)', 'input_vat_goods', 0.12, null, null, 50),
  ('IVAT12-S', 'Input VAT 12% (Services)', 'input_vat_services', 0.12, null, null, 60),
  ('VEP', 'VAT Exempt Purchases', 'vat_exempt_purchases', 0, null, null, 70),
  ('ZRP', 'Zero-Rated Purchases', 'zero_rated_purchases', 0, null, null, 80),
  ('WC100', 'WC100 Rentals 5%', 'withholding', 0.05, 'WC100', 'corporate', 100),
  ('WC158', 'WC158 Top withholding agent, goods 1%', 'withholding', 0.01, 'WC158', 'corporate', 110),
  ('WC160', 'WC160 Top withholding agent, services 2%', 'withholding', 0.02, 'WC160', 'corporate', 120),
  ('WC010', 'WC010 Professional fees 10%', 'withholding', 0.10, 'WC010', 'corporate', 130),
  ('WI100', 'WI100 Rentals 5%', 'withholding', 0.05, 'WI100', 'individual', 140),
  ('WI158', 'WI158 Top withholding agent, goods 1%', 'withholding', 0.01, 'WI158', 'individual', 150),
  ('WI160', 'WI160 Top withholding agent, services 2%', 'withholding', 0.02, 'WI160', 'individual', 160),
  ('WI010', 'WI010 Professional fees 10%', 'withholding', 0.10, 'WI010', 'individual', 170),
  ('WV010', 'WV010 Government withholding of VAT, goods 5%', 'govt_vat_withheld', 0.05, 'WV010', null, 180),
  ('WV020', 'WV020 Government withholding of VAT, services 5%', 'govt_vat_withheld', 0.05, 'WV020', null, 190);

/** The active tax code with this code (e.g. 'WC158'), or null. */
create or replace function private.tax_code_id(p_code text) returns uuid
language sql stable security definer set search_path = '' as $$
  select id from public.tax_codes where code = upper(btrim(p_code)) and active
$$;

revoke execute on function private.tax_code_id(text) from public, anon, authenticated;
