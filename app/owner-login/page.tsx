"use client"

import { useState } from "react"
import Link from "next/link"
import { Crown, ArrowLeft, AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Owner access code. Change this to update the owner login code.
const OWNER_CODE = "3290"

const GOLD = "#d4af37"

export default function OwnerLoginPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [authed, setAuthed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.trim() === OWNER_CODE) {
      setAuthed(true)
      setError("")
    } else {
      setError("Incorrect code. Access denied.")
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Decorative gold background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${GOLD}33, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${GOLD}26, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <header className="relative z-10 border-b px-4 py-4 backdrop-blur-md" style={{ borderColor: `${GOLD}33` }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md font-display text-lg font-bold text-black"
              style={{ backgroundColor: GOLD }}
            >
              S
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Sieze<span style={{ color: GOLD }}> Community</span>
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white">
            <Link href="/staff-login">
              <ArrowLeft className="h-4 w-4" />
              Back to staff login
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-16">
        {authed ? (
          <div
            className="w-full max-w-md rounded-2xl border bg-[#111111]/90 p-8 text-center backdrop-blur-sm"
            style={{ borderColor: `${GOLD}66`, boxShadow: `0 0 40px ${GOLD}1f` }}
          >
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-black"
              style={{ backgroundColor: GOLD }}
            >
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide" style={{ color: GOLD }}>
              Owner Access Granted
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Welcome, owner. Owner-only tools can be added here.
            </p>
          </div>
        ) : (
          <div
            className="w-full max-w-md rounded-2xl border bg-[#111111]/90 p-8 backdrop-blur-sm"
            style={{ borderColor: `${GOLD}66`, boxShadow: `0 0 40px ${GOLD}1f` }}
          >
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: `${GOLD}1f`, color: GOLD }}
              >
                <Crown className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide" style={{ color: GOLD }}>
                Owner Login
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Enter your owner access code to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="owner-code" className="text-white/80">
                  Access Code
                </Label>
                <Input
                  id="owner-code"
                  type="password"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter owner code"
                  autoComplete="off"
                  autoFocus
                  className="border-white/15 bg-black/40 text-white placeholder:text-white/30"
                  style={{ caretColor: GOLD }}
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
                className="font-semibold text-black hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                Unlock Owner Page
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
