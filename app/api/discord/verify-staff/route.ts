import { NextResponse } from "next/server"
import { verifyStaffRole } from "@/lib/staff-auth"

export async function POST(req: Request) {
  let staffId: string
  try {
    const body = await req.json()
    staffId = String(body.staffId ?? "").trim()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const result = await verifyStaffRole(staffId)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({ ok: true })
}
