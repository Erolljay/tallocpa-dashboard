-- Employer numbers from the registration steps (Owner, 27 Nov 2026).
--
-- When a case that registers an employer is completed (employer registration, or a new
-- business that registers an employer), each finished SSS, PhilHealth and Pag-IBIG
-- employer step puts its reference number on the client as that agency's employer
-- number (client_employer_numbers), with the month the step was done as the first month
-- with employees. Staff no longer type them again on the client.
--
-- A finished employer step needs its number before the case is completed. A number the
-- client already has for that agency is kept (it is not overwritten); staff change it on
-- the client. Whether the firm remits the contributions stays the Owner's switch on the
-- client ("We handle this client's SSS, PhilHealth and Pag-IBIG").

create or replace function private.registration_employer_numbers() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  s record;
begin
  if new.status <> 'completed' or old.status = 'completed'
     or not (new.kind = 'employer' or (new.kind = 'new_business' and new.employer)) then
    return new;
  end if;
  for s in
    select st.code, st.label, st.reference_label, btrim(coalesce(st.reference_no, '')) as number, st.done_on,
           case st.code when 'sss_employer' then 'sss' when 'philhealth_employer' then 'philhealth' else 'pagibig' end as agency
    from public.registration_steps st
    where st.case_id = new.id and st.status = 'done'
      and st.code in ('sss_employer', 'philhealth_employer', 'pagibig_employer')
  loop
    if s.number = '' then
      raise exception 'Enter the % on the step "%" before completing', coalesce(s.reference_label, 'employer number'), s.label
        using errcode = '22023';
    end if;
    if length(s.number) > 40 then
      raise exception 'The % is too long (40 characters at most)', coalesce(s.reference_label, 'employer number') using errcode = '22023';
    end if;
    insert into public.client_employer_numbers (client_id, agency, employer_number, start_month)
    values (new.client_id, s.agency, s.number, date_trunc('month', s.done_on)::date)
    on conflict (client_id, agency) do nothing;
  end loop;
  return new;
end;
$$;
create trigger employer_numbers before update of status on public.registration_cases
  for each row execute function private.registration_employer_numbers();

revoke execute on function private.registration_employer_numbers() from public, anon, authenticated;
