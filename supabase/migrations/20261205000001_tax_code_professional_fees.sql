-- Professional fees: the rates of the ATC master (taxify ATC_MASTER, src/lib/returns/atc.ts; RR 11-2018).
--   WI010 individual, gross income <= P3M:          5%  (was seeded at 10% by mistake)
--   WI011 individual, gross income > P3M or VAT:    10%
--   WC010 non-individual, gross income <= P720K:    10%
--   WC011 non-individual, gross income > P720K:     15%
-- Lines already posted keep the amounts they were entered with; the new rate applies from now on.

update public.tax_codes
   set rate = 0.05, name = 'WI010 Professional fees, individual <=3M 5%'
 where code = 'WI010';

update public.tax_codes
   set name = 'WC010 Professional fees, non-individual <=720K 10%'
 where code = 'WC010';

insert into public.tax_codes (code, name, kind, rate, atc, payee_type, sort_order) values
  ('WI011', 'WI011 Professional fees, individual >3M or VAT 10%', 'withholding', 0.10, 'WI011', 'individual', 171),
  ('WC011', 'WC011 Professional fees, non-individual >720K 15%', 'withholding', 0.15, 'WC011', 'corporate', 131)
on conflict (code) do nothing;
