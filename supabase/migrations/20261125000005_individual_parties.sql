-- Individuals in the parties directory from OCR (Owner's request, 25 November 2026).
--
-- The BIR lists (SLS, SLP, QAP, SAWT) need an individual's last, first and middle
-- name in separate columns, and a business's registered name. OCR now reads
-- whether the other party is an individual (party_kind) and splits the name
-- (party_last_name, party_first_name, party_middle_name); the reviewer confirms
-- them. Until now a new TIN always became a non-individual party with OCR's whole
-- name as the registered name.
--
-- record_party_from_approval() now:
--  - creates a new TIN as an individual when the approved figures say so and give
--    a last and first name, else as a non-individual (as before);
--  - lets the latest approval change an unverified party that OCR created between
--    individual and non-individual, and fill an individual's name;
--  - never changes a verified party, and only fills blanks on one typed by staff.

create or replace function private.record_party_from_approval(p_document uuid, p_fields jsonb, p_approved_at timestamptz, p_actor uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  digits text := regexp_replace(coalesce(p_fields ->> 'party_tin', ''), '\D', '', 'g');
  v_name text := nullif(btrim(p_fields ->> 'party_name'), '');
  v_addr text := nullif(btrim(p_fields ->> 'party_address'), '');
  v_last text := nullif(btrim(p_fields ->> 'party_last_name'), '');
  v_first text := nullif(btrim(p_fields ->> 'party_first_name'), '');
  v_middle text := nullif(btrim(p_fields ->> 'party_middle_name'), '');
  v_person boolean;
  v_tin text;
  v_branch text;
  v_role text;
  v_seen date;
  d record;
  p public.parties;
begin
  if length(digits) < 9 or length(digits) > 14 or substr(digits, 1, 9) = '000000000' then return; end if;
  v_tin := substr(digits, 1, 3) || '-' || substr(digits, 4, 3) || '-' || substr(digits, 7, 3);
  v_branch := case when length(digits) > 9 then lpad(substr(digits, 10), 5, '0') else '00000' end;
  v_person := p_fields ->> 'party_kind' = 'individual' and v_last is not null and v_first is not null;

  select id, client_id, doc_type into d from public.documents where id = p_document;
  if d.id is null then return; end if;
  v_role := case d.doc_type
    when 'sales_invoice' then 'customer'
    when 'bir_2307_received' then 'customer'
    when 'purchase_receipt' then 'supplier'
    when 'bir_2307_issued' then 'supplier'
    when 'other' then case p_fields ->> 'doc_type' when 'sales_invoice' then 'customer' when 'purchase_receipt' then 'supplier' end
  end;
  if v_role is null then return; end if;

  v_seen := case when coalesce(p_fields ->> 'date', '') ~ '^\d{4}-\d{2}-\d{2}$' then (p_fields ->> 'date')::date
                 else (coalesce(p_approved_at, now()) at time zone 'Asia/Manila')::date end;

  select * into p from public.parties where tin = v_tin and branch_code = v_branch for update;
  if p.id is null then
    if v_person then
      insert into public.parties (tin, branch_code, kind, last_name, first_name, middle_name, registered_address, source, created_by)
      values (v_tin, v_branch, 'individual', v_last, v_first, v_middle, v_addr, 'ocr', p_actor)
      returning * into p;
    elsif v_name is not null and p_fields ->> 'party_kind' is distinct from 'individual' then
      insert into public.parties (tin, branch_code, kind, registered_name, registered_address, source, created_by)
      values (v_tin, v_branch, 'non_individual', v_name, v_addr, 'ocr', p_actor)
      returning * into p;
    else
      -- An individual without a last and first name is not guessed into the directory.
      return;
    end if;
  elsif p.verified_at is null then
    if v_person and (p.source = 'ocr' or (p.kind = 'individual' and p.last_name is null)) then
      update public.parties set kind = 'individual', registered_name = null, last_name = v_last, first_name = v_first, middle_name = v_middle
      where id = p.id and (kind, last_name, first_name, middle_name, registered_name)
        is distinct from ('individual', v_last, v_first, v_middle, null::text);
    elsif not v_person and p_fields ->> 'party_kind' = 'non_individual' and p.kind = 'individual' and p.source = 'ocr' and v_name is not null then
      update public.parties set kind = 'non_individual', registered_name = v_name, last_name = null, first_name = null, middle_name = null
      where id = p.id;
    elsif p.kind = 'non_individual' and v_name is not null and (p.source = 'ocr' or p.registered_name is null)
          and p.registered_name is distinct from v_name and p_fields ->> 'party_kind' is distinct from 'individual' then
      update public.parties set registered_name = v_name where id = p.id;
    end if;
    if v_addr is not null and (p.source = 'ocr' or p.registered_address is null) and p.registered_address is distinct from v_addr then
      update public.parties set registered_address = v_addr where id = p.id;
    end if;
  end if;

  insert into public.client_parties (client_id, party_id, role, first_seen, last_seen)
  values (d.client_id, p.id, v_role, v_seen, v_seen)
  on conflict (client_id, party_id) do update set
    role = case when public.client_parties.role = excluded.role then public.client_parties.role else 'both' end,
    first_seen = least(public.client_parties.first_seen, excluded.first_seen),
    last_seen = greatest(public.client_parties.last_seen, excluded.last_seen)
  where public.client_parties.role is distinct from (case when public.client_parties.role = excluded.role then public.client_parties.role else 'both' end)
     or public.client_parties.first_seen > excluded.first_seen
     or public.client_parties.last_seen < excluded.last_seen;
end;
$$;

revoke execute on function private.record_party_from_approval(uuid, jsonb, timestamptz, uuid) from public, anon, authenticated;
