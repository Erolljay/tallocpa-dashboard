-- The client's ZIP code on the client record.
--
-- Until now the only ZIP code of a client was the employer ZIP in Payroll setup
-- (payroll_settings.employer_zip_code), which the 2316 (item 14A) and the 2307
-- (item 8A) both read; a client without payroll had nowhere to keep it, and the
-- SLS / SLP file headers left the ZIP out.
--
--   * clients.zip_code: four digits, like the parties directory's ZIP.
--   * Backfilled from Payroll setup.
--   * books_2307_data() and payroll_2316_data() give the client's ZIP code, and
--     fall back to the Payroll setup one while a client has none.

alter table public.clients
  add column if not exists zip_code text check (zip_code is null or zip_code ~ '^\d{4}$');

comment on column public.clients.zip_code is 'Four-digit ZIP code of the registered address (2307 item 8A, 2316 item 14A, SLS/SLP header address 2).';

update public.clients c
   set zip_code = s.employer_zip_code
  from public.payroll_settings s
 where s.client_id = c.id and c.zip_code is null and s.employer_zip_code is not null;

create or replace function public.books_2307_data(p_client uuid, p_from date, p_to date)
returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  v_staff boolean := private.is_staff() and private.can_access_client(p_client);
  v_start date;
  result jsonb;
begin
  if not v_staff and not private.is_client_user(p_client) then
    raise exception 'The BIR 2307s of this client are not available.' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_from > p_to or p_to - p_from > 366 then
    raise exception 'Choose a period of at most a year' using errcode = '22023';
  end if;
  select b.books_start into v_start from public.client_books b where b.client_id = p_client;

  with months as (
    select g::date as month, private.books_locked_by(p_client, g::date) is not null as locked
    from generate_series(date_trunc('month', p_from), date_trunc('month', p_to), interval '1 month') g
  ),
  inv as (
    select i.*, w.atc, w.code as tax_code, w.name as tax_code_name, w.rate as tax_code_rate
    from public.book_invoices i
    join public.journal_entries j on j.id = i.journal_entry_id and j.status = 'posted'
    left join public.tax_codes w on w.id = i.withholding_code_id
    join months m on m.month = date_trunc('month', i.issue_date)::date
    where i.client_id = p_client and i.kind = 'purchase' and i.voided_at is null
      and i.issue_date between p_from and p_to
      and (i.withholding > 0 or i.withholding_code_id is not null)
      and (v_staff or m.locked)
  )
  select jsonb_build_object(
    'client', (select jsonb_build_object('id', c.id, 'name', c.name, 'tin', c.tin, 'rdo_code', c.rdo_code, 'registered_address', c.registered_address,
                                         'zip_code', c.zip_code, 'taxpayer_type', c.taxpayer_type)
               from public.clients c where c.id = p_client),
    'settings', (select jsonb_build_object('zip_code', coalesce(c.zip_code, s.employer_zip_code), 'signatory_name', s.signatory_name, 'signatory_title', s.signatory_title)
                 from public.clients c left join public.payroll_settings s on s.client_id = c.id where c.id = p_client),
    'books_start', v_start,
    'months', coalesce((select jsonb_agg(jsonb_build_object('month', m.month, 'locked', m.locked) order by m.month) from months m), '[]'::jsonb),
    -- Every locked month of the client's Books up to this month (the portal offers only these).
    'locked_months', coalesce((
      select jsonb_agg(g::date order by g)
      from generate_series(v_start, date_trunc('month', now() at time zone 'Asia/Manila'), interval '1 month') g
      where v_start is not null and private.books_locked_by(p_client, g::date) is not null), '[]'::jsonb),
    'rows', coalesce((
      select jsonb_agg(jsonb_build_object(
        'invoice_id', i.id, 'issue_date', i.issue_date, 'reference', i.reference,
        'party_id', coalesce(i.party_id, p.id), 'party_name', i.party_name, 'party_tin', i.party_tin,
        'atc', i.atc, 'tax_code', i.tax_code, 'tax_code_name', i.tax_code_name, 'tax_code_rate', i.tax_code_rate::text,
        'income_payment', i.subtotal::text, 'withholding', i.withholding::text,
        'payee', case when p.id is null then null else jsonb_build_object(
          'tin', p.tin, 'branch_code', p.branch_code, 'kind', p.kind, 'name', p.display_name,
          'registered_address', p.registered_address, 'zip_code', p.zip_code) end
      ) order by i.issue_date, i.reference, i.id)
      from inv i
      left join lateral (
        select x.* from public.parties x
        where x.id = i.party_id
           or (i.party_id is null and i.party_tin ~ '^\d{3}-\d{3}-\d{3}'
               and x.tin = substr(i.party_tin, 1, 11)
               and x.branch_code = lpad(coalesce(nullif(regexp_replace(substr(i.party_tin, 12), '\D', '', 'g'), ''), '0'), 5, '0'))
        order by (x.id = i.party_id) desc
        limit 1
      ) p on true), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;

create or replace function public.payroll_2316_data(p_client uuid, p_year int)
returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  result jsonb;
begin
  if not (
    private.can_payroll(p_client)
    or (private.is_client_user(p_client) and exists (select 1 from public.payroll_2316_releases r where r.client_id = p_client and r.year = p_year))
  ) then
    raise exception 'The BIR 2316s for % are not available.', p_year using errcode = '42501';
  end if;
  select jsonb_build_object(
    'client', (select jsonb_build_object('id', c.id, 'name', c.name, 'tin', c.tin, 'rdo_code', c.rdo_code, 'registered_address', c.registered_address, 'zip_code', c.zip_code)
               from public.clients c where c.id = p_client),
    'settings', (select jsonb_build_object('employer_zip_code', coalesce(c.zip_code, s.employer_zip_code), 'signatory_name', s.signatory_name, 'signatory_title', s.signatory_title)
                 from public.clients c left join public.payroll_settings s on s.client_id = c.id where c.id = p_client),
    'release', (select jsonb_build_object('released_at', r.released_at) from public.payroll_2316_releases r where r.client_id = p_client and r.year = p_year),
    'employees', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', e.id, 'employee_no', e.employee_no, 'last_name', e.last_name, 'first_name', e.first_name, 'middle_name', e.middle_name,
        'tin', e.tin, 'tin_branch', e.tin_branch, 'birth_date', e.birth_date, 'address', e.address, 'zip_code', e.zip_code,
        'region', e.region, 'nationality', e.nationality, 'employment_status', e.employment_status, 'is_mwe', e.is_mwe,
        'mwe_daily_rate', e.mwe_daily_rate, 'mwe_monthly_rate', e.mwe_monthly_rate, 'hire_date', e.hire_date,
        'separation_date', e.separation_date, 'separation_reason', e.separation_reason, 'substituted_filing', e.substituted_filing,
        'active', e.active, 'needs_details', e.needs_details))
      from public.employees e where e.client_id = p_client), '[]'::jsonb),
    'items', coalesce((
      select jsonb_agg(jsonb_build_object('id', i.id, 'name', i.name, 'kind', i.kind, 'bir_category', i.bir_category, 'sort_order', i.sort_order, 'active', i.active))
      from public.payroll_items i where i.client_id = p_client), '[]'::jsonb),
    'entries', coalesce((
      select jsonb_agg(jsonb_build_object(
        'employee_id', pe.employee_id, 'pay_month', pe.pay_month, 'adjustment', pe.adjustment, 'note', pe.note,
        'payroll_entry_lines', coalesce((select jsonb_agg(jsonb_build_object('item_id', l.item_id, 'amount', l.amount))
                                         from public.payroll_entry_lines l where l.entry_id = pe.id), '[]'::jsonb)))
      from public.payroll_entries pe
      where pe.client_id = p_client and pe.pay_month >= make_date(p_year, 1, 1) and pe.pay_month <= make_date(p_year, 12, 1)), '[]'::jsonb),
    'prior_employers', coalesce((
      select jsonb_agg(jsonb_build_object(
        'employee_id', p.employee_id, 'year', p.year, 'tin', p.tin, 'name', p.name, 'address', p.address, 'zip_code', p.zip_code,
        'taxable_compensation', p.taxable_compensation, 'non_taxable_compensation', p.non_taxable_compensation, 'tax_withheld', p.tax_withheld))
      from public.employee_prior_employers p where p.client_id = p_client and p.year = p_year), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;
