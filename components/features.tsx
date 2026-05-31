import { Newspaper, CalendarHeart, Gift, Star, BarChart3, Swords, Image, Award, Lightbulb } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const features = [
  { name: "Community News", desc: "Latest updates and announcements.", icon: Newspaper },
  { name: "Events", desc: "Community activities and special events.", icon: CalendarHeart },
  { name: "Giveaways", desc: "Win rewards and prizes.", icon: Gift },
  { name: "Creator Program", desc: "Support and grow creators.", icon: Star },
  { name: "Leaderboards", desc: "Track achievements and rankings.", icon: BarChart3 },
  { name: "Tournaments", desc: "Compete against other players.", icon: Swords },
  { name: "Media Gallery", desc: "Community clips and screenshots.", icon: Image },
  { name: "Community Showcase", desc: "Featured members and creators.", icon: Award },
  { name: "Suggestions System", desc: "Submit ideas to improve the community.", icon: Lightbulb },
]

export function Features() {
  return (
    <section id="features" className="border-y border-border bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Community Features"
          title="Everything In One Place"
          description="From tournaments to giveaways, SIEZE Community is packed with features to keep the community engaged."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.name}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {f.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
