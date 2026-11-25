-- Five-step sign-off (migration 20261127100003): Filed & paid is the status 'filed',
-- the last step (Paid and Proof sent are gone). A return is settled ("filed and paid",
-- e.g. a 0619-E whose remittance the 1601-EQ deducts) once it is 'filed'.
create or replace function private.filing_settled(p_status text) returns boolean
language sql immutable set search_path = '' as $$
  select p_status = 'filed'
$$;

revoke execute on function private.filing_settled(text) from public, anon, authenticated;
