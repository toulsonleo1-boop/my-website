"use client"

import { useState } from "react"
import Link from "next/link"
import { Lock, ArrowLeft, AlertCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sieze access code. Change this to update the login code.
const SIEZE_CODE = "901"

export default function SiezeLoginPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [authed, setAuthed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.trim() === SIEZE_CODE) {
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
          <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-400">
                <Star className="h-6 w-6" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-cyan-400">Access Granted</p>
              <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground">
                Sieze Members Area
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Welcome. This private area is only visible to verified Sieze members with the access code.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                type="button"
                disabled
                className="cursor-default font-semibold disabled:opacity-100"
              >
                Private to sieze members only, more to come here.
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                <Lock className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Sieze Login
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your Sieze access code to view the members area.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="sieze-code">Access Code</Label>
                <Input
                  id="sieze-code"
                  type="password"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter Sieze code"
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
                Unlock Members Area
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
