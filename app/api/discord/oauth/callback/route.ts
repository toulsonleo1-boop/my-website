import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookieState = req.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("discord_oauth_state="))
    ?.split("=")[1]

  const fail = (reason: string) =>
    NextResponse.redirect(`${url.origin}/verify?error=${encodeURIComponent(reason)}`)

  if (!code) return fail("No authorization code returned.")
  if (!state || !cookieState || state !== cookieState) return fail("Invalid state. Please try again.")

  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  if (!clientId || !clientSecret) return fail("Discord OAuth is not configured.")

  const redirectUri = `${url.origin}/api/discord/oauth/callback`

  // Exchange the authorization code for an access token.
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  })

  if (!tokenRes.ok) return fail("Failed to exchange code with Discord.")
  const token = await tokenRes.json()

  // Fetch the authorized user's profile (includes email because of the email scope).
  const userRes = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bearer ${token.access_token}` },
    cache: "no-store",
  })

  if (!userRes.ok) return fail("Failed to fetch your Discord profile.")
  const user = await userRes.json()

  const username =
    user.discriminator && user.discriminator !== "0"
      ? `${user.username}#${user.discriminator}`
      : user.username

  const params = new URLSearchParams({
    id: user.id ?? "",
    username: username ?? "",
    globalName: user.global_name ?? "",
    email: user.email ?? "",
    verified: user.verified ? "1" : "0",
  })

  const res = NextResponse.redirect(`${url.origin}/verify?${params.toString()}`)
  res.cookies.delete("discord_oauth_state")
  return res
}
