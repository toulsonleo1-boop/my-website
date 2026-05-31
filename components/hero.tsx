import { ArrowRight, Users, Sparkles, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-bg.png)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:py-36">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Official Community Hub
        </div>

        <h1 className="max-w-4xl text-balance font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-8xl">
          Sieze <span className="text-primary">Community</span>
        </h1>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-display text-sm font-bold uppercase tracking-widest text-foreground">
          <Globe className="h-4 w-4 text-primary" />
          sieze.com
        </p>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          A growing gaming, creator, and community platform built to bring players, creators, and supporters together
          from around the world. Make friends, compete, and stay connected.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
            <a href="#links">
              Join The Community
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-border bg-transparent px-8 text-base">
            <a href="#about">Learn More</a>
          </Button>
        </div>

        <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-border/60 pt-8">
          {[
            { value: "Daily", label: "Growing" },
            { value: "Global", label: "Community" },
            { value: "100%", label: "Welcoming" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-bold text-foreground md:text-4xl">{stat.value}</span>
              <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
