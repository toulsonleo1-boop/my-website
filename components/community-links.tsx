import { MessageCircle } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const platforms = [
  { name: "Discord", status: "Coming Soon", icon: MessageCircle },
]

export function CommunityLinks() {
  return (
    <section id="links" className="border-y border-border bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Community Links"
          title="Connect With Us"
          description="Our social platforms are launching soon. Stay tuned — more social platforms coming soon."
        />

        <div className="mx-auto mt-12 grid max-w-xs grid-cols-1 gap-4">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <p.icon className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-bold uppercase tracking-wide text-foreground">
                {p.name}
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
