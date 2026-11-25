-- One register, slice 2 (docs/UX-REVIEW.md, R11): the return worksheets read the
-- register (src/lib/returns/load.ts) instead of the approved documents, so a line
-- must hold everything a worksheet read from its document:
--   - the party address, which the SLSP uses when the TIN is not in the directory;
--   - the total exactly as approved. The SAWT and income tax worksheets treat a
--     missing total (0) differently from a total that was read, so the line no
--     longer fills it in; `net` still fills a missing total from the amounts.
-- Every line is rewritten from its document afterwards.

alter table public.register_lines add column party_address text;
comment on column public.register_lines.total is 'The total as approved (0 when none was read); net fills a missing total from the amounts.';

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

revoke execute on function private.sync_register_line(uuid) from public, anon, authenticated;

-- Rewrite every line with the address and the total as approved.
select private.sync_register_line(document_id) from public.register_lines;
