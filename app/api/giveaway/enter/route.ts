import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { logStaffAction } from "@/lib/discord-log"

const GIVEAWAY = "Discord Nitro - ends 06/06/26"

export async function POST(req: Request) {
  let discordUsername: string
  let discordId: string
  try {
    const body = await req.json()
    discordUsername = String(body.discordUsername ?? "").trim()
    discordId = String(body.discordId ?? "").trim()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (discordUsername.length < 2 || discordUsername.length > 64) {
    return NextResponse.json({ error: "Enter a valid Discord username." }, { status: 400 })
  }
  if (!/^\d{17,20}$/.test(discordId)) {
    return NextResponse.json({ error: "Enter a valid Discord user ID (17-20 digits)." }, { status: 400 })
  }

  // Prevent the same Discord ID from entering this giveaway twice.
  const existing = await sql`
    SELECT 1 FROM giveaway_entries
    WHERE giveaway = ${GIVEAWAY} AND discord_id = ${discordId}
    LIMIT 1
  `
  if (existing.length > 0) {
    return NextResponse.json({ error: "You have already entered this giveaway." }, { status: 409 })
  }

  await sql`
    INSERT INTO giveaway_entries (giveaway, discord_username, discord_id, created_at)
    VALUES (${GIVEAWAY}, ${discordUsername}, ${discordId}, now())
  `

  // Best-effort log to the staff Discord channel.
  await logStaffAction({
    staff: "Giveaway",
    action: "New giveaway entry",
    success: true,
    details: { Giveaway: GIVEAWAY, Username: discordUsername, "User ID": discordId },
  })

  return NextResponse.json({ ok: true })
}
