import { NextResponse } from "next/server"
import { logStaffAction } from "@/lib/discord-log"
import { verifyStaffRole } from "@/lib/staff-auth"

export async function POST(req: Request) {
  const token = process.env.DISCORD_BOT_TOKEN
  if (!token) {
    return NextResponse.json({ error: "DISCORD_BOT_TOKEN is not configured." }, { status: 500 })
  }

  let userId: string
  let guildId: string
  let roleId: string
  let staff: string
  let staffId: string
  try {
    const body = await req.json()
    userId = String(body.userId ?? "").trim()
    guildId = String(body.guildId ?? "").trim()
    roleId = String(body.roleId ?? "").trim()
    staff = String(body.staff ?? "Unknown").trim()
    staffId = String(body.staffId ?? "").trim()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  // Server-side gate: the acting staff member must hold the required admin role.
  const auth = await verifyStaffRole(staffId)
  if (!auth.ok) {
    await logStaffAction({
      staff,
      action: "Add role",
      success: false,
      details: { "Staff ID": staffId || "(none)", Result: `Blocked: ${auth.error}` },
    })
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  if (![userId, guildId, roleId].every((v) => /^\d{17,20}$/.test(v))) {
    return NextResponse.json({ error: "User, server, and role IDs must all be valid Discord IDs." }, { status: 400 })
  }

  const logDetails = { "Target ID": userId, Server: guildId, Role: roleId }

  const res = await fetch(
    `https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    },
  )

  if (res.status === 204) {
    await logStaffAction({ staff, action: "Add role", success: true, details: logDetails })
    return NextResponse.json({ success: true })
  }
  if (res.status === 403) {
    await logStaffAction({
      staff,
      action: "Add role",
      success: false,
      details: { ...logDetails, Result: "Missing permission" },
    })
    return NextResponse.json(
      { error: "Bot lacks permission. Ensure it has Manage Roles and its role is above the target role." },
      { status: 403 },
    )
  }
  if (res.status === 404) {
    await logStaffAction({
      staff,
      action: "Add role",
      success: false,
      details: { ...logDetails, Result: "Member/server/role not found" },
    })
    return NextResponse.json(
      { error: "Member, server, or role not found. The user must be in the server." },
      { status: 404 },
    )
  }

  const detail = await res.text()
  await logStaffAction({
    staff,
    action: "Add role",
    success: false,
    details: { ...logDetails, Result: `Discord error ${res.status}` },
  })
  return NextResponse.json({ error: `Discord returned an error (${res.status}). ${detail}` }, { status: 502 })
}
