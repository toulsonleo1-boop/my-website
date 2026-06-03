import { neon } from "@neondatabase/serverless"

// Shared Neon SQL client. Uses the pooled DATABASE_URL from the Neon integration.
export const sql = neon(process.env.DATABASE_URL!)
