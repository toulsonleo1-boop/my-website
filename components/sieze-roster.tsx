import { SectionHeading } from "@/components/section-heading"

const members = [
  "Sieze67",
  "SiezeCallum",
  "SiezeXplr",
  "SiezeChrxme",
  "SiezeEyes",
  "SiezeKoyrel",
  "SiezeAcrock",
  "SiezeFear",
  "SiezeYaya",
  "SiezeZabeatz",
  "SiezeVitals",
  "SiezeVreeexy",
  "SiezeWillgod",
  "SiezeDeathrun",
]

export function SiezeRoster() {
  return (
    <section id="sieze" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Sieze"
          title="Roster"
          description="The people listed are people repping SIEZE in their usernames."
        />

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-cyan-500 bg-cyan-500/5 p-6 md:p-8">
          <div className="flex flex-wrap justify-center gap-3">
            {members.map((name) => (
              <span
                key={name}
                className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
