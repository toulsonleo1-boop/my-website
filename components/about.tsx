import { Shield, Heart, Zap, Trophy, Code2 } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { DiscordMemberCount } from "@/components/discord-member-count"

const values = [
  { icon: Shield, label: "Safe", desc: "A protected, moderated space for everyone." },
  { icon: Heart, label: "Friendly", desc: "Welcoming members from around the world." },
  { icon: Zap, label: "Active", desc: "Daily conversations, events, and activity." },
  { icon: Trophy, label: "Exciting", desc: "Tournaments, giveaways, and competition." },
]

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <a
        href="https://web-showcase--chrxme25.replit.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 top-6 z-10 flex max-w-[220px] items-start gap-2 rounded-xl border border-border bg-card/80 p-3 text-left backdrop-blur transition-colors hover:border-primary/50 hover:bg-card"
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Code2 className="h-4 w-4" />
        </span>
        <span className="text-xs leading-relaxed text-muted-foreground">
          This website has been custom coded by{" "}
          <span className="font-semibold text-foreground">@chrxme.gg</span> on Discord.{" "}
          <span className="text-primary underline">View my dev site</span>
        </span>
      </a>
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          align="left"
          eyebrow="About Us"
          title="Built For Gamers & Creators"
          description="SIEZE Community is a community built for gamers, creators, and supporters. We focus on creating a safe, friendly, active, and exciting environment where members can connect and grow together."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.label} className="rounded-xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                {v.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground text-balance sm:text-6xl">
            Sieze Discord Member Count
          </h2>
          <DiscordMemberCount />
        </div>
      </div>
    </section>
  )
}
