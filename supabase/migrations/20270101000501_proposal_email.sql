-- Emailing the proposal link to the prospect (Phase 2).
--
-- The Owner (or the lead's reviewer) sends the proposal from the lead page; the app
-- emails the link through Resend and then records it here: to whom, when, by whom,
-- and how many times. Only an open proposal (status 'sent', the latest one) can be
-- recorded: a replaced proposal stays unacceptable (accept_proposal refuses it).

alter table public.proposals
  add column emailed_at timestamptz,
  add column emailed_to text,
  add column emailed_by uuid references auth.users (id),
  add column emailed_count integer not null default 0 check (emailed_count >= 0);

comment on column public.proposals.emailed_at is 'When the proposal link was last emailed to the prospect (record_proposal_email).';
comment on column public.proposals.emailed_to is 'The address it was last emailed to.';
comment on column public.proposals.emailed_by is 'Who last emailed it.';
comment on column public.proposals.emailed_count is 'How many times it was emailed.';

/**
 * Records that the proposal link was emailed to p_to. Called by the app after
 * the email is sent. The Owner or the lead's reviewer; the proposal must still be
 * open, on a lead that is a Lead or Prospect. A Lead becomes a Prospect.
 */
create or replace function public.record_proposal_email(p_proposal uuid, p_to text) returns public.proposals
language plpgsql security definer set search_path = '' as $$
declare
  p public.proposals;
  l public.leads;
  v_to text := lower(btrim(coalesce(p_to, '')));
begin
  select * into p from public.proposals where id = p_proposal for update;
  if p.id is null then raise exception 'Proposal not found' using errcode = 'P0002'; end if;
  if not private.can_work_lead(p.lead_id) then raise exception 'Only the Owner or the lead''s reviewer can send proposals' using errcode = '42501'; end if;
  if v_to !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_to) > 320 then raise exception 'Enter a valid email address' using errcode = '22023'; end if;
  if p.status = 'withdrawn' then raise exception 'This proposal has been replaced; send the latest one' using errcode = '22023'; end if;
  if p.status = 'accepted' then raise exception 'This proposal has already been accepted' using errcode = '22023'; end if;
  select * into l from public.leads where id = p.lead_id for update;
  if l.stage not in ('lead', 'prospect') then raise exception 'This lead is no longer open for a proposal' using errcode = '22023'; end if;
  update public.proposals
    set emailed_at = now(), emailed_to = v_to, emailed_by = auth.uid(), emailed_count = emailed_count + 1
    where id = p.id
    returning * into p;
  if l.stage = 'lead' then update public.leads set stage = 'prospect' where id = l.id; end if;
  return p;
end;
$$;

revoke execute on function public.record_proposal_email(uuid, text) from public, anon;
grant execute on function public.record_proposal_email(uuid, text) to authenticated;
