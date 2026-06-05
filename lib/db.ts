import { neon } from "@neondatabase/serverless"

// Single shared SQL client backed by the Neon Postgres connection string.
export const sql = neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "")
