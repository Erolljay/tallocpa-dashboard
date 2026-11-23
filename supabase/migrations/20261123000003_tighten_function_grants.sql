-- Functions are executable by PUBLIC by default in Postgres. Only signed-in users need these.
-- (Flagged by the Supabase security advisor.)
revoke execute on function public.current_identity() from public, anon;
revoke execute on function public.create_client_with_obligations(jsonb, jsonb, date, jsonb) from public, anon;
revoke execute on all functions in schema private from public, anon;
grant execute on function public.current_identity() to authenticated;
grant execute on function public.create_client_with_obligations(jsonb, jsonb, date, jsonb) to authenticated;
grant execute on all functions in schema private to authenticated;
