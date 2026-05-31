const REQUIRED_ROLE_ID = "1505285850928251032"
const STAFF_GUILD_ID = "1504460014214189076"

export const STAFF_AUTH = {
  roleId: REQUIRED_ROLE_ID,
  guildId: STAFF_GUILD_ID,
}

type VerifyResult =
  | { ok: true; member: { nick: string | null; roles: string[] } }
  | { ok: false; status: number; error: string }

/**
 * Verifies that the given Discord user ID is a member of the staff guild
 * AND holds the required admin role. Uses the bot token server-side.
 */
export async function verifyStaffRole(staffId: string): Promise<VerifyResult> {
  const token = process.env.DISCORD_BOT_TOKEN
  if (!token) {
    return { ok: false, status: 500, error: "DISCORD_BOT_TOKEN is not configured." }
  }
  if (!/^\d{17,20}$/.test(staffId)) {
    return { ok: false, status: 400, error: "Enter a valid Discord user ID (17-20 digits)." }
  }

  const res = await fetch(
    `https://discord.com/api/v10/guilds/${STAFF_GUILD_ID}/members/${staffId}`,
    {
      headers: { Authorization: `Bot ${token}` },
      cache: "no-store",
    },
  )

  if (res.status === 404) {
    return { ok: false, status: 403, error: "You are not a member of the staff server." }
  }
  if (!res.ok) {
    return { ok: false, status: 502, error: `Could not verify your roles (Discord error ${res.status}).` }
  }

  const member = (await res.json()) as { nick: string | null; roles: string[] }
  if (!member.roles?.includes(REQUIRED_ROLE_ID)) {
    return { ok: false, status: 403, error: "You do not have the required admin role to use this tool." }
  }

  return { ok: true, member: { nick: member.nick ?? null, roles: member.roles } }
}
