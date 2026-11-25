-- A tax code for purchases and expenses with no invoice (Owner, 25 November 2026):
-- fish, vegetables and other goods bought from fishermen, farmers and small sellers
-- who issue no invoice. The line goes to its expense or cost account in full, so it
-- is in the income statement and counts as a deduction for income tax (itemized),
-- but it carries no input VAT and feeds no BIR list or return line: not the SLP,
-- the 2550Q, the SAWT or the QAP. Its support is the photo or voucher the purchase
-- came in with (acknowledgment receipt, purchase voucher or list of sellers).

alter table public.tax_codes drop constraint tax_codes_kind_check;
alter table public.tax_codes add constraint tax_codes_kind_check check (kind in (
  'output_vat', 'vat_exempt_sales', 'zero_rated_sales',
  'input_vat_capital', 'input_vat_goods', 'input_vat_services', 'vat_exempt_purchases', 'zero_rated_purchases',
  'not_reported_purchases',
  'withholding', 'govt_vat_withheld'
));

insert into public.tax_codes (code, name, kind, rate, atc, payee_type, sort_order)
values ('NR', 'No invoice – not reported (deductible)', 'not_reported_purchases', 0, null, null, 85)
on conflict (code) do nothing;
