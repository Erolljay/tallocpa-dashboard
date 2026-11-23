-- Brand profile (spec §3.1; Q44, Q55, Q60).
--
-- Everything the firm prints about itself lives on the brand, not in code: BIR
-- registration (TIN and branch, RDO, registered address, the COR file),
-- contact details for statements, professional credentials (CPA licence, BOA
-- and BIR tax agent accreditations, PTR) with their expiry dates, the
-- signatory, and how the firm issues its Service Invoices (EOPT Act).
--
-- Access stays as on brands: anyone signed in reads, only the Owner writes.
-- Brands is already in the audit-trigger list (core schema), so every change
-- here is logged.

alter table public.brands
  add column tin_branch_code text,
  add column registered_address text,
  add column business_address text,
  add column phone text,
  add column reply_to_email text,
  add column website text,
  add column facebook_url text,
  -- BIR Form 2303 (Certificate of Registration), in the private brand-files bucket.
  add column cor_path text,
  add column cpa_license_no text,
  add column boa_firm_accreditation_no text,
  add column boa_firm_accreditation_valid_until date,
  add column boa_individual_accreditation_no text,
  add column boa_individual_accreditation_valid_until date,
  add column bir_tax_agent_accreditation_no text,
  add column bir_tax_agent_accreditation_valid_until date,
  add column ptr_no text,
  add column ptr_date date,
  add column ptr_place text,
  add column dti_business_name_no text,
  add column signatory_name text,
  add column signatory_title text,
  -- EOPT Act: Service Invoices from a printed booklet, loose-leaf, or a computerized accounting system.
  add column invoice_method text,
  add column invoice_series_prefix text,
  add column atp_or_permit_no text;

-- A TIN entered as 12–14 digits carries its branch code: split it off.
update public.brands
set
  tin_branch_code = coalesce(tin_branch_code, nullif(substring(regexp_replace(tin, '\D', '', 'g') from 10), '')),
  tin = regexp_replace(substring(regexp_replace(tin, '\D', '', 'g') from 1 for 9), '^(\d{3})(\d{3})(\d{3})$', '\1-\2-\3')
where tin ~ '^\s*\d{3}[- ]?\d{3}[- ]?\d{3}([- ]?\d{3,5})?\s*$';

alter table public.brands
  add constraint brands_tin_format check (tin is null or tin ~ '^\d{3}-\d{3}-\d{3}$'),
  add constraint brands_tin_branch_format check (tin_branch_code is null or tin_branch_code ~ '^\d{3,5}$'),
  add constraint brands_reply_to_email_format check (reply_to_email is null or reply_to_email ~* '^[^@\s]+@[^@\s]+\.[a-z]{2,}$'),
  add constraint brands_website_format check (website is null or website ~* '^https?://[^\s/]+\.[^\s]+$'),
  add constraint brands_facebook_format check (facebook_url is null or facebook_url ~* '^https?://([a-z0-9-]+\.)*(facebook\.com|fb\.com|fb\.me)/\S+$'),
  add constraint brands_invoice_method check (invoice_method is null or invoice_method in ('booklet', 'loose_leaf', 'cas')),
  add constraint brands_gross_receipts_warning_positive check (gross_receipts_warning > 0);

-- ---------------------------------------------------------------------------
-- Brand files: the COR and the logo. Staff can view them; only the Owner
-- changes them. Paths are <brand id>/<cor|logo>/<file>. The logo is also
-- readable by client users, as it is printed on their statements.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('brand-files', 'brand-files', false, 5242880, array['application/pdf', 'image/png', 'image/jpeg', 'image/svg+xml'])
on conflict (id) do nothing;

create policy brand_files_read on storage.objects for select to authenticated using (
  bucket_id = 'brand-files' and (private.is_staff() or (storage.foldername(name))[2] = 'logo')
);
create policy brand_files_insert on storage.objects for insert to authenticated with check (bucket_id = 'brand-files' and private.is_owner());
create policy brand_files_update on storage.objects for update to authenticated using (bucket_id = 'brand-files' and private.is_owner());
create policy brand_files_delete on storage.objects for delete to authenticated using (bucket_id = 'brand-files' and private.is_owner());

-- ---------------------------------------------------------------------------
-- Gross receipts watch (Q55): what the brand collected in a calendar year, by
-- month and by kind of due paid. The app counts only the firm's own fees
-- (retainer and other charges); tax and contributions are client money the
-- firm remits. 'unallocated' is money received but not yet matched to a due
-- (a client credit), shown separately. Voided deposits do not count. Owner only.
-- ---------------------------------------------------------------------------
create or replace function public.brand_receipts_by_month(p_brand uuid, p_year integer)
returns table (month date, kind text, amount numeric)
language plpgsql stable security invoker set search_path = '' as $$
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can see gross receipts' using errcode = '42501';
  end if;
  return query
  with deposits as (
    select dep.id, dep.amount, dep.received_on
    from public.client_deposits dep
    join public.clients c on c.id = dep.client_id
    where c.brand_id = p_brand
      and dep.voided_at is null
      and dep.received_on >= make_date(p_year, 1, 1)
      and dep.received_on < make_date(p_year + 1, 1, 1)
  ),
  matched as (
    select dep.received_on, d.kind, a.amount
    from deposits dep
    join public.payment_allocations a on a.deposit_id = dep.id
    join public.client_dues d on d.id = a.due_id
  ),
  unmatched as (
    select dep.received_on, 'unallocated'::text as kind, dep.amount - coalesce(sum(a.amount), 0) as amount
    from deposits dep
    left join public.payment_allocations a on a.deposit_id = dep.id
    group by dep.id, dep.received_on, dep.amount
  )
  select date_trunc('month', x.received_on)::date, x.kind, sum(x.amount)::numeric(18, 2)
  from (select m.* from matched m union all select u.* from unmatched u where u.amount > 0) x
  group by 1, 2
  order by 1, 2;
end;
$$;

revoke execute on function public.brand_receipts_by_month(uuid, integer) from public, anon;
grant execute on function public.brand_receipts_by_month(uuid, integer) to authenticated;
