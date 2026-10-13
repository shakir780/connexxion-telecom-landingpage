/* Applies db/schema.sql to DATABASE_URL. Reads .env.local when it exists;
   a DATABASE_URL already set in the shell wins, so the same command can
   target staging or prod:  DATABASE_URL="postgresql://…" npm run db:migrate */
import { readFileSync } from "node:fs";
import postgres from "postgres";

try {
  process.loadEnvFile(".env.local");
} catch {}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local or the shell.");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} });

try {
  await sql.unsafe(readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));
  console.log("Schema applied.");
} catch (err) {
  console.error("Migration failed:", err.message || err.code || err);
  process.exitCode = 1;
} finally {
  await sql.end();
}
