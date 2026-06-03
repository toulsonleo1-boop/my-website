import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Staff-only listing of giveaway entries. Guarded by the staff access code
// passed from the private staff page.
const STAFF_CODE = "4521"

export async function POST(request: Request) {
  let body: { code?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if ((body.code ?? "").trim() !== STAFF_CODE) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  try {
    const rows = await sql`
      SELECT id, discord_username, discord_id, created_at
      FROM public.giveaway_entries
      WHERE giveaway = 'Discord Nitro'
      ORDER BY created_at DESC
    `
    return NextResponse.json({ entries: rows })
  } catch {
    return NextResponse.json({ error: "Could not load entries." }, { status: 500 })
  }
}
