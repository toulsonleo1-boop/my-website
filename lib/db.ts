import { neon } from "@neondatabase/serverless"

// Single shared SQL client for the coin/login system.
// DATABASE_URL is provisioned by the Neon integration.
export const sql = neon(process.env.DATABASE_URL!)
