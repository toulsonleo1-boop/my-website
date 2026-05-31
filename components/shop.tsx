import { ShoppingBag } from "lucide-react"

export function Shop() {
  return (
    <section id="shop" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Green/white gradient tab */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-[oklch(0.18_0.04_150)]"
            style={{
              background: "linear-gradient(90deg, #1f9d55 0%, #eafff1 50%, #1f9d55 100%)",
              boxShadow: "0 0 24px rgba(34, 197, 94, 0.35)",
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            Shop
          </span>
        </div>

        <div className="mt-10 text-center">
          <h2
            className="font-display text-6xl font-bold uppercase tracking-tight sm:text-7xl md:text-8xl"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #7ef0a8 45%, #1f9d55 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shop
          </h2>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            The SIEZE Community Shop is <span className="font-semibold text-primary">coming soon</span>. Stay tuned for
            exclusive items, perks, and more.
          </p>

          <div
            className="mx-auto mt-10 inline-flex items-center gap-3 rounded-2xl border border-primary/50 bg-card/40 px-8 py-6"
            style={{ boxShadow: "0 0 30px rgba(34, 197, 94, 0.12), inset 0 0 30px rgba(34, 197, 94, 0.05)" }}
          >
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">Coming Soon</span>
          </div>
        </div>
      </div>
    </section>
  )
}
