-- Standing monthly requests: tell the client when they open (Owner, 27 Nov 2026).
--
-- One notice per client and month, listing everything that opened (the AR/AP update and
-- each bank statement) with the due date, not one per request: a client with three bank
-- accounts gets one bell entry and one email. It uses the same kind as any request from
-- the firm (request_from_firm), so it follows the client's email setting for requests.
-- A request opened later in the month (a new bank account, or a kind switched on) sends
-- its own notice for what is new.

create or replace function private.open_standing_requests(p_today date, p_client uuid default null, p_cycle uuid default null)
returns int
language plpgsql security definer set search_path = '' as $$
declare
  opened jsonb;
  g record;
begin
  with cycles as (
    select y.client_id, y.period, y.cutoff_date
    from public.document_cycles y
    join public.clients c on c.id = y.client_id and c.status = 'active'
    where y.closed_at is null and y.cutoff_date >= p_today
      and (p_client is null or y.client_id = p_client)
      and (p_cycle is null or y.id = p_cycle)
  ),
  wanted as (
    -- The AR/AP update.
    select y.client_id, y.period, y.cutoff_date, 'arap_update' as kind, '' as key,
           'AR/AP update for ' || to_char(y.period, 'FMMonth YYYY') as subject
    from cycles y join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'arap_update'
    union all
    -- Bank statements: the accounts staff listed.
    select y.client_id, y.period, y.cutoff_date, 'bank_statement', lower(btrim(a.name)),
           'Bank statement for ' || to_char(y.period, 'FMMonth YYYY') || ': ' || btrim(a.name)
    from cycles y
    join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'bank_statements'
    cross join lateral unnest(s.accounts) as a(name)
    where btrim(a.name) <> ''
    union all
    -- Else every active bank account in the books.
    select y.client_id, y.period, y.cutoff_date, 'bank_statement', l.id::text,
           'Bank statement for ' || to_char(y.period, 'FMMonth YYYY') || ': ' || l.name
    from cycles y
    join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'bank_statements' and cardinality(s.accounts) = 0
    join public.ledger_accounts l on l.client_id = y.client_id and l.control = 'bank' and l.active
    union all
    -- Else one request for every bank statement.
    select y.client_id, y.period, y.cutoff_date, 'bank_statement', '',
           'Bank statements for ' || to_char(y.period, 'FMMonth YYYY')
    from cycles y
    join public.client_standing_requests s on s.client_id = y.client_id and s.kind = 'bank_statements' and cardinality(s.accounts) = 0
    where not exists (select 1 from public.ledger_accounts l where l.client_id = y.client_id and l.control = 'bank' and l.active)
  ),
  ins as (
    -- Each goes to the client's preparer (not whoever switched it on), as every month after.
    insert into public.client_requests (client_id, direction, subject, due_date, standing_kind, period, standing_key, assigned_to)
    select distinct on (w.client_id, w.kind, w.period, w.key) w.client_id, 'to_client', w.subject, w.cutoff_date, w.kind, w.period, w.key,
           private.default_request_owner(w.client_id)
    from wanted w
    on conflict (client_id, standing_kind, period, standing_key) where standing_kind is not null do nothing
    returning client_id, period, due_date, standing_kind, subject
  )
  select coalesce(jsonb_agg(to_jsonb(ins)), '[]') into opened from ins;

  -- One notice per client and month for what just opened.
  for g in
    select (o ->> 'client_id')::uuid as client_id, (o ->> 'period')::date as period, min((o ->> 'due_date')::date) as due,
           count(*) filter (where o ->> 'standing_kind' = 'arap_update') as arap,
           count(*) filter (where o ->> 'standing_kind' = 'bank_statement') as banks,
           string_agg(o ->> 'subject', E'\n' order by o ->> 'standing_kind', o ->> 'subject') as lines
    from jsonb_array_elements(opened) o
    group by 1, 2
  loop
    perform private.notify(
      private.client_portal_ids(g.client_id), 'request_from_firm',
      'Tallo CPA needs your ' || to_char(g.period, 'FMMonth YYYY') || ' '
        || concat_ws(' and ',
             case when g.arap > 0 then 'AR/AP update' end,
             case when g.banks = 1 then 'bank statement' when g.banks > 1 then g.banks || ' bank statements' end),
      'Please upload by ' || to_char(g.due, 'FMMonth FMDD, YYYY') || E'.\n' || g.lines,
      '/portal/requests', g.client_id);
  end loop;

  return jsonb_array_length(opened);
end;
$$;
