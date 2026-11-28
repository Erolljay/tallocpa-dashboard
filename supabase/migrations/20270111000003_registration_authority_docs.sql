-- The Registration Runner's authority documents (docs/AI-WORKFORCE.md §3; the Owner: "We
-- need to secure a secretary's certificate in order for us to have business in the BIR.
-- For an individual, only an SPA will be needed.").
--
-- public.ai_registration_case() (20270110000002) now also returns, for the one case the
-- Runner reads:
--   * the client's contacts by name and position only (no email, phone or login), so the
--     Secretary's Certificate can name the Corporate Secretary and a Partners' Certificate
--     the partners;
--   * the firm as it prints itself (legal name, trade name, business and registered
--     address from Settings → Brand), which every signed-in person can already read.
-- The firm's representative is never filled from the app (the Owner fills it per client).
-- Same gate as before (an enabled registration_runner with client data, its own clients
-- only); no table is opened to AI employees and nothing writes.

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
    -- For the authority document (20270111000003): the client's contacts by name and
    -- position only (the Corporate Secretary, the partners), and the firm as it prints itself.
    'contacts', coalesce((
      select jsonb_agg(jsonb_build_object('full_name', u.full_name, 'position', u.position, 'is_primary', u.is_primary) order by u.is_primary desc, u.full_name)
      from public.client_users u where u.client_id = c.id
    ), '[]'::jsonb),
    'firm', (
      select jsonb_build_object('legal_name', b.legal_name, 'display_name', b.display_name, 'business_address', b.business_address, 'registered_address', b.registered_address)
      from public.brands b where b.id = c.brand_id
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

revoke all on function public.ai_registration_case(uuid) from public;
grant execute on function public.ai_registration_case(uuid) to authenticated;
