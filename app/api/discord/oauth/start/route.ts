import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const clientId = process.env.DISCORD_CLIENT_ID
  if (!clientId) {
    return NextResponse.json({ error: "DISCORD_CLIENT_ID is not configured." }, { status: 500 })
  }

  const url = new URL(req.url)
  const redirectUri = `${url.origin}/api/discord/oauth/callback`

  // CSRF protection: random state stored in an httpOnly cookie and echoed back by Discord.
  const state = crypto.randomUUID()

  const authorize = new URL("https://discord.com/api/oauth2/authorize")
  authorize.searchParams.set("client_id", clientId)
  authorize.searchParams.set("redirect_uri", redirectUri)
  authorize.searchParams.set("response_type", "code")
  authorize.searchParams.set("scope", "identify email")
  authorize.searchParams.set("state", state)
  authorize.searchParams.set("prompt", "consent")

  const res = NextResponse.redirect(authorize.toString())
  res.cookies.set("discord_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  })
  return res
}
