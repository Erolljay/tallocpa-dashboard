-- In-app notifications and their emails (Owner, 26 November 2026).
--
-- Each event below writes one notification per person who should act or know, from a
-- trigger, so every way the event can happen (staff screen, portal, nightly job, public
-- page) is covered. The person who caused the event is not notified. The bell shows them
-- all; the email goes out unless the person turned that kind off in their settings.
--
--   Kind                         To                                   Event
--   return_ready_for_review      reviewer (else Owner)                preparer marks a return Prepared
--   return_for_client_approval   client's portal users                reviewer marks it Reviewed
--   return_ready_for_approval    Owner, acting approver               client approved (or a nil return reviewed)
--   return_sent_back             preparer                             sent back with a reason
--   return_client_query          assigned staff                       client asks a question instead of approving
--   return_query_answered        client's portal users                staff answer the question
--   return_approved              assigned staff                       Owner (or acting approver) approved: file it
--   return_filed                 client's portal users, Owner         Filed & paid
--   esubmission_result           assigned staff, Owner                BIR validation report in, or errors
--   unlock_requested             Owner, acting approver               reviewer asks to lock or unlock a month
--   unlock_decided               who asked                            the request approved or rejected
--   payment_proof_submitted      Owner                                client uploads proof of payment
--   payment_verified             client's portal users                Owner verified it
--   payment_rejected             client's portal users                Owner rejected it, with the reason
--   statement_issued             client's portal users                new statement of account
--   request_from_firm            client's portal users                firm sends a request or replies
--   request_from_client          assigned staff (else Owner)          client opens a request or replies
--   lead_new                     Owner                                inquiry from the website
--   discovery_call_booked        lead's reviewer, Owner               lead books a call on the booking page
--   client_meeting_booked        the staff member booked              client books a meeting from the portal
--
-- Emails: the app claims pending rows (claim_notification_emails), sends each through
-- Resend in the branded layout and records the result (finish_notification_email).

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in (
    'return_ready_for_review', 'return_for_client_approval', 'return_ready_for_approval', 'return_sent_back',
    'return_client_query', 'return_query_answered', 'return_approved', 'return_filed', 'esubmission_result',
    'unlock_requested', 'unlock_decided',
    'payment_proof_submitted', 'payment_verified', 'payment_rejected', 'statement_issued',
    'request_from_firm', 'request_from_client',
    'lead_new', 'discovery_call_booked', 'client_meeting_booked'
  )),
  title text not null,
  body text,
  -- A path inside the app (/app/... or /portal/...).
  href text check (href is null or href ~ '^/(app|portal)(/|$)'),
  client_id uuid references public.clients (id) on delete cascade,
  actor uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  -- pending → sending → sent | failed; skipped when the person turned this kind off.
  email_status text not null default 'pending' check (email_status in ('pending', 'sending', 'sent', 'skipped', 'failed')),
  email_attempts int not null default 0,
  email_claimed_at timestamptz,
  emailed_at timestamptz,
  email_error text
);
create index notifications_user_recent on public.notifications (user_id, created_at desc);
create index notifications_user_unread on public.notifications (user_id) where read_at is null;
create index notifications_email_queue on public.notifications (id) where email_status in ('pending', 'sending');

-- Email off for a kind; no row means on. The bell always shows every kind.
create table public.notification_preferences (
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  email boolean not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind)
);

alter table public.notifications enable row level security;
alter table public.notification_preferences enable row level security;
create policy notifications_own on public.notifications for select to authenticated using (user_id = auth.uid());
create policy notification_preferences_own on public.notification_preferences for select to authenticated using (user_id = auth.uid());
grant select on public.notifications, public.notification_preferences to authenticated;

-- ---------------------------------------------------------------------------
-- Recipients
-- ---------------------------------------------------------------------------
create or replace function private.owner_ids() returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(user_id), '{}') from public.staff_profiles where role = 'owner' and active
$$;

-- Active staff assigned to a client, in one role or both.
create or replace function private.client_staff_ids(p_client uuid, p_role text default null) returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(distinct a.user_id), '{}')
  from public.staff_assignments a
  join public.staff_profiles sp on sp.user_id = a.user_id and sp.active
  where a.client_id = p_client and (p_role is null or a.role = p_role)
$$;

create or replace function private.client_portal_ids(p_client uuid) returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(user_id), '{}') from public.client_users where client_id = p_client
$$;

-- The acting approver in force now (anyone's, not only the signed-in person's), within a tax due.
create or replace function private.acting_approver_ids(p_tax_due numeric default null) returns uuid[]
language sql stable security definer set search_path = '' as $$
  select coalesce(array_agg(d.delegate_user_id), '{}')
  from public.acting_approver_delegations d
  join public.staff_profiles sp on sp.user_id = d.delegate_user_id and sp.active and sp.role = 'reviewer'
  where d.ended_at is null and now() >= d.starts_at and now() < d.ends_at
    and (p_tax_due is null or d.max_tax_due is null or p_tax_due <= d.max_tax_due)
$$;

-- Writes the notification for each person, once, never to the person who caused it.
create or replace function private.notify(
  p_users uuid[], p_kind text, p_title text, p_body text, p_href text, p_client uuid
) returns void
language sql security definer set search_path = '' as $$
  insert into public.notifications (user_id, kind, title, body, href, client_id, actor, email_status)
  select u, p_kind, left(p_title, 300), left(p_body, 2000), p_href, p_client, auth.uid(),
         case when exists (
           select 1 from public.notification_preferences p where p.user_id = u and p.kind = p_kind and not p.email
         ) then 'skipped' else 'pending' end
  from (select distinct unnest(p_users) as u) t
  where u is not null and u is distinct from auth.uid()
$$;

create or replace function private.filing_label(f public.filing_instances) returns text
language sql immutable set search_path = '' as $$
  select f.form || ' ' || f.period_label || case when coalesce(f.amendment_no, 0) > 0 then ' (amended #' || f.amendment_no || ')' else '' end
$$;

-- ---------------------------------------------------------------------------
-- Returns: one trigger on the step log (advance_filing writes one row per step)
-- ---------------------------------------------------------------------------
create or replace function private.notify_filing_event() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  c text;
  label text;
  staff_href text := '/app/filings/' || new.filing_instance_id;
  preparers uuid[];
begin
  select * into f from public.filing_instances where id = new.filing_instance_id;
  if f.id is null then return null; end if;
  select name into c from public.clients where id = f.client_id;
  label := private.filing_label(f);

  case new.action
  when 'prepare' then
    perform private.notify(
      case when cardinality(private.client_staff_ids(f.client_id, 'reviewer')) > 0
           then private.client_staff_ids(f.client_id, 'reviewer') else private.owner_ids() end,
      'return_ready_for_review', c || ': ' || label || ' is ready for review',
      'The preparer marked it Prepared. Review the worksheet and mark it Reviewed, or send it back with a reason.',
      staff_href, f.client_id);
  when 'review' then
    if new.to_status = 'reviewed' then
      perform private.notify(private.client_portal_ids(f.client_id), 'return_for_client_approval',
        'Your ' || label || ' is ready for your approval',
        'Please review the figures and approve, or ask us a question. Due ' || to_char(f.due_date, 'FMMonth FMDD, YYYY') || '.',
        '/portal/returns', f.client_id);
    elsif new.to_status = 'client_approved' then
      perform private.notify(private.owner_ids() || private.acting_approver_ids(f.tax_due), 'return_ready_for_approval',
        c || ': ' || label || ' is ready for your approval',
        'A nil return, reviewed. It needs the final approval before filing.', staff_href, f.client_id);
    end if;
  when 'client_approve' then
    perform private.notify(private.owner_ids() || private.acting_approver_ids(f.tax_due), 'return_ready_for_approval',
      c || ': ' || label || ' is ready for your approval',
      'The client approved it' || coalesce(' (recorded with the note: ' || nullif(btrim(new.note), '') || ')', '') || '. It needs the final approval before filing.',
      staff_href, f.client_id);
  when 'kick_back' then
    preparers := private.client_staff_ids(f.client_id, 'preparer') || array(
      select e.actor from public.filing_events e
      where e.filing_instance_id = f.id and e.action = 'prepare' order by e.id desc limit 1);
    perform private.notify(preparers, 'return_sent_back', c || ': ' || label || ' was sent back',
      coalesce('Reason: ' || nullif(btrim(new.note), ''), 'Open the return to see what needs fixing.'), staff_href, f.client_id);
  when 'client_query' then
    perform private.notify(private.client_staff_ids(f.client_id), 'return_client_query',
      c || ' has a question on ' || label,
      coalesce(nullif(btrim(new.note), ''), nullif(btrim(f.open_query), ''), 'Open the return to answer it.'), staff_href, f.client_id);
  when 'answer_query' then
    perform private.notify(private.client_portal_ids(f.client_id), 'return_query_answered',
      'We answered your question on ' || label,
      coalesce(nullif(btrim(new.note), ''), 'Open the return to read our answer and approve it.'), '/portal/returns', f.client_id);
  when 'owner_approve' then
    perform private.notify(private.client_staff_ids(f.client_id), 'return_approved',
      c || ': ' || label || ' is approved, ready to file',
      'File and pay it, then record the filing reference. Due ' || to_char(f.due_date, 'FMMonth FMDD, YYYY') || '.', staff_href, f.client_id);
  when 'file' then
    perform private.notify(private.client_portal_ids(f.client_id), 'return_filed',
      'Your ' || label || ' has been filed',
      'The filed copy' || case when f.filing_reference is not null then ' (reference ' || f.filing_reference || ')' else '' end || ' is in your Returns.',
      '/portal/returns', f.client_id);
    perform private.notify(private.owner_ids(), 'return_filed', c || ': ' || label || ' filed',
      coalesce('Reference ' || f.filing_reference || '.', 'Filed & paid.'), staff_href, f.client_id);
  else
    null;
  end case;
  return null;
end;
$$;
create trigger notify after insert on public.filing_events
  for each row execute function private.notify_filing_event();

-- eSubmission: the BIR's validation report, or errors (by staff or the mailbox job).
create or replace function private.notify_esubmission() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  f public.filing_instances;
  c text;
begin
  if old.status is not distinct from new.status or new.status not in ('validated', 'errors') then return null; end if;
  select * into f from public.filing_instances where id = new.filing_instance_id;
  select name into c from public.clients where id = f.client_id;
  perform private.notify(private.client_staff_ids(f.client_id) || private.owner_ids(), 'esubmission_result',
    c || ': ' || private.filing_label(f) || case when new.status = 'validated' then ' eSubmission validated' else ' eSubmission came back with errors' end,
    case when new.status = 'validated' then 'The BIR''s validation report is in.'
         else coalesce('Errors: ' || nullif(btrim(new.result_note), ''), 'Fix the attachment and send it again.') end,
    '/app/filings/' || f.id, f.client_id);
  return null;
end;
$$;
create trigger notify after update of status on public.esubmissions
  for each row execute function private.notify_esubmission();

-- ---------------------------------------------------------------------------
-- Lock and unlock requests. Checked at commit: when the Owner asks, the same call
-- approves it, and there is nothing for anyone to decide.
-- ---------------------------------------------------------------------------
create or replace function private.notify_lock_request_created() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r public.books_lock_requests;
  c text;
begin
  select * into r from public.books_lock_requests where id = new.id;
  if r.id is null or r.status <> 'requested' then return null; end if;
  select name into c from public.clients where id = r.client_id;
  perform private.notify(private.owner_ids() || private.acting_approver_ids(), 'unlock_requested',
    c || ': ' || case when r.kind = 'unlock' then 'unlock' else 'lock' end || ' requested for ' || to_char(r.month, 'FMMonth YYYY'),
    coalesce('Reason: ' || nullif(btrim(r.reason), ''), null), '/app', r.client_id);
  return null;
end;
$$;
create constraint trigger notify_created after insert on public.books_lock_requests
  deferrable initially deferred for each row execute function private.notify_lock_request_created();

create or replace function private.notify_lock_request_decided() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  c text;
begin
  if old.status <> 'requested' or new.status not in ('approved', 'rejected') then return null; end if;
  select name into c from public.clients where id = new.client_id;
  perform private.notify(array[new.requested_by], 'unlock_decided',
    c || ': ' || to_char(new.month, 'FMMonth YYYY') || ' ' || new.kind || ' ' || new.status,
    coalesce('Note: ' || nullif(btrim(new.decision_note), ''), null),
    '/app/clients/' || new.client_id || '/books', new.client_id);
  return null;
end;
$$;
create trigger notify_decided after update of status on public.books_lock_requests
  for each row execute function private.notify_lock_request_decided();

-- ---------------------------------------------------------------------------
-- Payments and statements
-- ---------------------------------------------------------------------------
create or replace function private.notify_payment_proof() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  c text;
  amt text := to_char(new.amount, 'FM999,999,999,990.00');
begin
  select name into c from public.clients where id = new.client_id;
  if tg_op = 'INSERT' then
    perform private.notify(private.owner_ids(), 'payment_proof_submitted',
      c || ' sent proof of payment: ₱' || amt,
      'Paid on ' || to_char(new.paid_on, 'FMMonth FMDD, YYYY') || coalesce(', reference ' || nullif(btrim(new.reference), ''), '') || '. Verify it against the bank.',
      '/app/collections/' || new.client_id, new.client_id);
  elsif old.status is distinct from new.status and new.status = 'verified' then
    perform private.notify(private.client_portal_ids(new.client_id), 'payment_verified',
      'We received your payment of ₱' || amt, 'Thank you. Your statement is updated.', '/portal/billing', new.client_id);
  elsif old.status is distinct from new.status and new.status = 'rejected' then
    perform private.notify(private.client_portal_ids(new.client_id), 'payment_rejected',
      'We could not verify your payment of ₱' || amt,
      coalesce('Reason: ' || nullif(btrim(new.reject_reason), ''), 'Please check the proof you sent.') || ' You can send the proof again from Billing.',
      '/portal/billing', new.client_id);
  end if;
  return null;
end;
$$;
create trigger notify after insert or update of status on public.payment_proofs
  for each row execute function private.notify_payment_proof();

-- At commit, so the statement's items (added in the same billing run) are counted.
create or replace function private.notify_statement() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  s public.soas;
  total numeric;
begin
  select * into s from public.soas where id = new.id;
  if s.id is null then return null; end if;
  select coalesce(sum(amount), 0) into total from public.client_dues where soa_id = s.id;
  perform private.notify(private.client_portal_ids(s.client_id), 'statement_issued',
    'New statement of account: ₱' || to_char(total, 'FM999,999,999,990.00'),
    'Statement ' || s.reference || coalesce(', due ' || to_char(s.due_on, 'FMMonth FMDD, YYYY'), '') || '. Pay through any channel in Billing and upload the proof.',
    '/portal/billing/' || s.id, s.client_id);
  return null;
end;
$$;
create constraint trigger notify after insert on public.soas
  deferrable initially deferred for each row execute function private.notify_statement();

-- ---------------------------------------------------------------------------
-- Requests and tickets: each message notifies the other side.
-- ---------------------------------------------------------------------------
create or replace function private.notify_request_message() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  r public.client_requests;
  c text;
  first boolean;
  preview text := left(regexp_replace(coalesce(new.body, ''), '\s+', ' ', 'g'), 280);
begin
  select * into r from public.client_requests where id = new.request_id;
  if r.id is null then return null; end if;
  select name into c from public.clients where id = r.client_id;
  first := not exists (select 1 from public.client_request_messages m where m.request_id = r.id and m.id <> new.id);
  if new.from_firm then
    perform private.notify(private.client_portal_ids(r.client_id), 'request_from_firm',
      case when first then 'Tallo CPA needs something from you: ' else 'Tallo CPA replied: ' end || r.subject,
      nullif(preview, ''), '/portal/requests/' || r.id, r.client_id);
  else
    perform private.notify(
      case when cardinality(private.client_staff_ids(r.client_id)) > 0 then private.client_staff_ids(r.client_id) else private.owner_ids() end,
      'request_from_client',
      c || case when first and r.direction = 'from_client' then ' opened a request: ' else ' replied: ' end || r.subject,
      nullif(preview, ''), '/app/requests/' || r.id, r.client_id);
  end if;
  return null;
end;
$$;
create trigger notify after insert on public.client_request_messages
  for each row execute function private.notify_request_message();

-- ---------------------------------------------------------------------------
-- Leads and calendar
-- ---------------------------------------------------------------------------
create or replace function private.notify_lead() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- Test leads (while the website funnel is closed) and leads staff type in themselves stay quiet.
  if new.test or new.source <> 'website' then return null; end if;
  perform private.notify(private.owner_ids(), 'lead_new',
    'New inquiry: ' || coalesce(nullif(btrim(new.business_name), ''), new.contact_name, 'a new lead'),
    concat_ws(' · ', nullif(btrim(new.contact_name), ''), nullif(btrim(new.email), ''), nullif(btrim(new.mobile), '')),
    '/app/leads/' || new.id, null);
  return null;
end;
$$;
create trigger notify after insert on public.leads
  for each row execute function private.notify_lead();

-- A booking is confirmed once its calendar event exists (booking_confirm).
create or replace function private.notify_discovery_call() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  l public.leads;
begin
  if new.booked_via <> 'booking_page' or old.calendar_event_id is not null or new.calendar_event_id is null then return null; end if;
  select * into l from public.leads where id = new.lead_id;
  perform private.notify(array[new.host_user_id, l.reviewer_id] || private.owner_ids(), 'discovery_call_booked',
    'Discovery call booked: ' || coalesce(nullif(btrim(l.business_name), ''), l.contact_name),
    to_char(new.scheduled_at at time zone 'Asia/Manila', 'Dy, FMMonth FMDD, FMHH12:MI AM') || ' (Manila)' || coalesce(' · ' || l.contact_name, ''),
    '/app/leads/' || l.id, null);
  return null;
end;
$$;
create trigger notify after update of calendar_event_id on public.discovery_calls
  for each row execute function private.notify_discovery_call();

create or replace function private.notify_client_meeting() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  c text;
begin
  if old.calendar_event_id is not null or new.calendar_event_id is null or new.cancelled_at is not null then return null; end if;
  select name into c from public.clients where id = new.client_id;
  perform private.notify(array[new.staff_user_id], 'client_meeting_booked',
    c || ' booked a meeting with you',
    to_char(new.starts_at at time zone 'Asia/Manila', 'Dy, FMMonth FMDD, FMHH12:MI AM') || ' (Manila)' || coalesce(' · ' || nullif(btrim(new.topic), ''), ''),
    '/app/calendar', new.client_id);
  return null;
end;
$$;
create trigger notify after update of calendar_event_id on public.client_meetings
  for each row execute function private.notify_client_meeting();

-- ---------------------------------------------------------------------------
-- The person's own: read, preferences
-- ---------------------------------------------------------------------------
-- Marks the given notifications read, or all of the person's when none are given.
create or replace function public.mark_notifications_read(p_ids bigint[] default null) returns int
language plpgsql security definer set search_path = '' as $$
declare
  n int;
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  update public.notifications set read_at = now()
  where user_id = auth.uid() and read_at is null and (p_ids is null or id = any (p_ids));
  get diagnostics n = row_count;
  return n;
end;
$$;

create or replace function public.set_notification_email(p_kind text, p_email boolean) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  if p_kind is null or p_email is null then raise exception 'Choose a kind and on or off' using errcode = '22023'; end if;
  if p_email then
    delete from public.notification_preferences where user_id = auth.uid() and kind = p_kind;
  else
    insert into public.notification_preferences (user_id, kind, email) values (auth.uid(), p_kind, false)
    on conflict (user_id, kind) do update set email = false, updated_at = now();
  end if;
  -- Turning a kind off also stops its emails still waiting to go.
  if not p_email then
    update public.notifications set email_status = 'skipped'
    where user_id = auth.uid() and kind = p_kind and email_status = 'pending';
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- The email queue (server only)
-- ---------------------------------------------------------------------------
-- Claims up to p_limit emails to send. A claim left 'sending' for 10 minutes (a crashed
-- sender) is taken again; after 5 tries it fails. Emails older than 3 days are not sent:
-- by then the bell has told the person, and a late email would only confuse.
create or replace function public.claim_notification_emails(p_limit int default 25) returns table (
  id bigint, user_id uuid, email text, kind text, title text, body text, href text,
  client_id uuid, brand_id uuid, is_staff boolean, created_at timestamptz
)
language plpgsql security definer set search_path = '' as $$
begin
  update public.notifications n set email_status = 'skipped', email_error = 'older than 3 days'
  where n.email_status in ('pending', 'sending') and n.created_at < now() - interval '3 days';
  update public.notifications n set email_status = 'failed'
  where n.email_status = 'sending' and n.email_claimed_at < now() - interval '10 minutes' and n.email_attempts >= 5;

  return query
  with picked as (
    select q.id from public.notifications q
    where q.email_status = 'pending'
       or (q.email_status = 'sending' and q.email_claimed_at < now() - interval '10 minutes')
    order by q.id
    limit greatest(1, least(coalesce(p_limit, 25), 100))
    for update skip locked
  ), claimed as (
    update public.notifications n
    set email_status = 'sending', email_claimed_at = now(), email_attempts = n.email_attempts + 1
    from picked where n.id = picked.id
    returning n.*
  )
  select c.id, c.user_id, u.email::text, c.kind, c.title, c.body, c.href, c.client_id,
         coalesce(cl.brand_id, sp.brand_id), sp.user_id is not null, c.created_at
  from claimed c
  join auth.users u on u.id = c.user_id
  left join public.clients cl on cl.id = c.client_id
  left join public.staff_profiles sp on sp.user_id = c.user_id
  order by c.id;
end;
$$;

create or replace function public.finish_notification_email(p_id bigint, p_status text, p_error text default null) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if p_status not in ('sent', 'failed', 'skipped', 'pending') then
    raise exception 'Unknown email status %', p_status using errcode = '22023';
  end if;
  update public.notifications
  set email_status = case when p_status = 'failed' and email_attempts < 5 then 'pending' else p_status end,
      emailed_at = case when p_status = 'sent' then now() else emailed_at end,
      email_error = left(p_error, 500)
  where id = p_id and email_status = 'sending';
end;
$$;

-- ---------------------------------------------------------------------------
-- Grants
-- ---------------------------------------------------------------------------
revoke execute on function private.owner_ids(), private.client_staff_ids(uuid, text), private.client_portal_ids(uuid),
  private.acting_approver_ids(numeric), private.notify(uuid[], text, text, text, text, uuid),
  private.filing_label(public.filing_instances),
  private.notify_filing_event(), private.notify_esubmission(), private.notify_lock_request_created(),
  private.notify_lock_request_decided(), private.notify_payment_proof(), private.notify_statement(),
  private.notify_request_message(), private.notify_lead(), private.notify_discovery_call(), private.notify_client_meeting()
  from public, anon, authenticated;

revoke execute on function public.mark_notifications_read(bigint[]), public.set_notification_email(text, boolean) from public, anon;
grant execute on function public.mark_notifications_read(bigint[]), public.set_notification_email(text, boolean) to authenticated;

revoke execute on function public.claim_notification_emails(int), public.finish_notification_email(bigint, text, text) from public, anon, authenticated;
grant execute on function public.claim_notification_emails(int), public.finish_notification_email(bigint, text, text) to service_role;
