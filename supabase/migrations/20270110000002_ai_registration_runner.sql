-- AI employees: what the Registration Runner reads (docs/AI-WORKFORCE.md §3, §6, §7.2).
--
-- The Registration Runner watches the firm's open registration cases (new businesses,
-- renewals, BIR updates, branches, closures, …): where each file is, how long it has sat
-- there, what is still missing; and it drafts the BIR registration form (1901 / 1903 /
-- 1905) and the requests to the client for people to accept. It changes nothing.
--
-- No table is opened to AI employees here. Two read-only functions hand it what its job
-- needs, only while it is switched on and allowed client data, only for its clients, and
-- only to the AI employee with key 'registration_runner' (another AI employee is refused):
--
--   * public.ai_registration_cases(): its clients' open cases with their steps (code,
--     office, label, status, order, the day done, when the status last changed), for the
--     routing slip worked out in src/lib/registration/steps.ts;
--   * public.ai_registration_case(case): one case with what the BIR form needs from the
--     client record (name, kind of taxpayer, TIN, RDO, registered address, fiscal year,
--     books, the tax types on its latest COR), each step with its reference number,
--     notes and the NAMES of the proof files on hand (not where they are stored: the
--     Runner never opens a file), and the requests already sent to the client on each step.
--
-- It cannot move a step, open or complete a case, attach a file or send a request: those
-- stay with staff (the existing functions check private.is_staff() / is_owner(), which an
-- AI employee never is). What it drafts goes through public.ai_save_draft()
-- (20270108000001) on the case, for staff on the client to accept or reject. Accepting
-- "requests to the client" lets a staff member send them, as that staff member, with the
-- existing public.create_client_request().

create or replace function private.ai_registration_caller() returns public.ai_employees
language sql stable security definer set search_path = '' as $$
  select e.* from public.ai_employees e
  where e.user_id = auth.uid() and e.enabled and e.client_data and e.key = 'registration_runner'
$$;

create or replace function public.ai_registration_cases() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_registration_caller();
  out jsonb;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Registration Runner can read registration cases' using errcode = '42501';
  end if;
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', k.id, 'kind', k.kind, 'period_year', k.period_year, 'effective_date', k.effective_date,
    'lgu', k.lgu, 'lgu_served', k.lgu_served, 'employer', k.employer, 'target_date', k.target_date,
    'opened_at', k.opened_at, 'details', k.details,
    'client_id', c.id, 'client_code', c.code, 'client_name', c.name, 'taxpayer_type', c.taxpayer_type,
    'steps', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', s.code, 'agency', s.agency, 'label', s.label, 'status', s.status, 'sort_order', s.sort_order,
        'done_on', s.done_on, 'status_changed_at', s.status_changed_at
      ) order by s.sort_order)
      from public.registration_steps s where s.case_id = k.id
    ), '[]'::jsonb)
  ) order by k.opened_at), '[]'::jsonb) into out
  from public.registration_cases k
  join public.clients c on c.id = k.client_id
  where k.status = 'open' and k.client_id = any (private.ai_client_ids());
  return out;
end;
$$;

create or replace function public.ai_registration_case(p_case uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare
  me public.ai_employees := private.ai_registration_caller();
  k public.registration_cases;
  out jsonb;
begin
  if me.user_id is null then
    raise exception 'Only the switched-on Registration Runner can read registration cases' using errcode = '42501';
  end if;
  select * into k from public.registration_cases where id = p_case;
  if k.id is null or not (k.client_id = any (private.ai_client_ids())) then
    raise exception 'No registration case % among your clients'' cases', p_case using errcode = '42501';
  end if;
  select jsonb_build_object(
    'id', k.id, 'kind', k.kind, 'status', k.status, 'period_year', k.period_year, 'effective_date', k.effective_date,
    'lgu', k.lgu, 'lgu_served', k.lgu_served, 'employer', k.employer, 'target_date', k.target_date,
    'opened_at', k.opened_at, 'details', k.details, 'notes', k.notes,
    'client', jsonb_build_object(
      'id', c.id, 'code', c.code, 'name', c.name, 'taxpayer_type', c.taxpayer_type, 'tin', c.tin, 'rdo_code', c.rdo_code,
      'registered_address', c.registered_address, 'fiscal_year_end_month', c.fiscal_year_end_month,
      'book_type', c.book_type, 'status', c.status,
      'tax_types', coalesce((
        select r.tax_types from public.client_registrations r where r.client_id = c.id order by r.created_at desc limit 1
      ), '[]'::jsonb),
      'registration_date', (select r.registration_date from public.client_registrations r where r.client_id = c.id order by r.created_at desc limit 1)
    ),
    'steps', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', s.id, 'code', s.code, 'agency', s.agency, 'label', s.label, 'reference_label', s.reference_label,
        'status', s.status, 'sort_order', s.sort_order, 'reference_no', s.reference_no, 'done_on', s.done_on,
        'notes', s.notes, 'status_changed_at', s.status_changed_at,
        'files', coalesce((
          select jsonb_agg(jsonb_build_object('file_name', f.file_name, 'mime_type', f.mime_type, 'added_on', f.created_at) order by f.created_at)
          from public.registration_step_files f where f.step_id = s.id
        ), '[]'::jsonb),
        'requests', coalesce((
          select jsonb_agg(jsonb_build_object('subject', q.subject, 'status', q.status, 'direction', q.direction, 'created_at', q.created_at) order by q.created_at)
          from public.client_requests q where q.registration_step_id = s.id
        ), '[]'::jsonb)
      ) order by s.sort_order)
      from public.registration_steps s where s.case_id = k.id
    ), '[]'::jsonb)
  ) into out
  from public.clients c where c.id = k.client_id;
  return out;
end;
$$;

revoke all on function private.ai_registration_caller() from public;
revoke all on function public.ai_registration_cases() from public;
revoke all on function public.ai_registration_case(uuid) from public;
grant execute on function private.ai_registration_caller() to authenticated;
grant execute on function public.ai_registration_cases() to authenticated;
grant execute on function public.ai_registration_case(uuid) to authenticated;
