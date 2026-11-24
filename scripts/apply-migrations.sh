#!/usr/bin/env bash
# Applies the migrations in supabase/migrations/ that the database has not run yet.
#
# Usage: SUPABASE_DB_URL=postgresql://... scripts/apply-migrations.sh [--dry-run]
#
# A migration counts as applied when supabase_migrations.schema_migrations has a row
# whose name is the file name without its version prefix and ".sql" (e.g.
# 20261124000003_branches_acting_approver.sql -> branches_acting_approver). Names, not
# versions, are matched because migrations applied through the Supabase dashboard or
# MCP were recorded under the time they ran, and two files share the version 20261123000010.
#
# Each pending file runs in its own transaction together with its history row, in file
# name order, and the run stops at the first error (that file is rolled back).
set -euo pipefail

: "${SUPABASE_DB_URL:?Set SUPABASE_DB_URL to the database connection string}"
DRY_RUN=false
[ "${1:-}" = "--dry-run" ] && DRY_RUN=true

cd "$(dirname "$0")/../supabase/migrations"
PSQL=(psql "$SUPABASE_DB_URL" -X -q -v ON_ERROR_STOP=1)

"${PSQL[@]}" -c "set client_min_messages = warning; create schema if not exists supabase_migrations; create table if not exists supabase_migrations.schema_migrations (version text primary key, statements text[], name text)" >/dev/null
applied="$("${PSQL[@]}" -At -c "select name from supabase_migrations.schema_migrations where name is not null")"

pending=0
for file in $(ls -1 -- *.sql | sort); do
  name="$(basename "$file" .sql | sed -E 's/^[0-9]+_//')"
  if grep -qxF -- "$name" <<<"$applied"; then continue; fi
  pending=$((pending + 1))
  if $DRY_RUN; then echo "pending: $file"; continue; fi
  echo "applying: $file"
  {
    cat -- "$file"
    printf '\n;\ninsert into supabase_migrations.schema_migrations (version, name) values (to_char(clock_timestamp() at time zone '"'"'UTC'"'"', '"'"'YYYYMMDDHH24MISSMS'"'"'), %s);\n' "'${name//\'/\'\'}'"
  } | "${PSQL[@]}" --single-transaction -f -
done

if [ "$pending" -eq 0 ]; then echo "The database is up to date."; elif $DRY_RUN; then echo "$pending migration(s) pending."; else echo "Applied $pending migration(s)."; fi
