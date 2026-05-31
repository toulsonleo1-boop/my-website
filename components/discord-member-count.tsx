"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function DiscordMemberCount() {
  const { data, error, isLoading } = useSWR("/api/discord/member-count", fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
  })

  const memberCount: number | null = data?.memberCount ?? null
  const onlineCount: number | null = data?.onlineCount ?? null

  return (
    <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 px-8 py-7">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Total members right now
        </span>
      </div>
      <p
        className="font-display text-5xl font-bold tabular-nums tracking-tight text-foreground sm:text-6xl"
        aria-live="polite"
      >
        {isLoading || memberCount === null
          ? error
            ? "—"
            : "…"
          : memberCount.toLocaleString("en-US")}
      </p>
      <p className="text-xs text-muted-foreground">
        {onlineCount !== null ? `${onlineCount.toLocaleString("en-US")} online · ` : ""}Live · updates every few seconds
      </p>
    </div>
  )
}
