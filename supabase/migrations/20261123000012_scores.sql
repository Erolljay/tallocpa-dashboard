-- Owner dashboard and scores (spec §3.11; Q36, Q39–Q41, Q51).
--
-- Read-only figures for the Owner, worked out in the database so that large
-- tables are never pulled into the app row by row:
--  - late_filings:        returns filed after their due date (or still not filed),
--                         with whether the client or the firm caused it;
--  - client_scorecard:    per client per month, the inputs of the compliance score;
--  - staff_scorecard:     per staff member per month, the KPIs;
--  - ocr_correction_rates: how often staff corrected what OCR read;
--  - work_queues:         documents and returns waiting, per staff member.
-- Every function is the Owner's only. p_today (default: today in Manila) lets the
-- tests pin the date.

-- ---------------------------------------------------------------------------
-- Late filings and their cause.
--
-- A return is late when it was filed after its due date, or is still not filed
-- and the due date has passed. It is client-caused when any of these is true;
-- otherwise it is staff-caused:
--  - missed_cutoff:     the client sent nothing by the cutoff of the period's last month;
--  - late_documents:    documents for the period came in after that cutoff;
--  - waited_for_client: the return was reviewed by the due date but the client
--                       had not approved it by then;
--  - unpaid_tax:        the firm remits the tax and the client had not paid it in
--                       full by the due date.
-- ---------------------------------------------------------------------------
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

create or replace function private.require_owner_scores() returns void
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can see scores' using errcode = '42501';
  end if;
end;
$$;

/** Late returns with a due date from p_from to p_to, newest first. */
create or replace function public.late_filings(p_from date, p_to date, p_today date default null)
returns table (
  filing_id uuid, client_id uuid, form text, period_label text, period_end date, due_date date, filed_on date,
  status text, preparer uuid, missed_cutoff boolean, late_documents boolean, waited_for_client boolean, unpaid_tax boolean, cause text
)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.require_owner_scores();
  return query
    select * from private.late_filing_causes(p_from, p_to, coalesce(p_today, private.manila_today())) l
    order by l.due_date desc, l.form;
end;
$$;

-- ---------------------------------------------------------------------------
-- Client compliance score inputs (Q41), per client per month from p_from to p_to
-- (first days of months). Only what is already due counts.
-- ---------------------------------------------------------------------------
create or replace function public.client_scorecard(p_from date, p_to date, p_today date default null)
returns table (
  client_id uuid, month date,
  cycles_due int, cycles_missed int,
  documents int, documents_returned int, documents_late int,
  dues_due int, dues_late int,
  filings_due int, filings_late int, late_client int
)
language plpgsql stable security definer set search_path = '' as $$
declare
  today date := coalesce(p_today, private.manila_today());
  from_m date := date_trunc('month', p_from)::date;
  to_end date := (date_trunc('month', p_to) + interval '1 month - 1 day')::date;
begin
  perform private.require_owner_scores();
  return query
  with cyc as (
    select y.client_id, y.period as m, count(*)::int as due, count(*) filter (where y.missed_cutoff)::int as missed
    from public.document_cycles y
    where y.cutoff_date < today and y.period between from_m and to_end
    group by 1, 2
  ),
  docs as (
    select d.client_id, d.document_month as m, count(*)::int as n,
           count(*) filter (where d.return_reason is not null)::int as returned,
           count(*) filter (where d.late)::int as late
    from public.documents d
    where private.is_submission(d.doc_type) and not d.prior_year and d.status <> 'uploading'
      and d.document_month between from_m and to_end
    group by 1, 2
  ),
  dues as (
    select du.client_id, date_trunc('month', du.due_on)::date as m, count(*)::int as due,
           count(*) filter (where du.amount > coalesce((
             select sum(a.amount) from public.payment_allocations a
             join public.client_deposits dep on dep.id = a.deposit_id
             where a.due_id = du.id and dep.voided_at is null and dep.received_on <= du.due_on
           ), 0))::int as late
    from public.client_dues du
    where du.waived_at is null and du.due_on < today and du.due_on between from_m and to_end
    group by 1, 2
  ),
  fil as (
    select fi.client_id, date_trunc('month', fi.due_date)::date as m, count(*)::int as due
    from public.filing_instances fi
    where fi.due_date < today and fi.due_date between from_m and to_end
    group by 1, 2
  ),
  lf as (
    select l.client_id, date_trunc('month', l.due_date)::date as m, count(*)::int as late,
           count(*) filter (where l.cause = 'client')::int as by_client
    from private.late_filing_causes(from_m, to_end, today) l
    group by 1, 2
  ),
  k as (
    select c.client_id, c.m from cyc c union select d.client_id, d.m from docs d
    union select u.client_id, u.m from dues u union select f.client_id, f.m from fil f
  )
  select k.client_id, k.m,
         coalesce(cyc.due, 0), coalesce(cyc.missed, 0),
         coalesce(docs.n, 0), coalesce(docs.returned, 0), coalesce(docs.late, 0),
         coalesce(dues.due, 0), coalesce(dues.late, 0),
         coalesce(fil.due, 0), coalesce(lf.late, 0), coalesce(lf.by_client, 0)
  from k
  left join cyc on cyc.client_id = k.client_id and cyc.m = k.m
  left join docs on docs.client_id = k.client_id and docs.m = k.m
  left join dues on dues.client_id = k.client_id and dues.m = k.m
  left join fil on fil.client_id = k.client_id and fil.m = k.m
  left join lf on lf.client_id = k.client_id and lf.m = k.m
  order by k.client_id, k.m;
end;
$$;

-- ---------------------------------------------------------------------------
-- Staff KPIs (Q40), per staff member per month from p_from to p_to.
--  - filings_due / late_staff / late_client: returns due that month, by who
--    prepared them (or the client's preparer when not yet prepared);
--  - prepared / kicked_back: returns marked prepared, and returns of theirs a
--    reviewer sent back, that month;
--  - filed / days_to_file: returns filed that month, and the average days from
--    the cutoff of the period's last month to the filing date;
--  - documents_processed / ocr_corrections: documents whose figures they
--    approved, and OCR fields they corrected.
-- ---------------------------------------------------------------------------
create or replace function public.staff_scorecard(p_from date, p_to date, p_today date default null)
returns table (
  user_id uuid, month date,
  filings_due int, late_staff int, late_client int,
  prepared int, kicked_back int,
  filed int, days_to_file numeric,
  documents_processed int, ocr_corrections int
)
language plpgsql stable security definer set search_path = '' as $$
declare
  today date := coalesce(p_today, private.manila_today());
  from_m date := date_trunc('month', p_from)::date;
  to_end date := (date_trunc('month', p_to) + interval '1 month - 1 day')::date;
begin
  perform private.require_owner_scores();
  return query
  with fa as (
    select fi.id, fi.client_id, fi.due_date, fi.filed_on, fi.period_end,
      coalesce(
        (select e.actor from public.filing_events e where e.filing_instance_id = fi.id and e.action = 'prepare'
         order by e.created_at desc, e.id desc limit 1),
        (select sa.user_id from public.staff_assignments sa where sa.client_id = fi.client_id and sa.role = 'preparer'
         order by sa.created_at, sa.user_id limit 1)
      ) as prep
    from public.filing_instances fi
    where (fi.due_date < today and fi.due_date between from_m and to_end)
       or fi.filed_on between from_m and to_end
  ),
  due as (
    select fa.prep as u, date_trunc('month', fa.due_date)::date as m, count(*)::int as n,
           count(*) filter (where l.cause = 'staff')::int as ls, count(*) filter (where l.cause = 'client')::int as lc
    from fa
    left join private.late_filing_causes(from_m, to_end, today) l on l.filing_id = fa.id
    where fa.due_date < today and fa.due_date between from_m and to_end and fa.prep is not null
    group by 1, 2
  ),
  done as (
    select fa.prep as u, date_trunc('month', fa.filed_on)::date as m, count(*)::int as n,
           round(avg(fa.filed_on - y.cutoff_date), 1) as days
    from fa
    left join public.document_cycles y on y.client_id = fa.client_id and y.period = date_trunc('month', fa.period_end)::date
    where fa.filed_on between from_m and to_end and fa.prep is not null
    group by 1, 2
  ),
  prep as (
    select e.actor as u, date_trunc('month', e.created_at at time zone 'Asia/Manila')::date as m, count(*)::int as n
    from public.filing_events e
    where e.action = 'prepare' and e.actor is not null
      and (e.created_at at time zone 'Asia/Manila')::date between from_m and to_end
    group by 1, 2
  ),
  kick as (
    select (select p.actor from public.filing_events p
            where p.filing_instance_id = k.filing_instance_id and p.action = 'prepare' and p.created_at <= k.created_at
            order by p.created_at desc, p.id desc limit 1) as u,
           date_trunc('month', k.created_at at time zone 'Asia/Manila')::date as m
    from public.filing_events k
    where k.action = 'kick_back' and (k.created_at at time zone 'Asia/Manila')::date between from_m and to_end
  ),
  kicks as (select kick.u, kick.m, count(*)::int as n from kick where kick.u is not null group by 1, 2),
  docs as (
    select e.approved_by as u, date_trunc('month', e.approved_at at time zone 'Asia/Manila')::date as m, count(*)::int as n
    from public.extractions e
    where e.approved_by is not null and (e.approved_at at time zone 'Asia/Manila')::date between from_m and to_end
    group by 1, 2
  ),
  corr as (
    select c.corrected_by as u, date_trunc('month', c.corrected_at at time zone 'Asia/Manila')::date as m, count(*)::int as n
    from public.extraction_corrections c
    where (c.corrected_at at time zone 'Asia/Manila')::date between from_m and to_end
    group by 1, 2
  ),
  k as (
    select due.u, due.m from due union select done.u, done.m from done union select prep.u, prep.m from prep
    union select kicks.u, kicks.m from kicks union select docs.u, docs.m from docs union select corr.u, corr.m from corr
  )
  select k.u, k.m,
         coalesce(due.n, 0), coalesce(due.ls, 0), coalesce(due.lc, 0),
         coalesce(prep.n, 0), coalesce(kicks.n, 0),
         coalesce(done.n, 0), done.days,
         coalesce(docs.n, 0), coalesce(corr.n, 0)
  from k
  join public.staff_profiles sp on sp.user_id = k.u
  left join due on due.u = k.u and due.m = k.m
  left join done on done.u = k.u and done.m = k.m
  left join prep on prep.u = k.u and prep.m = k.m
  left join kicks on kicks.u = k.u and kicks.m = k.m
  left join docs on docs.u = k.u and docs.m = k.m
  left join corr on corr.u = k.u and corr.m = k.m
  order by k.u, k.m;
end;
$$;

-- ---------------------------------------------------------------------------
-- OCR correction rate by client and document type: of the documents OCR read
-- and staff approved since p_from, how many needed a correction.
-- ---------------------------------------------------------------------------
create or replace function public.ocr_correction_rates(p_from date)
returns table (client_id uuid, doc_type text, read_by_ocr int, corrected int, fields_corrected int)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.require_owner_scores();
  return query
    select d.client_id, d.doc_type, count(*)::int,
           count(*) filter (where c.n > 0)::int,
           coalesce(sum(c.n), 0)::int
    from public.extractions e
    join public.documents d on d.id = e.document_id
    cross join lateral (select count(*)::int as n from public.extraction_corrections x where x.document_id = e.document_id) c
    where e.approved_at is not null and (e.approved_at at time zone 'Asia/Manila')::date >= p_from
      and e.fields <> '{}'::jsonb
    group by 1, 2
    order by 1, 2;
end;
$$;

-- ---------------------------------------------------------------------------
-- Work waiting, per staff member (user_id null: no one assigned):
--  - documents: received or under review, for the client's preparers;
--  - returns:   prepared and waiting for review, for the client's reviewers.
-- oldest: when the oldest item started waiting.
-- ---------------------------------------------------------------------------
create or replace function public.work_queues()
returns table (user_id uuid, queue text, items int, oldest timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  perform private.require_owner_scores();
  return query
    select sa.user_id, 'documents'::text, count(distinct d.id)::int, min(d.created_at)
    from public.documents d
    left join public.staff_assignments sa on sa.client_id = d.client_id and sa.role = 'preparer'
    where d.status in ('received', 'under_review') and d.exception_status is null
    group by sa.user_id
    union all
    select sa.user_id, 'returns'::text, count(distinct fi.id)::int,
           min(coalesce((select max(e.created_at) from public.filing_events e
                         where e.filing_instance_id = fi.id and e.action = 'prepare'), fi.updated_at))
    from public.filing_instances fi
    left join public.staff_assignments sa on sa.client_id = fi.client_id and sa.role = 'reviewer'
    where fi.status = 'prepared'
    group by sa.user_id;
end;
$$;

revoke execute on function private.late_filing_causes(date, date, date) from public, anon;
revoke execute on function private.require_owner_scores() from public, anon;
revoke execute on function public.late_filings(date, date, date) from public, anon;
revoke execute on function public.client_scorecard(date, date, date) from public, anon;
revoke execute on function public.staff_scorecard(date, date, date) from public, anon;
revoke execute on function public.ocr_correction_rates(date) from public, anon;
revoke execute on function public.work_queues() from public, anon;
grant execute on function private.late_filing_causes(date, date, date) to authenticated;
grant execute on function private.require_owner_scores() to authenticated;
grant execute on function public.late_filings(date, date, date) to authenticated;
grant execute on function public.client_scorecard(date, date, date) to authenticated;
grant execute on function public.staff_scorecard(date, date, date) to authenticated;
grant execute on function public.ocr_correction_rates(date) to authenticated;
grant execute on function public.work_queues() to authenticated;
