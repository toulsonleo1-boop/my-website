import { Crown } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const teams = [
  "Administration Team",
  "Moderation Team",
  "Mod Team",
]

export function Staff() {
  return (
    <section id="staff" className="border-y border-border bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Staff Team"
          title="The People Behind SIEZE Community"
          description="Our team works to keep the community safe, active, and growing. Applications for most teams are opening soon."
        />

        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Crown className="h-6 w-6" />
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">Founder</p>
          <p className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground">chrxme</p>
          <p className="mt-1 text-sm text-muted-foreground">@chrxme.gg on Discord</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center"
            >
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">{team}</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Applications Opening Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
