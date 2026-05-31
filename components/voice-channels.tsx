import { Volume2, Users, Gamepad2, CalendarDays, Mic, Lock, Swords } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const channels = [
  { name: "Join Voice", desc: "Meet community members and make friends.", icon: Volume2 },
  { name: "General VC", desc: "General conversations and hangouts.", icon: Users },
  { name: "Gaming VC", desc: "Play games together with the community.", icon: Gamepad2 },
  { name: "Event VC", desc: "Official event voice channel.", icon: CalendarDays },
  { name: "Creator VC", desc: "For creators and content discussions.", icon: Mic },
  { name: "Staff VC", desc: "Private voice channel for staff.", icon: Lock },
  { name: "Tournament VC", desc: "Used during official tournaments and events.", icon: Swords },
]

export function VoiceChannels() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Voice Channels"
          title="Always Someone To Talk To"
          description="Hop into voice and connect with the community across a range of dedicated channels."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
