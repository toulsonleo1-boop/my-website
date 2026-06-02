"use server"

import { cookies, headers } from "next/headers"
import { sql } from "@/lib/db"

const SESSION_COOKIE = "coin_session"

export type CoinUser = {
  id: number
  username: string
  login_code: string
  coins: number
  login_count: number
  last_coin_date: string | null
  last_login_at: string | null
  created_at: string
}

export type LoginEvent = {
  id: number
  user_id: number
  username: string
  coin_awarded: boolean
  event_type: string
  ip_address: string | null
  created_at: string
}

type ActionResult =
  | { ok: true; user: CoinUser; coinAwarded?: boolean; isNew?: boolean }
  | { ok: false; error: string }

// Generate a code like SIEZE-A1B2-C3D4 (no ambiguous chars).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
function randomBlock(len: number) {
  let out = ""
  for (let i = 0; i < len; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return out
}
function generateCode() {
  return `SIEZE-${randomBlock(4)}-${randomBlock(4)}`
}

async function getClientMeta() {
  const h = await headers()
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    null
  const userAgent = h.get("user-agent") || null
  return { ip, userAgent }
}

async function setSession(code: string) {
  const jar = await cookies()
  jar.set(SESSION_COOKIE, code, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  })
}

export async function createAccount(usernameRaw: string): Promise<ActionResult> {
  const username = usernameRaw.trim()
  if (username.length < 3 || username.length > 24) {
    return { ok: false, error: "Username must be 3-24 characters." }
  }
  if (!/^[a-zA-Z0-9_.\- ]+$/.test(username)) {
    return { ok: false, error: "Username can only contain letters, numbers, spaces, _ . and -" }
  }

  const existing = await sql`SELECT id FROM coin_users WHERE lower(username) = lower(${username})`
  if (existing.length > 0) {
    return { ok: false, error: "That username is already taken." }
  }

  // Generate a unique code (retry on the rare collision).
  let code = generateCode()
  for (let attempt = 0; attempt < 5; attempt++) {
    const clash = await sql`SELECT id FROM coin_users WHERE login_code = ${code}`
    if (clash.length === 0) break
    code = generateCode()
  }

  const { ip, userAgent } = await getClientMeta()
  const rows = await sql`
    INSERT INTO coin_users (username, login_code, coins, login_count, last_coin_date, last_login_at)
    VALUES (${username}, ${code}, 1, 1, CURRENT_DATE, now())
    RETURNING *
  `
  const user = rows[0] as CoinUser

  await sql`
    INSERT INTO coin_login_events (user_id, username, coin_awarded, event_type, ip_address, user_agent)
    VALUES (${user.id}, ${user.username}, true, 'signup', ${ip}, ${userAgent})
  `

  await setSession(code)
  return { ok: true, user, coinAwarded: true, isNew: true }
}

export async function login(codeRaw: string): Promise<ActionResult> {
  const code = codeRaw.trim().toUpperCase()
  if (!code) return { ok: false, error: "Enter your login code." }

  const found = await sql`SELECT * FROM coin_users WHERE login_code = ${code}`
  if (found.length === 0) {
    return { ok: false, error: "Invalid login code. Check it and try again." }
  }

  // Award 1 coin only if no coin has been awarded today (UTC date).
  const updated = await sql`
    UPDATE coin_users
    SET
      coins = coins + (CASE WHEN last_coin_date IS DISTINCT FROM CURRENT_DATE THEN 1 ELSE 0 END),
      last_coin_date = CURRENT_DATE,
      login_count = login_count + 1,
      last_login_at = now()
    WHERE login_code = ${code}
    RETURNING *, (${found[0].last_coin_date} IS DISTINCT FROM CURRENT_DATE) AS awarded
  `
  const user = updated[0] as CoinUser & { awarded: boolean }
  const coinAwarded = Boolean(user.awarded)

  const { ip, userAgent } = await getClientMeta()
  await sql`
    INSERT INTO coin_login_events (user_id, username, coin_awarded, event_type, ip_address, user_agent)
    VALUES (${user.id}, ${user.username}, ${coinAwarded}, 'login', ${ip}, ${userAgent})
  `

  await setSession(code)
  return { ok: true, user, coinAwarded }
}

export async function logout() {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}

export async function getCurrentUser(): Promise<CoinUser | null> {
  const jar = await cookies()
  const code = jar.get(SESSION_COOKIE)?.value
  if (!code) return null
  const rows = await sql`SELECT * FROM coin_users WHERE login_code = ${code}`
  return (rows[0] as CoinUser) ?? null
}

export async function getMyHistory(): Promise<LoginEvent[]> {
  const user = await getCurrentUser()
  if (!user) return []
  const rows = await sql`
    SELECT id, user_id, username, coin_awarded, event_type, ip_address, created_at
    FROM coin_login_events
    WHERE user_id = ${user.id}
    ORDER BY created_at DESC
    LIMIT 50
  `
  return rows as LoginEvent[]
}
