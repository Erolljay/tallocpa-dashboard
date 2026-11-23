-- The Owner edits a client (spec §3.2): registration details, and the tax types
-- that decide which forms are filed. Changing the tax types records a new COR
-- registration, starts the new obligations and ends the ones that no longer apply
-- from the date the change took effect, all in one step.

create or replace function public.update_client_with_obligations(
  p_client_id uuid,
  p_client jsonb,
  -- null = the tax setup did not change.
  p_tax_types jsonb,
  p_effective_date date,
  -- [{form, frequency}] to start on p_effective_date.
  p_add jsonb,
  -- forms whose open obligation ends the day before p_effective_date.
  p_end text[]
) returns public.clients
language plpgsql security definer set search_path = '' as $$
declare
  c public.clients;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can edit clients' using errcode = '42501';
  end if;

  update public.clients set
    name = p_client ->> 'name',
    taxpayer_type = p_client ->> 'taxpayer_type',
    tin = nullif(p_client ->> 'tin', ''),
    rdo_code = nullif(p_client ->> 'rdo_code', ''),
    registered_address = nullif(p_client ->> 'registered_address', ''),
    fiscal_year_end_month = (p_client ->> 'fiscal_year_end_month')::smallint,
    filing_channel = p_client ->> 'filing_channel',
    efps_group = nullif(p_client ->> 'efps_group', ''),
    book_type = p_client ->> 'book_type',
    payment_mode = p_client ->> 'payment_mode',
    submission_cutoff_day = (p_client ->> 'submission_cutoff_day')::smallint
  where id = p_client_id
  returning * into c;
  if c.id is null then
    raise exception 'Client not found' using errcode = 'P0002';
  end if;

  if p_tax_types is not null then
    if p_effective_date is null then
      raise exception 'Enter the date the change took effect' using errcode = '22023';
    end if;

    insert into public.client_registrations (client_id, registration_date, tax_types)
    values (p_client_id, p_effective_date, p_tax_types);

    update public.obligations
    set end_date = p_effective_date - 1
    where client_id = p_client_id and end_date is null and form = any (coalesce(p_end, '{}'));

    -- Filings for periods after an obligation ended that nobody has started are no longer due.
    delete from public.filing_instances f
    using public.obligations o
    where f.obligation_id = o.id and o.client_id = p_client_id
      and o.end_date is not null and f.period_start > o.end_date
      and f.status = 'not_started';

    insert into public.obligations (client_id, form, frequency, start_date, created_from)
    select p_client_id, a ->> 'form', a ->> 'frequency', p_effective_date, 'cor'
    from jsonb_array_elements(coalesce(p_add, '[]'::jsonb)) as a;
  end if;

  return c;
end;
$$;

revoke execute on function public.update_client_with_obligations(uuid, jsonb, jsonb, date, jsonb, text[]) from public, anon;
grant execute on function public.update_client_with_obligations(uuid, jsonb, jsonb, date, jsonb, text[]) to authenticated;
