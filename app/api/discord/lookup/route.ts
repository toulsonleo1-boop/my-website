import { NextResponse } from "next/server"
import { logStaffAction } from "@/lib/discord-log"

export async function POST(req: Request) {
  const token = process.env.DISCORD_BOT_TOKEN
  if (!token) {
    return NextResponse.json({ error: "DISCORD_BOT_TOKEN is not configured." }, { status: 500 })
  }

  let userId: string
  let staff: string
  try {
    const body = await req.json()
    userId = String(body.userId ?? "").trim()
    staff = String(body.staff ?? "Unknown").trim()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (!/^\d{17,20}$/.test(userId)) {
    return NextResponse.json({ error: "Enter a valid Discord user ID (17-20 digits)." }, { status: 400 })
  }

  const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
    headers: { Authorization: `Bot ${token}` },
    cache: "no-store",
  })

  if (res.status === 404) {
    await logStaffAction({
      staff,
      action: "User lookup",
      success: false,
      details: { "Target ID": userId, Result: "Not found" },
    })
    return NextResponse.json({ error: "No Discord user found with that ID." }, { status: 404 })
  }
  if (!res.ok) {
    await logStaffAction({
      staff,
      action: "User lookup",
      success: false,
      details: { "Target ID": userId, Result: `Discord error ${res.status}` },
    })
    return NextResponse.json({ error: "Failed to look up user from Discord." }, { status: 502 })
  }

  const user = await res.json()
  const username = user.discriminator && user.discriminator !== "0"
    ? `${user.username}#${user.discriminator}`
    : user.username

  await logStaffAction({
    staff,
    action: "User lookup",
    success: true,
    details: { "Target ID": userId, Username: username, "Display name": user.global_name ?? null },
  })

  return NextResponse.json({
    id: user.id,
    username,
    globalName: user.global_name ?? null,
  })
}
