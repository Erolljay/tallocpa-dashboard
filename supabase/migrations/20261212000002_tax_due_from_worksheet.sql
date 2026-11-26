-- The tax due on a return comes from its worksheet (Owner, 26 November 2026).
--
-- Found by the December rehearsal: the tax due was typed by hand at Prepared and never
-- checked against the worksheet, and billing used whatever was typed. Now the worksheet
-- saves its TOTAL AMOUNT PAYABLE as the figure "__tax_due" (centavos, never below zero;
-- src/lib/returns/source.ts taxDueOf), and whenever a return's tax due is set (Prepared),
-- the saved worksheet's figure wins. Returns of forms the app has no worksheet for keep the
-- amount staff enter.

create or replace function private.tax_due_from_worksheet() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  v_due text;
begin
  select w.figures ->> '__tax_due' into v_due
  from public.return_worksheets w
  where w.filing_instance_id = new.id and w.result is not null and w.figures ? '__tax_due';
  if v_due is not null then
    new.tax_due := (v_due::numeric / 100)::numeric(18, 2);
  end if;
  return new;
end;
$$;

create trigger tax_due_from_worksheet before update of tax_due on public.filing_instances
  for each row execute function private.tax_due_from_worksheet();

-- Worksheets saved before this change: their payable line, by its key on each form. Only a
-- figure is added (no recompute), so the worksheet guard, which refuses saves while a month
-- is reopened, is held off for this one update.
alter table public.return_worksheets disable trigger guard;
update public.return_worksheets w
set figures = w.figures || jsonb_build_object('__tax_due', greatest(coalesce(
      (w.figures ->> 'total_amount_payable')::bigint,  -- 2550Q, 2551Q, 1701Q, 1702Q, annual ITR
      (w.figures ->> 'total_amount_due')::bigint,      -- 1601-C, 1601-EQ
      (w.figures ->> 'total_remittance')::bigint,      -- 0619-E
      0), 0))
from public.filing_instances f
where f.id = w.filing_instance_id and w.result is not null and not (w.figures ? '__tax_due') and f.status <> 'filed';
alter table public.return_worksheets enable trigger guard;

revoke execute on function private.tax_due_from_worksheet() from public, anon, authenticated;
