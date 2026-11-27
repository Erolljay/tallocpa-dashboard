-- A contact who may only view a business (access 'viewer') cannot cancel its meetings
-- (20270102000001_contact_access.sql: booking a meeting needs uploader or full; the same
-- now holds for cancelling one, 20270101000402_cancel_meetings.sql).
create trigger client_access_guard_cancel before update of cancelled_at on public.client_meetings
  for each row execute function private.client_access_guard('act');
