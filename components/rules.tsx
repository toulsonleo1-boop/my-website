import { SectionHeading } from "@/components/section-heading"

const rules = [
  "Respect all members.",
  "No harassment or bullying.",
  "No hate speech.",
  "No inappropriate content.",
  "Follow Discord Terms of Service.",
  "Listen to staff instructions.",
  "No spam.",
  "No unauthorized advertising.",
  "Keep discussions friendly.",
  "Have fun and enjoy the community.",
]

export function Rules() {
  return (
    <section id="rules" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Community Rules"
          title="Keep It Friendly"
          description="A few simple rules keep SIEZE Community a welcoming place for all members."
          showRulesButton={false}
        />

        <ol className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
          {rules.map((rule, i) => (
            <li
              key={rule}
              className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-red-600">{rule}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Failure to follow these rules may result in moderation action.
        </p>
      </div>
    </section>
  )
}
