#!/usr/bin/env bash
# Runs the database tests against a throwaway local Postgres.
# Needs PostgreSQL 15+ server binaries (initdb, pg_ctl) on PATH or in /usr/lib/postgresql/*/bin.
set -euo pipefail
PGBIN="$(dirname "$(command -v initdb 2>/dev/null || ls -d /usr/lib/postgresql/*/bin/initdb | tail -1)")"
DIR="$(mktemp -d)"
PORT="${TEST_PG_PORT:-54329}"
cleanup() { "$PGBIN/pg_ctl" -D "$DIR" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$DIR"; }
trap cleanup EXIT
if [ "$(id -u)" = "0" ]; then RUN=(runuser -u postgres --); chown postgres "$DIR"; else RUN=(); fi
"${RUN[@]}" "$PGBIN/initdb" -D "$DIR" -U postgres -A trust >/dev/null
"${RUN[@]}" "$PGBIN/pg_ctl" -D "$DIR" -o "-p $PORT -k $DIR -c listen_addresses=''" -w start >/dev/null
TEST_DATABASE_URL="postgresql://postgres@/postgres?host=$DIR&port=$PORT" pnpm vitest run --no-file-parallelism supabase/tests "$@"
