"use client"

import { useState } from "react"
import { Gift, Bell, Disc3, Ticket, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Giveaways() {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [discordId, setDiscordId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  function resetForm() {
    setUsername("")
    setDiscordId("")
    setError("")
    setSuccess(false)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (username.trim().length < 2) {
      setError("Enter your Discord username.")
      return
    }
    if (!/^\d{17,20}$/.test(discordId.trim())) {
      setError("Enter a valid Discord user ID (17-20 digits).")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/giveaway/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordUsername: username.trim(), discordId: discordId.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Could not submit your entry.")
      } else {
        setSuccess(true)
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
            <span className="font-semibold text-[#c4b5fd]">Discord Nitro</span>. This giveaway ends{" "}
            <span className="font-semibold text-foreground">6th June 2026</span>. Click enter below to join!
          </p>
        </div>

        {/* Enter card + side message */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-stretch gap-6 lg:flex-row">
          {/* Enter card */}
          <div
            className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-[#7c3aed]/60 bg-card/40 p-8 text-center"
            style={{ boxShadow: "0 0 30px rgba(124, 58, 237, 0.12), inset 0 0 30px rgba(124, 58, 237, 0.05)" }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#7c3aed]/40 bg-background/40 text-[#c4b5fd]">
              <Ticket className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Enter the Giveaway
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Giveaway ends <span className="font-semibold text-foreground">6th June 2026</span>
              </p>
            </div>

            <Dialog
              open={open}
              onOpenChange={(next) => {
                setOpen(next)
                if (!next) resetForm()
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className="font-semibold text-white"
                  style={{ background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)" }}
                >
                  <Ticket className="h-4 w-4" />
                  Enter Giveaway
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter the Discord Nitro Giveaway</DialogTitle>
                  <DialogDescription>
                    Enter your Discord username and user ID to be entered. Enable Developer Mode in Discord, right-click
                    your name, and choose &quot;Copy User ID&quot;.
                  </DialogDescription>
                </DialogHeader>

                {success ? (
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-6 w-6" />
                    </span>
                    <p className="font-display text-lg font-bold text-foreground">You&apos;re entered!</p>
                    <p className="text-sm text-muted-foreground">
                      Good luck. The winner will be drawn on 6th June 2026.
                    </p>
                    <Button
                      className="mt-2 font-semibold"
                      onClick={() => {
                        setOpen(false)
                        resetForm()
                      }}
                    >
                      Done
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="giveaway-username">Discord Username</Label>
                      <Input
                        id="giveaway-username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value)
                          setError("")
                        }}
                        placeholder="e.g. chrxme.gg"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="giveaway-id">Discord User ID</Label>
                      <Input
                        id="giveaway-id"
                        inputMode="numeric"
                        value={discordId}
                        onChange={(e) => {
                          setDiscordId(e.target.value)
                          setError("")
                        }}
                        placeholder="e.g. 1234567890123456789"
                        autoComplete="off"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="font-semibold text-white"
                      style={{ background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)" }}
                      disabled={loading}
                    >
                      {loading ? "Entering..." : "Submit Entry"}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {/* Side message: how the winner is picked */}
          <aside
            className="flex flex-1 flex-col justify-center gap-6 rounded-2xl border border-[#7c3aed]/40 bg-card/30 p-8 lg:max-w-sm"
            style={{ boxShadow: "inset 0 0 30px rgba(124, 58, 237, 0.05)" }}
          >
            <h3 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">How it works</h3>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#7c3aed]/40 bg-background/40 text-[#c4b5fd]">
                <Bell className="h-4 w-4" />
              </span>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                When the giveaway ends, <span className="font-semibold text-foreground">@everyone</span> will be pinged
                in the Discord server.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#7c3aed]/40 bg-background/40 text-[#c4b5fd]">
                <Disc3 className="h-4 w-4" />
              </span>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Everyone who <span className="font-semibold text-foreground">enters above</span> gets put on a{" "}
                <span className="font-semibold text-[#c4b5fd]">wheel spin</span> to decide the winner.
              </p>
            </div>
          </aside>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">by @chrxme.gg</p>
      </div>
    </section>
  )
}
