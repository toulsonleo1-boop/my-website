import { NextResponse } from "next/server"

const INVITE_CODE = "N7JuDnY5Bt"

export async function GET() {
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (SiezeCommunityWebsite)" },
        // Always fetch fresh data so the count stays live.
        cache: "no-store",
      },
    )

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch Discord data." }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json({
      memberCount: data.approximate_member_count ?? null,
      onlineCount: data.approximate_presence_count ?? null,
      name: data.guild?.name ?? null,
    })
  } catch {
    return NextResponse.json({ error: "Network error." }, { status: 500 })
  }
}
