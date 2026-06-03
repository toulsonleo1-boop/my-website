import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { logStaffAction } from "@/lib/discord-log"

export async function POST(request: Request) {
  let body: { discordUsername?: string; discordId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const discordUsername = (body.discordUsername ?? "").trim()
  const discordId = (body.discordId ?? "").trim()

  if (discordUsername.length < 2 || discordUsername.length > 64) {
    return NextResponse.json({ error: "Enter a valid Discord username." }, { status: 400 })
  }
  if (!/^\d{17,20}$/.test(discordId)) {
    return NextResponse.json({ error: "Enter a valid Discord user ID (17-20 digits)." }, { status: 400 })
  }

  try {
    // Prevent duplicate entries from the same Discord ID for this giveaway.
    const existing = await sql`
      SELECT id FROM public.giveaway_entries
      WHERE discord_id = ${discordId} AND giveaway = 'Discord Nitro'
      LIMIT 1
    `
    if (existing.length > 0) {
      return NextResponse.json({ error: "You have already entered this giveaway." }, { status: 409 })
    }

    await sql`
      INSERT INTO public.giveaway_entries (giveaway, discord_username, discord_id)
      VALUES ('Discord Nitro', ${discordUsername}, ${discordId})
    `

    // Best-effort log to the staff Discord webhook.
    void logStaffAction({
      staff: "Giveaway",
      action: "New Giveaway Entry",
      success: true,
      details: {
        "Discord Username": discordUsername,
        "Discord ID": discordId,
        Giveaway: "Discord Nitro",
      },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Could not save your entry. Try again." }, { status: 500 })
  }
}
