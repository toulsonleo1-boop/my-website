import { Crown, Wrench, Gavel, Rocket, Star, MessageSquare, UserPlus, User } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const roles = [
  { name: "Owner", desc: "Founder and leader of the SIEZE Community.", icon: Crown, tier: "Leadership" },
  {
    name: "Administrator",
    desc: "Responsible for server management and operations.",
    icon: Wrench,
    tier: "Staff",
    color: "bg-purple-600 text-white",
  },
  {
    name: "Moderator",
    desc: "Keeps the community safe and enjoyable.",
    icon: Gavel,
    tier: "Staff",
    color: "bg-blue-600 text-white",
  },
  { name: "Booster", desc: "Exclusive role for members who boost the Discord server.", icon: Rocket, tier: "Member" },
  {
    name: "VIP",
    desc: "Invite 3 members to the server to claim this role.",
    icon: Star,
    tier: "Claimable",
    color: "bg-amber-500 text-white",
  },
  {
    name: "Active",
    desc: "Send 300 messages in the community to claim this role.",
    icon: MessageSquare,
    tier: "Claimable",
    color: "bg-green-600 text-white",
  },
  {
    name: "Team Sieze",
    desc: "Obtained by anyone adding SIEZE into their username.",
    icon: UserPlus,
    tier: "Claimable",
    color: "bg-cyan-500 text-white",
  },
  { name: "Member", desc: "Standard community role.", icon: User, tier: "Member" },
]

export function DiscordRoles() {
  return (
    <section id="roles" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Discord Roles"
          title="Earn Your Rank"
          description="Every member of SIEZE Community has a place. Climb through the ranks as you grow with the community."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.name}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                  role.color ?? "bg-primary/15 text-primary"
                }`}
              >
                <role.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {role.name}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">{role.tier}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
