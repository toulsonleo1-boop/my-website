import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
  showRulesButton?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  showRulesButton = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {showRulesButton && (
        <a
          href="#rules"
          className="mb-2 inline-flex items-center rounded-md border border-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-red-500 transition-colors hover:bg-red-500 hover:text-white"
        >
          Rules
        </a>
      )}
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      )}
      <h2 className="text-balance font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-2xl text-pretty leading-relaxed text-muted-foreground", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  )
}
