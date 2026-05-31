import { Crown, Users } from "lucide-react"

const vipMembers = ["chrxme", "koyrel", "willgod", "dex", "fear", "george plays", "eyes"]

export function Vip() {
  return (
    <section id="vip" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Golden tab */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-[oklch(0.2_0.03_85)]"
            style={{
              background: "linear-gradient(90deg, #b8860b 0%, #ffe9a8 50%, #b8860b 100%)",
              boxShadow: "0 0 24px rgba(212, 175, 55, 0.35)",
            }}
          >
            <Crown className="h-4 w-4" />
            VIP
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left: title + instructions */}
          <div className="text-center lg:text-left">
            <h2
              className="font-display text-6xl font-bold uppercase tracking-tight sm:text-7xl md:text-8xl"
              style={{
                background: "linear-gradient(180deg, #fff6dc 0%, #f5d57a 45%, #c79a32 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              VIP
            </h2>
            <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
              To get <span className="font-semibold text-foreground">VIP</span> you must get{" "}
              <span className="font-semibold text-[#f5d57a]">3 invites</span> in the Discord.
            </p>
          </div>

          {/* Right: gold-lined box with VIP names */}
          <div
            className="rounded-2xl border border-[#d4af37]/60 bg-card/40 p-8"
            style={{ boxShadow: "0 0 30px rgba(212, 175, 55, 0.12), inset 0 0 30px rgba(212, 175, 55, 0.05)" }}
          >
            <div className="flex items-center gap-2 border-b border-[#d4af37]/30 pb-4">
              <Users className="h-4 w-4 text-[#f5d57a]" />
              <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-[#f5d57a]">
                Current VIPs
              </span>
            </div>
            <ul className="mt-6 flex flex-col gap-4">
              {vipMembers.map((name) => (
                <li
                  key={name}
                  className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl"
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #f5d57a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
