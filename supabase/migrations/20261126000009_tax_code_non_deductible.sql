-- Non-deductible expenses (Owner, 25 November 2026): kept in the books and the income
-- statement, but added back for income tax under itemized deduction: BIR penalties and
-- surcharges, interest on late taxes, fines, unsupported expenses. No input VAT; on no
-- BIR list or VAT return (not the SLP, 2550Q, SAWT or QAP).
--   ND  Non-deductible expense  purchase lines; 1702Q / 1701Q: not a deduction (added back)

alter table public.tax_codes drop constraint tax_codes_kind_check;
alter table public.tax_codes add constraint tax_codes_kind_check check (kind in (
  'output_vat', 'vat_exempt_sales', 'zero_rated_sales', 'non_vat_sales',
  'input_vat_capital', 'input_vat_goods', 'input_vat_services', 'vat_exempt_purchases', 'zero_rated_purchases',
  'non_vat_purchases', 'not_reported_purchases', 'non_deductible',
  'withholding', 'govt_vat_withheld'
));

insert into public.tax_codes (code, name, kind, rate, atc, payee_type, sort_order)
values ('ND', 'Non-deductible expense', 'non_deductible', 0, null, null, 88)
on conflict (code) do nothing;
