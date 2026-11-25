-- A customer's 2307 supports a Sales Invoice keyed with the customer typed in.
--
-- Found by the December rehearsal (supabase/tests/december-rehearsal.test.ts): a Sales
-- Invoice entered in the Books for "Another customer (type the name)" keeps the TIN that
-- was typed but no party (book_invoices.party_id is null). When the customer's 2307 is
-- approved in the Inbox and its TIN is in the parties directory,
-- private.mark_cwt_supported (migration 20261126000004) matched only invoices of that
-- party, so the invoice's CWT was never marked supported (cwt_marked 0): the SAWT kept
-- showing the 2307 as missing and the client would be asked about it at year end.
--
-- Now an invoice with no party is matched by its TIN (the first 11 characters, as the
-- existing fallback does) whatever the 2307's TIN resolves to. Invoices with a party are
-- matched by party as before. Nothing else changes.

/** The Sales Invoices a customer's 2307 supports: marks them, returns how many. */
create or replace function private.mark_cwt_supported(p_document uuid) returns integer
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  f jsonb;
  v_party uuid;
  v_tin text;
  v_atc text;
  v_amount numeric;
  v_date date;
  q date;
  picked uuid[];
  r record;
  run numeric := 0;
begin
  select * into d from public.documents where id = p_document;
  select approved_fields into f from public.extractions where document_id = p_document;
  update public.book_invoices set cwt_document_id = null, cwt_supported_at = null where cwt_document_id = p_document;
  if d.id is null or d.doc_type <> 'bir_2307_received' or d.status <> 'posted' or f is null then return 0; end if;
  v_party := private.document_party(f ->> 'party_tin');
  v_tin := case when f ->> 'party_tin' ~ '^\d{3}-\d{3}-\d{3}' then substr(f ->> 'party_tin', 1, 11) end;
  if v_party is null and v_tin is null then return 0; end if;
  v_atc := nullif(upper(btrim(f ->> 'atc')), '');
  v_amount := private.register_amount(f ->> 'withholding');
  begin
    v_date := coalesce(nullif(f ->> 'date', '')::date, d.document_month);
  exception when others then
    v_date := d.document_month;
  end;
  if v_amount <= 0 then return 0; end if;

  foreach q in array array[date_trunc('quarter', v_date)::date, (date_trunc('quarter', v_date) - interval '3 months')::date] loop
    -- The invoice whose CWT is exactly the 2307's amount.
    select array[i.id] into picked
    from public.book_invoices i left join public.tax_codes w on w.id = i.withholding_code_id
    where i.client_id = d.client_id and i.kind = 'sales' and i.voided_at is null and i.withholding > 0 and i.cwt_document_id is null
      and (i.party_id = v_party or (i.party_id is null and v_tin is not null and substr(i.party_tin, 1, 11) = v_tin))
      and date_trunc('quarter', i.issue_date)::date = q
      and (v_atc is null or w.atc is null or w.atc = v_atc)
      and i.withholding = v_amount
    order by i.issue_date, i.created_at limit 1;
    if picked is null then
      picked := '{}';
      for r in
        select i.id, i.withholding
        from public.book_invoices i left join public.tax_codes w on w.id = i.withholding_code_id
        where i.client_id = d.client_id and i.kind = 'sales' and i.voided_at is null and i.withholding > 0 and i.cwt_document_id is null
          and (i.party_id = v_party or (i.party_id is null and v_tin is not null and substr(i.party_tin, 1, 11) = v_tin))
          and date_trunc('quarter', i.issue_date)::date = q
          and (v_atc is null or w.atc is null or w.atc = v_atc)
        order by i.issue_date, i.created_at
      loop
        exit when run + r.withholding > v_amount;
        picked := picked || r.id;
        run := run + r.withholding;
      end loop;
    end if;
    if cardinality(picked) > 0 then
      update public.book_invoices set cwt_document_id = p_document, cwt_supported_at = now() where id = any (picked);
      return cardinality(picked);
    end if;
    picked := null;
    run := 0;
  end loop;
  return 0;
end;
$$;

revoke execute on function private.mark_cwt_supported(uuid) from public, anon, authenticated;
