import { Check, Rocket } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const memberBenefits = [
  "Access Community Channels",
  "Join Events",
  "Participate In Giveaways",
  "Join Voice Chats",
  "Meet New Friends",
  "Earn Roles",
  "Participate In Tournaments",
  "Access Future Features",
]

const boosterPerks = [
  "Exclusive Booster Role",
  "Special Recognition",
  "Priority Event Access",
  "Exclusive Announcements",
  "Future Booster Rewards",
]

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Perks"
          title="Member & Booster Benefits"
          description="There's something for everyone — and even more for those who support the server."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Member Benefits
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {memberBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Rocket className="h-5 w-5" />
              </span>
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Booster Perks
              </h3>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3">
              {boosterPerks.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">More perks coming soon.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
