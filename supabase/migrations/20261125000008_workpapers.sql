-- W1: the period file (docs/UX-REVIEW.md, workpaper index; Owner's decisions 6–8).
--
-- Tie-outs T-1 to T-10 (workpaper 0-2) are computed from the register, the books
-- and payroll each time (src/lib/workpapers/tieouts.ts). What is kept is the
-- written explanation of a difference over ₱1, which lets a return the tie-out
-- feeds be marked prepared, and the month's totals from the books.

create table public.workpaper_explanations (
  client_id uuid not null references public.clients (id) on delete cascade,
  -- First day of the month of the period file.
  period date not null check (extract(day from period) = 1),
  tie text not null check (tie in ('T-1', 'T-2', 'T-3', 'T-4', 'T-5', 'T-6', 'T-7', 'T-8', 'T-9', 'T-10')),
  explanation text not null check (btrim(explanation) <> ''),
  explained_by uuid references auth.users (id) default auth.uid(),
  explained_at timestamptz not null default now(),
  primary key (client_id, period, tie)
);
create trigger audit after insert or update or delete on public.workpaper_explanations for each row execute function private.audit();
alter table public.workpaper_explanations enable row level security;
-- Staff who can see the client read them; the Owner and staff assigned to the client write them.
create policy workpaper_explanations_read on public.workpaper_explanations for select to authenticated
  using (private.is_staff() and private.can_access_client(client_id));
create policy workpaper_explanations_insert on public.workpaper_explanations for insert to authenticated
  with check (private.is_owner() or private.is_assigned(client_id));
create policy workpaper_explanations_update on public.workpaper_explanations for update to authenticated
  using (private.is_owner() or private.is_assigned(client_id)) with check (private.is_owner() or private.is_assigned(client_id));
create policy workpaper_explanations_delete on public.workpaper_explanations for delete to authenticated
  using (private.is_owner() or private.is_assigned(client_id));

/**
 * The books side of the tie-outs for a period, from posted entries (opening and
 * closing entries left out), in pesos:
 *   revenue          net credit to revenue accounts
 *   output_vat       net credit to Output VAT
 *   input_vat        net debit to Input VAT
 *   ewt_payable      net credit to Withholding Tax Payable – Expanded
 *   wtc_payable      net credit to Withholding Tax Payable – Compensation
 *   compensation     net debit to Salaries and Wages, 13th Month Pay and Employee Benefits,
 *                    and Direct Labor (and employees' pay accounts, migration 20261125000010)
 *   cash_from_sales  debits to cash and bank accounts in the posted entries of the
 *                    period's cash sales (register lines of the period)
 *   ppe_additions    net debit to property and equipment accounts other than land (A1, T-9)
 *   depreciation     net debit to Depreciation Expense, direct or not (A1, T-10)
 *   suggested        entries of the period still only suggested
 * Runs as the caller, so row-level security applies.
 */
create or replace function public.workpaper_ledger(p_client uuid, p_from date, p_to date) returns jsonb
language sql stable security invoker set search_path = '' as $$
  with lines as (
    select a.id as account_id, a.type, a.control, a.template_key, a.fs_line, a.normal_side, l.debit, l.credit
    from public.journal_lines l
    join public.journal_entries e on e.id = l.entry_id
    join public.ledger_accounts a on a.id = l.account_id
    where l.client_id = p_client and e.status in ('posted', 'reversed') and e.source <> 'opening'
      and not private.is_closing(e) and e.entry_date between p_from and p_to
  )
  select jsonb_build_object(
    'revenue', coalesce((select sum(credit - debit) from lines where type = 'revenue'), 0),
    'output_vat', coalesce((select sum(credit - debit) from lines where control = 'output_vat'), 0),
    'input_vat', coalesce((select sum(debit - credit) from lines where control = 'input_vat'), 0),
    'ewt_payable', coalesce((select sum(credit - debit) from lines where control = 'ewt_payable'), 0),
    'wtc_payable', coalesce((select sum(credit - debit) from lines where template_key = 'wtc_payable'), 0),
    'compensation', coalesce((select sum(debit - credit) from lines where template_key in ('salaries', 'employee_benefits', 'direct_labor')), 0),
    'cash_from_sales', coalesce((
      select sum(l.debit)
      from public.register_lines r
      join public.journal_entries e on e.document_id = r.document_id and e.status = 'posted'
      join public.journal_lines l on l.entry_id = e.id
      join public.ledger_accounts a on a.id = l.account_id and a.control in ('cash', 'bank')
      where r.client_id = p_client and r.kind = 'sale' and r.terms = 'cash' and r.month between date_trunc('month', p_from)::date and p_to
    ), 0),
    'ppe_additions', coalesce((select sum(debit - credit) from lines where fs_line = 'ppe' and normal_side = 'debit' and coalesce(template_key, '') <> 'land'), 0),
    'depreciation', coalesce((select sum(debit - credit) from lines where template_key in ('depreciation', 'depreciation_direct')), 0),
    'suggested', (select count(*) from public.journal_entries e where e.client_id = p_client and e.status = 'suggested' and e.entry_date between p_from and p_to)
  )
$$;

revoke execute on function public.workpaper_ledger(uuid, date, date) from public, anon;
grant execute on function public.workpaper_ledger(uuid, date, date) to authenticated;
