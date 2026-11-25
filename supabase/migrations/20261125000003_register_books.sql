-- One register, slice 3 (docs/UX-REVIEW.md, R10 and R11): the books post from the
-- register line, with the Owner's decisions of 25 November 2026:
--   sale, cash     Dr Cash (net receipt) · Dr CWT – awaiting 2307 · Dr Creditable VAT withheld
--                  · Dr Sales discount – SC/PWD · Cr the account title · Cr Output VAT
--   sale, charge   Dr Accounts receivable (total) · Dr Sales discount · Cr the account title · Cr Output VAT
--   purchase       Dr the account title · Dr Input VAT · Cr Cash (net paid) or Accounts payable
--                  (total less EWT) · Cr EWT payable (booked at payment, so it ties to the 0619-E and 1601-EQ)
--   2307 received  moves the payor's CWT from "awaiting 2307" to "Creditable withholding tax" without
--                  touching cash; any part not awaited settles the receivable, else cash (as built)
--   2307 issued    no entry when the quarter's purchases from the payee already booked that EWT;
--                  only the part not yet booked, as built
-- A document without withholding, VAT withheld or a discount books exactly as before.
-- Entries already in the books are not changed.

-- New control accounts.
alter table public.ledger_accounts drop constraint ledger_accounts_control_check;
alter table public.ledger_accounts add constraint ledger_accounts_control_check check (control in (
  'cash', 'bank', 'ar', 'ap', 'input_vat', 'output_vat', 'cwt', 'ewt_payable', 'percentage_tax_payable',
  'income_tax_payable', 'inventory', 'capital', 'drawings', 'retained_earnings',
  'cwt_awaiting', 'vat_withheld', 'sales_discount'
));
drop index public.ledger_accounts_one_control;
create unique index ledger_accounts_one_control on public.ledger_accounts (client_id, control)
  where control in ('ar', 'ap', 'input_vat', 'output_vat', 'cwt', 'ewt_payable', 'percentage_tax_payable', 'income_tax_payable',
                    'inventory', 'retained_earnings', 'cwt_awaiting', 'vat_withheld', 'sales_discount');

-- Add them to every chart that already exists (new charts get them from the templates in
-- src/lib/ledger/coa/index.ts). A code a client already uses gets a suffix.
insert into public.ledger_accounts (client_id, template_key, code, name, type, normal_side, fs_line, bir_line, control, sort_order)
select b.client_id, a.key,
       case when exists (select 1 from public.ledger_accounts x where x.client_id = b.client_id and x.code = a.code) then a.code || '-R' else a.code end,
       a.name, a.type, a.normal_side, a.fs_line, a.bir_line, a.control, a.sort_order
from public.client_books b
cross join (values
  ('cwt_awaiting', '1305', 'Creditable Withholding Tax - Awaiting 2307', 'asset', 'debit', 'prepaid_taxes', null, 'cwt_awaiting', 95),
  ('vat_withheld', '1315', 'Creditable VAT Withheld', 'asset', 'debit', 'prepaid_taxes', null, 'vat_withheld', 105),
  ('sales_discount_scpwd', '6240', 'Sales Discount - SC/PWD', 'expense', 'debit', 'operating_expenses', 'ded_others', 'sales_discount', 2905)
) as a(key, code, name, type, normal_side, fs_line, bir_line, control, sort_order)
where not exists (select 1 from public.ledger_accounts x where x.client_id = b.client_id and (x.template_key = a.key or x.control = a.control));

/**
 * The balance (debit less credit) of a client's control account for one party,
 * counting suggested entries too, so two 2307s waiting to be confirmed cannot
 * both draw on the same CWT. A reversed entry and its reversal cancel out.
 */
create or replace function private.party_control_balance(p_client uuid, p_control text, p_party uuid) returns numeric
language sql stable security definer set search_path = '' as $$
  select coalesce(sum(l.debit - l.credit), 0)
  from public.journal_lines l
  join public.ledger_accounts a on a.id = l.account_id and a.control = p_control
  where l.client_id = p_client and l.party_id = p_party
$$;

/**
 * Books an approved document of a bookkeeping client as a suggested entry
 * (replacing an earlier suggestion), from its register line, booked to p_account
 * or the default title. Returns the entry, or null when nothing is booked: the
 * client keeps no books, the type is not booked, the document is dated before
 * the books start, or a 2307 issued whose EWT the purchases already booked.
 */
create or replace function public.book_document(p_document uuid, p_account uuid default null) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  d public.documents;
  b public.client_books;
  r public.register_lines;
  acc public.ledger_accounts;
  party_name text;
  doc_date date;
  charge boolean;
  v_vat numeric;
  v_total numeric;
  v_amount numeric;
  v_awaiting numeric;
  v_move numeric;
  v_rest numeric;
  v_booked numeric;
  cash uuid;
  lines jsonb;
  book text;
  label text;
  e uuid;
  k text;
begin
  select * into d from public.documents where id = p_document;
  if d.id is null or not private.can_access_client(d.client_id) then raise exception 'Document not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(d.client_id) then
    raise exception 'Only the Owner or staff assigned to this client can book its documents' using errcode = '42501';
  end if;
  select * into b from public.client_books where client_id = d.client_id;
  if b.client_id is null or d.doc_type not in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued') then return null; end if;
  if d.status <> 'posted' then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  if exists (select 1 from public.journal_entries where document_id = d.id and status = 'posted') then
    raise exception 'This document is already in the books; reverse its entry to book it again' using errcode = '22023';
  end if;
  select * into r from public.register_lines where document_id = d.id;
  if r.id is null then raise exception 'Approve the document''s figures first' using errcode = '22023'; end if;
  doc_date := r.line_date;
  if doc_date is null then raise exception 'The document has no date' using errcode = '22023'; end if;

  select * into acc from public.ledger_accounts where id = coalesce(p_account, private.document_account(d)) and client_id = d.client_id and active;
  if acc.id is null then raise exception 'Choose the account title' using errcode = '22023'; end if;
  -- Keeps the register line's account title in step (register_sync trigger).
  update public.documents set ledger_account_id = acc.id where id = d.id;
  delete from public.journal_entries where document_id = d.id and status = 'suggested';
  if doc_date < b.books_start then return null; end if;

  party_name := coalesce(r.party_name, (select display_name from public.parties where id = r.party_id));
  v_vat := case when r.vat_registered then r.vat else 0 end;
  -- As before: a missing total is the amounts plus VAT.
  v_total := case when r.total > 0 then r.total else r.vatable + r.vat_exempt + r.zero_rated + r.vat end;
  charge := r.terms = 'charge';
  cash := private.first_control(d.client_id, 'cash');
  label := case d.doc_type when 'sales_invoice' then 'Sales invoice' when 'purchase_receipt' then 'Purchase'
                           when 'bir_2307_received' then 'BIR 2307 received' else 'BIR 2307 issued' end;
  if r.other_deduction <> 0 then
    raise exception 'Other deductions on a document cannot be booked yet; book it by journal entry' using errcode = '22023';
  end if;

  if r.kind = 'sale' then
    if v_total <= 0 then raise exception 'The document has no amount' using errcode = '22023'; end if;
    book := case when charge then 'sales' else 'cash_receipts' end;
    if charge then
      lines := jsonb_build_array(jsonb_build_object('account_id', private.first_control(d.client_id, 'ar'), 'party_id', r.party_id, 'party_name', party_name, 'debit', v_total));
    else
      lines := jsonb_build_array(jsonb_build_object('account_id', cash, 'party_id', r.party_id, 'party_name', party_name, 'debit', r.net));
      if r.withholding > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt_awaiting'), 'party_id', r.party_id, 'debit', r.withholding); end if;
      if r.vat_withheld > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'vat_withheld'), 'party_id', r.party_id, 'debit', r.vat_withheld); end if;
    end if;
    if r.discount > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'sales_discount'), 'debit', r.discount); end if;
    lines := lines || jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'credit', v_total - v_vat + r.discount);
    if v_vat > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'output_vat'), 'credit', v_vat); end if;
    k := 'sale';
  elsif r.kind = 'purchase' then
    if v_total <= 0 then raise exception 'The document has no amount' using errcode = '22023'; end if;
    if r.vat_withheld <> 0 then raise exception 'VAT withheld on a purchase cannot be booked yet; book it by journal entry' using errcode = '22023'; end if;
    book := case when charge then 'purchases' else 'cash_disbursements' end;
    lines := jsonb_build_array(jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'debit', v_total - v_vat));
    if v_vat > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'input_vat'), 'debit', v_vat); end if;
    lines := lines || jsonb_build_object('account_id', case when charge then private.first_control(d.client_id, 'ap') else cash end,
                                         'party_id', r.party_id, 'party_name', party_name,
                                         'credit', case when charge then v_total - r.withholding else r.net end);
    if r.withholding > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'ewt_payable'), 'party_id', r.party_id, 'credit', r.withholding); end if;
    k := 'purchase';
  elsif r.kind = 'cwt_received' then
    if r.withholding <= 0 then raise exception 'The 2307 has no tax withheld' using errcode = '22023'; end if;
    book := 'general_journal';
    -- CWT already booked on the payor's cash sales moves from "awaiting 2307" (no cash);
    -- the rest settles the receivable (acc), else cash, as before.
    v_awaiting := case when r.party_id is null then 0 else greatest(private.party_control_balance(d.client_id, 'cwt_awaiting', r.party_id), 0) end;
    v_move := least(v_awaiting, r.withholding);
    v_rest := r.withholding - v_move;
    lines := jsonb_build_array(jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt'), 'party_id', r.party_id, 'debit', r.withholding));
    if v_move > 0 then lines := lines || jsonb_build_object('account_id', private.first_control(d.client_id, 'cwt_awaiting'), 'party_id', r.party_id, 'credit', v_move); end if;
    if v_rest > 0 then lines := lines || jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'party_name', party_name, 'credit', v_rest); end if;
  else
    if r.withholding <= 0 then raise exception 'The 2307 has no tax withheld' using errcode = '22023'; end if;
    -- EWT the quarter's purchases from this payee already booked at payment.
    select coalesce(sum(p.withholding), 0) into v_booked from public.register_lines p
    where p.client_id = d.client_id and p.kind = 'purchase' and p.party_id = r.party_id
      and date_trunc('quarter', p.month) = date_trunc('quarter', r.month);
    v_amount := r.withholding - v_booked;
    if r.party_id is null then v_amount := r.withholding; end if;
    if v_amount <= 0 then return null; end if;
    book := 'general_journal';
    lines := jsonb_build_array(
      jsonb_build_object('account_id', acc.id, 'party_id', r.party_id, 'party_name', party_name, 'debit', v_amount),
      jsonb_build_object('account_id', private.first_control(d.client_id, 'ewt_payable'), 'party_id', r.party_id, 'credit', v_amount));
  end if;
  if exists (select 1 from jsonb_array_elements(lines) x where x ->> 'account_id' is null) then
    raise exception 'The chart of accounts lacks a control account this entry needs (cash, AR, AP, VAT, CWT, CWT awaiting 2307, VAT withheld, SC/PWD discount or EWT payable)' using errcode = '22023';
  end if;

  e := private.insert_entry(d.client_id, doc_date, book, 'document',
    label || coalesce(' ' || r.reference, '') || coalesce(' · ' || party_name, ''),
    r.reference, lines, null, d.id);

  if k is not null and r.party_id is not null then
    insert into public.client_party_accounts (client_id, party_id, kind, account_id) values (d.client_id, r.party_id, k, acc.id)
    on conflict (client_id, party_id, kind) do update set account_id = excluded.account_id, updated_at = now();
  end if;
  return e;
end;
$$;

revoke execute on function private.party_control_balance(uuid, text, uuid) from public, anon, authenticated;
revoke execute on function public.book_document(uuid, uuid) from public, anon;
grant execute on function public.book_document(uuid, uuid) to authenticated;
