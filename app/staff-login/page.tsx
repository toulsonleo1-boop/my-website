"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Lock, ShieldCheck, ArrowLeft, AlertCircle, CalendarClock, UserSearch, UserPlus, CheckCircle2, UserCircle, Gift, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Staff access code. Change this to update the login code.
const STAFF_CODE = "4521"

export default function StaffLoginPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [authed, setAuthed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.trim() === STAFF_CODE) {
      setAuthed(true)
      setError("")
    } else {
      setError("Incorrect code. Access denied.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-background/80 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
              S
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-wider text-foreground">
              Sieze<span className="text-primary"> Community</span>
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        {authed ? (
          <PrivateStaffPanel />
        ) : (
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Staff Login
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your staff access code to view the private staff page.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="staff-code">Access Code</Label>
                <Input
                  id="staff-code"
                  type="password"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter staff code"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="font-semibold">
                Unlock Staff Page
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}

// Discord epoch (2015-01-01T00:00:00.000Z) in milliseconds
const DISCORD_EPOCH = 1420070400000

type AgeResult = {
  created: Date
  years: number
  months: number
  days: number
  totalDays: number
}

function getAccountAge(id: string): AgeResult | null {
  const trimmed = id.trim()
  if (!/^\d{17,20}$/.test(trimmed)) return null

  const timestamp = Number(BigInt(trimmed) >> 22n) + DISCORD_EPOCH
  const created = new Date(timestamp)
  if (Number.isNaN(created.getTime()) || created.getTime() > Date.now()) return null

  const now = new Date()
  let years = now.getFullYear() - created.getFullYear()
  let months = now.getMonth() - created.getMonth()
  let days = now.getDate() - created.getDate()

  if (days < 0) {
    months -= 1
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))

  return { created, years, months, days, totalDays }
}

function PrivateStaffPanel() {
  const [staffName, setStaffName] = useState("")
  const [staffNameInput, setStaffNameInput] = useState("")
  const [staffIdInput, setStaffIdInput] = useState("")
  const [staffNameError, setStaffNameError] = useState("")

  const [userId, setUserId] = useState("")
  const [result, setResult] = useState<AgeResult | null>(null)
  const [checkError, setCheckError] = useState("")

  const [username, setUsername] = useState<string | null>(null)
  const [globalName, setGlobalName] = useState<string | null>(null)
  const [lookupLoading, setLookupLoading] = useState(false)

  const [guildId, setGuildId] = useState("")
  const [roleId, setRoleId] = useState("")
  const [roleLoading, setRoleLoading] = useState(false)
  const [roleError, setRoleError] = useState("")
  const [roleSuccess, setRoleSuccess] = useState(false)

  function handleStaffName(e: React.FormEvent) {
    e.preventDefault()
    if (staffNameInput.trim().length < 2) {
      setStaffNameError("Enter your staff username to continue.")
      return
    }
    setStaffName(staffNameInput.trim())
    setStaffNameError("")
  }

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    setUsername(null)
    setGlobalName(null)
    setRoleSuccess(false)
    setRoleError("")

    const age = getAccountAge(userId)
    if (!age) {
      setResult(null)
      setCheckError("Enter a valid Discord user ID (17-20 digits).")
      return
    }
    setCheckError("")
    setResult(age)

    setLookupLoading(true)
    try {
      const res = await fetch("/api/discord/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId.trim(), staff: staffName }),
      })
      const data = await res.json()
      if (!res.ok) {
        setCheckError(data.error ?? "Could not fetch username.")
      } else {
        setUsername(data.username)
        setGlobalName(data.globalName)
      }
    } catch {
      setCheckError("Network error while fetching username.")
    } finally {
      setLookupLoading(false)
    }
  }

  async function handleAddRole(e: React.FormEvent) {
    e.preventDefault()
    setRoleError("")
    setRoleSuccess(false)

    if (!/^\d{17,20}$/.test(staffIdInput.trim())) {
      setRoleError("Enter your own Discord user ID (17-20 digits) to verify your admin role.")
      return
    }

    setRoleLoading(true)
    try {
      const res = await fetch("/api/discord/add-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId.trim(),
          guildId: guildId.trim(),
          roleId: roleId.trim(),
          staff: staffName,
          staffId: staffIdInput.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setRoleError(data.error ?? "Failed to add role.")
      } else {
        setRoleSuccess(true)
      }
    } catch {
      setRoleError("Network error while adding role.")
    } finally {
      setRoleLoading(false)
    }
  }

  if (!staffName) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-primary/40 bg-card p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserCircle className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            Identify Yourself
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enter your staff username before running any staff commands. This is logged with every action.
          </p>
        </div>

        <form onSubmit={handleStaffName} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="staff-name">Staff Username</Label>
            <Input
              id="staff-name"
              value={staffNameInput}
              onChange={(e) => {
                setStaffNameInput(e.target.value)
                setStaffNameError("")
              }}
              placeholder="Enter your staff username"
              autoComplete="off"
              autoFocus
            />
          </div>

          {staffNameError && (
            <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {staffNameError}
            </div>
          )}

          <Button type="submit" className="font-semibold">
            Continue
          </Button>
        </form>
      </div>
    )
  }

  const actionedUser = username ?? (result ? userId.trim() : null)

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
    <div className="w-full rounded-2xl border border-primary/40 bg-card p-8">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Signed in as {staffName}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground">
          Discord Account Tools
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Paste a Discord user ID to check account age and username. Enable Developer Mode in Discord, right-click a
          user, and choose &quot;Copy User ID&quot;.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-64">
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500">Using Tools</p>
          </div>
          <p className="mt-2 break-words font-display text-lg font-bold text-foreground">{staffName}</p>
          <p className="text-xs text-muted-foreground">Logged with every action</p>
        </div>
        <div className="rounded-xl border border-green-500/50 bg-green-500/10 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <p className="text-xs font-semibold uppercase tracking-widest text-green-500">Being Actioned</p>
          </div>
          <p className="mt-2 break-words font-display text-lg font-bold text-foreground">
            {actionedUser ?? "None yet"}
          </p>
          <p className="text-xs text-muted-foreground">
            {actionedUser ? "Target of current actions" : "Look up a user to begin"}
          </p>
        </div>
      </aside>

      <div className="flex-1">
      <form onSubmit={handleCheck} className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="discord-id">Discord User ID</Label>
          <Input
            id="discord-id"
            inputMode="numeric"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value)
              setCheckError("")
            }}
            placeholder="e.g. 1234567890123456789"
            autoComplete="off"
            autoFocus
          />
        </div>

        {checkError && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {checkError}
          </div>
        )}

        <Button type="submit" className="font-semibold" disabled={lookupLoading}>
          <UserSearch className="h-4 w-4" />
          {lookupLoading ? "Checking..." : "Check Account"}
        </Button>
      </form>

      {result && (
        <div className="mt-6 w-full rounded-xl border border-primary/40 bg-background/40 p-6 text-center">
          {(username || globalName) && (
            <div className="mb-4 border-b border-border/60 pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Username</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{username ?? "—"}</p>
              {globalName && <p className="mt-0.5 text-sm text-muted-foreground">Display name: {globalName}</p>}
            </div>
          )}
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Account Created</p>
          <p className="mt-1 font-display text-xl font-bold text-foreground">
            {result.created.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{result.years}</span> years,{" "}
            <span className="font-semibold text-foreground">{result.months}</span> months,{" "}
            <span className="font-semibold text-foreground">{result.days}</span> days old
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{result.totalDays.toLocaleString()} total days</p>
        </div>
      )}

      <div className="mt-8 w-full border-t border-border/60 pt-8">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">Add Role in a Server</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Assign a role to the user above. Only staff with the required admin role can add roles, so enter your own
          Discord user ID below to verify. The bot must be in the server with Manage Roles permission, and the user must
          already be a member.
        </p>

        <form onSubmit={handleAddRole} className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="staff-id">Your Discord User ID (admin verification)</Label>
            <Input
              id="staff-id"
              inputMode="numeric"
              value={staffIdInput}
              onChange={(e) => {
                setStaffIdInput(e.target.value)
                setRoleError("")
                setRoleSuccess(false)
              }}
              placeholder="e.g. 1234567890123456789"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="guild-id">Server (Guild) ID</Label>
            <Input
              id="guild-id"
              inputMode="numeric"
              value={guildId}
              onChange={(e) => {
                setGuildId(e.target.value)
                setRoleError("")
                setRoleSuccess(false)
              }}
              placeholder="e.g. 9876543210987654321"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role-id">Role ID</Label>
            <Input
              id="role-id"
              inputMode="numeric"
              value={roleId}
              onChange={(e) => {
                setRoleId(e.target.value)
                setRoleError("")
                setRoleSuccess(false)
              }}
              placeholder="e.g. 1122334455667788990"
              autoComplete="off"
            />
          </div>

          {roleError && (
            <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {roleError}
            </div>
          )}
          {roleSuccess && (
            <div className="flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Role added successfully.
            </div>
          )}

          <Button type="submit" variant="secondary" className="font-semibold" disabled={roleLoading || !userId.trim()}>
            <UserPlus className="h-4 w-4" />
            {roleLoading ? "Adding..." : "Add Role"}
          </Button>
        </form>
      </div>
      </div>
      </div>

      <GiveawayEntries />
    </div>
  )
}

type GiveawayEntry = {
  id: number
  discord_username: string
  discord_id: string
  created_at: string
}

function GiveawayEntries() {
  const [entries, setEntries] = useState<GiveawayEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function load() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/giveaway/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: STAFF_CODE }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Could not load entries.")
      } else {
        setEntries(data.entries ?? [])
      }
    } catch {
      setError("Network error while loading entries.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <div className="w-full rounded-2xl border border-primary/40 bg-card p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Gift className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
              Giveaway Entries
            </h2>
            <p className="text-sm text-muted-foreground">
              Everyone who entered the Discord Nitro giveaway ({entries.length} total).
            </p>
          </div>
        </div>
        <Button onClick={load} variant="secondary" size="sm" className="font-semibold" disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {!error && (
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-4 border-b border-border bg-background/40 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Username</span>
            <span>Discord ID</span>
            <span className="text-right">Entered</span>
          </div>
          {loading ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">Loading entries...</p>
          ) : entries.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">No entries yet.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 border-b border-border/60 px-4 py-3 text-sm last:border-b-0"
              >
                <span className="break-words font-medium text-foreground">{entry.discord_username}</span>
                <span className="break-all font-mono text-xs text-muted-foreground">{entry.discord_id}</span>
                <span className="text-right text-xs text-muted-foreground">
                  {new Date(entry.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
