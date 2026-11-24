-- Amended returns (spec §4.3, Q30): an amended return is a new filing of the
-- same form and period, labelled "<period> Amended" ("Amended 2" for a second
-- one), that goes through the whole sign-off chain. The return it amends stays
-- as filed.
--
--   filing_instances.amends        the return this one amends (null for the original);
--   filing_instances.amendment_no  0 for the original, then 1, 2…
--
-- The Owner or the client's reviewer starts it (amend_filing) on a filed return,
-- with a reason. Its due date is the day it is started; it is not scored as a
-- late filing. When it is filed, a books amendment that reopened the period's
-- months is locked again by itself.

alter table public.filing_instances
  add column amends uuid references public.filing_instances (id) on delete cascade,
  add column amendment_no smallint not null default 0 check (amendment_no >= 0),
  add constraint filing_instances_amends_check check ((amendment_no = 0) = (amends is null));

alter table public.filing_instances drop constraint filing_instances_obligation_id_period_end_key;
alter table public.filing_instances add constraint filing_instances_period_amendment_key unique (obligation_id, period_end, amendment_no);

create index filing_instances_amends_idx on public.filing_instances (amends) where amends is not null;

create or replace function public.amend_filing(p_filing uuid, p_reason text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  base text;
  n smallint;
  a uuid;
begin
  select * into f from public.filing_instances where id = p_filing;
  if f.id is null or not private.can_access_client(f.client_id) then raise exception 'Return not found' using errcode = 'P0002'; end if;
  if not (private.is_owner() or private.is_assigned(f.client_id, 'reviewer')) then
    raise exception 'Only the Owner or the client''s reviewer can start an amended return' using errcode = '42501';
  end if;
  if f.status not in ('filed', 'paid', 'proof_uploaded') then
    raise exception 'Only a filed return can be amended' using errcode = '22023';
  end if;
  if coalesce(btrim(p_reason), '') = '' then raise exception 'Give the reason for the amended return' using errcode = '22023'; end if;
  if exists (select 1 from public.filing_instances where obligation_id = f.obligation_id and period_end = f.period_end and amendment_no > f.amendment_no) then
    raise exception 'A later amended return of this period exists; amend that one instead' using errcode = '22023';
  end if;

  select period_label into base from public.filing_instances where obligation_id = f.obligation_id and period_end = f.period_end and amendment_no = 0;
  n := f.amendment_no + 1;
  insert into public.filing_instances (obligation_id, client_id, form, period_label, period_start, period_end, rule_id, statutory_due_date, due_date, amends, amendment_no)
  values (f.obligation_id, f.client_id, f.form, coalesce(base, f.period_label) || ' Amended' || case when n > 1 then ' ' || n else '' end,
          f.period_start, f.period_end, f.rule_id, f.statutory_due_date, (now() at time zone 'Asia/Manila')::date, f.id, n)
  returning id into a;
  insert into public.filing_events (filing_instance_id, from_status, to_status, actor, note, action, data)
  values (a, null, 'not_started', auth.uid(), btrim(p_reason), 'amend', jsonb_build_object('amends', f.id));
  return a;
end;
$$;

revoke execute on function public.amend_filing(uuid, text) from public, anon;
grant execute on function public.amend_filing(uuid, text) to authenticated;

-- Filing an amended return locks again the books months an amendment reopened for that period.
create or replace function private.relock_on_amended_filing() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.amends is not null and new.status in ('filed', 'paid', 'proof_uploaded') and old.status not in ('filed', 'paid', 'proof_uploaded') then
    update public.ledger_amendments
      set status = 'relocked', relocked_by = auth.uid(), relocked_at = now(),
          changes_note = coalesce(changes_note, 'Amended return filed: ' || new.form || ' ' || new.period_label)
      where status = 'reopened'
        and filing_instance_id in (select id from public.filing_instances where obligation_id = new.obligation_id and period_end = new.period_end);
  end if;
  return null;
end;
$$;

create trigger relock_on_amended_filing after update of status on public.filing_instances
  for each row execute function private.relock_on_amended_filing();

create or replace function private.late_filing_causes(p_from date, p_to date, p_today date)
returns table (
  filing_id uuid, client_id uuid, form text, period_label text, period_end date, due_date date, filed_on date,
  status text, preparer uuid, missed_cutoff boolean, late_documents boolean, waited_for_client boolean, unpaid_tax boolean, cause text
)
language sql stable security definer set search_path = '' as $$
  with f as (
    select fi.*, date_trunc('month', fi.period_end)::date as last_month
    from public.filing_instances fi
    where fi.due_date between p_from and p_to
      and fi.due_date < p_today
      and (fi.filed_on > fi.due_date or (fi.filed_on is null and fi.status not in ('filed', 'paid', 'proof_uploaded')))
      -- An amended return has no statutory deadline of its own: not scored as late.
      and fi.amendment_no = 0
  ),
  x as (
    select
      f.*,
      coalesce(y.missed_cutoff, false) as missed,
      coalesce(y.cutoff_date is not null and exists (
        select 1 from public.documents d
        where d.client_id = f.client_id
          and d.document_month between date_trunc('month', f.period_start)::date and f.last_month
          and private.is_submission(d.doc_type) and not d.prior_year and d.status <> 'uploading'
          and (d.created_at at time zone 'Asia/Manila')::date > y.cutoff_date
      ), false) as late_docs,
      (
        exists (select 1 from public.filing_events e where e.filing_instance_id = f.id and e.action = 'review'
                and (e.created_at at time zone 'Asia/Manila')::date <= f.due_date)
        and not exists (select 1 from public.filing_events e where e.filing_instance_id = f.id and e.action = 'client_approve'
                and (e.created_at at time zone 'Asia/Manila')::date <= f.due_date)
      ) as waited,
      exists (
        select 1 from public.client_dues du
        where du.filing_instance_id = f.id and du.waived_at is null
          and du.amount > coalesce((
            select sum(a.amount) from public.payment_allocations a
            join public.client_deposits dep on dep.id = a.deposit_id
            where a.due_id = du.id and dep.voided_at is null and dep.received_on <= f.due_date
          ), 0)
      ) as unpaid,
      coalesce(
        (select e.actor from public.filing_events e where e.filing_instance_id = f.id and e.action = 'prepare'
         order by e.created_at desc, e.id desc limit 1),
        (select sa.user_id from public.staff_assignments sa where sa.client_id = f.client_id and sa.role = 'preparer'
         order by sa.created_at, sa.user_id limit 1)
      ) as prep
    from f
    left join public.document_cycles y on y.client_id = f.client_id and y.period = f.last_month
  )
  select id, client_id, form, period_label, period_end, due_date, filed_on, status, prep,
         missed, late_docs, waited, unpaid,
         case when missed or late_docs or waited or unpaid then 'client' else 'staff' end
  from x
$$;
