import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  const rows = await sql`
    SELECT id, giveaway, discord_username, discord_id, created_at
    FROM giveaway_entries
    ORDER BY created_at DESC
  `

  return NextResponse.json({
    entries: rows.map((row) => ({
      id: String(row.id),
      giveaway: row.giveaway as string,
      discordUsername: row.discord_username as string,
      discordId: row.discord_id as string,
      createdAt: row.created_at as string,
    })),
  })
}
