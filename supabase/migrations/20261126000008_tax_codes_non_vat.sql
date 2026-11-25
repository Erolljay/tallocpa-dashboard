-- Non-VAT tax codes (Owner, 25 November 2026): every line carries a tax code, also for
-- clients that are not VAT-registered (percentage tax on the 2551Q, or the 8% option).
--   NVS  Non-VAT Sales      sales lines; the gross sales of the 2551Q and of the income tax return
--   NVP  Non-VAT Purchases  purchase lines; no input VAT is separated (any VAT stays in the cost);
--                           deductible; on no summary list (non-VAT clients file no SLP)
-- The suggestion for a non-VAT client's document now proposes them instead of no code.

alter table public.tax_codes drop constraint tax_codes_kind_check;
alter table public.tax_codes add constraint tax_codes_kind_check check (kind in (
  'output_vat', 'vat_exempt_sales', 'zero_rated_sales', 'non_vat_sales',
  'input_vat_capital', 'input_vat_goods', 'input_vat_services', 'vat_exempt_purchases', 'zero_rated_purchases',
  'non_vat_purchases', 'not_reported_purchases',
  'withholding', 'govt_vat_withheld'
));

-- applies_to is generated from kind: Non-VAT Sales go on sales invoices.
alter table public.tax_codes drop column applies_to;
alter table public.tax_codes add column applies_to text generated always as (
  case when kind in ('output_vat', 'vat_exempt_sales', 'zero_rated_sales', 'non_vat_sales', 'govt_vat_withheld') then 'sales'
       when kind = 'withholding' then 'both'
       else 'purchases' end
) stored;

insert into public.tax_codes (code, name, kind, rate, atc, payee_type, sort_order) values
  ('NVS', 'Non-VAT Sales', 'non_vat_sales', 0, null, null, 35),
  ('NVP', 'Non-VAT Purchases', 'non_vat_purchases', 0, null, null, 82)
on conflict (code) do nothing;

create or replace function private.document_tax_suggestion(
  p_client uuid, p_kind text, p_party uuid, p_vat_reg boolean, p_slp text,
  p_vatable numeric, p_exempt numeric, p_zero numeric, p_vat numeric, p_total numeric, p_discount numeric,
  p_atc text, p_withholding numeric, p_vat_withheld numeric
) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  v_total numeric := case when coalesce(p_total, 0) > 0 then p_total else coalesce(p_vatable, 0) + coalesce(p_exempt, 0) + coalesce(p_zero, 0) + coalesce(p_vat, 0) end;
  v_vat numeric := case when p_vat_reg then coalesce(p_vat, 0) else 0 end;
  v_disc numeric := case when p_kind = 'sale' then coalesce(p_discount, 0) else 0 end;
  v_net numeric;
  v_parts numeric := coalesce(p_vatable, 0) + coalesce(p_exempt, 0) + coalesce(p_zero, 0);
  c12 text;
  cex text := case p_kind when 'sale' then 'VES' else 'VEP' end;
  czr text := case p_kind when 'sale' then 'ZRS' else 'ZRP' end;
  pd public.client_party_tax_codes;
  pdc public.tax_codes;
  raw jsonb := '[]'::jsonb;
  lines jsonb := '[]'::jsonb;
  x jsonb;
  lc public.tax_codes;
  v_atc text := nullif(upper(btrim(p_atc)), '');
  w uuid; w_src text;
  vw uuid; vw_src text;
begin
  v_net := v_total - v_vat + v_disc;
  c12 := case when p_kind = 'sale' then 'OVAT12'
              else case p_slp when 'capital_goods' then 'IVAT12-CG' when 'services' then 'IVAT12-S' else 'IVAT12-OG' end end;
  if p_party is not null then
    select * into pd from public.client_party_tax_codes where client_id = p_client and party_id = p_party and kind = p_kind;
    select * into pdc from public.tax_codes where id = pd.tax_code_id and active;
  end if;

  if not p_vat_reg then
    -- Non-VAT client: one line coded Non-VAT Sales / Non-VAT Purchases (no VAT is separated).
    raw := jsonb_build_array(jsonb_build_object('portion', 'total', 'amount', v_net, 'tax_amount', 0, 'code', case p_kind when 'sale' then 'NVS' else 'NVP' end));
  elsif v_parts = v_net and v_parts > 0 and not (coalesce(p_vatable, 0) = 0 and v_vat <> 0) then
    if coalesce(p_vatable, 0) <> 0 then raw := raw || jsonb_build_object('portion', 'vatable', 'amount', p_vatable, 'tax_amount', v_vat, 'code', c12); end if;
    if coalesce(p_exempt, 0) <> 0 then raw := raw || jsonb_build_object('portion', 'vat_exempt', 'amount', p_exempt, 'tax_amount', 0, 'code', cex); end if;
    if coalesce(p_zero, 0) <> 0 then raw := raw || jsonb_build_object('portion', 'zero_rated', 'amount', p_zero, 'tax_amount', 0, 'code', czr); end if;
  else
    -- The parts do not add up to the total: one line at what is posted.
    raw := jsonb_build_array(jsonb_build_object('portion', 'total', 'amount', v_net, 'tax_amount', v_vat,
      'code', case when v_vat <> 0 then c12 when coalesce(p_zero, 0) > 0 and coalesce(p_exempt, 0) = 0 then czr else cex end));
  end if;

  for x in select * from jsonb_array_elements(raw) loop
    select * into lc from public.tax_codes where code = x ->> 'code' and active;
    if lc.id is not null and pdc.id is not null
       and ((pdc.rate > 0 and lc.rate > 0) or (pdc.rate = 0 and lc.rate = 0 and (pdc.kind = lc.kind or x ->> 'portion' = 'total'))) then
      lines := lines || (x - 'code' || jsonb_build_object('tax_code_id', pdc.id, 'source', 'party'));
    else
      lines := lines || (x - 'code' || jsonb_build_object('tax_code_id', lc.id, 'source', case when lc.id is null then null else 'ocr' end));
    end if;
    lc := null;
  end loop;

  if coalesce(p_withholding, 0) > 0 then
    select id into w from public.tax_codes where id = pd.withholding_code_id and active and kind = 'withholding';
    if w is not null then w_src := 'party';
    else
      select id into w from public.tax_codes where code = v_atc and active and kind = 'withholding';
      if w is not null then w_src := 'ocr'; end if;
    end if;
  end if;
  if p_kind = 'sale' and coalesce(p_vat_withheld, 0) > 0 then
    select id into vw from public.tax_codes where id = pd.vat_withholding_code_id and active and kind = 'govt_vat_withheld';
    if vw is not null then vw_src := 'party';
    else
      select id into vw from public.tax_codes
        where kind = 'govt_vat_withheld' and active
          and code = case when v_atc ~ '^W[CI]158$' then 'WV010' when v_atc ~ '^W[CI]160$' then 'WV020' when v_atc ~ '^WV0[12]0$' then v_atc end;
      if vw is not null then vw_src := 'ocr'; end if;
    end if;
  end if;
  return jsonb_build_object('lines', lines, 'withholding_code_id', w, 'withholding_source', w_src,
                            'vat_withholding_code_id', vw, 'vat_withholding_source', vw_src);
end;
$$;
