"use client"

import { useEffect, useMemo, useState } from "react"
import { Gift, Clock, Bell, Disc3 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Giveaway ends Tuesday 2nd June 2026, 7pm BST (BST is UTC+1, so 18:00 UTC)
const TARGET = Date.UTC(2026, 5, 2, 18, 0, 0)

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
            <span className="font-semibold text-[#c4b5fd]">Discord Nitro</span> in{" "}
            <span className="font-semibold text-foreground">2 days</span>. Join the Discord and stay active to enter!
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
              asChild
              className="font-semibold text-white"
              style={{ background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)" }}
            >
              <a href="https://discord.gg/N7JuDnY5Bt" target="_blank" rel="noopener noreferrer">
                Enter on Discord
              </a>
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
              <Bell className="h-4 w-4" />
            </span>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              When the timer runs out,{" "}
              <span className="font-semibold text-foreground">@everyone</span> will be pinged in the
              Discord server.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#7c3aed]/40 bg-background/40 text-[#c4b5fd]">
              <Disc3 className="h-4 w-4" />
            </span>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Everyone who{" "}
              <span className="font-semibold text-foreground">reacts to the message</span> gets put
              on a <span className="font-semibold text-[#c4b5fd]">wheel spin</span> to decide the
              winner.
            </p>
          </div>
        </aside>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">by @chrxme.gg</p>
      </div>
    </section>
  )
}
