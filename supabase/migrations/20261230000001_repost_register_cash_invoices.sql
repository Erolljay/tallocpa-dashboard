-- Cash sales and purchases that came across from the register (legacy, migration
-- 20261126000004) were booked the old way: one entry in the Cash Receipts or Cash
-- Disbursements Book, with no Sales or Purchase Journal line. Every sale and purchase
-- with a customer or supplier belongs in the Sales or Purchase Journal (the SLS and SLP
-- track every party), and its receipt or payment in the cash book (Owner, 26 November
-- 2026).
--
-- public.repost_register_cash_invoices(client) moves them: each legacy cash invoice is
-- voided (its one old entry reversed on its own date) and posted again from its
-- document as a Sales or Purchase Invoice and its Receipt or Payment, with the same
-- account title, tax codes, withholding and cash or bank account. Every account keeps
-- its total. Charge invoices from the register are already in the journals and are
-- left alone. A month that is locked refuses the change: that invoice is skipped with
-- the reason, and the rest go on. Safe to run again.

create or replace function public.repost_register_cash_invoices(p_client uuid)
returns table (invoice_id uuid, kind text, reference text, issue_date date, outcome text)
language plpgsql security definer set search_path = '' as $$
#variable_conflict use_column
declare
  inv public.book_invoices;
  acc uuid;
  cash uuid;
  codes jsonb;
  sug jsonb;
  r public.register_lines;
  d public.documents;
  posted jsonb;
begin
  if not private.can_access_client(p_client) then raise exception 'Client not found' using errcode = 'P0002'; end if;
  if not private.can_keep_books(p_client) then
    raise exception 'Only the Owner or staff assigned to this client can post to its books' using errcode = '42501';
  end if;
  for inv in
    select i.* from public.book_invoices i
    where i.client_id = p_client and i.legacy and i.voided_at is null and i.document_id is not null
      -- Cash: the old entry was also the receipt or payment.
      and exists (select 1 from public.book_settlements s where s.journal_entry_id = i.journal_entry_id and s.voided_at is null)
    order by i.issue_date, i.created_at
  loop
    invoice_id := inv.id;
    kind := inv.kind;
    reference := inv.reference;
    issue_date := inv.issue_date;
    begin
      select * into d from public.documents where id = inv.document_id;
      select * into r from public.register_lines where document_id = inv.document_id;
      select l.account_id into acc from public.book_invoice_lines l where l.invoice_id = inv.id order by l.line_no limit 1;
      select l.account_id into cash from public.journal_lines l join public.ledger_accounts a on a.id = l.account_id
        where l.entry_id = inv.journal_entry_id and a.control in ('cash', 'bank') order by l.line_no limit 1;
      -- The same tax codes, line for line, on the portions the document is posted in.
      sug := private.document_tax_suggestion(d.client_id, r.kind, r.party_id, r.vat_registered, r.slp_category,
        r.vatable, r.vat_exempt, r.zero_rated, r.vat, r.total, r.discount, r.atc, r.withholding, r.vat_withheld);
      select jsonb_build_object(
          'lines', coalesce(jsonb_agg(jsonb_build_object('portion', s.x ->> 'portion', 'tax_code_id', l.tax_code_id) order by s.n), '[]'::jsonb),
          'withholding_code_id', inv.withholding_code_id,
          'vat_withholding_code_id', inv.vat_withholding_code_id)
        into codes
        from jsonb_array_elements(sug -> 'lines') with ordinality s(x, n)
        join lateral (select tax_code_id from public.book_invoice_lines where invoice_id = inv.id order by line_no offset s.n - 1 limit 1) l on true;

      perform private.book_void_invoice(inv.id, 'Moved to the ' || case inv.kind when 'sales' then 'Sales Journal with its Receipt' else 'Purchase Journal with its Payment' end);
      posted := private.document_to_books(inv.document_id, acc, cash, null, codes, false);
      outcome := 'moved';
    exception when others then
      outcome := 'skipped: ' || sqlerrm;
    end;
    return next;
  end loop;
end;
$$;

revoke execute on function public.repost_register_cash_invoices(uuid) from public, anon;
grant execute on function public.repost_register_cash_invoices(uuid) to authenticated;
