"use client"

import { useState } from "react"
import Link from "next/link"
import { Crown, ArrowLeft, AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Owner access code. Change this to update the owner login code.
const OWNER_CODE = "0000"

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
            <Link href="/staff-login">
              <ArrowLeft className="h-4 w-4" />
              Back to staff login
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        {authed ? (
          <div className="w-full max-w-md rounded-2xl border border-primary/40 bg-card p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Owner Access Granted
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Welcome, owner. Owner-only tools can be added here.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Crown className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Owner Login
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your owner access code to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="owner-code">Access Code</Label>
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
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="font-semibold">
                Unlock Owner Page
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
