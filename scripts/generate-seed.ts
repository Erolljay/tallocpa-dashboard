/**
 * Writes supabase/seed.sql from the TypeScript seed data, so the database and
 * the engine's tests use the same rules. Run: pnpm db:seed:generate
 * A test (supabase/tests/seed.test.ts) fails if seed.sql is out of date.
 */
import { writeFileSync } from "node:fs";
import { buildSeedSql } from "../src/lib/deadlines/seed-sql";

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), buildSeedSql());
console.log("Wrote supabase/seed.sql");
