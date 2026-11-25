-- Rework phase 1 (docs/REWORK.md, decision 4): approving an Inbox document posts it
-- to the Books, and every document already approved moves across.
--
-- post_document_to_books(document, account, cash account, tax codes), called after
-- approve_document:
--   sales invoice     a Sales Invoice from the approved figures (VAT split into tax codes —
--                     the codes confirmed on the row, else the party default, else the
--                     figures — SC/PWD discount, CWT by its ATC, VAT withheld by a government
--                     customer), to the account title chosen on the Inbox row; when the
--                     row says cash, also its Receipt, fully settling it, into the cash or
--                     bank account chosen (else the document's, else the client's first
--                     bank account, else its first cash account), with any bank or card
--                     charges as the receipt's deduction;
--   purchase receipt  a Purchase Invoice (VAT by the SLP category, EWT by its ATC) and,
--                     when cash, its Payment;
--   BIR 2307 received no entry: it marks the CWT of the customer's matching Sales
--                     Invoices as supported (same party, same quarter, else the quarter
--                     before; the invoice with exactly that CWT first, else oldest first
--                     up to the 2307's amount);
--   anything else     nothing (payroll documents still do not post).
-- Calling it again for a document already in the Books returns what is there.
-- unpost_document_from_books voids them (the entries are reversed) so the approved
-- figures can be corrected and the document posted again.
--
-- The register (register_lines) is kept as it is: the return worksheets still read it.
--
-- Existing data (private.migrate_documents_to_books, run below and safe to run again):
-- every approved sales invoice and purchase receipt of a client with books, dated on or
-- after the books start, becomes a Book invoice (and a receipt or payment when it was
-- cash). A document whose entry the old flow already posted is linked to that entry
-- (`legacy`), so nothing is posted twice and every account keeps its total; one approved
-- but never posted (no entry, or only a suggestion) is posted now. One that cannot be
-- posted (a locked month, a chart without a control account) is left as it was and
-- reported. Approved 2307s received mark the invoices they support.

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
      and (i.party_id = v_party or (v_party is null and substr(i.party_tin, 1, 11) = v_tin))
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
          and (i.party_id = v_party or (v_party is null and substr(i.party_tin, 1, 11) = v_tin))
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

-- ---------------------------------------------------------------------------
-- Tax codes per document (Owner, 26 November 2026): every approved document carries
-- its tax code(s) and withholding code. The suggestion is this client's default for
-- the party, else what the figures say (OCR): the VAT split (VATable / exempt /
-- zero-rated, one invoice line each), the SLP category for purchases, the ATC for the
-- withholding code. Confirming a document's codes saves them as the party's default
-- for the client, as the account title is saved today.
-- ---------------------------------------------------------------------------
create table public.client_party_tax_codes (
  client_id uuid not null references public.clients (id) on delete cascade,
  party_id uuid not null references public.parties (id) on delete cascade,
  kind text not null check (kind in ('sale', 'purchase')),
  tax_code_id uuid references public.tax_codes (id),
  withholding_code_id uuid references public.tax_codes (id),
  vat_withholding_code_id uuid references public.tax_codes (id),
  updated_by uuid references auth.users (id) default auth.uid(),
  updated_at timestamptz not null default now(),
  primary key (client_id, party_id, kind),
  check (kind = 'sale' or vat_withholding_code_id is null)
);
create trigger audit after insert or update or delete on public.client_party_tax_codes for each row execute function private.audit();
alter table public.client_party_tax_codes enable row level security;
create policy party_tax_codes_read on public.client_party_tax_codes for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));

/**
 * The suggested tax codes of a sale or purchase document:
 *   {lines: [{portion: vatable|vat_exempt|zero_rated|total, amount, tax_amount, tax_code_id, source: party|ocr|null}],
 *    withholding_code_id, withholding_source, vat_withholding_code_id, vat_withholding_source}
 * Amounts in pesos, net of VAT (what the account title is posted with, SC/PWD discount
 * added back, as book_document). A client that is not VAT-registered gets one line
 * with no VAT code (VAT, if any, stays in the amount).
 */
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
    raw := jsonb_build_array(jsonb_build_object('portion', 'total', 'amount', v_net, 'tax_amount', 0, 'code', null));
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

/**
 * The Book invoice of an approved document, from its register line: the suggested codes,
 * with the codes staff confirmed on the Inbox row in their place:
 *   p_codes {lines: [{portion, tax_code_id}], withholding_code_id, vat_withholding_code_id}
 * (a key present with null clears the code).
 */
create or replace function private.document_invoice_payload(d public.documents, r public.register_lines, p_account uuid, p_codes jsonb default null) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  sug jsonb;
  lines jsonb := '[]'::jsonb;
  x jsonb;
  y jsonb;
  tc public.tax_codes;
  n integer := 0;
  w jsonb;
  vw jsonb;
begin
  sug := private.document_tax_suggestion(d.client_id, r.kind, r.party_id, r.vat_registered, r.slp_category,
    r.vatable, r.vat_exempt, r.zero_rated, r.vat, r.total, r.discount, r.atc, r.withholding, r.vat_withheld);
  p_codes := coalesce(p_codes, '{}'::jsonb);
  if jsonb_typeof(p_codes) <> 'object' then raise exception 'The tax codes must be an object' using errcode = '22023'; end if;
  for x in select * from jsonb_array_elements(sug -> 'lines') loop
    n := n + 1;
    select c into y from jsonb_array_elements(coalesce(p_codes -> 'lines', '[]'::jsonb)) c where c ->> 'portion' = x ->> 'portion' limit 1;
    if y is not null and y ? 'tax_code_id' then
      x := jsonb_set(x, '{tax_code_id}', coalesce(y -> 'tax_code_id', 'null'::jsonb));
      select * into tc from public.tax_codes where id = nullif(x ->> 'tax_code_id', '')::uuid;
      if tc.id is not null and tc.rate > 0 and (x ->> 'tax_amount')::numeric = 0 then
        raise exception 'Line %: the document shows no VAT on this amount; choose an exempt or zero-rated code', n using errcode = '22023';
      end if;
      tc := null;
    end if;
    y := null;
    lines := lines || jsonb_build_object('account_id', p_account, 'amount', x -> 'amount', 'tax_code_id', x -> 'tax_code_id', 'tax_amount', x -> 'tax_amount');
  end loop;
  w := case when p_codes ? 'withholding_code_id' then p_codes -> 'withholding_code_id' else sug -> 'withholding_code_id' end;
  vw := case when p_codes ? 'vat_withholding_code_id' then p_codes -> 'vat_withholding_code_id' else sug -> 'vat_withholding_code_id' end;
  if r.kind = 'purchase' and vw is not null and vw <> 'null'::jsonb then
    raise exception 'WV010 and WV020 go only on a Sales Invoice' using errcode = '22023';
  end if;

  return jsonb_build_object(
    'kind', case r.kind when 'sale' then 'sales' else 'purchase' end,
    'party_id', r.party_id,
    'party_name', coalesce(r.party_name, (select display_name from public.parties where id = r.party_id), case r.kind when 'sale' then 'Cash sales' else 'Cash purchases' end),
    'party_tin', r.party_tin,
    'reference', r.reference,
    'issue_date', r.line_date,
    'withholding_code_id', w,
    'withholding', r.withholding,
    'vat_withholding_code_id', case when r.kind = 'sale' then vw end,
    'vat_withheld', case when r.kind = 'sale' then r.vat_withheld else 0 end,
    'discount', case when r.kind = 'sale' then r.discount else 0 end,
    'lines', lines);
end;
$$;

/**
 * For the Inbox: the suggested tax codes of each sales invoice and purchase receipt of a
 * client still waiting (received or under review), and where each came from ('party' =
 * this client's default for the party, 'ocr' = the figures read). Mirrors
 * pending_document_accounts. lines: [{portion, amount, tax_amount, tax_code_id, source}].
 */
create or replace function public.pending_document_tax_codes(p_client uuid)
returns table (document_id uuid, lines jsonb, withholding_code_id uuid, withholding_source text, vat_withholding_code_id uuid, vat_withholding_source text)
language plpgsql stable security definer set search_path = '' as $$
declare
  d public.documents;
  f jsonb;
  v_kind text;
  v_date date;
  v_slp text;
  v_acc uuid;
  sug jsonb;
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then
    raise exception 'You cannot see this client' using errcode = '42501';
  end if;
  for d in select * from public.documents x
           where x.client_id = p_client and x.status in ('received', 'under_review') and x.doc_type in ('sales_invoice', 'purchase_receipt')
           order by x.created_at loop
    select coalesce(e.approved_fields, e.fields) into f from public.extractions e where e.document_id = d.id;
    f := coalesce(f, '{}'::jsonb);
    v_kind := case d.doc_type when 'sales_invoice' then 'sale' else 'purchase' end;
    begin
      v_date := coalesce(nullif(f ->> 'date', '')::date, d.document_month);
    exception when others then
      v_date := d.document_month;
    end;
    v_slp := nullif(f ->> 'slp_category', '');
    if v_kind = 'purchase' and v_slp is null then
      v_acc := coalesce(d.ledger_account_id, private.document_account(d));
      if (select fs_line from public.ledger_accounts where id = v_acc) = 'ppe' then v_slp := 'capital_goods'; end if;
    end if;
    sug := private.document_tax_suggestion(
      d.client_id, v_kind, private.document_party(coalesce(f ->> 'party_tin', '')),
      exists (select 1 from public.obligations o where o.client_id = d.client_id and o.form = '2550Q'
                and o.start_date <= v_date and (o.end_date is null or o.end_date >= v_date)),
      v_slp,
      private.register_amount(f ->> 'vatable'), private.register_amount(f ->> 'vat_exempt'), private.register_amount(f ->> 'zero_rated'),
      private.register_amount(f ->> 'vat'), private.register_amount(f ->> 'total'), private.register_amount(f ->> 'discount'),
      f ->> 'atc', private.register_amount(f ->> 'withholding'), private.register_amount(f ->> 'vat_withheld'));
    document_id := d.id;
    lines := sug -> 'lines';
    withholding_code_id := nullif(sug ->> 'withholding_code_id', '')::uuid;
    withholding_source := sug ->> 'withholding_source';
    vat_withholding_code_id := nullif(sug ->> 'vat_withholding_code_id', '')::uuid;
    vat_withholding_source := sug ->> 'vat_withholding_source';
    return next;
  end loop;
end;
$$;

/**
 * Posts (or, with p_link_entry, links) an approved sales invoice or purchase receipt as a
 * Book invoice, and its receipt or payment when it was cash. No access checks.
 * Returns {invoice_id, settlement_id}.
 */
create or replace function private.document_to_books(p_document uuid, p_account uuid, p_cash_account uuid, p_link_entry uuid, p_codes jsonb default null, p_save_defaults boolean default false)
returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  r public.register_lines;
  inv public.book_invoices;
  v_id uuid;
  cash uuid;
  s uuid;
begin
  select * into d from public.documents where id = p_document;
  select * into r from public.register_lines where document_id = p_document;
  if r.id is null then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  if r.line_date is null then raise exception 'The document has no date' using errcode = '22023'; end if;
  if r.other_deduction <> 0 and r.terms = 'charge' then
    raise exception 'An other deduction is booked only on a cash sale or purchase; book this one by journal entry' using errcode = '22023';
  end if;
  if r.other_deduction <> 0 and r.other_account_id is null then raise exception 'Choose the account for the other deduction' using errcode = '22023'; end if;
  if r.kind = 'purchase' and r.vat_withheld <> 0 then
    raise exception 'VAT withheld on a purchase cannot be booked yet; book it by journal entry' using errcode = '22023';
  end if;

  v_id := private.book_write_invoice(d.client_id, null, private.document_invoice_payload(d, r, p_account, p_codes), d.id, p_link_entry);
  select * into inv from public.book_invoices where id = v_id;

  if r.terms = 'cash' and inv.amount_due > 0 and (p_link_entry is null or inv.open_item_id is null) then
    if p_link_entry is not null then
      -- Legacy: the cash or bank account the old entry used.
      select l.account_id into cash from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id
        where l.entry_id = p_link_entry and a.control in ('cash', 'bank') order by l.line_no limit 1;
    end if;
    cash := coalesce(
      cash,
      (select id from public.ledger_accounts where id = p_cash_account and client_id = d.client_id and active and control in ('cash', 'bank')),
      r.payment_account_id,
      private.first_control(d.client_id, 'bank'),
      private.first_control(d.client_id, 'cash'));
    s := private.book_write_settlement(d.client_id, null, jsonb_build_object(
      'kind', case inv.kind when 'sales' then 'receipt' else 'payment' end,
      'settle_date', inv.issue_date,
      'cash_account_id', cash,
      'party_id', inv.party_id,
      'party_name', inv.party_name,
      'reference', inv.reference,
      'deduction', r.other_deduction,
      'deduction_account_id', r.other_account_id,
      'allocations', jsonb_build_array(jsonb_build_object('invoice_id', inv.id, 'amount', inv.amount_due))), d.id, p_link_entry);
  end if;

  if r.party_id is not null then
    insert into public.client_party_accounts (client_id, party_id, kind, account_id)
    values (d.client_id, r.party_id, case r.kind when 'sale' then 'sale' else 'purchase' end, p_account)
    on conflict (client_id, party_id, kind) do update set account_id = excluded.account_id, updated_at = now();
  end if;
  -- The codes staff confirmed become this client's default for the party.
  if p_save_defaults and r.party_id is not null then
    insert into public.client_party_tax_codes as t (client_id, party_id, kind, tax_code_id, withholding_code_id, vat_withholding_code_id)
    values (d.client_id, r.party_id, case r.kind when 'sale' then 'sale' else 'purchase' end,
            (select tax_code_id from public.book_invoice_lines where invoice_id = inv.id order by abs(amount) desc, line_no limit 1),
            inv.withholding_code_id, inv.vat_withholding_code_id)
    on conflict (client_id, party_id, kind) do update set
      tax_code_id = coalesce(excluded.tax_code_id, t.tax_code_id),
      -- A document without withholding keeps the party's withholding default.
      withholding_code_id = case when inv.withholding > 0 then excluded.withholding_code_id else t.withholding_code_id end,
      vat_withholding_code_id = case when inv.vat_withheld > 0 then excluded.vat_withholding_code_id else t.vat_withholding_code_id end,
      updated_by = auth.uid(), updated_at = now();
  end if;
  return jsonb_build_object('invoice_id', inv.id, 'settlement_id', s);
end;
$$;

/**
 * Inbox approval → the Books. Call after approve_document. p_account: the account title
 * chosen on the Inbox row (else the document's, else its default); p_cash_account: the
 * cash or bank account a cash sale or purchase went to or came from; p_codes: the tax
 * codes confirmed on the row, {lines: [{portion, tax_code_id}], withholding_code_id,
 * vat_withholding_code_id} (portions as pending_document_tax_codes lists them; anything
 * left out takes the suggestion). The codes used are saved as the party's default.
 * Returns {invoice_id, settlement_id} for a sale or purchase, {cwt_marked} for a 2307
 * received, or null when nothing is posted (no books, another type, dated before the
 * books start).
 */
create or replace function public.post_document_to_books(p_document uuid, p_account uuid default null, p_cash_account uuid default null, p_codes jsonb default null)
returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  b public.client_books;
  inv public.book_invoices;
  acc public.ledger_accounts;
  legacy uuid;
  v_date date;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post its documents' using errcode = '42501';
  end if;
  if d.status <> 'posted' then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  select * into b from public.client_books where client_id = d.client_id;
  if b.client_id is null then return null; end if;

  if d.doc_type = 'bir_2307_received' then
    return jsonb_build_object('cwt_marked', private.mark_cwt_supported(d.id));
  end if;
  if d.doc_type not in ('sales_invoice', 'purchase_receipt') then return null; end if;

  select * into inv from public.book_invoices where document_id = d.id and voided_at is null;
  if inv.id is not null then
    return jsonb_build_object('invoice_id', inv.id,
      'settlement_id', (select id from public.book_settlements where document_id = d.id and voided_at is null));
  end if;

  select * into acc from public.ledger_accounts
    where id = coalesce(p_account, d.ledger_account_id, private.document_account(d)) and client_id = d.client_id and active;
  if acc.id is null then raise exception 'Choose the account title' using errcode = '22023'; end if;
  -- Keeps the register line's account title in step (register_sync trigger).
  if d.ledger_account_id is distinct from acc.id then
    update public.documents set ledger_account_id = acc.id where id = d.id;
  end if;
  select line_date into v_date from public.register_lines where document_id = d.id;
  if v_date is not null and v_date < b.books_start then return null; end if;

  delete from public.journal_entries where document_id = d.id and status = 'suggested';
  -- Booked the old way (book_document, confirmed) and not yet moved across: link it.
  select id into legacy from public.journal_entries
    where document_id = d.id and status = 'posted' and source = 'document'
    order by posted_at desc limit 1;
  return private.document_to_books(d.id, acc.id, p_cash_account, legacy, p_codes, legacy is null);
end;
$$;

/** Voids a document's invoice and receipt or payment (entries reversed) so its figures can be corrected. */
create or replace function public.unpost_document_from_books(p_document uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  inv public.book_invoices;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can post its documents' using errcode = '42501';
  end if;
  if d.doc_type = 'bir_2307_received' then
    update public.book_invoices set cwt_document_id = null, cwt_supported_at = null where cwt_document_id = d.id;
    return;
  end if;
  select * into inv from public.book_invoices where document_id = d.id and voided_at is null;
  if inv.id is null then raise exception 'This document is not in the Books' using errcode = '22023'; end if;
  perform private.book_void_invoice(inv.id, coalesce(nullif(btrim(p_reason), ''), 'Document figures corrected'));
end;
$$;

/**
 * Moves approved documents across to the Books (all clients, or one). Safe to run again:
 * a document that already has an invoice is skipped. Returns each document's outcome:
 * linked (old entry kept), posted, cwt_supported, or skipped: <why>.
 */
create or replace function private.migrate_documents_to_books(p_client uuid default null)
returns table (document_id uuid, outcome text)
language plpgsql security definer set search_path = '' as $$
declare
  d record;
  dd public.documents;
  legacy uuid;
  acc uuid;
  n integer;
begin
  for d in
    select doc.*, b.books_start, r.line_date, r.account_id as r_account
    from public.documents doc
    join public.client_books b on b.client_id = doc.client_id
    left join public.register_lines r on r.document_id = doc.id
    where doc.status = 'posted' and doc.doc_type in ('sales_invoice', 'purchase_receipt')
      and (p_client is null or doc.client_id = p_client)
      and not exists (select 1 from public.book_invoices i where i.document_id = doc.id and i.voided_at is null)
    order by doc.client_id, r.line_date nulls last, doc.created_at
  loop
    document_id := d.id;
    if d.line_date is null then outcome := 'skipped: no approved date'; return next; continue; end if;
    if d.line_date < d.books_start then outcome := 'skipped: before the books start'; return next; continue; end if;
    select id into legacy from public.journal_entries j
      where j.document_id = d.id and j.status = 'posted' and j.source = 'document' order by j.posted_at desc limit 1;
    begin
      if legacy is not null then
        -- The account the old entry used: its account title is the register line's.
        acc := coalesce(d.ledger_account_id, d.r_account);
        perform private.document_to_books(d.id, acc, null, legacy);
        outcome := 'linked';
      else
        select * into dd from public.documents where id = d.id;
        acc := coalesce(d.ledger_account_id, d.r_account, private.document_account(dd));
        if acc is null then raise exception 'no account title'; end if;
        delete from public.journal_entries j where j.document_id = d.id and j.status = 'suggested';
        perform private.document_to_books(d.id, acc, null, null);
        outcome := 'posted';
      end if;
    exception when others then
      outcome := 'skipped: ' || sqlerrm;
    end;
    return next;
  end loop;

  for d in
    select doc.id from public.documents doc
    join public.client_books b on b.client_id = doc.client_id
    where doc.status = 'posted' and doc.doc_type = 'bir_2307_received' and (p_client is null or doc.client_id = p_client)
      and not exists (select 1 from public.book_invoices i where i.cwt_document_id = doc.id)
    order by doc.created_at
  loop
    n := private.mark_cwt_supported(d.id);
    if n > 0 then document_id := d.id; outcome := 'cwt_supported'; return next; end if;
  end loop;
end;
$$;

revoke execute on function public.post_document_to_books(uuid, uuid, uuid, jsonb) from public, anon;
revoke execute on function public.pending_document_tax_codes(uuid) from public, anon;
grant execute on function public.pending_document_tax_codes(uuid) to authenticated;
revoke execute on function public.unpost_document_from_books(uuid, text) from public, anon;
grant execute on function public.post_document_to_books(uuid, uuid, uuid, jsonb) to authenticated;
grant execute on function public.unpost_document_from_books(uuid, text) to authenticated;
revoke execute on function private.mark_cwt_supported(uuid) from public, anon, authenticated;
revoke execute on function private.document_invoice_payload(public.documents, public.register_lines, uuid, jsonb) from public, anon, authenticated;
revoke execute on function private.document_tax_suggestion(uuid, text, uuid, boolean, text, numeric, numeric, numeric, numeric, numeric, numeric, text, numeric, numeric) from public, anon, authenticated;
revoke execute on function private.document_to_books(uuid, uuid, uuid, uuid, jsonb, boolean) from public, anon, authenticated;
revoke execute on function private.migrate_documents_to_books(uuid) from public, anon, authenticated;

-- Move the existing documents across.
select count(*) from private.migrate_documents_to_books();
