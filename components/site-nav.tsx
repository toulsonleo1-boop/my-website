"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  { label: "About", href: "#about" },
  { label: "Sieze", href: "#sieze" },
  { label: "Roles", href: "#roles" },
  { label: "VIP", href: "#vip" },
  { label: "Shop", href: "#shop" },
  { label: "Giveaways", href: "#giveaways" },
  { label: "Features", href: "#features" },
  { label: "Staff", href: "#staff" },
  { label: "Staff Login", href: "/staff-login" },
  { label: "Sieze Login", href: "/sieze-login" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">
            S
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wider text-foreground">
            Sieze<span className="text-primary"> Community</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) =>
            link.label === "VIP" ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                {link.label}
              </a>
            ) : link.label === "Shop" ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-emerald-500 via-white to-emerald-500 bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                {link.label}
              </a>
            ) : link.label === "Giveaways" ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-purple-600 via-white to-purple-600 bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                {link.label}
              </a>
            ) : link.label === "Sieze" ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                {link.label}
              </a>
            ) : link.label === "Staff Login" || link.label === "Sieze Login" ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded border border-red-500 px-1 py-px text-xs font-bold uppercase tracking-wide leading-tight text-red-500 transition-colors hover:bg-red-500 hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden md:block md:ml-6">
          <Button asChild className="font-semibold">
            <a href="https://discord.gg/N7JuDnY5Bt" target="_blank" rel="noopener noreferrer">
              Join Discord
            </a>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {links.map((link) =>
              link.label === "VIP" ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent transition-opacity hover:opacity-80"
                >
                  {link.label}
                </a>
              ) : link.label === "Shop" ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-emerald-500 via-white to-emerald-500 bg-clip-text text-transparent transition-opacity hover:opacity-80"
                >
                  {link.label}
                </a>
              ) : link.label === "Giveaways" ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-purple-600 via-white to-purple-600 bg-clip-text text-transparent transition-opacity hover:opacity-80"
                >
                  {link.label}
                </a>
              ) : link.label === "Sieze" ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent transition-opacity hover:opacity-80"
                >
                  {link.label}
                </a>
              ) : link.label === "Staff Login" || link.label === "Sieze Login" ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-fit rounded border border-red-500 px-1 py-px text-xs font-bold uppercase tracking-wide leading-tight text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ),
            )}
            <Button asChild className="mt-2 font-semibold">
              <a
                href="https://discord.gg/N7JuDnY5Bt"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
