import { Megaphone, Check } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const items = [
  "Community Announcements",
  "Discord Updates",
  "Tournaments",
  "Events",
  "Giveaways",
  "Creator Programs",
  "Leaderboards",
  "Community News",
  "Future Projects",
  "Partnerships",
  "Exclusive Content",
]

export function Announcement() {
  return (
    <section className="border-y border-border bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Megaphone className="h-4 w-4" />
            Big Community Announcement
          </div>
          <SectionHeading
            title="The Website Is Officially Live"
            description="We are proud to officially launch the SIEZE Community Website — the central hub for everything happening across the community."
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">And much more. The future starts now.</p>
      </div>
    </section>
  )
}
