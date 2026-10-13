import "server-only";
import postgres from "postgres";

/* One pool per server process. Kept on globalThis so dev-mode hot reloads
   reuse it instead of opening a new set of connections on every edit.
   `prepare: false` keeps it compatible with poolers such as Neon's. */
const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

export function db(): postgres.Sql {
  if (!globalForDb.sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set.");
    globalForDb.sql = postgres(url, { max: 5, idle_timeout: 20, prepare: false });
  }
  return globalForDb.sql;
}

export * from "@/lib/db-types";
