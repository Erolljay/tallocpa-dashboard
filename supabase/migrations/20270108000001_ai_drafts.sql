-- AI employees, step 3 foundation: drafts (docs/AI-WORKFORCE.md §2, §7.2, §10).
--
-- An AI employee cannot change anything (step 1). What it prepares is saved as a DRAFT
-- for a person: a suggested document type and account, a duplicate warning, a note
-- for the client, an engagement or opening balances to set up. Staff who can see the
-- client accept or reject it in the app; accepting records the decision and never
-- applies anything by itself. Accepted / rejected drafts give each AI employee its
-- correction rate (Scores).
--
--   * AI employees add drafts only through public.ai_save_draft(): switched on, for a
--     client they may read (or no client), at most 64 kB. A newer draft of the same
--     kind on the same subject replaces (withdraws) its open predecessor.
--   * They read their own drafts; nothing else about drafts is open to them.
--   * Staff read the drafts of clients they can access (the Owner: all) and decide
--     them through public.decide_ai_draft(). AI employees cannot decide.

create table public.ai_drafts (
  id uuid primary key default gen_random_uuid(),
  ai_user_id uuid not null references public.ai_employees (user_id) on delete cascade,
  client_id uuid references public.clients (id) on delete cascade,
  -- What is suggested, e.g. 'document_suggestion', 'engagement', 'opening_balances'.
  kind text not null check (kind ~ '^[a-z][a-z0-9_]{1,40}$'),
  -- What it is about, e.g. ('documents', <id>); null for a draft about the client itself.
  subject_table text check (subject_table ~ '^[a-z][a-z0-9_]{1,60}$'),
  subject_id uuid,
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  -- The AI employee's short explanation for the reviewer.
  note text not null default '' check (length(note) <= 2000),
  status text not null default 'open' check (status in ('open', 'accepted', 'rejected', 'withdrawn')),
  created_at timestamptz not null default now(),
  decided_by uuid references auth.users (id),
  decided_at timestamptz,
  decision_note text check (length(decision_note) <= 1000),
  check ((subject_table is null) = (subject_id is null)),
  check ((status in ('accepted', 'rejected')) = (decided_by is not null))
);

create index ai_drafts_subject on public.ai_drafts (subject_table, subject_id) where status = 'open';
create index ai_drafts_client on public.ai_drafts (client_id, status);
create index ai_drafts_ai on public.ai_drafts (ai_user_id, created_at desc);
create trigger audit after insert or update or delete on public.ai_drafts for each row execute function private.audit();

alter table public.ai_drafts enable row level security;

create policy ai_drafts_staff_read on public.ai_drafts for select to authenticated
  using (private.is_owner() or (client_id is not null and private.is_staff() and private.can_access_client(client_id)));
create policy ai_drafts_self_read on public.ai_drafts for select to authenticated
  using (ai_user_id = auth.uid());

-- The only way an AI employee writes anything.
create or replace function public.ai_save_draft(
  p_kind text, p_client uuid, p_subject_table text, p_subject_id uuid, p_payload jsonb, p_note text
) returns public.ai_drafts
language plpgsql security definer set search_path = '' as $$
declare
  me uuid := auth.uid();
  d public.ai_drafts;
begin
  if not exists (select 1 from public.ai_employees where user_id = me and enabled) then
    raise exception 'Only a switched-on AI employee can save a draft' using errcode = '42501';
  end if;
  if p_client is not null and not (p_client = any (private.ai_client_ids())) then
    raise exception 'Not one of your clients' using errcode = '42501';
  end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' or octet_length(p_payload::text) > 65536 then
    raise exception 'The draft must be a JSON object of at most 64 kB' using errcode = '22023';
  end if;
  -- A newer draft of the same kind on the same subject replaces the open one.
  update public.ai_drafts set status = 'withdrawn'
  where ai_user_id = me and kind = p_kind and status = 'open'
    and client_id is not distinct from p_client
    and subject_table is not distinct from p_subject_table and subject_id is not distinct from p_subject_id;
  insert into public.ai_drafts (ai_user_id, client_id, kind, subject_table, subject_id, payload, note)
  values (me, p_client, p_kind, p_subject_table, p_subject_id, p_payload, coalesce(left(p_note, 2000), ''))
  returning * into d;
  return d;
end;
$$;

-- Staff accept or reject a draft. Accepting records the decision only: the person then
-- makes the change in the app, as always.
create or replace function public.decide_ai_draft(p_id uuid, p_accept boolean, p_note text default null)
returns public.ai_drafts
language plpgsql security definer set search_path = '' as $$
declare
  d public.ai_drafts;
begin
  select * into d from public.ai_drafts where id = p_id for update;
  if d.id is null then
    raise exception 'No such draft' using errcode = 'P0002';
  end if;
  if not (private.is_owner() or (d.client_id is not null and private.is_staff() and private.can_access_client(d.client_id))) then
    raise exception 'Only staff on this client can decide its drafts' using errcode = '42501';
  end if;
  if d.status <> 'open' then
    raise exception 'This draft was already %', d.status using errcode = '23514';
  end if;
  update public.ai_drafts
  set status = case when p_accept then 'accepted' else 'rejected' end,
      decided_by = auth.uid(), decided_at = now(), decision_note = nullif(btrim(coalesce(p_note, '')), '')
  where id = p_id
  returning * into d;
  return d;
end;
$$;

revoke all on function public.ai_save_draft(text, uuid, text, uuid, jsonb, text) from public;
revoke all on function public.decide_ai_draft(uuid, boolean, text) from public;
grant execute on function public.ai_save_draft(text, uuid, text, uuid, jsonb, text) to authenticated;
grant execute on function public.decide_ai_draft(uuid, boolean, text) to authenticated;

-- Staff see which AI employee prepared a draft (name, department); only the Owner
-- changes AI employees (step 1 policies).
create policy ai_employees_staff_read on public.ai_employees for select to authenticated
  using (private.is_staff());
