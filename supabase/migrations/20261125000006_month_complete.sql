-- P1: the client confirms "I've sent everything for <month>" (docs/UX-REVIEW.md,
-- recommendation 14; Owner's decisions 18 and 19).
--
--  - month_check(): what the portal asks about before the client confirms:
--    sales invoice numbers missing from the series (uploaded or cancelled?) and
--    customers who withheld tax this quarter without a 2307 yet.
--  - confirm_month_complete(): blocked until every missing number is answered
--    (decision 18); numbers the client says were cancelled are kept. The month's
--    documents count as in, so the first deadline step is done.
--  - undo_month_complete(): the client can undo until the cutoff (decision 19);
--    after it, staff reopen the month.
--  - Anything sent for a confirmed month is marked late.
--  - pending_document_accounts(): for the per-client document review, the
--    account title each waiting document would go to and where it came from.

alter table public.document_cycles
  add column client_confirmed_at timestamptz,
  add column client_confirmed_by uuid references auth.users (id),
  add column confirmed_documents int;

-- Sales invoice numbers the client said were cancelled (keep the cancelled copies).
create table public.cancelled_invoices (
  client_id uuid not null references public.clients (id) on delete cascade,
  -- The series letters ("SI", "OR"), upper case, no spaces or punctuation; '' for none.
  prefix text not null,
  num bigint not null check (num >= 0),
  width int not null check (width between 1 and 15),
  period date not null check (extract(day from period) = 1),
  declared_by uuid references auth.users (id) default auth.uid(),
  declared_at timestamptz not null default now(),
  primary key (client_id, prefix, num)
);
create trigger audit after insert or update or delete on public.cancelled_invoices for each row execute function private.audit();
alter table public.cancelled_invoices enable row level security;
create policy cancelled_invoices_read on public.cancelled_invoices for select to authenticated using (private.can_access_client(client_id));

/** "SI No. 0450" → (SI, 450, 4); null when it does not end in digits. */
create or replace function private.invoice_number_parts(p text, out prefix text, out num bigint, out width int)
language sql immutable as $$
  select regexp_replace(regexp_replace(upper(regexp_replace(t, '\d+$', '')), '[^A-Z]', '', 'g'), 'NO$', ''),
         substring(t from '(\d+)$')::bigint,
         length(substring(t from '(\d+)$'))
  from (select regexp_replace(coalesce(p, ''), '\s', '', 'g') as t) s
  where substring(t from '(\d+)$') is not null and length(substring(t from '(\d+)$')) <= 15
$$;

/**
 * Sales invoice numbers missing from the client's series for a month: between
 * the month's lowest and highest number of each series, and from the last number
 * of earlier months up to the month's first. A number counts as present when any
 * sales invoice of the client carries it (in any month), or the client said it was
 * cancelled. More than 50 numbers missing in a row is taken as a new booklet, not
 * a gap. Numbers come from the approved figures, else from what OCR read.
 */
create or replace function private.missing_invoices(p_client uuid, p_period date)
returns table (prefix text, num bigint, width int)
language sql stable security definer set search_path = '' as $$
  with nums as (
    select d.document_month, n.prefix, n.num, n.width
    from public.documents d
    join public.extractions x on x.document_id = d.id
    cross join lateral private.invoice_number_parts(coalesce(nullif(x.approved_fields ->> 'number', ''), x.fields ->> 'number')) n
    where d.client_id = p_client and d.doc_type = 'sales_invoice' and d.status not in ('uploading', 'returned')
      and d.document_month between (p_period - interval '12 months')::date and (p_period + interval '12 months')::date
  ),
  cur as (
    select n.prefix, min(n.num) as lo, max(n.num) as hi, max(n.width) as w from nums n where n.document_month = p_period group by n.prefix
  ),
  bounds as (
    select c.prefix, c.hi, c.w,
      coalesce((select max(o.num) from nums o where o.prefix = c.prefix and o.document_month < p_period and o.num < c.lo and o.num >= c.lo - 51), c.lo) as lo
    from cur c
  ),
  -- Every number of the series in range, whatever month it was sent for, in order.
  present as (
    select distinct b.prefix, b.w, o.num from bounds b join nums o on o.prefix = b.prefix and o.num between b.lo and b.hi
  ),
  pairs as (select p.prefix, p.w, p.num, lead(p.num) over (partition by p.prefix order by p.num) as next from present p)
  select pr.prefix, g as num, pr.w as width
  from pairs pr cross join lateral generate_series(pr.num + 1, pr.next - 1) g
  where pr.next - pr.num - 1 between 1 and 50
    and not exists (select 1 from public.cancelled_invoices ci where ci.client_id = p_client and ci.prefix = pr.prefix and ci.num = g)
  order by 1, 2
$$;

/**
 * What the portal asks before the client confirms a month: missing invoice numbers,
 * customers who withheld this quarter with no 2307 yet, and how many documents are
 * still being read (their numbers are not counted until OCR has read them).
 */
create or replace function public.month_check(p_client uuid, p_period date) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_period)::date;
begin
  if not private.can_access_client(p_client) then
    raise exception 'You cannot see this client' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'missing', coalesce((select jsonb_agg(jsonb_build_object('prefix', g.prefix, 'num', g.num, 'width', g.width) order by g.prefix, g.num)
                         from private.missing_invoices(p_client, m) g), '[]'::jsonb),
    'cwt', coalesce((
      select jsonb_agg(jsonb_build_object('party', w.party, 'amount', w.outstanding) order by w.party)
      from (
        select max(s.party_name) as party,
               sum(s.withholding) - coalesce((
                 select sum(r.withholding) from public.register_lines r
                 where r.client_id = p_client and r.kind = 'cwt_received' and r.party_id = s.party_id
                   and date_trunc('quarter', r.month) = date_trunc('quarter', m)), 0) as outstanding
        from public.register_lines s
        where s.client_id = p_client and s.kind = 'sale' and s.withholding > 0 and s.party_id is not null
          and date_trunc('quarter', s.month) = date_trunc('quarter', m) and s.month <= m
        group by s.party_id
      ) w where w.outstanding > 1), '[]'::jsonb),
    'reading', (
      select count(*) from public.documents d left join public.extractions x on x.document_id = d.id
      where d.client_id = p_client and d.document_month = m and d.doc_type = 'sales_invoice'
        and d.status in ('received', 'under_review') and (x.document_id is null or x.status = 'pending'))
  );
end;
$$;

/**
 * The client (or staff on the client's word) confirms every document for the month
 * is in. `p_cancelled` lists missing numbers the client says were cancelled:
 * [{"prefix": "SI", "num": 450}]. Refused while any missing number is unanswered.
 */
create or replace function public.confirm_month_complete(p_client uuid, p_period date, p_cancelled jsonb default '[]'::jsonb)
returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
  m date := date_trunc('month', p_period)::date;
  sent int;
  open_list text;
begin
  if not private.can_upload(p_client) then
    raise exception 'You cannot do this for this client' using errcode = '42501';
  end if;
  select * into y from public.document_cycles where client_id = p_client and period = m for update;
  if y.id is null then raise exception 'That month is not open for documents' using errcode = 'P0002'; end if;
  if y.closed_at is not null then raise exception 'That month is closed' using errcode = '22023'; end if;
  if y.client_confirmed_at is not null then return y; end if;
  if y.nothing_to_submit_at is not null then
    raise exception 'This month was marked as having no transactions' using errcode = '22023';
  end if;
  select count(*) into sent from public.documents d
  where d.client_id = p_client and d.document_month = m and d.status <> 'uploading' and private.is_submission(d.doc_type);
  sent := sent + (select count(*) from public.payroll_submissions s where s.client_id = p_client and s.pay_month = m);
  if sent = 0 then
    raise exception 'Nothing has been sent for this month. If there were no transactions, use “No transactions this month”.' using errcode = '22023';
  end if;

  -- Only numbers that are actually missing can be marked cancelled.
  insert into public.cancelled_invoices (client_id, prefix, num, width, period)
  select p_client, g.prefix, g.num, g.width, m
  from private.missing_invoices(p_client, m) g
  join jsonb_array_elements(case when jsonb_typeof(p_cancelled) = 'array' then p_cancelled else '[]'::jsonb end) c
    on upper(coalesce(c ->> 'prefix', '')) = g.prefix and (c ->> 'num') ~ '^\d{1,15}$' and (c ->> 'num')::bigint = g.num
  on conflict do nothing;

  select string_agg(g.prefix || ' ' || lpad(g.num::text, g.width, '0'), ', ' order by g.prefix, g.num) into open_list
  from (select * from private.missing_invoices(p_client, m) limit 10) g;
  if open_list is not null then
    raise exception 'Answer the missing invoices first: %', open_list using errcode = '22023';
  end if;

  update public.document_cycles
    set client_confirmed_at = now(), client_confirmed_by = auth.uid(), confirmed_documents = sent
    where id = y.id returning * into y;
  return y;
end;
$$;

/** Undo a confirmation: the client until the cutoff; staff assigned to the client (or the Owner) any time before the close. */
create or replace function public.undo_month_complete(p_client uuid, p_period date) returns public.document_cycles
language plpgsql security definer set search_path = '' as $$
declare
  y public.document_cycles;
begin
  if not private.can_upload(p_client) then
    raise exception 'You cannot do this for this client' using errcode = '42501';
  end if;
  select * into y from public.document_cycles where client_id = p_client and period = date_trunc('month', p_period)::date for update;
  if y.id is null or y.client_confirmed_at is null then raise exception 'That month was not confirmed' using errcode = 'P0002'; end if;
  if y.closed_at is not null then raise exception 'That month is closed' using errcode = '22023'; end if;
  if private.staff_role() is null and private.manila_today() > y.cutoff_date then
    raise exception 'The cutoff (%) has passed. Ask us to reopen the month.', to_char(y.cutoff_date, 'FMMonth FMDD') using errcode = '22023';
  end if;
  update public.document_cycles set client_confirmed_at = null, client_confirmed_by = null, confirmed_documents = null
  where id = y.id returning * into y;
  return y;
end;
$$;

/** A document sent for a month the client already confirmed is marked late. */
create or replace function private.mark_after_confirmation() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if private.is_submission(new.doc_type) and not new.late and exists (
    select 1 from public.document_cycles y
    where y.client_id = new.client_id and y.period = date_trunc('month', new.document_month)::date and y.client_confirmed_at is not null
  ) then
    new.late := true;
  end if;
  return new;
end;
$$;
create trigger mark_after_confirmation before insert on public.documents for each row execute function private.mark_after_confirmation();

/**
 * For the per-client document review: each waiting sales invoice, purchase receipt
 * and 2307, the account title it would be booked to, and where that came from:
 *   chosen   staff already chose it for this document
 *   history  this client used it for this supplier or customer before
 *   preset   the firm-wide preset for the supplier, in this client's chart (confirm it)
 *   default  the default for a sale (confirm it), or the rule for a 2307
 *   choose   a new supplier, or a preset not in this chart: staff must choose
 */
create or replace function public.pending_document_accounts(p_client uuid)
returns table (document_id uuid, account_id uuid, source text)
language plpgsql stable security definer set search_path = '' as $$
declare
  d public.documents;
  f jsonb;
  party uuid;
  v_kind text;
  acc uuid;
  preset text;
begin
  if not (private.is_staff() and private.can_access_client(p_client)) then
    raise exception 'You cannot see this client' using errcode = '42501';
  end if;
  for d in select * from public.documents x
           where x.client_id = p_client and x.status in ('received', 'under_review')
             and x.doc_type in ('sales_invoice', 'purchase_receipt', 'bir_2307_received', 'bir_2307_issued') loop
    select coalesce(e.approved_fields, e.fields) into f from public.extractions e where e.document_id = d.id;
    party := private.document_party(coalesce(f ->> 'party_tin', ''));
    v_kind := case d.doc_type when 'sales_invoice' then 'sale' when 'purchase_receipt' then 'purchase' end;
    document_id := d.id;
    if d.ledger_account_id is not null then
      account_id := d.ledger_account_id; source := 'chosen';
    elsif v_kind is null then
      account_id := private.document_account(d); source := 'default';
    else
      acc := null;
      if party is not null then
        select cpa.account_id into acc from public.client_party_accounts cpa
          join public.ledger_accounts a on a.id = cpa.account_id and a.active
          where cpa.client_id = d.client_id and cpa.party_id = party and cpa.kind = v_kind;
      end if;
      if acc is not null then
        account_id := acc; source := 'history';
      else
        preset := (select p.preset_account_key from public.parties p where p.id = party);
        acc := case when preset is not null then private.account_by_key(d.client_id, preset) end;
        if acc is not null then
          account_id := acc; source := 'preset';
        elsif v_kind = 'sale' then
          account_id := coalesce(private.account_by_key(d.client_id, 'sales'), private.account_by_key(d.client_id, 'service_income'));
          source := case when account_id is null then 'choose' else 'default' end;
        else
          account_id := null; source := 'choose';
        end if;
      end if;
    end if;
    return next;
  end loop;
end;
$$;

revoke execute on function private.invoice_number_parts(text) from public, anon, authenticated;
revoke execute on function private.missing_invoices(uuid, date) from public, anon, authenticated;
revoke execute on function private.mark_after_confirmation() from public, anon, authenticated;
revoke execute on function public.month_check(uuid, date) from public, anon;
revoke execute on function public.confirm_month_complete(uuid, date, jsonb) from public, anon;
revoke execute on function public.undo_month_complete(uuid, date) from public, anon;
revoke execute on function public.pending_document_accounts(uuid) from public, anon;
grant execute on function public.month_check(uuid, date) to authenticated;
grant execute on function public.confirm_month_complete(uuid, date, jsonb) to authenticated;
grant execute on function public.undo_month_complete(uuid, date) to authenticated;
grant execute on function public.pending_document_accounts(uuid) to authenticated;
