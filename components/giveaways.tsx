"use client"

import { useEffect, useMemo, useState } from "react"
import { Gift, Clock, Trophy, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Giveaway ends Thursday 4th June 2026, 7pm BST (BST is UTC+1, so 18:00 UTC)
const TARGET = Date.UTC(2026, 5, 4, 18, 0, 0)

export function Giveaways() {
  // The current time is computed only on the client after mount to avoid
  // SSR/client hydration mismatches (Date.now() and locale date formatting differ).
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const ready = now !== null
  const diff = ready ? Math.max(0, TARGET - now) : 0
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  const ended = ready && diff === 0

  // Entry dialog state
  const [open, setOpen] = useState(false)
  const [discordUsername, setDiscordUsername] = useState("")
  const [discordId, setDiscordId] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleEnter(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (discordUsername.trim().length < 2) {
      setError("Enter your Discord username.")
      return
    }
    if (!/^\d{17,20}$/.test(discordId.trim())) {
      setError("Enter a valid Discord user ID (17-20 digits).")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/giveaway/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordUsername: discordUsername.trim(),
          discordId: discordId.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Could not enter. Try again.")
      } else {
        setSuccess(true)
      }
    } catch {
      setError("Network error. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function resetDialog() {
    setOpen(false)
    // Delay reset so the closing animation isn't jarring
    setTimeout(() => {
      setDiscordUsername("")
      setDiscordId("")
      setError("")
      setSuccess(false)
    }, 200)
  }

  const endDate = useMemo(() => {
    if (!ready) return null
    return new Date(TARGET).toLocaleString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
      timeZoneName: "short",
    })
  }, [ready])

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ]

  return (
    <section id="giveaways" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Purple/white gradient tab */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-[oklch(0.2_0.05_300)]"
            style={{
              background: "linear-gradient(90deg, #7c3aed 0%, #ffffff 50%, #7c3aed 100%)",
              boxShadow: "0 0 24px rgba(124, 58, 237, 0.35)",
            }}
          >
            <Gift className="h-4 w-4" />
            Giveaways
          </span>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <h2
            className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl md:text-7xl"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #c4b5fd 45%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Discord Nitro Giveaway
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            We&apos;re giving away{" "}
            <span className="font-semibold text-[#c4b5fd]">1x Discord Nitro</span>. Join the Discord, enter below, and
            stay active to win!
          </p>
        </div>

        {/* Countdown + side message */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-stretch gap-6 lg:flex-row">
        {/* Countdown card */}
        <div
          className="flex-1 rounded-2xl border border-[#7c3aed]/60 bg-card/40 p-8"
          style={{ boxShadow: "0 0 30px rgba(124, 58, 237, 0.12), inset 0 0 30px rgba(124, 58, 237, 0.05)" }}
        >
          <div className="flex items-center justify-center gap-2 border-b border-[#7c3aed]/30 pb-4">
            <Clock className="h-4 w-4 text-[#c4b5fd]" />
            <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-[#c4b5fd]">
              {ended ? "Giveaway Ended" : "Ends In"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center rounded-xl border border-[#7c3aed]/30 bg-background/40 py-4"
              >
                <span
                  className="font-display text-3xl font-bold tabular-nums sm:text-4xl"
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #c4b5fd 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Drawing on <span className="font-semibold text-foreground">{endDate ?? "soon"}</span>
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setOpen(true)}
              className="font-semibold text-white"
              style={{ background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)" }}
            >
              <Gift className="h-4 w-4" />
              Enter Giveaway
            </Button>
          </div>
        </div>

        {/* Side message: how the winner is picked */}
        <aside
          className="flex flex-1 flex-col justify-center gap-6 rounded-2xl border border-[#7c3aed]/40 bg-card/30 p-8 lg:max-w-sm"
          style={{ boxShadow: "inset 0 0 30px rgba(124, 58, 237, 0.05)" }}
        >
          <h3 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">
            How it works
          </h3>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#7c3aed]/40 bg-background/40 text-[#c4b5fd]">
              <Trophy className="h-4 w-4" />
            </span>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Once the time is up, a{" "}
              <span className="font-semibold text-foreground">winner will be announced right here</span>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#7c3aed]/40 bg-background/40 text-[#c4b5fd]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              The winner will have{" "}
              <span className="font-semibold text-[#c4b5fd]">2 hours from the end</span> to DM{" "}
              <span className="font-semibold text-foreground">@chrxme.gg</span> on Discord to claim their prize.
            </p>
          </div>
        </aside>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">by @chrxme.gg</p>
      </div>

      {/* Enter giveaway dialog */}
      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : resetDialog())}>
        <DialogContent className="sm:max-w-md">
          {success ? (
            <div className="flex flex-col items-center py-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[#c4b5fd]">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <DialogTitle className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
                You&apos;re Entered!
              </DialogTitle>
              <DialogDescription className="mt-2">
                Good luck! The winner will be announced right here when the timer ends.
              </DialogDescription>
              <Button onClick={resetDialog} className="mt-6 font-semibold">
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-bold uppercase tracking-wide">
                  Enter the Giveaway
                </DialogTitle>
                <DialogDescription>
                  Enter your Discord details to be entered into the 1x Discord Nitro giveaway.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleEnter} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="discord-username">Discord Username</Label>
                  <Input
                    id="discord-username"
                    value={discordUsername}
                    onChange={(e) => {
                      setDiscordUsername(e.target.value)
                      setError("")
                    }}
                    placeholder="e.g. chrxme.gg"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="discord-id">Discord User ID</Label>
                  <Input
                    id="discord-id"
                    inputMode="numeric"
                    value={discordId}
                    onChange={(e) => {
                      setDiscordId(e.target.value)
                      setError("")
                    }}
                    placeholder="e.g. 1234567890123456789"
                    autoComplete="off"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enable Developer Mode in Discord, right-click your name, and choose &quot;Copy User ID&quot;.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-semibold text-white"
                    style={{ background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)" }}
                  >
                    {submitting ? "Entering..." : "Confirm Entry"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
