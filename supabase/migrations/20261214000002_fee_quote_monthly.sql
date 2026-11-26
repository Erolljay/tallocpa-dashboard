-- Fee schedule: monthly quotes, one bookkeeping component, annual and ad hoc jobs
-- (spec §3.12, Appendix A; Owner's decisions of 26 Nov 2026).
--
-- The Owner's decisions:
--  - Bookkeeping and document volume are one component: F, "Bookkeeping, by
--    documents a month" (≤50 / 51–150 / 151–300 / 301+ on request), a flat add-on
--    for inventory, manufacturing or construction (once even if several apply) and
--    a charge per branch. The former G (bookkeeping by level) is retired.
--  - The quote is monthly only: the monthly retainer, tax on the fee, the EWT note,
--    and backlog catch-up as a one-time line (months behind × catch_up_factor ×
--    monthly retainer; 0.5 = half). Above monthly_cap the quote shows no price: the
--    business is quoted on request in the proposal.
--  - Annual jobs (billing 'annual': annual ITR with AFS, 1604-C, 1604-E, SAWT,
--    inventory list, audit) and ad hoc jobs (billing 'one_time': ORUS, permits, SEC,
--    closure, amended returns, certificates, BIR audit support, AUP, CAS …) are not
--    on the quote. The proposal prices them in their own sections. Their price in a
--    schedule is optional (it fills in the proposal), so activation no longer needs it.
--  - Jobs can be priced by annual gross sales with an annual_sales range condition
--    (the audit of financial statements, quoted and contracted separately by the
--    firm). The annual ITR with AFS (preparation) is flat by taxpayer type.
--
-- Existing schedules:
--  - Drafts are moved to the new structure. Prices that map one for one are kept:
--    the per-branch charge (G → F), the catch-up factor (item I.backlog_month →
--    the schedule's catch_up_factor) and the annual return with AFS (H.afs_itr →
--    individual, partnership and corporation, each at its price). Prices that do not map
--    (document-volume bands, which now carry the whole bookkeeping fee, and G's
--    levels and factors) are cleared or removed, and every one of them is written
--    in the schedule's notes and kept in the audit log: no price is lost silently.
--  - Active and retired schedules are not changed: they never change (the guard of
--    20261123000014). The app reads them; a quote from one with G is flagged as
--    outdated and is not sent to prospects. The Owner starts a new version, which
--    the app moves to the new structure the same way (src/lib/fees/template.ts
--    upgradeLegacyItems), prices it and activates it.
--  - The Owner's prices of 26 Nov 2026 are added as a new DRAFT for brand TC. It is
--    not activated: the Owner reviews and activates it in Settings → Fee schedule.
--  - proposals.first_year_total is no longer filled (0 for new proposals).

alter table public.fee_schedules
  add column monthly_cap numeric(18, 2) check (monthly_cap >= 0),
  add column catch_up_factor numeric(6, 2) check (catch_up_factor > 0 and catch_up_factor <= 10);
comment on column public.fee_schedules.monthly_cap is 'Above this monthly retainer the quote shows no price; the business is quoted on request in the proposal. Null = no cap.';
comment on column public.fee_schedules.catch_up_factor is 'Backlog catch-up per month behind, as a share of the monthly retainer (0.5 = half). Null = catch-up on request.';

comment on column public.proposals.first_year_total is 'Not filled since 26 Nov 2026 (quotes are monthly; annual and ad hoc jobs are listed separately in the proposal). Older proposals keep theirs.';

-- ---------------------------------------------------------------------------
-- Activation: annual and ad hoc jobs no longer need a price.
-- ---------------------------------------------------------------------------
create or replace function private.fee_schedules_guard() returns trigger
language plpgsql set search_path = '' as $$
declare
  missing text;
  item_count int;
  current_from date;
begin
  if tg_op = 'INSERT' then
    if new.status <> 'draft' then
      raise exception 'A new fee schedule starts as a draft' using errcode = '22023';
    end if;
    new.activated_at := null;
    new.activated_by := null;
    new.retired_at := null;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.status <> 'draft' then
      raise exception 'Only a draft fee schedule can be deleted; this one is %', old.status using errcode = '22023';
    end if;
    return old;
  end if;

  if new.brand_id <> old.brand_id then
    raise exception 'A fee schedule cannot move to another brand' using errcode = '22023';
  end if;

  if old.status = 'retired' then
    raise exception 'A retired fee schedule cannot be changed' using errcode = '22023';
  end if;

  if old.status = 'active' then
    -- The only change allowed: retiring it (done when the next version is activated).
    if new.status <> 'retired'
       or (to_jsonb(new) - 'status' - 'retired_at' - 'updated_at') <> (to_jsonb(old) - 'status' - 'retired_at' - 'updated_at') then
      raise exception 'An active fee schedule cannot be changed. Start a new version instead.' using errcode = '22023';
    end if;
    new.retired_at := now();
    return new;
  end if;

  -- old.status = 'draft'
  if new.status = 'retired' then
    raise exception 'A draft is not retired; delete it instead' using errcode = '22023';
  end if;

  if new.status = 'active' then
    select count(*),
           string_agg(i.label || coalesce(' (' || i.band_label || ')', ''), '; ' order by i.sort_order)
             filter (where i.price is null and not i.is_custom_quote and i.billing not in ('annual', 'one_time'))
      into item_count, missing
      from public.fee_items i where i.schedule_id = new.id;
    if item_count = 0 then
      raise exception 'This fee schedule has no items' using errcode = '22023';
    end if;
    if missing is not null then
      raise exception 'Set a price for every item before activating. Not priced yet: %', missing using errcode = '22023';
    end if;
    select s.effective_from into current_from
      from public.fee_schedules s where s.brand_id = new.brand_id and s.status = 'active' and s.id <> new.id;
    if found and new.effective_from <= current_from then
      raise exception 'The new version must take effect after the current one (%)', current_from using errcode = '22023';
    end if;
    update public.fee_schedules set status = 'retired'
      where brand_id = new.brand_id and status = 'active' and id <> new.id;
    new.activated_at := now();
    new.activated_by := auth.uid();
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- A new draft with its items in one step, now with the monthly cap, the catch-up
-- factor.
-- ---------------------------------------------------------------------------
create or replace function public.create_fee_schedule_draft(p_schedule jsonb, p_items jsonb)
returns uuid
language plpgsql set search_path = '' as $$
declare
  sid uuid;
begin
  if not private.is_owner() then
    raise exception 'Only the Owner can change the fee schedule' using errcode = '42501';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'A fee schedule needs at least one item' using errcode = '22023';
  end if;
  insert into public.fee_schedules (
    brand_id, name, effective_from, prices_include_tax, quote_valid_days,
    minimum_monthly_retainer, late_surcharge_amount, late_surcharge_auto, monthly_cap, catch_up_factor, notes
  ) values (
    (p_schedule ->> 'brand_id')::uuid,
    p_schedule ->> 'name',
    (p_schedule ->> 'effective_from')::date,
    coalesce((p_schedule ->> 'prices_include_tax')::boolean, true),
    coalesce((p_schedule ->> 'quote_valid_days')::smallint, 30),
    (p_schedule ->> 'minimum_monthly_retainer')::numeric,
    (p_schedule ->> 'late_surcharge_amount')::numeric,
    coalesce((p_schedule ->> 'late_surcharge_auto')::boolean, false),
    (p_schedule ->> 'monthly_cap')::numeric,
    (p_schedule ->> 'catch_up_factor')::numeric,
    p_schedule ->> 'notes'
  ) returning id into sid;

  insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, conditions, sort_order)
  select sid, i ->> 'code', i ->> 'component', i ->> 'label', i ->> 'band_label', i ->> 'billing',
         (i ->> 'price')::numeric, coalesce((i ->> 'is_custom_quote')::boolean, false), i ->> 'unit_label', coalesce(i -> 'conditions', '{}'::jsonb), coalesce((i ->> 'sort_order')::int, n::int * 10)
  from jsonb_array_elements(p_items) with ordinality as t (i, n);
  return sid;
end;
$$;

-- ---------------------------------------------------------------------------
-- The structure of src/lib/fees/template.ts on 26 Nov 2026, for this migration only.
-- ---------------------------------------------------------------------------
create temporary table fee_template_20261126 (
  code text primary key, component text, label text, band_label text, billing text,
  is_custom_quote boolean, unit_label text, conditions jsonb, sort_order int
);

insert into fee_template_20261126 values
  ('A.individual', 'A', 'Base', 'Individual', 'monthly', false, null, '{"taxpayer_types":["individual"]}'::jsonb, 10),
  ('A.corporate', 'A', 'Base', 'Corporation, OPC or partnership', 'monthly', false, null, '{"taxpayer_types":["opc","partnership","corporation"]}'::jsonb, 20),
  ('A.non_stock', 'A', 'Base', 'Non-stock, non-profit', 'monthly', false, null, '{"taxpayer_types":["non_stock"]}'::jsonb, 30),
  ('B.individual', 'B', 'VAT returns', 'Individual', 'monthly', false, null, '{"vat":true,"taxpayer_types":["individual"]}'::jsonb, 40),
  ('B.non_individual', 'B', 'VAT returns', 'Non-individual', 'monthly', false, null, '{"vat":true,"taxpayer_types":["opc","partnership","corporation","non_stock"]}'::jsonb, 50),
  ('C.rental', 'C', 'Expanded withholding', 'Rental only', 'monthly', false, null, '{"ewt":"rental"}'::jsonb, 60),
  ('C.regular', 'C', 'Expanded withholding', 'TAMP or regular', 'monthly', false, null, '{"ewt":"tamp_regular"}'::jsonb, 70),
  ('D.1-9', 'D', 'Payroll withholding (1601-C)', '1–9 employees', 'monthly', false, null, '{"employees":{"min":1,"max":9}}'::jsonb, 80),
  ('D.10-29', 'D', 'Payroll withholding (1601-C)', '10–29 employees', 'monthly', false, null, '{"employees":{"min":10,"max":29}}'::jsonb, 90),
  ('D.30-49', 'D', 'Payroll withholding (1601-C)', '30–49 employees', 'monthly', false, null, '{"employees":{"min":30,"max":49}}'::jsonb, 100),
  ('D.50plus', 'D', 'Payroll withholding (1601-C)', '50 or more employees', 'monthly', true, null, '{"employees":{"min":50,"max":null}}'::jsonb, 110),
  ('E.1-9', 'E', 'SSS, PhilHealth, Pag-IBIG', '1–9 employees', 'monthly', false, null, '{"remits_contributions":true,"employees":{"min":1,"max":9}}'::jsonb, 120),
  ('E.10-29', 'E', 'SSS, PhilHealth, Pag-IBIG', '10–29 employees', 'monthly', false, null, '{"remits_contributions":true,"employees":{"min":10,"max":29}}'::jsonb, 130),
  ('E.30-49', 'E', 'SSS, PhilHealth, Pag-IBIG', '30–49 employees', 'monthly', false, null, '{"remits_contributions":true,"employees":{"min":30,"max":49}}'::jsonb, 140),
  ('E.50plus', 'E', 'SSS, PhilHealth, Pag-IBIG', '50 or more employees', 'monthly', true, null, '{"remits_contributions":true,"employees":{"min":50,"max":null}}'::jsonb, 150),
  ('F.0-50', 'F', 'Bookkeeping, by documents a month', 'Up to 50 a month', 'monthly', false, null, '{"documents":{"min":0,"max":50}}'::jsonb, 160),
  ('F.51-150', 'F', 'Bookkeeping, by documents a month', '51–150 a month', 'monthly', false, null, '{"documents":{"min":51,"max":150}}'::jsonb, 170),
  ('F.151-300', 'F', 'Bookkeeping, by documents a month', '151–300 a month', 'monthly', false, null, '{"documents":{"min":151,"max":300}}'::jsonb, 180),
  ('F.301plus', 'F', 'Bookkeeping, by documents a month', '301 or more a month', 'monthly', true, null, '{"documents":{"min":301,"max":null}}'::jsonb, 190),
  ('F.complexity', 'F', 'Bookkeeping add-on', 'Inventory, manufacturing or construction', 'monthly', false, null, '{"complexity":"any"}'::jsonb, 200),
  ('F.per_branch', 'F', 'Bookkeeping', 'Each branch', 'per_unit_monthly', false, 'branch', '{"per":"branch"}'::jsonb, 210),
  ('H.itr_afs_individual', 'H', 'Annual ITR with AFS (preparation)', 'Individual', 'annual', false, null, '{"taxpayer_types":["individual"]}'::jsonb, 220),
  ('H.itr_afs_partnership', 'H', 'Annual ITR with AFS (preparation)', 'Partnership', 'annual', false, null, '{"taxpayer_types":["partnership"]}'::jsonb, 230),
  ('H.itr_afs_corporation', 'H', 'Annual ITR with AFS (preparation)', 'Corporation, OPC or non-stock', 'annual', false, null, '{"taxpayer_types":["corporation","opc","non_stock"]}'::jsonb, 240),
  ('H.1604c', 'H', 'Annual information return 1604-C', null, 'annual', false, null, '{"employees":{"min":1,"max":null}}'::jsonb, 250),
  ('H.1604e', 'H', 'Annual information return 1604-E', null, 'annual', false, null, '{"ewt":"any"}'::jsonb, 260),
  ('H.sawt', 'H', 'Summary alphalist of withholding taxes (SAWT)', null, 'annual', false, null, '{}'::jsonb, 270),
  ('H.inventory_list', 'H', 'Inventory list', null, 'annual', false, null, '{"complexity":"inventory"}'::jsonb, 280),
  ('H.audit_proprietor_0-3m', 'H', 'Audit of financial statements', 'Single proprietor · sales up to ₱3M', 'annual', false, null, '{"taxpayer_types":["individual"],"annual_sales":{"min":0,"max":3000000}}'::jsonb, 290),
  ('H.audit_proprietor_3m-10m', 'H', 'Audit of financial statements', 'Single proprietor · sales over ₱3M to ₱10M', 'annual', false, null, '{"taxpayer_types":["individual"],"annual_sales":{"min":3000001,"max":10000000}}'::jsonb, 300),
  ('H.audit_proprietor_10m-20m', 'H', 'Audit of financial statements', 'Single proprietor · sales over ₱10M to ₱20M', 'annual', false, null, '{"taxpayer_types":["individual"],"annual_sales":{"min":10000001,"max":20000000}}'::jsonb, 310),
  ('H.audit_proprietor_20m-50m', 'H', 'Audit of financial statements', 'Single proprietor · sales over ₱20M to ₱50M', 'annual', false, null, '{"taxpayer_types":["individual"],"annual_sales":{"min":20000001,"max":50000000}}'::jsonb, 320),
  ('H.audit_proprietor_50m-100m', 'H', 'Audit of financial statements', 'Single proprietor · sales over ₱50M to ₱100M', 'annual', false, null, '{"taxpayer_types":["individual"],"annual_sales":{"min":50000001,"max":100000000}}'::jsonb, 330),
  ('H.audit_proprietor_100mplus', 'H', 'Audit of financial statements', 'Single proprietor · sales over ₱100M', 'annual', true, null, '{"taxpayer_types":["individual"],"annual_sales":{"min":100000001,"max":null}}'::jsonb, 340),
  ('H.audit_partnership_0-3m', 'H', 'Audit of financial statements', 'Partnership · sales up to ₱3M', 'annual', false, null, '{"taxpayer_types":["partnership"],"annual_sales":{"min":0,"max":3000000}}'::jsonb, 350),
  ('H.audit_partnership_3m-10m', 'H', 'Audit of financial statements', 'Partnership · sales over ₱3M to ₱10M', 'annual', false, null, '{"taxpayer_types":["partnership"],"annual_sales":{"min":3000001,"max":10000000}}'::jsonb, 360),
  ('H.audit_partnership_10m-20m', 'H', 'Audit of financial statements', 'Partnership · sales over ₱10M to ₱20M', 'annual', false, null, '{"taxpayer_types":["partnership"],"annual_sales":{"min":10000001,"max":20000000}}'::jsonb, 370),
  ('H.audit_partnership_20m-50m', 'H', 'Audit of financial statements', 'Partnership · sales over ₱20M to ₱50M', 'annual', false, null, '{"taxpayer_types":["partnership"],"annual_sales":{"min":20000001,"max":50000000}}'::jsonb, 380),
  ('H.audit_partnership_50m-100m', 'H', 'Audit of financial statements', 'Partnership · sales over ₱50M to ₱100M', 'annual', false, null, '{"taxpayer_types":["partnership"],"annual_sales":{"min":50000001,"max":100000000}}'::jsonb, 390),
  ('H.audit_partnership_100mplus', 'H', 'Audit of financial statements', 'Partnership · sales over ₱100M', 'annual', true, null, '{"taxpayer_types":["partnership"],"annual_sales":{"min":100000001,"max":null}}'::jsonb, 400),
  ('H.audit_corporation_0-3m', 'H', 'Audit of financial statements', 'Corporation, OPC or non-stock · sales up to ₱3M', 'annual', false, null, '{"taxpayer_types":["corporation","opc","non_stock"],"annual_sales":{"min":0,"max":3000000}}'::jsonb, 410),
  ('H.audit_corporation_3m-10m', 'H', 'Audit of financial statements', 'Corporation, OPC or non-stock · sales over ₱3M to ₱10M', 'annual', false, null, '{"taxpayer_types":["corporation","opc","non_stock"],"annual_sales":{"min":3000001,"max":10000000}}'::jsonb, 420),
  ('H.audit_corporation_10m-20m', 'H', 'Audit of financial statements', 'Corporation, OPC or non-stock · sales over ₱10M to ₱20M', 'annual', false, null, '{"taxpayer_types":["corporation","opc","non_stock"],"annual_sales":{"min":10000001,"max":20000000}}'::jsonb, 430),
  ('H.audit_corporation_20m-50m', 'H', 'Audit of financial statements', 'Corporation, OPC or non-stock · sales over ₱20M to ₱50M', 'annual', false, null, '{"taxpayer_types":["corporation","opc","non_stock"],"annual_sales":{"min":20000001,"max":50000000}}'::jsonb, 440),
  ('H.audit_corporation_50m-100m', 'H', 'Audit of financial statements', 'Corporation, OPC or non-stock · sales over ₱50M to ₱100M', 'annual', false, null, '{"taxpayer_types":["corporation","opc","non_stock"],"annual_sales":{"min":50000001,"max":100000000}}'::jsonb, 450),
  ('H.audit_corporation_100mplus', 'H', 'Audit of financial statements', 'Corporation, OPC or non-stock · sales over ₱100M', 'annual', true, null, '{"taxpayer_types":["corporation","opc","non_stock"],"annual_sales":{"min":100000001,"max":null}}'::jsonb, 460),
  ('I.orus', 'I', 'ORUS and BIR registration updates', null, 'one_time', false, null, '{}'::jsonb, 470),
  ('I.business_permit', 'I', 'Business permit renewal (Iloilo City)', 'Only in Iloilo City for now', 'one_time', false, null, '{}'::jsonb, 480),
  ('I.sec', 'I', 'SEC filings', 'GIS, AFS submission', 'one_time', false, null, '{"taxpayer_types":["opc","partnership","corporation","non_stock"]}'::jsonb, 490),
  ('I.closure', 'I', 'Closure of business', null, 'one_time', false, null, '{}'::jsonb, 500),
  ('I.registration_individual', 'I', 'New business registration', 'Individual · BIR and SEC only; LGU permit and others separate', 'one_time', false, null, '{"taxpayer_types":["individual"]}'::jsonb, 510),
  ('I.registration_non_individual', 'I', 'New business registration', 'Corporation, OPC or partnership · BIR and SEC only; LGU permit and others separate', 'one_time', false, null, '{"taxpayer_types":["opc","partnership","corporation","non_stock"]}'::jsonb, 520),
  ('I.sss_registration', 'I', 'SSS registration', 'Employer', 'one_time', false, null, '{"employees":{"min":1,"max":null}}'::jsonb, 530),
  ('I.philhealth_registration', 'I', 'PhilHealth registration', 'Employer', 'one_time', false, null, '{"employees":{"min":1,"max":null}}'::jsonb, 540),
  ('I.pagibig_registration', 'I', 'Pag-IBIG (HDMF) registration', 'Employer', 'one_time', false, null, '{"employees":{"min":1,"max":null}}'::jsonb, 550),
  ('I.amended_return', 'I', 'Amended return', 'Per return', 'one_time', true, null, '{}'::jsonb, 560),
  ('I.certificate', 'I', 'BIR certificate or clearance', 'e.g. tax clearance', 'one_time', true, null, '{}'::jsonb, 570),
  ('K.bir_audit_support', 'K', 'BIR audit / LOA support', null, 'one_time', true, null, '{}'::jsonb, 580),
  ('K.aup', 'K', 'Agreed-upon procedures', null, 'one_time', true, null, '{}'::jsonb, 590),
  ('K.cas', 'K', 'CAS implementation', 'Computerized accounting system', 'one_time', true, null, '{}'::jsonb, 600),
  ('K.systems_implementation', 'K', 'Systems implementation', null, 'one_time', true, null, '{}'::jsonb, 610),
  ('K.ai_automation', 'K', 'AI and business automation', null, 'one_time', true, null, '{}'::jsonb, 620)
;

-- ---------------------------------------------------------------------------
-- Drafts move to the new structure (active and retired schedules never change).
-- ---------------------------------------------------------------------------
do $$
declare
  s record;
  earlier text;
  backlog numeric;
  afs public.fee_items;
begin
  for s in select id from public.fee_schedules where status = 'draft' order by created_at loop
    -- Prices that do not map one for one, for the notes.
    select string_agg(
             i.label || ' (' || coalesce(i.band_label, i.code) || ') ' ||
             case when i.billing = 'multiplier' then '× ' || i.price::text else '₱' || to_char(i.price, 'FM999,999,999,990.00') end,
             '; ' order by i.sort_order)
      into earlier
      from public.fee_items i
     where i.schedule_id = s.id and i.price is not null
       and ((i.component = 'F' and i.conditions ? 'documents') or (i.component = 'G' and i.code <> 'G.per_branch'));

    -- Catch-up: the item's factor becomes the schedule's setting.
    select price into backlog from public.fee_items where schedule_id = s.id and code = 'I.backlog_month';
    if backlog is not null then
      if backlog <= 10 then
        update public.fee_schedules set catch_up_factor = backlog where id = s.id and catch_up_factor is null;
      else
        earlier := concat_ws('; ', earlier, 'Backlog catch-up (per month behind) × ' || backlog::text);
      end if;
    end if;
    delete from public.fee_items where schedule_id = s.id and code = 'I.backlog_month';

    -- The per-branch charge keeps its price under F.
    update public.fee_items set code = 'F.per_branch', component = 'F'
     where schedule_id = s.id and code = 'G.per_branch'
       and not exists (select 1 from public.fee_items x where x.schedule_id = s.id and x.code = 'F.per_branch');
    delete from public.fee_items where schedule_id = s.id and component = 'G';

    -- The annual return with AFS becomes three items by taxpayer type, each at its price.
    select * into afs from public.fee_items where schedule_id = s.id and code = 'H.afs_itr';
    if afs.id is not null then
      insert into public.fee_items (schedule_id, code, component, label, billing, price)
      select s.id, c, 'H', afs.label, 'annual', afs.price
        from unnest(array['H.itr_afs_individual', 'H.itr_afs_partnership', 'H.itr_afs_corporation']) as c
       where not exists (select 1 from public.fee_items x where x.schedule_id = s.id and x.code = c);
      delete from public.fee_items where id = afs.id;
    end if;

    -- The audit is now priced by sales band (H.audit_*); K.fs_audit never had a price (on request).
    delete from public.fee_items where schedule_id = s.id and code = 'K.fs_audit' and price is null;

    -- The bands now carry the whole bookkeeping fee: priced again by the Owner.
    update public.fee_items set price = null
     where schedule_id = s.id and component = 'F' and conditions ? 'documents' and price is not null;

    -- Labels, bands, billing and conditions follow the template for F, H, I and K.
    update public.fee_items i
       set label = t.label, band_label = t.band_label, billing = t.billing, unit_label = t.unit_label,
           conditions = t.conditions, sort_order = t.sort_order,
           is_custom_quote = t.is_custom_quote, price = case when t.is_custom_quote then null else i.price end
      from fee_template_20261126 t
     where i.schedule_id = s.id and i.code = t.code and t.component in ('F', 'H', 'I', 'K');
    insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, conditions, sort_order)
    select s.id, t.code, t.component, t.label, t.band_label, t.billing, null, t.is_custom_quote, t.unit_label, t.conditions, t.sort_order
      from fee_template_20261126 t
     where t.component in ('F', 'H', 'I', 'K')
       and not exists (select 1 from public.fee_items x where x.schedule_id = s.id and x.code = t.code);

    update public.fee_schedules
       set notes = concat_ws(E'\n\n', notes,
             '26 Nov 2026: moved to the new structure. Bookkeeping and document volume are one component (F, by documents a month) with a flat complexity add-on; set those prices again. Annual and ad hoc jobs are priced in the proposal.' ||
             coalesce(' Earlier prices: ' || earlier || '.', ''))
     where id = s.id;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- The Owner's prices of 26 Nov 2026, as a new DRAFT for brand TC (not activated).
-- The annual ITR with AFS (preparation) is flat by taxpayer type; the audit is
-- priced by taxpayer type and annual gross sales (OPC and non-stock at the
-- corporation price for both).
-- Quoted per request: 50 or more employees, 301 or more documents, audits of
-- sales over ₱100M, amended returns, certificates, BIR audit / LOA support, AUP,
-- CAS and systems work.
-- ---------------------------------------------------------------------------
do $$
declare
  b uuid;
  sid uuid;
  v_name constant text := '2027 schedule (Owner''s prices, 26 Nov 2026)';
begin
  select id into b from public.brands where code = 'TC';
  if b is null or exists (select 1 from public.fee_schedules where brand_id = b and fee_schedules.name = v_name) then
    return;
  end if;
  insert into public.fee_schedules (brand_id, name, effective_from, prices_include_tax, quote_valid_days, monthly_cap, catch_up_factor, notes)
  values (b, v_name, '2027-01-01', true, 30, 6000, 0.5,
          'The Owner''s prices of 26 Nov 2026 (bookkeeping and tax compliance market: ₱2,000–6,000 a month). Above ₱6,000 a month the business is quoted on request; catch-up at half the monthly retainer per month behind. ITR with AFS preparation flat by taxpayer type; the audit by sales band, quoted and contracted separately by the firm. Review, then activate.')
  returning id into sid;
  insert into public.fee_items (schedule_id, code, component, label, band_label, billing, price, is_custom_quote, unit_label, conditions, sort_order)
  select sid, t.code, t.component, t.label, t.band_label, t.billing,
         case when t.is_custom_quote then null else p.price end,
         t.is_custom_quote, t.unit_label, t.conditions, t.sort_order
    from fee_template_20261126 t
    left join (values
      ('A.individual', 1000), ('A.corporate', 1500), ('A.non_stock', 1500),
      ('B.individual', 500), ('B.non_individual', 1000),
      ('C.rental', 300), ('C.regular', 500),
      ('D.1-9', 300), ('D.10-29', 600), ('D.30-49', 1000),
      ('E.1-9', 300), ('E.10-29', 600), ('E.30-49', 1000),
      ('F.0-50', 1000), ('F.51-150', 1500), ('F.151-300', 2500),
      ('F.complexity', 500), ('F.per_branch', 500),
      ('H.itr_afs_individual', 5000), ('H.itr_afs_partnership', 7500), ('H.itr_afs_corporation', 10000),
      ('H.1604c', 1500), ('H.1604e', 1500), ('H.sawt', 500), ('H.inventory_list', 1000),
      ('H.audit_proprietor_0-3m', 8000), ('H.audit_proprietor_3m-10m', 12000), ('H.audit_proprietor_10m-20m', 16000), ('H.audit_proprietor_20m-50m', 24000), ('H.audit_proprietor_50m-100m', 28000),
      ('H.audit_partnership_0-3m', 12000), ('H.audit_partnership_3m-10m', 16000), ('H.audit_partnership_10m-20m', 24000), ('H.audit_partnership_20m-50m', 32000), ('H.audit_partnership_50m-100m', 40000),
      ('H.audit_corporation_0-3m', 16000), ('H.audit_corporation_3m-10m', 24000), ('H.audit_corporation_10m-20m', 32000), ('H.audit_corporation_20m-50m', 48000), ('H.audit_corporation_50m-100m', 56000),
      ('I.orus', 1500), ('I.business_permit', 3500), ('I.sec', 2000), ('I.closure', 20000),
      ('I.registration_individual', 8000), ('I.registration_non_individual', 12500),
      ('I.sss_registration', 1500), ('I.philhealth_registration', 1500), ('I.pagibig_registration', 1500)
    ) as p (code, price) on p.code = t.code;
end;
$$;

drop table fee_template_20261126;
