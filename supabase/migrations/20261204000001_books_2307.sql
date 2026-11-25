-- BIR Form 2307 (Certificate of Creditable Tax Withheld at Source, January 2018 ENCS)
-- that a client, as withholding agent, issues to its suppliers (docs/REWORK.md decisions
-- 7 and 19): the EWT on its Purchase Invoices (WC / WI withholding code), per supplier,
-- per quarter, month or transaction. Printed by src/components/bir/form-2307.tsx from
-- src/lib/books/form-2307.ts.
--
--   books_2307_data(client, from, to)   everything the certificates of a period need: the
--                                       payor (the client: TIN, registered address, ZIP and
--                                       the authorized representative of the 2316, from
--                                       payroll_settings), each posted, not void Purchase
--                                       Invoice with EWT (income payment = subtotal, as on
--                                       the QAP) with its payee's registered details from
--                                       the parties directory, and which months are locked.
--
-- Who may call it: the Owner and staff assigned to the client (any month: the page warns
-- while a month is open), and the client's own portal users, who get only the invoices of
-- months the reviewer has locked (decision 9). Client users still read no Books table.

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
                                         'taxpayer_type', c.taxpayer_type)
               from public.clients c where c.id = p_client),
    'settings', (select jsonb_build_object('zip_code', s.employer_zip_code, 'signatory_name', s.signatory_name, 'signatory_title', s.signatory_title)
                 from public.payroll_settings s where s.client_id = p_client),
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

revoke execute on function public.books_2307_data(uuid, date, date) from public, anon;
grant execute on function public.books_2307_data(uuid, date, date) to authenticated;
