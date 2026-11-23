-- Client onboarding (spec §3.2, §4.1): create a client with its COR tax types and
-- filing obligations in one transaction, and look up who is signed in.

-- Client codes: <brand code>-0001, <brand code>-0002, ...
create table public.client_code_counters (
  brand_id uuid primary key references public.brands (id),
  last_number integer not null default 0
);
alter table public.client_code_counters enable row level security;
-- No policies: only the security-definer function below touches it.

create or replace function private.next_client_code(p_brand uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare
  n integer;
  prefix text;
begin
  select code into prefix from public.brands where id = p_brand;
  if prefix is null then
    raise exception 'Unknown brand %', p_brand;
  end if;
  insert into public.client_code_counters (brand_id, last_number) values (p_brand, 1)
  on conflict (brand_id) do update set last_number = public.client_code_counters.last_number + 1
  returning last_number into n;
  return prefix || '-' || lpad(n::text, 4, '0');
end;
$$;

-- Creates a client, its COR registration and its obligations. Runs as the caller,
-- so row-level security applies: only the Owner can create clients.
-- p_client: client fields (see public.clients). p_tax_types: COR tax type codes.
-- p_obligations: [{ form, frequency, start_date }] worked out by the app from the tax types.
create or replace function public.create_client_with_obligations(
  p_client jsonb,
  p_tax_types jsonb,
  p_registration_date date,
  p_obligations jsonb
) returns public.clients
language plpgsql security invoker set search_path = '' as $$
declare
  c public.clients;
  brand uuid := (p_client ->> 'brand_id')::uuid;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can create clients' using errcode = '42501';
  end if;

  insert into public.clients (
    brand_id, code, name, taxpayer_type, tin, rdo_code, registered_address, fiscal_year_end_month,
    filing_channel, efps_group, book_type, payment_mode, submission_cutoff_day, status
  ) values (
    brand,
    private.next_client_code(brand),
    p_client ->> 'name',
    p_client ->> 'taxpayer_type',
    nullif(p_client ->> 'tin', ''),
    nullif(p_client ->> 'rdo_code', ''),
    nullif(p_client ->> 'registered_address', ''),
    coalesce((p_client ->> 'fiscal_year_end_month')::smallint, 12),
    coalesce(p_client ->> 'filing_channel', 'ebirforms'),
    nullif(p_client ->> 'efps_group', ''),
    coalesce(p_client ->> 'book_type', 'manual'),
    coalesce(p_client ->> 'payment_mode', 'client_pays_direct'),
    coalesce((p_client ->> 'submission_cutoff_day')::smallint, 5),
    'onboarding'
  ) returning * into c;

  insert into public.client_registrations (client_id, registration_date, tax_types)
  values (c.id, p_registration_date, coalesce(p_tax_types, '[]'::jsonb));

  insert into public.obligations (client_id, form, frequency, start_date, created_from)
  select c.id, o ->> 'form', o ->> 'frequency', (o ->> 'start_date')::date, 'cor'
  from jsonb_array_elements(coalesce(p_obligations, '[]'::jsonb)) as o;

  return c;
end;
$$;

grant execute on function public.create_client_with_obligations(jsonb, jsonb, date, jsonb) to authenticated;
grant execute on function private.next_client_code(uuid) to authenticated;

-- Who is signed in: staff role, or the clients a client user belongs to.
create or replace function public.current_identity() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'user_id', auth.uid(),
    'staff', (
      select jsonb_build_object('full_name', sp.full_name, 'role', sp.role, 'brand_id', sp.brand_id)
      from public.staff_profiles sp where sp.user_id = auth.uid() and sp.active
    ),
    'clients', coalesce((
      select jsonb_agg(jsonb_build_object('client_id', cu.client_id, 'full_name', cu.full_name, 'client_name', c.name))
      from public.client_users cu join public.clients c on c.id = cu.client_id
      where cu.user_id = auth.uid()
    ), '[]'::jsonb)
  )
$$;

grant execute on function public.current_identity() to authenticated;
